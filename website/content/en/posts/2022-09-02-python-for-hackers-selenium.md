---
title: "Python for hackers: selenium"
date: 2022-09-02
description: "Hello, in this article, we will get to know the selenium module, which allows us to perform operations on websites like a user."
featuredImage: "https://cdn-images-1.medium.com/max/800/1*0uUmJ2J01vpcie8grd91Yw.png"
series: ["Hakerlar için Python"]
---

### **Python for hackers: selenium**

![](https://cdn-images-1.medium.com/max/800/1*0uUmJ2J01vpcie8grd91Yw.png)

### Introduction

Hello, in this article, we will get to know the selenium module, which allows us to perform operations on websites like a user.

### What is Selenium?

[Selenium](https://selenium-python.readthedocs.io/) is a web automation library. With Selenium we can visit and interact with a website.

### Installation

You can follow several different methods to install and run the [Selenium](https://pypi.org/project/selenium/) module. You can install everything manually and run it on your computer, you can automatically install the driver that will run your browser, or you can take advantage of docker technology.

Let's start with the classic manual installation;   
To do this, run the following command in the terminal.

```
pip install selenium
```

Since Selenium runs on a web browser, we need a driver to manage this browser.

**Chrome**:  
<https://chromedriver.chromium.org/downloads>

**Edge**:  
<https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/>

**Firefox**:  
<https://github.com/mozilla/geckodriver/releases>

**Safari**:  
<https://webkit.org/blog/6900/webdriver-support-in-safari-10/>

You can download the driver for the browser you want to use from here. When downloading the driver, make sure it is compatible with the version of your browser. Then copy the driver to the same directory as your python file.

Now we can run our first test code.

```
from selenium import webdriver  
driver = webdriver.Chrome()  
driver.get("http://google.com")
```

Instead of installing the driver manually, we can also install the webdriver\_manager module, which automatically installs the latest version.

```
pip install webdriver-manager
```

After installing this module, we can run the following test code.

```
from selenium import webdriver  
from webdriver_manager.chrome import ChromeDriverManager
```

```
driver = webdriver.Chrome(ChromeDriverManager().install())  
driver.get("http://google.com")
```

To run Selenium with [docker](https://hub.docker.com/r/selenium/standalone-firefox), you can follow the instructions on the [github](https://github.com/SeleniumHQ/docker-selenium) page. Once you install and run Docker, you can access the Sesenium Grid interface at [http://localhost:4444](http://localhost:4444/).

![](https://cdn-images-1.medium.com/max/800/1*ibMLsRZmjC54Fxcif1XP_A.png)

We can also view the web browser at <http://localhost:7900/>. The default password is *secret*.  
 We can run the following test code while Docker is running.

```
from selenium import webdriver  
from selenium.webdriver.common.keys import Keys  
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities  
					   
driver = webdriver.Remote(  
   command_executor="http://127.0.0.1:4444/wd/hub",  
   desired_capabilities={"browserName": "firefox"})  
driver.get("http://google.com")
```

Here, in the browserName section, you must write the name of the browser with which you installed Docker. When the code is run, you can see that Google opens on the address <http://localhost:7900/>.

![](https://cdn-images-1.medium.com/max/800/1*WoWx7BtNKQIIwMPjVnMg4w.png)

Python code was run and a session was created on the selenium grid. We went to google.com with this session. However, without closing this session, our python code terminated and our session remained open. We cannot run other Python codes without closing the session. To log out, we can add *driver.quit()* at the end of our python code or restart docker.

### How to Use Selenium Module?

In the installation section, we saw how to open the browser with selenium and go to a page. After going to the page, we can perform various operations on that page. For example, we may want to get a certain text on the page, we may want to press a button on the page, or we may want to scroll the page up or down. All of these are the processes required for us in bot making.

Whatever we want to do on the web page, we first need to access the HTML element in which we will do that action. There are a few different ways to do this. Some of these are:,

* ID: If an id value is assigned to the element, we can access the element with this value. Id values ​​are unique.
* NAME: If a name value is assigned to the element, we can access the element with this value. Name values ​​are not unique; there may be other elements with the same name value on a page. In this case, he takes the first one he finds.
* CLASS: If a class value is added to the element, thisWe can access it with the class value.
* XPATH: We can access it by giving the xpath of the element we want to access in the page source. We can copy the xpath from the inspector tool.

![](https://cdn-images-1.medium.com/max/800/1*6iylSyMtw2y6d-OsZcECpA.png)

Here we have got the XPath of the search bar in Google. Now let's try to understand the basic logic on a small sample application.

```
#import operations
```

```
from selenium import webdriver                    
from selenium.webdriver.common.keys import Keys  
from selenium.webdriver.common.by import By  
import time
```

```
Call the #driver object (I ran selenium on docker)					
```

```
driver = webdriver.Remote(  
   command_executor="http://127.0.0.1:4444/wd/hub",  
   desired_capabilities={"browserName": "firefox"})
```

```
driver.get("https://github.com") #go to github webpage
```

```
# Access the search bar on github page with XPATH  
searchInput = driver.find_element(By.XPATH, "/html/body/div[1]/header/div/div[2]/div[2]/div[1]/div/div/form/label/input[1]")
```

```
time.sleep(1)  
searchInput.send_keys("CVE") # type 'CVE' in the search bar.  
time.sleep(3)  
searchInput.send_keys(Keys.ENTER) # press ENTER in the search bar.  
time.sleep(5)
```

```
driver.quit()
```

When we run the sample application, the github web page opens, type CVE in the search bar and go to the search page. Then after 5 seconds the browser will close.

![](https://cdn-images-1.medium.com/max/800/1*MWyxd0MQQ9IsRkFYJK7s8w.png)

We can pull and index the results here. We call this process web scraping.

### Shodan

Now let's make a web bot application running on Shodan. To do this, we go to [shodan.io](https://www.shodan.io/) and copy the Xpath value of the search bar there. We will use this value to access the search bar in our application.

![](https://cdn-images-1.medium.com/max/800/1*e5yR7mUfSRno_MxYDkshNg.png)

Now we can start writing our code. First of all, we will perform the import operations as mentioned above and create our driver object. Then, we will send the value we will query to the search bar with the xpath value we received and send the '*ENTER'* value.

```
from selenium import webdriver  
from selenium.webdriver.common.keys import Keys  
from selenium.webdriver.common.by import By  
import time
```

```
driver = webdriver.Remote(  
   command_executor="http://127.0.0.1:4444/wd/hub",  
   desired_capabilities={"browserName": "firefox"})
```

```
driver.get("https://www.shodan.io/")
```

```
searchInput = driver.find_element(By.XPATH, "/html/body/div[2]/div/div/div[1]/form/div/div/input")
```

```
searchInput.send_keys("phpMyAdmin", Keys.ENTER)
```

```
time.sleep(10)  
driver.quit()
```

When we run our application, it will type 'phpMyAdmin' in the search bar and query it. Now let's try to get the returned values.

![](https://cdn-images-1.medium.com/max/800/1*nryPmk-rhb0RiU-lv0zniw.png)

As we can see, the class names of all returned results are assigned as 'result'. We can achieve the results by taking advantage of this situation.

```
results = driver.find_elements(By.CLASS_NAME, 'result')  
print(results)
```

![](https://cdn-images-1.medium.com/max/800/1*YjRwxuXoOD18s9ceUn04MA.png)

Here we can see the elements taken.

### Twitter Bot

You've probably heard of bot accounts on Twitter. In addition to automating social media accounts, these bots are also used to create artificial agendas on Twitter and for various manipulation and propaganda activities. Twitter takes various measures to block bot accounts. For example, it catches users who engage in aggressively fast transactions. Apart from this, it manipulates id and name values ​​to make accessing elements difficult, making xpath dysfunctional.   
   
 You can easily find examples of bots written in selenium in the old version of Twitter on the web. Unfortunately, these bots do not work in today's version.   
 Apart from this, you can create various applications with Twitter's own API. However, APIs are completely subject to Twitter's control. In short, we can say that Twitter has taken complete control.  
   
 The same situation applies to Instagram and Facebook. Many web applications have taken precautions against bots.

### End

As a result, the selenium module is a nice module that helps us perform automated operations on a real browser and create bots, but some web applications have taken precautions against these bots. I welcome comments on what other applications can be made with Selenium…