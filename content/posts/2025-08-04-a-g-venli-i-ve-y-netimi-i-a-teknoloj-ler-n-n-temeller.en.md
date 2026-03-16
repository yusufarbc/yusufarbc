---
title: "Network Security and Management I: BASICS OF NETWORK TECHNOLOGIES"
date: 2025-08-04
draft: false
---

---

### Network Security and Management I: BASICS OF NETWORK TECHNOLOGIES

![](https://cdn-images-1.medium.com/max/800/1*QsixbjAc424hJKBe9MKq-g.png)

### Introduction

Computer networks, which form the basis of the modern information society, are complex and dynamic systems that enable instantaneous sharing of data on a global scale. These systems have ceased to be passive infrastructures that only provide connections, and have turned into dynamic, programmable and strategic assets that shape business processes, the global economy and modern society. The first part of this report aims to establish a solid theoretical foundation before moving on to more complex management and security issues by introducing the universal principles, standards, and physical components that govern network communications.

This chapter establishes a solid theoretical basis for the entire report by introducing the universal principles, standards and physical components that govern network communications.

---

### Main Topic 1: Network Architectures and Communication Models

This main topic examines the abstract and concrete structure of networks. It addresses how networks are organized, from geographic scale to physical layout, from standardized communication models to modern data center designs.

#### Subheading 1.1: Classification of Networks: According to Coverage Area (PAN, LAN, MAN, WAN)

Computer networks are basically divided into four main categories according to the geographical area they cover. This classification provides a basic framework for understanding the scale, purpose, and technology of a network. This distinction is more than just a measure of distance, it is a reflection of the expansion of computing needs from the personal to the global. This classification can also be seen as a map of technological evolution, as each scale requires a different set of technological challenges and solutions.

* **PAN (Personal Area Network):** It has the narrowest geographic coverage area among network types and generally covers an area of a few meters around a single individual. Its main purpose is to enable personal electronic devices such as smartphones, wireless headphones and smart watches to communicate directly with each other. These networks are built on technologies such as Bluetooth, which focus on low power consumption and simple pairing. The rise of PANs is a direct result of the proliferation of wearable technologies and Internet of Things (IoT) devices.
* **LAN (Local Area Network):** These are networks established in a limited physical area such as a single building, office, school or home. LANs are designed for intensive operations that require high bandwidth and low latency and often use wired Ethernet or wireless Wi-Fi technologies for this purpose.
* **MAN (Metropolitan Area Network):** Covers a medium-sized geographic area, such as a city or a large campus, often connecting multiple LANs together. For example, it can be used to connect different buildings of a company in a city or different campuses of a university.
* **WAN (Wide Area Network):** It is the type of network with the widest geographical coverage area, including connections between countries or continents. The Internet is the best-known and largest example of a WAN. WANs connect geographically dispersed LANs and MANs, enabling global communications with technologies that address challenges such as reliability and long-distance connectivity.

#### Subheading 1.2: Network Topologies: Physical and Logical Locations

Network topology describes the physical or logical arrangement of devices (nodes) in a network and the connections between them. Topology selection directly affects the cost, performance, reliability and scalability of the network.

**1.2.1. Traditional Topologies (Bus, Star, Ring, Tree)**

* **Bus (Common Bus):** In this topology, all devices are connected to a single main cable called the “backbone”. It is an economical option as it is easy to install and requires less cable than other topologies. However, a single fault in the backbone cable disables the entire network and fault detection is difficult.
* **Star:** It is the most widely used topology in modern LANs. All devices are connected via separate cables to a central port, usually a switch or hub. A failure in one cable or device usually affects only that device and the rest of the network continues to operate. This high reliability and ease of management have made it the standard.
* **Ring:** Devices in a circular path are interconnected and data travels around the ring, usually in a single direction. The failure of one device or cable in the ring can bring the entire network to a halt.
* **Tree:** It has a hierarchical structure and generally provides scalability by connecting multiple star topologies through a backbone. A failure at the root or backbone of the tree can affect a large portion of the network.

**1.2.2. Modern Topologies (Mesh, Hybrid)**

* **Mesh:** In this topology, there are multiple connection paths between devices. This structure provides extremely high fault tolerance and reliability as it provides alternative paths even if a connection is lost. However, it is complex and costly to install as it requires a lot of wiring. For this reason, it is generally preferred in WAN connections and critical infrastructures.
* **Hybrid (Mixed):** It is formed by combining two or more different topologies. It provides flexibility and scalability by combining the advantages of different topologies.

In the history of network engineering, operational reliability and ease of management generally appear to outweigh lower initial cost. Among the traditional topologies, Bus was the most economical option because it required the least amount of cables. However, it had operational disadvantages such as a single cable failure could collapse the entire network and fault detection is difficult. On the other hand, Star topology, which has a higher initial cost because it requires more cables and a central device, has become the overwhelming standard of modern LANs due to the fact that a failure affects only a single device and fault detection is easy. This shows that the business value brought by the uninterrupted operation of the network is much more important than the initial cable cost.

#### Subheading 1.3: Reference Models: OSI and TCP/IP Comparison

A standardized framework was needed so that hardware and software developed by different manufacturers could work together seamlessly. In response to this need, reference models have been developed that divide network communication into smaller, manageable and standardized functional layers. These layered architectures both guarantee interoperability between different systems and facilitate the detection and solution of network problems by making them systematic.

**1.3.1. OSI Reference Model: Detailed Analysis of the Seven Layers**

Developed by the International Organization for Standardization (ISO), the Open Systems Interconnection (OSI) model is a theoretical and conceptual framework that divides network communications into seven abstract layers. Each layer is responsible for specific and well-defined functions:

* **Layer 7: Application:** It is the layer closest to the end user. It includes protocols and services such as HTTP, FTP, SMTP that provide access to network resources.
* **Layer 6: Presentation:** It is responsible for converting the data into a format understandable by the receiving system. It manages operations such as data encryption, compression and character encoding.
* **Layer 5: Session:** Enables the establishment, management and termination of communication sessions between two devices.
* **Layer 4: Transport:** Manages end-to-end data transmission. It ensures reliable or unreliable transmission of data through protocols such as TCP and UDP, and performs flow control and error control.
* **Layer 3: Network:** It is responsible for delivering data packets between different networks to the destination via the most appropriate route. Logical addressing (IP addressing) and routing occur in this layer.
* **Layer 2: Data Link:** Provides error-free data transfer between devices on the same physical network. It uses MAC addresses, known as physical addressing, and converts data into frames.
* **Layer 1: Physical:** It is responsible for transferring data as bit sequences to the physical medium (cable, fiber optic, radio waves). It converts data into electrical signals, pulses of light, or radio waves.

**1.3.2. TCP/IP Protocol Suite: Four-Layer Practical Structure**

Unlike the OSI model, the TCP/IP model is a protocol that emerged during the development of the Internet and is widely used in practice, rather than a theoretical framework. It offers a simpler and more flexible structure with fewer layers.

* **Application Layer:** Combines the functions of the Application, Presentation and Session layers of the OSI model.
* **Transport Layer:** It has exactly the same functions as the Transport layer in OSI (TCP, UDP).
* **Internet Layer:** Corresponds to the Network layer in OSI (IP, ICMP).
* **Network Interface Layer:** Combines the Data Link and Physical layers in OSI.

**1.3.3. Data Encapsulation Process: Journey of PDUs (Segment, Packet, Frame)**

Data starts from an application on the sending device and moves down the layered architecture until it reaches the network cable. In this process, each layer adds a header containing its own control information to the data it receives from the upper layer. This process is called encapsulation. At each layer, the name the data receives, that is, Protocol Data Unit (PDU), changes:

1. **Transport Layer:** Data is divided into segments and a TCP or UDP header is added to each segment. The PDU at this stage is called a **Segment** (or Datagram for UDP).
2. **Internet/Network Layer:** An IP header is added to each segment, containing the source and destination IP addresses. The PDU at this stage is called **Packet**.
3. **Network Interface/Data Link Layer:** A frame header containing the source and destination MAC addresses and a terminator (FCS) for error control are added to each packet. The PDU at this stage is called **Frame**.
4. **Physical Layer:** The frame is converted into a bit sequence to be transmitted to the physical medium.

In the receiving device, the de-encapsulation process, which is the opposite of this process, takes place.

Moreover, these layered models and the encapsulation process have directly shaped the design philosophy of modern networking hardware. The “division of labor” dictated by the models has allowed network devices to specialize in processing headers of specific layers.1 For example, a Layer 2 switch makes the transmission decision by simply reading the Layer 2 MAC address header of an incoming frame; It does not need to understand the IP address inside the packet. This specialization allows it to do this extremely quickly using Application Specific Integrated Circuits (ASICs).1 In contrast, a Layer 3 router focuses on making more complex routing decisions between different networks by examining the Layer 3 IP header of the packet.1 In this way, each device can perform its specific task in the most efficient way, laying the foundation for modular, scalable and high-performance networks.

![](https://cdn-images-1.medium.com/max/800/1*FDaZNME-1NddEaSU4DPFhA.png)

OSI Reference Model

#### Subheading 1.4: Modern Data Center Architecture: Transitioning from 3-Tier to Spine-Leaf

Data center network designs have evolved significantly in response to the demands of the applications running on them. The main driving force behind this change is a fundamental shift in traffic flow patterns within the data center.1

**1.4.1. Traditional Three-Tier Architecture (Core, Distribution, Access)**

The three-layer architecture, which has been the standard of data center networks for years, has a hierarchical structure. These layers; **Access Layer**, where servers connect to the network, **Distribution/Aggregation Layer**, which collects traffic from the access layer, and **Core Layer**, which forms the backbone of the network. This architecture is primarily optimized for “North-South” traffic flow between users outside the data center and servers within the data center.1

**1.4.2. East-West Traffic and the Impact of Virtualization**

The rise of server virtualization and microservices architectures has required multiple virtual machines (VMs) running on a single physical server to communicate extensively with each other. This has caused a dramatic increase in “East-West” traffic from server to server within the data center, making this traffic pattern dominant.1 The traditional three-tier architecture is inefficient for this new traffic pattern. A packet going from one server to another may have to travel from the access layer to the distribution layer to the kernel and then back down again. This increases latency and creates bottlenecks in the network. Additionally, the Spanning Tree Protocol (STP), which this architecture uses to prevent network loops, blocks redundant paths, causing half of the available bandwidth to become unusable, further exacerbating the problem.1

**1.4.3. Spine-Leaf Architecture and Advantages (Low Latency, Scalability, ECMP)**

Spine-Leaf architecture was developed as a direct response to these challenges posed by East-West traffic. This modern architecture replaces the three-layer hierarchy with a two-layer fabric structure: the **Leaf** layer to which the servers connect, and the **Spine** layer that forms the core of the network.1 Its basic principle is that each leaf switch is connected to each spine switch in the spine layer.1 The main advantages of this design are:

* **Low and Predictable Latency:** The path between any two servers always consists of the same number of hops (Leaf -> Spine -> Leaf), making latency low and consistent.
* **High Bandwidth and ECMP:** There is no need for STP since it is not a circular topology. Instead, using routing protocols such as **Equal-Cost Multipath — ECMP**, traffic is forwarded by load balancing across all available paths, maximizing bandwidth usage.
* **High Scalability:** A new spine switch can be easily added to the spine layer to increase network capacity or a new leaf switch to the leaf layer to increase the number of ports. This “scale-out” approach does not require redesigning the network.

This architectural change is the clearest example of how an evolution in application architecture (virtualization) necessitates a revolution in network architecture (Spine-Leaf). Networks are now designed specifically to not only provide connectivity but also to meet the performance and scalability requirements of the applications running on them.

---

### Main Topic 2: Basic Network Devices and Technologies

This main topic examines the concrete hardware and technologies that bring theoretical models and architectures to life. It focuses on the physical and practical aspects of the network, from the devices that transmit, route and secure data packets to the wired and wireless technologies that carry that data.

#### Subheading 2.1: Active Network Devices and the Layers on which they Operate

A modern network infrastructure consists of a variety of active devices, each of which performs a specific role within the context of the OSI model.

**2.1.1. Switch: Layer 2 Functions and MAC Address Table**

A switch is a device that operates at the Data Link Layer, Layer 2 of the OSI model, and connects devices within the same local area network (LAN). Unlike hubs, it provides intelligent transmission. It learns the MAC address, which is the physical address of each device connected to it, and stores this information in a MAC address table (also known as the CAM table). When a data frame is sent from one device to another, the switch reads the destination MAC address and forwards the frame only to the corresponding destination port. In this way, unnecessary traffic is prevented and network efficiency increases.

**2.1.2. Router: Layer 3 Functions and Routing Tables**

A router operates at the Network Layer, Layer 3 of the OSI model. Its main task is to connect different networks (for example, an office LAN to the internet or different IP subnets). It routes packets based on IP addresses, not MAC addresses. It uses a statically or dynamically created routing table to determine the best path for a packet to reach its destination.

**2.1.3. Comparative Analysis: Layer 3 Switch and Router Differences**

As networks grow and VLANs become more common, there is a need to communicate between different VLANs. Because sending this task to a router can make the router a performance bottleneck, Layer 3 switches with both switching and routing capabilities have been developed.1 While both devices can perform Layer 3 routing, there are key differences in hardware design and primary use cases:

* **Layer 3 Switch:** Performs routing at “wire-speed” using hardware-based, high-speed ASICs. This makes it ideal for performing high-performance routing between different VLANs (inter-VLAN routing), especially in large enterprise networks or data centers.
* **Router:** Makes routing decisions with software-based engines, which are generally more flexible. This flexibilitygiving it the ability to offer richer features such as Network Address Translation (NAT), Virtual Private Network (VPN) termination, enhanced Quality of Service (QoS) and complex WAN interfaces. It is generally used at the edge of the network to connect the LAN to the WAN.

This distinction reflects a fundamental dilemma in the evolution of network devices: hardware-based operations represent speed, while software-based operations represent flexibility and feature richness. Therefore, a Layer 3 switch is not a perfect replacement for a router; There are different tasks for which each is optimized.

**2.1.4. Access Point: The Gateway to Wireless Networks**

An access point (AP) is a device that converts a wired Ethernet network (IEEE 802.3) into a wireless network (WLAN — IEEE 802.11). Essentially, it acts as a bridge at the Layer 2 level to provide wireless access to a wired network.1

**2.1.5. Firewall: Protector of the Network Perimeter**

A firewall is a network security device that creates a barrier between a secure internal network and an untrusted external network (usually the internet). It inspects and filters incoming and outgoing traffic according to predefined security rules. While traditional firewalls typically operate at layers 3 and 4 of the OSI model, Next Generation Firewalls (NGFW) can control down to the application layer (Layer 7).1

#### Subheading 2.2: Wired Technologies: The Evolution of Ethernet

Ethernet is a technology defined by the IEEE 802.3 standard that has been the undisputed standard of local area networks (LAN) for decades. The evolution of this technology has gone hand in hand with advances in both speed standards and innovations in the types of physical media (cabling) that support these speeds.1

**2.2.1. Speed Standards (10 Mbps to 100 Gbps)**

The speed of Ethernet has increased exponentially over the years. This progress is a testament to how abstract protocols depend on concrete physical constraints, and how progress in one field sparks innovation in another.

* **Ethernet (10 Mbps):** The original standard is known as 10Base-T and operates over Category 3 (CAT3) UTP cables.1
* **Fast Ethernet (100 Mbps):** The 100Base-TX standard has reached speeds of 100 Mbps with the widespread use of Category 5 (CAT5) and CAT5e cables that support higher frequencies.
* **Gigabit Ethernet (1 Gbps):** The 1000Base-T standard offers 1Gbps speed by using all four pairs of CAT5e and Category 6 (CAT6) cabling infrastructure simultaneously.
* **10 Gigabit Ethernet and Beyond:** The 10GBase-T standard requires Category 6A (CAT6A) or higher quality cabling, which further reduces interference such as crosstalk. In data centers and service provider infrastructures, higher speeds such as 40 Gbps and 100 Gbps are generally provided via fiber optic cabling.

**2.2.2. Cable Types (UTP/STP, Fiber Optic) and Categories (CAT5e, CAT6/6A)**

* **Twisted Pair:** It is the most commonly used cable type. It consists of four pairs of wires twisted around each other to reduce external electromagnetic interference. **UTP (Unshielded Twisted Pair)** is the most common type, while **STP (Shielded Twisted Pair)** is used in noisier environments with an additional layer of metal shielding. Categories such as **CAT5e, CAT6, CAT6A** indicate the maximum frequency and therefore data rate that the cable supports.1
* **Fiber Optic Cables:** They transmit data through light signals instead of electrical signals. In this way, they are not affected by electromagnetic interference and can carry data at much higher speeds and over longer distances without loss of signal. Due to these features, they are especially preferred in data centers, campus backbones and WAN connections.1

#### Subheading 2.3: Wireless Technologies: Wi-Fi and Mobile Networks

Modern communication is unthinkable without wireless technologies that enable mobility and flexibility. The latest developments in this field offer innovations that not only increase speed but also radically change efficiency and capacity.1

**2.3.1. Evolution of IEEE 802.11 Standards (Wi-Fi 4, 5, 6/6E)**

Wi-Fi technology is defined by the IEEE 802.11 family of standards. Over the years these standards have evolved to offer faster speeds and better efficiency:

* **802.11n (Wi-Fi 4):** Introduces MIMO (Multiple Input, Multiple Output) technology and uses both 2.4 GHz and 5 GHz bands, theoretically increasing the speed up to 600 Mbps.1
* **802.11ac (Wi-Fi 5):** Operates mainly on the less crowded 5 GHz band and uses MU-MIMO (Multi-User MIMO) to deliver gigabit-level speeds.
* **802.11ax (Wi-Fi 6/6E):** It is specifically designed for dense device environments and its main focus is on improving efficiency.

![](https://cdn-images-1.medium.com/max/800/1*nyc2HGIS-z2d_X8Wuq1lMg.png)

Wi-Fi Standards

**2.3.2. Innovations Brought by Wi-Fi 6/6E (OFDMA, MU-MIMO, TWT, 6 GHz Band)**

The evolution of Wi-Fi 6 represents a fundamental shift in strategy in how technology standards respond to market and application demands. While previous standards focused on peak speed, Wi-Fi 6 focuses on the congestion issue presented by the explosion of smartphones and IoT devices. This means “how fast?” From the question “How many devices can I serve efficiently at the same time?” transition to the question.

* **OFDMA (Orthogonal Frequency Division Multiple Access):** It is the most revolutionary innovation of Wi-Fi 6. Unlike previous standards, it splits a Wi-Fi channel into smaller sub-channels called Resource Units (RU) and uses these sub-channels to send data to multiple devices simultaneously. This reduces latency and greatly increases efficiency, especially in environments with large numbers of IoT devices sending small data packets.
* **MU-MIMO (Multi-User MIMO):** Allows an access point (AP) to send (and with Wi-Fi 6 receive) data streams to multiple devices simultaneously, increasing overall network capacity.
* **TWT (Target Wake Time):** It is a power saving mechanism designed for battery-powered mobile and IoT devices. The AP tells each device when it needs to “wake up” to send or receive data, significantly extending the battery life of devices.
* **Wi-Fi 6E and 6 GHz Band:** Wi-Fi 6E brings all these features of Wi-Fi 6 to the newly opened 6 GHz frequency band. Unlike the traditional 2.4 GHz and 5 GHz bands, this “green field” spectrum offers less interference and multiple wide channels needed for high speeds. This is ideal for applications that require high bandwidth, such as 8K video streaming and virtual reality.

**2.3.3. 5G Technology: Core Capabilities (eMBB, URLLC, mMTC) and Industrial Applications**

5G is the fifth generation mobile communications technology and is a platform that offers revolutionary improvements over 4G (LTE). Wi-Fi 6E and 5G are not competing technologies, but complementary technologies. While Wi-Fi 6E operates in unlicensed spectrum, making it ideal for high-density, low-cost LAN deployments indoors; 5G operates on licensed spectrum, delivering broad geographic coverage, high-speed mobility, and ultra-reliability, making it indispensable for outdoors, WAN connections, and critical industrial applications.1 The core capabilities of 5G revolve around three main use cases:

1. **eMBB (Enhanced Mobile Broadband):** Offers much higher data speeds (theoretically up to 10 Gbps) and increased capacity.
2. **URLLC (Ultra-Reliable and Low-Latency Communications — Ultra-Reliable and Low-Latency Communications):** Reduces latency to millisecond levels (up to 1 ms) and provides extremely high reliability. This feature is vital for tasks such as autonomous vehicles, remote surgery, and real-time control of robots in factories.
3. **mMTC (Massive Machine-Type Communications)** Enables the Internet of Things (IoT) to reach its full potential by allowing millions of devices (sensors, smart meters, etc.) per square kilometer to be connected to the network.

These capabilities make 5G a transformative technology for Industry 4.0. Applications such as flexible production lines in smart factories, AR-supported remote maintenance, autonomous logistics and smart agriculture directly benefit from the low latency and high reliability features of 5G.