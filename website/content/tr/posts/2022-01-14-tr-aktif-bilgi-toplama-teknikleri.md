---
title: "[TR] Aktif Bilgi Toplama Teknikleri"
date: 2022-01-14
description: "Bu yazımızda, sizlere Aktif Bilgi Toplama Tekniklerinden bahsedeceğiz."
featuredImage: "https://cdn-images-1.medium.com/max/800/0*oiybh8KKS4kV2xtr.jpg"
---

### Aktif Bilgi Toplama Teknikleri

![](https://cdn-images-1.medium.com/max/800/0*oiybh8KKS4kV2xtr.jpg)

Bu yazımızda, sizlere Aktif Bilgi Toplama Tekniklerinden bahsedeceğiz.

### Aktif Bilgi Toplama Nedir?

Aktif bilgi toplama, hedef ile doğrudan temasa geçilerek yapılan bilgi toplama çeşididir. Aktif bilgi toplamayla, pasif bilgi toplamadan daha net ve güvenilir sonuçlar elde edebiliriz. Ancak, hedef ile doğrudan temasa geçildiği için hedefte iz bırakılır. Firewall, IDS, erişim loglarına kayıt bırakıldığıdan dolayı dikkatli olunmalıdır.

### DNS Taramaları

DNS protokolü intenetin temel yapı taşıdır, girdiğimiz alan adının hangi IP adresinde olduğunu bize DNS verir. İyi yapılandırılmamış bir DNS sunucusu dışarıya oldukça fazla bilgi verebilmektedir.

nslookup, dns sorgusu yapabileceğimiz temel bir araçtır.

```
nslokup www.pwnlab.me
```

dig aracı, dns sorgusu yapabileceğimiz araçlardan biridir. dig aracına parametre olarak alan adını vererek dns sorgusu yapabiliriz.

```
dig www.pwnlab.me
```

Bir alan adına ilişkin DNS sorgularının hangi DNS sunucularından geçtiğini sorgulamak için dig komutuna +trace parametresini ekleriz. Bu parametre ile DNS sorgu trafiğini izleyebiliriz.

```
dig pwnlab.me +trace
```

Bir alan adında(domain) ilişkin alt alan adlarını(subdomains) bulmak için brute force ile deneme yapılabilir. Bunun için dnsmap aracı kullanılır. Eğer bir wordlist verilmezse kendi içinde barındırılan standart listeyi kullanarak gerçekleştirir.

```
dnsmap www.pwnlab.me
```

### Port ve Servis Taramaları

Aktif bilgi toplamanın en etkin kullanıldığı alanlardan biri port ve servis taramalarıdır. Portlar üzerinde çalışan servislerde bulunan zafiyetlerin, doğrudan sunucuyu etkilediği durumlar olabilir.

nmap, Network Mapper’ın kısaltmasıdır. Bir ağdaki IP adreslerini ve bağlantı noktalarını taramak ve kurulu uygulamaları tespit etmek için kullanılan açık kaynak kodlu bir Linux aracıdır.

nmap, ağlarda hangi cihazların çalıştığının bulmasında, açık bağlantı noktalarının keşfedilmesinde ve güvenlik açıklarını tespit edilmesinde kullanılır.

nmap ile hedef belirlemede, hedefi farklı boyutlarda belirleyebilirsiniz.

* **nmap 192.168.1.1**: Sadece verilen adres için arama yapar.
* **nmap 192.168.1.1–15**: 1 ile 15 IP’leri dahil olmak üzere, verilen aralıktaki IP’leri tarar.
* **nmap 192.168.1.0/24**: subnet taraması yapar.
* **nmap pwnlab.me**: Alan adını arar
* **nmap -İL list.txt**: list.txt dosyası içerisinde yer alan IP’leri tarar.

nmap ile farklı türlerde aramalar yapabiliriz.

* **nmap -sP 192.168.1.0/24**: Ping ile tarama yapar.
* **nmap -PA 192.168.1.0/24**: TCP-ACK Ping ile analiz yapar.
* **nmap -PS 192.168.1.0/24**: TCP-SYN Ping ile analiz yapar.
* **nmap -PE 192.168.1.0/24**: ICMP Echo Request ile analiz yapar.
* **nmap -PU 192.168.1.0/24**: UDP Ping ile analiz yapar.

nmap ile yapılan port taramalarında portların durumunu ifade eden 6 farklı tanım vardır.

* **open**: Port açıktır ve bir uygulama tarafından dinleniyordur.
* **closed**: Port kapalıdır, fakat erişilebilirdir. Portu dinleyen bir uygulama yoktur.
* **filtered**: Filtreleme işlemi nedeniyle nmap portla ilgili bilgi tespiti yapamamıştır.
* **unfiltired**: ACK Scan için döner. Portlar erişilebilir fakat açık olduğu tespit edilememiştir.
* **open|filtered**: Açık veya filtrelenmiş olduğu tespit edilememiştir.
* **closed|filtered**: Kapalı ya da filtrelenmiş olduğu tespit edilmemiştir.

<https://www.kali.org/tools/netcat/>

Netcat, Network dünyasında İsviçre çakısı olarak kabul edilir. Bir çok özelliğe sahip, kullanımı kolay ve çok amaçlı bir araçtır, bu yüzden siber güvenlikte de İsviçre çakısı olarak kabul edebiliriz. Netcat’in birçok özelliği bulunmaktadır bunlardan başlıcaları :

* Port taraması
* Port yönlendirme
* Dosya yükleme ve indirme (dosya aktarımı)
* Uzaktan shell açma
* Backdoor

**Kullanım Parametreleri**

```
nc -h
```

```
nc [options] [destination ip] [port]
```

yukarıdaki örnek komut satırıyla hedef ip üzerinde kullanım parametlerini kullanarak işlemler yapabilirsiniz.

[nbtscan](https://www.kali.org/tools/nbtscan/), NetBIOS ad bilgileri için IP ağlarını taramaya yönelik bir araçtır. Sağlanan aralıktaki her adrese NetBIOS durum sorgusu gönderir ve alınan bilgileri okunabilir biçimde listeler. Yanıt veren her bilgisayar için IP adresi, NetBIOS bilgisayar adı, oturum açmış kullanıcı adı ve MAC adresi bilgileri listelenir.

```
nbtscan -h
```

**Kullanım parametreleri:**

* -v: Ayrıntılı çıktı; her bilgisayardan alınan tüm isinleri yazdırır.
* -d: Döküm paketleri; tüm paket içeriğini yazdırır.
* -e: Çıktıyı farklı formatlarda biçimlendirir.
* -t: Zaman aşıımı; yanıt için bekleme zamanıdır, varsayılan olarak 1000 milisaniyedir.
* -b: Bant genişliği; bant genişliğini sınırlandırır. (yavaş internet bağlantılarında kullanışlıdır)
* -r: Tramalar için yerel bağlantı noktasını kullanır.
* -q: Bannerları ve hata mesajlarını yazdırır.
* -s: Ayırıcı; çıktıyı sütünlara ayırırır.
* -h: yardım dökümanını yazdırır.
* -m: Yendien aktarım; yeniden aktarımların sayısı (varsayılan olarak 0)
* -f: Dosya adı; IP adreslerini dosya formatında vermek için kullanılır.

```
nbtscan 77.92.138.0/24
```

<https://www.kali.org/tools/netdiscover/>

Netdiscover aracı aynı ağdaki cihazların işletim sistemlerini, Mac, IP ve router adreslerini gösterebilen bir keşif aracıdır.

**Özellikleri :**

* Basit ARP Tarayıcısıdır
* Birden çok Alt ağı tarayabilir.
* Aktif ve Pasif Modlarda çalışabilir.
* Zamanlama seçenekleri bulunur.

**Kullanım Parametreleri :**

* -i device: Kendi cihazınız.
* -r range: Otomatik tarama yerine belirli bir aralığını tarar. 192.168.6.0/24,/16,/8
* -l file: Verilen dosyada bulunan aralıkların listesini tarar
* -p passive mode: Hiçbir şey göndermez, sadece sniff yapar
* -m file: Bilinen MAC’lerin ve ana bilgisayar adlarının listesini tarar
* -F filter: pcap filtre ifadesini özelleştir
* -s time: Her arp isteği arasındaki bekleme süresi (milisaniye)
* -n node: Tarama için kullanılan son ip sekizlisi (2'den 253'e kadar)
* -c count: Her arp talebinin gönderilme sayısı (paket kaybı olan ağlar için)
* -f Hızlı mod taramayı etkinleştirir, çok zaman kazandırır
* -d Otomatik tarama ve hızlı mod için ana sayfa yapılandırma dosyalarını yoksayar
* -S, Her istek arasında bekleme zamanını zorunlu etkinleştirir.
* -P Yazdırma sonuçları, başka bir program tarafından ayrıştırılmaya uygun bir biçimde çıkar.
* -N Başlığı yazdırma. Yalnızca -P komutu kullanıldığında geçerlidir.

### Çok işlevsel bir araç

<https://www.kali.org/tools/dmitry/>

Dmitry aracı, pasif bilgi toplamada gördüğümüz whois sorgularının yanında, port taraması da yapabilen gelişmiş bir araçtır. Bununla beraber, alt alan adları(subdomains) ve E-postalar hakkında da bilgi toplayabilir. Pasif bilgi toplamada ve aktif bilgi toplamada pek çok aracın yaptığı işi tek başına yapabilir.

```
dmitry -h
```

* -h parametresi: help dökümanını açar.
* -o parametresi:
* -i parametresi: sorgulanan IP adresinde bir whois sorgusu gerçekleştirir.
* -w parametresi: sorgulanan alan adında(domain name) bir whois sorgusu gerçekleştirir.
* -n parametresi: Netcraft sorgusu yapar.
* -s parametresi: Hedef sistemdeki alt alan adları(subdomains) üzerinde tarama yapar.
* -e parametresi: Hedef sistemdeki E-posta adreslerini sorgular.
* -p parametresi: Hedef sistem hakkında TCP port taraması yapar.
* -f parametresi: Hedef sistemde filtrelenmiş olan TCP portlarını gösterir.
* -b parametresi: Banner yakalamakta kullanılır.
* -t parametresi: TCP port taraması yaparken kullanılacak olan TTL süresini ayarlar. Varsayılan olarak 2 saniyedir.

```
dmitry www.pwnlab.me
```

Belirtilen alan adıyla ilgili, bütün sorguları yapar ve bizlere sunar.

---

*Originally published at* [*https://pwnlab.me*](https://pwnlab.me/aktif-bilgi-toplama-teknikleri/) *on January 14, 2022.*