Title: Windows Persistence & Lateral Movement — The Complete Post-Exploitation Guide

---

When an attacker achieves initial access to a target system, the real battle has only just begun. A phishing email was clicked, a vulnerability was exploited, or a VPN credential was stolen — but that's simply walking through the door. The true goal is to stay undetected, establish a durable foothold, and spread deep into the network.

In this article, we examine the post-compromise phase chronologically through an attacker's eyes:

Persistence: Surviving system reboots, password resets, and detection attempts.
Lateral Movement: Pivoting from the first compromised machine to critical servers and the Domain Controller.
Detection: How the Blue Team can break this chain.
Hardening: Proactive defense measures.

> This structure maps directly to MITRE ATT&CK Enterprise Matrix tactics TA0003 (Persistence) and TA0008 (Lateral Movement).

---

---

Chapter: Part 1: Windows Persistence Mechanisms

Persistence methods ensure that malicious software or unauthorized access continues even if a system is restarted or a user is logged off. At this stage, attackers prefer to be as quiet as possible: evade antivirus, generate minimal log events, and blend in with legitimate system tools.

Section: User Manipulation

When attackers gain control of the Administrator account, rather than using it directly (since its activities are monitored), they create new "ordinary-looking" users. These accounts typically carry names like support, sysadmin, or helpdesk — unlikely to trigger SOC radar.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

To list existing users:

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

[Image: No image description]

SOC Detection — Event IDs:

These Event IDs can be filtered in Event Viewer → Windows Logs → Security.

[Image: No image description]

[Image: No image description]

---

Section: Scheduled Tasks

One of the most commonly used persistence methods — from ransomware to APT groups. The attacker ensures the malicious file runs at defined intervals or at system startup.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

The Sysinternals Autoruns tool lists scheduled tasks alongside signature validation — tasks without a Microsoft signature are flagged in red.

[Image: No image description]

SOC Detection:
Event ID 4698: New scheduled task created.
Autoruns → Scheduled Tasks tab.

---

Section: Registry Run Keys

Registry Run keys are a legitimate Windows feature that automatically executes specified programs at system startup or user logon. According to MITRE ATT&CK data, technique T1547.001 is used by more than 54 known threat groups.

Core Run Keys:

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Startup Folder Redirect Keys:

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Advanced Keys (APT Favorites):

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Registry changes can be visualized with regedit or Autoruns:

[Image: No image description]

[Image: No image description]

[Image: No image description]

SOC Detection:
Event ID 4657: Registry value modified/created (auditing must be enabled).
Sysmon Event ID 12 (key create/delete) and 13 (value set).

---

Section: Startup Folder

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Accessible via Run (Win+R) → shell:startup:

[Image: No image description]

[Image: No image description]

---

Section: Windows Services

Attackers can create new services with legitimate-sounding names (e.g., ChromeUpdateService) or hijack existing ones.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

SOC Detection:
Event ID 4697: A service was installed on the system.
Autoruns → Services tab.

---

Section: BITS Jobs (Background Intelligent Transfer Service)

BITS is Windows' file transfer infrastructure and is typically allowed through firewalls. Attackers use BITS to download and execute payloads while flying under the radar of security tools.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Detection: bitsadmin /list /verbose or Sysmon process creation logs.

---

Section: WMI Event Subscriptions — Fileless Persistence

WMI (Windows Management Instrumentation) is one of the most sophisticated persistence techniques used by advanced threat actors — it leaves no files on disk. The payload is stored in the registry and WMI database; since traditional antivirus focuses on the file system, this technique is often missed.

Three components work together:

Filter: The triggering event — e.g., system startup.
Consumer: The command/script to execute.
Binding: Links the filter to the consumer.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

SOC Detection:
Sysmon Event ID 19 (WmiEventFilter), 20 (WmiEventConsumer), 21 (WmiEventConsumerToFilter).
PowerShell Script Block Logging Event ID 4104 (if enabled).
Manual query: Get-WMIObject -Namespace root\subscription -Class __EventFilter.

---

Section: COM Hijacking

COM (Component Object Model) is the infrastructure through which Windows applications communicate. Each COM object is registered in the registry with a CLSID. Attackers can copy a legitimate COM object's CLSID under HKCU\Software\Classes\CLSID and register their own malicious DLL — no administrator privileges required.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Since Windows checks HKCU before HKLM, the malicious DLL loads. COM objects belonging to frequently-restarted processes like explorer.exe are ideal targets.

Detection: Sysmon Event ID 7 (Image Load) — legitimate processes loading DLLs from C:\Users\ paths is anomalous.

---

Section: IFEO (Image File Execution Options) Injection

IFEO allows developers to attach a debugger to an application when it starts. Attackers abuse this mechanism to execute their backdoor instead of accessibility shortcut applications tied to the logon screen (e.g., sethc.exe — Sticky Keys, utilman.exe — Accessibility). This technique is particularly notable because it can be triggered from the logon screen — without any user session open.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Now, pressing Shift five times on the login screen launches cmd.exe instead of sethc.exe — with SYSTEM privileges.

Detection:
Sysmon Event ID 13: Write to IFEO registry key.
Event ID 4688: Unusual parent-child process relationship (sethc.exe → cmd.exe).

---

Section: DLL Search Order Hijacking / Sideloading

When Windows loads a DLL, it searches in a specific order: first the application's own directory, then system directories. Attackers place a maliciously named DLL in the same directory as a legitimate, signed application — causing code execution through a trusted process.

Sideloading: Particularly effective against security tools or antivirus software; the malicious DLL runs with the security product's own elevated privileges.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

When LegitApp.exe starts, it checks its own directory first, finds version.dll, and loads it.

Detection: Sysmon Event ID 7 — unsigned or unexpected-path DLL loading.

---

---

Chapter: Part 2: From Persistence to Lateral Movement — The Bridge

This section explores the details and implications.

Section: Why Doesn't the Attacker Stay Put?

When an attacker first compromises a machine, it's typically a regular user workstation: limited access, limited data, limited impact. The real targets are the network's critical assets:

Domain Controller (DC): All Active Directory credentials, Group Policy control, the NTDS.dit database.
File Servers: Sensitive documents, source code.
Backup Servers: Ideal ransomware target — encrypting backups ensures victims can't recover.
SIEM/Log Servers: Deleting evidence of the intrusion.

Section: Active Directory: The Attacker's Gold Mine

The vast majority of enterprise networks run on Active Directory (AD). AD provides centralized identity management, making it the primary target for attackers — and once compromised, a master key that opens the doors of the entire network.

Credential Harvesting:

After establishing persistence on the initial machine, the attacker begins collecting credentials:

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

At this point, armed with credentials and hashes, the attacker is ready to move laterally.

---

---

Chapter: Part 3: Lateral Movement Within the Network

Lateral movement is the process by which an attacker gains access to other systems within the network. The average dwell time for an APT group's lateral movement phase in enterprise networks is 4–5 days, though it can extend to weeks. Attackers aim to work as "quietly" as possible — leveraging legitimate tools (Living off the Land — LotL) and blending in with normal traffic.

Section: RDP (Remote Desktop Protocol) — APT Groups' Favorite

RDP is Microsoft's remote desktop connection protocol, operating on port 3389. It's the most frequently used lateral movement vector for APT groups, primarily because RDP is already ubiquitous in corporate networks — it blends in with normal traffic.

[Image: No image description]

Key RDP Features:
Remote Access: Full desktop control.
TLS Encryption: Secure data transmission (older versions have known vulnerabilities — BlueKeep, CVE-2019-0708).
Kerberos Integration: In AD environments, authentication flows through the Kerberos protocol.

[Image: No image description]

APT Lateral Movement Methods via RDP:

Pass-the-Hash (PtH): Authenticate using an NTLM hash without knowing the plaintext password.
Credential Dumping: Steal credentials from LSASS memory using Mimikatz.
Brute-Force: Crack weak RDP passwords through brute force.

> Important Note: The fact that these attacks are possible doesn't make the RDP protocol itself insecure. Pass-the-Hash stems from Kerberos' stateless architecture; Credential Dumping stems from how Windows manages LSASS process memory. RDP is merely the vector for these attacks.

APT Examples:
APT33 (Iran): Lateral movement via RDP + credential theft.
APT29 (Cozy Bear / Russia): Spread through internal networks using hijacked RDP sessions.

---

Section: WinRM & PowerShell Remoting — Living off the Land

Windows Remote Management (WinRM) is Windows' built-in remote management protocol, running on ports 5985 (HTTP) and 5986 (HTTPS). This infrastructure, used daily by system administrators, is perfectly suited for the "Living off the Land" (LotL) tactic.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Why is this dangerous?
Uses entirely legitimate Windows processes: powershell.exe and wsmprovhost.exe.
Traffic passes encrypted over WinRM.
Many EDR solutions whitelist PowerShell Remoting by default.

SOC Detection:
Event ID 4624 (Type 3 — Network Logon): Remote logon to a system.
Event ID 4688: wsmprovhost.exe process creation.
Sysmon Event ID 3: Network connection to port 5985/5986.
PowerShell Script Block Logging (Event ID 4104).

---

Section: SMB Share & PsExec — Classic but Effective

SMB (Server Message Block) is Windows' file sharing protocol (port 445). Attackers particularly exploit administrative shares ADMIN$ and C$ for lateral movement.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

How PsExec Works:
Copies PSEXESVC.exe service to ADMIN$ share.
Starts that service on the target system.
Communicates commands/responses over a Named Pipe.
Deletes the service when done (but logs remain).

SOC Detection:
Event ID 7045: New service installation (PSEXESVC).
Event ID 4624 (Type 3): SMB authentication.
Sysmon Event ID 1: PSEXESVC.exe process creation.
Sysmon Event ID 11: File dropped to ADMIN$ share.

---

Section: Kerberos Exploitation: PtT and Overpass-the-Hash

In Active Directory environments, authentication occurs via the Kerberos protocol. Kerberos' "stateless" (ticket-based) architecture opens the door to several critical attack vectors.

Kerberos Ticket System:
TGT (Ticket Granting Ticket): Issued by the KDC (Key Distribution Center) when a user logs in.
TGS (Ticket Granting Service): Requested with a TGT to access specific services.

Section: Pass-the-Ticket (PtT)

A Kerberos ticket stolen from memory can be used for authentication on another system. As long as the ticket hasn't expired (default 10 hours), it works even if the password has been changed.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Section: Overpass-the-Hash

A method of requesting a Kerberos TGT using an NTLM hash. Instead of using the hash directly for NTLM authentication, the attacker exchanges it for a Kerberos ticket — leaving fewer traces.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

This opens a new session authenticated with the NTLM hash while silently requesting a Kerberos TGT in the background.

Kerberos' Stateless Architecture and Its Relationship to RDP:

RDP uses Kerberos for authentication in AD environments. In a Pass-the-Ticket attack, a stolen ticket can be used directly to open an RDP session — because Kerberos doesn't track which machine generated the ticket. This is why when Pass-the-Hash combines with RDP lateral movement, RDP appears to be "the culprit," but the real vulnerability lies in Kerberos' design philosophy.

SOC Detection:
Event ID 4768: TGT request (AS-REQ).
Event ID 4769: TGS request (TGS-REQ) — multiple rapid service requests from the same user to different services is anomalous.
Event ID 4771: Kerberos pre-authentication failure.

---

---

Chapter: Part 4: Blue Team / SOC Detection and Threat Hunting

This section explores the details and implications.

Section: Detection Philosophy: Anomaly Chains, Not Single Logs

Individual log entries are often misleading. Legitimate software can modify Run keys; system administrators use PsExec. Effective detection requires correlation: deriving meaning from multiple events together.

> Golden Rule: A single Event ID is not an alarm. An anomaly chain is an alarm.

---

Section: Event ID Reference Table

---

Section: Deep Telemetry with Sysmon

Sysmon (System Monitor) significantly enriches Windows' native logging infrastructure. Critical event IDs for registry monitoring:

Event ID 12 (RegistryEvent - Object create/delete): New Run key created.
Event ID 13 (RegistryEvent - Value Set): Existing key value modified.

Every Sysmon record contains ParentImage and ParentCommandLine fields — showing who made the change and how that process was launched. This field is critical for tracing an attack chain backward.

[Image: No image description]

---

Section: EDR/XDR Correlation Chain

XDR platforms transform isolated events into an attack story. An example persistence → C2 chain:

Initial Access: Phishing email → outlook.exe → powershell.exe spawned (Sysmon EID 1).
File Drop: C:\Users\Public\payload.exe created (Sysmon EID 11).
Persistence: Written to HKCU\...\Run key (Sysmon EID 13).
C2 Connection: Outbound connection to unknown IP:443 (Sysmon EID 3).

[Image: No image description]

---

Section: Practical SOC Scenarios — KQL Pseudo-Code

Scenario 1: Registry Write from Suspicious Location

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Scenario 2: Lateral Movement — WinRM + New Session Chain

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Scenario 3: WMI Persistence Detection

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Scenario 4: Kerberos Anomaly — Unusual Ticket Requests

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

---

Section: False Positive Management

Legitimate software (antivirus updates, enterprise tools) can also modify Run keys. To reduce noise:

Build a baseline: Document normal autostart entries with Get-PSAutorun.
Whitelist: Exclude signed applications running from C:\Program Files\ and C:\Windows\.
Correlation over exclusion: Rather than excluding single suspicious events, require them to correlate with other indicators.

---

Section: Attacker Evasion Tactics

Null Character Obfuscation:

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Regedit.exe and reg.exe cannot display characters after null; these keys are invisible to standard tools. Sysmon or advanced EDR is required.

Spoofed Process / File Names:

C:\Windows\System32\svchost32.exe (legitimate: svchost.exe).
C:\Windows\Temp\WindowsUpdate.exe.

LOLBins (Living off the Land Binaries):

Malicious use of legitimate Windows binaries:
certutil.exe -decode → file download/decoding.
mshta.exe → remote HTA script execution.
regsvr32.exe /s /n /u /i:http://... → payload via COM object.

---

---

Chapter: Part 5: Hardening and Defense

This section explores the details and implications.

Section: Privileged Access Management (PAM)

PAM is a centralized security solution used to manage, monitor, and audit privileged access in enterprise networks.

[Image: No image description]

Protections PAM Provides:

Just-In-Time (JIT) Access: Admin rights are granted only when needed and for a limited time; auto-revoked when the window expires.
Session Recording: All privileged sessions are recorded as video and logs.
Password Vault: Admin passwords are auto-managed by PAM; users never see the plaintext.
Dual Approval: Access to critical systems requires a second administrator's approval.

PAM and RDP: When a PAM solution is in place, RDP sessions open through the PAM proxy — never directly. Credentials never appear on the target system, and every session is logged.

---

Section: Network Level Authentication (NLA)

NLA (Network Level Authentication) requires authentication before an RDP session is established, preventing unauthenticated connection requests from reaching the system.

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

---

Section: Multi-Factor Authentication (MFA)

MFA should be mandatory for RDP, WinRM, and all other remote access methods. Even if credentials are stolen, login is impossible without the second factor.

Azure AD / Microsoft Entra ID integration.
RADIUS-based MFA solutions.
Hardware keys (FIDO2 / YubiKey).

---

Section: Least Privilege Principle

Every user and service account should operate with only the minimum permissions required to perform its function.

Practical Steps:

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Disable or LAPS-manage the local Administrator account.
Don't grant admin privileges to service accounts.
Use Domain Admin accounts only on Domain Controllers.

---

Section: Network Segmentation and Access Control

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

RDP (3389): Allow only through a PAM proxy or Jump Server.
WinRM (5985/5986): Restrict to the management network segment.
SMB (445): Block direct SMB traffic between workstations.
Micro-segmentation: Restrict East-West traffic with host-based firewall rules.

---

Section: Audit Policies and Centralized Log Management

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

Forward all logs to a central SIEM (Splunk, Microsoft Sentinel, Elastic).
Log retention should be at least 90 days (ideally 1 year).
Deploy Sysmon configuration using SwiftOnSecurity or Olaf Hartong templates.

---

Section: Proactive Threat Hunting

Reactive defense is not enough. The Blue Team should perform these checks at regular intervals:

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

---

---

An attacker's post-compromise journey follows this chronological chain:

[Code Block: A code example is present here. Code contents are skipped in the voiceover.]

In this article, we examined each phase from both the attacker's and defender's perspectives:

Persistence: User manipulation, Scheduled Tasks, Registry Run Keys, BITS Jobs, WMI Event Subscriptions, COM Hijacking, IFEO Injection, and DLL Hijacking.
Lateral Movement: RDP, WinRM/PowerShell Remoting, SMB/PsExec, and Kerberos exploitation (PtT, Overpass-the-Hash).
Detection: Sysmon, Event ID correlation, KQL pseudo-code scenarios.
Hardening: PAM, NLA, MFA, Least Privilege, network segmentation.

> Security is a process, not a product. No single tool or rule can protect you. Meaningful protection emerges when layered defense (Defense in Depth), continuous monitoring, and proactive threat hunting are applied in concert.

Further Reading:
MITRE ATT&CK — Persistence (TA0003).
MITRE ATT&CK — Lateral Movement (TA0008).
