encoded = "U_RTHZ]^lUZUGJl\\]VlJVRA@l\\Ul_VTRPJlG\\lWRGVN"
key = 51

decoded_chars = []
for char in encoded:
    ascii_val = ord(char)
    # Subtract the key
    new_ascii = ascii_val - key
    # Wrap around if below 32
    while new_ascii < 32:
        new_ascii += 95
    decoded_chars.append(chr(new_ascii))

decoded_string = ''.join(decoded_chars)
print(decoded_string)