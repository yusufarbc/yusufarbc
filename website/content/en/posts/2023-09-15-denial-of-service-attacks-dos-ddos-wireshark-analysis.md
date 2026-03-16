---
date: '2023-09-15'
description: Hello, in this article, I will analyze denial of service attacks known as DoS and DDoS with Wireshark.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*tKGgOxt2Mq5piyQ3_CJDdg.png
layout: single
series:
- Network Analysis with Wireshark
title: Denial of Service Attacks (DoS-DDoS) Wireshark Analysis
type: posts
---

Hello, in this article, I will analyze denial of service attacks known as DoS and DDoS with Wireshark.

### Wireshark

Wireshark is open source software used as a network analysis tool. Wireshark can capture, inspect and analyze network traffic so it can be used to diagnose network problems, detect security threats or monitor network performance.

For detailed information: <https://www.wireshark.org/>

You can follow the steps below to install Wireshark on your computer. Please note that these steps may vary depending on your operating system and intended use. Here are the general steps to install Wireshark:

#### **For Windows Operating System:**

1. Visit Wireshark's Official Website: It is recommended to download Wireshark from its official website. You can access the official website at: <https://www.wireshark.org/>
2. Go to Download Page: On the home page, click on the “Download” or “Download” link.
3. Select Download Options: Select the Wireshark version for Windows and begin the download. The file you download will have the .exe extension.
4. Run the Installation Wizard: Run the downloaded .exe file. May require Windows UAC (User Account Control) permission. Grant the permission and continue with the installation process.
5. Set Installation Options: During installation, you can choose whether to install components such as Wireshark and WinPcap (Npcap in some versions). It is usually a good option to accept the recommended settings.
6. Complete the Installation: Follow the necessary steps to complete the installation process. Once the installation is complete, you will have the option to launch Wireshark.
7. Launch Wireshark: Once the installation is complete, launch Wireshark. You can now capture and analyze network traffic.

#### **For Linux Operating System:**

Wireshark is available in the repositories of many Linux distributions, so you can install the package using the commands below. For example, on a Debian or Ubuntu based system:

```
sudo apt update  
sudo apt install wireshark
```

Administrator permission with sudo may be required during installation. Additionally, in order to use Wireshark, it may be necessary to add the user to the “wireshark” group or start it with sudo.

#### **For Mac OS:**

To use Wireshark on Mac OS X, you can download and install a DMG file from the official website. You should frequently follow the instructions during installation.

Once you install Wireshark, you can start using it to capture and analyze network traffic. Remember that monitoring network traffic may require certain permissions and you must do so in a legal and ethical manner.

### DoS — DDoS

Denial of Service (DoS) and Distributed Denial of Service (DDoS) attacks are types of cyber attacks that aim to temporarily or permanently disrupt the ability to provide services to computer systems or networks.

![](https://cdn-images-1.medium.com/max/800/0*CnVj85vNvqXwZqbI)

A DoS (Denial of Service) attack is an attempt to make traffic from a single source unusable. DDoS (Distributed Denial of Service) attack is an attempt to make coordinated traffic coming from many sources unusable. The main difference is that DoS comes from a single source whereas DDoS comes from multiple sources. DDoS is a larger and more effective type of attack.

You can use the [hping3](https://www.kali.org/tools/hping3/) tool on a Linux machine to perform these attacks in your own lab environment. In addition, the [DoS Attack Framework](https://github.com/yusufarbc/DoS-Attack-Framework) tool offers you an interactive interface to perform DoS attacks.

### TCP Attacks

TCP (Transmission Control Protocol) is a communication protocol used to ensure reliable and sequential data transmission between computers. The way TCP works is managed using control pointers called flags. Explanations of TCP's operating principles and flags are given:

1. **Initialization (SYN — Synchronize):** The client side sends a packet containing a “SYN” flag to initiate the connection.
2. **Response (SYN-ACK — Synchronize Acknowledgment):** If the server side accepts the connection, it sends a response containing the “SYN-ACK” flag.
3. **Acknowledgment (ACK — Acknowledgment):**The client party sends a response containing an “ACK” flag to confirm that the second party has received the acceptance response, and the connection is completed.
4. **Data Transmission (PSH — Push, URG — Urgent, FIN — Finish, RST — Reset):** After the connection is established, the parties start data transmission. The data packets to be transmitted are marked with these flags:

* **PSH (Push):** Indicates that you want the data to be transmitted quickly.
* **URG (Urgent):** Indicates that it is priority data.
* **FIN (Finish):** Ends data transmission.
* **RST (Reset):** Resets and terminates the connection.

TCP uses flags to ensure the order and reliability of sent data. Data packets are transmitted in a specific order, and missing or faulty packets are re-requested.

![](https://cdn-images-1.medium.com/max/800/0*pzIithfwbR4guk5-)

Three Way Handshake

Denial of service attacks using the TCP protocol are attacks that generally aim to consume network or server resources and cause service interruptions. These types of attacks can affect target networks or servers by exploiting vulnerabilities in TCP/IP communications. Here are some denial of service attacks using the TCP protocol:

#### SYN Flood Attack

In this attack, attackers send a large number of fraudulent connection requests (SYN requests) to the target server. While the target server tries to respond to these requests, it consumes its resources and becomes unable to serve real users.

When we detect a SYN Flood attack with Wireshark, we see many TCP packets with SYN flags sent at very short time intervals.

![](https://cdn-images-1.medium.com/max/800/1*8f1IfL0GBQhChQvtBIMM1w.png)

SYN-Flood

#### RST Flood Attack

Attackers reset existing connections by sending spoofed TCP RST packets to the target server. This may disrupt the functioning of the target server and render services unusable.

When we detect an RST Flood attack with Wireshark, we see many RST flagged TCP packets sent at very short time intervals. It also manipulates the source address and makes it appear as if it comes from different IP addresses.

![](https://cdn-images-1.medium.com/max/800/1*3YLM5vaoxJjO3zo5h_nA1w.png)

RST Flood

#### ACK-PSH Flood Attack

In this type of attack, attackers send large amounts of fake TCP ACK and PSH (Push) packets to the target server. This can consume the server's resources and cause services to slow down.

When we detect an ACK-PSH Flood attack with Wireshark, we see many TCP packets with PSH+ACK flags sent in very short time intervals. It manipulates the source address and makes it appear as if it comes from different IP addresses.

![](https://cdn-images-1.medium.com/max/800/1*N5dYU-KK2LY19L4dcajOuw.png)

ACK-PSH Flood

#### ACK Flood Attack

Attackers send large amounts of fake TCP ACK (Acknowledgment) packets to the target server. This can quickly consume the server's resources.

Similar to ACK-PSH, when we look at ACK Floo with wireshark, we see TCP packets with ACK flags sent at very short intervals. The source address was manipulated to appear as coming from a different source.

![](https://cdn-images-1.medium.com/max/800/1*UgJojmwpCwsycIQG5kO7UQ.png)

ACK Flood

These types of attacks create situations where servers and networks are overloaded and can cause service outages. Therefore, targets often use security measures and cybersecurity solutions to detect and defend against attacks. These solutions may include measures such as traffic filtering, firewalls, intrusion detection systems, and load balancing. Additionally, network security policies and good security practices are also important.

### UDP Attacks

UDP (User Datagram Protocol) is a communication protocol used for data transmission in IP-based networks. UDP allows data packets to be transmitted quickly and with low latency, but does not guarantee reliable transmission or reception of data. UDP is often used in applications such as audio and video streaming and network gaming.

UDP does not include security and reliability mechanisms like TCP to transmit or receive data securely. Therefore, UDP attacks can be more unpredictable and harder to defend against. Some UDP attacks and their explanations:

#### **UDP Flood Attack**

In this type of attack, attackers send a large amount of spoofed UDP packets to the target server. These packets attempt to exhaust the target server's resources and render its services unusable.Such attacks may involve sending packets so fast that the target server cannot respond.

Similar to TCP attacks, when we look at UDP attacks with Wireshark, we see packets sent at very short intervals. The difference is this time there are UDP packets, not TCP. In addition, the source address was manipulated and shown as coming from a different source.

![](https://cdn-images-1.medium.com/max/800/1*VNf1wUYOGRdXBuNUeU0qPg.png)

UDP Flood

#### **UDP Fragmentation Attacks**

In this type of attack, attackers divide large UDP packets into small pieces and send these pieces to the target server. This may cause the target server to exhaust its resources to reassemble packages.

Protection against UDP attacks may include security measures such as traffic filtering, firewalls, packet balancing, and intrusion detection systems. Additionally, the target server's resources and network traffic should be monitored and intervention should be taken when abnormal situations are detected.

### ICMP Attacks

ICMP (Internet Control Message Protocol) is a communication protocol used to perform error notification, network routing information, and other network management functions on an IP network. ICMP attacks aim to disable a service or network by using this protocol for malicious purposes. Below are some of the common ICMP attacks and their descriptions:

#### **Ping Attacks (Ping Flood)**

Attackers send large amounts of ICMP Echo Request (ping) requests to the target server. These requests require the target server to respond and may consume the server's resources.

When we examine the network traffic with Wireshark, we see many ICMP echo request packets. These requests came from a single source.

![](https://cdn-images-1.medium.com/max/800/1*dqsZopEHHSShzDAVlx62gA.png)

Ping Flood

#### Smurf Attacks

In this type of attack, attackers send large amounts of ICMP Echo Requests using spoofed source IP addresses. These requests are forwarded to all devices on the network and all devices respond, causing the target server to become overloaded.

When we examine the network traffic with Wireshark, we see many ICMP echo request packets. These requests appear to come from manipulated sources.

![](https://cdn-images-1.medium.com/max/800/1*KKFdMVKStomIrgb24zsXWA.png)

Smurf Attack

#### **ICMP Redirect Attacks**

Attackers attempt to spoof devices on the target network with spoofed ICMP Redirect requests. This can be used to redirect network traffic to a malicious server.

#### **ICMP Time Exceeded Attacks**

In this type of attack, attackers try to exhaust the target server's resources by sending ICMP Time Exceeded messages. These messages may increase traffic generated by ICMP traffic.

ICMP attacks can overload the target network or server, causing service interruptions. Protection against such attacks may include security measures such as firewalls, IPS (Intrusion Prevention System), ICMP traffic filtering and penetration tests. Additionally, it is important for network administrators to monitor network traffic and detect abnormal activity.

### HTTP/HTTPS Attacks

HTTP and HTTPS denial of service (DoS — Denial of Service attacks aim to target web servers or web applications and prevent access to these services. Such attacks can cause server overload and service outages. Here are some denial of service attacks against HTTP and HTTPS services:

#### **HTTP Flood Attacks**

Attackers send a large number of HTTP requests to the target web server. This can consume the server's resources and cause it to become unavailable.

I found a tool written in Python to perform this attack. Link [here](https://github.com/D4Vinci/PyFlooder). I performed an HTTP flood attack on a web server I set up at my local location.

When we examine the traffic with Wireshark, we see that many HTTP GET packets are sent in very short intervals.

![](https://cdn-images-1.medium.com/max/800/1*wr8sajciDuwntDmn68NOdw.png)

HTTP GET Flood

#### **Slowloris Attacks**

Attackers establish a slow connection to the web server and keep that connection open. This may prevent the server from responding to new connections.

#### **SSL/TLS Handshake Attacks**

Attackers can exhaust servers' resources by overloading SSL/TLS handshake processes. For this, the target web serverIt must use the HTTPS protocol and have an SSL certificate.

#### **BEAST (Browser Exploit Against SSL/TLS) Attacks**

In such attacks, attackers can compromise secure connections by trying to decrypt previously encrypted data. For this, the target web server must use the HTTPS protocol and have an SSL certificate.

#### **Heartbleed Attacks**

Heartbleed vulnerability is a type of attack that targets SSL/TLS servers. Attackers can steal sensitive information from the server. Likewise, for this attack, the target web server must use the HTTPS protocol and have an SSL certificate.

Methods of protection against denial of service attacks may include security measures such as traffic filtering, firewalls, load balancing, use of CDN (Content Delivery Network) and service monitoring. It is also important to apply up-to-date software patches and security policies.

### DNS Attacks

DNS (Domain Name System) is a service and protocol that translates domain names on the Internet (for example, [www.example.com](http://www.example.com)) into IP addresses (for example, 192.0.2.1) and provides this translation process. DNS translates domain names understandable to humans into IP addresses understandable to computers. This allows applications such as internet browsers to convert domain names entered by users into real IP addresses.

![](https://cdn-images-1.medium.com/max/800/0*BCj832ixsuIArXfY)

DNS

DNS denial of service attacks are cyber attacks that aim to disrupt or interrupt the operation of this service. Denial of service attacks against DNS services can include:

#### DNS Flood Attacks

Attackers send large numbers of spoofed DNS queries to the target DNS server. The server quickly runs out of resources to process these queries and the DNS service is interrupted.

#### DNS Amplification Attacks

Attackers send large-sized queries to the DNS server, which trigger larger responses from the DNS server. Responses are routed towards the target server, causing the target server to become overloaded.

#### DNS Cache Poisoning Attacks

Attackers attempt to insert spoofed data into the target DNS server's cache. This can mislead users by sending false IP addresses to the target's users.

#### NXDOMAIN Attacks

Attackers exhaust the target's resources by sending fake NXDOMAIN (Domain Not Found) queries to which the target server responds.

DNS denial of service attacks can have serious consequences, such as disrupting internet access or rendering websites unusable. Protecting against such attacks may include measures such as improving the security settings of DNS servers, monitoring and filtering traffic, using DNS security extensions, and maintaining backup DNS servers. It is also important to ensure that DNS servers and infrastructure are up to date and secure.

### Macof Attack

MACOF (MAC Flooding) attack is a type of network attack performed on Ethernet networks. This attack is carried out with the aim of maliciously leaking the MAC (Media Access Control) addresses of devices on the network or disrupting network performance. MACOF is typically performed on local networks or wireless networks. Here's how the attack works:

1. The attacker creates a large number of random MAC addresses by pretending to be a device connected to the network.
2. These spoofed MAC addresses are used in Ethernet frames directed to all devices on the network. The attacker sends data packets with these spoofed MAC addresses like normal network traffic.
3. Switches in the network normally learn the relationship between a MAC address and the port it is connected to and record this information in a learning table. However, the attacker quickly fills this table with spoofed MAC addresses, overloading the switchers.
4. Overloaded switchers forward data packets to all ports, which can slow down network traffic or cause outages.

The MACOF attack aims to disable the network by disrupting the normal function of the switchers. Protecting against this type of attack may include firewalls and security policies, as well as measures such as monitoring network traffic and detecting anomalous traffic. Additionally, it is important to configure the security settings of the switchers in the network correctly.

### Resources

[**SampleCaptures**  
*So you're at home tonight,Having just installed Wireshark. You want to take the program for a test drive. But your…*wiki.wireshark.org](https://wiki.wireshark.org/SampleCaptures#sample-captures "https://wiki.wireshark.org/SampleCaptures#sample-captures")

[**Build software better, together**  
*GitHub is where people build software. More than 100 million people use GitHub to discover, fork, and contribute to…*github.com](https://github.com/topics/dns-amplification-attack "https://github.com/topics/dns-amplification-attack")