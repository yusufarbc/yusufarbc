---
title: "Cryptology Fundamentals: Cryptography"
date: 2023-03-28
description: "Hello, in this article of the cryptology basics series, I will talk about what cryptography is, encryption techniques and cryptographic protocols."
featuredImage: "https://cdn-images-1.medium.com/max/800/1*MPqOVwPSnGY3CguO7sg8Jw.png"
series: ["Kriptoloji Temelleri"]
---

### Cryptology Fundamentals:#2 Cryptography

![](https://cdn-images-1.medium.com/max/800/1*MPqOVwPSnGY3CguO7sg8Jw.png)

Hello, in this article of the cryptology basics series, I will talk about what cryptography is, encryption techniques and cryptographic protocols.

---

### Cryptography Overview

Cryptography is the science of secret writing for the purpose of hiding the meaning of a message. Cryptography is a set of mathematical methods and is intended to provide conditions such as confidentiality, authenticity, authentication, and prevention of false rejection necessary for the security of important information. These methods aim to protect the information — and therefore the interests of the sender, receiver, carrier of the information, its subjects, and any other parties — from active attacks or passive perceptions that may be encountered during the transmission and storage of information.

![](https://cdn-images-1.medium.com/max/800/0*2Vwirutk3ytVmQK7.png)

Cryptography; We can divide it into 3 areas: symmetric encryption, asymmetric encryption and cryptographic protocols. Now let's look at these areas and the methods used.

![](https://cdn-images-1.medium.com/max/800/1*-xJo79RzeZLimVgF7AMPJw.png)

Basic Classification Diagram for Cryptographic Algorithms

---

### Symmetric Encryption

Symmetric Encryption** is an encryption technique where both parties use the same encryption and decryption method. There is only one common secret key to be used in this encryption method.

All cryptography from ancient times until 1976 was based solely on symmetric methods, and symmetric ciphers are still widely used. It is especially useful for encryption and integrity control of messages.

![](https://cdn-images-1.medium.com/max/800/0*XxKCSz8Z5gCClHYt.png)

Symmetric Encryption

In the computer system; All data such as text, images, music are expressed as 1–0s, and each 1–0 is called a bit.

Symmetric encryption is divided into block ciphers and stream ciphers. Although stream cipher and block cipher are symmetric encryption techniques, there are some important differences. While block ciphers encrypt fixed-length blocks of bits, stream ciphers combine plaintext bits into a text encryption stream using the XOR operation.

![](https://cdn-images-1.medium.com/max/800/0*PVVBIhJHRuKvdXHi.png)

### Stream Encryption

In stream encryption, bits are encrypted individually. Each bit is encrypted by XORing the bit coming from the bit stream generator. If the encrypted text is XORed with the cipher stream, the plain text is found and decrypted. For this reason, in the stream encryption technique, there is no need for different algorithms for encryption and decryption operations, these operations are performed with the same algorithm.

![](https://cdn-images-1.medium.com/max/800/0*NDdy7s_T_pc-PWlx.png)

XOR operation

The most important point in stream encryption algorithms is the bit stream generator. The bitstream generator creates a bitstream based on the key given to it. The complexity and randomness of this bitstream are of great importance to the reliability of the encryption. At this point, different stream encryption algorithms with different bit stream generators have been developed.

#### ChaCha20

ChaCha20 algorithm is a stream encryption algorithm. Supports 128 and 256 bits. It has similar features to its predecessor [Salsa20](https://en.wikipedia.org/wiki/Salsa20). It has a primitive function consisting of 12 or 20 different rounds. It was standardized by the IETF in RFC 7539 and is among the most used algorithms today because it is much more efficient and faster than AES in software applications.

Google has a big part in making ChaCha20 so popular. Until a few years ago, Google used AES-GCM as the symmetric encryption algorithm for Chrome and Android. However, due to the use of ARM-based processors in mobile devices and the lack of AES configurations in these processors as in Intel-based processors, encryption was relatively slow. For this reason, Google was working on a more up-to-date, secure and faster encryption algorithm.

![](https://cdn-images-1.medium.com/max/800/0*p11w2EzrPzNTF_DK.jpg)

ChaCha20-Poly1305

The jumping off point for ChaCha20 was when the android version of Chrome started using **ChaCha20** for encryption and **Poly1305** for authentication. The main reason for this was that ChaCha20 achieved three times the performance of slightly older protocols such as AES.

ChaCha20, HTTPS connectionsIt is widely used for SSH connections and managing servers. Even the popular WireGuard VPN protocol uses only ChaCha20 for symmetric data encryption. It is very likely that we will soon see ChaCha20 in IPsec connections as well.

### Block Cipher

In block ciphering, an entire block of plaintext bits is encrypted at a time. This requires a key bit block that is the same length as the text bit block. In practice, keys with a block length of 128 bits (16 bytes) or 64 bits (8 bytes) are used. The longer the key length, the more reliable the encryption process.

In block ciphering, encryption and decryption algorithms are different algorithms. The decryption algorithm does the exact opposite of what is done in the encryption algorithm.

![](https://cdn-images-1.medium.com/max/800/0*PgkgI4ShvSM2IppP.png)

Block Cipher

There are two key features that make block cipher algorithms reliable. These are the concepts of confusion and diffusion

**Confusion is an encryption process in which the relationship between the key and the ciphertext is hidden.

**Diffusion is an encryption process in which the effect of one plaintext symbol is spread across many ciphertext symbols in order to hide statistical properties of the plaintext.

Algorithms that perform only propagation or only confusion are not secure. However, strong passwords can be created by using a combination of such processes. Today's block cipher algorithms consist of loops that repeatedly apply these operations to the data.

There are two standardized algorithms widely used in the block cipher technique. These; advanced encryption standard (AES) and data encryption standard (DES) algorithms.

#### DES

Data Encryption Standard (DES) has been by far the most popular block cipher method for most of the last 30 years. Although DES is not considered secure today because its key length is very short, it is still used in old applications.

DES is an algorithm that encrypts 64-bit blocks with a 56-bit key. This algorithm completes the encryption process in 16 rounds, all performing the same operation. A different subkey is used in each round, and all subkeys are derived from the main key k.

![](https://cdn-images-1.medium.com/max/800/0*jNDsQQQOcDvB7E2i.jpg)

If we look in more detail at the transactions made in each round, we encounter the Feistel structure of the DES algorithm (also known as the Feistel network). If this feistel structure is carefully designed, very strong passwords can be created. In addition to their cryptographic power, an advantage of Feistel networks is that encryption and decryption are almost the same process.

![](https://cdn-images-1.medium.com/max/800/0*fc-FSeFntoNvcQsj.jpg)

The two fundamental properties of passwords mentioned above, namely hashing and diffusion, are implemented within the f-function. Round is taken as the number of rounds and K1, K2,..KN are taken as subkeys for rounds 1,2,..,n respectively. Then, the Ciphertext blocks are divided into 2 equal parts, L and R, and processed within the function. Then, input R is output as L, input L is output as R, and this process is repeated n times.

The diagram shows both encryption and decryption. It is worth noting that the subkey order is reversed for decryption; This is the only difference between encryption and decryption.

Once the f-function is securely designed, the security of the Feistel cipher increases with the number of keys and block length. The more the number of keys, the more the number of rounds and the more confusion and diffusion we get. Likewise, the longer the block length, the longer the password spreads and the harder it is to crack.

####AES

Advanced Encryption Standard (AES) is the most widely used symmetric cipher today. Software that incorporates AES includes Internet security standard IPsec, TLS, Wi-Fi encryption standard IEEE 802.11i, secure shell network protocol SSH (Secure Shell), Internet telephony Skype, and numerous security products worldwide.

Unlike DES, the AES algorithm does not have a Feistel structure. Feistel networks do not encrypt an entire block per iteration, for example in DES 64/2 = 32 bits are encrypted in one round. AES, on the other hand, encrypts all 128 bits in one round. Therefore, the AES algorithm has a relatively small number of rounds.

![](https://cdn-images-1.medium.com/max/800/0*QSpz_OkltFg8Ljh_.png)

AES algorithm

In the image above, the plaintext is x and the ciphertext is y.rak and number of rounds are shown as nr.

AES consists of layers. Each layer processes all 128 bits of the block. There are three different types of layers. These;

**Key Addition(*AddRoundKey*) layer:** In the key generator, the 128-bit subkey derived from the main key is XORed with state(x).

**SubBytes* layer:** Each byte in the state matrix is ​​updated according to a table and with a non-linear transformation.

**Diffusion layer:** Provides diffusion over text bits. It consists of two sublayers, both of which perform linear operations:

1. **Row Shift *(*ShiftRows) layer**, each row is shifted circularly a certain number of times.
2. The **Column Mixing (MixColumn) layer** mixes the four-byte blocks in each column. Last round, the MixColumn transform is not used.

In the AES encryption algorithm, the reverse process is done to decrypt.

---

### Asymmetric Encryption

Asymmetric Encryption is an encryption technique in which a user has a private key and also a public key. Asymmetric algorithms can be used for digital signatures, key generation, and classical data encryption.

It was introduced in 1976 as a completely different type of cipher by Whitfield Diffie, Martin Hellman and Ralph Merkle. Also known as public key encryption.

![](https://cdn-images-1.medium.com/max/800/0*wwVcQD6ILTUMEAq3.png)

Asymmetric Encryption

Asymmetric cryptography, also known as public key cryptography, is a fairly new encryption technique. It was introduced in 1976 by Whitfield Diffie, Martin Hellman and Ralph Merkle. In asymmetric encryption, each user has a private key and a public key. The way these keys are used is as follows:

* Message + public key = Encrypted message
* Encrypted message + secret key = Decrypted message
* Message + secret key = Signed message
* Signed message + public key = Authentication

In asymmetric encryption, a message encrypted with a user's public key can only be decrypted with that user's private key. This method is used to send a message to that user. If a user has encrypted the message with his private key, we can decrypt this message with that user's public key. This method is also used in authentication, if the message can be decrypted with that user's public key, his identity is confirmed.

Before moving on to the actual public key encryption algorithms, let's take a look at the mathematical basis of these algorithms.

### Public Key Algorithm Families

**Integer-Factorization Schemes:** Many public-key schemes rely on the fact that it is difficult to factor large integers. The most well-known representative of this family of algorithms is RSA.

**Discrete Logarithm Schemes:** Based on mathematics known as the discrete logarithm problem in finite fields. Examples of this are Diffie-Hellman key exchange, Elgamal encryption or Digital Signature Algorithm (DSA).

**Elliptic Curve (EC) Schemes:** A generalization of discrete logarithms are elliptic curve public key schemes. The most popular examples include Elliptic Curve Diffie-Hellman key exchange (ECDH) and Elliptic Curve Digital Signature Algorithm (ECDSA).

The first two families appeared in the mid-1970s. Elliptic curves were introduced in the mid-1980s. There are no known attacks against either scheme if parameters and key lengths are chosen carefully.

#### RSA

RSA is an encryption technique developed considering the algorithmic difficulty of factoring very large integers. There are many applications where RSA is used, but in practice it is most commonly used for digital signatures, digital certificates, and encryption of small pieces of data. Additionally, RSA is the most widely used asymmetric encryption scheme today.

It should be noted that RSA encryption is not intended to replace symmetric ciphers, as it is several times slower than symmetric ciphers such as AES. This is due to the many calculations involved in performing RSA (or any other public key algorithm). Therefore, the main use of the encryption feature is to securely exchange a key with a symmetric cipher (key transfer). In practice, RSA is often used in conjunction with a symmetric cipher such as AES, where the symmetric cipher does the actual bulk data encryption.

The underlying one-way function of RSA is the integer factorization problem:  
 Multiplying two large prime numbers is computationally easy (you can actually do it with paper and pencil).niz), but it is very difficult to factor the resulting product. Euler's theorem and Euler's phi function play important roles in RSA. Now, let's look at how encryption, decryption, and key generation work with RSA.

![](https://cdn-images-1.medium.com/max/800/0*pVs1sy3vN5kCBdeb.png)

RSA encryption algorithm

e: encryption exponent, d: decryption exponent, n: length

Modular computations play an important role in RSA encryption and decryption. In practice x, y, n and d are very long numbers (usually 1024 bits).

A distinctive feature of all asymmetric schemes is that there is a setup phase in which the public and private key are calculated. Depending on the public key scheme, key generation can be quite complex. Let's take a look at the steps involved in calculating the public and private key for an RSA encryption system:

1. N = p.q  
    Two different and large prime numbers are determined, which will form the very large integer that we will denote by N. These numbers are called p and q.
2. φ(N) = (p-1)(q-1)  
    The totient value of number N is calculated. Totient is a function in number theory that indicates the number of numbers that are smaller than an integer and prime to that number.
3. 1 < e < φ(N) and GCF(e, φ(N)) = 1  
    As can be understood from the mathematical expression above, an integer between 1 and the Totient value, which is prime between the Totient value and the Totient value, is selected and named e. Choosing a small number of e to be chosen here provides performance gains when performing operations such as mod and exponentiation, but in some cases it reduces security.
4. d.e ≡ 1 (mod φ(N)  
    The number d that provides equivalence and will be used to create the secret key is found. The process to be done here is to find the inverse of the number e in mod φ(N).

We have obtained all the values necessary to create the public and private key. Provided that the numbers (p,q, φ(N)) used in calculating the number d constituting the private key remain secret, the pair (N,e) is the public key; The (N,d) pair constitutes the secret key.

As you can see, doing these operations can be very long and tiring. For this purpose, some practical methods are used in advanced systems. When designing the RSA scheme, if the e and d values are too large, it may cause slow encryption. On the other hand, if these values are too small, this brings security problems.

---

### Protocols

Cryptographic Protocols are encryption methods created by applying and standardizing cryptographic algorithms. Symmetric and asymmetric algorithms are the building blocks of secure Internet communications. A protocol defines how to use these algorithms.

### Digital signature

Digital signature is a legal authentication method used for authentication purposes in the electronic environment. It can be roughly defined as a signature made electronically. As with traditional handwritten signatures, only the person creating the digital message must be able to produce a valid signature. To achieve this with cryptographic primi-262 10 Digital Signatures we need to implement public key cryptography. The basic idea is that the person signing the message uses a private key and the receiving party uses the matching public key. The principle of the digital signature scheme is shown in the figure.

![](https://cdn-images-1.medium.com/max/800/0*Q9yF6vAzC-qdlXni.png)

Digital Signature

The key feature of digital signatures is this: Since a valid signature can only be calculated with the signer's private key, a signed message can be unambiguously traced back to its origin. Only the signer has the authority to create a signature in his or her own name. Therefore, we can prove that the signing party actually created the message.  
 Each of three popular families of public key algorithms, namely integer factorization, discrete logarithms, and elliptic curves, allow us to create digital signatures.

### Summary Functions

Hash functions, also known as hash functions, are an important cryptographic protocol. It is extremely useful and appears in almost all information security applications. For a given message, the message digest or hash value can be viewed as a message fingerprint, that is, a unique representation of a message. Unlike other crypto algorithms, hash functions do not have a key.

![](https://cdn-images-1.medium.com/max/800/0*caf2jzqzDuHFxZ2H.png)

Summary Function

Hash functions are mathematical functions that convert a numerical input value into another compressed numerical value.Zion. The input of the hash function is of arbitrary length, but the output is always fixed length. The values ​​returned by a hash function are called message digests or simply hash values. Regardless of the input, all output strings produced by a given hash function are the same length. The length is defined by the type of hashing technology used. The output strings are created from a sequence of characters defined in the hash function.

The uses of hash functions in cryptography are very diverse. Hash functions are an important part of digital signature schemes and message authentication codes. It is also widely used for other cryptographic applications, for example, storing password hashes or key derivation.

**Features of hash functions**

* **One-way:** Once a hash value is created, it should be impossible to convert it back to the original data.
* **Conflict-free:** For a hash function to be conflict-free, the hash value of two different data values ​​must not be the same. In other words, each input sequence must produce a unique output sequence.
* **Fast:** If a hash function takes too long to calculate hash values, it is of little use. Hash functions must therefore be very fast.

#### Popular Hash Functions

#### Message Digest (MD)

The MD family consists of hash functions MD2, MD4, MD5 and MD6. Adopted as Internet Standard RFC 1321. It is a 128-bit hash function. The most popular member of the family is MD5.

MD5 was the most popular and widely used hash function for many years. MD5 digests are widely used in the software world to provide assurance about the integrity of the transferred file. For example, file servers often provide a pre-computed MD5 hash for files, so a user can compare the hash of the downloaded file with the provided value. In 2004, conflicts were found in MD5. An analytics attack using the computer cluster was reported to be successful in just an hour. This collision attack resulted in MD5 being an unreliable algorithm and therefore its use is no longer recommended.

#### Secure Hash Function (SHA)

The SHA family consists of four SHA algorithms; SHA-0, SHA-1, SHA-2 and SHA-3. Although they are from the same family, they have structurally different algorithms.

The original version is SHA-0, a 160-bit hash function, and was published by the National Institute of Standards and Technology (NIST) in 1993. It had a few weaknesses and did not become very popular. Later in 1995, SHA-1 was designed to fix the alleged weaknesses of SHA-0.

SHA-1 is the most widely used of the existing SHA hash functions. It is used in many commonly used applications and protocols, including Secure Sockets Layer (SSL) security. In 2005, a method was found for SHA-1 to expose conflicts within the practical time frame, making the long-term usability of SHA-1 questionable.

The SHA-2 family has four SHA variants, SHA-224, SHA-256, SHA-384, and SHA-512, depending on the number of bits in the hash values. No successful attack on the SHA-2 hash function has yet been reported. Although SHA-2 is a powerful hash function and is significantly different, its basic design is still similar to that of SHA-1. Therefore, NIST has called for new hash function designs.

In October 2012, NIST selected the Keccak algorithm as the new SHA-3 standard. Keccak offers many advantages to its users, such as efficient performance and strong resistance to attacks.

#### RIPEMD

RIPEMD is the abbreviation for RACE Integrity Primitives Assessment Message Digest. This set of hash functions was designed by the open research community and is commonly known as a family of European hash functions. The family has 3 members. These; RIPEMD, RIPEMD-128 and RIPEMD-160. 256 and 320 bit versions of this algorithm are also available.

The original RIPEMD (128 bit) was based on the design principles used in MD4 and security issues were found. RIPEMD 128-bit version came as a quick fix to overcome vulnerabilities in the original RIPEMD.

RIPEMD-160 is an improved version and is the most used version in the family. The 256- and 320-bit versions reduce the likelihood of conflicts, but do not have higher security levels compared to RIPEMD-128 and RIPEMD-160, respectively.

####Whirlpool

Whirlpool, 512 bIt is a hash function. It is derived from a modified version of the Advanced Encryption Standard (AES). One of the designers was Vincent Rijmen, co-creator of AES. Three versions of Whirlpool have been released. These; They are WHIRLPOOL-0, WHIRLPOOL-T and WHIRLPOOL.

### Key Distribution Protocol

Key da protocol is an encryption protocol in which some secret values are shared among several members of a group. The secret value can also be used, for example, as a secret session key for a secure communication channel between members of the group. Roughly speaking, key distribution protocol deals with creating a shared key between two or more parties. For this, key transport or key agreement methods can be used. A key transport protocol is a technique by which one party securely transfers a secret value to others. In a key agreement protocol, two (or more) parties derive the public key, with all parties contributing the key. Ideally, neither party can control what the final public key will be.

![](https://cdn-images-1.medium.com/max/800/0*TG166uwZDCXkgCtb.png)

#### Key Agreement

In cryptography, a key agreement protocol is a protocol in which two or more parties can agree on a key in a way that both affects the outcome. If done properly, this prevents unintended third parties from imposing a choice on contracting parties. In practice, advanced protocols do not reveal to any eavesdropping party what key has been agreed upon.

#### Key Transport

In many key transport protocols, one party simply generates the key and sends that key to the other party; the other side has no influence on the key.

Using a key agreement protocol avoids some of the key distribution problems associated with such systems. Protocols where both parties influence the final derived key are the only way to implement perfect forward secrecy.

---

![](https://cdn-images-1.medium.com/max/800/1*ILSONeBau6S2Vidq8GyOtA.png)

In this article, I talked about cryptography. In my next article, I will talk about cryptanalysis. You can find the list of the series on my profile.