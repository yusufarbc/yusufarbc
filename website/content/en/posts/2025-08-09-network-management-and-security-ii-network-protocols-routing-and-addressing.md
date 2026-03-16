---
title: "Network Management and Security II: Network Protocols, Routing and Addressing"
date: 2025-08-09
description: "In today's hyper-connected world, a complex and massive infrastructure of computer networks underlies everything from the global economy to our daily social interactions. This infrastructure is an inv..."
featuredImage: "https://cdn-images-1.medium.com/max/800/0*1gN6tP9Nv5sf9IGl.png"
series: ["Ağ Güvenliği ve Yönetimi"]
---

![](https://cdn-images-1.medium.com/max/800/0*1gN6tP9Nv5sf9IGl.png)

In today's hyper-connected world, a complex and massive infrastructure of computer networks underlies everything from the global economy to our daily social interactions. This infrastructure is an invisible backbone that requires billions of components to work in harmony, from data centers on different continents to smart devices in our homes. So, how can these devices, produced by different manufacturers and using different technologies, communicate with each other so smoothly, quickly and securely? The answer to this question lies in the standardized protocols, hierarchical addressing systems and intelligent routing algorithms that form the basis of network engineering.

This technical article has been prepared to delve into the fundamental principles behind the functioning of modern networks. From the OSI model, which provides a theoretical framework, to the TCP/IP protocol stack, which is the backbone of the internet; All critical issues will be discussed, from IPv4 and IPv6 addressing that provides identity to every device on the network, to dynamic routing protocols that enable data packets to find the most efficient paths, and BGP, which draws the global road map of the internet. Additionally, a detailed look at switching technologies, VLAN management and loop prevention mechanisms that ensure efficiency and security in local networks will be presented. This article aims to be a basic reference source for students, IT professionals and engineers interested in network technologies.

---

### Chapter 1: Basic Models of Networking and Data Flow

Modern computer networks are built on standardized protocols and conceptual models that enable devices and software from different manufacturers to interoperate seamlessly. This chapter examines in depth the OSI and TCP/IP reference models that form the basis of network communication, the journey of data between network layers, and how errors encountered in this process are managed.

### 1.1 Reference Models: OSI and TCP/IP Comparison

To break down the complexity of network communications into manageable parts, two basic reference models have been developed: the OSI model, which is theoretically comprehensive, and the TCP/IP model, which has become the standard in practical application.

#### The Seven Layers of the OSI Model: A Theoretical Masterpiece

The Open Systems Interconnection (OSI) model developed by the International Organization for Standardization (ISO) is a conceptual framework that divides network functions into seven logical layers. Each layer performs a specific task and provides services to the layer above it while receiving service from the layer below it. These layers are, from bottom to top:

1. **Physical Layer:** It transmits data in bits (0's and 1's) over a physical medium such as cables, fiber optics or radio waves. Defines electrical and physical properties such as connectors and voltage levels.
2. **Data Link Layer:** It manages the reliable transfer of data between devices in the same network segment by correcting errors in the physical layer. It creates frames using MAC addresses.
3. **Network Layer:** It is responsible for routing and addressing packets between different networks. IP addresses operate at this layer.
4. **Transport Layer:** Provides end-to-end connection, data integrity and flow control. It divides data into segments and transmits it through protocols such as TCP (connection-oriented) or UDP (connectionless).
5. **Session Layer:** Establishes, manages and terminates communication sessions between devices.
6. **Presentation Layer:** It converts the data into a format that applications can understand. Tasks such as data compression and encryption are performed in this layer.
7. **Application Layer:** Provides direct network services to end user applications (web browsers, email clients, etc.).

The greatest strength of the OSI model is its protocol-agnostic structure and clear separation of the functions of each layer. This modularity greatly simplifies the process of network troubleshooting because each layer can be examined independently.

#### TCP/IP Protocol Stack: A Pragmatic Reality

Unlike the OSI model, the TCP/IP model is not used as a theoretical framework but rather as a practical model developed around working protocols that build it. It is generally considered a four-layer structure:

1. **Network Access Layer:** It combines the Physical and Data Link layers of OSI. It is responsible for the physical and logical connections between devices.
2. **Internet Layer:** Corresponds to the Network layer of OSI. IP (Internet Protocol) is the basis of this layer and ensures that packets are routed by finding the best path between different networks.
3. **Transport Layer:** It performs the same functions as the Transport layer of OSI. It provides reliable or fast data transmission with TCP and UDP protocols.
4. **Application Layer:** It combines OSI's Session, Presentation and Application layers into a single layer. It includes end user protocols such as HTTP, FTP, SMTP.

The success of TCP/IP stems from its simplicity and pragmatic approach. Even before the model was formalized, the internet was already being built on these protocols. This can be seen as a victory of engineering pragmatism over committee-based theoretical idealism. While OSI was a “top-down” approach that tried to create a perfect framework *before* building the network, TCP/IP was a “bottom-up” solution that solved an immediate problem, worked, and was “good enough.” As is often the case in the history of technology, a solution that worked and was adopted early prevailed over a theoretically superior but complex and late-arriving alternative.

![](https://cdn-images-1.medium.com/max/800/0*0uu7t1OYMiHTQNyo.png)

OSI Model vs TCP/IP Model

### 1.2 Data Encapsulation and De-encapsulation

Sending data across a network involves a layered packaging process, with each layer adding its own control information. This process is called **encapsulation**. The sequential extraction of this information at the receiving end is called **decapsulation**.

The encapsulation process is much more than a mechanical packaging process; It is the basic abstraction mechanism that provides *protocol independence and modularity* in layered network architecture. Each layer provides a “service” to the layer above, completely hiding the complexity of the layer below. For example, a web developer does not have to be aware of TCP's segmentation or IP's routing when using the HTTP protocol. This abstraction is one of the internet's greatest strengths; Replacing Ethernet with Wi-Fi at the physical layer requires no changes to the upper layers.

The data flow follows these steps:

1. **Application Layer:** User-generated data (e.g. the text of an email) is passed to the Transport layer. The data unit at this stage is usually called **Data**.
2. **Transport Layer:** It divides the incoming data into smaller pieces (segmentation) and adds a **TCP** or **UDP header** to the beginning of each piece. This header contains information such as source and destination port numbers. This new unit of data is called **Segment**.
3. **Internet Layer:** Adds an **IP header** to each segment. This header contains the source and destination IP addresses so that the packet can be routed between networks. The data unit at this stage is called **Packet** or **Datagram**.
4. **Network Access Layer:** Adds a **frame header** (containing source and destination MAC addresses) to the beginning of the packet and a **frame tail** (containing the CRC value for error checking) to the end. This data unit is known as **Frame**.
5. **Physical Transmission:** Finally, the frame is converted into **Bits** to be transmitted to the physical medium (e.g. copper wire).

In the receiving device, this process is reversed (decapsulation). Each layer reads, processes, removes the header added by its peer layer on the sending side, and transmits the rest of the data to the next layer. This principle of “peer layer interaction” ensures that layers can be developed and updated independently of each other.

### 1.3 Network Communication Error Management

During data transmission, signals may be corrupted and bit errors may occur. Network protocols use various mechanisms to manage these errors. There are two basic approaches: error detection and error correction.

#### Error Detection

The purpose of this approach is to determine if an error has occurred. If errors are detected, the erroneous data packet is usually discarded and requested to be resent by trusted protocols (such as TCP). The most common methods are:

* **Checksum:** Sender based on the content of the data. It calculates a mathematical value (checksum) and adds it to the package. The receiver makes the same calculation and compares his result with the value in the package. If the values ​​do not match, the package is corrupted. It is used in TCP and UDP headers.
* **Cyclic Redundancy Check (CRC):** It is a more complex and reliable method than Checksum. It is used at the Data Link layer, specifically in the queue of Ethernet frames (FCS — Frame Check Sequence). It is very effective at detecting errors of a few bits.

#### Error Correction

This approach not only detects errors but also attempts to correct them using additional data. This is usually done by encoding the data in a redundant manner. However, these methods bring much more overhead than error detection.

Error detection and subsequent retransmission is more efficient for networks such as the Internet, where retransmission is relatively cheap and fast. Error correction is preferred in situations where retransmission is too costly or impossible (for example, satellite communications or one-way broadcasts).

---

### Chapter 2: IP Addressing and Subnet Management

IP addressing is the fundamental mechanism that allows devices to be uniquely identified and communicate globally on a network. This chapter covers the structure of IPv4, techniques to alleviate the problem of address scarcity, IPv6 as the protocol of the future, and DHCP, which enables dynamic assignment of addresses.

### 2.1 IPv4 Addressing Architecture

IPv4 uses a 32-bit addressing scheme, which theoretically provides approximately 4.3 billion unique addresses. These addresses are usually shown in dot-separated decimal format (for example, 192.168.1.1).

* **Class Addressing (A Historical Overview):** Originally, IPv4 addresses were divided into classes such as A, B, and C. These classes rigidly determined how much of the address represented the network part and how much represented the host part. For example, Class A networks allowed very few networks but millions of hosts, while Class C networks allowed millions of networks but only 254 hosts each. This rigid structure led to inefficient use of addresses and great waste, as blocks were allocated that were much larger or much smaller than an organization needed.
* **Private and Public IP Address Ranges (RFC 1918):** To slow the rapid depletion of IPv4 addresses, the Internet Assigned Numbers Authority (IANA) has reserved private IP address ranges for use in local area networks (LANs). These ranges are:  
  `10.0.0.0` - `10.255.255.255` (`10.0.0.0/8`)  
  `172.16.0.0` - `172.31.255.255` (`172.16.0.0/12`)  
  `192.168.0.0` - `192.168.255.255` (`192.168.0.0/16`)  
  These private addresses are non-routable on the public internet and can be used by any organization without permission.
* **Network Address Translation (NAT):** **NAT (Network Address Translation)** is used so that devices using private IP addresses can access the internet. NAT usually runs on a router or firewall and maps multiple private IP addresses on the local network to a single public IP address. In this way, hundreds of devices can access the internet via a single public IP address. NAT has been a critical technology that has significantly alleviated the problem of IPv4 address scarcity.

### 2.2 Classless Inter-Domain Routing (CIDR) and Subnet Masks

The inefficiency and rigidity of class addressing brought the Internet to the brink of crisis in the early 1990s. The solution came with **CIDR (Classless Inter-Domain Routing)**. CIDR was not just an IP addressing technique, it was a revolutionary intervention that saved the IPv4-based internet from collapse. This technology simultaneously solved two vital interconnected problems: the *address scarcity* caused by inefficient address allocation and the *routing infrastructure crisis* caused by the uncontrolled growth of global routing tables.

* **CIDR Notation and VLSM:** CIDR makes the boundary that separates the network and host parts flexible. This is expressed by a forward slash (`/`) added to the end of the IP address followed by a number (for example, `192.168.1.0/24`). This number (prefix length) indicates how many bits of the address belong to the network part. This flexibility allows the use of **Variable Length Subnet Mask (VLSM)**. With VLSM, a network block can be efficiently divided into subnets of different sizes, thus minimizing address waste. For example, an organization that needs 500 hosts can be allocated a `/23` block of 512 addresses with CIDR, instead of being allocated a class B block of 65,534 addresses in the class system.
* **Subnetting and Supernetting:** In addition to optimizing address allocation, CIDR has also simplified routing tables. **Supernetting** (or route merging) is the process of combining multiple consecutive small network blocks into a single large route announcement. For example, an internet service provider might advertise 16 different `/24` (formerly class C) networks to the rest of the internet as a single `/20` route instead of 16 separate routes. This has prevented a routing infrastructure crisis by keeping the size of the routing tables of routers in the backbone of the Internet at manageable levels.

### 2.3 IPv6 Addressing: The Internet Protocol of the Future

With the depletion of IPv4 address space, **IPv6** was developed to accommodate the long-term growth of the Internet.

#### IPv6 Architecture and Advantages

IPv6 uses a **128-bit** address space instead of 32-bit. This translates to `2^128` or approximately 340 undecillion (3.4 x `10^38`) addresses, providing an "almost infinite" capacity. IPv6 addresses consist of eight 16-bit hexadecimal groups separated by colons (for example, `2001:0db8:85a3:0000:0000:8a2e:0370:7334`). The main advantages of IPv6 are:

* **Massive Address Space:** Eliminates the need for NAT and ensures that each device is assigned a unique public address.
* **Simplified Header:** The IPv6 header has less space than IPv4 and is processed more efficiently by routers.
* **Automatic Configuration (SLAAC):** Allows devices to create an IP address on their own without the need for a DHCP server.
* **Built-in Security:** IPsec protocol support is part of the IPv6 standard and provides end-to-end security.

#### Transition Mechanisms

Since the transition from IPv4 to IPv6 will not happen overnight, mechanisms that enable the two protocols to work together are required. The most common approach is the Dual Stack architecture. In this method, network devices and operating systems run both IPv4 and IPv6 protocol stacks simultaneously. When an application tries to connect to a destination, it queries the DNS for both IPv4 (A record) and IPv6 (AAAA record) addresses, generally preferring IPv6. While this approach provides a gradual transition, it imposes additional burdens on network administrators, such as managing two separate networks and enforcing security policies.

### 2.4 Dynamic Host Configuration Protocol (DHCP)

Manually assigning IP addresses to devices on the network is both laborious and error-prone, especially in large networks. **DHCP (Dynamic Host Configuration Protocol)** is a client-server protocol that automates this process.

#### DORA Process

When a client connects to the network, it goes through a four-step process to obtain an IP address and other network configuration information (subnet mask, gateway, DNS server). This process is called **DORA**:

1. **Discover:** The client sends a `DHCPDISCOVER` broadcast message to locate a DHCP server on the network.
2. **Offer:** DHCP servers on the network respond to the client with a `DHCPOFFER` unicast message containing an IP address and lease period.
3. **Request:** The client selects one of the incoming offers and sends a `DHCPREQUEST` broadcast message to indicate that it wants this address.
4. **Acknowledge:** The selected server completes the process with a `DHCPACK` unicast message confirming the IP address assignment and other configuration parameters.

#### DHCP Security and Snooping

DHCP is not an inherently secure protocol. By installing a rogue (**Rogue**) DHCP server on the network, an attacker can provide false gateway or DNS information to clients and thus perform a “man-in-the-middle” attack by passing traffic through them. The most effective measure against this threat is **DHCP Snooping**. This feature is enabled on network switches and monitors DHCP messages. The switch divides its ports into **trusted** and **untrusted**. Trusted ports are ports connected to legitimate DHCP servers. Server messages such as `DHCPOFFER` and `DHCPACK` from untrusted ports are blocked, allowing only authorized servers to distribute IP addresses.

---

### Chapter 3: Routing Protocols and the Internet Backbone

Routing is the process of determining the path that data packets will follow between networks to reach the destination device from the source device. This process is managed either by static routes defined manually by the network administrator, or by protocols where routers communicate with each other and dynamically learn the best routes. This chapter examines these two basic approaches, Interior Gateway Protocols (IGP) used in enterprise networks and Border Gateway Protocol (BGP), which forms the global backbone of the Internet.

### 3.1 Routing Fundamentals: Static and Dynamic Approaches

![](https://cdn-images-1.medium.com/max/800/0*8Q5DoM_nd0PtJKLk.png)

Static and Dynamic Approaches

**Static Routing:** In this method, the network administrator manually enters routes into each router's routing table. These routes remain fixed until changed by the administrator. It is a simple, secure and resource-efficient solution for small networks whose topology does not change. Because no protocol traffic occurs between routers and which routes will be used is fully controlled. However, as the network grows or a connection breaks, it becomes impossible to manage as all routes must be manually updated and the network has low tolerance to faults.

* **Dynamic Routing:** In this approach, routers share topology information with each other using special routing protocols and automatically calculate the best routes. When there is a change in the network (for example, a new router is added or a link is lost), the protocols detect this change and quickly update the routing tables, redirecting traffic to alternative paths. This provides scalability and high availability across large networks. Its disadvantages are that it consumes more CPU and memory on routers and is more complex to configure.

### 3.2 Interior Gateway Protocols (IGP)

IGPs are used to manage routing within a single autonomous system (AS), that is, a single administrative area (usually a company or service provider network). They are divided into two main categories: Distance-Vector and Link-State.

* **RIP (Routing Information Protocol):** It is one of the oldest Distance-Vector protocols. It simply uses hop count** as its metric, i.e. it counts the number of routers that must be passed to reach the destination. This simplicity causes it to ignore important factors such as bandwidth or latency. Its use has been almost completely abandoned in modern networks due to its 15-hop maximum limit and slow convergence time.
* **OSPF (Open Shortest Path First):** It is the most widely used Link-State protocol. In OSPF, each router creates a topological map of the entire network (Link-State Database (LSDB)) and calculates the best paths to destinations by running **Dijkstra's shortest path priority (SPF)** algorithm on this map. It uses **cost** as the metric, which is generally inversely proportional to the bandwidth of the connection. It is highly scalable in large networks thanks to its **area** structure that allows for a hierarchical design.
* **EIGRP (Enhanced Interior Gateway Routing Protocol):** Developed by Cisco, this protocol is considered a “hybrid” or “enhanced distance-vector” protocol that combines the best features of both Distance-Vector and Link-State protocols. Thanks to **DUAL (Diffusing Update Algorithm)**, it provides very fast convergence by instantly activating pre-calculated backup paths when the primary path crashes. It uses a **composite metric** that includes multiple parameters such as bandwidth, latency, load, and reliability as metrics, allowing it to make smarter path choices.

![](https://cdn-images-1.medium.com/max/800/0*KO7-ySH9na-aDkyD.png)

Gateway Protocols

### 3.3 Border Gateway Protocol — BGP

BGP is the protocol that forms the basis of the internet. Unlike an IGP, it is an **Outside Gateway Protocol (EGP)** that is used to exchange routing information not within a single network but among the tens of thousands of independent **Autonomous Systems (AS)** that make up the Internet. Each AS is identified by a unique **ASN (Autonomous System Number)**.

BGP is essentially a **policy enforcement** protocol rather than a technical protocol. While IGPs focus on finding the *fastest* or *most efficient* path within a network, BGP focuses on finding the *preferred* path between ASs, and this is generally determined based on business, economic and policy agreements rather than technical metrics. For example, a service provider may choose to send its traffic over a slower but cheaper network it has an agreement with, rather than going through a competing company's network, even if it is faster.

**Path Vector Protocol and Path Attributes:** BGP is a "Path Vector" protocol that carries the full list of ASes (the 'AS-PATH' attribute) passed to reach a destination. This is the basic anti-loop mechanism of BGP; If a router sees its own ASN in a route update, it rejects that route. BGP's route selection is based on a set of **route attributes**. These attributes define the characteristics of the route and are used to enforce policy. The main qualities are:

* **AS\_PATH:** List of ASs passed. The shortest one is preferred. A path can be made less attractive by deliberately lengthening it (`AS-Path Prepending`).
* **NEXT\_HOP:** The IP address of the next router to reach the route.
* **LOCAL\_PREF:** Determines which exit point an AS prefers for its outgoing traffic. A higher value is preferred.
* **MED (Multi-Exit Discriminator):** It is used to affect incoming traffic from a neighboring AS. A lower value is preferred.
* **COMMUNITY:** Used to group routes by labeling them and apply collective policies to these groups.

**Route Reflector (RR):** There is a “split-horizon” rule between BGP routers (iBGP) within an AS that prevents the route learned from one neighbor from being forwarded to other neighbors. This rule requires each router to fully mesh with every other router, creating an unmanageable situation in large networks. **Route Reflector** solves this problem. Certain routers are configured as “client” and all clients establish neighborhood with RR only. RR eliminates the need for full-meshing by “mirroring” the route it learns from one client to all other clients.

### 3.4 BGP Security

Security was not a priority in the original design of BGP. This has led to serious security threats such as **BGP Route Hijacking**. Route hijacking is when an AS illegally absorbs internet traffic by adopting an IP prefix that does not belong to it. This could lead to data theft, service outages, or widespread fraud.

The most effective modern solution against this threat is the **RPKI (Resource Public Key Infrastructure)** system. RPKI is an infrastructure that cryptographically verifies which ASN an IP prefix can be legally advertised by. Regional Internet Registries (RIRs) allow IP address owners to create **Route Resource Authorizations (ROA)**. An ROA is a digitally signed object that binds together a specific IP prefix, the ASN authorized to announce that prefix, and the maximum prefix length. On networks that support RPKI, BGP routers check an incoming route announcement against this ROA database (**Route Source Verification (ROV)**). If the announcement is invalid (for example, made by the wrong ASN), the route is rejected and hijacking is prevented. The proliferation of RPKI has significantly reduced the impact of hijacking attacks targeting major platforms such as YouTube and Twitter.

---

### Chapter 4: Switching Technologies and Local Area Network (LAN) Management

Local Area Networks (LAN) are the basic building blocks of modern networks. In this section, Layer 2 switching technologies that enable LANs to operate efficiently and securely, VLANs that logically divide networks into sections, and Spanning Tree Protocol that prevents loops in redundant connections are discussed.

### 4.1 Layer 2 Switching and Address Resolution

Layer 2 switches operate at the Data Link layer of the OSI model and provide efficient communication in LANs by transmitting frames according to MAC addresses.

**MAC Address Table (CAM Table):** The intelligence of a key lies in its **MAC address table**. This table records which MAC address of the switch is connected to which port. The switch dynamically creates this table:

* **Learning:** When the switch receives a frame from one of its ports, it examines the **source MAC address** of the frame. If this MAC address is not in the table, it adds the MAC address and the port number it came from as a new entry in the table. If the address already exists in the table, it resets the aging timer of that entry. This time delay is usually 300 seconds (5 minutes), and if no new frame arrives from that address within this period, the entry is deleted from the table.

**Frame Forwarding Logic:** To forward a frame, the switch looks up the **destination MAC address** in its table and makes three possible decisions:

1. **Forwarding:** If the destination MAC address is found in the table, the switch sends the frame only to the port where that MAC address is registered. This avoids unnecessary traffic.
2. **Flooding:** If the target MAC address is not found in the table (if it is an unknown unicast), the switch copies the frame to **all other ports** except the port from which it came. This process is called “flooding”. When the target device responds, the switch learns its MAC address and will not flood it next time.
3. **Broadcasting:** If a broadcast frame with the target MAC address `FF:FF:FF:FF:FF:FF` arrives, the switch sends this frame to all ports except the port it came from.

**Address Resolution Protocol (ARP):** Devices often want to communicate with each other via IP addresses, but MAC addresses are required for actual data transmission on the local network. **ARP (Address Resolution Protocol)** bridges these Layer 3 (IP) and Layer 2 (MAC) addresses. When a device (A) knows the IP address but not the MAC address of another device (B) on the same network, it initiates the following process:

1. Device A asks, “What is the MAC address of the device that has this IP address?” It sends an **ARP Request** message to the network as a broadcast.
2. All devices on the network receive this request, but only device B whose IP address matches responds.
3. Device B unicasts an **ARP Reply** message containing its MAC address directly to device A.
4. Device A saves this information in its **ARP cache** and uses it for future communications.

### 4.2 Virtual Local Area Networks (VLAN) Management

**VLAN (Virtual LAN)** is the technology of dividing a single physical switch into virtual partitions so that they act logically as multiple independent switches. Devices on different VLANs cannot communicate with each other without a router in between. The main benefits of VLANs are:

* **Security:** Isolates different departments (for example, Accounting and Engineering) or user groups (for example, guests and employees) from each other.
* **Performance:** Each VLAN creates its own broadcast domain. This limits broadcast traffic and reduces congestion across the network.
* **Flexibility:** Devices can be grouped into logical networks regardless of their physical location.
* **Trunking and 802.1Q Standard:** **trunk** ports are used to carry the traffic of more than one VLAN between switches over a single physical connection. The protocol that standardizes this process is **IEEE 802.1Q**. 802.1Q adds a 4-byte tag to the Ethernet header as a frame passes through the trunk port. This tag contains a VLAN ID that indicates which VLAN the frame belongs to. The other switch reads this tag and directs the frame to the correct VLAN. **Native VLAN** is the VLAN to which traffic transmitted untagged through a trunk port belongs.

**VLAN Hopping Attacks and Precautions:** Attackers can use various techniques to bypass the isolation provided by VLANs. The two most common types of attacks are:

1. **Switch Spoofing:** The attacker configures his device to act as a switch and attempts to trick the switch's port into automatically switching to trunk mode. This is usually done by taking advantage of **DTP (Dynamic Trunking Protocol)**, which is enabled by default. When the port switches to trunk mode, an attacker can listen to traffic from all VLANs.
2. **Double Tagging:** In this attack, the attacker adds two 802.1Q tags to his frame. The outer tag carries the ID of the Native VLAN where the attacker is located, and the inner tag carries the ID of the target VLAN. The first switch sees the frame as untagged because it is in the Native VLAN, removes the outer tag and forwards it to the trunk line. The second switch now only sees the inner tag and mistakenly forwards the frame to the target VLAN.

The basic precautions to be taken against these attacks are: disabling DTP on user ports (`switchport nonegotiate`), manually setting all access ports to access mode, assigning Native VLAN to an unused ID and closing all unused ports.

### 4.3 Loop Prevention Mechanisms

Connect redundantly between switches to ensure high availability in networks. Establishing references is a common practice. However, at Layer 2, loops can cause broadcast storms and instability of the MAC address table, rendering the network completely inoperable. **Spanning Tree Protocol (STP)** and its advanced versions are designed to prevent these loops. The evolution of these protocols reflects the effort to improve the fundamental balance between redundancy and efficiency in network design.

**Spanning Tree Protocol (STP - IEEE 802.1D):** The original STP creates a loop-free logical topology between all switches in the network. It does this by selecting a Root Bridge and leaving each switch's single lowest-cost path to the Root Bridge active, **blocking** all other redundant paths. This effectively prevents loops but has two major drawbacks:

1. **Slow Convergence:** When there is a change in the network topology (for example, an active link is broken), it may take 30 to 50 seconds for a blocked port to return to a transmitting state. This is unacceptable downtime for modern applications.
2. **Inefficiency:** Since all VLANs share a single Spanning Tree instance, a redundant link remains completely idle. A high bandwidth link is not used at all as long as the primary link is working.

**Rapid Spanning Tree Protocol (RSTP - IEEE 802.1w):** RSTP was developed to solve the slow convergence problem of STP. It reduces convergence time to seconds by simplifying port states (a single **Discarding** state instead of Blocking, Listening, Disabled) and adding new port roles (such as **Alternate Port**, which takes over immediately when the primary root port goes down). RSTP is backwards compatible with STP but does not solve the problem of bandwidth inefficiency as it still creates a single tree for all VLANs.

**Multiple Spanning Tree Protocol (MSTP - IEEE 802.1s):** MSTP both maintains the speed of RSTP and solves the inefficiency problem of STP/RSTP. MSTP groups VLANs into logical **instances** and runs a separate Spanning Tree for each instance. This allows VLAN-based load balancing. For example, while a link may be active (forwarding) for VLAN 10-20 group, the same link may be blocked (discarding) for VLAN 30-40 group. In this way, all redundant connections are actively used for some traffic, bandwidth waste is prevented and network resources are used in the most efficient way.

![](https://cdn-images-1.medium.com/max/800/0*iZqupuFz_XXG4e9n.png)

Loop Prevention

This evolutionary path summarizes the fundamental goal of network engineering: to ensure basic security (loop prevention), then add speed (fast convergence), and finally introduce intelligence and efficiency (load balancing).

---

### Result

This white paper comprehensively covers the protocols, addressing schemes, and management mechanisms that form the basis of modern computer networks. The analysis clearly reveals the evolution of network technologies from simple and rigid models to today's complex, flexible and policy-oriented systems.

* **Models and Data Flow:** A comparison of the OSI and TCP/IP models has demonstrated the difference between theoretical idealism and engineering pragmatism. TCP/IP's pragmatic approach to working protocols has made it the de facto standard of the internet. The data encapsulation process stands out as not only a packaging technique, but also a basic abstraction mechanism that ensures modularity and protocol independence of networks.
* **Addressing and Routing:** The introduction of CIDR was a revolutionary step that saved the IPv4-based internet from the crisis of both address scarcity and routing table explosion. This is a powerful example of how technology is not only advancing, but also adapting to become self-sustainable. Examination of BGP has shown that routing on the internet backbone is not a purely technical optimization, but a “policy enforcement” mechanism that reflects business and policy relationships. The rise of RPKI in BGP security signals a growing trend towards cryptographic authentication to protect the underlying infrastructure of the internet.
* **LAN Management:** The evolution of switching and loop prevention technologies demonstrates the constant balance between durability and efficiency. The move from the coarse blocking logic of STP to the intelligent load balancing capabilities of MSTP allows for more efficient use of network resources. It represents a constant search for maturity. Similarly, VLAN technology and countermeasures against attacks such as VLAN hopping highlight how network segmentation is critical to security and performance, but that this security requires constant attention and correct configuration.

Ultimately, these technologies are deeply interconnected. A Layer 2 switch learning its MAC address depends on ARP resolving an IP address; For a router to forward a packet requires it to know both the destination IP address and the best path to that destination; and the operation of this entire system on a global scale relies on BGP's complex policy-based decisions. This complex and layered structure creates a flexible, scalable and constantly evolving infrastructure that forms the basis of the modern digital world.