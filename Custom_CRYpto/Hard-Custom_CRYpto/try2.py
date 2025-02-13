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

def try_decode_bytes(data):
    """Try different methods to decode bytes to readable text"""
    try:
        # Try direct UTF-8 decoding
        return data.decode('utf-8')
    except:
        pass
    
    try:
        # Try ASCII decoding
        return data.decode('ascii')
    except:
        pass
    
    try:
        # Try hex representation
        return binascii.hexlify(data).decode()
    except:
        pass
    
    return None

def decrypt_rsa_variations(ct, p, q, e, n):
    """Try different variations of RSA decryption"""
    attempts = []
    
    # 1. Standard RSA
    phi = (p - 1) * (q - 1)
    d = pow(e, -1, phi)
    pt1 = pow(ct, d, n)
    attempts.append(("Standard RSA", pt1))
    
    # 2. Using lambda (lcm) instead of phi
    lambda_n = math.lcm(p - 1, q - 1)
    d2 = pow(e, -1, lambda_n)
    pt2 = pow(ct, d2, n)
    attempts.append(("Lambda RSA", pt2))
    
    # 3. Try without subtracting 1 from factors
    phi_alt = p * q
    try:
        d3 = pow(e, -1, phi_alt)
        pt3 = pow(ct, d3, n)
        attempts.append(("Alternative Phi", pt3))
    except:
        pass
    
    # 4. Try with sum instead of product for phi
    phi_sum = (p + q)
    try:
        d4 = pow(e, -1, phi_sum)
        pt4 = pow(ct, d4, n)
        attempts.append(("Sum Phi", pt4))
    except:
        pass
    
    return attempts

def main():
    # Read inputs
    ct_hex = "542ab37323abff2b115ea77c9e2307f21317610b06e666f3d465b02fc1c496dcf1045da29d8cc8eb3c848339178a6a8781d9dc9f67bc07bd28f25d0bc10a073cffc14a13201375e965e246c074753bae2ced8e0ff4c1c5addc050f4b861e055f0e20a2b72eee48958113beac53d6f09805b99c4009c65bde71ba7bee5511c996"
    ct = hex_to_int(ct_hex)
    
    p = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
    q = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353
    
    # Get public key components
    n, e = read_public_key('public_key.pem')
    print(f"Modulus (n): {n}")
    print(f"Public exponent (e): {e}")
    
    print("\nTrying different RSA variations...")
    attempts = decrypt_rsa_variations(ct, p, q, e, n)
    
    for method, pt in attempts:
        print(f"\nTrying {method}:")
        try:
            # Try to convert to bytes
            pt_bytes = long_to_bytes(pt)
            print(f"As bytes: {pt_bytes}")
            
            # Try to decode to text
            decoded = try_decode_bytes(pt_bytes)
            if decoded:
                print(f"Decoded: {decoded}")
            
            # Try reverse byte order
            pt_bytes_reversed = bytes(reversed(pt_bytes))
            decoded_reversed = try_decode_bytes(pt_bytes_reversed)
            if decoded_reversed:
                print(f"Decoded (reversed): {decoded_reversed}")
                
        except Exception as ex:
            print(f"Failed to convert/decode: {ex}")
        
        # Print raw number for analysis
        print(f"Raw number: {pt}")
        print(f"Hex: {hex(pt)}")

if __name__ == "__main__":
    main()