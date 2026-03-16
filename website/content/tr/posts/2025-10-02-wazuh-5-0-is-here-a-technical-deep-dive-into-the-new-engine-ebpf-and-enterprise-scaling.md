---
series: ["Wazuh"]
title: "Wazuh 5.0 is Here: A Technical Deep Dive into the New Engine, eBPF, and Enterprise Scaling"
date: 2025-10-02
draft: false
---

---

### Wazuh 5.0 is Here: A Technical Deep Dive into the New Engine, eBPF, and Enterprise Scaling

![](https://cdn-images-1.medium.com/max/800/0*5VajKV0S7rEIU9VN)

[wazuh](https://wazuh.com/)

Wazuh 5.0 marks a foundational overhaul of the platform, shifting its core architecture to embrace next-generation capabilities required for true XDR and large-scale SIEM environments. For security teams and architects managing hundreds or thousands of endpoints, this release delivers not just new features, but the underlying performance and resilience needed to maintain real-time threat detection under immense load.

This analysis breaks down the strategic architectural changes, the new performance drivers, and the practical configurations required to maximize the value of Wazuh 5.0 in a production setting.

---

### Part I: Scaling to the Enterprise — Why Your Wazuh 5.0 Architecture Must Evolve

For any organization scaling beyond a few hundred agents (e.g., 500–1,000+), the single-server “All-in-one” deployment introduces unacceptable instability. The 5.0 architecture mandates a decoupled, multi-node structure to ensure High Availability (HA) and predictable performance.

### The Mandatory Distributed Architecture

For reliable operation, the three core components must be isolated onto dedicated servers: the Wazuh Manager Cluster, the Wazuh Indexer Cluster (OpenSearch), and the Wazuh Dashboard.

This separation is critical because the components perform fundamentally different, often competing, tasks:

ComponentPrimary FunctionResource DemandRisk in All-in-One Setup**Wazuh Manager**Real-time decoding, rule correlation, analysisCPU-intensive processingLatency spikes during high I/O load**Wazuh Indexer (OpenSearch)**Indexing, storage, data retrieval, queryingI/O-intensive disk operationsManager starves for CPU/RAM during indexing bursts

Decoupling ensures that even during massive log ingestion or complex dashboard queries on the Indexer, the Manager’s core mission — real-time threat detection — remains stable and isolated.

### Manager Cluster (HAC) and Load Distribution

The Wazuh Manager Cluster provides horizontal scalability using a Master/Worker model:

* **Master Node:** Handles centralized coordination, managing agent registration, and synchronizing shared content (custom rules, decoders, Security Configuration Assessment policies) across all nodes.
* **Worker Nodes:** Perform the bulk of the decoding and analysis workload by processing events from agents.

Crucially, **High Availability and Load Distribution are achieved using an external Layer 4/Layer 7 Load Balancer.** Agents are configured to connect to this external device (typically over TCP 1514), which then distributes traffic to the available Worker nodes (e.g., using round-robin). The internal **Cluster Daemon (TCP 1516)** is reserved exclusively for the critical task of state synchronization (agent keys, configuration files) between the Master and Workers, ensuring all nodes operate from a consistent security baseline.

### Indexer Cluster Design for Data Resilience

The Indexer (OpenSearch) cluster must prioritize data integrity and throughput. A stable production environment requires a minimum of three dedicated **Master-eligible nodes** to maintain quorum and prevent split-brain scenarios, guaranteeing cluster state stability.

The heavy lifting of storage and indexing is managed by **Data Nodes**. These nodes execute indexing and searching operations and should be provisioned with high-speed I/O and substantial RAM to handle the sheer volume of security logs required for long-term compliance and forensic auditing. Secure communication across the entire environment (Agent to Manager, Manager to Indexer, Indexer to Dashboard) is secured via **TLS/Certificates**, a non-negotiable step that ensures data integrity and confidentiality with negligible performance impact on modern hardware.

---

### Part II: Under the Hood — The Engine that Drives Wazuh 5.0 Performance

The core architectural change in 5.0 is the foundational replacement of the legacy `Analysisd` component.

### The New Wazuh Engine

The former `Analysisd` module, historically a bottleneck in high-EPS environments, has been replaced by the **Wazuh Engine**. This is a significant re-architecture of the core processing pipeline designed to dramatically increase event throughput and processing scalability. While internal logic is overhauled for efficiency, the critical output interfaces—such as the standard alert format (`alerts.json`) and core logs—are maintained, ensuring compatibility with existing downstream SIEM integrations while unlocking superior speed.

### Agent Optimizations and Modernization

The 5.0 Agent includes several performance improvements focused on stability and efficiency:

* **Reduced Synchronization Overhead:** Agent synchronization mechanisms were refined to reduce redundant payload transfers, decreasing network usage and speeding up the distribution of configuration updates to large fleets.
* **Enhanced Service Performance:** Improvements to the Wazuh-DB protocol support larger HTTP requests and boost JSON handling performance, resulting in faster administrative queries and monitoring tasks. Furthermore, the Authd service, responsible for new agent enrollment, now uses `epoll` to better handle concurrent registration requests during mass rollouts.

### Strategic End-of-Life for Legacy Platforms

Wazuh 5.0 makes a clear strategic move toward modern kernel dependencies by formally discontinuing support for several legacy operating systems. This includes:

* Red Hat 5, CentOS 5, and Oracle Linux 5
* SUSE Linux Enterprise Server 11
* Windows XP, Windows Vista, and Windows Server 2003
* Solaris, AIX, and HP-UX

This decision allows the development team to focus resources on enhancing features that rely on modern OS capabilities, notably the new eBPF module, while forcing organizations to address the security risk posed by these obsolete endpoints.

---

### Part III: Next-Gen XDR — eBPF and CTI Integration

Wazuh 5.0 elevates its XDR capabilities through low-level kernel integration and enhanced threat intelligence.

### The Power of eBPF-Based File Integrity Monitoring (FIM)

The new eBPF (Extended Berkeley Packet Filter) integration for FIM on Linux systems represents a major leap in real-time detection performance.

**Technical Advantages:**

1. **Low-Latency Performance:** eBPF allows file system event monitoring to execute directly within the operating system kernel context. This eliminates the overhead associated with traditional methods like scheduled scans or resource-intensive kernel notification services (`inotify`), delivering near-zero-latency detection.
2. **XDR Contextualization (“Who-Data”):** The most significant benefit is the real-time capture of **user and process context** (who-data). FIM events now include the User ID (UID), username, Process ID (PID), and process name responsible for the file change. This enables immediate forensic correlation, allowing security teams to link a critical file modification directly to a specific malicious process and user session, greatly accelerating investigation and automated response (e.g., process termination).
3. **Resilience:** The FIM module automatically prioritizes eBPF and falls back to Auditd or inotify if eBPF is unavailable on the endpoint, ensuring broad compatibility.

### Enhanced Vulnerability Detector (VD)

The Vulnerability Detection module has been strengthened through integration with the central **Wazuh Cyber Threat Intelligence (CTI)** platform. This platform aggregates and maintains vulnerability data from numerous trusted sources, including official operating system vendors (RHEL, Ubuntu, AlmaLinux, Rocky Linux) and major security databases (NVD, Microsoft Security Updates, CISA).

**Accuracy Improvements:**

* The module now supports the **re-indexing of CVEs** when underlying threat intelligence documents change, ensuring continuous data freshness.
* For Windows systems, enabling the optional `hotfixes` setting in the agent's Syscollector allows the module to accurately verify whether a detected patch successfully resolves the associated CVEs, thereby updating the vulnerability status and significantly reducing false positives.

The VD’s inventory-based approach seamlessly supports vulnerability assessment across modern, ephemeral environments, including container images and cloud instances.

---

### Part IV: Automated Response and Ruleset Precision

Leveraging the new Engine’s speed requires sophisticated rule logic and robust automation.

### Ruleset Optimization Best Practices

While the syntax for writing custom rules and decoders remains in XML configuration files, performance depends on precision. To boost performance in high-volume environments, rule writing must focus on minimizing resource consumption: utilize highly efficient filtering mechanisms like checking for event groups (`<if_group>`) or existing Rule IDs (`<if_sid>`) before applying resource-intensive Regular Expressions.

### Example Rules for High-Fidelity Detection

#### 1. Threshold Anomaly Detection (SSH Brute Force)

This correlation rule detects an anomaly in login attempts by tracking failed activity over time and applies an automated response action.

```
<group name="syscheck, authentication, sshd,">  
<rule id="100001" level="12" frequency="5" timeframe="60">  
    <if_matched_sid>5710</if_matched_sid>  
    <same_source_ip />  
    <description>SSHD Brute Force Attack Detected (5 failed attempts in 60s)</description>  
    <field name="action">ActiveResponse:firewall-drop:600</field>  
  </rule>  
</group>
```

The combination of `<frequency="5">`, `<timeframe="60">` (seconds), and `<same_source_ip />` ensures a high-severity alert (Level 12) only triggers when five failed attempts occur from the exact same source within one minute.

#### 2. Critical FIM Detection (Root Modification in Critical Directory)

This rule leverages the “who-data” provided by the FIM module to pinpoint a specific actor (the root user) performing a specific action (file modification) in a highly sensitive location (`/etc/security/`).

```
<group name="syscheck, fim, critical_config,">  
<rule id="100002" level="14">  
    <if_sid>550</if_sid>  
    <field name="file">/etc/security/</field>  
    <regex>modified</regex>  
    <field name="user">root</field>  
    <description>CRITICAL FIM: Root user modified file in highly sensitive /etc/security directory.</description>  
    <field name="extra_data" type="pcre2">(?i)process:\s*(\S+)</field>  
  </rule>  
</group>
```

By filtering on `<field name="user">root</field>`, the rule ensures maximum fidelity (Level 14) by using contextual FIM data, making it an ideal candidate for immediate Active Response triggering.

### Active Response Expansion and Load Management

The Active Response (AR) module is the platform’s XDR capability for automated counteractions, supporting both stateless (one-time) and stateful (timed, reversible) responses. Actions include firewall blocking, account disablement, and automated actions like process termination or agent isolation, reducing the response gap during critical incidents.

To manage the load and prevent alert bursts from overwhelming the Manager, the primary load control mechanism is the **Wazuh Agent Queue (**`queue_ad`**)**. This mechanism operates as a leaky bucket queue that throttles event forwarding from the Agent to the Manager, ensuring the Agent does not transmit events faster than the Manager cluster can analyze them. This crucial component preserves the stability of the analysis engine during security incidents.

### Example Action Scenario: Stateful IP Blocking

The following configuration blocks the source IP address that triggered Rule 100001 (SSH Brute Force) for 600 seconds (10 minutes).

**1. Define the Command (on Wazuh Manager in** `/var/ossec/etc/ossec.conf`**):**

XML

```
<ossec_config>  
  <command>  
    <name>firewall-drop</name>  
    <executable>firewall-drop</executable>  
    <timeout_allowed>yes</timeout_allowed>  
  </command>  
</ossec_config>
```

The `timeout_allowed="yes"` flag enables stateful behavior, allowing the action to be automatically reversed.

**2. Define the Active Response Trigger (on Wazuh Manager in** `/var/ossec/etc/ossec.conf`**):**

```
<ossec_config>  
  <active-response>  
    <disabled>no</disabled>  
    <command>firewall-drop</command>  
    <location>local</location>  
    <rules_id>100001</rules_id>  
    <timeout>600</timeout>  
  </active-response>  
</ossec_config>
```

The `<location>local</location>` setting ensures the `firewall-drop` script is executed on the *agent* that generated the alert, blocking the malicious IP address locally on the victim system. The `<timeout>600</timeout>` setting dictates that the firewall rule will be automatically reversed after 10 minutes.

---

### Part V: Compliance, Configuration, and the Data Backbone

Wazuh 5.0 is designed as a compliance accelerator, providing audit-ready visibility and data integrity.

### Comprehensive Compliance Support

Wazuh directly assists organizations in meeting the technical control requirements for major global standards, including **PCI DSS, HIPAA, NIST 800–53, and GDPR**. The Wazuh Dashboard includes pre-built compliance dashboards and reports tailored to these frameworks, enabling continuous monitoring of the environment’s posture and simplifying the generation of verifiable artifacts for external audits.

### Security Configuration Assessment (SCA)

The SCA module is essential for system hardening by continuously verifying configurations against security benchmarks. A key enhancement for large, mixed Linux environments is the introduction of **distribution-agnostic policies**. These simplified policies use generalized checks that apply across various Linux distributions (e.g., Debian, RHEL, Ubuntu families), drastically reducing the complexity and maintenance overhead associated with managing heterogeneous fleets.

### Modernizing OSSEC and Data Integrity

Wazuh 5.0 represents the full modernization of the foundational Host-Based Intrusion Detection System (HIDS) capabilities inherited from OSSEC. By fusing OSSEC’s core log analysis and FIM strengths with modern features like the new Engine, eBPF, and CTI, Wazuh delivers a unified XDR and SIEM platform.

Crucially, the Indexer Cluster (OpenSearch) serves as the mandated data integrity layer. By using sharding and replication across multiple nodes, the OpenSearch architecture guarantees the durability and secure long-term storage of high-fidelity security logs. This high availability and data resilience are indispensable for fulfilling stringent, multi-year retention requirements mandated by major compliance audits.