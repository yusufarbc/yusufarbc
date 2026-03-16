---
title: "Network Management and Security IV: Network Security Technologies"
date: 2025-08-10
draft: false
---

---

### Network Management and Security IV: Network Security Technologies

![](https://cdn-images-1.medium.com/max/800/1*Fhet-NIJbKlNzPESUc1Ttw.png)

The complexity of digital infrastructures and the sophisticated nature of cyber threats have necessitated a radical transformation in network security approaches. The traditional “castle and moat” perimeter security model strongly guarded the boundaries of the network, assigning implicit trust to every entity within. However, with the rise of modern IT paradigms such as cloud computing, mobility, remote working and the Internet of Things (IoT), this clearly defined network perimeter has become increasingly blurred. In these distributed and dynamic environments, the inability of the traditional model to prevent threats has led to the adoption of more integrated and identity-centered architectures such as defense-in-depth and Zero Trust.

This evolution represents a fundamental shift from reactive defense mechanisms to proactive control strategies. Initially, it was considered sufficient to place a firewall around the network, assuming that the threats were largely external. However, when attackers began to target the application layer (OSI Layer 7) to bypass this defense, tools that could go deeper and analyze the content, such as Web Application Firewalls (WAF) and Intrusion Prevention Systems (IPS), were needed. With the increasing ability of threat actors to steal credentials and exploit insider threats, it has become clear that even a user or device inside the network cannot be trusted by default. This awareness has formed the basic philosophy of the Zero Trust architecture, which stipulates that every access request must be dynamically verified and authorized, regardless of who and where it comes from. Therefore, the evolution of network security technologies is not only a technical advance, but also a concrete reflection of a philosophical shift towards the concept of “trust”. This report aims to comprehensively examine today's network security technologies within the framework of these modern paradigms, at the level of architecture, protocol and strategy.

---

### Chapter 1: The Cornerstone of Network Border Security: Firewall Technologies

Firewalls are the most basic and indispensable components of network security architectures. Their job is to monitor and control incoming and outgoing network traffic based on predefined security rules. The evolution of technology has enabled this fundamental task to be accomplished in increasingly sophisticated ways.

### 1.1. An Evolutionary View: From Packet Filtering to Stateful Inspection

The first generation of firewalls were based on stateless packet filtering technology. This approach operates at layers 3 (Network) and 4 (Transport) of the OSI model, evaluating each network packet independently of the others. The decision mechanism is based on static information contained in the header of the packet: source IP address, destination IP address, source port number, destination port number and the protocol used. Although this simple and fast method provides basic access control, it has significant vulnerabilities. Its biggest weakness is its inability to understand the context of the link. For example, an attacker can easily spoof this type of firewall by spoofing the source IP address (IP spoofing) or inserting a fake “reply” packet in the middle of a TCP session.

As a solution to these vulnerabilities, **stateful inspection** or also known as **dynamic packet filtering** technology has been developed. This technology has revolutionized network security by introducing the concepts of "memory" and "context". While stateless firewalls treat each packet as isolated, stateful firewalls actively monitor the status of network connections. It does this by storing the information of all ongoing sessions in a structure called **state table** or **connection table**.

In the example of a TCP connection, this process works like this:

1. A client on the internal network sends a `SYN` packet to initiate a connection to a server on the external network. The stateful firewall sees this outgoing packet and adds a new entry to the state table. This entry contains information such as source and destination IP/port information, protocol (TCP) and the status of the connection (`SYN_SENT`).
2. The server responds to this request with a `SYN-ACK` packet. The firewall checks the status table for this incoming packet and checks if it corresponds to an entry. When it finds a match, it allows the packet to pass through and updates the connection status in the table to `ESTABLISHED`.
3. If an unwanted 'SYN-ACK' packet arrives from outside, which does not correspond to an internally initiated connection, the firewall automatically rejects this packet because it cannot find a match in the status table. This blocks many types of attacks that stateless firewalls are vulnerable to.
4. When the connection is terminated with `FIN` or `RST` packets, the relevant entry is removed from the state table and the ports are closed again.

This “memory” mechanism allows the firewall to make decisions based not only on static rules but also on the logical integrity of legitimate communication flows in the network. This is a concept that laid the foundation for later anomaly detection and behavioral analysis technologies.

### 1.2. Next Generation Firewalls (NGFW): In-Depth Analysis at the Application Layer

Although stateful inspection has significantly increased network security, it remains blind to threats at the application layer (Layer 7). A traditional stateful firewall assumes that traffic passing through port 80 or 443 is HTTP or HTTPS, but cannot understand what that traffic contains or which specific application (e.g. Facebook, YouTube, Skype) it belongs to. **Next-Generation Firewalls (NGFW)** have been developed to fill this gap.

While NGFWs have all the capabilities of stateful inspection, their most distinctive feature is **Deep Packet Inspection (DPI)** technology. DPI analyzes not only the header information of network packets, but also the payload. In this way, regardless of the port number, it can detect which application the traffic belongs to and even which feature of the application is used. This capability is called **application awareness** and provides revolutionary granularity in security policies. For example, instead of a broad rule like “Allow all traffic from port 80,” an NGFW can create much more specific and effective policies like “Allow all employees to use LinkedIn, but prevent file uploads” or “Allow YouTube access, but prohibit video downloads.”

Additionally, modern NGFWs often offer additional security modules such as the **Intrusion Prevention System — IPS** on an integrated platform. This provides an additional layer of protection by detecting and proactively blocking attack signatures intended to exploit known vulnerabilities.

### 1.3. NGFW’s Advanced Capabilities: SSL/TLS Inspection and Sandbox Analysis

Threat actors are increasingly using encrypted traffic (SSL/TLS) to disguise malware and command-and-control (C2) communications. This makes content-based control mechanisms such as DPI and IPS ineffective because the contents of the encrypted packet cannot be seen. NGFWs overcome this problem with the **SSL/TLS Inspection** capability.

SSL/TLS inspection is based on the principle that NGFW is positioned as a legitimate “Man-in-the-Middle — MitM” between the client and the server. The process works like this:

1. The client sends a connection request to an HTTPS server.
2. NGFW intercepts this request and establishes an SSL/TLS session with the server on behalf of the client. The server sends its certificate to NGFW.
3. NGFW verifies the server's certificate. It then generates a new certificate that impersonates the server, which it signs on the fly with its own root certificate (Root CA), and presents it to the client.
4. In order for the client to accept this fake certificate, NGFW's root certificate must be pre-installed in the client's “Trusted Root Certification Authorities” store.
5. Once the client accepts the certificate, a second encrypted tunnel is established between NGFW and the client.
6. From this point on, NGFW decrypts the traffic coming from the client, checks the content according to security policies (DPI, IPS, Antivirus, etc.), if there is no harmful content, encrypts it again and transmits it to the server. It performs the same process in reverse for responses from the server.

While this mechanism provides full visibility into threats hiding within encrypted traffic, it also introduces a significant privacy and management issue. The technical “breaking” of privacy to increase security is a subject of legal and ethical debate, especially in highly regulated industries such as finance and healthcare. It creates a gap.

To combat zero-day threats and advanced malware that cannot be detected by traditional signature-based methods, NGFWs use **Sandbox Analysis** technology. This technology runs suspicious or unknown files that enter the network (e.g., email attachments, web downloads) in a controlled virtual environment (sandbox) that is completely isolated from the main production network. In this virtual environment, the behavior of the file (file system changes, network connection attempts, registry manipulations, abnormal process initiation, etc.) is monitored in detail. If the file exhibits malicious behavior, it is marked as a threat, blocked from entering the network, and the threat intelligence database is updated by creating a signature for this new threat. However, advanced malware can use sandbox evasion techniques to determine whether the environment they are in is a sandbox or not. These techniques include checking for virtual machine artifacts (specific drivers, MAC addresses), circumventing analysis by time-based delays (e.g. exceeding the sandbox's analysis time by starting the malicious action after 10 minutes), or by waiting for user interaction (mouse movement, keyboard input).

### 1.4. The Science of Policy and Rules Management: Efficiency, Optimization, and the NIST Framework

An effective firewall is not just about hardware and software; It is also based on a well-structured set of rules and policies that are regularly reviewed and optimized. The basic principle of firewall management is the "deny-by-default, allow-by-exception" approach. This means that only traffic that is absolutely necessary for work is explicitly allowed, and everything else is blocked by default.

Over time, as corporate networks grow and the number of applications increases, firewall rule sets become more complex. This can lead to anomalies such as **shadow rules** (rules overridden by a higher rule), **redundant rules** (rules belonging to systems or applications that are no longer used), and **conflicting rules**. Such rule anomalies both degrade the performance of the firewall and create potential security vulnerabilities. Therefore, a critical best practice is to audit rule sets regularly (for example, quarterly), purge unused or unnecessary rules, and put the rules in a logical order (such as placing the most frequently matching rules at the top).

![](https://cdn-images-1.medium.com/max/800/0*MyFNGDm32b4GFCmw)

NIST

Organizations such as the US National Institute of Standards and Technology (NIST) provide comprehensive frameworks for creating and managing firewall policies. These frameworks cover issues such as documenting rule changes, clearly stating the purpose of each rule, adhering to the principle of least privilege, and conducting regular audits.

### 1.5. Log Analysis and Computer Forensics: Extracting Meaning from Firewall Logs

Firewall logs are vital for understanding the security posture of a network, detecting threats, and performing forensics after a security breach. Each log record contains valuable information about a traffic flow on the network. A typical log contains the following fields: timestamp, action (allowed/blocked), protocol, source IP address, source port, destination IP address, and destination port.

By systematically analyzing these logs, various malicious activities can be detected:

* **Port Scanning:** A large number of blocked connection attempts from a single source to many different ports or destinations in a short period of time indicates a reconnaissance activity.
* **Unauthorized Access Attempts:** Constantly blocked connection logs to critical servers or services may be a brute-force attack or unauthorized access attempt.
* **Abnormal Bandwidth Usage:** An unexpectedly high volume of allowed traffic from a particular source or destination may be part of a data leak or DDoS attack.
* **Malware Activity:** Connection attempts from known malicious IP addresses or command-and-control servers may indicate that a system has been compromised within the network.

For effective log analysis, all firewall logs and logs from other network devices should be sent to a central **Security Information and Event Management (SIEM)** platform using a standard protocol such as **Syslog**. Syslog messages generally follow the format `<PRI>TIMESTAMP HOSTNAME: MESSAGE`; where the `<PRI>` value contains both the severity and source (facility) information of the message. For example, a message such as `%ASA-6-106100` produced by a Cisco ASA firewall includes the device type (ASA), severity level (6 - Informational), and specific event ID (106100). This structured data forms the basis for event correlation and automatic alert generation in SIEM platforms.

![](https://cdn-images-1.medium.com/max/800/1*B1xzRwD1QjcobyhgHaewZQ.png)

**Firewall Technologies Comparison**

### 1.6. DMZ Design Patterns: Single and Double Firewall Architectures

**DMZ (Demilitarized Zone)** is an intermediate network layer protected by firewalls located between an organization's internal network (LAN) and the outside world (usually the Internet). Its main purpose is to create an additional layer of security by isolating servers that need to be accessed from the outside (such as web servers, e-mail servers) from critical systems in the internal network. In this way, attackers are prevented from directly infiltrating the internal network in the event of a possible cyber attack.

There are basically two popular design patterns for creating DMZs:

#### **Single Firewall (Three-Legged Model):**

In this architecture, a single firewall with at least three network interfaces is used. Each interface connects to a different network:

* **External Leg:** Connected to the Internet.
* **Internal Leg:** It is connected to the organization's private internal network (LAN).
* **DMZ Leg:** Depends on the servers in the DMZ network.

The firewall manages traffic between these three legs according to predefined rules. For example, requests from the internet are only allowed to access certain ports of the web server in the DMZ (e.g. 80 for HTTP, 443 for HTTPS), while connections initiated from the DMZ to the internal network are generally blocked.

![](https://cdn-images-1.medium.com/max/800/0*MY9iINeS9IzeD6mt)

Three-Legged Model

**Advantages:**

* It is lower cost.
* Installation and management are simpler.

**Disadvantages:**

* A single firewall creates a single point of failure for the security of the entire network. If the firewall is compromised, the entire network is at risk.

#### **Dual-Firewall Model:**

This more secure approach uses two separate firewalls:

* **External Firewall (Frontend Firewall):** It is placed between the Internet and the DMZ. It is configured to allow traffic from the Internet to only reach servers in the DMZ.
* **Internal Firewall (Backend Firewall):** It is positioned between the DMZ and the internal network. This firewall controls access from the internal network to the DMZ and, more importantly, from the DMZ to the internal network, with much stricter rules. Generally, only certain requests initiated from the internal network and made to servers in the DMZ are allowed.

![](https://cdn-images-1.medium.com/max/800/0*RYT2WgTFAYQUGQ8s)

Dual-Firewall Model

**Advantages:**

* Offers a layered security approach. If an attacker breaches the external firewall, he or she must face a second obstacle to reach the internal network.
* By using firewalls from different manufacturers (vendor diversity), the possibility of a single vulnerability affecting both walls can be reduced.

**Disadvantages:**

* It costs more.
* More complex to configure and manage.

### 1.7. Secure Server Placement: Which Servers Should Be in the DMZ?

The general rule is that all servers that need to accept direct connections from the outside world are placed in the DMZ. Servers on the internal network that contain sensitive data should definitely not be in the DMZ.

#### **Common Server Types to Place in DMZ:**

* **Web Servers:** These are the servers that host the institution's website and must accommodate visitor traffic from the internet.
* **E-mail Servers (Mail Gateway/Relay):** These are the servers that receive e-mails from outside and forward them to the mail server in the internal network or forward the e-mails sent from the internal network to the outside world. Real mailboxes and sensitive emails should be kept on servers on the internal network.
* **FTP Servers:** These are servers used to exchange files with external users.
* **DNS Servers (External):** Servers that translate domain names into IP addresses and are accessible from the outside world. What you need to know are the DNS servers.
* **Proxy Servers (Reverse Proxy):** These are servers that receive requests from the Internet and direct them to the appropriate application server in the internal network and provide an additional layer of security.
* **VPN Servers:** VPN termination points used for remote access can be located in the DMZ.

#### **Best Practices for Secure Server Deployment:**

* **Principle of Minimum Authority:** Access to the internal network by servers in the DMZ should be kept to an absolute minimum. Access to specific internal network servers should only be allowed over specific ports and protocols that are necessary. For example, a web server can access a database server on the internal network only through the database port.
* **Traffic Flow Direction:** Firewall rules should tightly control which direction connections can be initiated. Ideally, a server in the DMZ should never be allowed to initiate a new connection towards the internal network.
* **Database Servers Should Be Kept in the Internal Network:** Database servers containing sensitive information such as customer information and financial data should never be placed in the DMZ. These servers should be kept in an even more secure segment of the internal network and should only respond to specific requests from application servers in the DMZ.
* **Continuous Monitoring and Update:** Servers in the DMZ should be constantly monitored and security patches and updates should be applied without delay. Since the DMZ is the area most vulnerable to attacks, it is critical to secure these servers.
* **Certification and Authentication:** Strong authentication mechanisms and encryption should be used in communication between the DMZ and the internal network.

As a result, a properly designed DMZ architecture and careful server placement strategy significantly strengthens an organization's cybersecurity posture. This is a vital step in providing services to the outside while also protecting valuable assets inside.

---

### Chapter 2: Protective Shield of Web Applications: Web Application Firewall (WAF)

As web applications and APIs have become central to the business world, attacks targeting these platforms have increased and become more sophisticated. While traditional network firewalls (including NGFWs) are effective at protecting general network traffic, they may fall short of understanding threats specific to the complex logic and operation of web applications. At this point, **Web Application Firewall (WAF)**, which operates at the 7th layer of the OSI model, focusing especially on HTTP and HTTPS protocols, comes into play.

### 2.1. WAF Architecture and Working Principles: Positive and Negative Security Models

A WAF is typically positioned as a reverse proxy in front of the web server. In this architecture, all user requests coming from the outside world are first met by the WAF, passed through a security audit, and only requests deemed safe are forwarded to the web server in the background. This control is based on one or a combination of two basic security models (hybrid model):

1. **Negative Security Model (Blocklisting):** This model works on the “allow by default” principle and uses a blocklist containing known malicious patterns or signatures. For example, a WAF detects and blocks requests that contain strings such as `` OR '1'='1'`, which are frequently used in SQL injection attacks, or `<script>` tags, which are used in cross-site scripting (XSS) attacks. This model is easier to implement and has a lower risk of accidentally blocking legitimate traffic (false positives). However, its biggest weakness is that it only protects against known attack types and is ineffective against zero-day attacks that have not been seen before, that is, have no signature.
2. **Positive Security Model (Allowlisting):** This model adopts a much stricter principle such as “deny by default”. It only allows traffic patterns that are predefined, known and legitimate. This requires “teaching” the application all valid URLs, parameters, allowed character sets, and expected value ranges to the WAF. This model inherently provides much stronger protection against zero-day attacks because it sees anything unidentified as a potential threat. However, since it requires updating the WAF policy every time the application is updated or a new function is added, it is much more difficult to configure and maintain, and the risk of false positives is high.

The choice between these two models is a choice of information asymmetry and management burden. The negative model is based on the assumption “I know what the enemy looks like”, while the positive model is based on the assumption “I know what the friend is like”. This balance between security effectiveness and operational flexibility forms the basis of the WAF strategy.

### 2.2. Proactive Defense Mechanisms Against OWASP Top 10 Threats

One of the most basic and critical tasks of WAFs is to protect against the 10 most critical web application vulnerabilities regularly published by the Open Web Application Security Project (OWASP). WAFs have specialized control mechanisms that target these common attack vectors:

* **A03:2021 — Injection:** This category includes attacks such as SQL, NoSQL, OS command, and LDAP injection. A WAF analyzes the body, headers, and URL parameters of HTTP requests to detect malicious characters (for example, single quotes, semicolons, dashes) and patterns intended to manipulate database queries or operating system commands. For example, it detects an entry such as `username=admin'--` as an attempt to circumvent the logic of a SQL query and blocks it. Similarly, it filters dangerous HTML tags and JavaScript events such as `<script>`, `onerror`, `onload` in user inputs against Cross-Site Scripting (XSS) attacks.
* **A01:2021 — Broken Access Control:** This vulnerability occurs when users can access data or functions outside their authorization. A WAF can protect against such vulnerabilities by tracking user sessions and roles. For example, it can detect when a user tries to access another user's invoice (Insecure Direct Object References — IDOR) by manually changing the URL (by typing `/view?invoice_id=124` instead of `/view?invoice_id=123`). WAF can prevent such unauthorized access with rules that check whether `invoice_id=124` is associated with the user of the current session.

### 2.3. Combating Automated Threats: Advanced Bot Management and Rate Limiting

A significant portion of today's web traffic is generated by bots, which are automated software rather than human users. These bots can be used for legitimate purposes such as indexing sites by search engines, as well as for malicious purposes such as web scraping, credential stuffing, inventory consumption and application layer denial of service (DDoS) attacks.

Modern WAFs offer advanced bot management capabilities to combat these automated threats. These capabilities go beyond simple IP blocking and use a multi-layered detection mechanism:

* **Signature and Reputation Analysis:** Recognizes known good bots (like Googlebot) and bad bots through their IP addresses, User-Agent strings and behavioral signatures.
* **Behavioral Analysis:** Distinguishes between a human and a bot by analyzing a client's behavior such as mouse movements, page navigation speed, and timing between requests.
* **Device Fingerprinting:** Creates and tracks a unique fingerprint for each client by collecting information such as browser type, version, installed plug-ins and screen resolution.
* **Challenge Mechanisms:** Enforces human verification by offering tests such as CAPTCHA to suspicious traffic.

**Rate Limiting** is another critical WAF feature used especially against brute-force attacks and application layer DDoS attacks. This mechanism limits the number of requests from a single source (usually an IP address, but can also be more granular identifiers such as a session ID or API key) in a given time period. For example, a rule such as “no more than 10 requests per minute from each IP address” can be defined for a login page. Subsequent requests exceeding this threshold are blocked (mitigation timeout) or throttling for a certain period of time. This effectively prevents automated attack tools from making hundreds or thousands of attempts per second.

### 2.4. The Art of Fine Tuning: Strategies to Minimize the False Positive Rate

One of the biggest operational challenges of a WAF is that it mistakenly identifies legitimate and valid user traffic as attacks. This is called a **false positive** and not only negatively impacts the end user experience (blocking legitimate transactions) but also causes alert fatigue for security teams.

To resolve this issue, WAF policies need to be **fine-tuned** to the specific application it protects. This is a continuous and cyclical process. Although standard rule sets such as OWASP Core Rule Set (CRS) provide general protection, they must be customized for each application. The tuning process usually includes these steps:

1. **Observation Mode:** WAF is run in logging and alerting mode only, instead of blocking traffic at startup.
2. **Analysis:** By examining the logs collected over a certain period of time, it is determined which rules were accidentally triggered for which legitimate requests.
3. **Creating Exceptions:** Instead of completely disabling the rules that cause false positives, exceptions are defined for these rules. For example, a specific rule can be bypassed for requests coming from a specific URL path, a specific parameter, or a specific source IP address. This is the most efficient way to allow legitimate traffic without compromising security.
4. **Switching to Blocking Mode:** After the false positive rate is reduced to an acceptable level, the WAF is put into active blocking mode and the process is repeated regularly.

Changing rules files directly is strongly not recommended as it will result in loss of customizations in future updates. Instead, exception mechanisms provided by WAF platforms should be used.

---

### Chapter 3: Detecting Anomalies in Network Traffic: Intrusion Detection and Prevention Systems (IDS/IPS)

Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS), designed to detect malicious activities and policy violations by thoroughly analyzing network traffic, are critical components of modern cyber defense architectures. While IDS is a passive monitoring and warning mechanism (out-of-band), IPS has the ability to actively take part in traffic (in-line) and block threats as soon as they are detected.

### 3.1. Deep Dive into Detection Methodologies: Signature, Anomaly and Behavior Analysis

IDS/IPS systems basically use three different methodologies to detect threats. Each of these methodologies has its own advantages and disadvantages:

1. **Signature-based Detection:** This method looks for unique patterns (signatures) left in network traffic by known attacks, malware or vulnerability exploits. Just as an antivirus software recognizes known viruses by their signatures, IDS/IPS compares incoming/outgoing packets against a large database of attack signatures. When a match is found, an alert is generated (IDS) or the packet is blocked (IPS). This method is extremely fast and effective against known threats and has a low false positive rate. However, its biggest weakness is that it is completely blind to zero-day attacks that have never been seen before, that is, whose signature has not yet been created.
2. **Anomaly-based Detection:** Instead of looking for a specific attack signature, this approach learns the “normal” behavior of the network and flags deviations from this normal as a potential threat. The system creates a **baseline** by observing network traffic metrics (for example, bandwidth usage, protocols used, connection counts) over a period of time. Whenever a statistically significant deviation from this baseline profile is detected (for example, an unexpected increase in FTP traffic in the middle of the night), an anomaly alert is triggered. The biggest advantage of this method is its potential to detect new and unknown attacks without a signature. However, it tends to have a **high false positive rate** because it can also flag legitimate but unexpected network activity (for example, the deployment of a new application) as anomalies.
3. **Behavioral Analysis:** This is a more advanced form of anomaly-based detection. Rather than focusing solely on statistical deviations such as traffic volume, it analyzes the behavioral logic of protocols and applications. For example, when a DNS server transfers large amounts of data outward in a way it normally shouldn't, or when a web server tries to launch a command line (shell), the protocol detects violations or unexpected sequences of actions. This method can produce more accurate results than anomaly-based detection because it uses more context information.

![](https://cdn-images-1.medium.com/max/800/1*PjPS0Bfp8Mb94zqFwP74Dw.png)

**IDS/IPS Detection Methods Comparison**

### 3.2. Architecture of Open Source IDS/IPS Engines: Comparison of Snort, Suricata and Zeek (Bro)

The open source community has developed highly capable and widely used tools in the IDS/IPS space. These tools offer powerful alternatives to commercial solutions and represent different architectural approaches:

#### **Snort**

Developed in 1998, Snort is the world's most widely used NIDS/IPS and has become the industry standard. Its architecture basically consists of three components:

* **Packet Decoder** prepares raw packets coming from the network for analysis; **Detection Engine** analyzes these packets according to defined rules; and **Logging/Alerting Subsystem** records detected events or generates alerts. Snort is a rule-based system and traditionally
* **has a single-threaded architecture. This means that all operations are done sequentially on a single CPU core, which can cause performance bottlenecks on modern high-speed networks.

#### **Suricata**

Developed as a response to Snort's performance limitations, Suricata stands out with its **multi-threaded** structure, which is its most important architectural difference. This architecture allows Suricata to take full advantage of the power of modern multi-core processors. It performs parallel processing by distributing incoming packets across different threads, allowing it to analyze much higher traffic volumes without packet loss. Additionally, Suricata has **automatic protocol detection** capability. Instead of classifying traffic by port number like Snort (e.g. port 80 is HTTP), Suricata recognizes the protocol itself by analyzing the packet content. This provides a significant advantage in detecting malware traffic running on non-standard ports.

#### **Zeek (formerly Bro)**

Zeek has a fundamentally different philosophy than traditional signature-based IDS/IPSs. It is a Network Analysis Framework rather than an intrusion detection tool. Zeek's architecture consists of two main layers:

* **Event Engine** and **Script Interpreter**. The event engine captures raw network traffic and transforms it into high-level, meaningful **events**; for example, `http_request`, `dns_query`, `ssl_certificate` or `new_connection`. These events are then sent to the script interpreter, which executes policies written in a flexible and powerful scripting language. As a result, instead of simple "alert" messages, Zeek produces extremely rich, contextual and structured logs (e.g. `conn.log`, `http.log`, `dns.log`, `files.log`) of every activity occurring on the network.

This architectural difference represents an important step in the evolution of detection tools. Systems such as Snort and Suricata ask, “Has a known bad event (signature) occurred?” While focusing on the question, Zeek asks, “Exactly what kind of activities (events) are happening on my network?” It looks for an answer to the question. This transforms security analysis from reactive alarm tracking to proactive threat hunting to understand the full context and potential causes of an event.

### 3.3. Event Management and Alarm Correlation: Improving Signal-to-Noise Ratio

In high-volume networks, IDS/IPS systems can generate tens of thousands or even millions of alerts per day. A large portion of these alerts may be false positives or low priority events. This causes a serious operational problem for security analysts called **alert fatigue**. It can become impossible to distinguish real and significant threat signals among this noise.

To solve this problem, it is essential to send alerts from IDS/IPS to a central **SIEM** platform and combine them with logs from other security systems (firewall, proxy, endpoint, etc.). Using a technique called **event correlation**, SIEM can reveal a larger attack chain by correlating events from different sources that may seem meaningless on their own. For example, a SIEM correlation rule might detect a scenario like this:

1. **Event A:** IDS detects an external IP address (`1.2.3.4`) scanning a server (`10.0.0.5`) on the internal network. It produces a "Port Scan" warning.
2. **Event B:** After a few minutes, the firewall logs record numerous blocked connection attempts from the same source IP (`1.2.3.4`) to the same target server (`10.0.0.5`).
3. **Event C:** After a short time, IPS detects and blocks an attack signature that attempts to exploit a known web server vulnerability (for example, Apache Struts), also against the same source and target.

While these three events pose different levels of risk when taken individually, when combined by SIEM, they clearly indicate that an attacker is attempting a multi-step attack consisting of discovery, trial, and exploitation phases.

### 3.4. Balance of False Positives and False Negatives: Optimizing Detection Effectiveness

The effectiveness of IDS/IPS systems depends on how well they manage the balance between two types of errors:

* **False Positive:** Falsely marking legitimate network activity as malicious. This can disrupt business processes by causing unnecessary alarms and blocking of legitimate traffic on IPS systems.
* **False Negative:** When a real attack passes through the network without being detected. This is the most dangerous situation because it means that the security system has failed and a breach may have occurred.

There is often an inverse relationship between these two types of errors. Making the system more sensitive (enabling more rules, lowering anomaly thresholds) tends to reduce false negatives but increases false positives. Conversely, making the system less sensitive to reduce false positives increases the risk of missing real attacks (false negatives).

Optimizing this balance requires a continuous process of **tuning**. This process includes customizing rule sets based on the organization's specific network environment and risk appetite, regularly updating baselines for anomaly-based systems, and enriching alerts using contextual data such as external threat intelligence.

---

### Chapter 4: Secure Communication Tunnels: Virtual Private Networks (VPN)

Virtual Private Networks (VPN) are technologies used to securely access a private network over unsecured public networks (for example, the internet). VPNs provide confidentiality, integrity, and access control by encrypting and authenticating data. They are basically built on two different protocol families: IPSec and SSL/TLS.

### 4.1. IPSec Protocol Family: Cryptographic Analysis, Tunneling and Transport Modes of AH and ESP

**Internet Protocol Security (IPSec)** is a set of protocols that operate at the Network Layer, the 3rd layer of the OSI model, and provide security for IP packets. This means that IPSec protects transparently from all applications and protocols running on it (TCP, UDP, HTTP, etc.). IPSec uses two main security protocols:

1. **Authentication Header (AH):** Defined in RFC 2402, AH provides **connectionless data integrity**, **data source authentication** and **protection against replay attacks**. It does this with an HMAC (Hash-based Message Authentication Code) value calculated from the contents of the packet and the unchanging parts of the IP header. However, AH does not provide data confidentiality, i.e. **encryption**.
2. **Encapsulating Security Payload (ESP):** ESP, defined in RFC 4303, offers **data confidentiality (encryption)** in addition to all the security services provided by AH. ESP can operate in both encryption and authentication, encryption only, or authentication only modes, but using encryption without authentication is strongly discouraged.

These protocols can be implemented in two different modes:

* **Transport Mode:** In this mode, the security protocol (AH or ESP) is added between the original IP header and the IP payload. Only the IP payload (i.e. the Transport Layer segment) is preserved, the original IP header is left untouched. This mode is more efficient because it adds less overhead information and is often used to secure communication between two endpoints (host-to-host).
* **Tunnel Mode:** In this mode, the entire original IP packet (header and payload) is encrypted and/or authenticated. This protected packet is then fully encapsulated with a new external IP header. This mode is typically used to create a secure tunnel between two gateways (for example, two office routers) (site-to-site VPN) or for a remote user to connect to the corporate network (remote access VPN).

### 4.2. SSL/TLS Based VPN Solutions: Architecture and Comparative Analysis with IPSec

**SSL/TLS VPNs**, as the name suggests, use Secure Sockets Layer (SSL) and its successor Transport Layer Security (TLS) protocols, which were developed to secure web traffic. Unlike IPSec, SSL/TLS VPNs operate at higher layers of the OSI model, typically the Application Layer (Layer 7).

This architectural difference leads to important functional distinctions between the two technologies:

* **Access Granularity:** Since IPSec operates at the Network Layer, when connected to a client, it gives it full access to the entire network. This is the “everything or nothing” approach. SSL/TLS VPN, on the other hand, offers much more granular access control because it operates at the Application Layer. Administrators can grant users access to only specific web applications or file shares rather than the entire network.
* **Client Software:** IPSec VPNs often require special VPN software to be installed on client devices. Since SSL/TLS VPNs generally work through a standard web browser, they do not require additional software installation on the client side (clientless VPN), which makes them easier to deploy and use.
* **Network Compatibility:** Because IPSec uses certain protocols (protocol 50 for ESP, 51 for AH) and ports (UDP 500 for IKE), it can be blocked by restrictive firewalls or NAT (Network Address Translation) devices. SSL/TLS VPN, on the other hand, bypasses such network barriers more easily because it looks like standard HTTPS traffic (TCP port 443).

### 4.3. A Modern Alternative: Architecture and Cryptographic Advantages of the WireGuard Protocol

Developed as a modern alternative to old and complex protocols such as IPSec and OpenVPN, **WireGuard** stands out with its simplicity, high performance and strong security features. WireGuard is intentionally designed to have a small code base (about 4,000 lines of C code), making it much easier to audit and find vulnerabilities.

Its architecture is based on creating a virtual network interface (for example, `wg0`) running in the operating system kernel. This allows it to be easily configured and managed with standard operating system networking tools (`ip`, `ifconfig` etc.). WireGuard takes advantage of the latest advances in cryptography and rejects the concept of "Crypto-Agility" (negotiating between different encryption algorithms), using a single set of algorithms that are considered the most powerful and modern available. This set includes **ChaCha20** for encryption, **Poly1305** for message authentication, **Curve25519** (elliptic curve Diffie-Hellman) for key exchange, and **BLAKE2s** for hashing. This approach eliminates the risk of misconfiguration and provides a strong security posture by default.

### 4.4. Advanced VPN Configurations: Always-On VPN, Split Tunneling and NAT Traversal

#### **Always-On VPN**

It is a feature designed especially for corporate mobile and remote workers. As soon as the device connects to the internet, it automatically establishes a secure VPN tunnel without user intervention and keeps this connection constantly active. This ensures that data is always transmitted via an encrypted tunnel. Two types of tunnels are generally used:

* **Device Tunnel** authenticates the device itself before the user logs in and provides access to management servers (Active Directory, SCCM, etc.); **User Tunnel** is established after the user logs in and provides access to corporate resources.

#### **Split Tunneling**

It is a technique that splits a VPN user's traffic into two. Traffic destined for corporate resources is sent through the encrypted VPN tunnel, while general internet traffic (e.g. streaming video, social media) is routed directly through the user's local internet connection. This improves performance by reducing the load and bandwidth consumption on the VPN server. However, it poses serious security risks. Traffic leaving the tunnel escapes the institution's security policies (URL filtering, IPS, DLP, etc.) and monitoring mechanisms. This could create a “backdoor” that allows the user’s device to pick up malware from the internet and then infiltrate the corporate network through the VPN tunnel.

#### **NAT Traversal (NAT-T)**

Because IPSec uses IP headers to verify the integrity of packets, the source IP address or port cannot be detected by NAT devices.Changing it will disrupt the authentication process. **NAT Traversal** is a mechanism developed to solve this problem. NAT-T encapsulates IPSec (specifically ESP) packets within a UDP header. These UDP packets generally use port 4500. Even if NAT devices redirect by changing the port information of these UDP packets, the original ESP packet inside remains intact and can be processed correctly by the VPN gateway at the destination.

![](https://cdn-images-1.medium.com/max/800/1*qcfN3w9nucr_-rFUjvihHg.png)

**VPN Protocols Comparison**

---

### Chapter 5: The Central Nervous System of Security Operations: SIEM and SOAR

Modern cyber security operations are based on collecting and interpreting large amounts of data and making fast and effective decisions based on this data. At the core of this process are Security Information and Event Management (SIEM) and Security Orchestration, Automation and Response (SOAR) platforms. These two technologies work like the brain and nervous system of a security operations center (SOC).

### 5.1. SIEM Architecture: Log Aggregation, Normalization, Correlation and Anomaly Detection

The main purpose of a **SIEM** platform is to collect log data and events from an organization's entire IT infrastructure (network devices, servers, endpoints, applications, cloud services, etc.) in one central point. This gives security teams holistic visibility over the entire environment. SIEM's workflow usually consists of these steps:

1. **Log Collection (Aggregation):** Logs produced from different sources are securely transmitted to the SIEM platform through agents or using standard protocols such as Syslog.
2. **Normalization & Parsing:** Raw log data is produced in different formats by different devices and applications. Normalization is the process of transforming these heterogeneous data into an analysable, common and structured format. For example, timestamps on different systems are converted to a universal format (UTC), different expressions such as “login failed”, “authentication error”, “user logon failure” are mapped to a single standard event ID (`Failed_Logon`).
3. **Correlation:** This is the most powerful capability of SIEM. By running predefined rules on normalized data, the correlation engine detects chains of events that do not appear suspicious on their own, but when taken together indicate malicious activity. For example, a correlation rule might flag “more than 10 failed login attempts from a user within 5 minutes followed by a successful login from the same IP” as a brute force attack.
4. **Alerting and Reporting:** When a correlation rule is triggered, SIEM creates an alert and reflects it on a dashboard for security analysts to review. It also produces regular reports for compliance audits and management.

### 5.2. Autonomous Defense with SOAR: Orchestration, Automation and Automated Incident Response (Playbooks)

While SIEM is excellent at detecting threats and generating alerts, the process of responding to these alerts is often manual and time-consuming. An analyst may need to switch between multiple security tools to verify an alert, understand its context, and respond. **SOAR** platforms take SIEM capabilities to the next level by automating and streamlining this response process. SOAR is based on three basic concepts:

1. **Orchestration:** It enables different security tools (SIEM, firewall, EDR, threat intelligence platform, etc.) to talk to each other and work in an integrated manner through APIs. This allows analysts to manage all tools from a single console.
2. **Automation:** It is the automatic performance of repetitive, low-level and manual tasks by machines. For example, actions such as checking the reputation of an IP address, sending a file hash to the sandbox, or opening a support ticket can be automated.
3. **Response and Playbooks:** The heart of SOAR is **playbooks**. A playbook is a predefined, step-by-step workflow for a specific type of security incident (for example, phishing email, malware detection). These steps include both automated tasks (for example, “Check the URL in the email against the threat intelligence database”) and manual steps (for example,It may include “If the analyst confirms the URL is malicious, continue”). When a SIEM alert triggers the playbook, the SOAR platform can automatically execute the defined steps, completing the response process in seconds or minutes.

### 5.3. Platform Comparison: Architectures and Capabilities of Leading SIEM and SOAR Solutions

SIEM and SOAR are technologies that complement each other, not replace each other. While SIEM is focused on “detection” and “analysis”, SOAR is focused on “intervention” and “automation”. In a SOC's maturity journey, a solid SIEM infrastructure is typically established first, then SOAR capabilities are added to increase operational efficiency.

There are many platforms on the market that offer these services, and each has different architectural approaches:

* **Splunk:** Generally considered a strong option for large-scale, on-premise deployments. It is known for its flexible data retrieval and powerful search language (SPL). However, it can be costly as the licensing model is often based on data volume.
* **IBM QRadar:** It is a well-established and mature SIEM platform. It is particularly strong in rule-based correlation and compliance reporting. It is generally seen as a more cost-effective option than Splunk, but its interface may be considered outdated by some users.
* **Microsoft Sentinel:** It is a cloud-native SIEM and SOAR solution. It stands out especially with its deep integration with Azure cloud services and artificial intelligence-supported analysis capabilities. It is a popular option for modern cloud environments because it does not require infrastructure management and is scalable.

![](https://cdn-images-1.medium.com/max/800/1*pGGWBXfh3FmW4dBdnSiGIA.png)

**Key Differences Between SIEM and SOAR**

---

### Chapter 6: Zero Trust in Network Access: Network Access Control (NAC)

Network Access Control — NAC is a security approach that authenticates devices and users connected to a network and monitors their compliance with predefined security policies. The main purpose of NAC is to reduce the attack surface by ensuring that only authorized and “healthy” devices access network resources. This is the application of the “never trust, always verify” principle of the Zero Trust architecture at the initial point of entry into the network.

### 6.1. Device Security Posture Assessment: Criteria and Policies

One of NAC's most basic capabilities is to perform a posture assessment for each device that tries to connect to the network. This process consists of a series of checks that check whether the device meets corporate security standards. Common criteria checked during these audits include:

* **Antivirus/Antimalware Status:** It is checked whether antivirus software that complies with corporate standards is installed on the device, whether it is running, and whether the signature database is up to date.
* **Operating System and Patch Level:** It is verified whether the device's operating system is up to date and whether critical security patches are installed.
* **Firewall Status:** It is checked whether the device's local firewall is active or not.
* **Software Presence:** The device can be checked for unauthorized or prohibited software (for example, P2P file sharing applications).
* **Disk Encryption:** It can be verified whether the device's hard disk is encrypted to protect sensitive data.

Depending on the results of these checks, the device is classified as **compliant** or **non-compliant**. For incompatible devices, NAC solutions can implement various actions:

* **Quarantine:** The device is placed in a limited-access network segment (VLAN) isolated from the rest of the network.
* **Remediation:** While in the quarantine network, the device is granted access to servers (e.g. WSUS, antivirus server) where it can retrieve missing patches or updates. Once the device becomes compatible, it is inspected again and full network access is provided.
* **Prohibiting Access:** In case of critical incompatibilities, the device's access to the network may be completely blocked.

### 6.2. IEEE 802.1X Standard: Port-Based Authentication Mechanism

**IEEE 802.1X** is a standard that provides port-based authentication in both wired (Ethernet) and wireless (Wi-Fi) networks and forms the basis of NAC solutions. This standard requires a device to prove its identity as soon as it connects to a physical or logical port. Its 802.1X architecture consists of three main components:

1. **Supplicant:** The end device (for example, a laptop or smartphone) that requests access to the network. This device runs software that supports 802.1X authentication.
2. **Authenticator:** The network device to which the client is physically connected (for example, a switch or wireless access point — AP). The Authenticator acts as an intermediary between the client and the authentication server and keeps the client's port closed until authentication is successful.
3. **Authentication Server:** Usually a **RADIUS (Remote Authentication Dial-In User Service)** server. It is the central authority that checks the credentials coming from the client, makes the authentication decision and notifies this decision to the Authenticator.

The authentication process is performed using the **Extensible Authentication Protocol — EAP** and these EAP messages are carried between the client and the authenticator within **EAP over LAN (EAPoL)** frames. The basic flow is as follows:

1. The client connects to the network. The port is initially closed to allow only EAPoL traffic.
2. The client starts the authentication process by sending an `EAPoL-Start` message.
3. Authenticator sends an `EAP-Request/Identity` message from the client requesting its identity.
4. The client responds with an `EAP-Response/Identity` message with its identity (such as username or certificate).
5. Authenticator encapsulates this EAP message into a RADIUS `Access-Request` packet and forwards it to the Authentication Server (RADIUS).
6. The RADIUS server verifies credentials against its own database or an identity store such as Active Directory.
7. If authentication is successful, the RADIUS server sends a `RADIUS Access-Accept` message to the Authenticator. If it fails, it sends `Access-Reject`.
8. When the Authenticator receives the `Access-Accept` message, it opens the port to which the client is connected and allows normal network traffic. It also sends an `EAP-Success` message to the client.

### 6.3. Guest Network Management and Remediation of Incompatible Devices

NAC solutions play a critical role in providing secure and controlled access for guests, consultants or partners who need temporary access to the corporate network. NAC creates a completely isolated guest network for such users, typically with internet access but no access to internal corporate resources. Guest users can connect to this network by registering themselves or obtaining temporary credentials, usually through a web portal (captive portal).

As mentioned before, the remediation process for non-compliant enterprise devices is one of the most important benefits of NAC. If a device fails the security posture assessment, it is automatically routed to a remediation VLAN. In this VLAN, the device only has access to resources necessary for remediation, such as Windows Update servers, antivirus signature servers, or patch management systems. Once the device has received the necessary updates and become compliant, it is re-evaluated by NAC and, if successful, full network access is granted. This automated process ensures network security and significantly reduces the burden of manual intervention on the IT department.

---

### Chapter 7: Security Protocols of Wireless Networks

Wireless networks have become an integral part of modern IT infrastructures due to the flexibility and mobility they provide. However, this convenience also brings serious security risks without the right security protocols and configurations. Wireless network security has undergone a long evolution from the weaknesses of WEP to the advanced cryptographic protections of WPA3.

### 7.1. WPA2 to WPA3 Transition: Cryptographic Advances and SAE Handshake

**Wi-Fi Protected Access 2 (WPA2)** has been the standard for wireless network security for many years. Although it provides strong protection using AES (Advanced Encryption Standard) encryption, significant vulnerabilities have emerged over time. One of the most well-known vulnerabilities is **KRACK (Key Reinstallation Attacks)**. This attack exploits a weakness in WPA2's 4-way handshake process, allowing encryption keys to be reused and traffic decrypted. Additionally, the Pre-Shared Key (PSK) used in WPA2-Personal mode is a weak password when used, they are vulnerable to offline dictionary attacks. By intercepting 4-way handshake traffic, an attacker can attempt passwords on his own system without being connected to the network. In order to eliminate these vulnerabilities, the **Wi-Fi Protected Access 3 (WPA3)** standard was introduced in 2018. WPA3 introduces a number of key cryptographic innovations over WPA2:

* **Simultaneous Authentication of Equals (SAE) Handshake:** It is the most important innovation of WPA3-Personal mode. SAE (also known as Dragonfly), which replaced PSK, is a secure password-based key exchange protocol. Unlike WPA2, SAE makes it impossible for an attacker to perform an offline dictionary attack during the handshake. Because every authentication attempt requires active interaction with the network. Even if an attacker intercepts the traffic, he or she must interact with the access point (AP) on a case-by-case basis to crack the password. This allows the AP to block the attacker after a certain number of failed attempts, making brute force attacks practically impossible.
* **Stronger Encryption:** In addition to 128-bit AES encryption, WPA3-Enterprise mode offers a 192-bit security suite option for environments requiring higher security.
* **Forward Secrecy:** SAE provides forward secrecy by its nature. This means that even if a session's encryption key is somehow compromised, past or future sessions cannot be decrypted because unique, temporary keys are used for each session.
* **Enhanced Security for Open Networks (Enhanced Open):** WPA3 introduces **Opportunistic Wireless Encryption (OWE)**, which provides individual data encryption even on public Wi-Fi networks that do not require a password. This creates a unique encryption key between each user and the access point, preventing other users on the same open network from eavesdropping on your traffic.

### 7.2. Extensible Authentication Protocol (EAP) Types: EAP-TLS vs PEAP

WPA2/WPA3-Enterprise mode, used in enterprise environments, requires separate credentials for each user and uses the 802.1X framework for authentication. Within this framework, there are various types of **Extensible Authentication Protocol (EAP)** that determine the authentication method. The two most commonly used EAP types are EAP-TLS and PEAP:

*   **EAP-TLS (EAP-Transport Layer Security):** It is considered the most secure EAP method.
*   **Requires mutual authentication**; that is, both the authentication server (RADIUS) and the client device use digital certificates to prove their identity. This completely eliminates password-based attacks (phishing, brute force). However, it requires a Public Key Infrastructure (PKI) as it requires a certificate to be distributed and managed on each client device, increasing installation and management complexity.
*   **PEAP (Protected EAP):** It is widely used because it is easier to distribute. PEAP creates a secure TLS tunnel between the client and the server. Inside this tunnel, the actual authentication is done by another method (internal method). The most common internal method is **MS-CHAPv2** and is username/password based. In this model, only the server needs a certificate; The client sends credentials (username/password). This is simpler as it does not require PKI management, but is less secure than EAP-TLS because it is password based and is vulnerable to credential theft.

### 7.3. Rogue Hotspot Threats: Protecting Against Rogue AP and Evil Twin Attacks

Wireless networks are more vulnerable to certain types of attacks because they do not require physical access. The most dangerous of these relate to unauthorized access points:

* **Rogue AP (Rogue Access Point):** The connection of an unauthorized wireless access point (AP) to the corporate network, with or without an employee's knowledge. This AP often lacks security configurations and bypasses the security policies of the corporate network, creating a backdoor for attackers.
* **Evil Twin:** A malicious access point that copies the SSID (network name) of a legitimate wireless network (for example, “Office\_WiFi”). By setting the signal strength of his own AP higher than that of the legitimate AP, the attacker causes nearby users' devices to automatically connect to his fake network. Once connected to the network, the attacker acts as a Man-in-the-Middle between the user and the Internet and can eavesdrop and manipulate all traffic or steal credentials by redirecting users to fake login pages.

A multi-layered approach is required to protect against these threats:

#### **Technical Precautions**

* **Wireless Intrusion Prevention Systems (WIPS):** These systems detect unauthorized APs and Evil Twins by constantly scanning the radio frequency spectrum. Once detected, they can locate these devices and even actively intervene by sending de-authentication packets that prevent legitimate clients from connecting to these rogue APs.
* **802.1X Authentication:** Using WPA2/WPA3-Enterprise and 802.1X provides strong defense against Evil Twin attacks. Even if a client connects to an Evil Twin AP, the authentication process will fail because the Evil Twin does not have the certificate of the legitimate RADIUS server and the client will not be able to gain full access to the network.

#### **Administrative Measures**

* **Regular Network Scans:** It is important to detect unauthorized devices by regularly scanning the network.
* **User Education:** Educating users about the risks of connecting to unknown or suspicious Wi-Fi networks, paying attention to certificate warnings, and the importance of using a VPN on public networks is one of the most important lines of defense.

![](https://cdn-images-1.medium.com/max/800/1*1MluVyG6UZhxsJniWxTz2g.png)

**WPA2 and WPA3 Comparison**

---

### Result

This comprehensive technical article reveals the evolution and current state of modern network security technologies. Analysis shows that in everything from firewalls to wireless protocols, there is a clear shift from isolated and reactive solutions to integrated, proactive and context-aware systems. Technologies such as Firewall, WAF, IPS, VPN, NAC and SIEM/SOAR are now seen as complementary components of an integrated defense architecture, rather than as silos working independently of each other.

The core philosophy of this modern architecture revolves around the principles of Zero Trust: no part of the network (internal or external) is trusted by default, and every access request is constantly verified using identity, device health, location, and other contextual data. This approach forms the basic logic of many technologies examined, from the application and user-based policies of NGFWs to the device posture assessment of NAC and the positive security model of WAF.

Looking to the future, it is clear that this integration will deepen even further with artificial intelligence and machine learning. While SIEM platforms become more accurate in anomaly detection, SOAR solutions will be able to run autonomous response scenarios (playbooks) against complex threats without human intervention. The goals of detecting threats faster and more accurately (MTTD — Mean Time to Detect) and responding to these threats faster (MTTR — Mean Time to Respond) will continue to be the key criteria for the success of these intelligent and automated systems. As a result, the network security of the future is evolving towards a dynamic and self-healing ecosystem that allows human analysts to focus on high-level tasks such as strategic threat hunting and incident response, while delegating routine and repetitive tasks to intelligent automation systems.