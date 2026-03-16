---
title: "HTTP Wireshark Analysis"
date: 2024-08-04
draft: false
---

---

### HTTP Wireshark Analysis

Hello, in this article I will try to explain the HTTP protocol and its analysis with Wireshark.

---

### What is HTTP?

Hypertext Transfer Protocol (HTTP) is called “distributed hypermedia information distribution application”. HTTP is the application used when a person browses the internet. HTTP uses a request/response model.

![](https://cdn-images-1.medium.com/max/800/1*lpMM04aqUuEX3GMKaDsawQ.png)

HTTP and HTTPS use TCP transport

HTTP v1.0 is not used as frequently as HTTP v1.1, the current version in use. HTTP v1.1 is covered in RFC 2616, Hypertext Transfer Protocol — HTTP/1.1.

---

### HTTP Traffic Analysis

Normal HTTP communications use the request/response communication style. Clients make requests to HTTP servers and servers respond with Status Codes.

![](https://cdn-images-1.medium.com/max/800/1*OrN2W6uGR9b__wtBdJotrw.png)

HTTP uses a request/response pattern

Once the TCP connection is successfully established, the client makes an HTTP GET request for “/”. The server responds with a 200 OK status code and starts sending the contents of the [www.facebook.com](http://www.facebook.com) homepage to the client.

All HTTP Status Codes seen in http-facebook.pcapng are good - all 200 OK. The HTTP Status Code Registry is kept at [www.iana.org/assignments/http-status-codes](http://www.iana.org/assignments/http-status-codes). Available Status Codes are listed below.

#### 1xx Informational

* 100 Continue [RFC2616]
* 101 Switching Protocols [RFC2616]
* 102 Processing [RFC2518]

#### 2xx Success

* 200 OK [RFC2616]
* 201 Created [RFC2616]
* 202 Accepted [RFC2616]
* 203 Non-Authoritative Information [RFC2616]
* 204 No Content [RFC2616]
* 205 Reset Content [RFC2616]
* 206 Partial Content [RFC2616]
* 207 Multi-Status [RFC4918]
* 208 Already Reported [RFC5842]
* 226 IM Used [RFC3229]

#### 3xx Redirection

* 300 Multiple Choices [RFC2616]
* 301 Moved Permanently [RFC2616]
* 302 Found [RFC2616]
* 303 See Other [RFC2616]
* 304 Not Modified [RFC2616]
* 305 Use Proxy [RFC2616]
* 306 Reserved [RFC2616]
* 307 Temporary Redirect [RFC2616]
* 308 Permanent Redirect [RFC-reschke-http-status-308–07]

#### 4xx Client Error

* 400 Bad Request [RFC2616]
* 401 Unauthorized [RFC2616]
* 402 Payment Required [RFC2616]
* 403 Forbidden [RFC2616]
* 404 Not Found [RFC2616]
* 405 Method Not Allowed [RFC2616]
* 406 Not Acceptable [RFC2616]
* 407 Proxy Authentication Required [RFC2616]
* 408 Request Timeout [RFC2616]
* 409 Conflict [RFC2616]
* 410 Gone [RFC2616]-
* 411 Length Required [RFC2616]
* 412 Precondition Failed [RFC2616]
* 413 Request Entity Too Large [RFC2616]
* 414 Request-URI Too Long [RFC2616]
* 415 Unsupported Media Type [RFC2616]
* 416 Requested Range Cannot be Satisfied [RFC2616]
* 417 Expectation Failed [RFC2616]
* 422 Unprocessable Entity [RFC4918]
* 423 Locked [RFC4918]
* 424 Failed Dependency [RFC4918]
* 425 Reserved for WebDAV — see IANA list [RFC2817]
* 426 Upgrade Required [RFC2817]
* 428 Precondition Required [RFC6585]
* 429 Too Many Requests [RFC6585]
* 431 Request Header Fields Too Large [RFC6585]

#### 5xx Server Error

* 500 Internal Server Error [RFC2616]
* 501 Not Implemented [RFC2616]
* 502 Bad Gateway [RFC2616]
* 503 Service Unavailable [RFC2616]
* 504 Gateway Timeout [RFC2616]
* 505 HTTP Version Not Supported [RFC2616]
* 506 Variant Also Negotiates (Experimental) [RFC2295]
* 507 Insufficient Storage [RFC4918]
* 508 Loop Detected [RFC5842]
* 510 Not Extended [RFC2774]
* 511 Network Authentication Required [RFC6585]

If an HTTP client has recently visited a page and that page is cached locally, the client can send the IfModified-Since parameter and provide the date and time when the previous page was downloaded. If the server responds with 304 Not Modified, the server will not resend the already cached page. This is an important part of HTTP to understand when analyzing HTTP performance.

#### HTTP Statistics

Wireshark monitors HTTP statistics for payload distribution, packet counters, and HTTP requests. Statistics | Select HTTP and choose the type of statistics you are interested in.

An option is provided to apply a display filter to the statistics. For example, if you have a trace file that contains web browsing sessions to many hosts, you can filter “*http.host==*[*www.wireshark.org*](http://www.wireshark.org)*”* to examine statistics for web browsing sessions only to [www.wireshark.org](http://www.wireshark.org).You can apply it.

![](https://cdn-images-1.medium.com/max/800/1*9wkbOuaZAyEIRxnP9eAtzQ.png)

Statistics

HTTP Load Distribution lists HTTP requests and responses by server. Expanding the HTTP Requests by HTTP host section lists the hosts contacted and the number of request packets sent to each.

The HTTP Load Distribution statistic is an excellent resource for identifying website redirects and dependencies.

![](https://cdn-images-1.medium.com/max/800/1*nol9M0Y4tZhIQSfzlR0wgA.png)

HTTP payload distribution

When we browse to [www.espn.com](http://www.espn.com) in the figure, we see the HTTP redirects and dependencies.

![](https://cdn-images-1.medium.com/max/800/1*KYKO1fj8c3rUSDlHeYenFw.png)

HTTP Packet Counter

HTTP Packet Counter is very valuable because it lists the Status Code  
answers. Detecting 4xx Client Error or 5xx Server Error responses is simple. The figure shows the HTTP Packet Counter for another browsing session to [www.espn.com](http://www.espn.com) (httpespn2007.  
pcapng). We can see some HTTP 301 and 302 redirects and a 404 Not Found response.

![](https://cdn-images-1.medium.com/max/800/1*2YKXJLq89yAY7hD0U-wqzQ.png)

HTTP Requests

HTTP Requests lists each item requested from each HTTP server. In the figure, we examine HTTP Requests Requests sent to [www.espn.com](http://www.espn.com) during our Web browser session.

---

### HTTPS Traffic Analysis

Your web analysis will likely include analysis of HTTPS communications. At the beginning of a secure HTTP conversation, a standard TCP handshake is followed by a secure handshake.

RFC 2818 defines the use of HTTP over Transport Layer Security (TLS) for secure communications. RFC 2246 details Transport Layer Security version 1.0, which is based on SSL version 3.0. Although there is little difference between TLS 1.0 and SSL 3.0, the two are not interoperable

HTTPS communication begins with a TCP handshake on the port to be used for secure communication. In our example, we are using standard HTTPS port 443. If you use another port for SSL/TLS traffic, add these ports to the HTTP preferences setting for SSL/TLS ports. Port 443 is defined by default.

![](https://cdn-images-1.medium.com/max/800/1*XjCeq6WCg-sCh-bmywOeXg.png)

What is FTP? Use the ssl.record.content\_type==22 display filter to view the TLS handshake

In HTTPS communications, a TLS handshake occurs after the TCP handshake. The TLS handshake consists of a series of packets with a content type value of 22. Use the *ssl.record.content\_type==22* filter to view TLS handshake packets as shown in Figure.

The TLS handshake allows peers to agree on security parameters for exchanging data and verify their identities. Additionally, errors during the handshake process are transmitted in TLS handshake packets.

This handshake process includes the following types of traffic:

* **Session identifier**: identifies a new or ongoing session
* **Peer certificate**: X509 certificate
* **Compression method**: compression method for data before encryption
* **Cipher spec**: defines the data encryption algorithm
* **Master secret**: 48 bytes of secret information shared between client and server

![](https://cdn-images-1.medium.com/max/800/1*nfOsRO6Q1iAWlV1OKsGsUw.png)

The client lists 34 supported cipher suites; the server will choose which one to use

The first packet of the TLS handshake, Packet 4 in the Figure, is a Client Hello as specified in the handshake protocol field. The client also indicates that it is using TLS version 1.0.

In the Random section, this package includes the Universal Coordinated Time (UTC) in the client provided in UNIX format. The Session ID field is set to 0, indicating that this is a new session. If the Session ID field contains a non-zero value, this is a restarted session.

This packet also contains 28 random bytes. This random set of bytes will then be sent again during the handshake, but will then be encrypted with the server's public key

The client provides a list of cipher suites supported by the browser. In this case, the client supports 34 cipher suites and lists them all in the client hello packet as shown in Figure. Ultimately, the server will decide which cipher suite to use, butn upper password is the client's choice.

Extensions add functionality to TLS. The presence of extensions is detected as there are bytes following the Compression Methods field at the end of the Client Hello packet.

An extension provides the server name, in this case [www.bankofamerica.com](http://www.bankofamerica.com). The server name extension allows the client to create a secure connection to a virtual server that can be hosted on a machine that supports multiple servers on a single IP address.

![](https://cdn-images-1.medium.com/max/800/1*n8YUEDlR5Fog8x16NgsNSg.png)

Pack 10

In packet 10, the Server responds with a packet of three functions:   
Server Hello, Certificate and Server Hello Done.

In the Random part, the server provides 28 random bytes and a 32-byte Session ID value to allow the client to reconnect later. This random set of bytes will then be sent again during the handshake, but will then be encrypted with the client's public key. These random bytes are used for key generation.

Among the 34 cipher suites offered, the server chose TLS\_RSA\_with\_RC4\_128\_MD5 (0x0004), which means:

* The RSA public key algorithm will be used to verify certificate signatures and exchange keys.
* RC4 encryption algorithm will be used to encrypt exchanged data.
* The 128-bit MD5 hash function will be used to verify the content of exchanged messages.

This second packet of the handshake process also contains the certificate from the server. Within the same packet is the phrase Server Hello Done to indicate that the server has completed the Hello process.

![](https://cdn-images-1.medium.com/max/800/1*L6vYPqYmakuATBNGQPSBnQ.png)

Pack 12

Packet 12 shown in the figure is the next packet from the client. This packet indicates that the client calculates a premaster secret from both client and server random values. The Change Cipher Spe assignment indicates that all messages coming from the client will be encrypted using the defined keys and algorithms.

![](https://cdn-images-1.medium.com/max/800/1*5-SH0IZAQCnHR0hROkZ1Uw.png)

Pack 14

In packet 14, the unencrypted part of the handshake process ends with the server indicating that all messages it sends will also be encrypted.

#### Decrypting HTTPS Traffic

In order for Wireshark to decrypt HTTPS traffic, we need to have the RSA key and configure Wireshark to use it.

To decrypt this data, we need the private key of the server certificate. To retrieve the private key, you need to access the server; You cannot retrieve the private key from the client side of the communication. Since our example uses a browsing session to Bank of America's website and we have no way of obtaining the key, we will focus on another HTTPS trace file provided with the key.

In November 2009, PhoneFactor’s Steve Dispensa and Marsh Ray wrote an 8-page overview of the security issues surrounding the TLS renegotiation process. Security issues have been demonstrated against recent versions of Microsoft IIS and Apache HTTPD. In essence, the described renegotiation attack method is used to inject malicious code into the “secure” connection.

In the example below, we are working with the client\_init\_renego.pcap file provided as an attachment to the PhoneFactor document. Additionally, PhoneFactor has provided an RSA key named ws01.mogul.test.key.

![](https://cdn-images-1.medium.com/max/800/1*UGaIEdpGL4TRQ8etJgQN0g.png)

Enter the path to the RSA key file to decrypt traffic

To decrypt HTTPS traffic, we copied the RSA key to a \keys directory on the local Wireshark host. In order for Wireshark to recognize the key, we must configure the SSL preferences to recognize the speech we want to decrypt and point to the \keys directory. Wireshark's RSA keys list setting includes the IP address of the server, the port used for encrypted communication, the name of the application being encrypted, and the key name as well as the path to the key.

The figure shows the settings used to decrypt this file. Notice that the Protocol column indicates TCP, SSL, or TLSv1. We cannot see decrypted traffic yet.

![](https://cdn-images-1.medium.com/max/800/1*MP7YsmkIUYyh5XdMFlEUTw.png)

Once the key is configured and applied, we can see the HTTP communication clearly

The figure shows the results of applying the switch. protocolIn the ol column we still see TCP and TLSv1, but we also see HTTP listed for decrypted traffic. In addition, we can now right-click on an HTTP packet listed in the Packet List pane and select *Follow SSL Stream* to see the communication clearly

When you decrypt TLS traffic (just like when you decrypt WLAN traffic), a tab appears just below the Packet Bytes pane, as shown in the figure. Click the *Decrypted SSL data* tab to view the decrypted traffic in the Packet Bytes pane. This tab will only appear when you (a) decrypt the traffic and (b) make the Packet Bytes pane visible.

---

### HTTP Errors Analysis

HTTP communication problems can occur due to problems with site name resolution, problems with the TCP connection process, HTTP requests for non-existent pages or elements, packet loss, and congestion on the HTTP server or client.

Everyone has typed in the wrong website address at one time or another. If the site name cannot be resolved, you cannot access the site. This creates a DNS Name Error. It's important to pay attention to DNS traffic when analyzing web browsing problems.

Additionally, HTTP connection problems can occur when the HTTP daemon is not running on the web server. When the HTTP daemon is not running on the server, the server responds to the client's SYN with a TCP RST/ACK. Connection cannot be established.

![](https://cdn-images-1.medium.com/max/800/1*eAvT4-k9dlHwViEHYgBIxA.png)

Additionally, HTTP connection problems can occur on the web server when multiple failed HTTP connection attempts create a stripe pattern in Wiresharkdaemon.

This should be monitored carefully as the SYN — RST/ACK pattern is seen during a port scan operation as shown in the figure.

If the HTTP client successfully connects to the HTTP server, but then requests a page that does not exist, HTTP 404 Not Found errors are generated by the web server.

Some redirect services replace the standard 404 Not Found message with suggested links or redirect the HTTP client to another site entirely. Create a coloring rule for HTTP client and server errors using http.response.code >= 400.

![](https://cdn-images-1.medium.com/max/800/1*Gy6gBNz0W8u_QdGzPmZ-OQ.png)

frys.com server responds with an internal server error

The figure shows an issue when opening a list of laptops for sale on the [www.frys.com](http://www.frys.com) website. We were able to resolve the IP address of the site and the page exists. By following the TCP flow we can see that the server responds with the page title. However, laptop items are not displayed on the page; page is blank.

When we look at the trace file, we can see that the [www.frys.com](http://www.frys.com) web server is reporting an internal server error. This is not a problem with the customer's system or network. This issue is most likely caused by a database issue in Fry's web services infrastructure.

Open the http-fault-post.pcapng file and set the Time column to Seconds Since Previous Displayed Packet. Note that there is a large delay before packet 29. Be careful here. The FIN bit is set in the 29th packet. This indicates that the client has finished sending information to the server. These packets (and packets with the Reset bit set) can be triggered long after the user has finished receiving the required data. The user does not notice this delay, so do not waste your time removing delays before packets marked with the FIN (or Reset) bit.

![](https://cdn-images-1.medium.com/max/800/1*5T1I_7MbqgFJ_G0DjnkpMA.png)

The client's POST fails, indicating a web server issue

We are trying to fill out an online form as follows (http-fault-post.pcapng). But when the Submit button is clicked, the client system seems to crash. In this case, we can look at the HTTP traffic and observe the 403 Forbidden status code coming from the server. When we follow the TCP stream, we see clear text and HTML tags with more information about the state (we removed the HTML tags):

“The page cannot be displayed — you attempted to execute a CGI, ISAPI, or other executable program from a directory that does not allow programs to be executed.”

Again, the issue does not appear to be a client issue and we do not consider TCP transfer errors to be an issue. The problem is on the server.  
When troubleshooting web browsing issues, look for TCP errors before focusing on HTTP traffic.

---### **HTTP Packet Structure**

HTTP packets are of variable length. In this section we list some important fields in the HTTP packet structure. HTTP requests consist of a Method that defines the purpose of the HTTP request. HTTP responses contain a numeric response code called a Status Code.

![](https://cdn-images-1.medium.com/max/800/1*AU90ZRoS-ZXyas8DmkoIaQ.png)

An HTTP GET request packet for the Facebook homepage

The figure shows a GET request for the main Facebook page. The GET request contains the name of the target host, details about the browser sending this GET request, and information about what data types and format the browser will accept.

#### **HTTP Methods**

Methods, also called HTTP methods, define the purpose of the HTTP packet.

* GET: Retrieves information identified by the URI (Uniform Resource Indicator) field
* HEAD: Retrieves metadata about the requested URI
* POST: Sends data to HTTP server
* OPTIONS: Sets the options associated with a resource
* PUT: Sends data to HTTP server
* DELETE: Deletes the resource identified by URI
* TRACE: Invokes a remote loopback so the client can see what the server received from the client; this is rare because many companies disable it to protect against Cross-Site Tracking vulnerability
* CONNECT: Connects to a proxy device.

####Host

The host field is required in all HTTP/1.1 request messages. The host field identifies the target internet host and port number of the requested resource. In our previous example, the host is [www.facebook.com](http://www.facebook.com%27). If no port number is specified, the default port for the service (for example, port 80 for HTTP) is used.

#### Request Modifiers

HTTP requests and responses use request modifiers to provide details about the request. Listed below are the more commonly used request modifiers:

* **Accept**: Acceptable content types
* **Accept-Charset**: Acceptable character sets
* **Accept-Encoding**: Acceptable encodings
* **Accept-Language**: Acceptable languages
* **Accept-Ranges**: The server can accept range requests
* **Authorization**: Authentication information for HTTP authentication
* **Cache-Control**: Caching directives
* **Connection**: Connection type preferred by the user agent
* **Cookie**: HTTP cookie
* **Content-Length**: Length of the request body (bytes)
* **Content-Type**: Mime type of the body (used with POST and PUT requests)
* **Date**: Date and time the message was sent
* **Expect**: Defines the server behavior expected by the client
* **If-Match**: Take action if the information provided by the client matches
* **IfModified-Since**: Provide date/time of cached data; if up to date 304 Not Changed
* **If-Range**: Request for missing information range
* **If-Unmodified-Since**: Send only if not modified since specific date/time
* **Max-Forwards**: Limit the number of transmissions via proxies or gateways
* **Proxy-Authorization**: Authorization credentials for proxy connection
* **Range**: Claim only part of an asset
* **Referer**: The address of the previous website that links to the current website
* **TE**: Transfer encodings accepted
* **UserAgent**: User agent — typically browser and operating system
* **Via**: Passed proxies

---

### Filtering HTTP/HTTPS Traffic

The filtering syntax for HTTP or HTTPS traffic is *tcp port http* or *tcp port https*.

* http.request.method==”GET” or http.request.method==”POST” — HTTP GET or POST requests
* http.response.code > 399 — HTTP 4xx or 5xx (client or server errors)
* http contains “IfModified-Since” — Determining whether a client has already cached a page.
* http.host==”www.wireshark.org” — Target host [www.wireshark.org](http://www.wireshark.org)
* http.user\_agent contains “Firefox” — The HTTP client uses the Firefox browser.
* http.referer contains “wireshark.org” — HTTP client reached current location from a link in wireshark.org
* tcp.port==443 — SSL-Secure Socket Layer (secure session)
* ssl.record.content\_type==22 — TLSv1 handshake
* ssl.handshake.type==1 — TLSv1 Client Hello in handshake
* ssl.handshake.type==16 — TLSv1 Client Key exchange
* ssl.record.content\_type==20 — TLSv1 Change Cipher Spec
* http.content\_type contains “ocsp” — Online Certificate Status Protocol (OCSP) is used

---

### Exporting HTTP Objects

To save downloaded objects when using HTTP, click File | Export Objects| Select HTTP. When you export HTTP objects, the original object name is preserved.

![](https://cdn-images-1.medium.com/max/800/1*MQa1Gu3-dpFdafp7wg2lQA.png)

We can export objects downloaded from a site

We can save objects to our computer via this menu.