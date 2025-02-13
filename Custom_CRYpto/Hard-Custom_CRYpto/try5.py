from Crypto.PublicKey import RSA
from Crypto.Util.number import *
import math
from sympy import gcd
import binascii

def decrypt_with_crt(ct, p, q, e):
    """Decrypt using Chinese Remainder Theorem approach"""
    # Calculate d_p and d_q
    d_p = pow(e, -1, p - 1)
    d_q = pow(e, -1, q - 1)
    
    # CRT components
    m_p = pow(ct, d_p, p)
    m_q = pow(ct, d_q, q)
    
    # Calculate coefficients
    q_inv = pow(q, -1, p)
    
    # Combine using CRT
    h = (q_inv * (m_p - m_q)) % p
    m = m_q + h * q
    
    return m

def bit_manipulation_decrypt(ct, p, q, e):
    """Try various bit manipulation approaches"""
    results = []
    
    # Standard CRT decryption
    m = decrypt_with_crt(ct, p, q, e)
    pt_bytes = long_to_bytes(m)
    results.append(("Standard CRT", pt_bytes))
    
    # Try flipping bits in specific positions
    for i in range(0, 64, 8):  # Try every byte position in first 8 bytes
        m_modified = m ^ (1 << i)  # Flip bit at position i
        pt_bytes = long_to_bytes(m_modified)
        results.append((f"Bit flip at pos {i}", pt_bytes))
    
    # Try rotating bits
    for i in range(1, 8):
        rotated = ((m << i) | (m >> (m.bit_length() - i))) & ((1 << m.bit_length()) - 1)
        pt_bytes = long_to_bytes(rotated)
        results.append((f"Rotated {i} bits", pt_bytes))
    
    # Try using bits from p and q
    p_bits = bin(p)[2:][-32:]  # Last 32 bits of p
    q_bits = bin(q)[2:][-32:]  # Last 32 bits of q
    
    # XOR with last bits of p
    p_mask = int(p_bits, 2)
    pt_bytes = long_to_bytes(m ^ p_mask)
    results.append(("XOR with p bits", pt_bytes))
    
    # XOR with last bits of q
    q_mask = int(q_bits, 2)
    pt_bytes = long_to_bytes(m ^ q_mask)
    results.append(("XOR with q bits", pt_bytes))
    
    # Try combining p and q bits
    pq_mask = int(p_bits, 2) ^ int(q_bits, 2)
    pt_bytes = long_to_bytes(m ^ pq_mask)
    results.append(("XOR with p^q bits", pt_bytes))
    
    return results

def hex_to_int(hex_string):
    return int(hex_string, 16)

def main():
    ct_hex = "542ab37323abff2b115ea77c9e2307f21317610b06e666f3d465b02fc1c496dcf1045da29d8cc8eb3c848339178a6a8781d9dc9f67bc07bd28f25d0bc10a073cffc14a13201375e965e246c074753bae2ced8e0ff4c1c5addc050f4b861e055f0e20a2b72eee48958113beac53d6f09805b99c4009c65bde71ba7bee5511c996"
    ct = hex_to_int(ct_hex)
    
    p = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
    q = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353
    e = 65537
    
    print("Trying CRT and bit manipulation approaches...")
    results = bit_manipulation_decrypt(ct, p, q, e)
    
    for method, result in results:
        print(f"\n{method}:")
        # Try to decode as string
        try:
            print(f"As string: {result.decode('utf-8', errors='ignore')}")
        except:
            pass
        # Print hex for analysis
        print(f"Hex: {binascii.hexlify(result).decode()}")
        
        # Look for common CTF flag patterns
        if b'flag' in result.lower() or b'c2c' in result.lower():
            print("!!! Possible flag found !!!")

if __name__ == "__main__":
    main()