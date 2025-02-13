def extract_whitespace_instructions(text):
    """
    Extract whitespace instructions following Whitespace language rules
    Space = [S]
    Tab = [T]
    Newline = [N]
    """
    instructions = []
    for line in text.split('\n'):
        if line.rstrip() != line:
            # Get trailing whitespace
            whitespace = line[len(line.rstrip()):]
            # Convert to readable format
            instruction = ''.join('[S]' if c == ' ' else '[T]' if c == '\t' else '[N]' for c in whitespace)
            instructions.append(instruction)
    return instructions

def parse_whitespace(text):
    """
    Parse whitespace code following basic Whitespace language rules
    """
    stack = []
    output = []
    
    # Extract just the whitespace characters from trailing spaces
    whitespace = ''
    for line in text.split('\n'):
        if line.rstrip() != line:
            whitespace += line[len(line.rstrip()):]
    
    # Parse as Whitespace language commands
    i = 0
    while i < len(whitespace):
        if whitespace[i] == ' ':  # Space
            if i + 1 < len(whitespace):
                if whitespace[i + 1] == ' ':  # Stack manipulation
                    value = 0
                    i += 2
                    # Parse number
                    while i < len(whitespace) and whitespace[i] in ' \t':
                        value = value * 2 + (1 if whitespace[i] == '\t' else 0)
                        i += 1
                    stack.append(value)
                elif whitespace[i + 1] == '\t':  # Arithmetic
                    i += 2
        elif whitespace[i] == '\t':  # Tab
            if i + 1 < len(whitespace):
                if whitespace[i + 1] == ' ':  # Output
                    if stack:
                        val = stack.pop()
                        if 32 <= val <= 126:  # Printable ASCII
                            output.append(chr(val))
                        else:
                            output.append(f"<{val}>")
                i += 2
        i += 1
    
    return ''.join(output)

# Text from file
text = """Greetings, inquisitive minds. We stand on the threshold of a new era, where the dance of ephemeral illusions in code reveals its silent secrets to those who dare listen.
Since our earliest transmissions, a singular question echoed through the labyrinth of prime expansions and steganographic ciphers: Who among you can unravel the hidden
shapes of knowledge? Now, in this world flooded by signals and ephemeral illusions, your quest continues. Remain vigilant as you sift through cryptic thematics and
illusions woven into the undercurrents of digital transmissions. Follow the faint variations in frequency, the subtle codes concealed within tangled graphs, and the
melodic residue of quantum fluctuations. Observe the geometry of truth as it coils around seemingly random artifacts. Seek the subtle anomalies in plain sightâ€"each pixel,
each number a clue chiseled for the discerning mind.	 		
	  	       	       	    	 	      	       	     	  
We invite you to shed the comfort of surface-level assumptions and delve deeper, guided by reason and unwavering
curiosity. Each step forward demands both precision and adaptability, for every cipher might shift under the weight of new revelations. Your purpose is not simply to
harvest solutions, but to understand the tapestry of interwoven complexities shaping this puzzle. The ultimate key lies in your ability to see beyond illusions, forging
your path with resilience and insight. Let whispers of code guide you through encrypted corridors, propelled by your resourcefulness. Embrace the friction between chaos
and order, for therein lies the spark igniting ingenious ideas. Stand firm against doubt, and let each solved fragment strengthen your conviction. The digital night beckons.
Listen to the hush of hidden signals, and ascend if you dare. The door stands open, awaiting those bold and keen enough to walk through.
 	     		 	 	     	     	   	     	      
We continue to watch, record and observe.  	      	  	   	 
Heed the whisper of the unknown, and let enlightenment guide your next step.
      	    	      	     	   	       	       		   	      
The puzzle awaits you.       	  	       	   	  	  	 
Until we meet again.  	     	  	    	     	       	       	  
  		     	       	      	 	       	     	       	     
      	  	      	     	       	  	    		    	   
      	       	      	     	      	   		     	    	 """

# Extract and display instructions
print("Whitespace Instructions:")
instructions = extract_whitespace_instructions(text)
for i, inst in enumerate(instructions):
    print(f"Line {i+1}: {inst}")

print("\nAttempting to parse as Whitespace code:")
result = parse_whitespace(text)
print("Output:", result)