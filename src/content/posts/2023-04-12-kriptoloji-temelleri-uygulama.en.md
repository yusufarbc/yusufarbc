---
title: "Cryptology Fundamentals: Application"
date: 2023-04-12
draft: false
---

---

### Cryptology Fundamentals:#5 Applications

![](/images/1_Sk1u0b-kaNN7j57oE13CBA.png)

Hello, in this last article of the cryptology basics series, I will talk about how cryptographic protocols are implemented. I will use the Java programming language during the implementation phase.

---

### MD5 Application

MD5 is a widely used hash function that can produce a fixed-size output (128 bits) for any input data. In Java, you can calculate the MD5 digest of a string or file using the MessageDigest class, which is part of the Java Security API.

Here is an example of how to calculate the MD5 hash of a string in Java:

```
import java.security.MessageDigest;  
import java.security.NoSuchAlgorithmException;  
  
public class MD5Example {  
    public static void main(String[] args) {  
        String input = "Hello, world!";  
        String md5Hash = calculateMD5(input);  
        System.out.println("MD5 hash of '" + input + "' is: " + md5Hash);  
    }  
  
    public static String calculateMD5(String input) {  
        try {  
            MessageDigest md = MessageDigest.getInstance("MD5");  
            byte[] hash = md.digest(input.getBytes());  
            StringBuilder sb = new StringBuilder();  
            for (byte b : hash) {  
                sb.append(String.format("%02x", b));  
            }  
            return sb.toString();  
        } catch (NoSuchAlgorithmException e) {  
            throw new RuntimeException("MD5 algorithm not available", e);  
        }  
    }  
}
```

In this example, we first import the MessageDigest class and define a *calculateMD5* method that takes a string input and returns the MD5 value as a string.

Inside the calculateMD5 method, we first create a new instance of the MessageDigest class by using the *getInstance* method and giving the “MD5” algorithm as a parameter. Next, we call the hash method on the MessageDigest object and pass the input string as a byte array to calculate the MD5 digest.

Finally, we convert the byte array to a string using a StringBuilder object and the String.format method to format each byte as a two-digit hexadecimal number. We then return the resulting string as an MD5 digest.

---

### SHA-1 Implementation

SHA-1 (Secure HashAlgorithm 1) is a widely used hash function that can create a fixed-size output (160 bits) for any input data. In Java, you can calculate the SHA-1 digest of a string or file using the MessageDigest class, which is part of the Java Security API.

Here is an example of how to calculate the SHA-1 hash of a string in Java:

```
import java.security.MessageDigest;  
import java.security.NoSuchAlgorithmException;  
  
public class SHA1Example {  
    public static void main(String[] args) {  
        String input = "Hello, world!";  
        String sha1Hash = calculateSHA1(input);  
        System.out.println("SHA-1 hash of '" + input + "' is: " + sha1Hash);  
    }  
  
    public static String calculateSHA1(String input) {  
        try {  
            MessageDigest md = MessageDigest.getInstance("SHA-1");  
            byte[] hash = md.digest(input.getBytes());  
            StringBuilder sb = new StringBuilder();  
            for (byte b : hash) {  
                sb.append(String.format("%02x", b));  
            }  
            return sb.toString();  
        } catch (NoSuchAlgorithmException e) {  
            throw new RuntimeException("SHA-1 algorithm not available", e);  
        }  
    }  
}
```

In this example, we first import the MessageDigest class and define a *calculateSHA1* method that takes a string input and returns the SHA-1 digest as a string.

Inside the *calculateSHA1* method, we first create a new instance of the MessageDigest class by using the *getInstance* method and giving the “SHA-1” algorithm as a parameter. Next, we call the hash method on the MessageDigest object and pass the input string as a byte array to calculate the SHA-1 hash value.

Finally, we convert the byte array to a string by using a StringBuilder object and the String.format method to format each byte as a two-digit hexadecimal number. We then return the resulting string as a SHA-1 digest.

---

### DES Application

DES (Data Encryption Standard) is a symmetric key encryption system that can be used to encrypt and decrypt data.me algorithm. In Java, you can use the Cipher class from the Java Cryptography Architecture (JCA) to implement DES encryption and decryption.

Here is an example of how to encrypt and decrypt a string using DES in Java:

```
import javax.crypto.Cipher;  
import javax.crypto.spec.SecretKeySpec;  
import java.nio.charset.StandardCharsets;  
import java.util.Base64;  
  
public class DESExample {  
    public static void main(String[] args) throws Exception {  
        String originalString = "Hello, world!";  
        String secretKey = "mysecretkey";  
          
        // Encrypt the original string  
        String encryptedString = encrypt(originalString, secretKey);  
        System.out.println("Encrypted string: " + encryptedString);  
  
        // Decrypt the encrypted string  
        String decryptedString = decrypt(encryptedString, secretKey);  
        System.out.println("Decrypted string: " + decryptedString);  
    }  
  
    public static String encrypt(String plainText, String secretKey) throws Exception {  
        Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");  
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "DES");  
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);  
        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));  
        return Base64.getEncoder().encodeToString(encryptedBytes);  
    }  
  
    public static String decrypt(String encryptedText, String secretKey) throws Exception {  
        Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");  
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "DES");  
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);  
        byte[] decodedBytes = Base64.getDecoder().decode(encryptedText);  
        byte[] decryptedBytes = cipher.doFinal(decodedBytes);  
        return new String(decryptedBytes, StandardCharsets.UTF_8);  
    }  
}
```

In this example, we first import the required classes and define the *encrypt* and *decrypt* methods, which take a plaintext string and a secret key string as input and return the corresponding encrypted or decrypted string.

Inside each method, we first create a Cipher object using the “DES/ECB/PKCS5Padding” conversion string, which specifies the DES encryption algorithm with Electronic Code Book (ECB) mode and PKCS5 padding.

We then create a SecretKeySpec object using the secret key string and the “DES” algorithm and initialize the cipher object with the secret key using the init method with the appropriate mode (Cipher.ENCRYPT\_MODE or Cipher.DECRYPT\_MODE).

For encryption, we convert the plaintext string into a byte array and call the doFinal method on the cipher object to encrypt the data. Then, we convert the resulting byte array to a base64-encoded string using the Base64 class and return the encrypted string.

For decryption, we decode the base64-encoded string back into a byte array using the Base64 class, call the doFinal method on the cipher object to decrypt the data, and convert the resulting byte array into a string using the appropriate character set (in this case, StandardCharsets.UTF\_8). We then return the decrypted string.

---

### AES Implementation

AES (Advanced Encryption Standard) is a symmetric key encryption algorithm that can be used to encrypt and decrypt data. In Java, you can use the Cipher class from the Java Cryptography Architecture (JCA) to implement AES encryption and decryption.

Here is an example of how to encrypt and decrypt a string using AES in Java:

```
import javax.crypto.Cipher;  
import javax.crypto.spec.SecretKeySpec;  
import java.nio.charset.StandardCharsets;  
import java.util.Base64;  
  
public class AESExample {  
    public static void main(String[] args) throws Exception {  
        String originalString = "Hello, world!";  
        String secretKey = "mysecretkey";  
          
        // Encrypt the original string  
        String encryptedString = encrypt(originalString, secretKey);  
        System.out.println("Encrypted string: " + encryptedString);  
  
        // Decrypt the encrypted string  
        String decryptedString = decrypt(encryptedString, secretKey);  
        System.out.println("Decrypted string: " + decryptedString);  
    }  
  
    public static String encrypt(String plainText, String secretKey) throws Exception {  
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");  
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "AES");  
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);  
        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));  
        return Base64.getEncoder().encodeToString(encryptedBytes);  
    }  
  
    public static String decrypt(String encryptedText, String secretKey) throws Exception {  
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");  
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "AES");  
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);  
        byte[] decodedBytes = Base64.getDecoder().decode(encryptedText);  
        byte[] decryptedBytes = cipher.doFinal(decodedBytes);  
        return new String(decryptedBytes, StandardCharsets.UTF_8);  
    }  
}
```

In this example, we first import the required classes and define the *encrypt* and *decrypt* methods, which take a plaintext string and a secret key string as input and return the corresponding encrypted or decrypted string.

Inside each method, we first create a Cipher object using the “AES/ECB/PKCS5Padding” transform string, which specifies the AES encryption algorithm with Electronic Code Book (ECB) mode and PKCS5 padding.

We then create a SecretKeySpec object using the secret key string and the “AES” algorithm and initialize the cipher object with the secret key using the init method with the appropriate mode (Cipher.ENCRYPT\_MODE or Cipher.DECRYPT\_MODE).

For encryption, we convert the plaintext string into a byte string and call the doFinal method on the cipher object to encrypt the data. Then, we convert the resulting byte array to a base64-encoded string using the Base64 class and return the encrypted string.

For decryption, we decode the base64-encoded string back into a byte array using the Base64 class, call the doFinal method on the cipher object to decrypt the data, and convert the resulting byte array into a string using the appropriate character set (in this case, StandardCharsets.UTF\_8). We then return the decrypted string.

---

### RSA Implementation

RSA (Rivest–Shamir–Adleman) is a public key encryption algorithm that can be used to securely encrypt and decrypt data. In Java, you can use the KeyPairGenerator and Cipher classes from the Java Cryptography Architecture (JCA) to implement RSA encryption and decryption.

Here is an example of how to create an RSA key pair in Java, encrypt a string using the public key, and decrypt the encrypted string:

```
import javax.crypto.Cipher;  
import java.security.KeyPair;  
import java.security.KeyPairGenerator;  
import java.util.Base64;  
  
public class RSAExample {  
    public static void main(String[] args) throws Exception {  
        String originalString = "Hello, world!";  
          
        // Generate an RSA key pair  
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");  
        keyPairGenerator.initialize(2048);  
        KeyPair keyPair = keyPairGenerator.generateKeyPair();  
          
        // Get the public and private keys from the key pair  
        byte[] publicKeyBytes = keyPair.getPublic().getEncoded();  
        byte[] privateKeyBytes = keyPair.getPrivate().getEncoded();  
  
        // Encrypt the original string using the public key  
        byte[] encryptedBytes = encrypt(originalString.getBytes(), publicKeyBytes);  
        String encryptedString = Base64.getEncoder().encodeToString(encryptedBytes);  
        System.out.println("Encrypted string: " + encryptedString);  
  
        // Decrypt the encrypted string using the private key  
        byte[] decryptedBytes = decrypt(Base64.getDecoder().decode(encryptedString), privateKeyBytes);  
        String decryptedString = new String(decryptedBytes);  
        System.out.println("Decrypted string: " + decryptedString);  
    }  
  
    public static byte[] encrypt(byte[] plainBytes, byte[] publicKeyBytes) throws Exception {  
        Cipher cipher = Cipher.getInstance("RSA");  
        cipher.init(Cipher.ENCRYPT_MODE, KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(publicKeyBytes)));  
        return cipher.doFinal(plainBytes);  
    }  
  
    public static byte[] decrypt(byte[] encryptedBytes, byte[] privateKeyBytes) throws Exception {  
        Cipher cipher = Cipher.getInstance("RSA");  
        cipher.init(Cipher.DECRYPT_MODE, KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(privateKeyBytes)));  
        return cipher.doFinal(encryptedBytes);  
    }  
}
```

In this example, we first import the required classes and define the *encrypt* and *decrypt* methods, which take a byte array of plaintext or encrypted data and a byte array of public or private key as input and return the corresponding encrypted or decrypted byte array. .

In the main method, we first create an RSA key pair using the KeyPairGenerator class with the “RSA” algorithm and a key size of 2048 bits. We then extract the public and private keys from the key pair as byte arrays using the *getEncoded* method.

For encryption, we call the *encrypt* method with the original string converted to a byte array and the public key byte array as input. We create a Cipher object using the “RSA” algorithm in the Encrypt method and initialize it with the public key using the appropriate mode (Cipher.ENCRYPT\_MODE) using the init method. Next, we call the doFinal method on the cipher object to encrypt the data and return the resulting byte array.

For decryption, we call the *decrypt* method with the base64-decrypted encrypted string converted to a byte array and the private key byte array as input. Inside the Decrypt method, we create another Cipher object using the “RSA” algorithm and initialize it with the private key using the appropriate mode and init method.

---

### ECDH Application

ECDH (Elliptic Curve Diffie-Hellman) is a key agreement protocol that allows two parties to establish a shared secret over an unsecured communication channel. In Java, you can use the KeyAgreement and KeyPairGenerator classes from the Java Cryptography Architecture (JCA) to implement ECDH key exchange using elliptic curve cryptography.

Here's an example of creating an ECDH key pair, performing a key exchange with another party, and deriving a shared key using Java:

```
import javax.crypto.KeyAgreement;  
import javax.crypto.SecretKey;  
import javax.crypto.spec.ECGenParameterSpec;  
import java.security.*;  
import java.security.spec.ECParameterSpec;  
import java.security.spec.ECPublicKeySpec;  
import java.security.spec.InvalidKeySpecException;  
  
public class ECDHExample {  
    public static void main(String[] args) throws Exception {  
        // Generate an ECDH key pair  
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("EC");  
        ECGenParameterSpec ecGenParameterSpec = new ECGenParameterSpec("secp256r1");  
        keyPairGenerator.initialize(ecGenParameterSpec);  
        KeyPair keyPair = keyPairGenerator.generateKeyPair();  
        PrivateKey privateKey = keyPair.getPrivate();  
        PublicKey publicKey = keyPair.getPublic();  
  
        // Simulate the other party by generating its own ECDH key pair  
        KeyPair otherKeyPair = keyPairGenerator.generateKeyPair();  
        PrivateKey otherPrivateKey = otherKeyPair.getPrivate();  
        PublicKey otherPublicKey = otherKeyPair.getPublic();  
  
        // Perform key exchange with the other party  
        KeyAgreement keyAgreement = KeyAgreement.getInstance("ECDH");  
        keyAgreement.init(privateKey);  
        keyAgreement.doPhase(otherPublicKey, true);  
  
        // Derive the shared secret  
        byte[] sharedSecret = keyAgreement.generateSecret();  
  
        // Simulate the other party deriving the shared secret using its private key  
        KeyFactory keyFactory = KeyFactory.getInstance("EC");  
        ECParameterSpec ecParameterSpec = ((ECPublicKeySpec) otherPublicKey.getKeySpec(ECPublicKeySpec.class)).getParams();  
        PublicKey simulatedOtherPublicKey = keyFactory.generatePublic(new ECPublicKeySpec(((java.security.spec.ECPoint) otherPublicKey).getW(), ecParameterSpec));  
        KeyAgreement simulatedKeyAgreement = KeyAgreement.getInstance("ECDH");  
        simulatedKeyAgreement.init(otherPrivateKey);simulatedKeyAgreement.doPhase(publicKey, true);  
        byte[] simulatedSharedSecret = simulatedKeyAgreement.generateSecret();  
  
        // Compare the two shared secrets (should be equal)  
        System.out.println("Shared secret: " + bytesToHex(sharedSecret));  
        System.out.println("Simulated shared secret: " + bytesToHex(simulatedSharedSecret));  
        System.out.println("Shared secrets match: " + bytesToHex(sharedSecret).equals(bytesToHex(simulatedSharedSecret)));  
    }  
  
    public static String bytesToHex(byte[] bytes) {  
        StringBuilder sb = new StringBuilder();  
        for (byte b : bytes) {  
            sb.append(String.format("%02X", b));  
        }  
        return sb.toString();  
    }  
}
```

In this example, we first import the required classes and define a bytesToHex method to convert a byte array to a hexadecimal string.

Inside the main method, we first create an ECDH key pair using the KeyPairGenerator class with the “EC” algorithm and the “secp256r1” elliptic curve parameter property. We then extract the private and public keys from the key pair.

We simulate the counterparty by creating its own ECDH key pair using the same curve parameters.

---

### ECDSA Application

ECDSA (Elliptic Curve Digital Signature Algorithm) is a digital signature algorithm based on elliptic curve cryptography. In Java, you can use the Signature and KeyPairGenerator classes from the Java Cryptography Architecture (JCA) to implement ECDSA.

Here's an example of how to create an ECDSA key pair using Java, sign a message with the private key, and verify the signature with the public key:

```
import java.security.*;  
import java.security.spec.ECGenParameterSpec;  
import java.security.spec.InvalidKeySpecException;  
import java.security.spec.PKCS8EncodedKeySpec;  
import java.security.spec.X509EncodedKeySpec;  
  
public class ECDSAExample {  
    public static void main(String[] args) throws Exception {  
        // Generate an ECDSA key pair  
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("EC");  
        ECGenParameterSpec ecGenParameterSpec = new ECGenParameterSpec("secp256r1");  
        keyPairGenerator.initialize(ecGenParameterSpec);  
        KeyPair keyPair = keyPairGenerator.generateKeyPair();  
        PrivateKey privateKey = keyPair.getPrivate();  
        PublicKey publicKey = keyPair.getPublic();  
  
        // Sign a message with the private key  
        byte[] message = "Hello, world!".getBytes();  
        Signature signature = Signature.getInstance("SHA256withECDSA");  
        signature.initSign(privateKey);  
        signature.update(message);  
        byte[] signatureBytes = signature.sign();  
  
        // Verify the signature with the public key  
        Signature verifier = Signature.getInstance("SHA256withECDSA");  
        verifier.initVerify(publicKey);  
        verifier.update(message);  
        boolean signatureValid = verifier.verify(signatureBytes);  
  
        System.out.println("Signature valid: " + signatureValid);  
    }  
}
```

In this example, we first import the necessary classes.

Inside the main method, we generate an ECDSA key pair using the KeyPairGenerator class with the “EC” algorithm and the elliptic curve parameter property “secp256r1”. We extract the private and public keys from the key pair.

We then create a message to sign and use the Signature class to sign the message with the private key. To use SHA-256 as the hash function, we specify the “SHA256withECDSA” algorithm.

Next, we create a validator object using the Signature class and initialize it with the public key. We update the validator with the same message and verify the signature using the verification method. We compare the result to true to determine whether the signature is valid.

Note that in a real-world scenario, you will typically transmit the signed message and the public key separately to the verifier to ensure that the signature has not been tampered with during transmission.

---

In this article, I made cryptology applications with Java. You can access the article series from my profile. Don't forget to like and follow.