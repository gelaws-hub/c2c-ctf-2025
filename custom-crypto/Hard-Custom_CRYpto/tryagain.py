from base64 import b64decode, b64encode
import binascii

# The bytes we got from RSA decryption
mysterious_bytes = b'<\x86C,\x16*\x8d\xd6\xb1\xd3\x8a\x04p\x00\x83B\x1f\xf4{\xde}\xc5-:\xe6K^\xae\x00\x92\t\x91\x92\xcd{\x01_\xfdw|\xe7\x8f\xea)\x12\x9fkO\t\xb1\xdd7J\x02C\x0c9F$V\xc3\xa8\xba b\x870|\r\xef\xda\x0b_\xc7=1\xfc\xe5\x0e\xb30\t\xfdNxj\xdbU\x10B&\xa8\x08\xfe\xeaK\xab\x7f\x00\xb0\x80\xb3\xa0\xa1L\xec\x7f3[.\x08rU\x87t\xc4\x0b\xfcn\xcfq\x8c\xb2\xe6\xa9\x17\xc9\xf8'

def analyze_bytes():
    """Analyze the mysterious bytes in various ways"""
    print("1. Basic Analysis:")
    print(f"Length: {len(mysterious_bytes)} bytes")
    print(f"Hex: {mysterious_bytes.hex()}")
    print(f"As integer: {int.from_bytes(mysterious_bytes, 'big')}")
    
    print("\n2. Try different encodings:")
    # Try base64
    try:
        print("\nAs Base64:", b64encode(mysterious_bytes).decode())
        # Try to decode as base64
        print("Decode as Base64:", b64decode(mysterious_bytes))
    except:
        print("Not valid Base64")
    
    # Try ASCII interpretation
    print("\nASCII interpretation:")
    for b in mysterious_bytes:
        if 32 <= b <= 126:  # printable ASCII range
            print(chr(b), end='')
        else:
            print('.', end='')
            
    # Look for patterns
    print("\n\n3. Pattern Analysis:")
    counts = {}
    for b in mysterious_bytes:
        counts[b] = counts.get(b, 0) + 1
    print("Byte frequency:", sorted(counts.items(), key=lambda x: x[1], reverse=True)[:10])
    
    # Check for common patterns
    print("\n4. Check for known patterns:")
    # Look for flag format patterns
    if b'flag{' in mysterious_bytes or b'FLAG{' in mysterious_bytes:
        print("Found flag format!")
    
    # Try XOR with common values
    print("\n5. Common XOR attempts:")
    for key in [0x00, 0xFF, 0x13, 0x37, 0x42]:
        xored = bytes([b ^ key for b in mysterious_bytes])
        if any(32 <= b <= 126 for b in xored[:20]):  # Check if result looks printable
            print(f"\nXOR with 0x{key:02x}:")
            print(xored[:50])  # Show first 50 bytes

def try_rolling_xor():
    """Try rolling XOR with different keys"""
    print("\n6. Rolling XOR attempts:")
    # Try rolling XOR with small keys
    for key_length in range(1, 5):
        for key in range(256):
            xored = bytes([b ^ (key + i % key_length) for i, b in enumerate(mysterious_bytes)])
            # Check if result looks like text
            if all(32 <= b <= 126 for b in xored[:10]):  # First 10 bytes are printable
                print(f"\nPossible match with key_length={key_length}, key={key}:")
                print(xored[:50])

def try_custom_combinations():
    """Try custom combinations specific to this CTF"""
    print("\n7. Custom attempts:")
    # Try XOR with every byte from the public key
    from cryptography.hazmat.primitives.serialization import load_pem_public_key
    pub_key_pem = """-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFtbd+YEu3jvG+i7GIy7mEKBP21r
pT5khbk/qCytiSNrPu2BRU0ZMBPkRvgd/2KqtZ5grbO0DgrkQj2YhVn7DcbEGIV5
Tzby6IyvQSQWzEcG8qJoj3QZ06V1RdgBRtG8fdZl0WX425N5M+bPAYwyeieAig5O
rBiQYqXc56lTzoXhAgMBAAE=
-----END PUBLIC KEY-----"""
    
    # Extract the first few bytes of n as potential keys
    n = load_pem_public_key(pub_key_pem.encode()).public_numbers().n
    potential_keys = []
    temp = n
    while temp > 0:
        potential_keys.append(temp & 0xFF)
        temp >>= 8
    
    for key in potential_keys[:10]:  # Try first 10 bytes
        xored = bytes([b ^ key for b in mysterious_bytes])
        if any(32 <= b <= 126 for b in xored[:20]):
            print(f"\nXOR with byte from n (0x{key:02x}):")
            print(xored[:50])

if __name__ == "__main__":
    print("Starting analysis of mysterious bytes...")
    analyze_bytes()
    # try_rolling_xor()
    try_custom_combinations()