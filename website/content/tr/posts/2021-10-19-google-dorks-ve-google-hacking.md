---
date: '2021-10-19'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/0*wiiHrCXFveGl4-e-
title: Google Dorks ve Google Hacking
type: posts
---

### Google Dorks ve Google Hacking

![](https://cdn-images-1.medium.com/max/800/0*wiiHrCXFveGl4-e-)

Merhaba, bu yazımda sizlere pasif bilgi toplamada çok işimize yarayan google dorksları tanıtacağım. Nasıl kullanıldığından bahsedeceğim. Ardından, bu dorklarla nasıl zafiyetler bulabileceğimizi ve neler elde edebileceğimizi anlatmaya çalışacağım.

![](https://cdn-images-1.medium.com/max/800/0*k0S1ZefFPj_ccZmA.jpg)

Google dork, google arama motoru ile yapacağımız aramalarda bizlere kolaylık sağlayan bazı parametreleri barındıran bir sistemdir. Bu parametreler, arayacak olduğumuz kelimelere yönelik filtreleme işlemi yapmamıza olanak sağlar. Bu sayede google’ın indexlediği milyarlarca site içerisinde aradığımız bilgiye kolaylıkla ulaşabiliriz. Bu sistem pasif bilgi toplama işlemlerinin vazgeçilmezidir.

---

### Google Arama Parametreleri

Google üzerinde arama yaparken, belli parametreler kullanarak aramamızı detaylandırabiliriz. Bu parametrelere ve ne işe yaradığına hep beraber bakalım…

Sayfa metninde arama yapmak için kullanılır.

Örnek:

```
intext:Provided by ProjectSend
```

Sayfa başlığında arama yapmak için kullanılır.

Örnek:

```
intitle:"index of backup.php"
```

URL içinde arama yapmak için kullanılır.

Örnek:

```
inurl:"admin-login.php"
```

### inposttitle/allinposttitle:

Blog araştırmalarında, blog başlığında arama yapmak için kullanılır.

Örnek:

```
inposttitle:"Google Dork"
```

Anahtar kelimeler üzerinde arama yapmak için kullanılır. Belirtilen anahtar kelimeye sahip siteleri popülerliğine gore sıralar.

Örnek:

```
inanchor:"cyber security"
```

İstenilen dosya uzantısına sahip sonuçları bulmak için kullanılır.

Örnek:

```
filetype:log "AUTHTOKEN"
```

Belirtilen sitenin önbelleğinde bulunan web sayfasının sürümünü gösterir.

Örnek:

```
cache:www.google.com
```

Belirtilen sitede arama yapmak için kullanılr.

Örnek:

```
site:"pwnlab.me" "Google Dorks"
```

Bilinen bir siteye benzer içeriğe sahip web sitelerini bulmak için kullanılır.

Örnek:

```
related:"pwnlab.me"
```

Belli bir tarihten önceki veya sonraki sonuçları listelemek için kullanılır. before önce, after sonra anlamındadır.

Örnek:

```
allintext:password filetype:log after:2018 before:2021
```

### Google Arama Operatörleri

Operatörler, dorkların yazımında parametreler ile kullanılan yardımcı karakterlerdir.

Aradığınız kelime grubunun etrafında tırnak işaretleri kullanmak, standart arama ile elde edeceğiniz geniş sonuçlar yerine tam eşleme sonuçlarını bulmanıza yardımcı olacaktır.

örnek

```
"open source intelligence"
```

Eksi operatörü, belirli kelimeleri içeren sonuçların gösterilmesinden kaçınmak için kullanılır.

örnek

```
site:facebook.* -site:facebook.com
```

Artı operatörü, sözcükleri birleştirmek için kullanılır. Birden fazla belirli anahtar kullanan sayfaları algılamak için yararlıdır

örnek

```
site:facebook.com +site:facebook.*
```

Yıldız operatörü, herhangi bir kelimeyle doldurulabilecek bir alanı temsil etmek için kullanılır. Yani arama sonucunda yıldız operatörünün olduğu yere farklı kelimeler gelebilir.

örnek

```
site:*.com
```

Bu örnekte, ‘.com’ uzantısı ile biten bütün siteler listelenecektir.

Belirtilen kelimenin eş anlamlılarını da aramak için kullanılır.

örnek

```
~set
```

Örneğin, “~set” kelimesini sorgulamak, “set” kelimesinin eş anlamlısı olan “configure”, “collection” ve “change” gibi kelimeleri içeren sonuçları listeleyecektir.

| ve OR operatörü türkçede “veya” mantıksal operatörüne karşılık gelir. İki koşuldan biri veya her ikisinin sağlandığı sonuçları listeler.

örnek

```
site:facebook.com | site:twitter.com
```

& operatörü ve AND operatörü türkçede “ve” mantıksal operatörüne karşılık gelir. İki koşuldan yalnızca her ikisininde sağladığı sonuçları listeler.

örnek

```
site:facebook.com & site:twitter.com
```

---

### Google Hacking Nedir?

![](https://cdn-images-1.medium.com/max/800/0*7xiNCg0pcIr744aB.png)

Google hacking, internette web sayfalarının zafiyetli bir indexinin bulunmasında veya tüm sitelerde açık verileri arayıp bilgi toplanmasında kullanılan yöntemdir. Örneğin, bir google sorgusuyla, bir sitenin login page’ini bulabilr ve burada zafiyet taraması yapabiliriz. Yani, dorklarla yaptığımız sorguların, hacking işlemleri için kullanımına ‘Google Hacking’ diyebiliriz.

### Google Hacking Teknikleri

Google Hacking tekniklerini kullanarak internette birçok farklı bilgiye ulaşabiliriz. Ne tür bilgilere, nasıl ulaşabiliriz hep beraber bakalım…

### Log dosyaları

Log dosyaları, herhangi bir web sitesinde hassas bilgilerin nasıl bulunabileceğinin mükemmel bir örneğidir.

Google’ın indexlediği log dosyalarına erişmek için ,allintext ve filetype parametrelerinden yararlanabiliriz.

```
allintext:username filetype:log
```

Bu sorgu, internette google’ın indexlediği tüm log dosyalarının içinde “username” içeren sonuçları listeleyecektir.

### Güvenlik açığı bulunan web sunucuları

Google dorkları kullanarak belli güvenlik açıkları bulunan web sitelerini bulabiliriz. Bir web sitesinin URL’sinde “/proc/self/cwd/” ifadesinin geçmesi o sitede bir zafiyet olduğuna delildir.

```
inurl:/proc/self/cwd
```

Bu dork ile zafiyetli siteleri bulabiliriz, Aşağıdaki ekran görüntüsünde görebileceğiniz gibi, savunmasız sunucu sonuçları, açık dizinleriyle birlikte listelenecektir.

### Açık FTP sunucuları

Google, yalnızca HTTP tabanlı sunucuları indekslemekle kalmaz, aynı zamanda açık FTP sunucularını da indeksler.

Aşağıdaki dork ile, genel FTP sunucularını bulabiliriz.

```
intitle:"index of" inurl:ftp
```

### ENV dosyaları

.env dosyaları, web geliştirme ortamlarında genel yapılandırmaları bildirmek için kullanılmaktadır. Önerilen uygulamalardan biri, bu .env dosyalarını herkesin erişemeyeceği bir yere taşımaktır. Ancak, bunu umursamayan ve .env dosyalarını web sitesi dizinine ekleyen birçok geliştirici var.

```
intitle.index of .env
```

Kullanıcı adlarının, şifrelerin ve IP’lerin doğrudan arama sonuçlarında gösterildiğini fark edeceksiniz.

### SSH özel anahtarları

SSH özel anahtarları, SSH protokolünde gelen-giden bilgilerin şifresini çözmek için kullanılır. Genel bir güvenlik kuralı olarak, özel anahtarlar(private keys), uzak SSH sunucusuna erişmek için kullanılan sistemde kalmalı ve kimseyle paylaşılmamalıdır.

Aşağıdaki dork ile, Google amca tarafından indexlenen SSH private keyleri bulabileceksiniz.

```
intitle:index.of id_rsa -id_rsa.pub
```

### E-posta listeleri

Google Dorks’u kullanarak e-posta listelerini bulmak oldukça kolaydır. Aşağıdaki örnekte, çok sayıda e-posta adresi içerebilecek excel dosyalarını listeleyebiliriz.

```
filetype:xls inurl:"email.xls"
```

### Canlı kameralar

Google amcanın indexlediği ve IP ile kısıtlanmayan canlı kamera web sayfalarına erişim oldukça kolaydır. Aşağıdaki dorklarla, canlı kameralara erişim sağlayabiliriz.

IP tabanlı kameralar için:

```
inurl:top.htm inurl:currenttime
```

WebcamXP tabanlı aktarımları bulmak için:

```
intitle:"webcamXP 5"
```

Genel canlı kameralar için:

```
inurl:"lvappl.htm"
```

### SQL dökümleri

Web sunucularında, yedekleri depolayan site yöneticileri tarafından kullanılan yanlış yedekleme mekanizmaları sonucu, SQL dökümleri sitelerde görünür. Sıkıştırılmış bir SQL dosyası bulmak için şunu kullanırız:

```
"index of" "database.sql.zip"
```

### WordPress Admin

Bir dork ile WordPress Yönetici giriş sayfalarını bulmak çok zor değil:

```
intitle:"Index of" wp-admin
```

Apache sunucuları yanlış yapılandırılmış olabilir. Bu durum, onları botnet’ler için harika hedefler haline getirir.  
 Aşağıdaki dork ile Apache2 web sayfalarını bulabiliriz:

```
intitle:"Apache2 Ubuntu Default Page: It works"
```

### phpMyAdmin

LAMP(Linux, Apache, MySQL, PHP) sunucularında sıklıkla keşfedilen bir diğer riskli araç ise phpMyAdmin yazılımıdır.

Bu yazılıma sahip siteleri bulmak için kullanılacak dork:

```
"Index of" inurl:phpmyadmin
```

![](https://cdn-images-1.medium.com/max/800/0*igJI4VAzSEKlUXSX.png)

### JIRA/Kibana

Google dorks, önemli kurumsal verileri (JIRA veya Kibana aracılığıyla) barındıran web uygulamalarını bulmak için de kullanılabilir.

```
inurl:Dashboard.jspa intext:"Atlassian Jira Project Management Software" inurl:app/kibana intext:Loading Kibana
```

[Google Hacking Database](https://www.exploit-db.com/google-hacking-database), hacking faaliyetleri için kullanabileceğimiz dorkların bulunduğu bir veritabanıdır. Exploit DB’nin sunduğu bu platform da, birçok uzmanın kullanmış olduğu dorkları listeleyebilir, işimize yarayacağını düşündüğümüz dorkları kulanabiliriz.

---

*kaynak:* Google Hacking for Penetration Testers*,*Johnny Long, Bill Gardner, Justin Brown, 2015 *Originally published at* [*https://pwnlab.me*](https://pwnlab.me/tr-google-dorks-ve-google-hacking/) *on October 19, 2021.*