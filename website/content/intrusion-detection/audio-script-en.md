Bölüm: Attack Detection on Apache Web Server



[Görsel: Apache HTTP Server]


Nowadays, web applications and sites are exposed to different types of cyber attacks. Early detection of these attacks is of great importance for the effectiveness of security measures and the continuity of the system. Apache Web Server is one of the most widely used web servers around the world and therefore it is necessary to implement the right methods for monitoring and detecting attacks.

---


Bölüm: Intrusion Detection Architecture Flow


The following diagram illustrates the request lifecycle through the Apache Web Server, showing how threat detection occurs at the WAF level (real-time) and at the log level (automated and manual analysis):

[Mermaid Diyagramı: Burada bir mimari veya akış şeması bulunmaktadır. Şema detayları görsel olarak mevcuttur.]

---


Bölüm: What are Apache Access Logs?



[Görsel: Apache Access Logs]


Apache records every HTTP request to the server in access logs. These logs contain important information such as the requesting IP address, request time, requested file or resource, HTTP method used, and status code. Access logs are the primary data source for monitoring and analyzing activities occurring in the system.

Apache access logs are usually located in the file /var/log/apache2/access.log (or similar).


Bölüm Detayı: Apache Combined Log Format Fields


Most production systems use the Combined Log Format. The fields captured in this format are outlined below:

[Tablo Başlangıcı]
Field Directive: %h. Name: Remote Host. Description: Client IP address making the request. Example Value: 192.168.1.200.
Field Directive: %l. Name: Remote Logname. Description: Client identifier determined by identd (usually -).
Field Directive: %u. Name: Remote User. Description: Authenticated username via HTTP authentication (usually -). Example Value: admin.
Field Directive: %t. Name: Time. Description: Timestamp when the request was received. Example Value: [01/Jun/2025:12:00:10 +0300].
Field Directive: \"%r\". Name: Request Line. Description: The HTTP method, requested URI, and HTTP version. Example Value: "GET /index.php HTTP/1.1".
Field Directive: %>s. Name: Status Code. Description: Final HTTP status code returned to the client. Example Value: 200.
Field Directive: %b. Name: Bytes Sent. Description: Size of the response body sent to the client in bytes. Example Value: 1024.
Field Directive: \"%{Referer}i\". Name: Referer Header. Description: The source page that directed the client to this URL. Example Value: "https://google.com".
Field Directive: \"%{User-Agent}i\". Name: User-Agent. Description: Browser or crawler signature identifying the client. Example Value: "Mozilla/5.0".
[Tablo Bitişi]


---


Bölüm: Methods That Can Be Used for Detection


This section explores the details and implications.


Bölüm Detayı: Manual Log Analysis



[Görsel: Manual Log Analysis]


Suspicious activities can be searched in log files using Linux commands such as grep and awk. For example, a basic grep command can quickly look for common indicators of attacks across the entire log file:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Automatic Monitoring and Warning Systems


ModSecurity: As a Web Application Firewall (WAF) running on Apache, it detects and blocks attacks in real time before they reach the web application.
Fail2Ban: A system monitoring tool that parses logs for repeated malicious patterns and updates firewall rules (such as iptables) to block the offending IP address.
Log Analysis Tools: Tools such as GoAccess and AWStats make it easier to visualize and analyze logs.

---


Bölüm: Directory Traversal



[Görsel: Directory Traversal Attack Example]


Directory Traversal attack is a type of attack in which an attacker attempts to gain unauthorized access to upper directories or sensitive files on the web server. The goal is to obtain critical files on the server (e.g. /etc/passwd, configuration files).


Bölüm Detayı: Indicators of a Directory Traversal Attack


Indicators to pay attention to in Apache access logs:

../ or similar directory jump statements in URL parameters or request paths.
Encoded characters such as ..%2F (URL encoded ../).
Attempts to access sensitive files: file names such as /etc/passwd, /boot.ini, /windows/win.ini.
Abnormally long URL requests or a high number of directory jump patterns.
Increase in server errors (403 Forbidden, 404 Not Found).


Bölüm Detayı: Directory Traversal Detection in Apache Access Logs


An example Apache log containing a Directory Traversal attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: File Upload



[Görsel: File Upload Vulnerability]


A File Upload attack occurs when an attacker uploads malicious files by abusing the file upload feature of a web application. These files can often be scripts containing commands that can be executed on the web server (Webshells).

Webshells are small malicious scripts that attackers can install and run on a web server. They are usually written in server-side languages such as PHP, ASP, JSP. Webshell provides attackers with broad powers such as executing commands on the server, uploading/downloading files, stealing data, and creating backdoors.


Bölüm Detayı: File Upload Attack Indicators


Signs to look out for in Apache access logs:

Requests to file upload endpoints such as /upload, /uploads, /file-upload, /image-upload.
Suspicious extensions in uploaded file names: .php, .exe, .jsp, .asp, .phtml, .pl.
Long or complex file names (e.g. shell.php, cmd.jsp, image.jpg.php).
HTTP method is usually POST and content type is multipart/form-data.
Many files are attempted to be uploaded from the same IP in a short time.
Attempting to run the file through suspicious GET requests after installation.


Bölüm Detayı: File Upload Detection in Apache Access Logs


An example Apache log containing the File Upload attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: RFI (Remote File Inclusion)



[Görsel: Remote File Inclusion]


RFI is a type of attack on web applications that allows a malicious attacker to include and run malicious files (usually PHP, JavaScript, etc.) from a remote server.

This attack is especially seen in weak applications such as PHP that use include(), require() functions directly with user input. An attacker can give the URL of a remote file as a parameter and cause the server to run malicious code.


Bölüm Detayı: Indicators of RFI Attack


It is important to pay attention to the following signs in Apache access logs:

Remote file addresses such as http://, https:// in URL or parameters.
File extensions such as .php, .txt, .inc in parameters.
Remote file call with parameter names such as include=, file=, page=, template=.
Abnormally long URL and complex parameter structures.
Error codes such as 500 Internal Server Error.


Bölüm Detayı: RFI Detection in Apache Access Logs


An example Apache log containing an RFI attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: LFI (Local File Inclusion)



[Görsel: Local File Inclusion]


LFI is a type of attack that allows unauthorized inclusion and execution of local files on the server (e.g. system files, configuration files) with input received from the user in the web application.

This attack occurs especially when functions such as include(), require() are called directly with user input. The purpose is usually to access sensitive files or run commands on the server.


Bölüm Detayı: Indicators of LFI Attack


Signs to look out for in Apache access logs:

Directory jump characters such as ../ in URL or parameters (similar to Directory Traversal).
PHP wrapper expressions such as php://, data://, expect://.
System files: file names such as /etc/passwd, /proc/self/environ, /var/log/apache2/access.log.
Keywords for file inclusion in parameters such as include=, page=, file=.
Abnormally long and complex URL structures.
Error codes such as 403 Forbidden or 500 Internal Server Error.


Bölüm Detayı: Detecting LFI in Apache Access Logs


An example Apache log containing an LFI attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: Brute Force



[Görsel: Brute Force Attack]


A Brute Force attack occurs when an attacker automatically and quickly tries multiple username and password combinations to gain access to a user account or system. The goal is to gain unauthorized access by finding the correct credentials.

This attack is usually directed at login pages and occurs through automated tools.


Bölüm Detayı: Types of Brute Force Attacks


Brute Force attacks are not limited to a single method; they can be executed using different strategies:

Pure Brute Force: Tries all possible character combinations.
Example: aaaa -> aaab -> aaac -> ...
Pros: Theoretically 100% success rate (if given enough time).
Cons: Extremely slow and resource-intensive.
Dictionary Attack: Uses a pre-compiled list of common passwords (wordlist).
Example: password, 123456, qwerty, admin123.
Pros: Very fast.
Cons: Fails against strong, random passwords.
Hybrid Attack: Combines dictionary and brute force methods by adding variations to dictionary words.
Example: password -> password123, admin -> Admin!2024.
Pros: Highly effective in real-world scenarios since users often follow patterns.
Credential Stuffing: Uses leaked username/password combinations from past data breaches.
Example: Reusing credentials across different websites.
Pros: High success rate due to password reuse habits.
Cons: Mitigated by Multi-Factor Authentication (MFA).
Password Spraying: Tries a few common passwords against a large number of users.
Example: Trying Password123! against user1, user2, user3, etc.
Pros: Evades account lockout policies.
Cons: Fails if users have unique, strong passwords.
Reverse Brute Force: Tries a single password against a large list of usernames. Similar to password spraying, but focusing on a specific common password.
Rainbow Table Attack: Uses pre-computed hash tables to reverse cryptographic hash functions and recover passwords.
Pros: Extremely fast hash-cracking.
Cons: Rendered completely ineffective by salting.
Distributed Brute Force: Uses multiple machines (e.g., a botnet) to launch parallel attacks.
Pros: Hard to detect and faster due to distributed load.
Offline Brute Force: Attempts to crack password hashes after gaining access to a database dump.
Pros: Undetected by IDS/IPS and can be highly accelerated using GPUs.


Bölüm Detayı: Summary of Brute Force Attack Types


[Tablo Başlangıcı]
Type: Pure Brute Force. Key Feature: Attempts every possible character combination.
Type: Dictionary. Key Feature: Uses a pre-compiled wordlist.
Type: Hybrid. Key Feature: Wordlist + custom pattern variations.
Type: Credential Stuffing. Key Feature: Uses leaked credentials from breaches.
Type: Password Spraying. Key Feature: Few common passwords against many accounts.
Type: Reverse Brute Force. Key Feature: One password against multiple usernames.
Type: Rainbow Table. Key Feature: Pre-computed cryptographic hash table mapping.
Type: Distributed. Key Feature: Uses botnets for parallel attempts.
Type: Offline. Key Feature: Performed locally on database hash dumps.
[Tablo Bitişi]



Bölüm Detayı: Log Analysis & IDS Correlation


In Apache log analysis, these types present different traffic signatures:
Password Spraying: Single IP addressing multiple different usernames with the same password pattern.
Brute Force (Classic): Single IP targeting a single username with rapid, repeated failed login attempts.
Credential Stuffing: Multiple distinct IPs attempting logins with varying credentials in a short timeframe.

---


Bölüm Detayı: Indicators of Brute Force Attack


The following signs in Apache access logs may indicate a Brute Force attack:

Many POST (usually login) requests from the same IP address in a short time.
Repeated login attempts with different usernames or passwords.
Increased number of 401 Unauthorized or 403 Forbidden HTTP response codes.
Heavy request traffic on certain endpoints (e.g. /login, /wp-login.php, /admin/login.php).
Repeating patterns in User-Agent or IP addresses.


Bölüm Detayı: Brute Force Detection in Apache Access Logs


An example Apache log containing a Brute Force attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: Command Injection



[Görsel: Command Injection]


Command injection is a vulnerability that allows an attacker to run unauthorized commands on the server by injecting malicious operating system commands into the web application.

This attack occurs especially when user input is not validated and is passed directly to functions that execute operating system commands (e.g. system(), exec(), shell_exec()).

The goal is to hijack the server, read or modify file content, or perform other malicious actions.


Bölüm Detayı: Command Injection Indicators


Signs to look out for in Apache access logs:

Command separator characters such as ;, &&, |, `  `` (backtick) in URL or parameters.
System command names such as curl, wget, nc, bash, sh, python.
Abnormally long or complex structures in parameters.
Increase in error (500 Internal Server Error) codes on the server side.
Requests that display or affect command output.


Bölüm Detayı: Command Injection Detection in Apache Access Logs


An example Apache log containing a Command Injection attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: SQL Injection



[Görsel: SQL Injection]


SQL Injection is a type of attack in which the attacker manipulates the application's database by injecting malicious SQL commands into the web application. Aim: It could be stealing confidential information from the database, modifying or deleting data.


Bölüm Detayı: Indicators of SQL Injection


It is important to pay attention to the following signs in Apache access logs or web requests:

SQL commands in URL or parameters: Expressions such as UNION SELECT, SELECT, INSERT, DROP TABLE, AND 1=1, ' OR '1'='1'.
Use of abnormal characters in parameters: Single quotes ', double quotes ", semicolons ;, comment line marks -- or #.
Abnormally long URL or parameter values: Complex and long queries.
Server error codes: Unexpected increase in errors such as 500 Internal Server Error, 400 Bad Request.
Repeated same parameter or query patterns: Especially experimenting with different variations.


Bölüm Detayı: SQL Injection Detection in Apache Access Logs


An example Apache log containing a SQL injection attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: NoSQL Injection


NoSQL Injection is malicious query manipulation of NoSQL databases, similar to traditional SQL injection. It occurs in NoSQL databases such as MongoDB and CouchDB when the application does not filter user input correctly.

The aim is to gain unauthorized data access, leak data, or make changes to the database by changing the query structure.


Bölüm Detayı: NoSQL Injection Indicators


The following indicators can be detected in Apache access logs:

JSON structure or operators in parameters: { "$ne": null }, { "$gt": "" }, { "$regex": "" } etc.
Abnormal or unexpected JSON strings in query parameters.
Constructs for injecting code such as {"$where": "function() { ... }"}.
Typical NoSQL operator expressions in URL or parameters ($gt, $lt, $ne, $regex, $or).
Use of an unexpected number or structure of parameters.


Bölüm Detayı: Detection of NoSQL Injection in Apache Access Logs


An example Apache log containing a NoSQL Injection attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: XML Injection


XML Injection is an attack that occurs when malicious XML content is sent to the application as a result of inadequate validation of user input during the XML data processing phase of web applications. This attack can trick the application's XML parser, leading to unwanted operations.

For example, XML External Entity (XXE) attacks fall into this category; An attacker can cause the application to process malicious XML external sources.


Bölüm Detayı: XML Injection Indicators


Things to consider in Apache access logs:

XML special characters and structures such as <, >, &, <!ENTITY in request parameters or POST data.
<!DOCTYPE, SYSTEM, ENTITY expressions in XML content.
Submissions of longer or more complex XML data than usual.
XML External Entity references.
Increased error codes such as 400 Bad Request or 500 Internal Server Error.


Bölüm Detayı: Detection of XML Injection in Apache Access Logs


An example Apache log containing an XML Injection attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: LDAP Injection


LDAP (Lightweight Directory Access Protocol) injection is an attack in which an attacker injects malicious input into the application's LDAP queries, gaining unauthorized access or manipulating LDAP database queries.

It occurs especially in user authentication and authorization processes, when LDAP queries are created directly with user input.


Bölüm Detayı: LDAP Injection Indicators


Signs to look out for in Apache access logs:

LDAP special characters such as *, |, &, (, ) in URL or parameters.
Query manipulations on parameters such as )(uid=), (|(uid=)), (objectClass=).
Filter expressions full of abnormal characters or complex.
Increase in incorrect or unsuccessful login attempts.
Multiple attempts from the same IP.


Bölüm Detayı: Detection of LDAP Injection in Apache Access Logs


An example Apache log containing an LDAP Injection attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: Template Injection



[Görsel: Template Injection]


Template Injection is the result of processing data received from the user in template engines in web applications without adequate filtering. It is a security vulnerability that occurs when malicious code is injected into the template.

By injecting malicious code into the template, an attacker can execute code on the server side, access sensitive data, or control the application.

For example, such vulnerabilities can be seen in template engines such as Jinja2 (Python), Twig (PHP), Freemarker (Java).


Bölüm Detayı: Template Injection Indicators


Signs to look out for in Apache access logs:

Template variables and expressions such as {{ }}, {% %}, {# #} in URL or parameters.
Malicious code attempts such as {{ config }}, {{ self }}, {{ ''.class.mro() }}.
Abnormal and template engine specific syntax in parameters.
Increase in server error codes (such as 500 Internal Server Error).
Repeated malicious requests of the same type.


Bölüm Detayı: Template Injection Detection in Apache Access Logs


An example Apache log containing Template Injection attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: HTTP Header Injection



[Görsel: HTTP Header Injection]


HTTP Header Injection is a vulnerability that allows an attacker to manipulate HTTP headers by injecting malicious data into the web application.

This attack occurs specifically if user input is not properly filtered in HTTP headers (e.g. Set-Cookie, Location).

An attacker can use this vulnerability to split HTTP responses (Response Splitting), conduct a Cross-Site Scripting (XSS) attack, or cause damage such as session hijacking.


Bölüm Detayı: HTTP Header Injection Indicators


Signs to look out for in Apache access logs:

Presence of \r (carriage return), \n (line break) characters in URL or parameters.
End-of-line character injection in headers (e.g. %0d, %0a).
Abnormal use of header names such as Set-Cookie:, Location: in parameters.
Increase in unexpected error or abnormal response codes from the server.
Repetition of suspicious requests of the same type.


Bölüm Detayı: HTTP Header Injection Detection in Apache Access Logs


An example Apache log containing an HTTP Header Injection attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: Content Injection


Content Injection is a vulnerability that allows an attacker to inject malicious content into a web application or web page, displaying harmful or unwanted content to visitors.

This attack typically occurs when user input is not properly filtered, resulting in malicious code being injected into HTML, JavaScript, text, or other content.

Content injection may disrupt the appearance or functionality of the website and may expose users to phishing attacks or malware distribution.


Bölüm Detayı: Content Injection Indicators


Signs to look out for in Apache access logs:

Suspicious HTML/JavaScript code fragments in URL parameters or form data.
Harmful content expressions such as &lt;script&gt;, &lt;iframe>, on-error=, javascript: in parameters.
Requests containing abnormally long or complex pieces of code.
Unexpected content types or error codes from the server.
Repeated attempts of the same type of harmful content.


Bölüm Detayı: Content Injection Detection in Apache Access Logs


An example Apache log containing a Content Injection attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: XSS (Cross-Site Scripting)



[Görsel: Cross Site Scripting XSS]


XSS is injecting malicious JavaScript or HTML code into a web application and executing that code in other users' browsers. All XSS attacks are content injection, but not all content injections are XSS. The goal is to hijack user sessions, infect malware, or mislead users. XSS attacks are divided into three:

Stored XSS: Malicious code is saved in the database or persistent areas and displayed to every user.
Reflected XSS: Malicious code is temporarily reflected via a URL or form.
DOM-based XSS: Malicious code is executed through DOM manipulation on the user side (browser).


Bölüm Detayı: Indicators of XSS Attack


XSS flags in Apache access logs typically include:

JavaScript or HTML tags such as &lt;script&gt;, &lt;/script&gt;, alert-msg(, on-error=, javascript: in URL or parameters.
Encoded HTML characters: %3C ( < ), %3E ( > ), %22 ( " ), %27 ( ' ).
Abnormally long and complex character strings in parameters.

Example parameters:
q=&lt;script&gt;alert-msg('XSS')&lt;/script&gt;
search=%3Cimg%20src=x%20on-error=alert-msg(1)%3E


Bölüm Detayı: XSS Detection in Apache Access Logs


An example Apache log containing an XSS attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: SSRF (Server-Side Request Forgery)



[Görsel: Server-Side Request Forgery SSRF]


SSRF is a vulnerability that allows an attacker to send malicious requests to the target server itself or to other internal systems he can access.

The attacker manipulates input that the application receives from the user, such as the URL or IP address, causing the server to access unauthorized resources. In this way, it can infiltrate systems in the internal network, access sensitive data or perform other attacks on the system.


Bölüm Detayı: SSRF Indicators


Signs that can be observed in Apache access logs:

Suspicious IP addresses or localhost addresses in URL parameters (127.0.0.1, localhost, 169.254.x.x, 10.x.x.x, 192.168.x.x).
Requests to unexpected or non-application URLs.
Frequent requests to the server's own IP address or private network addresses.
Use of long URL parameters or intra-URL encoding.
Request attempts to many different targets from the same IP.


Bölüm Detayı: SSRF Detection in Apache Access Logs


An example Apache log containing an SSRF attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: CSRF (Cross-Site Request Forgery)



[Görsel: Cross-Site Request Forgery CSRF]


CSRF is a type of attack that allows a malicious site to send a request on behalf of the user to a web application that the user is authorized to do. Requests are made without the user's awareness, using their privileges for malicious purposes.

For example, when a user clicks on a malicious link or submits a form while logged in, the attacker's desired actions can occur.


Bölüm Detayı: CSRF Indicators


Although it is difficult to detect directly in Apache access logs, indirect indicators can be:

Unexpected POST or GET requests.
Abnormal number of transactions for different sessions from the same IP or user agent.
Abnormal and recurring requests for specific endpoints.
Requests do not have a referrer title or are suspicious.
Operations requiring unexpected authorization for logged-in users.


Bölüm Detayı: CSRF Detection in Apache Access Logs


An example Apache log containing a CSRF attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log. Although it is difficult to definitively detect a CSRF attack directly from Apache logs, log analysis can be performed for Referer checking and detection of abnormal request behavior.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: IDOR (Insecure Direct Object Reference)



[Görsel: Insecure Direct Object Reference IDOR]


IDOR is a vulnerability where a user can directly access another user's data or objects without authorization. If web applications use object references (e.g. file names, user IDs, order numbers) directly and without verification in URL parameters when accessing resources (files, user data, records, etc.), the attacker can access others' data by changing these references.


Bölüm Detayı: IDOR Indicators


Signs to look out for in Apache access logs:

ID or file names that can be changed in URL parameters and contain a direct object reference (user_id=123, file=report45.pdf).
Attempts to access IDs of different users from the same IP or user agent.
Use of abnormal or unexpected object numbers in URL parameters.
Successive access attempts to different objects in a short period of time.
Unauthorized access requests in cases where session or authentication controls are weak.


Bölüm Detayı: IDOR Detection in Apache Access Logs


An example Apache log containing an IDOR attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: Open Redirect



[Görsel: Open Redirect]


Open Redirect is a vulnerability that occurs when a web application misuses parameters to redirect users to another URL. The attacker uses these vulnerabilities to redirect users to malicious or fraudulent sites.

This type of attack is a common means of phishing attacks; While users think they are clicking on a reliable site, they are actually directed to a malicious site.


Bölüm Detayı: Open Redirect Indicators


Signs to look out for in Apache access logs:

Parameters for redirection purposes such as redirect=, url=, next=, return=, dest=, continue= in URL parameters.
These parameters include full or partial other domain addresses (e.g. http://malicious.com).
Attempts to redirect from the same IP to different malicious URLs.
Entering different external URLs into the same parameter in a short time.
Suspicious redirects on requests with HTTP status code 3xx (301, 302, 307).


Bölüm Detayı: Open Redirect Detection in Apache Access Logs


An example Apache log containing an Open Redirect attack is given:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Detection can be made by running the following query on this log:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: ModSecurity: Real-Time Detection and Prevention



[Görsel: ModSecurity WAF]


While manual log analysis is excellent for forensics and threat hunting, real-time prevention requires a Web Application Firewall (WAF). ModSecurity runs as an Apache module and monitors HTTP requests before they reach the web application.


Bölüm Detayı: Example: Blocking Local File Inclusion (LFI) Attempts

The following rule detects and blocks directory traversal attempts (such as /etc/passwd) and returns a 403 Forbidden status code:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Example: Blocking Basic SQL Injection Attacks

This rule matches common SQL words like UNION SELECT in request paths and parameters:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: Fail2Ban: Automated IP Blocking



[Görsel: Fail2Ban]


Fail2Ban monitors log files (like /var/log/apache2/access.log) for patterns indicating attacks and automatically updates firewall rules (e.g., iptables) to block the offending IP address.


Bölüm Detayı: Step 1: Create a Filter Rule

Create a filter configuration file /etc/fail2ban/filter.d/apache-sqli.conf:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Step 2: Configure the Jail Configuration

Enable and configure the jail in /etc/fail2ban/jail.local:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

Although Apache web servers are one of the most used and reliable server software worldwide, they can always be vulnerable to various web attacks. Therefore, it is critical to regularly analyze access logs to detect and prevent possible attacks.

Abnormal requests, suspicious parameters and unexpected file accesses that can be seen in access logs are important clues that the web server is being targeted. Therefore, effective monitoring of logs should be done. It should be supported by automatic analysis tools, security systems and firewalls; user input must be filtered and security updates must be applied regularly.

As a result, intrusion detection in Apache web server is one of the cornerstones of building a strong security posture. Proactive approaches both prevent data loss and ensure system continuity. Security is not just a technology, it is a process that requires constant monitoring and improvement.
