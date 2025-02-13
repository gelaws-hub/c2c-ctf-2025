from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes
import base64

# Load the public key
with open("public_key.pem", "r") as key_file:
    public_key = RSA.import_key(key_file.read())

n = public_key.n
e = public_key.e

print(f"Modulus (n): {n}")
print(f"Public Exponent (e): {e}")

# Mystery numbers
mystery1 = 9255148449636418216385264245495380482495319132180584397583467416355769839562706084794458545102351040157147419871853545909043164883810472180514610420641921
mystery2 = 6931631282889972183327683199072306716240322338997374907010572707887059508933369990642023077374138000177093679758882336300263254384172980207042097698432353

# Check if mystery numbers are factors of n
if n % mystery1 == 0:
    print(f"mystery1 is a factor of n: {mystery1}")
    p = mystery1
    q = n // p
    print(f"p: {p}")
    print(f"q: {q}")
elif n % mystery2 == 0:
    print(f"mystery2 is a factor of n: {mystery2}")
    p = mystery2
    q = n // p
    print(f"p: {p}")
    print(f"q: {q}")
else:
    print("Neither mystery1 nor mystery2 is a factor of n.")
    exit()

# Compute phi(n) and d
phi = (p - 1) * (q - 1)
d = pow(e, -1, phi)
print(f"Private Exponent (d): {d}")

# Decrypt the ciphertext
ciphertext = int("542ab37323abff2b115ea77c9e2307f21317610b06e666f3d465b02fc1c496dcf1045da29d8cc8eb3c848339178a6a8781d9dc9f67bc07bd28f25d0bc10a073cffc14a13201375e965e246c074753bae2ced8e0ff4c1c5addc050f4b861e055f0e20a2b72eee48958113beac53d6f09805b99c4009c65bde71ba7bee5511c996", 16)
plaintext = pow(ciphertext, d, n)
plaintext_bytes = long_to_bytes(plaintext)

print(f"Decrypted Plaintext (raw): {plaintext_bytes}")

# Try removing PKCS#1 v1.5 padding
def remove_pkcs1_v1_5_padding(data):
    if data[0:2] != b'\x00\x02':
        raise ValueError("Invalid PKCS#1 v1.5 padding")
    idx = data.find(b'\x00', 2)
    if idx == -1:
        raise ValueError("Invalid PKCS#1 v1.5 padding")
    return data[idx+1:]

try:
    unpadded_data = remove_pkcs1_v1_5_padding(plaintext_bytes)
    print(f"Unpadded Plaintext: {unpadded_data}")
except ValueError as e:
    print(f"Padding Error: {e}")
    unpadded_data = plaintext_bytes

# Try decoding as Base64
try:
    decoded = base64.b64decode(unpadded_data)
    print(f"Base64 Decoded: {decoded}")
except:
    print("Not Base64 encoded.")

# Try decoding as hex
try:
    decoded_hex = bytes.fromhex(unpadded_data.hex())
    print(f"Hex Decoded: {decoded_hex}")
except:
    print("Not hex encoded.")

# Try XOR decryption
def xor_decrypt(data, key):
    return bytes([b ^ key for b in data])

for key in range(256):
    decrypted = xor_decrypt(unpadded_data, key)
    if b"CTF{" in decrypted:
        print(f"XOR Decrypted with key {key}: {decrypted}")
        break

# Check for flag format
if b"CTF{" in plaintext_bytes:
    print(f"Flag found: {plaintext_bytes}")
else:
    print("No flag found in the decrypted plaintext.")