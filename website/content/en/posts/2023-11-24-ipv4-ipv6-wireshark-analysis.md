---
date: '2023-11-24'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*qSAbdDrUrlN_SQ9p_AXpFQ.png
series:
- Network Analysis with Wireshark
title: IPv4/IPv6 Wireshark Analysis
type: posts
---

![](https://cdn-images-1.medium.com/max/800/1*qSAbdDrUrlN_SQ9p_AXpFQ.png)

Hello, in this article, I will try to explain the IPv4 and IPv6 protocols and their analysis with Wireshark.

---

### What is IP?

IP (v4/v6 — collectively referred to as “IP”) provides delivery services for networked systems as well as fragmentation and reassembly for low MTU (Maximum Transmission Unit) networks. IP also offers quality of service determination to ensure that certain traffic is prioritized over other traffic.

IP is connectionless and unreliable, providing optimal delivery of datagrams between IP hosts. IP itself provides no way to determine whether a packet has reached its destination. An application that needs guaranteed delivery should use TCP over IP.

![](https://cdn-images-1.medium.com/max/800/1*T7ew3u6ttBWwa5NsNgjR3g.png)

Provides delivery services for IP, UDP and TCP based applications and ICMP

The IPv4 header is typically 20 bytes long, but contains a field that can extend the IP header length (in 4-byte increments).

---

### IPv4 Analysis

IPv4 is covered in RFC 791. Normal IPv4 communication moves packets from one location to another using the most efficient packet size.

As IPv4 packets are forwarded by routers, the destination IP address is examined to make routing decisions, the MTU size is checked against the MTU size of the next connection (to determine whether fragmentation is required and allowed), the MAC header is removed and a new one is applied for the next network, and the time-to-live (TL) value in the IP header is reduced. The IP header is also checked for routing prioritization.

If all goes well in an IPv4 communication, traffic should flow to and from IP addresses. The IPv4 address in the header should not change unless a NAT/PAT device intercepts traffic and changes the address.

If a packet is too large to be forwarded to the next link in the path, the router examines the IP header fragmentation setting. If the Don't Fragment bit is set, the packet cannot be transmitted. The router must send an ICMP Type 3, Code 4 message (Destination Unreachable/Fragmentation Required, but Fragmentation Bit Set) to the originator of the packet, identifying the MTU limitation. The sender must retransmit the packet in a smaller packet size. If fragmentation is allowed, the router must split the single large packet into two (or more) smaller packets, define the fragment offset, and indicate that the packets are fragments and forward them.

![](https://cdn-images-1.medium.com/max/800/1*Gmy9Pgg9xp9UlBITMfwglg.png)

IP can fragment packets when a connection's MTU does not support the datagram size

In the figure, a 1500 byte MTU packet from Client A to Server A cannot travel along the path. The limitation is in the connection between Router B and Router C. Router B must split the packet into fragments (if allowed) and forward the fragments or send the ICMP Type 3, Code 4 message back to Client A.

Fragmentation is not desirable in a network because it reduces the efficiency of data flow. However, it may be inevitable. To identify possible MTU problems in wirehsark;  
Statistics | Examine Packet Lengths or apply a filter for ICMP Type 3/Code 4 packets (icmp.type==3 && icmp.code==4).

IPv4 problems are often related to fragmentation, unusual IP addresses, and excessive broadcasts. A few examples are given below.

* Fragmentation problems can occur when ICMP Type 3, Code 4 packets are blocked, preventing a host from learning why its packets did not reach the destination. ICMP Type 3, Code 4 packet is used for black hole detection.

![](https://cdn-images-1.medium.com/max/800/1*fLWJpNDw-l0U1eNT73tlaQ.png)

Source IP address 127.0.0.1 is suspicious

* Unusual IP addresses may be duplicate addresses or addresses that are not allowed on the network, such as the address shown in the Figure. The IP source address cannot be a loopback address (127.0.0.0/8), a multicast address, or a broadcast address.
* Excessive broadcasts flowing across a network can be easily detected by connecting Wireshark to a switch.

The figure shows a packet that should never be on the network — the source is the loopback address 127.0.0.1.

---

### IPv6 Analysis

IPv6 is a layer 3 routed protocol only.

![](https://cdn-images-1.medium.com/max/800/1*WltOTqu_1iZzyc0O4u5zgg.png)

IPv6 Header

The figure shows an IPv6 headeris. Notice that the Ethernet header Type field is 0x86dd, which indicates that an IPv6 header is in order.

RFC 2460, Internet Protocol, Version 6 (IPv6) Specification, defines the IPv6 header specification. IPv6 addressing is covered in RFC 4291, IP Version 6 Addressing Architecture. For details on how IPv6 hosts discover other local targets, see RFC 4861, Neighbor Discovery for IP version 6 (IPv6).

This short section on IPv6 is just intended to give you a look at the most common IPv6 traffic you'll see on dual-stack hosts.

There are three different types of addresses in IPv6 communications:

* Unicast — single interface address
* Multicast—set of interfaces
* Anycast — the closest of a group of interfaces

There is no broadcast address in IPv6 - multicasts are used instead of network broadcasts.

IPv6 addresses are sixteen bytes long (128 bits) and are written as x:x:x:x:x:x:x; where x represents one to four hexadecimal digits. You can omit leading zeros in a single field to shorten the notation.

![](https://cdn-images-1.medium.com/max/800/1*aLNQlmlSWWQnFYKi0MA9rw.png)

Multicast broadcasts start with ff02

RFC 4291 provides the following example for IPv6 addresses:

* Address 2001:0DB8:0:0:8:800:200C:417A (a unicast address)  
  Shortened Version 2001:DB8::8:800:200C:417A
* Address FF01:0:0:0:0:0:0:101 (a multicast address)  
  Shortened Version FF01::101
* Address 0:0:0:0:0:0:0:1 (a loopback address)  
  Shortened Version ::1
* Address 0:0:0:0:0:0:0:0 (unspecified address)  
  Shortened Version ::

:: can be used only once in an address and represents one or more groups of 16-bit zeros. :: can also be used to represent leading or trailing zeros in an address. Wireshark uses the shortened version of IPv6 addresses as shown in the figure above.

Classless Inter-Domain Routing (CIDR) notation is used when representing IPv6 network prefixes. For example, 2001:DB8:0:CD30::/64 represents the 2001:DB8:0000:CD30:: network.

Unicast addresses start with 2xxx. Multicast addresses start with FFxx. Link-Local Unicast addresses start with FE80.

Link-Local addresses are used for addressing on a single link and are not routed. IPv6 uses Link-Local addresses for automatic address configuration and neighbor discovery.

The first packet seen in the figure above is an ICMPv6 Request — this protocol replaces ARP. When the source address is ::, the purpose of the packet is Duplicate Address Detection (DAD).

![](https://cdn-images-1.medium.com/max/800/1*b6BPriW0o2QQNIce_G74JA.png)

Managed Address Configuration and Other Configuration bits define how a DHCPv6 client receives an IPv6 address and other parameters

An IPv6 host can obtain an address using one of several methods defined by the Router Advertisement packet sent to the IPv6 host during the startup process. We noted two bits in the figure:

* Managed Address Configuration (M) bit
* Other Configuration (O) bit.

DHCPv6 client address and other parameters will be configured according to the setting of these two bits. An IPv6 client can obtain an address in three different ways by referencing the M and O bits in the ICMPv6 Router packet:

* Stateless Address AutoConfiguration (SLAAC)
* stateful DHCPv6
* stateless DHCPv6

#### 6to4 Tunneling(IPv6 Tunneled Within IPv4)

As part of the transition to IPv6, existing TCP/IP hosts support dual stacks and IPv6 tunneling capability within IPv4. These packets can be routed to the destination IPv6 host over an IPv4 network. There are three different encapsulation methods - 6to4, Teredo and ISATAP.

![](https://cdn-images-1.medium.com/max/800/1*wfLk0ygZStuJ43NRGFg65Q.png)

Protocol value 41 indicates an IPv6 header comes later

RFC 3056, Connecting IPv6 Domains over IPv4 Clouds, defines 6to4 tunneling. When Wireshark detects that an IPv6 header follows an IPv4 header, it adds two notes to the packet:

* Source 6to4 Gateway IPv4 (ipv6.src\_6to4\_gw\_ipv4)
* Source 6to4 SLA ID (ipv6.src\_6to4\_sla\_id)

The first 2 bytes of the source address will be 0x2002. The 6to4 Gateway address is the IPv4 address of the encapsulating host (either a client that embeds the IPv6 header or a router that embeds the IPv6 header). In Figure 209, the source IPv6 address contains 0x1806addc, which translates to 24.6.173.220 (the IPv4 address of the host). The resource 6to4 SLA Identifier (Site Level Aggregation Identifier) ​​is used to identify a subnet.

#### Teredo

Teredo, oneIt is another tunneling method that encapsulates the IPv6 header within a UDP packet. This technology was developed to help bypass Network Address Translation (NAT) devices that do not handle Protocol 41. Teredo is covered in RFC 4380, IPv6 Tunneling over UDP via Network Address Translations (NATs).

![](https://cdn-images-1.medium.com/max/800/1*W8wVMRwalacSMFyhQtSyfQ.png)

Teredo tunnels IPv6 inside a UDP packet

The figure shows a packet going from a Teredo client to a Teredo server. Wireshark uses Teredo port udp-3544 and provides Teredo IPv6 over UDP tunneling dissector.

Here we can see three Wireshark notations:

* Source Teredo Server IPv4 (ipv6.src\_ts\_ipv4)
* Source Teredo Port (ipv6.src\_tc\_port)
* Source Teredo Client IPv4 (ipv6.src\_tc\_ipv4)

#### Intra-Site Automated Tunnel Addressing Protocol (ISATAP)

Both 6to4 and ISATAP encapsulate IPv6 within IPv4, but the packet is sent differently over an IPv4 network. Wireshark can detect that ISATAP is in use (just like Teredo detects that it is in use).

Unlike 6to4 tunneling, ISATAP uses a locally assigned IPv4 address (public or private) to generate a 64-bit interface identifier. For example, in ISATAP the IPv4 address 24.6.173.220 would be::0:5EFE:1806:addc. In a 6to4 tunnel configuration, the same IPv4 address would be 2002:1806:addc::/48, as seen in Figure 210.

ISATAP requires ISATAP routers to configure an intrasite tunnel for IPv6 traffic and is covered in informational RFC 5214.

---

### IPv4 Packet Structure

In this section, header fields and their functions are explained in detail. You can see RFC 791 for more details on each field.

![](https://cdn-images-1.medium.com/max/800/1*GJHqitNsY8XKz2li3lXVDQ.png)

IPv4 Header

The figure shows a standard IPv4 header with acceptable IPv4 addressing.

#### Version Field

The first field in the IP header is the version field. The figure shows a fully extended IPv4 header. In this section we will start with IPv4 and then examine IPv6.

#### Header Length Field

This field is also called the Internet Header Length field or IHL(Internet Header Length). This field simply specifies the length of the IP header. This field is required because IP supports different header lengths. This field value is provided in multiples of 4 bytes. For example, the actual decimal code for this field will be 5. Wireshark multiplies this value by 4 bytes to get the actual IP header length value of 20 bytes. In the figure, the IPv4 header is 20 bytes long. No different header length is used in this IP header.

#### Differentiated Services Field and Explicit Congestion Notification

The six-bit Differentiated Services Domain (DiffServ) is used to prioritize traffic and provide a certain level of Quality of Service (QoS).

The field contains a Differentiated Services Code Point (DSCP) value that is used to determine how the packet will be processed (per-hop behavior).

#### Assured Forwarding and Expedited Forwarding Per-Hop Behavior

RFC 2597, Assured Forwarding The PHB Group defines Assured Forwarding as a means for a DiffServ provider to offer different levels of forwarding assurances for IP packets it receives from a DiffServ customer.

RFC 2598, an Accelerated Routing PHB, defines that Accelerated Routing "can be used to create a low-loss, low-latency, low-jitter, guaranteed bandwidth, end-to-end service via DS (DiffServ) domains. Such a service appears as a point-to-point connection or 'virtual leased line' to endpoints. This service is also described as a Premium service."

The two-bit Explicit Congestion Notification (ECN) field is used by the sender and/or routers along the path to identify network congestion along the path.

#### Total Length Field

This field defines the length of the IP header and valid data (this does not include any data connection padding).  
In the example shown in the figure, the total length field value is 1500 bytes. The first 20 bytes of this are the IP header — this indicates that the remaining packet length (not including any data link padding) is 1480 bytes.

#### Identification Field

Each IP packet is given a unique ID value when sent. If the packet needs to be fragmented to fit on a network that supports a smaller packet size, these fragments will be the same.The same identification number will be placed on each piece to identify it as part of the original package.

#### Flags Field

The flags field is actually three bits long and has the following bit value assignments:

* Bit 0: Set to reserved-0.
* Bit 1: Shred Bit (0=can shred; 1=does not shred)
* Bit 2: More Track Bit (0=last track; 1=more to come)

An application (application layer protocols) can be written in a way that does not allow fragmentation. If so, the application will set the Don't Fragment bit to 1. If fragmentation is allowed and a packet must be fragmented to traverse a network that supports a smaller packet, the MTU will set the Fragmentation bit to 0. When the packet is split into multiple fragments -three For example, the More Fragments to Come bit will be set to 1 on the first and second fragments. The More Fragments bit of the last fragment is set to 0, indicating that it is the last fragment in the set. All fragments will use the same IP ID value. Fragmentation and recombination occur at the extreme.

#### Fragment Offset Field

If the packet is a fragment, this field indicates where the data for this packet will be placed when the fragments are combined back into a single packet (on the target host). This field provides the offset in 8-byte values. For example, the first fragment might have an offset of 0 and contain 1400 bytes of data (not including any headers). The offset value of the second piece will be 175 (175 x 8 = 1400). This field is used only if the packet is a fragment, otherwise it is set to 0.

![](https://cdn-images-1.medium.com/max/800/1*6Y7PXca_YiF7g2nbehV6oA.png)

Wireshark viewing IP fragments

#### Time to Live Field

This field shows the remaining lifetime of the packet (in seconds and number of hops through routers).

Typical initial TTL values ​​are 32, 60, 64 and 128. Default TTL values ​​are included in the vendor's TCP/IP stack. Applications (such as traceroute) can override these default values ​​as desired. Each time a packet is transmitted by the router, the router must decrement the TTL field by 1. If the router needs to keep the packet in its queue for a long time (more than one second), it should reduce this TTL value by the number of seconds the packet is held in the queue and reduce the TTL for the hop.

If a packet to be forwarded reaches a router with TTL=1, the router must discard the packet because it cannot reduce the TTL to 0 and cannot forward the packet. The router can indicate to the sender that the packet was not delivered due to the Time to Live value by generating an ICMP Type 11, Code 0 response (Time Exceeded, Time to Live Exceeded in Transit).

If a packet with TTL=1 reaches a host, what should the host do? Of course it processes the package. Hosts do not need to lower the TTL value after receiving or forwarding packets.

Because low TTL values ​​are sometimes considered unusual, Wireshark has a coloring rule called *TTL low* or *unexpected* that helps identify these packets in a trace file. Coloring rule syntax (!ip.dst==224.0.0.0/4 && ip.ttl < 5 && !pim) || (ip.dst==224.0.0.0/24 && ip.ttl != 1).

When a packet is fragmented, all fragments are given the same TTL value. If they take different paths through a network, they may reach the destination with different TTL values. But when the first fragment reaches the destination, the destination host starts counting down in seconds from the TTL value of this packet. All pieces must arrive before this timer expires, otherwise the set of pieces is considered 'incomplete' and unusable. The destination sends an ICMP Type 11, Code 1 response (Time Exceeded, Fragment Reassembly Time Exceeded) to the source to indicate that the packet has expired during the reassembly process. This prompts the client to retransmit the original unfragmented packet.

#### Protocol Field

All headings have a field that describes what the next step is. For example, in a TCP/IP packet, the Ethernet II header has a Type field indicating that the next step is IP. There is a Protocol field in the IP header that indicates what the next step is. The more common values in the protocol field are listed below:

* Protocol 1: ICMP
* Protocol 2: IGMP
* Protocol 6: TCP
* Protocol 8: EGP
* Protocol 9: Any private internal gateway such as Cisco's IGRP
* Protocol 17: UDP
* Protocol 45: IDRP
* Protocol 88: Cisco EIGRP
* Protocol 89: OSPF

ProtocolTo obtain the most current list of l field values, visit [www.iana.org/assignments/protocol-numbers](http://www.iana.org/assignments/protocol-numbers).

#### Header Checksum Field

The IP header Checksum field only provides error detection for the content of the IP header; This field does not include the content of the packet other than the IP header. This checksum does not include the checksum field itself in the calculation.

#### IPv4 Source Address Field

This is the IP address of the device sending the packet. In some cases, such as the DHCP boot process, the client may not know the IP address, so it may use 0.0.0.0 in this field. This field cannot contain a multicast or broadcast address or a loopback address.

#### IPv4 Destination Address Field

This field can contain unicast, multicast, broadcast address. This address identifies the final destination of the packet.

#### Options Field

The IP header can be extended with a number of options (although these options are not used frequently). If the header is extended with options, those options must end in a 4-byte boundary because the Internet Header Length (IHL) field defines the header length with 4-byte boundaries.

The list below shows only a partial set of options. For the complete list, see [www.iana.org](http://www.iana.org).

* Option 0: Option List End (Defines when IP options end)
* Option 3: Loose Source Route (provides some route information)
* Option 4: Time Stamp (Time stamp along the path)
* Option 7: Record Route (marks passing routers along a route)
* Option 9: Strict Source Route (provide custom route information)

#### IPv4 Broadcast/Multicast Traffic

There are two basic types of broadcast/multicast on the network: calls and announcements. An example of a search would be the discovery broadcast that a DHCP client sends when it is turned on and needs to find a DHCP server. Another example of a call broadcast is the ARP MAC-IP address resolution broadcast.

* General Broadcast: 255.255.255.255
* Subnet Broadcast: 10.2.255.255
* Multicast: 224.x.x.x — 239.x.x.x

An example of an announcement is OSPF advertising multicast. These packets are unsolicited announcements about known link state routing entries.

Concerns about broadcasts and multicasts taking up valuable bandwidth on today's high-capacity network connections may be overemphasized. Another concern is the processing power these packets require on the transmitting or receiving devices. If a switch or router is overloaded and appears to be dropping packets or queuing for long periods of time, consider examining the broadcast/multicast ratio on the network.

---

### IPv6 Packet Structure

Let's look inside an IPv6 header to define the purpose of each field. Some domains are very similar to IPv4 domains.

#### Version Field

This four-bit field is set to 0110 (decimal 6).

#### Traffic Class Fields (DiffServ, ECT and ECN-CE)

Look closely at the figure. Notice how some areas overlap; The 8-bit Traffic Class field consists of the Differentiated Services (DiffServ) field, the ECN-Enabled Transport field, and the ECN-CE field.

The 6-bit DiffServ field provides the same functionality as the DiffServ fields in the IPv4 header. This field is used to prioritize traffic and provide a certain level of Quality of Service (QoS). The field contains a Differentiated Services Code Point (DSCP) value used to determine how the packet will be handled (perhop behavior).

The ECN Enabled Transport (ECT) bit is set by a sender to indicate that ECN is supported.

The ECN-CE (Congestion Experienced) bit is set by a router detecting impending congestion. The ECT bit must be set for the router to use the ECN-CE bit.

#### Flow Label Field

A “flow” is a sequence of packets traveling from a source to a destination, labeled as a cluster. An IPv6 stream is identified by the 20-bit Stream Label field and the source and destination IPv6 address fields. A Flow Label field value of zero indicates that the packet is not part of any flow. The Flow Label field value is not changed along the path. For more information about using the Stream Label field, see RFC 3697, IPv6 Stream Label Specification.

#### Payload Length Field

This field defines the length of the IPv6 payload (bytes that follow the IPv6 header but do not include the packet padding). IPv6 extension headers are considered part of the payload.

#### Next Header Field

This field tells you what to do next in the package.It shows u (just like the IPv4 Protocol field). For a complete list of valid protocol numbers, see [www.iana.org/assignments/protocol-numbers/protocol-numbers.xml](http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xml). An IPv6 packet can have multiple Extension Headers followed by the IPv6 header.

The following table lists the IPv6 Extension Headers and their Next Header field values. These are listed in order of recommended use.

* **Next Header Field Value 0**: Hop-by-Hop Options
* **Next Header Field Value 60**: Destination Options (With Routing Options)
* **Next Header Field Value 43**: Routing Header
* **Next Header Field Value 44**: Fragment Header
* **Next Header Field Value 51**: Authentication Header
* **Next Header Field Value 50**: Encapsulation Security Payload Header
* **Next Header Field Value 60:** Destination Options
* **Next Header Field Value 135:** Mobility Header
* **Next Header Field Value 59:** No next header

#### Hop Limit Field

This field is reduced by 1 for each device transmitting the packet. When the value reaches 1, the packet is not forwarded.

#### Source IPv6 Address Field

128-bit IPv6 source address. For details on IPv6 addressing, see RFC 4291, IP Version 6 Addressing Architecture

#### Destination IPv6 Address Field

128-bit IPv6 destination address.

---

### Filtering IPv4 Traffic

For IPv4 traffic, capture and display filter are simply *ip*.

* ip.src==192.168.1.1 — IPv4 packets containing 192.168.1.1 in the source IP address field
* ip.dst==192.168.1.103 — IPv4 packets containing 192.168.1.103 in the destination IP address field
* ip.addr==192.168.1.103 — IPv4 packets containing 192.168.1.103 in the source or destination IP address fields
* !ip.addr==192.168.1.103 — Packets that do not contain 192.168.1.103 in the source or destination IP address fields
* ip.hdr\_len > 20 — Optional IPv4 header (header length greater than 20 bytes)
* (ip.flags.mf==1) || !(ip.frag\_offset==0) && ip — Fragmented packet — Looks for more fragment bits and non-zero values ​​in the IP fragment offset field. Added “&& ip” to deal with all non-IP protocols including ARP. Test on ip-fragments.pcapng.
* ip.ttl < 10 — IP Time to Live(TTL) values less than 10

---

### Filtering IPv6 Traffic

The capture filter for IPv6 is simply ip6. To capture traffic from a single host, use host[IPv6 address] — for example, host fe80::708d:fe83:4114:a512.

To apply a capture filter for traffic from a specific IPv6 subnet, use the following syntax:  
ip6 net [network]::/[net bits],

For example, *ip6 net fe00::/8* captures all IPv6 packets to or from addresses starting with 0xfe. The display filter for all IPv6 traffic is ipv6. The following table shows many other IPv6 display filters.

* ipv6.nxt==0x06 — IPv6 packets preceded by a TCP header
* 6to4 packets encapsulated by ipv6.src\_6to4\_gw\_ipv4==24.6.173.220–24.6.173.220
* ipv6.hlim < 10 — IPv6 packet with Hop Limit field value less than 10
* ipv6.src==2002:1806:addc::1806:addc — IPv6 packets from a specific address
* ipv6.src >= fe80:: && ipv6.src <= fec0 — IPv6 packets from various networks

---

### References

* Wireshark Network Analysis, Second Edition, Laura Chappell, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>