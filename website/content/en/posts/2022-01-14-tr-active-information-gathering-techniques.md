---
date: '2022-01-14'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/0*oiybh8KKS4kV2xtr.jpg
title: '[TR] Active Information Gathering Techniques'
type: posts
---

### Active Information Gathering Techniques

![](https://cdn-images-1.medium.com/max/800/0*oiybh8KKS4kV2xtr.jpg)

In this article, we will talk about Active Information Gathering Techniques.

### What is Active Information Collection?

Active information collection is a type of information collection that is done by contacting the target directly. With active information collection, we can obtain clearer and more reliable results than with passive information collection. However, since direct contact is made with the target, a trace is left on the target. Care should be taken as records are left in firewall, IDS and access logs.

### DNS Scans

DNS protocol is the basic building block of the internet, DNS tells us which IP address the domain name we enter is located. A poorly configured DNS server can give out a lot of information.

nslookup is a basic tool with which we can make a DNS query.

```
nslokup www.pwnlab.me
```

The dig tool is one of the tools with which we can perform a DNS query. We can make a DNS query by giving the domain name as a parameter to the dig tool.

```
dig www.pwnlab.me
```

To query which DNS servers DNS queries for a domain name pass through, we add the +trace parameter to the dig command. With this parameter we can monitor DNS query traffic.

```
dig pwnlab.me +trace
```

You can try using brute force to find subdomains related to a domain. The dnsmap tool is used for this. If a wordlist is not given, it performs it using the standard list hosted within itself.

```
dnsmap www.pwnlab.me
```

### Port and Service Scans

One of the areas where active information collection is most effectively used is port and service scanning. There may be cases where vulnerabilities in services running on ports directly affect the server.

nmap is short for Network Mapper. It is an open source Linux tool used to scan IP addresses and ports on a network and detect installed applications.

nmap is used to find which devices are running on networks, discover open ports and detect security vulnerabilities.

When setting a target with nmap, you can specify the target in different sizes.

* **nmap 192.168.1.1**: Searches only for the given address.
* **nmap 192.168.1.1–15**: Scans IPs in the given range, including IPs 1 through 15.
* **nmap 192.168.1.0/24**: performs subnet scanning.
* **nmap pwnlab.me**: Searches for domain name
* **nmap -IL list.txt**: Scans the IPs in the list.txt file.

We can perform different types of searches with nmap.

* **nmap -sP 192.168.1.0/24**: Scans with ping.
* **nmap -PA 192.168.1.0/24**: Analyzes with TCP-ACK Ping.
* **nmap -PS 192.168.1.0/24**: Analyzes with TCP-SYN Ping.
* **nmap -PE 192.168.1.0/24**: Analyzes with ICMP Echo Request.
* **nmap -PU 192.168.1.0/24**: Analyzes with UDP Ping.

There are 6 different definitions expressing the status of the ports in port scans made with nmap.

* **open**: The port is open and is being listened to by an application.
* **closed**: The port is closed but accessible. There is no application listening on the port.
* **filtered**: Due to the filtering process, nmap could not detect information about the port.
* **unfiltered**: Returns for ACK Scan. The ports are accessible but cannot be determined to be open.
* **open|filtered**: It was not determined to be open or filtered.
* **closed|filtered**: Not detected as closed or filtered.

<https://www.kali.org/tools/netcat/>

Netcat is considered the Swiss army knife in the Networking world. It is an easy-to-use and multi-purpose tool with many features, so we can consider it as a Swiss army knife in cyber security. Netcat has many features, the main ones being:

* Port scanning
* Port forwarding
* File upload and download (file transfer)
* Remote shell opening
*Backdoor

**Usage Parameters**

```
nc -h
```

```
nc [options] [destination ip] [port]
```

With the example command line above, you can perform operations on the target IP using usage parameters.

[nbtscan](https://www.kali.org/tools/nbtscan/) is a tool for scanning IP networks for NetBIOS name information. Sends a NetBIOS status query to each address in the provided range and lists the received information in a readable format. The IP address, NetBIOS computer name, logged in user name, and MAC address information is listed for each responding computer.

```
nbtscan -h
```

**Usage parameters:**

* -v: Verbose output; all work received from each computerprints the contents.
* -d: Dump packages; prints the entire package contents.
* -e: Formats the output in different formats.
* -t: Timeout; is the wait time for the response, default is 1000 milliseconds.
* -b: Bandwidth; limits bandwidth. (useful on slow internet connections)
* -r: Uses local port for scans.
* -q: Prints banners and error messages.
* -s: Separator; Separates the output into columns.
* -h: prints the help document.
* -m: New transfer; number of retransmissions (0 by default)
* -f: Filename; It is used to export IP addresses in file format.

```
nbtscan 77.92.138.0/24
```

<https://www.kali.org/tools/netdiscover/>

Netdiscover tool is a discovery tool that can show the operating systems, Mac, IP and router addresses of devices on the same network.

**Features:**

* Simple ARP Scanner
* Can scan multiple Subnets.
* Can work in Active and Passive Modes.
* Timing options available.

**Usage Parameters:**

* -i device: Your own device.
* -r range: Scans a specific range instead of automatic scanning. 192.168.6.0/24,/16,/8
* -l file: Scans the list of ranges found in the given file
* -p passive mode: Does not send anything, just sniffs
* -m file: Scans a list of known MACs and hostnames
* -F filter: customize pcap filter expression
* -s time: Waiting time between each arp request (milliseconds)
* -n node: Last ip octet used for scanning (from 2 to 253)
* -c count: Number of times each arp request is sent (for networks with packet loss)
* -f Enables fast mode scanning, saves a lot of time
* -d Ignores homepage configuration files for autoscan and quick mode
* -S Enables forced wait time between each request.
* -P Outputs print results in a format suitable for parsing by another program.
* -N Do not print the header. Valid only when the -P command is used.

### A very functional tool

<https://www.kali.org/tools/dmitry/>

Dmitry tool is an advanced tool that can perform port scanning in addition to the whois queries we see in passive information collection. However, it can also collect information about subdomains and Emails. It can do the job of many tools on its own in passive and active information collection.

```
dmitry -h
```

* -h parameter: opens the help document.
* -o parameter:
* -i parameter: performs a whois query on the queried IP address.
* -w parameter: performs a whois query on the queried domain name.
* -n parameter: Makes a Netcraft query.
* -s parameter: Scans on subdomains on the target system.
* -e parameter: Queries E-mail addresses on the target system.
* -p parameter: Performs a TCP port scan on the target system.
* -f parameter: Shows the TCP ports filtered on the target system.
* -b parameter: Used to capture banners.
* -t parameter: Sets the TTL time to be used when performing TCP port scanning. By default it is 2 seconds.

```
dmitry www.pwnlab.me
```

It makes all queries regarding the specified domain name and presents them to us.

---

*Originally published at* [*https://pwnlab.me*](https://pwnlab.me/activt-bilgi-toplama-teknikleri/) *on January 14, 2022.*