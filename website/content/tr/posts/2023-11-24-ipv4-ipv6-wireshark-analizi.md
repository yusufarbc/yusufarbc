---
date: '2023-11-24'
description: Merhaba bu yazımda IPv4 ve IPv6 protokolünü ve Wireshark ile analizini anlatmaya çalışacağım.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*qSAbdDrUrlN_SQ9p_AXpFQ.png
layout: single
series:
- Wireshark ile Ağ Analizi
title: IPv4/IPv6 Wireshark Analizi
type: posts
---

Merhaba bu yazımda IPv4 ve IPv6 protokolünü ve Wireshark ile analizini anlatmaya çalışacağım.

### IP Nedir?

IP (v4/v6 — topluca “IP” olarak anılır), ağa bağlı sistemler için teslim hizmetlerinin yanı sıra düşük MTU (Maximum Transmission Unit) ağları için parçalama ve yeniden birleştirme sağlar. IP ayrıca belirli trafiğin diğer trafiğe göre önceliklendirilmesini sağlamak için hizmet kalitesi belirleme özelliği de sunar.

IP bağlantısız ve güvenilmezdir, IP ana bilgisayarları arasında datagramların en iyi şekilde teslim edilmesini sağlar. IP’nin kendisi, bir paketin hedef konuma ulaşıp ulaşmadığını belirlemenin hiçbir yolunu sunmaz. Garantili teslimata ihtiyaç duyan bir uygulama IP üzerinden TCP (TCP over IP) kullanmalıdır.

![](https://cdn-images-1.medium.com/max/800/1*T7ew3u6ttBWwa5NsNgjR3g.png)

IP, UDP ve TCP tabanlı uygulamalar ve ICMP için teslim hizmetleri sağlar

IPv4 başlığı tipik olarak 20 bayt uzunluğundadır, ancak IP başlık uzunluğunu (4 baytlık artışlarla) uzatabilen bir alan içerir.

### IPv4 Analizi

IPv4 RFC 791'de ele alınmıştır. Normal IPv4 iletişimi, en verimli paket boyutunu kullanarak paketleri bir konumdan diğerine götürür.

IPv4 paketleri yönlendiriciler tarafından iletilirken, yönlendirme kararları vermek için hedef IP adresi incelenir, MTU boyutu bir sonraki bağlantının MTU boyutuna göre kontrol edilir (parçalanmanın gerekli olup olmadığını ve izin verilip verilmediğini belirlemek için), MAC başlığı çıkarılır ve bir sonraki ağ için yeni bir tane uygulanır ve IP başlığındaki yaşam süresi (TL) değeri azaltılır. IP başlığı ayrıca yönlendirme önceliklendirmesi için de kontrol edilir.

Bir IPv4 iletişiminde her şey yolunda giderse, trafik IP adreslerine ve IP adreslerinden akmalıdır. Bir NAT/PAT cihazı trafiği kesip adresi değiştirmediği sürece başlıktaki IPv4 adresi değişmemelidir.

Bir paket yoldaki bir sonraki bağlantıya iletilemeyecek kadar büyükse, yönlendirici IP başlığının parçalanma ayarını inceler. Don’t Fragment biti ayarlanmışsa, paket iletilemez. Yönlendirici, paketi oluşturan kişiye MTU sınırlamasını tanımlayan bir ICMP Tip 3, Kod 4 mesajı (Hedefe Ulaşılamıyor/Parçalanma Gerekli, ancak Parçalama Biti Ayarlandı) göndermelidir. Gönderen, paketi daha küçük bir paket boyutunda yeniden iletmelidir. Parçalanmaya izin veriliyorsa, yönlendirici tek büyük paketi iki (veya daha fazla) küçük pakete bölmeli, parça ofsetini tanımlamalı ve paketlerin parça olduğunu belirtmeli ve iletmelidir.

![](https://cdn-images-1.medium.com/max/800/1*Gmy9Pgg9xp9UlBITMfwglg.png)

IP, bir bağlantının MTU’su datagram boyutunu desteklemediğinde paketleri parçalayabilir

Şekilde, İstemci A’dan Sunucu A’ya giden 1500 baytlık bir MTU paketi yol boyunca gidemez. Sınırlama Yönlendirici B ve Yönlendirici C arasındaki bağlantıdadır. Yönlendirici B paketi parçalara ayırmalı (izin veriliyorsa) ve parçaları iletmeli veya ICMP Tip 3, Kod 4 mesajını İstemci A’ya geri göndermelidir.

Parçalanma, veri akışının verimliliğini azalttığı için bir ağda arzu edilen bir durum değildir. Bununla birlikte, kaçınılmaz olabilir. Olası MTU sorunlarını wirehsarkda belirlemek için;  
İstatistikler | Paket Uzunluklarını inceleyin veya ICMP Tip 3/Kod 4 paketleri için bir filtre uygulayın (icmp.type==3 && icmp.code==4).

IPv4 sorunları genellikle parçalanma, olağandışı IP adresleri ve aşırı yayınlarla ilgilidir. Birkaç örnek aşağıda verilmiştir.

* ICMP Tip 3, Kod 4 paketleri engellendiğinde parçalanma sorunları ortaya çıkabilir, bu da bir ana bilgisayarın paketlerinin neden hedefe ulaşmadığını öğrenmesini engeller. ICMP Tip 3, Kod 4 paketi kara delik tespiti için kullanılır.

![](https://cdn-images-1.medium.com/max/800/1*fLWJpNDw-l0U1eNT73tlaQ.png)

Kaynak IP adresinin 127.0.0.1 olması şüphelidir

* Olağandışı IP adresleri, yinelenen adresler veya Şekilde gösterilen adres gibi ağda izin verilmeyen adresler olabilir. IP kaynak adresi loopback adresi (127.0.0.0/8), çok noktaya yayın adresi veya yayın adresi olamaz.
* Bir ağ boyunca akan aşırı yayınlar(broadcast), Wireshark’ı bir switche bağlayarak kolayca tespit edilebilir.

Şekilde ağda asla bulunmaması gereken bir paket gösterilmektedir — kaynak 127.0.0.1 loopback adresidir.

### IPv6 Analizi

IPv6 sadece katman 3 yönlendirilmiş bir protokoldür.

![](https://cdn-images-1.medium.com/max/800/1*WltOTqu_1iZzyc0O4u5zgg.png)

IPv6 Başlığı

Şekilde bir IPv6 başlığı gösterilmektedir. Ethernet başlık Tipi alanının 0x86dd olduğuna dikkat edin, bu da bir IPv6 başlığının sırada olduğunu gösterir.

RFC 2460, İnternet Protokolü, Sürüm 6 (IPv6) Spesifikasyonu, IPv6 başlık spesifikasyonunu tanımlar. IPv6 adresleme RFC 4291, IP Sürüm 6 Adresleme Mimarisi’nde ele alınmıştır. IPv6 ana bilgisayarlarının diğer yerel hedefleri nasıl bulduğuna ilişkin ayrıntılar için RFC 4861, IP sürüm 6 (IPv6) için Komşu Bulma bölümüne bakın.

IPv6 ile ilgili bu kısa bölüm, yalnızca çift yığınlı ana bilgisayarlarda göreceğiniz en yaygın IPv6 trafiğine bir göz atmanız için tasarlanmıştır.

IPv6 iletişiminde üç farklı adres türü vardır:

* Unicast — tek interface adresi
* Multicast —arayüzler grubu
* Anycast — bir grup arayüzün en yakını

IPv6'da yayın(broadcast) adresi yoktur-çoklu yayınlar ağ yayınlarının yerine kullanılır.

IPv6 adresleri on altı bayt uzunluğundadır (128 bit) ve x:x:x:x:x:x:x şeklinde yazılır; burada x bir ila dört onaltılık basamağı temsil eder. Gösterimi kısaltmak için tek bir alanda baştaki sıfırları atabilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*aLNQlmlSWWQnFYKi0MA9rw.png)

Multicast yayınlar ff02 ile başlar

RFC 4291, IPv6 adresleri için aşağıdaki örneği sağlar:

* Address 2001:0DB8:0:0:8:800:200C:417A (bir unicast adres)  
  Shortened Version 2001:DB8::8:800:200C:417A
* Address FF01:0:0:0:0:0:0:101 (bir multicast adres)  
  Shortened Version FF01::101
* Address 0:0:0:0:0:0:0:1 (bir loopback adres)  
  Shortened Version ::1
* Address 0:0:0:0:0:0:0:0 (unspecified adres)  
  Shortened Version ::

:: bir adreste yalnızca bir kez kullanılabilir ve 16 bitlik sıfırlardan oluşan bir veya daha fazla grubu temsil eder. :: bir adresteki baştaki veya sondaki sıfırları temsil etmek için de kullanılabilir. Wireshark, yukarıdaki şekilde gösterildiği gibi IPv6 adreslerinin kısaltılmış sürümünü kullanır.

IPv6 ağ öneklerini temsil ederken Sınıfsız Alanlar Arası Yönlendirme (CIDR) gösterimi kullanılır. Örneğin, 2001:DB8:0:CD30::/64, 2001:DB8:0000:CD30:: ağını temsil eder.

Unicast adresler 2xxx ile başlar. Multicast adresler FFxx ile başlar. Link-Local Unicast adresleri FE80 ile başlar.

Link-Local adresler tek bir bağlantı üzerinde adresleme için kullanılır ve yönlendirilmez. IPv6, otomatik adres yapılandırması ve komşu keşfi için Link-Local adresleri kullanır.

Yukarıdaki şekilde görülen ilk paket bir ICMPv6 İsteği’dir — bu protokol ARP’ın yerini alır. Kaynak adres :: olduğunda, paketin amacı Yinelenen Adres Algılama (DAD)dır.

![](https://cdn-images-1.medium.com/max/800/1*b6BPriW0o2QQNIce_G74JA.png)

Yönetilen Adres Yapılandırması ve Diğer Yapılandırma bitleri DHCPv6 istemcisinin bir IPv6 adresini ve diğer parametreleri nasıl alacağını tanımlar

IPv6 hostu, başlangıç işlemi sırasında IPv6 hostuna gönderilen Yönlendirici Reklam paketi tarafından tanımlanan çeşitli yöntemlerden birini kullanarak bir adres alabilir. Şekilde iki bite dikkat çektik:

* Yönetilen Adres Yapılandırması (M) biti
* Diğer Yapılandırma (O) biti.

DHCPv6 istemci adresi ve diğerparametreler bu iki bitin ayarına göre yapılandırılacaktır. Bir IPv6 istemcisi, ICMPv6 Yönlendirici paketindeki M ve O bitlerine başvurarak üç farklı şekilde bir adres alabilir:

* Stateless Address AutoConfiguration (SLAAC)
* stateful DHCPv6
* stateless DHCPv6

#### 6to4 Tunneling(IPv4 İçinde Tünellenmiş IPv6)

IPv6'ya geçişin bir parçası olarak, mevcut TCP/IP ana bilgisayarları çift yığınları ve IPv4 içinde IPv6 tünelleme yeteneğini destekler. Bu paketler bir IPv4 ağı üzerinden hedef IPv6 ana bilgisayarına yönlendirilebilir. Üç farklı kapsülleme yöntemi vardır-6to4, Teredo ve ISATAP.

![](https://cdn-images-1.medium.com/max/800/1*wfLk0ygZStuJ43NRGFg65Q.png)

Protokol değeri 41, bir IPv6 başlığının daha sonra geldiğini gösterir

RFC 3056, IPv6 Etki Alanlarının IPv4 Bulutları Üzerinden Bağlanması, 6to4 tünellemeyi tanımlar. Wireshark bir IPv6 başlığının bir IPv4 başlığını takip ettiğini tespit ettiğinde, pakete iki not ekler:

* Source 6to4 Gateway IPv4 (ipv6.src\_6to4\_gw\_ipv4)
* Source 6to4 SLA ID (ipv6.src\_6to4\_sla\_id)

Kaynak adresin ilk 2 baytı 0x2002 olacaktır. 6to4 Ağ Geçidi adresi, kapsülleyen ana bilgisayarın IPv4 adresidir (IPv6 başlığını yerleştiren istemci veya IPv6 başlığını yerleştiren bir yönlendirici). Şekil 209'da, kaynak IPv6 adresi 24.6.173.220'ye (ana bilgisayarın IPv4 adresi) dönüşen 0x1806addc’yi içerir. Kaynak 6to4 SLA Kimliği (Site Level Aggregation Identifier) bir alt ağ tanımlamak için kullanılır.

#### Teredo

Teredo, bir IPv6 başlığını bir UDP paketi içinde kapsülleyen başka bir tünelleme yöntemidir. Bu teknoloji, Protokol 41'i işlemeyen Ağ Adresi Çevirisi (NAT) cihazlarını geçmeye yardımcı olmak için geliştirilmiştir. Teredo, RFC 4380, Ağ Adresi Çevirileri (NAT’lar) aracılığıyla UDP üzerinden IPv6 Tünelleme’de ele alınmıştır.

![](https://cdn-images-1.medium.com/max/800/1*W8wVMRwalacSMFyhQtSyfQ.png)

Teredo, IPv6'yı bir UDP paketi içinde tüneller

Şekilde, bir Teredo istemcisinden Teredo sunucusuna giden bir paketi göstermektedir. Wireshark, Teredo port udp-3544'ü kullanır ve UDP tünelleme disektörü üzerinden Teredo IPv6yı sağlar.

Burada üç Wireshark notasyonu görebiliriz:

* Source Teredo Server IPv4 (ipv6.src\_ts\_ipv4)
* Source Teredo Port (ipv6.src\_tc\_port)
* Source Teredo Client IPv4 (ipv6.src\_tc\_ipv4)

#### Site İçi Otomatik Tünel Adresleme Protokolü (ISATAP)

Hem 6to4 hem de ISATAP IPv6'yı IPv4 içinde kapsüller, ancak paket bir IPv4 ağı üzerinden farklı şekilde gönderilir. Wireshark ISATAP’ın kullanımda olduğunu tespit edebilir (tıpkı Teredo’nun kullanımda olduğunu tespit ettiği gibi).

6to4 tünellemenin aksine, ISATAP 64 bit arayüz tanımlayıcısı oluşturmak için yerel olarak atanmış bir IPv4 adresi (genel veya özel) kullanır. Örneğin, ISATAP’ta 24.6.173.220 IPv4 adresi ::0:5EFE:1806:addc olur. Bir 6to4 tünel yapılandırmasında, aynı IPv4 adresi Şekil 210'da görüldüğü gibi 2002:1806:addc::/48 olur.

ISATAP, ISATAP yönlendiricilerinin IPv6 trafiği için bir site içi tünel yapılandırmasını gerektirir ve bilgilendirici RFC 5214'te ele alınmıştır.

### IPv4 Paket Yapısı

Bu kısımda başlık alanları ve işlevleri ayrıntılı olarak açıklanmaktadır. Her alanla ilgili daha fazla ayrıntı için RFC 791'e bakabilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*GJHqitNsY8XKz2li3lXVDQ.png)

IPv4 Başlığı

Şekilde, kabul edilebilir IPv4 adreslemesine sahip standart bir IPv4 başlığını göstermektedir.

#### Version Field

IP başlığındaki ilk alan sürüm alanıdır. Şekilde, tamamen genişletilmiş bir IPv4 başlığını göstermektedir. Bu bölümde IPv4 ile başlayacağız ve daha sonra IPv6'yı inceleyeceğiz.

#### Header Length Field

Bu alan aynı zamanda İnternet Başlık Uzunluğu alanı veya IHL(Internet Header Length) olarak da adlandırılır. Bu alan sadece IP başlığının uzunluğunu belirtir. Bu alan gereklidir çünkü IP farklı başlık uzunluklarını destekler. Bu alan değeri 4 baytın katları olarak sağlanır. Örneğin, bu alanın gerçek ondalık kodu 5 olacaktır. Wireshark, 20 baytlık gerçek IP başlık uzunluğu değerini bulmak için bu değeri 4 baytla çarpar. Şekilde IPv4 başlığı 20 bayt uzunluğundadır. Bu IP başlığında farklı bir başlık uzunluğu kullanılmamıştır.

#### Differentiated Services Field and Explicit Congestion Notification

Altı bitlik Farklılaştırılmış Hizmetler Alanı (DiffServ) trafiği önceliklendirmek ve belirli bir Hizmet Kalitesi (QoS) düzeyi sağlamak için kullanılır.

Alan, paketin nasıl işleneceğini (atlama başına davranış) belirlemek için kullanılan bir Farklılaştırılmış Hizmetler Kod Noktası (DSCP) değeri içerir.

#### Assured Forwarding and Expedited Forwarding Per-Hop Behavior

RFC 2597, Assured Forwarding PHB Group, Assured Forwarding’i bir DiffServ sağlayıcısının bir DiffServ müşterisinden aldığı IP paketleri için farklı düzeylerde yönlendirme güvenceleri sunması için bir araç olarak tanımlar.

RFC 2598, bir Hızlandırılmış Yönlendirme PHB’si, Hızlandırılmış Yönlendirmenin “DS (DiffServ) alanları aracılığıyla düşük kayıplı, düşük gecikmeli, düşük titreşimli, garantili bant genişliği, uçtan uca hizmet oluşturmak için kullanılabileceğini tanımlar. Böyle bir hizmet uç noktalara noktadan noktaya bağlantı veya ‘sanal kiralık hat’ gibi görünür. Bu hizmet aynı zamanda Premium hizmet olarak da tanımlanmaktadır.”

İki bitlik Açık Tıkanıklık Bildirimi (ECN) alanı, yol boyunca ağ tıkanıklığını tanımlamak için gönderen ve/veya yol boyunca yönlendiriciler tarafından kullanılır.

#### Total Length Field

Bu alan IP başlığının ve geçerli verilerin uzunluğunu tanımlar (buna herhangi bir veri bağlantısı dolgusu dahil değildir).  
Şekilde gösterilen örnekte, toplam uzunluk alanı değeri 1500 bayttır. Bunun ilk 20 baytı IP başlığıdır — bu, kalan paket uzunluğunun (herhangi bir veri bağlantısı dolgusu dahil değil) 1480 bayt olduğunu gösterir.

#### Identification Field

Her bir IP paketine gönderilirken benzersiz bir ID değeri verilir. Paketin daha küçük bir paket boyutunu destekleyen bir ağa sığması için parçalanması gerekiyorsa, bu parçaların aynı orijinal paketin parçası olduğunu belirtmek için her parçaya aynı kimlik numarası yerleştirilecektir.

#### Flags Field

Bayraklar alanı aslında üç bit uzunluğundadır ve aşağıdaki bit değeri atamalarına sahiptir:

* Bit 0: Rezerve edilmiş-0 olarak ayarlanmıştır.
* Bit 1: Parçalama Biti (0=parçalayabilir; 1=parçalama yapmaz)
* Bit 2: Daha Fazla Parça Biti (0=son parça; 1=daha fazlası gelecek)

Bir uygulama(application katmanı protokolleri) parçalanmaya izin vermeyecek şekilde yazılabilir. Eğer öyleyse, uygulama Don’t Fragment bitini ayarlayacaktır 1. Parçalanmaya izin veriliyorsa ve bir paketin daha küçük bir paketi destekleyen bir ağı geçmek için parçalanması gerekiyorsa MTU, Parçalama biti 0 olarak ayarlanacaktır. Paket birden fazla parçaya bölündüğünde -üç Örneğin, birinci ve ikinci parçalarda More Fragments to Come biti 1 olarak ayarlanacaktır. Son parçanın More Fragments (Daha Fazla Parça) biti 0 olarak ayarlanır ve bu da onun setteki son parça olduğunu gösterir. Tümü fragmanlar aynı IP ID değerini kullanacaktır. Parçalanma yeniden birleştirme işlemi uç noktada gerçekleşir.

#### Fragment Offset Field

Paket bir parçaysa, bu alan, parçalar tekrar tek bir pakette birleştirilirken (hedef ana bilgisayarda) bu paketin verilerinin nereye yerleştirileceğini gösterir. Bu alan, 8 baytlık değerler halinde ofseti sağlar. Örneğin, ilk parçanın ofseti 0 olabilir ve 1400 bayt veri içerebilir (herhangi bir başlık dahil değildir). İkinci parçanın ofset değeri 175 olacaktır (175 x 8 = 1400). Bu alan yalnızca paket bir parça ise kullanılır, aksi takdirde 0 olarak ayarlanır.

![](https://cdn-images-1.medium.com/max/800/1*6Y7PXca_YiF7g2nbehV6oA.png)

Wireshark’ın IP parçalarını görüntülemesi

#### Time to Live Field

Bu alan, paketin kalan ömrünü (saniye ve yönlendiriciler üzerinden atlama sayısı olarak) gösterir.

Tipik başlangıç TTL değerleri 32, 60, 64 ve 128'dir. Varsayılan TTL değerleri satıcının TCP/IP yığınına dahil edilmiştir. Uygulamalar (traceroute gibi) bu varsayılan değerleri istenildiği gibi geçersiz kılabilir. Bir paket yönlendirici tarafından her iletildiğinde, yönlendirici TTL alanını 1 azaltmalıdır. Yönlendiricinin paketi kuyruğunda uzun bir süre (bir saniyeden uzun) tutması gerekiyorsa, bu TTL değerini paketin kuyrukta tutulduğu saniye sayısı kadar azaltmalı ve atlama için TTL’yi azaltmalıdır.

Yönlendirilecek bir paket bir yönlendiriciye TTL=1 ile ulaşırsa, yönlendirici TTL’yi 0'a düşüremeyeceği ve paketi iletemeyeceği için paketi atmalıdır. Yönlendirici, göndericiye bir ICMP Tip 11, Kod 0 yanıtı (Time Exceeded, Time to Live Exceeded in Transit) oluşturarak paketin Time to Live değeri nedeniyle iletilmediğini belirtebilir.

Eğer TTL=1 olan bir paket bir ana bilgisayara ulaşırsa, ana bilgisayar ne yapmalıdır? Elbette paketi işler. Ana bilgisayarların paketleri aldıktan veya yönlendirdikten sonra TTL değerini düşürmesi gerekmez.

Düşük TTL değerleri bazen olağandışı olarak kabul edildiğinden, Wireshark’ın bu paketleri bir izleme dosyasında tanımlamaya yardımcı olan *TTL low* ya da *unexpected* adlı bir renklendirme kuralı vardır. Renklendirme kuralı sözdizimi (!ip.dst==224.0.0.0/4 && ip.ttl < 5 && !pim) || (ip.dst==224.0.0.0/24 && ip.ttl != 1) şeklindedir.

Bir paket parçalandığında, tüm parçalara aynı TTL değeri verilir. Bir ağ üzerinden farklı yollar izlerlerse, hedefe farklı TTL değerleriyle ulaşabilirler. Ancak ilk parça hedefe ulaştığında, hedef ana bilgisayar bu paketin TTL değerinden saniye cinsinden geri saymaya başlar. Bu zamanlayıcı sona ermeden önce tüm parçaların ulaşması gerekir, aksi takdirde parça kümesi ‘tamamlanmamış’ ve kullanılamaz olarak kabul edilir. Hedef, yeniden birleştirme işlemi sırasında paketin ömrünün dolduğunu belirtmek için kaynağa bir ICMP Tip 11, Kod 1 yanıtı (Zaman Aşıldı, Parça Yeniden Birleştirme Süresi Aşıldı) gönderir. Bu, istemciden orijinal parçalanmamış paketi yeniden iletmesini ister.

#### Protocol Field

Tüm başlıklar, bir sonraki adımın ne olduğunu tanımlayan bir alana sahiptir. Örneğin, bir TCP/IP paketinde, Ethernet II başlığının bir sonraki adımın IP olduğunu belirten bir Tip alanı vardır. IP başlığında bir sonraki adımın ne olduğunu belirten bir Protokol alanı vardır. Protokol alanında daha sık görülen değerler aşağıda listelenmiştir:

* Protocol 1: ICMP
* Protocol 2: IGMP
* Protocol 6: TCP
* Protocol 8: EGP
* Protocol 9: Cisco’nun IGRP’si gibi herhangi bir özel iç ağ geçidi
* Protocol 17: UDP
* Protocol 45: IDRP
* Protocol 88: Cisco EIGRP
* Protocol 89: OSPF

Protokol alanı değerlerinin en güncel listesini edinmek için [www.iana.org/assignments/protocol-numbers](http://www.iana.org/assignments/protocol-numbers) adresini ziyaret edin.

#### Header Checksum Field

IP başlığı Sağlama Toplamı alanı yalnızca IP başlığının içeriğine ilişkin hata tespiti sağlar; bu alan paketin IP başlığı dışındaki içeriğini kapsamaz. Bu sağlama toplamı, sağlama toplamı alanının kendisini hesaplamaya dahil etmez.

#### IPv4 Source Address Field

Bu, paketi gönderen cihazın IP adresidir. DHCP önyükleme işlemi gibi bazı durumlarda, istemci IP adresini bilmeyebilir, bu nedenle bu alanda 0.0.0.0 kullanabilir. Bu alan bir çok noktaya yayın veya yayın adresi ya da geri döngü adresi içeremez.

#### IPv4 Destination Address Field

Bu alan tek noktaya yayın, çok noktaya yayın, yayın adresi içerebilir. Bu adres paketin son hedefini tanımlar.

#### Options Field

IP başlığı bir dizi seçenekle genişletilebilir (bu seçenekler sıklıkla kullanılmasa da). Başlık seçeneklerle genişletilirse, bu seçenekler 4 baytlık bir sınırda bitmelidir, çünkü İnternet Başlık Uzunluğu (IHL) alanı başlık uzunluğunu 4 baytlık sınırlarla tanımlar.

Aşağıdaki liste yalnızca kısmi bir seçenek kümesini göstermektedir. Listenin tamamı için [www.iana.org](http://www.iana.org) adresine bakın.

* Option 0: Seçenek Listesi Sonu (IP seçeneklerinin ne zaman sona ereceğini tanımlar))
* Option 3: Loose Source Route (bazı yol bilgileri sağlar)
* Option 4: Time Stamp (Yol boyunca zaman damgası)
* Option 7: Record Route (bir yol boyunca geçen yönlendiricileri işaretler)
* Option 9: Strict Source Route (özel yol bilgisi sağlayın)

#### IPv4 Broadcast/Multicast Traffic

Ağ üzerinde iki temel yayın/çoklu yayın türü vardır: aramalar ve duyurular. Bir DHCP istemcisinin açıldığında ve bir DHCP sunucusu bulması gerektiğinde gönderdiği keşif yayını bir arama örneği olabilir. Bir başka arama yayını örneği de ARP MAC-IP adres çözümleme yayınıdır.

* General Broadcast: 255.255.255.255
* Subnet Broadcast: 10.2.255.255
* Multicast: 224.x.x.x — 239.x.x.x

Duyuruya örnek olarak OSPF reklam çok noktaya yayını verilebilir. Bu paketler, bilinen bağlantı durumu yönlendirme girdileri hakkında istenmeyen duyurulardır.

Günümüzün yüksek kapasiteli ağ bağlantılarında değerli bant genişliğini kaplayan yayınlar ve çoklu yayınlar konusundaki endişeler aşırı vurgulanmış olabilir. Diğer bir endişe ise bu paketlerin ileten veya alan cihazlarda ihtiyaç duyduğu işlem gücüdür. Bir anahtar veya yönlendirici aşırı yüklenmişse ve paketleri düşürüyor veya uzun süre kuyrukta tutuyor gibi görünüyorsa, ağdaki yayın/çoklu yayın oranını incelemeyi düşünün.

### IPv6 Paket Yapısı

Her bir alanın amacını tanımlamak için bir IPv6 başlığının içine bakalım. Bazı alanlar IPv4 alanlarına çok benzer.

#### Version Field

Bu dört bitlik alan 0110 (ondalık 6) olarak ayarlanır.

#### Traffic Class Fields (DiffServ, ECT and ECN-CE)

Şekilde yakından bakın. Bazı alanların nasıl örtüştüğüne dikkat edin; 8 bitlik Trafik Sınıfı alanı Farklılaştırılmış Hizmetler (DiffServ) alanı, ECN-Yetkin Aktarım alanı ve ECN-CE alanından oluşur.

6 bitlik DiffServ alanı, IPv4 başlığındaki DiffServ alanlarıyla aynı işlevselliği sağlar. Bu alan, trafiğe öncelik vermek ve belirli bir düzeyde Hizmet Kalitesi (QoS) sağlamak için kullanılır. Alan, paketin nasıl işleneceğini (perhop davranışı) belirlemek için kullanılan bir Farklılaştırılmış Hizmetler Kod Noktası (DSCP) değeri içerir.

ECN Özellikli Aktarım (ECT) biti, ECN’nin desteklendiğini belirtmek için bir gönderen tarafından ayarlanır.

ECN-CE (Tıkanıklık Yaşandı) biti, yaklaşan tıkanıklığı tespit eden bir yönlendirici tarafından ayarlanır. Yönlendiricinin ECN-CE bitini kullanabilmesi için ECT bitinin ayarlanmış olması gerekir.

#### Flow Label Field

Bir “akış”, bir kaynaktan hedefe giden ve bir küme olarak etiketlenen paketlerin bir dizisidir. Bir IPv6 akışı, 20 bitlik Akış Etiketi alanı ile kaynak ve hedef IPv6 adres alanları tarafından tanımlanır. Akış Etiketi alan değerinin sıfır olması, paketin herhangi bir akışın parçası olmadığını gösterir. Akış Etiketi alan değeri yol boyunca değiştirilmez. Akış Etiketi alanının kullanımı hakkında daha fazla bilgi için bkz. RFC 3697, IPv6 Akış Etiketi Belirtimi.

#### Payload Length Field

Bu alan, IPv6 yükünün uzunluğunu (IPv6 başlığını izleyen ancak paket dolgusunu içermeyen baytlar) tanımlar. IPv6 uzantı başlıkları yükün bir parçası olarak kabul edilir.

#### Next Header Field

Bu alan, pakette bir sonraki adımın ne olduğunu gösterir (tıpkı IPv4 Protokolü alanı gibi). Geçerli protokol numaralarının tam listesi için [www.iana.org/assignments/protocol-numbers/protocol-numbers.xml](http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xml) adresine bakın. Bir IPv6 paketi, IPv6 başlığını takip eden birden fazla Uzantı Başlığına sahip olabilir.

Aşağıdaki tabloda IPv6 Uzantı Başlıkları ve bunların Sonraki Başlık alanı değerleri listelenmektedir. Bunlar önerilen kullanım sırasına göre listelenmiştir.

* **Next Header Field Value 0**: Hop-by-Hop Seçenekleri
* **Next Header Field Value 60**: Destination Options (Yönlendirme Seçenekleri ile)
* **Next Header Field Value 43**: Routing Header
* **Next Header Field Value 44**: Fragment Header
* **Next Header Field Value 51**: Authentication Header
* **Next Header Field Value 50**: Encapsulation Security Payload Header
* **Next Header Field Value 60:** Destination Options
* **Next Header Field Value 135:** Mobility Header
* **Next Header Field Value 59:** No next header

#### Hop Limit Field

Bu alan, paketi ileten her cihaz tarafından 1 azaltılır. Değer 1'e ulaştığında paket yönlendirilmez.

#### Source IPv6 Address Field

128 bit IPv6 kaynak adresi. IPv6 adresleme hakkında ayrıntılar için bkz: RFC 4291, IP Sürüm 6 Adresleme Mimarisi

#### Destination IPv6 Address Field

128 bit IPv6 hedef adresi.

### IPv4 Trafiğini Filtreleme

IPv4 trafiği için capture ve display filter basitçe *ip*’dir.

* ip.src==192.168.1.1 — Kaynak IP adresi alanında 192.168.1.1 içeren IPv4 paketleri
* ip.dst==192.168.1.103 — Hedef IP adresi alanında 192.168.1.103 içeren IPv4 paketleri
* ip.addr==192.168.1.103 — Kaynak veya hedef IP adresi alanlarında 192.168.1.103 içeren IPv4 paketleri
* !ip.addr==192.168.1.103 — Kaynak veya hedef IP adresi alanlarında 192.168.1.103 içermeyen paketler
* ip.hdr\_len > 20 — Seçenekli IPv4 başlığı (başlık uzunluğu 20 bayttan uzun)
* (ip.flags.mf==1) || !(ip.frag\_offset==0) && ip — Parçalanmış paket — IP parça ofseti alanında daha fazla parça biti ve sıfır olmayan değer arar. ARP dahil tüm IP dışı protokollerle başa çıkmak için “&& ip” eklendi. ip-fragments.pcapng üzerinde test edin.
* ip.ttl < 10 — IP Yaşam Süresi(TTL) değerleri 10'dan az

### IPv6 Trafiğini Filtreleme

IPv6 için yakalama filtresi basitçe ip6'dır. Tek bir hosttan gelen trafiği yakalamak için host[IPv6 adresi] kullanın — örneğin, ana bilgisayar fe80::708d:fe83:4114:a512.

Belirli bir IPv6 alt ağından gelen trafik için bir yakalama filtresi uygulamak için aşağıdaki sözdizimini kullanın:  
ip6 net [network]::/[net bits],

Örneğin, *ip6 net fe00::/8*, 0xfe ile başlayan adreslere giden veya gelen tüm IPv6 paketlerini yakalar. Tüm IPv6 trafiği için display filter ipv6'dır. Aşağıdaki tabloda çok sayıda diğer IPv6 görüntüleme filtresi gösterilmektedir.

* ipv6.nxt==0x06 — Bir TCP başlığından önce gelen IPv6 paketleri
* ipv6.src\_6to4\_gw\_ipv4==24.6.173.220–24.6.173.220 tarafından kapsüllenmiş 6to4 paketleri
* ipv6.hlim < 10 — Atlama Sınırı alan değeri 10'dan düşük olan IPv6 paketi
* ipv6.src==2002:1806:addc::1806:addc — Belirli bir adresten gelen IPv6 paketleri
* ipv6.src >= fe80:: && ipv6.src <= fec0 — Çeşitli ağlardan gelen IPv6 paketleri

### Kaynakça

* Wireshark Network Analysis, Second Edition, Laura Chappel, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>