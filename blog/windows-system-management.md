# Windows System Administration for Security Professionals

**Author**: Yusuf Talha ARABACI  
**Date**: January 5, 2025  
**Category**: System Security  
**Reading Time**: 14 minutes  

---

## 🔍 Introduction

Windows system administration is a critical skill for cybersecurity professionals, particularly those working in SOC environments where Windows endpoints represent the majority of organizational assets. This comprehensive guide covers essential Windows administration techniques, security hardening practices, and advanced monitoring strategies from a security-focused perspective.

---

## 🖥️ Windows Security Architecture

### **Windows Security Model**

```
┌─────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                     │
│        Applications, Services, User Processes          │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 SECURITY SUBSYSTEM                      │
│        Authentication, Authorization, Auditing         │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                    KERNEL LAYER                         │
│         Memory Management, Process Management          │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                   HARDWARE LAYER                        │
│           CPU, Memory, Storage, Network                │
└─────────────────────────────────────────────────────────┘
```

### **Key Security Components**

- **Local Security Authority (LSA)**: Authentication and authorization
- **Security Accounts Manager (SAM)**: Local user and group accounts
- **Active Directory**: Domain-based authentication and authorization
- **Windows Defender**: Built-in antimalware solution
- **Windows Firewall**: Host-based firewall protection

---

## 🛡️ Windows Security Hardening

### **1. User Account Control (UAC)**

**Configure UAC via Registry**:
```powershell
# Set UAC to highest level
Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "ConsentPromptBehaviorAdmin" -Value 2
Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "ConsentPromptBehaviorUser" -Value 3
Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "EnableLUA" -Value 1

# Restart required for changes to take effect
Restart-Computer -Force
```

### **2. Windows Firewall Configuration**

**Advanced Firewall Rules**:
```powershell
# Block all inbound connections by default
New-NetFirewallRule -DisplayName "Block All Inbound" -Direction Inbound -Action Block -Profile Any

# Allow specific applications
New-NetFirewallRule -DisplayName "Allow SSH" -Direction Inbound -Protocol TCP -LocalPort 22 -Action Allow
New-NetFirewallRule -DisplayName "Allow RDP" -Direction Inbound -Protocol TCP -LocalPort 3389 -Action Allow -RemoteAddress 192.168.1.0/24

# Block suspicious processes
New-NetFirewallRule -DisplayName "Block Malicious Process" -Direction Outbound -Program "C:\temp\suspicious.exe" -Action Block

# Log dropped packets
Set-NetFirewallProfile -Profile Domain,Public,Private -LogAllowed True -LogBlocked True -LogFileName "C:\Windows\System32\LogFiles\Firewall\pfirewall.log"
```

### **3. Registry Security Settings**

**Disable Unnecessary Services**:
```powershell
# Disable services that pose security risks
$services = @(
    "Telnet",
    "RemoteRegistry",
    "SSDPSRV",  # SSDP Discovery
    "upnphost", # UPnP Device Host
    "WMPNetworkSvc" # Windows Media Player Network Sharing
)

foreach ($service in $services) {
    Set-Service -Name $service -StartupType Disabled -ErrorAction SilentlyContinue
    Stop-Service -Name $service -Force -ErrorAction SilentlyContinue
    Write-Output "Disabled service: $service"
}
```

**Security Registry Modifications**:
```powershell
# Disable autorun for all drives
Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" -Name "NoDriveTypeAutoRun" -Value 255

# Disable Windows Script Host
Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows Script Host\Settings" -Name "Enabled" -Value 0

# Enable additional security logging
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "AuditBaseObjects" -Value 1
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "CrashOnAuditFail" -Value 1
```

---

## 📊 Windows Event Log Management

### **1. Critical Security Event IDs**

**Authentication Events**:
```powershell
# Monitor successful and failed logons
$SecurityEvents = @{
    4624 = "Successful Logon"
    4625 = "Failed Logon"
    4648 = "Logon with Explicit Credentials"
    4672 = "Special Privileges Assigned"
    4720 = "User Account Created"
    4726 = "User Account Deleted"
    4728 = "User Added to Global Group"
    4732 = "User Added to Local Group"
}

# Query security events
foreach ($EventID in $SecurityEvents.Keys) {
    $Events = Get-WinEvent -FilterHashtable @{LogName='Security'; ID=$EventID; StartTime=(Get-Date).AddHours(-24)}
    Write-Output "Event ID $EventID ($($SecurityEvents[$EventID])): $($Events.Count) events"
}
```

### **2. PowerShell Logging Configuration**

**Enable Comprehensive PowerShell Logging**:
```powershell
# Enable PowerShell Script Block Logging
$RegPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging"
New-Item -Path $RegPath -Force
Set-ItemProperty -Path $RegPath -Name "EnableScriptBlockLogging" -Value 1

# Enable PowerShell Transcription
$RegPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\Transcription"
New-Item -Path $RegPath -Force
Set-ItemProperty -Path $RegPath -Name "EnableTranscripting" -Value 1
Set-ItemProperty -Path $RegPath -Name "OutputDirectory" -Value "C:\PowerShellLogs"
Set-ItemProperty -Path $RegPath -Name "EnableInvocationHeader" -Value 1

# Enable Module Logging
$RegPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging"
New-Item -Path $RegPath -Force
Set-ItemProperty -Path $RegPath -Name "EnableModuleLogging" -Value 1
```

### **3. Event Log Analysis Scripts**

**Detect Suspicious Activity**:
```powershell
# Function to detect potential brute force attacks
function Detect-BruteForce {
    param(
        [int]$ThresholdCount = 10,
        [int]$TimeWindowMinutes = 60
    )
    
    $StartTime = (Get-Date).AddMinutes(-$TimeWindowMinutes)
    $FailedLogons = Get-WinEvent -FilterHashtable @{
        LogName='Security'
        ID=4625
        StartTime=$StartTime
    }
    
    $GroupedEvents = $FailedLogons | Group-Object {$_.Properties[5].Value} | Where-Object {$_.Count -ge $ThresholdCount}
    
    foreach ($Group in $GroupedEvents) {
        Write-Warning "Potential brute force attack detected for user: $($Group.Name) - $($Group.Count) failed attempts"
    }
}

# Function to detect privilege escalation
function Detect-PrivilegeEscalation {
    $PrivEvents = Get-WinEvent -FilterHashtable @{
        LogName='Security'
        ID=4672
        StartTime=(Get-Date).AddHours(-24)
    }
    
    foreach ($Event in $PrivEvents) {
        $Username = $Event.Properties[1].Value
        $Privileges = $Event.Properties[2].Value
        
        if ($Privileges -match "SeDebugPrivilege|SeTakeOwnershipPrivilege|SeLoadDriverPrivilege") {
            Write-Warning "High-privilege access detected for user: $Username"
        }
    }
}

# Run detection functions
Detect-BruteForce
Detect-PrivilegeEscalation
```

---

## 🔍 System Monitoring and Forensics

### **1. Process Monitoring**

**Advanced Process Analysis**:
```powershell
# Monitor running processes with detailed information
function Get-ProcessDetails {
    Get-Process | Select-Object Name, Id, CPU, WorkingSet, StartTime, Path, Company, Description |
    Where-Object {$_.StartTime -gt (Get-Date).AddHours(-1)} |
    Sort-Object StartTime -Descending
}

# Monitor network connections
function Get-NetworkConnections {
    Get-NetTCPConnection | Where-Object {$_.State -eq "Established"} |
    ForEach-Object {
        $Process = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue
        [PSCustomObject]@{
            LocalAddress = $_.LocalAddress
            LocalPort = $_.LocalPort
            RemoteAddress = $_.RemoteAddress
            RemotePort = $_.RemotePort
            State = $_.State
            ProcessName = $Process.Name
            ProcessPath = $Process.Path
        }
    }
}

# Detect suspicious processes
function Find-SuspiciousProcesses {
    $SuspiciousIndicators = @(
        "powershell.*-enc",
        "cmd.*&.*&",
        "regsvr32.*http",
        "rundll32.*javascript",
        "wscript.*http"
    )
    
    foreach ($Indicator in $SuspiciousIndicators) {
        $Processes = Get-WmiObject -Class Win32_Process | Where-Object {$_.CommandLine -match $Indicator}
        foreach ($Process in $Processes) {
            Write-Warning "Suspicious process detected: $($Process.Name) - $($Process.CommandLine)"
        }
    }
}
```

### **2. File System Monitoring**

**Monitor Critical Directories**:
```powershell
# File system watcher for critical directories
$Watcher = New-Object System.IO.FileSystemWatcher
$Watcher.Path = "C:\Windows\System32"
$Watcher.Filter = "*.exe"
$Watcher.EnableRaisingEvents = $true

# Define event handler
$Action = {
    $Path = $Event.SourceEventArgs.FullPath
    $Name = $Event.SourceEventArgs.Name
    $ChangeType = $Event.SourceEventArgs.ChangeType
    $Timestamp = $Event.TimeGenerated
    
    Write-Output "$Timestamp - $ChangeType : $Path"
    
    # Log to security log
    Write-EventLog -LogName "Security" -Source "FileSystemMonitor" -EventId 1001 -Message "File system change detected: $ChangeType - $Path"
}

# Register event handlers
Register-ObjectEvent -InputObject $Watcher -EventName "Created" -Action $Action
Register-ObjectEvent -InputObject $Watcher -EventName "Changed" -Action $Action
Register-ObjectEvent -InputObject $Watcher -EventName "Deleted" -Action $Action
```

### **3. Registry Monitoring**

**Monitor Critical Registry Keys**:
```powershell
# Function to monitor registry changes
function Start-RegistryMonitoring {
    $RegPaths = @(
        "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
        "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce",
        "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
        "HKLM:\SYSTEM\CurrentControlSet\Services"
    )
    
    foreach ($Path in $RegPaths) {
        # Create WMI event query
        $Query = "SELECT * FROM RegistryKeyChangeEvent WHERE Hive='HKEY_LOCAL_MACHINE' AND KeyPath='$($Path.Replace('HKLM:\', ''))'"
        
        Register-WmiEvent -Query $Query -Action {
            $Event = $Event.SourceEventArgs.NewEvent
            Write-Warning "Registry change detected in: $($Event.KeyPath)"
            Write-EventLog -LogName "Security" -Source "RegistryMonitor" -EventId 2001 -Message "Registry modification: $($Event.KeyPath)"
        }
    }
}
```

---

## 🛠️ PowerShell Security Administration

### **1. Execution Policy Management**

**Configure PowerShell Security**:
```powershell
# Set execution policy to restricted for security
Set-ExecutionPolicy -ExecutionPolicy Restricted -Scope LocalMachine

# Configure constrained language mode
$env:__PSLockdownPolicy = "4"

# Enable PowerShell logging
$LoggingRegPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell"
New-Item -Path $LoggingRegPath -Force
Set-ItemProperty -Path $LoggingRegPath -Name "EnableScriptBlockLogging" -Value 1
Set-ItemProperty -Path $LoggingRegPath -Name "EnableScriptBlockInvocationLogging" -Value 1
```

### **2. Security Audit Functions**

**Comprehensive Security Audit Script**:
```powershell
function Invoke-SecurityAudit {
    Write-Output "=== Windows Security Audit Report ==="
    Write-Output "Generated: $(Get-Date)"
    Write-Output ""
    
    # Check UAC status
    $UAC = Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "EnableLUA"
    Write-Output "UAC Enabled: $($UAC.EnableLUA)"
    
    # Check Windows Defender status
    $Defender = Get-MpComputerStatus
    Write-Output "Windows Defender Enabled: $($Defender.AntivirusEnabled)"
    Write-Output "Real-time Protection: $($Defender.RealTimeProtectionEnabled)"
    
    # Check firewall status
    $Firewall = Get-NetFirewallProfile
    foreach ($Profile in $Firewall) {
        Write-Output "Firewall $($Profile.Name): $($Profile.Enabled)"
    }
    
    # Check for admin users
    $AdminUsers = Get-LocalGroupMember -Group "Administrators"
    Write-Output "Administrator Users:"
    foreach ($User in $AdminUsers) {
        Write-Output "  - $($User.Name)"
    }
    
    # Check running services
    $SuspiciousServices = @("Telnet", "RemoteRegistry", "SSDPSRV")
    foreach ($Service in $SuspiciousServices) {
        $ServiceStatus = Get-Service -Name $Service -ErrorAction SilentlyContinue
        if ($ServiceStatus) {
            Write-Output "Suspicious Service $Service: $($ServiceStatus.Status)"
        }
    }
    
    # Check network connections
    $ExternalConnections = Get-NetTCPConnection | Where-Object {
        $_.RemoteAddress -notmatch "^(127\.|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.)" -and
        $_.RemoteAddress -ne "::" -and
        $_.State -eq "Established"
    }
    
    Write-Output "External Network Connections: $($ExternalConnections.Count)"
    
    # Check recent security events
    $RecentSecurityEvents = Get-WinEvent -FilterHashtable @{
        LogName='Security'
        ID=4625,4624,4672
        StartTime=(Get-Date).AddHours(-24)
    }
    Write-Output "Security Events (24h): $($RecentSecurityEvents.Count)"
}

# Run the audit
Invoke-SecurityAudit
```

---

## 🔒 Active Directory Security

### **1. AD Security Assessment**

**Domain Security Checks**:
```powershell
# Import Active Directory module
Import-Module ActiveDirectory

# Check for privileged accounts
function Get-PrivilegedAccounts {
    $PrivilegedGroups = @(
        "Domain Admins",
        "Enterprise Admins",
        "Schema Admins",
        "Administrators"
    )
    
    foreach ($Group in $PrivilegedGroups) {
        $Members = Get-ADGroupMember -Identity $Group -Recursive
        Write-Output "=== $Group ==="
        foreach ($Member in $Members) {
            $User = Get-ADUser -Identity $Member.SamAccountName -Properties LastLogonDate, PasswordLastSet
            Write-Output "  $($User.Name) - Last Logon: $($User.LastLogonDate)"
        }
    }
}

# Check password policy
function Get-PasswordPolicy {
    $DefaultPolicy = Get-ADDefaultDomainPasswordPolicy
    Write-Output "=== Domain Password Policy ==="
    Write-Output "Minimum Password Length: $($DefaultPolicy.MinPasswordLength)"
    Write-Output "Password Complexity: $($DefaultPolicy.ComplexityEnabled)"
    Write-Output "Maximum Password Age: $($DefaultPolicy.MaxPasswordAge.Days) days"
    Write-Output "Lockout Threshold: $($DefaultPolicy.LockoutThreshold)"
    Write-Output "Lockout Duration: $($DefaultPolicy.LockoutDuration.Minutes) minutes"
}

# Find inactive accounts
function Get-InactiveAccounts {
    param([int]$DaysInactive = 90)
    
    $InactiveDate = (Get-Date).AddDays(-$DaysInactive)
    $InactiveUsers = Get-ADUser -Filter {LastLogonDate -lt $InactiveDate -and Enabled -eq $true} -Properties LastLogonDate
    
    Write-Output "=== Inactive User Accounts (>$DaysInactive days) ==="
    foreach ($User in $InactiveUsers) {
        Write-Output "  $($User.Name) - Last Logon: $($User.LastLogonDate)"
    }
}
```

### **2. Group Policy Security Settings**

**Security GPO Settings**:
```powershell
# Check applied group policies
function Get-AppliedGPOs {
    $GPResult = gpresult /r /scope:computer
    Write-Output "Applied Group Policies:"
    $GPResult | Select-String "Applied Group Policy Objects"
}

# Audit security settings
function Get-SecuritySettings {
    # Export security settings
    secedit /export /cfg "C:\temp\security_config.inf"
    
    # Parse important settings
    $SecurityConfig = Get-Content "C:\temp\security_config.inf"
    
    $ImportantSettings = @(
        "MinimumPasswordAge",
        "MaximumPasswordAge",
        "MinimumPasswordLength",
        "PasswordComplexity",
        "LockoutBadCount"
    )
    
    foreach ($Setting in $ImportantSettings) {
        $Value = $SecurityConfig | Select-String $Setting
        Write-Output $Value
    }
}
```

---

## 📈 Performance and Security Monitoring

### **1. System Performance Metrics**

**Performance Monitoring Script**:
```powershell
function Get-SystemMetrics {
    # CPU Usage
    $CPU = Get-Counter '\Processor(_Total)\% Processor Time' -SampleInterval 1 -MaxSamples 5
    $AvgCPU = ($CPU.CounterSamples | Measure-Object CookedValue -Average).Average
    
    # Memory Usage
    $Memory = Get-Counter '\Memory\Available MBytes'
    $TotalMemory = (Get-WmiObject -Class Win32_ComputerSystem).TotalPhysicalMemory / 1MB
    $MemoryUsage = (($TotalMemory - $Memory.CounterSamples[0].CookedValue) / $TotalMemory) * 100
    
    # Disk Usage
    $Disk = Get-Counter '\LogicalDisk(C:)\% Free Space'
    $DiskFree = $Disk.CounterSamples[0].CookedValue
    
    # Network Usage
    $Network = Get-Counter '\Network Interface(*)\Bytes Total/sec'
    $NetworkUsage = ($Network.CounterSamples | Measure-Object CookedValue -Sum).Sum
    
    Write-Output "=== System Performance Metrics ==="
    Write-Output "CPU Usage: $([math]::Round($AvgCPU, 2))%"
    Write-Output "Memory Usage: $([math]::Round($MemoryUsage, 2))%"
    Write-Output "Disk Free Space: $([math]::Round($DiskFree, 2))%"
    Write-Output "Network Throughput: $([math]::Round($NetworkUsage / 1MB, 2)) MB/s"
}
```

### **2. Automated Incident Response**

**Incident Response Script**:
```powershell
function Invoke-IncidentResponse {
    param(
        [string]$IncidentType,
        [string]$AffectedSystem
    )
    
    $Timestamp = Get-Date
    $LogFile = "C:\Logs\IncidentResponse_$($Timestamp.ToString('yyyyMMdd_HHmmss')).log"
    
    switch ($IncidentType) {
        "Malware" {
            # Isolate system
            Disable-NetAdapter -Name "*" -Confirm:$false
            Write-Output "$Timestamp - Network isolation activated" | Tee-Object -FilePath $LogFile -Append
            
            # Stop suspicious processes
            $SuspiciousProcesses = Get-Process | Where-Object {$_.CPU -gt 80}
            foreach ($Process in $SuspiciousProcesses) {
                Stop-Process -Id $Process.Id -Force
                Write-Output "$Timestamp - Stopped process: $($Process.Name)" | Tee-Object -FilePath $LogFile -Append
            }
            
            # Run antivirus scan
            Start-MpScan -ScanType FullScan
            Write-Output "$Timestamp - Full antivirus scan initiated" | Tee-Object -FilePath $LogFile -Append
        }
        
        "BruteForce" {
            # Block source IP
            $FailedLogons = Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4625; StartTime=(Get-Date).AddMinutes(-10)}
            $SourceIPs = $FailedLogons | ForEach-Object {$_.Properties[19].Value} | Group-Object | Where-Object {$_.Count -gt 5}
            
            foreach ($IP in $SourceIPs) {
                New-NetFirewallRule -DisplayName "Block_$($IP.Name)" -Direction Inbound -RemoteAddress $IP.Name -Action Block
                Write-Output "$Timestamp - Blocked IP: $($IP.Name)" | Tee-Object -FilePath $LogFile -Append
            }
        }
        
        "DataExfiltration" {
            # Monitor large file transfers
            $LargeTransfers = Get-EventLog -LogName System | Where-Object {$_.EventID -eq 1 -and $_.Message -match "large file"}
            Write-Output "$Timestamp - Monitoring large file transfers" | Tee-Object -FilePath $LogFile -Append
            
            # Block external connections
            New-NetFirewallRule -DisplayName "Block_External" -Direction Outbound -RemoteAddress "Internet" -Action Block
            Write-Output "$Timestamp - External connections blocked" | Tee-Object -FilePath $LogFile -Append
        }
    }
}
```

---

## 🎯 Best Practices Summary

### **1. Security Hardening Checklist**

- [ ] Enable and configure UAC
- [ ] Configure Windows Firewall with strict rules
- [ ] Disable unnecessary services
- [ ] Enable comprehensive logging
- [ ] Implement strong password policies
- [ ] Regular security updates
- [ ] Monitor critical system areas
- [ ] Implement least privilege access

### **2. Monitoring and Response**

- [ ] Continuous event log monitoring
- [ ] Real-time process monitoring
- [ ] Network connection analysis
- [ ] File system integrity checking
- [ ] Registry change detection
- [ ] Automated incident response procedures

### **3. PowerShell Security**

- [ ] Restrict execution policy
- [ ] Enable script block logging
- [ ] Implement constrained language mode
- [ ] Monitor PowerShell usage
- [ ] Regular security audits

---

## 💡 Key Takeaways

1. **Defense in Depth**: Implement multiple layers of security controls
2. **Continuous Monitoring**: Maintain visibility into system activities
3. **Incident Response**: Prepare automated response procedures
4. **Regular Audits**: Conduct periodic security assessments
5. **Proper Logging**: Enable comprehensive logging for forensic analysis

---

## 📚 References and Tools

- [Microsoft Security Compliance Toolkit](https://www.microsoft.com/en-us/download/details.aspx?id=55319)
- [Windows Security Baselines](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-security-baselines)
- [PowerShell Security Best Practices](https://docs.microsoft.com/en-us/powershell/scripting/security/overview)
- [Sysmon Configuration](https://github.com/SwiftOnSecurity/sysmon-config)

---

**About the Author**: Yusuf Talha ARABACI is a SOC Analyst with extensive experience in Windows system administration and security. He specializes in endpoint security, incident response, and PowerShell automation for security operations.

---

[← Back to Blog](./README.md) | [Previous: Network Security Basics ←](./network-security-basics.md)
