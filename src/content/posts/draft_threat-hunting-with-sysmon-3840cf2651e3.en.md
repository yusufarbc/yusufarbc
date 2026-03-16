---
title: "Threat Hunting with Sysmon"
date: 2021-01-01
draft: false
---

---

### Threat Hunting with Sysmon

### Deploying Sysmon

System Monitor (Sysmon) is a Windows system service and device driver that, once installed on a system, remains resident across system reboots to monitor and log system activity to the Windows event log. Sysmon is very verbose and performs excellent visibility on an endpoint. It provides visibility in process executions, file system activities, network level events, Windows registry events and other Windows specific processes like named pipes. This makes sysmon a good data source during incidents because if sysmon was configured correctly, we can get the most of the incident events from this source.

Deploying Sysmon is straightforward. We will download the package from Microsoft website, then download a very good config file for sysmon. Sysmon requires a config file so it knows how and what to monitor on the system. We can create our own sysmon config too, but there are very well known configs that are specifically tailored for security incidents and mapped to MITRE techniques as well.

Sysmon can be downloaded from here:

**Sysmon** : <https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon>

We will be using olaf hartongs sysmon config:

**Sysmon Config** : <https://github.com/olafhartong/sysmon-modular>

Other well known sysmon config includes SwiftOnSecurity config.

Let's deploy sysmon.

1- First download the sysmon from official website. Then unzip the archive and open powershell as admin and navigate to the sysmon directory. We recommend unzipping the sysmon files under “C:\Windows\”, so the sysmon path becomes “C:\Windows\sysmon”.

![](https://cdn-images-1.medium.com/max/800/0*4kr37CLKrNbKE8-M.png)

2- Download the sysmon config. Either do it manually by visiting github or we can also use powershell to directly download it. You can use the following command to do it:

```
Invoke-WebRequest -Uri https://raw.githubusercontent.com/olafhartong/sysmon-modular/master/sysmonconfig.xml -OutFile C:\Windows\\Sysmon\config.xml
```

![](https://cdn-images-1.medium.com/max/800/0*WHwE2JTHWJtLTLlM.png)

3- Then run the following command to register sysmon as a service:

```
Sysmon64.exe -accepteula -i config.xml
```

![](https://cdn-images-1.medium.com/max/800/0*LIASzx0oCZW53Aqn.png)

4- Verify that service is running on the system. We can do it using the Get-Service powershell cmdlet:

```
Get-Service -name Sysmon64
```

![](https://cdn-images-1.medium.com/max/800/0*AIep6aNpbmBhgM9T.png)

This part of the training explains how to deploy sysmon. The next part of the training covers “ **Hunting Malwares with Process Execution** “.

### Questions

No Answer Needed

---

### Hunting Malwares with Process Execution

Sysmon Event ID 1 denotes process execution. Whenever a new process is spawned in memory, an event with id 1 is logged in Sysmon. This event is very crucial for security incidents as getting visibility on which programs or malware ran in memory provides more context important for analysis.

Sysmon will not only show what processes are being run, it will also show when they are ended, as well as a lot of information about the executable or binary itself. It also provides hashes for all of the binaries that are run on the system and lists if they are signed or not, making it easy to see if malicious code is attempting to mimic legitimate programs such as PowerShell or other built-in Microsoft tools. It also shows the timestamps in UTC, so forensics analysts can make a timeline when a process was spawned.

For example if a malware or a ransomware was executed on an endpoint, Event ID 1 will log all the details of that malicious process. These details will make the forensics analysis easy and provide rich context and data easier to correlate with.

Let's discuss this with an example.

Suppose mimikatz was used on an endpoint.

![](https://cdn-images-1.medium.com/max/800/0*sQCsv03_U7-n9UJb.png)

We can see how much details are logged about the process. Of course in this example we can clearly see that the tool ran is called mimikatz, but soon we will discuss other use cases using the same tool. In the above example we can see some important fields which provides value during analysis phase:

* **Mitre Technique ID**
* **Process ID** (This can be used as an IOC and correlated with memory analysis.)
* **File metadata** (This can be used in cases where file is renamed or tampered with but metadata remains intact.)
* **CommandLine** (The most useful field in this event. This provides the full command line including the arguments if any.)
* **Hashes** (The hash of the process executed. This is also useful as using this we can automatically verify using Threat intelligence platforms like virustotal, whether the file is known malicious or not.)
* **Parent process** (This includes parent process id and the file which spawned the malicious process in question. This is also very useful as this provides the context of how a malicious process was executed. In our example we can see that powershell was responsible for spawning mimikatz, which is a big red flag.)

Let's rename the mimikatz file and move it to some other location. Then we will execute it, then discuss how to spot the anomaly.

![](https://cdn-images-1.medium.com/max/800/0*nQpwNYgOtjbXeuC4.png)

Here we can see a file named WinSvc in Windows folder. Threat actors love to setup their tools in legitimate file system locations in order to evade defenses. In our case, the file metadata immediately gives it away that the process spawned is actually mimikatz. Adversaries often make their own custom tools or strip the known default metadata like in our case it shows the company name, description of tool etc. For a second assume that there's no file metadata or the metadata is also tampered and makes the tool look like a legitimate tool. In such cases we can make use of hashes using threat intelligence vendors. It may be that the same tool is used by different threat actors in various campaigns and it's a known malicious tool.

![](https://cdn-images-1.medium.com/max/800/0*5fJ8b7J_2EKYF5PM.png)![](https://cdn-images-1.medium.com/max/800/0*b4uDBvvGt18LQ6Hi.png)

<https://www.virustotal.com/gui/file/92804faaab2175dc501d73e814663058c78c0a042675a8937266357bcfb96c50>

The power of Sysmon Event ID 1 is the commandline visibility of the spawned processes. Commandline will offer visibility, even TTPs of threat actor. Specific threat actors are known to use specific tools with specific arguments. We can use sysmon command line visibility to monitor this behavior, which then makes threat attribution easier. Threat attribution is out of scope for this course, but essentially it is a research where we analyze the techniques/tactics and then attribute the campaign to threat groups based on those analytics.

Anyways, back to our topic. Let's assume a powershell payload was executed on the endpoint which reached back to a command and control channel. If powershell logging is not enabled, how can we know what payload was executed which established the remote access for the attackers.

![](https://cdn-images-1.medium.com/max/800/0*vTu1KiidPUQcZ3KD.png)

Here we can see the full command line. The first thing this event does is make it obvious that something fishy is going on. Secondly, we can now add this to TTPs being used by attackers. We can decode the command get useful information like the variables used, IP address etc. which can then be used to hunt across your environment in case same attacker has breached other systems which remained undetected so far.

![](https://cdn-images-1.medium.com/max/800/0*MfUMcNzszYzMCGHw.png)

Here we used cyberchef to decode this command, and it gave us important pieces about this incident.

In this part of the training, the Process Execution example via Sysmon is mentioned. In the next part of the training, “ **Hunting Malicious C2 IPs and Domains** “ is explained.

### Questions

No Answer Needed

---