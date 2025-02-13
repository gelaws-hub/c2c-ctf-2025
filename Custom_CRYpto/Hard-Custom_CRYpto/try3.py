from Crypto.PublicKey import RSA
from Crypto.Util.number import *
import math
from sympy import gcd
import binascii

def read_public_key(pem_file):
    """Read and parse RSA public key from PEM file"""
    with open(pem_file, 'rb') as f:
        key = RSA.import_key(f.read())
    return key.n, key.e

def hex_to_int(hex_str):
    """Convert hex string to integer"""
    return int(hex_str, 16)

def try_common_transformations(data):
    """Try various transformations on the decrypted data"""
    results = []
    
    # Original data
    results.append(("Original", data))
    
    # Try XOR with small keys
    for i in range(256):
        xored = bytes(b ^ i for b in data)
        if b'flag' in xored.lower() or b'c2c' in xored.lower():
            results.append((f"XOR with {hex(i)}", xored))
    
    # Try rotating bytes
    for i in range(1, 8):
        rotated = bytes(((b << i) | (b >> (8-i))) & 0xFF for b in data)
        if b'flag' in rotated.lower() or b'c2c' in rotated.lower():
            results.append((f"Rotated {i} bits", rotated))
    
    # Try byte chunks
    for chunk_size in [2, 4, 8]:
        if len(data) % chunk_size == 0:
            chunks = [data[i:i+chunk_size] for i in range(0, len(data), chunk_size)]
            # Reverse chunks
            reversed_chunks = b''.join(chunks[::-1])
            if b'flag' in reversed_chunks.lower() or b'c2c' in reversed_chunks.lower():
                results.append((f"Reversed {chunk_size}-byte chunks", reversed_chunks))
            # Swap bytes within chunks
            swapped = b''.join(chunk[::-1] for chunk in chunks)
            if b'flag' in swapped.lower() or b'c2c' in swapped.lower():
                results.append((f"Swapped bytes in {chunk_size}-byte chunks", swapped))

    # Try repeating key XOR with the mystery numbers
    mystery1 = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
    mystery2 = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353
    
    # Use last bytes of mystery numbers as potential XOR keys
    key1 = mystery1.to_bytes((mystery1.bit_length() + 7) // 8, 'big')[-16:]
    key2 = mystery2.to_bytes((mystery2.bit_length() + 7) // 8, 'big')[-16:]
    
    for key in [key1, key2]:
        xored = bytes(data[i] ^ key[i % len(key)] for i in range(len(data)))
        if b'flag' in xored.lower() or b'c2c' in xored.lower():
            results.append((f"XOR with mystery key {binascii.hexlify(key)}", xored))

    return results

def main():
    # Read inputs
    ct_hex = "542ab37323abff2b115ea77c9e2307f21317610b06e666f3d465b02fc1c496dcf1045da29d8cc8eb3c848339178a6a8781d9dc9f67bc07bd28f25d0bc10a073cffc14a13201375e965e246c074753bae2ced8e0ff4c1c5addc050f4b861e055f0e20a2b72eee48958113beac53d6f09805b99c4009c65bde71ba7bee5511c996"
    ct = hex_to_int(ct_hex)
    
    p = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
    q = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353
    
    # Get public key components
    n, e = read_public_key('public_key.pem')
    
    # Standard RSA decryption
    phi = (p - 1) * (q - 1)
    d = pow(e, -1, phi)
    pt = pow(ct, d, n)
    decrypted = long_to_bytes(pt)
    
    print("Trying various transformations on decrypted data...")
    results = try_common_transformations(decrypted)
    
    for method, result in results:
        print(f"\n{method}:")
        print(f"Raw bytes: {result}")
        try:
            print(f"As string: {result.decode('utf-8', errors='ignore')}")
        except:
            pass
        print(f"Hex: {binascii.hexlify(result).decode()}")

if __name__ == "__main__":
    main()