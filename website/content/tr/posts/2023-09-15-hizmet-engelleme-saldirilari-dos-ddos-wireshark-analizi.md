---
date: '2023-09-15'
description: Merhaba, bu yazımda DoS ve DDoS olarak bilinen hizmet engelleme saldırılarının
  wireshark ile analizini gerçekleştireceğim.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*tKGgOxt2Mq5piyQ3_CJDdg.png
layout: single
series:
- Wireshark ile Ağ Analizi
title: Hizmet Engelleme Saldırıları (DoS-DDoS) Wireshark Analizi
type: posts
---

Merhaba, bu yazımda DoS ve DDoS olarak bilinen hizmet engelleme saldırılarının wireshark ile analizini gerçekleştireceğim.

### Wireshark

Wireshark, bir ağ analiz aracı olarak kullanılan açık kaynaklı bir yazılımdır. Wireshark, ağ trafiğini yakalayabilir, inceleyebilir ve analiz edebilir, böylece ağ sorunlarını teşhis etmek, güvenlik tehditlerini tespit etmek veya ağ performansını izlemek için kullanılabilir.

Detaylı bilgi için: <https://www.wireshark.org/>

Wireshark’ı bilgisayarınıza kurmak için aşağıdaki adımları izleyebilirsiniz. Unutmayın ki işletim sisteminize ve kullanım amacınıza bağlı olarak bu adımlar değişebilir. İşte Wireshark’ı kurmanın genel adımları:

#### **Windows İşletim Sistemi için:**

1. Wireshark’ın Resmi İnternet Sitesini Ziyaret Edin: Wireshark’ı resmi web sitesinden indirmeniz önerilir. Resmi web sitesine şu adresten ulaşabilirsiniz: <https://www.wireshark.org/>
2. İndirme Sayfasına Git: Ana sayfada, “Download” veya “İndir” bağlantısına tıklayın.
3. İndirme Seçeneklerini Belirleyin: Windows için Wireshark sürümünü seçin ve indirme işlemine başlayın. İndirdiğiniz dosya .exe uzantılı olacaktır.
4. Kurulum Sihirbazını Çalıştırın: İndirilen .exe dosyasını çalıştırın. Windows UAC (Kullanıcı Hesap Kontrolü) izni gerektirebilir. İzni verin ve kurulum işlemine devam edin.
5. Yükleme Seçeneklerini Ayarlayın: Kurulum sırasında Wireshark ve WinPcap (bazı sürümlerde Npcap) gibi bileşenlerin yüklenip yüklenmeyeceğini seçebilirsiniz. Genellikle önerilen ayarları kabul etmek iyi bir seçenektir.
6. Kurulumu Tamamlayın: Kurulum işlemini tamamlamak için gerekli adımları takip edin. Kurulum tamamlandığında, Wireshark’ı başlatma seçeneğiniz olacaktır.
7. Wireshark’ı Başlatın: Kurulum tamamlandığında Wireshark’ı başlatın. Artık ağ trafiğini yakalayabilir ve analiz edebilirsiniz.

#### **Linux İşletim Sistemi için:**

Wireshark, birçok Linux dağıtımının depolarında bulunur, bu yüzden aşağıdaki komutları kullanarak paketi yükleyebilirsiniz. Örneğin, Debian veya Ubuntu tabanlı bir sistemde:

```
sudo apt update  
sudo apt install wireshark
```

Kurulum sırasında sudo ile yönetici izni gerekebilir. Ayrıca, Wireshark’ı kullanabilmek için kullanıcıyı “wireshark” grubuna eklemek veya sudo ile başlatmak gerekebilir.

#### **Mac İşletim Sistemi için:**

Wireshark’ı Mac OS X üzerinde kullanmak için, resmi web sitesinden bir DMG dosyasını indirebilir ve kurabilirsiniz. Kurulum sırasında sık sık yönergeleri takip etmelisiniz.

Wireshark’ı kurduktan sonra, ağ trafiğini yakalamak ve analiz etmek için kullanmaya başlayabilirsiniz. Unutmayın ki ağ trafiği izleme işlemi, belirli izinler gerektirebilir ve bu işlemi yasal ve etik kurallara uygun bir şekilde yapmalısınız.

### DoS — DDoS

Denial of Service (DoS) ve Distributed Denial of Service (DDoS) saldırıları, bilgisayar sistemlerine veya ağlara hizmet sağlama yeteneklerini geçici veya kalıcı olarak engellemeyi amaçlayan siber saldırı türleridir.

![](https://cdn-images-1.medium.com/max/800/0*CnVj85vNvqXwZqbI)

DoS (Denial of Service) saldırısı, tek bir kaynaktan gelen trafiği kullanılamaz hale getirme girişimidir. DDoS (Distributed Denial of Service) saldırısı ise birçok kaynaktan gelen koordineli trafiği kullanılamaz hale getirme girişimidir. Temel fark, DoS’ün tek kaynaktan gelmesi, DDoS’ün ise çoklu kaynaklardan gelmesidir. DDoS, daha büyük ve daha etkili bir saldırı türüdür.

Bu saldırıları kendi lab ortamınızda gerçekleştirmek için bir linux makine üzerinde [hping3](https://www.kali.org/tools/hping3/) aracını kullanabilirsiniz. Bunun yanında [DoS Attack Framework](https://github.com/yusufarbc/DoS-Attack-Framework) aracı da DoS saldırıları yapmak için size bir etkileşimli arayüz sunar.

### TCP Saldırıları

TCP (Transmission Control Protocol), bilgisayarlar arasında güvenilir ve sıralı veri iletimi sağlamak için kullanılan bir iletişim protokolüdür. TCP’nin çalışma şekli, bayraklar olarak adlandırılan kontrol işaretçileri kullanılarak yönetilir. TCP’nin çalışma prensipleri ve bayraklarının açıklamaları verilmiştir:

1. **Başlatma (SYN — Synchronize):** İstemci(client) taraf, bağlantıyı başlatmak için bir “SYN” bayrağı içeren bir paket gönderir.
2. **Yanıt (SYN-ACK — Synchronize Acknowledgment):** Sunucu tarafı, bağlantıyı kabul ediyorsa, “SYN-ACK” bayrağı içeren bir yanıt gönderir.
3. **Onay (ACK — Acknowledgment):** İstemci taraf, ikinci tarafın kabul yanıtını aldığını doğrulamak için bir “ACK” bayrağı içeren bir yanıt gönderir ve bağlantı tamamlanır.
4. **Veri İletimi (PSH — Push, URG — Urgent, FIN — Finish, RST — Reset):** Bağlantı kurulduktan sonra, taraflar veri iletimine başlarlar. İletilecek veri paketleri bu bayraklarla işaretlenerek iletilir:

* **PSH (Push):** Verinin hızlı iletilmesini istediğini belirtir.
* **URG (Urgent):** Öncelikli veri olduğunu belirtir.
* **FIN (Finish):** Veri iletimini sonlandırır.
* **RST (Reset):** Bağlantıyı sıfırlar ve sonlandırır.

TCP, gönderilen verinin sırasını ve güvenilirliğini sağlamak için bayraklarını kullanır. Veri paketleri belirli bir sırada iletilir ve eksik veya hatalı paketler yeniden talep edilir.

![](https://cdn-images-1.medium.com/max/800/0*pzIithfwbR4guk5-)

Üç Yollu El Sıkışma (Three Way Handshake)

TCP protokolünün kullanıldığı hizmet engelleme saldırıları, genellikle ağ veya sunucu kaynaklarını tüketmek ve hizmet kesintilerine neden olmak amacıyla gerçekleştirilen saldırılardır. Bu tür saldırılar, TCP/IP iletişimi üzerindeki zayıf noktalardan yararlanarak hedef ağ veya sunucuları etkileyebilir. İşte TCP protokolünün kullanıldığı bazı hizmet engelleme saldırıları:

#### SYN Flood Saldırısı

Bu saldırıda, saldırganlar hedef sunucuya çok sayıda sahte bağlantı isteği (SYN isteği) gönderirler. Hedef sunucu bu istekleri yanıtlamaya çalışırken kaynaklarını tüketir ve gerçek kullanıcılara hizmet veremez hale gelir.

Wireshark ile SYN Flood saldırısı yakaladığımızda çok kısa zaman aralıklarıyla gönderilmiş birçok SYN bayraklı TCP paketi görürüz.

![](https://cdn-images-1.medium.com/max/800/1*8f1IfL0GBQhChQvtBIMM1w.png)

SYN-Flood

#### RST Flood Saldırısı

Saldırganlar, hedef sunucuya sahte TCP RST paketleri göndererek mevcut bağlantıları sıfırlarlar. Bu, hedef sunucunun işleyişini bozabilir ve hizmetleri kullanılamaz hale getirebilir.

Wireshark ile RST Flood saldırısı yakaladığımızda çok kısa zaman aralıklarıyla gönderilmiş birçok RST bayraklı TCP paketi görür. Kaynak adresini de manipüle eder farklı IP adreslerinden geliyormuş gibi gösterir.

![](https://cdn-images-1.medium.com/max/800/1*3YLM5vaoxJjO3zo5h_nA1w.png)

RST Flood

#### ACK-PSH Flood Saldırısı

Bu tür saldırılarda, saldırganlar hedef sunucuya büyük miktarda sahte TCP ACK ve PSH (Push) paketleri gönderirler. Bu, sunucunun kaynaklarını tüketmeye ve hizmetlerin yavaşlamasına neden olabilir.

Wireshark ile ACK-PSH Flood saldırısı yakaladığımızda çok kısa zaman aralıklarıyla gönderilmiş birçok PSH+ACK bayraklı TCP paketi görür. Kaynak adresini manipüle eder farklı IP adreslerinden geliyormuş gibi gösterir.

![](https://cdn-images-1.medium.com/max/800/1*N5dYU-KK2LY19L4dcajOuw.png)

ACK-PSH Flood

#### ACK Flood Saldırısı

Saldırganlar, hedef sunucuya büyük miktarda sahte TCP ACK (Acknowledgment) paketi gönderirler. Bu, sunucunun kaynaklarını hızla tüketebilir.

ACK-PSH’e benzer şekilde ACK Flooda da wireshark ile baktığımızda çok kısa aralıklarla gönderilmiş ACK bayraklı TCP paketleri görüyoruz. Kaynak adresi manipüle edilerek farklı kaynaktan geliyormuş gibi gösterilmiş.

![](https://cdn-images-1.medium.com/max/800/1*UgJojmwpCwsycIQG5kO7UQ.png)

ACK Flood

Bu tür saldırılar, sunucuların ve ağların aşırı yüklendiği durumlar yaratır ve hizmet kesintilerine neden olabilir. Bu nedenle, hedefler genellikle saldırıları tespit etmek ve savunmak için güvenlik önlemleri ve siber güvenlik çözümleri kullanırlar. Bu çözümler, trafiği filtreleme, güvenlik duvarları, saldırı tespiti sistemleri ve yük dengeleme gibi önlemleri içerebilir. Ayrıca, ağ güvenliği politikaları ve iyi güvenlik uygulamaları da önemlidir.

### UDP Saldırıları

UDP (User Datagram Protocol), IP tabanlı ağlarda veri iletimi için kullanılan bir iletişim protokolüdür. UDP, veri paketlerinin hızlı ve düşük gecikme ile iletilmesini sağlar, ancak verilerin güvenilir bir şekilde iletilmesini veya alınmasını garanti etmez. UDP, genellikle ses ve video akışları gibi uygulamalarda ve ağ oyunlarında kullanılır.

UDP, veriyi güvenli bir şekilde iletmek veya almak için TCP gibi güvenlik ve güvenilirlik mekanizmalarını içermez. Bu nedenle, UDP saldırıları daha öngörülemez ve savunması daha zor olabilir. Bazı UDP saldırıları ve açıklamaları:

#### **UDP Flood Saldırısı**

Bu tür bir saldırıda, saldırganlar hedef sunucuya büyük miktarda sahte UDP paketi gönderirler. Bu paketler, hedef sunucunun kaynaklarını tüketmeye ve hizmetlerini kullanılamaz hale getirmeye çalışır. Bu tür saldırılar, hedef sunucunun yanıt veremediği kadar hızlı bir şekilde paket göndermeyi içerebilir.

TCP saldırılarına benzer şekilde UDP salrıılarında da wireshark ile baktığımızda çok kısa aralıklarla gönderilmiş paketler görürüz. Farklı olan nokta bu sefer TCP değil UDP paketleri mevcut. Ayrıca yine kaynak adresi manipüle edilerek farklı kaynaktan geliyormuş gibi gösterilmiş.

![](https://cdn-images-1.medium.com/max/800/1*VNf1wUYOGRdXBuNUeU0qPg.png)

UDP Flood

#### **UDP Fragmentation Saldırıları**

Bu tür saldırılarda, saldırganlar büyük UDP paketlerini küçük parçalara böler ve hedef sunucuya bu parçaları gönderirler. Bu, hedef sunucunun paketleri yeniden monte etmek için kaynaklarını tüketmesine neden olabilir.

UDP saldırılarına karşı korunma, trafik filtreleme, güvenlik duvarları, paket dengeleme ve saldırı tespiti sistemleri gibi güvenlik önlemleri içerebilir. Ayrıca, hedef sunucunun kaynakları ve ağ trafiği izlenmeli ve anormal durumlar tespit edildiğinde müdahale edilmelidir.

### ICMP Saldırıları

ICMP (Internet Control Message Protocol), IP ağı üzerinde hata bildirimi, ağ yönlendirme bilgileri ve diğer ağ yönetimi işlevlerini gerçekleştirmek için kullanılan bir iletişim protokolüdür. ICMP saldırıları, bu protokolü kötü niyetli amaçlarla kullanarak bir hizmeti veya ağı etkisiz hale getirmeyi amaçlar. Aşağıda, yaygın ICMP saldırılarının bazıları ve açıklamaları verilmiştir:

#### **Ping Saldırıları (Ping Flood)**

Saldırganlar, hedef sunucuya büyük miktarda ICMP Echo Request (ping) isteği gönderirler. Bu istekler, hedef sunucunun yanıtlamasını gerektirir ve sunucunun kaynaklarını tüketebilir.

Wireshark ile ağ trafiğini incelediğimizde çok sayıda ICMP echo request paketi görüyoruz. Bu istekler tek bir kaynaktan gelmiş.

![](https://cdn-images-1.medium.com/max/800/1*dqsZopEHHSShzDAVlx62gA.png)

Ping Flood

#### Smurf Saldırıları

Bu tür saldırılarda, saldırganlar sahte kaynak IP adresleri kullanarak büyük miktarda ICMP Echo Request isteği gönderirler. Bu istekler, ağdaki tüm cihazlara iletilir ve tüm cihazlar yanıt verir, bu da hedef sunucunun aşırı yüklenmesine neden olur.

Wireshark ile ağ trafiğini incelediğimizde çok sayıda ICMP echo request paketi görüyoruz. Bu istekler manipüle edilmiş kaynaklardan gelmiş görünüyor.

![](https://cdn-images-1.medium.com/max/800/1*KKFdMVKStomIrgb24zsXWA.png)

Smurf Attack

#### **ICMP Redirect Saldırıları**

Saldırganlar, hedef ağdaki cihazları sahte ICMP Redirect istekleriyle yanıltmaya çalışır. Bu, ağ trafiğini kötü amaçlı bir sunucuya yönlendirmek için kullanılabilir.

#### **ICMP Time Exceeded Saldırıları**

Bu tür saldırılarda, saldırganlar ICMP Time Exceeded mesajları göndererek hedef sunucunun kaynaklarını tüketmeye çalışır. Bu mesajlar, ICMP trafiği tarafından oluşturulan trafiği artırabilir.

ICMP saldırıları, hedef ağı veya sunucuyu aşırı yükleyerek hizmet kesintilerine neden olabilir. Bu tür saldırılara karşı korunma, güvenlik duvarları, IPS (Intrusion Prevention System), ICMP trafiği filtreleme ve sızma testleri gibi güvenlik önlemlerini içerebilir. Ayrıca, ağ yöneticilerinin ağ trafiğini izlemesi ve anormal aktiviteyi tespit etmesi önemlidir.

### HTTP/HTTPS Saldırıları

HTTP ve HTTPS hizmet engelleme (DoS — Denial of Service) saldırıları, web sunucularını veya web uygulamalarını hedef alarak bu hizmetlere erişimi engellemeyi amaçlar. Bu tür saldırılar, sunucuların aşırı yüklenmesine ve hizmet kesintilerine neden olabilir. İşte HTTP ve HTTPS hizmetlerine yönelik bazı hizmet engelleme saldırıları:

#### **HTTP Flood Saldırıları**

Saldırganlar, hedef web sunucusuna çok sayıda HTTP isteği gönderirler. Bu, sunucunun kaynaklarını tüketebilir ve hizmet verememesine neden olabilir.

Bu saldırının gerçekleştirilmesi için python dili ile yazılmış bir araç buldum. Linki [burada](https://github.com/D4Vinci/PyFlooder). Kendi lokalimde kurduğum bir web sunucusuna HTTP flood saldırısı gerçekleştirdim.

Wireshark ile trafiği incelediğimizde çok kısa aralıklarla çok sayıda HTTP GET paketi gittiğini görüyoruz.

![](https://cdn-images-1.medium.com/max/800/1*wr8sajciDuwntDmn68NOdw.png)

HTTP GET Flood

#### **Slowloris Saldırıları**

Saldırganlar, web sunucusu ile yavaş bir bağlantı kurarlar ve bu bağlantıyı açık tutarlar. Bu, sunucunun yeni bağlantılara yanıt vermesini engelleyebilir.

#### **SSL/TLS Handshake Saldırıları**

Saldırganlar, SSL/TLS el sıkışma süreçlerini aşırı yükleyerek sunucuların kaynaklarını tüketebilirler. Bunun için hedef web sunucusunun HTTPS protokolünü kullanması ve SSL sertifikasının olması gerekir.

#### **BEAST (Browser Exploit Against SSL/TLS) Saldırıları**

Bu tür saldırılarda, saldırganlar önceden şifrelenmiş verileri çözmeye çalışarak güvenli bağlantıları etkileyebilirler. Bunun için hedef web sunucusunun HTTPS protokolünü kullanması ve SSL sertifikasının olması gerekir.

#### **Heartbleed Saldırıları**

Heartbleed zafiyeti, SSL/TLS sunucularını hedef alan bir saldırı türüdür. Saldırganlar sunucudan hassas bilgileri çalabilirler. Aynı şekilde bu saldırı için hedef web sunucusunun HTTPS protokolünü kullanması ve SSL sertifikasının olması gerekir.

Hizmet engelleme saldırılarına karşı korunma yöntemleri, trafik filtreleme, güvenlik duvarları, yük dengeleme, CDN (Content Delivery Network) kullanımı ve hizmet izleme gibi güvenlik önlemlerini içerebilir. Ayrıca, güncel yazılım yamaları ve güvenlik politikalarının uygulanması da önemlidir.

### DNS Saldırıları

DNS (Domain Name System), internet üzerindeki alan adlarını (örneğin, [www.example.com](http://www.example.com)) IP adreslerine (örneğin, 192.0.2.1) çeviren ve bu çevirme işlemini sağlayan bir hizmet ve protokoldür. DNS, insanlar için anlaşılabilir olan alan adlarını, bilgisayarlar için anlaşılabilir olan IP adreslerine çevirir. Bu, internet tarayıcıları gibi uygulamaların kullanıcıların girdiği alan adlarını gerçek IP adreslerine dönüştürmesine olanak tanır.

![](https://cdn-images-1.medium.com/max/800/0*BCj832ixsuIArXfY)

DNS

DNS hizmet engelleme saldırıları, bu hizmetin çalışmasını aksatmayı veya kesmeyi amaçlayan siber saldırılardır. DNS hizmetlerine yönelik yapılan hizmet engelleme saldırıları şunlar olabilir:

#### DNS Flood Saldırıları

Saldırganlar, hedef DNS sunucusuna çok sayıda sahte DNS sorgusu gönderirler. Bu sorguları işlemek için sunucunun kaynakları hızla tükenir ve DNS hizmeti kesilir.

#### DNS Amplifikasyon Saldırıları

Saldırganlar, DNS sunucusuna büyük boyutlu sorgular gönderirler, bu sorgular DNS sunucusundan daha büyük yanıtları tetikler. Yanıtlar, hedef sunucuya doğru yönlendirilir ve hedef sunucunun aşırı yüklenmesine neden olur.

#### DNS Cache Poisoning (Zehirleme) Saldırıları

Saldırganlar, hedef DNS sunucusunun önbelleğine sahte veri eklemeye çalışırlar. Bu, hedefin kullanıcılarına yanlış IP adresleri göndererek kullanıcıları yanıltabilir.

#### NXDOMAIN Saldırıları

Saldırganlar, hedef sunucunun yanıt verdiği sahte NXDOMAIN (Domain Bulunamadı) sorguları göndererek hedefin kaynaklarını tüketirler.

DNS hizmet engelleme saldırıları, internet erişimini kesmek veya web sitelerini kullanılamaz hale getirmek gibi ciddi sonuçlara yol açabilir. Bu tür saldırılara karşı korunma, DNS sunucularının güvenlik ayarlarının iyileştirilmesi, trafiği izleme ve filtreleme, DNS güvenlik uzantılarının kullanılması ve yedek DNS sunucularının bulundurulması gibi önlemleri içerebilir. DNS sunucularının ve altyapının güncel ve güvende olduğundan emin olmak da önemlidir.

### Macof Saldırısı

MACOF (MAC Flooding) saldırısı, Ethernet ağlarında gerçekleştirilen bir ağ saldırısı türüdür. Bu saldırı, ağdaki cihazların MAC (Media Access Control) adreslerini kötü niyetli bir şekilde sızdırmak veya ağ performansını bozmak amacıyla gerçekleştirilir. MACOF, genellikle yerel ağlarda veya kablosuz ağlarda gerçekleştirilir. Saldırının çalışma şekli şu şekildedir:

1. Saldırgan, ağa bağlı bir cihaz gibi davranarak çok sayıda rastgele MAC adresi oluşturur.
2. Bu sahte MAC adresleri, ağdaki tüm cihazlara yönlendirilen Ethernet çerçeveleri (frames) içerisinde kullanılır. Saldırgan, bu sahte MAC adresleriyle normal ağ trafiği gibi veri paketleri gönderir.
3. Ağdaki anahtarlayıcılar (switches) normalde bir MAC adresi ve bağlı olduğu bağlantı noktası arasındaki ilişkiyi öğrenir ve bu bilgiyi bir öğrenme tablosuna kaydederler. Ancak, saldırgan sahte MAC adresleriyle bu tabloyu hızla doldurarak anahtarlayıcıları aşırı yükler.
4. Aşırı yüklenen anahtarlayıcılar, veri paketlerini tüm bağlantı noktalarına iletir, bu da ağ trafiğini yavaşlatır veya kesintilere neden olabilir.

MACOF saldırısı, anahtarlayıcıların normal işlevini bozarak ağı etkisiz hale getirmeyi amaçlar. Bu tür bir saldırıya karşı korunma, güvenlik duvarları ve güvenlik politikaları ile ağ trafiğini izleme ve anormal trafiği tespit etme gibi önlemler içerebilir. Ayrıca, ağdaki anahtarlayıcıların güvenlik ayarlarının doğru bir şekilde yapılandırılması önemlidir.

### Kaynaklar

[**SampleCaptures**  
*So you're at home tonight, having just installed Wireshark. You want to take the program for a test drive. But your…*wiki.wireshark.org](https://wiki.wireshark.org/SampleCaptures#sample-captures "https://wiki.wireshark.org/SampleCaptures#sample-captures")

[**Build software better, together**  
*GitHub is where people build software. More than 100 million people use GitHub to discover, fork, and contribute to…*github.com](https://github.com/topics/dns-amplification-attack "https://github.com/topics/dns-amplification-attack")