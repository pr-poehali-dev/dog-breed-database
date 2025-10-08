import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с отзывами о породах собак
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с отзывами или результатом добавления
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database URL not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        breed_id = params.get('breed_id')
        
        if breed_id:
            cursor.execute('''
                SELECT * FROM breed_reviews
                WHERE breed_id = %s
                ORDER BY created_at DESC
            ''', (breed_id,))
        else:
            cursor.execute('''
                SELECT br.*, b.name as breed_name
                FROM breed_reviews br
                JOIN breeds b ON br.breed_id = b.id
                ORDER BY br.created_at DESC
                LIMIT 50
            ''')
        
        reviews = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'reviews': [dict(r) for r in reviews]}, default=str),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        breed_id = body_data.get('breed_id')
        user_name = body_data.get('user_name')
        rating = body_data.get('rating')
        review_text = body_data.get('review_text', '')
        
        if not breed_id or not user_name or not rating:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields: breed_id, user_name, rating'}),
                'isBase64Encoded': False
            }
        
        if not (1 <= int(rating) <= 5):
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Rating must be between 1 and 5'}),
                'isBase64Encoded': False
            }
        
        cursor.execute('''
            INSERT INTO breed_reviews (breed_id, user_name, rating, review_text)
            VALUES (%s, %s, %s, %s)
            RETURNING id, created_at
        ''', (breed_id, user_name, rating, review_text))
        
        result = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'review_id': result['id'],
                'created_at': str(result['created_at'])
            }, default=str),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }