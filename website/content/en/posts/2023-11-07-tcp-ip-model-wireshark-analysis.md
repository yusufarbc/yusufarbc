---
date: '2023-11-07'
draft: false
title: TCP/IP Model Wireshark Analysis
---

---

### TCP/IP Model Wireshark Analysis

![](https://cdn-images-1.medium.com/max/800/1*vQHzVUN_qVpKQQbS9Cr4Ug.png)

Hello, in this article, I tried to explain the TCP/IP model and how to perform a basic network analysis with Wireshark.

---

### Understanding Network Traffic Flows

#### Switching

Switches forward packets based on the destination MAC address (also known as the destination hardware address, physical address) contained in the MAC header (like the Ethernet header).

![](https://cdn-images-1.medium.com/max/800/1*NsSETtT4IofH-5OXSKDrzQ.png)

Switches do not change MAC or IP addresses in packets

When a packet reaches a switch, the switch checks the packet to make sure it has the correct checksum. If the packet's checksum is incorrect, the packet is considered bad and the packet is discarded. Switches should keep error counters that show how many packets they throw away due to bad checksums. If the checksum is correct, the switch examines the packet's destination MAC address and consults its MAC address table to determine whether it knows which switch port goes to the host using that MAC address. If the switch does not have the destination MAC address in its tables, it forwards the packet through all the switch ports hoping to discover the responding destination. This process is done with the **ARP** protocol. If the switch has the destination MAC address in its tables, it forwards the packet to the appropriate port.

#### Routing

Routers forward packets based on the destination IP address in the IP header. When a packet is sent to the router's MAC address, that router examines the checksum to make sure the packet is valid. If the checksum is invalid, the packet is dropped. If the checksum is valid, the router extracts the MAC header (e.g. Ethernet header) and examines the IP header to determine the “TTL” (Time to Live) and its destination. package. If the packet is too “old” (Time to Live value is 1), the router discards the packet and an ICMP Time to Live Exceeded message is sent back to the sender. If the packet is not stale(TTL time has not been Exceeded), the router looks at the routing tables to determine if the destination IP network is known. If the router is directly connected to the destination network, it can send the packet to the destination. The router reduces the IP header Time to Live value and then creates and applies a new MAC header to the packet before forwarding it

![](https://cdn-images-1.medium.com/max/800/1*Utuq1h526m5eoCl4wWYJGQ.png)

Routers change destination MAC address to destination or next router

If the destination is not on a locally connected network, the router forwards the packet to the next hop router it learned from looking at the routing tables.

Routers may contain rules that block or allow packets based on addressing information. Many routers provide firewall features and can block/allow traffic based on other features.

#### Proxy, Firewall and NAT/PAT

Firewalls are created to inspect traffic and allow/deny communication based on a set of rules. For example, you may want to block all TCP connection attempts from hosts outside the firewall that are forwarded to port 21 on internal servers.

Basic firewalls operate at Layer 3 of the OSI model, the network layer. In this capacity, the firewall acts as a router when processing network traffic and forwards traffic that is not blocked by firewall rules. The firewall adds a new MAC header to the packet before forwarding it. If the firewall supports additional features such as Network Address Translation (NAT) or proxy capabilities, additional packet switching will occur.

![](https://cdn-images-1.medium.com/max/800/1*0sZI8QkhS5eWd1ef0qJyXw.png)

Firewall uses NAT to hide the real source IP address

NAT systems change the IP addresses in the packet as shown in Figure. This is often used to hide the client's private IP address. A basic NAT system simply swaps the source and destination IP address of the packet and tracks the connection relationships in a table to properly forward traffic when a response is received.

Port Address Translation (PAT) systems also exchange port information and use this as a method to demultiplex multiple internal connections while using a single outgoing address. The IP addresses you see on one side of a NAT/PAT device are the IP addresses you see on the other side of the NAT/PAT device.will not match. To correlate communications on both sides of a NAT device, you will need to look beyond the IP header to identify matching packets.

#### Other Technologies

There are many other technologies that affect network traffic patterns and packet contents.

Virtual LAN (VLAN) tagging (defined as 802.1Q) adds an ID (tag) to packets. This tag is used to create virtual networks in a switched environment. Figure 7 shows the VLAN tag in an Ethernet frame. In this case, the sender belongs to VLAN 32.

Multiprotocol Label Switching (MPLS) is a method of creating virtual connections between remote hosts. MPLS packets are prefixed with a special header by MPLS edge devices. For example, a packet sent from a client reaches an MPLS router where the MPLS label is placed on the packet. The packet is now forwarded based on the MPLS tag rather than routing table lookups. The MPLS label is stripped when the packet leaves the MPLS network.

---

### TCP/IP Model

It shows the basic TCP/IP elements along with the TCP/IP Model and the OSI Model. Although the elements of TCP/IP match nicely with the TCP/IP Model, the OSI Model is still constantly referred to in our industry. “Layer 2” devices (switches) and “Layer 3” devices (routers) receive numerical identification according to the OSI Model, not the TCP/IP Model.

![](https://cdn-images-1.medium.com/max/800/1*X4_tzi-NjihAqIAJEunVWA.png)

TCP/IP elements with the TCP/IP Model and OSI Model

Many network errors or violations can be attributed to TCP/IP protocol or application problems. To recognize these problems we need to know what normal behavior is. Commonly used protocols in the TCP/IP structure are:

* **Internet Protocol (IPv4/IPv6)** serves as a routable network layer protocol used to receive packets end-to-end across a network. Routers use the information contained in the IP header to make routing decisions. Layer 3 switches can also route traffic.
* **User Datagram Protocol (UDP) and Transmission Control Protocol (TCP)** provide connectionless and connection-oriented transport layer services, respectively. The port fields in the UDP and TCP headers identify the application used. TCP headers contain fields that also provide sorting and validation services. UDP and TCP are mapped to Layer 4 (Transport Layer) of the OSI Model.
* **Routing Information Protocol (RIP) and Open Shortest Path First (OSPF)** are two examples of protocols that enable the exchange of network and path information between routing devices.
* **Internet Control Message Protocol (ICMP/ICMPv6)** is used to provide network information and is commonly recognized as the protocol used for ping. ICMPv6 is used to check and see if an IPv6 address is already in use (duplicate address detection).
* **Domain Name System (DNS)** provides hostname-to-IP address resolution services. When you type telnet station3, DNS resolves the station3 name to its IP address. Alias ​​(such as Mail Exchange or MX records) can also be resolved by DNS.
* **Dynamic Host Configuration Protocol (DHCP)** provides dynamic client configuration and service discovery services, not just IP address information. DHCP can also provide default gateway settings, DNS server settings, and more.
* **Address Resolution Protocol (ARP)** provides hardware address lookup services for a local device. ARP also allows us to check and see if an IPv4 address is already in use (duplicate address test).

If everything goes well with TCP/IP communication, clients find services quickly. These services respond quickly to requests, and client systems do not need to request a service multiple times. **An analyst** can uncover large delays between communications, name parsing errors, duplicate requests and retransmissions, insecure practices, and much more. Before analyzing traffic to identify errors, you need to know what is considered normal network communication.

---

### Client — FTP Server Scenario

TCP/IP uses a multi-step resolution process when a client communicates with a server. In our example, both the client and server are on the same network. This process includes the following steps:

* Identify the source and destination ports used by the application (port number resolution).
* h if necessaryResolve the edef name to an IP address (network name resolution).
* If the target is on the local network, obtain the target's hardware address (local MAC address resolution).
* If the destination is remote, determine the best router to use to reach the destination (route analysis).
* If the destination is remote, determine the router's MAC address (local MAC address resolution again).

![](https://cdn-images-1.medium.com/max/800/1*AWmwmBOwxbf1QyEXXsjg0Q.png)

TCP/IP resolution processes

In our example we will consider the connection between a client and the FTP Server.

![](https://cdn-images-1.medium.com/max/800/1*cPS6KAp-bJl1xjrg96dEMg.png)

The client wants to make an FTP connection to CORPFS1

#### Step 1: Port Number Resolution

In our example, the user typed ftp CORPFS1. FTP generally uses port 20 or a dynamic port for data transfer and port 21 for commands such as login and password sending functions, USER and PASS. In our example, the client is trying to connect to the FTP server using port 21. This port number is located in the etc/services file on the client. This number will be placed in the destination port field of the outgoing packet's TCP header. The client uses a dynamic (temporary) port for the source port field value. This process does not create traffic on the network. Therefore, we cannot see any information in the trace file.

#### Step 2: Network Name Resolution (Optional)

If an explicit destination IP address is defined by the client, network name resolution is not required. If the client has defined a target hostname (CORPFS1 in our example), network name resolution is required to obtain the IP address of the target host.

When performing name resolution, you must follow a certain order:

1. Look in the DNS resolver cache for the name.
2. If the entry is not in the DNS resolver cache, examine the local hosts file (if available).
3. If the local hosts file does not exist or the requested name/address is not in the hosts file, send a request to the DNS server (if one is configured for the local system).

If no response is received from the first DNS server in the configured DNS server list, the client can try to redirect the query to the first DNS server or query the next known DNS server. Still no answer? Are there no other known DNS servers? If the client cannot resolve the value to be placed in the destination IP address field, it cannot create the packet.

In our example, we can see that the client sends a DNS query to the first DNS server listed in its local configuration. (If all goes well) we should see a response from a DNS server containing the IP address of CORPFS1.

This process can generate traffic on the network, as shown by TX in Figure 181. If name resolution uses the local hosts file or retrieves the requested information from the cache, no packets are sent. If a DNS query needs to be sent, it will appear in the trace file.

#### Step 3: Route Analysis-When Destination is Local

During this process, the client determines whether the target device is local (on the same network) or remote (on the other side of a router). The client compares its network address with the target network address to determine whether a target is on the same network. In the example shown in Figure 180, the client's IP address is 10.1.0.1/8 (network 10). The IP address of the server is 10.2.99.99. The target is also on network 10.

Consider possible consequences depending on the client's IP address and subnet mask.

* Source address 10.1.22.4 with subnet mask 255.0.0.0 = CORPFS1 is local (go to step 4)
* Source address 10.1.22.4 with subnet mask 255.255.0.0 = CORPFS1 is remote (go to step 5)
* Source address 10.2.22.4 with subnet mask 255.255.0.0 = CORPFS1 is local (go to step 4)

This process does not generate traffic on the network.

#### Step 4: Local MAC Address Resolution

If the target device is local, the client must resolve the MAC address of the local target. The client first checks the ARP cache for this information. If this information is not available, the client sends an ARP broadcast to find the hardware address of the target. When an ARP response is received, the client updates the ARP cache.

This process may generate traffic on the network as indicated by TX. If the MAC address is cached, no packets will be sent. If an ARP query needs to be sent, it will appear in the query trace file.

#### Step 5: Route Analysis-When the Destination is Far

If the target device is remote, the client must perform route analysis to determine the appropriate nexthop router.takes it. The client looks at local routing tables to determine if a host or network route entry exists for the destination. If there is no entry, the client checks for a default gateway entry. This process does not create traffic on the network.

The Default Gateway provides a “blind faith” path — since the client has no route to the destination, it sends the packet to the default gateway and hopes the default gateway can figure out what to do with the packet.

Default gateways usually either forward the packet (if they have the best route to the destination), send an ICMP redirect response pointing to another local router with the best route to the destination, or return a response indicating that they have no idea where to send the packet (ICMP Destination Unreachable).

#### Step 6: Local MAC Address Resolution for a Gateway

Finally, the client must resolve the MAC address of the next hop router or default gateway. The client first checks the ARP cache. If the information is not in the cache, the client sends an ARP broadcast to retrieve the information.  
Next updates the router's MAC address and ARP cache.  
This process may generate traffic on the network as indicated by TX. If a requested router's MAC address is cached, no packets will be sent. If an ARP query needs to be sent to the requested router, this query will appear in the trace file.

#### Package Analysis

If all goes well (and in this case the target is local), we should have resolved the following information during this process:

* Destination MAC address
* Destination IP address
* Source and destination port numbers

![](https://cdn-images-1.medium.com/max/800/1*tCpXIwj6CXujGOtmMVR_pA.png)

Discovered information for TCP/IP packet over Ethernet

---

#### TCP/IP Traffic Analysis

In this section, we will examine the http-riverbed-one.pcapng and http-riverbed-two.pcapng files. You can access it from the bibliography section.

These two files belong to a client that accessed [www.riverbed.com](http://www.riverbed.com) 89 seconds apart.

In the http-riverbed-**one**.pcapng file, we naturally see that there are DNS queries first. In order to create packets, the client must resolve the domain and obtain destination IP information.

![](https://cdn-images-1.medium.com/max/1200/1*iUj1JBtBuMGtEUw5Y6zaCg.png)

DNS queries for domain resolution in the http-riverbed-one.pcapng file

We notice that there are no initial DNS queries to the http-riverbed-**two**.pcapng file. This indicates that the client has some of the requested IP addresses in its DNS cache, so there is no need to create a DNS query for these names.

![](https://cdn-images-1.medium.com/max/1200/1*6zV7mvLrjJnykjirRuBkdQ.png)

DNS queries do not appear in the http-riverbed-two.pcapng file.

Most of the DNS responses in the http-riverbed-one.pcapng file cached the client's name resolution information for a short period of time and did not resubmit the DNS query.

However, if the session time is exceeded, we can see in the http-riverbed-two.pcapng file that our browser sends DNS queries to re-resolve these names.

![](https://cdn-images-1.medium.com/max/1200/1*SodfEwNqxAcl739FUVO_kA.png)

Revamped DNS resolutions in http-riverbed-two.pcapng

You will also notice that the total number of packages in http-riverbed-two.pcapng is only 319. In addition to fetching some of the DNS information from the cache, the browser also displayed a large number of page elements from the cache.

When we look at the protocol statistics (Statistic | Protocol hierarchy) in the http-riverbed-**one**.pcapng file, we see that most of the traffic uses TCP. Because the HTTP protocol uses TCP. When we look at UDP traffic, we see that it uses the Domain Name System (DNS) protocol.

![](https://cdn-images-1.medium.com/max/800/1*zal0jQY1slYuV6RDm5UdCg.png)

http-riverbed-**one**.pcapng Protocol Statistics

To see the dominant traffic in http-riverbed-**one**.pcapng file Statistic| We can open the Conversations window. If we sort by packets when we open the IPv4 tab here, we can say that the dominant traffic is between IPs **24.61.173.220** and **208.70.196.59** with 1140 packets going between hosts.

![](https://cdn-images-1.medium.com/max/800/1*Hb4M03jKQ_8Lp1YzMShv2Q.png)

conversations

Statistic| in http-riverbed-**one**.pcapng IP name mentioned in traffic in the Endpoints windowWe can see the pictures. All of the IP addresses here seem to be public IP addresses. Therefore, we can say that the traffic was captured on an external network.

![](https://cdn-images-1.medium.com/max/800/1*5XvOPLu2866hRTPDdvUjig.png)

endpoints

Statistic| in http-riverbed-**one**.pcapng HTTP| In the Requests window, we can view the web addresses visited in the pcap file.

![](https://cdn-images-1.medium.com/max/800/1*2QwpmwBds_gI3oZfGyMGKA.png)

Requests

In http-riverbed-**one**.pcapng   
ip.addr == 24.6.173.220 && ip.addr == 208.70.196.59   
Let's examine the dominant traffic we found before by typing its filter.

![](https://cdn-images-1.medium.com/max/800/1*MkagBTP5iI4imfNHp5V5nw.png)

Dominant Traffic

If we click on the HTTP packet and select the follow HTTP Stream option, we can view all HTTP traffic.

![](https://cdn-images-1.medium.com/max/800/1*-2JPla-66SZrjX-kKCsECg.png)

Follow HTTP Stream

We are faced with a long flow. Here he found the traffic to and from [www.riverbed.com](http://www.riverbed.com). We can see the HTTP connections established with this address as request (red text) and response (blue text).

![](https://cdn-images-1.medium.com/max/800/1*4B5HtycWS34GEws6jMxlnA.png)

www.riverbed.com HTTP Stream

---

### References

* Wireshark Network Analysis, Second Edition, Laura Chappell, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>