import itertools
import subprocess

# Define possible moves
moves = ['1', '2', '3', '4']

# Generate all 4-digit movement sequences
for sequence in itertools.product(moves, repeat=4):
    move_sequence = ''.join(sequence)

    # Properly format the command for Windows
    process = subprocess.run(
        ['cmd', '/c', 'huskyrescue.exe'],
        input=move_sequence,
        text=True,
        capture_output=True
    )

    # Print the tested sequence
    print(f"Trying: {move_sequence}")
    print(process.stdout)  # Print the program's output
    print("-" * 50)  # Separator for readability

    # Check if the output contains a flag
    if "flag" in process.stdout.lower():
        print(f"\n[+] Flag found! ✅ Sequence: {move_sequence}")
        print(process.stdout)
        break
