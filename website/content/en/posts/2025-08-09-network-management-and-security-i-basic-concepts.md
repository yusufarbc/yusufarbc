---
date: '2025-08-09'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*-M8PH7FuSJ3sOgJgiKLzCg.png
series:
- Network Security and Management
title: 'Network Management and Security I: Basic Concepts'
type: posts
---

![](https://cdn-images-1.medium.com/max/800/1*-M8PH7FuSJ3sOgJgiKLzCg.png)

Cybersecurity is a dynamic discipline that has been evolving since the dawn of the digital age. In the past, the security paradigm was largely based on a static fortress defense that focused on protecting the network perimeter. In this model, the digital assets of the institution were considered as if they were in a castle, and the walls of this castle were strengthened with controls such as firewalls. However, technological transformations such as cloud computing, the proliferation of mobile devices, the Internet of Things (IoT) and complex supply chains have made this traditional “safe inside, dangerous outside” distinction meaningless. The attack surface has expanded, threats have become more sophisticated, and defense lines have become unclear.

This new reality has necessitated a paradigm shift in cyber security. The modern approach is now defined as an identity and data-centered, risk-focused, dynamic and continuous process. This paradigm recognizes that a single security control will fail sooner or later and puts resilience above absolute prevention. This report comprehensively examines the pillars of this modern security paradigm, adversary tactics, and the operational disciplines required to build a resilient security posture. This document is structured in four main sections, starting from the CIA triangle, which forms the philosophical basis of information security, to the layered defense (Defense in Depth) architecture, to today's complex threat landscape, and finally to the governance and continuous improvement processes that bring all these elements together. Its aim is to reveal how the seemingly independent components of cyber security actually form an integrated and mutually reinforcing ecosystem.

---

### Part I: Philosophical Foundations of Information Security: The CIA Triangle and Beyond

All strategies, policies and technologies on which cyber security is built are fundamentally aimed at achieving three main protection goals. Known as the “CIA Triangle,” these core principles — Confidentiality, Integrity, and Availability — form the cornerstones of an organization's security infrastructure. This chapter elaborates on these three pillars and how these principles translate into practical policies and strategies.

### 1.1. CIA Triangle: A Detailed Examination

The CIA triangle provides guiding principles for implementing an information security plan. Each component protects information assets against a different type of threat, and the balance of the three forms the basis of a solid security posture.

![](https://cdn-images-1.medium.com/max/800/0*IBuyeYMSXN6R_EB0)

CIA triangle

#### Confidentiality

Privacy, in its most basic sense, is the protection of information against unauthorized *read* access. The aim is to ensure that sensitive and confidential data is visible only to authorized people, systems or processes. This principle provides assurance against disclosure of data.

**Mechanisms:** The most basic and common technical mechanism to ensure confidentiality is encryption. Encryption converts readable plaintext into unintelligible ciphertext through an algorithm. In this way, even if the data is captured, its content is protected. Other important mechanisms that support privacy include Access Control Lists (ACLs), which grant or deny users or systems access to certain resources; Data Loss Prevention (DLP) systems that prevent sensitive data from leaving the organization; and Cloud Access Security Brokers (CASBs), which manage and secure access to cloud applications.

**Threat Example:** One of the most concrete examples of privacy breaches is the theft of Personally Identifiable Information (PII), such as credit card numbers, social security numbers, or medical records. Such a data leak can lead to identity theft for individuals and serious legal sanctions and reputational loss for institutions.

#### Integrity

Integrity is the protection of information against unauthorized *write* access, that is, modification, alteration or deletion by unauthorized persons. This principle aims to ensure that the data remains complete, complete, consistent and accurate throughout its life cycle.

**Mechanisms:** The technical basis of integrity is cryptographic hashing functions. Algorithms such as SHA (Secure Hash Algorithm) or MD5 (Message-Digest 5) produce a unique fixed-length “fingerprint” (hash value) from data of any size. This method is extremely effective for checking whether data has been modified, as even the slightest change in the data will produce a completely different hash value. File Integrity Monitoring (FIM) tools detect unauthorized changes by regularly checking the hash values ​​of critical system files. Additionally, technologies such as HMAC (Hash-based Message Authentication Code) and digital signatures, which verify both the integrity of a message and the identity of its sender, also form an important part of integrity checks.

**Threat Example:** Integrity violations can be broken down into two main categories: data integrity and system integrity. For example, a student increasing his own grades by infiltrating the university's grade database

It is a *data integrity* violation. If the same attacker installs a backdoor software on the operating system in order to easily access the system in the future, it is a *system integrity* violation.

#### Availability

Accessibility is ensuring that information and systems are available and accessible to authorized users when needed. This principle aims to ensure that services are not interrupted and business continuity is maintained.

**Mechanisms:** The key to ensuring availability is redundancy. Using backup power supplies, servers and network components against hardware failures; installing load balancing systems to distribute the load on a single server; and creating disaster recovery plans to move operations to another geographical location in the event of a data center being completely out of service are basic mechanisms. Additionally, Service-Level Agreements (SLAs), which provide a legal commitment to uninterrupted service, embody availability goals.

**Threat Example:** The most well-known and direct type of attack on accessibility is Distributed Denial of Service (DDoS) attacks, which flood a system or network with traffic so intense that legitimate users cannot access it. These attacks can knock out a website, an application, or an entire network for hours or even days.

### 1.2. Balance of Principles: Conflicts and Prioritization in Security Goals

The CIA triangle presents a framework that is in constant balance and trade-off with each other, rather than targets that each must be absolutely maximized. Overemphasizing one security principle can weaken others. For example, multi-layered and complex encryption algorithms applied to protect data (high confidentiality) can negatively impact availability by slowing down system performance and increasing processing power requirements. Similarly, storing a database in a completely isolated, non-networked vault completely eliminates the accessibility of the data while providing almost perfect confidentiality and integrity.

This inherent tension shows that cybersecurity cannot be approached with a naive approach such as “protect everything against everything”. Instead, security decisions are about “protect what, against what, at what cost?” It should be shaped around the question. At this point, the CIA triangle ceases to be a technical model and turns into a strategic risk management tool. An organization's security priorities are determined by its business objectives, legal obligations, and risk appetite. For example, the top priority for patient data in a hospital emergency department is Accessibility so doctors can instantly access vital information and Integrity for accuracy of data. While privacy is important, it can take a backseat in a lifesaving scenario. On the other hand, for the same hospital's long-term genetic research data, the top priority will be Confidentiality to protect the privacy of the subjects. Instant availability of this data is less critical. Therefore, security policies and implemented controls should be customized according to the value of the asset to be protected in the business context and the risks it poses. This explains why the “one-size-fits-all” approach to cybersecurity is fundamentally flawed and ineffective. This is basic reasoning for individual prioritization.

### 1.3. Data Classification: The Cornerstone of Security Policies

In order to determine security priorities and direct resources correctly, an organization must first know “what it is protecting.” Data classification is the process of separating all the data an organization has into logical categories based on criteria such as sensitivity, criticality, and legal requirements. This process forms the basis of an effective security strategy and consistent security policies because it defines which data needs what level of protection. Security controls implemented without classification would either be unnecessarily costly and restrictive, or would be insufficient to protect critical assets.

This process is particularly vital to the effectiveness of technologies such as Data Loss Prevention (DLP). Without knowing which data is classified as “sensitive,” a DLP solution cannot know which data to prevent from leaving the organization. The classification also creates a culture of security awareness among employees; Labeling a document as “Confidential” alerts users to how they should handle that document.

Although classification levels can be customized to each institution, there is a hierarchical model that is widely accepted in the public and private sectors. This model generally consists of four main levels: Top Secret, Secret, Service Specific, and Public. Each level reflects the potential impact of harm to the organization if that category of data were to be unauthorized disclosed, altered, or made inaccessible. The table below defines these classification levels and provides practical examples of typical security controls that should be implemented for each level in line with CIA guidelines.

![](https://cdn-images-1.medium.com/max/800/1*Z4xvNhUEhoGq9K66T-Laaw.png)

**Data Classification Levels and Implemented Security Controls**

---

### Part II: A Resilient Defense Architecture: “Defense in Depth” Strategy

The assumption that a single security control or line of defense will eventually fail or be circumvented is the foundation of modern cybersecurity strategy. Based on this assumption, “Defense in Depth” (Defense in Depth or Layered Security) is an architectural philosophy that aims to create a multi-layered, diverse and redundant line of defense against cyber attacks, rather than relying on a single strong wall. This chapter dives into the conceptual framework of this strategy, its key components, and how it is implemented in a modern technical architecture.

![](https://cdn-images-1.medium.com/max/800/0*C0-mfJeSR-pYtOhO)

Defense in Depth

### 2.1. Conceptual Framework: From Military Doctrine to Cyber Security

The origins of the concept of Defense in Depth lie in military strategies that aim to slow down the enemy's advance, wear them down and break the offensive momentum with successive layers of defense, rather than trying to stop an enemy attack with a single, strong line. This tactic, used from ancient Roman armies to modern military doctrines, when adapted to the field of cyber security, means making it harder for an attacker to reach their final goal, slowing them down, and maximizing the probability of detection by increasing the time they spend and the traces they leave in the process.

This strategy is often explained with two popular analogies: the “onion” and the “fortress” model.

* **Onion Model:** In this analogy, the most valuable asset, data, is at the center of the onion. To protect data, it is surrounded by multiple layers of protection, each of which kicks in if the previous one fails. These layers are from outside to inside; They can be listed as network security, host-based security, application security and, as one of the innermost layers, the human factor.
* **Castle Model:** Medieval castles are a perfect physical example of Defense in Depth. The attackers must first overcome a moat, then the outer walls, then the towers supported by archers, the inner walls and finally the main tower (keep) in the center of the castle, which is the most protected structure. Each line of defense buys time for the next and exposes the attacker to different types of obstacles.

### 2.2. Three Pillars of Control: Administrative, Technical and Physical Security

As defined by the National Institute of Standards and Technology (NIST), an effective Defense in Depth strategy is not just about technological solutions; It is a holistic approach that integrates people, process and technology. This approach consists of three basic pillars:

* **Administrative Controls:** These are the policies, standards and procedures that manage an organization's security posture. They are rules that define security “what should be done” and “why it should be done”. Examples include establishing security policies, risk management processes, regulatory compliance programs, security awareness training for employees, and security investigations during onboarding.
* **Technical Controls:** These are hardware and software-based security solutions used to protect systems and data. These are the mechanisms that implement the “how to” of security. Firewalls, Intrusion Detection/Prevention Systems (IDS/IPS), encryption software, authentication systems and antivirus programs fall into this category.
* **Physical Controls:** These are measures that limit or prevent physical access to the information technology infrastructure and sensitive data. Locked doors and access control systems that control access to server rooms, security cameras (CCTV), security guards, fences and fire suppression systems are examples of physical controls.

### 2.3. Multi-Tier Technical Architecture: Network, Endpoint, Application and Data

A modern Defense in Depth technical architecture layers diverse and complementary technologies across common attack vectors. The aim is that if one layer fails, another layer detects and blocks the attack.

#### **Network Layer**

It is often considered the first line of defense and controls traffic entering and exiting the organization's network.

* **Firewalls and IDS/IPS:** Filters network traffic according to predefined rules and blocks attacks by detecting known malicious signatures or abnormal protocol behavior.
* **Network Segmentation:** The practice of dividing the network into smaller, isolated subnets (segments) for different business units or security levels. This limits the impact of the attack if an attacker infiltrates one segment of the network by preventing it from easily spreading to other segments (lateral movement).

#### **Endpoint Layer**

It protects end-user devices connected to the network, such as users' laptops, servers, and mobile devices.

* **Endpoint Detection and Response (EDR):** Going beyond traditional signature-based antivirus software, it detects and responds to advanced threats such as zero-day attacks by analyzing abnormal behavior on the endpoint (for example, a suspicious process running from memory or making unexpected network connections).
* **Patch Management:** It is the process of regularly applying updates and patches to close known security vulnerabilities in operating systems and applications. This prevents attackers from exploiting known vulnerabilities.

#### **Application Layer**

It provides protection against attacks that specifically target web-based applications.

* **Web Application Firewalls (WAF):** Blocks common web application attacks such as SQL Injection (SQLi), Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) by deeply examining incoming HTTP traffic.

#### **Data Layer**

It is the innermost and most critical layer of defense. It directly aims to protect the data itself, even if all other layers are breached.

* **Data Encryption:** Encrypting data both where it is stored (at rest) and while it is transmitted over the network (in motion) ensures that unauthorized persons cannot read the data even if they access it.
* **Data Loss Prevention (DLP):** It is a set of policies and tools that prevent the unauthorized removal of sensitive data (for example, credit card numbers, health information) outside the organization via e-mail, USB memory or cloud storage.
* **Privileged Access Management (PAM):** Strictly controls, audits and manages the access of privileged accounts such as system administrators. This prevents misuse of access to the most critical systems and data.

The effectiveness of this layered structure depends not only on the number of layers, but also on the diversity, that is, heterogeneity, of these layers. An attacker can bypass a network-based IDS system that operates based on a known signature by using a new or modified attack technique. However, when this attacker reaches the target endpoint, if an abnormal PowerShell command runs, this behavior may be flagged as suspicious by an EDR solution that is purely behavioral analysis-based and not signature-based. This suggests that each security layer must look at the system with a different “eye” and use different types of detection mechanisms. The blind spot of one layer must fall into the field of view of another. Therefore, a strong Defense in Depth strategy is based on the ability to create a coordinated defense mechanism that complements each other and protects against different attack tactics and techniques. This prevents a single “magic key” from opening all locks.

### 2.4. Attack Surface Analysis and Mitigation Strategies

In order to effectively implement the Defense in Depth strategy, it is necessary to first know what needs to be protected and where this protection will be focused. An attack surface is the sum of all potential entry points (attack vectors) that an attacker can exploit to gain unauthorized access to a system or network, steal data, or disrupt service. This surface covers a wide variety of elements, such as web servers exposed to the Internet, open network ports, APIs, employee email accounts, third-party software, and even physical buildings.

Attack Surface Management (ASM) is the process of continuously discovering, analyzing, prioritizing and mitigating these potential entry points by viewing an organization's digital and physical assets through the eyes of an attacker. This is a proactive approach and its main purpose is to find and close vulnerabilities before they are discovered by attackers.

**Strategies to Reduce Attack Surface:**

* **Zero Trust Architecture:** Unlike the traditional “trust but verify” model, it is based on the principle of “never trust, always verify”. In this model, regardless of whether a user or device is inside the network (corporate LAN) or outside (the internet), neither is trusted by default. Every access request from one resource to another is tightly controlled based on factors such as authentication, authorization, and the security status of the device. This approach significantly narrows the attack surface by making it greatly difficult for an attacker to move laterally once they have infiltrated the network.
* **Closing Unnecessary Services and Ports:** Every service running on a system and every open network port is a potential entry point. Disabling unused services and closing unnecessary ports through firewall scans and regular audits is one of the most basic steps in cleaning the attack surface.
* **Network Segmentation and Microsegmentation:** Dividing the network into smaller, isolated segments prevents an attacker from spreading to the entire network if they infiltrate one segment. Microsegmentation takes this concept even further, controlling and limiting traffic even between servers or applications within the same network segment.
* **Continuous Vulnerability Scanning and Patch Management:** Conducting regular vulnerability scans with automated tools and patching detected known vulnerabilities (CVEs) in a timely manner eliminates “low-hanging fruit”, i.e. easy targets, that attackers can use.
* **Employee Training and Awareness:** Employees are often the first link in the attack chain through social engineering attacks such as phishing. Regularly educating them on the latest threats and security best practices strengthens this critical component of the attack surface by reducing human-caused risks.

These strategies are also critical in terms of compliance with legal regulations, especially the Personal Data Protection Law (KVKK). KVKK requests data controllers to take appropriate technical and administrative measures to ensure the security of personal data. Analysis and reduction of the attack surface underpins many of these technical measures (e.g., ensuring network security, penetration testing, intrusion detection and prevention systems) and helps the organization meet its legal responsibilities.

---

### Part III: The Modern Threat Landscape: Enemy Tactics and Techniques

Building a resilient defense architecture requires understanding who the enemy is, what weapons they use, and how they fight. The modern threat landscape covers a wide spectrum, from simple viruses to complex state-sponsored operations. This section examines in detail the types of dangerous cyber attacks, the technical mechanisms behind these attacks, and the defense strategies developed against them.

### 3.1. Denial of Service (DoS/DDoS) Attacks

The primary goal of Distributed Denial of Service (DDoS) attacks is to overwhelm a target server, service, or network with an overwhelming flood of internet traffic until it becomes inaccessible to legitimate users. These attacks are one of the most direct and devastating threats to the Availability principle in the CIA triangle. A DDoS attack is typically coordinated by thousands or even millions of computers or IoT devices that have been compromised and turned into a botnet.

**Attack Types and Mechanisms:** DDoS attacks generally fall into three main categories, targeting different layers of the target's network stack:

* **Volumetric Attacks (Layer 3/4):** The aim of these attacks is to completely consume the target's network bandwidth. Using botnets, attackers send massive amounts of traffic (measured in gigabits — Gbps or terabits — Tbps) to the target. A common technique, **DNS Amplification**, involves the attacker sending small requests to public DNS servers using the victim's IP address as a spoofed source address. DNS servers respond to these small requests with much larger responses, which are directed directly to the victim, thus amplifying the volume of the attack.
* **Protocol Attacks (Layer 3/4):** Instead of consuming network bandwidth, these attacks aim to consume resources by filling the state tables of infrastructure components such as firewalls, load balancers or the servers themselves. For example, in a **SYN Flood** attack, the attacker sends many TCP “SYN” packets to the target, but never the “ACK” packets needed to complete the connection. This occupies the server's resources with half-open connections, leaving it unable to accept new legitimate connections. These types of attacks are also known as “state-exhaustion attacks”.
* **Application Layer Attacks (Layer 7):** It is the most difficult and most insidious type of DDoS attack to detect. These attacks are accomplished by creating seemingly legitimate HTTP requests (for example, GET or POST requests) that keep the web server or an application busy and consuming its resources. For example, in an HTTP Flood attack, a botnet repeatedly requests a specific page of a website (usually a complex page that requires a database query). This traffic can bypass traditional DDoS protection methods because it is difficult to distinguish from normal user traffic.

**Mitigation Strategies:** Effective defense against DDoS attacks often requires a layered approach. Global content distribution and security networks such as Cloudflare use a variety of advanced techniques to block such attacks:

* **Anycast Network and High Capacity:** Cloudflare uses Anycast routing technology to distribute incoming attack traffic over a massive network (e.g., more than 405 Tbps capacity) spread across hundreds of data centers around the world. This ensures that no single point is overwhelmed by a volumetric attack; attack traffic is absorbed and filtered.
* **Web Application Firewall (WAF):** Particularly effective against Layer 7 attacks. A WAF analyzes incoming HTTP/HTTPS traffic, detecting known attack signatures, abnormal request patterns, or malicious bot behavior and blocks this traffic before it reaches the destination.
* **Rate Limiting:** Limits the number of requests that can come from a single IP address or a user within a certain time period. This helps prevent bots or automated tools from slowly and sneakily overloading the server.

### 3.2. Human Factor: Social Engineering Attacks

No matter how strong technological defenses are, the weakest link in the cybersecurity chain is often humans. Social engineering is an art of manipulation that exploits natural tendencies and vulnerabilities in human psychology (trust, fear, curiosity, urgency, respect for authority, and desire to help) rather than technical weaknesses. Attackers use psychological triggers to persuade victims to take actions they wouldn't normally take (click a link, open a file, share a password, transfer money).

**Common Techniques and Psychological Principles:**

#### **Phishing**

It is the most common social engineering technique. Attackers try to steal sensitive information (username, password, credit card details) by pretending to be an institution (bank, shipping company, IT department) or person that the victim trusts, usually via email. These attacks generally target the victim to act impulsively by creating a feeling of **urgency** (“Your account will be closed within 24 hours!”) or **fear** (“A suspicious transaction was made on your account!”).

* ***Spear Phishing:*** It targets a specific person or a small group and uses previously collected personal information about the victim (name, position, projects he/she works on) to make the attack more believable.
* ***Whaling:*** It is a type of spear phishing that specifically targets "big fish" such as senior managers, CEOs or CFOs.

#### **Baiting**

Exploits the victim's **curiosity** or **greed**. An attacker could leave an infected USB stick labeled with a tempting name like “2025 Salary Information.zip” in a company parking lot. It is enough for an employee to find this memory and curiously plug it into his computer for malware to infect it. Similarly, websites promising “free movies” or “cracked version of expensive software” are also used for phishing attacks.

* **Pretexting and Role Playing:** It is when the attacker makes up a believable scenario (pretext) and assumes a certain role in order to gain the victim's trust. For example, an attacker could impersonate a company's IT support staff and call an employee and say "we need to perform a critical security update on your system, can you please verify your password?" can say. Here, the psychological principles of **respect for authority** and **willingness to help** are exploited.
* **Scareware:** "15 viruses have been found on your computer! Your system is at risk of crashing! Click to clean it immediately!" It forces the user to buy or install unnecessary or malicious software by **scareing** the user with fake and alarmist warnings such as:

**Protection Methods:** The most effective defense against social engineering is continuous education and awareness. Users should be taught to always be **suspicious** of unexpected emails, too-good-to-be-true offers, emotionally charged messages, and requests for sensitive information. Technical controls such as email filtering systems, anti-malware software, and multi-factor authentication (MFA) are important second layers of defense that reduce the likelihood of social engineering attacks being successful.

### 3.3. Malicious Code: Malware, Ransomware and Cyber Kill Chain

Malware is a general term that covers any type of software designed to damage a computer system, steal data, or control the system without the user's knowledge. Malware taxonomy includes spyware, adware, Trojans, worms, rootkits and ransomware, one of today's most destructive threats.

**Ransomware Operations:** Ransomware encrypts critical files on the victim's device or the entire system using strong encryption algorithms and makes them inaccessible. He then demands a ransom, usually in cryptocurrencies, in exchange for the key to decrypt the files. To increase the effectiveness of their attacks, modern ransomware groups often employ the “double extortion” tactic: unless a ransom is paid, they threaten to publicly leak the sensitive data they encrypted on the Internet. This increases the pressure on the victim and creates not only data loss, but also a serious risk of data breach and reputational damage.

To understand how a cyber attack occurs, especially a complex attack like ransomware, the **Cyber Kill Chain** model developed by Lockheed Martin provides an extremely useful framework. This model describes seven sequential stages that an attacker goes through to achieve their goal.

1. **Reconnaissance:** The attacker passively or actively collects information about his target. At this stage, e-mail addresses, employee names, network IP ranges, technologies used and potential vulnerabilities are investigated.
2. **Weaponization:** The attacker creates the attack tool based on the information received. For example, it combines an exploit (a piece of code that exploits a vulnerability) with a malicious payload. This could be embedding a malicious macro in a Microsoft Word document or adding an exploit kit to a PDF file.
3. **Delivery:** The weaponized load is delivered to the target via a vector. The most common delivery vectors include phishing emails, infected websites (drive-by downloads) or hijacked USB sticks.
4. **Exploitation:** The payload triggers a software or hardware vulnerability in the target system, allowing the attacker's code to be executed. This is the moment when the attacker first steps into the system.
5. **Installation:** The attacker installs a backdoor or other malware (for example, a ransomware installer) to ensure persistence on the target system. This ensures that it maintains access even if the system is rebooted.
6. **Command & Control (C2):** The installed malware communicates with an attacker-controlled C2 server over the internet. This channel allows the attacker to remotely send commands, steal data and manage the attack.
7. **Actions on Objectives:** The attacker reaches his final goal. This could be stealing sensitive data (data exfiltration), encrypting files for ransom, sabotaging the system, or using it as a springboard for a larger attack.

This model serves not only to map out the anatomy of an attack, but also as a defensive map. Each link in the attack chain is dependent on the success of the previous one. This dependency provides a critical advantage for defenders. Breaking any link in the chain has the potential to stop the entire attack. For example, if an advanced email security gateway blocks the phishing email before it reaches the user during the “Delivery” phase, the chain is broken. During the “setup” phase, if an application whitelisting policy prevents an unknown executable from running, the chain is broken again. In the “C2” phase, a firewall that filters egress traffic out of the network can neutralize the attack by preventing the malware from communicating with the attacker. Therefore, the Kill Chain model is an invaluable tool for mapping defensive strategies and security controls specifically to each attack phase and planning proactive defense.

Advanced Persistent Threats (APT) are highly skilled and resourced threat actors, often state-sponsored or very well-financed, who act to surreptitiously spy on, steal data, or sabotage a specific target (a country, a critical industry, or a large company) over an extended period of time. Their aim, unlike “hit-and-run” style cyber crimes, is to remain undetected in the target network for as long as possible.

![](https://cdn-images-1.medium.com/max/800/0*TjrOi-Q5lZCKQngd)

Advanced Persistent Threats (APT)

**Key Characteristics:** There are three key characteristics that classify a threat actor as an APT:

* **Advanced:** APT groups use sophisticated tools and techniques that ordinary cybercriminals cannot access. These include previously unknown zero-day vulnerabilities, custom malware, complex social engineering campaigns, and traditional intelligence gathering methods.
* **Persistent:** It is the most distinctive feature of APT attacks. Once infiltrated into a target network, attackers aim to stay inside for months or even years, using stealth techniques to avoid detection. Their goal is to provide constant access and achieve their goals slowly and carefully.
* **Threat:** APTs have not only technical capabilities, but also a clear intention (motivation) and the resources to realize this intention. Their motivations are often political (espionage, sabotage) or economic (intellectual property theft) rather than financial gain.

**MITRE ATT&CK® Framework:** Widely used by the cybersecurity community to understand, analyze and defend against the complex behavior of APTs and other threat actors. One framework used as an example is **MITRE ATT&CK®**. ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) is a global knowledge base of adversary behavior based on real-world observations. Rather than focusing on “what” attackers do (signatures, tools), this framework focuses on “how” and “why” they do it (behaviors).

The ATT&CK matrix consists of Tactics, Techniques and Procedures (TTPs):

* **Tactics:** Represents enemy targets or objectives during an attack. They are the columns of the matrix and ask “why is the attacker performing this action?” answers the question. Example tactics include *Initial Access*, *Persistence*, *Credential Access* and *Exfiltration*.
* **Techniques:** Specific methods used to achieve a tactic. They are the cells of the matrix and ask “how does the attacker achieve this goal?” answers the question. For example, the *Phishing* (T1566) technique can be used to achieve the *Initial Access* tactic.
* **Procedures:** They are concrete examples of how a technique is implemented by a specific threat group. For example, it is a procedure for the APT39 group to apply the *Phishing* technique through targeted emails containing malicious links (spearphishing links).

The table below maps the behavior of the thought-to-be Iran-backed APT39 group into concrete TTPs using the MITER ATT&CK framework. This provides a practical roadmap for what types of behaviors analysts should look for during a threat hunting or defense gap analysis.

![](https://cdn-images-1.medium.com/max/800/1*oAJtmJSOS5OCUBxm_WX20A.png)

MITER ATT&CK TTP Mapping for Example APT Group (APT39)

### 3.5. Interconnected Risk: Supply Chain Attacks

The increasing complexity and interdependence of modern digital ecosystems has introduced a new and extremely dangerous attack vector: supply chain attacks. In this type of attack, instead of attacking their main target directly, attackers infiltrate business partners, software providers, hardware manufacturers, or service providers that the target trusts but are often less secure. Attackers aim to reach the main target through a reliable channel by exploiting this trust relationship. The SolarWinds attack in 2020 is one of the best-known and most devastating examples of this type; Attackers infiltrated the update mechanism of a network management software and distributed malicious code to thousands of institutions using this software.

Such attacks show that it is not enough for an organization to just strengthen its own security posture, it must consider the security of its entire digital supply chain. This highlights the importance of the discipline known as Supply Chain Risk Management (SCRM).

**Risk Management and Frameworks:**

The U.S. Cybersecurity and Infrastructure Security Agency (CISA) is a leading agency that promotes public-private collaboration and offers a variety of resources to manage ICT (Information and Communications Technologies) supply chain risks. CISA's approach is based on the fact that vulnerabilities in a supply chain can occur at any stage of the product life cycle (design, development, production, distribution, maintenance, disposal).

The basic SCRM steps recommended by CISA are:

1. **Identifying People and Processes:** Creating a SCRM team within the organization that includes representatives from different departments such as cyber security, purchasing, legal and logistics.
2. **Knowing the Supply Chain and Suppliers:** Mapping and understanding as much as possible not only the suppliers you work with directly, but also their suppliers (second and third tier suppliers). This is especially critical in today's world where outsourcing is common.
3. **Risk Assessment and Threat Analysis:** To analyze potential risks to your suppliers. This may include factors such as the supplier's geographic location, potential ties to foreign governments, financial condition, and known cybersecurity incidents.
4. **Trust and Verification:** Verifying your suppliers' security culture, policies and processes. This may include questioning their compliance with industry standards (for example, ISO 27001) or requesting third-party audit reports. CISA offers templates to standardize this process, such as the **“Vendor SCRM Template”**. This template includes a series of questions about how a supplier implements industry standards and best practices and guides risk planning.
5. **Hardware and Software Transparency:** Requesting transparency about the components of the products supplied. CISA's **Hardware Bill of Materials (HBOM)** and its equivalent in the software world
6. **Software Bill of Materials (SBOM)** frameworks list what components (hardware or software libraries) are contained within a product, allowing to quickly identify which products are affected when a known vulnerability occurs.
7. **Contractual Obligations:** Explicitly include security requirements, notification periods and audit rights in the event of a security incident in contracts with suppliers.

Ultimately, supply chain security is a complex field that requires managing risks beyond an organization's control. A proactive SCRM program aims to increase the resilience of the entire ecosystem with a trust-based but verification-based approach.

---

### Part IV: Governance and Operational Security Processes

An effective cybersecurity posture cannot be achieved with advanced technologies and complex architectures alone. Technology is just part of the equation. The main elements that engrain security into the DNA of an organization and make it a sustainable and constantly developing capability are; sound policies, well-defined processes and informed people. This chapter goes beyond technology to address proactive governance, crisis response, and continuous improvement cycles that manage security as a whole.

### 4.1. Proactive Governance: Risk Management and Threat Intelligence

Proactive governance, based on anticipating and preparing for threats before they arise, rather than reactively responding to events, is the hallmark of a mature security program. The two pillars of this approach are Risk Management and Cyber Threat Intelligence.

**Risk Management:** Cybersecurity risk management is the process of systematically identifying, evaluating, prioritizing potential threats and vulnerabilities to an organization's information assets, and developing strategies to address these risks. The main goal is not to eliminate risk completely (which is often an impossible and costly goal), but to reduce it to an “acceptable level” within the organization's risk appetite. This process ensures that security investments are focused on the most critical areas and ensures efficient use of resources. Professional organizations such as ISACA (Information Systems Audit and Control Association) provide comprehensive frameworks in this area.

**ISACA's Risk IT Framework** provides a structure for managing risk end-to-end by linking IT-related risks to business objectives and processes. This framework covers key areas such as risk governance, risk assessment and risk response, enabling organizations to understand and manage IT risks.

**Cyber Threat Intelligence (CTI):** CTI is raw data collected about potential or existing threats analyzed, interpreted and enriched to provide a meaningful context for decision-making processes. CTI doesn't just deal with a simple indicator (Indicator of Compromise - IoC) like “a malicious IP address was seen on our network”; but also “which threat group does this IP address belong to, what is the motivation of this group, what tactics and techniques do they usually use, and why do they target our industry?” It seeks answers to deeper questions such as. NIST defines threat intelligence as “threat information that has been collected, transformed, analyzed, interpreted, or enriched to provide the necessary context for decision-making processes.”

CTI is generally considered at three levels:

* **Strategic CTI:** Prepared for senior management and decision makers. It analyzes general trends in the cyber threat landscape, the motivations of specific threat actors, and their potential impact on business strategies.
* **Operational CTI:** Intended for defensive teams such as security operations centers (SOC) and incident response teams. It provides detailed information about the Tactics, Techniques and Procedures (TTPs) of specific threat actors.
* **Tactical CTI:** Contains machine-readable threat indicators (IoCs) that security devices (Firewall, SIEM, IDS) can directly use. These include malicious IP addresses, domain names, file hashes, etc. and are concrete and immediately actionable data.

### 4.2. Establishing Order: Security Policy Development with NIST CSF 2.0

Security policies are formal documents that define an organization's security goals, rules, and responsibilities. Effective policies are the foundation for establishing a consistent security posture and ensuring regulatory compliance. One of the most widely used and respected frameworks for developing these policies is

**NIST Cybersecurity Framework (CSF)**. CSF is a guide that provides a flexible, repeatable and cost-effective approach for an organization to manage cybersecurity risks. This is not a rigid list of standards, but rather a framework that organizations can tailor to their specific needs, risk profiles and objectives.

**CSF 2.0**, published in February 2024, expanded the scope of the framework from just critical infrastructure to include all organizations regardless of size or sector. The most important innovation is a new approach that emphasizes that cybersecurity is not just an IT problem but a corporate governance issue.

It is the addition of the **“Govern”** function. This function aims to integrate the cybersecurity strategy with the organization's overall enterprise risk management (ERM) strategy.

The updated NIST CSF consists of six core functions:

1. **Govern:** The organization's cybersecurity risk management strategy, expectations, roles and policies are created, communicated and monitored.
2. **Identify:** The assets in the corporate environment, the risks to these assets and the general risk management strategy are understood.
3. **Protect:** Appropriate safeguards are developed and implemented to ensure the delivery of critical services and limit the impact of cybersecurity incidents.
4. **Detect:** Activities that enable timely discovery of potential cyber security incidents are defined.
5. **Respond:** Activities are developed to ensure appropriate actions are taken against a detected cyber security incident.
6. **Recover:** Plans are developed and implemented to normalize services and capabilities that were disrupted due to a cybersecurity incident.

### 4.3. Crisis Response: Incident Response (IR) and Digital Forensics (DFIR)

Despite all preventive controls, security breaches are inevitable. At this point, how quickly, effectively and regularly the organization responds to the crisis determines the extent of damage that the incident will cause.

**Incident Response (IR):** When a security breach or cyber attack is detected, it is a structured approach taken to limit the impact of the incident, reduce damage, and minimize recovery time and costs. An effective IR process prevents chaos and ensures that all stakeholders know their roles and responsibilities. The two most accepted frameworks in this field are offered by NIST and SANS Institute.

**DFIR (Digital Forensics and Incident Response):** It combines the incident response process with digital forensic techniques in a way that preserves the legal validity of the evidence. While the main aim of IR is to return operations to normal, DFIR also asks “what happened, how did it happen, who did it?” It seeks answers to its questions with legally valid evidence. This becomes especially critical in situations where there is the possibility of legal action, insurance claims, or regulatory investigations.

The following table compares the NIST and SANS models, which are considered the industry standard in incident response.

**Digital Forensics Process:** It is the process of collecting, preserving, analyzing and reporting the evidence on digital devices without compromising the integrity of the evidence and in accordance with the law, in order to elucidate a crime or resolve a dispute. The legal importance of this process is based on the principle of preserving the integrity of evidence. For evidence to be admissible in court, it must be proven that it has not been altered from the time it was collected to the time it was presented to the court. This is usually achieved by showing that a hash value calculated when the first copy of the evidence is received is the same as the hash value recalculated at the end of the process. In addition, it is important to know who is in possession of the evidence and what work has been done on it. It keeps an uninterrupted record of what has been done.

**Chain of Custody** document is an absolute prerequisite for legal validity.

### 4.4. The Path to Maturity: Continuous Improvement and Security Training

Cyber security is not a static structure that can be established once and forgotten. Because threats, technologies, and business processes are constantly changing, the security posture must be constantly reviewed, tested, and improved. This requires embracing a culture of “continuous improvement.”

**PDCA Cycle:** The operational framework of this culture is the **Plan-Do-Check-Act (PDCA)** cycle, borrowed from quality management and popularized by W. Edwards Deming.

*   **Plan:** Security goals are determined, risks are evaluated and policies are created.
*   **Implement:** Planned security controls and policies are implemented.
*   **Check:** The effectiveness of the applied controls is monitored and measured. This phase includes activities such as security audits and penetration tests.
*   **Take Action:** Based on the deficiencies and weaknesses identified during the control phase, processes and controls are improved and the cycle begins again.

**Security Audits and Penetration Tests:** These are the most critical components of the “Check” phase of the PDCA cycle.

* **Vulnerability Scans:** It enables the rapid detection of known vulnerabilities in systems (e.g. missing patches, incorrect configurations), usually by using automatic scanning tools.
* **Penetration Testing:** It goes beyond automatic scans and manually tests, from the perspective of an ethical hacker (penetration tester), whether the detected vulnerabilities can actually be exploited and how much damage this exploitation can cause. These tests verify how effective an organization's defense mechanisms, detection systems, and incident response processes are in the face of an actual attack.
* **Test Types:** Various approaches are used to simulate different scenarios. In **Black Box** testing, no prior information is given to the testing team about the target; They completely imitate an external attacker. In **White Box** testing, all information is provided, including source codes and architectural diagrams; this simulates an insider threat or an in-depth code analysis. **Grey Box** is the most common approach with limited information (e.g. a user account) and represents a mix of both scenarios.

**Continuing Education and Awareness:** No matter how powerful technology and policies are, the weakest link is often people. Regularly educating employees about the latest threats (especially social engineering) and the organization's security policies plays a critical role in preventing security incidents. Encouraging employees' participation in security processes and receiving their feedback creates a "safety culture" and this culture is the most important driving force for continuous improvement.

None of these processes operates in isolation. On the contrary, they form a cyclical ecosystem that constantly nourishes, heals and matures each other. For example, the “Lessons Learned” analysis performed after an “Incident Response” is the “Check” phase of the PDCA cycle. The findings from this analysis (“our email filtering policy was inadequate” or “logging on this server was turned off”) form a critical input for a new “Risk Assessment” and trigger an update of the “Security Policies”. This corresponds to the “Act” and “Plan” phases. Updated policies and new controls implemented (“Apply” phase) are “Checked” again with the next periodic “Penetration Test”. This cycle is the most concrete proof that cyber security is not a static situation, but a dynamic process that constantly evolves and matures.

---

### Result

This comprehensive white paper revealed the multi-layered and integrated nature of modern network security. The analysis shows that cybersecurity is no longer just a technological problem; It shows that it has become a holistic discipline that includes strategy, governance and human factors.

The key findings of the report can be synthesized as follows: The **CIA triangle**, which forms the basis of information security, serves as a risk management tool that must be constantly balanced according to an organization's business priorities and risk appetite, rather than providing absolute goals. **Defense in Depth**, an effective defense architecture. Rather than relying on a single “magic bullet” solution, it relies on the power of heterogeneous and coordinated layers that provide protection against different types of threats through different mechanisms. This is a philosophy of resilience that prevents the failure of one layer from being catastrophic. In the face of the complexity of modern threats (APT, Ransomware), frameworks such as **Cyber Kill Chain** and **MITRE ATT&CK** stand out as invaluable strategic tools not only for understanding attacker behavior, but also for drawing a proactive defense map.

The ultimate takeaway is that cybersecurity is not a static goal; It is a dynamic journey that integrates people, process and technology and requires continuous learning, adaptation and improvement. This continuous improvement process, formalized by the **PDCA cycle**, combines all security functions such as risk management, incident response, policy development and auditing in an ecosystem that feeds each other. As a result, the most resilient organizations in the digital age are not those with the thickest walls, but those that learn the fastest, coordinate best, and adapt most agilely to changes in the threat environment. Security is not a destination, but an ongoing process.