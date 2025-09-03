# The Mysterious 8 digit vault

## Description
Welcome, Agent! You've stumbled upon a mysterious 8-digit vault that guards a secret flag. The system expects an 8-digit key, but there's more to it than meets the eye.

    If you enter the wrong key, it will silently reject you.

    If you enter the correct key, it will reveal the flag.

Example Flag Format: flag{12345678}

⚠️ Warning: The vault is picky—it wants exactly 8 digits, no more, no less!

## Solution

### Step 1: Extract the Provided JAR File

You are given a file named Mysterious.jar. Start by extracting its contents:
bash

jar xf Mysterious.jar

This will create a directory structure. Inside, you find a folder named me/ohwhite/crackme1/ containing:

    eahUaRpTUmfhN.class (compiled Java bytecode)

    eahUaRpTUmfhN.java (Java source code)

### Step 2: Analyze the Source Code

Examine the Java file eahUaRpTUmfhN.java:
java

package me.ohwhite.crackme1;

import java.util.ArrayList;
import java.util.Scanner;

public class eahUaRpTUmfhN {
    static ArrayList<Integer> jOloNtfoGORHw = new ArrayList();
    static ArrayList<String> ALLCxOoknIHmZ = new ArrayList();

    public static void main(String[] SqbnompFlDpDc) {
        eahUaRpTUmfhN.CEQfFrKZdrnMK();
        eahUaRpTUmfhN.bzoLCpGWzMFbU();
        System.out.println(ALLCxOoknIHmZ.get(0));
        Scanner lqTIpsmUOSJks = new Scanner(System.in);
        try {
            int hVGPdJleexhgA = lqTIpsmUOSJks.nextInt();
            if (hVGPdJleexhgA != jOloNtfoGORHw.get(0)) {
                return;
            }
        }
        catch (Exception sqOKMTghgGjWK) {
            System.exit(-7);
        }
        System.out.println(ALLCxOoknIHmZ.get(1));
    }

    public static void bzoLCpGWzMFbU() {
        jOloNtfoGORHw.add(5256);
    }

    public static void CEQfFrKZdrnMK() {
        ALLCxOoknIHmZ.add("Enter an 8 digit code: ");
        ALLCxOoknIHmZ.add("You have successfully logged in!");
    }
}

Key Observations:

    The code initializes two ArrayList objects: one for integers (jOloNtfoGORHw) and one for strings (ALLCxOoknIHmZ).

    The bzoLCpGWzMFbU() method adds the integer 5256 to jOloNtfoGORHw.

    The CEQfFrKZdrnMK() method adds two strings: the prompt and the success message.

    The main method prints the prompt, reads an integer input, and checks if it equals 5256 (the first element in jOloNtfoGORHw). If it matches, it prints the success message.

### Step 3: Understand the Discrepancy

The challenge requires an 8-digit key, but the code compares against 5256 (a 4-digit number). However, the program uses nextInt(), which ignores leading zeros. Thus, inputting 5256 or 00005256 both work, as they are parsed as the same integer.

### Step 4: Run the Program

To test, you need to run the program with the correct package structure. Since the class is in the package me.ohwhite.crackme1, ensure the directory structure exists:
bash

mkdir -p me/ohwhite/crackme1
mv eahUaRpTUmfhN.class me/ohwhite/crackme1/

Then, run from the root directory:
bash

java me.ohwhite.crackme1.eahUaRpTUmfhN

When prompted:
text

Enter an 8 digit code:

Enter 00005256 (or 5256), and you will see:
text

You have successfully logged in!

### Step 5: Determine the Flag

Since the challenge demands an 8-digit key, you must pad 5256 to 8 digits with leading zeros: 00005256. The flag follows the format flag{00005256}.
Final Answer

Flag: flag{00005256}
Why This Works

    The code validates the integer value 5256, not the string length. However, to meet the "8-digit" requirement, you pad the key to 00005256.

    The program accepts any input that parses to 5256 (e.g., 5256, 005256, 00005256), but only 00005256 is exactly 8 digits.
