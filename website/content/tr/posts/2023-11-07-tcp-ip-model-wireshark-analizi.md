---
date: '2023-11-07'
description: Merhaba bu yazımda TCP/IP modelini ve Wireshark ile temel bir ağ analizinin
  nasıl yapılabileceğini anlatmaya çalıştım.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*vQHzVUN_qVpKQQbS9Cr4Ug.png
layout: single
series:
- Wireshark ile Ağ Analizi
title: TCP/IP Model Wireshark Analizi
type: posts
---

Merhaba bu yazımda TCP/IP modelini ve Wireshark ile temel bir ağ analizinin nasıl yapılabileceğini anlatmaya çalıştım.

### Ağ Trafik Akışlarını Anlama

#### Switching (anahtarlama)

Anahtarlar paketleri MAC başlığında (Ethernet başlığı gibi) bulunan hedef MAC adresine (hedef donanım adresi, fiziksel adresi olarak da bilinir) göre iletir.

![](https://cdn-images-1.medium.com/max/800/1*NsSETtT4IofH-5OXSKDrzQ.png)

Switchler paketlerdeki MAC veya IP adreslerini değiştirmez

Bir paket bir anahtara ulaştığında, anahtar doğru sağlama toplamına (checksum) sahip olduğundan emin olmak için paketi kontrol eder. Paketin sağlama toplamı yanlışsa, paket “bad” olarak kabul edilir ve paket atılır. Anahtarlar, kötü sağlama toplamları nedeniyle kaç paketi attıklarını gösteren hata sayaçları tutmalıdır. Sağlama toplamı doğruysa, anahtar paketin hedef MAC adresini inceler ve bu MAC adresini kullanan ana bilgisayara hangi anahtar bağlantı noktasının gittiğini bilip bilmediğini belirlemek için MAC adresi tablosuna başvurur. Anahtarın tablolarında hedef MAC adresi yoksa, paketi tüm anahtar bağlantı noktalarından( portlardan) iletir cevap veren hedefi keşfetmeyi umar. Bu işlem **ARP** protokolü ile gerçekleştirilir.Anahtarın tablolarında hedef MAC adresi varsa, paketi uygun bağlantı noktasına iletir .

#### Routing (yönlendirme)

Yönlendiriciler paketleri IP başlığındaki hedef IP adresine göre iletir. Bir paket yönlendiriciye gönderildiğinde Yönlendiricinin MAC adresi, bu yönlendirici paketin geçerli olduğundan emin olmak için sağlama toplamını(checksum) inceler. Sağlama toplamı geçersizse paket düşürülür. Sağlama toplamı geçerliyse, yönlendirici MAC başlığını çıkarır (örneğin Ethernet başlığı) ve IP başlığını inceleyerek “TTL” (Time to Live) ve hedefini belirler. paketi. Eğer paket çok “eski” ise (Time to Live değeri 1), yönlendirici paketi atar ve bir ICMP Yaşam Süresi Aşıldı mesajı göndericiye geri gönderilir. Paket eski değilse(TTL süresi Aşılmadıysa), yönlendirici hedef IP ağının bilinip bilinmediğini belirlemek için yönlendirme tablolarına bakar. Yönlendirici hedef ağa doğrudan bağlıysa, paketi hedefe gönderebilir. Yönlendirici, IP başlığı Time to Live değerini azaltır ve ardından paketi iletmeden önce pakete yeni bir MAC başlığı oluşturur ve uygular

![](https://cdn-images-1.medium.com/max/800/1*Utuq1h526m5eoCl4wWYJGQ.png)

Yönlendiriciler hedef MAC adresini hedefe veya bir sonraki yönlendiriciye değiştirir

Hedef yerel olarak bağlı bir ağda değilse, yönlendirici paketi yönlendirme tablolarına bakarken öğrendiği sonraki atlama yönlendiricisine iletir.

Yönlendiriciler, adresleme bilgilerine dayalı olarak paketleri engelleyen veya izin veren kurallar içerebilir. Birçok yönlendirici güvenlik duvarı özellikleri sağlar ve diğer özelliklere göre trafiği engelleyebilir/izin verebilir.

#### Proxy, Firewall and NAT/PAT

Güvenlik duvarları trafiği incelemek ve bir dizi kurala dayalı olarak letişime izin vermek/vermemek için oluşturulur. Örneğin, güvenlik duvarı dışındaki ana bilgisayarlardan gelen ve dahili sunuculardaki 21 numaralı porta yönlendirilen tüm TCP bağlantı girişimlerini engellemek isteyebilirsiniz.

Temel güvenlik duvarları OSI modelinin 3. Katmanında, yani ağ katmanında çalışır. Bu kapasitede, güvenlik duvarı ağ trafiğini işlerken bir yönlendirici gibi davranır ve güvenlik duvarı kuralları tarafından engellenmeyen trafiği iletir. Güvenlik duvarı, paketi iletmeden önce pakete yeni bir MAC başlığı ekler. Güvenlik duvarı Ağ Adresi Çevirisi(NAT) veya proxy yetenekleri gibi ek özellikleri destekliyorsa, ek paket değişikliği gerçekleşecektir.

![](https://cdn-images-1.medium.com/max/800/1*0sZI8QkhS5eWd1ef0qJyXw.png)

Güvenlik duvarı gerçek kaynak IP adresini gizlemek için NAT kullanır

NAT sistemleri paketteki IP adreslerini Şekilde gösterildiği gibi değiştirir. Bu genellikle istemcinin özel IP adresini gizlemek için kullanılır. Temel bir NAT sistemi basitçe paketin kaynak ve hedef IP adresini değiştirir ve bir yanıt alındığında trafiği düzgün bir şekilde iletmek için bağlantı ilişkilerini bir tabloda izler.

Port Address Translation (PAT) sistemleri de port bilgilerini değiştirir ve bunu tek bir giden adres kullanırken birden fazla dahili bağlantıyı demultiplex etmek için bir yöntem olarak kullanır. Bir NAT/PAT cihazının bir tarafında gördüğünüz IP adresleri NAT/PAT cihazının diğer tarafında gördüğünüz IP adresleriyle eşleşmeyecektir. Bir NAT cihazının her iki tarafındaki iletişimleri ilişkilendirmek için, eşleşen paketleri tanımlamak üzere IP başlığının ötesine bakmanız gerekecektir.

#### Diğer Teknolojiler

Ağ trafiği modellerini ve paket içeriklerini etkileyen çok sayıda başka teknoloji vardır.

Sanal LAN (VLAN) etiketleme (802.1Q olarak tanımlanır) paketlere bir kimlik (etiket) ekler. Bu etiket, anahtarlamalı bir ortamda sanal ağlar oluşturmak için kullanılır. Şekil 7'de bir Ethernet çerçevesindeki VLAN etiketi gösterilmektedir. Bu durumda, gönderici VLAN 32'ye aittir.

Multiprotocol Label Switching (MPLS), uzak ana bilgisayarlar arasında sanal bağlantılar oluşturmanın bir yöntemidir. MPLS paketlerinin önüne MPLS kenar cihazları tarafından özel bir başlık eklenir. Örneğin, bir istemciden gönderilen bir paket, MPLS etiketinin pakete yerleştirildiği bir MPLS yönlendiricisine ulaşır. Paket artık yönlendirme tablosu aramalarına göre değil, MPLS etiketine göre iletilir. Paket MPLS ağından çıktığında MPLS etiketi çıkarılır.

### TCP/IP Modeli

TCP/IP Modelinin ve OSI Modelinin yanında temel TCP/IP öğelerini göstermektedir. TCP/IP öğeleri TCP/IP Modeli ile güzel bir şekilde eşleşmesine rağmen, OSI Modeli hala sektörümüzde sürekli olarak anılmaktadır. “Katman 2” cihazları (anahtarlar) ve “Katman 3” cihazları (yönlendiriciler) TCP/IP Modeline göre değil OSI Modeline göre sayısal tanımlama alırlar.

![](https://cdn-images-1.medium.com/max/800/1*X4_tzi-NjihAqIAJEunVWA.png)

TCP/IP Modeli ve OSI Modeli ile birlikte TCP/IP öğeleri

Birçok ağ hatası veya ihlali TCP/IP protokolü veya uygulama sorunlarına bağlanabilir. Bu sorunları tanımak için normal davranışın ne olduğunu bilmemiz gerekir. TCP/IP yapısında sık kullanılan protokeller şunlardır:

* **İnternet Protokolü (IPv4/IPv6)**, paketleri bir ağ üzerinde uçtan uca almak için kullanılan yönlendirilebilir ağ katmanı protokolü olarak işlev görür. Yönlendiriciler, yönlendirme kararları vermek için IP başlığında bulunan bilgileri kullanır. Katman 3 anahtarları da trafiği yönlendirebilir.
* **Kullanıcı Datagram Protokolü (UDP) ve İletim Kontrol Protokolü (TCP)** sırasıyla bağlantısız ve bağlantı yönelimli taşıma katmanı hizmetleri sağlar. UDP ve TCP başlıklarındaki bağlantı noktası alanları kullanılan uygulamayı tanımlar. TCP başlıkları, sıralama ve onaylama hizmetleri de sunan alanlar içerir. UDP ve TCP, OSI Modelinin 4. Katmanı (Aktarım Katmanı) ile eşleştirilmiştir.
* **Yönlendirme Bilgi Protokolü (RIP) ve Open Shortest Path First (OSPF)**, yönlendirme cihazları arasında ağ ve yol bilgisi alışverişi sağlayan iki protokol örneğidir.
* **İnternet Kontrol Mesajı Protokolü (ICMP/ICMPv6)** ağ bilgisi sağlamak için kullanılır ve genellikle ping için kullanılan protokol olarak tanınır. ICMPv6, bir IPv6 adresinin zaten kullanımda olup olmadığını kontrol etmek ve görmek için kullanılır (yinelenen adres algılama).
* **Etki Alanı Adı Sistemi (DNS)** ana bilgisayar adından IP adresine çözümleme hizmetleri sağlar. telnet station3 yazdığınızda, DNS station3 adını IP adresine çözümler. Diğer ad öğeleri de (Posta Değişimi veya MX kayıtları gibi) DNS ile çözümlenebilir.
* **Dinamik Ana Bilgisayar Yapılandırma Protokolü (DHCP)**, yalnızca IP adresi bilgisi değil, dinamik istemci yapılandırması ve hizmet bulma hizmetleri sağlar. DHCP ayrıca varsayılan ağ geçidi ayarları, DNS sunucu ayarları ve daha fazlasını da sağlayabilir.
* **Adres Çözümleme Protokolü (ARP)** yerel bir cihaz için donanım adresi arama hizmetleri sağlar. ARP ayrıca bir IPv4 adresinin zaten kullanımda olup olmadığını kontrol etmemizi ve görmemizi sağlar (yinelenen adres testi).

TCP/IP iletişiminde her şey yolunda giderse, istemciler hizmetleri hızlı bir şekilde bulur. Bu hizmetler taleplere hızla yanıt verir ve istemci sistemlerin bir hizmeti birden fazla kez talep etmesi gerekmez. **Bir analist**, iletişimler arasındaki büyük gecikmeleri, isim çözümleme hatalarını, yinelenen istekleri ve yeniden iletimleri, güvensiz uygulamaları ve çok daha fazlasını ortaya çıkarabilir. Hataları belirlemek için trafiği analiz etmeden önce, neyin normal ağ iletişimi olarak kabul edildiğini bilmeniz gerekir.

### İstemci — FTP Sunucu Senrayosu

TCP/IP, bir istemci bir sunucuyla iletişim kurarken çok adımlı bir çözümleme süreci kullanır. Örneğimizde, hem istemci hem de sunucu aynı ağ üzerindedir. Bu süreç aşağıdaki adımları içerir:

* Uygulama tarafından kullanılan kaynak ve hedef portları tanımlayın (port numarası çözümlemesi).
* Gerekirse hedef adını bir IP adresine çözümleyin (ağ adı çözümlemesi).
* Hedef yerel ağ üzerindeyse, hedefin donanım adresini elde edin (yerel MAC adresi çözümlemesi).
* Hedef uzaksa, hedefe ulaşmak için kullanılacak en iyi yönlendiriciyi belirleyin (rota çözümlemesi).
* Hedef uzaksa, yönlendiricinin MAC adresini belirleyin (tekrar yerel MAC adresi çözümlemesi).

![](https://cdn-images-1.medium.com/max/800/1*AWmwmBOwxbf1QyEXXsjg0Q.png)

TCP/IP çözümleme süreçleri

Örneğimizde bir istemci ile FTP Sunucu arasında yapılan bağlantıyı ele alacağız.

![](https://cdn-images-1.medium.com/max/800/1*cPS6KAp-bJl1xjrg96dEMg.png)

İstemci CORPFS1'e bir FTP bağlantısı yapmak istiyor

#### Adım 1: Port Numarası Çözümleme

Örneğimizde, kullanıcı ftp CORPFS1 yazmıştır. FTP genellikle veri aktarımı için 20 numaralı bağlantı noktasını veya dinamik bir bağlantı noktasını, oturum açma ve parola gönderme işlevleri, USER ve PASS gibi komutlar için 21 numaralı bağlantı noktasını kullanır. Örneğimizde, istemci 21 numaralı bağlantı noktasını kullanarak FTP sunucusuna bağlanmaya çalışıyor. Bu port numarası istemcideki etc/services dosyasında bulunmaktadır. Bu numara giden paketin TCP başlığı hedef port alanına yerleştirilecektir. İstemci, kaynak bağlantı noktası alan değeri için dinamik (geçici) bir bağlantı noktası kullanır. Bu işlem ağ üzerinde trafik oluşturmaz. Dolayısıyla izleme dosyası(trace file) da bir bilgi göremeyiz.

#### Adım 2: Ağ Adı Çözümlemesi (İsteğe Bağlı)

İstemci tarafından açık bir hedef IP adresi tanımlanmışsa, ağ adı çözümleme işlemi gerekli değildir. İstemci bir hedef ana bilgisayar adı tanımlamışsa (örneğimizde CORPFS1), hedef ana bilgisayarın IP adresini elde etmek için ağ adı çözümleme işlemi gereklidir.

Ad çözümleme(name resolution) işlemini gerçekleştirirken belirli bir sırayı izlemeniz gerekir:

1. Ad için DNS çözümleyici önbelleğine bakın.
2. Giriş DNS çözümleyici önbelleğinde yoksa, yerel hosts dosyasını inceleyin (varsa).
3. Yerel hosts dosyası yoksa veya istenen ad/adres hosts dosyasında yoksa, DNS sunucusuna istek gönderin (yerel sistem için bir tane yapılandırılmışsa).

Yapılandırılmış DNS sunucu listesindeki ilk DNS sunucusundan yanıt alınamazsa, istemci sorguyu yeniden deneyebilir ilk DNS sunucusuna yönlendirin veya bilinen bir sonraki DNS sunucusunu sorgulayın. Hala cevap yok mu? Bilinen başka DNS sunucusu yok mu? İstemci, hedef IP adresi alanına yerleştirilecek değeri çözemezse paketi oluşturamaz.

Örneğimizde, istemcinin yerel yapılandırmasında listelenen ilk DNS sunucusuna bir DNS sorgusu gönderdiğini görebiliriz. (Her şey yolunda giderse) bir DNS sunucusundan CORPFS1'in IP adresini içeren bir yanıt görmeliyiz.

Bu işlem, Şekil 181'de TX ile gösterildiği gibi ağ üzerinde trafik oluşturabilir. İsim çözümlemesi yerel hosts dosyasını kullanırsa veya istenen bilgiyi önbellekten alırsa, hiçbir paket gönderilmez. Bir DNS sorgusu gönderilmesi gerekiyorsa, bu sorgu izleme dosyasında görülecektir.

#### Adım 3: Rota Çözümlemesi-Hedef Yerel Olduğunda

Bu işlem sırasında istemci, hedef cihazın yerel (aynı ağ üzerinde) veya uzak (bir yönlendiricinin diğer tarafında) olup olmadığını belirler. İstemci, bir hedefin aynı ağda olup olmadığını belirlemek için kendi ağ adresini hedef ağ adresiyle karşılaştırır. Şekil 180'de gösterilen örnekte, istemcinin IP adresi 10.1.0.1/8'dir (ağ 10). Sunucunun IP adresi 10.2.99.99'dur. Hedef de ağ 10 üzerindedir.

İstemcinin IP adresine ve alt ağ maskesine bağlı olarak olası sonuçları göz önünde bulundurun.

* Alt ağ maskesi 255.0.0.0 olan 10.1.22.4 kaynak adresi = CORPFS1 yereldir (4. adıma gidin)
* Alt ağ maskesi 255.255.0.0 ile 10.1.22.4 kaynak adresi = CORPFS1 uzaktır (adım 5'e gidin)
* Alt ağ maskesi 255.255.0.0 olan 10.2.22.4 kaynak adresi = CORPFS1 yereldir (adım 4'e gidin)

Bu süreç ağ üzerinde trafik oluşturmaz.

#### Adım 4: Yerel MAC Adresi Çözümlemesi

Hedef cihaz yerelse, istemci yerel hedefin MAC adresini çözümlemelidir. İstemci önce ARP önbelleğini bu bilgi için kontrol eder Eğer bu bilgi yoksa, istemci hedefin donanım adresini bulmak için bir ARP yayını gönderir. Bir ARP yanıtı alındığında, istemci ARP önbelleğini günceller.

Bu işlem, TX ile belirtildiği gibi ağ üzerinde trafik oluşturabilir. MAC adresi önbellekteyse, hiçbir paket gönderilmeyecektir. Bir ARP sorgusu gönderilmesi gerekiyorsa, bu sorgu izleme dosyasında görülecektir.

#### Adım 5: Rota Çözümlemesi-Hedef Uzak Olduğunda

Hedef cihaz uzaksa, istemci uygun nexthop yönlendiriciyi belirlemek için rota çözümlemesi yapmalıdır. İstemci, hedef için bir ana bilgisayar veya ağ yolu girişi olup olmadığını belirlemek için yerel yönlendirme tablolarına bakar. Hiçbir giriş yoksa, istemci varsayılan bir ağ geçidi girişi olup olmadığını kontrol eder. Bu işlem ağ üzerinde trafik oluşturmaz.

Varsayılan ağ geçidi(Default Gateway) bir “kör inanç” yolu sunar — istemcinin hedefe giden bir rotası olmadığından, paketi varsayılan ağ geçidine gönderir ve varsayılan ağ geçidinin paketle ne yapacağını bulabileceğini umar.

Varsayılan ağ geçitleri genellikle ya paketi iletir (hedefe giden en iyi rotaya sahiplerse), hedefe giden en iyi rotaya sahip başka bir yerel yönlendiriciye işaret eden bir ICMP yeniden yönlendirme yanıtı gönderir ya da paketi nereye gönderecekleri konusunda hiçbir fikirleri olmadığını belirten bir yanıt verir (ICMP Destination Unreachable).

#### Adım 6: Bir Ağ Geçidi için Yerel MAC Adresi Çözümlemesi

Son olarak, istemci bir sonraki atlama yönlendiricisinin veya varsayılan ağ geçidinin MAC adresini çözmelidir. İstemci önce ARP önbelleğini kontrol eder. Bilgi önbellekte yoksa, istemci bilgiyi almak için bir ARP yayını gönderir.  
Sonraki yönlendiricinin MAC adresi ve ARP önbelleğini günceller.  
Bu işlem, TX ile belirtildiği gibi ağ üzerinde trafik oluşturabilir. İstenen bir yönlendiricinin MAC adresi önbellekte ise, hiçbir paket gönderilmeyecektir. İstenen yönlendirici için bir ARP sorgusu gönderilmesi gerekiyorsa, bu sorgu izleme dosyasında(trace file) görülecektir.

#### Paket Analizi

Her şey yolunda giderse (ve bu durumda hedef yerelse), bu işlem sırasında aşağıdaki bilgileri çözmüş olmamız gerekir:

* Hedef MAC adresi
* Hedef IP adresi
* Kaynak ve hedef bağlantı noktası numaraları

![](https://cdn-images-1.medium.com/max/800/1*tCpXIwj6CXujGOtmMVR_pA.png)

Ethernet üzerinden TCP/IP paketi için keşfedilen bilgiler

#### TCP/IP Trafik Analizi

Bu kısımda, http-riverbed-one.pcapng ve http-riverbed-two.pcapng dosyasını inceleyeceğiz. Kaynakça bölümünden erişebilirsiniz.

Bu iki dosya [www.riverbed.com](http://www.riverbed.com) adresine 89 saniye aralıkla erişim sağlayan bir istemciye aittir.

http-riverbed-**one**.pcapng dosyasında doğal olarak başta DNS sorgularının olduğunu görüyoruz. İstemcinin paketleri oluşturması için domaini çözümlemesi ve hedef IP bilgisini elde etmesi gerekir.

![](https://cdn-images-1.medium.com/max/1200/1*iUj1JBtBuMGtEUw5Y6zaCg.png)

http-riverbed-one.pcapng dosyasında domain çözümlemesi için yapılan DNS sorguları

http-riverbed-**two**.pcapng dosyasına başlangıçta DNS sorgularının olmadığını fark ediyoruz. Bu, istemcinin istenen IP adreslerinden bazılarına DNS önbelleğinde sahip olduğunu, dolayısıyla bu isimler için DNS sorgusu oluşturmaya gerek olmadığını gösterir.

![](https://cdn-images-1.medium.com/max/1200/1*6zV7mvLrjJnykjirRuBkdQ.png)

http-riverbed-two.pcapng dosyasında DNS sorguları görünmüyor.

http-riverbed-one.pcapng dosyasındaki DNS yanıtlarının çoğu, istemcinin ad çözümleme bilgilerini önbellekte kısa bir süre için tutmuş yeniden DNS sorgusu göndermemiştir.

Ancak oturum süresinin aşılması tarayıcımızın bu adları yeniden çözümlemek için DNS sorguları gönderdiğini http-riverbed-two.pcapng dosyasında görebiliriz.

![](https://cdn-images-1.medium.com/max/1200/1*SodfEwNqxAcl739FUVO_kA.png)

http-riverbed-two.pcapng dosyasında yenilenen DNS çözümlemeleri

Ayrıca http-riverbed-two.pcapng dosyasındaki toplam paket sayısının sadece 319 olduğunu fark edeceksiniz. Tarayıcı, DNS bilgilerinin bir kısmını önbellekten almanın yanı sıra çok sayıda sayfa öğesini de önbellekten görüntülemiştir.

http-riverbed-**one**.pcapng dosyasında protokol istatistiklerine baktığımızda (Statistic | Protocol hierarchy) trafiğin büyük oranda TCP kullandığını görürüz. Çünkü HTTP protokolü TCP’yi kullanır. UDP trafiğine baktığımızda ise Domain Name System(DNS) protokolünün kullandığını görürüz.

![](https://cdn-images-1.medium.com/max/800/1*zal0jQY1slYuV6RDm5UdCg.png)

http-riverbed-**one**.pcapng Protokol İstatistikleri

http-riverbed-**one**.pcapng dosyasındaki dominant trafiği görmek için Statistic| Conversations penceresini açabiliriz. Burda IPv4 sekmesini açtığımızda paketlere göre sıralama yaparsak dominant trafiğin hostlar arasında giden 1140 paketle **24.61.173.220** ile **208.70.196.59** IPleri arasında olduğunu söyleyebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*Hb4M03jKQ_8Lp1YzMShv2Q.png)

conversations

http-riverbed-**one**.pcapng dosyasında Statistic| Endpoints penceresinde trafikte geçen IP adreslerini görebiliriz. Buradai IP adreslerinnin hepi public IP adresi gibi görünüyor. Dolayısıyla trafik dış bir networkde yakalanmış diyebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*5XvOPLu2866hRTPDdvUjig.png)

endpoints

http-riverbed-**one**.pcapng dosyasında Statistic| HTTP| Requests penceresinde pcap dosyası içerisinde gidilen web adreslerini görüntüleyebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*2QwpmwBds_gI3oZfGyMGKA.png)

Requests

http-riverbed-**one**.pcapng dosyasında   
ip.addr == 24.6.173.220 && ip.addr == 208.70.196.59   
fltresini yazarak daha önce bulduğumuz dominant trafiği inceleyelim.

![](https://cdn-images-1.medium.com/max/800/1*MkagBTP5iI4imfNHp5V5nw.png)

Dominant Trafik

HTTP paketinin üzerine tıklayıp follow HTTP Stream seçeneğini seçersek tüm HTTP trafiğini görüntüleyebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*-2JPla-66SZrjX-kKCsECg.png)

Follow HTTP Stream

Karşımıza uzun bir akış çıkıyor. Burada [www.riverbed.com](http://www.riverbed.com) adresine giden-gelen trafiği bulmuş olmuş. Bu adresle kurulan HTTP bağlantılarını request (kırmızı yazı) ve response (mavi yazı) olarak görebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*4B5HtycWS34GEws6jMxlnA.png)

www.riverbed.com HTTP Stream

### Kaynakça

* Wireshark Network Analysis, Second Edition, Laura Chappel, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>