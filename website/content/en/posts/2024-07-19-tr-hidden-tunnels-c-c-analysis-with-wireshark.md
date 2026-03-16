---
date: '2024-07-19'
description: Hello, in this article I will talk about HTTP tunneling techniques. ! In the field of computer security, the term “Hidden Tunnels” generally refers to hidden or unauthorized network connections ...
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*cWRqt_otCGQkQf0iobOVnw.png
series:
- Network Analysis with Wireshark
title: '[TR] Hidden Tunnels (C&C) Analysis with Wireshark'
type: posts
---

Hello, in this article I will talk about HTTP tunneling techniques.

![](https://cdn-images-1.medium.com/max/800/1*cWRqt_otCGQkQf0iobOVnw.png)

In the field of computer security, the term “Hidden Tunnels” generally refers to hidden or unauthorized network connections used for various purposes such as malicious data exfiltration, command and control (C&C), or bypassing network detection. These secret tunnels help attackers hide their activities and bypass security measures.

---

### HTTP/HTTPS Tunneling

HTTP/HTTPS tunneling is a technique used to bypass network security measures. This method is accomplished by encapsulating non-HTTP traffic inside HTTP or HTTPS packets. HTTP/HTTPS tunneling can be used for legitimate purposes, such as accessing websites or services trapped in environments with restrictive web filtering policies, but it can also be used for malicious activities such as data exfiltration or remote control of compromised systems.

1. **Encapsulation:** In HTTP/HTTPS tunneling, non-HTTP traffic is encapsulated into HTTP or HTTPS packets. This means packaging another application or protocol's data like regular web traffic.
2. **Sending:** The encapsulated data is then sent to a remote server or destination over an HTTP or HTTPS connection. The target server treats incoming HTTP/HTTPS requests and responses as normal web requests, making it difficult for network security devices to identify the true nature of the traffic.
3. **De-encapsulation:** On the receiving side, HTTP/HTTPS packets are decompressed and the original non-HTTP data is extracted. This data is then processed or executed as required.

From a security perspective, the use of HTTP/HTTPS tunneling means that traditional security devices may have difficulty detecting and blocking such covert communication channels. To combat this problem, organizations often use advanced threat detection and prevention solutions that can examine traffic more deeply, looking for anomalies and signs of suspicious behavior. Additionally, security policies and network monitoring are important to identify and mitigate risks associated with HTTP/HTTPS tunneling.

Using HTTP or HTTPS protocols, cybercriminals can create hidden tunnels within web traffic, allowing them to exfiltrate data or control infected systems.

HTTP/HTTPS tunneling is a technique used to route or tunnel HTTP (Hypertext Transfer Protocol) or HTTPS (HTTP Secure) traffic over a network to another server. This type of tunneling can pose a significant problem, especially in terms of network security.

#### How to do HTTP/HTTPS Tunneling?

HTTP/HTTPS tunneling is used to transmit or redirect HTTP or HTTPS requests or responses, normally considered web traffic, to another server. They can use several different methods for this:

1. **HTTP Proxy Servers**: Users or malware access the internet through an HTTP proxy server. This proxy server receives users' requests, forwards them to the target server, and tunnels the responses back to the user.
2. **VPN (Virtual Private Network)**: VPNs are a type of tunneling technology that users use to provide privacy and security on the internet. By creating an encrypted tunnel between the VPN client and server, HTTP or HTTPS traffic can pass through the tunnel.
3. **SSH (Secure Shell):** SSH is a method used to create a secure communication channel between two devices on the network. This is used to encrypt and secure data transmission between computers. SSH tunnel is widely used, especially when secure data transmission over the internet is required.

#### HTTP/HTTPS Tunneling Analysis

HTTP/HTTPS tunneling is an issue that must be carefully monitored for network security. Firewalls, IDS/IPS (Intrusion Detection System/Intrusion Prevention System) systems, and other security measures can be used to monitor and detect such tunneling traffic. Additionally, user education and security policies can help reduce risks associated with HTTP/HTTPS tunneling.

---

### **DNS Tunneling**

DNS tunneling sends data over the DNS protocol, which is a protocol not designed for data transfer.It is a method used to reach. This is done for the purpose of carrying other types of data within DNS packets or communicating with another server. DNS tunneling can pose a significant problem, especially in terms of network security. One reason for this is that DNS pacts can pass through security products such as firewalls without getting stuck.

#### How is DNS Tunneling done?

DNS tunneling is accomplished by hiding DNS queries and responses within normal DNS traffic.

1. The attacker registers a domain name like *badsite.com*. The server of the domain points to the attacker's server where the tunneling program is installed.
2. The attacker infects a computer with malware, usually behind a company's firewall. Since DNS requests are always allowed in and out of the firewall, the infected computer is allowed to send a query to the DNS resolver.
3. DNS resolver is a server that forwards IP address requests to the root and top-level domain servers. This directs the query to the attacker's command and control server where the tunneling program is installed.
4. A connection has now been established between the victim and the attacker via the DNS resolver. This tunnel can be used to exfiltrate data or other malicious purposes. Since there is no direct connection between the attacker and the victim, it is more difficult to track down the attacker's computer.

![](https://cdn-images-1.medium.com/max/800/1*gpckGRQF8yG7icj509DazA.png)

DNS Tunneling

#### DNS Tunneling Analysis

wireshark

DNS tunneling can pose a serious threat to network security, so firewalls, IDS/IPS systems, and DNS controls should be used to protect against such attacks. Additionally, a good security policy and DNS traffic monitoring and analysis capabilities can help detect such threats.

---

### **ICMP** Tunneling

ICMP tunneling or ICMP covert channels is a method used to create covert communication channels within ICMP (Internet Control Message Protocol) packets. ICMP is typically used for network troubleshooting and error reporting, but attackers can surreptitiously use this protocol for data transmission. This technique is also known as “ICMP tunneling” because it involves encapsulating non-ICMP traffic within ICMP packets to bypass network security controls.

How ICMP tunneling works:

1. **Encapsulation:** ICMP tunneling involves encapsulating non-ICMP data or traffic within ICMP “echo request” and “echo reply” packets, which are typically used for network diagnostic purposes, such as ICMP “ping” requests.
2. **Transmission:** The encapsulated data is then transmitted as ICMP traffic between the sender and receiver. The sender and receiver are often compromised systems or devices under the control of an attacker.
3. **De-encapsulation:** At the receiving end, ICMP packets are decompressed to extract the original non-ICMP data, which is then processed or used as required.

While ICMP tunneling can be used for malicious purposes, it can also have legitimate applications when used for network diagnostics in certain scenarios.

From a security perspective, ICMP tunneling can present challenges in detection and prevention. Network security solutions should use advanced anomaly detection techniques to identify abnormal or unauthorized ICMP traffic patterns. Additionally, organizations should implement network segmentation and access control to limit the use of ICMP traffic and reduce the risk of covert channel abuse.

ICMP (Internet Control Message Protocol) tunneling is a technique that allows cyber attackers to transmit and scan data by bypassing network security measures. ICMP is a protocol used to transmit error messages and other control messages between network devices. ICMP tunneling is used to tunnel data through these control messages.

#### How to do ICMP tunneling?

ICMP tunneling may involve the following basic steps:

1. **Tunnel Initiation**: First, cyber attackers typically initiate an ICMP tunnel to gain access to a target server or network. This is usually done using a malware or attack tool.
2. **Sending Data**: Attackers hide data within ICMP packets. This data may contain information that needs to be transmitted to the target server or network.
3. **Sending ICMP Packets**: Data,Once hidden within ICMP packets, these packets are sent to the destination server or network. These packets may appear to be normal ICMP traffic.
4. **Receiving Side**: A receiving party on the target server or network intercepts incoming ICMP packets and extracts obfuscated data from them.

Cyber attacks and ICMP tunneling:

Cyber attackers can use ICMP tunneling for malicious purposes. Here are some examples:

1. \*\*Data Exfiltration\*\*: Attackers can hide the data they need to exfiltrate to the target server or network using ICMP tunneling. This can make it easier for sensitive information to be stolen.

2. \*\*Blocking and Filtering Bypass\*\*: Some network firewalls or filters can be used to block or limit ICMP traffic. ICMP tunneling can be used to bypass such blocking.

3. Scanning and Reconnaissance: Attackers can use ICMP tunneling to detect vulnerabilities in the target network and scan targets.

ICMP tunneling can pose a serious threat to network security because it can be difficult to monitor and block such traffic. Therefore, network firewalls and IDS/IPS (Intrusion Detection System/Intrusion Prevention System) systems must be well configured to detect and block ICMP tunneling traffic. Additionally, regular security audits and security policies can also help guard against such threats.

---

### Resources