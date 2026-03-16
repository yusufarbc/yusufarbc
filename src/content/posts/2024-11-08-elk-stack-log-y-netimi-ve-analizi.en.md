---
title: "ELK Stack Log Management and Analysis"
date: 2024-11-08
draft: false
---

---

### ELK Stack Log Management and Analysis

![](https://cdn-images-1.medium.com/max/800/1*O7bMqTbQv_OX5x75qkY6Ug.png)

Hello, in this article, I will talk about the log management of ELK Stack, which we installed in my last article, namely log collection, parsing and enrichment processes. How to Collect, Process and Send Logs with Logstash?

### What is Log Management?

**Log management** is the process of collecting, storing, analyzing and managing all log records (logs) produced by a system or application. These logs contain important information about the operation of the system and are used in many areas such as troubleshooting, security analysis, and performance monitoring.

Log collection methods with ELK Stack (Elasticsearch, Logstash, Kibana):

1. **Syslog**: With this protocol, which is common in UNIX-based systems, logs can be collected via Logstash or Beats.
2. **Beats**: Provides different tools for log collection. **Metricbeat** collects performance metrics, while **Winlogbeat** collects Windows events. **Heartbeat** monitors the status of the servers. .**Filebeat** collects log files from file systems and sends this data to Logstash or Elasticsearch. Each requires separate installation.
3. **Agent Installation**: Agents are installed on systems that are log sources (servers, network devices, etc.) and these agents send data to Logstash or Beats.

**Agent Installation Advantages:**

1. **Central Management**: Provides a central point to collect and manage log data. This makes it easier to store and analyze log data in an organized manner.
2. **Real-Time Monitoring**: Agents can monitor events in real-time and provide instant reporting. This allows detecting anomalies quickly.
3. **Customizability**: Agents can be configured according to specific requirements. You can apply various rules and filters to collect and transform log data from different sources.
4. **Enhanced Security**: Agents support encryption protocols to ensure secure transmission of log data.
5. **Performance Monitoring**: Agents can be used to monitor system performance and detect performance issues.

**Agent Installation Disadvantages:**

1. **Resource Usage**: Agents may consume resources on the systems where they are installed. This can cause performance issues, especially in high-density systems.
2. **Management Complexity**: Managing multiple agents can be complex, especially in large-scale systems. Updating and managing each agent can be time-consuming.
3. **Security Risks**: Misconfigured agents can cause security vulnerabilities. Therefore, it is important to configure and manage agents securely.
4. **Compatibility Issues**: Compatibility issues may occur between different systems and platforms. Some agents may not have full functionality on certain systems.

In this article, we will send logs with beats and collect logs with logstash from a Linux system.

---

### 1- Logstash Configuration

Logstash is easier to understand when you imagine it as a pipeline. At one end of this pipeline are **inputs** that represent data sources. As log records pass through the Logstash pipeline, they can be enriched, filtered or manipulated based on your needs. Ultimately, when they reach the end of the pipeline, Logstash can deliver these logs to configured destinations for storage or analysis.

![](https://cdn-images-1.medium.com/max/800/1*sf3D7DyNWppst-cVl_z42g.png)

Logstash Pipeline

To create this data processing pipeline, you can configure Logstash using a configuration file. A typical logstash configuration file:

```
input {  
      plugin_name{...}  
 }  
  
filter {  
     plugin_name{...}  
}  
  
out {  
     plugin_name{...}  
}
```

Now let's examine these components:

* `input`: represents log sources such as files or endpoints.
* `filter`(optional): merges and transforms log records.
* `output`: destination to which the processed logs will be delivered.

These inputs, filters, and outputs need plug-ins to fulfill their roles. These plugins are the building blocks that power Logstash and enable it to perform a wide variety of tasks. Let's review these plugins to give you a better understanding of Logstash's capabilities.

### Logstash input plugins

Logstash for inputs,Provides input plugins(https://www.elastic.co/guide/en/logstash/current/input-plugins.html) that can collect logs from various sources such as:

* [HTTP](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-http.html): Retrieves logs via HTTP endpoints.
* [Beats](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-beats.html): Collects logs from the Beats framework.
* [Redis](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-redis.html): collects log records from a Redis instance.
* [Unix](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-unix.html): read logs through a Unix socket.

### Logstash filter plugins

When you want to manipulate, enrich or replace logs, some of the filter [plugins](https://www.elastic.co/guide/en/logstash/current/plugins-filters-elasticsearch.html) here can help you do so:

* [JSON](https://www.elastic.co/guide/en/logstash/current/plugins-filters-json.html): Parses JSON logs.
* [Grok](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html): parses and structures log data.
* [I18n](https://www.elastic.co/guide/en/logstash/current/plugins-filters-i18n.html): removes special characters from your log records.
* [Geoip](https://www.elastic.co/guide/en/logstash/current/plugins-filters-geoip.html): adds geographic information.

### Logstash output plugins

After processing the data, the following [output](https://www.elastic.co/guide/en/logstash/current/output-plugins.html) plugins may be useful:

* [WebSocket](https://www.elastic.co/guide/en/logstash/current/plugins-outputs-websocket.html): forward logs to a WebSocket endpoint.
* [S3](https://www.elastic.co/guide/en/logstash/current/plugins-outputs-s3.html): send log records to Amazon Simple Storage Service (Amazon S3).
* [Syslog](https://www.elastic.co/guide/en/logstash/current/plugins-outputs-syslog.html): forward logs to a Syslog server.
* [Elasticsearch](https://www.elastic.co/guide/en/logstash/current/plugins-outputs-elasticsearch.html): pass log entries to Elasticsearch, which is part of the Elastic stack.

To set up the logstash pipeline, create a configuration file in the `etc/logstash/conf.d` directory.

```
sudo nano /etc/logstash/conf.d/logstash.conf
```

We will transfer logs with beats. Our configuration file for this is:

```
# Sample Logstash configuration for creating a simple  
# Beats -> Logstash -> Elasticsearch pipeline.  
  
input {  
  beats {  
    port => 5044  
  }  
}  
  
filter {  
  grok {  
    # Match nginx headers  
    match => {  
      "message" => '%{IP:client_ip} - - \[%{HTTPDATE:access_time}\] "%{WORD:http_method} %{URIPATH:request_page} HTTP/%{NUMBER:http_version}" %{NUMBER:response_code} %{NUMBER:response_size} "-" "%{GREEDYDATA:user_agent}"'  
    }  
  }  
  }  
  
out {  
  elasticsearch {  
    hosts => ["https://<host-ip>:9200"]  
    index => "filebeat-test-%{+YYYY.MM.dd}"  
    ssl => true  
    ssl_certificate_verification => false  
    user => "elastic"  
    password => "changeme"  
  }  
} beats { port => 5044 } } filter { grok { # Match nginx headers match => { "message" => '%{IP:client_ip} - - \[%{HTTPDATE:access_time}\] "%{WORD:http_method} %{URIPATH:request_page} HTTP/%{NUMBER:http_version}" %{NUMBER:response_code} %{NUMBER:response_size} "-" "%{GREEDYDATA:user_agent}"' } } } output { elasticsearch { hosts => ["https://192.168.1.100:9200"] index => "filebeat-test-%{+YYYY.MM.dd}" ssl => true ssl_certificate_verification => false user => "elastic" password => "123456" } }
```

In this file, you need to write the password of your own “elastic” user in the password field.

I used the grok plugin as a filter on Logstash. grok is a very good parser plugin. We will be parsing our incoming logs on Logstash with the grok plugin.

Now change ownership of directory `/usr/share/logstash/data` to user `logstash`:

![](https://cdn-images-1.medium.com/max/800/1*AQQWHHMHTuYtBxAsZ0DWzg.png)

Changing ownership of Logstash data directory

```
sudo chown -R logstash:logstash /usr/share/logstash/data
```

Now start Logstash by passing the path to the configuration file:

```
sudo -u logstash /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/logstash.conf
```

![](https://cdn-images-1.medium.com/max/800/1*IN4dRRoxrItJa5eUNsAFqw.png)

Starting logstashi

When you start it with the Logstash configuration file, if there are no errors, you will receive a message that the pipeline is listening and ready.

![](https://cdn-images-1.medium.com/max/800/1*eGddI0ws1vfegy_IhfJl_w.png)

Pipeline listening

![](https://cdn-images-1.medium.com/max/800/1*j93RhXtzHMuobzrXoKpjDQ.png)

Logstash Service Status

Now our pipilen is ready. Our service is up and running. We can move on to the next step.

### 2- Beats Configuration

We will use the beats tool to send logs via clients to our Logstash service running on our ELK server. By installing beats on client systems, we can send logs from the systems.

Each Beat is a separately installable product:

* [Auditbeat](https://www.elastic.co/guide/en/beats/auditbeat/8.15/auditbeat-installation-configuration.html)
* [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/8.15/filebeat-installation-configuration.html)
* [Heartbeat](https://www.elastic.co/guide/en/beats/heartbeat/8.15/heartbeat-installation-configuration.html)
* [Metricbeat](https://www.elastic.co/guide/en/beats/metricbeat/8.15/metricbeat-installation-configuration.html)
* [Packetbeat](https://www.elastic.co/guide/en/beats/packetbeat/8.15/packetbeat-installation-configuration.html)
* [Winlogbeat](https://www.elastic.co/guide/en/beats/winlogbeat/8.15/winlogbeat-installation-configuration.html)

As you can see, there are many beat products. Let's use the **filebeat** product to send the log files in our system.

We start the installation on our client system. I will continue with my same system. The server on which I installed my ELK system will also be my client.

```
wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.15.3-amd64.deb  
sudo dpkg -i filebeat-8.15.3-amd64.deb
```

![](https://cdn-images-1.medium.com/max/800/1*h8EWICxmNAUUwQgfbizXjQ.png)

Filebeat installation

After downloading and installing Filebeat, we proceed to the configuration process.

```
sudo nano /etc/filebeat/filebeat.yml
```

![](https://cdn-images-1.medium.com/max/800/1*CigAmS2AF5tsJWQYLetpkg.png)

Elasticsearch Output

Since we will direct our output to logstashe, we close the elasticsearch section with a square sign.

![](https://cdn-images-1.medium.com/max/800/1*Hnz7Cpp4QzquIrc10rjBdQ.png)

Logstash Output

In the Logstash section, we enter the IP and port number of our Logstash server.

![](https://cdn-images-1.medium.com/max/800/1*MBSKQNv8BjcCL-dWN4oZCg.png)

Log Collection Configuration

In the Paths section, we can configure the logs that our beat will collect. By default, it collects log files under the /var/log/ directory. For more, we can add the logs of important services (WEB, DNS, DHCP, etc.) running on our server to this section.

When our configuration settings are completed, we can save the file and exit.

Now it's time to start our filebeat.

```
sudo systemctl daemon-reload  
sudo systemctl enable filebeat.service  
sudo systemctl start filebeat.service
```

![](https://cdn-images-1.medium.com/max/800/1*5fkN3mf3RSkcR8i5pj_eXg.png)

Filebeat Service Status

We have now completed our filebeat configuration and started our service. Our service is up and running.

You can install and configure other beats products in a similar way.

---

### 3- Kibana Configuration

We have completed our Logstash and Filebeat installations. Now let's open our kibana interface. Then let's enter the elasticsearch section. Let's check if our index has arrived in the Indicies area.

![](https://cdn-images-1.medium.com/max/800/1*Y2bco0zQhKvUxE1T2mvOxw.png)

Kibana Interface

We can see our incoming index in this interface. Now let's go to the “Discover” section.

![](https://cdn-images-1.medium.com/max/800/1*t9aAyIPyNRzcWZK7wsbouA.png)

Discover Panel

We will create a new data view by clicking the Create Data View button.

![](https://cdn-images-1.medium.com/max/800/1*oDaljym5JgsWwDuNrK5cjg.png)

Creating a Data View

Give it a name and select the index pattern, you may want to name it filebeat\* as you want the filebeat directory despite the time it was created, if you select filebat-test-2023.10.03\* only one directory will be loaded and the new directory will not be able to receive real time data as it will be under different data. Therefore, you should avoid it.

After saving the Data View, logs should appear in the discover panel. If it hasn't arrived, there is a problem.

![](https://cdn-images-1.medium.com/max/800/1*yXjPbz-6CYRJekTkqSvHwQ.png)

Discover Panel

We can now perform log search from this panel.

---

In this article, we added a log source to our ELK system. We parsed the logs and sent them to elasticsearch. We made the necessary configurations in the Kibana interface.