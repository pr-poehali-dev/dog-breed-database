import json
import os
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для получения информации о породах собак с фильтрацией
    Args: event - dict с httpMethod, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с данными пород
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
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
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
    
    params = event.get('queryStringParameters') or {}
    breed_id = params.get('id')
    size_filter = params.get('size')
    activity_filter = params.get('activity')
    care_filter = params.get('care')
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if breed_id:
        cursor.execute('''
            SELECT b.*, 
                   COALESCE(AVG(br.rating), 0) as avg_rating,
                   COUNT(br.id) as review_count
            FROM breeds b
            LEFT JOIN breed_reviews br ON b.id = br.breed_id
            WHERE b.id = %s
            GROUP BY b.id
        ''', (breed_id,))
        breed = cursor.fetchone()
        
        if not breed:
            cursor.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Breed not found'}),
                'isBase64Encoded': False
            }
        
        cursor.execute('''
            SELECT * FROM breed_photos
            WHERE breed_id = %s
            ORDER BY is_main DESC, id
        ''', (breed_id,))
        photos = cursor.fetchall()
        
        cursor.execute('''
            SELECT * FROM breed_characteristics
            WHERE breed_id = %s
            ORDER BY characteristic_name
        ''', (breed_id,))
        characteristics = cursor.fetchall()
        
        cursor.execute('''
            SELECT * FROM breed_reviews
            WHERE breed_id = %s
            ORDER BY created_at DESC
        ''', (breed_id,))
        reviews = cursor.fetchall()
        
        result = dict(breed)
        result['photos'] = [dict(p) for p in photos]
        result['characteristics'] = [dict(c) for c in characteristics]
        result['reviews'] = [dict(r) for r in reviews]
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result, default=str),
            'isBase64Encoded': False
        }
    
    query = '''
        SELECT b.*, 
               COALESCE(AVG(br.rating), 0) as avg_rating,
               COUNT(br.id) as review_count
        FROM breeds b
        LEFT JOIN breed_reviews br ON b.id = br.breed_id
        WHERE 1=1
    '''
    query_params = []
    
    if size_filter:
        query += ' AND b.size = %s'
        query_params.append(size_filter)
    
    if activity_filter:
        query += ' AND b.activity_level = %s'
        query_params.append(activity_filter)
    
    if care_filter:
        query += ' AND b.care_level = %s'
        query_params.append(care_filter)
    
    query += ' GROUP BY b.id ORDER BY b.name'
    
    cursor.execute(query, query_params)
    breeds = cursor.fetchall()
    
    breed_list = []
    for breed in breeds:
        breed_dict = dict(breed)
        
        cursor.execute('''
            SELECT * FROM breed_photos
            WHERE breed_id = %s AND is_main = true
            LIMIT 1
        ''', (breed['id'],))
        primary_photo = cursor.fetchone()
        
        if primary_photo:
            breed_dict['primary_photo'] = dict(primary_photo)
        else:
            breed_dict['primary_photo'] = None
        
        breed_list.append(breed_dict)
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'breeds': breed_list}, default=str),
        'isBase64Encoded': False
    }