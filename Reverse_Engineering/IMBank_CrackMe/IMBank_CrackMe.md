# IMBank CrackMe

## Description

Deep in the vaults of ImBank, a mysterious developer left behind a small program to guard access to the flag The catch? This program doesn’t ask for your password — instead, it wants your Name and a Serial.

You already know the name it’s expecting: imbankctf2022

But the Serial? That’s the secret sauce.

Here’s the deal:

- If you enter the correct Serial, the program will reward you with a big grin and say: "Good job, now write a guide and code a keygen!!!"
- If you’re wrong, you’ll be shut down with: "Nope, try again"

**Your mission: reverse-engineer the application to figure out how it generates the Serial from the Name. Once you find it, wrap it in the flag format:** 

flag{serial_here}

Example: If the Serial were `abcdefg`, your flag would be:

> flag{abcdefg}

## Solution

### Step 1: Extraction and Decompilation

#### *1.1 Extract the JAR File*

```bash
jar -xf Crackme.jar
```
    

- This extracts the contents:

- `Crackme.class` - Main application class

- `a.class`, `b.class`, `c.class` - Obfuscated logic classes

- `META-INF/` - Metadata directory

#### *1.2 Decompile Class Files Using CFR*

- Download CFR decompiler

```bahs
wget https://github.com/leibnitz27/cfr/releases/download/0.152/cfr-0.152.jar
```

```bash
mv cfr-0.152.jar cfr.jar
```

#### *1.3 Decompile each class*

```bash
java -jar cfr.jar Crackme.class > Crackme.java
java -jar cfr.jar a.class > a.java
java -jar cfr.jar b.class > b.java
java -jar cfr.jar c.class > c.java
```

### Step 2: Code Analysis

#### *2.1 Main Application (`Crackme.java`)*

```java
public class Crackme {
    public static void main(String[] object) {
        object = new JFrame("Crackme - Code by CRY971C");
        // ... GUI setup code
        ((JFrame)object).getContentPane().add(new c((JFrame)object));
    }
}
```

- Analysis: Creates a GUI window and adds component `c` (which is the main panel).

#### *2.2 GUI Panel (`c.java`)*

```java
public final class c extends JPanel {
    JTextField a;  // Name input field
    JTextField b;  // Serial input field
    JButton button; // Verify button

    public c(JFrame jFrame) {
        // ... GUI component setup
        this.button.addActionListener(new a(this, jFrame));
    }
}
```

- Analysis: Creates input fields for Name/Serial and attaches action listener `a` to the verify button.

#### *2.3 Action Listener (`a.java`) - CRITICAL LOGIC*

```java
public final void actionPerformed(ActionEvent object) {
    object = new b();
    this.a.b = this.a.a.getText();  // Get name text
    String string = this.a.c = this.a.b.getText();  // Get serial text

    String string2 = this.a.b;  // Name string
    ((b)v1).key = Integer.toString(string2.length() * 1337);  // KEY CALCULATION
    
    ((b)object).a = "";
    int n = 0;
    while (n <= 25) {
        if (n == ((b)object).key.length()) break;
        // SERIAL GENERATION: Convert each digit to corresponding letter
        ((b)object).a = ((b)object).a.concat(
            ((b)object).a[Integer.parseInt(((b)object).key.substring(n, n + 1))]
        );
        ++n;
    }
    
    // VALIDATION: Compare generated serial with user input
    if (string.equals(string2)) {
        JOptionPane.showMessageDialog(jFrame, "Good job...");
    } else {
        JOptionPane.showMessageDialog(jFrame, "Nope, try again!");
    }
}
```

#### *2.4 Data Structure (`b.java`)*

```java
final class b {
    String key;  // Calculated key
    String a;    // Generated serial
    String[] a = new String[]{"a","b","c","d","e","f","g","h","i","j","k","l",
                             "m","n","o","p","q","r","s","t","u","v","w","x","y","z"};
}
```

- Analysis: Contains alphabet array used for serial generation.

### Step 3: Algorithm Explanation

#### *3.1 Serial Generation Process*

- Input: Name string (e.g., "imbankctf2022")

- Key Calculation: key = name.length() * 1337

- Serial Generation: For each digit in the key string:

    - Convert digit to integer

    - Use as index to get corresponding letter from alphabet array

    - Concatenate letters to form final serial

#### *3.2 Mathematical Representation*

```java
serial = ""
key = str(len(name) * 1337)

for digit in key:
    index = int(digit)
    serial += alphabet[index]
```

#### *3.3 Example Calculation*

> For name = "imbankctf2022":

```java
Length = 13

Key = 13 × 1337 = 17381

Serial generation:

    Digit '1' → alphabet[1] = "b"

    Digit '7' → alphabet[7] = "h"

    Digit '3' → alphabet[3] = "d"

    Digit '8' → alphabet[8] = "i"

    Digit '1' → alphabet[1] = "b"

Final serial: "b" + "h" + "d" + "i" + "b" = "bhdib"
```

### Step 4: Python Keygen Script

```python
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
```

#### Test with the required name

```
name = "imbankctf2022"
serial = generate_serial(name)
print(f"Name: {name}")
print(f"Serial: {serial}")
print(f"Flag: flag{{{serial}}}")
```

#### Additional verification

```
print(f"\nVerification:")
print(f"Name length: {len(name)}")
print(f"Key calculation: {len(name)} *1337 = {len(name)* 1337}")
print(f"Digit conversion: {[int(d) for d in str(len(name) * 1337)]} -> {serial}")
```

#### *4.1 Script Output*

> Name: imbankctf2022
> Serial: bhdib
> Flag: flag{bhdib}


#### Verification:


> Name length: 13
> Key calculation: 13 * 1337 = 17381
> Digit conversion: [1, 7, 3, 8, 1] -> bhdib

#### *4.2 Universal Keygen Script*

```python
#!/usr/bin/env python3

"""
Crackme.jar Key Generator
Usage: python keygen.py <name>
"""

import sys

def main():
    if len(sys.argv) != 2:
        print("Usage: python keygen.py <name>")
        sys.exit(1)

    name = sys.argv[1]
    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    
    key = len(name) * 1337
    serial = ''.join(alphabet[int(d)] for d in str(key))
    
    print(f"Name: {name}")
    print(f"Serial: {serial}")
    print(f"Flag: flag{{{serial}}}")

if **name** == "**main**":
    main()
```

### Step 5: Verification Process

#### *5.1 Manual Verification*

- Run the application:

  ```java
  java -jar Crackme.jar
  ```

Enter:

```
Name: imbankctf2022

Serial: bhdib
```

> Expected output: "Good job, now write a guide and code a keygen!!"

#### *5.2 Algorithm *Validation*

The algorithm works because:

- It's deterministic (same input always produces same output)

- Uses simple mathematical operations

- Maps digits 0-9 to letters a-j consistently

- The validation compares generated serial with user input

### Step 6: Final Answer

For name "imbankctf2022", the serial is: `flag{bhdib}`

And so this is the flag:

> flag{bhdib}

_**This was determined by:**_

- Reverse engineering the Java bytecode

- Analyzing the serial generation algorithm

- Understanding that:
  - Key = name length × 1337
  - Each digit of key maps to a letter (0=a, 1=b, ..., 9=j)
  - Calculating: len("imbankctf2022") = 13 → 13 × 1337 = 17381 → "bhdib"

The Python script provides a universal keygen for any name input to the Crackme application.
