---
date: '2023-12-06'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*qw1Nso3IaiA7Jptb-0T1qQ.png
series:
- Network Analysis with Wireshark
title: ICMPv4/ICMPv6 Wireshark Analysis
type: posts
---

![](https://cdn-images-1.medium.com/max/800/1*qw1Nso3IaiA7Jptb-0T1qQ.png)

Hello, in this article I will try to explain the ICMPv4 and ICMPv6 protocols and their analysis with Wireshark.

---

### What is ICMP?

ICMP is used as a messaging system for errors, alerts, and general notifications on an IP network. There are many types of ICMP messages, including:

* **Echo Message:** Used by ping and traceroute to test end-to-end connectivity. Too many of these could indicate a reconnaissance operation or possibly a Denial of Service attack.
* **Redirect Message:** Used by routers to notify the source that there is a better path to a destination. If this packet is not sent by a router, it should be considered suspicious.
* **Destination Unreachable messages:** Used to tell the source host that its packets could not be delivered for some reason — the reason is specified in the Destination Unreachable message. A large number of these response packets may indicate a failed UDP port scan is in progress or a service is not functioning properly.

By examining ICMP traffic on your network over several hours or days, you can determine how efficiently the network is designed and detect numerous configuration errors, functional issues, or security breaches. ICMPv4 is defined in RFC 792.

![](https://cdn-images-1.medium.com/max/800/1*LHTLnK4dnNwCs20ZDNBf8g.png)

ICMP provides messaging services on IP networks

RFC 4443 defines the purpose and functionality of ICMPv6. ICMPv6 packet structure is the same as ICMPv4 packet structure.

---

### ICMP Traffic Analysis

ICMP traffic is difficult to define because it is specific to each network. While some network personnel use ping for connection tests, some companies restrict ICMP Echo Requests/Responses. We can define the ICMP traffic from these ping tests and the ICMP traffic from traceroute tests as “normal ICMP traffic”. ICMP based pings use ICMP Type 8 for echo Requests and ICMP Type 0 for echo replies.

![](https://cdn-images-1.medium.com/max/800/1*4qv9iLVW9NDKL4GxWnpXKw.png)

ICMP Echo Request

![](https://cdn-images-1.medium.com/max/800/1*gdUehz7murFdf2ZsU48Cmw.png)

ICMP Echo Reply

The figures show ICMPv4 echo request and echo reply packets.

![](https://cdn-images-1.medium.com/max/800/1*2A2yFLq4vs7G70TfEM0oHw.png)

ICMPv6

The figure shows an ICMPv6 echo request packet. The packets in this trace are 6to4 packets.

There are three flavors of Traceroute – ICMP based, TCP based and UDP based. ICMP based traceroute uses ICMP echo Requests and changes the Time to Live (TTL) value in the IP header. When packets reach routers along the path, the incoming TTL value is examined. If the incoming TTL value is 1, the router responds with an ICMP Time Exceeded/Time to Live Exceeded in Transit (Type 11, Code 0) (unless this response is disabled on the router). This allows you to find the IP address of the router.

There are three flavors of Traceroute – ICMP based, TCP based and UDP based. ICMP based traceroute uses ICMP echo Requests and changes the Time to Live (TTL) value in the IP header. When packets reach routers along the path, the incoming TTL value is examined. If the incoming TTL value is 1, the router responds with an ICMP Time Exceeded/Time to Live Exceeded in Transit (Type 11, Code 0) (unless this response is disabled on the router). This allows you to find the IP address of the router.

![](https://cdn-images-1.medium.com/max/800/1*bJcu5LI83HlJKEJlBK6QUQ.png)

ICMP Ping Request — no response

![](https://cdn-images-1.medium.com/max/800/1*EPaLsDeBtWdcmSiyOLbZbw.png)

ICMP Time-to-live-exceed

The figures show typical striping that Wireshark displays when default coloring is enabled during a traceroute operation.

#### ICMPv4 Problems

A common ICMP problem is a no-response echo test, indicating no connection to a destination. To determine the point at which ICMP traffic drops, you need to move the Wireshark system along the path until it reaches the point where packet loss occurs.

However, ICMP itself can help detect many other network issues and security issues. For example, if a DNS query returns Destination Unreachable/Port Unreachable (Type 3/Code 3), either the client is sending DNS queries to the wrong destination or name service is not running on the server.It's tiring.

Another example would be excessive redirects.

![](https://cdn-images-1.medium.com/max/800/1*09eyyZQ32tAra5CruF7ajQ.png)

ICMP Redirect

The figure shows an ICMP Redirect packet pointing to another gateway at address 10.2.99.98. This packet is sent when the receiving router determines a better router for the sender. The receiving router creates an ICMP Forwarding (Type 5/Code 1) packet containing the recommended router to use. When received, a host must update its routing table. Redirects should only be sent by routers.

Some ICMP packets, such as ICMP Redirect and ICMP Destination Unreachable packets, contain part of the original packet that triggered the ICMP response. In the figure, the ICMP header is followed by the original IP header of the packet that triggered the ICMP response.

ICMP Destination Unreachable responses to TCP handshake connection requests are unusual because TCP connection requests must elicit either a TCP SYN/ACK or a TCP Reset. The ICMP response to these TCP handshake connection requests is a possible indication that a host's firewall is blocking a port.

---

### ICMPv4 Packet Structure

ICMP packets do not contain a UDP or TCP header - port filtering settings cannot affect ICMP traffic (because it does not use a port). ICMP packets contain only three required fields after the IP header: type, code, and checksum. Some ICMP packets contain additional fields to provide information or details about the message. For example, an ICMP Routing packet must contain the address of the gateway that a host is directed to use. Upon receipt of this packet, a host must add a dynamic route entry to its routing tables and begin using the new routing information immediately.

####Type

The following list defines the types of ICMP messages that can be sent on the network. This list is based on IANA documentation last updated on April 23, 2012. To obtain the most current version of this list, visit [www.iana.org/assignments/icmp-parameters](http://www.iana.org/assignments/icmp-parameters).

* Type 0: Echo Reply [RFC 792]
* Type 1: Unassigned
* Type 2: Unassigned
* Type 3: Destination Unreachable [RFC 792]
* Type 4: Source Quench [RFC 792]
* Type 5: Redirect [RFC 792]
* Type 6: Alternate Host Address
* Type 7: Unassigned
* Type 8: Echo [RFC 792]
* Type 9:Router Advertisement [RFC 1256]
* Type 10:Router Solicitation [RFC 1256]
* Type 11: Time Exceeded [RFC 792]
* Type 12: Parameter Problem [RFC 792]
* Type 13: Timestamp [RFC 792]
* Type 14: Timestamp Reply [RFC 792]
* Type 15: Information Request [RFC 792]
* Type 16: Information Reply [RFC 792]
* Type 17: Address Mask Request [RFC 950]
* Type 18: Address Mask Reply [RFC 950]
* Type 19: Reserved (for Security)
* TypeS 20–29: Reserved (for Robustness Experiment)
* Type 30: Traceroute [RFC 1393]
* Type 31: Datagram Conversion Error [RFC 1475]
* Type 32: Mobile Host Redirect
* Type 33: IPv6 Where-Are-You
* Type 34: IPv6 I-Am-Here
* Type 35: Mobile Registration Request
* Type 36: Mobile Registration Reply
* Type 37: Domain Name Request
* Type 38: Domain Name Reply
* Type 39: SKIP
* Type 40: Photuris
*Types 41–252: Unassigned
* Type 253: RFC3692-style Experiment 1
* Type 254: RFC3692-style Experiment 2

####Code

Many ICMP packet types have several possible Code field values. The following list contains descriptions of the more common code fields.

#### Type 3 Destination Unreachable codes

* Code 0: Network Unreachable — The ICMP sender knows the network but believes it is not currently open — perhaps it is too far away or only reachable via an unknown route.
* Code 1: Host Unreachable — The ICMP sender knows the host but does not receive an ARP response, indicating that the host is currently down.
* Code 2: Protocol Unreachable — The protocol identified in the IP header cannot be processed for some reason — this response is seen in an IP scan.
* Code 3: Port Unreachable — The ICMP sender does not support the port number you are trying to reach — a large number of these packets indicates a configuration issue or possibly a UDP port scan; If these packets are sent in response to a TCP handshake attempt, it indicates that the destination port is probably firewalled.
* Code 4: Fragmentation Required and No Fragmentation Set — The router's packet is on a link that supports a smaller MTU size.It needed to fragment to transmit over , but the application set the Do Not Fragment bit.
* Code 5: Source Route Failed — The ICMP sender cannot use the strict or loose source routing route specified in the original packet.
*Code 6: Destination Network Unknown-The ICMP sender does not have a route entry for the destination network, indicating that the destination network was never an available network.
*Code 7: Destination Host Unknown-There is no host entry indicating that the ICMP sender may not have been on the connected network at all.
* Code 8: Source Host Isolated - The ICMP sender (router) is configured not to forward packets from the source. Most routers do not generate this response code — they generate codes 0 (network unreachable) and 1 (host unreachable) as appropriate.
* Code 9: Communication with Target Network is Administratively Prohibited — The ICMP sender (router) is configured to block access to the intended target network.
* Code 10: Communication with Target Host Administratively Prohibited — The ICMP sender (router) is configured to block access to the requested target host.
* Code 11: Unreachable for Target Network Service Type - the Type of Service (TOS) indicator used by the original sender is not available through this router for that network - note that more current networks may not use TOS or Priority - they may use DiffServ instead.
* Code 12: Destination Host Unreachable for Service Type — the TOS indicator used by the original sender is not available for that host through this router — note that more recent networks may not use TOS or Priority — they may use DiffServ instead.
* Code 13: Communication Administratively Prohibited — The ICMP sender is not currently available for communication; This may be sent by a fine-grained firewall.
* Code 14: Host Priority Violation — the Priority value defined in the sender's original IP header is not allowed (for example, using Flash Override priority) — note that more recent networks may not use TOS or Priority — they may use DiffServ instead.
* Code 15: Priority Interrupt In Effect — The network administrator has set the minimum priority level for service by a router, but a lower priority packet has been received.

#### Type 5 Redirect Codes

* Code 0: Redirect Datagram for Network (or Subnet) — The ICMP sender (router) is not the best way to reach the desired network. The response includes the IP address of the best router to the destination. Dynamically adds a network entry to the original sender's route tables
* Code 1: Redirect Datagram for Host — The ICMP sender (router) is not the best way to reach the desired host. The response includes the IP address of the best router to the destination. Dynamically adds a host entry to the original sender's route tables
* Code 2: Redirect Datagram for Service Type and Network — The ICMP sender (router) does not provide a route to the destination network using the requested TOS. Dynamically adds a network entry to the original sender's route tables — note that more recent networks may not use TOS or Priority — they may use DiffServ instead
* Code 3: Redirect Datagram for Service Type and Host — The ICMP sender (router) does not provide a route to the destination host using the requested TOS. Dynamically adds a host entry to the original sender's route tables — note that more recent networks may not use TOS or Priority — they may use DiffServ instead

#### Type 11 Time Exceeded Codes

* Code 0: Time to Live Exceeded in Transport — The ICMP sender (router) indicates that the sender's packet arrived with a TTL of 1. Routers cannot reduce the TTL value to 0 and send a packet
* Code 1: Fragment Reassembly Time Exceeded — ICMP sender (target host) did not receive all fragments before the TTL value of the first received fragment expired (retention time in seconds).

#### Checksum

The checksum field covers only the ICMP header.

---

### ICMPv6 Packet Structure

ICMP packets do not contain a UDP or TCP header - port filtering settings cannot affect ICMP traffic (because it does not use a port). ICMP packets contain only three required fields after the IP header: type, code, and checksum.

####Type

The following list includes what can be sent on the network.Defines ICMPv6 message types. This list is based on IANA documentation last updated on March 28, 2012. To obtain the most current version of this list, visit [www.iana.org/assignments/icmpv6-parameters](http://www.iana.org/assignments/icmpv6-parameters).

* Type 0 Reserved
* Type 1 Destination Unreachable [RFC4443]
* Type 2 Packet Too Big [RFC4443]
* Type 3 Time Exceeded [RFC4443]
* Type 4 Parameter Problem [RFC4443]
* Type 100 Private Experimentation [RFC4443]
* Type 101 Private Experimentation [RFC4443]
* Type 102–126 Reserved
* Type 127 Reserved for Expansion of ICMPv6 error messages [RFC4443]
* Type 128 Echo Request [RFC4443]
* Type 129 Echo Reply [RFC4443]
* Type 130 Multicast Listener Query [RFC2710] — sent by an IPv6 router to locate general or specific multicast listeners on the local network
* Type 131 Multicast Listener Report [RFC2710] — sent by IPv6 hosts to indicate they are listening for a particular multicast address on an interface
* Type 132 Multicast Listener Done [RFC2710] — can be sent by an IPv6 node to indicate that it has stopped listening to a multicast address on an interface
* Type 133 Router Solicitation [RFC4861] — can be sent when an interface becomes enabled, to request routers to generate Router Advertisements immediately rather than at their next scheduled time
* Type 134 Router Advertisement [RFC4861] — used by IPv6 routers to advertise their presence together with various link and Internet parameters either periodically, or in response to a Router Solicitation  
  message
* Type 135 Neighbor Solicitation [RFC4861] — sent by a node to determine the link-layer address of a neighbor or to verify that a neighbor is still reachable via a cached link-layer address. Neighbor solicitations are also used for Duplicate Address Detection as seen in Figure 207.
* Type 136 Neighbor Advertisement [RFC4861] — a response to a Neighbor Solicitation message. A node may also send unsolicited Neighbor Advertisements to announce a link-layer address change.
* Type 137 Redirect Message [RFC4861]
* Type 138 Router Renumbering [Crawford]
* Type 139 ICMP Node Information Query [RFC4620]
* Type 140 ICMP Node Information Response [RFC4620]
* Type 141 Inverse Neighbor Discovery Solicitation Message [RFC3122]
* Type 142 Inverse Neighbor Discovery Advertisement Message [RFC3122]
* Type 143 Version 2 Multicast Listener Report [RFC3810]
* Type 144 Home Agent Address Discovery Request Message [RFC6275]
* Type 145 Home Agent Address Discovery Reply Message [RFC6275]
* Type 146 Mobile Prefix Solicitation [RFC6275]
* Type 147 Mobile Prefix Advertisement [RFC6275]
* Type 148 Certification Path Solicitation Message [RFC3971]
* Type 149 Certification Path Advertisement Message [RFC3971]
* Type 150 ICMP messages utilized by experimental mobility protocols such as Seamoby [RFC4065]
* Type 151 Multicast Router Advertisement [RFC4286]
* Type 152 Multicast Router Solicitation [RFC4286]
* Type 153 Multicast Router Termination [RFC4286]
* Type 154 FMIPv6 Messages [RFC5568]
* Type 155 RPL Control Message [RFC-ietf-roll-rpl-19.txt]
*Types 156–199 Unassigned
* Type 200 Private experimentation [RFC4443]
* Type 201 Private experimentation [RFC4443]
* Type 255 Reserved for expansion of ICMPv6 informational messages [RFC4443]

####Code

The following list provides descriptions of the more common ICMPv6 Types that support code domains or have an interesting use.

#### Type 1 Destination Unreachable Codes

* Code 0: No route to destination - you've made it up to a router, but there's no available routing entry to forward your packet (although the RFC says this could also be sent due to a firewall filter, we'd probably prefer to see the firewall silently discard packets rather than being so thorough)
* Code 1: Communication with the target is administratively prohibited — something you would rather not see if you want to silently discard unauthorized packets destined for a protected network
* Code 2: Out of scope of source address — this is generated when a packet has a link-local source address and a destination in global scope
* Code 3: Address unavailable — this is a general error message for all issues that do not fit into any other code number
* Code 4: Port unreachable — same as regular ICMP
* Code 5: Source address input/output policy failed — again — probably something you don't want to send over the network
* Code 6: Deny path to destination — your trafficA general indicator that you cannot reach
* Code 7: Error in Source Redirect Header [RFC-ietf-roll-rpl-19.txt]

#### Type 2 Packet Too Big Code

* Code 0: This is the only code value currently defined. This packet contains an MTU value and is used for Path MTU discovery.

#### Type 3 Time Exceeded Codes

* Code 0: Hop limit exceeded during transfer - this matches the standard ICMP message.
* Code 1: Fragment reassembly time exceeded - this matches the standard ICMP message.

#### Type 4 Parameter Problem Codes

* Code 0: Incorrect header field encountered — something in the IPv6 header didn't make sense
* Code 1: Unrecognized Next Header type encountered — The Next Header field contained something unusual — for a list of assigned IPv6 Next Header/IPv4 Protocol field values, see [www.iana.org/assignments/protocol-numbers/protocol-numbers.xml](http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xml) see
*Code 2: Unrecognized IPv6 option encountered - this packet may be sent in response to an IPv6 packet with one or more Extension Headers containing an invalid option.

#### Type 128 Echo Request Code

* Code 0: This is the only code value currently defined. This packet has an Identifier field that is used to match this Echo Request to an Echo Response.

#### Type 129 Echo Reply Code

* Code 0: This is the only code value currently defined. This package contains an Identifier field taken from the corresponding Echo Request package

#### Type 138 Router Renumbering Codes

* Code 0: Router Renumbering Command
*Code 1: Router Renumbering Result
* Code 255: Sequence Number Reset

#### Type 139 ICMP Node Information Query Codes

* Code 0: The data field contains an IPv6 address, which is the Subject of this Query — as you can imagine, this type of packet can be used for discovery. For more details, read RFC 4620, “IPv6 Node Information Queries.”
* Code 1: The data field contains a name that is the Subject of this Query or is empty as in the case of aNOOP.
* Code 2: The data field contains an IPv4 address, which is the Subject of this Query.

#### Type 140 ICMP Node Information Response Codes

* Code 0: A successful response. The Response Data field may or may not be empty.
* Code 1: Responder refuses to respond. The Response Data field will be empty.
* Code 2: The Q type of the query is unknown to the Responder. The Response Data field will be empty.

For more information about ICMPv6 type and code numbers, see [www.iana.org/assignments/icmpv6-parameters](http://www.iana.org/assignments/icmpv6-parameters).

---

### References

* Wireshark Network Analysis, Second Edition, Laura Chappell, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>