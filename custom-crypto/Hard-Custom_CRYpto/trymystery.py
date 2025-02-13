from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes
import binascii
import base64
import zlib

# Load the public key
with open('publickey.pem', 'rb') as f:
    pub_key = RSA.import_key(f.read())

# Get the modulus and exponent
n = pub_key.n
e = pub_key.e

# Mystery numbers
p = 9255148449636418216385264245495380482495319167416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
q = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353

# Test if these are the prime factors
if n == p * q:
    print("Mystery numbers are indeed the prime factors!")
    
    # Calculate private exponent
    phi = (p - 1) * (q - 1)
    d = pow(e, -1, phi)
    
    # Convert ciphertext from hex to int
    ct = "542ab37323abff2b115ea77c9e2307f21317610b06e666f3d465b02fc1c496dcf1045da29d8cc8eb3c848339178a6a8781d9dc9f67bc07bd28f25d0bc10a073cffc14a13201375e965e246c074753bae2ced8e0ff4c1c5addc050f4b861e055f0e20a2b72eee48958113beac53d6f09805b99c4009c65bde71ba7bee5511c996"
    ct_int = int(ct, 16)
    
    # Decrypt
    pt_int = pow(ct_int, d, n)
    hex_str = hex(pt_int)[2:]
    if len(hex_str) % 2 == 1:
        hex_str = '0' + hex_str
        
    bytes_data = bytes.fromhex(hex_str)
    print("\nRaw bytes:", bytes_data)
    
    # Try to decompress if it might be compressed data
    try:
        decompressed = zlib.decompress(bytes_data)
        print("\nDecompressed:", decompressed)
    except:
        print("\nNot zlib compressed")
        
    # Try base64 decoding if it might be encoded
    try:
        b64_decoded = base64.b64decode(bytes_data)
        print("\nBase64 decoded:", b64_decoded)
    except:
        print("\nNot base64 encoded")
    
    # Look for XML-like structure
    print("\nTrying to parse as text in chunks:")
    for i in range(0, len(bytes_data), 16):
        chunk = bytes_data[i:i+16]
        print(f"Chunk {i:03d}:", chunk)
        try:
            print(f"        As text: {chunk.decode('utf-8', errors='ignore')}")
        except:
            print("        Not decodable as text")
            
    # Try reversing bytes
    print("\nReversed bytes:")
    reversed_bytes = bytes(reversed(bytes_data))
    print(reversed_bytes)
    
    # Try looking for common flag formats
    flag_formats = [b"flag{", b"C2C_CTF{", b"CTF{"]
    for format in flag_formats:
        for i in range(len(bytes_data) - len(format)):
            window = bytes_data[i:i+len(format)]
            # Try direct match
            if window == format:
                print(f"\nFound flag format at position {i}")
                # Try to extract until closing brace
                for j in range(i, len(bytes_data)):
                    if bytes_data[j:j+1] == b"}":
                        print("Potential flag:", bytes_data[i:j+1])
                        break
            # Try XOR with each byte
            for xor_val in range(256):
                xored = bytes(b ^ xor_val for b in window)
                if xored == format:
                    print(f"\nFound XORed flag format at position {i} with value {xor_val}")
                    # Extract and XOR the potential full flag
                    for j in range(i, len(bytes_data)):
                        if bytes_data[j:j+1] == bytes([ord('}') ^ xor_val]):
                            potential_flag = bytes(b ^ xor_val for b in bytes_data[i:j+1])
                            print("Potential XORed flag:", potential_flag)
                            break