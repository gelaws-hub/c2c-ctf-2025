from passlib.hash import md5_crypt

def crack_md5_crypt(hash_str, wordlist_file):
    # Extract salt from the hash ($1$salt$hash)
    parts = hash_str.split("$")
    if len(parts) != 4 or parts[1] != "1":
        print("Invalid MD5-Crypt hash format.")
        return None
    
    salt = parts[2]  # Extracted salt
    print(f"Using salt: {salt}\n")
    
    # Read wordlist and try cracking
    with open(wordlist_file, "r", encoding="utf-8") as f:
        for password in f:
            password = password.strip()  # Remove newlines/spaces
            hashed_attempt = md5_crypt.hash(password, salt=salt)

            if hashed_attempt == hash_str:
                print(f"[+] Password found: {password}")
                return password
    
    print("[-] Password not found in the wordlist.")
    return None

# Example usage
if __name__ == "__main__":
    hash_to_crack = "$1$NhbjPGQ4$lefNvFEkghKhMx5M0tUXr1"  # Replace with your hash
    wordlist_path = "words.txt"  # Replace with your wordlist file
    
    crack_md5_crypt(hash_to_crack, wordlist_path)
