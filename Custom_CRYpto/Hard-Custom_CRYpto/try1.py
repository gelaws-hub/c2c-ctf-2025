from Crypto.PublicKey import RSA
from Crypto.Util.number import *
import math
from sympy import gcd

def read_public_key(pem_file):
    """Read and parse RSA public key from PEM file"""
    with open(pem_file, 'rb') as f:
        key = RSA.import_key(f.read())
    return key.n, key.e

def hex_to_int(hex_str):
    """Convert hex string to integer"""
    return int(hex_str, 16)

def analyze_mystery_numbers(n, mystery1, mystery2):
    """Analyze relationship between mystery numbers and modulus"""
    # Check if mystery numbers are factors
    if n % mystery1 == 0:
        return mystery1, n // mystery1
    if n % mystery2 == 0:
        return mystery2, n // mystery2
    
    # Check if their product is related to n
    product = mystery1 * mystery2
    if product == n:
        return mystery1, mystery2
    
    # Check GCD
    gcd1 = gcd(mystery1, n)
    gcd2 = gcd(mystery2, n)
    
    if gcd1 != 1:
        return gcd1, n // gcd1
    if gcd2 != 1:
        return gcd2, n // gcd2
    
    return None, None

def decrypt_rsa(ct, d, n):
    """Decrypt RSA ciphertext using private key components"""
    pt = pow(ct, d, n)
    try:
        return long_to_bytes(pt)
    except:
        return None

def main():
    # Read inputs
    ct_hex = "542ab37323abff2b115ea77c9e2307f21317610b06e666f3d465b02fc1c496dcf1045da29d8cc8eb3c848339178a6a8781d9dc9f67bc07bd28f25d0bc10a073cffc14a13201375e965e246c074753bae2ced8e0ff4c1c5addc050f4b861e055f0e20a2b72eee48958113beac53d6f09805b99c4009c65bde71ba7bee5511c996"
    ct = hex_to_int(ct_hex)
    
    mystery1 = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
    mystery2 = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353
    
    # Get public key components
    n, e = read_public_key('public_key.pem')
    print(f"Modulus (n): {n}")
    print(f"Public exponent (e): {e}")
    
    # Try to factor n using mystery numbers
    p, q = analyze_mystery_numbers(n, mystery1, mystery2)
    
    if p and q:
        print(f"Found potential factors:\np = {p}\nq = {q}")
        
        # Calculate private key
        phi = (p - 1) * (q - 1)
        d = pow(e, -1, phi)
        
        # Try decryption
        pt = decrypt_rsa(ct, d, n)
        if pt:
            print(f"\nDecrypted message: {pt}")
            return
    
    print("Initial approach failed. Trying additional methods...")
    
    # Additional approaches to try:
    # 1. Check if mystery numbers are related to totient
    phi_candidates = [
        mystery1,
        mystery2,
        mystery1 * mystery2,
        abs(mystery1 - mystery2),
        gcd(mystery1, mystery2)
    ]
    
    for phi in phi_candidates:
        try:
            d = pow(e, -1, phi)
            pt = decrypt_rsa(ct, d, n)
            if pt and b'flag' in pt.lower():
                print(f"Found valid decryption using phi={phi}")
                print(f"Decrypted message: {pt}")
                return
        except:
            continue

if __name__ == "__main__":
    main()