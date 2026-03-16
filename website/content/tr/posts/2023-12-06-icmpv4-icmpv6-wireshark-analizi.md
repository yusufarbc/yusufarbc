---
date: '2023-12-06'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*qw1Nso3IaiA7Jptb-0T1qQ.png
series:
- Wireshark ile Ağ Analizi
title: ICMPv4/ICMPv6 Wireshark Analizi
type: posts
---

![](https://cdn-images-1.medium.com/max/800/1*qw1Nso3IaiA7Jptb-0T1qQ.png)

Merhaba bu yazımda ICMPv4 ve ICMPv6 protokolünü ve Wireshark ile analizini anlatmaya çalışacağım.

---

### ICMP Nedir?

ICMP, bir IP ağındaki hatalar, uyarılar ve genel bildirimler için bir mesajlaşma sistemi olarak kullanılır. Aşağıdakiler de dahil olmak üzere birçok ICMP mesaj türü vardır:

* **Echo Message:** ping ve traceroute tarafından uçtan uca bağlantıyı test etmek için kullanılır. Bunların çok fazla olması bir keşif işlemine veya muhtemelen bir Hizmet Reddi saldırısına işaret edebilir.
* **Redirect Message:** Yönlendiriciler tarafından kaynağa bir hedefe giden daha iyi bir yol olduğunu bildirmek için kullanılır. Bu paket bir yönlendirici tarafından gönderilmemişse, şüpheli olarak değerlendirilmelidir.
* **Destination Unreachable messages:** Kaynak ana bilgisayara paketlerinin bir nedenden dolayı teslim edilemediğini söylemek için kullanılır — nedeni Hedefe Ulaşılamıyor mesajında belirtilir. Bu yanıt paketlerinin çok sayıda olması, başarısız bir UDP bağlantı noktası taramasının devam ettiğini veya bir hizmetin düzgün çalışmadığını gösterebilir.

Ağınızdaki ICMP trafiğini birkaç saat veya gün boyunca inceleyerek, ağın ne kadar verimli bir şekilde tasarlandığını belirleyebilir ve çok sayıda yapılandırma hatasını, işlevsel sorunu veya güvenlik ihlalini tespit edebilirsiniz. ICMPv4 RFC 792'de tanımlanmıştır.

![](https://cdn-images-1.medium.com/max/800/1*LHTLnK4dnNwCs20ZDNBf8g.png)

ICMP, IP ağlarında mesajlaşma hizmetleri sunar

RFC 4443, ICMPv6'nın amacını ve işlevselliğini tanımlar. ICMPv6 paket yapısı ICMPv4 paket yapısı ile aynıdır.

---

### ICMP Trafik Analizi

ICMP trafiğini tanımlamak zordur çünkü bu her ağ için özeldir. Bazı ağ personeli bağlantı testleri için ping kullanırken, bazı şirketler ICMP Echo İsteklerini/Yanıtlarını kısıtlar. Bu ping testlerinden gelen ICMP trafiğini ve traceroute testlerinden gelen ICMP trafiğini “normal ICMP trafiği” olarak tanımlayabiliriz. ICMP tabanlı pingler echo İstekleri için ICMP Tip 8 ve echo reply için ICMP Tip 0 kullanır.

![](https://cdn-images-1.medium.com/max/800/1*4qv9iLVW9NDKL4GxWnpXKw.png)

ICMP Echo Request

![](https://cdn-images-1.medium.com/max/800/1*gdUehz7murFdf2ZsU48Cmw.png)

ICMP Echo Reply

Şekiller ICMPv4 echo request ve echo reply paketlerini göstermektedir.

![](https://cdn-images-1.medium.com/max/800/1*2A2yFLq4vs7G70TfEM0oHw.png)

ICMPv6

Şekilde bir ICMPv6 echo request paketi gösterilmektedir. Bu tracedeki paketler 6to4 paketleridir.

Traceroute’un üç çeşidi vardır-ICMP tabanlı, TCP tabanlı ve UDP tabanlı. ICMP tabanlı traceroute, ICMP echo İsteklerini kullanır ve IP başlığındaki Yaşam Süresi (TTL) değerini değiştirir. Paketler yol boyunca yönlendiricilere ulaştığında, gelen TTL değeri incelenir. Gelen TTL değeri 1 ise, yönlendirici bir ICMP Time Exceeded/Time to Live Exceeded in Transit (Tip 11, Kod 0) ile yanıt verir (bu yanıt yönlendiricide devre dışı bırakılmamışsa). Bu, yönlendiricinin IP adresini bulmanızı sağlar.

Traceroute’un üç çeşidi vardır-ICMP tabanlı, TCP tabanlı ve UDP tabanlı. ICMP tabanlı traceroute, ICMP echo İsteklerini kullanır ve IP başlığındaki Yaşam Süresi (TTL) değerini değiştirir. Paketler yol boyunca yönlendiricilere ulaştığında, gelen TTL değeri incelenir. Gelen TTL değeri 1 ise, yönlendirici bir ICMP Time Exceeded/Time to Live Exceeded in Transit (Tip 11, Kod 0) ile yanıt verir (bu yanıt yönlendiricide devre dışı bırakılmamışsa). Bu, yönlendiricinin IP adresini bulmanızı sağlar.

![](https://cdn-images-1.medium.com/max/800/1*bJcu5LI83HlJKEJlBK6QUQ.png)

ICMP Ping Request — no response

![](https://cdn-images-1.medium.com/max/800/1*EPaLsDeBtWdcmSiyOLbZbw.png)

ICMP Time-to-live-exceed

Şekillerde, bir traceroute işlemi sırasında varsayılan renklendirme etkinleştirildiğinde Wireshark’ın gösterdiği tipik şeritlemeyi göstermektedir.

#### ICMPv4 Problemleri

Yaygın bir ICMP sorunu, bir hedefe bağlantı olmadığını gösteren yanıt almayan bir echo testidir. ICMP trafiğinin düştüğü noktayı belirlemek için Wireshark sistemini paket kaybının meydana geldiği noktaya ulaşana kadar yol boyunca hareket ettirmeniz gerekir.

Bununla birlikte, ICMP’nin kendisi diğer birçok ağ sorununu ve güvenlik sorununu tespit etmeye yardımcı olabilir. Örneğin, bir DNS sorgusu Hedefe Ulaşılamıyor/Port Erişilemiyor (Tip 3/Kod 3) sonucunu veriyorsa, ya istemci DNS sorgularını yanlış hedefe gönderiyordur ya da sunucuda ad hizmeti çalışmıyordur.

Başka bir örnek de aşırı yönlendirmeler olabilir.

![](https://cdn-images-1.medium.com/max/800/1*09eyyZQ32tAra5CruF7ajQ.png)

ICMP Redirect

Şekilde, 10.2.99.98 adresindeki başka bir ağ geçidini(gateway) işaret eden bir ICMP Yönlendirme paketini göstermektedir. Bu paket, alıcı yönlendirici gönderici için daha iyi bir yönlendirici belirlediğinde gönderilir. Alıcı yönlendirici, kullanılması önerilen yönlendiriciyi içeren bir ICMP Yönlendirme (Tip 5/Kod 1) paketi oluşturur. Alındığında, bir host yönlendirme tablosunu güncellemelidir. Yönlendirmeler yalnızca yönlendiriciler tarafından gönderilmelidir.

ICMP Redirect ve ICMP Destination Unreachable paketleri gibi bazı ICMP paketleri, ICMP yanıtını tetikleyen orijinal paketin bir bölümünü içerir. Şekilde, ICMP başlığını ICMP yanıtını tetikleyen paketin orijinal IP başlığı takip eder.

TCP bağlantı istekleri ya bir TCP SYN/ACK ya da bir TCP Sıfırlaması ortaya çıkarması gerektiğinden, TCP el sıkışma bağlantı isteklerine ICMP Hedefe Ulaşılamıyor yanıtları olağandışıdır. Bu TCP el sıkışma bağlantı isteklerine verilen ICMP yanıtı, bir hostun güvenlik duvarının bir portu engellediğinin muhtemel bir göstergesidir.

---

### ICMPv4 Paket Yapısı

ICMP paketleri UDP veya TCP başlığı içermez-port filtreleme ayarları ICMP trafiğini etkileyemez(çünkü port kullanmaz). ICMP paketleri IP başlığından sonra yalnızca üç gerekli alan içerir: tür, kod ve sağlama toplamı(checksum). Bazı ICMP paketleri, mesaj hakkında bilgi veya ayrıntı sağlamak için ek alanlar içerir. Örneğin, bir ICMP Yönlendirme paketinin, bir hostun kullanması için yönlendirildiği ağ geçidinin(gateway) adresini içermesi gerekir. Bu paketin alınmasının ardından, bir host yönlendirme tablolarına dinamik bir rota girişi eklemeli ve yeni yönlendirme bilgilerini hemen kullanmaya başlamalıdır.

#### Type

Aşağıdaki liste, ağ üzerinde gönderilebilecek ICMP mesajlarının türlerini tanımlar. Bu liste, en son 23 Nisan 2012 tarihinde güncellenen IANA belgelerine dayanmaktadır. Bu listenin en güncel sürümünü edinmek için [www.iana.org/assignments/icmp-parameters](http://www.iana.org/assignments/icmp-parameters) adresini ziyaret edin.

* Type 0: Echo Reply [RFC 792]
* Type 1: Unassigned
* Type 2: Unassigned
* Type 3: Destination Unreachable [RFC 792]
* Type 4: Source Quench [RFC 792]
* Type 5: Redirect [RFC 792]
* Type 6: Alternate Host Address
* Type 7: Unassigned
* Type 8: Echo [RFC 792]
* Type 9:Router Advertisement [RFC 1256]
* Type 10:Router Solicitation [RFC 1256]
* Type 11: Time Exceeded [RFC 792]
* Type 12: Parameter Problem [RFC 792]
* Type 13: Timestamp [RFC 792]
* Type 14: Timestamp Reply [RFC 792]
* Type 15: Information Request [RFC 792]
* Type 16: Information Reply [RFC 792]
* Type 17: Address Mask Request [RFC 950]
* Type 18: Address Mask Reply [RFC 950]
* Type 19: Reserved (for Security)
* TypeS 20–29: Reserved (for Robustness Experiment)
* Type 30: Traceroute [RFC 1393]
* Type 31: Datagram Conversion Error [RFC 1475]
* Type 32: Mobile Host Redirect
* Type 33: IPv6 Where-Are-You
* Type 34: IPv6 I-Am-Here
* Type 35: Mobile Registration Request
* Type 36: Mobile Registration Reply
* Type 37: Domain Name Request
* Type 38: Domain Name Reply
* Type 39: SKIP
* Type 40: Photuris
* Types 41–252: Unassigned
* Type 253: RFC3692-style Experiment 1
* Type 254: RFC3692-style Experiment 2

#### Code

Birçok ICMP paket tipinin birkaç olası Kod alanı değeri vardır. Aşağıdaki listede daha yaygın kod alanlarının açıklamaları yer almaktadır.

#### Type 3 Destination Unreachable kodları

* Kod 0: Ağa Erişilemiyor — ICMP göndericisi ağı biliyor, ancak şu anda açık olmadığına inanıyor — belki de çok uzakta veya yalnızca bilinmeyen bir rota üzerinden erişilebilir.
* Kod 1: Ana Bilgisayara Ulaşılamıyor — ICMP göndericisi ana bilgisayarı biliyor, ancak bir ARP yanıtı almıyor, bu da ana bilgisayarın şu anda çalışmadığını gösteriyor.
* Kod 2: Protokol Erişilemez — IP başlığında tanımlanan protokol bir nedenden dolayı işlenemez — bu yanıt bir IP taramasında görülür.
* Kod 3: Port Ulaşılamıyor — ICMP göndericisi ulaşmaya çalıştığınız port numarasını desteklemiyor — bu paketlerin çok sayıda olması bir yapılandırma sorununa veya muhtemelen bir UDP port taramasına işaret eder; bu paketler bir TCP el sıkışma girişimine yanıt olarak gönderiliyorsa, hedef portun muhtemelen güvenlik duvarına sahip olduğunu gösterir.
* Kod 4: Parçalama Gerekli ve Parçalama Yapma Ayarlandı — Yönlendiricinin paketi daha küçük bir MTU boyutunu destekleyen bir bağlantı üzerinden iletmek için parçalaması gerekiyordu, ancak uygulama Parçalama Yapma bitini ayarladı.
* Kod 5: Kaynak Rotası Başarısız — ICMP göndericisi orijinal pakette belirtilen katı veya gevşek kaynak yönlendirme yolunu kullanamaz.
* Kod 6: Hedef Ağ Bilinmiyor-ICMP göndericisinin hedef ağ için bir rota girişi yoktur, bu da hedef ağın hiçbir zaman kullanılabilir bir ağ olmadığını gösterir.
* Kod 7: Hedef Ana Bilgisayar Bilinmiyor-ICMP göndericisinin bağlı ağda hiç bulunmamış olabileceğini gösteren bir ana bilgisayar girişi yoktur.
* Kod 8: Kaynak Ana Bilgisayar İzole Edildi-ICMP göndericisi (yönlendirici) kaynaktan gelen paketleri iletmeyecek şekilde yapılandırılmıştır. Çoğu yönlendirici bu yanıt kodunu üretmez — hangisi uygunsa 0 (ağa ulaşılamıyor) ve 1 (ana bilgisayara ulaşılamıyor) kodlarını üretirler.
* Kod 9: Hedef Ağ ile İletişim İdari Olarak Yasaklanmıştır — ICMP göndericisi (yönlendirici) istenen hedef ağa erişimi engelleyecek şekilde yapılandırılmıştır.
* Kod 10: Hedef Ana Bilgisayarla İletişim İdari Olarak Yasaklandı — ICMP göndericisi (yönlendirici) istenen hedef ana bilgisayara erişimi engelleyecek şekilde yapılandırılmıştır.
* Kod 11: Hedef Ağ Hizmet Türü için Erişilemez-orijinal gönderici tarafından kullanılan Hizmet Türü (TOS) göstergesi söz konusu ağ için bu yönlendirici aracılığıyla kullanılamaz-daha güncel ağların TOS veya Öncelik kullanmayabileceğini unutmayın-bunun yerine DiffServ kullanabilirler.
* Kod 12: Hedef Ana Bilgisayara Hizmet Türü için Ulaşılamıyor — orijinal gönderici tarafından kullanılan TOS göstergesi bu yönlendirici aracılığıyla söz konusu ana bilgisayar için kullanılamaz — daha güncel ağların TOS veya Öncelik kullanmayabileceğini unutmayın — bunun yerine DiffServ kullanabilirler.
* Kod 13: İletişim İdari Olarak Yasaklandı — ICMP göndericisi şu anda iletişim için uygun değil; bu, ayrıntılı bir güvenlik duvarı tarafından gönderiliyor olabilir.
* Kod 14: Ana Bilgisayar Öncelik İhlali — gönderenin orijinal IP başlığında tanımlanan Öncelik değerine izin verilmez (örneğin, Flash Override önceliği kullanılarak) — daha güncel ağların TOS veya Öncelik kullanmayabileceğini unutmayın — bunun yerine DiffServ kullanabilirler.
* Kod 15: Öncelik Kesintisi Yürürlükte — Ağ yöneticisi bir yönlendirici tarafından hizmet verilmesi için minimum öncelik düzeyi belirlemiştir, ancak daha düşük öncelikli bir paket alınmıştır.

#### Type 5 Redirect Kodları

* Kod 0: Ağ (veya alt ağ) için Datagramı Yeniden Yönlendir — ICMP göndericisi (yönlendirici) istenen ağa ulaşmanın en iyi yolu değildir. Yanıt, hedefe giden en iyi yönlendiricinin IP adresini içerir. Orijinal göndericinin rota tablolarına dinamik olarak bir ağ girişi ekler
* Kod 1: Ana Bilgisayar için Datagramı Yeniden Yönlendir — ICMP göndericisi (yönlendirici) istenen ana bilgisayara ulaşmanın en iyi yolu değildir. Yanıt, hedefe giden en iyi yönlendiricinin IP adresini içerir. Orijinal göndericinin rota tablolarına dinamik olarak bir ana bilgisayar girişi ekler
* Kod 2: Hizmet Türü ve Ağ için Datagramı Yeniden Yönlendir — ICMP göndericisi (yönlendirici) talep edilen TOS’u kullanarak hedef ağa bir yol sunmaz. Orijinal göndericinin rota tablolarına dinamik olarak bir ağ girişi ekler — daha güncel ağların TOS veya Öncelik kullanmayabileceğini unutmayın — bunun yerine DiffServ kullanabilirler
* Kod 3: Hizmet Türü ve Ana Bilgisayar için Datagramı Yeniden Yönlendir — ICMP göndericisi (yönlendirici), talep edilen TOS’u kullanarak hedef ana bilgisayara bir yol sunmaz. Orijinal göndericinin rota tablolarına dinamik olarak bir ana bilgisayar girişi ekler — daha güncel ağların TOS veya Öncelik kullanmayabileceğini unutmayın — bunun yerine DiffServ kullanabilirler

#### Type 11 Time Exceeded Kodları

* Kod 0: Aktarımda Yaşam Süresi Aşıldı — ICMP göndericisi (yönlendirici), göndericinin paketinin 1 TTL ile geldiğini belirtir. Yönlendiriciler TTL değerini 0'a düşüremez ve bir paketi
* Kod 1: Parça Yeniden Birleştirme Süresi Aşıldı — ICMP göndericisi (hedef ana bilgisayar), alınan ilk parçanın TTL değerinin süresi dolmadan (bekletme süresi saniye cinsinden) önce tüm parça parçalarını almadı.

#### Checksum

Sağlama toplamı alanı yalnızca ICMP başlığını kapsar.

---

### ICMPv6 Paket Yapısı

ICMP paketleri UDP veya TCP başlığı içermez-port filtreleme ayarları ICMP trafiğini etkileyemez(çünkü port kullanmaz). ICMP paketleri IP başlığından sonra yalnızca üç gerekli alan içerir: tür, kod ve sağlama toplamı(checksum).

#### Type

Aşağıdaki liste, ağ üzerinde gönderilebilecek ICMPv6 mesaj türlerini tanımlar. Bu liste, en son 28 Mart 2012 tarihinde güncellenen IANA belgelerine dayanmaktadır. Bu listenin en güncel sürümünü edinmek için [www.iana.org/assignments/icmpv6-parameters](http://www.iana.org/assignments/icmpv6-parameters) adresini ziyaret edin.

* Type 0 Reserved
* Type 1 Destination Unreachable [RFC4443]
* Type 2 Packet Too Big [RFC4443]
* Type 3 Time Exceeded [RFC4443]
* Type 4 Parameter Problem [RFC4443]
* Type 100 Private Experimentation [RFC4443]
* Type 101 Private Experimentation [RFC4443]
* Type 102–126 Reserved
* Type 127 Reserved for Expansion of ICMPv6 error messages [RFC4443]
* Type 128 Echo Request [RFC4443]
* Type 129 Echo Reply [RFC4443]
* Type 130 Multicast Listener Query [RFC2710] — sent by an IPv6 router to locate general or specific multicast listeners on the local network
* Type 131 Multicast Listener Report [RFC2710] — sent by IPv6 hosts to indicate they are listening for a particular multicast address on an interface
* Type 132 Multicast Listener Done [RFC2710] — can be sent by an IPv6 node to indicate that it has stopped listening to a multicast address on an interface
* Type 133 Router Solicitation [RFC4861] — can be sent when an interface becomes enabled, to request routers to generate Router Advertisements immediately rather than at their next scheduled time
* Type 134 Router Advertisement [RFC4861] — used by IPv6 routers to advertise their presence together with various link and Internet parameters either periodically, or in response to a Router Solicitation  
  message
* Type 135 Neighbor Solicitation [RFC4861] — sent by a node to determine the link-layer address of a neighbor or to verify that a neighbor is still reachable via a cached link-layer address. Neighbor solicitations are also used for Duplicate Address Detection as seen in Figure 207.
* Type 136 Neighbor Advertisement [RFC4861] — a response to a Neighbor Solicitation message. A node may also send unsolicited Neighbor Advertisements to announce a link-layer address change.
* Type 137 Redirect Message [RFC4861]
* Type 138 Router Renumbering [Crawford]
* Type 139 ICMP Node Information Query [RFC4620]
* Type 140 ICMP Node Information Response [RFC4620]
* Type 141 Inverse Neighbor Discovery Solicitation Message [RFC3122]
* Type 142 Inverse Neighbor Discovery Advertisement Message [RFC3122]
* Type 143 Version 2 Multicast Listener Report [RFC3810]
* Type 144 Home Agent Address Discovery Request Message [RFC6275]
* Type 145 Home Agent Address Discovery Reply Message [RFC6275]
* Type 146 Mobile Prefix Solicitation [RFC6275]
* Type 147 Mobile Prefix Advertisement [RFC6275]
* Type 148 Certification Path Solicitation Message [RFC3971]
* Type 149 Certification Path Advertisement Message [RFC3971]
* Type 150 ICMP messages utilized by experimental mobility protocols such as Seamoby [RFC4065]
* Type 151 Multicast Router Advertisement [RFC4286]
* Type 152 Multicast Router Solicitation [RFC4286]
* Type 153 Multicast Router Termination [RFC4286]
* Type 154 FMIPv6 Messages [RFC5568]
* Type 155 RPL Control Message [RFC-ietf-roll-rpl-19.txt]
* Types 156–199 Unassigned
* Type 200 Private experimentation [RFC4443]
* Type 201 Private experimentation [RFC4443]
* Type 255 Reserved for expansion of ICMPv6 informational messages [RFC4443]

#### Code

Aşağıdaki liste, kod alanlarını destekleyen veya ilginç bir kullanıma sahip olan daha yaygın ICMPv6 Türlerinin açıklamalarını sunmaktadır.

#### Type 1 Destination Unreachable Codes

* Kod 0: No route to destination -bir yönlendiriciye kadar ulaştınız, ancak paketinizi iletmek için mevcut bir yönlendirme girişi yok (RFC bunun bir güvenlik duvarı filtresi nedeniyle de gönderilebileceğini söylese de, muhtemelen güvenlik duvarının bu kadar ayrıntılı olmak yerine paketleri sessizce attığını görmeyi tercih ederiz)
* Kod 1: Hedefle iletişim idari olarak yasaklandı — korumalı bir ağa giden yetkisiz paketleri sessizce atmak istiyorsanız görmemeyi tercih edeceğiniz bir şey
* Kod 2: Kaynak adresin kapsamı dışında — bu, bir paketin bağlantı yerel kaynak adresine ve küresel kapsamda bir hedefe sahip olması durumunda oluşturulur
* Kod 3: Adrese ulaşılamıyor — bu, başka herhangi bir kod numarasına sığmayan tüm sorunlar için genel bir hata mesajıdır
* Kod 4: Bağlantı noktasına ulaşılamıyor — normal ICMP ile aynı
* Kod 5: Kaynak adresi giriş/çıkış ilkesinde başarısız oldu — yine — muhtemelen ağ üzerinden göndermek istemediğiniz bir şey
* Kod 6: Hedefe giden yolu reddet — trafiğinizin hedefine ulaşamadığını gösteren genel bir gösterge
* Kod 7: Kaynak Yönlendirme Başlığında Hata [RFC-ietf-roll-rpl-19.txt]

#### Type 2 Packet Too Big Code

* Kod 0: Bu, şu anda tanımlanan tek kod değeridir. Bu paket bir MTU değeri içerir ve Yol MTU keşfi için kullanılır.

#### Type 3 Time Exceeded Codes

* Kod 0: Aktarım sırasında atlama sınırı aşıldı-bu standart ICMP mesajıyla eşleşir.
* Kod 1: Parça yeniden birleştirme süresi aşıldı-bu standart ICMP mesajıyla eşleşir.

#### Type 4 Parameter Problem Codes

* Kod 0: Hatalı başlık alanıyla karşılaşıldı — IPv6 başlığındaki bir şey mantıklı gelmedi
* Kod 1: Tanınmayan Sonraki Başlık türüyle karşılaşıldı — Sonraki Başlık alanı olağandışı bir şey içeriyordu — atanmış IPv6 Sonraki Başlık/IPv4 Protokolü alan değerlerinin listesi için [www.iana.org/assignments/protocol-numbers/protocol-numbers.xml](http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xml) adresine bakın
* Kod 2: Tanınmayan IPv6 seçeneğiyle karşılaşıldı-bu paket, içinde geçersiz bir seçenek bulunan bir veya daha fazla Uzantı Başlığı olan bir IPv6 paketine yanıt olarak gönderilebilir.

#### Type 128 Echo Request Code

* Kod 0: Bu, şu anda tanımlanan tek kod değeridir. Bu paketin eşleştirmek için kullanılan bir Tanımlayıcı alanı vardır bu Yankı İsteğini bir Yankı Yanıtına.

#### Type 129 Echo Reply Code

* Kod 0: Bu, şu anda tanımlanan tek kod değeridir. Bu pakette, ilgili Yankı İsteği paketinden alınan bir Tanımlayıcı alanı vardır

#### Type 138 Router Renumbering Codes

* Kod 0: Yönlendirici Yeniden Numaralandırma Komutu
* Kod 1: Yönlendirici Yeniden Numaralandırma Sonucu
* Kod 255: Sıra Numarası Sıfırlama

#### Type 139 ICMP Node Information Query Codes

* Kod 0: Veri alanı, bu Sorgunun Konusu olan bir IPv6 adresi içerir — tahmin edebileceğiniz gibi, bu tür bir paket keşif için kullanılabilir. Daha fazla ayrıntı için RFC 4620, “IPv6 Düğüm Bilgisi Sorguları” bölümünü okuyun.
* Kod 1: Veri alanı bu Sorgunun Konusu olan bir ad içerir veya birNOOP durumunda olduğu gibi boştur.
* Kod 2: Veri alanı, bu Sorgunun Konusu olan bir IPv4 adresi içerir.

#### Type 140 ICMP Node Information Response Codes

* Kod 0: Başarılı bir yanıt. Yanıt Verisi alanı boş olabilir veya olmayabilir.
* Kod 1: Yanıtlayıcı yanıt vermeyi reddediyor. Yanıt Verisi alanı boş olacaktır.
* Kod 2: Sorgunun Q tipi Yanıtlayıcı tarafından bilinmiyor. Yanıt Verisi alanı boş olacaktır.

ICMPv6 türü ve kod numaraları hakkında daha fazla bilgi için [www.iana.org/assignments/icmpv6-parameters](http://www.iana.org/assignments/icmpv6-parameters) adresine bakın.

---

### Kaynakça

* Wireshark Network Analysis, Second Edition, Laura Chappel, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>