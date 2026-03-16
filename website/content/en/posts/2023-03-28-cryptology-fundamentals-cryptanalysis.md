---
date: '2023-03-28'
draft: false
title: 'Cryptology Fundamentals: Cryptanalysis'
---

---

### Cryptology Fundamentals:#3 Cryptanalysis

![](https://cdn-images-1.medium.com/max/800/1*aZ11lfSR2DfxXotqqA4KhA.png)

Hello, in this article of the cryptology basics series, I will talk about what cryptanalysis is, password cracking techniques and social engineering methods.

---

### Cryptanalysis Overview

Cryptanalysis is the science of breaking and deciphering crypto systems. It is the branch of cryptology that investigates the decryption of encrypted texts. Cryptanalysis is used to find unknown keys.

![](https://cdn-images-1.medium.com/max/800/0*WYSM0JXe3tpf70lG.png)

Cryptanalysis; We can divide Application Attacks into three areas: classical cryptanalysis and social engineering. Now let's look at these areas and the methods used.

---

### Application Attacks

Cryptanalysis methods that attempt to obtain the secret key through reverse engineering or password attacks are types of attacks.

#### Brute-Force Attacks

This type of password attack uses trial and error methods to guess the target user's password information. The attacker tries as many permutations as possible to correctly guess the user's password. Although it is a relatively old method that requires a lot of patience and time, a brute force attack is still one of the most used methods because it is automatic and straightforward.

![](https://cdn-images-1.medium.com/max/800/1*TC-mr-YoZ9Rb2ZQ3syKvEw.png)

There are several types of brute force attacks:  
**1. Simple brute force attacks:** Uses data about a user to guess the most likely password. This technique is used for simple passwords, such as those containing a combination of pet name-year and birth.  
**2. Credential stuffing:** Involves the use of previously compromised login combinations maliciously obtained from vulnerable websites. These types of attacks take advantage of target users' tendency to reuse username-password combinations across multiple services.  
3. **Reverse brute force attacks:** It starts with a known password and then looks for usernames that match that password. Since threat actors often have access to multiple databases of leaked credentials, it is easy to identify common passwords within a given group of users.

#### Dictionary Attacks

This attack method uses a predefined list of words that are likely to be used as passwords by a particular target network.

![](https://cdn-images-1.medium.com/max/800/0*F652-yGJsAll1wHg)

The predefined list is created from a website user's behavioral patterns and passwords obtained from previous data breaches. Lists common password combinations by case;

* By changing
* By adding numeric suffixes and prefixes
* Using common expressions

is created. These lists are passed to tools that attempt to authenticate against a list of known usernames.

Here are the tools that can be used to create a password list.

#### Password Spraying Attacks

In this attack, the hacker attempts to authenticate using the same password across several accounts before switching to another password. Since most website users set simple passwords, password spraying is the most effective technique.

![](https://cdn-images-1.medium.com/max/800/0*T2U4_r03cwMIK7d0)

Attackers often use the password spraying attack on websites where administrators set a standard default password for new users and unregistered accounts.

#### Keylogging

When conducting a Keylogging attack, the attacker installs keyboard monitoring software on the user's computer to record the keys the user secretly types. A keylogger records all the information users type into login forms and then sends them to the malicious attacker.

![](https://cdn-images-1.medium.com/max/800/0*9je3oKzwvjFzUeGg)

#### Computer Forensics

From the memory, disk or processor of a system to which we have physical access; It involves obtaining the secret key using various forensic methods such as string analysis and signal measurement. In cases where I do not have physical access, such as a remote server, we do not need to worry about this attack.

![](https://cdn-images-1.medium.com/max/800/0*b4jQGvhwF6m7lBcN)

#### Application Attacks Tools

1. ***CrackStation***
2. ***John the Ripper***
3. ***Hashcat***
4. ***Medusa***
5. ***Hydra***
6. ***Brutus***
7. ***RainbowCrack***
8. ***L0phtCrack***
9. ***OphCrack***

---

### Classical Cryptanalysis

Classical cryptanalysis is the science of recovering the plaintext from its ciphertext or, alternatively, finding the key from its ciphertext. It uses mathematical analysis that takes advantage of the internal structure of the encryption method.

![](https://cdn-images-1.medium.com/max/800/0*ct3PFF4EH3YUqAlK)

Encryption Decryption

An encryption process consists of 3 elements. These are: clear text, encrypted text and key. If we have any two of these elements, we can easily find the third. However, the main function of cryptanalysis is the ability to find others when only the ciphertext is available. It uses various mathematical methods for this.

These methods are:

* **Known Plaintext Analysis (KPA)**: In this type of attack, some plaintext-ciphertext pairs are already known. The attacker maps them to find the encryption key. This attack is easier to use because a lot of information is already available.
* **Chosen Plaintext Analysis (CPA)**: In this type of attack, the attacker selects random plaintexts and retrieves the corresponding ciphertexts and tries to find the encryption key. Like KPA, it is very simple to implement, but its success rate is quite low.
* **Ciphertext Analysis Only (COA)**: In this type of attack, only some ciphertexts are known and the attacker tries to find the corresponding encryption key and plaintext. It is the most difficult to implement, but the most likely attack since only ciphertext is required.
* **Adaptive Selected Plaintext Analysis (ACPA)**: This attack is similar to CPA. Here the attacker, after having the ciphertexts for some texts, requests the ciphertexts of additional plaintexts.
* **Birthday attack:** This attack exploits the possibility of two or more people in a group of people sharing the same birthday. In cryptography, this attack is used to find collisions in a hash function.
* **Differential cryptanalysis**: This type of attack involves comparing pairs of plaintexts and their corresponding ciphertexts to find patterns in the encryption algorithm. It can be effective against block ciphers with certain properties.
* **Integral cryptanalysis:** It is a method used on block cipher methods based on Replacement-Scrambling functions.

---

### Social Engineering

No matter how strong the crypto system we have established, risks arising from human factors should not be ignored. Bribery, blackmail, deception or classic espionage can be used to obtain a secret key. For example, holding a gun to a person's head and forcing them to tell the password can be quite successful. Another less violent attack is social engineering techniques such as calling the people we want to attack and saying, "We're calling from your company's IT department. We need your password for important software updates." It is surprising that there are no small number of people who are naive enough to actually give their passwords in such cases.

![](https://cdn-images-1.medium.com/max/800/0*T75D0kY4zcu3_J5U)

The attacker is always looking for the weakest link in your crypto system. For this, we need to choose strong algorithms and ensure that social engineering and application attacks are impractical. Both application attacks and social engineering attacks can be quite powerful in practice.

#### Phishing Attacks

It involves a social engineering technique in which the attacker disguises himself as a trusted site by sending a malicious link to the victim. Once the victim assumes they are authenticating with a legitimate web server, they click on that link, providing the attacker with their account information. In this way, the attacker obtains the account information of the target user, and the victim is phished.

![](https://cdn-images-1.medium.com/max/800/0*C1Redj9meJnjH1ur)

Aside from identity theft, phishing attacks enable an attacker to obtain a user's permissions, allowing them to compromise deeper components of the system before the attack is detected. In phishing attacks, attackers often use multiple methods to trick the user into clicking the malicious link:

1. **DNS cache poisoning:** Attackers exploit the application's DNS server to redirect user requests to a malicious site with a similar-sounding domain name.It exploits the security vulnerabilities in its mind.
2. **URL hijacking/typo:** The attacker creates a real-looking URL with subtle differences from the website they want to impersonate. The attack relies on users making typos, so they land on the malicious page.
3. **Tabbing:** The attacker rewrites unattended browser tabs with malicious sites disguised as legitimate web pages.
4. **UI fix/iFrame overlay:** Using transparent layers, the attacker places a link to the malicious page over a legitimate, clickable button.
5. **Clone phishing :** In this attack, the attacker sends a copy of a legitimate email to malicious sites where the links in the original email are replaced with URLs.

---

In this article, I talked about cryptanalysis. In my next article, I will talk about cryptography. You can find the list of the series on my profile.