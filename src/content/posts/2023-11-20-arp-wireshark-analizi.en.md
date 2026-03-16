---
title: "ARP Wireshark Analysis"
date: 2023-11-20
draft: false
---

---

### ARP Wireshark Analysis

![](/images/1_ao4qe1GrmozJwGfFHn-v_Q.png)

Hello, in this article, I will try to explain the Address Resolution Protocol (ARP) protocol and its analysis with Wireshark.

---

### How Does ARP Work?

ARP is used to associate a hardware address (physical address, MAC address) with an IP address on the local network and to test for duplicate IPv4 addresses. No matter how simple ARP is, it can be the protocol that signals problems with network addressing or configurations. ARP is defined in RFC 826, Ethernet Address Resolution Protocol, and is not used in IPv6 communications.

![](/images/1_H46AliIQi_SWSWD9GTZ5nw.png)

ARP Protocol

**ARP protocol can only be used on the local network (internal network)!**Therefore, to analyze ARP conversations, you must be connected to the local network where the traffic flows.

![](/images/1_3BrM69K5ZUI6UjmzxvaKVg.png)

Provides address resolution between ARP, MAC and IP address layers

ARP packets are unique compared to most traffic on a TCP network because they do not contain an IP header (it is not a protocol operating at the Internet layer). This feature means that ARP packets are packets that cannot be routed (since it is a data-link layer protocol).

---

#### ARP Requests/Responses Analysis

Normal ARP communications consist of a simple request and a simple response. A host sends an ARP broadcast containing the destination IP address (but no destination MAC address — ARP is used for MAC address resolution).

![](/images/1_JePuyNi_ro4-wNE9_kryWg.png)

ARP request

In the figure, a host with a MAC address of 00:23:54:69:8f:58 and an IP address of 24.6.170.101 is looking for the MAC address for 24.6.168.1. In broadcast broadcasts, the MAC address is 00:00:00:00:00:00 as shown in the figure. This is because switches forward packets according to the destination MAC address in unicast traffic. MAC address with 0 represents broadcast transmission.

![](/images/1_vJW2quVT-FBv0mVUtbl9kA.png)

ARP Response

The response packet shown in the figure now contains the sender IP address 24.6.168.1 and the MAC address of this device. The sender and destination addresses are associated with the current packet sender in ARP requests and responses. So the response returns as unicast.

---

### Analysis of ARP Problems

Missed ARP requests are used to determine whether another host on the network has the same IP address as the sender. It sends ARP requests to all hosts regardless of whether their IP addresses are statically or dynamically assigned. If there is no response, it is determined that this IP address is not used on the network and is empty. Wireshark can identify missed ARP packets.

![](/images/1_mxbRrUNWgTfuMhM4jnlsmA.png)

ARP Announcement

In the figure, a host checks whether another device on the network is using the IP address 24.6.170.101.

If you are examining ARP traffic but seeing no response to ARP broadcasts   
(a) may not be connected to a location where you can see unicast replies — or   
(b) The ARP broadcast is a missed ARP and no response indicates an IP address conflict.

#### Misconfigurations

Network addressing issues can also cause ARP problems.

![](/images/1_eC8hFeOTJBcj4tZwmb9S5A.png)

An ARP issue caused by a misconfigured host subnet value

In the figure, Client A is configured with the wrong subnet mask. When Client A goes through the resolution process to determine whether the target Server A at address 10.2.99.99 is local or remote, Client A determines that the server is local. Client A believes the server is on the 10.0.0.0/8 network. Client A believes that the server is also located on the 10.0.0.0/8 network. This is because Client A's subnet mask is set to 255.0.0.0.

#### Proxy ARP

Routers that support proxy ARP (defined in RFC 1027, Using ARP to Implement Transparent Subnet Gateways) can respond on behalf of devices on other networks. There are numerous disadvantages to using proxy ARP, including an increase in overall ARP traffic.

#### ARP Poisoning

ARP poisoning traffic also appears uniquely on Wireshark.

![](/images/1_YzDmMwMEJw2ovJ6ArWXWaQ.png)

Harp Poisoning

In the figure, Wireshark has detected that duplicate addresses are being used. A host at address 00:d0:59:aa:af:80 has both 19We can see that it is sending arp responses to both 2.168.1.103 and 192.168.1.1. This is the first phase of an ARP-based MITM(Man-in-the-Middle) attack.

---

### ARP Packet Structure

There are two basic ARP packets: ARP request packet and ARP response packet. Both packages use the same format. The most confusing part of ARP is the interpretation of sender and destination address information. When an ARP broadcast is sent from a host, the sending host puts the hardware and IP addresses in the sender address fields.

The target protocol address field contains the IP address of the called device. The target hardware address field is set to all 0s to indicate that the information is unknown. In an ARP response, the destination and sender information are reversed to indicate that the ARP responder is now the sender. The original station that placed the call is now the target.

#### Hardware Type

This identifies the type of hardware or data connection used. Hardware type 1 is assigned to Ethernet and defines a hardware address length of 6 bytes. The complete Hardware Type field value list is available at [www.iana.org](http://www.iana.org).

#### Protocol Type

This field defines the protocol address type used. This field uses standard protocol ID values ​​that are also used in Ethernet II frame structures. These protocol types are defined at [www.iana.org/assignments/protocol-numbers](http://www.iana.org/assignments/protocol-numbers).

#### Length of Hardware Address

This field defines the length (in bytes) of the hardware addresses used in this packet.

#### Length of Protocol Address

This field defines the length (in bytes) of the protocol (network) addresses used in this packet.

#### Opcode

The opcode identifies whether the packet is a request or response packet and the type of address resolution that occurs.

Listed below are the ARP and RARP (reverse ARP) opcodes:

* Opcode 1: ARP request
* Opcode 2: ARP reply
* Opcode 3: RARP request
* Opcode 4: RARP reply

A process that allows a device to learn its network address from a MAC address. RARP is defined in RFC 903, A Reverse Address Resolution Protocol. We do not see RARP being used except in very old network environments where RARP was used as an early address assignment protocol.

#### Sender's Hardware Address

This field shows the hardware address of the device sending this request or response.

#### Sender's Protocol Address

This field shows the protocol (network) address of the device sending this request or response.

#### Target Hardware Address

This field indicates the desired target hardware address, if known. In ARP requests this field is usually filled with all 0's. In ARP responses, this field contains the hardware address of the device sending the ARP request.

#### Target Protocol Address

This field indicates the destination protocol (network) address requested in a request. The response includes the address of the device that issued the request.

---

### Filtering ARP Traffic

For ARP traffic, the capture filter and display filter are simply *arp*. Additional ARP display filters are listed below:

* arp.opcode==0x0001 — ARP request
* arp.opcode==0x0002 — ARP reply
* arp.src.hw\_mac==00:13:46:cc:a3:ea — ARP source physical address 00:13:46:cc:a3:ea (request or response)
* (arp.src.hw\_mac==00:21:97:40:74:d2) && (arp.opcode==0x0001) — ARP request with source physical address 00:21:97:40:74:d2
* (arp.src.hw\_mac==00:d0:59:aa:af:80) && !(arp.src.proto\_ipv4==192.168.1.1)  
  In the ARP packet, a host at the address 00:d0:59:aa:af:80 sends ARP reply packets (arp poisoning) to external IP addresses from its own IP address (192.168.1.1).
* (arp.opcode==0x0002) && !(arp.src.proto\_ipv4==192.168.0.1/16) — ARP packet (ARP proxy response)-proxy ARP where the resolved IP address is for the remote device.

---

### References

* Wireshark Network Analysis, Second Edition, Laura Chappell, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>