---
date: '2024-10-30'
draft: false
title: Defense in Depth Strategy
---

---

### Defense in Depth Strategy

![](https://cdn-images-1.medium.com/max/800/1*T4RL-NrRsRdZSjXM4Ja3Lg.png)

Most security experts agree that perfect network security is impossible and that any defenses can always be bypassed. The defense-in-depth strategy embraces blocking the attacker with multiple layers of defense. He acknowledges that each layer can be overcome. Valuable assets are protected by more layers of defense. The combination of multiple layers increases the cost of success of the attack, which is proportional to the value of the assets protected. Additionally, the combination of multiple layers is more effective than a single optimized defense against unexpected attacks. The cost to the attacker may come in the form of additional time, effort, or equipment. For example, an attacker's delay can increase an organization's chances of detecting and responding to the attack in progress. If the increased costs outweigh the gains from a successful attack, some attempts may be discouraged.

![](https://cdn-images-1.medium.com/max/800/1*m1IdlCgTOzsBqAq42efKQA.png)

Defense In Depth

Defense in depth is sometimes said to involve people, technology and operations. Trained security personnel must be responsible for the security and information assurance of facilities. However, every computer user in an organization should be made aware of security policies and practices. Every home Internet user should learn about safe practices (such as avoiding opening email attachments or clicking suspicious links) and the benefits of proper protection (antivirus software, firewalls).

Various technological measures can be used for protection layers. These include firewalls, IDSs, access control lists (ACLs), antivirus software, access control, spam filters, etc. should take place.

![](https://cdn-images-1.medium.com/max/800/1*tymURTTvBKKQGCOSzpLpWQ.png)

Defense in Depth

### Preventive Measures — Proactive Approach

Most computer users are aware that Internet use poses security risks. It makes sense to take precautions to minimize exposure to attacks. Fortunately, several options are available for computer users to reduce risks by strengthening their systems.

#### 1- Access Control (Access Control)

In computer security, access control refers to mechanisms that allow users to perform functions up to the level to which they are authorized and restrict users from performing unauthorized functions. Access control(**Access Control**) includes:

* Authentication of users (**Authentication**)
* Authorization of privileges (**Authorization**)
* Auditing to monitor and record user actions (**Auditing**)

All computer users will be familiar with some form of access control.

Authentication(**Authentication**) is the process of verifying a user's identity. Authentication is typically based on one or more of these factors:

* Something the user knows, such as a password or PIN (**Something the user knows**)
* Something the user has, such as a smart card or token (**Something the user has**)
* Something personal about the user, such as a fingerprint, retinal pattern, or other biometric identifier (**Something the user is**)

Using a single factor is considered weak authentication, even if multiple proofs are presented. The combination of two factors such as password and fingerprint, called two-factor (or multi-factor) authentication, is considered strong authentication.

Authorization (**Authorization**) is the process of determining what an authenticated user can do. Most operating systems have a set of permissions regarding read, write, or execute access. For example, an ordinary user may have permission to read a particular file but not permission to write to the file, whereas a root or superuser will have full privileges to do everything.

Auditing (**Auditing**) is necessary to ensure that users are held accountable. Computer systems record actions in the system in audit trails and logs. For security purposes, they are invaluable forensic tools for recreating and analyzing events. For example, a user who makes many unsuccessful login attempts may be viewed as an intruder.

#### 2-Vulnerability Testing and Patching

As mentioned before, vulnerabilities are weaknesses in software that can be exploited to compromise a computer. Vulnerable software includes all types of operating systems and application programs. New vulnerabilities are constantly being discovered in different ways. New vulnerabilities discovered by security researchers are usually reported confidentially to the vendor, giving the vendor time to examine the vulnerability and develop a path. 50% of all vulnerabilities disclosed in 2007 could be fixed with vendor patches. Once ready, the vendor will release the vulnerability, hopefully along with a patch.

It has been claimed that publishing vulnerabilities would help attackers. While this may be true, publishing also raises awareness throughout society. System administrators will be able to evaluate their systems and take appropriate action. System administrators may be expected to know the configuration of computers on their network, but in large organizations it will be difficult to keep track of possible configuration changes made by users. Vulnerability testing provides a simple way to obtain information about the configuration of computers on a network.

Vulnerability testing is an exercise in investigating systems for known vulnerabilities. It requires a database of known vulnerabilities, a package generator, and testing routines to create a set of packages to test for a specific vulnerability. If a security vulnerability is found and a software patch is available, the computer should be patched at that time.

#### 3- Closing Ports

Transport layer protocols, namely Transmission Control Protocol (TCP) and User Datagram Protocol (UDP), define applications that communicate with each other through port numbers. Port numbers 1 through 1023 are well-known and are assigned by the Internet Assigned Numbers Authority (IANA) to standardized services running with root privileges. For example, Web servers listen on TCP port 80 for client requests. Port numbers 1024 through 49151 are used by various applications with ordinary user privileges. Port numbers above 49151 are used dynamically by applications.

It is a good practice to close unnecessary ports as attackers can use open ports,

especially those in the higher range. For example, the Sub7 Trojan is known to use port 27374 by default, and Netbus uses port 12345. However, closing ports alone does not guarantee the security of a computer. Some computers must keep TCP port 80 open for HyperText Transfer Protocol (HTTP), but attacks can be carried out through this port.

#### 4- Firewalls

When most people think of network security, firewalls are one of the first things that come to mind. Firewalls are a perimeter security tool that protects an internal network from external threats. A firewall selectively allows or blocks incoming and outgoing traffic. Firewalls can be standalone network devices located at the entrance to a private network or personal firewall programs running on computers. An organization's firewall protects the internal community; A personal firewall can be customized to an individual's needs.

![](https://cdn-images-1.medium.com/max/800/1*9_PlK7S2sJYQmOwWCz8sAw.png)

A firewall that isolates various network zones.

Firewalls can provide separation and isolation between various network zones, namely the public Internet, private intranets, and a demilitarized zone (DMZ — demilitarized zone), as shown in the figure. Semi-protected DMZ typically includes services provided by an organization. Public servers need some protection from the public Internet, so they are usually located behind a firewall. This firewall cannot be completely restrictive because public servers must be accessible from the outside.

There are various types of firewalls: packet-filtering firewalls, stateful firewalls, and proxy firewalls. In any case, the effectiveness of a firewall depends on the configuration of its rules. Properly written rules require detailed knowledge of network protocols. Unfortunately, some firewalls fail due to negligence or lack of training.e is configured incorrectly.

Packet-filtering firewalls analyze packets in both directions and allow or deny passage based on a set of rules. Rules often examine port numbers, protocols, IP addresses, and other attributes of packet headers. There is no attempt to associate multiple packets with a flow or stream. The firewall is stateless, keeping no memory of one packet from another.

Stateful firewalls overcome the limitation of packet filtering firewalls by recognizing packets belonging to the same flow or connection and keeping track of the connection state. They operate at the network layer and recognize the legitimacy of sessions.

Proxy firewalls (**Proxy firewalls**) are also called application-level firewalls because they operate up to the application layer. They recognize specific applications and can detect whether an unwanted protocol is using a non-standard port or if an application layer protocol is being abused. They protect an internal network by serving as primary gateways for proxy connections from the internal network to the public internet. Due to the nature of the analysis, they may have some impact on network performance.

Firewalls are essential elements of an overall defense strategy, but they have the disadvantage that they only protect the perimeter. They are useless if an attacker has a way to bypass the perimeter. They are also useless against insider threats originating from a private network.

#### 5- Antivirus and Antispyware Tools

The proliferation of malicious software creates the need for antivirus software. Antivirus software was developed to detect the presence of malware, identify its nature, remove malicious software (disinfect the computer), and protect a computer from future infections. Detection should ideally minimize false positives (false alarms) and false negatives (missed malware) simultaneously. Antivirus software faces a number of challenges:

* Malware tactics are complex and constantly evolving.
* Even the operating system on infected computers cannot be trusted.
* Malware can reside entirely in memory without affecting files.
* Malware can attack antivirus processes.
* The processing load of the antivirus software cannot reduce computer performance in a way that causes users to become annoyed and close the antivirus software.

One of the simplest tasks performed by antivirus software is file scanning. This process compares bytes in files with known signatures, which are byte patterns indicative of known malware. It represents the general approach of signature-based detection. When new malware is captured, it is analyzed for unique characteristics that can be identified in a signature. The new signature is distributed as an update to antivirus programs. The antivirus looks for the signature when scanning the file, and if a match is found, the signature specifically identifies malware. However, this method has significant drawbacks: Developing and testing new signatures takes time; users must keep their signature files up to date; and new malware without a known signature may not be detected.

Behavior-based detection is a complementary approach. Rather than addressing what the malware is, behavior-based detection looks at what the malware is trying to do. In other words, anyone who attempts a risky action will fall under suspicion. This approach overcomes the limitations of signature-based detection and can find new malware without a signature, just based on its behavior. However, this approach may be difficult in practice. First, we need to define what is suspicious behavior or, conversely, what is normal behavior. This definition often relies on heuristic rules developed by security experts because it is difficult to precisely define normal behavior. Second, it may be possible to distinguish suspicious behavior, but identifying malicious behavior is much more difficult because bad faith must be inferred. When behavior-based detection flags suspicious behavior, further follow-up investigation is often required to better understand threat risk.

ZaThe ability of malware to change or hide their appearance can defeat file scanning. However, regardless of its form, malware must ultimately do its job. Therefore, if malware is given a chance to work, there will always be an opportunity to detect it from its behavior. Antivirus software will monitor system events such as hard drive access to look for actions that may pose a threat to the computer. Events are monitored by capturing calls to operating system functions.

While monitoring system events is a step beyond scanning files, malicious programs run in the computer execution environment and can pose risks to the computer. The idea of ​​emulation is to run suspicious code in an isolated environment, present a view of computer resources to the code, and look for actions that are indicative of malware.

Virtualization takes emulation one step further and executes suspicious code within a real operating system. A number of virtual operating systems can run on top of the host operating system. Malware can corrupt a virtual operating system, but for security reasons a virtual operating system has limited access to the computer operating system. A “**sandbox**” isolates the virtual environment from interference with the computer environment unless a specific action is requested and allowed. In contrast, emulation does not expose an operating system to questionable code; the code is allowed to run step by step, but in a controlled and constrained way, just to discover what it will try to do.

Anti-spyware software can be viewed as a special class of antivirus software. Slightly different from traditional viruses, spyware can be particularly harmful when it comes to making numerous changes to hard disk and system files. Infected systems tend to have a large number of spyware programs installed, possibly including certain cookies (bits of text placed in the browser by websites for the purpose of keeping them in memory).

#### 6- Spam Filtering

Every Internet user is familiar with spam email. There is no consensus on an exact definition of spam, but most people agree that spam is unsolicited, mass sent, and commercial in nature. There is also consensus that the vast majority of emails are spam. Spam remains a problem because a small portion of recipients respond to these messages. Although this percentage is small, the revenue generated is enough to make spam profitable because the cost of sending spam in bulk is low. A particularly large botnet can quickly generate enormous amounts of spam.

Yahoo! Users of popular Webmail services such as Webmail and Hotmail are attractive targets for spam because their addresses can be easy to guess. In addition, spammers collect email addresses from various sources: websites, newsgroups, online directories, data-stealing viruses, etc. Spammers may also purchase address lists from companies looking to sell customer information.

Spam is more than just an inconvenience to users and a waste of network resources. Spam is a popular tool for distributing malware and redirecting to malicious Web sites. It is the first step of phishing attacks.

Spam filters work on a corporate and personal level. At the enterprise level, email gateways can protect an entire organization by scanning incoming messages for malware and blocking messages from suspicious or fraudulent senders. One concern at the corporate level is the rate of false positives, which are legitimate messages mistaken for spam. Users whose legitimate mail is blocked may be upset. Fortunately, spam filters can often be customized, making the rate of false positives very low. Additional spam filtering at a personal level can further customize filtering to account for individual preferences.

#### 7- Honeypots

The basic idea of a honeypot is to learn about attacker techniques by attracting attacks against a seemingly defenseless computer. It is essentially a forensic tool rather than a line of defense. A honeypot can be used to gain valuable information about attack methods used elsewhere or about imminent attacks before they happen. Honeypots are routinely used in research and production environments.

A honeypot has more specific requirements than a regular computer. First, a honeypot mIt should not be used for legitimate services or traffic. As a result, any activity seen by the honeypot will be illegitimate. For example, although honeypots generally record little data compared to IDSs, there is very little “noise” in their data while the bulk of IDS data is generally uninteresting from a security perspective.

Second, a honeypot must have comprehensive and reliable capabilities to monitor and record all activities. The forensic value of a honeypot depends on the detailed information it can capture about attacks.

Third, a honeypot must be isolated from the actual network. Since honeypots are intended to attract attacks, there is a real risk that the honeypot will be hijacked and used as a launch pad to attack more computers on the network.

Honeypots are generally classified according to their level of interaction, from low to high. Low-interaction honeypots like Honeyd provide simple services. An attacker could try to compromise the honeypot, but he wouldn't gain much. Having limited interactions creates the risk that the attacker will discover that the computer is a honeypot. At the other end of the range, highly interactive honeypots behave more like real systems. They have greater ability to engage an attacker and record activities, but provide greater gain when compromised.

#### 8- Network Access Control (NAC — Network Access Control)

A vulnerable computer can put not only itself but the entire community at risk. First of all, a vulnerable computer can attract attacks. If compromised, the host can be used to launch attacks against other hosts. The compromised computer may provide information to the attacker, or there may be trust relationships between computers that could help the attacker. In any case, it is undesirable to have a poorly protected computer in your network.

![](https://cdn-images-1.medium.com/max/800/1*dJpeXIwbTsTpQForJQxrlw.png)

Network Access Control

The general idea of network access control (NAC) is to restrict a host's access to a network unless the computer can provide evidence of a strong security posture. The NAC process involves the computer, the network (usually routers or switches and servers), and a security policy, as shown in the figure.

In some implementations, a software agent runs on the computer, collects information about the computer's security posture, and reports it to the network as part of the network admission request. The network consults a policy server to compare the host's security posture with its security policy to make an acceptance decision.

The acceptance decision can be anything from rejection to partial acceptance or full acceptance. The rejection may occur due to outdated antivirus software, an operating system that requires patching, or firewall misconfiguration. Rejection may lead to quarantine (redirection to an isolated network) or forced remediation

### Monitoring and Detection — Reactive Approach

Preventive measures, a reactive approach, are necessary and help reduce the risk of attacks, but it is practically impossible to prevent all attacks. Similar to a burglar alarm, intrusion detection is also necessary to detect and diagnose malicious activity. Intrusion detection is essentially a combination of monitoring, analysis, and response. Typically an IDS supports a console for human interface and display. Monitoring and analysis are often viewed as passive techniques because they do not interfere with ongoing activities. The typical IDS response is a warning to system administrators who may choose to pursue or not pursue further investigation. In other words, traditional IDSs don't offer much response beyond alerts, under the assumption that security incidents require human expertise and judgment for follow-up.

IDS approaches can be categorized in at least two ways. One way is to distinguish between host-based and network-based IDSs depending on where detection is done. While a host-based IDS monitors a single computer, a network-based IDS operates on network packets. Another way to view IDSs is through analysis approaches. Traditionally, the two analysis approaches are abuse (signature-based) detection and anomaly (behavior-based) detection.

![](https://cdn-images-1.medium.com/max/800/1*Sy2rKhp9DU3_9_5GeiFI0w.png)

Misuse detection and anomaly detection

As shown in the figure, these two views are mutually exclusive.They are complementary to each other and are often used together.

In practice, intrusion detection faces several challenges: signature-based detection can only recognize events that match a known signature; behavior-based detection relies on an understanding of normal behavior, but “normal” can vary greatly. Attackers are clever and evasive; attackers may attempt to jam the IDS with fragmented, encrypted, tunneled, or junk packets; an IDS may not respond to an event in real time or quickly enough to stop an attack; and events can occur anywhere at any time, requiring continuous and comprehensive monitoring with correlation of multiple distributed sensors.

#### 1- Host-Based Monitoring

Computer-based IDS runs on a computer and monitors system activities for signs of suspicious behavior. Examples could be changes to the system Registry, repeated failed login attempts, or the installation of a backdoor. Host-based IDSs typically monitor system objects, processes, and memory regions. For each system object, IDS typically keeps track of attributes such as permissions, size, modification dates, and hashed contents to recognize changes.

One concern for a computer-based IDS is possible tampering by an attacker. If an attacker gains control of a system, IDS cannot be trusted. Therefore, special tamper protection of IDS must be designed in a computer.

A computer-based IDS alone is not a complete solution. While monitoring the computer makes sense, it has three significant drawbacks: visibility is limited to a single computer; The IDS process consumes resources, possibly affecting performance on the computer; and attacks will not be seen until they reach the computer. Computer-based and network-based IDS are often used together to combine strengths.

#### 2- Network-Based/Traffic Monitoring

Network-based IDSs typically monitor network packets for signs of reconnaissance, exploitation, DoS attacks, and malware. They have strengths that complement host-based IDSs: network-based IDSs can see the traffic of a population of hosts; can recognize patterns shared by multiple hosts; and they have the potential to see attacks before they reach hosts.

![](https://cdn-images-1.medium.com/max/800/1*Hpz_IDGuT1fn2cEHAG4EWg.png)

IDSs that monitor various network zones.

IDSs are placed in various locations for different views as shown in the Figure. An IDS outside the firewall is useful for gaining information about malicious activity on the Internet. An IDS in the DMZ will see Internet-borne attacks that can pass through the external firewall and reach public servers. Finally, an IDS in the private network is necessary to detect attacks that can successfully bypass perimeter security.

#### 3-Intrusion Prevention Systems (IPS)

IDSs are passive techniques. They usually notify the system administrator to investigate further and take appropriate action. If the system administrator is busy or the incident takes time to investigate, the response may be slow.

A variation called an intrusion prevention system (IPS) attempts to combine the traditional monitoring and analysis functions of an IDS with more active automated responses, such as automatically reconfiguring firewalls to block an attack. An IPS aims to provide a faster response than humans can achieve, but its accuracy depends on the same techniques as traditional IDS. The response must not harm legitimate traffic, so accuracy is critical.

#### 4- Reactive Measures

Once an attack is detected and analyzed, system administrators must provide an appropriate response to the attack. One of the principles in security is that the response should be proportionate to the threat. Obviously, the answer will depend on the circumstances, but a variety of options are available. In general, it is possible to block, slow down, modify or redirect malicious traffic. It is not possible to identify every possible answer. We will explain only two answers here: quarantine and backtracking.

* **Quarantine**: Dynamic quarantine in computer security is similar to quarantine for infectious diseases. Particularly in the context of malware, preventing an infected computer from infecting other computers is an appropriate response.
* **Backtracking**: One critical aspect of an attack is the identity or location of the perpetrator. Unfortunately, finding an attacker in IP networks is almost impossible because:   
  - The source address in IP packets can be easily spoofed (spoofed)  
  - By their design, routers do not keep track of transmitted packets.  
  - Attackers can use a number of intermediary computers (called zombies) to carry out their attacks.

Agents are often innocent computers that are compromised by an exploit or malware and placed under the control of the attacker. In practice, it may be possible to trace an attack to the nearest agent, but it may be too much to expect to trace an attack to the actual attacker.

### Defense in Depth

We can summarize the layers as follows:

* **Network Protection**: Firewalls, IPS/IDS, NDR. NAC
* **Application Protection**: WAF, Application Logs, Updates
* **Endpoint Protection**: Antivirus/Antimalware, Antiphishing/Mail Security, EPP, EDR, syslog/eventlog, Patching
* **Data Protection**: DLP, ACL

There is a SIEM that brings it all together.

### Result

To protect against network intrusions, we must understand a variety of attacks, from exploits to malware to social engineering. Direct attacks are common, but a class of phishing attacks has emerged that rely on baits to lure victims to a malicious Web site. Phishing attacks are much harder to detect and somehow defend against. Almost anyone can become a victim.

Much can be done to strengthen computers and reduce the risks they are exposed to, but some attacks are inevitable. Defense in depth is the most practical defense strategy that combines layers of defense. While each layer of defense is flawed, the cost becomes more difficult for intruders to overcome.

### References

John R. Vacca — Network and System Security-Syngress (2010)