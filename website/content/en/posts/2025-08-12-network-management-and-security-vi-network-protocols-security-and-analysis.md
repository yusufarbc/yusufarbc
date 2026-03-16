---
date: '2025-08-12'
draft: false
title: 'Network Management and Security VI: Network Protocols Security and Analysis'
---

---

### Network Management and Security VI: Network Protocols Security and Analysis

![](https://cdn-images-1.medium.com/max/800/1*4B83QjV-QTWjVqB0z6ktug.png)

This article is structured to comprehensively analyze the four pillars of modern digital communication — email, web, Domain Name System (DNS), and file transfer. Each chapter will examine in depth the historical development of the relevant protocol family, the inherent vulnerabilities arising from its design, the modern security mechanisms developed to eliminate these vulnerabilities, and their place in today's complex threat environment. The main purpose of the report is to not only describe protocols and security plugins individually, but also to reveal the complex interactions, dependencies between them and their roles within a unified security architecture. For example, issues such as how a secure email infrastructure depends on a reliable DNS infrastructure or how secure web traffic requires layered defense at both the transport layer and the application layer will be discussed from a holistic perspective. This methodology aims to provide the reader with an integrated, strategic understanding of protocol security rather than isolated pieces of information.

---

### Chapter 1: The Security Architecture of Email Communications

Email remains one of the most critical tools of corporate and personal communication. However, the fact that the underlying SMTP protocol was designed without considering its security has made it a primary target for cyber attackers. This chapter provides a holistic analysis, starting with SMTP, the cornerstone of email communication, to the authentication and policy enforcement layers that define modern email security.

### 1.1. SMTP: The Cornerstone of Email and Its Inherent Vulnerabilities

#### Basic Architecture and Functioning of SMTP

Simple Mail Transfer Protocol (SMTP) is the basic protocol that operates at the application layer of the TCP/IP protocol suite and enables the transfer of e-mail messages between servers. The operation of this protocol governs the process by which an email created by a **Mail User Agent (MUA)**, for example Outlook or a Gmail web interface, is sent to a **Mail Transfer Agent (MTA)**, that is, the email server, which forwards the message to the recipient's MTA.

Communication begins with a TCP connection, usually established over ports 25, 465 (SMTPS) or 587 (Submission). Once the connection is established, a series of commands and responses are exchanged between the client and the server. The basic script consists of these steps:

1. `HELO` or more modern `EHLO` (Extended HELO): The client greets the server and starts the communication session.
2. `MAIL FROM`: Specifies the "envelope sender" of the e-mail. This address is the address where bounce messages will be sent if the e-mail cannot be delivered.
3. `RCPT TO`: Identifies one or more recipients of the email. This command is repeated for each recipient.
4. `DATA`: Indicates that the header and body part of the message will begin. The message content is terminated by a line containing a single period (`.`).

Once the email successfully reaches the recipient server, different protocols such as Post Office Protocol (POP3) or Internet Message Access Protocol (IMAP) are used to read it from the inbox by the recipient's MUA. SMTP is only responsible for outgoing and server-to-server mail transfer.

#### Historical Vulnerabilities: Risks by Design

SMTP was designed in the 1980s with the assumption that the Internet was not the global and potentially hostile environment it is today, but a smaller, trust-based network. Due to this historical context, there are no authentication or encryption mechanisms built into the protocol's original specifications. This fundamental design deficiency led to two critical vulnerabilities that are still felt today:

* **Open Relay:** This is the situation where an incorrectly configured SMTP server accepts and forwards emails whose sender or recipient is not within its local jurisdiction. This vulnerability allows the server to be misused by unidentified individuals to send large volumes of spam, phishing, or malware. Using an organization's server as an open relay seriously damages the reputation of that server's IP address and domain name; its presence on DNS-based Blackhole Lists (DNSBL) may also cause legitimate email communication to be blocked. To eliminate this risk, modern email servers are configured by default to only transfer emails from authenticated users or predefined trusted IP ranges.
* **Spoofing:** The SMTP protocol does not include any mechanism to check the accuracy of the sender address specified in the `MAIL FROM` command or, more importantly, the address in the `From:` header that the end user sees in the email client. This allows an attacker to easily manipulate email headers to make it appear that the email is from a trusted source (for example, a CEO, a bank, or a government agency). This fundamental vulnerability forms the basis of phishing and Business Email Compromise (BEC) attacks, which are the most common and dangerous types of cyber attacks today.

#### Modern Threats and Attack Vectors

More sophisticated and modern attack techniques have also emerged that build on the basic vulnerabilities of SMTP:

* **SMTP Smuggling:** This advanced attack technique exploits a vulnerability caused by different SMTP server software's different interpretation of the character string indicating the end of the data (DATA) portion of an email (such as `<LF>.<CR><LF>`). By exploiting this difference in interpretation between outbound and inbound servers, an attacker can "hijack" a second, spoofed email message hidden within a single legitimate email message. The outgoing server sees this as a single email, while the incoming server interprets it as two separate emails. Because this second, spoofed email does not pass the outgoing server's security checks (e.g. SPF) at all, it allows the attacker to bypass these protection mechanisms and send spoofed emails on behalf of a trusted domain. This attack affected popular MTAs such as Postfix, necessitating countermeasures with special configuration directives such as `smtpd_forbid_bare_newline=yes` to eliminate such ambiguities.
* **CRLF Injection:** Allows attackers to inject Carriage Return (CR, `\r`) and Line Feed (LF, `\n`) characters into the SMTP script if user input (for example, email subject line or recipient addresses) from sources such as web applications or mail clients is not properly sanitized. Because these characters are used to distinguish SMTP commands, an attacker can prematurely terminate an existing command and add new, unauthorized SMTP commands such as `RCPT TO` or `DATA`. This could lead to changing the message's recipients, manipulating its content, or using the server to send a completely different spam message.

### 1.2. Email Authentication Triangle: SPF, DKIM and DMARC

To address the lack of authentication inherent in SMTP, three primary protocols have been developed, each focused on solving a different problem and built on top of DNS. These protocols, SPF, DKIM and DMARC, do not provide complete protection on their own; But when combined, they form a layered and powerful defense mechanism against email fraud. This tripartite structure forms the basis of modern email security.

#### 1.2.1. Sender Policy Framework (SPF): Verifying the Envelope Sender

#### Working Principle

Sender Policy Framework (SPF) is an email authentication method that allows a domain owner to publicly declare the IP addresses of mail servers that are authorized to send email on behalf of their domain name. This declaration is published as a specially formatted TXT record in the domain's DNS settings.

When a receiving email server receives an email claiming to come from a domain, it follows these steps:

1. It detects the source IP address of the server that sends the e-mail.
2. Gets the domain name in the `MAIL FROM` (envelope sender) command used during the SMTP session.
3. It finds the SPF record by querying the DNS of this domain name.
4. It checks whether the IP address of the sending server is among the authorized IP addresses or mechanisms listed in the SPF record.

Based on this check result, a decision is made as to whether the email comes from a legitimate source.

#### DNS Record Structure and Syntax

An SPF record always starts with the tag `v=spf1`, which is the version information. This is followed by one or more mechanisms that identify authorized senders. Commonly used mechanisms are:

* `ip4:` and `ip6:`: Authorizes specific IPv4 or IPv6 addresses or CIDR ranges.
* `a`: Authorizes the IP address in the A or AAAA record of the domain name.
* `mx`: Authorizes the mail servers defined in the MX records of the domain name.
* `include:`: Includes another domain's SPF record in the current policy. This is commonly used when using third-party services (e.g. Google Workspace, SendGrid) for email sending.

At the end of each SPF record is a “qualifier” that specifies what to do for any other resources that do not match the mechanisms in the list:

* `-all` (Hard Fail): Strongly recommends rejecting emails from unauthorized IP addresses. This is the safest and most recommended option.
* `~all` (Soft Fail): Suggests that emails be accepted but marked as suspicious (for example, moved to the spam folder) rather than rejected. It is generally used during transition periods to DMARC.
* `?all` (Neutral): Does not express any opinion about the policy. It is generally for testing purposes and is not recommended in production environments.

#### Limitations and Challenges

While SPF is an important addition to email authentication, it is not a complete solution on its own and has some important limitations:

* `From:` **Lack of Header Validation:** The main limitation of SPF is that it only validates the `MAIL FROM` (RFC 5321) address in the SMTP envelope. It does not check the `From:` (RFC 5322) header that the end user sees in the email client, which is often spoofed. Therefore, while an attacker uses a domain name under his control in the `MAIL FROM` address, he can spoof the domain name of the targeted organization in the `From:` header, and in this case, the email can pass the SPF check.
* **Email Forwarding Issues:** When an email is forwarded from one server to another (forwarding), the server that resends the message is the forwarding server. The receiving server performs the SPF check via the IP address of this forwarding server. This legitimate email fails the SPF check because the referring server's IP address is not included in the original sender's SPF record.
* **10 DNS Query Limit:** During the verification of an SPF record, the total number of DNS queries made due to mechanisms such as `include:`, `a:`, `mx:` cannot exceed 10. Exceeding this limit will result in a condition known as "PermError" and will cause SPF verification to fail completely. This is especially a challenge for large organizations that use many third-party email services.

#### 1.2.2. DKIM (DomainKeys Identified Mail): Cryptographic Sealing of Message Integrity

#### Working Principle

DomainKeys Identified Mail (DKIM) is a method that uses public key cryptography to verify that the content of the email has not been altered in transit (integrity) and that the email was actually sent by a server responsible for the claimed domain (source authenticity).

DKIM's working process is as follows:

1. **Signing:** The sending email server creates a unique digital signature for each outgoing email. This signature contains a hash of the specific headers of the email (for example, `From:`, `To:`, `Subject:`) and the body of the email.
2. **Cryptographic Seal:** The server encrypts this digest with a private key belonging to its domain name.
3. **Adding Header:** This created encrypted signature is added to the headers of the e-mail as a new header called 'DKIM-Signature'.

#### Verification Process

When the receiving email server receives a DKIM-signed email, it performs the following verification steps:

1. Reads the `DKIM-Signature` header from the email.
2. Using the `d=` (domain - signing domain) and `s=` (selector - key selector) tags in this header, it queries a specific TXT record in the DNS of the signing domain. The query address is in the format `s._domainkey.d` (for example, `google._domainkey.example.com`).
3. It receives the public key from DNS, which corresponds to the private key used for signing.
4. The receiving server calculates its own digest using the same headers and body of the email.
5. Using the public key received from DNS, it decrypts the encrypted signature in the `DKIM-Signature` header and obtains the original digest.
6. The receiving server compares the summary it calculated itself with the original digest he deciphered from the signature. If the two hashes match, DKIM authentication is successful. This proves that the message was actually sent by the specified domain and was not modified en route. Details of this protocol are defined in the RFC 6376 standard.

#### Configuration and Key Management

Implementing DKIM requires publishing a public key in DNS. The concept of “selector” allows a domain to use more than one DKIM key at the same time. This allows different email sending services (e.g., enterprise servers, marketing automation platforms) to use their own separate key pairs when sending emails on behalf of the same domain. It also facilitates switch rotation, i.e. invalidating old switches while commissioning new ones, without interruption of service.

#### 1.2.3. DMARC (Domain-based Message Authentication, Reporting, and Conformance): Policy, Alignment and Reporting

#### Working Principle

Domain-based Message Authentication, Reporting, and Conformance (DMARC) is a policy and reporting layer built on top of SPF and DKIM. The main purpose of DMARC is to enable a domain owner to provide clear instructions to receiving servers about what to do with emails that appear to come from their domain but fail SPF or DKIM authentication checks. These instructions are transmitted via a single TXT record published in the domain name's DNS at `_dmarc.example.com`. DMARC is defined by the RFC 7489 standard.

#### Alignment

The most critical and powerful concept of DMARC is "alignment". For an email to pass a DMARC check, it is not enough to just pass one of the SPF or DKIM verifications; this validation also needs to be "aligned" with the domain name in the `From:` header that the end user sees.

* **SPF Alignment:** For the email to pass SPF for DMARC, it means that the sending server IP is found in the SPF record of the domain in the `MAIL FROM` (envelope sender) AND the domain in the `MAIL FROM` address matches (or is a subdomain) the domain in the `From:` header.
* **DKIM Alignment:** When the email passes DKIM for DMARC, it means that the DKIM signature is valid AND the domain specified in the `d=` tag in the `DKIM-Signature` header matches (or is a subdomain) the domain name in the `From:` header.

This alignment check directly targets and prevents the `From:` header spoofing issue, which SPF and DKIM alone cannot effectively solve.

#### Policy Implementation and Reporting

A DMARC record can instruct receiving servers to take three different actions via the `p` (policy) tag:

* `p=none`: Also known as "track mode". The receiver asks the server not to take any action on emails that fail the DMARC check, but simply deliver them. But even in this mode, the domain owner receives bulk reports to the address specified with the `rua` tag. This is used to analyze email flow and detect legitimate sending sources when implementing DMARC for the first time.
* `p=quarantine`: Requests the receiving server to mark emails that fail the DMARC check as suspicious rather than rejecting them, usually moving them to the user's spam or junk folder.
* `p=reject`: The strictest policy. The receiver requests the server to completely reject and not deliver emails that fail the DMARC check. This provides the strongest protection against domain spoofing and is the ultimate goal for any organization.

DMARC's reporting feature is invaluable for domain owners. The `rua` (Reporting URI for Aggregate data) tag specifies the email address to which XML-based aggregate reports sent by receiving servers on a daily basis will be sent, summarizing how much email from which IPs passed or failed SPF/DKIM/DMARC checks. The `ruf` (Reporting URI for Forensic data) tag defines the address to which forensic reports containing specific examples of authentication errors will be sent. These reports are critical for monitoring the health of an organization's email ecosystem, troubleshooting configuration errors, and detecting fraudulent attempts using its domain name.

SPF and DKIM have emerged as independent technologies to improve email security. However, they lack policy enforcement mechanisms and are not sufficient on their own against `From:` header spoofing. Their lack of success has limited their adoption. The emergence of DMARC has fundamentally changed this equation. DMARC has taken the authentication results of SPF and DKIM and assigned a “meaning” and “action” (i.e. a policy) to them. An organization that wants to enforce a strict DMARC policy such as `p=reject` now *must* configure SPF and DKIM correctly; Otherwise, they run the risk of having their legitimate emails blocked as well. This has led to DMARC itself acting as a “policy engine”, a catalyst that encourages both more widespread adoption and more accurate configuration of the two protocols that preceded it. This is an important example in cybersecurity of how an upper-layer standard can mandate the adoption and maturation of its underlying components.

![](https://cdn-images-1.medium.com/max/800/1*-0B-a2lIL3ynJWniGhKLgg.png)

SPF, DKIM, DMARC

### 1.3. Advanced Email Threats and Holistic Protection Strategies

While protocol-level controls such as SPF, DKIM, and DMARC play a critical role in weakening the technical basis of email fraud, attackers are constantly developing new methods to bypass these defenses or target the human factor.

#### Attack Anatomy: Phishing, Spear Phishing, and BEC

* **Phishing:** These are fake e-mails aimed at a wide audience, usually sent by impersonating a well-known and reliable institution (bank, social media platform, cargo company). These emails often create a sense of urgency or panic in the user (e.g., “your account has been suspended,” “a suspicious login has been detected”), encouraging them to click a link to a fake website or open a malicious attachment. The goal is to steal users' credentials, credit card numbers or other sensitive data.
* **Spear Phishing:** These are phishing attacks that target a specific person, group or institution, and are much more personalized and therefore more convincing. Before carrying out the attack, the attacker gathers information about the target from social media, corporate websites or other open sources. This information (e.g., target's name, position, projects worked on, co-workers) is used to make the email appear more legitimate and personalized, significantly increasing the likelihood of the target being trapped.
* **Business Email Compromise (BEC):** It is one of the most financially motivated and sophisticated types of email attacks. In BEC attacks, the attacker typically impersonates a senior executive within the organization (CEO, CFO) or a trusted business partner (lawyer, supplier). The target is usually an employee in the finance or human resources department who has authority to transfer funds or access sensitive data. The attack typically does not involve a malicious link or attachment; Instead, it focuses on using social engineering techniques to persuade the target to make an immediate and confidential money transfer or share sensitive data such as employee salary information. Attackers may use similar domain names (for example, `examp1e.com` instead of `example.com`), compromised legitimate email accounts, or fake `From:` headers to gain the target's trust.

#### Holistic Layers of Defense

An effective email security strategy does not rely solely on technical controls; It requires a layered defense-in-depth approach that brings together technology, human factors and organizational processes.

#### **Technical Precautions**

* **Basic Authentication:** Full and correct implementation of SPF, DKIM and DMARC with the `p=reject` policy blocks the vast majority of domain spoofing attacks before they even reach the inbox. This is an essential and indispensable first line of defense.
* **Secure Email Gateways (SEG):** These solutions offer additional layers of security by analyzing email traffic before it enters the corporate network. **Advanced Threat Protection (ATP)** modules perform sandbox analysis to detect unknown malware. Content filtering features prevent sensitive data from leaking, while spam and phishing filters block known threats.
* **Protocol Security:** The SMTP communication itself must be encrypted using STARTTLS. This is the communication between client and server, and it provides protection against man-in-the-middle attacks by ensuring the confidentiality and integrity of the file.

#### **Human Factors and User Training**

No matter how strong technical controls are, social engineering attacks target the weakest link: the human. Therefore, the last line of defense is always the user.

* **Awareness Trainings:** Regular and continuous cyber security awareness trainings should be organized for employees. These trainings should increase their ability to recognize and report common characteristics of suspicious emails (sudden sense of urgency, unexpected requests, grammatical and spelling errors, inconsistencies in sender address).
* **Simulated Phishing Attacks:** Periodically organizing controlled and simulated phishing attacks within the organization is a critical tool to measure the awareness level of employees and evaluate the effectiveness of training. The results of these tests should be used to shape future training programs by identifying areas of weakness.

#### **Procedural Checks**

* **Out-of-Band Verification:** A second verification channel other than email should be mandatory, especially for critical requests such as money transfer, changing payment information or sharing sensitive data. For example, an urgent money transfer request from a manager should be confirmed verbally at a pre-known phone number rather than answered by email. This simple procedure is one of the most effective countermeasures against BEC attacks.

Protocols such as SPF, DKIM, and DMARC accurately assume the basic structure of the SMTP session, namely who is talking to whom and what the message is. But the SMTP Smuggling attack challenges this basic assumption. By exploiting protocol interpretation differences between the two MTAs, the attacker “hides” a second, spoofed session within a single SMTP session. The outgoing server sees this as a single email and applies security checks. However, the incoming server interprets these as two separate e-mails due to an ambiguity in the data flow. The second (fake) email effectively bypasses these protections because it does not pass the outgoing server's SPF/DKIM checks at all. This shows that even the most robust security layers can be affected by vulnerabilities in the most subtle and unexpected implementation differences of the underlying protocol. Security must be ensured not only in the theoretical definition of the protocol, but also at the intersection of its heterogeneous implementations. This is an important finding that suggests that protocol standards and practices need to be continually reviewed and tightened.

---

### Chapter 2: The Security Architecture of Web Communications

The web is the epicenter of modern information exchange, commerce and social interaction. The HTTP protocol that underpins this ecosystem was originally designed without security concerns. This section examines in depth HTTPS, the secure version of HTTP, which is the basic communication protocol of the web, TLS, which is the basic cryptographic protocol that provides this security, HSTS and other OWASP security headers that provide additional security layers at the browser level, and finally critical vulnerabilities and prevention techniques at the application layer.

### 2.1. Evolution from HTTP to HTTPS: Fundamentals of a Secure Web

#### The Insecure Nature of HTTP

Hypertext Transfer Protocol (HTTP) is the basic application layer protocol that enables communication between web browsers (clients) and web servers. However, the original design of HTTP transmits data over the network unencrypted, that is, in cleartext. This means that any third party able to eavesdrop on network traffic between client and server (for example, an attacker on the same Wi-Fi network or an internet service provider) can easily read and even modify all transmitted data — usernames, passwords, credit card information, personal messages — . This type of attack is known as a **Man-in-the-Middle (MitM)** attack and is the most fundamental security vulnerability of HTTP.

#### Security Triangle Provided by HTTPS

HTTPS (HTTP Secure) is the encrypted version of the HTTP protocol with the **Secure Sockets Layer (SSL)** or its modern successor, the **Transport Layer Security (TLS)** protocol. The letter “S” in the URL stands for “Secure” and addresses the vulnerabilities of HTTP by providing three basic security guarantees:

1. **Privacy (Confidentiality):** All data exchange between client and server is encrypted using strong cryptographic algorithms. This prevents an attacker eavesdropping on network traffic from understanding the content of the intercepted data. The data appears as a meaningless string of characters.
2. **Integrity:** Whether the transmitted data has been changed from the moment it is sent to the moment it is received is checked through message authentication codes (MAC). This prevents an attacker from changing data in transit (for example, the amount of a money transfer) without being detected.
3. **Authentication:** Verifies that the user is actually connecting to the server they want to communicate with (for example, not a fake site `banka-dolandirici.com` instead of `banka.com`). This is achieved by the server presenting a digital certificate (SSL/TLS certificate) issued by a Certificate Authority (CA) that is trusted by browsers. Modern web browsers notify the user of a secure HTTPS connection by displaying a prominent lock icon in the address bar, which increases user trust.

### 2.2. In-Depth Analysis of TLS Protocol

The technology underlying the security provided by HTTPS is the TLS protocol. TLS operates a complex cryptographic process to establish a secure communication channel between client and server.

#### 2.2.1. TLS Handshake: Establishing a Secure Channel

#### General Purpose

The TLS handshake is a negotiation and authentication process that the client and server perform before the actual exchange of encrypted data begins. The main goals of this process are:

* Agree on the TLS protocol version to use (for example, TLS 1.2, TLS 1.3).
* Agreeing on the set of encryption algorithms (cipher suite) to be used.
* Verifying the server's identity through its digital certificate.
* Securely creating and sharing “session keys” that are unique for each session and will be used to symmetrically encrypt data throughout the session.

#### TLS 1.2 Handshake Steps

The handshake process in TLS 1.2 and earlier typically requires two full round-trip times (Round-Trip Time — RTT) and consists of the following steps:

1. **ClientHello:** The client (browser) sends a `ClientHello` message to the server. This message contains the highest TLS version it supports, a list of the cipher suites it supports, and a 32-byte piece of random data called "client random."
2. **ServerHello:** The server selects the highest mutually supported TLS version and strongest cipher suite from the client's list. It generates its own "server random" data and responds to the client with a 'ServerHello' message.
3. **Certificate & ServerHelloDone:** The server sends its digital certificate (and intermediate certificates if necessary) to the client to prove its identity. It then sends a `ServerHelloDone` message informing it that it has completed the first part of the handshake on its side. This completes the first round trip.
4. **ClientKeyExchange & ChangeCipherSpec & Finished:** The client verifies the server's certificate. It then generates another random secret called the “pre-master secret”. It encrypts this secret with the public key it receives from the server's certificate and sends it to the server with a 'ClientKeyExchange' message. Then, both client and server independently calculate the same session keys using these three random data (client random, server random, pre-master secret). The client sends a `ChangeCipherSpec` message informing that all further communication will be encrypted with these new keys and an encrypted `Finished` message indicating that the handshake is finished on its end.
5. **ChangeCipherSpec & Finished (Server):** The server completes the handshake by sending its own 'ChangeCipherSpec' and encrypted 'Finished' messages after the 'ChangeCipherSpec' and 'Finished' messages it receives from the client. This completes the second round trip.

#### What's New in TLS 1.3 (RFC 8446)

Standardized in RFC 8446 published in August 2018, TLS 1.3 is one of the most significant updates in the protocol's two-decade history, making the handshake process both faster and more secure.

**Accelerated Handshake (1-RTT):** The biggest performance improvement of TLS 1.3 is that it reduces the handshake to a single round-trip (1-RTT). This is achieved as follows: In the `ClientHello` message the client now not only lists cipher suites, but also predicts the most likely key exchange algorithm (usually Elliptic Curve Diffie-Hellman - ECDHE) and sends its own key sharing data required for this algorithm in advance. This way, when the server sends the `ServerHello` message, it has enough information to calculate the session keys and can complete the handshake on its side. This optimization eliminates the need for a second round trip, significantly reducing connection establishment time, especially on high-latency mobile networks.

**Increased Security:** TLS 1.3 increases security in several ways:

* **Removal of Old Algorithms:** Weak hash algorithms such as MD5, SHA-1 and insecure symmetric ciphers such as RC4 and 3DES have been completely removed. Additionally, mechanisms that do not provide forward secrecy, such as RSA key exchange, have also been removed from the protocol.
* **Forward Secrecy Enforcement:** TLS 1.3 only supports key exchange algorithms (such as ECDHE) that generate temporary and unique keys for each session. This ensures that even if an attacker obtains the server's long-term private key in the future, they will not be able to decipher encrypted sessions saved in the past.
* **More Encryption:** While some handshake messages, such as the server certificate, are sent unencrypted in TLS 1.2, TLS 1.3 encrypts a larger portion of the handshake, increasing confidentiality and making analysis on the network more difficult.

#### 2.2.2. Digital Certificate Lifecycle Management

#### Certificate Authorities (CA) and Chain of Trust

Digital certificates are electronic documents that verify the identity and ownership of a website. These certificates are issued by Certificate Authorities (CAs) that are pre-defined as trusted in the “root store” of browsers and operating systems. The trust model is based on a hierarchical "chain of trust". An end-user certificate (for example, for `www.example.com`) is typically not signed directly by a root CA, but by one or more intermediate CAs signed by that root CA. The browser checks the validity of the certificate by following this chain, verifying each signature until it reaches a root CA it trusts.

#### Certificate Types

Certificates vary in their level of verification:

* **Domain Validated — DV:** This is the most basic level. The CA simply verifies that the person requesting the certificate has the authority to control the domain name.
* **Organization Validated — OV:** In addition to domain ownership, the CA verifies the legal existence of the requesting organization.
* **Extended Validation — EV:** Contains the most stringent verification process and was historically indicated by the green address bar in browsers.

There are also **Wildcard** certificates that secure all subdomains of a domain (`*.example.com`) with a single certificate.

#### Lifecycle

Certificates have a limited validity period (currently usually one year). Therefore, certificate management is a critical operational process. This life cycle; It includes the steps of discovering certificates within the network, generating or purchasing new certificates, uploading them to the servers, keeping their inventory, monitoring their validity period, and most importantly, renewing them on time before they expire. An expired certificate will cause users to receive security warnings when accessing the website and make the site inaccessible. To prevent such service interruptions and human errors, automating renewal processes through Azure Key Vault or other certificate management platforms is considered a best practice for modern infrastructures.

### 2.3. Policies That Increase Browser and Server Security

While HTTPS provides security at the transport layer, additional HTTP headers sent by servers can enable the security features of modern browsers, creating additional layers of defense.

#### 2.3.1. HSTS (HTTP Strict Transport Security): Defending Against Protocol Downgrade Attacks

#### Working Principle

When a user visits a website securely (over HTTPS) for the first time, the server may send the `Strict-Transport-Security` HTTP header with its response. This header instructs the browser: "This domain has been registered for the specified period of time (`max-age`)."Connect using HTTPS only and only for a period of time (defined in seconds)." Once the browser receives this policy, it saves it in its local storage. During this period, even if the user tries to access this site with the `http://` protocol or clicks on an insecure HTTP link, the browser will automatically and internally escalate this request to the `https://` protocol before making any network request.

#### Protection Mechanism

The main purpose of HSTS is to prevent protocol downgrade attacks, also known as "SSL-stripping". In this type of MitM attack, the attacker comes between the user and the server and presents an insecure HTTP connection to the user's browser, while he himself establishes a secure HTTPS connection to the server. In this way, it can listen to unencrypted traffic between the user and the user. A browser with an active HSTS policy does not allow this type of downgrade attack because it necessarily upgrades all connections to the site to HTTPS and terminates the connection.

`includeSubDomains` and `preload`

The HSTS header may contain two important additional directives:

* `includeSubDomains`: This directive ensures that the HSTS policy applies to all subdomains, not just the main domain.
* `preload`: The weakness of HSTS is that the user must securely visit the site at least once for the policy to be effective. At this "first connection" moment the user is still vulnerable to an SSL-stripping attack. The `preload` directive solves this problem. Sites with this directive can apply to be included in a “HSTS preload list” managed by browser manufacturers (Google, Mozilla, etc.) and embedded directly into browsers. Once a domain is on this list, the browser knows to always connect to it with HTTPS, even if it has never visited that site before. This completely eliminates the initial connection vulnerability.

#### 2.3.2. OWASP Security Headers: Redirecting Browser Behavior

The Open Web Application Security Project (OWASP) recommends using a set of HTTP response headers to improve web application security. These headers protect against various types of attacks by restricting certain behavior of the browser.

* **Content-Security-Policy (CSP):** It is an extremely powerful security mechanism that defines in detail what types of resources (JavaScript, CSS, images, fonts, etc.) a web page can load and from which locations (URLs) these resources can be loaded. A properly configured CSP can greatly reduce or completely prevent the impact of Cross-Site Scripting — XSS and data injection attacks. For example, the `script-src 'self' https://apis.google.com` directive allows the browser to execute JavaScript files only from the page's own source or from `apis.google.com`, blocking all other sources.
* **X-Frame-Options:** Controls whether a web page can be embedded within another site using tags such as `<frame>`, `<iframe>`, `<embed>` or `<object>`. The main purpose of this header is to prevent "clickjacking" attacks, where the page is placed within an invisible frame to make the user unknowingly perform a harmful action. The `DENY` value prevents framing completely, while `SAMEORIGIN` only allows framing of pages from the same source. The functionality of this header has been inherited by CSP's `frame-ancestors` directive in modern browsers and it is recommended to use this directive.
* `X-Content-Type-Options: nosniff`: Prevents the browser from "guessing" (MIME-sniffing) the MIME type of a resource other than the `Content-Type` header sent by the server. This reduces security risks by, for example, preventing a text file from being interpreted as an executable script.
* `Referrer-Policy`: Controls how much information the browser sends about the source URL in the `Referrer` header when a user moves from one site to another via a link. This can help prevent sensitive information from being leaked via URLs.

### 2.4. Web Application Vulnerabilities and Prevention Techniques (OWASP Top 10)

While HTTPS and other security headers protect data at the transport layer and browser level, they do not fix logic errors or coding vulnerabilities in the application itself. OWASP Top 10 are the most common and most critical trust issues in web applications.It is an industry standard awareness document that documents health risks.

#### A03:2021 — Injection

Injection vulnerabilities occur when untrusted user input is sent to an interpreter (for example, a SQL database or operating system shell) as part of a command or query.

#### **SQL Injection (SQLi)**

It is the most known type of injection. An attacker injects specially crafted SQL commands via a web form or URL parameter to manipulate the SQL query the application is running in the background. A successful SQLi attack could allow the attacker to read, modify or delete all data in the database, bypass authentication mechanisms, and in some cases even run commands on the underlying operating system.

* **Prevention:** The most effective and standard way to prevent SQL injection is to use **parameterized queries (prepared statements)** instead of concatenating user input directly into the query string. In this technique, the SQL query is first sent to the database as a template and the user input is then passed as a separate parameter. This method ensures that the database always treats user input as data and never interprets it as an executable command, making injection fundamentally impossible.

#### Cross-Site Scripting (XSS)

XSS is an injection vulnerability and occurs when an attacker injects untrusted input (usually JavaScript code) into a web page and causes that code to be executed in another user's browser. A successful XSS attack allows the attacker to steal the victim user's session cookies, modify page content, obtain sensitive information, or perform actions on the user's behalf.

#### **Types:**

* **Reflected XSS:** Malicious script is sent to the server, usually via a URL parameter, and the server immediately “reflects” the script back as part of the response. The attack is triggered when the victim clicks on a specially crafted link.
* **Stored XSS:** The most dangerous type. The attacker saves the malicious script in the website's database (for example, via a comment, forum post, or user profile). This malicious script then runs in the browser of every user who views this content.
* **DOM-based XSS:** The vulnerability is in the client-side JavaScript code of the page, not in the server-side code. Occurs when the script insecurely reads part of the URL (for example, `location.hash`) and writes it to the DOM.

#### **Prevention Methods:**

* **Output Encoding:** The most basic and important defense against XSS is to appropriately encode all data coming from the user according to the context in which it will be displayed in HTML. For example, for data to be printed in the HTML body, the `<` character should be encoded as `&lt;` and the `>` character should be encoded as `&gt;`. This ensures that the browser interprets these characters as plain text and not as HTML tags.
* **Content Security Policy (CSP):** As a second line of defense, a strong CSP can prevent the exploitation of an XSS vulnerability by preventing unauthorized scripts from running, even if there is a coding error.
* `HttpOnly` **Cookie Flag:** When session cookies are set with the `HttpOnly` flag, these cookies cannot be accessed via client-side scripts (JavaScript). This prevents the attacker from stealing the session cookie, the most valuable target, even if an XSS vulnerability is successful.

Web security must be addressed at two basic and distinct layers: the transport layer and the application layer. HTTPS and TLS ensure the security, that is, confidentiality and integrity, of data while it is *transported* between the client and the server. However, this provides no assurance about how the data is processed and interpreted by the *application* once it reaches the server. Critical vulnerabilities such as SQL Injection and XSS can be exploited over a completely secure and encrypted HTTPS channel. This is one of the clearest and most important examples of the "defense-in-depth" principle in cyber security in web architecture. Security is not a feature provided at a single point, but a process that must be implemented at every layer of the system (network, transport, application, data).

In the traditional web model, the server sends content and the browser processes that content according to its default rules. But CSP and other OWASP security headers have radically changed this dynamic. The server no longer just sends content, it also sends a “policy document” with strict rules on *how* that content will be rendered in the browser, what resources it can load, and what actions it can perform. For example, the `Content-Security-Policy: script-src 'self'` header instructs the browser "I do not allow you to run any JavaScript code within this HTML document that I have sent you that does not come from me (the same source)." This allows the server to define the security boundaries of the client-side (browser) execution environment dynamically and specifically for each response. In this model, the server becomes a sort of remote rule configurator for the browser's security engine. This is a significant paradigm shift in the sharing of responsibility between server and client, placing the responsibility for security more proactively on the server side.

![](https://cdn-images-1.medium.com/max/800/1*C_77zQqrn-BGzkE5DYFK1A.png)

TLS Types

---

### Chapter 3: Security Architecture of the DNS Infrastructure

Domain Name System (DNS), a key component of the internet, allows users to access websites and other services using memorable domain names rather than complex IP addresses. This “phone book” of the Internet, while critical to its operation, has also been an attractive target for cyber attackers because it has historically been designed with security concerns in mind. This chapter examines the basic functioning of DNS, the classic attacks that target it, and the two basic and complementary security layers developed against these attacks: data integrity with DNSSEC and query confidentiality with DoH/DoT.

### 3.1. DNS Protocol and Classic Attack Vectors

#### Hierarchical Structure of DNS and Basic Records

The Domain Name System (DNS) is a worldwide distributed, hierarchical database system that translates human-readable domain names (for example, `www.example.com`) into IP addresses (for example, `192.0.2.1`) that machines use to communicate on the network. This hierarchy starts from the root (`.`) servers at the top and extends to the Top-Level Domain (TLD) servers (for example, `.com`, `.org`, `.tr`) and finally to the authoritative name servers that host the records of a particular domain name.

Various record types are used in DNS for network management and correct operation of services. The most basic and common are:

* `A` **and** `AAAA` **Records:** Maps a domain name to an IPv4 and an IPv6 address respectively. This is the most basic DNS record.
* `CNAME` **(Canonical Name) Record:** Creates an alias that points a domain name to another domain name. For example, `www.example.com` can be redirected to `example.com` with a CNAME record.
* `MX` **(Mail Exchange) Record:** Specifies which mail server should process emails sent to a specific domain. There may be more than one MX record and the server with the lower priority value is tried first.
* `TXT` **(Text) Record:** Used to store text-based information about the domain name. One of the most important uses in the modern internet is to publish email authentication policies such as SPF, DKIM and DMARC.
* `NS` **(Name Server) Record:** Identifies the name servers that are authoritative for a domain or subdomain.
* `SOA` **(Start of Authority) Record:** Contains basic authority information such as the primary name server of a DNS zone, administrator email address, serial number and renewal schedules.

#### DNS Spoofing and Cache Poisoning Attacks

DNS, like SMTP, was developed at a time when security was not the primary design goal. Therefore, the DNS protocol is inherently vulnerable to the type of attack known as DNS cache poisoning.

* **Working Mechanism:** When a user wants to visit a website, his computer sends a query to a DNS resolver, usually the server of the internet service provider (ISP), to find out the IP address of this domain name. If the resolver cannot find this information in its own cache, it obtains the correct information from the authoritative name server by following the DNS hierarchy. To improve performance, the parser stores this response in its cache for a certain period of time (Time-to-Live — TTL). In a DNS cache poisoning attack, an attacker can respond to a query without waiting for the resolver to receive the actual response from the authoritative server and sends a fake DNS response. In order for this fake response to be accepted, the attacker must correctly guess some technical details such as transaction ID and source port number. If the fake response reaches the parser before the real response and these parameters match, the parser caches the fake information as legitimate.
* **Consequence:** Once the cache is “poisoned,” all users using that resolver are unknowingly redirected to a malicious server controlled by the attacker when they try to go to a legitimate site (for example, an online banking site). This fake site is often an exact copy of the original site and is used to steal users' credentials, passwords, or financial data (phishing), install malware on their computers, or launch more sophisticated attacks.

### 3.2. DNS Data Integrity and Source Authentication: DNSSEC

The main reason for attacks such as DNS cache poisoning is that the standard DNS protocol does not perform any authentication or integrity checks on incoming responses. **DNS Security Extensions (DNSSEC)** are designed to address this fundamental vulnerability.

#### Working Principle

DNSSEC adds a public key cryptography-based digital signature mechanism to the DNS protocol to verify the origin of DNS data (origin authentication) and ensure that this data has not been modified in transit (data integrity). An important point is that DNSSEC does not encrypt DNS queries and responses; The data can still be viewed as plain text. The only assurance that DNSSEC provides is that the data received really comes from the authoritative server and its integrity is not compromised.

#### Chain of Trust

DNSSEC's trust model is built on a "chain of trust" that follows the DNS's own hierarchical structure. This chain starts with the public key of the DNS root zone, which is located at the top and is pre-trusted by all DNSSEC-compliant resolvers. This key functions as a “trust anchor”.

The process works like this:

1. Each DNS zone (for example, `.com` or `example.com`) generates a key pair (public and private) to sign its records.
2. A child zone (for example, `example.com`) creates a `DS` (Delegation Signer) record containing a hash of its public key and registers this record in its parent zone (`.com`).
3. The parent zone (`.com`) confirms the validity of the child zone's key by signing this `DS` record with its private key. When a DNS resolver wants to verify the registration of a domain name, it follows this chain of `DS` and `DNSKEY` records step by step, starting with the trusted key of the root zone. At each step, the signature of a parent region verifies the key of a child region, and this process continues until the queried record is reached. This uninterrupted cryptographic chain ensures the response is verified at every level.

#### DNSSEC Record Types (RFC 4034)

DNSSEC adds new resource record types to DNS to ensure its functionality:

* `DNSKEY`**:** Contains the public key used to sign a zone. Generally, two keys are used, one being the key signing key (KSK) and the other being the zone signing key (ZSK).
* `RRSIG` **(Resource Record Signature):** Contains the digital signature of a specific set of DNS records (for example, the A records of a domain name). The resolver verifies this signature with the corresponding `DNSKEY`.
* `DS` **(Delegation Signer):** Contains the hash of the `DNSKEY` record of a child zone and is located in the parent zone. It is the most critical link in the trust chain.
* `NSEC`**/**`NSEC3`**:** Used to cryptographically prove that a domain name or record "does not exist" (authenticated denial of existence). This prevents attackers from injecting spoofed responses for non-existent subdomains.

### 3.3. Privacy in DNS Queries: Comparison of DoH and DoT

While DNSSEC guarantees the correctness and integrity of DNS responses, the DNS queries themselves are still sent in unencrypted, plaintext. This allows an internet service provider (ISP), network administrator, or anyone listening to network traffic to see which websites a user has visited and collect that information. DNS over TLS (DNS over TLS — DoT) and DNS over HTTPS (DNS over HTTPS — DoH) are two modern protocols developed to solve this privacy problem.

#### DNS over TLS (DoT)

* **Technical YAPI:** DoT encrypts standard DNS queries and responses directly within a Transport Layer Security (TLS) tunnel. For this purpose, it uses **TCP Port 853**, which is specifically assigned by IANA. The communication is basically still the DNS protocol, just wrapped in a secure TLS layer.
* **Advantages and Disadvantages:** DoT's use of a unique port allows network administrators to easily identify, monitor and filter DNS traffic. This is a significant advantage for enforcing security policies (for example, blocking access to malicious sites) in corporate networks. However, this prominence also means that DoT traffic can easily be targeted for censorship or blocking purposes.

#### DNS over HTTPS (DoH) (RFC 8484)

* **Technical Structure:** DoH formats DNS queries and responses as a standard HTTPS `GET` or `POST` request. These requests are sent over **TCP Port 443**, the same as all other web traffic. This architecture allows DNS queries to be completely hidden among and become indistinguishable from other HTTPS traffic, such as normal web browsing, API calls, or video streaming.
* **Advantages and Disadvantages:** Camouflaging DNS traffic within other web traffic makes DoH extremely effective at maximizing user privacy and bypassing censorship or blocking at the network level. However, this creates a serious challenge for enterprise network administrators. Browsers or applications can use their own built-in DoH resolvers, completely bypassing the operating system's or network's DNS settings. This can render corporate security filters, parental controls, and content filtering policies ineffective. This represents a significant “blind spot” for network administrators and loss of control over the network.

DNS security is split into two different technologies to solve two separate but related problems. DNSSEC: “Is this DNS response correct and does it really come from the authoritative server?” It provides **integrity** and **authentication** by answering the question. DoH and DoT ask, “Can a third party see who made this DNS query and what they asked?” Provides **privacy** by answering the question. These two technologies are not alternatives to each other; On the contrary, both must be used together for a holistic and modern DNS security architecture. The presence of one does not make the other unnecessary.

The basic design philosophy of DoH is to “camouflage” DNS traffic within standard HTTPS traffic. While this is a victory for individual user privacy and bypassing censorship, it is a nightmare for corporate network management and security. Traditionally, network administrators would detect malware command-and-control (C2) communication, data leak attempts, and corporate policy violations by monitoring DNS queries. By removing this visibility, DoH creates a “shadow IT” situation where users or applications can use their own DNS resolvers, bypassing corporate policies. This represents one of the most fundamental tensions in the world of cybersecurity: the balance between individual privacy and organizational control and security. This conflict is one of the most important debates that will shape the future architecture and management of the Internet.

![](https://cdn-images-1.medium.com/max/800/1*EH_7Ex7NamcxzJeldgLUEQ.png)

DoT vs DoH

---

### Chapter 4: Security Architecture of File Transfer Protocols

File Transfer Protocol (FTP), one of the Internet's oldest and most fundamental protocols, has been used for decades to transfer files between machines. However, the fact that it was not designed with security in mind has made it a major risk for modern networks. This chapter dives into the inherent vulnerabilities of the legacy FTP protocol, the two different and often confused secure approaches that have emerged to solve these problems (FTPS and SFTP), and the key architectural differences between these two protocols.

### 4.1. Security Risks of the Legacy FTP Protocol

#### Basic Functioning and Vulnerabilities

File Transfer Protocol — FTP is a standard network protocol designed for uploading and downloading files between a client and a server. However, its most fundamental and critical vulnerability is that it carries out all communication — including username, password, and transferred file data — over the network without encryption, that is, in plaintext. This means that any attacker eavesdropping on network traffic may be able to access credentials and this means that it can easily intercept the contents of transferred files. Because of this fundamental lack of security, its use for the transfer of sensitive data is strictly prohibited by modern security and compliance standards such as PCI DSS (Payment Card Industry Data Security Standard) and HIPAA (Health Insurance Portability and Accountability Act).

#### Command and Data Channels Problem

FTP's architecture has another important feature that complicates its operation and security: it uses two separate TCP connections.

* **Command Channel (Control Channel):** It is usually installed via port number 21 as standard. This channel is used for the client to connect to the server, authenticate, and send commands such as `LIST` (list files), `RETR` (download file), `STOR` (upload file).
* **Data Channel:** It is the channel through which the actual file content or directory lists are transferred. The port number of this channel is determined dynamically over the command channel and a new connection is established for each transfer.

This dual-channel structure leads to serious configuration difficulties, especially behind firewalls and Network Address Translation — NAT devices commonly used in modern networks. Firewalls must be specifically configured to allow these dynamically opened data channel ports, which both increases complexity and expands the attack surface of the network, creating potential security risks.

### 4.2. Secure Alternatives: Comparative Analysis of FTPS and SFTP

To address the inherent insecurity of FTP, two main protocols have been developed: FTPS and SFTP, both of which provide secure file transfer but are fundamentally based on completely different technologies.

#### 4.2.1. FTPS (FTP over SSL/TLS): Securing FTP

#### Architecture

FTPS (FTP Secure) works by adding a security layer on top of the existing standard FTP protocol, such as the Secure Socket Layer (SSL) or its modern successor, the Transport Layer Security (TLS) protocol, which is also used to secure web traffic. FTPS is still basically FTP; It uses the same commands and has the same dual-channel architecture, but communication over those channels is now encrypted. This structure is very similar to HTTPS' relationship to HTTP.

#### Explicit vs. Implicit Mode

FTPS has two different operating modes:

* **Explicit FTPS (FTPES):** In this mode, the client initiates an unencrypted connection to the server over standard FTP port 21. It then "explicitly" requests the server to escalate the connection to a secure TLS session by sending the `AUTH TLS` or `AUTH SSL` command. This mode is more flexible and more commonly used in modern applications because it can allow both secure and unsecured connections through the same port.
* **Implicit FTPS:** In this legacy mode, the client connects directly to the server over a special port reserved for FTPS (usually 990). Once the connection is established, a TLS handshake is expected before any FTP commands are sent. In this mode, the entire session must be encrypted from end to end. Nowadays its use has decreased and it is generally supported for compatibility with older systems.

#### Challenges

Because FTPS inherits the dual-channel (command and data) structure of FTP, it also inherits the problems associated with it. Because ports still need to be opened dynamically for the data channel, firewall configuration can be complex and require network administrators to allow a wide range of ports. This can lead to both operational challenges and potential security risks.

#### 4.2.2. SFTP (SSH File Transfer Protocol): File Transfer Over SSH

#### Architecture

SFTP is a completely different protocol that, despite the “FTP” abbreviation in its name, technically has no relation to FTP. SFTP was designed from the ground up to provide secure file transfer as an extension of the Secure Shell — SSH protocol. Unlike FTP's text-based command structure, SFTP is a packet-based protocol, which can make it more efficient.

#### Working via Single Port

SFTP's biggest architectural advantage is that it handles all communication — authentication, commands, and data transfer — using a single encrypted channel over the standard SSH port, **TCP Port 22**. This completely eliminates the multiport problem of FTPS and greatly simplifies firewall configuration. Network administrators only need to open a single port, which significantly reduces the attack surface of the network.

#### Advanced Features and Authentication

SFTP inherits the powerful security and functionality features of the underlying SSH protocol:

* **Authentication:** In addition to standard username/password authentication, SFTP supports **SSH key-based authentication** (public key authentication), which is considered much more secure. In this method, users authenticate using cryptographic key pairs instead of passwords, which provides much higher protection against brute-force attacks.
* **File Management:** SFTP allows richer operations on the remote file system beyond simple file transfer. It provides standardized commands for advanced file system operations such as locking files, creating symbolic links, and editing file permissions.

### 4.3. Best Practices for Modern and Secure File Transfer

#### Protocol Selection

When choosing a protocol for modern network infrastructures, SFTP is generally considered a superior option to FTPS. Simpler and more secure firewall management thanks to single port usage, superior security provided by SSH key-based authentication, and richer file management capabilities make SFTP the preferred protocol for most scenarios. FTPS can be a valid alternative, especially if the organization's existing infrastructure already has a PKI (Public Key Infrastructure) and SSL/TLS certificate management processes, or if compatibility with legacy systems is a must. Standard, unencrypted FTP should never be used except in very limited internal network scenarios where non-sensitive data is transferred and the security risk is consciously acknowledged.

#### Server Hardening

No matter which secure protocol is chosen, it is essential that the server itself is configured securely. Best practices include:

* Disabling anonymous logins.
* Enforce strong password policies and change them regularly.
* Limiting failed login attempts within a certain period of time (to slow down brute-force attacks).
* Regular cleanup of unused or old user accounts.
* Restricting access to only certain IP addresses or networks.

#### Cloud Based File Transfer Services

Besides traditional file transfer protocols, modern alternatives also exist for safe and easy sharing, especially of large files. Managed File Transfer — MFT and cloud-based services such as Filemail, WeTransfer, Dropbox, and TransferNow offer user-friendly interfaces. These services often abstract the complexity of the protocols from the user and provide additional security features. These features include capabilities such as end-to-end encryption, password protection for shared files, access control, download tracking, and automatic expiration date setting for files. These platforms provide effective solutions for secure file sharing, especially for non-technical users.

FTPS and SFTP represent two different philosophies that address the security issues of FTP, an insecure protocol. FTPS offers an **evolutionary** solution by taking an existing, widely used protocol (FTP) and “patching” a security layer (SSL/TLS) on top of it. This approach facilitates backward compatibility with existing systems, but inherits weaknesses of the underlying architecture (for example, dual-channel nature and the firewall complexity it introduces). In contrast, SFTP addresses the problem from scratch, offering a **revolutionary** solution built on a secure foundation (SSH). This approach results in a cleaner, more efficient, and inherently more secure architecture, without concerns about backward compatibility. This illustrates a common dilemma in cybersecurity: Improving an existing system or building a secure alternative from scratch? The fact that SFTP is more preferred in modern networks generally shows that the second approach is more sustainable and secure in the long run.

![](https://cdn-images-1.medium.com/max/800/1*7ANigANBbyhJp_SS0wNP2A.png)

FTP, FTPS, SFTP

---

This comprehensive white paper covers the email, web, DNS, and file transfer protocols that form the basis of modern digital communications. It analyzed the security architectures of these protocols. The analysis reveals two fundamental and interrelated strategic implications: inter-protocol dependency and the necessity of layered defense.

It has become clear that the protocols examined throughout the report are not isolated and independent systems. Rather, the security of one protocol is closely tied to the reliability and correct configuration of another. A secure email authentication framework (DMARC) absolutely requires a trusted and integrity-secured DNS (DNSSEC) to publish and verify its policies. A secure website (HTTPS) depends on a trusted certificate authority (CA) infrastructure to authenticate and a spoof-proof DNS to direct users to the correct server. This complex web of relationships demonstrates that protocol security is an interlocking chain that is only as strong as its weakest link. A vulnerability in one area can have disastrous consequences with a knock-on effect in another, seemingly unrelated area. Therefore, protocol security should be addressed with a holistic approach and should be designed by considering the impact of each component on the others.

In each area analyzed, it was concluded that no single technology or protocol can provide complete protection against cyber threats. An effective cybersecurity posture requires adopting the principle of “defense-in-depth”. This strategy aims to create a layered architecture consisting of different security controls, lined up one after another, to make it difficult for the attacker to achieve his goal. In the context of this report, an effective layered defense strategy should include the following components:

* **Transport Layer:** Requiring strong encryption protocols such as TLS to ensure the confidentiality and integrity of data in all communication channels (web, email, DNS).
* **Authentication Layer:** Complete implementation of powerful and standardized mechanisms such as SPF, DKIM, DMARC and DNSSEC to authenticate data and resources.
* **Application Layer:** Adoption of secure coding practices based on guidelines such as OWASP Top 10 and implementation of browser-level policies such as CSP to eliminate vulnerabilities in the application's own logic that the transport layer cannot protect.
* **Human Layer:** Strengthening users, who are the most critical line of defense against social engineering attacks where technical controls will inevitably be inadequate, with continuous and applied awareness training.
* **Procedural Layer:** Implementation of corporate processes and policies, such as out-of-band verification, in addition to technology, against sophisticated attacks such as BEC, especially targeting financial transactions.

As a result, the security of network protocols is a continuous process, not a static goal. As threats evolve, protocols and defense strategies must adapt. The strategic goal for institutions is to continuously evaluate and strengthen each of these layers and strengthen the cornerstones of digital communication by ensuring that they work in harmony with each other.