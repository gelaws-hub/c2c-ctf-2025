from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes, inverse
import binascii

# Given mystery numbers
p = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
q = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353

# Extract public key (N, e)
public_key_pem = """-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFtbd+YEu3jvG+i7GIy7mEKBP21r
pT5khbk/qCytiSNrPu2BRU0ZMBPkRvgd/2KqtZ5grbO0DgrkQj2YhVn7DcbEGIV5
Tzby6IyvQSQWzEcG8qJoj3QZ06V1RdgBRtG8fdZl0WX425N5M+bPAYwyeieAig5O
rBiQYqXc56lTzoXhAgMBAAE=
-----END PUBLIC KEY-----"""

rsa_key = RSA.import_key(public_key_pem)
N = rsa_key.n
e = rsa_key.e

# Verify if N matches p * q
assert N == p * q, "N does not match the product of p and q!"

# Compute φ(N) (Euler's totient function)
phi = (p - 1) * (q - 1)

# Compute private exponent d
d = inverse(e, phi)

# Given ciphertext (hex string)
ciphertext_hex = "542ab37323abff2b115ea77c9e2307f21317610b06e666f3d465b02fc1c496dcf1045da29d8cc8eb3c848339178a6a8781d9dc9f67bc07bd28f25d0bc10a073cffc14a13201375e965e246c074753bae2ced8e0ff4c1c5addc050f4b861e055f0e20a2b72eee48958113beac53d6f09805b99c4009c65bde71ba7bee5511c996"

# Convert ciphertext to integer
ciphertext_int = int(ciphertext_hex, 16)

# Decrypt
plaintext_int = pow(ciphertext_int, d, N)

# Convert back to bytes
plaintext_bytes = long_to_bytes(plaintext_int)

# **Remove PKCS1 Padding**
if plaintext_bytes.startswith(b'\x00\x02'):  # Check if it's PKCS1 padded
    plaintext_bytes = plaintext_bytes.split(b'\x00', 2)[-1]  # Remove padding

# Debug: Print cleaned raw bytes
print("Cleaned Raw Bytes:", plaintext_bytes)

# Try decoding
try:
    plaintext = plaintext_bytes.decode('utf-8')
    print("Decrypted Flag:", plaintext)
except UnicodeDecodeError:
    print("UTF-8 decoding failed. Trying ASCII...")
    print("ASCII:", plaintext_bytes.decode('ascii', errors='ignore'))
