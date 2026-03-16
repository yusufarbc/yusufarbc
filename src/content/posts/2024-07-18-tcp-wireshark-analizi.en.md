---
title: "TCP Wireshark Analysis"
date: 2024-07-18
draft: false
---

---

### TCP Wireshark Analysis

Hello, in this article I will try to explain the TCP protocol and its analysis with Wireshark.

---

### What is TCP?

TCP provides connected transport over a connection that begins with a three-way handshake between two devices. Data is sorted and validated to provide automatic recovery of lost packets. UDP can be likened to the standard mail delivery system for a letter or postcard, while TCP can be likened to an express carrier that tracks the delivery of your letter or postcard and sends you notification of receipt.

TCP supports windowing, which is the process of sending multiple data packets sequentially without waiting for an intervening acknowledgment. The size of the window depends on the amount of traffic the network can handle (network congestion rate), the receiver's available buffer space, and the sender's transmission buffer capacity. Most file transfer protocols use TCP to ensure reliable delivery of data.

![](/images/1_eV6FVT7z6k3hb3M6-DRqtw.png)

Offers streaming for applications like TCP, HTTP, HTTPS, email, FTP and more

TCP is covered in RFC 793, but many improvements have been made to the original TCP protocol that should be kept in mind when examining TCP behavior.

---

### TCP Traffic Analysis

Normal TCP communication includes connection establishment, queue monitoring, data loss recovery, and disconnection operations.

#### TCP Connections

TCP connections are established through a three-way handshake. The basic handshake process requires three packets — SYN, SYN/ACK, and ACK.

SYN packets synchronize sequence numbers to ensure that both parties know each other's initial sequence numbers (Initial Sequence Number or ISN). This is how the order of data exchanged between them is kept track of.

![](/images/1_MVWnM3ExdWfUNeZCyXpERQ.png)

Three-way TCP handshake establishes an FTP connection

In the figure, host 24.6.173.220 establishes a TCP connection to address 74.125.224.81. Packet 1 contains the description [SYN] in the Info column, packet 2 lists [SYN, ACK], and packet 3 lists [ACK]. This recognizable pattern is the TCP three-way handshake used to establish a connection.

TCP connections can be terminated in various ways. An explicit termination uses TCP Resets. An implicit termination uses TCP FIN packets.

When FIN is used, a host sends a FIN packet and enters the FIN-WAIT state until its FIN is acknowledged and the peer sends back its FIN. According to RFC 793, there are actually a few situations that are possible when FIN is used to implicitly terminate a connection.

![](/images/1_oKbEZpebc55HRhufKktDkw.png)

Type netstat -a to find out the current status of TCP connections on a Windows or Linux host. Below is an example of the connection status on a Windows host.

TCP 24.6.173.220:1035 poll:https ESTABLISHED  
TCP 24.6.173.220:1071 egw1:https ESTABLISHED  
TCP 24.6.173.220:9497 163–166:http CLOSE\_WAIT  
TCP 24.6.173.220:9699 nuq04s07-in-f11:http CLOSE\_WAIT  
TCP 24.6.173.220:9702 ec2–204–236–130–101:http CLOSE\_WAIT  
TCP 24.6.173.220:9703 ec2–204–236–131–42:http CLOSE\_WAIT  
TCP 24.6.173.220:9706 a184–84–222–33:http CLOSE\_WAIT  
TCP 24.6.173.220:9798 163–166:http CLOSE\_WAIT  
TCP 24.6.173.220:14717 nuq04s07-in-f5:http CLOSE\_WAIT  
TCP 24.6.173.220:15582 163–166:http CLOSE\_WAIT  
TCP 24.6.173.220:22167 66–151–158–187:https TIME\_WAIT  
TCP 24.6.173.220:22168 216–115–209–254:https TIME\_WAIT  
TCP 24.6.173.220:22169 probe-cgnt-sjc:https TIME\_WAIT  
TCP 24.6.173.220:22170 probe-cgnt-sjc:https TIME\_WAIT  
TCP 24.6.173.220:22171 216–115–209–254:https TIME\_WAIT

FIN Doesn't Mean "Shut Up"  
RFC 793 defines the purpose of the FIN bit as indicating that no more data will arrive from the sender. This does not prevent the recipient of the FIN packet from sending additional data, which is allowed.

![](/images/1_smMgrW01y8cfs7-ZvQ813Q.png)

TCP Reset is used to explicitly close a TCP connection

You may also see a Reset used to explicitly terminate a TCP connection. The Reset may be preceded by FINs or the Reset may occur on its own. The figure shows an HTTP connection established by 24.6.173.220. In a FIN packet, the server sends a packet with the FIN bit set, indicating that it has no more data to send. The client acknowledges the response and sends a packet with the FIN bit set. Finally, the server sends the connection in the last packet.explicitly sends a TCP Reset to terminate.

#### TCP Packet Tracing and Recovery

The sorting/validation process monitors the order of packets and detects and recovers missing sections.

During the handshake process, each side of the connection selects its own starting sequence number (Initial Sequence Number). Both parties increment this sequence number by the amount of data contained in each packet. When analyzing the ranking/approval process, this simple equation is used:

![](/images/1_cXVzyyVpFHkcZXppMisl5Q.png)

Here's a quick example of how a sequential communication can happen with simple terms/numbers:

The Confirmation Number field is only incremented when data is received. By default, Wireshark uses Relative Sequence Numbering, which starts sequence number values ​​at 0 for easier readability. Instead of displaying a sequence number like 402691989, Wireshark starts with a sequence number of zero because it is easier to work with smaller numbers. If you want to see the actual sequence numbers, disable TCP Relative Sequence Numbers and Window Scaling in the TCP preferences (remember, the Acknowledgment Number field contains the value of the next expected sequence number from the other side).

Once agreement is reached, sequence numbers only increase by the number of actual data bytes sent. In this example, the client is the first peer to send data (a request to retrieve the home page on a web server).

![](/images/1_iWouL0pOxZ6CGzHveXRqaA.png)

TCP Sequence and Acknowledgment numbers keep track of data being exchanged

![](/images/1_bga1HCi_98qMzffpg5tHag.png)

First Connection

The TCP communications shown in the figure can be seen in the file named http-espn2011.pcapng. In this file, the user connects to [www.espn.com](http://www.espn.com%27a) and is notified that the content has been permanently moved to go.espn.com. The client then connects to go.espn.com.

![](/images/1_xsmRACMlX0dHKNm2d4v3TQ.png)

Second Link

The beginning of this second connection and the Sequence/Acknowledgment Number field values are shown in the Figure.

TCP is capable of detecting packet loss (based on missing sequence numbers) and recovering by requesting missing data segments (receiving side) or by timing out and resending unacknowledged segments (sending side).

When the recipient notices that the expected sequence number is not on the package, they assume the package is lost. At this point, the receiver sets the Acknowledgment Number field to ACK to the next expected sequence number from the peer.

![](/images/1_ag_paaFMEEadzkxMp25WHQ.png)

High latency paths may cause more than three identical ACKs

Receiving more than three ACs will trigger retransmission. For example, when the sequence is skipped as shown in the figure, the receiver sends an ACK with 112750 in the Confirmation Number field. If the sequence number is not 112750, additional ACKs (with 112750 in the Acknowledgment Number field) will be sent when additional data is received. Wireshark marks these as Duplicate ACKs.

TCP senders maintain a TCP Retransmission Timeout (RTO) value to determine when a packet not acknowledged by a TCP peer should be retransmitted. If a data packet is sent and is not acknowledged before the RTO timer expires, the TCP sender can retransmit the packet using the sequence number of the original packet.

![](/images/1_-mKnrW-dlf9Xjy9Bv4i1cQ.png)

The HTTP server retransmits a packet when the retransmission timeout value is reached

The figure shows a server that resends the data packet after waiting for an ACK and does not receive it before the RTO expires. Another retransmission is sent approximately 600 ms later. Using TCP's backoff algorithm, the intervening time is doubled with each retransmission attempt until the packet is acknowledged or the sending TCP host gives up after five retransmissions.

TCP provides a method of flow control to ensure that traffic is not sent over a connection known to be heavy or to an overloaded host.

The throughput of TCP communications depends on network congestion. congestion defines the number of bytes pending (confirmed) at a time. This is essentially a flow control mechanism implemented by the sender. congestion is not a setting; It is determined dynamically based on two key factors:

* Receiver's TCP buffer space reported
* Sender's transmission buffer capacity
* Amount of traffic allowed on the network (network clickdepending on immediacy/packet loss)

congestion will always be lower than these three values. For example, assume that on an Ethernet network, a receiver advertises a 65,535-byte frame, but the connection regularly experiences packet loss before ever taking advantage of the peer's 65,535 receive buffer.

The actual congestion is not 65,535 bytes but a lower value depending on what the network will support. The process for determining congestion after packet loss is described in detail in RFC 2001.

---

### TCP Problems Analysis

There are many problems that can occur at the TCP layer, from problems with the handshake process to packet loss, TCP connection drops, frozen windows.

![](/images/1_07AoMOodVO2M9hTual5LLg.png)

TCP connection rejected with RST/ACK

We start with TCP handshake problems. The figure shows a TCP connection rejection. In Figure 235, the first packet of the handshake (SYN) receives a Reset (RST/ACK) response. Unable to connect. If the handshake process is not completed successfully, data cannot be exchanged between hosts.

An excessive number of failed TCP connection attempts may indicate a TCP scan.

![](/images/1_x5VezCndlQUpY7QlfAaMbQ.png)

A failed TCP connection due to packet loss

The figure shows another problem with the handshake process. When we examine the figure, we can see the following:

* Handshake looks normal; SYN, SYN/ACK, ACK in packets 3–5. Notice that in the first packet of the handshake (SYN), the client's sequence number, 67.161.32.69, is shown as 0, a relative sequence number identified by Wireshark. The next packet sent from this client (packet number 5) shows that the client's sequence number is now 1, even though the client has not sent any data in the SYN packet. The TCP specification (RFC 793, Transmission Control Protocol) defines that the first data packet after SYN packets must increment the Initial Sequence Number (ISN) by 1.
* After the handshake operation, the client sends a packet containing 14 bytes of data to the server and sets the Push (PSH) and ACK bits on packet 6.
* Packet 7 is the first indication that something is wrong. The client's RTO value has expired while waiting for an ACK to arrive at packet 6. Packet 7 is a retransmission of packet 6.
* Packet 8 is also a retransmission. The server resent the SYN/ACK packet from the TCP handshake. It looks like the server did not receive the third packet of the handshake process. The server sets the Acknowledgment Number field value to 1 to request the handshake ACK packet from the client.
* The server constantly requests the third packet of the handshake. However, the client sent two packets with Sequence Number 1. The client retransmits the first data packet of the handshake instead of the last packet.

This problem cannot be solved by itself. The server will not accept 14 bytes of data until it sees that the handshake is resolved properly. To create a new connection attempt, the application that initiated the TCP connection to the RWhois (Routing Whois) service on port 4321 must be restarted.

---

### TCP Packet Structure

The TCP header is typically 20 bytes long, but the TCP header supports an Options field that can increase the header length.

#### Source Port Field

TCP source port is the listening port number open on the sender.

#### Destination Port Field

TCP destination port is the destination port number open on the receiver.

#### Stream Index [Wireshark Field]

Flow Index is not an actual field in the TCP header. The Stream Index value is defined by Wireshark and can be used to quickly filter a TCP conversation.

#### Sequence Number Field

This field contains a number that uniquely identifies the TCP segment (the data following the TCP header is called a TCP 'segment'). This sequence number provides an identifier for the TCP segment and allows receivers to determine when parts of a communication stream are missing. The sequence number increases with the number of data bytes contained in each packet.

#### Next Expected Sequence Number [Wireshark Field]

This field appears only in packets that contain data — this field does not appear in SYN packets or simple ACK packets. Wireshark examines the current packet Sequence Number and adds the number of data bytes to provide that number.

#### Acknowledgment Number Field

The Confirmation Number field is the next sequence number expected from the other side of the communication.It shows . An Acknowledgment Number field that is never incremented by a host simply indicates that no data was received by that host.

#### Data Offset Field

This defines the length of the TCP header. It is defined in 4-byte increments, so a value of 5 in this field indicates that the TCP header is 20 bytes long. We need this field because the TCP header length may vary depending on the TCP header options used. The TCP option field is often used to establish the Maximum Segment Size (MSS) during TCP connection setup.

#### Flags Field

The following list describes the flags used in the TCP header:

* Reserved: These three bits are set to zero.
* Nonce: The Nonce field works with ECN fields in the IP header. This functionality is described in RFC 3540, Robust Explicit Congestion Notification (ECN) Signaling with Nonces.
* **Congestion Window Reduced (CWR)**: delay is set by the data sender to notify the data receiver that Congestion has been reduced.
* **URG (Urgent):** Indicates that the Urgent Pointer field should be examined; The Immediate Pointer field is located after the TCP Checksum field and is set to 0x0000 when not in use. The Immediate Pointer field is processed only when this bit is set.
* ACK (Acknowledgment): Confirmation package
* PSH (Push): Skip buffering and push data directly to the network Do not buffer incoming data — push directly to the application
* RST (Reset): Explicitly close the connection
* SYN (Synchronize): Synchronize sequence numbers — used in the handshake process
* FIN (Finish): Process completed, connection termination

#### Window Field

This field indicates the size of the TCP receiver buffer in bytes. A window size of 0 indicates that the receiver has no available buffer space. The maximum value that can be displayed in this two-byte area is 65,535. Window scaling (created during the TCP handshake process) allows hosts to use larger window sizes. For all packets with a Window Size field value less than 65535, the display filter is tcp.window\_size < 65535.

#### Checksum Field

TCP checksum is performed on the contents of the TCP header and data (data link padding is not included), as well as a pseudo-header derived from the IP header. See RFC 793 for more information.

#### Urgent Pointer Field

This field is valid only if the URG bit is set. If the URG bit is set, the receiver must examine this field to see where to look/read first in the packet. This is not a common function. The display filter for all packets containing the Urgent Pointer field is tcp.urgent\_pointer. Wireshark will not display this field unless the urgent bit is set to 1.

---

### Filtering TCP Traffic

In TCP Traffic, the capture and display filter syntax is simply *tcp*.

* tcp.srcport==21 — FTP response (assuming FTP is running on port 21)
* tcp.dstport==80 — Traffic directed to port 80 (HTTP mostly works on port 80)
* tcp.hdr\_len > 20 — TCP headers containing one or more options
* (tcp.window\_size < 1460) && (tcp.flags.fin==0) && (tcp.flags.reset==0) — TCP window size smaller than an MSS in a packet with the RST bit not set — this slows down the data transfer process; windows updates are required to recover — for example, look for such packages in the http-download-good.pcapng trace file.
* !(tcp.flags.cwr==0) || !(tcp.flags.ecn==0) —Packets with the Congestion Reduced flag or ECN-Echo flag set.
* tcp.options.mss\_val < 1460 — TCP MSS setting is less than 1,460 bytes (this will be seen during the handshake process)
* tcp.options.wscale\_val — TCP window scale option available in TCP header.
* tcp.analysis.flags — Packets flagged with TCP problems or notifications (does not work if Analyze TCP Sequence Numbers is disabled in TCP preferences)
* tcp.analysis.lost\_segment — A lost segment was detected before this packet – one of many individual TCP analysis flags available. Use the autocomplete feature (tcp.analysis.) - include period - or Expressions to display other TCP analysis flags

---

### References

* Wireshark Network Analysis, Second Edition, Laura Chappell, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>