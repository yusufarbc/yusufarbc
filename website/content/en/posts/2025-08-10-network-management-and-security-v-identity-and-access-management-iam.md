---
date: '2025-08-10'
description: Identity and Access Management (IAM) is the set of business processes, policies and technologies that an organization uses to manage digital identities and their access rights to critical systems, applications and data. Its main purpose is to ensure ...
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*6OkxmUjEoOjEZW17jo7E8w.png
series:
- Network Security and Management
title: 'Network Management and Security V: Identity and Access Management (IAM)'
type: posts
---

Identity and Access Management (IAM) is the set of business processes, policies and technologies that an organization uses to manage digital identities and their access rights to critical systems, applications and data. Its main purpose is to ensure that the right people or services have access to the right resources, at the right time and for the right reasons. This framework is not just a technology stack, but a strategic governance discipline that fundamentally shapes an organization's security posture and operational efficiency. IAM covers all user identities within an organization, such as employees, contractors, business partners, and even customers, and controls the lifecycle (create, manage, delete) of each identity.

With digital transformation, the spread of cloud computing and remote working models becoming permanent, traditional network perimeters have gradually lost their meaning. In this new “borderless” world, identity has become the new perimeter of security. IAM systems play a central role in this modern architecture, providing secure and seamless access to both on-premises and cloud-based infrastructures, while significantly reducing the risks of cyber threats such as identity theft and account takeover.

The strategic benefits of IAM can be collected under three main headings: automation, security and governance. Automation increases operational efficiency by reducing the time required to manually manage user access and the risk of human error. At the security layer, IAM prevents unauthorized access to sensitive data and strengthens the security posture with risk-based, context-aware policies (for example, based on factors such as the user's location or the device they are using). In terms of governance and compliance, IAM solutions simplify compliance with regulations such as the General Data Protection Regulation (GDPR) and Sarbanes-Oxley (SOX), create audit trails, and ensure the implementation of corporate policies by ensuring access rights are regularly reviewed. Modern, cloud-based IAM platforms like Okta help organizations more effectively protect their digital assets by providing capabilities such as advanced server access, single sign-on (SSO), and multi-factor authentication (MFA) to meet these complex requirements.

Originally seen as an IT tool that only managed user accounts and passwords, IAM has now evolved into a strategic function that directly impacts critical business objectives such as business continuity, operational efficiency and legal compliance. Now, IAM has gone beyond the question of "who can access what" and turned into a dynamic and intelligent structure that manages "under what conditions, from which device and at what risk level" access can be provided. This transformation makes IAM an indispensable cornerstone of modern cybersecurity strategies.

### Part 1: Basic Access Management Frameworks

### AAA Model: Authentication, Authorization, and Accounting

AAA (Authentication, Authorization, and Accounting) is a basic security framework used in computer networks to intelligently control access, enforce policies, audit usage, and provide information necessary to bill for services. This model manages the process of accessing network resources by dividing it into three separate and sequential steps. These steps are chronological and interdependent; The previous step must be completed successfully before moving on to the next step.

* **Authentication:** This is the first step in the process and involves verifying the identity of a user or device. The user has to prove the claim “who am I”. This is usually done with traditional credentials such as username and password. However, in modern systems, this process can also be supported by hardware tokens, digital certificates or biometric data such as fingerprints. The AAA server compares the credentials from the client (the device requesting access) with the information stored in its database. If a match is achieved, authentication is successful and the process moves to the next step. If there is no match, access is denied.
* **Authorization:** After the authentication is completed successfully, the authorization step comes into play. This stage is where the authenticated user asks “what they can do”. Based on predefined policies and the user's role or group, the AAA server defines which network resources (for example, a specific server, database, or application) they can access and what operations (read, write, delete, execute, etc.) they can perform on these resources. This process plays a critical role in implementing the principle of least privilege and ensures that users are granted only the minimum access rights necessary to perform their tasks.
* **Accounting:** The last step of the framework, accounting, tracks and records what the user “does” during their session. This process collects information such as the user's session start and end times, session duration, resources accessed, and amount of data transferred and creates an audit trail. This collected data is used for a variety of purposes, including security audits, compliance reporting, troubleshooting, network capacity planning, and billing for services if necessary.

The AAA model is typically implemented with a client/server architecture running on an AAA server. A client, such as a **Network Access Server (NAS)**, forwards the access request from the user to the AAA server and manages access based on the responses from the server. This centralized structure facilitates consistent enforcement and auditing of access policies, especially in large and distributed networks.

### AAA Protocols: Comparative Analysis of RADIUS and TACACS+

Two common protocols used to implement the AAA framework are RADIUS and TACACS+. Although both aim to centrally manage user access, they differ significantly in terms of their architecture, security features, and ideal use cases.

#### **Architecture, Transport Protocol and Encryption Differences**

* **RADIUS (Remote Authentication Dial-In User Service):** It is an open protocol standardized by the IETF. It is often used in network access scenarios such as Wi-Fi networks, VPNs, and dial-up connections. RADIUS is a connectionless protocol at the transport layer.
* Uses **UDP (User Datagram Protocol)**; It generally prefers ports 1812 for authentication and authorization and 1813 for accounting. One of the most important features is
* **it combines authentication and authorization processes in a single package**. For security, RADIUS only **encrypts the password inside the packet**; All other data, such as username, requested service and accounting information, are transmitted in plain text. This makes it more vulnerable to certain types of attacks.
* **TACACS+ (Terminal Access Controller Access-Control System Plus):** It is a proprietary protocol developed by Cisco, but is widely adopted. It is especially used to control administrative access to network devices such as routers, switches and firewalls. TACACS+ is a reliable and connection-oriented protocol at the transport layer.
* Uses **TCP (Transmission Control Protocol)** and port 49. This ensures that packet transmission is more reliable and that situations such as server crashes are detected immediately. Unlike RADIUS, TACACS+
* **Distinguishes AAA processes from each other**. Separate request and response packets are used for authentication, authorization, and accounting. Its biggest advantage in terms of security is that it encrypts the content of the entire package, including the password. This makes the communication process much safer.

#### **Use Scenarios and Philosophical Distinction**

Protocol choice is not just a technical choice but also reflects an organization's security philosophy and control need. RADIUS is basically “Can this user get into the network?” focuses on the question. The combination of authentication and authorization allows it to work like a “gatekeeper.” Therefore, it is ideal for providing network access to large audiences of users (employees, guests) and is widely used in scenarios where simple access control is sufficient (for example, 802.1X-based Wi-Fi authentication).

* TACACS+, on the other hand, asks a deeper question: “Which commands can this administrator who enters the network run on the device?” Separating AAA processes gives it an “operations auditor” capability. This way, once a network administrator is authenticated, he or she may only be authorized to run monitoring commands such as `show interface`. While this is granted, the ability to run configuration commands such as `configure terminal` may be blocked. This granular level of control ensures fine-grained enforcement of the principle of least privilege at the network device management layer. Therefore, TACACS+ is the preferred protocol in sectors requiring high security, such as finance, defense and telecommunications, and in the management of network infrastructure.

![](https://cdn-images-1.medium.com/max/800/1*p7VHlJuCXv1f6irJuqfB_g.png)

The main differences between the two protocols.

### Chapter 2: Architectural Models of Access Control

Access control models are sets of rules and policies that govern access of subjects (users, processes) to objects (files, databases, applications) in a system. These models are selected and implemented based on an organization's security requirements, need for flexibility, and managerial capacity.

### Classic Models: Discretionary (DAC) and Mandatory (MAC) Access Control

**Discretionary Access Control (DAC):** DAC is the most flexible and widely known access control model. In this model, the owner of a resource (object) has the authority to determine who can access that resource and what permissions (read, write, execute) they will have. Access decisions are based on the user's identity and are typically implemented through Access Control Lists (ACLs). For example, a typical DAC application is for a user to share a file he created with another user and give him only “read” permission.

* **Advantages:** High flexibility, ease of use and offering resource owners full control over their data.
* **Disadvantages:** Lack of a central control mechanism makes security management messy. Its biggest vulnerability is that a program inherits the permissions of the user running it. This allows if a user unknowingly runs malicious software (malware) to abuse any access rights the user has.

#### **Mandatory Access Control (MAC)**

MAC has the opposite approach to DAC and is considered the most restrictive model. In this model, access decisions are implemented centrally by the system itself, not by the resource owner. The system administrator assigns security labels or classifications (e.g., “Public,” “Confidential,” “Top Secret”) to both subjects (users) and objects (files). Access is granted only if the subject's security level is equal to or higher than the object's security level. Users or resource owners cannot change these rules.

* **Advantages:** Provides a high level of data confidentiality and integrity. Centralized control ensures that consistent and strict security policies are enforced.
* **Disadvantages:** Extremely rigid, inflexible and complex to manage. It requires all system assets to be tagged, which may not be practical in large environments. For these reasons, it is often used in environments requiring maximum security, such as military, government institutions and critical infrastructures.

### Modern Enterprise Models: Role-Based (RBAC) and Attribute-Based (ABAC) Access Control

The complexity and scale of enterprise environments have led to the emergence of more advanced models that offer the centralized control advantages of MAC while taking advantage of the flexibility of DAC.

#### **Role-Based Access Control (RBAC)**

RBAC is the most widely used access control model in today's corporate world. In this model, permissions are not assigned directly to individual users. Instead, permissions are assigned to specific job roles within the organization (e.g., “Financial Analyst,” “HR Manager,” “Systems Administrator”). Users are then included in these roles and inherit all the permissions that role has.

* **Advantages:** Greatly simplifies management. Instead of individually assigning permissions to hundreds of users, it is enough to manage just a few roles. When a new employee starts or an employee changes roles, they simply need to be assigned or removed from the relevant role. This structure makes it easier to implement the principle of least privilege and increases auditability.
* **Disadvantages:** When the organizational structure becomes too complex or there are many exceptional access requests, this can lead to a problem known as “role explosion.” Creation and management of hundreds or thousands of custom roles may eliminate RBAC's ease of administration advantage.

#### **Attribute-Based Access Control (ABAC)**

ABAC is the most dynamic and granular access control model. In this model, access decisions are made instantaneously based on a combination of a set of attributes, not just the user's role. These qualities can be divided into four main categories:

1. **Subject (User) Attributes:** Role, department, security clearance level, age, nationality.
2. **Object (Resource) Attributes:** File type, data sensitivity level, creation date, owner.
3. **Action Attributes:** Read, write, delete, copy, confirm.
4. **Environmental Attributes:** Access time, geographical location, type and security status of the device used, network connection. ABAC evaluates these attributes into policies expressed as “IF [conditions] ARE TRUE, THEN ALLOW/DENY [action].” For example, a complex rule could be created such as “A user can 'read' a patient record IF the role is 'Doctor' and the access time is 'during business hours' and the record being accessed is 'his/her patient'”.

* **Advantages:** Extremely flexible, dynamic and context-sensitive. It is ideal for complex, distributed and constantly changing environments where RBAC falls short. Provides very fine-grained access control.
* **Disadvantages:** Designing, implementing and managing policies is quite complex. Because access decisions must evaluate multiple attributes instantaneously, they may require more processing power.

The evolution of access control models shows how the focus of the security question is changing. While DAC focuses on “who” controls access, RBAC questions the question “what is the user's role?” They abstract in the form. ABAC, on the other hand, offers a paradigm shift and asks the question "Who is trying to perform which action, on which data from which source, at what time of day, from which geographical location, with the security status of which device?" makes it. This evolution reveals that static identity controls are inadequate to manage modern, context-dependent risks and security must now adapt to dynamic conditions.

### Principle of Least Privilege (PoLP)

The Principle of Least Privilege (PoLP) is a cybersecurity cornerstone and stipulates that a user, application, or process is granted the absolute minimum permissions, privileges, and resources necessary to perform its task. This principle is the technical application of the need-to-know principle.

**Fundamental Role in Zero Trust Architectures:** PoLP is an integral part of the Zero Trust security model, which is based on the philosophy of "never trust, always verify". Zero Trust requires that no entity inside or outside the network is trusted by default and that every access request is verified based on identity, device state, location, and other contextual factors. PoLP comes into play after this authentication process is successfully completed and ensures that even the authenticated entity is not given undue privileges. In the event of an account or system compromise, PoLP significantly limits the attacker's ability to move laterally within the network and the potential to access sensitive data, thus minimizing potential damage.

**Practical Implementation Steps and Integration with Access Control Models:** Effective implementation of PoLP is a systematic process that requires continuous effort. Basic steps include:

1. **Privilege Auditing:** Detecting overprivileged accounts by comprehensively auditing the permissions of all existing user accounts, service accounts and groups.
2. **Default Deny:** Adopting a policy that denies all access requests by default and grants only clearly defined and justified permissions.
3. **Defining Roles and Responsibilities:** Clearly defining the minimum access rights required for each job role.
4. **Separation of Privileges:** Separating administrator accounts from standard user accounts and using separate accounts for high-privilege tasks.
5. **Just-in-Time — JIT Access:** Instead of permanently assigning elevated privileges, temporarily elevating these privileges only for a specific task, for a limited time, and on demand.
6. **Regular Review:** As user roles change or become redundant over time, periodically reviewing and revoking access rights to prevent privilege creep.

Access control models are essential tools in implementing PoLP. **RBAC** structurally supports this principle and simplifies administration by assigning minimal permissions to roles.

**ABAC** takes PoLP even further by dynamically adjusting access decisions based on the immediate context and enforces policy at the most granular level, granting access only when certain conditions are met.

The following table compares access control models in terms of their key features:

![](https://cdn-images-1.medium.com/max/800/1*nVP5oHjzybYftBsE0y9dnQ.png)

Access Control Models

### Chapter 3: Advanced Authentication and Federation

### Multi-Factor Authentication (MFA)

Multi-Factor Authentication — MFA is a security process that requests more than one piece of evidence (factors) to verify a user's identity. Its main purpose is to provide an additional layer of security by preventing unauthorized access even if one factor (usually the password) is compromised. All 2FA (Two-Factor Authentication) systems are a subset of MFA, although MFA can involve more than two factors. These factors are generally classified into three main categories:

1. **Something You Know (Knowledge Factor):** Information that the user keeps in his mind, such as password, PIN code or the answer to the security question.
2. **Something You Have (Possession Factor):** An object that the user physically possesses, such as a smartphone, hardware security key (token), smart card.
3. **Something You Are (Inherence Factor):** User-specific biometric features such as fingerprint, facial recognition, retina scan or voice pattern.

#### **OTP (One Time Password) via SMS/Voice Call**

It is based on entering a temporary code sent to the user's phone via SMS or voice call.

* **Security:** It is one of the least secure MFA methods. It is vulnerable to code interception through SIM card copying (SIM swapping) and telecommunications protocol vulnerabilities such as SS7. Additionally, since SMS messages are not encrypted, they can be intercepted during transmission.
* **Availability and Cost:** It is extremely easy to set up and use, because almost everyone has a mobile phone. However, SMS sending costs can increase over time, especially for large organizations.

#### **Authenticator App (TOTP — Time-based One-Time Password)**

Apps like Google Authenticator or Microsoft Authenticator generate constantly changing codes that are valid for a specific period of time (usually 30–60 seconds).

* **Security:** It is more secure than SMS because it is not affected by SIM card copying attacks. However, it is still vulnerable to advanced phishing and **Adversary-in-the-Middle (AiTM)** attacks, which redirect users to a fake website and steal both their password and current TOTP code.
* **Availability and Cost:** Generally free and can work offline. However, it requires users to install an app and enter the code manually.

#### **Push Notifications**

A notification saying “Approve/Reject Login” is sent to the user's smartphone.

* **Security:** While more user-friendly than TOTP, it is susceptible to a type of attack known as “MFA fatigue” or “push bombing”. In this attack, the attacker constantly bombards the user with notifications by making login attempts, and eventually aims for the user to give consent accidentally or out of boredom.
* **Usability and Cost:** It has extremely high usability as it offers confirmation with a single touch. It is generally low cost.

#### **Hardware Security Keys (FIDO2/U2F)**

They are physical devices based on USB or NFC, such as YubiKey.

* **Security:** It is considered one of the most secure MFA methods. Because it works using public key cryptography, it is almost completely resistant to phishing and AiTM attacks. The credentials are cryptographically associated with the website's domain, so it won't work on a fake site.
* **Availability and Cost:** Requires users to carry a physical device. Access problems may occur if the device is lost or stolen. Initial cost ($20–100 per device) and distribution logistics can be a disadvantage, especially for large organizations.

#### **Biometric Verification**

These are methods such as fingerprint, face or iris scanning.

* **Security:** Since biometric data is unique to the person, it is difficult to copy and provides high security. However, if biometric databases are leaked, this data is permanently exposed (it cannot be changed like a password). Additionally, there are spoofing systems that can be spoofed with high-quality fake fingerprints or photographs.
* **Availability and Cost:** Extremely fast and user-friendly. The necessary hardware (fingerprint reader, camera) is now standard in many modern devices. However, private browsers may cost more.

#### **Adaptive MFA**

Rather than requiring the same MFA method on every login attempt, modern IAM systems take a risk-based approach. Adaptive MFA analyzes contextual information such as the user's geographic location, login time, security status of the device they are using, and behavioral biometrics. If the login attempt is considered low risk (for example, made from a known office network, during business hours, from a registered device), the MFA step can be skipped. However, if the attempt is considered suspicious or high risk (for example, from an unknown country, in the middle of the night, from a device that has not been used before), the system may request an additional, stronger verification step (for example, a hardware key). This approach optimizes the user experience without compromising security.

The table below compares different MFA methods based on practical decision-making criteria:

![](https://cdn-images-1.medium.com/max/800/1*8TTOg_EU2ai3ZII65l_vMQ.png)

MFA methods

### Single Sign-On (SSO) and Federated Identity Architectures

Single Sign-On — SSO is an authentication scheme that allows users to access multiple related but independent applications and services with a single set of credentials. This improves user experience and reduces password fatigue, while increasing security by centralizing access management. There are three primary protocols that enable SSO: SAML, OAuth 2.0 and OpenID Connect.

#### **SAML (Security Assertion Markup Language)**

It is a mature XML-based authentication and authorization standard that is widely used especially in enterprise environments. SAML flow occurs between three main actors: user agent/browser, **Identity Provider (IdP)**, and **Service Provider (SP)**.

* **Architecture and Flow:**

1. The user tries to access a SP (for example, Salesforce).
2. The SP sees that the user is not authenticated and redirects the user to the IdP (for example, the company's Active Directory) with a SAML Request.
3. The IdP prompts the user to enter credentials (if they do not already have a session).
4. When authentication is successful, the IdP creates a **SAML Assertion**, a digitally signed XML document containing the user's identity, attributes (name, email, department, etc.) and authorization information.
5. The IdP redirects the user back to the SP with a SAML Response containing this SAML Assertion.
6. The SP checks the validity and integrity of the SAML Assertion by verifying the digital signature of the IdP. If successful, it grants access to the user.

* **Use Scenarios:** Enterprise SSO is especially ideal for providing identity federation by establishing a trust relationship between different organizations.

#### **OAuth 2.0 (Open Authorization)**

OAuth 2.0 is not an authentication protocol, but an authorization framework. Its main purpose is to allow a user to grant limited access to an application (Client) to its resources in another application (Resource Server) without sharing his password.

* **Architecture and Flow (Authorization Code Flow):** “Authorization Code Flow”, the most common and secure flow, includes the following steps:

1. The Application (Client) directs the user to the Authorization Server with an authorization request. This request includes the ID of the application (`client_id`) and the permissions it requests (`scope`, e.g. "read calendar").
2. The user authenticates to the Authorization Server and approves the permissions requested by the application.
3. The Authorization Server redirects the user back to the application with a single-use **Authorization Code**.
4. The application executes this Authorization Code in the background (server-to-server) and sends it to the Authorization Server along with the credentials (`client_id` and `client_secret`).
5. The Authorization Server verifies the code and client credentials and returns an **Access Token** to the application.
6. Using this Access Token, the application accesses the user's protected resources by making requests to the APIs on the Resource Server.

* **Usage Scenarios:** It is used in scenarios such as granting data access to third-party applications such as "Connect with Facebook", or allowing mobile applications to securely access a backend API.

#### **OpenID Connect (OIDC)**

OIDC is a simple identity layer built on top of OAuth 2.0. It solves the problem that OAuth 2.0 only provides authorization and does not provide a standard way about user identity. OIDC provides both authentication and authorization using OAuth 2.0 flows.

* **Architecture and Flow:** OIDC flow is very similar to OAuth 2.0's Authorization Code Flow. The main difference is that the `openid` value is added to the `scope` parameter in the authorization request. At the end of the flow, the Authorization Server (in this case also an OpenID Provider - OP) returns an **ID Token** in addition to the Access Token.
* **ID Token:** This token, in JWT (JSON Web Token) format, contains standardized “claims” about the user's identity (a unique ID, name, e-mail, etc.) and is digitally signed. The application (Client) can reliably confirm the identity of the user by verifying the signature of this ID Token.
* **Use Scenarios:** It has become the de facto standard for providing SSO in modern web and mobile applications, such as “Sign in with Google” or “Login with Microsoft”.

The relationship between these protocols forms the basis of the modern API economy and microservices architectures. While SAML is designed to provide SSO between monolithic enterprise applications, OAuth 2.0 governs what an application can “do” (authority) on behalf of another application. OIDC combines these two needs, making it possible to both authenticate the user (`ID Token`) and obtain an authorization token (`Access Token`) for accessing APIs in a single flow. This separation and combination forms the basis of the security of modern architectures, where identity comes from a central place but each service makes its own authorization decisions.

### The Passwordless Future: FIDO2 and WebAuthn

Passwords are one of the weakest links in modern cybersecurity. The fact that they are easily predictable, reused, and easily stolen through phishing attacks makes them a great risk. The FIDO2 project is a new generation authentication standard that aims to radically solve this problem and completely eliminate passwords.

#### **Secure Authentication with Public Key Cryptography**

FIDO2 is a set of specifications developed by the FIDO Alliance. The core component of this project is the **WebAuthn (Web Authentication)** API standardized by the World Wide Web Consortium (W3C). This technology abandons the traditional “shared secrets” model (like passwords) and uses public-key cryptography instead. In this model, valuable data that can be stolen, such as password hashes, is not kept on the servers. The most critical element of security, the **private key**, is stored in a secure hardware-supported area on the user's personal device (smartphone, laptop's TPM chip, a security key such as YubiKey) and never leaves this device. This shifts the center of security from the server to the user-owned and controlled endpoint.

#### **Registration and Authentication Processes**

The working principle of FIDO2/WebAuthn consists of two main stages:

**Registration Process:**

* When a user wants to sign up for a new service, the service's website (Relying Party) calls the WebAuthn API via the browser (`navigator.credentials.create()`).
* The user's device (Authenticator) generates a new **public/private key pair** upon this request.
* **The private key** is stored in the secure element of the device (e.g. Secure Enclave, TPM) and is never leaked outside.
* **The public key** is sent to the service's server along with the user's identity and stored there. This allows the server to recognize this user in the future.

**Authentication Process:**

* When the user wants to log in to the service, the server sends a random, single-use **“challenge”** message to the browser.
* The browser transmits this challenge to the user's device by calling the WebAuthn API (`navigator.credentials.get()`).
* The device prompts the user for local verification (fingerprint, facial recognition, PIN). This confirms that the device is actually used by its owner.
* When verification is successful, the device digitally signs the challenge from the server with its **private key** stored on the device.
* This signed challenge is sent back to the server.
* The server checks the validity of this signature with the **public key** of the user it has previously recorded. If the signature is valid, the user is authenticated and logged in.

This architecture is inherently resistant to phishing attacks. Because the credentials (private key) are never sent to the server and each credential is cryptographically associated with the domain name of the website for which it was created. This means that even if an attacker redirects the user to a fake site, the browser will not use the correct credentials for that site.

### Result

This article has established that Identity and Access Management (IAM) is a dynamic and multi-layered discipline that is at the heart of modern enterprise cybersecurity strategies. The main findings analyzed are:

* **AAA Model and Protocols:** Authentication, Authorization and Accounting processes, which constitute the basic logic of access control, are implemented with protocols such as RADIUS and TACACS+. The choice between these protocols reflects not only an organization's technical requirements but also its security maturity and need for granular control.
* **Access Control Models:** Access control has evolved from classical models such as DAC and MAC to modern, dynamic models such as RBAC and ABAC that better respond to corporate needs. This evolution has changed the security question from “who?” from the question “under what conditions?” shows that it shifts to the question. The Principle of Least Privilege stands out as a fundamental principle that increases the effectiveness of all these models.
* **Advanced Authentication:** The weaknesses of password-based security have necessitated the adoption of MFA. The future is moving towards passwordless technologies like FIDO2/WebAuthn that are phishing-resistant, user-friendly, and move security from the server to the endpoint.

Future trends are that IAM will move away from static, password-based and environment-focused approaches; It clearly shows that it is shifting towards a structure based on the Zero Trust philosophy, which is dynamic, context-sensitive, passwordless and accepts identity as the new environment.