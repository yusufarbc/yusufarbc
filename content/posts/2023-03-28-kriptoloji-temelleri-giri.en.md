---
title: "Cryptology Fundamentals: Introduction"
date: 2023-03-28
draft: false
---

---

### Cryptology Fundamentals:#1 Introduction

![](https://cdn-images-1.medium.com/max/800/1*uorh6uYHB7AdEDpEbCO_Tw.png)

Hello, in this first article of the cryptology basics series, I will talk about what cryptology is, traditional encryption techniques and how to create a strong password.

---

### Cryptology Overview

In this type of science, called encryption science, things that are intended to be kept secret are encrypted using different techniques and methods within a system. At the same time, the science of cryptology also works to prevent encrypted messages from being deciphered by unwanted people.

![](https://cdn-images-1.medium.com/max/800/1*hjisKMmnXD1yQQXQ3IOFjA.png)

Cryptology is the science of passwords. Cryptography deals with information security, Cryptoanalysis is the exact opposite of cryptography, in other words, breaking secure information. Cryptoanalysts generally work based on decryption. Cryptology is a [mathematics](https://tr.wikipedia.org/wiki/Matematik "Mathematics") science and is generally based on number theory.

**Cryptography** is the science of secret writing for the purpose of concealing the meaning of a message.

**Cryptanalysis** is the science of breaking and deciphering crypto systems.

---

### Historical Development

The first cryptologist was an Egyptian scribe who lived 4000 years ago. He created hieroglyphs in an encrypted way while telling the story of his master's life, and some of the hieroglyphs had never been used before.

Although cryptography began this way, it developed almost nothing for the first 3000 years of its life. It was used in the most basic way in different parts of the world, but with the collapse of civilizations, the next steps could not be taken.

In China, the leading civilization of the period, cryptography could not be developed at all because it was very difficult to even write without encryption.

Later (5th — 6th century BC), cryptography entered the military field due to the need for secrecy in military intelligence. The first cryptographers in the military field were the Spartans.

In the 9th century, [Kindî](https://tr.wikipedia.org/wiki/Kind%C3%AE "Kindî") was the first person to discover frequency analysis by developing the single-alphabet substitution encryption method applied in the science of cryptology. Kindi was the first person to discover frequency analysis by developing the single-alphabet substitution encryption method discovered and applied by Julius Caesar (50 BC) in the field of cryptology.

---

### Traditional Encryption Techniques

Historically, many basic encryption algorithms have been developed and used. Nowadays, with the developing computer technology, it has become very easy to crack these passwords. Now let's talk in detail about these encryption techniques and their weaknesses.

#### Substitution Password

One of the simplest methods for encrypting a text, the substitution cipher has been used many times throughout history and is a good example of basic cryptography.  
The idea is very simple, we replace each letter of the alphabet with another. For example;  
A → k  
B → d  
C → w  
In this example, *ABBA* will be encrypted as *kddk*.

Let's assume that we choose completely randomly the substitution table in which we determine which letter corresponds to which letter. The substitution table becomes the key to this encryption system. As always in symmetric cryptography, the key must be kept secret, that is, distributed securely between A and B. To get detailed information about Symmetric-Asymmetric cryptography, you can look at our previous [article](https://pwnlab.me/tr-kriptografiye-giris/).  
 As you can imagine, this password is quite easy to crack. At this point, we can benefit from classical cryptanalysis techniques.

#### First Attack: Brute Force or Comprehensive Key Search

Brute force attacks are based on a simple concept: The attacker has the ciphertext and a short piece of plaintext (e.g. the header of the ciphertext). In this case, it decrypts the ciphertext by trying all possible keys. If the resulting plaintext matches the short piece of plaintext, it has found the correct key. In practice, a brute force attack can be more complex because wrong keys can yield false, positive results.

It is important to note that a brute force attack against symmetric passwords is always possible in principle. Whether it is applicable in practice depends on the number of possible keys that exist for a given cipher. If it takes too much time to test all the keys, i.e. several decades, the password is safe from a brute force attack.

Find the key space of the substitution cipher.Let's break it down: When choosing the letter that will replace the first letter A, we choose a random letter from the 26 letters of the alphabet (we chose k in the example above). The equivalent of the next alphabet letter B is chosen randomly from the remaining 25 letters, etc. Therefore, the key space of the substitution cipher = 26 · 25 · ….. · 3 · 2 · 1 = 26! It is possible.

Even with hundreds of thousands of high-power computers, such a search would take several decades. Therefore, we can consider the substitution password to be secure. However, this is wrong because there is another, stronger attack.

#### Second Attack: Letter Frequency Analysis

Frequency Analysis was proposed by Al-Kindi in the 9th century. It is based on repetitions in the language.

For any language, the frequency of use of letters in that language is calculated. The table containing the frequency of use of letters in the English language is given below.

![](https://cdn-images-1.medium.com/max/800/0*9LADpthWZ361CIFT.png)

As can be seen from the table, the most frequently used letter in the English language is the letter 'E', and the second most frequently used letter is the letter 'T'. If the ciphertext is long, the most visible letter most likely corresponds to E in the plaintext, the second most visible letter most likely corresponds to T, and so on.

The substitution cipher can be easily cracked by such an analytical attack. The biggest weakness of the password is that every character of the plaintext is replaced with the same character every time.

#### Caesar Code

The Caesar cipher, also known as the shift cipher, is actually a special case of the substitution cipher. The shift cipher itself is extremely simple: We shift each letter of the plaintext by a fixed number of positions in the alphabet. For example, if we shift 3 positions, d instead of A, e instead of B, etc. would come. The only problem arises towards the end of the alphabet: what should we do with X, Y, Z? In this case, we go back to the beginning. In this case, X->a is replaced by Y->b and Z->c.  
 Historically, Julius Caesar used this cipher with a three-position shift. This is where the name Caesar cipher comes from.  
 For the mathematical expression of the cipher, the letters of the alphabet are numerically encoded as shown in the table below.

![](https://cdn-images-1.medium.com/max/800/0*0ATssVLmJQigP6cg.png)

Let the key be k = 17 and the plaintext is:

Let ATTACK = x1,x2,…,x6 = 0,19,19,0,2,10.s

Ciphertext is calculated as follows:

y1,y2,…,y6 = 17,10,10,17,19,1 = rkkrtb

Like the substitution password, the shift password is not secure at all. Likewise, we have two ways to crack this password:  
 1. Since the key space consists of 26 keys, we can crack the password of a given ciphertext by brute force by trying to decrypt it with all 26 possible keys. If the resulting plaintext is readable, we have found the key.  
 2. Frequency analysis can be used as in the substitution cipher.

#### Vigenere Cipher

Vigenere encryption, a simple form of multi-alphabet encryption, is an improvement of the Caesar encryption algorithm based on single-alphabet shift and substitution encryption methods. While Caesar cipher uses only one alphabet for shift and substitution operations, Vigenere cipher uses more than one alphabet. Thus, different letters emerge as a result of encrypting the same letters in the message to be encrypted.

![](https://cdn-images-1.medium.com/max/800/0*QLwvLTeM5X8wzRbJ)

In the encryption method, first the key to be used during the encryption process is selected. The first letter of the message to be encrypted is shifted in proportion to the order of the first letter of the key value in the alphabet and the encrypted letter is obtained. According to the order of each letter in the key value, each letter in the message to be encrypted is encrypted with a different alphabet and the encryption process is completed.

#### Playfair Password

Proposed by Charles Wheatstone in 1854, Lord Playfair encouraged its use. It is aimed to create a stronger encryption by using more than one letter change.

A 5×5 table containing the key and the rest of the alphabet is used in encryption. Knowing the key and 4 simple rules is enough to use the system.

**Rules:**

1- If two letters are the same or there is only one letter left, an "X" letter is added after the first letter.

2- If two letters are on the same line, each letter is replaced with the letter to its right. (if a letter is at the end of a line, it is replaced with the letter at the beginning of the line)

3-If two letters are in the same column, each letter is replaced with the letter below it (if a letter is at the end of the column, it is replaced with the letter at the beginning of the column).

4-If they are not in the same column or row as the letter, the letters are considered as two corners of a rectangle and the letters are placed in the letter in the opposite corner.is replaced with . Let's explain with an example.

**our message: cryptology**  
**our password: keyword**

In this case, the table will be as shown in the figure. The key is written first. The same letters are used once. The rest of the 5×5 grid is filled with the remaining letters. To reduce the number to 25 letters, the letter I and J are placed in the same box.

![](https://cdn-images-1.medium.com/max/800/0*Vo-d0ErN-moY0kLR.jpg)
> *plaintext: for kr ip to lo ji*

> *ciphertext: becomes rf hq kz sc jx*

Binary letter exchange systems such as Plafair are not robust to two-letter frequency analysis. It is possible to crack short length letter changes with computers.

To crack the code, the frequency of occurrence of binary letter groups in the language is calculated and the message is then tried to be deciphered. This process may seem intimidating at first, but it is not difficult at all for a computer. A powerful computer system is capable of performing frequency analysis up to 8-letter

#### Affine Password

Affine encryption is a variant of mono-alphabetic substitution encryption methods. In the method, first a numerical value is assigned to each letter of the alphabet to be used, and these values ​​are kept in a table. This table must be present on both sides who want to communicate mutually.

![](https://cdn-images-1.medium.com/max/800/0*Z-cr2RD4JROMRDIQ)

For each character of the clear message to be encrypted, the number value corresponding to the character is sent as input to a simple mathematical function. This number value produced as output from the function, whatever character it represents in the table, forms the structure of the encrypted message.

#### Vernam Cipher

Although this method, which we can also call unbreakable encryption, is very reliable, it is quite difficult to implement in practice. In this method, a long string of random characters/bits is generated to be used one time. The plain text is XORed with a one-time pad to obtain the cipher text. XORing the ciphertext with the one-time pad returns the plaintext.

![](https://cdn-images-1.medium.com/max/800/0*6s6SoNCSSj-Sqs27.png)

As its name suggests, also known as one-time pad, it should be disposable and completely randomly produced. .Reusing the same key causes weakness in encryption and allows it to be broken.

This encryption technique provides perfect confidentiality because the ciphertext does not contain any information about the plaintext. Frequency analysis cannot be used in this technique. It is also possible to use a version that works on letters or characters instead of bits.

In addition, the fact that the key is very long (the same length as the message) and difficult to distribute makes it difficult to use this cipher in practice.

---

### Strong Password

The characteristics of a strong password are that it is both long and diverse. A simple password combination like “1234” can be easily guessed. Even if it is unpredictable, an internet hacker who attacks with the help of a program can easily obtain your password after a few hours of scanning (sometimes shorter). The diversity in our password, the length of our password and the inclusion of different characters in our password make it difficult and sometimes impossible to crack our password with methods such as brute force.

You can create a strong password yourself or get help from a tool: <https://passwordsgenerator.net/>

#### For a strong password:

1. Aim for maximum length
2. Do not create your password with only numbers or letters
3. Include extra characters in your password

#### Strong password examples

* Tu\9a;gMD
*hb!(Bz8XE
*5}JBqseLL
* `zhx!8BBF
*u$7sSsX3#

Of course, it can be difficult to remember such passwords. You can use password manager software for this.

---

In this article, I explained the subject of cryptology. In my next article, I will talk about cryptography and cryptanalysis. You can find the list of the series on my profile.