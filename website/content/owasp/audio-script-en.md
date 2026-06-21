As the software development ecosystem expands and evolves from monolithic architectures to cloud-native, microservice-based, and AI-assisted patterns, threat surfaces are fragmenting at an unprecedented rate. Traditional web security controls alone are no longer sufficient to protect modern systems. The OWASP (Open Worldwide Application Security Project) Foundation, the most critical reference in the open-source application security ecosystem, designs specialized awareness projects for different technological layers to make this complex threat landscape manageable.

Below is a comprehensive comparison of the ten primary OWASP projects alongside the newest frontiers representing Agentic Security and Non-Human Identities (NHI).


Chapter: The Evolution of OWASP Methodology and Data Analytics


The transition of OWASP from traditional list-making to modern data-driven analysis symbolizes the maturation of the application security discipline. While early lists (2003–2010) relied heavily on limited expert consensus and restricted vulnerability datasets, today's methodology is built on massive data calls, industry-wide CVE analyses, and CWE (Common Weakness Enumeration) mappings.

For instance, in the latest Web Top 10 (2025) release, the methodology is based on analyzing over 589 distinct CWE classes across more than 2.8 million applications. The "incidence rate" metric utilized in this new era prevents automated scanning tools from skewing data by repeating the same finding thousands of times. This metric evaluates the percentage of analyzed applications containing a vulnerability class at least once. Community surveys act as a balancing agent in a hybrid model, ensuring that risks with lower frequency in data but exceptionally high exploitability and impact (such as Software Supply Chain Failures or SSRF) are included in the lists.


Chapter: Threat Diversity Across Domains


One of the biggest mistakes security teams make is attempting to apply the Web Top 10 list as a one-size-fits-all template across the entire software ecosystem. In reality, the architectural design, trust boundaries, and threat surfaces of each technology layer are fundamentally different.

In web applications, the primary trust boundary lies between the browser and the server, and vulnerabilities typically stem from server-side code flaws. In mobile applications, however, the attacker is assumed to have full physical and administrative (root/jailbreak) control over the device. This control elevates binary protection, prevention of static encryption key disclosure, and secure client-side storage requirements to top priorities in the mobile security model. In the API world, the user interface disappears entirely, meaning attackers target backend data models and business logic directly. Because most API attacks take place within legitimate HTTP protocols and normal data flows, traditional WAF systems struggle to detect them. Consequently, API projects focus on authorization validation failures at the object and function levels.


Chapter: Detailed Analysis and Version Comparisons of Ten Core OWASP Projects


Understanding the different layers of application security requires examining the historical evolution of each OWASP project, the shifting threat trends across releases, and the technical details of their constituent vulnerabilities.


Section: Web Application Security (OWASP Web Top 10)


This foundational list for web applications has addressed vulnerabilities between the browser and application servers since 2003. Comparing the 2017, 2021, and 2025 editions shows a radical shift in threat trends. Injection flaws (A01:2017-Injection), which held the top spot in 2017, fell to third place in 2021 and fifth place in 2025 due to the widespread adoption of ORM (Object-Relational Mapping) libraries and parameterized queries. Conversely, Broken Access Control rose from fifth place in 2017 to first place in both 2021 and 2025. This rise is driven by transitions to microservices, which distribute authorization logic and make contextual flaws difficult for automated tools to detect.

Furthermore, in 2025, Server-Side Request Forgery (SSRF) was consolidated under Broken Access Control rather than remaining a standalone category. The "Vulnerable and Outdated Components" category was also expanded to cover SBOMs (Software Bill of Materials) and package integrity under "Software Supply Chain Failures" (A03:2025). The newly added "Mishandling of Exceptional Conditions" (A10:2025) targets system resilience, ensuring applications fail-securely without leaking details in error messages.

A01:2025 – Broken Access Control: Users accessing resources beyond their permissions (SSRF is integrated here).
A02:2025 – Security Misconfiguration: Missing or incomplete security settings, default configurations, or unnecessary services and credentials left open.
A03:2025 – Software Supply Chain Failures: Vulnerabilities in third-party dependencies, use of unsigned packages, and insecure build tools.
A04:2025 – Cryptographic Failures: Insecure transmission or weak encryption of sensitive data (formerly Sensitive Data Exposure).
A05:2025 – Injection: User inputs sliding into SQL/NoSQL or OS commands; Cross-Site Scripting (XSS) is integrated here.
A06:2025 – Insecure Design: Lack of threat modeling and secure architectural design prior to writing code.
A07:2025 – Authentication Failures: Session management flaws, susceptibility to brute force, and credential stuffing attacks.
A08:2025 – Software or Data Integrity Failures: Accepting data from untrusted sources without verification (including insecure deserialization).
A09:2025 – Security Logging & Alerting Failures: Failure to record security events or generate alerts during an ongoing cyberattack.
A10:2025 – Mishandling of Exceptional Conditions: Failing open during errors and exposing debug logs or stack traces.


Section: API Security (OWASP API Security Top 10)


The API Security Top 10 project focuses on web services that facilitate data exchange between clients and servers. Comparing the 2019 and 2023 editions shows that vulnerabilities are shifting toward business logic as the API economy grows. "Excessive Data Exposure" (A3) and "Mass Assignment" (A6), which were separate in 2019, were combined in 2023 under "Broken Object Property Level Authorization" (API3:2023) because both stem from a lack of access controls on specific object properties.

One of the most notable updates in the 2023 release is "Unrestricted Access to Sensitive Business Flows" (API6:2023). In this scenario, the API code may run flawlessly, yet the absence of Captchas or rate limiting allows automated bots to exhaust ticket inventories in seconds. With the increase in external integrations, "Server-Side Request Forgery" (API7:2023) and "Unsafe Consumption of APIs" (API10:2023) — which targets the unvalidated use of third-party APIs — have also been added.

API1:2023 – Broken Object Level Authorization (BOLA): Failure to match object IDs in request parameters with user privileges (IDOR).
API2:2023 – Broken Authentication: Weak configuration of API keys, JWT validation, or authentication flows.
API3:2023 – Broken Object Property Level Authorization (BOPLA): Users viewing restricted object fields or modifying them via mass assignment.
API4:2023 – Unrestricted Resource Consumption: Absence of rate limits or CPU/memory constraints, leading to denial of service.
API5:2023 – Broken Function Level Authorization (BFLA): Regular users executing administrative API endpoints.
API6:2023 – Unrestricted Access to Sensitive Business Flows: Automating business workflows (e.g., checking discount codes) via bots.
API7:2023 – Server-Side Request Forgery (SSRF): The API server sending requests to internal backend servers based on attacker-supplied URLs.
API8:2023 – Security Misconfiguration: Incorrect CORS headers, default settings, or unnecessary HTTP methods enabled.
API9:2023 – Improper Inventory Management: Leaving legacy API versions (v1, beta) or undocumented test endpoints active and forgotten.
API10:2023 – Unsafe Consumption of APIs: Trusting and processing unvalidated data received from third-party services.


Section: Mobile Application Security (OWASP Mobile Top 10)


Mobile security focuses on protecting client-side boundaries (on iOS/Android devices) rather than just server controls. Comparing the 2016 and 2024 editions reveals that mobile threats have evolved significantly. In the 2024 list, published after an eight-year gap, "Improper Credential Usage" (M1:2024) claimed the top spot. This shift is driven by attackers reverse-engineering application binaries (APKs/IPAs) to extract hardcoded AWS credentials, Firebase keys, or OAuth secrets.

Additionally, the uncontrolled use of third-party libraries has pushed "Inadequate Supply Chain Security" (M2:2024) to the top of the list. "Inadequate Privacy Controls" (M6:2024) was added as a new category to align with regulations like GDPR and CCPA. Previous categories like "Reverse Engineering" and "Code Tampering" were consolidated under "Insufficient Binary Protections" (M7:2024).

M1:2024 – Improper Credential Usage: Storing sensitive credentials or API keys unencrypted inside the application package.
M2:2024 – Inadequate Supply Chain Security: Integrating untrusted SDKs or failing to verify the integrity of packages.
M3:2024 – Insecure Authentication/Authorization: Executing authentication checks only on the device, without server-side validation.
M4:2024 – Insufficient Input/Output Validation: Failure to validate deep links, IPC messages, or user forms.
M5:2024 – Insecure Communication: Permitting invalid certificates or lacking SSL/TLS pinning, enabling MITM attacks.
M6:2024 – Inadequate Privacy Controls: Collecting user data without consent or writing PII to system logs.
M7:2024 – Insufficient Binary Protections: Lack of code obfuscation and absence of root/jailbreak detection controls.
M8:2024 – Security Misconfiguration: Leaving debug mode active in manifest files or requesting excessive system permissions.
M9:2024 – Insecure Data Storage: Saving sensitive data unencrypted in local SQLite databases, preference files, or logs.
M10:2024 – Insufficient Cryptography: Utilizing outdated algorithms (e.g., RC4, DES, MD5) or generating weak keys.


Section: Large Language Model Application Security (OWASP LLM Top 10)


This list defines application-layer risks arising from integrating Large Language Models (LLMs) and generative AI. Comparing the 2023 (v1.1) and 2025 editions shows how the transition of AI systems into autonomous agents and RAG (Retrieval-Augmented Generation) architectures has introduced new vulnerabilities. While data disclosure was lower on the list in 2023, "Sensitive Information Disclosure" (LLM02) rose to second place in 2025. This rise occurred because integrated RAG systems often retrieve and expose internal department secrets to unauthorized users through model responses without checking access boundaries.

Furthermore, the 2025 edition introduced "Vector and Embedding Weaknesses" (LLM08) — which targets the poisoning of vector databases — and "System Prompt Leakage" (LLM07) — which focuses on extracting hidden instructions. The "Model Denial of Service" category was replaced by "Unbounded Consumption" (LLM10) to address both resource exhaustion and API quota exploitation.

LLM01: Prompt Injection: Overriding or manipulating system instructions using direct or indirect input prompts.
LLM02: Sensitive Information Disclosure: The model exposing confidential enterprise data or training inputs to unauthorized users.
LLM03: Supply Chain: Utilizing insecure base models, poisoned plugins, or compromised training repositories.
LLM04: Data and Model Poisoning: Manipulating training data or fine-tuning datasets to introduce backdoors.
LLM05: Improper Output Handling: Executing raw model outputs directly, leading to XSS or command execution.
LLM06: Excessive Agency: AI agents possessing unrestricted permissions (read, write, delete) over integrated plugins.
LLM07: System Prompt Leakage: Exfiltrating hidden system prompts and isolation rules via indirect prompt injection.
LLM08: Vector and Embedding Weaknesses: Poisoning vector databases and bypassing multi-tenant isolation boundaries.
LLM09: Misinformation: Relying on incorrect model responses or hallucinations in critical workflows without verification.
LLM10: Unbounded Consumption: Flooding model interfaces to exhaust resources or inflate API usage costs (denial of wallet).


Section: Machine Learning Security (OWASP ML Security Top 10)


This draft list targets the mathematical and statistical vulnerabilities of machine learning models, distinguishing itself from LLM application-layer concerns. The ML Security project examines data poisoning and adversarial evasion attacks in traditional supervised and unsupervised learning models (e.g., SVMs, CNNs, regression models).

While the LLM Top 10 list focuses onMetalinguistic prompt manipulations, the ML list addresses manipulations aimed at shifting the decision boundaries of the model. For example, applying noise (adversarial perturbations) to a speed limit sign to mislead an autonomous vehicle's object classification model falls under ML01. Extracting training data via outputs (model inversion) and analyzing model queries to reconstruct parameters (model theft) represent critical mathematical vulnerabilities covered by this project.

ML01: Input Manipulation Attack: Adding perturbations to input data to force misclassifications (evasion).
ML02: Data Poisoning Attack: Injecting mislabeled or malicious data into the dataset during the training phase.
ML03: Model Inversion Attack: Reconstructing sensitive training inputs using mathematical analysis of model predictions.
ML04: Membership Inference Attack: Determining whether a specific data record was part of the model's training set.
ML05: Model Theft: Creating a surrogate model by analyzing response patterns to queries.
ML06: ML Supply Chain Attacks: Running malicious code via insecure model serialization formats (e.g., PyTorch pickle).
ML07: Transfer Learning Attack: Backdoors embedded in source models that persist when transferred to down-stream tasks.
ML08: Model Skewing: Sabotaging feedback loops in online learning models to distort decision boundaries.
ML09: Output Integrity Attack: Compromising predictions or classification results in transit.
ML10: Model Poisoning: Modifying model parameters or weights directly to degrade performance.


Section: Kubernetes Security (OWASP Kubernetes Top 10)


The Kubernetes Top 10 project covers the runtime and orchestration layers of modern microservice architectures. Comparing the 2022 and 2025 editions shows that threats have shifted from local component security toward cloud integrations and lateral movement boundaries. A critical update in 2025 is "Cluster to Cloud Lateral Movement" (K08:2025).

In cloud-hosted Kubernetes clusters, pods can query local metadata endpoints to exfiltrate and reuse node IAM credentials, gaining access to the broader cloud account. Additionally, component vulnerabilities and outdated cluster versions were merged under "Misconfigured and Vulnerable Cluster Components" (K07:2025). The authorization category was also expanded beyond RBAC to encompass webhook authorizers under "Overly Permissive Authorization Configurations" (K02:2025).

K01: Insecure Workload Configurations: Running pods in privileged mode or as root, leading to container escapes.
K02: Overly Permissive Authorization Configurations: Granting excessive RBAC permissions (e.g., utilizing wildcard symbols).
K03: Secrets Management Failures: Storing secrets unencrypted in etcd or mounting them insecurely into pod file systems.
K04: Lack of Cluster Level Policy Enforcement: Absence of admission controllers (e.g., Kyverno or OPA) to enforce rules.
K05: Missing Network Segmentation Controls: Allowing unrestricted pod-to-pod traffic, exposing the entire network if one pod is breached.
K06: Overly Exposed Kubernetes Components: Exposing API servers, Kubelet ports, or dashboards to the public internet.
K07: Misconfigured and Vulnerable Cluster Components: Outdated Kubernetes control plane versions and configuration errors.
K08: Cluster to Cloud Lateral Movement: Pod service accounts exfiltrating credentials to access cloud-layer resources (AWS IAM, GCP Service Accounts).
K09: Broken Authentication Mechanisms: Weak management of user tokens or mTLS certificates used for cluster communication.
K10: Inadequate Logging and Monitoring: Failure to collect and centralize cluster audit logs to detect attacks.


Section: CI/CD Pipeline Security (OWASP CI/CD Security Risks)


The CI/CD Security Risks project addresses the delivery pipeline where code is built and packaged for production. This list targets vulnerabilities in runners, build hosts, and package registries, which represent critical weaknesses in DevSecOps environments.

The most dangerous vulnerability in this project is "Poisoned Pipeline Execution" (CICD-SEC-4), where attackers modify build configuration files (e.g., GitHub Actions .yml or Jenkinsfiles) to run malicious code on runner hosts. "Dependency Chain Abuse" (CICD-SEC-3) covers dependency confusion attacks, where developers inadvertently download malicious public packages instead of private internal ones. Storing over-privileged AWS/Azure keys on build runners and exposing them in logs (CICD-SEC-6) are also core concerns.

CICD-SEC-1: Insufficient Flow Control Mechanisms: Merging code changes directly to production without peer reviews (PR bypass).
CICD-SEC-2: Inadequate Identity and Access Management: Utilizing over-privileged user or service accounts in pipeline tools.
CICD-SEC-3: Dependency Chain Abuse: Developers downloading malicious packages via dependency confusion or typosquatting.
CICD-SEC-4: Poisoned Pipeline Execution (PPE): Modifying configuration files in code repositories to execute commands on runners.
CICD-SEC-5: Insufficient PBAC (Pipeline-Based Access Controls): Lack of isolation between pipeline stages, allowing one step to access another's secrets.
CICD-SEC-6: Insufficient Credential Hygiene: Exposing deployment keys or API tokens as plain text in variables or execution logs.
CICD-SEC-7: Insecure System Configuration: Insecure host configurations or unpatched software on Jenkins/GitLab runners.
CICD-SEC-8: Ungoverned Usage of 3rd Party Services: Integrating unverified analysis tools or Slack bots into build pipelines.
CICD-SEC-9: Improper Artifact Integrity Validation: Failure to cryptographically sign (e.g., via Cosign) and verify built images or packages.
CICD-SEC-10: Insufficient Logging and Visibility: Failure to record runner activities and unauthorized secret access.


Section: Data Privacy Security (OWASP Privacy Risks)


The OWASP Privacy Risks project covers privacy violations during data collection, processing, and storage. It serves as a technical bridge between legal compliance (GDPR, CCPA) and software engineering. Comparing the 2014 and 2021 (v2.0) editions highlights the growing importance of user consent and Data Subject Access Requests (DSAR).

The 2021 release added "Consent on Everything" (P4:2021), which examines how overwhelming users with consent prompts (consent fatigue) invalidates the legality of consent. "Insufficient Deletion of User Data" (P6:2021) covers the technical challenge of ensuring that deleted user data is removed from all backup systems, database relationships, and log files.

P1: Web Application Vulnerabilities: Leaks of personal data caused by technical flaws like SQL injection.
P2: Operator-sided Data Leakage: Misconfigurations exposing PII to unauthorized departments or external analytical tools.
P3: Insufficient Data Breach Response: Failing to detect data breaches or report them to regulators within legal windows (e.g., 72 hours under GDPR).
P4: Consent on Everything: Bombarding users with consent prompts (consent fatigue) to obtain uninformed consent.
P5: Non-transparent Policies: Presenting long, overly complex privacy agreements that are unreadable to users.
P6: Insufficient Deletion of User Data: Retaining personal data in backups or relational tables after a user deletes their account.
P7: Insufficient Data Quality: Relying on outdated or incorrect user data in critical decision-making processes.
P8: Missing or Insufficient Session Expiration: Long session lifetimes exposing personal data on shared computers.
P9: Inability of Users to Access and Modify Data: Lacking client interfaces for users to view, correct, or port their stored data.
P10: Collection of Data Not Required: Gathering data unrelated to the core service (e.g., a flashlight app requesting access to contacts).


Section: Serverless Architecture Security (OWASP Serverless Top 10)


The Serverless project examines risks in event-driven FaaS (Function-as-a-Service) architectures where the underlying infrastructure is managed by a cloud provider. It is an interpretation document showing how traditional web risks shift in serverless environments. While OS patching is handled by the cloud provider, application-layer security remains the developer's responsibility.

The diversity of event sources (API Gateways, S3 uploads, database logs) broadens injection vulnerabilities to "Event Data Injection" (Risk 1). Furthermore, failing to restrict IAM roles for short-lived functions ("Over-privileged IAM Roles") can allow attackers to compromise the entire cloud account from a single function. "Denial of Wallet" (Risk 7) covers infinite loops in functions that generate significant cloud costs in minutes.

1: Event Data Injection: Processing inputs from event sources (e.g., S3 bucket notifications) without validation.
2: Broken Authentication: Stateless functions failing to validate authentication tokens on every request.
3: Insecure Serverless Deployment Configuration: Exposing configuration parameters or environment variables.
4: Over-privileged IAM Roles: Assigning broad cloud resource permissions instead of applying least-privilege configurations to functions.
5: Inadequate Function Monitoring and Logging: Failure to aggregate logs from short-lived distributed functions into a central SIEM.
6: Shared Execution Environment Risks: Functions sharing physical compute resources leaking data via memory.
7: Denial of Wallet / Resource Abuse: Triggering functions excessively to create high billing costs.
8: Insecure Third-Party Dependencies: Loading unverified packages to keep function package sizes small.
9: Impersonation and Session Hijacking: Exfiltrating temporary keys stored unencrypted in function execution memory.
10: Serverless Function Data Leakage: Sensitive data remaining in temporary directories (/tmp) and being read by subsequent executions.


Section: Low-code / No-code Platform Security (OWASP Low-code / No-code Risks)


This list covers risks in citizen development environments where software is built using graphical interfaces and pre-configured templates. The project was initiated because applications built by business analysts or HR staff often bypass corporate security controls.

Allowing applications to expose internal databases to the internet via pre-configured connectors introduces "Data Leakage" (LCNC-SEC-03). The primary governance challenge is "Asset Management Failures" (LCNC-SEC-09) — the inability to track who builds which applications and what external resources they connect to. This creates "shadow IT" risks across the enterprise.

LCNC-SEC-01: Account Impersonation: Unauthorized application users executing actions under the privileges of service accounts.
LCNC-SEC-02: Authorization Misuse: Flawed authorization configurations in graphical interfaces leading to data exposure.
LCNC-SEC-03: Data Leakage and Unexpected Consequences: Moving data to unapproved cloud repositories via form connectors.
LCNC-SEC-04: Authentication Failures: Utilizing weak or unencrypted communication protocols for data integrations.
LCNC-SEC-05: Security Misconfiguration: Platform administrative sharing permissions left set to "public" by default.
LCNC-SEC-06: Injection Handling Failures: Data injections caused by a lack of input validation by citizen developers.
LCNC-SEC-07: Vulnerable and Untrusted Components: Downloading unverified templates or add-ons from platform marketplaces.
LCNC-SEC-08: Data and Secret Handling Failures: Hardcoding API keys or database passwords directly in form design interfaces.
LCNC-SEC-09: Asset Management Failures: Inability to track deployed low-code applications across the enterprise (Shadow IT).
LCNC-SEC-10: Security Logging and Monitoring Failures: User-developed application actions bypassing corporate SIEM monitoring.


Chapter: Comparative Technical Analysis of Critical Projects


In the cards below, technical comparisons are provided for critical projects that are frequently confused or must be managed together due to architectural similarities and differences in execution.

WEB vs API vs MOBILE
Boundary & Authorization Differences
Web application security revolves around server-side sessions and browser-level policies (CORS, CSP). In API security, the model changes completely; sessions are replaced by stateless token-based architectures (OAuth, JWT) validated on every request. The most common API error is sending raw database objects to the client without filtering (BOPLA). Mobile security, assuming the attacker has physical control over the device, prioritizes local encryption of data on disk and protecting binary files against reverse engineering.

LLM vs ML SECURITY
Application vs Model Security
The LLM Top 10 targets the behavior of large language models at the application layer. The primary threat here is prompt injection, which occurs because the model processes data and instructions via the same channel. The ML Security project targets the statistical and mathematical structure of the model. ML attacks include data poisoning during training, extracting model weights to replicate the model, or adding noise to inputs to mislead model decisions (adversarial evasion).

CI/CD vs KUBERNETES
SDLC vs Runtime Execution
CI/CD security spans the software assembly and packaging phases, aiming to prevent malicious code injection (Poisoned Pipeline Execution). Kubernetes security begins once those packages are executed in production. An unsigned image built insecurely during CI/CD can introduce vulnerabilities into running containers, allowing attackers to abuse cluster resources via over-privileged RBAC roles. Together, these two projects establish an unbroken chain of defense from pipeline to runtime.

SERVERLESS vs LCNC
Distributed Infrastructure vs Citizen Dev
Serverless architecture consists of thousands of short-lived functions (FaaS) managed by the cloud provider. Vulnerabilities here typically stem from over-privileged IAM roles and sensitive data left in temporary directories. Low-code/No-code, conversely, involves "shadow" applications built by non-technical business units (citizen developers). While serverless focuses on micro-level infrastructure hardening, LCNC centers on managing database connectors and tracking digital assets to prevent data leakage.


Chapter: Architectural Boundaries and Lateral Movement Scenario


Modern attackers do not exploit vulnerabilities in isolation; they leverage architectural crossovers to move laterally between systems. A classic example of this is a compromise starting in a CI/CD pipeline, extending to a Kubernetes cluster, and ultimately breaching the entire cloud environment.

The diagram below models a lateral movement chain starting with a CI/CD pipeline compromise (Poisoned Pipeline Execution - PPE) and culminating in the takeover of the entire cloud infrastructure.

In this attack flow, an attacker manipulates a script running inside the CI/CD pipeline (CICD-SEC-4) to gain control of the build runner. The attacker then signs and uploads a malicious container image to the registry. The Kubernetes cluster deploys this compromised image due to a lack of image verification controls (K01).

Once running inside the cluster, the malicious container queries the cloud provider metadata service (169.254.169.254) to exfiltrate the temporary credentials assigned to the underlying node. If these credentials violate least-privilege principles (K08), the attacker escapes the pod boundary and uses the IAM role permissions to take over the entire cloud infrastructure.


Chapter: Maturity Analysis and Industry Alignment


The maturity and adoption levels of OWASP projects provide critical guidance on where organizations should allocate their AppSec budgets.

Projects are classified under three primary tiers:
Flagship Projects: Long-standing, continually updated projects backed by vast datasets and referenced directly by compliance standards such as PCI DSS, ISO 27001, or NIST SSDF (e.g., Web, API, and Mobile Top 10, along with the ASVS and SAMM models).
Lab Projects: Projects with active development and high industry awareness, but which are not yet embedded in global regulations, relying on expert consensus rather than automated datasets (e.g., Kubernetes, LLM, and CI/CD Top 10).
Incubator and Static Projects: Projects that achieved temporary popularity but have slowed down due to evolving technologies or a decline in voluntary maintainers (e.g., Privacy Risks v2.0 or the 2018 Serverless interpretation). Organizations are advised to consult modern cloud-native security guides rather than outdated versions of these lists.


Chapter: Future Threat Frontiers: Agentic Security and NHI


The most critical paradigm shift in software engineering is the transition from deterministic applications to autonomous Agentic AI systems and the massive growth of Non-Human Identities (NHI). This transition renders traditional application security approaches largely obsolete.

To address the risks of this new era, OWASP has announced the Top 10 for Agentic Applications 2026 project. Key threats highlighted in this ecosystem include:
ASI01: Agent Goal Hijack: Manipulating the core objective of the agent via prompt injection, making it serve the attacker's goals instead.
ASI02: Tool Misuse: The agent executing tools granted to it (e.g., database queries, sending emails, running code) with unexpected or malicious parameters.
ASI03: Identity & Privilege Abuse: Manipulating agents that have been granted excessive privileges to perform complex tasks.
ASI06: Memory & Context Poisoning: Injecting malicious data into the memory space of long-running agents, permanently altering their decisions over time.

The most critical weakness of these architectures is the lack of oversight over Non-Human Identities (NHI) communicating without human intervention. API keys, service accounts, OAuth permissions, and JWT tokens used by one service to access another have become prime targets. While human accounts are heavily guarded by 2FA/MFA policies, machine-to-machine credentials are often unmonitored. Unless agents and NHIs are secured, even the strongest Kubernetes clusters or secure codebases can be bypassed through automated authorization chains.

Application security is no longer a static checklist, but a living process of architectural resilience. When designing your systems, you must extend your threat models beyond static code analysis, maintaining continuous oversight over dependencies, pipeline structures, and non-human credentials.

Be the architect of your data, reclaim your sovereignty. Thank you for listening!
