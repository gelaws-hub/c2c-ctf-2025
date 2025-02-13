from Crypto.PublicKey import RSA
from Crypto.Util.number import inverse, long_to_bytes

# Extract n and e from the public key
key = """-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFtbd+YEu3jvG+i7GIy7mEKBP21r
pT5khbk/qCytiSNrPu2BRU0ZMBPkRvgd/2KqtZ5grbO0DgrkQj2YhVn7DcbEGIV5
Tzby6IyvQSQWzEcG8qJoj3QZ06V1RdgBRtG8fdZl0WX425N5M+bPAYwyeieAig5O
rBiQYqXc56lTzoXhAgMBAAE=
-----END PUBLIC KEY-----"""
key = RSA.import_key(key)
n = key.n
e = key.e

# Mystery numbers
mystery1 = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
mystery2 = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353

# Check if mystery1 * mystery2 == n
if mystery1 * mystery2 == n:
    p = mystery1
    q = mystery2
else:
    raise ValueError("Mystery numbers do not factorize n")

# Compute phi(n)
phi = (p - 1) * (q - 1)

# Compute private exponent d
d = inverse(e, phi)

# Ciphertext
c = 0x542ab37323abff2b115ea77c9e2307f21317610b06e666f3d465b02fc1c496dcf1045da29d8cc8eb3c848339178a6a8781d9dc9f67bc07bd28f25d0bc10a073cffc14a13201375e965e246c074753bae2ced8e0ff4c1c5addc050f4b861e055f0e20a2b72eee48958113beac53d6f09805b99c4009c65bde71ba7bee5511c996

# Decrypt the ciphertext
m = pow(c, d, n)

# Convert the plaintext to bytes
flag = long_to_bytes(m)
print(flag)