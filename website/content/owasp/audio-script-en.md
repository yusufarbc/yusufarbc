As the software development ecosystem expands and evolves from monolithic architectures to cloud-native, microservice-based, and AI-assisted patterns, threat surfaces are fragmenting at an unprecedented rate. Traditional web security controls alone are no longer sufficient to protect modern systems. The OWASP (Open Worldwide Application Security Project) Foundation, the most critical reference in the open-source application security ecosystem, designs specialized awareness projects for different technological layers to make this complex threat landscape manageable.

The central thesis of this article is that application security is undergoing a fundamental paradigm shift: moving away from simple input/output parameter validation to distributed identity and access control, software supply chain integrity, and the securing of autonomous Agentic AI systems and Non-Human Identities (NHI). Below is a comprehensive comparison of the ten primary OWASP projects alongside the newest frontiers representing Agentic Security and Non-Human Identities.

Chapter: OWASP Methodology, Data Analytics, and Layered Threat Modeling

The transition of OWASP from traditional list-making to modern data-driven analysis symbolizes the maturation of the application security discipline. While early lists (2003–2010) relied heavily on limited expert consensus and restricted vulnerability datasets, today's methodology is built on massive data calls, industry-wide CVE analyses, and CWE (Common Weakness Enumeration) mappings.

For instance, in the latest Web Top 10 (2025) release, the methodology is based on analyzing over 589 distinct CWE classes across more than 2.8 million applications. The "incidence rate" metric utilized in this new era prevents automated scanning tools from skewing data by repeating the same finding thousands of times. This metric evaluates the percentage of analyzed applications containing a vulnerability class at least once. Community surveys act as a balancing agent in a hybrid model, ensuring that risks with lower frequency in data but exceptionally high exploitability and impact (such as Software Supply Chain Failures or SSRF) are included in the lists.

Section: Layered Threat Modeling and Domain Diversity

One of the biggest mistakes security teams make is attempting to apply the Web Top 10 list as a one-size-fits-all template across the entire software ecosystem. In reality, the architectural design, trust boundaries, and threat surfaces of each technology layer are fundamentally different.

In web applications, the primary trust boundary lies between the browser and the server, and vulnerabilities typically stem from server-side code flaws. In mobile applications, however, the attacker is assumed to have full physical and administrative (root/jailbreak) control over the device. This control elevates binary protection, prevention of static encryption key disclosure, and secure client-side storage requirements to top priorities in the mobile security model. In the API world, the user interface disappears entirely, meaning attackers target backend data models and business logic directly. Because most API attacks take place within legitimate HTTP protocols and normal data flows, traditional WAF systems struggle to detect them. Consequently, API projects focus on authorization validation failures at the object and function levels.

Chapter: Web Application Security (OWASP Web Top 10)

Section: Strategic Assessment, Historical Evolution, and Critical Risk Details

Web security threats have evolved radically over the past two decades. In the early 2000s, input-filtering flaws such as Injection (SQL Injection, Cross-Site Scripting - XSS) dominated the landscape. Today, these have significantly declined due to modern application frameworks (like React, Angular, Django, Spring) providing built-in parameterized queries and automatic context-aware output encoding. Consequently, Injection fell from the #1 spot in 2017 to third in 2021, and fifth in 2025.

In contrast, the shift from monolithic codebases to microservices and Single Page Applications (SPAs) has decentralized authorization logic across distinct services. This architectural complexity has propelled Broken Access Control—which is highly contextual and difficult for automated scanners to detect—to the undisputed #1 spot in the 2021 and 2025 releases. Modern web application security is no longer just about sanitizing inputs; it centers on enforcing granular authorization boundaries and verifying software supply chain integrity (SBOMs and package signatures).

Chapter: API Security (OWASP API Security Top 10)

Section: Strategic Assessment, Historical Evolution, and Critical Risk Details

APIs have become the backbone of modern microservice architectures, mobile apps, and cloud-native integrations. Unlike traditional web applications, APIs lack a presentation layer (HTML/CSS); instead, clients and servers exchange raw data in JSON or XML format. This architecture collapses the attack surface directly onto the underlying data models and business logic. The API Security project was launched in 2019 to address these specific threats, and updated in 2023 to reflect the evolution of the API ecosystem.

The 2023 update confirms that API vulnerabilities have shifted from technical coding issues to complex logic flaws. For example, Excessive Data Exposure and Mass Assignment were merged into a single category: Broken Object Property Level Authorization (BOPLA), because both arise from a failure to validate access to specific object properties. Traditional Web Application Firewalls (WAFs) are largely ineffective here, as attackers use legitimate HTTP protocols and valid tokens to exploit these flaws. Consequently, API security is fundamentally centered on verifying request context against object-level authorization permissions (BOLA).

Chapter: Mobile Application Security (OWASP Mobile Top 10)

Section: Strategic Assessment, Historical Evolution, and Critical Risk Details

Mobile devices (iOS and Android) utilize security models that differ fundamentally from web browsers. In mobile security, the core assumption is that the attacker has full physical and administrative control (root/jailbreak) over the device. Consequently, rather than relying on browser-enforced boundaries or server-side checks, mobile application security prioritizes protecting the application's binary package (APK/IPA) from local exploitation. The Mobile Top 10 was completely overhauled in 2024 to address modern patterns like hybrid frameworks, OAuth flows, and biometrics.

The most critical change in the 2024 release is that "Improper Credential Usage" (M1) has claimed the #1 spot. Developers often forget that mobile binaries can be easily decompiled and reverse-engineered. They hardcode AWS access keys, Firebase passwords, or third-party API credentials directly into the application code, allowing attackers to extract them in seconds. Furthermore, the reliance on third-party SDKs (M2: Inadequate Supply Chain Security) and the leakage of personal data into system logs or insecure on-device storage (M6: Inadequate Privacy Controls) have become major compliance risks under regulations like GDPR and CCPA.

Chapter: Large Language Model Application Security (OWASP LLM Top 10)

Section: Strategic Assessment, Historical Evolution, and Critical Risk Details

Integrating Large Language Models (LLMs) and Generative AI into enterprise architectures has introduced entirely new threat vectors. Unlike deterministic systems, LLMs are probabilistic, processing instructions and data through the same natural language interface. This blending of channels makes separating data from execution instructions extremely difficult. The LLM Top 10 project was created in 2023 to address these issues and updated in 2025 as AI systems evolved from static text interfaces into autonomous agents and RAG (Retrieval-Augmented Generation) patterns.

The 2025 edition highlights the critical risk of "Sensitive Information Disclosure" (LLM02), which has risen to the #2 spot. Organizations link internal databases to LLMs via RAG, but the models often fail to verify user permissions, exposing restricted department secrets in their responses. Furthermore, the autonomous execution capabilities of AI systems have introduced "Excessive Agency" (LLM06). Attackers exploit prompt injections to hijack agents and execute unauthorized actions, such as deleting database tables or sending phishing emails. LLM security now requires strict architectural guardrails, model output sanitization, and privilege boundaries around AI-driven agents.

Chapter: Machine Learning Security (OWASP ML Security Top 10)

Section: Strategic Assessment, Historical Evolution, and Critical Risk Details

While LLM security focuses on application-layer wrappers and text processing, Machine Learning (ML) Security targets the mathematical, statistical, and algorithmic core of models. Traditional supervised and unsupervised models (such as CNNs, SVMs, and regression models) rely on statistical data distributions. Attackers exploit this by manipulating these mathematical distributions to shift the model's decision boundaries.

The core paradigm shift in ML security is that attacks are executed via data manipulation rather than traditional code exploitation. For instance, in an autonomous vehicle's sign-recognition model, an attacker applies a small, human-imperceptible perturbation (noise) to a speed limit sign. The model misclassifies the sign as a "stop sign" due to this statistical shift (ML01). These adversarial manipulations and training data poisoning (ML02) cannot be detected by standard application security tools (SAST/DAST). Protecting ML models requires mathematical defense techniques (adversarial training), input preprocessing, and securing serialized model files.

Chapter: Kubernetes Security (OWASP Kubernetes Top 10)

Section: Strategic Assessment, Historical Evolution, and Critical Risk Details

The rise of cloud-native architectures has established Kubernetes (K8s) as the industry standard for container orchestration. Kubernetes security extends far beyond traditional server hardening; it spans dynamic container runtimes, pod-to-pod network isolation, and cloud provider API integrations. The Kubernetes Top 10 was launched in 2022 and updated in 2025 to reflect the shifting focus of cloud-native threat actors.

The primary trend in the 2025 update is the transition from localized container misconfigurations to "Cluster-to-Cloud Lateral Movement" (K08). In cloud-hosted K8s environments, pods can query the local metadata service to exfiltrate temporary cloud credentials assigned to the underlying node. Attackers exploit this to escape the container sandbox, using the stolen IAM credentials to compromise the organization's entire cloud account. Consequently, K8s security is no longer just about Role-Based Access Control (RBAC) hardening; it requires strict boundaries between the container orchestrator and the cloud provider's API.

Chapter: CI/CD Pipeline Security (OWASP CI/CD Security Risks)

Section: Strategic Assessment, Historical Evolution, and Critical Risk Details

Automating software delivery through CI/CD pipelines has accelerated release cycles, but has also turned build environments into high-value targets. CI/CD pipelines (Jenkins, GitLab CI, GitHub Actions) occupy the center of the software supply chain. While traditional security controls focus on production environments, major attacks like SolarWinds and Codecov have demonstrated that compromising the build pipeline allows attackers to compromise downstream customers. The CI/CD Security Risks project was launched in 2022 to define this threat landscape.

The primary risk in CI/CD environments is that pipeline configurations (such as .github/workflows/deploy.yml or Jenkinsfile) are managed alongside application code in git repositories. If an attacker gains write access to a repository or compromises a developer account, they can modify these configuration files to execute malicious code on the build runners (Poisoned Pipeline Execution - CICD-SEC-4). This execution allows the attacker to steal production deployment keys and cloud secrets stored in the runner's environment variables. Protecting CI/CD systems requires enforcing strict pull request workflows, isolating runners, and signing build outputs cryptographically.

Chapter: Data Privacy Security (OWASP Privacy Risks)

Section: Strategic Assessment, Historical Evolution, and Critical Risk Details

Global regulations like GDPR, CCPA, and regional privacy frameworks have turned data privacy into a legal mandate. However, privacy cannot be achieved solely through legal policies; it requires engineering solutions embedded within the application architecture. The Privacy Risks project was updated in 2021 (v2.0) to address technical privacy challenges like user consent management and automated data erasure.

The primary engineering challenges in privacy security are uncontrolled data collection and the complexity of executing user data erasure requests (the right to be forgotten). When a user deletes their account, applications often remove the record from the main database table but fail to delete related records stored in backup servers, analytics databases, relational tables, or application logs (P6: Insufficient Deletion of User Data). Furthermore, bombarding users with consent prompts for every action creates "consent fatigue" (P4), causing users to approve terms without reading them. Designing for privacy requires enforcing data minimization, implementing automated data deletion pipelines, and adopting privacy-by-design principles.

Chapter: Serverless Architecture Security (OWASP Serverless Top 10)

Section: Strategic Assessment, Historical Evolution, and Critical Risk Details

Serverless architecture delegates infrastructure management (OS patching, server scaling) to cloud providers, executing code as event-driven functions (Function-as-a-Service / FaaS). While OS security falls to the cloud provider, application-layer security, data flow validation, and configuration management remain the developer's responsibility. The Serverless Top 10 interpretation document details how security boundaries shift in these environments.

The primary security risks in serverless applications are the variety of event sources that trigger functions and the configuration of over-privileged IAM roles. In serverless environments, inputs arrive not only via HTTP but also through S3 bucket uploads, database updates, or IoT device events. This variety broadens injection risks to "Event Data Injection" (Risk 1). Furthermore, developers often assign broad administrator permissions to functions to simplify deployment. If an attacker compromises a function, they leverage this over-privileged IAM role to compromise the entire cloud account. Serverless security requires restricting function privileges, sanitizing event data, and implementing budget limits to counter "Denial of Wallet" risks.

Chapter: Low-code / No-code Platform Security (OWASP Low-code / No-code Risks)

Section: Strategic Assessment, Historical Evolution, and Critical Risk Details

Low-code/No-code (LCNC) platforms (Microsoft PowerApps, Retool, Mendix) allow business users (citizen developers) to build applications rapidly using graphical interfaces and pre-configured connectors. While this accelerates business operations, it bypasses traditional corporate security audits, creating a massive "Shadow IT" (LCNC-SEC-09) threat surface. The LCNC Risks project was launched in 2022 to define the security risks of citizen-developed systems.

The primary risk in LCNC platforms is that non-technical developers use pre-configured connectors to expose internal corporate databases directly to the public internet. Lacking security training, citizen developers often deploy applications without input validation, creating SQL Injection (LCNC-SEC-06) vulnerabilities, or leave sharing permissions set to "public" (LCNC-SEC-05). Furthermore, downloading unverified templates or add-ons from platform marketplaces (LCNC-SEC-07) introduces supply chain risks. LCNC security requires enforcing Data Loss Prevention (DLP) policies at the platform layer, maintaining an inventory of all deployed applications, and raising developer security awareness.

Chapter: Cross-Domain Comparison and Lateral Movement Scenarios

Security teams often make the mistake of auditing vulnerabilities in isolation. In reality, modern threat actors combine multiple vulnerabilities across technological boundaries to execute lateral movement. A classic example of this is an attack chain starting in a CI/CD pipeline, extending to a Kubernetes cluster, and ultimately compromising the entire cloud infrastructure.

Section: Integrated Comparison and Lateral Movement Analysis

In the interactive panel below, you can explore the technical comparisons of critical OWASP projects that are often confused or must be managed together due to their overlapping architectures.

Web vs API vs Mobile
LLM vs ML Security
CI/CD vs Kubernetes
Serverless vs LCNC
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

The diagram below models a lateral movement chain starting with a CI/CD pipeline compromise (Poisoned Pipeline Execution - PPE) and culminating in the takeover of the entire cloud infrastructure.

In this attack flow, an attacker manipulates a script running inside the CI/CD pipeline (CICD-SEC-4) to gain control of the build runner. The attacker then signs and uploads a malicious container image to the registry. The Kubernetes cluster deploys this compromised image due to a lack of image verification controls (K01).

Once running inside the cluster, the malicious container queries the cloud provider metadata service (169.254.169.254) to exfiltrate the temporary credentials assigned to the underlying node. If these credentials violate least-privilege principles (K08), the attacker escapes the pod boundary and uses the IAM role permissions to take over the entire cloud infrastructure.

Chapter: Strategic Roadmap: Maturity Models, Agentic AI, and Non-Human Identities (NHI)

Establishing a sustainable application security program requires moving beyond a static checklist to build a comprehensive corporate maturity framework. This strategic roadmap aims to guide organizations in assessing their current security posture, mitigating emerging autonomous AI threats, and securing non-human identities across cloud-native environments.

Section: Software Assurance Maturity: Adopting OWASP SAMM and ASVS

To effectively implement the various Top 10 lists at an enterprise level, organizations rely on two foundational OWASP governance frameworks:
OWASP ASVS (Application Security Verification Standard): A blueprint defining technical security requirements that applications must meet during the design, development, and testing phases. Coding and architectural standards are structured around three ASVS verification levels (Level 1, 2, and 3) to prevent web, API, and mobile flaws.
OWASP SAMM (Software Assurance Maturity Model): A governance framework designed to assess, formulate, and improve an organization's software security posture. SAMM enables security teams to evaluate maturity levels across five core business functions: Governance, Design, Implementation, Verification, and Operations.

Understanding the maturity and regulatory alignment of individual projects helps prioritize AppSec budgets:
Flagship Tier: Highly mature projects backed by vast datasets (Web, API, Mobile Top 10, ASVS, and SAMM) that are referenced directly by regulatory standards like PCI DSS and ISO 27001.
Lab Tier: Dynamically evolving projects (Kubernetes, LLM, and CI/CD Top 10) built on expert consensus rather than historical datasets, serving as vital guidelines for modern cloud environments.
Incubator/Static Tier: Legacy projects (such as older Serverless interpretations or Privacy Risks v2.0) that have slowed down due to technological evolution; organizations should consult modern cloud-native frameworks instead.

Section: Agentic AI Security and Autonomous Threat Vectors

The transition from deterministic applications to autonomous Agentic AI systems renders traditional input/output controls ineffective. To address the unique threat model of autonomous systems, the new Top 10 for Agentic Applications 2026 highlights critical risks:
ASI01 – Agent Goal Hijack: Exploiting prompt injections to override the agent's initial corporate alignment, redirecting its autonomous actions to serve the attacker's goals (such as exfiltrating data or hijacking downstream APIs).
ASI02 – Tool Misuse: The agent executing tools granted to it (such as sending emails, deleting records, or running code) with malicious or unexpected parameters due to manipulated conversational contexts.
ASI06 – Memory & Context Poisoning: Injecting malicious data into the long-term memory space of an active agent, permanently distorting its decision-making logic over time.

Section: Securing Non-Human Identities (NHI)

In cloud-native, distributed architectures, Non-Human Identities (NHI) represent the fastest-growing and least-monitored attack surface. API keys, service accounts, OAuth tokens, database connection strings, and JWTs used for machine-to-machine (M2M) communication have become prime targets for threat actors.

While human user accounts are guarded by strict Multi-Factor Authentication (MFA) and password rules, NHIs are often hardcoded in source repositories, stored insecurely in runner environments, and rarely rotated. If an attacker exfiltrates an active machine token, they can bypass the entire user authentication chain to compromise backend databases directly. Protecting NHIs is critical to preventing bypasses of even the most secure Kubernetes clusters or application codebases.

Section: Actionable Action Plan for Security Leaders

To manage this multi-layered threat surface, security leaders should adopt the following recommendations:
Continuous SBOM Audits & Signing: Enforce Software Bill of Materials (SBOM) tracking for all dependencies during the CI/CD phase. Cryptographically sign built images (e.g., via Cosign) and verify these signatures at the Kubernetes runtime using admission controllers.
Node-to-Cloud IAM Boundaries: Prevent containerized workloads from exfiltrating cloud metadata credentials by blocking access to the metadata IP address. Restrict cloud permissions using pod-specific IAM roles (least-privilege).
Dynamic Secret Ingestion: Avoid storing passwords, certificates, or tokens as plain text in code or configurations. Retrieve all credentials dynamically at runtime from secure secret management systems (like HashiCorp Vault or cloud secret managers).
Double-Layer AI Guardrails: Apply prompt injection filters to all incoming user queries in LLM applications. Clean and validate model outputs using deterministic rules before sending them to database tables or user browsers to prevent downstream injection attacks.

Be the architect of your data, reclaim your sovereignty. Thank you for listening!
