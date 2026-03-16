---
title: "Network Management and Security IX: Cloud Security and Hybrid Network Architectures"
date: 2025-08-12
description: "Digital transformation has irreversibly changed the enterprise IT landscape. Moving from static, on-premises data centers to dynamic, scalable and innovative cloud environments is no longer a trend, b..."
featuredImage: "https://cdn-images-1.medium.com/max/800/1*mmBfnODexSndicvHEIF90w.png"
series: ["Ağ Güvenliği ve Yönetimi"]
---

![](https://cdn-images-1.medium.com/max/800/1*mmBfnODexSndicvHEIF90w.png)

Digital transformation has irreversibly changed the enterprise IT landscape. Moving from static, on-premises data centers to dynamic, scalable and innovative cloud environments is no longer a trend, but a fundamental business imperative. Driven by the promise of agility and cost efficiency, this evolution has resulted in complex ecosystems spanning multiple service models (IaaS, PaaS, SaaS) and deployment strategies such as hybrid and multi-cloud.

However, this new field full of unlimited opportunities also brings with it a new generation of security challenges. The traditional “castle and moat” security perimeter has dissolved, replaced by a dispersed and often fragmented attack surface. Consistently managing security policies across different cloud providers, ensuring secure connectivity between on-premises data centers and the cloud, and preventing common but critical misconfigurations have become top concerns for modern businesses.

---

### Part I: The Cornerstones of Cloud Computing and the Security Paradigm

This section forms the basis of the report by discussing the basic concepts of cloud computing, service models, and how these models shape security responsibilities. Understanding modern security strategies depends on a deep understanding of these basic building blocks and the relationships between them.

### 1.1 Anatomy of Cloud Service and Deployment Models

Cloud computing refers to the on-demand delivery of IT resources over the internet and is mainly built on three service models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS) and Software as a Service (SaaS). These models determine how much control and management responsibility the customer assumes and are generally not mutually exclusive options. Rather, many organizations are adopting a hybrid strategy where they use these three models together to meet different workload and application needs.

**Infrastructure as a Service (IaaS)** is the most basic service model of cloud computing. In this model, the cloud provider offers basic infrastructure resources such as servers, storage units, network components and virtualization to the customer on demand. The customer has full control to install and manage their own operating systems, middleware and applications over this infrastructure. This is the model that offers the highest level of flexibility and control. Common use cases for IaaS include:

* **Backup and Disaster Recovery:** Organizations ensure business continuity by backing up or replicating their systems and data in the cloud. If a server fails, its copy in the cloud can take over.
* **Big Data Analytics:** IaaS cost-effectively provides the massive processing power required for analysis of large and complex data sets.
* **Website and Application Hosting:** Provides a cost-effective solution for hosting secure, scalable and high-performance websites and applications.
* **High-Performance Computing (HPC):** Provides a more efficient alternative to traditional on-premises infrastructures for computationally intensive workloads such as scientific simulations or complex financial modelling.

**Platform as a Service (PaaS)** adds an abstraction layer on top of IaaS, providing developers with the platform and tools needed to build, deploy and manage applications. In this model, the provider manages the underlying infrastructure, operating systems, software updates, and storage. Developers, on the other hand, focus only on their own code and applications. The main advantages and uses of PaaS are:

*   **Rapid Development and Deployment:** Thanks to ready-made development environments and integrated tools, application development and deployment processes are significantly accelerated. This is especially ideal for Agile development and DevOps methodologies.
*   **Automatic Scaling:** PaaS platforms optimize performance and cost efficiency by automatically scaling resources based on increases or decreases in application demand.
*   **API Development and Management:** Developers can easily develop and manage APIs thanks to built-in frameworks.
*   **Cloud-Native Development:** PaaS supports cloud-native technologies such as microservices, containers, and serverless functions. It facilitates the creation of modern application architectures.

**Software as a Service (SaaS)** is the most widely used model and closest to the end user. In this model, applications managed and maintained by a third-party provider are delivered to end users over the internet, typically through a web browser. Customer does not need to download, install or update any software; All these responsibilities belong to the provider. Popular applications such as Google Workspace, Microsoft 365, and Salesforce are examples of this model. SaaS allows businesses to save on expenses such as licensing costs, hardware purchases and maintenance. In addition to these service models, there are also **deployment models** for how cloud infrastructures are deployed. These are: **Public Cloud**, where resources belong to a third-party provider and are publicly available over the internet; **Private Cloud**, where the infrastructure is private to and managed by a single organization; and the **Hybrid Cloud**, which combines the best aspects of these two models. Hybrid cloud offers organizations the flexibility to leverage the scalability and cost benefits of the public cloud while keeping their sensitive data in the private cloud or on-premises.

### 1.2 Shared Responsibility Model: Determining Security Boundaries

One of the most critical concepts that form the basis of cloud computing is the Shared Responsibility Model. This model is a framework that defines a clear separation of security roles and responsibilities between the cloud provider and the customer. This distinction directly shapes an organization's security strategy, operational processes, and even the set of competencies it requires. The distribution of responsibilities changes dynamically depending on the chosen cloud service model (IaaS, PaaS, SaaS).

**Provider Responsibility: “Security of the Cloud”** In all service models, the cloud provider (such as AWS, Microsoft Azure, GCP) is responsible for the “Security of the Cloud”. This includes protecting the global infrastructure on which services operate. Areas of responsibility include:

*   **Physical Security:** Physical access controls, environmental protections and hardware security of data centers.
*   **Infrastructure Hardware:** Security and maintenance of physical hardware such as servers, storage units and network devices that run services.
*   **Infrastructure Software:** Security of the underlying software layer that runs cloud services, such as hypervisors and underlying networking software.
*   **Network Infrastructure:** Protection of the provider's global backbone network and connections between data centers.

**Customer Responsibility: “Security in the Cloud”** Customer responsibility varies significantly depending on the service model selected. Organizations that are responsible for the entire security stack in an on-premises data center delegate some of those responsibilities to the provider as they move to the cloud.

**Customer Responsibility in IaaS:** In this model, the customer bears the most responsibility. While the provider secures the underlying infrastructure, the customer is responsible for:

*   **Data:** Classification, protection and encryption of data (both at rest and in transit).
*   **Applications:** Security of all applications installed on the infrastructure.
*   **Operating System, Network and Firewall Configuration:** Management of virtual machines' operating systems (including updates and security patches) and configuration of virtual firewalls (e.g. AWS Security Groups) that control network traffic.
*   **Identity and Access Management (IAM):** Managing who can access resources and with what permissions.

**Customer Responsibility in PaaS:** In this model, the provider takes over the management of the operating system and middleware. The client's responsibilities focus on:

*   **Data and Applications:** Security of the applications developed and distributed and protection of the data processed by these applications.
*   **User Access:** Identity and access controls that govern access to applications and data.

**Customer Responsibility in SaaS:** The customer's responsibility is at the lowest level. The provider manages almost all of the application and infrastructure. The customer is basically responsible for:

*   **Data:** Classification and protection of data uploaded to the application.
*   **Users and Access Management:** Determining which users can access the application and managing their authority within the organization.
*   **Endpoint Security:** Security of the devices from which users access the application.

This model has a strategic implication: The service model an organization chooses directly determines the areas its security team should focus on and the competencies it should have. For example, an IaaS-heavy architecture requires traditional data center security capabilities such as in-depth network security, operating system hardening, and patch management. On the other hand, a SaaS-heavy strategy requires security analysts and architects who specialize in managing modern tools such as identity federation, API security, Data Leak Prevention (DLP), and CASB. Therefore, the choice of cloud service model is not only a technology decision, but also a fundamental decision that affects the organizational structure and human resource strategy.

### 1.3 The Engine of the Cloud: Virtualization and Infrastructure Technologies

The flexibility, scalability and cost efficiency of cloud computing are made possible by the underlying virtualization technology. Virtualization is a process that mimics the functions of a physical hardware resource (server, storage device, or network), allowing that resource to be used as multiple logical and isolated units. This technology forms the basis for cloud providers to efficiently allocate resources in massive data centers and deliver them to customers on a self-service, pay-as-you-go model.

**Hypervisors** At the heart of virtualization is a special software layer called **hypervisor**. The hypervisor acts as an intermediary between the physical hardware and the virtual machines (VMs) running on it. Its basic function is to share physical resources (CPU, memory, storage) among virtual machines and ensure that these virtual machines operate in isolation from each other. There are two main types of hypervisors:

1.  **Type 1 (Bare-Metal) Hypervisor:** It is built directly on the hardware of the physical server and has its own operating system capabilities. It offers high efficiency because it interacts directly with physical resources. VMware ESXi, Microsoft Hyper-V and KVM (Kernel-based Virtual Machine) are examples of this type. Cloud providers often use such hypervisors.
2.  **Type 2 (Hosted) Hypervisor:** Runs like an application on top of an existing host operating system (for example, Windows or macOS). VMware Workstation and Oracle VirtualBox are examples of this type and are often used for development or testing environments.

**Virtual Machines (VM)** A virtual machine is a software-based imitation of a full-fledged computer with its own virtual hardware (CPU, RAM, disk, network card), its own operating system and applications. Thanks to the hypervisor, multiple VMs can run isolated and completely unaware of each other on a single powerful physical server. This significantly increases hardware utilization because physical servers often operate well below their full capacity. In the cloud, services like AWS EC2, Azure Virtual Machines, or GCP Compute Engine offer customers these virtual machines that they can provision in seconds.

**Containers** Container technology, a more modern form of virtualization, offers a lighter and more agile alternative to VMs. While VMs virtualize the entire operating system, containers simply bundle an application and its dependencies (libraries, settings files, etc.) and share the host machine's operating system kernel. This structure ensures that containers can be launched in seconds, consume fewer resources, and work consistently across different environments (development, test, production). Docker is the most popular example of this technology and, along with orchestration tools like Kubernetes, has become the cornerstone of cloud-native applications.

**Cloud Infrastructure Components** Virtualization technology forms the key components of cloud infrastructure:

*   **Compute:** Processing power offered through virtual machines and containers.
*   **Storage:** Storage models for different needs where data is stored on remote servers. These; It is divided into **Block Storage** for high-performance disks, **File Storage** for file systems, and scalable **Object Storage** (e.g. Amazon S3) for large amounts of unstructured data.
*   **Networking:** Virtual private clouds (VPC), subnets, routers and firewalls. Virtualized network components such as networks enable resources to communicate securely with each other and the Internet.

These components are self-serviced to customers via a web-based interface or API, and resources can be dynamically scaled based on demand. This model frees organizations from large upfront capital investments and enables them to optimize operational costs.

---

### Part II: Securing Virtual Networks: A Cross-Platform View

Deploying resources in the cloud is not just about creating virtual machines or services; It also requires establishing a secure, isolated and manageable network infrastructure to host these resources. This chapter will comparatively examine the basic building blocks of creating virtual data centers on the cloud and how these structures are implemented on the three leading cloud providers: Amazon Web Services (AWS), Microsoft Azure and Google Cloud Platform (GCP) and the architectural differences between them.

### 2.1 Virtual Data Center Architecture: VPC, VNet, and Subnets

In cloud computing, it is a critical security requirement for organizations to create private network areas where they logically isolate their resources from other customers of the public cloud. These virtual networks mimic the network infrastructure of a traditional data center and provide a secure perimeter for resources.

**AWS Virtual Private Cloud (VPC)** allows users to define their own isolated virtual network within the AWS cloud. A VPC is created within a single AWS Region but can span multiple Availability Zones (AZ) within that region to ensure high availability and fault tolerance. Users specify their own private IP address range for the VPC (in CIDR block notation, for example `10.0.0.0/16`) and divide this range into smaller pieces to create subnets. The traffic flow within the VPC is completely under user control with route tables and gateways.

**Azure Virtual Network (VNet)** is conceptually very similar to AWS VPC. It is the basic building block that allows resources to communicate securely with each other, the internet, and intra-company networks in Azure. VNets, like AWS VPC, have a regional scope and provide logical isolation within a subscription. By dividing VNets into subnets, organizations can group resources by address space, thus facilitating organization and security management.

**GCP Virtual Private Cloud (VPC)** has a significant architectural difference from AWS and Azure. GCP VPCs are **global**. This means a single GCP VPC can span all Google Cloud regions worldwide without requiring any additional configuration or cross-region peering. An organization can create subnets within the same global VPC, for example in both the US and Europe, and resources in those subnets can communicate natively and with low latency over Google's high-speed private backbone network. This approach significantly simplifies multi-site application deployments and management.

On all three platforms, **Subnets** are logical divisions of the IP address range of a VPC or VNet, the segments into which resources (virtual machines, databases, etc.) are placed directly. Subnets are generally divided into two main categories based on security and routing requirements:

*   **Public Subnet:** This type of subnet has a direct route to an Internet Gateway. Resources in this subnet have direct access to and can be accessed directly from the public internet (with appropriate security rules). It is often used for resources that are exposed to the outside world, such as web servers.
*   **Private Subnet:** These subnets do not have a direct route to the internet. In order for resources on these subnets to initiate traffic to the Internet (for software updates, for example), they must use a NAT (Network Address Translation) Gateway. Direct traffic from the Internet to these resources cannot be initiated. It is a basic security best practice to host sensitive and critical resources, such as databases and application servers, on private subnets to secure them.

These architectural differences fundamentally impact an organization's security management strategy. The regional model of AWS and Azure is strong by default; it adopts the philosophy of isolation and limited impact area (blast radius). Each region is a security bastion in itself, and interregional communication must be clearly structured. This offers a natural advantage for organizations with data residency and strict regional compliance requirements. In contrast, GCP's global model is based on the philosophy of **global ease of access and centralized management by default**. This improves operational efficiency for technology-focused companies that are growing rapidly on a global scale and are managed with a centralized DevOps team. Security management focuses on identity (service accounts) and metadata (network tags) rather than network boundaries. Therefore, choosing a platform is not just a technical choice, but also a strategic decision that aligns with the organization's operational model and security philosophy.

### 2.2 Traffic Filtering Mechanisms: Security Groups, NSGs and Firewall Rules

The logical isolation created by virtual networks and subnets is incomplete without virtual firewalls that control and filter traffic. These mechanisms constitute one of the most basic layers of security by controlling inbound/ingress and outbound network traffic according to certain rules. AWS, Azure, and GCP provide mechanisms that perform this function, but with different scopes and capabilities.

Traffic filtering in **AWS** is achieved through a two-layer approach:

*   **Security Groups (SG):** A virtual firewall that operates at the virtual network interface (NIC) level of a resource, such as an EC2 instance. The most important feature is **stateful**. This means that response traffic to an outbound request initiated from an instance (for example, an HTTP GET request to a website) is automatically allowed, even if there is no inbound rule specific to that response. Security groups only support **“allow”** rules; a **“deny”** rule cannot be explicitly defined. If access to a resource is not allowed, it is because there is no rule allowing it. By default, a newly created security group blocks all incoming traffic and allows all outgoing traffic.
*   **Network Access Control Lists (NACL):** It is an additional security layer that operates at the subnet level. Unlike security groups, it has a **stateless** structure. This means that rules must be clearly defined for both incoming and outgoing traffic, including response traffic. For example, if you allow traffic from port 80 to a web server, you must also define an outbound rule for higher-numbered ephemeral ports so that the server's response can return. NACLs support both **“allow”** and **“deny”** rules, and the rules are evaluated in order of priority, starting with the lowest number.

**Azure Network Security Groups (NSG)** offers a hybrid approach that combines features of SGs and NACLs in AWS. NSGs can be applied to both a subnet and the network interface (NIC) of a single virtual machine.

*   Like AWS Security Groups, they are **stateful**, meaning they do not require additional rules for response traffic.
*   Like AWS NACLs, they support rules that include both **“allow”** and **“deny”** actions.
*   Rules receive a priority number between 100 and 4096, and the rule with the lowest number (highest priority) is processed first. When traffic matches a rule, evaluation stops.

**GCP VPC Firewall Rules** are designed in accordance with GCP's global VPC architecture. These rules are defined at the VPC level, not regionally, and are applied by default to all virtual machine instances in all regions within that VPC.

*   Like AWS SGs, it is **stateful**.
*   They support **“allow”** and **“deny”** rules for both incoming (ingress) and outgoing (egress) traffic.
*   Rules are targeted using **network tags** or **service accounts** rather than being directly assigned to specific instances. This provides dynamic and scalable policy management by grouping resources according to their roles or functions. For example, a single rule can be created that allows HTTP/HTTPS traffic to all instances with the “web-server” tag.

The table below summarizes the basic traffic filtering mechanisms of these three platforms.

![](https://cdn-images-1.medium.com/max/800/1*Rsbt4vyN_qIdQmyZHFOLdQ.png)

**AWS SG, Azure NSG and GCP Firewall Rules Comparison**

These differences present important design decisions that security architects must consider when choosing platforms and creating multi-cloud strategies. For example, for an architect looking for a stateful firewall that supports both allow and deny rules, at both the instance and subnet level, Azure NSG offers the most flexible solution; For an organization that prioritizes globally consistent and centrally managed policies, GCP's tag-based firewall rules may be more efficient.

### 2.3 Identity Centric Security: Cloud IAM Policies and Best Practices

Modern cloud security is not limited to controls at the network layer. Increasingly, the security perimeter is shifting from network to identity. Identity and Access Management (IAM) is a critical security discipline that controls access to resources through policies that define “who can do what, on which resource.” This approach is especially evident in GCP's hierarchical resource structure.

**GCP IAM Hierarchy and Policy Inheritance** Google Cloud Platform provides a structured hierarchy for managing resources. This hierarchy starts with the **Organization** node at the top, followed by **Folders**, **Projects**, and finally individual **Resources** (for example, a Compute Engine virtual machine or a Cloud Storage bucket). One of the most powerful features of IAM policies is that they can be applied at any level of this hierarchy, and policies can be implemented from the parent node to the child nodes.

It is transmitted **through inheritance**. For example, when a user group is assigned the “Viewer” role at a folder level, that group automatically has viewing authority over all projects and resources under that folder. This structure provides an extremely powerful mechanism for centralized policy management, consistency, and scalability.

**GCP Role Types** GCP IAM offers roles at different levels of granularity to effectively enforce the principle of least privilege:

*   **Basic Roles:** These roles (Owner, Editor, Viewer) date back to the early days of GCP and give very broad powers over all resources within a project. For example, the “Editor” role has the authority to create, modify, and delete most resources. Due to their broad scope, they pose a security risk in production environments and their use is not recommended.
*   **Predefined Roles:** These are narrower and granular roles created by Google for specific services or tasks. For example, the `roles/compute.instanceAdmin.v1` role only grants permission to manage Compute Engine instances, while the `roles/storage.objectViewer` role only grants permission to view Cloud Storage objects. Best practice is to give users and services only the permissions they need, using these predefined roles whenever possible.
*   **Custom Roles:** In cases where predefined roles do not meet the specific needs of an organization, administrators can create their own custom roles by combining specific permissions. This provides the highest level of granularity but must be managed carefully as it can complicate management.

**IAM Policy Structure and Best Practices** A GCP IAM policy basically consists of a collection of “role bindings” in which one or more **principals** are bound together by a single **role**. Members; These can be individual Google accounts, service accounts (for apps and virtual machines), Google Groups, or Google Workspace domains.

The basic principle for an effective IAM strategy is the principle of Least Privilege. This principle requires that each user or service be granted the minimum permissions strictly necessary to perform its task. This limits the potential damage (blast radius) if an account is compromised. To apply this principle, these steps should be followed:

1.  Avoid basic roles (Owner, Editor, Viewer).
2.  Use predefined roles that are as specific as possible.
3.  When necessary, create custom roles that contain only the permissions needed.
4.  Use group-based access management. Instead of assigning roles directly to individual users, divide users into groups by function (for example, “database-administrators,” “network-engineers”) and assign roles to those groups. This simplifies management and increases consistency.
5.  Use GCP's advanced features such as Conditional IAM policies to further restrict access based on contextual factors such as time, location, or resource tags.

This identity-centric approach creates a strong layer of defense in addition to network-based controls and better suits the dynamic nature of modern, distributed cloud environments.

---

### Part III: Advanced Cloud Security Tools and Strategies

Although basic network security and identity management controls form the foundation of cloud infrastructure, the dynamic, complex and ever-changing nature of modern cloud environments necessitates more advanced and automated security solutions. Manual checks and static configurations are insufficient in an environment with thousands of resources and continuous deployment. This section will examine two critical categories of tools designed to address these challenges: Cloud Security Posture Management (CSPM) and Cloud Access Security Broker (CASB).

### 3.1 Continuous Compliance and Posture Management (CSPM)

The vast majority of cloud security breaches are caused by customer misconfigurations rather than a vulnerability in the cloud provider's infrastructure. Simple mistakes like a publicly exposed storage, an unencrypted database, an over-privileged user account, or poor network rules can leave doors open for cyber attackers. Cloud Security Posture Management (CSPM) is defined by Gartner as a category of offerings that continuously manage security posture through prevention, detection, and response.

**How Does CSPM Work?** The working principle of CSPM tools can be divided into several basic steps:

1. **Discovery and Visibility:** CSPM solutions generally work by connecting to cloud providers' APIs, with an agent-free approach. Through these APIs, it continuously scans an organization's entire cloud environment (including AWS, Azure, GCP, and others) and takes a comprehensive inventory of all assets (virtual machines, storage, databases, IAM roles, network configurations, etc.). This process provides complete visibility by also uncovering resources created by “shadow IT” or forgotten.
2. **Risk Assessment and Detection:** Once the inventory is created, the CSPM tool compares the configurations of these assets against a predefined set of security rules and best practices. These rules are typically based on industry standards and regulations such as Center for Internet Security (CIS) Benchmarks, NIST, MITER ATT&CK, PCI DSS, HIPAA, and GDPR. When a configuration deviates from these standards (for example, an Azure Kubernetes Service endpoint is public or a GCP API key has not been rotated for more than 90 days), CSPM marks it as a “misconfiguration” and generates an alert.
3. **Contextual Prioritization:** Modern CSPM solutions perform intelligent prioritization by contextualizing the risk, rather than treating every misconfiguration found equally. To determine the severity of a misconfiguration, it answers questions such as: Is this resource available to the Internet? Does it contain sensitive data (for example, personal identification information or financial data)? Is this resource part of a potential attack path? This contextualization allows security teams to focus on the most critical and urgent risks, rather than getting lost in hundreds of alerts.
4. **Automatic Remediation (Remediation):** Advanced CSPM tools offer not only detection and alerting, but also automatic remediation capabilities. Based on predefined policies, they can automatically correct a detected misconfiguration (for example, making a public S3 bucket private). This significantly shortens response time and reduces the risk of human error.

The Shared Responsibility Model holds the customer responsible for “security in the cloud.” CSPM has become an indispensable technology for managing correct configuration and continuous compliance, which is one of the most critical and error-prone parts of this responsibility, in a scalable and automated manner. The rise of these tools is shifting the cloud security paradigm from a reactive approach that intervenes after a breach to a proactive approach that prevents misconfiguration before it becomes a breach.

### 3.2 Cloud Access Security Broker (CASB)

As organizations' use of the cloud increases, one of the biggest challenges security teams face is losing control over where data and applications are and how they are accessed by whom. In particular, the phenomenon of **“Shadow IT”**, which occurs when employees use their own preferred SaaS applications (for example, file sharing sites, project management tools) for work without the approval or knowledge of the IT department, creates serious data leakage and compliance risks. Cloud Access Security Broker (CASB) is a security solution developed to address these challenges. According to Gartner, CASBs are “on-premises or cloud-based security policy enforcement points placed between cloud service consumers and cloud service providers, integrating and enforcing enterprise security policies when accessing cloud-based resources.”

CASB solutions typically center their functionality around four key pillars:

1. **Visibility:** The first and most basic function of a CASB is to discover all cloud services (both sanctioned and “shadow”) used within an organization. By analyzing network traffic or integrating with existing security devices (firewalls, proxies), it reveals which users are accessing which applications, from which devices and locations. This gives organizations a complete picture of their cloud usage and makes unknown risks visible.
2. **Compliance:** Organizations are responsible for complying with legal regulations such as GDPR, HIPAA, PCI DSS even when they move their data to the cloud. CASBs check whether data and configurations in the cloud comply with these regulations. They can identify where sensitive data is stored, block data transfer to risky areas, and generate necessary reports for compliance audits.
3. **Data Security:** CASBs protect sensitive data by acting as Data Loss Prevention (DLP) engines. Through policies, they can prevent sensitive content (e.g., credit card numbers, health information) from being uploaded to unapproved cloud services or shared from the cloud to unauthorized destinations, such as personal email addresses. They may also implement additional layers of protection for data stored in the cloud, such as encryption or tokenization.
4. **Threat Protection:** CASBs provide protection against cloud-based threats. This includes blocking malware spread through cloud services and detecting abnormal user behavior. Through its User and Entity Behavior Analytics (UEBA) capabilities, it can detect actions that deviate from a user's normal behavioral profile (e.g. impossible travel scenarios, mass downloading of much more data than usual, multiple failed login attempts) and flag these situations as a potential account takeover or insider threat.

CASBs can operate with different deployment models, either API-based (out-of-band) or proxy-based (in-line — forward/reverse proxy). While API-based deployment provides visibility and control over stored data and configurations by connecting directly to the cloud service, proxy-based deployment provides instant blocking and control by inspecting traffic between the user and the cloud service in real time.

Just like CSPM, CASB is an automated solution that fills the gaps of the Shared Responsibility Model on the customer side. While CSPM focuses more on IaaS/PaaS infrastructure configurations, CASB focuses more on the security of SaaS applications and the data flowing through these applications. Together, these two technologies complement each other to provide a comprehensive security and compliance posture in modern, multi-cloud environments.

---

### Part IV: Security in Hybrid and Multi-Cloud Architectures

Modern enterprise IT strategies are no longer tied to a single deployment model or single vendor. Organizations are looking for hybrid clouds that combine on-premises data centers with public clouds to increase flexibility, optimize costs, and use the best platform for specific workloads. They are increasingly adopting **multi-cloud** architectures that use multiple public cloud providers simultaneously. While these distributed architectures offer great advantages, they also present unique and complex security challenges that traditional security approaches fall short of. This chapter will cover the key technologies and strategies used to ensure security in these complex environments.

### 4.1 Secure Bridges Between Data Center and Cloud: VPN and ZTNA

The most basic requirement of a hybrid architecture is to establish a secure, reliable and high-performance connection between on-premises networks and cloud networks. This connection allows data and workloads to move seamlessly between the two environments. While traditionally this connection has been provided through VPN technology, modern security approaches highlight ZTNA as a strong alternative.

#### **Site-to-Cloud VPN (Virtual Private Network)**

Site-to-Site or Site-to-Cloud VPN is a method of creating an encrypted tunnel over the public internet between an organization's physical data center or branch office and a cloud provider's virtual network (such as AWS VPC or Azure VNet). This tunnel allows two networks to communicate securely as if they were part of the same local network.

* **Architecture:** To establish a Site-to-Cloud VPN connection, a VPN device (router or firewall) is configured on the on-premises side and a virtual network gateway (Virtual Private Gateway (VGW) or Transit Gateway in AWS, VPN Gateway in Azure) is configured on the cloud side. Between these two endpoints, the IPsec protocol suite is often used to encrypt data and maintain its integrity. The routing tables are updated to route traffic on both sides through this secure tunnel.
* **Limitations:** VPNs are based on a traditional security model known as “castle-and-moat.” When a user or device connects with a VPN, they often gain broad access to the entire network. This creates a serious security risk if an endpoint is compromised, opening a door for an attacker to move laterally within the network. Additionally, backhauling all traffic back to a central VPN concentrator can cause performance issues and delays, especially when accessing cloud-based applications.

#### **Zero Trust Network Access (ZTNA)**

ZTNA is a modern security model based on the basic principle of “never trust, always verify”. This model does not trust any user or device by default, regardless of whether they are inside or outside a network. Each access request is stringently verified and authorized based on identity, device status, and other contextual factors before access is granted.

* **Key Differences and Advantages:** Unlike VPN, ZTNA does not provide wide network access. Instead, it only grants granular access to specific **applications** or resources via one-to-one, encrypted tunnels. This significantly narrows the attack surface because a user can only see applications for which they are authorized, and all other resources remain invisible. This approach virtually eliminates the risk of lateral movement. ZTNA increases performance because it routes user traffic directly to the application and offers better scalability than VPNs thanks to its cloud-based architecture.

The paradigm shift between these two technologies reflects the evolution of the security perimeter. With VPN, the security perimeter is the **network** that needs to be protected. With ZTNA, however, the security perimeter is the **application itself** that must be protected regardless of where it is hosted. In today's world where distributed and hybrid infrastructures have become the norm, protecting the network becomes meaningless in a world where resources are no longer located in a single network. Instead, it is essential to protect the application and the identity that accesses it. Therefore, ZTNA is not just a VPN alternative, but the basic security architecture required by the hybrid and multi-cloud world.

The table below summarizes the key differences between these two approaches.

![](https://cdn-images-1.medium.com/max/800/1*ONz6_-qBi4Nekat2qavKdg.png)

**Traditional VPN and ZTNA Comparison**

### 4.2 Holistic Approaches to Multi-Cloud Security

Organizations need to avoid vendor lock-in, optimize costs, and use the most appropriate technology for each workload. Using multiple cloud providers (for example, AWS, Azure, and GCP simultaneously) is called a multi-cloud strategy. Although this strategy offers significant advantages in terms of business flexibility, it poses serious challenges in terms of security management.

#### **Main Challenges:**

* **Fragmented Visibility and Control:** Each cloud platform has its own unique management console, APIs, terminology and security tools. This prevents security teams from gaining a unified, consistent view across all cloud assets. These “visibility gaps” can allow threats or misconfigurations to go undetected.
* **Inconsistent Policies and Controls:** A security policy implemented in one cloud (for example, an IAM role or a network security rule) is difficult to implement in exactly the same way in other clouds. This inconsistency creates a difficult-to-manage and error-prone environment that leads to security vulnerabilities and compliance issues.
* **Expanded Attack Surface:** Each new cloud environment expands the potential attack surface by adding new APIs, endpoints and services. Without a unified monitoring and threat detection mechanism, protecting this large surface becomes impossible.
* **Compliance Complexity:** The distribution of data across multiple cloud providers and potentially different geographic regions makes compliance with different and sometimes conflicting regulations such as GDPR, HIPAA, PCI DSS extremely complex.
* **Identity and Access Management (IAM) Issues:** Since each cloud has its own IAM system, it is difficult to define and manage consistent access rights for users and services. This can lead to over-privileged accounts and identity management confusion.

#### Multi-Cloud Security Management Strategies:

To overcome these challenges, organizations must move from a reactive and siled approach to a proactive, centralized and automated security strategy:

* **Centralized Security Visibility and Management:** It is essential to collect all security logs, events and alerts from different cloud environments on a single central platform. This is typically achieved with a Cloud-Native Application Protection Platform (CNAPP) or an advanced SIEM (Security Information and Event Management) solution (for example, Azure Sentinel). CSPM tools also play a critical role in providing this centralized visibility, showing misconfigurations across all clouds from a single console.
* **Federated IAM:** The most effective way to solve identity confusion in multi-cloud environments is to connect all cloud providers to a single central Identity Provider (IdP). Solutions such as Microsoft Entra ID (formerly Azure AD), Okta or JumpCloud enable users to access all cloud services with a single identity (Single Sign-On - SSO) and allow central management of access policies. This ensures consistent access control and simplifies management.
* **Consistent Policy Enforcement with Infrastructure-as-Code (IaC):** Instead of manually making security configurations (VPCs, firewall rules, IAM roles, etc.), defining them as code using IaC tools such as Terraform or Pulumi ensures that these policies are applied in a consistent, repeatable and auditable manner across all cloud environments. Security policies can be managed in version control systems and integrated into deployment pipelines.
* **Data-Centered Security Approach:** In a multi-cloud environment where network environments become uncertain, the focus of security must shift from networks to data. This approach requires classifying data wherever it resides, encrypting sensitive data at all times (at rest, in transit, and in use), and tightly controlling access to data according to the principle of least privilege.

A successful multi-cloud security strategy aims to understand the native tools offered by different platforms, but not rely on them and create a centralized, automated and policy-based management layer that covers the entire environment.

---

This technical report examined in detail the multi-layered and complex structure of cloud security and hybrid network architectures that form the basis of modern enterprise infrastructures. A wide range of basic concepts, platform solutions, from cloud service models to virtualization technologies, from the security of virtual networks to advanced security tools and multi-cloud strategies, differences between organizations and strategic approaches are discussed. Analysis shows that cloud security is no longer a static, perimeter-based discipline; it clearly reveals that it requires a dynamic, identity-centered, automated and proactive approach.

#### 5.1 Report Summary and Key Takeaways

The key takeaways from the analyzes carried out throughout the report are:

* **Service Model Determines the Security Strategy:** Which of the IaaS, PaaS or SaaS service models an organization adopts directly shapes the security tasks it must undertake within the framework of the Shared Responsibility Model and therefore the competency set that the security team must have. While IaaS requires infrastructure security skills, SaaS mandates a focus on data and identity security expertise.
* **The Architecture of the Platforms Differentiates the Management Philosophy:** While the regional network architectures of AWS and Azure provide strong isolation by default; GCP's global VPC architecture offers centralized management and operational simplicity. This fundamental difference in philosophy fundamentally affects how security policies are designed and implemented.
* **The Security Perimeter Has Evolved from Network to Identity and Application:** The broad network access provided by traditional VPNs is being replaced by the granular, identity and context-based application access offered by ZTNA. The security perimeter is no longer the network, but the application itself, regardless of where it is hosted. This is a fundamental paradigm shift for hybrid and distributed architectures.
* **Automation is Indispensable in Managing Complexity:** The dynamic and scalable nature of cloud environments makes manual security management impossible, especially in multi-cloud scenarios. Automation tools like CSPM, CASB, and IaC are a necessity, not a luxury, to prevent misconfigurations, ensure ongoing compliance, and enforce consistent policies.

#### 5.2 Strategic Recommendations for the Future

The following strategic recommendations are offered for organizations that want to securely take advantage of the opportunities offered by cloud and hybrid networks:

* **Adopt the Zero Trust Model as a Strategic Goal:** Organizations should completely move away from the traditional perimeter-based security approach. By creating a strategic road map, it should plan the transition to a ZTNA architecture that constantly verifies all access requests coming from inside or outside the network and centers identity and context. This is not just a change of technology, but also a change of culture and philosophy.
* **Shift Left Security:** Security should be removed from being the last step in the development life cycle (SDLC). Security controls and policies should be integrated at the very beginning of DevOps processes: the coding and configuration phase. Practices such as security scanning IaC templates, creating secure default configurations, and scanning container images for vulnerabilities before deployment ensure that misconfigurations and vulnerabilities are prevented before they reach the production environment.
* **Invest in Automation and Centralized Management Tools:** Invest in holistic solutions to deal with the complexity and visibility issues brought by multi-cloud. A CSPM that monitors posture across all clouds, a CASB that manages access to SaaS applications, a Federated IAM solution that consolidates identities, and a centralized SIEM/SOAR platform that collects all logs are the cornerstones of a modern security operations center. These tools increase consistency, reduce human error, and shorten response time to threats.
* **Create Continuing Training and Competency Development Programs:** The competencies of security teams should be constantly updated in parallel with the evolution of cloud technologies. While traditional network and system security knowledge is still valuable, it is critical that they gain in-depth expertise in cloud-native technologies (containers, serverless), automation (Python, IaC), API security, and identity management. Organizations should invest in continuing education and certification programs to equip their teams with these new competencies.
* **Develop a Data-Centered Security Perspective:** In a world where network perimeters are becoming increasingly meaningless, data itself, the most valuable asset, should be placed at the center of the security strategy. Classify data regardless of where it resides (on-premises, IaaS, PaaS, SaaS). Set policies based on sensitivity level. Secure data both at rest and in transit. Strictly control access to data according to the principle of least privilege. This approach provides a consistent layer of protection even in the most complex and distributed environments.