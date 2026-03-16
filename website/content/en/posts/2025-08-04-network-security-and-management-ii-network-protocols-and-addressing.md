---
date: '2025-08-04'
description: 'This chapter takes an in-depth look at two vital elements that form the basis of computer networks: protocols and addressing. Protocols are sets of rules and standards that define how networked devices communicate with each other, exchange data, and ...'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*6rU6oXi2MLCrzFevgSY-_g.png
layout: single
series:
- Network Security and Management
title: 'Network Security and Management II: NETWORK PROTOCOLS AND ADDRESSING'
type: posts
---

### Introduction

This chapter takes an in-depth look at two vital elements that form the basis of computer networks: protocols and addressing. Protocols are sets of rules and standards that define how networked devices communicate with each other, exchange data, and manage errors; It is a kind of universal "language" of the network. Addressing is the mechanism that ensures that the sent data reaches the correct destination by assigning a unique "identity" to each device on this network. In this section, a wide range will be discussed, starting from the core protocols of the TCP/IP model to innovative protocols that meet the performance and security needs of the modern Internet. Then, the challenges posed by IPv4 addressing from the early days of the internet and the techniques developed to overcome these challenges, and the transition to the IPv6 architecture that shapes the internet of the future will be examined. Finally, the complex routing protocols that hold together the huge "network of networks" structure of the Internet and enable data packets to find the most appropriate paths between continents and the technical and political logic behind these protocols will be analyzed.

### Main Topic 3: Basic and Modern Network Protocols

This main topic covers the evolution from the basic building blocks of network communication to the latest protocols developed to meet today's high performance and security expectations.

### Subheading 3.1: Core Protocols and Their Functions

This subheading will detail the most basic and indispensable protocols of the TCP/IP stack, their working mechanisms and their roles in the network. Modern networking is unthinkable without these protocols.

#### 3.1.1. Address Resolution (ARP) and Dynamic Configuration (DHCP)
 
 **ARP (Address Resolution Protocol):** This protocol acts as a critical “translator” between the Internet Layer (OSI Layer 3) and the Network Interface Layer (OSI Layer 2) of the TCP/IP model. When a device wants to send data to another device on the same local network, it knows the logical IP address of the target device, but it needs the MAC address, which is the hardware address of the target device, to physically transmit the data. ARP broadcasts an "ARP Request" to the local network, saying "Let the device with this IP address notify me of its MAC address." The relevant device sends its MAC address directly to the requesting device (unicast) with an “ARP Response”. These IP-MAC matches are temporarily stored in the ARP cache of the device to speed up future communications.
 
 **DHCP (Dynamic Host Configuration Protocol):** This protocol provides centralized and automatic assignment of basic network configuration information, such as IP address, subnet mask, default gateway, and DNS server, to devices on a network. This greatly simplifies network management and eliminates errors that can arise from manual configuration. DHCP process works through a four-step mechanism known as **DORA**:
 
 1. **Discover:** The client that has just joined the network sends a DHCPDISCOVER broadcast message to the network to find a DHCP server.
 2. **Offer:** DHCP servers on the network respond to the client with a DHCPOFFER message containing an IP address and other configuration information.
 3. **Request:** The client selects one of the incoming offers and sends a DHCPREQUEST broadcast message stating that it wants to use this IP address.
 4. **Acknowledge:** The selected DHCP server sends a DHCPACK message confirming that the IP address has been leased and containing final information such as the lease duration.

ARP and DHCP are a symbiotic duo that underpins the plug-and-play nature of an IP network. When a device is physically connected to the network, its first action is to issue a DHCP Discover broadcast to obtain an IP address. The DHCP server gives the device an IP address, subnet mask, and most importantly, a default gateway (router) IP address so it can communicate with the outside world. The device now has an IP address, but it needs to know its physical (MAC) address to send a packet to the default gateway. This is where ARP comes into play. The device broadcasts an ARP request for the default gateway's IP address and learns the gateway's MAC address. The sequential and successful operation of these two protocols is the main reason why a device can access the internet within seconds of joining the network. If one fails, the absence of information causes the information provided by the other to become dysfunctional. This is the most basic and oldest, yet most critical example of network automation.

#### 3.1.2. Transport Layer: TCP (Reliable) vs. UDP (Fast)

**TCP (Transmission Control Protocol):** It is a "connection-oriented" protocol designed to provide a reliable, sequential and error-controlled data flow. It provides reliability through three basic mechanisms:
 
 1. **Three-Way Handshake:** Establishes a virtual circuit between the client and server before data transfer begins. The process consists of the following steps: The client sends a SYN (synchronization) packet, the server replies with a SYN-ACK (synchronization-acknowledgment) packet, and finally the client establishes the connection by sending an ACK (acknowledgment) packet.
 2. **Sequence & Acknowledgment Numbers:** A sequence number is assigned to each data segment sent. The receiver sends an acknowledgment (ACK) number for each segment it receives. Lost or corrupted segments are detected and resent thanks to this mechanism.
 3. **Flow Control:** It prevents the receiver's buffer from overflowing with the "windowing" mechanism that allows the receiver to slow down the sender.
 
 **UDP (User Datagram Protocol):** It is a “connectionless” and “unreliable” protocol. Since it does not have mechanisms such as three-way handshake, sorting or error checking, it contains much less header information, which makes it extremely fast. It sends data packets with a “fire and forget” logic. DNS queries are preferred in applications where speed is more critical than data integrity, such as VoIP, online gaming and video streaming.

The table below summarizes the key differences between these two protocols. This comparison clearly demonstrates one of the most fundamental tradeoffs in network engineering—the balance between reliability and speed—and is a critical reference for understanding why one transport protocol is preferred over another for a given application.

![](https://cdn-images-1.medium.com/max/800/1*dVjq0Id2Id8E3HTP5kP_zg.png)

**Comparative Analysis of TCP and UDP Protocols**

#### 3.1.3. Control and Error Messaging (ICMP): Ping and Traceroute

**ICMP (Internet Control Message Protocol):** ICMP, an integral part of IP, is used for devices on the network (routers and hosts) to report error conditions and operational information. Because IP is a “best-effort” protocol and does not guarantee packet delivery, when a packet fails to reach its destination (for example, if the destination host is down or the packet is discarded by a router resetting its TTL value), ICMP messages are used to notify the source.
 
 **Ping:** The most basic tool for network diagnostics. It uses ICMP's “Echo Request” (Type 8) and “Echo Reply” (Type 0) messages to test whether a destination is reachable on the network and the round-trip time (RTT) between the source and destination.
 
 **Traceroute (tracert on Windows):** Uses an intelligent mechanism to map the path a packet takes from source to destination (that is, the routers or “hops” it passes through). The source device sends a packet with a TTL (Time to Live) value of 1 towards the destination. When the first router on the path receives the packet, it decrements the TTL value by 1 to 0, discards the packet, and sends an ICMP “Time Exceeded” (Type 11) message to the source. The source learns the IP address of the first router from this message. It then sends a new packet with a TTL of 2, and this process is repeated for each hop until the packet reaches the destination. In this way, the identity of all routers on the path and the latency at each hop are determined.

### Subheading 3.2: Modern Security and Performance Protocols

This subheading examines innovative solutions that emerge where traditional protocols fail to meet the demands of the modern web.

#### 3.2.1. TLS 1.3: Faster and Secure Handshake

Standardized by RFC 8446, TLS 1.3 offers significant security and performance improvements over previous versions.

* **Performance Improvement:** Its biggest innovation is that it optimizes the handshake process. While TLS 1.2 required two round-trip times (2-RTT) to establish a secure connection, TLS 1.3 reduces this process to a single round-trip (1-RTT). This significantly reduces the loading time of web pages, especially on high-latency mobile networks. Also, if you have connected to a site before, thanks to the 0-RTT feature, some data can be sent securely in the first message, further reducing latency.
* **Security Tightening:** TLS 1.3 narrows the attack surface by completely removing outdated and insecure cryptographic algorithms such as RC4, CBC mode ciphers, and RSA key exchange, which lead to attacks such as POODLE and ROBOT. This approach increases security by enforcing “perfect forward secrecy” by default.

#### 3.2.2. QUIC and HTTP/3: Exceeding the Limits of TCP

**Core Problem: Head-of-Line (HOL) Blocking:** Although TCP-based HTTP/2 increased performance with its multiplexing feature, it suffered from a problem inherent in TCP. Because TCP guarantees sequential delivery of packets, when a single packet from a flow is lost, packets from all subsequent flows are held until that packet is retransmitted. This situation is called “head-of-line blocking”.

**QUIC's Solution:** QUIC (Quick UDP Internet Connections), developed by Google and standardized by the IETF, is a new transport layer protocol that works on UDP instead of TCP to solve this problem. QUIC manages each HTTP stream independently. In this way, when a packet belonging to one flow is lost, other flows can continue transmitting data without being affected, thus eliminating HOL blocking.

**Additional Benefits:** QUIC reduces connection setup to 1-RTT or 0-RTT by combining transport (TCP) and cryptographic (TLS) handshakes in a single step. It also has a “connection migration” feature that ensures that the connection is not interrupted when the IP address changes, such as when a user moves from Wi-Fi to a mobile network.

**HTTP/3:** It is the newest version of the HTTP protocol designed to use QUIC instead of TCP as the transport layer. In this way, it brings all the performance and security advantages of QUIC to web applications.

The rise of TLS 1.3, QUIC, and HTTP/3 represents a significant paradigm shift in internet architecture. Intelligence and control are moving from the slowly evolving layers traditionally found in the operating system kernel and middlebox devices to the application layer (browsers, server software) where innovation can occur rapidly. The traditional TCP/TLS stack sits at the core of operating systems, and making a change to these layers is a slow process that requires all operating system vendors to adopt updates. Big tech companies didn't want to be stuck in this slow evolution to improve web performance. The solution is to bypass TCP completely and use UDP as a basis, which is already present in every operating system and can be programmed from the application layer. QUIC takes all the good features of TCP and TLS, such as reliability, flow control, and encryption, and reimplements them at the application layer, over UDP. This strategic move has enabled application developers to roll out a new transport protocol to the world, without waiting for operating system updates, simply by updating their browsers and server software. This has accelerated the pace of innovation and shifted control from network operators to application developers.

### Main Topic 4: IP Addressing and Network Design

This master topic comprehensively examines the art and science of assigning unique identities to devices on the network, from the historical legacy and solutions of IPv4 to the future-proof architecture of IPv6.

### Subheading 4.1: IPv4 Addressing and Management

#### 4.1.1. Address Structure, Classes, and Private IP Ranges (RFC 1918)

An IPv4 address consists of 32 bits and is usually represented as four decimal numbers (octets) separated by periods (for example, 192.168.1.1). Originally, addresses were divided into strict classes, such as A, B, and C, based on the value of their first octet. This classful structure is no longer used because it causes great inefficiency in IP address allocation. To slow down the exhaustion of IPv4 address space, three private address ranges that are not routed on the Internet and can be freely used in organizations' internal networks are reserved by RFC 1918:

10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16.

#### 4.1.2. Subnetting: Network Segmentation for Performance and Security

Subnetting is the process of dividing a large block of IP addresses into smaller and manageable subnets. The main purposes of this process are:

* **Performance Increase:** By dividing the network into smaller network segments (broadcast domains), it reduces unnecessary broadcast traffic and increases network efficiency.
* **Security Increase:** Placing different departments or server types in separate subnets makes it easier to control traffic between them and restrict lateral movement by placing firewall rules or Access Control Lists (ACLs) between them.

Technically, this process is done using the subnet mask. The '1' bits in the mask represent the network part, and the '0' bits represent the host part. The network part is expanded by “borrowing” bits from the host part, thus creating new subnets.

#### 4.1.3. CIDR and VLSM: Flexible and Efficient Address Usage


**VLSM (Variable Length Subnet Mask):** It is a technique of dividing a network block into subnets of different sizes, thanks to the flexibility provided by CIDR.1 For example, a /25 mask can be used for a subnet that needs 100 hosts, while a /30 mask that needs only 2 addresses can be used for a point-to-point connection between two routers. This minimizes IP address waste.

#### 4.1.4. Network Address Translation (NAT)

NAT (Network Address Translation), usually running on a router or firewall, hides and translates multiple private IP addresses (RFC 1918) on the internal network behind a single public IP address.1 This mechanism was a “patch” that delayed the exhaustion of IPv4 addresses for decades. However, NAT breaks the end-to-end connection model, which is one of the basic architectural principles of the Internet. It makes it difficult to gain direct external access to a device on the internal network and creates problems for some applications (especially peer-to-peer).1

### Subheading 4.2: IPv6 Architecture and the Internet of the Future

#### 4.2.1. 128-bit Address Space, Notation and Abbreviation Rules

The most distinctive feature of IPv6 is its massive 128-bit address space. This theoretically means 2128 (about 340 undecillion) addresses, permanently solving the problem of IP address scarcity.1 An IPv6 address is written as eight 16-bit hexadecimal blocks separated by a colon (:).1 There are two basic rules to make writing easier:

1. Leading zeros within a block can be discarded (for example, 0db8 -> db8).
2. Consecutive blocks of zeros can be abbreviated with :: only once in the address (for example, the address 2001:0db8:0000:0000:8a2e:00ff:fe28:9c5a can be written as 2001:db8::8a2e:ff:fe28:9c5a).1

#### 4.2.2. IPv6 Address Types (Global Unicast, Link-Local, Multicast)

IPv6 removed the broadcast concept from IPv4 and replaced it with more efficient and specific address types:

* **Global Unicast:** These are public addresses that can be routed on the Internet (equivalent to IPv4 public IP). They usually start with the prefix 2000::/3.1
* **Link-Local:** Used only for communication between devices on the same physical link (link) and cannot pass routers. They start with the prefix fe80::/10. Devices automatically create a link-local address when connected to the network.1
* **Unique Local:** Similar to private IP addresses in IPv4, it is used within an organization's internal network and is not routed on the internet. They start with the prefix fc00::/7.1
* **Multicast:** Defines a group interface. A packet sent to this address is forwarded to all members of the group. It replaces broadcast in IPv4 more efficiently.1

#### 4.2.3. Automatic Configuration (SLAAC) and Simplified Header Structure

**SLAAC (Stateless Address Autoconfiguration):** Allows devices to automatically configure their own Global Unicast IP addresses without the need for a DHCP server.1 The device creates a unique 128-bit address by combining the 64-bit network prefix it receives from the local router with the 64-bit interface ID derived from its own 48-bit MAC address. This greatly simplifies network management and is an especially critical feature for large-scale IoT deployments.

**Simplified Header:** The IPv6 header has fewer fields than IPv4 and some fields have been moved to optional “extension headers”. This allows routers to process packets faster and more efficiently because the header has a fixed size. It is clear and there is no need to process unnecessary fields in each package.

#### 4.2.4. Migration Mechanisms from IPv4 to IPv6 (Dual-Stack, Tunneling)

Various mechanisms have been developed for a transition period during which the two protocols will coexist for a long period of time:

* **Dual-Stack:** It is the most common and simple method. Network devices and operating systems run both IPv4 and IPv6 protocol stacks simultaneously. When communicating with a target, communication is established over IPv6 if possible, otherwise over IPv4.
* **Tunneling:** Allows IPv6 traffic to be carried over IPv4 networks that do not yet support IPv6. In this technique, an IPv6 packet is encapsulated by placing it in the data portion of an IPv4 packet. Various automatic and manual tunneling techniques are available, such as 6to4, Teredo and ISATAP.

IPv6's design reflects a conscious engineering effort to not only solve address scarcity, but also to clean up the "technical debt" that IPv4 had accumulated over time. To IPv4's complex manual or DHCP-based configuration problem, IPv6 answers with SLAAC. IPv6 finds a solution to IPv4's NAT problem, which disrupts end-to-end connections, by eliminating the need for NAT thanks to its large address space. In contrast to IPv4's complex processor-intensive packet header, IPv6 offers a simplified, fixed-size header that can be processed more quickly by routers. As a result, IPv6 not only offers “more IP addresses”; It is also a holistic redesign aimed at simplifying network management, improving performance, and restoring the original architectural vision of the internet.

### Main Topic 5: Routing Protocols and the Backbone of the Internet

This main topic examines the protocols that manage how data packets reach their destination within a network or between networks around the world.

### Subheading 5.1: Routing Principles

#### 5.1.1. Static and Dynamic Routing Comparison

**Static Routing:** The network administrator manually enters each route into the routers.1 It is a secure and resource-efficient solution in small networks whose topology does not change. However, when the network grows, it becomes impossible to manage and cannot automatically adapt to changes in the network (for example, a line break), meaning there is no fault tolerance.

**Dynamic Routing:** Routers communicate with each other using routing protocols (RIP, OSPF, BGP, etc.) and automatically learn the network topology and update their routing tables.1 This approach provides scalability, flexibility and fault tolerance for large and complex networks.

#### 5.1.2. Administrative Distance and Metric Concepts

When a router learns a route to the same destination from multiple sources (for example, through both a static route and the OSPF protocol), it uses a two-step process to decide which route to add to its routing table:

1. **Administrative Distance (AD — Administrative Distance):** First, the AD value, which indicates the reliability degree of the source of the routing information, is checked. The source with a lower value is considered more reliable and the method learned from that source is preferred. For example, on Cisco devices, the AD value of a static route is 1, while OSPF's is 110. In this case, static route is always preferred over OSPF.
2. **Metric:** If the routes are learned from the same dynamic protocol (i.e., AD values ​​are equal), this time the metric value used by the protocol to determine the best route within itself is checked. The route with the lowest metric is selected as the best route and added to the routing table.1 Metric calculation varies by protocol: it is a combination of multiple parameters, such as hop count for RIP, bandwidth-based cost for OSPF, bandwidth and delay for EIGRP.

### Subheading 5.2: Internal Gateway Protocols (IGP — Internal Autonomous System)

IGPs are used for routers within a single Autonomous System (AS) to share route information with each other.1

#### 5.2.1. Distance Vector: RIPv1 and RIPv2

**Working Logic:** It is the oldest and simplest distance vector protocol. It uses only “hop count” (number of hops) as the metric and allows a maximum of 15 hops.1 Routers periodically send their entire routing tables to their neighbors.

**RIPv1 and RIPv2 Differences:** RIPv1 is a classful protocol and does not send subnet mask information in routing updates. RIPv2 is classless and supports Variable Length Subnet Mask (VLSM) and updates via multicast, which is more efficient, instead of broadcast.

#### 5.2.2. Link Status: OSPF and Dijkstra Algorithm

**Operating Logic:** OSPF (Open Shortest Path First) is a link-state protocol. Each router creates a topological map (link-state database) of the entire network. By running Dijkstra's Shortest Path First — SPF algorithm on this map, it calculates the fastest (lowest cost) paths from itself to all other targets in the network.

**Advantages:** It adapts very quickly to changes in the network (fast convergence) and has the ability to divide the network into “areas” for scalability. This hierarchical structure reduces the processing load on routers in large networks.

#### 5.2.3. Hybrid: EIGRP and DUAL Algorithm

**Working Logic:** EIGRP (Enhanced Interior Gateway Routing Protocol) is a protocol developed by Cisco that combines both distance vector and link state features. It uses the DUAL (Diffusing Update Algorithm) algorithm to find the best path and provide a loop-free topology.

**Fast Convergence:** One of the biggest advantages of EIGRP is that, in addition to the primary path (Successor), it pre-calculates and keeps ready the best backup path (Feasible Successor) that is guaranteed not to cause a loop. When the primary path goes down, the router instantly switches to the backup path, providing very fast convergence.

### Subheading 5.3: External Gateway Protocol (EGP — Autonomous Intersystem)

#### 5.3.1. Internet's Routing Protocol: BGP

The Internet consists of thousands of independent networks (Autonomous Systems — AS). BGP (Border Gateway Protocol) is the only External Gateway Protocol (EGP) used for routing between these different ASes.1 BGP is classified as a “path-vector” protocol.

#### 5.3.2. Autonomous System Number (ASN) and its Role

An Autonomous System Number (ASN) is a number that uniquely identifies each autonomous system on the internet (such as a large ISP, a university, a cloud provider network).1 BGP uses these numbers to exchange routing information between ASs and enforce routing policies.

#### 5.3.3. Policy-Based Routing: AS-PATH and Other BGP Attributes

While the goal of IGPs like OSPF is to find the *fastest* path within an AS based on technical metrics (bandwidth, cost), the goal of BGP is to find the *policy-based best* path between ASes.1 These policies are often based on commercial agreements (peering, transit), costs, and security concerns rather than speed.1 The Internet is not owned by a single company; It consists of organizations acting in their own interests, such as rival ISPs and cloud providers. The primary goal of these organizations is to optimize their own networks and make profits, not the global network. An ISP may choose to send its traffic over a slower but free “peering” connection rather than a faster but expensive “transit” connection. BGP provides the necessary tools to technically implement these business decisions.

**AS-PATH Attribute:** It is the most basic attribute of BGP. It contains a list of ASs that must be passed to reach a goal. It has two basic functions 1:

1. **Loop Prevention:** If a router sees its AS number in the AS-PATH list of an incoming route announcement, it understands that this route creates a loop and rejects it.
2. **Path Selection and Policy:** By default, the path with the shortest AS-PATH is preferred. However, administrators can artificially lengthen the path by adding their own ASNs to this list multiple times with the "AS-PATH prepending" technique and make other ASes prefer that path less. This is purely a policy tool, not about speed.

Other BGP attributes, such as LOCAL_PREF and MED, are policy tools used to influence which routes an AS chooses or how its neighbors reach their networks. The path a packet takes on the Internet is not always the most technically efficient; it is often the result of a series of business and political decisions. Understanding this philosophical distinction is key to understanding how the global internet actually works.

The following table summarizes the key philosophical and technical differences between OSPF, an intra-AS routing protocol, and BGP, an inter-AS routing protocol.

![](https://cdn-images-1.medium.com/max/800/1*FlgrJqdasUCOHJ1RQvVpGQ.png)

**Philosophical and Technical Differences Between OSPF (IGP) and BGP (EGP)**