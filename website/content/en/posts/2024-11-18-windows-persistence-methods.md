---
date: '2024-11-18'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*embmEuQRxJRHe7TWE4Y6hw.png
title: Windows Persistence Methods
type: posts
---

![](https://cdn-images-1.medium.com/max/800/1*embmEuQRxJRHe7TWE4Y6hw.png)

Persistence methods in Windows are used to ensure that malicious software or unauthorized access continues even if a system is restarted or the user is logged off.

### 1- User Manipulation (Users)

A commonly used method by attackers to maintain persistence is to create users. In fact, the only reason for doing this is not to ensure permanence. We observe that the attacker(s) create new users when they take control of the "Administrator" account. Because this is an important user and his activities can be monitored regularly. So they create a new user who won't attract much attention and, if possible, increase that user's privileges.

Generated users usually contain keywords such as “support”, “sysadmin”, “admin”. In most companies, users with names like these will not attract much attention.

We can use the “net users” command to view existing accounts on the computer.

![](https://cdn-images-1.medium.com/max/800/1*HvOGzRb3pHx18C05BL9HYg.png)

netuser

During an incident response procedure, there are 2 things we need to quickly evaluate. Is there a user that shouldn't be on the system right now? Was a user created during the attack and deleted later?

We can search on EventViewer to see created and deleted users.

1. **Creating User**:

* **Event ID 4720**: This event is logged when a new user account is created.

1. **User Deletion**:

* **Event ID 4726**: This event is logged when a user account is deleted.

![](https://cdn-images-1.medium.com/max/800/1*4nn-RZO_QOj2Z31N2iW__Q.png)

Event Viewer Filtering

In the records in the Event Viewer, we can see the user created, the time and the user through whom it was created.

![](https://cdn-images-1.medium.com/max/800/1*1xVpZh22clB0-MLj_t8dfA.png)

EventViewer log review

---

### 2- Scheduled Task

One of the most used persistence methods is to create scheduled tasks. From viruses to ransomware, most malicious things use scheduled tasks to maintain persistence. The attacker uses scheduled tasks to ensure that the malicious file runs at regular intervals. There are various ways to detect suspicious scheduled tasks actively running on the system. First, let's show how to do this using “Autoruns”, a sysinternals tool. Autoruns: [Download](https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns).

![](https://cdn-images-1.medium.com/max/800/1*idpBPfOpk5jfDLg-y3C8wA.png)

Analysis with Autoruns tool

When we look at the scheduled tasks section with the Autorun tool, we can see the scheduled tasks of the OneDrive service. Of course, this service is safe and legal because it is signed and verified by Microsoft.

---

### 3- Registry Run Keys

**Registry run keys** are places used in the Windows operating system to enable certain programs or commands to start automatically. These switches are activated when the system is turned on or a user logs on. By using these keys, malware tries to establish persistence in the system, that is, they can reboot themselves when the system is restarted or the user logs in.

Registry keys can be edited with the regedit tool.

![](https://cdn-images-1.medium.com/max/800/1*KJ7xCp0G-BiHtQ1-wsCjBw.jpeg)

registry editor

**The following run keys are created by default on Windows systems:**  
   
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\Run  
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\RunOnce   
 ● HKEY\_LOCAL\_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run  
 ● HKEY\_LOCAL\_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnce

**The following Registry keys can be used to set startup folder items for persistence:**

● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\UserShellFolders  
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\ShellFolders   
 ● HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellFolders   
 ● HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\UserShellFolders

**The following Registry keys can control automatic startup of services at boot:**

● HKEY\_LOCAL\_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunServices Once   
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\RunServices Once   
 ● HKEY\_LOCAL\_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunServices   
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\RunServices

**Using policy settings to specify startup programs creates corresponding values in one of two Registry keys:**

● HKEY\_LOCAL\_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run  
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run

With these keys, programs can be started at boot time or logon time. We can see the programs launched with the Autoruns tool.

![](https://cdn-images-1.medium.com/max/800/1*y3d5O0LdaV4GmOdbHnHpng.png)

Autoruns Logon Keys

![](https://cdn-images-1.medium.com/max/800/1*Z-1VEztRVjoi7huNxW_u3A.png)

Autoruns Boot Keys

---

### 4-Startup Folder

To view the files added to the startup file, the following indexes must be marked.

* C:\Users\[Username]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
* C:\Programshell:startupData\Microsoft\Windows\Start Menu\Programs\StartUp

We can access the startup folder with the run window opened by pressing the Win + R keys in Windows.

>shell:startup

![](https://cdn-images-1.medium.com/max/800/1*1VKN6kfhHUHtAxIC_SMn-g.png)

startup folder

We can see the files left by the malware in the startup folder we open with the Run tool.

![](https://cdn-images-1.medium.com/max/800/1*wYEoJlBvJhUvXomYDotB-g.png)

Startup Folder

---

### 5- Services

Attackers can create a new service or modify an existing service to run malicious commands. They may use legitimate code names like “Chrome Update” to make it harder to detect the service they created or modified.

To detect a newly created service from the Event Logs, the log with ID **4697**:**A service has been installed in the system** can be used.

In addition to permanence, "Windows Defender", "Firewall" etc. are used for security measures to easily carry out hacking activities. They constantly stop the services.

For these reasons, when analyzing a Windows device, it should be examined which services were created/changed and which systems were stopped.

The autoruns tool and event viewer can again be used in this analysis.

Note: Since my test machine crashed due to ransomware infection, I couldn't take pictures of this section, and I didn't want to deal with reinstalling it :)

#### 6-BITS Jobs

**BITS (Background Intelligent Transfer Service)** is a component of the Windows operating system and is often used to perform updates and file transfer operations. However, malicious users can use BITS for malware.

**Malware persistence with BITS Jobs** can occur as follows:

1. File Download and Execution: A malicious application can download a file and execute it by creating a BITS job. This keeps the application running for a long time and can be effective even when the system is rebooted.  
2. Privacy and Security Bypass: BITS jobs are often allowed by firewalls and can be an ideal method for malicious operations. This makes it difficult to detect and block malicious applications.  
3. Command Execution: BITS jobs can be used to execute a specific command. This command can be run when the BITS job is completed or an error occurs.

For example, a malicious application can create a job via BITSAdmin and this job can be set to download and run a specific file.

---

In this article, I touched upon the methods of maintaining the persistence of malicious software on computers. For more, you can examine the persistence tactic of the Miter attack enterprise matrix. See: <https://attack.mitre.org/tactics/TA0003/>