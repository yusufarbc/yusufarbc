---
date: '2024-12-10'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*iZ-lydJs7z0gBXIAY58wQQ.png
title: Cyber ​​Defense Strategies Against Zero-Day Attacks
type: posts
---

### Cyber Defense Strategies Against Zero-Day Attacks

![](https://cdn-images-1.medium.com/max/800/1*iZ-lydJs7z0gBXIAY58wQQ.png)

In this article, I will talk about how a cyber defense strategy can be developed against zero-day attacks, which are generally accepted to be difficult to detect and prevent. Of course, we cannot wait empty-handed against the zero-day attacks that many institutions suffer from. What kind of defense infrastructure do we need to establish? Let's have a little discussion.

---

### What are Zero-Day Attacks?

First, let's understand what exactly zero-day attacks and vulnerabilities are and why they are difficult to detect.

**Vulnerability** generally refers to a vulnerability that exists in a system, network, software or hardware and allows malicious actors to attack or exploit it. Such vulnerabilities can compromise the security of a system and lead to data theft, unauthorized access or service interruption.

**Zero-Day Attacks** are attacks that exploit yet undiscovered or unreported vulnerabilities in the software or hardware components of the computer system. These vulnerabilities and vulnerabilities are exploited by attackers as soon as they are detected, causing the attacked party to be caught off guard.

![](https://cdn-images-1.medium.com/max/800/1*5VuTqvd6RWdb2I052Nr74g.png)

So why are they defenseless? No matter how much attention the organization pays to its vulnerability management processes, it cannot manage a security vulnerability that it is not aware of. The working logic of many products used for vulnerability management is aimed at detecting and eliminating known vulnerabilities. Therefore, it is not possible to fix a vulnerability that has not yet been discovered.

The process of eliminating newly discovered vulnerabilities takes some time. If the provider of the platform where the vulnerability was discovered issues a patch, a certain amount of time is required until the institution closes the vulnerability by making the necessary updates with this patch. During this time, the institution becomes vulnerable to this vulnerability.

![](https://cdn-images-1.medium.com/max/800/1*ciB4g3FrciO4GMJ5R6q_IA.png)

As soon as the vulnerability is published, the attackers take action, leaving institutions vulnerable. They detect institutions with vulnerable platforms through platforms such as Shodan and try to carry out their attacks before the vulnerability is corrected.

So, will institutions really be defenseless against these attacks? Will he wait with his hands tied? Of course not. So what kind of defense strategy is required? Now let's talk about this.

---

### Defense-in-Depth Strategy

**Defense-in-Depth** is a cybersecurity approach applied in layers to protect data and information using a series of defense mechanisms.

![](https://cdn-images-1.medium.com/max/800/1*tymURTTvBKKQGCOSzpLpWQ.png)

Defense-in-Depth

It works on the principle that if one layer is breached, the attack is detected and prevented in other layers. This strategy does not have certain layers published by an authority. However, in this article, I will try to explain with my own interpretation how we can be protected with a few possible layers. You can access my article in which I discuss this subject in detail [here](https://medium.com/@yusufarbc/derinlesunu-savunma-defense-in-depth-stratejisi-64e0be8ec1f0).

However, there is one more thing we need to mention before that. The tactics and methods used in a cyber attack are classified and listed by Miter. In my article, I will mention these tactics frequently, but I will not go into detail about these tactics in order not to lengthen the article. You can access the Miter attack enterprise matrix from the link: <https://attack.mitre.org/matrices/enterprise/>

My scenario covers the detection and prevention of a zero-day vulnerability discovered in a particular service of an organization and an attack that exploits this vulnerability. Of course, one of the most critical among the discovered vulnerabilities; Let's consider the detection and prevention of an attack that exploits a zero-day vulnerability that occurs in an open service of the institution and allows remote access (RCE).

![](https://cdn-images-1.medium.com/max/800/1*TW-N4pXoQLDERr1qtD09LA.png)

Bank Network Topology

Let's say that an RCE vulnerability was discovered in a publicly accessible service of a bank within the scope of Sernaryo. And let's prevent an attack that exploits this vulnerability layer by layer..

---

### 1- Application Protection

Our first layer of defense is the application security layer. In this layer, we try to prevent attacks on the services we provide outside. The attacker's aim at this layer is to gain access to the target system or cause service interruption.

In this layer:

* Regular vulnerability scans are performed for the applications and services we use. (Vulnerability Management Solutions)
* Application logs are collected and examined in the SIEM system to detect attacks on applications. (SOC)
* Applications are tried to be protected from attacks by being placed behind application firewalls. (WAF)

![](https://cdn-images-1.medium.com/max/800/1*ux6CxhDniTrfK7vaDwSz-A.jpeg)

Application Protection

Zero-day attacks can bypass this layer. Because vulnerability scans cannot detect zero-day vulnerabilities. The rules in our SIEM system do not alert for zero-day vulnerabilities. Our application firewall can be bypassed with various methods ([Defense Evasion](https://attack.mitre.org/tactics/TA0005)-Mitre).

In our scenario, exploiting the RCE vulnerability and gaining access to the target system means that this layer is breached. The initial access phase in Mitre has been successful. Unauthorized access has been achieved and we are not aware of it. However, let's add that the attacker has no gains yet. Still, the attacker seems to be ahead of us 1-0. However, we have 3 more defense lines behind us. Let's continue looking at these.

---

### 2-Endpoint Protection

We monitor the computer systems we have at the endpoint security layer. These systems are basically divided into two: Windows-based systems and Unix/Linux-based systems. Although the purpose of the attack on these two systems is the same, the methods are different. So what is the attacker's goal at this layer? and what will we do?  
After gaining initial access, the attacker has two main purposes for the system he accesses:

* **Providing permanence**( [Persistence](https://attack.mitre.org/tactics/TA0003)-Mitre) in the system it accesses. In other words, even if the connection is terminated or the system is shut down, being able to access the system without having to exploit the zero-day vulnerability again. There are many different techniques in Windows and Linux/Unix systems to achieve this.
* **privilege escalation**([Privilege Escalation](https://attack.mitre.org/tactics/TA0004)-Mitre) on the system it accesses. In other words, the ability to use high-level authority in the system it accesses. These are the privileges of the **administrator** user on Windows systems, and the privileges of the **root** user on Unix/Linux systems**.**

For methods of ensuring persistence in Windows-based systems, you can take a look at the relevant [article](https://medium.com/@yusufarbc/windows-kal%C4%B1c%C4%B1l%C4%B1k-sa%C4%9Flama-persistence-metotlar%C4%B1-b5fb4ac481c5).

![](https://cdn-images-1.medium.com/max/800/1*3Tnfzr-Vt3pRPL_UF2j_Jg.jpeg)

Endpoint Protection

So what do we do while the attacker is doing these? First of all, we are more advantageous in this layer compared to the previous layer. Because the techniques used by attackers to maintain permanence in systems and increase authority are mostly known. Detecting these techniques is not as difficult as detecting zero-day exploitation.

First of all, we need various products to ensure endpoint security. These range from the simplest antivirus system to the most advanced XDR system. If I have to give their names briefly:

* Antivirus/Antimalware
* Antiphishing/Mail Security
* Malware Sandbox
* EPP(Endpoint Protection Platform)
* EDR(Endpoint Detection and Response)
* XDR(Extended Detection and Response)

I won't go into detail about what each of them are for. There are tons of articles on Google about what these systems are. However, in general they are all endpoint security solutions. They aim to detect and block malicious software on endpoints. If the attacker wants to do something on a system he/she has access to, it is necessary to send and run a malicious code (payload) and make a suspicious connection. When this malicious code and link is detected and blocked by these products, we make it 1-1. However, the most important point is that we now become aware that something is going wrong.

In addition, we need to collect logs from our endpoints just like we do in our applications. Basically, syslog on Linux systemsIn Windows systems, real-time logs are sent to our SIEM system via eventlog. Rules in our SIEM system can detect privilege escalation and persistence activities and create alerts. Our security team, who sees this warning, can understand that something is wrong.

Regardless of the operating system, there are **3 important questions** that need to be answered when analyzing a believed-to-be-attacked endpoint.

* 1. Is there any active malicious software (**malware**) in the system?
* 2. Is there any suspicious internal or external communication (**network connection**)?
* 3. Is there any permanence?

A detailed examination of the endpoint for the **3 important things** I mentioned above will reveal the attacker's activity. For this purpose, various forensic tools are used. The most well-known are [**kape**](https://www.kroll.com/en/insights/publications/cyber/kroll-artifact-parser-extractor-kape) and [**thor**](https://www.nextron-systems.com/thor/).

Of course, this awareness is valid for institutions that have experts examining these products. Unfortunately, even if many organizations purchase such endpoint security products, they do not open them and look. Although security products detect and automatically block malware, they may not completely eliminate the attacker's access to the system. In this case, the attacker tries various methods to bypass or disable the security product, and if successful, can also bypass this layer.

---

### 3-Network Protection

We monitor our corporate network at the network security layer. At this point, we benefit from many network security systems. So what is the attacker's goal at this layer? and what will we do?

![](https://cdn-images-1.medium.com/max/800/1*_t2bS_tKYBo8Z2TwG2p8XA.jpeg)

Network Protection

At this stage, the attacker tries to discover the corporate assets through the infected endpoint ([Reconnaissance](https://attack.mitre.org/tactics/TA0043)-Mitre) and to spread to other systems by lateral movement ([Lateral Movement](https://attack.mitre.org/tactics/TA0008)-Mitre). For this reason, it performs intrusion attacks.

We use various products to ensure network security:

* Firewalls
* IDS/IPS(Intrusion Detection Systems/Intrusion Prevention Systems)
* NAC(Network Access Control)
* NDR(Network Detection and Response)
* PAM (Privileged Access Management)

I won't go into detail about what each of them are for. There are tons of articles on Google about what these systems are. However, in general they are all network security solutions.

They are used to analyze and scan network traffic and prevent intrusion attacks. We need to collect the logs from these systems in our SIEM system. By analyzing these logs in our SIEM system, suspicious network activities can be seen and source hosts can be detected.

With Firewall, we can block the malicious IPs we detect and prevent attackers from harming our institution. IDS/IPS systems detect and automatically block intrusion attacks in the corporate network. If attackers' scans and attacks create large amounts of network traffic/noise. Therefore it is easy to detect. However, the attacker who is aware of this situation can try to do his job without making too much noise. By slowing down its scans, it can reduce its visibility in crowded network traffic. Although network security products are effective, they are not insurmountable.

While endpoint security products and network security products are not impenetrable, they present obstacles for attackers to overcome. Attackers trying to bypass these systems waste time and slow down. This creates time for the attack to be detected by security experts. Some cyber attacks can last weeks or even months. As I said before, in the absence of security experts to detect this attack, the attacker will continue his way, albeit slowly.

---

### 4-Data Protection

In our last layer, the data security layer, some systems are used to prevent a data breach. So what is the attacker's goal at this layer? and what will we do?

![](https://cdn-images-1.medium.com/max/800/1*tsNGz2GCC_G-OIMTA0xmpA.jpeg)

Data Protection

In the previous stages, the attacker has now recognized the corporate network and spread to many systems. Therefore, he was able to access the servers where the databases were located. Now his aim is to get this valuable data out and end the attack([Impact](https://attack.mitre.org/tactics/TA0040)-Mitre). A cyber attack can have many targets. But generally, ransomware has the effect of data breach and service interruption.

In our scenario, let's assume that bank users' credit card information is targeted. After the attacker accesses the databases and finds the relevant data, he must extract this data.

What do we do at this point? Let's talk about data security products:

* Data Encryption Software
* DLP(Data Loss Prevention)
* Backup and Recovery Solutions
* IAM(Identity and Access Management)

The purpose of these products is to control access to data, protect data and prevent data breach. Possible data losses are prevented with backup systems, data is protected with data encryption systems, violations are prevented with the DLP system, and access to data is controlled with the IAM system.

Although these systems are configured correctly, they are not insurmountable like the network security and endpoint security products we mentioned before. An attacker can evade DLP by escaping small amounts of data. It can crack the encrypted data it receives, even if it is a hassle. It can even destroy data in backup systems. And he can finish his attack.

---

### Result

As a result, no matter how strong security solutions we have, these products may not be able to completely prevent the attack. However, it is obvious that it will delay it significantly. This creates a time cost for the attacker. Therefore, if the gain on the attacker's side is not worth the time cost, the attack will be deterred. Most importantly, regular monitoring by real experts is necessary to protect against cyber attacks.