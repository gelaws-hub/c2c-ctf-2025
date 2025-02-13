from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes

# Update this path to match your file location
KEY_PATH = r'c:\Users\Fadhil\Downloads\c2c ctf\Custom_CRYpto\Hard-Custom_CRYpto\public_key.pem'

try:
    # Read the public key
    with open(KEY_PATH, 'rb') as f:
        pub_key = RSA.import_key(f.read())

    # Get n and e from public key
    n = pub_key.n
    e = pub_key.e

    # The mystery numbers are likely p and q (prime factors of n)
    p = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
    q = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353

    # Verify if p * q equals n
    assert p * q == n, "Mystery numbers are not the prime factors!"

    # Calculate phi(n) = (p-1)(q-1)
    phi = (p - 1) * (q - 1)

    # Calculate private key d = e^(-1) mod phi(n)
    d = pow(e, -1, phi)

    # Convert ciphertext from hex to integer
    ct = int("542ab37323abff2b115ea77c9e2307f21317610b06e666f3d465b02fc1c496dcf1045da29d8cc8eb3c848339178a6a8781d9dc9f67bc07bd28f25d0bc10a073cffc14a13201375e965e246c074753bae2ced8e0ff4c1c5addc050f4b861e055f0e20a2b72eee48958113beac53d6f09805b99c4009c65bde71ba7bee5511c996", 16)

    # Decrypt the message
    plaintext = pow(ct, d, n)

    # Convert to bytes
    flag_bytes = long_to_bytes(plaintext)
    
    # Try different approaches to display the result
    print("Raw bytes:", flag_bytes)
    print("Hex representation:", flag_bytes.hex())
    
    # Try different encodings
    encodings = ['utf-8', 'ascii', 'latin1', 'cp1252']
    for encoding in encodings:
        try:
            decoded = flag_bytes.decode(encoding)
            print(f"Decoded with {encoding}:", decoded)
        except UnicodeDecodeError:
            print(f"Failed to decode with {encoding}")

except FileNotFoundError:
    print(f"Error: Could not find the key file at {KEY_PATH}")
    print("Please make sure the path is correct and the file exists.")
except Exception as e:
    print(f"An error occurred: {str(e)}")