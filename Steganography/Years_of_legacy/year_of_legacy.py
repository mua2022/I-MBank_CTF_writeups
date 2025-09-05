def xor_decrypt(ciphertext, key):
    decrypted = []
    for char in ciphertext:
        decrypted_char = chr(ord(char) ^ key)
        decrypted.append(decrypted_char)
    return ''.join(decrypted)

def main():
    print("XOR Decryption Tool")
    print("-------------------")
    
    # Ask for ciphertext input
    ciphertext = input("Enter the ciphertext to decrypt: ").strip()
    
    # Ask for XOR key (decimal)
    while True:
        try:
            key = int(input("Enter the XOR key (decimal number, e.g., 51): "))
            break
        except ValueError:
            print("Invalid key! Please enter a number (e.g., 51).")
    
    # Decrypt and print
    plaintext = xor_decrypt(ciphertext, key)
    print("\nDecrypted Message:")
    print("-------------------")
    print(plaintext)

if __name__ == "__main__":
    main()
