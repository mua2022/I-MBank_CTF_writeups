def generate_serial(name):
    """
    Generates serial for Crackme.jar based on reverse-engineered algorithm
    
    Algorithm:
    1. Calculate key = len(name) * 1337
    2. Convert each digit of key to corresponding letter (0=a, 1=b, ..., 9=j)
    3. Return concatenated letters as serial
    """
    # Alphabet mapping (0-9 to a-j)
    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    
    # Calculate key
    key = len(name) * 1337
    key_str = str(key)
    
    # Generate serial by converting digits to letters
    serial = ""
    for digit in key_str:
        index = int(digit)
        serial += alphabet[index]
    
    return serial

# Test with the required name
name = "imbankctf2022"
serial = generate_serial(name)
print(f"Name: {name}")
print(f"Serial: {serial}")
print(f"Flag: flag{{{serial}}}")

# Additional verification
print(f"\nVerification:")
print(f"Name length: {len(name)}")
print(f"Key calculation: {len(name)} * 1337 = {len(name) * 1337}")
print(f"Digit conversion: {[int(d) for d in str(len(name) * 1337)]} -> {serial}")