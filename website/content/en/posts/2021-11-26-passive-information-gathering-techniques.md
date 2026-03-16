---
date: '2021-11-26'
description: Hello, in this article that we prepared with my teacher Mehmet Bulut, we will talk about Passive Information Gathering Techniques.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/0*2NsHt2LZX3ORPYxb.jpg
layout: single
title: Passive Information Gathering Techniques
type: posts
---

Hello, in this article that we prepared with my teacher Mehmet Bulut, we will talk about Passive Information Gathering Techniques.

### What is Passive Information Collection?

Passive Information Collection is a type of information collection that is done without direct contact with the target. For example; Asking questions to the person next to you about someone sitting across from you is passive information gathering.

In penetration tests, first information about the system is collected and classified. Most of this information is available on the internet. Apart from this, different information collection methods can also be used.

### Information Gathering Techniques via IP and Domain Names

With the Whois query, we can access information about the owner of a domain or IP address. These; Information such as IP ranges about the target, the responsible administrator and the e-mail addresses of these administrators.

IP address and domain name distribution around the world is managed from a single center. Apart from this main center called [ICANN](https://www.icann.org/)(Internet Corporation for Assigned Named and Numbers), five different RIRs; In other words, there is a regional internet logger.

Whois queries can be made through these RIRs. If the queried IP address is not under the control of the RIR we queried, it will give you the information of the relevant RIR.

You can also learn the information about an IP address from the Linux terminal screen.

It is a web page that can display information about the operating system hosting the queried IP address or domain name, kernel version, software running as a web service, and even uptime information. Netcraft queries the target system and makes predictions based on the answers returned.

We can access the relevant site at [www.netcraft.com](http://www.netcraft.com).

Shodan is a search engine that helps find various services and applications around the world. Although its name is a search engine, it differs from other search engines due to the work it does. While other search engines cannot answer the question "We want to find servers using nginx?", Shodan can answer this question.

Shoda has many features. The most effective of these is that it can record the data obtained with the "banner grabbing" technique and return results to you with various filters.

We can search for countries, cities, service providers, services, versions and platforms on Shodan.

We can access the relevant site at [www.shodan.io](https://www.shodan.io).

### DNSdumpster

DNSdumpster is a free passive information gathering tool that can discover host servers associated with a domain. Finding servers that are visible from the attackers' perspective is an important part of the security assessment process.

We can access the relevant site at [www.dnsdumpster.com](http://dnsdumpster.com).

### Centralops

IP, detailed whois information, DNS records and TcpQuery information of a domain on the centralops address are obtained. In the Nslookup section, very advanced DNS queries can be made. It is among the indispensable sites for passive information collection.

We can access the relevant site at [www.centralops.net](http://www.centralops.net).

### IP Location

It provides geographical location detection by querying the target IP address in 5 different RIRs. The results of this query may vary between service providers.

We can access the relevant site at [www.iplocation.net](https://www.iplocation.net/).

### Archive Sites

It is a system that has been recording the entire internet since 1996. It brings up that snapshot of pages by year, month, day. Useful for finding previous versions of a website.

We can access the relevant site at [www.archive.org](http://www.archive.org).

Maltego is a tool that allows us to analyze and visualize the data found through open sources. As shown in the example below, when we write the name of a website and run it to query, it shows many data such as DNS, mail server, nameserver addresses registered to this name. In addition to these procedures

* Subdomains and public IP addresses
* Usernames and passwords
* Directory list
* Publicly sensitive documents and files
* You can access information such as leaked identity information.

### Information Gathering Techniques via Username

### Name Checkup

Name Checkup is a simple tool that helps us find out on which other platforms the given username is used..

We can access the relevant site at [www.namecheckup.com](https://namecheckup.com/).

### Username Search

Another tool where we can find out which platforms usernames are used is Instant Username Search. It can search on more platforms than Name CheckUp.

We can access the relevant site at [www.instantusername.com](https://instantusername.com/#/).

### Information Gathering Techniques Through Images

### Image Search

It is a search engine technology that uploads an image file and returns similar images and results related to the image. By making a reverse image:

* The source of an image
* Whether it has been installed before
* Whether it is under copyright or not
* Features of products or objects we do not know
* Identifying the actual source of images that cause disinformation

We can use it in situations. The most commonly used Image Search Engines are [Google](https://www.google.com/imghp) and [TinyEye](https://tineye.com/).

Exif is where the data about the photo is located. This section contains a lot of information such as the place, date and time where the photo was taken. The most commonly used tools to collect this information are [ExifTool](https://exiftool.org/) and [Jeffrey's Image Metadata Viewer](http://exif.regex.info/exif.cgi).

### General Information Gathering Techniques

### Google Hacking

Google Hacking is an information gathering technique with parameters that can make the queries we make on Google specific. We call the queries we write with these parameters dork. For example;

```
inurl:"pwnlab" intitle:"passive information collection"
```

We talked about these dorks and their usage techniques in detail in our article titled [Google Dorks and Google Hacking](https://pwnlab.me/tr-google-dorks-ve-google-hacking/). To learn more about Google hacking, you can check out this article.

### theHarvester

theHarvester is a tool that runs on Linux. With this tool, we can collect information from open sources by scanning many websites such as Linkedin, Google, Twitter, Yahoo.

We download our tool with the command below.

sudo apt install theharvester

After installation, the following command will display the information it found on Google about the pwnlab.me site.

theHarvester -d pwnlab.me -b google

You can also detect site-based information with commands such as linkedin, bing, all etc. instead of google.

To get detailed information about its usage, you can go to <https://github.com/laramies/theHarvester>.

### OSINT Framework

Osint Framework is a website where you can access hundreds of passive information collection tools. Clicking on the section within the categories that suits your target allows you to make more detailed inquiries. Additionally, if there is a (T) text to the right of the options, you can see that you can only do this through the terminal.

We can access the relevant site at [www.osintframework.com](http://osintframework.com).

*Originally published at* [*https://pwnlab.me*](https://pwnlab.me/tr-pasif-bilgi-toplama-teknikleri/) *on November 26, 2021.*