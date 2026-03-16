---
date: '2024-11-05'
draft: false
title: Debian ELK Stack (Elasticsearch, Logstash and Kibana) Installation and Configuration
---

---

### Debian ELK Stack (Elasticsearch, Logstash and Kibana) Installation and Configuration

![](https://cdn-images-1.medium.com/max/800/1*0wM3nsUfgol-TsAFYBZJzQ.png)

Hello, in this article, I will explain the installation and configuration of ELK Stack on Debian-based Linux distributions.

### What is ELK Stack ?

ELK Stack is an open source platform frequently used in log management and analysis. It consists of three main components that make up its name: Elasticsearch, Logstash and Kibana.

![](https://cdn-images-1.medium.com/max/800/1*Bp8Ab2mZiMAygbxDYEqFmQ.png)

ELK Stack

* **Elasticsearch:** It is a search and analysis engine used to store, index and quickly search large amounts of structured and unstructured data. In addition to log data, it can also index data from various sources.
* **Logstash:** It is a tool that manages data collection, processing and transformation processes. It collects data from different sources (system logs, application logs, network traffic, etc.), filters, enriches it and sends it to Elasticsearch.
* **Kibana:** A tool used to visualize data stored in Elasticsearch. It enables drawing meaningful conclusions from data by creating interactive dashboards, graphs and maps.

Installation order of Elastic Stack products:  
 1- **Elasticsearch**  
 2- **Kibana**  
 3- **Logstash**

First, we need to prepare the environment in which we will install. For this we need to have an operating system.

### What is Debian?

Debian was started in 1993 and was prepared by volunteers in various parts of the world; GNU/Hurd is a completely free Linux distribution based on different kernel options like GNU/Linux. Some popular debian based linux distributions:

* **Ubuntu**
* **PureOS**
* **antix**
* **Deep**
* **PopOS**!
* **MX Linux**
* **Linux Mint**
* **Kali Linux**
* **Pardus**

We have listed some members of the Debian family here. Apart from this, you can also install the ELK stack on **Windows**, **Macos** or **Redhat** based or other independent Linux distributions. In this article, I will install on an **ubuntu** machine. However, the same installation steps are valid for other Debian-based distributions.

---

### 1- Preliminary Preparation

First, let's look at the information of the system we will install and make sure that the distribution is the latest version for security reasons.

![](https://cdn-images-1.medium.com/max/800/1*pw90BcHIGlE5VaK1ZZuUVw.png)

Version information of the Ubuntu distribution I installed.

I named my current server "elastic" as the hostname and created an authorized user named "superman".

Then let's make updates to our system. Performing these updates before each installation allows us to minimize possible errors caused by dependencies.

> sudo apt update && sudo apt upgrade

![](https://cdn-images-1.medium.com/max/800/1*RmnuJn-ue_IxM-v_HVKbiw.png)

Package updates

Finally, we need to make sure that our machine has enough resources. So it must have enough disk, ram and CPU. This will vary depending on your needs.

---

### 2- **Elasticsearch Installation**

To install Elasticsearch, we first need to download the Debian package.

![](https://cdn-images-1.medium.com/max/800/1*AceB4HkqR-_Vhu5jPvDkiw.png)

Downloading process of elasticsearch debian package with wget

```
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.15.3-amd64.deb
```

We can download using the wget tool.

Then, let's perform the installation process with dpkg, which is the package installation tool of Debian. We need root authority for installation.

![](https://cdn-images-1.medium.com/max/800/1*juhgX_jliDWJaXNGhR2_RA.png)

Elasticsearch installation

```
sudo dpkg -i elasticsearch-8.15.3-amd64.deb
```

At the end of the installation, it offers us suggestions on how to continue the installation.

![](https://cdn-images-1.medium.com/max/800/1*9iK82eWFRbtdDSDV_HxY1A.png)

Post-installation steps

From here, let's continue with the post-installation steps. First, let's start our service.

```
sudo systemctl daemon-reload  
sudo systemctl enable elasticsearch.service  
sudo systemctl start elasticsearch.service
```

We can obtain information about the status of the service by using the journalctl command.

![](https://cdn-images-1.medium.com/max/800/1*iiD9Azwdmg2h8zAxXbyjsg.png)

Service status review with journalctl

Now, the password of the user “elastic”, which is the default authorized user that allows us to access the elasticsearch interface, is set.Let's reset it. Here we can give the password we want.

```
sudo /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic -i
```

![](https://cdn-images-1.medium.com/max/800/1*5z1Fz-4kByoU9dcWfWWOiQ.png)

elastic user password reset

Now it is time to generate the token that we will use in the Kibana connection.

```
sudo /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```

![](https://cdn-images-1.medium.com/max/800/1*J94WTHXjHFlwjNDD7PQXbg.png)

Generating tokens for kibana connection

We must store this token carefully. We will use it to connect to Kibana in the future.

Finally, we need to open the elasticsearch port on our system's firewall.

```
sudo ufw allow 9200
```

![](https://cdn-images-1.medium.com/max/800/1*HyY2hwiWpzI2Nq7KMoOY_A.png)

Firewall port opening process

Now our system broadcasts the elasticsearch service to the network it is located on. We can access it via browser.

> https://<host-ip>:9200

![](https://cdn-images-1.medium.com/max/800/1*DKO6wjEJvGNu288erqcVww.png)

Access via browser

Here, you can access elasticsearch by entering elastic as the username and the password you determined in the previous steps as the password.

---

### 2- Kibana Installation

To install Kibana, we first need to download the Debian package.

![](https://cdn-images-1.medium.com/max/800/1*86bu_iqDIMsOtPeqFpDM9Q.png)

Downloading process of elasticsearch debian package with wget

```
wget https://artifacts.elastic.co/downloads/kibana/kibana-8.15.3-amd64.deb
```

We can download using the wget tool.

Then, let's perform the installation process with dpkg, which is the package installation tool of Debian. We need root authority for installation.

![](https://cdn-images-1.medium.com/max/800/1*3mmYQBaOZcZ5dL7QllEQjw.png)

Kibana installation

```
sudo dpkg -i kibana-8.15.3-amd64.deb
```

After the installation is completed, we can start kibana configurations. To do this, we open Kibana's configuration file with nano.

```
sudo nano /etc/kibana/kibana.yml
```

![](https://cdn-images-1.medium.com/max/800/1*2wmFBqMb-196gT4FAxSJHQ.png)

kibana.yml file

Here I will only show the areas that need to be changed.

![](https://cdn-images-1.medium.com/max/800/1*xXYvST90ltTvpnbTtpGllw.png)

server.port

Delete the # sign in front of the server.port field and write the port you want the Kibana service to run on in quotes. By default it is 5601.

![](https://cdn-images-1.medium.com/max/800/1*lh2yAPGIeDqfd3g6q1yqXA.png)

server.host

Delete the # sign in front of the server.host field and write the IP address of your own system in quotes.

![](https://cdn-images-1.medium.com/max/800/1*QDnnLo2LEY-j6UHLc3H2tg.png)

server.name

Delete the # sign in front of the server.name field and write your own system's hostname in quotes. I wrote it because mine was "elastic".

![](https://cdn-images-1.medium.com/max/800/1*nIirHOJJZRFIMoT2nfCv6Q.png)

elasticsearch.hosts

The elasticsearch service that kibana will connect to. Since I installed this service on the same machine, localhost can remain. If it was a different host, I would have to write its IP. Also, let's not forget to change the initial protocol to "https".

![](https://cdn-images-1.medium.com/max/800/1*qTZgYDVXyheJ8YX8firPEg.png)

elasticsearch token link

kibana offers 2 ways to authenticate the elasticsearch connection. One of these is verification with username and password, and the other is verification with the token we will use. If you remember, we created a token during the elasticsearch installation. We enter this token between quotation marks.

![](https://cdn-images-1.medium.com/max/800/1*Gsnn46-BQ3AWc43sEMAiHQ.png)

ssl.verification

Since the certificate used by elasticsearch is self-signed, it has not been verified by any authority. This causes us to receive an SSL verification error when connecting to Kibana. To avoid this error, we set the ssl.verification field to “none”. Or you can install a verified ssl certificate.

That's basically all we need to configure. You can review Kibana's documentation to set other fields. I'm sticking with the default configurations for the rest.

Now let's start our service.

```
sudo systemctl daemon-reload  
sudo systemctl enable kibana.service  
sudo systemctl start kibana.service
```

We can obtain information about the status of the service by using the journalctl command.

![](https://cdn-images-1.medium.com/max/800/1*1_rsonaVsKsxze1R0baGYg.png)

kibana service startthrowing away

Finally, we open the 5601 port used by Kibana through the system firewall.

```
sudo ufw allow 5601
```

![](https://cdn-images-1.medium.com/max/800/1*A37mSKxxkscotaC3ebJnrQ.png)

Port Opening Process

You can now access the kibana panel via your browser.

> https://<host-ip>:5601/

It may take a while for Kibana to stand up.

![](https://cdn-images-1.medium.com/max/800/1*RyBvS-VDY3UCca5O0DYwVw.png)

kibana panel

Our Kibana panel has appeared. You can log in to this panel with the “elastic” user. Let's continue the installations.

---

### 3- Logstash Installation

To install Logstash, we first need to download the Debian package.

![](https://cdn-images-1.medium.com/max/800/1*tA9E8Yt9URg678EjB31jxw.png)

Downloading logstash package with wget

```
wget https://artifacts.elastic.co/downloads/logstash/logstash-8.15.3-amd64.deb
```

Then, let's perform the installation process with dpkg, which is the package installation tool of Debian. We need root authority for installation.

![](https://cdn-images-1.medium.com/max/800/1*NjLTqnfQa1SiyzhxR9iD4A.png)

logstash installation process

```
sudo dpkg -i logstash-8.15.3-amd64.deb
```

After the installation is completed, we can start configurations.

First, let's give the password to the logstash\_system user for the elasticsearch connection. don't forget this password

```
sudo /usr/share/elasticsearch/bin/elasticsearch-reset-password -u logstash_system -i
```

![](https://cdn-images-1.medium.com/max/800/1*9DZhN0vdF_SVqx7PQ7XzjA.png)

logstash\_system user password setting

Then let's open the logstashin configuration file and edit it.

```
sudo nano /etc/logstash/logstash.yml
```

![](https://cdn-images-1.medium.com/max/800/1*mxiT9gqvMZzk0-UAUrdVDg.png)

logstash.yml file

Do not forget to enclose the string values we provide in this file in quotes.

Now we can start the logstash service.

![](https://cdn-images-1.medium.com/max/800/1*4dOXa3frSYz4B_PZ4kpjYA.png)

starting logstash service

```
sudo systemctl daemon-reload  
sudo systemctl enable logstash.service  
sudo systemctl start logstash.service
```

Finally, we open the 5044 port, which is the default port of logstashin, in our system.

![](https://cdn-images-1.medium.com/max/800/1*Dx8ZAvD-yDQbhtg8LI0-RQ.png)

Port opening process

```
sudo ufw allow 5044
```

We cannot access Logstashe through a browser like elasticsearch or kibana. Because logstash receives and queues logs from port 5044. So it doesn't give any answer.

Let's configure our first pipeline!

![](https://cdn-images-1.medium.com/max/800/1*DXhxcdqUi6XyHxgqB8Zonw.png)

```
/usr/share/logstash/bin/logstash -e 'input { stdin { } } output { stdout {} }'
```

![](https://cdn-images-1.medium.com/max/800/1*Kk9b336oR1cUIE-FWJPYfA.png)

Creating a logstash pipeline

![](https://cdn-images-1.medium.com/max/800/1*T-DI81u4d3jc5zpCW_tX9A.png)

Ready for input

Our pipeline is listening and ready for logs coming to port 5044.

You can parse your logs by writing various parsers with logstash.

---

In this article, I mentioned the ELK stack installation. In my next article, I will talk about sending logs to ELK, agent installation and log parceling. You can follow me to be informed about the articles I publish.