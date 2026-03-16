---
date: '2025-10-02'
description: Wazuh combines its Host-Based Intrusion Detection System (HIDS) legacy with modern cybersecurity needs, bringing Security Information and Event Management (SIEM) and Extended Detection and Response (XDR) capabilities into a single platform. Wazuh 5.0...
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/0*EOeMobbpF6asHcmm
layout: single
series:
- Wazuh SIEM
title: What's New in Wazuh 5.0? Revolution in Cyber ​​Threat Intelligence and a New Era in Endpoint Security
type: posts
---

### What's New in Wazuh 5.0? Revolution in Cyber Threat Intelligence and a New Era in Endpoint Security



[wazuh](https://wazuh.com/)

Wazuh combines its Host-Based Intrusion Detection System (HIDS) legacy with modern cybersecurity needs, bringing Security Information and Event Management (SIEM) and Extended Detection and Response (XDR) capabilities into a single platform. Wazuh 5.0 takes this combination to the next level, offering groundbreaking innovations in stability, scalability and threat intelligence, especially in large-scale and high-volume environments. The platform is completely open source and its components are subject to open source licenses such as **GNU GPL v2** and **Apache 2.0 (ALv2)**.

### 1. Core Components, Stability and Distributed Architecture (CLUSTER)

#### Managing Thousands of Agents: Highly Available (HA) Distributed Architecture

Today's dynamic digital environments require instantaneous management of events from thousands of Agents. Since a single Manager architecture cannot handle this load, the main recommended approach for production environments with 500–1000+ Agents is a distributed architecture based on **horizontal scaling**.

#### **Main Components of the Proposed Distributed Structure:**

1. **Wazuh Manager Cluster (Cluster):** Multiple Manager nodes are used to balance the workload. Agent keys, custom decoders/rules, and Agent liveness states are constantly synchronized between Manager nodes to ensure horizontal scalability.
2. **Load Balancer:** Agents are positioned behind the Load Balancer to report to all Manager nodes without the need to change their configuration.
3. **Indexer Cluster (OpenSearch):** Used to meet long-term storage, large volume log management and compliance requirements.

**Manager Performance Optimizations:** In recent versions, optimizations have been made to core components to increase the scalability and performance of the Manager. This includes improved `wazuh-db` protocol to support large HTTP requests and improved `Authd` connection management to manage concurrent Agent registration requests more efficiently. These improvements strengthen stability in managing high Agent numbers.

Installing components (Manager, Indexer, Dashboard) on different servers (Multi-node) ensures isolation of each workload, preventing performance bottlenecks under high event volumes and increasing platform stability.

#### Indexer Clustering (OpenSearch) and Secure Communication

In the Wazuh Indexer (OpenSearch) cluster, stability is increased by assigning roles to nodes:

* **Data Nodes:** The data node is responsible for storing and searching data. They perform all data-related operations (indexing, searching, aggregation) on local shards and are the worker nodes of the cluster. It is recommended to customize node types (master-eligible, data, ingest) depending on the use case.

**Secure Communication (TLS/Certificates):** Wazuh uses certificates to ensure trust and confidentiality between its central components (Indexer, Filebeat and Dashboard). **Root CA certificate** authenticates all nodes and the node's IP address or DNS name must be included in the certificate when communicating.

#### Wazuh Agent Changes and End of Legacy OS Support

Wazuh Agent is a universal agent designed to monitor and collect logs from various endpoints such as Windows, UNIX, macOS, Solaris, AIX or HP-UX. The agent works efficiently to optimize resource usage, with an average consumption of **35 MB RAM**.

**Critical Changes (End of Legacy OS Support):** With Wazuh 5.0.0, Agent support has **ended** for some legacy operating systems such as Red Hat 5, CentOS 5, Oracle Linux 5, SUSE Linux Enterprise Server 11, Windows XP, Windows Vista, Windows Server 2003, Solaris, AIX and HP-UX.

### 2. New Features and Improved Modules

#### Game Changing Innovations: CTI and Advanced Vulnerability Detection

Wazuh 5.0's biggest contribution is to modernize existing HIDS capabilities, **combining SIEM and XDR capabilities** to the overall security posture of the platform.

**Highlight Innovation: Expanded CTI Scope:** Wazuh Cyber Threat Intelligence (CTI), which initially focused on vulnerability intelligence, significantly expands its scope with 5.0:

* **Indicators of Attack (IOCs):** IP addresses, file hashes, and critical IOCs such as URLs will be added.
* **Direct Rule Provision:** Threat detection rules will be provided to the platform directly and up to date from the Wazuh CTI platform.

#### Improved Vulnerability Detector

The Vulnerability Detection module works by using system inventory data collected from the Agent and associates them with current vulnerability information received from the CTI platform.

**Accuracy and Data Sources:** The CTI platform collects data from trusted security databases and OS vendors such as NVD, Microsoft Security Updates (MSU), and CISA. Particularly on Windows systems, the module is capable of detecting patched packages and can update the status of vulnerabilities in the inventory using information provided by Microsoft to verify whether these patches have resolved the relevant CVEs.

#### eBPF Based FIM (File Integrity Monitoring) Advantages

The File Integrity Monitoring (FIM) module has gained support for **eBPF (Extended Berkeley Packet Filter)** in Linux endpoints, and this feature is at the core of the platform in 5.0.

**Technical Advantages of eBPF:**

* **Efficiency:** eBPF runs directly within the kernel to detect file and directory changes in real time. This speeds up event collection rather than relying on external dependencies like the Linux Audit system.
* **Context Capture (Who-Data):** eBPF provides more advanced context capture by identifying the user and process (who-data) responsible for changes.
* **Fallback:** When eBPF is unavailable, Wazuh automatically falls back to traditional systems such as the Linux Audit system or inotify.

### 3. Rule Writing, Analysis and Alerting Mechanisms

#### Ruleset Optimization

When writing custom rules, it is critical to use ID numbers between **100000 and 120000** to avoid conflicts with system rules.

#### Rule Enrichment with MITRE ATT&CK Framework

Wazuh integrates with the MITRE ATT&CK framework and automatically matches the alerts it generates with standardized cyber attack tactics and techniques (TTPs). By using the `<mitre>` tag in rule writing, the rule can be enriched by adding MITRE Technical IDs specific to the alert triggered by the rule.

#### **Example MITRE ATT&CK Rule Matching (.xml):**

```
<group name="syslog,sshd,">  
  <rule id="100011" level="10" frequency="5" timeframe="60">  
    <if_matched_sid>5710</if_matched_sid>  
    <same_source_ip />  
    <description>Multiple SSH failed attempts from same source IP (Brute Force Detected).</description>  
    <mitre>  
      <tactic>Initial Access</tactic>  
      <technique>T1110</technique>  
      <id>T1110</id>  
    </mitre>  
  </rule>  
</group>
```

#### Sample Rule and Alerting Scenarios

#### Error Threshold Detection:

Manager's correlation capability provides critical threshold detection with a rule mechanism that counts repeated events within a certain period of time. For example, a rule that detects 5 repeated failed SSH attempts within 60 seconds could generate a high-level alert to administrators.

#### Critical FIM Detection (High Level Alert):

With custom rule writing it is possible to associate FIM events with a specific directory (for example /etc/security/) and a specific user (root user). A special rule (level 10+) ensures the protection of critical system files by performing specific filtering that only detects file changes made by root in this directory.

### 4. Active Response (Actions) and Action Examples

The Active Response module uses processed log data for threat detection and response. The module enables security teams to immediately respond to high-severity incidents. Wazuh offers out-of-the-box scripts to automate these processes.

These automatic response actions cover a wide range of topics, including:

* **IP Blocking:** Blocking malicious network access. (`firewall-drop` script).
* **Host Isolation:** Isolating compromised endpoints from the network to prevent the spread of the threat.
* **Malicious File Deletion/Hash Blocking:** Deleting or quarantining malicious files detected on monitored endpoints.
* **Account Deactivation:** Disabling user accounts after suspicious login attempts. (`disable-account` script).

**Load on Manager:** Active Response sends scripts to Agents. Since it runs on 's (usually `location: local`), the action load is distributed to Agents. This minimizes the load on the Manager.

#### Sample Action Scenario (Firewall Blocking)

When a high-level alert (for example, Rule ID 5712) is triggered, the following definition can be added to the Manager configuration (ossec.conf) to temporarily block the IP address mapped to the rule:

```
<active-response>  
  <command>firewall-drop</command>   
  <location>local</location>   
  <rules_id>5712</rules_id>   
  <timeout>1800</timeout>   
</active-response>
```

This configuration temporarily blocks the IP address triggered on the Agent reporting the event on the local firewall for 1800 seconds using the `firewall-drop` command.

### 5. Relationship between Compliance, OSSEC and OpenSearch

#### Legal Compliance and SCA Developments

Wazuh supports regulatory compliance by providing automation, log analysis and incident response. Wazuh's default ruleset offers support for the following critical regulatory compliance standards: **PCI DSS, HIPAA, NIST 800–53, TSC, GDPR**.

**The Role of the SCA Module and New Policies:** The **Security Configuration Assessment (SCA)** module periodically checks the compliance of configurations with security policies. Wazuh allows the creation of new SCA policies for **Distribution Independent Linux**, meaning the expansion of hardening policies independent of the Linux distribution.

**Wazuh Dashboard Compliance Dashboards:** Wazuh Dashboard offers **out-of-the-box dashboards** for regulatory compliance standards such as PCI DSS, GDPR, HIPAA, and NIST 800–53. It is also known that Dashboard has undergone a comprehensive redesign process to improve the user experience (UX) from start to finish and fully support the new features brought by 5.0.

#### OSSEC/XDR Combination and Indexer Stabilization

Wazuh 5.0 modernizes the core capabilities of OSSEC (FIM, Log Analysis) in terms of HIDS and combines them with XDR and SIEM features.

The Indexer component plays a critical role in storing and archiving processed log data. Indexer's long-term storage capacity helps meet long-term log retention and compliance audit reporting requirements mandated by standards such as **PCI DSS (Requirement 10)**. Wazuh has moved away from old integration applications after v4.6 and focused on the strategy of integrating with OpenSearch and other third-party platforms (Splunk, Elastic) directly through Indexer or Server.

### Result

Wazuh 5.0 is not just a version upgrade, but a strategic advancement that demonstrates the maturity of the cybersecurity platform. While it offers deeper visibility against threats with its Extended Cyber ​​Threat Intelligence (CTI), it brings stability and high availability (HA) to today's high-volume environments with thousands of Agents with its horizontally scalable architecture. Additionally, technical optimizations such as eBPF-based FIM increase performance, and Active Response automation accelerates incident response processes. Using the innovations that come with 5.0, organizations can strengthen their security posture and manage their legal compliance obligations more effectively.