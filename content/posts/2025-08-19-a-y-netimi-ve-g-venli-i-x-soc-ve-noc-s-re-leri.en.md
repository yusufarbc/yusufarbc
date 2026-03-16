---
title: "Network Management and Security X: SOC and NOC Processes"
date: 2025-08-19
draft: false
---

---

### Network Management and Security X: SOC and NOC Processes

![](https://cdn-images-1.medium.com/max/800/1*S7cMHBrZlktBq6LvzR_AYQ.png)

SOC (Security Operations Center) and NOC (Network Operations Center) are two central structures that complement each other but have different focuses. NOC monitors an organization's network infrastructure, system performance and service continuity 24/7 and aims to minimize downtime. Its core functions include network/server monitoring, fault logging, maintenance and update management. SOC is the center that protects the information technology infrastructure against external/internal threats, malware and security breaches. SOC teams work 24/7 to detect and analyze security incidents in advance and respond immediately to a possible attack.

---

### SOC and NOC Definition and Key Differences

![](https://cdn-images-1.medium.com/max/800/1*wT8UMU4_ZcVdPNLwUlYoYg.png)

SOC vs NOC

In summary, NOC ensures that the network remains “alive” while SOC ensures that this service remains secure. NOC is performance/usability focused; SOC, on the other hand, is security oriented. Even though the two centers were built separately, integration and coordination have gained importance in modern applications.

### Organizational Structure and Technical Function

Both SOC and NOC typically work on a **24/7 shift schedule** and are organized in a multi-layered specialty structure. NOC teams consist of network and systems administration experts; The first level (L1) NOC engineers perform basic network/system monitoring and simple interventions, the second level (L2) analyzes and solves complex problems, and the third level (L3) deals with infrastructure design, optimization and strategic innovations. Similarly, SOC teams are divided into L1/L2/L3 analyst tiers: L1 analysts monitor incoming security alerts and triage simple threats, L2 analysts perform in-depth threat analysis and incident response, and L3 analysts hunt for advanced attacks (e.g. APTs) and improve SOC processes. Attached to the SOC level is a “SOC Manager” or “Manager” in most organizations; This person manages the team and oversees reporting and compliance processes. On the NOC side, roles such as NOC Manager or Network Manager manage the organization.

From a technical standpoint, **NOC** monitors network devices (switch/router), servers, buses, and performance metrics. It constantly collects data and detects faults/baseline deviations with network monitoring platforms (e.g. SolarWinds, Nagios, Zabbix, etc.) and SNMP-based tools. In addition, NOC staff works integrated with customer help desk systems to open or update tickets for problems. **SOC**, on the other hand, collects all internal/external log sources (server, endpoint, firewall, application logs, etc.) on platforms such as SIEM and constantly analyzes them. The SOC infrastructure includes security tools such as IDS/IPS systems, EDR agents, DLP and threat intelligence services. Both services, as well as NOC and SOC internal teams, can be outsourced (MSP/MSSP); if needed, it can also be managed as an **integrated team** or within the same **Unified Operations Center**. In all cases, NOC and SOC teams are obliged to collect, analyze and take correct action on the log and alarm data produced.

### Workflows: Monitoring, Analysis, Response Processes

* **Continuous Monitoring:** NOC monitors network traffic, device status and performance metrics (throughput, connection latency, CPU load, etc.) 24/7. SOC, on the other hand, monitors network and system logs (firewall, server, endpoint logs) with SIEM/IDS/IPS tools. In both centers, events (e.g. unusual traffic, failed login attempts) are detected with automation and alarm rules.
* **Event Detection and Recording:** Alarms generated as a result of monitoring are generally seen in the NOC as system failure, connection interruption or capacity overloads; In SOC, security breaches such as malware, unauthorized access or data leakage are the trigger. For each detected incident, a ticket is opened immediately and directed to the relevant level (L1 NOC/SOC analyst or higher). SLA management is NOC's main priority; For every outage experienced, the aim is to fix the fault as soon as possible.
* **Event Analysis:** The first level that records the event (NOC L1 or SOC L1) examines the conditions and transfers it to the L2 level if necessary. NOC L2 engineers focus on root cause analysis, troubleshooting configuration errors and performance issues. SOC L2 analysts determine the source of the attack by performing detailed log and threat analysis and identify the attacker's identity. It examines the techniques used. For example, IDS/SIEM coordination in a brute-force detection and isolating the affected machines from the network in a ransomware incident are examples of L2/L3 intervention.
* **Intervention and Recovery:** NOC intervenes with hardware replacement, configuration correction or patch depending on the type of problem and makes the service accessible again. SOC, on the other hand, isolates the affected systems, cleans the malware and applies the necessary updates (patch) to stop the attack. Both centers report intervention results in detail. While network performance reports are prepared in NOC, post-incident forensic analyzes are performed in SOC and comprehensive reports are presented to management/compliance units.
* **Feedback and Improvement:** After the intervention, the SOC team evaluates the attack methods, updates security policies and organizes personnel awareness training. On the NOC side, the network infrastructure is restructured and backup procedures are reviewed. Thanks to this closed loop, subsequent events are detected and resolved faster.

SOC and NOC processes work intertwined with each other; For example, a DDoS attack disrupts network performance and keeps NOC teams busy, as well as raising security concerns and keeping SOC teams busy. Therefore, data sharing and coordination between both centers is vital.

### Tools and Technologies Used

NOC and SOC teams utilize a wide range of software and hardware tools that enable monitoring and response:

* **SIEM (Security Information and Event Management):** Collects all logs and correlates them. SIEM solutions such as Splunk, IBM QRadar, ArcSight are used to detect anomalies in the SOC. For example, Splunk is a platform frequently preferred by SOC analysts.
* **IDS/IPS (Intrusion Detection/Prevention Systems):** Detects suspicious activities in network traffic. Snort and Suricata are widely preferred IDS/IPS software. SOC analysts catch real-time threats with these tools.
* **Firewall and Network Security:** Firewalls such as Palo Alto, Fortinet, Cisco ASA control network traffic and are managed by the SOC. These tools enable SOC analysts to enforce access policies.
* **Network Monitoring and Performance Tools:** Tools such as SolarWinds, Nagios, Zabbix are used by NOC; Thanks to SNMP-based monitoring, the status of network devices is monitored 24/7. NetFlow analysis tools display traffic trends.
* **Ticketing / Incident Management Systems:** Ticket tracking systems such as JIRA and ServiceNow play a critical role in NOC and SOC processes. Every alarm/ticket that occurs is recorded here and the intervention process is followed. In this way, operational transparency is ensured and the intervention history is documented.
* **Endpoint and Enterprise Security Tools:** SOC installs EDR (Endpoint Detection and Response) agents on servers and workstations in the enterprise. CrowdStrike, CarbonBlack etc. EDR solutions prevent potential threats by monitoring login habits. Additionally, DLP, encryption and data loss prevention systems support data security.
* **Automation and SOAR:** In large-scale structures, **Security Orchestration, Automation and Response (SOAR)** solutions are used to ensure automatic classification of alarms and automation of repetitive tasks. Artificial intelligence-supported tools accelerate anomaly detection.

Both centers can share live data using common dashboards and panels. Modern solutions offer hybrid structures where SOC and NOC can share data on the same platform, so events are analyzed simultaneously from both network and security perspectives.

### Job Descriptions and Roles

Roles in SOC and NOC organizations are divided by levels:

* **NOC Engineer (L1):** Monitors the live status of system and network equipment, evaluates alarms, performs basic troubleshooting, and escalates unresolved events to the upper (L2) unit. It also creates initial records for SLA-compliant intervention.
* **NOC Engineer (L2):** Handles complex events from L1. It performs detailed root cause analysis, fixes network configuration errors, eliminates performance bottlenecks and implements permanent solutions.
* **NOC Engineer (L3):** Solves the most critical infrastructure problems. It troubleshoots software/hardware malfunctions, optimizes at the architectural level and performs new technology integrations. It also develops proactive measures for network security.
* **NOC Manager:** Coordinates NOC teams, plans operations and prepares performance reports. Resource management etc. Process improvement is the responsibility of the NOC manager.
* **SOC Analyst (L1):** Evaluates and prioritizes security alarms and analyzes simple attacks. Triages suspicious activities and identifies those that require immediate intervention. Records incidents and implements solutions according to standard procedures.
* **SOC Analyst (L2):** Examines and responds to more complex threats. It performs deep analysis to determine the source of the incident, uses threat intelligence and takes steps such as blocking and system cleaning when necessary.
* **SOC Analyst (L3) / Threat Hunter:** Investigates advanced attacks (e.g. APTs) and performs threat hunting. It determines proactive measures against future attacks by developing SOC processes, alarm rules and game plans.
* **SOC Manager:** Manages the entire SOC operation, carries out in-team training and recruitment processes, and supervises the implementation of security policies. It also reports to senior management and monitors compliance requirements.

Duties increasingly overlap in both centres; For example, in some large organizations, NOC and SOC teams can work under a single **unified operations center** (for example, “Fusion Center”).

### Career Development and Certifications

**NOC Career:** Advancement in NOC is usually through network engineering. Beginners can start as an L1/NOC Technician and progress to the L2/L3 levels. They can advance to advanced “Network Management” or “NOC Manager” roles. **Cisco CCNA/CCNP**, **CompTIA Network+** etc. in a career focused on network configurations and problem solving. Certificates are frequently preferred. For example, the CompTIA Network+ certification provides basic knowledge especially for working in the "Network Operations Center (NOC)" environment. At the CCNP level, mid-level positions such as Network Manager are targeted.

**SOC Career:** A person who starts as a SOC analyst progresses to senior analyst or incident response specialist with experience. He/she may then move into senior security roles such as SOC Manager, Security Operations Manager, or CISO. Important certificates in this field are security-based certificates such as **CompTIA Security+**, (EC-Council) **Certified SOC Analyst (CSA)** and **ISC2 CISSP**. Additionally, certifications specific to SIEM tools, such as Splunk Certified User/Administrator, are frequently recommended for SOC analysts. According to Bilişim Academy, thanks to these certifications, SOC analysts improve their skills in monitoring threats and making the right response. In addition to technical certifications, experienced analysts also look towards management/audit certifications such as **CISM, CISA**. In terms of career development, advanced SOC analysts can advance to security management positions.

The table below summarizes the key differences between these two approaches.

![](https://cdn-images-1.medium.com/max/800/1*ONz6_-qBi4Nekat2qavKdg.png)

**SOC vs NOC Comparison**

### SOC and NOC Collaboration and Integration

Nowadays, it has been seen that security incidents can lead to infrastructure outages; For example, a DDoS attack affects both the NOC by disrupting network performance and the SOC by threatening security. For this reason, NOC and SOC teams should not be **separate camps**, but structures that constantly share data with each other and work in coordination. Modern solutions allow both teams to view data and evaluate events together, using common dashboards and analytics platforms. In practice, some institutions establish NOC and SOC under one roof as a “unified operations center” or form integrated teams. Accordingly, NOC and SOC act as complements to each other. Proper integration allows incidents to be viewed from both network and security perspectives, making response both faster and more effective. In summary, in the digital business environment where SOC security and NOC ensure continuity, close cooperation between both centers plays a key role in the uninterrupted and secure management of digital assets.

---

### SOC and NOC Tools

This white paper for IT and cybersecurity teams dives into open source and commercial tools commonly used in SOC (Security Operations Center) and NOC (Network Operations Center) processes under functional categories. For each tool, architecture, installation, basic configuration, integration, scaling, operational best practices and common errors are presented.

* **NOC focus:** Availability, capacity, performance, SLA. (Zabbix, Prometheus, LibreNMS, PRTG, Cacti)
* **SOC focus:** Threat detection, incident response, log correlation, threat hunting. (Elastic Stack, Wazuh, Suricata, Zeek, Snort, Security Onion, Graylog, QRadar/Splunk, TheHive/Cortex)
* **Intersection area:** Event management, alerting channels, automation (SOAR), common data lake (Elastic/S3), CMDB/ITSM integrations (ServiceNow, Jira), network tap/SPAN infrastructure, time synchronization (NTP), and identity management (SSO/LDAP).

**Recommended high-level architecture:**

* **Aggregation layer:** Beats/Filebeat | Logstash | Syslog-ng | Wazuh Agent | Suricata eve.json | Zeek TSV/JSON.
* **Storage/Search:** Elasticsearch/OpenSearch or Splunk/QRadar (enterprise).
* **Visualization:** Kibana/Grafana/Graylog UI.
* **Processing/Correlation:** Wazuh rules, ElastAlert/Kibana Alerting, Sigma rules.
* **Automation (SOAR):** TheHive+Cortex, Shuffle/StackStorm.
* **Incident management:** TheHive, Jira/ServiceNow.

---

### 1) Network & System Monitoring (Monitoring / NOC Focused)

### 1.1 Zabbix

**Summary:** Enterprise-scale SNMP/Agent-based monitoring; trigger, discovery, maps, automation.

**Architecture & Components**

* Zabbix Server, Frontend (PHP), DB (MySQL/PostgreSQL), Proxy (edge collection), Agent/Agent2.
* Passive/active control, low latency trapper, SNMPv1/v2c/v3, IPMI, JMX, HTTP agent.

**Setup (Ubuntu example)**

```
wget https://repo.zabbix.com/zabbix/6.0/ubuntu/pool/main/z/zabbix-release_6.0-1+ubuntu22.04_all.deb  
sudo dpkg -i zabbix-release_6.0-1+ubuntu22.04_all.deb && sudo apt update  
sudo apt install -y zabbix-server-pgsql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent2 postgresql  
sudo -u postgres psql -c "CREATE USER zbx WITH PASSWORD 'StrongP@ss';"  
sudo -u postgres psql -c "CREATE DATABASE zabbix OWNER zbx;"  
zcat /usr/share/zabbix-sql-scripts/postgresql/server.sql.gz | psql -U zbx -d zabbix -h 127.0.0.1
```

**Basic Configuration**

* `/etc/zabbix/zabbix_server.conf`: `DBPassword`, `StartPollers`, `AlertScriptsPath`.
* Agent2 (Go): eBPF plugins, Prometheus exporter scraping.

**Integrations**

* ServiceNow/Jira/Teams/Slack via webhook.
* Zabbix → SIEM: sending events to Wazuh/Elastic via syslog or HTTP webhook.
* Dynamic host/port discovery with low-level discovery; Template repo (Cisco/Juniper/Linux/Windows).

**Scaling & HA**

* Proxy hierarchy, patroni/pgpool-II for DB, frontend multiplexing, HA failover (Pacemaker/Keepalived).

**Tuning**

* Trapper and poller numbers; Housekeeping period; history/trends retention; TimescaleDB integration.

**Common Mistakes**

* Housekeeper allocation insufficient → DB bloat. SNMPv3 auth/priv parameter error. Trigger thresholds are unrealistic.

### 1.2 Nagios (Core)

**Summary:** Host/service health-check; plugin ecosystem; Icinga forks available.

**Installation & Config**

* Static definition with `nagios.cfg`, `objects/hosts.cfg`, `services.cfg`; NRPE/NRDP/NSClient++ agents.
* Automation with event handler scripts.

**Integration**

* Grafana/NagiosJSON; syslog to SIEM. Modernization with Icinga2.

**Pros/Cons**

* Simple and stable; — High management overhead, config file complexity in large environment.

### 1.3 Prometheus + Grafana

**Summary:** Time-series (pull) metrics collector; PromQL; service discovery; Dashboard/alerting with Grafana.

**Architecture**

* Prometheus server + exporters (node\_exporter, blackbox\_exporter, snmp\_exporter) + Alertmanager.
* Federation, long-term storage with remote\_write (Thanos/Cortex/Mimir).

**Installation (container)**

```
# docker-compose.yml (summary)  
services:  
  Prometheus:  
    image: prom/prometheus  
    volumes:  
      - ./prometheus.yml:/etc/prometheus/prometheus.yml  
  alertmanager:  
    image: prom/alertmanager  
  grafana:  
    image: grafana/grafana
```

**Config (SNMP Exporter)**

* `snmp.yml` community/OID maps; Correlation with LibreNMS data.

**Integration**

* Alertmanager → Slack/Email/Webhook → TheHive/StackStorm.
* Grafana Alerting; Unified observability with Grafana Loki/Tempo/Tempo-OTEL.

### 1.4 LibreNMS

**Summary:** SNMP discovery, automatic maps, RANCID/Oxidized integration, syslog/alerting.

**Setup**

* PHP+Nginx+MariaDB; Config backup with Oxidized; Syslog and SNMP trap receiver.

**Pros/Cons**

* Ready-made templates for network equipment; — DB/Redis tuning may be required on a large scale.

### 1.5 PRTG (commercial memo) & 1.6 Cacti

* **PRTG:** Sensor-based licensing, auto-discovery, maps, easy to install.
* **Cacti:** RRDTool based graphing; Traffic/port history via SNMP; low resource.

---

### 2) Log Management & SIEM (SOC Core)

### 2.1 Elastic Stack (Elasticsearch + Logstash + Kibana + Beats)

**Summary:** Central log, search, analytics, visualization; X-Pack security; Elastic Security (SIEM) module.

**Architecture**

* Data/master/ingest node separation; ILM (index lifecycle), hot-warm-cold; CCR/Snapshot-S3.
* Beats family: Filebeat (modules: system, nginx, suricata), Winlogbeat, Auditbeat, Packetbeat, Metricbeat.

**Setup — Summary**

```
# Elasticsearch & Kibana (short for Debian/Ubuntu)  
sudo apt install elasticsearch kibana  
# Security: built-in users, TLS; kibana.yml: elasticsearch.hosts, server.publicBaseUrl
```

**Logstash Pipeline Example**

```
input { beats { port => 5044 } }  
filter { geoip { source => "[source][ip]" } }  
output { elasticsearch { hosts => ["http://es1:9200"] index => "logs-%{[@metadata][beat]}-%{+YYYY.MM.dd}" } }
```

**Alarming**

* Kibana Alerting/Rules; ElastAlert (community); SIEM detected rules + Sigma → ES Queries.

**Integration**

* Wazuh Manager/Indexer/Dashboard (based on Elastic).
* Filebeat modules for Suricata `eve.json` and Zeek logs.
* TheHive/Shuffle webhook; SOAR playbook triggering.

**Scaling & Tuning**

* Heap = min(node RAM/2, 31GB); shard and refresh interval settings; rollover with ILM; Hot-Warm architecture.
* Ingest pipeline (grok/dissect), ECS schema; dedup and sampling.

**Common Mistakes**

* Excessive number of shards; Multiple roles to a single node; JVM GC edition; Mapping explosion in index.

### 2.2 Wazuh (SIEM + XDR)

**Summary:** OSSEC based HIDS/XDR; FIM, rootkit, vulnerability, compatibility; ActiveResponse; On elastic.

**Architecture**

* Wazuh Manager, Indexer (ES), Dashboard (Kibana app), Agents.
* Agent–manager TLS, UDP fallback; agentless syslog collector.

**Setup — Summary**

```
curl -s https://packages.wazuh.com/4.x/install.sh | bash  
# or component based installation; for agent: WAZUH_MANAGER="10.0.0.10" ./wazuh-agent.sh
```

**Agent Config (Linux)**

```
<ossec_config>  
  <client><server><address>10.0.0.10</address></server></client>  
  <syscheck><directories check_all="yes">/etc,/var/www</directories></syscheck>  
  <active-response><command>host-deny</command><location>local</location></active-response>  
</ossec_config>
```

**Integration**

* Suricata/Zeek/Snort log ingest; Malware detection with VirusTotal/YARA; AWS/Azure/GCP modules.
* TheHive, ServiceNow; Sigma rules → Wazuh.

**Tuning**

* Customization of rules (local\_rules.xml), SCA policy, FIM registration; agent group management.

**Common Mistakes**

* Excessive noise → missing rule suppression; agent hour/certificate issues.

### 2.3 Graylog

**Summary:** Central log powered by Elasticsearch/OpenSearch; pipeline processors; stream/alert.

**Setup**

* Graylog Server + MongoDB + ES/OS cluster; GELF/Beats input.

**Pros/Cons**

* Simple setup/UI; — ES dependency, high volume scaling requirements.

### 2.4 Commercial: QRadar, Splunk; Open Source: OSSIM, Security Onion

* **QRadar:** DSM (device support), offense engine, AQL, flows (QFlow), Ariel DB.
* **Splunk:** Indexer/SH/CM/DS roles, SPL language, ES (Enterprise Security) app, SOAR.
* **OSSIM:** Open source, core correlation and HIDS integrations based on AlienVault.
* **Security Onion:** Integrated platform; Zeek+Suricata+Elastic+SO Console; quick installation profiles.

---

### 3) Network Based Threat Detection (IDS/IPS & NDR)

### 3.1 Snort (2.x/3.x)

**Architecture**

* Packet Decoder → Preprocessors → Detection Engine → Output.
* Snort3: Lua config, multi-threading, DAQ improvements.

**Installation/Operation**

```
sudo apt install snort  
snort -c /etc/snort/snort.conf -i eth0 -A fast
```

**Basic Settings**

* `ipvar HOME_NET 10.0.0.0/8`; `rule-path`; Talos/ET rulesets; preprocessors (frag3, stream5).

**IPS Mode**

* Inline: NFQUEUE/AF\_PACKET; Redirection with iptables.

**Integration**

* Unified2/JSON → Filebeat/Logstash; Wazuh rule mapping; Security Onion roles.

**Tuning**

* Rule selection (policy), fast\_pattern, flowbits optimization; CPU pinning.

### 3.2 Suricata

**Architecture**

* Multi-thread; AF\_PACKET/PF\_RING/DPDK; detection engine + app-layer parsers.
* Output: `eve.json`, `fast.log`, `stats.log`, pcap-log (alert/flow based).

**Setup**

```
sudo add-apt-repository ppa:oisf/suricata-stable -y  
sudo apt install suricata
```

**Config (summary)**

```
vars:  
  address-groups:  
    HOME_NET: [10.0.0.0/8]  
outputs:  
  - home-log:  
      enabled: yes  
      filetype: regular  
      filename: /var/log/suricata/eve.json  
af-packet:  
  - interface: eth0  
    cluster-type: cluster_flow
```

**Integration**

* Filebeat suricata module; Wazuh integration; ET/Open/Pro rulesets; Hyperscan.

**Tuning**

* `max-pending-packets`, `detect-thread-ratio`; NIC RSS, IRQ pinning; hyperscan enable.

### 3.3 Zeek (Bro)

**Architecture**

* Protocol analyzers; ZeekControl; cluster: manager/proxy/workers.
* Logs: `conn.log`, `dns.log`, `http.log`, `ssl.log`, `notice.log`, `weird.log`.

**Setup**

```
sudo apt install zeek  
zeekctl deploy
```

**Scripting**

* `notice` framework; intel feeds; file extraction; DCE/RPC, SMB, TLS details.

**Integration**

* Filebeat zeek module; Elastic ECS mapping; Wazuh JSON ingest; Security Onion native.

**Tuning**

* Load balancing (PF\_RING/AF\_Packet + cluster); disk IO (log rotation/compress).

### 3.4 Arkime (Moloch)

**Summary:** Large-scale PCAP capture, indexing (Elastic/OpenSearch), fast search with web UI.

**Setup/Notes**

* Capture node + Viewer + ES cluster; PCAP ring buffer; SPI index fields.
* correlation with SO/ELK; disk throughput critical (NVMe recommended).

### 3.5 Wireshark/tcpdump

* In-depth packet analysis, pcap filters; Worth its weight in gold during IR.

---

### 4) Endpoint Security (EDR/XDR/HIDS)

### 4.1 Fail2Ban

**Summary:** Log-based brute-force blocking (iptables/nftables), jails + filters.

**Setup/Basic Configuration**

```
sudo apt install fail2ban  
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local  
# sshd jail example  
[sshd]  
enabled = true  
port = 22  
maxretry = 5  
bantime = 1h  
logpath = /var/log/auth.log
```

**Integration**

* Syslog/Filebeat → Elastic/Wazuh; TheHive webhook (ban event → case).

**Tuning**

* CIDR ignoreip, incremental bantime, recidive jail; Fast drop with ipset.

### 4.2 OSSEC (in Wazuh)

* Syscheck (FIM), rootcheck, active response; alone or extended with Wazuh.

### 4.3 CrowdStrike Falcon (commercial memo)

* Cloud-based EDR/XDR; sensor agent; real-time telemetry; RTR; Threat Intel.

### 4.4 Thor Project (Nextron)

* YARA/Sigma/IOC scan; IR and threat hunting; triage packages; Linux/Windows support.

---

### 5) Threat Intelligence (CTI / IOC)

### 5.1 MISP

**Summary:** IOC sharing platform (hash, domain, IP, YARA, Sigma); taxonomy & galaxy; sync/feeds.

**Integration**

* Zeek intel framework; Suricata `threshold`/`reputation` lists; Wazuh enrich; TheHive tasking.

### 5.2 OpenCTI / Yeti

* Entity model (intrusion-set, malware, TTP); connectors (MITRE, VirusTotal, MISP sync).

### 5.3 Commercial Intel

* CrowdStrike, Anomaly, Recorded Future — SIEM/SOAR enrichment with API.

---

### 6) Incident Management & IR (SOAR)

### 6.1 TheHive Project

Case management, observable management, TLP/Sensitivity, task workflows.

**Setup**

* TheHive + Cassandra/Elastic; Integrated with Cortex; webhooks.

### 6.2 Cortex

Analyzer/Responder ecosystem (VT, HybridAnalysis, MISP, Mail, Slack, Wazuh ban, etc.).

### 6.3 Shuffle / StackStorm

No-code/low-code playbooks; webhook/SIEM trigger; IR automation (containment, ticket opening).

---

### 7) Malware Analysis & Digital Forensics

### 7.1 Cuckoo Sandbox

Dynamic analysis on isolated VMs; network capture; Correlation with Suricata/Zeek; reports (JSON/HTML).

### 7.2 Volatility

Memory dump analysis; plugins: malfind, psxview, netscan; Windows/Linux profiles.

### 7.3 Autopsy/Sleuth Kit

File system timeline, artifact analysis; disk images; hash set comparison.

### 7.4 YARA

Signature-based file scanning; rules repo; Wazuh/Cortex integration (on-demand scan).

---

### Quick Start Scenarios

* **SME SOC:** Security Onion (standalone) + Wazuh Agents + Filebeat modules + TheHive (single server) + Zabbix (separate VM).
* **Enterprise SOC/NOC:** Discrete ES hot/warm cluster, multiple Suricata/Zeek sensors, Wazuh manager HA, Prometheus+Grafana, Zabbix proxies, SOAR (Shuffle) and ITSM integration.

### Result

This report gathered the core tools that SOC and NOC teams need in their daily operations under functional categories and presented the rapid installation, configuration, integration and scaling perspectives of each. As the level of organizational maturity increases, the integration of tools with each other (SIEM + NDR + HIDS + SOAR + ITSM) is decisive for success. Best results; It is achieved with the right architecture, noise reduction, automation and sustainable data lifecycle policies.