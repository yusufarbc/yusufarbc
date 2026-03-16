---
date: '2025-09-19'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*tdun2Bby5gQIKpvNeEUi2Q.png
title: Microsoft's Cloud-Focused Strategy
type: posts
---

![](https://cdn-images-1.medium.com/max/800/1*tdun2Bby5gQIKpvNeEUi2Q.png)

Microsoft has clearly adopted the "cloud-first" approach in recent years; Windows Server is positioning itself to integrate its identity management and other products with the Azure cloud. For example, Microsoft documentation emphasizes that Windows Server 2022 brings innovations based on the main themes of "security, Azure hybrid integration and management". In fact, it is stated that Windows Server 2022 Datacenter: Azure Edition offers features to "keep VMs updated without interruption by using the benefits of the cloud" and includes cloud-focused innovations such as Hotpatch, SMB over QUIC and Azure Extended Networking. This shows that Microsoft focuses on Azure and cloud integration in both product innovations and management methods.

---

### Status on On-Prem Products: Declining and Living Products

Microsoft's strategy is not to completely terminate the on-premises infrastructure, but rather to direct it to Azure-centered hybrid management. However, development has decreased in some classic vehicles:

**WSUS (Windows Server Update Services):** In September 2024, Microsoft announced that WSUS was declared "deprecated". Investments will no longer be made in developing new features for WSUS, and new feature requests will not be accepted. Existing functionality will be preserved and the role will continue to exist in Windows Server 2025. However, this is aimed at directing organizations to cloud-based patching solutions recommended by Microsoft (Windows Autopatch, Intune, Azure Update Manager). In summary, WSUS can still be used, but new innovation is not expected; Microsoft has clearly laid out its strategy of shifting update management to cloud tools.

**Windows Admin Center (WAC):** Active development is ongoing on the administration tool. For example, the WAC 2410 version, released in December 2024, included a .NET 8 update, improvements to the virtual machine and security tools, and various bug fixes. Additionally, cloud-focused innovations such as large-scale integration with Azure Arc and Azure Migrate evaluation are added regularly. This indicates that WAC is one of the on-prem tools that last received a major update.

**Azure Stack / Azure Stack HCI (Azure Local):** Formerly known as Azure Stack HCI, now known as Azure Local, it is an infrastructure under active development for hybrid/on-premise scenarios. The latest version of Azure Local brings features focused on cloud-based deployment and updates, cloud monitoring, and management through Azure. For example, in the latest release announcement, it was emphasized that "Azure Stack HCI is now part of Azure Local" and that the new version focuses on simplifying VM management with cloud-based deployment/update. So Microsoft is not completely abandoning on-prem hardware, but is positioning this infrastructure as a hybrid platform “combined with Azure”.

---

### Identity Management: Status of On-Prem AD

The main trend in Microsoft's identity solutions is similarly cloud-centric. Azure AD / Microsoft Entra ID is rapidly maturing as Microsoft's cloud identity platform. For example, the Azure AD Graph API (older generation identity API) will be fully retired by the end of 2025, and all new identity functionality is delivered through Microsoft Graph. This indicates that new applications and integrations are now shifting to Azure AD/Entra APIs.

However, Microsoft does not claim to have removed on-prem AD immediately. Indeed, significant improvements for Active Directory Domain Services (AD DS) are being added in future versions of Windows Server (e.g. 2025). For example, the features of Windows Server 2025 include innovations such as increasing the database page size from 8k for AD to an optional 32k (increasing the number of multi-valued attributes), new schema updates, LAPS (Local Admin Password Solution) improvements and multi-core performance increases. This shows that on-prem AD continues to remain technically strong. However, Microsoft is clearly encouraging the use of hybrid identity in new solutions: it is building bridges between on-prem AD and Azure AD with tools like Azure AD Connect, Azure AD Join, and recommends keeping workloads on Entra ID in the long term. In summary, on-prem AD is not “going away anytime soon,” but most investments are shifting to a cloud-based identity platform.

---

### Data Privacy and Data Sovereignty Concerns

cloud strategyOne of the most questioned points is data sovereignty and privacy. Microsoft is committed to protecting customers' data, including in the EU. For example, according to Reuters, Microsoft has announced that the data of its European cloud customers will remain in Europe and will be controlled by local teams, subject to European laws. He also announced special measures such as data will remain local and remote access will be approved by personnel in Europe.

However, legal frameworks make these commitments difficult. Due to the US CLOUD Act and similar laws, Microsoft is required to provide data upon a legally valid access request. As a matter of fact, Microsoft France General Legal Counsel admitted in an interrogation in June 2025 that "Microsoft is obliged to provide the data if the requests from the USA are made correctly." According to the news published in Heise, this situation has created concern throughout Europe; Analysts have pointed out that the Cloud Act could lead to global data demands. Similarly, The Register stated that "Microsoft is obliged to transmit the data if a request is made in the correct form." In other words, Microsoft cannot technically protect even the data it holds within the EU with absolute assurance against international legal demands.

That's why Microsoft is trying to provide advanced encryption and local operation guarantees with new solutions such as Azure Confidential Computing and “Microsoft for Sovereignty” initiatives. Additionally, the use of customer-side key management (Customer-Managed Keys) is supported; That is, data can be encrypted with your own key. Such options provide an additional layer of protection, but legal claims still involve systematic surmountable risks. This means that even if the infrastructure is physically located in Europe, valid court orders from the USA and other countries can directly affect data access.

Microsoft's "Data local" commitment documents also state that data will remain in the geography chosen by the customer: "The customer data center will be kept in the selected region, Microsoft will not move it beyond geographical boundaries." Also disclosed, Microsoft says it will not provide “direct, unrestricted access” to data keys or content without the customer's express authorization. However, when a government request arises, these policies can be added in line with the mandate of the relevant laws. In summary, pure geographical location does not provide absolute assurance in the current situation, and institutions feel the need to strengthen their encryption and control layers.

---

### On-Prem-only Recommendations for Institutions

For organizations that never take their data off-premise or only use on-prem infrastructure, the most logical approach is to follow a careful hybrid strategy by not cutting almost all of it off with the cloud. Some measures that can be taken in technical, administrative and legal terms are listed below:

**Technical Precautions:**

* **Inventory and Comprehensive Mapping:** Identify all your data and applications, where and how they are used in the cloud. Which data is sensitive and which is portable? Uncover cloud integrations by analyzing your infrastructure with tools like Azure Migrate.
* **Azure Local / HCI Solutions:** To reduce on-prem dependency, Azure Local (formerly Azure Stack HCI) or supported HCI solutions can be evaluated. These products offer the opportunity to bring many Azure services to the local environment or provide Azure-centric management. Thus, while the data remains within the organization, management is unified through Azure.
* **Customer Managed Keys (CMK/BYOK):** Use customer-controlled encryption keys in Azure and Microsoft 365 services. By hosting keys in your own Azure Key Vault or on-premise HSM, you can create an additional layer of control that limits Microsoft's direct access to passwords. (Note: Legally, access to your company key may also be requested, but this creates technical obstacles.)
* **Air-Gapped Solutions:** If "data will never leave the institution", the safest but costly way is to keep critical data in a completely isolated (air-gap) environment. This environment is far from access to the internet and integration with external services.
* **Hybrid Identity and Management:** Use hybrid solutions such as AD/federation for applications-on-demand (AD FS) or Azure AD Connect for identity management. Connect your on-prem devices to the Azure management endpoint by choosing tools such as Windows Admin Center + System Center or Azure Arc for management.

**Contract and Legal Precautions:**

* **Privacy/DPA Agreements:** Review your corporate agreements (DPA, ToS) with Microsoft. Clarify items such as data processing, access requests, notice periods and audit rights in case of breach.
* **Sovereign Cloud and Native Partners:** Consider Microsoft's sovereign cloud offerings (e.g. restricted cloud for Europe) when necessary. Alternatively, explore collaboration options with fully local providers or services that offer “cloud operator licences.” This can reduce provider dependency.
* **Legal Consultancy:** Evaluate with legal experts the issues where the CLOUD Act, GDPR and similar regulations pose a risk for your institution. Create defense strategies (court interventions, regulatory compliance plans) when necessary. (Remember, the suggestions above are not legal advice; seek expert advice.)

**Operational Steps:**

* **Inventory & Risk Classification (30 days):** Inventory all existing systems, data and data flows and perform sensitivity classification.
* **Sensitive Data Location and Access Policy (60 days):** Determine in which physical/operational region critical data should be kept. If it needs to be kept on-prem, create the necessary access control and isolation policies.
* **Coordination with Microsoft:** Contact your account manager and request opportunities such as Customer Key, Sovereign Cloud or Azure Local. Ask to formalize these claims as a written warranty or contract provision.
* **WSUS Dependency:** If you are using WSUS as the sole channel for update management, consider this deprecation. Alternatively, plan to migrate to solutions such as Microsoft Endpoint Manager / System Center Configuration Manager or Azure Update Manager.

---

### Open Source Alternative for Data Sovereignty

Microsoft's aggressive cloud-first strategy and data sovereignty concerns created by the US CLOUD Act leave many organizations facing a serious dilemma. Especially organizations that work with sensitive data and have to rely on on-premises infrastructure are uncomfortable with Microsoft's cloud-focused orientation. The deprecation of WSUS, the evolution of Active Directory towards a hybrid architecture, and most importantly, Microsoft executives' admission that they had to access even data in Europe due to US laws, accelerated the search for alternative solutions.

At this point, Linux desktop solutions stand out as a very strong alternative both technically and strategically. Offering full transparency, vendor independence and cost advantages thanks to its open source nature, Linux is becoming a serious option especially for institutions concerned about data sovereignty.

#### **Total Control: The Key Advantage of Linux**

The biggest advantage of Linux desktop for corporate environments is that you have full control over your system. Thanks to its open source code structure, you have the opportunity to know exactly what is happening in the system. This means a level of transparency not possible in closed source systems. Concerns such as hidden telemetry, backdoor risks or remote access channels are eliminated.

Additionally, you can customize each component of the system according to your corporate needs. While in Windows you have to act within the rules set by Microsoft, in Linux you determine your own rules. This freedom provides an invaluable advantage, especially in industries with strict compliance requirements.

#### **Data Sovereignty: Your Data Is All Yours**

When you use Linux desktop, your data never leaves the institution. Unlike Microsoft's cloud-first strategy, all data processing happens locally. Even if the internet connection is interrupted, your systems continue to operate with full functionality. This is an indispensable feature, especially for critical infrastructure operators, financial institutions and government organizations.

Your security experts can audit your system from start to finish and close security vulnerabilities with their own means. Complying with compliance standards such as GDPR and ISO 27001 also becomes much easier because you can completely control the data flow.

#### **Cost Advantage: Free Your Budget**

One of the most tangible advantages of using Linux is cost savings. You can achieve significant relief in your budget by getting rid of Windows and Office licenses completely. Especially for institutions with hundreds or thousands of desktop computers, this savings reaches significant levels.

Linux's old versionIts efficient operation even during repairs also relieves your IT renewal budget. Instead of the hardware requirements imposed by Microsoft, you can use your existing hardware for longer. In addition, thanks to the open source support ecosystem, your maintenance costs will decrease and you will not encounter unforeseen costs such as sudden license increases or mandatory updates.

#### **Which Linux Solution To Choose?**

When choosing Linux for corporate environments, it is critical to choose enterprise-ready distributions. Red Hat Enterprise Linux (RHEL) offers professional support and long-term warranty. For European-based institutions, SUSE Linux Enterprise Desktop stands out as a strong alternative. Canonical's Ubuntu LTS versions, on the other hand, provide an ideal balance for medium-sized institutions with a 5-year update guarantee.

For those who want a cost-oriented approach, there are free RHEL compatible alternatives such as CentOS Stream or AlmaLinux. These distributions zero out licensing costs while preserving enterprise features.

The Linux ecosystem is also quite mature in terms of management infrastructure. FreeIPA and Red Hat Identity Management solutions provide identity management as a full alternative to Active Directory. While you can perform central configuration management with tools such as Ansible and Puppet, you can implement central policy applications similar to Windows Group Policy with Fleet Commander and Cockpit.

After Microsoft deprecated WSUS, automatic update systems such as dnf-automatic and unattended-upgrades in Linux offer reliable alternatives. These tools provide centralized management and give full control to system administrators.

#### **Application Support: Linux Now Ready**

The advancements in application support on modern Linux desktops are truly impressive. LibreOffice now provides almost perfect compatibility with Microsoft Office files. Even complex Excel macros can run smoothly. Alternatives like OnlyOffice offer full Office compatibility without cloud integration. Collabora Office, specially developed for corporate environments, stands out with its enterprise-oriented features.

The situation is also quite positive regarding business practices. Nowadays, since most of the corporate applications are web-based, platform independence is ensured. There are compatibility layers such as Wine and CrossOver for Legacy Windows applications. For critical applications, Windows virtual machines can be easily run with VMware or VirtualBox.

Linux is already an ideal platform for developers. Professional IDEs such as IntelliJ IDEA, Visual Studio Code, Eclipse are natively supported. Container technologies such as Docker and Podman perform better on Linux. Modern DevOps tools like Git, Jenkins, Kubernetes all run natively on Linux.

#### **Transition Strategy: Patient and Phased Approach**

When you decide to switch to Linux, it is critical not to rush. The most successful transitions are those that start with pilot projects and progress gradually. It makes sense to create a small test group by choosing one of the non-critical departments at the first stage. This group can take on the task of both identifying technical problems and playing a lead role for other staff.

Never neglect user training. It takes time for personnel accustomed to Windows to adapt to Linux and LibreOffice. You can facilitate this transition process by preparing comprehensive training programs. Provide practical training, especially on basic file management, use of office applications and system updates.

Attempting to change the entire system at once carries great risks. Instead, take a gradual approach. Start with test environments first, then move to support units, and finally to production environments. Have VM solutions or dual-boot systems ready for your critical Windows applications.

#### **Difficulties You May Encounter**

Of course, it is normal to encounter some difficulties during the Linux migration. The biggest challenge is often resistance due to user habits. It may take time for personnel who have used Windows for years to get used to the new interface. It is necessary to manage this process patiently and provide constant support.

If you have industry-specific Windows-only applications, it may be necessary to develop alternative solutions for them. Some special software may not run natively on Linux. Wine can overcome this problem with CrossOver or virtual machine solutions, but performance loss may occur.

legacy hardwareYou may experience problems with driver support from time to time. Particularly older printers, scanners or specialized industrial equipment may not be fully supported in Linux. In this case, you may need to review your hardware inventory and find compatible alternatives when necessary.

Exchange and Outlook integration is another area of ​​difficulty. You may need to reconfigure your corporate email infrastructure. Email clients such as Thunderbird and Evolution support the Exchange protocol, but some advanced features may not fully work.

#### **Success Stories: Real World Performance of Linux**

Many large institutions around the world have successfully completed the Linux desktop migration. The LiMux project of the Municipality of München is perhaps one of the most famous examples. By enabling Linux use on 15,000 desktop computers, they both saved costs and gained vendor independence. The French Gendarmerie wrote an impressive success story using Ubuntu on 37,000 computers.

Spain's Andalusia region used 220,000 Linux computers in the education sector, enabling young people to become familiar with open source technologies at an early age. Due to national security concerns in Russia, many government institutions have switched to Linux and gained technological independence.

There are also examples from Turkey. The TÜBİTAK-supported Pardus project was developed as a local Linux distribution and programming applications were made in various public institutions. Many universities have expanded the use of Linux in their academic environments. Some municipalities and ministries also evaluated Linux desktop with pilot projects.

What these success stories have in common is patient planning, comprehensive training, and gradual transition strategies. None of them attempted to transform overnight, they all followed long-term strategies.

#### **Strategic Independence: Technological Sovereignty**

The corporate benefits of using Linux desktop are not limited to just technical aspects. It also offers important strategic advantages. You gain technological sovereignty by reducing your dependence on foreign software companies. You are not affected by Microsoft's policy changes, sudden price increases or strategic decisions.

When you get rid of the Vendor lock-in situation, you gain strategic flexibility. You make your technological decisions according to your own needs, you are not confined to the road map determined by others. Your opportunity to develop local expertise also increases, and you build corporate knowledge by training personnel who specialize in open source technologies.

Linux also offers significant advantages in terms of risk reduction. Hidden backdoor risks in closed source systems in supply chain attacks do not exist in Linux. Sudden audit and penalty risks of vendors such as Microsoft are eliminated. You do not encounter forced upgrades and the operational risks they create.

---

### Conclusion and Recommendations

Microsoft's cloud-first strategy points to a hybrid future in corporate IT infrastructures. While new features and management capabilities are developing largely with an Azure focus, we are seeing a decline in investment for classic on-prem solutions. This situation forces institutions to make new decisions, especially in terms of data privacy and sovereignty.

Due to regulations such as the CLOUD Act, simply keeping data "physically within the organization" is not a sufficient security approach. A layered strategy is essential: customer-managed encryption keys, hybrid solutions such as Azure Local/Azure Stack, and contractual protections should be used together. Thus, it is possible to both benefit from the flexibility offered by the cloud and provide stronger assurance for critical data.

However, Linux desktop solutions come to the fore in institutions' search for strategic independence and cost advantage. These open source-based platforms offer powerful alternatives in terms of transparency, auditability and cost control. Of course, the transition process is not easy; Success can be achieved with proper planning, pilot projects and gradual transition approaches.

**📌 Recommendation:** If data sovereignty is a critical priority in your organization, start evaluating Linux desktop options with a small pilot project. Open source office applications and modern Linux distributions have reached maturity to meet many corporate needs today.

**👉 In summary:** A hybrid approach that keeps control while taking advantage of the cloud and open source alternatives for strategic independence are two basic additions that will shape the future of organizations.It will be you.

---

### **Resources**

Information obtained from Microsoft Learn and Tech Community documents and news from Reuters, Heise and The Register were used.

1. What's New in Windows Server 2022 | Microsoft Learn: <https://learn.microsoft.com/en-us/windows-server/get-started/whats-new-in-windows-server-2022>
2. Windows Server Update Services (WSUS) deprecation — Windows IT Pro Blog: <https://techcommunity.microsoft.com/blog/windows-itpro-blog/windows-server-update-services-wsus-deprecation/4250436>
3. Windows Admin Center release history | Microsoft Learn: <https://learn.microsoft.com/en-us/windows-server/manage/windows-admin-center/support/release-history>
4. What's new in Azure Local latest release — Azure Local | Microsoft Learn: <https://learn.microsoft.com/en-us/azure/azure-local/whats-new?view=azloc-2508>
5. Migrate from Azure Active Directory (Azure AD) Graph to Microsoft Graph — Microsoft Graph | Microsoft Learn: <https://learn.microsoft.com/en-us/graph/migrate-azure-ad-graph-overview>
6. What's new in Windows Server 2025 | Microsoft Learn: <https://learn.microsoft.com/en-us/windows-server/get-started/whats-new-windows-server-2025>
7. Microsoft lays out data protection plans for European cloud customers | Reuters: <https://www.reuters.com/sustainability/boards-policy-regulation/microsoft-lays-out-data-protection-plans-european-cloud-customers-2025-06-16/>
8. Not sovereign: Microsoft cannot guarantee the security of EU data | heise online: <https://www.heise.de/en/news/Not-sovereign-Microsoft-cannot-guarantee-the-security-of-EU-data-10494789.html>
9. Microsoft exec admits it ‘cannot guarantee’ data sovereignty • The Register: <https://www.theregister.com/2025/07/25/microsoft_admits_it_cannot_guarantee/>
10. Data Residency in Azure | Microsoft Azure: <https://azure.microsoft.com/en-us/explore/global-infrastructure/data-residency>