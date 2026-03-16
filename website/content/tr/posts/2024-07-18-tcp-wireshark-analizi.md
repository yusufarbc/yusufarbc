---
date: '2024-07-18'
draft: false
title: TCP Wireshark Analizi
---

---

### TCP Wireshark Analizi

Merhaba bu yazımda TCP protokolünü ve Wireshark ile analizini anlatmaya çalışacağım.

---

### TCP Nedir?

TCP, iki cihaz arasında üçlü el sıkışma ile başlayan bir bağlantı üzerinden bağlantılı taşıma sağlar. Veriler sıralanır ve kayıp paketleri otomatik kurtarma sağlamak için onaylanır. UDP bir mektup veya kartpostal için standart posta dağıtım sistemine benzetilebilirken, TCP mektubunuzun veya kartpostalınızın teslimatını takip eden ve size alındığına dair bildirim gönderen bir ekspres taşıyıcıya benzetilebilir.

TCP, araya giren bir onay beklemeden çok sayıda veri paketini sırayla gönderme işlemi olan pencerelemeyi destekler. Pencerenin boyutu, ağın kaldırabileceği trafik miktarına (ağ tıkanıklık oranı), alıcının kullanılabilir tampon alanına ve göndericinin iletim tampon kapasitesine bağlıdır. Çoğu dosya aktarım protokolü, verilerin güvenilir bir şekilde teslim edilmesini sağlamak için TCP kullanır.

![](https://cdn-images-1.medium.com/max/800/1*eV6FVT7z6k3hb3M6-DRqtw.png)

TCP, HTTP, HTTPS, e-posta, FTP ve daha fazlası gibi uygulamalar için aktarım sunar

TCP RFC 793'te ele alınmıştır, ancak orijinal TCP protokolünde TCP davranışını incelerken akılda tutulması gereken birçok geliştirme yapılmıştır.

---

### TCP Trafik Analizi

Normal TCP iletişimi, bağlantı kurma, sıra izleme, veri kaybı kurtarma ve bağlantı kesme işlemlerini içerir.

#### TCP Bağlantıları

TCP bağlantıları üç yönlü bir el sıkışma yoluyla kurulur. Temel el sıkışma süreci üç paket gerektirir — SYN, SYN/ACK ve ACK.

SYN paketleri, her iki tarafın da birbirlerinin başlangıç sıra numaralarını (İlk Sıra Numarası veya ISN) bilmelerini sağlamak için sıra numaralarını senkronize eder. Aralarında değiş tokuş edilen veri sırasını bu şekilde takip edilir.

![](https://cdn-images-1.medium.com/max/800/1*MVWnM3ExdWfUNeZCyXpERQ.png)

Üç yönlü TCP el sıkışması bir FTP bağlantısı kurar

Şekilde, 24.6.173.220 hostu 74.125.224.81 adresine bir TCP bağlantısı kurar. Paket 1, Info sütununda [SYN] tanımını içerir, paket 2 [SYN, ACK] ve paket 3 [ACK] listeler. Bu tanınabilir model, bir bağlantı kurmak için kullanılan TCP üç yönlü el sıkışmasıdır.

TCP bağlantıları çeşitli şekillerde sonlandırılabilir. Açık bir sonlandırma TCP Sıfırlamalarını kullanır. Örtük bir sonlandırma TCP FIN paketlerini kullanır.

FIN kullanıldığında, bir host bir FIN paketi gönderir ve FIN’i onaylanana ve eş kendi FIN’ini geri gönderene kadar FIN-WAIT durumuna girer. RFC 793'e göre, FIN bir bağlantıyı dolaylı olarak sonlandırmak için kullanıldığında aslında mümkün olan birkaç durum vardır.

![](https://cdn-images-1.medium.com/max/800/1*oKbEZpebc55HRhufKktDkw.png)

Bir Windows veya Linux ana bilgisayarındaki TCP bağlantılarının mevcut durumunu öğrenmek için netstat -a yazın. Aşağıda bir Windows ana bilgisayarındaki bağlantı durumuna ilişkin bir örnek verilmiştir.

TCP 24.6.173.220:1035 poll:https ESTABLISHED  
TCP 24.6.173.220:1071 egw1:https ESTABLISHED  
TCP 24.6.173.220:9497 163–166:http CLOSE\_WAIT  
TCP 24.6.173.220:9699 nuq04s07-in-f11:http CLOSE\_WAIT  
TCP 24.6.173.220:9702 ec2–204–236–130–101:http CLOSE\_WAIT  
TCP 24.6.173.220:9703 ec2–204–236–131–42:http CLOSE\_WAIT  
TCP 24.6.173.220:9706 a184–84–222–33:http CLOSE\_WAIT  
TCP 24.6.173.220:9798 163–166:http CLOSE\_WAIT  
TCP 24.6.173.220:14717 nuq04s07-in-f5:http CLOSE\_WAIT  
TCP 24.6.173.220:15582 163–166:http CLOSE\_WAIT  
TCP 24.6.173.220:22167 66–151–158–187:https TIME\_WAIT  
TCP 24.6.173.220:22168 216–115–209–254:https TIME\_WAIT  
TCP 24.6.173.220:22169 probe-cgnt-sjc:https TIME\_WAIT  
TCP 24.6.173.220:22170 probe-cgnt-sjc:https TIME\_WAIT  
TCP 24.6.173.220:22171 216–115–209–254:https TIME\_WAIT

FIN “Kapa Çeneni” Demek Değildir  
RFC 793, FIN bitinin amacını göndericiden daha fazla veri gelmeyeceğini belirtmek olarak tanımlar. Bu, FIN paketinin alıcısının ek veri göndermesini engellemez, buna izin verilir.

![](https://cdn-images-1.medium.com/max/800/1*smMgrW01y8cfs7-ZvQ813Q.png)

TCP Sıfırlama, bir TCP bağlantısını açıkça kapatmak için kullanılır

Bir TCP bağlantısını açıkça sonlandırmak için kullanılan bir Sıfırlama da görebilirsiniz. Sıfırlamadan önce FIN’ler gelebilir veya Sıfırlama kendi başına olabilir. Şekilde, 24.6.173.220 tarafından kurulan bir HTTP bağlantısını göstermektedir. FIN paketinde sunucu, gönderecek başka verisi olmadığını belirten FIN biti ayarlı bir paket gönderir. İstemci yanıtı onaylar ve FIN biti ayarlanmış bir paket gönderir. Son olarak sunucu, son pakette bağlantıyı açıkça sonlandırmak için bir TCP Sıfırlama gönderir.

#### TCP Paket İzleme ve Kurtarma

Sıralama/onay süreci paketlerin sırasını izler ve eksik bölümleri tespit edip kurtarır.

El sıkışma işlemi sırasında bağlantının her iki tarafı da kendi başlangıç sıra numarasını (İlk Sıra Numarası) seçer. Her iki taraf da bu sıra numarasını her pakette bulunan veri miktarı kadar artırır. Sıralama/onay sürecini analiz ederken şu basit denklem kullanılır:

![](https://cdn-images-1.medium.com/max/800/1*cXVzyyVpFHkcZXppMisl5Q.png)

Sıralı bir iletişimin basit terimler/sayılarla nasıl gerçekleşebileceğine dair kısa bir örnek:

Onay Numarası alanı yalnızca veri alındığında artar. Varsayılan olarak Wireshark, daha kolay okunabilirlik için sıra numarası değerlerini 0'dan başlatan Göreceli Sıra Numaralandırmayı kullanır. Wireshark, 402691989 gibi bir sıra numarası görüntülemek yerine sıfır sıra numarasıyla başlar çünkü daha küçük sayılarla çalışmak daha kolaydır. Gerçek sıra numaralarını görmek istiyorsanız TCP tercihlerinde TCP Göreli Sıra Numaralarını ve Pencere Ölçeklendirmeyi devre dışı bırakın.(unutmayın, Onay Numarası alanı diğer taraftan beklenen bir sonraki sıra numarasının değerini içerir).

Anlaşma sağlandıktan sonra sıra numaraları yalnızca gönderilen gerçek veri baytlarının sayısı kadar artar. Bu örnekte, istemci veri gönderen ilk eştir (bir web sunucusundaki ana sayfayı alma isteği).

![](https://cdn-images-1.medium.com/max/800/1*iWouL0pOxZ6CGzHveXRqaA.png)

TCP Sırası ve Onay numaraları, değiştirilen verileri izler

![](https://cdn-images-1.medium.com/max/800/1*bga1HCi_98qMzffpg5tHag.png)

İlk Bağlantı

Şekilde gösterilen TCP iletişimleri http-espn2011.pcapng adlı dosyada görülebilir. Bu dosyada kullanıcı [www.espn.com'a](http://www.espn.com%27a) bağlanır ve içeriğin kalıcı olarak go.espn.com’a taşındığı konusunda bilgilendirilir. İstemci daha sonra go.espn.com’a bağlanır.

![](https://cdn-images-1.medium.com/max/800/1*xsmRACMlX0dHKNm2d4v3TQ.png)

İkinci Bağlantı

Bu ikinci bağlantının başlangıcı ve Sıra/Onay Numarası alan değerleri Şekilde gösterilmektedir.

TCP, paket kaybını belirleme (eksik sıra numaralarına dayalı olarak) ve eksik veri bölümlerini talep ederek (alıcı tarafı) veya zaman aşımına uğrayarak ve onaylanmayan bölümleri yeniden göndererek (gönderen taraf) kurtarma yeteneğine sahiptir.

Alıcı, beklenen sıra numarasının pakette olmadığını fark ettiğinde paketin kaybolduğunu varsayar. Bu noktada alıcı, Onay Numarası alanını eşten beklenen bir sonraki sıra numarasına ACK olarak ayarlar.

![](https://cdn-images-1.medium.com/max/800/1*ag_paaFMEEadzkxMp25WHQ.png)

Yüksek gecikmeli yollar üçten fazla aynı ACK’nin nedeni olabilir

Üçten fazla AC’in alınması yeniden iletimi tetikleyecektir. Örneğin alıcı Şekildeki gibi dizi atlandığında Onay Numarası alanına 112750 ile ACK gönderir. Sıra numarası 112750 değil, ek veriler alındığında, ek ACK’ler (Onay Numarası alanında 112750 ile birlikte) gönderilecektir. Wireshark bunları Yinelenen ACK’ler olarak işaretler.

TCP göndericileri, bir TCP eşi tarafından onaylanmayan bir paketin ne zaman yeniden iletilmesi gerektiğini belirlemek için bir TCP Yeniden İletim Zaman Aşımı (RTO) değerini korur. Bir veri paketi gönderilirse ve RTO zamanlayıcısının süresi dolmadan onaylanmazsa, TCP göndericisi orijinal paketin sıra numarasını kullanarak paketi yeniden iletebilir.

![](https://cdn-images-1.medium.com/max/800/1*-mKnrW-dlf9Xjy9Bv4i1cQ.png)

Yeniden iletim zaman aşımı değerine ulaşıldığında HTTP sunucusu bir paketi yeniden iletir

Şekilde, bir ACK’i bekledikten sonra veri paketini yeniden gönderen ve RTO’nun süresi dolmadan önce onu almayan bir sunucuyu göstermektedir. Yaklaşık 600 ms sonra başka bir yeniden iletim gönderilir. TCP’nin geri çekilme algoritmasını kullanarak, paket onaylanana veya gönderen TCP hostu beş yeniden iletimden sonra vazgeçene kadar her yeniden iletim girişiminde araya giren süre iki katına çıkar.

TCP, yoğun trafiğin olduğu bilinen bir bağlantı üzerinden veya overload olmuş bir hosta gönderilmemesini sağlamak için bir akış kontrolü yöntemi sunar.

TCP iletişimlerinin aktarım hızı, network congestion’a bağlıdır. congestion, bir seferde bekleyen (onaylanmayan) bayt sayısını tanımlar. Bu aslında gönderici tarafından uygulanan bir akış kontrol mekanizmasıdır. congestion bir ayar değildir; iki temel faktöre göre dinamik olarak belirlenir:

* Alıcının TCP arabellek alanı bildirildi
* Gönderenin iletim arabelleği kapasitesi
* Ağda izin verilen trafik miktarı (ağ tıkanıklığı/paket kaybına göre)

congestion her zaman bu üç değerden düşük olacaktır. Örneğin, bir Ethernet ağında, bir alıcının 65.535 baytlık bir frame tanıttığını, ancak bağlantının, eşin 65.535 alma arabelleğinden hiç faydalanmadan önce düzenli olarak paket kaybı yaşadığını varsayalım.

Gerçek congestion 65.535 bayt değildir ancak ağın neyi destekleyeceğine bağlı olarak daha düşük bir değerdir. Paket kaybından sonra congestion belirleme süreci RFC 2001'de ayrıntılı bir şekilde tanımlanmıştır.

---

### TCP Sorunları Analizi

El sıkışma sürecindeki sorunlardan paket kaybına, TCP bağlantı kopmalarına, donmuş pencerelere kadar TCP katmanında oluşabilecek çok sayıda sorun vardır.

![](https://cdn-images-1.medium.com/max/800/1*07AoMOodVO2M9hTual5LLg.png)

TCP bağlantısı RST/ACK ile reddedildi

TCP el sıkışma sorunlarıyla başlıyoruz. Şekilde bir TCP bağlantı reddi gösterilmektedir. Şekil 235'te, el sıkışmanın (SYN) ilk paketi bir Sıfırlama (RST/ACK) yanıtı alır. Bağlantı kurulamıyor. El sıkışma işlemi başarıyla tamamlanmazsa hostlar arasında veri alışverişi yapılamaz.

Aşırı sayıda başarısız TCP bağlantı denemesi bir TCP taramasına işaret edebilir.

![](https://cdn-images-1.medium.com/max/800/1*x5VezCndlQUpY7QlfAaMbQ.png)

Paket kaybı nedeniyle başarısız bir TCP bağlantısı

Şekilde, el sıkışma işlemiyle ilgili başka bir sorunu göstermektedir. Şekili incelediğimizde aşağıdakileri görebiliriz:

* El sıkışma normal görünüyor; 3–5 paketlerinde SYN, SYN/ACK, ACK. El sıkışmanın (SYN) ilk paketinde istemcinin sıra numarası olan 67.161.32.69'un, Wireshark tarafından tanımlanan göreceli bir sıra numarası olan 0 olarak gösterildiğine dikkat edin. Bu istemciden gönderilen bir sonraki paket (paket numarası 5), istemci SYN paketinde herhangi bir veri göndermemiş olmasına rağmen istemcinin sıra numarasının artık 1 olduğunu gösterir. TCP spesifikasyonu (RFC 793, İletim Kontrol Protokolü), SYN paketlerinden sonraki ilk veri paketinin Başlangıç Sıra Numarasını (ISN) 1 artırması gerektiğini tanımlar.
* Handshake işleminin ardından istemci, sunucuya 14 byte veri içeren bir paket gönderir ve paket 6 üzerinde Push (PSH) ve ACK bitlerini ayarlar.
* Paket 7 bir şeylerin ters gittiğinin ilk göstergesidir. İstemcinin RTO değerinin süresi, paket 6'ya ACK gelmesini beklerken doldu. Paket 7, paket 6'nın yeniden iletimidir.
* Paket 8 de bir yeniden iletimdir. Sunucu, TCP el sıkışmasından gelen SYN/ACK paketini yeniden göndermiştir. Sunucu el sıkışma sürecinin üçüncü paketini almamış gibi görünüyor. Sunucu, istemciden el sıkışma ACK paketini talep etmek için Acknowledgment Number alan değerini 1 olarak ayarlar.
* Sunucu sürekli olarak el sıkışmanın üçüncü paketini ister. Ancak istemci, Sıra Numarası 1 olan iki paket göndermiştir. İstemci, el sıkışmanın son paketi yerine ilk veri paketini yeniden iletir.

Bu sorun kendi kendine çözülemez. Sunucu, el sıkışma işleminin düzgün bir şekilde çözüldüğünü görene kadar 14 baytlık veriyi kabul etmeyecektir. Yeni bir bağlantı denemesi oluşturmak için 4321 numaralı portunda RWhois (Yönlendirme Whois) hizmetine TCP bağlantısı başlatan uygulamanın yeniden başlatılması gerekir.

---

### TCP Paket Yapısı

TCP üstbilgisi genellikle 20 bayt uzunluğundadır ancak TCP üstbilgisi, başlık uzunluğunu artırabilen bir Seçenekler alanını destekler.

#### Source Port Field

TCP kaynak portu, göndericide açık olan dinleme port numarasıdır.

#### Destination Port Field

TCP hedef bağlantı noktası, alıcıda açık olan hedef port numarasıdır.

#### Stream Index [Wireshark Field]

Akış İndeksi, TCP başlığındaki gerçek bir alan değildir. Akış İndeksi değeri Wireshark tarafından tanımlanır ve bir TCP konuşmasını hızlı bir şekilde filtrelemek için kullanılabilir.

#### Sequence Number Field

Bu alan, TCP segmentini benzersiz şekilde tanımlayan bir sayı içerir (TCP başlığını takip eden verilere TCP ‘segment’ adı verilir). Bu sıra numarası, TCP segmenti için bir tanımlayıcı sağlar ve alıcıların, bir iletişim akışının parçalarının ne zaman eksik olduğunu belirlemesine olanak tanır. Sıra numarası, her pakette bulunan veri baytlarının sayısına göre artar.

#### Next Expected Sequence Number [Wireshark Field]

Bu alan yalnızca veri içeren paketlerde görünür — bu alan SYN paketlerinde veya basit ACK paketlerinde görülmez. Wireshark mevcut paket Sıra Numarasını inceler ve bu numarayı sağlamak için veri baytlarının sayısını ekler.

#### Acknowledgment Number Field

Onay Numarası alanı iletişimin diğer tarafından beklenen bir sonraki sıra numarasını gösterir. Bir ana bilgisayar tarafından hiçbir zaman artırılmayan bir Onay Numarası alanı, yalnızca o ana bilgisayar tarafından hiçbir veri alınmadığını gösterir.

#### Data Offset Field

Bu, TCP başlığının uzunluğunu tanımlar. 4 baytlık artışlarla tanımlanır, dolayısıyla bu alandaki 5 değeri, TCP başlığının 20 bayt uzunluğunda olduğunu gösterir. TCP başlık uzunluğu kullanılan TCP başlık seçeneklerine göre değişebileceği için bu alana ihtiyacımız var. TCP seçenek alanı, TCP bağlantı kurulumu sırasında Maksimum Segment Boyutunu (MSS) oluşturmak için sıklıkla kullanılır.

#### Flags Field

Aşağıdaki liste TCP başlığında kullanılan bayrakları açıklamaktadır:

* Reserved: Bu üç bit sıfıra ayarlanmıştır.
* Nonce: Nonce alanı, IP başlığındaki ECN alanlarıyla birlikte çalışır. Bu işlevsellik, RFC 3540, Nonces ile Sağlam Explicit Congestion Notification (ECN) Sinyali’nde açıklanmaktadır.
* **Congestion Window Reduced (CWR)**: gecikme, veri göndericisi tarafından, veri alıcısına Congestion azaldığını bildirmek için ayarlanır.
* **URG (Urgent):** Acil İşaretçi alanının incelenmesi gerektiğini belirtir; Acil İşaretçi alanı, TCP Sağlama Toplamı(checksum) alanından sonra bulunur ve kullanılmadığında 0x0000 olarak ayarlanır. Acil İşaretçi alanı yalnızca bu bit ayarlandığında işlenir.
* ACK (Acknowledgment): Onay paketi
* PSH (Push): Arabelleğe almayı atlayın ve verileri doğrudan ağa aktarın Gelen verileri arabelleğe almayın — doğrudan uygulamaya aktarın
* RST (Reset): Bağlantıyı açıkça kapatın
* SYN (Synchronize): Sıra numaralarını senkronize edin — el sıkışma sürecinde kullanılır
* FIN (Finish): İşlem tamamlandı, bağlantı sonlandırma

#### Window Field

Bu alan, bayt cinsinden TCP alıcı arabelleğinin boyutunu gösterir. 0 pencere boyutu, alıcının kullanılabilir arabellek alanı olmadığını gösterir. Bu iki bytelık alanda gösterilebilecek maksimum değer 65.535'tir. Pencere ölçeklendirme (TCP el sıkışma işlemi sırasında oluşturulur), ana bilgisayarların daha büyük pencere boyutları kullanmasını sağlar. Pencere Boyutu alanı değeri 65.535'ten küçük olan tüm paketler için görüntüleme filtresi tcp.window\_size < 65535'tir.

#### Checksum Field

TCP sağlama toplamı, TCP başlığının ve verisinin içeriği üzerinde gerçekleştirilir (veri bağlantısı dolgusu dahil değildir) yanı sıra IP başlığından türetilen bir sözde başlık. Daha fazla bilgi için RFC 793'e bakın.

#### Urgent Pointer Field

Bu alan yalnızca URG biti ayarlanmışsa geçerlidir. URG biti ayarlanmışsa, alıcı pakette ilk olarak nereye bakacağını/okuyacağını görmek için bu alanı incelemelidir. Bu yaygın bir işlev değildir. Acil İşaretçi alanı içeren tüm paketler için görüntüleme filtresi tcp.urgent\_pointer’dır. Acil biti 1 olarak ayarlanmadığı sürece Wireshark bu alanı görüntülemeyecektir.

---

### TCP Trafiğini Filtreleme

TCP Trafiğinde capture ve display filter sözdizimi basitçe *tcp*’dir.

* tcp.srcport==21 — FTP yanıtı (FTP’nin 21 numaralı bağlantı noktasında çalıştığını varsayarak)
* tcp.dstport==80 — Port 80'e yönlendirilen trafik (HTTP çoğunlukla port 80 üzerinde çalışır)
* tcp.hdr\_len > 20 — Bir veya daha fazla seçenek içeren TCP üstbilgileri
* (tcp.window\_size < 1460) && (tcp.flags.fin==0) && (tcp.flags.reset==0) — RST biti ayarlanmamış bir pakette bir MSS’den daha küçük TCP pencere boyutu — bu veri aktarım sürecini yavaşlatır; kurtarmak için pencere güncellemeleri gerekir — örneğin, http-download-good.pcapng izleme dosyasında bu tür paketleri arayın.
* !(tcp.flags.cwr==0) || !(tcp.flags.ecn==0) —Congestion Azaltıldı bayrağı veya ECN-Echo bayrağı ayarlanmış paketler.
* tcp.options.mss\_val < 1460 — TCP MSS ayarı 1.460 bayttan az (bu, el sıkışma sürecinde görülecektir)
* tcp.options.wscale\_val — TCP pencere ölçeği seçeneği TCP başlığında mevcuttur.
* tcp.analysis.flags — Paketler TCP sorunları veya bildirimleri ile işaretlendi (TCP tercihlerinde TCP Sıra Numaralarını Analiz Et devre dışı bırakılmışsa çalışmaz)
* tcp.analysis.lost\_segment — Bu paketten önce kayıp bir segment tespit edildi- mevcut birçok bireysel TCP analiz bayraklarından biri. Diğer TCP analiz bayraklarını görüntülemek için otomatik tamamlama özelliğini (tcp.analysis.)-dönemi dahil edin- veya İfadeleri kullanın

---

### Kaynakça

* Wireshark Network Analysis, Second Edition, Laura Chappel, <https://www.chappell-university.com/studyguide>
* Trace Files: <https://s3.amazonaws.com/book.supplements/StudyGuide_v2/9781893939943_traces-set1b.zip>