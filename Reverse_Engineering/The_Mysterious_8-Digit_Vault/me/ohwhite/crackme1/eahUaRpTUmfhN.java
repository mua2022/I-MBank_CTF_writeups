/*
 * Decompiled with CFR 0.152.
 */
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
