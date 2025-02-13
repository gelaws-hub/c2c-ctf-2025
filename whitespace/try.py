# # Read the file content
# with open('whitespace.txt', 'r', encoding='utf-8') as file:
#     content = file.read()

# Read the file content
with open('whitespace.txt', 'r', encoding='utf-8') as file:
    lines = file.readlines()

# Extract trailing whitespace counts
trailing_spaces = []
for line in lines:
    # Remove newline characters and count trailing spaces
    stripped_line = line.rstrip('\n')
    trailing_count = len(stripped_line) - len(stripped_line.rstrip(' '))
    trailing_spaces.append(trailing_count)

# Print the trailing space counts
print("Trailing Space Counts:", trailing_spaces)

# Convert counts to characters (1 = A, 2 = B, ..., 26 = Z)
decoded_message = ''.join([chr(ord('A') + count - 1) if 1 <= count <= 26 else '?' for count in trailing_spaces])

# Print the decoded message
print("Decoded Message:", decoded_message)