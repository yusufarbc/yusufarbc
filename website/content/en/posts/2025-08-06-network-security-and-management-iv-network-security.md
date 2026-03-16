---
date: '2025-08-06'
description: The fundamental philosophical and strategic frameworks on which the entire cybersecurity discipline is built are examined. Answers are sought to basic questions such as what security means, what strategy it should be implemented with, and what types ...
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*BZVwBIefZNbdIE6Sn8hDrQ.png
series:
- Network Security and Management
title: 'Network Security and Management IV: Network Security'
type: posts
---

The fundamental philosophical and strategic frameworks on which the entire cybersecurity discipline is built are examined. Answers are sought to basic questions such as what security means, what strategy it should be implemented with, and what types of threats are defended against. This chapter highlights the importance of shifting from a reactive “problem solving” mindset to a proactive “risk management” mindset.

### Basic Concepts of Security: CIA Triangle (Confidentiality, Integrity, Availability)

The universal goals of cybersecurity are generally defined around three fundamental principles known as the CIA Triangle: Confidentiality, Integrity and Availability. This model provides a basic framework for establishing an organization's security program and policies.

*   **Confidentiality:** This policy aims to ensure that sensitive information is accessible only to authorized users, processes and devices. The primary goal is to protect data from unauthorized disclosure. Common mechanisms used to ensure confidentiality include encryption, access control lists (ACLs), and data classification.
*   **Integrity:** It means maintaining the accuracy, consistency and reliability of the data throughout its entire life cycle. Integrity aims to prevent unauthorized or undetected modification, deletion or corruption of data. This principle covers the protection of data both while it is stored (at-rest) and while it is transmitted (in-transit). Technologies such as hashing algorithms and digital signatures are used to ensure integrity.
*   **Availability:** It is the principle of ensuring that authorized users have uninterrupted access to network resources, systems and data when they need it. Availability requires systems to be resilient against service interruptions such as Denial of Service (DoS) attacks, hardware failures or natural disasters. To ensure high availability, measures such as redundancy, load balancing and disaster recovery plans are taken.

These three principles represent a dynamic balancing act rather than a static model. A check intended to strengthen one principle may weaken another. For example, overly stringent encryption controls (which increases Confidentiality) can negatively impact Availability by reducing system performance. Similarly, an integrity breach, such as malicious modification of a critical system file, can also directly impact availability by causing the system to crash. Therefore, rather than seeking absolute protection, effective security architecture is the art of making a conscious trade-off and balance between these three principles according to the organization's risk appetite and the value of the protected asset. This reveals that security architecture is not just a technical application but also a strategic business decision.

### Strategic Approaches: Defense Depth and Layered Security

The basic strategy used to achieve the goals defined in the CIA Triangle is Defense in Depth — DiD. This strategy is based on the assumption that a single security check will never be infallible or sufficient. It combines multiple and diverse layers of security controls to prevent or slow an attacker from reaching their target. Even if one layer is bypassed, other layers are intended to detect and stop the attack. This strategy is often likened to the defense of a castle; There are multiple defense lines such as moats, high walls, archers and soldiers.

Typical layers of a Defense Depth strategy include:

*   **Physical Security:** Controls physical access to data centers and network equipment.
*   **Network Security (Perimeter and Internal):** Protects the perimeter and internal segments of the network. It uses technologies such as firewalls, Intrusion Prevention Systems (IPS) and network segmentation.
*   **Endpoint Security:** Protects end user devices such as servers and laptops. Includes antivirus software and Endpoint Detection and Response (EDR) solutions.
*   **Application Security:** Provides protection against attacks targeting software such as web applications and APIs. Web Application Firewalls (WAF) are located in this layer.
*   **Data Security:** Encrypt the data itself. It protects with encryption, data loss prevention (DLP) and access control mechanisms.
*   **Administrative Controls:** Includes human and process-oriented controls such as security policies, procedures and user security awareness training.

This strategy is not just about building a technological stack; it is also about increasing the cost and sophistication of the attacker. Each layer means a new obstacle for the attacker, a new puzzle, and a new opportunity with an increased risk of detection. Rather than making the attack impossible, the goal is to make the cost of the attack (time, resources, expertise) higher than the potential gain. Additionally, this layered structure is about “buying time.” Even if one layer is bypassed, the next layer slows down the attacker. This slowdown provides the security operations team (Blue Team) with a critical window of time to detect, analyze and respond to the attack, which is a vital element of modern Incident Response processes.

### Common Attack Vectors

An attack vector is the path or method used by a cybercriminal to gain unauthorized access to a network or system. This section analyzes the most common attack methods, their working mechanisms, and their effects, moving from theoretical principles to practical threats.

#### Denial of Service (DoS/DDoS) and Man in the Middle (MITM)

*   **Denial of Service (DoS/DDoS):** This type of attack is an attempt to make a server, service, or network inaccessible to legitimate users by overwhelming it with excessive amounts of fraudulent traffic from a single source (DoS) or thousands of compromised devices (DDoS), called botnets. These attacks directly target the “Availability” principle of the CIA Triangle. In particular, techniques such as DNS Amplification allow the attacker to send a small query packet to reflect response packets tens or hundreds of times larger to the target, which is a sophisticated DDoS method that exponentially increases the impact of the attack.
*   **Man-in-the-Middle (MITM):** In this attack, an attacker secretly inserts himself into a communication between two parties and listens, intercepts, and potentially manipulates the data stream. While victims think they are communicating directly with each other, all their traffic actually passes through the attacker. This attack violates both “Confidentiality” and “Integrity” principles. DNS Cache Poisoning is a classic MITM technique that injects fake records into a DNS server's cache, redirecting users to a malicious site controlled by the attacker rather than a legitimate site.

#### Social Engineering: Phishing Attacks

Phishing is a social engineering attack in which attackers trick victims by pretending to be a legitimate institution (bank, social media platform, etc.) and attempt to obtain sensitive data such as usernames, passwords, credit card information. It is usually carried out through fake emails or websites that create a sense of urgency, contain grammatical errors, and contain suspicious links. This attack vector bypasses technical security controls and directly targets the weakest link: the human factor.

#### Malicious Software (Malware): Virus, Worm, Ransomware

Malware is a general term used for any software designed to damage, steal data, or take control of a computer system or network.

*   **Virus:** It is a piece of malicious code that spreads by inserting itself into legitimate programs. It requires human interaction (for example, running a file) to spread.
*   **Worm:** Unlike a virus, it does not need human interaction or a host program to spread. It copies itself and infects other systems by taking advantage of security vulnerabilities in the network.
*   **Ransomware:** It is a type of malware that encrypts the files on the infected system, making them inaccessible, and demands a ransom from the victim to decrypt the files.

These attack vectors rarely act alone; They are often part of a complex attack chain (kill chain). For example, an attacker could gain initial access with a phishing email, use that access to download ransomware, and use a worm mechanism to propagate that software within the network. This reveals the practical importance of the Defense Depth strategy. Just focusing on email filtering is not sufficient. If the email filter fails, endpoint protection (to block malware) should kick in. If endpoint protection also fails, network segmentation (to limit the spread of the worm) should reduce the impact of the attack.

The table below summarizes common attack vectors and the underlying security principles that these attacks directly target.

![](https://cdn-images-1.medium.com/max/800/1*FAdKptOhUIKWjicuMUi8JQ.png)

**Common Attack Vectors and the Security Principles They Target**

### Proactive Security: Risk Assessment and Threat Modeling

An effective security program should not only consist of responding to attacks that occur (reactive), but should also take precautions by anticipating potential attacks (proactive).

**Risk Assessment:** It is the process of identifying and analyzing threats to an organization's assets, the vulnerabilities that these threats can exploit, the likelihood of the threats occurring, and the potential impact (damage) that will occur if they occur. Risk is often expressed by the formula: Risk=Threat×Vulnerability×Impact. This analysis provides a prioritization mechanism for directing limited security resources and investments to the most critical areas.

**Threat Modeling:** It is a proactive and structured process that aims to integrate security from the design phase of the system. Instead of focusing only on existing vulnerabilities, “how can an attacker attack this system?” It systematically identifies potential threats, attack vectors and vulnerabilities by asking the question. This integrates security into the DNA of the system rather than being an added “patch”. Common threat modeling methodologies include:

*   **STRIDE:** It is a model developed by Microsoft that divides threats into six categories: **S**poofing, **T**ampering, **R**epudiation, **I**nformation Disclosure, **D**enial of Service, **E**levation of Privilege.
*   **PASTA (Process for Attack Simulation and Threat Analysis):** It is a seven-stage, risk-focused methodology that centers on business impacts and risks. It offers a more holistic perspective by relating technical vulnerabilities to business objectives.

Serves as a bridge between threat modeling, security and software development/systems design teams. By teaching developers to “think like an attacker,” it makes security part of the entire product lifecycle rather than just a responsibility of the security team. This proactive approach is also more economically efficient. The cost of fixing a vulnerability at the design stage is many times lower than the cost of fixing a vulnerability that is discovered after the product is released and affects thousands of users. Therefore, threat modeling is not just a security practice, but also a smart engineering and business investment.

### Secure Communication and Cryptography

This topic will examine in depth the cryptographic mechanisms that form the basis of modern digital communication and the protocols that create secure channels using these mechanisms. Basic questions such as how to ensure the confidentiality of data, how to protect its integrity, and how to verify the identities of communicating parties will be explained through the basic building blocks of cryptography.

### Encryption Basics

Encryption is the process of converting data from a readable format (plaintext) to an unreadable format (ciphertext) to protect data from unauthorized access.

#### Symmetric Cryptography (AES)

In symmetric cryptography, the same secret key is used to encrypt and decrypt data. This method is much faster and requires less computing power than asymmetric encryption. Therefore, it is ideal for encrypting large volumes of data (files, data streams, disks). The most common and secure symmetric encryption standard today is AES (Advanced Encryption Standard). The biggest challenge of symmetric cryptography is how to share this single secret key securely.

#### Asymmetric Cryptography (RSA)

In asymmetric cryptography (or public key cryptography) uses a pair of mathematically related keys: a public key and a private key. The public key can be freely shared with anyone and is used to encrypt data. The private key is known only to its owner and is used to decrypt data encrypted with the public key. This method solves the key distribution problem because the public key used for encryption does not need to be secret. However, it is much slower than symmetric encryption and requires more computing power. One of the most well-known asymmetric algorithms is RSA (Rivest-Shamir-Adleman).

#### Hybrid Approach: TLS/SSL Handshake

In practice, the best aspects of symmetric and asymmetric encryption are combined in a hybrid model. The TLS/SSL (Transport Layer Security/Secure Sockets Layer) protocol is the best-known example of this approach. During a TLS handshake, parties use slow asymmetric cryptography to verify their identities and securely agree on a temporary “session key” (symmetric key). Once the agreement is reached, all data transfer throughout the session is encrypted using this fast symmetric session key. The engineering principle underlying this hybrid model is to ensure maximum security by using resources in the most efficient way: “Do the expensive operation (asymmetric) only once, repeat the cheap operation (symmetric) constantly.”

The table below summarizes the key features of the two primary encryption methods comparatively.

![](https://cdn-images-1.medium.com/max/800/1*uLkJ1fxvGAvAmTITuC3VVA.png)

**Comparison of Cryptographic Methods**

### Data Integrity and Authentication

While encryption ensures confidentiality, additional mechanisms are needed to verify that data has not been altered and comes from the correct source.

#### Hashing Functions (Hashing — SHA-256)

A cryptographic hash function (hashing) is a one-way mathematical algorithm that takes an input of any size (message, file, etc.) and transforms it into a unique output (hash value or message digest) of fixed length. Being “one-way” means that it is computationally impossible to recover the original data from the hash value. Even the slightest change in the data will produce a completely different hash value. This feature is used to check whether a file has been corrupted during download or whether a message has been modified during transmission (integrity verification). SHA-256 (Secure Hash Algorithm 256-bit) is a standard hash algorithm that is considered secure today.

#### Digital Signatures

Digital signatures are a cryptographic mechanism that ensures the integrity of a message or document, who it is from (authentication) and the ability of the sender to deny that he sent the message (non-repudiation). This mechanism combines asymmetric cryptography and hash functions.

The creation and verification process works as follows:

1.  **Signing:** The sender receives a hash of the message to send. It encrypts this hash value with its own **private key**. This encrypted hash is the digital signature and is added to the original message and sent to the recipient.
2.  **Authentication:** The receiver decrypts the digital signature using the sender's **public key** and obtains the original hash value. Then, it calculates the hash of the incoming message with the same hash function. If the two hash values ​​match, it is proven that the message has not changed along the way (integrity) and that it really came from the owner of that private key (authentication).

This process is a “reverse” use of asymmetric cryptography. While normally encryption is done with the receiver's public key for confidentiality, here signing is done with the sender's private key for identity proofing.

### Public Key Infrastructure (PKI) and Certificate Management

Public Key Infrastructure (PKI) is a framework of roles, policies, hardware, software and procedures that enable the secure binding of public keys to specific identities (persons, servers, companies) through digital certificates. The fundamental problem of asymmetric cryptography is “how do we know whether a public key really belongs to the person it claims to be?” It provides a solution to the question.

This trust relationship is maintained by trusted third parties called **Certificate Authority (CA)**. After a CA verifies the identity of the individual or entity requesting a certificate, it signs a **digital certificate** (the most common standard is X.509) with its private key, which contains that identity's public key and other information. This signature is proof of the validity and reliability of the certificate. A web browser uses an HTTPS when it connects to the site, it checks the server's certificate and verifies whether the CA that signed that certificate is in the browser's list of trusted root certificates.

### Secure Protocols (TLS 1.3, IPsec, SSH)

These protocols create secure communication channels on the network using the cryptographic cornerstones described above.

*   **TLS 1.3 (Transport Layer Security):** It is the most modern protocol used to secure web traffic (HTTPS). It offers a faster handshake process and stronger, up-to-date encryption algorithms than previous versions, while removing outdated and insecure ones.
*   **IPsec (Internet Protocol Security):** It operates at the Network Layer (Layer 3) of the OSI model and provides security for IP packets. It is generally used to create Virtual Private Networks (VPN) and transparently protects all application traffic (regardless of TCP, UDP) on it.
*   **SSH (Secure Shell):** It is an application layer protocol used to provide secure remote command line access, file transfer, and other network services over an unsecured network. It has replaced old and insecure protocols such as Telnet.
*   **DNSSEC, DoT, DoH:** These are protocols developed especially to secure DNS traffic. DNSSEC uses digital signatures to verify the integrity and identity of DNS responses; DoT (DNS over TLS) and DoH (DNS over HTTPS) encrypt traffic to ensure the confidentiality of DNS queries.

The evolution of these protocols also reflects the increasing tension between network security and user privacy. While corporate network administrators want to monitor and control DNS traffic to enforce security policies, protocols such as DoH make this monitoring difficult by hiding this traffic within standard HTTPS traffic. Beyond the choice of a technical protocol, this brings with it a philosophical struggle over who will have control: the network administrator or the end user/application?

### Network Defense Technologies

This topic addresses how theoretical security principles and cryptographic mechanisms are implemented through concrete technologies and architectures used to protect networks. The evolution of defense technologies from simple filtering to context-aware and intelligent prevention systems will be examined and the strategic importance of separating networks into isolated segments will be emphasized.

### Firewalls

Firewalls are the most basic security component of the network perimeter and filter network traffic according to predefined rules. With the evolution of technology, firewalls have become more complex and intelligent.

#### Stateless vs. Stateful

*   **Stateless Firewall:** This is the most basic type of firewall. It evaluates each network packet, regardless of previous packets, by looking only at its header information (source/destination IP address, port number). It is fast and performs well under high traffic loads, but provides limited protection against sophisticated attacks because it does not monitor the global context (state) of a connection.
*   **Stateful Firewall:** These firewalls monitor the state of network connections in a “state table”. Once a connection is established, it keeps track of the status of all packets belonging to that connection. In this way, it can detect and block packets that do not arrive in response to a legitimate request or do not comply with the connection order. They are much more secure than stateless firewalls and form the standard of modern networks.

#### Next Generation Firewalls (NGFW) and Application Awareness

Next Generation Firewalls (NGFW) offer advanced features that go beyond stateful control. As attackers began to bypass traditional firewalls by tunneling malware through allowed ports (for example, port 80/443 for web traffic), defenses had to evolve to NGFWs that can look at the “content” of traffic and understand the “application context.” The key features of NGFWs are:

*   **Application Awareness:** The ability to identify and control traffic based on the application generating the traffic (e.g. Facebook, BitTorrent, Skype), rather than by port and protocol.
*   **Deep Packet Inspection — DPI:** Detecting malware, exploits and other threats by examining not only the headers of packets but also their content (payload).
*   **Integrated Intrusion Prevention System (IPS):** Actively detecting and blocking known vulnerabilities and exploits.
*   **Identity-Based Awareness:** Establishing policies based on specific users or user groups rather than IP addresses by associating user identities with network traffic (for example, through Active Directory integration).

#### Web Application Firewall (WAF)

Web Application Firewall (WAF) is a special type of firewall that operates at layer 7 (Application Layer) of the OSI model, designed to protect against attacks that specifically target web applications. It is effective in protecting against the most critical web application security risks in the OWASP (Open Web Application Security Project) Top 10 list. These include attacks such as SQL Injection (SQLi) and Cross-Site Scripting (XSS). A WAF and NGFW are not interchangeable, but rather complementary. While an NGFW provides broad protection for public network traffic, a WAF is a specialist that stands in front of the web server and understands even the subtlest tricks in just the HTTP/HTTPS language.

### Intrusion Detection and Prevention Systems (IDS/IPS)

Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS) are security solutions that monitor network traffic or system activities for malicious activities or policy violations. The main difference is that IDS passively listens and only generates alerts, while IPS actively blocks threats by passing through traffic (in-line).

#### Signature-Based and Anomaly-Based Detection Methods

IDS/IPS systems use two primary methods to detect threats:

*   **Signature-Based Detection:** Compares observed traffic to a database containing unique patterns or “signatures” of known attacks (viruses, exploits). It is very effective at detecting known threats, but is blind to new (zero-day) attacks.
*   **Anomaly-Based Detection:** Uses machine learning to create a “normal” behavior profile (baseline) of the network. This flags any activity that deviates from the normal profile as a potential threat. It has the potential to detect new and unknown attacks, but is more prone to generating false positive alerts.

The choice between these two methods is a trade-off between “precision” and “coverage”. Signature-based systems offer high accuracy against “baddies we know,” while anomaly-based systems offer broader coverage against “baddies we don't know.” Modern security systems combine these two approaches in a hybrid model, trying to take advantage of both.

![](https://cdn-images-1.medium.com/max/800/1*IwTYwOqFbmnzoAnDVPl8DA.png)

**Comparison of IDS/IPS Detection Methods**

### Virtual Private Networks (VPN) Architectures

Virtual Private Network (VPN) is a technology that enables the extension of a private network by creating a secure and encrypted connection tunnel across a public network (usually the Internet).

#### Remote Access and Site-to-Site VPN

*   **Remote Access VPN:** Allows individual users (e.g., employees working from home, traveling staff) to connect securely to the company network. A VPN client software is installed on the user's device. SSL/TLS VPNs are generally preferred for this scenario due to their flexibility.
*   **Site-to-Site VPN:** It is used to securely connect an organization's offices in geographically different locations (for example, head office and branches) over the internet. Each site has a VPN gateway, and a permanent encrypted tunnel is created between these gateways. IPsec has become the de facto standard for site-to-site VPNs because it operates at the network layer and can protect all IP traffic.

### Security Information and Event Management (SIEM)

Security Information and Event Management (SIEM) is a technology that centrally collects, analyzes and correlates security data and event logs (logs) from various sources (network devices, servers, applications, security systems) in an organization's IT infrastructure.

SIEM functions as the “brain” or “nerve center” of the Depth of Defense strategy. If defense technologies (firewall, IPS, EDR) at different layers are "sensors", SIEM is the central unit that collects all signals coming from these sensors, makes sense of them and generates an alarm when it detects a threat.

SIEM's most powerful capability lies in correlating events from different sources. **Correlation** is to detect patterns that individually appear meaningless or low priority, but when combined reveal an attack pattern. For example, a port scan in a firewall log, a large number of failed login attempts in an Active Directory log, and malware detection in an antivirus log may all be separate events. SIEM can associate these three events as occurring from the same source, within a short period of time, and flag this as a high-priority attack attempt. The value of a SIEM platform depends not only on the technology, but also on the “intelligence” built on top of it (correlation rules, threat intelligence feeds, expertise of analysts).

### Wireless Network (WLAN) Management and Security

In corporate environments, wireless networks have become indispensable for efficiency and flexibility. However, in these environments where there are hundreds or even thousands of access points (APs), management, security and performance optimization pose serious challenges. In this section, modern WLAN architectures, enterprise-level authentication methods, security threats and performance optimization strategies will be discussed in detail.

### Centralized AP Management Architectures

In a network with many APs, it is operationally impossible to configure and monitor each device individually. For this reason, central management solutions are used that enable all APs to be managed, monitored and configured from a single center. These solutions are basically offered in two architectural models: on-premise and cloud-based.

#### On-Premise WLC (Embedded Controller)

In this model, a physical device called a Wireless LAN Controller — WLC is hosted in the organization's own data center. APs connect to this central WLC, and all management, configuration, and often data traffic flows through this device.

**Advantages:**

*   **Full Control and Data Privacy:** Maximum control over data privacy and security is ensured since all network traffic and management data remain within the organization's own network. This is a critical advantage, especially for highly regulated industries such as finance and healthcare.
*   **Deep Integration:** Deep and customized integrations can be made with other corporate systems such as local Active Directory, RADIUS servers and firewalls.
*   **Performance:** Local processing of traffic can deliver consistent, low-latency performance that is not affected by the state of the internet connection.

**Disadvantages:**

*   **High Initial Cost:** Purchasing and installing physical WLC devices requires a significant initial investment (CapEx).
*   **Maintenance Responsibility:** WLC's hardware maintenance, software updates and redundancy are entirely the responsibility of the institution's IT team.
*   **Limited Scalability:** As the network grows, the capacity of the existing WLC (the number of APs and users it supports) may be exceeded, requiring investments in new hardware.

#### Cloud-Managed WLC

In this modern architecture, the management and control plane of APs is provided through a cloud platform such as Cisco Meraki or Aruba Central. APs connect to this cloud platform over the internet, receive their configurations and report their status. Data traffic usually goes directly to the internet (split-tunneling), which prevents bottlenecks in the central data center.

**Advantages:**

*   **Easy Installation and Management:** Thanks to the Zero Touch Provisioning (ZTP) feature, APs can be sent directly to branches without any pre-configuration. As soon as the device connects to the internet, it automatically receives its configuration from the cloud and starts working. This greatly simplifies deployment, especially for organizations with many branches.
*   **Low Initial Cost:** Since a physical controller is not needed, the initial cost is low. The model is typically based on a subscription-based operational expenditure (OpEx) model.
*   **High Scalability:** Thanks to the cloud infrastructure, adding new APs to the network is extremely easy and the system can manage thousands of devices without any problems.
*   **Centralized Visibility:** The network in all geographically dispersed locations can be monitored and managed from a single web interface.

**Disadvantages:**

*   **Internet Dependency:** A constant internet connection is required to access the management platform and receive configuration of APs.
*   **Data Privacy Concerns:** Because management data is stored in the cloud, data privacy is a concern for some organizations. This may raise compliance and compatibility concerns.
*   **Subscription Cost:** Requires an ongoing subscription fee, which can increase the total cost of ownership in the long run.

The choice between these two models is not only a technical decision, but also a strategic decision directly related to the organization's IT strategy, budget structure (CapEx vs. OpEx), growth objectives, staff competency and risk tolerance.

#### Automation and Optimization Features

Centralized management platforms offer a variety of automation features to improve the performance and stability of the wireless network:

**RF (Radio Frequency) Optimization:** Platforms dynamically optimize the channel and broadcast power settings of APs by constantly monitoring the RF environment. This minimizes interference (co-channel interference) between neighboring APs.

**Client Management:**

*   **Band Steering:** Directs clients that support dual band (2.4 GHz and 5 GHz) to the less congested and higher performance 5 GHz band.
*   **Load Balancing:** When too many clients are connected to an AP, it balances the load by redirecting some of those clients to other, less busy APs nearby.

### Enterprise-Grade Secure Authentication

Widely used in home or small office networks, the WPA-Personal (PSK — Pre-Shared Key) security method is a model in which all users share the same password. Leaking this password from an employee would compromise the security of the entire network. Therefore, it is absolutely inadequate and insecure for corporate environments. Corporate networks use the WPA2/WPA3-Enterprise standard, where each user is authenticated with his or her own unique credentials. The basis of this standard is the IEEE 802.1X protocol.

#### 802.1X Port Based Network Access Control

802.1X is an IEEE standard that allows a device to be authenticated by a central server before it is granted access to a wired or wireless network. This architecture consists of three basic components:

1.  **Supplicant:** The end user device (for example, a laptop or smartphone) that wants to connect to the network.
2.  **Authenticator:** It is the device that provides physical access to the network. In wireless networks, this role is played by the Access Point (AP), and in wired networks, the switch plays this role. Authenticator acts as an intermediary between the client and the authentication server.
3.  **Authentication Server:** It is generally a server that uses the RADIUS (Remote Authentication Dial-In User Service) protocol. It performs authentication by accessing the database where user credentials are stored (for example, Microsoft Active Directory) and makes the access decision.

#### Technical Operation and Flow Process

The 802.1X authentication process is accomplished using the Extensible Authentication Protocol — EAP. The process steps are as follows:

1.  **Initiation:** The Supplicant sends a connection request to the AP (Authenticator). The AP makes the virtual port to which this client is connected “unauthorized” and allows only EAP authentication traffic to pass through. All other network traffic (HTTP, DNS, etc.) is blocked.
2.  **EAP Communication:** The AP asks the client for its identity by sending an “EAP-Request/Identity” packet. The client responds with an “EAP-Response/Identity” packet containing the username.
3.  **RADIUS Forwarding:** The AP puts the EAP response it receives from the client into a RADIUS “Access-Request” packet and forwards it to the RADIUS server (Authentication Server). The AP does not have to understand the contents of EAP packets; It is just an intermediary.
4.  **Authentication:** The RADIUS server establishes a secure tunnel (for example, using PEAP or EAP-TLS) with the client and requests the actual credentials (password or digital certificate) from the client. The RADIUS server verifies this information against an identity store such as Active Directory.
5.  **Authorization:** If authentication is successful, the RADIUS server sends a RADIUS “Access-Accept” message to the AP. This message informs you that authentication was successful. If unsuccessful, an “Access-Reject” message is sent.
6.  **Network Access:** When the AP receives the "Access-Accept" message, it makes the port to which the client is connected "authorized" and allows the client full access to the network. After this stage, encryption keys used by WPA2/WPA3 to encrypt data traffic between the client and AP are created and all data traffic is encrypted with AES (Advanced Encryption Standard).

802.1X. The power of 's comes not only from authentication but also from its ability to implement dynamic policies. The RADIUS server can send authorization attributes such as VLAN ID, Access Control Lists (ACLs), or Bandwidth Limitations along with the “Access-Accept” message. For example, when an engineer connects, they can be automatically assigned to the “Engineering VLAN”, and when a guest connects, they can be automatically assigned to the “Guest VLAN” with limited access to the internet. This is a fundamental application of the “identity is the new perimeter” concept and the Zero Trust philosophy.

### 2.3. Rogue AP Detection and Blocking

A Rogue AP (Rogue Access Point) is any wireless access point that connects to a corporate network without permission from a network administrator. These devices may be installed with good intentions, usually by employees for their own convenience (for example, to get a better signal), but they may also be installed by an attacker to eavesdrop or infiltrate the network. In either case, these devices create a serious vulnerability in the network and pave the way for data breaches, malware propagation, and Man-in-the-Middle attacks.

#### Detection Methods

Effective Rogue AP detection requires a proactive, multi-layered approach:

*   **Wireless Intrusion Detection/Prevention Systems (WIDS/WIPS):** Modern enterprise WLAN systems have this feature built-in. In addition to providing normal service, authorized APs periodically scan the RF environment and listen for other APs that do not belong to their network. When an unauthorized AP is detected to be connected to the corporate network via cable, the system generates an alarm. WIPS systems may attempt to disconnect clients connected to this Rogue AP by sending spoofed de-authentication packets.
*   **RF Scanning Tools:** Specialized RF scanning tools such as Ekahau or AirMagnet can analyze the RF spectrum in detail, detecting even hidden or low-power APs that standard WIDS systems may miss. These tools also help find the physical location of the unauthorized device by triangulation.
*   **Manual Network Audits:** IT teams should maintain a list of approved and inventoried APs. Devices outside this list can be detected through periodic physical inspections and network scans.

#### Prevention and Prevention Strategies

As important as detecting Rogue APs is, it is also important to prevent them from being installed in the first place:

*   **Network Access Control (NAC):** It is the most effective prevention method. When 802.1X-based NAC is implemented, any device connected to a network port (including a Rogue AP) is prevented from accessing the network without being authenticated. If the device is not authorized, the port will not be activated.
*   **Closing Unused Ports:** All unused Ethernet ports in offices and meeting rooms should be closed via the switch. This prevents an attacker or employee from easily connecting a device.
*   **Physical Security:** Communication cabinets and system rooms containing network switches and other infrastructure devices should be kept locked at all times.
*   **Quick Response Procedure:** When a Rogue AP is detected, the security team must take immediate action. The first step is to detect the switch port to which the device is connected and turn it off remotely. The physical location of the device must then be found and permanently removed from the network.

### Performance and Coverage Optimization (Wireless Site Survey)

A high-performance and reliable wireless network cannot be established by simply purchasing powerful APs. The number, placement and configuration of APs depend on many factors, such as the physical structure of the building and the condition of the RF environment. Wireless Site Survey is the process of creating the optimum network design by scientifically analyzing these factors.

#### Process Steps

A professional site survey process usually includes the following steps:

1.  **Determining Requirements (Pre-Survey):** This stage forms the basis of the project. Business and technical goals are clarified by meeting with the customer. Critical metrics are determined, such as the number of users and devices that need to be supported, the type of applications to be used (e.g., high-definition video conferencing, voice calling (VoIP), standard data), minimum desired signal strength (RSSI, typically -67 dBm or better), signal-to-noise ratio (SNR), and capacity needs.
2.  **Examination of the Physical Area and Preparation of Maps:** Floor plans of the installation area (preferably in CAD or high resolution image format) are provided. These plans are loaded into the site survey software and scaled accurately. A physical tour of the area is made, noting the material of the walls (concrete, drywall, glass), large metal objects, elevator shafts, and other potential obstructions that may affect signal propagation.
3.  **Data Collection (On-site Survey):** At this stage, professional site survey software such as Ekahau or Hamina and a Wi-Fi adapter compatible with these software (for example, Ekahau Sidekick) are used. The analyst actively collects data by walking along predetermined paths on the floor plan. The following metrics are measured in this process:
    **Signal Strength (RSSI):** The strength of the signal from the APs.
    **Signal-to-Noise Ratio (SNR):** The ratio of signal to ambient RF noise.
    **Interference:** Interference from non-Wi-Fi sources such as other Wi-Fi networks, microwave ovens, wireless cameras.
    **Channel Conflict:** Neighboring APs blocking each other using the same or adjacent channels.
4.  **Data Analysis and Design:** The collected data are processed by the software and “heatmaps” are created. These maps color-code signal coverage, SNR levels, channel conflicts, and data rates. As a result of this analysis, the most appropriate AP locations, AP models, antenna types, channel plan and power settings are determined to meet the coverage and capacity targets.
5.  **Verification (Post-Installation Survey):** After the APs are installed in accordance with the design, a final survey is conducted to verify whether the network has achieved the planned goals. This verification scan allows you to identify potential blind spots or performance issues and make final tweaks.

### Part III: Wired Network Architecture and Security

Wired networks form the basis of corporate infrastructure, offering high speed, stability and security. Despite the proliferation of wireless technologies, wired connections are still the primary choice for servers, desktops and critical infrastructure devices. In this section, network segmentation with VLAN, Network Access Control (NAC) and DMZ architecture, which are the basic technologies used to increase the security and efficiency of modern wired networks, will be examined.

### Network Segmentation with VLAN

Network segmentation is the process of dividing a large network into smaller, manageable and isolated subnets. The most common and basic implementation method of this process is to use Virtual Local Area Networks — VLAN.

#### Definition and Purpose

VLAN is the technology of separating devices that are physically connected to the same network switch into logically different network groups. Each VLAN operates as a separate broadcast domain on its own. The main purposes of using VLANs are:

*   **Improving Security:** Restricting communication between devices belonging to different departments (e.g., Finance, Human Resources) or different user types (e.g., Corporate, Guest) by placing them in separate VLANs. This makes it difficult for a security breach in one segment to spread to other segments (lateral movement — lateral movement).
*   **Improving Performance:** Broadcast traffic on the network remains only within the VLAN it belongs to and is not transmitted to other VLANs. This improves network-wide performance by reducing unnecessary traffic, especially on large networks.
*   **Easing Management:** Provides the flexibility to divide devices into logical groups regardless of their physical location. For example, all accounting department computers on different floors may be part of the same VLAN.

#### Working Principle (IEEE 802.1Q)

IEEE 802.1Q standard is used to move VLANs between switches. This standard adds a 4-byte “VLAN tag” to each Ethernet frame transmitted on inter-switch connections (trunk port). This tag contains information (VLAN ID) to which VLAN the frame belongs. The receiving switch looks at this tag and directs the frame to the correct VLAN. Ports connected to end user devices (access ports) are generally assigned to a single VLAN, and incoming/outgoing traffic from these ports is not tagged.

#### Configuration Steps

A typical VLAN configuration includes these steps:

1.  **Determining Needs:** Plan which logical groups you want to divide the network into (for example, departments, servers, IP phones, guests).
2.  **Creating VLANs:** Create the required VLAN on all switches in the network. Create the RIs with a unique VLAN ID (a number between 1–4094) and a descriptive name (for example, VLAN 10 NAME Management).
3.  **Inter-VLAN Routing:** By default, devices in different VLANs cannot communicate with each other. A Layer 3 device is needed to ensure communication. This is usually an L3 Switch or a router. On this device, a Switched Virtual Interface (SVI) is created for each VLAN and an IP address is assigned. These SVIs direct traffic between VLANs by acting as the default gateway for devices in that VLAN.
4.  **Port Assignments:**

*   **Access Ports:** Assign the ports to which end user devices (PC, printer, etc.) will be connected to the relevant VLAN in "access" mode (for example, switchport mode access, switchport access vlan 10).
*   **Trunk Ports:** Configure the ports that will provide connections between switches or between the switch and the router/firewall in "trunk" mode. Traffic of more than one VLAN will be carried through these ports. For security, it is a best practice to manually specify the VLANs that are allowed to pass through the trunk (for example, switchport mode trunk, switchport trunk allowed vlan)

#### Best Practices

*   **Avoid Using VLAN 1:** VLAN 1, which comes by default on all switches, is usually set as the default management and native VLAN. This creates a vulnerability to various attacks such as VLAN bypassing. Therefore, VLAN 1 should not be used for user or management traffic, all ports should be assigned to other VLANs.
*   **Create Separate Management and Native VLANs:** A separate "Management VLAN" should be created for the management of network devices (switch, router, AP) and access to this VLAN should be strictly controlled. The “Native VLAN” to which untagged traffic on trunk ports belongs should be set as an unused, isolated “black hole” VLAN. This helps prevent double tagging attacks.
*   **Secure Unused Ports:** All unused ports on the switches should be shut down and assigned to a dead VLAN that is not used for security purposes. This prevents an unauthorized person from infiltrating the network by plugging a device into the port.
*   **Keep VLANs Local (Limit VLAN Spanning):** Whenever possible, spanning a VLAN across multiple access layer switches should be avoided. Restricting VLANs to a single switch or cabinet reduces Spanning Tree Protocol (STP) complexity and limits the impact of potential broadcast storms.

### Network Access Control (NAC)

Network Access Control (NAC) is one of the key implementation tools of Zero Trust architecture. It is a solution that verifies the identity of every device and user trying to connect to the network and checks its compliance with predefined security policies. Its main purpose is to ensure that only authorized and “healthy” (compliant with security standards) devices can access network resources.

#### Working Principle and Stages

A NAC solution controls access to the network in four key stages:

1.  **Authentication:** Verifies the identity of the device or user trying to connect to the network. The 802.1X protocol, MAC address verification, or a web-based captive portal is typically used for this process.
2.  **Security Scanning (Posture Assessment):** Analyzes the security posture of the device. This check may include a number of criteria, such as the device's operating system version and patch level, whether antivirus software is installed and up to date, and whether the firewall is active.
3.  **Authorization and Policy Application (Authorization):** Predefined policies are applied according to the device's identity and the results of the security scan. Possible results are:
    **Full Access:** If the device is fully compliant with all policies, full access to the corporate network is granted.
    **Restricted Access (Quarantine):** If the device is partially compliant (for example, antivirus signatures are outdated), it is directed to an isolated “quarantine VLAN” that only has internet access or can access remediation servers.
    **Access Denied:** If the device is non-compliant or unauthorized, it is completely blocked from accessing the network.
4.  **Remediation:** Quarantined devices are provided with the necessary resources (for example, software update servers) to correct security deficiencies. Once the device becomes compatible, it is scanned again and if successful, full network access is granted.

Implementation of NAC solutions can be complex, especially due to existing infrastructure and integration challenges with various device types (BYOD, IoT). A successful NAC project is a strategic initiative that requires not only technology deployment, but also a comprehensive inventory study, clear policy definition and tight collaboration between different IT teams (network, security, systems).

### DMZ (Demilitarized Zone) Architecture

#### Definition and Role

DMZ (Demilitarized Zone) is a controlled buffer network segment located between an organization's secure internal network (LAN) and an untrusted external network (internet). The main purpose of the DMZ is to host services that need to be accessible from the internet, such as the web server, email server, and external DNS server. By placing these servers in the DMZ, even if one of these servers is compromised in a possible attack, the attacker is prevented from directly infiltrating the internal network where sensitive data resides. DMZ provides an additional layer of security to the internal network.

#### Architectural Designs

There are two most common architectural approaches to creating DMZs:

*   **Single Firewall (Three-Legged Model):** In this design, a single firewall with at least three network interfaces is used. One interface connects to the internet, one interface connects to the internal network, and the third interface connects to the DMZ. The firewall manages all traffic between these three zones. Although it is a lower-cost solution, the firewall itself becomes a single point of failure and attack.
*   **Dual Firewall Model:** This is the safer and recommended approach. An “external” firewall is placed between the internet and the DMZ, and an “internal” firewall is placed between the DMZ and the internal network. In this architecture, an attacker must bypass two different firewalls to reach the internal network, which significantly increases security.

#### Traffic Flow Rules (Best Practices)

The basic traffic flow rules that must be applied in firewalls for a secure DMZ architecture are:

1.  **Internet to DMZ:** Only certain services provided by servers in the DMZ (for example, TCP port 80 and 443 to the web server) are allowed. All other traffic is blocked.
2.  **From Internet to Internal Network:** Should be blocked at all times and under all circumstances.
3.  **Internal Network to DMZ:** Generally, administrators are allowed to manage servers in the DMZ (for example, via SSH or RDP) in a controlled manner.
4.  **DMZ to Internal Network:** **This is the most critical rule and should be strictly prevented.** A server in the DMZ should never be allowed to initiate a connection to a resource in the internal network. This rule prevents the attack from spreading to the internal network if a system in the DMZ is compromised.
5.  **Internal Network to Internet:** Generally allowed, but routing through a proxy server is recommended for security and monitoring purposes.
6.  **DMZ to Internet:** Servers in the DMZ are generally allowed to perform their functions (e.g. software updates, DNS queries).

The network segmentation journey that started with VLAN has become more layered with DMZ and has evolved into the "micro segmentation" philosophy that places each application or workload in its own secure segment in today's dynamic data center and cloud environments. This granular approach is one of the most advanced applications of Zero Trust principles and minimizes the attack surface.