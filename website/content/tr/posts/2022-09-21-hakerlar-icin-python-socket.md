---
date: '2022-09-21'
description: Merhaba bu yazımızda, uzak sunucuların ip ve port adreslerine bağlantı kurmak için kullanabileceğimiz socket modülünü tanıyacağız.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*Z3ieIgd5w_LPy0R2bLu6pg.png
series:
- Hakerlar için Python
title: Hakerlar için Python:socket
type: posts
---

### **Hakerlar için Python:socket**



### Giriş

Merhaba bu yazımızda, uzak sunucuların ip ve port adreslerine bağlantı kurmak için kullanabileceğimiz socket modülünü tanıyacağız.

### Socket nedir?

[Socket](https://docs.python.org/3/library/socket.html#module-socket) python ile birlikte kurulu halde gelen bir modüldür. Bu modül sayesinde, istenilen ip ve port adresine bağlantı kurabiliriz. Şimdi gelin bu modülü nasıl kullanacağımıza ve bu modül ile neler yapabileceğimize bir bakalım.

### Socket modülü nasıl kullanılır?

Öncelikle socket modülünü import edip bir socket objesi oluşturmamız gerekiyor, bunun için;

```
import socket
```

```
new_socket = socket.socket()
```

sonra bu objenin metotlarını kullanarak işlemlerimizi yapacağız, bu metotlar:

* `socket.listen():Belirtilen port numarasında açılan sokette dinleme yapar.`
* `socket.accept`**():** Belirtilen port numarasında açılan sokete gelen istekleri alır.
* `socket.bind`**(*address*): S**oketi belirtilen ip addresine bağlar.
* `socket.close`**():** Soketi kapatır.
* `socket.connect`**(*address*):** Belirtilen addresteki uzak bir sokete bağlanır.
* `socket.recv`**(buf*size*):** Sokete gelen veriyi alır.
* `socket.sendall`**(*bytes*) : S**okete veri gönderir.

### Soketi dinleme

Soket açarak belirli bir portu dinleyebiliriz.

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

Bu kod 127.0.0.1:2222 adresinde açılan soketi dinleyecek, bir bağlantı yakaladığında gelen veriyi aynı şekilde geri gönderecektir. Ardından program sonlanır.

### Sokete bağlanma

Soket açarak belirli bir ip adresi ve porta bağlantı kurabiliriz.

```
import socket
```

```
HOST = '127.0.0.1'      
PORT = 2222             
with socket.socket() as s:  
    s.connect((HOST, PORT))  
    s.sendall(b'Merhaba')  
    data = s.recv(1024)  
print('Received ', data)
```

Bu kod 127.0.0.1:2222 adresinde çalışan soketle bağlantı kuracak bir bir data gönderecektir. Burada gönderilen data ‘merhaba’ mesajıdır. Ardından karşıdan gelen datayı alır ve program sonlanır.

![](https://cdn-images-1.medium.com/max/800/1*0epPGqrnUjKfpY9yg8YoKg.png)

Soket dinlediğimiz kodu *server.py i*simli bir dosyaya kaydedelim. Sokete bağlandığımız kodu ise *client.py* isimli bir dosyaya kaydedelim. Önce server.py dosyasını sonra client.py dosyasını çalıştırdığımızda bağlantı kurulmuş olacaktır.

### Port Taraması

Socket modülü ile ip ve port adreslerine bağlantı kurabiliyorduk. Bu sayede bir host üzerinde açık portları ve banner bilgilerini bulabiliriz. Banner bilgileri bu portta hangi servisin çalıştığı hakkında bize bilgi verecektir.

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

Typhoon makinesi üzerinde bu kodu çalıştırırsak bize açık portları ve banner bilgilerini gertirir.

![](https://cdn-images-1.medium.com/max/800/1*p297l0qe6OnuUmY7ep52sA.png)

### SSL

Https protokolü ile çalışan güvenli sitelere erişmeye çalıştığımızda bir SSL sertifikasına ihiyaç duyarız. Bunun için ssl modülünden yardım alabiliriz.

Varsayılan olarak http protokolü 80, https protokolü 443 portlarında çalışır.

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

### Son

Bu modül ile siber güvenlik alanında yapabileceğimiz başka ne tür işlemler olabilir? Yorumlara beklerim…