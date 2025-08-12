### **Individual Splunk Queries for Web Attacks**

Here are standalone Splunk SPL queries for detecting various web attacks based on the logic in the comprehensive query. Each query uses the **Web** data model.

#### **1\. SQL Injection (SQLi)**

This query looks for common SQL keywords that appear after a single or double quote in a URL or in POST form data.

| from datamodel=Web.Web  
| where match(url, "(?i)(\\'|\\"|%27|%22).\*(?i)(\\b(union|select|insert|update|delete|drop|alter)\\b)") OR match(form\_data, "(?i)(\\'|\\"|%27|%22).\*(?i)(\\b(union|select|insert|update|delete|drop|alter)\\b)")  
| table \_time, src, dest, url, user, form\_data, http\_method

#### **2\. Path Traversal**

This query searches for common directory traversal sequences in the URL.

| from datamodel=Web.Web  
| where match(url, "(?i)(\\.\\./|\\.\\.%2\[fF\]|\\.\\.%5\[cC\])")  
| table \_time, src, dest, url, user

#### **3\. Command Injection**

This query identifies common OS commands that follow shell metacharacters in the URL.

| from datamodel=Web.Web  
| where match(url, "(?i)(;|\`|\\$|\\(|\\)|\<|\>|%0a|%0d).\*(?i)(cat|ls|whoami|uname|id|pwd|netstat|ifconfig|ipconfig)")  
| table \_time, src, dest, url, user

#### **4\. Information Disclosure**

This query searches for requests for common backup file extensions or version control directories.

| from datamodel=Web.Web  
| where match(url, "(?i)\\.(bak|swp|old|config|sql)$|\\b(.git|.svn|/wwwroot/)\\b")  
| table \_time, src, dest, url, user

#### **5\. Malicious File Upload**

This query detects POST requests that appear to be uploading files with potentially executable extensions.

| from datamodel=Web.Web  
| where http\_method="POST" AND match(file\_name, "(?i)\\.(php|jsp|aspx|sh|exe|dll)$")  
| table \_time, src, dest, url, user, file\_name

#### **6\. Server-Side Request Forgery (SSRF)**

This query flags requests where the URL contains internal IP addresses or common cloud metadata endpoints.

| from datamodel=Web.Web  
| where match(url, "(?i)(127\\.0\\.0\\.1|localhost|169\\.254\\.169\\.254|10\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|192\\.168\\.\\d{1,3}\\.\\d{1,3}|172\\.(1\[6-9\]|2\[0-9\]|3\[0-1\])\\.\\d{1,3}\\.\\d{1,3})")  
| table \_time, src, dest, url, user

#### **7\. XXE Injection**

This query searches the body of a POST request for XML declarations that include an external entity (SYSTEM), which is a strong indicator of an XXE attempt.

| from datamodel=Web.Web  
| where http\_method="POST" AND match(form\_data, "(?i)\<\!DOCTYPE\\s+.\*\\s+SYSTEM")  
| table \_time, src, dest, url, user, form\_data

#### **8\. NoSQL Injection**

This query looks for common NoSQL operators (like $ne, $gt) in URLs or form data.

| from datamodel=Web.Web  
| where match(url, "(?i)\\\[(\\$ne|\\$gt|\\$in|\\$where)\\\]") OR match(form\_data, "(?i)(\\$ne|\\$gt|\\$in|\\$where)")  
| table \_time, src, dest, url, user, form\_data

#### **9\. Cross-Site Scripting (XSS)**

This query detects common reflected XSS patterns, such as script tags and event handlers, in the URL.

| from datamodel=Web.Web  
| where match(url, "(?i)(\<script|%3Cscript|javascript:|onerror=|onload=|onmouseover=)")  
| table \_time, src, dest, url, user

#### **10\. Cross-Site Request Forgery (CSRF)**

This query identifies state-changing POST requests that are missing a Referer header or have a Referer from a different domain, which can be an indicator of CSRF.

| from datamodel=Web.Web  
| where http\_method="POST" AND (http\_referrer="-" OR (spath(http\_referrer, "host")\!=host))  
| table \_time, src, dest, url, user, http\_referrer

#### **11\. Insecure CORS Policy**

This query finds responses where the Access-Control-Allow-Origin header is set to the wildcard \*.

| from datamodel=Web.Web  
| where isnotnull(http\_header\_values) AND mvfilter(match(http\_header\_values, "(?i)Access-Control-Allow-Origin:\\s\*\\\*"))  
| table \_time, src, dest, url, http\_header\_values

#### **12\. Clickjacking**

This query finds responses that are missing the X-Frame-Options or a proper Content-Security-Policy header, making them vulnerable to clickjacking.

| from datamodel=Web.Web  
| where isnotnull(http\_header\_values) AND NOT (mvfilter(match(http\_header\_values, "(?i)X-Frame-Options")) OR mvfilter(match(http\_header\_values, "(?i)Content-Security-Policy.\*frame-ancestors")))  
| table \_time, src, dest, url, http\_header\_values

#### **13\. Web Cache Poisoning**

This query detects a potential cache poisoning technique where a request for a cacheable asset also includes a host-override header.

| from datamodel=Web.Web  
| where match(url, "(?i)\\.(js|css|png|gif)$") AND isnotnull(http\_header\_names) AND mvfilter(match(http\_header\_names, "(?i)X-Forwarded-Host"))  
| table \_time, src, dest, url, http\_header\_names

#### **14\. HTTP Host Header Attack**

This query identifies requests where the Host header does not match the destination server's hostname.

| from datamodel=Web.Web  
| where host \!= dest  
| table \_time, src, dest, host, url

#### **15\. HTTP Request Smuggling**

This query detects a key indicator of request smuggling: the presence of both Content-Length and Transfer-Encoding headers in the same request.

| from datamodel=Web.Web  
| where isnotnull(http\_header\_names) AND mvfilter(match(http\_header\_names, "(?i)Content-Length")) AND mvfilter(match(http\_header\_names, "(?i)Transfer-Encoding"))  
| table \_time, src, dest, url, http\_header\_names

#### **16\. JWT Attack (alg:none)**

This query looks for JSON Web Tokens sent in an Authorization header where the algorithm is explicitly set to "none".

| from datamodel=Web.Web  
| where isnotnull(http\_header\_values) AND match(mvfilter(match(http\_header\_values, "Authorization: Bearer .\*")), "\\.eyJhbGciOiJub25lIg")  
| table \_time, src, dest, url, user, http\_header\_values  
