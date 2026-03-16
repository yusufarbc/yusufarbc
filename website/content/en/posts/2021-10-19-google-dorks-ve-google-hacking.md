---
title: "Google Dorks and Google Hacking"
date: 2021-10-19
draft: false
---

---

### Google Dorks and Google Hacking

![](https://cdn-images-1.medium.com/max/800/0*wiiHrCXFveGl4-e-)

Hello, in this article, I will introduce you to Google Dorks, which are very useful in collecting passive information. I will talk about how to use it. Then, I will try to explain how we can find vulnerabilities with these dors and what we can achieve.

![](/images/0_k0S1ZefFPj_ccZmA.jpg)

Google dork is a system that contains some parameters that make it easier for us to search with the Google search engine. These parameters allow us to filter the words we will search for. In this way, we can easily access the information we are looking for among the billions of sites indexed by Google. This system is indispensable for passive information collection.

---

### Google Search Parameters

When searching on Google, we can refine our search using certain parameters. Let's take a look at these parameters and what they do...

Used to search page text.

Example:

```
intext:Provided by ProjectSend
```

It is used to search the page title.

Example:

```
intitle:"index of backup.php"
```

It is used to search within the URL.

Example:

```
inurl:"admin-login.php"
```

### inposttitle/allinposttitle:

In blog research, it is used to search the blog title.

Example:

```
inposttitle:"Google Dork"
```

It is used to search on keywords. It ranks the sites with the specified keyword according to their popularity.

Example:

```
inanchor:"cyber security"
```

It is used to find results with the desired file extension.

Example:

```
filetype:log "AUTHTOKEN"
```

Shows the version of the web page currently in the cache of the specified site.

Example:

```
cache:www.google.com
```

It is used to search the specified site.

Example:

```
site:"pwnlab.me" "Google Dorks"
```

It is used to find websites with similar content to a known site.

Example:

```
related:"pwnlab.me"
```

It is used to list results before or after a certain date. before means before, after means after.

Example:

```
allintext:password filetype:log after:2018 before:2021
```

### Google Search Operators

Operators are auxiliary characters used with parameters in writing dorks.

Using quotation marks around the phrase you're searching for will help you find exact match results rather than the broad results you'll get with a standard search.

example

```
"open source intelligence"
```

The minus operator is used to avoid showing results containing certain words.

example

```
site:facebook.* -site:facebook.com
```

The plus operator is used to combine words. Useful for detecting pages that use more than one specific key

example

```
site:facebook.com +site:facebook.*
```

The star operator is used to represent a field that can be filled with any word. In other words, different words may appear where the star operator is located in the search result.

example

```
site:*.com
```

In this example, all sites ending with the extension '.com' will be listed.

It is also used to search for synonyms of the specified word.

example

```
~set
```

For example, querying for “~set” will list results containing words like “configure,” “collection,” and “change,” which are synonyms for “set.”

| and OR operator corresponds to the logical operator “or” in Turkish. Lists results where one or both of two conditions are met.

example

```
site:facebook.com | site:twitter.com
```

The & operator and the AND operator correspond to the “and” logical operator in Turkish. Lists only results from two conditions that both satisfy.

example

```
site:facebook.com & site:twitter.com
```

---

### What is Google Hacking?

![](/images/0_7xiNCg0pcIr744aB.png)

Google hacking is a method used to find a vulnerable index of web pages on the internet or to collect information by searching for open data on all sites. For example, with a Google query, we can find the login page of a site and scan for vulnerabilities there. In other words, we can call the use of queries we make with dors for hacking operations as 'Google Hacking'.

### Google Hacking Techniques

We can access many different information on the internet by using Google Hacking techniques. Let's see together what kind of information and how we can access it...

### Log files

log filesis a perfect example of how sensitive information can be found on any website.

We can use the allintext and filetype parameters to access the log files indexed by Google.

```
allintext:username filetype:log
```

This query will list the results containing "username" in all log files indexed by Google on the internet.

### Vulnerable web servers

By using Google dorks, we can find websites with certain security vulnerabilities. The presence of the phrase “/proc/self/cwd/” in the URL of a website is evidence that there is a vulnerability on that site.

```
inurl:/proc/self/cwd
```

With this dork we can find vulnerable sites, As you can see in the screenshot below, the vulnerable server results will be listed with their open directories.

### Open FTP servers

Google not only indexes HTTP-based servers, but also open FTP servers.

With the following dork, we can find public FTP servers.

```
intitle:"index of" inurl:ftp
```

### ENV files

.env files are used in web development environments to declare global configurations. One recommended practice is to move these .env files to a location where they are not publicly accessible. However, there are many developers who don't care about this and add .env files to the website directory.

```
intitle.index of .env
```

You will notice that usernames, passwords, and IPs are shown directly in the search results.

### SSH private keys

SSH private keys are used to decrypt incoming and outgoing information in the SSH protocol. As a general security rule, private keys should remain on the system used to access the remote SSH server and should not be shared with anyone.

With the dork below, you will be able to find SSH private keys indexed by Uncle Google.

```
intitle:index.of id_rsa -id_rsa.pub
```

### Email lists

It's pretty easy to find email lists using Google Dorks. In the example below, we can list excel files that may contain a large number of email addresses.

```
filetype:xls inurl:"email.xls"
```

### Live cameras

It is very easy to access live camera web pages that are indexed by Uncle Google and are not restricted by IP. With the dorks below, we can access live cameras.

For IP based cameras:

```
inurl:top.htm inurl:currenttime
```

To find WebcamXP-based streams:

```
intitle:"webcamXP 5"
```

For general live cameras:

```
inurl:"lvappl.htm"
```

### SQL dumps

SQL dumps appear on sites as a result of incorrect backup mechanisms used by site administrators who store backups on web servers. To find a compressed SQL file we use:

```
"index of" "database.sql.zip"
```

### WordPress Admin

It's not too difficult to find WordPress Admin login pages with a dork:

```
intitle:"Index of" wp-admin
```

Apache servers may be misconfigured. This makes them great targets for botnets.  
 We can find Apache2 web pages with the following dork:

```
intitle:"Apache2 Ubuntu Default Page: It works"
```

### phpMyAdmin

Another risky tool frequently discovered on LAMP (Linux, Apache, MySQL, PHP) servers is the phpMyAdmin software.

Dork to use to find sites with this software:

```
"Index of" inurl:phpmyadmin
```

![](/images/0_igJI4VAzSEKlUXSX.png)

### JIRA/Kibana

Google dorks can also be used to find web applications that host important corporate data (via JIRA or Kibana).

```
inurl:Dashboard.jspa intext:"Atlassian Jira Project Management Software" inurl:app/kibana intext:Loading Kibana
```

[Google Hacking Database](https://www.exploit-db.com/google-hacking-database) is a database containing dors that we can use for hacking activities. On this platform offered by Exploit DB, we can list the dors used by many experts and use the dors that we think will be useful to us.

---

*source:* Google Hacking for Penetration Testers*,*Johnny Long, Bill Gardner, Justin Brown, 2015 *Originally published at* [*https://pwnlab.me*](https://pwnlab.me/tr-google-dorks-ve-google-hacking/) *on October 19, 2021.*