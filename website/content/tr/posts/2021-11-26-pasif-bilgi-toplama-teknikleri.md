---
title: "Pasif Bilgi Toplama Teknikleri"
date: 2021-11-26
draft: false
---

---

### Pasif Bilgi Toplama Teknikleri

![](/images/0_2NsHt2LZX3ORPYxb.jpg)

Merhaba, Mehmet Bulut hocamla birlikte hazırladığımız bu yazımızda, sizlere Pasif Bilgi Toplama Tekniklerinden bahsedeceğiz.

### Pasif Bilgi Toplama Nedir?

Pasif Bilgi Toplama, hedef ile doğrudan temasa geçilmeden yapılan bilgi toplama çeşididir. Örneğin; karşıda oturan biriyle ilgili olarak yanınızdaki kişiye soru sormanız pasif bilgi toplamadır.

Sızma testlerinde, öncelikle sistemle ilgili bilgi toplanıp, sınıflandırılır. Bu bilgilerin çoğu internet üzerinden elde edilebilir. Bunun haricinde farklı bilgi toplama yöntemlerinden de faydalanılabilir.

---

### IP ve Alan Adları Üzerinden Bilgi Toplama Teknikleri

Whois sorgusuyla, bir domainin veya IP adresinin tanımlandığı sahibiyle ilgili bilgilere erişebiliriz. Bunlar; hedef ile ilgili IP aralıkları, sorumlu yönetici ve bu yöneticilerin e-posta adresleri gibi bilgilerdir.

Dünya üzerinde IP adresi ve alan adı dağıtımı tek bir merkez üzerinden yönetilmekedir. [ICANN](https://www.icann.org/)(Internet Corporation for Asigned Named and Numbers) adı verilen bu ana merkez dışında beş farklı RIR; yani bölgesel internet kayıtlayıcısı bulunmaktadır.

Whois sorguları bu RIR’ler üzerinden yapılamktadır. Eğer, sorgulanılan IP adresi sorguladığımız RIR’ın kontrolünde değilse size ilgili RIR’ın bilgisini verecektir.

Bir IP adresine ait bilgileri linux terminal ekranından da öğrenebilirsiniz.

Sorgulanan IP adresi ya da alan adının barındırıldığı işletim sistemi, kernel versiyonu, web servisi olarak çalışan yazılım hatta uptime bilgisine kadar gösterebilen bir web sayfasıdır. Netcraft hedef sisteme sorgular yapıp, dönen cevaplara göre de tahminlerde bulunur.

ilgili siteye [www.netcraft.com](http://www.netcraft.com) adresinden ulaşabiliriz.

Shodan dünya üzerindeki çeşitli servisler, uygulamaları bulmayı sağlayan arama motorudur. Her ne kadar ismi arama motoru olsa da yaptığı iş gereği diğer arama motorlarından ayrılır. Diğer arama motorları “nginx kullanan sunucuları bulmak istiyoruz? sorusuna cevap veremezken, shodan bu rorunun yanıtını verebiliyor.

Shodanın birçok özelliği bulunmaktadır. Bunlardan en etkilisi “banner grabing” tekniğiyle elde ettiği verileri kayıt altına alıp, çeşitli filtrelerle birlikte sizlere sonuç döndürebilesidir.

Shodan üzerinde ülkelere, şehirlere, servis sağlayıcılarına, servislere, versiyonlara, platformlara yönelik aramalar gerçekleştirebiliriz.

ilgili siteye [www.shodan.io](https://www.shodan.io) adresinden ulaşabiliriz.

### DNSdumpster

DNSdumpster, bir domainle ilgili ana sunucuları keşfedebilen ücretsiz bir pasif bilgi toplama aracıdır. Saldırganların bakış açısından görünür sunucuları bulmak, güvenlik değerlendirme sürecinin önemli bir parçasıdır.

ilgili siteye [www.dnsdumpster.com](http://dnsdumpster.com) adresinden ulaşabiliriz.

### Centralops

centralops adresi üzerinde bir domaine ait IP, detaylı whois bilgisi, DNS kayıtları ve TcpQuery bilgileri elde edilmektedir. Nslookup bölümünde ise çok gelişmiş DNS sorguları yapılabilmektedir. Pasif bilgi toplamada olmazsa olmaz siteler arasındadır.

İlgili siteye [www.centralops.net](http://www.centralops.net) adresinden ulaşabiliriz.

### IP Location

Hedef ip adresini 5 farklı RIR’de sorgulama gerçekleştirerek coğrafi konum tespiti sağlar. Bu sorgulamanın sonuçları servis sağlayıcılar arasında değişebilir.

İlgili siteye [www.iplocation.net](https://www.iplocation.net/) adresinden ulaşabiliriz.

### Arşiv Siteleri

1996 yılından bu yana tüm interneti kayıt altına alan bir sistemdir. Sayfaların yıllara, aylara, günlere göre o anlık görüntüsünü getirir. Bir web sitesinin önceki sürümlerini bulmak için faydalıdır.

ilgili siteye [www.archive.org](http://www.archive.org) adresinden ulaşabiliriz.

Maltego açık kaynaklar üzerinden bulduğu verileri görselleştirerek analiz yapmamıza olanak sağlayan bir araçtır. Aşağıda örnekte verildiği gibi bir web sitesinin ismini yazıp sorgulamak için çalıştırdığımız zaman, bu ada kayıtlı dns, mail sunucusu, nameserver adresleri gibi bir çok veriyi gösteriyor. Bu işlemlere ek olarak

* Alt alanlar ve genel IP adresleri
* Kullanıcı adları ve şifreler
* Dizin listesi
* Herkese açık hassas belgeler ve dosyalar
* Sızan kimlik bilgileri gibi bilgilere ulaşabilirsiniz.

---

### Kullanıcı Adı Üzerinden Bilgi Toplama Teknikleri

### Name Checkup

Name Checkup, verilen kullanıcı adının başka hangi platformlarda kullanıldığını bulmamıza yarayan basit bir araçtır.

ilgili siteye [www.namecheckup.com](https://namecheckup.com/) adresinden ulaşabiliriz.

### Username Search

Kullanıcı adlarının, hangi platformlarda kullanıldığını bulabileceğimiz bir başka araç ise Instant Username Search’dür. Name CheckUp’a göre daha fazla platform üzerinde arama yapabilir.

ilgili siteye [www.instantusername.com](https://instantusername.com/#/) adresinden ulaşabiliriz.

---

### Resimler Üzerinden Bilgi Toplama Teknikleri

### Image Search

Bir görüntü dosyasının upload edilerek, benzer resimleri ve görüntü ile alakalı sonuçları getiren bir arama motoru teknolojisidir. Reverse image yapılarak :

* Bir görüntünün kaynağını
* Daha önce yüklenip yüklenmediğini
* Telif hakkı kapsamında olup olmadığı
* Bilmediğimiz ürün veya nesnelerin özellikleri
* Dezenformasyona neden olan görsellerin asıl kaynağının tespit edilmesi

durumlarında kullanabiliriz. En sık kullanılan Image Arama Motoru [Google](https://www.google.com/imghp) ve [TinyEye](https://tineye.com/) dir.

Exif fotograf hakkındaki verilerin bulunduğu yerdir. Bu bölümde fotoğrafın çekildiği yer, tarih, saat gibi bir çok bilgi mevcuttur. Bu bilgileri toplamak için en yaygın kullanılan [ExifTool](https://exiftool.org/) ve [Jeffrey’s Image Metadata Viewer](http://exif.regex.info/exif.cgi) araçlarıdır.

---

### Genel Bilgi Toplama Teknikleri

### Google Hacking

Google Hacking, google üzerinde yaptığımız sorguları spesifik hale getirebileceğimiz parametrelerle yapılan bilgi toplama tekniğidir. Bu parametrelerle yazdığımız sorgulara dork adını vermekteyiz. Örneğin;

```
inurl:"pwnlab" intitle:"pasif bilgi toplama"
```

[Google Dorks ve Google Hacking](https://pwnlab.me/tr-google-dorks-ve-google-hacking/) isimli yazımızda bu dorklardan ve kullanım tekniklerinden ayrıntılı bir şekilde bahsettik. Google hacking hakkında daha detaylı bilgi edinmek için bu yazımıza bakabilirsiniz.

### theHarvester

theHarvester, Linux üzerinde çalışan bir tooldur. Bu tool ile Linkedin, Google, Twitter, Yahoo gibi bir çok web sitesini tarayarak açık kaynaklardan bilgi toplayabiliriz.

Aşağıdaki komut ile toolumuzu indiriyoruz.

sudo apt install theharvester

Kurulumunu yaptıktan sonra aşağıdaki komut ile pwnlab.me sitesi ile alakalı googleda tespit ettiği bilgileri karşımıza getirecektir.

theHarvester -d pwnlab.me -b google

Ayrıca google yerine linkedin, bing, all vs gibi komutlarla site bazlı bilgiler tespit edebilirsiniz.

Kullanımı ile alakalı ayrıntılı bilgiye ulaşmak için <https://github.com/laramies/theHarvester> adresine gidebilirsiniz.

### OSINT Framework

Osint Framework yüzlerce pasif bilgi toplama araçlarına ulaşabileceğiniz bir web sitesidir. İçerisindeki kategorilerden hedefinize uygun olan bölüme tıklayınca daha ayrıntılı sorgulama yapmanıza olanak sağlar. Ayrıca çıkan seçeneklerin sağında (T) yazısı mevcutsa bunu sadece terminal üzerinden gerçekleştirebileceğinizi görebilirsiniz.

ilgili siteye [www.osintframework.com](http://osintframework.com) adresinden ulaşabiliriz.

---

*Originally published at* [*https://pwnlab.me*](https://pwnlab.me/tr-pasif-bilgi-toplama-teknikleri/) *on November 26, 2021.*