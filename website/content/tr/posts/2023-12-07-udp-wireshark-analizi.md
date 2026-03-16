---
date: '2023-12-07'
draft: false
title: UDP Wireshark Analizi
---

---

### UDP Wireshark Analizi

![](https://cdn-images-1.medium.com/max/800/1*cReiU6D1Aj-Zf-J3628uNA.png)

Merhaba bu yazımda UDP protokolünü ve Wireshark ile analizini anlatmaya çalışacağım.

---

### UDP Nedir?

Yakaladığınız trafikte çokça broadcast/multicast yayın görüyorsanız fazla sayıda UDP tabanlı iletişiminiz var demektir. UDP bağlantı kurmadan aktarım sağlar. Broadcast ve multicast trafiği UDP üzerinden akar. UDP başlığında port alanları, aktarımı kullanan uygulamayı tanımlar. UDP dört alandan oluşan 8 baytlık basit bir başlık(header) kullandığından, UDP’nin kendisi nadiren problem üretir. UDP, RFC 768, Kullanıcı Datagram Protokolü’nde tanımlanmıştır.

![](https://cdn-images-1.medium.com/max/800/1*WSaFhaEgqTIuM9sF4oZYng.png)

UDP bağlantısız taşıma hizmeti sunar

UDP kullanan yaygın uygulamalar DHCP/BOOTP, SIP, RTP, DNS, TFTP ve çeşitli video stream uygulamalarıdır.

---

### UDP Trafik Analizi

DHCP Discover paketleri gibi normal UDP iletişimleri, istenen hizmetin hedef port numarası ile gönderilir. Şekilde bir DHCP paketindeki UDP başlığı gösterilmektedir. DHCP, aktarım protokolü olarak UDP kullanır. DHCP iletişimleri, istemci portnumarası olarak 68 numaralı bağlantı noktasını ve sunucu port numarası olarak 67 numaralı bağlantı noktasını kullanır.

![](https://cdn-images-1.medium.com/max/800/1*Z2tNaovhf93xqYVPROVNww.png)

UDP tabanlı bir DHCP başlatma sırası

Çoğu uygulama, iletişimin istemci tarafı için varsayılan port numarası kullanır. Örneğin, bir DNS sorgusu tipik olarak 53 numaralı porta gönderilir. Kaynak bağlantı noktası geçici bir port numarasıdır.

Doğrudan UDP ile ortaya çıkan çok az sorun vardır. Olası bir sorun, UDP port numarası değerine bağlı olarak engellenen trafiktir. Belirli port numaralarına gönderilen trafiği iletmeyen bir güvenlik duvarından oluşan bir ağdaki UDP trafiğini yakalama sonuçlarını göstermektedir. Bu durumda, güvenlik duvarı 161 (SNMP) ve 5060 (SIP) portlara giden trafiği engellemektedir. ICMP Destination Unreachable/Port Unreachable (Type 3/Code 3) paketleriyle yanıt vermek yerine, güvenlik duvarı paketleri sessizce atar. PCAP dosyanız yalnızca UDP trafiğini gösterir; yanıt görülmez.

![](https://cdn-images-1.medium.com/max/800/1*W8kjuMS7QjymLfAcp5qPfg.png)

SNMP eksiklerine bir cevap görülmez, port filtreleyen bir güvenlik duvarından kaynaklanmaktadır

UDP taramaları, Wireshark’ın varsayılan renklendirme kurallarını kullanarak UDP paketlerinin ve ICMP yanıtlarının sıralanmasını gördüğünüzde belirgindir. Yine, bir güvenlik duvarı port filtreleme yaparak trafiği engelliyorsa ICMP yanıtlarını göremeyebilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*mLgL_SfU5rNO7Gk-mkT1sQ.png)

UDP taraması bir dizi ICMP Hedefe Ulaşılamıyor/Port Ulaşılamıyor yanıtını tetikler

Şekilde 192.168.1.123 adresini hedef alan bir UDP taraması gösterilmektedir. Her UDP paketi bir ICMP Hedefe Ulaşılamıyor/Port Ulaşılamıyor yanıtı tetiklediğinden, UDP taraması henüz açık bir UDP portu bulamamıştır.

---

### UDP Paket Yapısı

UDP başlığı, IP başlığı Protokol alanında 17 (0x11) değeri ile tanımlanır.

UDP başlığı yalnızca dört alan içerir ve her zaman 8 bayt uzunluğundadır.

#### Source Port Field

Kaynak port alanı TCP ve UDP’de aynı amaca sahiptir — yanıt paketleri için bir dinleme portu açmak ve bazı durumlarda paketi gönderen uygulama veya protokolü tanımlamak.

![](https://cdn-images-1.medium.com/max/800/1*PCIysV4QPzkJ6NaUaJcx3g.png)

#### Destination Port Field

Bu alan değeri, paket için hedef uygulamayı veya işlemi tanımlar. Bazı durumlarda kaynak ve hedef port numaraları istemci ve sunucu işlemleri için aynıdır. Diğer durumlarda, istemci ve sunucu işlemleri için ayrı ve benzersiz bir numara bulabilirsiniz (DHCP örneğinde olduğu gibi). Bir başka varyasyon da, istemcinin iletişimin kendi tarafı için geçici port numaraları ve iletişimin sunucu tarafı için iyi bilinen bir bağlantı noktası numarası kullanmasına izin vermektir.

#### Length Field

Uzunluk alanı, paketin UDP başlığından geçerli verinin sonuna kadar olan uzunluğunu tanımlar. Bu gereksiz bir alandır ve tüm iletişim sürecinde gerçekten oldukça gereksizdir. Aşağıdaki üç uzunluk alanını ve bunların yorumlarını göz önünde bulundurun:

* IP Header Length = 5 (denoted in 4 byte increments)
* The IP header is 20 bytes long.
* IP Total Length Field = 329 bytes
* The data after the IP header is 309 bytes — remember that 20 bytes is the IP header.
* UDP Length Field = 309

IP başlığından sonraki veri (UDP başlığı dahil) 309 bayttır. Bunu IP başlığındaki Toplam Uzunluk Alanından bulduk. 8 baytlık UDP başlığını çıkardığınızda 301 baytlık veri olduğunu görürsünüz.

#### Checksum Field

Sağlama toplamı, UDP başlığının içeriği, veri ve IP başlığından türetilen bir sözde başlık üzerinde gerçekleştirilir. Sözde başlık IP başlığı kaynak adres alanı, hedef adres alanı, protokol alanı ve UDP uzunluk alanından oluşur. UDP tabanlı iletişimler her zaman bir sağlama toplamı gerektirmez — bazen bu alanın alıcıya sağlama toplamının doğrulanmaması gerektiğini söyleyen tüm sıfırlara (0x0000) ayarlandığını görürsünüz.

---

#### UDP Traffiği Filtreleri

UDP trafiği için yakalama filtresi sözdizimi basitçe udp’dir. Görüntüleme filtresi sözdizimi basitçe udp’dir. Aşağıda ek UDP görüntüleme filtreleri listelenmektedir.

* udp.srcport==161 — SNMP response (port 161a dayanır)
* udp.dstport==137 — NetBIOS Name Service (port 137 dayanır)
* udp.length > 248 — 240 data bytedan daha fazla içeren UDP paketleri (8 byte UDP headerı için rezerve edilmiştir.)

UDP, TCP’nin heyecan verici, karmaşık dünyasına kıyasla nispeten sıkıcıdır.

---

### Kaynakça

* Wireshark Network Analysis, Second Edition, Laura Chappel, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>