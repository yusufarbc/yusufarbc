---
date: '2023-11-15'
description: Merhaba bu yazımda Domain Name System(DNS) protokolünü ve Wireshark ile analizini anlatmaya çalışacağım.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*_OuE2zljUjPrg0g7TfljyQ.png
series:
- Wireshark ile Ağ Analizi
title: DNS Wireshark Analizi
type: posts
---

Merhaba bu yazımda Domain Name System(DNS) protokolünü ve Wireshark ile analizini anlatmaya çalışacağım.

### DNS Nasıl Çalışır?

DNS, [www.wiresharktraining.com](http://www.wiresharktraining.com) gibi sembolik ana bilgisayar adlarını IP adreslerine dönüştürmek için kullanılır. DNS ayrıca ad bilgilerini DNS sunucuları arasında aktarmak, bir IP adresiyle ilişkili ana bilgisayar adını belirlemek (ters veya işaretçi sorgusu) ve MX (posta alışverişi) kaydı gibi diğer ad öğelerini aramak için de kullanılabilir.

DNS ağ üzerindeki en önemli uygulamalardan biridir. Bir DNS sorunu, bilgisayarların hostname bilgilerini kullanırken birbirlerini bulmalarını engelleyecektir.

![](https://cdn-images-1.medium.com/max/800/1*-XBRoGHxww1KuVqyLDEznA.png)

DNS paketi

DNS UDP veya TCP üzerinden çalışabilir. Yaygın olarak UDP kullanan DNS sorguları ve yanıtları görürsünüz. Bölge aktarımları TCP üzerinden çalışır. DNS için varsayılan port numarası 53dür.

[RFC 1035](https://www.rfc-editor.org/rfc/rfc1035), Domain Names — Implementation and Specification, UDP paket yükü üzerinden DNS’yi 512 bayt ile sınırlar. Bu genellikle bir DNS sorgusu için yeterlidir. Ancak bir yanıt 512 bayttan fazla alan gerektirdiğinde, yanıtta bir kesme bayrağı biti gönderilir. Bu, çözümleyicinin DNS sorgusunu daha büyük bir paket boyutuna izin veren TCP kullanarak tekrar göndermesini tetikler.

[RFC 2671](https://www.rfc-editor.org/rfc/rfc2671), DNS için Uzatma Mekanizmaları (EDNS0), UDP üzerinden 512 bayttan daha fazlasına izin verir.

### DNS Query/Response Analizi

Domain çözümlemesi DNS sorgu ve yanıt işlemleri çok basittir. Bir istemci DNS sunucusuna bir DNS sorgusu göndererek genellikle bir domain karşılığında bir IP adresi ister. DNS sunucusu ya doğrudan sahip olduğu bilgilerle yanıt verir ya da istemciler adına diğer DNS sunucularına sorar.

![](https://cdn-images-1.medium.com/max/800/1*2Ye8QGf5KQIGJriwo33-jQ.png)

A kaydı DNS Sorgusu

Şekilde www.winpcap.org için A kaydına (CNAME) yönelik standart bir DNS isteğini göstermektedir. Bu DNS sorgusu, kullanıcının domaini tarayıcı URL bölümüne girip Enter tuşuna bastığında otomatik olarak oluşturulmuştur.

Bir istemcinin talep ettiği ad, hedefin gerçek adı olmayabilir. Bu durumda, www.winpcap.org için bir canonical name(CNAME) veya gerçek ad döndürülmüştür. CNAME [winpcap.org](http://www.winpcap.org)dur ve bu ana bilgisayarın adresi 128.121.79.138'dür.

### DNS Hataları Analizi

En yaygın DNS sorunu, bir adın ad namse server veritabanında bulunmaması nedeniyle oluşan hatadır. Bunun nedeni yanlış bir ad girilmesi veya henüz İnternet name serverlarına yayılmamış yeni bir name girilmesi olabilir.

![](https://cdn-images-1.medium.com/max/800/1*QGZ4PNFbyz1aVA6W3cqXLQ.png)

Bulunamayan Domain Sorgusu

Şekilde bir kullanıcı 2.26.64.24.in-addr.arpa adresine erişmeye çalışmaktadır. Name Server böyle bir domain olmadığını belirterek yanıt verir. Kullanıcı domain çözümleyemezse, hedef adrese ulaşamaz.

Sunucu hatası yanıtları, name serverın bir hata nedeniyle istemci için bilgileri çözümleyemediğini gösterir. Bu, name serverın başka bir name servera bir sorgu göndermesi (özyinelemeli bir sorgu yoluyla) ve yanıt beklerken zaman aşımına uğraması veya bir tür dahili hata nedeniyle yanıtın anlaşılamaması veya bir sorguyla bağlantılı olmaması olabilir.

![](https://cdn-images-1.medium.com/max/800/1*ubKDRzHewQqeMyGqbDFqMw.png)

DNS Hataları Sonucu IP Çözümlemesi Yapılamıyor

Şekilde [www.nmap.org](http://www.nmap.org) adresine ulaşmaya çalışırken alınan sunucu hatası yanıtı gösterilmektedir. Bunun geçerli bir adres olduğunu biliyoruz, ancak DNS bunu çözümleyemiyor. Bir DNS sorunu nedeniyle siteye ulaşamıyoruz. Zaman sütununa dikkat edin; istemcinin bir DNS sorgusu gönderdiğini, ardından sorguyu yeniden göndermeden önce yanıt için 1 saniye beklediğini görebiliriz. İstemci üçüncü sorgudan önce 1 saniye daha beklemiş, ancak dördüncü DNS sorgusundan önce bu bekleme süresini iki katına çıkararak yaklaşık 2 saniyeye çıkarmıştır.

DNS sorunlarının nedenini bulmak için Wireshark’ı DNS sunucusunun yukarısına taşıyarak bu konumdaki arama işlemini izlemeniz gerekebilir.

![](https://cdn-images-1.medium.com/max/800/1*CaxBBdj7NrXCZ3tIF-Gxxg.png)

ICMP cevabı hedefde 53 portuun açık oladığını belirtir.

Şekilde istemcimiz DNS sorguları göndermekte ve bu sorgular ICMP Destination Unreachable/Port Unreachable yanıtlarıyla yanıtlanarak 53 numaralı portun bu hostta açık olmadığını göstermektedir.

Bu durumda hatanın nerde olduğu, istemcinin DNS sunucusunun doğru IP adresine sahip olup olmadığına ya da DNS sunucusu servisinin istek atılan IP üzerinde çalışıyor olup olmadığına bağlıdır. Bu durumda, istemci tekrar dener — yapılandırılmış yalnızca bir DNS sunucusu vardır(genelde 2 tane olur), bu nedenle aramayı tekrar dener. Sunucu bu portun dinlemediğini belirttiği için istemcinin isteği yine reddedilir.

### DNS Paket Yapısı

Tek bir transport protokolü (UDP veya TCP) kullanan diğer uygulamaların aksine, DNS hem UDP hem de TCP kullanır. DNS genellikle name resolution istekleri ve yanıtları için UDP-53'ü, zone transferleri ile daha büyük name resolutionlar ve yanıtları için TCP-53'ü kullanır.

![](https://cdn-images-1.medium.com/max/800/1*WDRDLWOoT1bKcj8KM2dyVA.png)

[www.winpcap.com](http://www.winpcap.com) adresine yapılan DNS name reqestleri

Tüm DNS paketleri Şekilde gösterildiği gibi dört ana bölümden oluşan tek bir temel yapı kullanır.

#### Transaction ID

İşlem Kimliği alanı, DNS sorgularını yanıtlarla ilişkilendirir. Bu alana ve değere filtre uygulayabilirsiniz (örneğin, dns.id==0x05b5) tüm ilişkili DNS sorgularını/yanıtlarını görüntülemek için.

#### Flags

Bayraklar baytı, sorgu özelliklerini tanımlayan çok sayıda alandan oluşur.

#### Query/Response

Sorgu/Yanıt biti paketin bir sorgu mu (0) yoksa bir yanıt mı (1) olduğunu gösterir. DNS sorgularını (dns.flags.response==0) veya yanıtlarını (dns.flags.response==1) görüntülemek için bir Wireshark filtresi oluşturabilirsiniz.

#### Opcode

Opcode alanı sorgu türünü belirtir. En yaygın olarak, bu alan standart sorgular için 0000 içerir ve yanıtlarda alan 0000 olarak bırakılır.

#### Authoritative Answer

Yanıtlarda kullanılan Yetkili Yanıt alanı, yanıtın alan adı için yetkili bir sunucudan geldiğini gösterir.

#### Truncation

Kesme alanı, DNS yanıtının uzunluk nedeniyle kesildiğini gösterir. Bir istemci kesilmiş bir DNS yanıtı görürse, sorguyu TCP üzerinden yeniden denemelidir. TCP tabanlı sorgular/yanıtlar görmek çok yaygın değildir.

#### Recursion Desired

Sunucunun özyinelemeli sorgu işlemlerini kullanıp kullanamayacağını belirtmek için DNS sorgularında özyineleme tanımlanabilir. Yineleme, bir DNS sunucusunun istemci adına başka bir sunucudan yanıt istemesine olanak tanır. Yerel ad sunucusu yanıta sahipse, doğrudan yanıt verecektir. Cevaba sahip değilse, istemci adına arama işlemine başlayacaktır.

#### Recursion Available

Yanıtlarda tanımlanan bu ayar, DNS sunucusunda yinelemenin kullanılabilir olup olmadığını belirtir.

#### Reserved

Bu alan 0 olarak ayarlanmıştır.

#### Rcode (Response Code)

Rcode alanı yanıtta bir hata durumu olup olmadığını gösterir. Aşağıdaki tabloda olası Rcode değerleri listelenmektedir.

* Kod 0: Hata durumu yok.
* Kod 1: Biçim hatası-sorgu yorumlanamadı.
* Kod 2: Sunucu hatası-sunucu, ad sunucusundaki bir sorun nedeniyle sorguyu işleyemedi.
* Kod 3: Ad hatası-alan adı mevcut değil.
* Kod 4: Uygulanmadı.
* Kod 5: Reddedildi-ad sunucusu ilke nedeniyle işlevi gerçekleştirmeyi reddediyor.

#### Question Count

Bu alan Soru bölümündeki soru sayısını gösterir. Genellikle sorgu paketi başına yalnızca bir soru görürsünüz.

#### Answer Resource Record (RR) Count

Bu alan, Yanıt RR’leri bölümündeki yanıtların sayısını gösterir. Bir yanıt CNAME bilgisi içeriyorsa, Yanıt RR Sayısı alanında muhtemelen iki sayı göreceksiniz — biri CNAME için diğeri CNAME kaydının IP adresi için.

#### Authority RRs Count

Bu alan Yetki RR’leri bölümündeki yanıtların sayısını gösterir. Bu yanıtlar, adlandırma hiyerarşisinde hedef ada daha yakın olan sunuculardan gelir.

#### Additional RRs Count

Bu alan, Ek RR’ler bölümündeki yanıt sayısını gösterir. Bu bölümde, Yetki RR bölümündeki sunucular için A kayıtları bulabilirsiniz.

#### Queries

Bu değişken uzunluktaki alan, çözümlenmekte olan adı ve istenen bilgi türünü tanımlar.

#### Name

Bu alan çözümlenmekte olan adı içerir. Biçim, addaki alfanümerik bayt sayısını belirtmek için sayısal bir sınırlayıcı kullanan değişken uzunluktadır. Aşağıda bazı örnekler verilmiştir:

* 3www9wireshark3org0
* 3www4iana3org0

#### Type

Bu alan sorgu türünü gösterir. Kayıtlı tip numaralarının tam listesi için [www.iana.org/assignments/dns-parameters](http://www.iana.org/assignments/dns-parameters) adresine bakın.

* Type A: Host addres
* Type NS: Authoritative name server
* Type CNAME: Canonical name for an alias
* Type SOA: Start of Zone Authority
* Type PTR: Pointer record
* Type HINFO: Host information
* Type MX: Mail exchange
* Type AAAA: IPv6 address

#### Class

Bu alan, TCP/IP iletişimleri için bir İnternet sınıfı adresini belirtmek üzere 1 olarak ayarlanır.

#### Answer RRs

Bu alan, Sorular alanındaki bu bölümle aynı formatı kullanır.

#### Authority RRs

Bu alan, Questions alanındaki bu bölümle aynı formatı kullanır.

#### Additional RRs

Bu alan, Questions alanındaki bu bölümle aynı formatı kullanır.

#### Resource Record Time to Live (TTL) Value

Bu alan DNS yanıtlarının Yanıt bölümünde yer alır ve alıcının DNS bilgilerini önbellekte ne kadar süre tutabileceğini gösterir. DNS’deki her yanıt, o DNS bilgisi için bir TTL değeri içerecektir.  
RR bilgileriyle yanıt veren DNS sunucuları, kalan TTL değerini sürekli olarak geri sayar; aynı DNS sorgusunu on saniye arayla yapmak, sunulan TTL değerinde on saniyelik bir fark gösterecektir.

#### DNS/mDNS Trafiği Filtreleri

DNS trafiği için capture filter port numarasını temel alır çünkü tcpdump filtre biçimi dns protokolünü algılayamıyor. Libpcap ve WinPcap güncellendikçe bu durum değişebilir.

UDP veya TCP üzerinden standart DNS trafiği için yakalama filtresi 53 numaralı bağlantı noktası iken mDNS 5353 numaralı portu kullanır.

Görüntüleme filtresi sözdizimi basitçe dns’dir. Bu filtre hem DNS hem de mDNS trafiğini görüntüler. Aşağıda ek DNS görüntüleme filtreleri listelenmektedir.

* dns.flags.response==0 : DNS query
* dns.flags.response==1 : DNs response
* dns.flags.rcode != 0 : Hata içeren DNS responselar
* dns.count.answers > 5 : 5den fazla response içeren DNS responselar
* dns.qry.name==”www.abc.com" : [www.abc.com](http://www.abc.com) için DNS query
* dns contains “abc” : “abc içeren” DNS query ya da responselar
* dns.qry.type==0x0001 : Bir hostname için olan DNS sorguları.
* dns.qry.type==0x000c : Bir alan adı işaretçisi sorgusu(inverse query) için DNS sorguları.
* dns.resp.type==0x0005 : CNAME değeri içeren DNS responselar (canonical name)
* dns.resp.type==0x0006 : SOA (Start of Authority) içeren DNS responselar
* dns.flags.recdesired==1 : recursion desired olan DNS Queryleri
* dns.flags.recavail==1 : recursion availabl ile başlayan DNS responselar

Daha fazla Display filter seçeneği Wireshark’ın şu adresteki Referansında bulunabilir [www.wireshark.org/docs/dfref/d/dns.html](http://www.wireshark.org/docs/dfref/d/dns.html).

### Kaynakça

* Wireshark Network Analysis, Second Edition, Laura Chappel, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>