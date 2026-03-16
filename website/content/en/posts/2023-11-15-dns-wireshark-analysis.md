---
title: "DNS Wireshark Analysis"
date: 2023-11-15
description: "Hello, in this article, I will try to explain the Domain Name System (DNS) protocol and its analysis with Wireshark."
featuredImage: "https://cdn-images-1.medium.com/max/800/1*_OuE2zljUjPrg0g7TfljyQ.png"
series: ["Wireshark ile Ağ Analizi"]
---

![](https://cdn-images-1.medium.com/max/800/1*_OuE2zljUjPrg0g7TfljyQ.png)

Hello, in this article, I will try to explain the Domain Name System (DNS) protocol and its analysis with Wireshark.

---

### How Does DNS Work?

DNS is used to convert symbolic hostnames, such as [www.wiresharktraining.com](http://www.wiresharktraining.com), into IP addresses. DNS can also be used to transfer name information between DNS servers, determine the hostname associated with an IP address (reverse or pointer query), and look up other name elements such as an MX (mail exchange) record.

DNS is one of the most important applications on the network. A DNS problem will prevent computers from finding each other when using hostname information.

![](https://cdn-images-1.medium.com/max/800/1*-XBRoGHxww1KuVqyLDEznA.png)

DNS package

DNS can operate over UDP or TCP. You'll commonly see DNS queries and responses that use UDP. Zone transfers operate over TCP. The default port number for DNS is 53.

[RFC 1035](https://www.rfc-editor.org/rfc/rfc1035), Domain Names — Implementation and Specification limits DNS over UDP packet payload to 512 bytes. This is usually enough for a DNS query. However, when a response requires more than 512 bytes of space, an interrupt flag bit is sent in the response. This triggers the resolver to resend the DNS query using TCP, which allows for a larger packet size.

[RFC 2671](https://www.rfc-editor.org/rfc/rfc2671), Extension Mechanisms for DNS (EDNS0), allows more than 512 bytes over UDP.

---

### DNS Query/Response Analysis

Domain resolution, DNS query and response operations are very simple. A client sends a DNS query to a DNS server, requesting an IP address, usually in exchange for a domain. The DNS server either responds directly with the information it has or asks other DNS servers on behalf of clients.

![](https://cdn-images-1.medium.com/max/800/1*2Ye8QGf5KQIGJriwo33-jQ.png)

A record DNS Query

The figure shows a standard DNS request to the A record (CNAME) for www.winpcap.org. This DNS query is automatically generated when the user enters the domain in the browser URL and presses the Enter key.

The name requested by a client may not be the real name of the target. In this case, a canonical name(CNAME) or real name is returned for www.winpcap.org. The CNAME is [winpcap.org](http://www.winpcap.org) and the address of this host is 128.121.79.138.

---

### DNS Errors Analysis

The most common DNS problem is an error that occurs because a name does not exist in the ad namse server database. This may be due to entering an incorrect name or entering a new name that has not yet been propagated to Internet name servers.

![](https://cdn-images-1.medium.com/max/800/1*QGZ4PNFbyz1aVA6W3cqXLQ.png)

Unfound Domain Query

In the figure, a user is trying to access the address 2.26.64.24.in-addr.arpa. The Name Server responds by stating that there is no such domain. If the user cannot resolve the domain, he cannot reach the destination address.

Server error responses indicate that the name server was unable to resolve information for the client due to an error. This could be because the name server sent a query to another name server (via a recursive query) and timed out waiting for a response, or it could be that the response was not understood or related to a query due to some kind of internal error.

![](https://cdn-images-1.medium.com/max/800/1*ubKDRzHewQqeMyGqbDFqMw.png)

IP Resolution Cannot Be Performed as a Result of DNS Errors

The figure shows the server error response received when trying to reach [www.nmap.org](http://www.nmap.org). We know this is a valid address, but DNS cannot resolve it. We cannot reach the site due to a DNS problem. Pay attention to the time column; We can see that the client sends a DNS query, then waits 1 second for the response before resending the query. The client waited another 1 second before the third query, but doubled that wait time to approximately 2 seconds before the fourth DNS query.

To find the cause of DNS problems, you may need to move Wireshark upstream of the DNS server and monitor the lookup process at that location.

![](https://cdn-images-1.medium.com/max/800/1*CaxBBdj7NrXCZ3tIF-Gxxg.png)

The ICMP response indicates that port 53 is open on the target.

In the figure, our client sends DNS queries and these queries are answered with ICMP Destination Unreachable/Port Unreachable responses.The response shows that port 53 is not open on this host.

In this case, where the error occurs depends on whether the client's DNS server has the correct IP address or whether the DNS server service is running on the requested IP. In this case, the client tries again — there is only one DNS server configured (usually there will be 2), so it tries the lookup again. The client's request is rejected again because the server indicates that this port is not listening.

---

### DNS Package Structure

Unlike other applications that use a single transport protocol (UDP or TCP), DNS uses both UDP and TCP. DNS generally uses UDP-53 for name resolution requests and responses, and TCP-53 for zone transfers and larger name resolutions and responses.

![](https://cdn-images-1.medium.com/max/800/1*WDRDLWOoT1bKcj8KM2dyVA.png)

DNS name reqests to [www.winpcap.com](http://www.winpcap.com)

All DNS packages use a single basic structure consisting of four main parts as shown in the Figure.

#### Transaction ID

The Transaction ID field associates DNS queries with responses. You can filter on this field and value (for example, dns.id==0x05b5) to view all associated DNS queries/responses.

####Flags

The flags byte consists of multiple fields that define query properties.

#### Query/Response

The Query/Response bit indicates whether the packet is a query (0) or a response (1). You can create a Wireshark filter to view DNS queries (dns.flags.response==0) or responses (dns.flags.response==1).

#### Opcode

The Opcode field specifies the query type. Most commonly, this field contains 0000 for standard queries, and the field is left as 0000 in responses.

#### Authoritative Answer

The Authorized Response field used in responses indicates that the response comes from an authoritative server for the domain.

#### Truncation

A truncation area indicates that the DNS response was truncated due to length. If a client sees a truncated DNS response, it must retry the query over TCP. It's not very common to see TCP based queries/responses.

#### Recursion Desired

Recursion can be defined in DNS queries to specify whether the server can use recursive query operations. Recursion allows a DNS server to request a response from another server on behalf of the client. If the local nameserver has the answer, it will respond directly. If it doesn't have the answer, it will begin the search on behalf of the client.

#### Recursion Available

This setting, described in the answers, specifies whether recursion is available on the DNS server.

#### Reserved

This field is set to 0.

#### Rcode (Response Code)

The rcode field indicates whether there is an error condition in the response. The table below lists possible Rcode values.

* Code 0: No error condition.
* Code 1: Format error - query could not be interpreted.
* Code 2: Server error - the server was unable to process the query due to a problem with the nameserver.
* Code 3: Name error - domain does not exist.
* Code 4: Not implemented.
* Code 5: Denied - the nameserver refuses to perform the function due to policy.

#### Question Count

This field shows the number of questions in the Question section. You'll typically see only one question per query package.

#### Answer Resource Record (RR) Count

This field shows the number of responses in the Response RRs section. If a response contains CNAME information, you will likely see two numbers in the Response RR Number field — one for the CNAME and one for the IP address of the CNAME record.

#### Authority RRs Count

This field shows the number of responses in the Authority RRs section. These responses come from servers that are closer to the target name in the naming hierarchy.

#### Additional RRs Count

This field shows the number of responses in the Additional RRs section. In this section you can find A records for servers in the Authority RR section.

#### Queries

This variable-length field identifies the name being parsed and the type of information requested.

#### Name

This field contains the name being resolved. The format is variable length, using a numeric delimiter to specify the number of alphanumeric bytes in the name. Below are some examples:

*3www9wireshark3org0
*3www4iana3org0

####Type

This field shows the query type. For a complete list of registered type numbers, see [www.iana.org/assignments/dns-parameters](http://www.iana.org/assignments/dns-parameters).

* Type A: Host address
* Type NS: Authoritative name server
* Type CNAME: Canonical name for an alias
* Type SOA: Start of Zone Authority
* Type PTR: Pointer record
* Type HINFO: Host information
* Type MX: Mail exchange
* Type AAAA: IPv6 address

#### Class

This field is set to 1 to specify an Internet class address for TCP/IP communications.

#### Answer RRs

This area uses the same format as this section in the Questions area.

#### Authority RRs

This area uses the same format as this section in the Questions area.

#### Additional RRs

This area uses the same format as this section in the Questions area.

#### Resource Record Time to Live (TTL) Value

This field is located in the Response section of DNS responses and indicates how long the recipient can cache DNS information. Each response in DNS will contain a TTL value for that DNS information.  
DNS servers responding with RR information continuously count down the remaining TTL value; Making the same DNS query ten seconds apart will show a ten second difference in the TTL value presented.

---

#### DNS/mDNS Traffic Filters

The capture filter for DNS traffic is based on the port number because the tcpdump filter format cannot detect the dns protocol. This may change as Libpcap and WinPcap are updated.

The capture filter for standard DNS traffic over UDP or TCP is port 53, while mDNS uses port 5353.

The view filter syntax is simply dns. This filter displays both DNS and mDNS traffic. Additional DNS display filters are listed below.

* dns.flags.response==0: DNS query
* dns.flags.response==1: DNs response
* dns.flags.rcode != 0 : DNS responses containing errors
* dns.count.answers > 5: DNS responses containing more than 5 responses
* dns.qry.name==”www.abc.com" : DNS query for [www.abc.com](http://www.abc.com)
* dns contains “abc”: DNS query or responses “containing abc”
* dns.qry.type==0x0001: DNS queries for a hostname.
* dns.qry.type==0x000c: DNS queries for a domain pointer query(inverse query).
* dns.resp.type==0x0005: DNS responses containing CNAME value (canonical name)
* dns.resp.type==0x0006: DNS responses containing SOA (Start of Authority)
* dns.flags.recdesired==1: DNS Queries with recursion desired
* dns.flags.recavail==1: DNS responses starting with recursion available

More Display filter options can be found in Wireshark's Reference at [www.wireshark.org/docs/dfref/d/dns.html](http://www.wireshark.org/docs/dfref/d/dns.html).

---

### References

* Wireshark Network Analysis, Second Edition, Laura Chappell, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>