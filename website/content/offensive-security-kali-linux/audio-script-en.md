Hello, in this article I will talk about Kali Linux distribution. I will explain what it does and what capabilities it has. After talking about its installation, I will talk about the tools that come pre-installed.

---

Chapter: What is Kali Linux?

Kali Linux is a Debian-based Linux distribution developed for use in the field of cyber security. It contains many cyber security software that comes pre-installed. In this respect, it can be said that it has a very useful and user-friendly structure.

You can perform penetration tests for many systems with Kali. You can also work in the field of computer forensics.

Section: The OffSec (Offensive Security) Connection

Kali Linux is funded and maintained by OffSec (formerly Offensive Security), a global leader in cybersecurity training and certification. Kali Linux is positioned as the primary platform for many of their hands-on courses and certifications, most notably the prestigious OSCP (Offensive Security Certified Professional). This professional backing ensures the distribution remains continually updated and tailored to real-world industry demands.

---

Chapter: Installation

Kali offers two different desktop environment options: GNOME and XFCE. It also supports 32-bit and 64-bit systems.

There are several different ways to install Kali Linux:
Main operating system on your computer.
Secondary operating system (dual-boot) on your computer.
Virtual machine (VM) on your computer (most popular and secure lab method).
Windows Subsystem for Linux (WSL).

Kali's documentation page contains detailed information about installation and subsequent operations.

Section: Kali Linux on WSL (Windows Subsystem for Linux)

On modern Windows operating systems, it is possible to run Kali Linux directly on Windows without the overhead of a traditional virtual machine. Thanks to WSL 2, you can get a Kali experience fully integrated with your Windows command line.

Section: WSL Installation Steps:

Run Windows PowerShell or Command Prompt (CMD) as Administrator.
Execute the following command to download and install the Kali Linux distribution:.
[Code Block: A code example is present here. Code contents are skipped in the voiceover.]
Restart your computer once the installation is complete. On the first launch, the terminal will ask you to set a new username and password.

Section: Graphical Interface (GUI) Setup: Win-KeX

To use Kali Linux's desktop GUI environment on WSL instead of just the command line, you can use the Win-KeX tool developed by the Kali team.
Update your WSL terminal packages and install the Win-KeX package:.
[Code Block: A code example is present here. Code contents are skipped in the voiceover.]
Start the GUI desktop by running:.
[Code Block: A code example is present here. Code contents are skipped in the voiceover.]
With this, you will have a high-performance, seamless Kali Linux desktop workspace running directly inside Windows.

Section: Virtual Machine (Lab) Installation Steps

Setting up a virtual lab environment is the most common and safest way to run Kali Linux. Follow these steps to get your environment ready in minutes:

Choose and Install a Hypervisor:.
Install either VMware Workstation or VirtualBox on your host computer.
Download the Pre-built VM Image:.
Go to the official Kali Virtual Machines page and download the ready-made image suitable for your hypervisor (.ova for VirtualBox or .7z for VMware). This saves you from manual partitioning and setup.
Import and Hardware Configuration:.
Import the downloaded image into your hypervisor. Allocate at least 2 GB RAM (4 GB recommended) and 2 vCPUs. Set the network adapter to NAT or Host-Only mode depending on your lab scenario (to avoid sending packet tests to external networks).
First Login and System Update:.
Log in with the default credentials kali / kali. Open a terminal and run the following command to update package lists and installed tools:
[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

---

Chapter: What is Penetration Testing?

The purpose of Penetration Testing (pentest) is to find, exploit and report the vulnerability that exists in any system. We can generally divide penetration testing into two:

Network penetration testing is a way of infiltrating the system by exploiting vulnerabilities resulting from incorrect configuration of the system.

Application penetration testing is the activities of accessing and exploiting the system through vulnerabilities in the application software.

Penetration testing is divided into three types:

Black box: It is a penetration test performed without providing any information about the target system.
White box: It is a penetration test performed by providing a lot of information about the target system.
Gray box: It is a penetration test performed without providing detailed information about the target system.

In the field of penetration testing, Kali Linux is a widely used distribution. Now, let's take a look at the tools used for this job.

---

Chapter: Kali Linux Tools

While in the Kali Linux desktop environment, if you click on the logo, you will see the general menu open. Here, you can make various customizations from the settings section. When you look further down, you will come across various sections.

[Image: No image description]

Kali Linux Menu

In this section, the cyber security tools that come pre-installed with Kali Linux are classified according to their functions. Kali provides information gathering, vulnerability scanning, password attacks, wireless network attacks, computer forensics, etc. It contains ready-made tools in many areas such as. You can find detailed information about these tools and how they are used on the Kali Linux Tools page.

In this article, we will briefly talk about these tools and what they do.

Section: Key Kali Linux Tools Comparison

Before diving into the details of each tool, here is a quick comparison table of the most critical tools widely used in penetration testing:

---

Section: Realistic Offensive Attack Scenario (Cyber Kill Chain)

Cybersecurity tools do not work in isolation. In a successful penetration test, the output of one tool serves as the input for another, forming a cohesive attack chain. The scenario below demonstrates how Kali Linux tools link together end-to-end:

[Mermaid Diagram: An architectural or flow diagram is present here. Diagram details are visually represented.]

Section: Phase 1: Reconnaissance

The attacker or pentester gathers information about the target before launching any active attack.
Step 1: Use spiderfoot to collect OSINT (emails, subdomains, IP blocks) associated with the target domain.
Step 2: Run an nmap scan against target IP addresses to detect open ports and running service versions.
[Code Block: A code example is present here. Code contents are skipped in the voiceover.]
(This command detects service versions -sV, runs default scripts -sC, skips host discovery -Pn, and outputs findings to a text file -oN)

Section: Phase 2: Exploitation

Analyze findings from the recon phase to locate and exploit vulnerabilities.
Step 1: Run nikto against open web ports (80/443) to find misconfigurations or old web server versions.
Step 2: Query searchsploit to see if there are public exploits available for the detected service versions.
Step 3: Use metasploit framework to load the appropriate exploit, run it against the target, and establish an initial shell session.

Section: Phase 3: Post-Exploitation

Once initial access is gained, elevate privileges and pivot through the network.
Step 1: On Windows hosts, run mimikatz to extract clear-text passwords or password hashes from memory.
Step 2: Verify these credentials across other hosts in the network using NetExec (nxc).
Step 3: Tunnel network traffic through proxychains4 to perform lateral movement and target deeper infrastructure such as the Domain Controller.

---

Section: Detailed Tools and Command Examples

Section: Information Gathering

Tools used in active and passive information collection activities for a specific target are included in this section. These are:

dmitry: dmitry is a Linux command line application written in C. dmitry can find possible subdomains, email addresses, uptime information.
ike-scan: ike-scan discovers IKE hosts and can also fingerprint them using the retransmission-retrieval model.
netdiscover: Netdiscover is an active/passive address discovery tool. It was developed specifically for wireless networks without a DHCP server. Hub/SwitchedIt can also be used in networks.
nmap: nmap(network mapper) is a utility for network discovery or security auditing. It supports ping scanning (identifying which hosts are open), many port scanning techniques, version detection (identifying service protocols and application versions listening on ports), and TCP/IP fingerprinting (remote host operating system or device identification).
> Practical Command:
> ```bash
> nmap -sV -sC -Pn -oN scanresults.txt <TARGETIP>
> ```
recon-ng: Recon-ng is a full-featured Web Discovery framework written in Python. Equipped with standalone modules, database interaction, interactive help and command completion features, Recon-ng provides a powerful environment in which web-based exploration can be carried out quickly and comprehensively.
spiderfoot: This package includes an open source intelligence (OSINT) automation tool. Its purpose is to automate the process of gathering intelligence about a specific target, which could be an IP address, domain name, hostname, network subnet, ASN, email address, or person's name.

Section: Vulnerability Analysis

Tools used to scan for vulnerabilities against a specific target are included in this section. These are:

legion: This package contains an open source, easy-to-use, extensible and semi-automatic network penetration testing tool that helps in the discovery and exploitation of information systems.
nikto: Nikto is a web server and CGI browser written in Perl that uses rfp's LibWhisker to perform quick security or information checks.
unix-privesc-check: Unix-privesc-checker is a script that runs on Unix systems (tested on Solaris 9, HPUX 11, Various Linuxes, FreeBSD 6.2). It tries to find misconfigurations that could allow local unprivileged users to escalate privileges to other users or access local applications (e.g. databases).

Section: Web Application Analysis

Tools used to find and exploit vulnerabilities in Web Applications are included in this section. These are:

burpsuite: Burp Suite is an integrated platform for performing security testing of web applications. Its various tools work seamlessly together to support the entire testing process, from initial mapping and analysis of an application's attack surface to finding and exploiting vulnerabilities.
commix: This package has a simple environment and can be used by web developers, penetration testers, and even security researchers to test web applications to find bugs or vulnerabilities related to command injection attacks. Using this tool, it is very easy to find and exploit command injection vulnerability in a specific vulnerable parameter or string. Commix is written in the Python programming language.
skipfish: Skipfish is an active web application security discovery tool. It prepares an interactive site map for the targeted site by performing recursive crawling and dictionary-based polling. The final report generated by the tool is intended to provide a basis for professional web application security assessments.
wpscan: WPScan scans WordPress applications to find security issues.

Section: Database Assesment

Tools used to find and exploit vulnerabilities in databases and to view databases are included in this section. These are:

sqlitebrowser: SQLite Database Browser is a visual tool for creating, designing and editing SQLite-compatible database files. Its interface is based on QT and is designed for users and developers who want to create databases, organize and search data using a familiar spreadsheet-like interface without the need to learn complex SQL commands.
sqlmap: The purpose of sqlmap is to detect and exploit SQL injection vulnerabilities in web applications.
> Practical Command:
> ```bash
> sqlmap -u "http://hedef.com/page.php?id=1" --dbs --batch
> ```

Section: Password Attacks

chifTools used for re attacks are included in this section. These tools:

cewl: CeWL (Custom Word List generator) is a ruby application that creates a list of words that can be used for password crackers like John the Ripper. Optionally, CeWL can follow external links.
crunch: crunch is a word list generator where you can specify a standard character set or any character set to use when creating word lists. Word lists are created through combinations and permutations of a series of characters. You can specify the amount of characters and the list size.
hashcat: hashcat supports five unique attack modes for over 300 highly optimized hashing algorithms. hashcat currently supports CPUs, GPUs, and other hardware accelerators in Linux and has facilities to help with distributed password cracking.
> Practical Command:
> ```bash
> hashcat -m 1800 -a 0 shadow_hash.txt rockyou.txt
> ```
john: John the Ripper is a tool designed to help system administrators find weak (easy to guess or brute force crack) passwords and even automatically warn users about them by email if desired.
> Practical Command:
> ```bash
> john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
> ```
medusa: medusa is intended to be a fast, massively parallel, modular, brute force attack implementation. The goal is to support as many services that allow remote authentication as possible.
ncrack: ncrack is a high-speed network authentication tool. It was created to help companies secure their networks by proactively testing all their hosts and network devices for weak passwords.
ophcrack: ophcrack is a Windows password cracker based on a time-memory swap using rainbow tables. Recovers 99.9% of alphanumeric passwords in seconds.

Section: Wireless Attacks

Tools used for wireless network attacks are included in this section. These are:

aircrack-ng: aircrack-ng is an 802.11a/b/g WEP/WPA cracking program that can recover a 40-bit, 104-bit, 256-bit or 512-bit WEP key after collecting a sufficient number of encrypted packets. It can also attack WPA1/2 networks with some advanced methods or just brute force.
fern wifi cracker: This package contains a Wireless security auditing and attack software program written using the Python Programming Language and the Python Qt GUI library, the program can crack and recover WEP/WPA/WPS keys and also perform other wireless or ethernet-based network-based attacks.
kismet: Kismet is a wireless network and device detector, sniffer, security tool and WIDS (wireless intrusion detection) framework.
pixiewps: Pixiewps is a tool written in C used to force the WPS key offline by exploiting the pixie dust attack of some APs.
reaver: Reaver performs a brute force attack on an access point's WiFi Protected Setup pincode. Once the WPS pin is found, the WPA PSK can be recovered and the wireless settings of the AP can be reconfigured alternately.
wifite: Wifite is a tool created to monitor WEP or WPA encrypted wireless networks. It uses aircrack-ng, pyrit, reaver, tshark tools to perform the audit.

Section: Reverse Engineering

Tools and command environments used for reverse engineering are included in this section. These are:

radare2: The project aims to create a complete, portable, multi-architecture, toolchain for reverse engineering.

Section: Exploitation Tools

Tools used to exploit a target system, that is, to gain access to the target system, are included in this section. These are:

NetExec (nxc): The successor to the now-deprecated crackmapexec. Maintained by the community, it is an essential tool for penetration testing Windows/Active Directory environments, credential dumping, and lateral movement.
> Practical Command:
> ```bash
> nxc smb <TARGETIPOR_SUBNET> -u username -p password --local-auth
> ```
metasploit framework: Metasploit framework,It is an open source platform that supports vulnerability research, exploit development, and creation of custom security tools.
searchsploit: Exploit searches for ready exploit in Database.

Section: Sniffing&Spoofing

Tools used for sniffing and spoofing are included in this section. These are:

ettercap: Ettercap supports active and passive inspection of many protocols and includes many features for network and host analysis.
minicom: Minicom is a copy of the MS-DOS "Telix" communications program. Operates ANSI and VT102 terminals.
mitmproxy: mitmproxy is an interactive Man-in-the-Middle proxy for HTTP and HTTPS. It provides a console interface that allows instant control and regulation of network traffic flows.
netsniff-ng: netsniff-ng is a high-performance Linux network sniffer for network packet inspection. It can be used for protocol analysis, reverse engineering or network debugging.
responder: This package includes Responder/MultiRelay, a LLMNR, NBT-NS and MDNS poisoner. Responds to specific NBT-NS (NetBIOS Name Service) queries based on name suffixes.
wireshark: Wireshark is a network "sniffer" tool that captures and analyzes network packets. Wireshark can decode too many protocols to list here.

Section: Post Exploitation

Tools developed for post-exploit operations, Enumeration (gathering detailed information about the system), Privelege Escalatio (authorization escalation) and Pivoting (jumping to another system) are included in this section. These are:

evil-winrm: This package contains the ultimate WinRM shell for hacking/penetration testing.
exe2hex: A Python script to convert a Windows PE executable into a batch file and vice versa.
mimikatz: Mimikatz is a tool that uses administrative rights in Windows to display the passwords of currently logged in users in plain text.
powershell empire: This package includes a framework with a pure PowerShell2.0 Windows agent and a pure Python Linux/OS X agent. It is a combination of previous PowerShell Empire and Python EmPyre projects.
powersploit: PowerSploit is a set of Microsoft PowerShell scripts that can be used in post-exploitation scenarios during authorized penetration testing.
proxychains4: Proxychains is a UNIX program that dynamically links network-related libc functions to linked programs via a preloaded DLL (dlsym(), LD\_PRELOAD) and redirects connections via SOCKS4a/5 or HTTP proxies. Supports TCP only (no UDP/ICMP etc.).
weevely: Weevely is a hidden PHP web shell that simulates telnet-like connection. It is an important tool for post-exploitation of web applications and can be used as a hidden backdoor or a web shell to manage legitimate web accounts, even freely hosted ones.

Section: Forensics

Tools developed for computer forensics are included in this section. These are:

autopsy: autopsy Forensic Browser is a graphical interface to the command-line digital forensic analysis tools in The Sleuth Kit. Together, The Sleuth Kit and Autopsy provide many of the same features as commercial digital forensics tools for analysis of Windows and UNIX file systems (NTFS, FAT, FFS, EXT2FS, and EXT3FS).
binwalk: binwalk is a tool used to search for files and executable code embedded in a given binary image. It is specifically designed to identify files and code embedded within firmware images. Binwalk uses the libmagic library, so it is compatible with magic signatures created for the Unix file utility.
bulk\extractor: bulk\extractor is a C++ program that scans a disk image, a file, or a file directory and extracts useful information without parsing the file system or file system structures. The results are stored in feature files that can be easily examined, parsed, or processed by automated tools.
hashdeep: hashdeep is a set of tools for recursively computing the MD5, SHA1, SHA256, tiger and whirlpool hashsums of an arbitrary number of files.

---

Chapter: The Future of Offensive Security: AI and Automation

By 2026, artificial intelligence (AI) and Large Language Models (LLMs) have taken a prominent role in both offensive and defensive security operations. In the Kali Linux ecosystem, integration of traditional tools with AI is accelerating:
AI-Assisted OSINT: Moving beyond manual keyword searches, AI agents analyze gathered footprint data to trace complex relationship maps of target organisations (e.g. automatically identifying high-value targets for social engineering).
Automated Penetration Testing: Agent-based platforms can ingest port scans, predict the exploit with the highest likelihood of success, and automate initial execution stages safely.
Smart Code Audits: In SAST workflows, AI not only identifies security flaws but also provides code patch recommendations to fix the vulnerability on the spot.

In the future, the primary skill of security professionals will be orchestrating and managing these automated and AI-driven tools.

---

Chapter: End

In this article, I tried to talk about what Kali Linux is and what capabilities it has. Briefly, I talked about the vehicles that come already installed. There is a lot of information on how to use these tools, both on Kali's own page and on the internet. You can also get information about the use of that tool by typing "vehicle\_name -h" in the Kali terminal. Don't forget to like and comment on my article!
