'''
Business: API для работы с отзывами о породах собак
Args: event - dict с httpMethod, body для POST
      context - object с request_id, function_name
Returns: HTTP response с результатом добавления отзыва
'''
import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database URL not configured'}),
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        query_params = event.get('queryStringParameters') or {}
        breed_id = query_params.get('breed_id')
        
        if not breed_id:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'breed_id parameter is required'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute('''
            SELECT id, user_name, rating, review_text, created_at
            FROM t_p79480865_dog_breed_database.breed_reviews
            WHERE breed_id = %s
            ORDER BY created_at DESC
        ''', (breed_id,))
        
        reviews = cur.fetchall()
        cur.close()
        conn.close()
        
        result = [dict(r) for r in reviews]
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'reviews': result}, default=str),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_str = event.get('body', '{}')
        body = json.loads(body_str)
        
        breed_id = body.get('breed_id')
        user_name = body.get('user_name', 'Аноним')
        rating = body.get('rating')
        review_text = body.get('review_text', '')
        
        if not breed_id or not rating:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'breed_id and rating are required'}),
                'isBase64Encoded': False
            }
        
        if not isinstance(rating, int) or rating < 1 or rating > 5:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'rating must be between 1 and 5'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute('''
            INSERT INTO t_p79480865_dog_breed_database.breed_reviews (breed_id, user_name, rating, review_text)
            VALUES (%s, %s, %s, %s)
            RETURNING id, user_name, rating, review_text, created_at
        ''', (breed_id, user_name, rating, review_text))
        
        new_review = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(dict(new_review), default=str),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }