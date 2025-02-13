from Crypto.PublicKey import RSA
from Crypto.Util.number import *
import math
from sympy import gcd
import binascii

def hex_to_int(hex_str):
    """Convert hex string to integer"""
    return int(hex_str, 16)

def analyze_mystery_numbers():
    """Analyze properties of mystery numbers"""
    p = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
    q = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353
    
    # Convert to bytes to analyze patterns
    p_bytes = p.to_bytes((p.bit_length() + 7) // 8, 'big')
    q_bytes = q.to_bytes((q.bit_length() + 7) // 8, 'big')
    
    print("Mystery number analysis:")
    print(f"p last bytes: {binascii.hexlify(p_bytes[-16:])}")
    print(f"q last bytes: {binascii.hexlify(q_bytes[-16:])}")
    
    # Try custom totient calculations
    totient = (p - 1) * (q - 1)
    totient_bytes = totient.to_bytes((totient.bit_length() + 7) // 8, 'big')
    print(f"Totient last bytes: {binascii.hexlify(totient_bytes[-16:])}")
    
    # Calculate XOR of p and q bytes
    xor_bytes = bytes(a ^ b for a, b in zip(p_bytes[-16:], q_bytes[-16:]))
    print(f"XOR of p,q last bytes: {binascii.hexlify(xor_bytes)}")
    
    return p_bytes, q_bytes, totient_bytes

def custom_decrypt():
    """Try custom decryption approaches"""
    ct_hex = "542ab37323abff2b115ea77c9e2307f21317610b06e666f3d465b02fc1c496dcf1045da29d8cc8eb3c848339178a6a8781d9dc9f67bc07bd28f25d0bc10a073cffc14a13201375e965e246c074753bae2ced8e0ff4c1c5addc050f4b861e055f0e20a2b72eee48958113beac53d6f09805b99c4009c65bde71ba7bee5511c996"
    ct = hex_to_int(ct_hex)
    
    p = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
    q = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353
    n = p * q
    e = 65537

    # Standard RSA decryption first
    phi = (p - 1) * (q - 1)
    d = pow(e, -1, phi)
    pt = pow(ct, d, n)
    decrypted = long_to_bytes(pt)
    
    # Get analysis of mystery numbers
    p_bytes, q_bytes, totient_bytes = analyze_mystery_numbers()
    
    print("\nTrying custom decryption approaches...")
    
    # Try XORing with various patterns from mystery numbers
    patterns = [
        ("Last 16 bytes of p", p_bytes[-16:]),
        ("Last 16 bytes of q", q_bytes[-16:]),
        ("Last 16 bytes of totient", totient_bytes[-16:]),
        ("Alternating p,q bytes", bytes(b for t in zip(p_bytes[-16:], q_bytes[-16:]) for b in t)),
        ("p XOR q bytes", bytes(a ^ b for a, b in zip(p_bytes[-16:], q_bytes[-16:])))
    ]
    
    for name, pattern in patterns:
        # Extend pattern to match decrypted length if needed
        while len(pattern) < len(decrypted):
            pattern = pattern + pattern
        pattern = pattern[:len(decrypted)]
        
        # XOR with pattern
        result = bytes(a ^ b for a, b in zip(decrypted, pattern))
        
        print(f"\nTrying {name}:")
        try:
            print(f"As string: {result.decode('utf-8', errors='ignore')}")
        except:
            pass
        print(f"Hex: {binascii.hexlify(result).decode()}")
        
        # Also try reversing the pattern
        result = bytes(a ^ b for a, b in zip(decrypted, pattern[::-1]))
        print(f"\n{name} (reversed pattern):")
        try:
            print(f"As string: {result.decode('utf-8', errors='ignore')}")
        except:
            pass
        print(f"Hex: {binascii.hexlify(result).decode()}")

if __name__ == "__main__":
    custom_decrypt()