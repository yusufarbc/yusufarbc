---
title: "ELK Stack Rule Writing and Alerting"
date: 2024-11-16
draft: false
---

---

### ELK Stack Rule Writing and Alerting

![](/images/1_YtvtZTc7PJHVByo3n9E_lg.png)

Hello, in this article, I will talk about rule writing, that is, warnings indicating security violations, and alerting operations of ELK Stack, which we installed in my last article. **ELK Stack** (Elasticsearch, Logstash, Kibana) facilitates rule writing and alerting operations, data analysis and management.

### What are IoC and IoA ?

**IoC (Indicators of Compromise)** and **IoA (Indicators of Attack)** are important concepts in the field of cyber security and are used in the detection and analysis of attacks.

These markers are critical in detecting and stopping an attack. While IoC detects that an attack has occurred, IoA helps understand the methods and objectives of the attack.

#### Indicators of Compromise (IoC)

IoC are indicators that indicate the presence of malicious activities or attacks on a system. These markers help detect that an attack or breach has occurred. Examples of IoC may include:

* **Malware Signatures**: Signatures of known malware.
* **IP Addresses**: IP addresses linked to malicious activity.
* **Domain Addresses**: Domain names associated with malicious activities.
* **File Hash Values**: Hash values ​​of malicious files.

#### Indicators of Attack (IoA)

IoA are indicators that indicate that an attack is being carried out or is in the process of occurring. IoA helps understand the methodology of the attack and the attacker's objectives from a broader perspective. Examples of IoA may include:

* **Strange User Behavior**: User behavior that differs from normal, such as unauthorized data access attempts.
* **System Changes**: Unexpected system configuration changes.
* **Command and Control Traffic**: Attacker's attempts to communicate with the system remotely.
* **File System Changes**: Unexpected file additions or deletions.
* **Exploiting Software Vulnerabilities**: Attempts to exploit known software vulnerabilities.

---

### Elastalert

Elastalert allows you to create alerts when certain conditions occur in Elasticsearch. Elastalert can be configured with specific filters and conditions, and alerts can be notified across various channels such as email, webhook, Slack. see: <https://elastalert.readthedocs.io/en/latest/elastalert.html>

![](/images/1_49Mk87Ovld-HkJr8fx3uUA.png)

ELK Stack

ElastAlert is a simple framework for alerting about anomalies, spikes, or other interesting patterns from data in Elasticsearch.

If you are writing data to Elasticsearch in real time and want to receive alerts when this data matches certain patterns, ElastAlert is the tool for you.

Kibana provides an easy interface to create and manage alerts in Elasticsearch. In Kibana, you can create new alerts and manage existing alerts in the alerts and actions section.

---

### Alerting

Alerts mean being notified automatically when certain conditions or anomalies are detected. Alerts in Elasticsearch optimize data analysis and management processes.

Rule writing ensures that certain actions are taken when certain conditions are met. APIs and tools used for rule writing in Elasticsearch include Elastalert and Kibana.

#### Kibana Warnings

You can follow the steps below to create and manage alerts in Kibana:

1. **Login to Kibana**: Log in to Kibana and go to the administration section.
2. **Go to Alerts and Actions Section**: You can create new alerts in the Alerts and actions section.
3. **Configure Alert**: Configure the alert with specific filters and conditions.
4. **Link Actions**: Link alerts to various channels such as email, webhook, Slack.

![](/images/1_HOGFGHf9G27KLYAsknxMTQ.png)

Rules Menu

![](/images/1_bs5pPfXzAcVKHNfjcZ0TRQ.png)

Rule Type

![](/images/1_lxEwyHDi0nyIRYpEKS4skg.png)

Create Rule

For example, we activated the CPU usage rule. If the CPU Usage rate on the machine exceeds 10%, a warning will be generated.

You can write all kinds of rules through this menu.

---

### The Changing Face of Threat-Oriented Defense Strategy

In the field of cyber security, threat-informed defense strategy replaces traditional signature-based detection methods.It has become increasingly important in a period when it remains sweatless. While traditional approaches focus on known malware types, modern attackers are constantly changing their tactics and techniques, trying to bypass defenses. At this point, the MITER ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) framework has become a transformative resource for the cybersecurity world.

MITER ATT&CK is a globally accepted knowledge base that structures the lifecycle of an attack into tactics (the attacker's goals) and techniques (the methods he uses to achieve those goals). This framework enables the creation of a more resilient defense mechanism by focusing on the behavioral patterns of attackers rather than the tools they use. Rather than blocking a specific software used by an attacker, targeting the behavior of that software at stages such as Discovery, Execution or Privilege Escalation makes defense strategies more comprehensive and flexible. This approach allows security teams to understand attacks in a more holistic context, conduct threat hunting, and respond to incidents more effectively. Additionally, ATT&CK has become a critical tool for assessing security maturity by creating a common language about threats among different stakeholders, such as the security operations center (SOC), threat intelligence, and executives.

### ELK Stack: The Open Source Heart of the Modern SOC

ELK Stack is an open source and extremely popular platform used for log management and analysis. It consists of three main components, Elasticsearch, Logstash and Kibana, and they work together to transform raw log data into actionable security information. As a distributed and RESTful search and analysis engine, Elasticsearch stores chunked log data as JSON documents and makes it instantly queryable. Thanks to its horizontal scalability architecture, it can easily manage high volumes of data and query load.

Logstash is at the center of the data processing pipeline, taking data from various sources (files, system logs, databases) and processing, transforming and enriching them. This process consists of three main stages: inputs, filters and outputs. Filters make data more meaningful by performing actions such as separating unstructured data into meaningful fields (using `Grok` patterns) and adding geolocation information based on IP addresses. Finally, Kibana is an intuitive web interface for visualizing data stored in Elasticsearch. Users can create interactive dashboards, apply filters, and search raw log data. Modern versions of Kibana also include machine learning-based anomaly detection and alerting features.

ELK Stack serves a variety of use cases such as log management, infrastructure monitoring, application troubleshooting and security analysis. However, it should be noted that this platform is not a full-fledged “out of the box” SIEM (Security Information and Event Management) solution. Although ELK provides log collection, processing, storage, and query capabilities, it requires additional components or custom configurations for features such as complex event correlation, built-in alert mechanisms, and automatic incident response capabilities. Therefore, the purpose of this report is to provide a structured rule set and integration guide that uses ELK's strengths to close these gaps and make sense of threats within the MITER ATT&CK framework.

### Basic Configurations and Resources Required for the Ruleset

The basis of creating a MITER ATT&CK-focused rule set on an ELK infrastructure lies in collecting the correct log sources, standardizing this data and processing it efficiently. This section details these basic configurations that are essential to maximize detection capabilities.

### Map of Log Resource Requirements

The most important log sources required to detect an attacker's behavior vary depending on the environment in which the attack occurs. Different data sources are vital for each of the MITER ATT&CK Enterprise, Mobile and ICS domains.

**Mandatory Logs for Windows Systems:**

* **Sysmon:** Sysmon (System Monitor) is a Windows system service that captures critical security events such as process creation, network connections, and file access on the system through Windows Event Logs. Especially Sysmon's Event ID 1 (Process creation) event is a much more valuable resource than Windows' default security logs for detecting techniques such as T1059 (Command and Script Interpreter) and T1087 (Account Discovery) because it provides rich data such as a process's full command line arguments, host process information, and hash values.
* **Windows Security Event Logs:** In addition to Sysmon, Windows' built-in security logs record important events related to account management. For example, creating, deleting, or adding/removing a user account to a group provides critical data to detect behaviors that attackers use to establish persistence or escalate privilege.

**Mandatory Logs for Linux Systems:**

* **Auditd:** In Linux, the `auditd` service is used to monitor kernel-level activities such as system calls, file accesses, and process creation. `Auditd` logs are an indispensable source in detecting the behavior of attackers (e.g. commands such as `net.exe`) after infiltrating a system. `Filebeat` and `Auditd Manager` integrations allow these logs to be easily transferred to ELK.

**Network and Other Resources:**

* **Network Flow Logs:** Network traffic flow logs (e.g. NetFlow) or data collected through tools such as `Packetbeat` are vital to detect reconnaissance tactics such as T1046 (Network Service Discovery). These logs are used to identify abnormal connection attempts (port scanning) from one source to multiple destinations or ports.
* **Insight:** The effectiveness of the ruleset depends not only on the availability of log sources, but also on the quality of the data collected. Just collecting logs is not enough; Logs must contain enriched information (command line arguments, user names, main processes) that clearly reveals the attacker's purpose and actions. This is a critical element to maximize detection capabilities.

### Data Normalization: Standardization with Elastic Common Schema (ECS)

Different platforms and devices produce log data, each in a unique format. This makes analyzing log data, correlating it, and creating threat hunting queries extremely complex. Elastic Common Schema (ECS) is an open source specification developed to solve this problem, defining a standard set of fields for use when storing event data in Elasticsearch.

ECS standardizes data by providing common field names (such as `process.name`, `source.ip`, `destination.port`) for different log types (e.g. Windows events, Linux processes, network traffic). This standardization facilitates data correlation between log sources and makes it possible to pull data from multiple sources with a single query. This eliminates the burden for security analysts to write separate queries for each log format and speeds up discovery processes.

A security team saves time with ECS-compliant data when hunting for threats or performing root cause analysis of an incident. The attacker can understand much more quickly how the process started in one system connects to another system over the network or which files it changes, by associating data from different log sources with a single standard query. This significantly reduces incident response teams' time to detect (MTTD) and time to respond (MTTR) to an incident.

### Data Processing Pipelines: Logstash and Ingest Node

Raw log data must be processed and enriched before making it suitable for detection rules. ELK Stack has two primary mechanisms for this process: Logstash filters and Elasticsearch Ingest Node pipelines. Each has its own advantages and ideal usage scenarios.

* **Logstash Filters:** Logstash has a flexible architecture consisting of input, filter and output stages. In particular, `Grok` filters are very powerful at separating unstructured text-based logs into meaningful areas through predefined patterns. These filters are ideal for applying enrichment operations to logs, such as geolocation information (`geoip`), field transformation (`mutate`) or conditional processing (`if`). Logstash acts as a middleware in the data flow, allowing complex processing of the data before it is sent to Elasticsearch.
* **Elasticsearch Ingest Node Pipelines:** Ingest Node runs within the Elasticsearch cluster andIt is a feature that performs simple transformations right before the data is indexed. Ingest Node, which targets lighter and simpler operations than Logstash, is especially suitable for performing basic transformations on data with processors such as `grok` or `set`. These pipelines, which can be automatically configured through integrations, can simplify the architecture in scenarios that do not require the complexity of Logstash.

Making a strategic choice between both methods is important for the performance and scalability of the infrastructure. Sources indicate that Logstash is better suited for complex data transformation, enrichment, different input sources and multiple output targets, while Ingest Node simplifies the architecture for simpler processing needs. While using Logstash may be preferable in situations with heavy log volume or a complex data processing requirement, for simpler 'Grok' or field conversion operations, Ingest Node offers the potential to simplify the architecture and reduce management burden.

### Rules Format and Metadata Standards

While MITER creates a rule set focused on ATT&CK, ensuring that each rule complies with a specific standard and structure increases the manageability of the rule set and its usability for the security team. This section describes the basic components of the rule structure and proper methods of association with MITER ATT&CK.

### Rule Configuration Methodology

Each rule should contain key components to effectively detect threats and provide actionable information to security teams. These components are:

* **Rule ID (**`rule_id`**):** There must be a unique identifier for each rule. This identity makes it easy to track, update, and report on the rule throughout its lifecycle. For example, it is recommended to use a descriptive ID such as `PS-Encoded-Cmd-Detection-001`.
* **Severity (**`severity`**):** It is a value that shows the potential impact of the event triggered by the rule. Typically, ratings such as `Critical`, `High`, `Medium` or `Low` are used. This helps security analysts determine which alarms they should prioritize.
* **Description (**`description`**):** It is the text that clearly explains what the rule detects, why it is important and what goal the attacker is trying to achieve. A well-written description speeds up the triage phase of an incident.

### MITER ATT&CK Labeling

One of the most important elements of the rule set is that each rule is accurately labeled with the MITER ATT&CK tactic and technique it identifies. This tagging puts raw log data into the context of the attack, allowing security teams to more quickly understand the intent behind an incident.

When creating a rule in Kibana, it is possible to add these tags via custom fields such as `mitre.tactic` and `mitre.technique_id`. For example, the JSON output of a rule might look like this:

```
{  
  "mitre.technique_id": "T1059",  
  "mitre.tactic": "execution"  
}
```

These tags act as a bridge for security analysts, allowing them to instantly understand what the attacker is trying to do (tactics) and what method (technique) they are using when they see an alarm. This information speeds up the incident response process and allows for a holistic picture of the defense strategy.

### Rule Examples and Identification According to MITER ATT&CK Tactics

In this section, concrete and applicable rule examples are presented for selected MITER ATT&CK techniques under Reconnaissance and Execution tactics. These examples are created based on data from different log sources and explain both the rule logic and the relevant context.

### Tactic: Execution — TA0002

This tactic involves attackers attempting to run their own code or commands on a system.

#### Technical: T1059 Command and Script Interpreter

Attackers tend to execute code on the system using command and script interpreters (e.g., PowerShell, Bash, `cmd.exe`), which are built-in operating system tools. This technique is one of the most frequently used methods in attack campaigns. PowerShell is frequently abused, especially to bypass defense mechanisms, run malicious payloads in memory, and obfuscate complex commands.

Rule Example 1: Suspicious PowerShell Commands Detected (T1059.001)

This rule detects when PowerShell is run with the `--EncodedCommand` parameter, which is often used to hide commands. This type of codesHowever, it is often used to avoid static analysis by security solutions for illegitimate scripts.

* **Rule ID:** `PS-Encoded-Cmd-Detection-001`
* **Severity:** `High`
* **Description:** “Detects running PowerShell with the `--EncodedCommand` parameter. This is often used by malware to hide commands and bypass security solutions.”
* **MITRE ATT&CK Tag:** `mitre.tactic: execution`, `mitre.technique_id: T1059, T1059.001`
* **Log Source:** The ideal log source for determining the rule is Event ID 1 (Process creation) logs produced by Sysmon or Windows PowerShell Script Block Logging. These resources record the full command line arguments in detail.
* **Rule Logic:**
* Kibana EQL (Event Query Language) Query:
* process where process.name == “powershell.exe” and process.command\_line : “\*EncodedCommand\*”
* This query finds all events with `powershell.exe` in the `process.name` field and containing the `EncodedCommand` keyword in the `process.command_line` field.
* **False Positive Analysis:** Legitimate administrative scripts can also sometimes encode and execute complex or sensitive commands. In such cases, rule noise can be reduced by creating exception lists for known and trusted management processes or IP addresses.

Rule Example 2: Deleting Shadow Copies with `vssadmin.exe` (T1490)

Although this technique is associated with the 'Impact' tactic, it is also directly related to the 'Execution' tactic as it starts with an attacker running a built-in Windows tool such as 'vssadmin.exe'. This rule detects deletion of shadow copies on the system, revealing threats to prevent data recovery.

* **Rule ID:** `VssAdmin-Shadow-Delete-002`
* **Severity:** `Critical`
* **Description:** “Detects deletion of shadow copies using `vssadmin.exe` to prevent system integrity and data recovery.”
* **MITRE ATT&CK Tag:** `mitre.tactic: impact`, `mitre.technique_id: T1490`
* **Log Source:** Although Sysmon Event ID 1 (Process creation) is the best source, Windows Security Event Logs can also be used.
* **Rule Logic:**
* Kibana Custom Query (KQL):
* event.action:”Process Create (rule: ProcessCreate)” and process.name:”vssadmin.exe” and process.args:(“delete” and “shadows”)
* This query searches for the execution of the `vssadmin.exe` process with the `delete` and `shadows` arguments in data collected with `winlogbeat`, such as Sysmon logs. Since legitimate use of this command is extremely rare, this rule is expected to produce a high-confidence alarm when triggered.

### Tactic: Discovery (Discovery — TA0007)

This tactic involves attackers trying to gather information about the environment after entering a network.

#### Technique: T1087 Account Discovery

Attackers may attempt to enumerate local or domain accounts to find valid user accounts that they can use for privilege escalation or lateral movement.

Rule Example 1: Account Discovery with `net.exe` (T1087)

Windows' built-in `net.exe` tool is often used to list accounts and groups.

* **Rule ID:** `Net-User-Recon-003`
* **Severity:** `Moderate`
* **Description:** “Detects the listing of local or domain accounts using Windows' built-in `net.exe` tool.”
* **MITRE ATT&CK Tag:** `mitre.tactic: discovery`, `mitre.technique_id: T1087`
* **Log Source:** Sysmon Event ID 1, Windows Security Event Logs.
* **Rule Logic:**
* Kibana EQL Query:
* process where (process.name == “net.exe” or process.name == “net1.exe”) and process.command\_line: (“user” or “users”)
* This query captures events where `net.exe` or `net1.exe` processes are run with `user` or `users` arguments.
* **False Positive Analysis:** System administrators can use these commands for routine tasks. Therefore, the rule may need to be used with additional context information such as `process.parent_name` or treated as a time window-based threshold rule.

#### Technical: T1046 Network Service Discovery

Attackers perform port scanning to find potentially vulnerable services and open ports on the network.

Rule Example 2: Network Service Discovery (T1046)

This rule detects suspicious connection attempts (port scanning) from a single source to multiple destinations or ports.

* **Rule ID:** `Port-Scan-Detection-004`
* **Severity:** `Moderate`
* **Definition:** “From a source, for a short timedetects suspicious connection attempts (port scanning) to multiple targets or ports in the slot.”
* **MITRE ATT&CK Tag:** `mitre.tactic: discovery`, `mitre.technique_id: T1046`
* **Log Source:** Network flow logs, firewall logs collected with `Packetbeat` or `Filebeat`.
* **Rule Logic:**
* **Kibana Threshold Rule:**
* **Index:** `packetbeat-*`
* **Aggregated on:** `source.ip`
* **Field to count:** `destination.port`
* **Threshold:** `unique_count(destination.port) > 20` within `1 minute`
* This rule detects cases that exceed a threshold by counting connection attempts from a single source IP address (`source.ip`) to more than 20 different destination ports (`destination.port`) within a minute.
* **False Positive Analysis:** Load balancers, internal network scanning tools, or routine tests in development environments can trigger this rule. Therefore, it is necessary to create exception lists for known IP ranges or legitimate scanning tools.

### Rules Development Approach for Mobile and ICS Environments

The flexibility of the ELK Stack enables threat detection not only for traditional Enterprise environments, but also for the more niche Mobile and ICS (Industrial Control Systems) domains.

#### Mobile Environments

The MITER ATT&CK for Mobile matrix includes tactics and techniques specific to Android and iOS platforms. Detecting mobile threats requires a different approach than traditional endpoint logging.

* **Log Sources:** Mobile threats are often detected by in-app behavior or logs related to the device itself. Application developers can send logs directly to Logstash using logging libraries such as `swift-log-elk`. Additionally, Android's `logcat` tool can be used to monitor device logs via the `adb` command. Logs provided by Mobile Device Management (MDM) solutions are also a valuable resource for these analyses.
* **Rule Example (Theoretical):** An attempt to access sensitive files (`/etc/passwd`) on a rooted Android device can be detected by looking for a specific process and file path combination in the `logcat` logs.

#### ICS (Industrial Control Systems) Environments

MITER ATT&CK for ICS is specifically designed to model attacks targeting industrial processes. The biggest challenge in ICS environments is the processing and standardization of logs from proprietary industrial protocols (Modbus, OPC, PROFINET), unlike standard IT logs.

* **Log Sources:** In addition to standard IT logs, logs from protocols specific to OT environments are vital. These logs are usually collected in the form of Windows Event Logs, text files or databases.
* **Rule Example (Theoretical):** Unauthorized change of a PLC's operating mode (`Run` -> `Program`) or unusual collection of data over the OPC protocol can be detected by looking for a specific event pattern in the ICS logs.

### Integration and Ruleset Validation

In order for the created rule set to be functional and reliable, it must be correctly integrated into the ELK Stack and its effectiveness must be tested regularly.

### Uploading the Rule Set to ELK Stack

There are multiple ways to integrate rules into the ELK Stack. The most modern and manageable approach is to use Kibana's built-in Security application and APIs.

* **Kibana Security App:** New rules can be created via the visual interface from Kibana's 'Security > Detections' section. This interface supports different types of rules, such as threat intelligence integration (`Indicator match`) or correlation rules.
* **Detection as Code (DaC):** Ideal for larger teams and automation processes, this approach allows rules to be stored in a code repository (such as `elastic/detection-rules`) in the form of `TOML` or `JSON` files and automatically loaded into Kibana via the API. This method facilitates versioning of rules, integration into CI/CD processes, and intra-team collaboration.
* **Data Processing Integrations:** According to the rule logic, Logstash pipelines or Ingest Node pipelines can be used to prepare the log data in the correct format. Logstash can perform in-depth transformations on data with complex filters (`grok`, `mutate`, `geoip`). Elasticsearch Ingest Node is used for simpler operations.

### Testing the Ruleset

To understand the potential of a rule set, it is not enough to know theoretically what it detects.is the province. It is vital to verify how effective the rule is in a real attack scenario. Atomic Red Team is an open source library of simple, isolated tests that emulate MITER ATT&CK techniques for this purpose.

* **Test Environment Preparation:** First, an isolated test machine (VM) should be set up as a copy of the production environment. Necessary logging tools such as `Sysmon` and agents that send logs to ELK (e.g. `Winlogbeat`) must be running on this machine.
* **Selection and Application of the Test:** Tests corresponding to the MITER ATT&CK technique (such as `T1059`) to be tested are selected from the `Atomic Red Team` library. These tests are run with a tool such as 'Invoke-AtomicRedTeam'.
* **Verification and Improvement:** After the test is run, the logs are examined in Kibana to verify whether the created rule produces the expected alarm. If the rule does not fire or produces too many false positives, improvement is made by reviewing the rule logic or the log sources used. This is a feedback loop that ensures the ruleset remains constantly updated and effective.

**Sample MITER ATT&CK Rule List**

Rule NameRule Logic (EQL/Threshold)SeverityDefinitionMITRE TacticMITRE Technical ID`PS-Encoded-Cmd-Detection-001process where process.name == "powershell.exe" and process.command_line : "*EncodedCommand*"`HighDetect the execution of PowerShell with the `--EncodedCommand` parameter DiscoveryT1059.001`VssAdmin-Shadow-Delete-002process where process.name : "vssadmin.exe" and process.args : "delete" and process.args : "shadows"`Critical`Detects deletion of shadow copies with vssadmin.exe`.EffectT1490`Net-User-Recon-003process where (process.name == "net.exe" or process.name == "net1.exe") and process.command_line: ("user" or "users")`MediumDetects account discovery activity using the `net.exe` tool.DiscoveryT1087`Port-Scan-Detection-004count(destination.port) by source.ip > 20` in `1m`MediumConnection from a single IP to many different ports Detects attempts.DiscoveryT1046

### Conclusion: Guide for Teams on Ruleset Usage and Further Reading

This report provides a detailed roadmap on the process of creating and managing a comprehensive incident detection ruleset based on the MITER ATT&CK framework on the ELK Stack. The findings reveal some key takeaways and best practices for cybersecurity teams that will use this ruleset.

**Best Practices:**

* **Prioritizing Threats:** Identifying the most critical MITER ATT&CK tactics and techniques based on the organization's risk profile and threat intelligence creates a more focused and efficient defense strategy rather than activating all the rules.
* **Continuous Improvement:** A ruleset is not a “create once and forget” resource. It should be tested and improved regularly for new threats, false positives, and changing infrastructure conditions. This continuous cycle is an approach that matures defensive capabilities.
* **Intra-Team Collaboration:** Red and Blue teams collaborating is the most effective method to test and improve the effectiveness of the ruleset against realistic attack scenarios.

**Future Recommendations:**

* **Machine Learning (ML) Integration:** Using ELK Stack's machine learning capabilities, it is possible to create rules that learn normal user and system behavior and detect abnormal deviations. This provides a huge advantage in catching new threats, especially those without known signatures.
* **Threat Intelligence Integration:** `Indicator Match` rules can be created by integrating threat intelligence feeds (IoCs) directly into the ELK Stack. This enables rapid detection and alerting mechanisms against known malicious IPs, domains or file hashes.
* **Automated Response:** As an advanced integration, combining detection rules with a SOAR (Security Orchestration, Automation and Response) platform can enable automatic response to alarms. For example, when a suspicious process is detected, automatic intervention actions can be taken, such as isolating the relevant host from the network or suspending the user's account.