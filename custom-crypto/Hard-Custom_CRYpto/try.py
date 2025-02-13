from cryptography.hazmat.primitives.serialization import load_pem_public_key
from cryptography.hazmat.primitives.asymmetric import rsa
import binascii
from math import gcd
from Crypto.Util.number import inverse, long_to_bytes


def read_public_key(pem_data):
    """Read and extract information from public key."""
    pub_key = load_pem_public_key(pem_data.encode())
    n = pub_key.public_numbers().n
    e = pub_key.public_numbers().e
    return n, e


def hex_to_int(hex_str):
    """Convert hex string to integer."""
    return int(hex_str, 16)


# The mystery numbers
mystery1 = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
mystery2 = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353

# The ciphertext
ct_hex = "542ab37323abff2b115ea77c9e2307f21317610b06e666f3d465b02fc1c496dcf1045da29d8cc8eb3c848339178a6a8781d9dc9f67bc07bd28f25d0bc10a073cffc14a13201375e965e246c074753bae2ced8e0ff4c1c5addc050f4b861e055f0e20a2b72eee48958113beac53d6f09805b99c4009c65bde71ba7bee5511c996"
ciphertext = hex_to_int(ct_hex)

# Public key data
public_key_pem = """-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFtbd+YEu3jvG+i7GIy7mEKBP21r
pT5khbk/qCytiSNrPu2BRU0ZMBPkRvgd/2KqtZ5grbO0DgrkQj2YhVn7DcbEGIV5
Tzby6IyvQSQWzEcG8qJoj3QZ06V1RdgBRtG8fdZl0WX425N5M+bPAYwyeieAig5O
rBiQYqXc56lTzoXhAgMBAAE=
-----END PUBLIC KEY-----"""


def attempt_direct_factorization():
    """Try direct relationships between mystery numbers and factors."""
    print("\nAttempting direct factorization...")

    # Get modulus from public key
    n, e = read_public_key(public_key_pem)
    print(f"Modulus (n): {n}")
    print(f"Public exponent (e): {e}")

    # Try various combinations and operations with mystery numbers
    attempts = [
        ("Product", mystery1 * mystery2),
        ("Sum", mystery1 + mystery2),
        ("GCD with n", gcd(mystery1, n)),
        ("GCD of mysteries", gcd(mystery1, mystery2)),
        ("mystery1 mod n", mystery1 % n),
        ("mystery2 mod n", mystery2 % n)
    ]

    for name, result in attempts:
        print(f"\n{name}: {result}")
        print(f"Is factor of n? {n % result == 0 if result != 0 else False}")


def attempt_decryption(p, q, e, ciphertext):
    """Attempt to decrypt using potential prime factors."""
    try:
        n = p * q
        phi = (p - 1) * (q - 1)
        d = inverse(e, phi)
        plaintext = pow(ciphertext, d, n)
        decoded = long_to_bytes(plaintext)
        print(f"\nPotential decryption: {decoded}")
        return decoded
    except Exception as e:
        print(f"Decryption failed: {e}")
        return None


def attempt_mathematical_relationships():
    """Try various mathematical relationships between the numbers."""
    print("\nAttempting mathematical relationships...")
    n, e = read_public_key(public_key_pem)

    # Try operations between mystery numbers
    operations = [
        abs(mystery1 - mystery2),
        mystery1 ^ mystery2,  # XOR
        mystery1 & mystery2,  # AND
        mystery1 | mystery2   # OR
    ]

    for i, result in enumerate(operations):
        print(f"\nOperation {i+1} result: {result}")
        if n % result == 0:
            print("Found potential factor!")
            q = n // result
            attempt_decryption(result, q, e, ciphertext)


def analyze_bit_patterns():
    """Analyze bit patterns of mystery numbers."""
    print("\nAnalyzing bit patterns...")
    m1_bits = bin(mystery1)[2:]
    m2_bits = bin(mystery2)[2:]
    print(f"Mystery1 bit length: {len(m1_bits)}")
    print(f"Mystery2 bit length: {len(m2_bits)}")

    # Look for patterns in the bits
    common_prefix = 0
    for b1, b2 in zip(m1_bits, m2_bits):
        if b1 == b2:
            common_prefix += 1
        else:
            break
    print(f"Common prefix bits: {common_prefix}")


def check_special_cases():
    n, e = read_public_key(public_key_pem)
    # Check if related to Wiener's attack
    if e > n:
        print("Possible vulnerability to Wiener's attack")
    # Check for small prime differences
    diff = abs(mystery1 - mystery2)
    if diff < 1000000:
        print("Small difference between mystery numbers")


def main():
    """Run all attempts to solve the challenge."""
    print("Starting RSA challenge analysis...")

    # Run all attempts
    attempt_direct_factorization()
    attempt_mathematical_relationships()
    analyze_bit_patterns()
    check_special_cases()

    print("\nAnalysis complete. Check the results above for potential solutions.")


if __name__ == "__main__":
    main()
