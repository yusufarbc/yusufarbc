---
series: ["Incident Response"]
title: "TheHive Incident Response Platform"
date: 2025-08-29
draft: false
---

---

### TheHive Incident Response Platform

![](/images/1_f8PP6v-xaqnfWogAG6RITw.png)

### 1. Basic Functions and How It Works

TheHive is designed as an open source Security Incident Response Platform (SIRP). Focuses on incident management, **team-based collaboration** and threat intelligence integration. TheHive's **core functions** include collecting alarms, converting them into event cases, monitoring subtasks assigned to cases, and "observable" indicators. For example, when an incoming alert is transferred to TheHive, a new case is created and this case is examined with predefined tasks such as "identification, correction, control". For each task, analysts can leave a *log* record; these logs can be in rich text or Markdown format[[1]](https://blog.thehive-project.org/2017/06/19/thehive-cortex-and-misp-how-they-all-fit-together/#:~:text=A%20case%20can%20be%20generated,text%20editor). Additionally, TheHive, with its **template engine**, enables the creation of reusable predefined case templates for similar types of cases, so routine analysis workflows can be quickly streamlined and initialized. TheHive enables collective collaboration by supporting large numbers of analysts simultaneously. It fits into the workflow perfectly. For example, with alarm feeders (with TheHive4py), alarms from external systems are automatically captured and displayed on a common panel; analysts review these alarms and report cases if necessary.

### 2. Advantages and Usage Scenarios for SOC Analysts

TheHive offers benefits designed specifically for SOC/CSIRT teams. **Threat intelligence integration** is powerful: Thanks to the Cortex analysis engine and tight integration with open source CTI platforms such as MISP, rich external data can be pulled into cases. User experiences show that TheHive reduces operational burden with **automation**. For example, a French CERT team stated that “automating incident responses with Cortex saves analysts invaluable time”[[4]](https://strangebee.com/#:~:text=CERT%20Ark%C3%A9a%20has%20been%20using,precious%20time%20in%20resolving%20incidents). Another user highlighted that “the best part of TheHive is its integration with multi-threat intelligence tools like Cortex and MISP”[[5]](https://strangebee.com/#:~:text=The%20best%20part%20of%20TheHive,incident%20response%20and%20case%20management). Thanks to these features, the following examples stand out among typical **use scenarios**:

* **Alarm Triage (Classification):** Thousands of alerts from SIEM, EDR or third-party systems are automatically pulled into TheHive and prioritized. Smart workflows can be defined with custom JavaScript functions; For example, in alerts containing IP address or file hash, Cortex analyzes are automatically started and a real-time threat report is received[[6]](https://strangebee.com/use-cases-thehive/#:~:text=TheHive%E2%80%99s%20automated%20triage%20optimizes%20alert,time%20threat%20reports).
* **Case Management:** Harmful alerts are converted into template-based cases. Each case is followed step by step and the analysis process is documented. Case content is enriched with the help of logs, attachments and tags (e.g. IOC marking and note taking). Case results can be exported as a PDF/Markdown report[[7]](https://strangebee.com/thehive/#:~:text=reporting).
* **Automatic Response:** With TheHive-Cortex integration, mass analysis can be performed on an observable (e.g. a malicious IP) and if confirmed, immediate response actions can be triggered. For example, if an IP is found, automatic actions can be taken such as blocking the proxy or sending an email to the relevant teams[[8]](https://docs.strangebee.com/cortex/#:~:text=TheHive%20can%20also%20leverage%20Cortex,of%20urgently%20and%20much%20more).
* **Collaboration and Work Distribution:** Incidents and tasks can be assigned between SOC analysts. Analysts can track the progress of each task; for example, “assign tasks to teammates and follow up on the case” is a typical workflow[[9]](https://strangebee.com/thehive/#:~:text=TheHive%20helps%20us%20create%20and,SIEMs%2C%20Threat%20Intel%20tools%2C%20etc). In this way, coordination within the team is ensured while multiple analysts work in parallel and divide the work.

### 3. Cortex and MISP Integrations: What Does It Do and How to Do It

**Cortex** and **MISP** are two main components that are tightly integrated with TheHive. Cortex is the analytics and automation engine for TheHive. TheHive talks to one or more Cortex servers via REST API. In this way, observables such as IP, domain name, file hash in an incident or alert can be analyzed with a single click or in bulk. When an analysis is started from TheHive, Cortex creates a job and sends short (mini) and long reports to TheHive when the analysis is completed. It returns more than 200 ready-made *analyzers* and *responders* (e.g. VirusTotal, Shodan, Yara, AbuseIPDB) which can be selected via TheHive interface[[11]](https://strangebee.com/thehive/#:~:text=Automated%20analysis%20%26%20response). It is also possible to develop and add a custom analyzer. By connecting to Cortex responders, automatic response mechanisms can be created based on analysis results; for example, actions such as blocking the DNS server if a bad domain is detected, or triggering an antivirus scan when an FTP virus is detected.

![](/images/1_SORLbZSRUDrUTApG84U7IA.png)

**MISP integration** is for sharing threat data. TheHive can display current events on connected MISP servers in the alarms list and organize them into incidents. It can convert those into cases easily. On the other hand, IOCs (IP, domain, hash, etc.) arising in cases can be transferred collectively to MISP; they are shareable with other communities. The threat context is enriched by searching for IOC in the MISP database with the search analyzer (MISP Search Analyzer) in TheHive interface. In this way, it both imports the incoming information from MISP and exports the findings obtained as a result of the analysis back to MISP. The entire integration is configured with API keys and is easily enableable from TheHive interface.

### 4. Installation and Configuration Steps (Prerequisites)

The following components are required as **prerequisites** before installing TheHive: Java 11 (it is recommended to use an up-to-date OpenJDK distribution such as Amazon Corretto)[[15]](https://docs.strangebee.com/thehive/installation/step-by-step-installation-guide/#:~:text=Java%20Virtual%20Machine), Apache Cassandra database (e.g. 4.1.x). series)[[16]](https://docs.strangebee.com/thehive/installation/step-by-step-installation-guide/#:~:text=Apache%20Cassandra%20is%20a%20highly,x) and Elasticsearch (7.x or 8.x, analysis and search for)[[17]](https://docs.strangebee.com/thehive/installation/step-by-step-installation-guide/#:~:text=5,for%20storing%20audit%20logs). There should also be standard software and permissions such as Python 3, pip and network access (ports to use).

**Installation steps (example Ubuntu/Debian):**

* Cassandra installation: Add Apache Cassandra repository and install with the `apt install cassandra` command. Parameters like `cluster_name`, `listen_address`, etc., are edited in `/etc/cassandra/cassandra.yaml`, and the service is started and enabled for automatic startup.
* Elasticsearch installation: Elastic's 7.x repository is added and installed with the apt install elasticsearch command. In the Elasticsearch settings, the TCP port (9200) is opened and the service is started. TheHive uses Elasticsearch as its documentation and search engine[[17]](https://docs.strangebee.com/thehive/installation/step-by-step-installation-guide/#:~:text=5,for%20storing%20audit%20logs).
* TheHive installation: Can be installed as official packages or binary. For example, the .deb package from StrangeBee is downloaded and installed with dpkg -i. During installation, Cassandra and Elasticsearch connection information is entered in the application.conf file and client certificates are defined.
* Configuration and initialization: Key parameters (Cassandra hosts, Elasticsearch endpoint, user/password) are set in /etc/thehive/application.conf file. If necessary, LDAP/AD, MISP, Cortex connection settings are made. After the service is started, an administrator account is created by accessing the web interface at http://<server>:9000.

Once these basic steps are completed successfully, TheHive service is up and running and ready for use with organization-specific settings. It comes with a default administrator account. (Note: TheHive's detailed up-to-date installation documentation is available on the StrangeBee site and TheHive GitHub Wiki.)

### 5. Incident Management, Case Tracking and Task Distribution Functions

At TheHive, **alarm management and case tracking** go together. Incoming security alarms are collected on a central panel; Analysts can group similar alerts or leave comments and mark them by severity level. When there is a potential threat, this alarm becomes a new case (investigation case) with one click. It is converted into a structured case. Each case is structured into subtasks (tasks) and observables (e.g. IP, URL, file hash). As analysts progress through tasks, they record progress by making “log” entries (with Markdown support). There is no need to manually enter the same tasks every time, thanks to pre-defined *case templates* for similar types of events.

Observables attached to the case can be labeled or marked IOC, assigned various color codes (TLP)[[19]](https://strangebee.com/thehive/#:~:text=,Protocol%20level%20for%20each%20observable). If multiple cases of the same type occur, these cases can be quickly **combined**, thus avoiding repeated analysis steps. Each task within the case can be assigned to a dedicated analyst; The assignee can update the task status and enter comments. For example, according to the evaluation of one of the customer organizations, “assigning tasks to teammates and following the case” is a natural workflow[[9]](https://strangebee.com/thehive/#:~:text=TheHive%20helps%20us%20create%20and,SIEMs%2C%20Threat%20Intel%20tools%2C%20etc). When the cases are completed, a comprehensive *results report* is prepared. TheHive provides the ability to export case reports in Markdown or PDF format[[7]](https://strangebee.com/thehive/#:~:text=reporting). Thanks to this comprehensive incident management, SOC analysts can track the progress of incidents end-to-end and share status reports as documents.

### 6. Advanced Features (Automation, Playbook, Labeling, Alarm Enrichment)

TheHive's **automation capabilities** are implemented through Cortex analysis and responders. Providing access to over 200 integrated analyzers and respondersThe platform can analyze hundreds of IOCs simultaneously and initiate “playbook-like” automatic actions based on the results[[11]](https://strangebee.com/thehive/#:~:text=Automated%20analysis%20%26%20response). For example, if a high-risk domain is detected as a result of a threat analysis, this result will be responded to by a "responder" in the form of blocking in FireWall or sending an automatic e-mail to the relevant team. [[8]](https://docs.strangebee.com/cortex/#:~:text=TheHive%20can%20also%20leverage%20Cortex,of%20urgen tly%20and%20much%20more)[[11]](https://strangebee.com/thehive/#:~:text=Automated%20analysis%20%26%20response). It is also possible to create rule sets with custom JavaScript triggers that handle alarms. For example, functions can be defined to automatically run an analyzer, quarantine connections or block IP in case of a phishing alert.

**Tagging and IOC marking** are actively used at this stage. Analysts can classify information by adding unique labels to cases and observables. Assigning a TLP level to each observable in TheHive and marking it as IOC is part of the case enrichment process[[19]](https://strangebee.com/thehive/#:~:text=,Protocol%20level%20for%20each%20observable). In this way, you can quickly see and correlate recurring threat indicators in different cases.

**Alarm Enrichment:** TheHive enriches alarms by automatically integrating data from external sources. For example, relevant techniques in the MITER ATT&CK database are automatically retrieved[[13]](https://strangebee.com/thehive/#:~:text=,framework%20TTPs%20from%20MITRE%20ATT%26CK); shared IOCs from connected MISP servers can be imported[[13]](https://strangebee.com/thehive/#:~:text=,framework%20TTPs%20from%20MITRE%20ATT%26CK). Additionally, predefined triggers speed up event meaning by running automatic information collection (CTI queries, URL analysis, etc.) for an incoming alarm[[6]](https://strangebee.com/use-cases-thehive/#:~:text=TheHive%E2%80%99s%20automated%20triage%20optimizes%20alert,time%20threat%20reports). As a result, TheHive offers the opportunity to automate the process almost end-to-end, from data acquisition to case closure.

### 7. Security and Access Control Mechanisms

TheHive's architecture allows for multi-organization and role-based access control (RBAC). More than one **organization** and team can be defined; each organization may have its own pool of cases or access to common cases[[20]](https://strangebee.com/thehive/#:~:text=Multi). User accounts can be managed locally, with LDAP/AD sync, or via API key. For example, TheHive can automatically synchronize user groups by integrating with LDAP or Active Directory[[21]](https://strangebee.com/thehive/#:~:text=Advanced%20user%20management)[[22]](https://blog.thehive-project.org/tag/authentication/#:~:text=). The authorization level is configured in detail; Specific permissions (e.g. create, delete cases, read reports) can be assigned to each role. In addition, all transactions made by users are logged in the system and can be audited.

For secure access, the platform offers **user authentication** layers. Apart from standard user/password, SSO with API key, LDAP/AD login or X.509 certificate is supported[[22]](https://blog.thehive-project.org/tag/authentication/#:~:text=). Starting with TheHive 4.x versions, optional two-factor authentication (TOTP/OTP) is also available. The communication is protected by TLS encryption. Thanks to these comprehensive control mechanisms, only authorized analysts can access incident and alarm data; Data isolation between organizations can be achieved.

### 8. User Interface and Ease of Use

TheHive offers a rich web-based graphical user interface (GUI). Its menus and panels are intuitive; Shortcuts and drag-and-drop features are available for frequently used operations. For example, creating a case, assigning tasks or marking an IOC can be easily done via the interface. Emergency situations can be quickly mastered thanks to search, filtering and dynamic dashboards. According to user comments, the interface is *“user-friendly and intuitive”*. Educational requirements are low; analysts with little training can actively use the platform right away.

With its internationally supported infrastructure, TheHive's interface provides services in multiple languages. It also increases the analyst experience with its graphics (statistics panel), case timelines and forms that automatically expand according to content. As a result, TheHive's modern interface shortens the analysts' learning curve and provides ease of daily use. It provides a better experience for the team.

### 9. Comparison with Alternative Tools (Splunk SOAR, IBM Resilient, Palo Alto XSOAR etc.)

While TheHive stands out as an open source and free platform, there are also commercial SOAR solutions for similar purposes on the market. Tools like Splunk SOAR (Phantom), IBM Resilient, or Palo Alto XSOAR often offer **comprehensive integration packages**, enterprise-level support, and ready-made event processing playbooks. For example, Splunk SOAR is powerful with deep SIEM integration and extensive cloud adapter network, but has high licensing costs. XSOAR, on the other hand, has the richest automation capabilities and comprehensive scripts on the market, but licenses are costly. In contrast, TheHive offers a cost advantage as a solution focused on SOC and focused on MISP/Cortex integration. According to one user, “The best part of TheHive is its Cortex and MISP integrations, it is very suitable for case management and incident response for SOC teams”[[5]](https://strangebee.com/#:~:text=The%20best%20part%20of%20TheHive,incident%20response%20and%20case%20management). On the other hand, TheHive also has its drawbacks: community support has been limited due to commercialization coming with the fifth version (TheHive5), the learning curve is relatively steep, the user interface is simpler than some commercial counterparts found[[25]](https://aimultiple.com/open-source-soar#:~:text=,Malware%20Information%20Sharing%20Platform)[[26]](https://aimultiple.com/open-source-soar#:~:text=,friendly). In summary, TheHive is an attractive option with its scalable and open source advantage; Large companies often prefer commercial alternatives that offer enterprise support, ready-made playbooks and comprehensive integrations[[25]](https://aimultiple.com/open-source-soar#:~:text=,Malware%20Information%20Sharing%20Platform)[[26]](https://aimultiple.com/open-source-soar#:~:text=,friendly).

### 10. Community Support, Documentation and Development Status

TheHive project is supported by a large community. Official documentation and guides are available on TheHive Project's GitHub page, current posts on [blog.thehive-project.org](https://blog.thehive-project.org/), and StrangeBee's docs site (docs.strangebee.com). The developer team and user community interact through online forums (Discord chat channels, Google groups, etc.). Continuous updates are shared regularly on Twitter, Mastodon, Discord and the official blog[[27]](https://docs.strangebee.com/cortex/#:~:text=Updates%20and%20community%20discussions).

In terms of licensing, TheHive 3 series received official support (EOS) on December 31, 2021, and TheHive 4 series received official support (EOS) on December 31, 2022[[28]](https://strangebee.com/thehive/#:~:text=Can%20I%20still%20use%20TheHive,3%20and%204%20for%20free). On the other hand, the **Community Edition** version of TheHive 5 is free and has no usage time limit[[28]](https://strangebee.com/thehive/#:~:text=Can%20I%20still%20use%20TheHive,3%20and%204%20for%20free). This means the open source community can access all the features that come with TheHive 4 and continue to receive updates to the free version of TheHive 5. Subsystems such as Cortex remain open source under the AGPL license[[29]](https://docs.strangebee.com/cortex/#:~:text=License)[[28]](https://strangebee.com/thehive/#:~:text=Can%20I%20still%20use%20TheHive,3%20and%204%20for%20free).

In summary, TheHive and its components (Cortex, MISP) are actively developed projects. Users can report bugs and request new features on GitHub. The development team evaluates feedback from the community and continues to update the platform. The documents are updated regularly, and the community shares its experiences and finds answers to its questions. Thanks to this vibrant ecosystem, TheHive remains up-to-date as a SOC-focused open source solution.

---

### **Resources**

TheHive's official blog and documentation and security community reviews are taken as sources. In these resources, TheHive's features, installation steps, integrations and user feedback are discussed in detail.

#### [[1]](https://blog.thehive-project.org/2017/06/19/thehive-cortex-and-misp-how-they-all-fit-together/#:~:text=A%20case%20can%20be%20generated,text%20editor) [[2]](https://blog.thehive-project.org/2017/06/19/thehive-cortex-and-misp-how-they-all-fit-together/#:~:text=You%20don%E2%80%99t%20need%20to%20add,apply%20and%20there%20you%20go) [[3]](https://blog.thehive-project.org/2017/06/19/thehive-cortex-and-misp-how-they-all-fit-together/#:~:text=TheHive%2C%20as%20a%20SIRP%2C%20allows,preview%20new%20alerts%20to%20decide) [[10]](https://blog.thehive-project.org/2017/06/19/thehive-cortex-and-misp-how-they-all-fit-together/#:~:text=) [[12]](https://blog.thehive-project.org/2017/06/19/thehive-cortex-and-misp-how-they-all-fit-together/#:~:text=Observables%20can%20be%20tagged%2C%20flagged,you%20can%20use%20to%20add) [[14]](https://blog.thehive-project.org/2017/06/19/thehive-cortex-and-misp-how-they-all-fit-together/#:~:text=,preview%20new%20alerts%20to%20decide) TheHive, Cortex and MISP: How They All Fit Together — TheHive Project

<https://blog.thehive-project.org/2017/06/19/thehive-cortex-and-misp-how-they-all-fit-together/>

#### [[4]](https://strangebee.com/#:~:text=CERT%20Ark%C3%A9a%20has%20been%20using,precious%20time%20in%20resolving%20incidents) [[5]](https://strangebee.com/#:~:text=The%20best%20part%20of%20TheHive,incident%20response%20and%20case%20management) [[24]](https://strangebee.com/#:~:text=TheHive%20is%20a%20powerful%20and,manage%2C%20and%20analyze%20security%20incidents) StrangeBee

<https://strangebee.com/>

#### [[6]](https://strangebee.com/use-cases-thehive/#:~:text=TheHive%E2%80%99s%20automated%20triage%20optimizes%20alert,time%20threat%20reports) Use cases

<https://strangebee.com/use-cases-thehive/>

#### [[7]](https://strangebee.com/thehive/#:~:text=reporting) [[9]](https://strangebee.com/thehive/#:~:text=TheHive%20helps%20us%20create%20and,SIEMs%2C%20Threat%20Intel%20tools%2C%20etc) [[11]](https://strangebee.com/thehive/#:~:text=Automated%20analysis%20%26%20response) [[13]](https://strangebee.com/thehive/#:~:text=,framework%20TTPs%20from%20MITRE%20ATT%26CK) [[18]](https://strangebee.com/thehive/#:~:text=,framework%20TTPs%20from%20MITRE%20ATT%26CK) [[19]](https://strangebee.com/thehive/#:~:text=,Protocol%20level%20for%20each%20observable) [[20]](https://strangebee.com/thehive/#:~:text=Multi) [[21]](https://strangebee.com/thehive/#:~:text=Advanced%20user%20management) [[23]](https://strangebee.com/thehive/#:~:text=Cybersecurity%20analyst%2C%20CERT%20Gemalto) [[28]](https://strangebee.com/thehive/#:~:text=Can%20I%20still%20use%20TheHive,3%20and%204%20for%20free) TheHive

<https://strangebee.com/thehive/>

#### [[8]](https://docs.strangebee.com/cortex/#:~:text=TheHive%20can%20also%20leverage%20Cortex,of%20urgently%20and%20much%20more) [[27]](https://docs.strangebee.com/cortex/#:~:text=Updates%20and%20community%20discussions) [[29]](https://docs.strangebee.com/cortex/#:~:text=License) Home — TheHive 5 Documentation

<https://docs.strangebee.com/cortex/>

#### [[15]](https://docs.strangebee.com/thehive/installation/step-by-step-installation-guide/#:~:text=Java%20Virtual%20Machine) [[16]](https://docs.strangebee.com/thehive/installation/step-by-step-installation-guide/#:~:text=Apache%20Cassandra%20is%20a%20highly,x) [[17]](https://docs.strangebee.com/thehive/installation/step-by-step-installation-guide/#:~:text=5,for%20storing%20audit%20logs) Step-by-Step Installation Guide — TheHive 5 Documentation

<https://docs.strangebee.com/thehive/installation/step-by-step-installation-guide/>

#### [[22]](https://blog.thehive-project.org/tag/authentication/#:~:text=) Authentication — TheHive Project

<https://blog.thehive-project.org/tag/authentication/>

#### [[25]](https://aimultiple.com/open-source-soar#:~:text=,Malware%20Information%20Sharing%20Platform) [[26]](https://aimultiple.com/open-source-soar#:~:text=,friendly) Top 5 Open Source SOAR Tools in 2025

<https://aimultiple.com/open-source-soar>

#### [[30]](https://linuxsecurity.expert/tools/thehive/#:~:text=TheHive%20is%20scalable%20and%20a,to%20start%20analyzing%20from%20there) TheHive review (security incident response platform) — Linux Security Expert

<https://linuxsecurity.expert/tools/thehive/>