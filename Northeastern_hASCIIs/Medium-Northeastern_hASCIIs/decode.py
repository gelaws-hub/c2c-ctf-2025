def try_decode(first_char, encoded_sums):
    # Initialize the decoded flag with the first character
    decoded = [first_char]
    
    # Try to decode the rest of the flag
    for sum_val in encoded_sums:
        # We know: current_char + next_char = sum_val
        # Therefore: next_char = sum_val - current_char
        next_char = chr(sum_val - ord(decoded[-1]))
        decoded.append(next_char)
    
    return ''.join(decoded)

# The encoded sums from output.txt
encoded = [210,222,223,213,215,209,192,207,210,195,210,212,211,217,204,196,203,219,229,219,196,160,148,150,140,146]

# Try printable ASCII characters as potential first characters
for first_char in range(32, 127):
    try:
        result = try_decode(chr(first_char), encoded)
        # Check if result contains only printable characters
        if all(32 <= ord(c) <= 126 for c in result):
            print(f"Starting with '{chr(first_char)}': {result}")
    except:
        continue