---
title: "Python:socket for hackers"
date: 2022-09-21
draft: false
---

---

### **Python:socket for hackers**

![](https://cdn-images-1.medium.com/max/800/1*Z3ieIgd5w_LPy0R2bLu6pg.png)

### Introduction

Hello, in this article, we will get to know the socket module that we can use to connect to the IP and port addresses of remote servers.

### What is a socket?

[Socket](https://docs.python.org/3/library/socket.html#module-socket) is a module that comes installed with Python. Thanks to this module, we can connect to the desired IP and port address. Now let's take a look at how to use this module and what we can do with it.

### How to use the socket module?

First of all, we need to import the socket module and create a socket object, for this;

```
import socket
```

```
new_socket = socket.socket()
```

Then we will perform our operations using the methods of this object, these methods are:

* `socket.listen(): Listens on the socket opened on the specified port number.`
* `socket.accept`**():** Receives requests coming to the socket opened on the specified port number.
* `socket.bind`**(*address*): Binds the socket to the specified IP address.
* `socket.close`**():** Closes the socket.
* `socket.connect`**(*address*):** Connects to a remote socket at the specified address.
* `socket.recv`**(buf*size*):** Retrieves data coming to the socket.
* `socket.sendall`**(*bytes*) : Sends data to the socket.

### Listen to socket

We can listen to a specific port by opening a socket.

```
import socket
```

```
HOST = '127.0.0.1'                   
PORT = 2222                
with socket.socket() as s:  
    s.bind((HOST, PORT))  
    s.listen()  
    conn, addr = s.accept()  
    with conn:  
        print('Connected by ', addr)  
        while True:  
            data = conn.recv(1024)  
            if not data: break  
            conn.sendall(data)
```

This code will listen to the socket opened at 127.0.0.1:2222, and when it detects a connection, it will send back the incoming data in the same way. Then the program ends.

### Connecting to socket

By opening a socket, we can establish a connection to a specific IP address and port.

```
import socket
```

```
HOST = '127.0.0.1'      
PORT = 2222             
with socket.socket() as s:  
    s.connect((HOST, PORT))  
    s.sendall(b'Hello')  
    data = s.recv(1024)  
print('Received ', data)
```

This code will send data one by one to establish a connection with the socket operating at 127.0.0.1:2222. The data sent here is the 'hello' message. Then, it receives the incoming data and the program ends.

![](https://cdn-images-1.medium.com/max/800/1*0epPGqrnUjKfpY9yg8YoKg.png)

Let's save the code we use to listen to the socket in a file named *server.py*. Let's save the code we use to connect to the socket in a file named *client.py*. When we first run the server.py file and then the client.py file, the connection will be established.

### Port Scan

We could connect to IP and port addresses with the socket module. In this way, we can find open ports and banner information on a host. Banner information will give us information about which service is running on this port.

```
import socket
```

```
ip = "10.10.10.10"  
ports = []  
banners = []
```

```
for port in range(1,1000):  
    try:  
        s = socket.socket()  
        s.connect((str(ip), int(port)))  
        banner = s.recv(1024)  
        banners.append(str(banner))  
        ports.append(str(port))  
        s.close()  
        print(port)  
    except:  
        pass  
          
print(ports)  
print(banners)
```

If we run this code on the Typhoon machine, it will get us open ports and banner information.

![](https://cdn-images-1.medium.com/max/800/1*p297l0qe6OnuUmY7ep52sA.png)

### SSL

When we try to access secure sites that work with the HTTPS protocol, we need an SSL certificate. We can get help from the SSL module for this.

By default, http protocol works on port 80 and https protocol works on port 443.

```
import socket  
import ssl
```

```
hostname = 'www.python.org'  
context = ssl.create_default_context()
```

```
with socket.create_connection((hostname, 443)) as sock:  
    with context.wrap_socket(sock, server_hostname=hostname) as ssock:  
        print(ssock.version())
```

### End

What other things can we do in the field of cyber security with this module? I welcome comments...