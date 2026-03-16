---
title: "ARP Wireshark Analizi"
date: 2023-11-20
description: "Merhaba bu yazımda Address Resolution Protocol (ARP) protokolünü ve Wireshark ile analizini anlatmaya çalışacağım."
featuredImage: "https://cdn-images-1.medium.com/max/800/1*ao4qe1GrmozJwGfFHn-v_Q.png"
series: ["Wireshark ile Ağ Analizi"]
---

![](https://cdn-images-1.medium.com/max/800/1*ao4qe1GrmozJwGfFHn-v_Q.png)

Merhaba bu yazımda Address Resolution Protocol (ARP) protokolünü ve Wireshark ile analizini anlatmaya çalışacağım.

---

### ARP Nasıl Çalışır?

ARP, bir donanım adresini(fiziksel adres, MAC adresi) yerel ağdaki bir IP adresiyle ilişkilendirmek ve yinelenen IPv4 adreslerini test etmek için kullanılır. ARP ne kadar basit olursa olsun, ağ adresleme veya yapılandırmalarla ilgili sorunları işaret eden protokol olabilir. ARP, RFC 826, Ethernet Adres Çözümleme Protokolü’nde tanımlanmıştır ve IPv6 iletişiminde kullanılmaz.

![](https://cdn-images-1.medium.com/max/800/1*H46AliIQi_SWSWD9GTZ5nw.png)

ARP Protokolü

**ARP protokolü sadece yerel ağda(internal network) kullanılabilir!**Bu nedenle ARP konuşmalarını analiz etmek için sizinde trafiğin aktığı yerel ağa bağlı olmanız gerekir.

![](https://cdn-images-1.medium.com/max/800/1*3BrM69K5ZUI6UjmzxvaKVg.png)

ARP, MAC ve IP adres katmanları arasında adres çözümlemesi sunar

ARP paketleri, bir IP başlığı içermedikleri için TCP ağındaki trafiğin çoğuna kıyasla benzersizdir(internet katnanında çalışan bir protokol değildir). Bu özellik ARP paketlerinin yönlendirilemeyen(data-link katmanı protokolü olduğu için) paketler olduğu anlamına gelir.

---

#### ARP Requests/Responses Analizi

Normal ARP iletişimleri basit bir istek ve basit bir yanıttan oluşur. Bir host, hedef IP adresini içeren bir ARP yayını gönderir (ancak hedef MAC adresi yoktur — ARP MAC adresi çözümlemesi için kullanılır).

![](https://cdn-images-1.medium.com/max/800/1*JePuyNi_ro4-wNE9_kryWg.png)

ARP isteği

Şekilde 00:23:54:69:8f:58 MAC adresine ve 24.6.170.101 IP adresine sahip bir host 24.6.168.1 için MAC adresini aramaktadır. Broadcast yayınlarda MAC adresi şekilde görüldüğü 00:00:00:00:00:00 olur. Bunun nedeni, switchlerin unicast trafikte paketleri hedef MAC adresine göre iletmesidir. 0lı MAC adresi broadcast iletimi tesmil eder.

![](https://cdn-images-1.medium.com/max/800/1*vJW2quVT-FBv0mVUtbl9kA.png)

ARP Yanıtı

Şekilde gösterilen yanıt paketi artık 24.6.168.1 gönderici IP adresini ve bu cihazın MAC adresini içerir. Gönderen ve hedef adreslerinin ARP isteklerinde ve yanıtlarında geçerli paket göndericisiyle ilişkilendirilir. Yani yanıt unicast olarak döner.

---

### ARP Sorunlarının Analizi

Cevapsız ARP istekleri ağdaki başka bir hostun göndericiyle aynı IP adresine sahip olup olmadığını belirlemek için kullanılır. IP adreslerinin statik veya dinamik olarak atanmış olmasına bakılmaksızın tüm hostlara ARP istekleri gönderir. Cevap gelmemesi durumunda bu IP adresinin ağda kullanılmadığı ve boş olduğu tespit edilir. Wireshark cevapssız ARP paketlerini belirleyebilir.

![](https://cdn-images-1.medium.com/max/800/1*mxbRrUNWgTfuMhM4jnlsmA.png)

ARP Duyurusu

Şekilde bir hostun ağdaki başka bir cihazın 24.6.170.101 IP adresini kullanıp kullanmadığını kontrol etmektedir.

ARP trafiğini inceliyor, ancak ARP yayınlarına yanıt göremiyorsanız   
(a) unicast yanıtlarını görebileceğiniz bir konuma bağlanmamış olabilir — veya   
(b) ARP yayını cevapsız bir ARP’dir ve yanıt alınamaması bir IP adresi çakışması olmadığını gösterir.

#### Yanlış Yapılandırmalar

Ağ adresleme sorunları da ARP sorunlarına neden olabilir.

![](https://cdn-images-1.medium.com/max/800/1*eC8hFeOTJBcj4tZwmb9S5A.png)

Yanlış yapılandırılmış bir host subnet değerinden kaynaklanan bir ARP sorunu

Şekilde, İstemci A yanlış alt ağ maskesiyle yapılandırılmıştır. İstemci A, 10.2.99.99 adresindeki hedef Sunucu A’nın yerel mi yoksa uzak mı olduğunu belirlemek için çözümleme sürecinden geçtiğinde, İstemci A(client A) sunucunun yerel olduğunu belirler. İstemci A, sunucunun 10.0.0.0/8 ağında olduğuna inanır. İstemci A, sunucunun da 10.0.0.0/8 ağında bulunduğuna inanır. Bunun nedeni, İstemci A’nın alt ağ maskesinin 255.0.0.0 olarak ayarlanmış olmasıdır.

#### Proxy ARP

Proxy ARP’i destekleyen yönlendiriciler (RFC 1027, Using ARP to Implement Transparent Subnet Gateways’de tanımlanmıştır) diğer ağlardaki cihazlar adına yanıt verebilir. Proxy ARP kullanmanın, genel ARP trafiğindeki artış da dahil olmak üzere çok sayıda dezavantajı vardır.

#### ARP Zehirlemesi

ARP zehirleme trafiği de wireshark üzerinde benzersiz bir şekilde görünmektedir.

![](https://cdn-images-1.medium.com/max/800/1*YzDmMwMEJw2ovJ6ArWXWaQ.png)

ARP Poisoning

Şekilde Wireshark mükerrer adres kullanımının gerçekleştiğini tespit etmiştir. 00:d0:59:aa:af:80 adresindeki bir hostun hem 192.168.1.103 hem de 192.168.1.1 adreslerine arp yanıtı gönderdiğini görebiliriz. Bu, ARP tabanlı MITM(Man-in-the-Middle) saldırısının ilk aşamasıdır.

---

### ARP Paket Yapısı

İki temel ARP paketi vardır: ARP istek paketi ve ARP yanıt paketi. Her iki paket de aynı biçimi kullanır. ARP’ın en kafa karıştırıcı kısmı gönderici ve hedef adres bilgilerinin yorumlanmasıdır. Bir hosttan ARP yayını gönderildiğinde, gönderen host gönderen adresi alanlarına donanım ve IP adreslerini koyar.

Hedef protokol adresi alanı, aranan cihazın IP adresini içerir. Hedef donanım adresi alanı, bilginin bilinmediğini belirtmek için tüm 0'lara ayarlanır. Bir ARP yanıtında, ARP yanıtlayıcısının artık gönderen olduğunu göstermek için hedef ve gönderen bilgileri tersine çevrilir. Aramayı gerçekleştiren orijinal istasyon artık hedeftir.

#### Hardware Type

Bu, kullanılan donanım veya veri bağlantısı türünü tanımlar. Donanım tipi 1 Ethernet’e atanır ve 6 baytlık bir donanım adresi uzunluğu tanımlar. Donanım Tipi alan değer listesinin tamamı [www.iana.org](http://www.iana.org) adresinde mevcuttur.

#### Protocol Type

Bu alan kullanılan protokol adres tipini tanımlar. Bu alan, Ethernet II çerçeve yapılarında da kullanılan standart protokol kimliği değerlerini kullanır. Bu protokol tipleri [www.iana.org/assignments/protocol-numbers](http://www.iana.org/assignments/protocol-numbers) adresinde tanımlanmıştır.

#### Length of Hardware Address

Bu alan, bu pakette kullanılan donanım adreslerinin uzunluğunu (bayt cinsinden) tanımlar.

#### Length of Protocol Address

Bu alan, bu pakette kullanılan protokol (ağ) adreslerinin uzunluğunu (bayt cinsinden) tanımlar.

#### Opcode

Opcode, paketin bir istek mi yoksa yanıt paketi mi olduğunu ve gerçekleşen adres çözümleme türünü tanımlar.

Aşağıda ARP ve RARP (ters ARP) işlem kodları listelenmektedir:

* Opcode 1: ARP request
* Opcode 2: ARP reply
* Opcode 3: RARP request
* Opcode 4: RARP reply

Bir cihazın bir MAC adresinden ağ adresini öğrenmesini sağlayan bir süreç. RARP, RFC 903, A Reverse Address Resolution Protocol’de tanımlanmıştır. RARP’ın erken bir adres atama protokolü olarak kullanıldığı çok eski ağ ortamları dışında RARP’ın kullanıldığını görmeyiz.

#### Sender’s Hardware Address

Bu alan, bu isteği veya yanıtı gönderen cihazın donanım adresini gösterir.

#### Sender’s Protocol Address

Bu alan, bu isteği veya yanıtı gönderen cihazın protokol (ağ) adresini gösterir.

#### Target Hardware Address

Bu alan, biliniyorsa, istenen hedef donanım adresini gösterir. ARP isteklerinde bu alan genellikle tüm 0'larla doldurulur. ARP yanıtlarında, bu alan ARP isteğini gönderen aygıtın donanım adresini içerir.

#### Target Protocol Address

Bu alan, bir istekte istenen hedef protokol (ağ) adresini gösterir. Yanıtta, isteği yayınlayan cihazın adresini içerir.

---

### ARP Trafiğini Filtreleme

ARP trafiği için capture filter ve display filter basitçe *arp* ’dır. Aşağıda ek ARP display filterları listelenmektedir:

* arp.opcode==0x0001 — ARP request
* arp.opcode==0x0002 — ARP reply
* arp.src.hw\_mac==00:13:46:cc:a3:ea — ARP kaynak fiziksel adresi 00:13:46:cc:a3:ea (istek veya yanıt)
* (arp.src.hw\_mac==00:21:97:40:74:d2) && (arp.opcode==0x0001) — Kaynak fiziksel adresi 00:21:97:40:74:d2 olan ARP isteği
* (arp.src.hw\_mac==00:d0:59:aa:af:80) && !(arp.src.proto\_ipv4==192.168.1.1)  
  ARP paketinde 00:d0:59:aa:af:80 adresindeki bir ana bilgisayar kendi IP adresi (192.168.1.1) harici IP adresleri için yolladığı ARP reply paketleri (arp poisoning).
* (arp.opcode==0x0002) && !(arp.src.proto\_ipv4==192.168.0.1/16) — Çözümlenen IP adresinin uzak cihaz için olduğu ARP paketi (ARP proxy yanıtı)-proxy ARP.

---

### Kaynakça

* Wireshark Network Analysis, Second Edition, Laura Chappel, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>