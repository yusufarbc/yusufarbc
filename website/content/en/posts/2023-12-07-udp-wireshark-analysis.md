---
date: '2023-12-07'
draft: false
title: UDP Wireshark Analysis
---

---

### UDP Wireshark Analysis

![](https://cdn-images-1.medium.com/max/800/1*cReiU6D1Aj-Zf-J3628uNA.png)

Hello, in this article I will try to explain the UDP protocol and its analysis with Wireshark.

---

### What is UDP?

If you see a lot of broadcast/multicast broadcasts in the traffic you capture, it means you have too many UDP-based communications. UDP provides transfer without establishing a connection. Broadcast and multicast traffic flows over UDP. In the UDP header, port fields identify the application using the transport. Because UDP uses a simple 8-byte header consisting of four fields, UDP itself rarely causes problems. UDP is defined in RFC 768, User Datagram Protocol.

![](https://cdn-images-1.medium.com/max/800/1*WSaFhaEgqTIuM9sF4oZYng.png)

Provides UDP connectionless transport service

Common applications that use UDP are DHCP/BOOTP, SIP, RTP, DNS, TFTP and various video streaming applications.

---

### UDP Traffic Analysis

Normal UDP communications, such as DHCP Discover packets, are sent with the destination port number of the requested service. The figure shows the UDP header in a DHCP packet. DHCP uses UDP as the transport protocol. DHCP communications use port 68 as the client port number and port 67 as the server port number.

![](https://cdn-images-1.medium.com/max/800/1*Z2tNaovhf93xqYVPROVNww.png)

A UDP-based DHCP initialization sequence

Most applications use a default port number for the client side of communication. For example, a DNS query is typically sent to port 53. Source port is a temporary port number.

There are very few problems that occur directly with UDP. One possible problem is traffic blocked based on the UDP port number value. It shows the results of capturing UDP traffic on a network consisting of a firewall that does not forward traffic sent to certain port numbers. In this case, the firewall blocks traffic to ports 161 (SNMP) and 5060 (SIP). Instead of responding with ICMP Destination Unreachable/Port Unreachable (Type 3/Code 3) packets, the firewall silently discards the packets. Your PCAP file only shows UDP traffic; no response is seen.

![](https://cdn-images-1.medium.com/max/800/1*W8kjuMS7QjymLfAcp5qPfg.png)

There is no response to SNMP deficiencies, it is caused by a firewall that filters ports

UDP scans are evident when you see the sorting of UDP packets and ICMP responses using Wireshark's default coloring rules. Again, if a firewall is blocking traffic by port filtering, you may not see ICMP responses.

![](https://cdn-images-1.medium.com/max/800/1*mLgL_SfU5rNO7Gk-mkT1sQ.png)

UDP scanning triggers a series of ICMP Destination Unreachable/Port Unreachable responses

The figure shows a UDP scan targeting the address 192.168.1.123. Because each UDP packet triggers an ICMP Destination Unreachable/Port Unreachable response, the UDP scan has not yet found an open UDP port.

---

### UDP Packet Structure

The UDP header is defined by the value 17 (0x11) in the IP header Protocol field.

The UDP header contains only four fields and is always 8 bytes long.

#### Source Port Field

The source port field has the same purpose in TCP and UDP — to open a listening port for response packets and, in some cases, to identify the application or protocol sending the packet.

![](https://cdn-images-1.medium.com/max/800/1*PCIysV4QPzkJ6NaUaJcx3g.png)

#### Destination Port Field

This field value identifies the target application or process for the package. In some cases, source and destination port numbers are the same for client and server processes. In other cases, you may find a separate and unique number for client and server operations (as in the DHCP example). Another variation is to allow the client to use temporary port numbers for its own side of the communication and a well-known port number for the server side of the communication.

#### Length Field

The Length field defines the length of the packet from the UDP header to the end of the valid data. This is a redundant field and is really quite unnecessary in the entire communication process. Consider the following three length fields and their interpretations:

* IP Header Length = 5 (denoted in 4 byte increments)
* The IP header is 20 bytes long.
* IP Total Length Field = 329 bytes
* The data after the IP header is 309 bytes — remember that 20 bytes is the IP header.
* UDP Length Field = 309

The data after the IP header (including the UDP header) is 309 bytes. ThisWe found it from the Total Length Field in the IP header. When you remove the 8-byte UDP header, you see that there are 301 bytes of data.

#### Checksum Field

The checksum is performed on a pseudo-header derived from the contents of the UDP header, the data, and the IP header. The so-called IP header consists of the source address field, the destination address field, the protocol field and the UDP length field. UDP-based communications don't always require a checksum — sometimes you'll see this field set to all zeros (0x0000), which tells the recipient that the checksum should not be verified.

---

#### UDP Traffic Filters

The capture filter syntax for UDP traffic is simply udp. The display filter syntax is simply udp. Additional UDP display filters are listed below.

* udp.srcport==161 — SNMP response (based on port 161)
* udp.dstport==137 — NetBIOS Name Service (based on port 137)
* udp.length > 248 — UDP packets containing more than 240 data bytes (8 bytes are reserved for the UDP header)

UDP is relatively boring compared to the exciting, complex world of TCP.

---

### References

* Wireshark Network Analysis, Second Edition, Laura Chappell, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>