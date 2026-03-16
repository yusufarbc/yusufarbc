---
date: '2024-08-04'
draft: false
title: HTTP Wireshark Analizi
---

---

### HTTP Wireshark Analizi

Merhaba bu yazımda HTTP protokolünü ve Wireshark ile analizini anlatmaya çalışacağım.

---

### HTTP Nedir?

Hypertext Transfer Protocol (HTTP) “dağıtılmış hipermedya bilgi dağıtım uygulaması” olarak adlandırılır. HTTP, bir kişi internette gezinirken kullanılan uygulamadır. HTTP bir istek/cevap modeli kullanır.

![](https://cdn-images-1.medium.com/max/800/1*lpMM04aqUuEX3GMKaDsawQ.png)

HTTP ve HTTPS TCP aktarımını kullanır

HTTP v1.0, kullanımdaki mevcut sürüm olan HTTP v1.1 kadar sık kullanılmamaktadır. HTTP v1.1 RFC 2616, Hypertext Transfer Protocol — HTTP/1.1'de ele alınmıştır.

---

### HTTP Trafik Analizi

Normal HTTP iletişimleri istek/cevap iletişim tarzını kullanır. İstemciler HTTP sunucularından istekte bulunur ve sunucular Durum Kodları ile yanıt verir.

![](https://cdn-images-1.medium.com/max/800/1*OrN2W6uGR9b__wtBdJotrw.png)

HTTP bir istek/yanıt kalıbı kullanır

TCP bağlantısı başarıyla kurulduktan sonra, istemci “/” için bir HTTP GET isteği yapar. Sunucu 200 OK durum koduyla yanıt verir ve istemciye [www.facebook.com](http://www.facebook.com) ana sayfasının içeriğini göndermeye başlar.

http-facebook.pcapng’de görülen tüm HTTP Durum Kodları iyidir-hepsi 200 OK. HTTP Durum Kodu Registrysi [www.iana.org/assignments/http-status-codes](http://www.iana.org/assignments/http-status-codes) adresinde tutulmaktadır. Aşağıda mevcut Durum Kodları listelenmiştir.

#### 1xx Informational

* 100 Continue [RFC2616]
* 101 Switching Protocols [RFC2616]
* 102 Processing [RFC2518]

#### 2xx Success

* 200 OK [RFC2616]
* 201 Created [RFC2616]
* 202 Accepted [RFC2616]
* 203 Non-Authoritative Information [RFC2616]
* 204 No Content [RFC2616]
* 205 Reset Content [RFC2616]
* 206 Partial Content [RFC2616]
* 207 Multi-Status [RFC4918]
* 208 Already Reported [RFC5842]
* 226 IM Used [RFC3229]

#### 3xx Redirection

* 300 Multiple Choices [RFC2616]
* 301 Moved Permanently [RFC2616]
* 302 Found [RFC2616]
* 303 See Other [RFC2616]
* 304 Not Modified [RFC2616]
* 305 Use Proxy [RFC2616]
* 306 Reserved [RFC2616]
* 307 Temporary Redirect [RFC2616]
* 308 Permanent Redirect [RFC-reschke-http-status-308–07]

#### 4xx Client Error

* 400 Bad Request [RFC2616]
* 401 Unauthorized [RFC2616]
* 402 Payment Required [RFC2616]
* 403 Forbidden [RFC2616]
* 404 Not Found [RFC2616]
* 405 Method Not Allowed [RFC2616]
* 406 Not Acceptable [RFC2616]
* 407 Proxy Authentication Required [RFC2616]
* 408 Request Timeout [RFC2616]
* 409 Conflict [RFC2616]
* 410 Gone [RFC2616]-
* 411 Length Required [RFC2616]
* 412 Precondition Failed [RFC2616]
* 413 Request Entity Too Large [RFC2616]
* 414 Request-URI Too Long [RFC2616]
* 415 Unsupported Media Type [RFC2616]
* 416 Requested Range Cannot be Satisfied [RFC2616]
* 417 Expectation Failed [RFC2616]
* 422 Unprocessable Entity [RFC4918]
* 423 Locked [RFC4918]
* 424 Failed Dependency [RFC4918]
* 425 Reserved for WebDAV — see IANA list [RFC2817]
* 426 Upgrade Required [RFC2817]
* 428 Precondition Required [RFC6585]
* 429 Too Many Requests [RFC6585]
* 431 Request Header Fields Too Large [RFC6585]

#### 5xx Server Error

* 500 Internal Server Error [RFC2616]
* 501 Not Implemented [RFC2616]
* 502 Bad Gateway [RFC2616]
* 503 Service Unavailable [RFC2616]
* 504 Gateway Timeout [RFC2616]
* 505 HTTP Version Not Supported [RFC2616]
* 506 Variant Also Negotiates (Experimental) [RFC2295]
* 507 Insufficient Storage [RFC4918]
* 508 Loop Detected [RFC5842]
* 510 Not Extended [RFC2774]
* 511 Network Authentication Required [RFC6585]

Bir HTTP istemcisi yakın zamanda bir sayfayı ziyaret etmişse ve bu sayfa yerel olarak önbelleğe alınmışsa, istemci IfModified-Since parametresini gönderebilir ve önceki sayfanın indirildiği tarih ve saati sağlayabilir. Sunucu 304 Not Modified ile yanıt verirse, sunucu zaten önbelleğe alınmış olan sayfayı yeniden göndermeyecektir. Bu, HTTP performansını analiz ederken HTTP’nin anlaşılması gereken önemli bir parçasıdır.

#### HTTP İstatistikleri

Wireshark yük dağıtımı, paket sayaçları ve HTTP istekleri için HTTP istatistiklerini izler. İstatistik | HTTP öğesini seçin ve ilgilendiğiniz istatistik türünü seçin.

İstatistiklere bir display filter uygulamak için bir seçenek sunulur. Örneğin, çok sayıda hosta yönelik web tarama oturumlarını içeren bir trace dosyanız varsa, yalnızca [www.wireshark.org](http://www.wireshark.org) adresine yönelik web tarama oturumlarına ilişkin istatistikleri incelemek için “*http.host==*[*www.wireshark.org*](http://www.wireshark.org)*”* filtresini uygulayabilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*9wkbOuaZAyEIRxnP9eAtzQ.png)

İstatistikler

HTTP Load Distribution, HTTP isteklerini ve yanıtlarını sunucuya göre listeler. HTTP hostuna göre HTTP İstekleri bölümünün genişletilmesi, iletişim kurulan hostları ve her birine gönderilen istek paketlerinin sayısını listeler.

HTTP Yük Dağılımı istatistiği, web sitesi yönlendirmelerini ve bağımlılıklarını belirlemek için mükemmel bir kaynaktır.

![](https://cdn-images-1.medium.com/max/800/1*nol9M0Y4tZhIQSfzlR0wgA.png)

HTTP yük dağılımı

Şekilde [www.espn.com](http://www.espn.com) adresine göz attığımızda HTTP yönlendirmelerini ve bağımlılıklarını görüntülemekteyiz.

![](https://cdn-images-1.medium.com/max/800/1*KYKO1fj8c3rUSDlHeYenFw.png)

HTTP Paket Sayıcı

HTTP Paket Sayacı çok değerlidir çünkü Durum Kodunu listeler  
yanıtları. 4xx İstemci Hatası veya 5xx Sunucu Hatası yanıtlarını tespit etmek basittir. Şekilde [www.espn.com](http://www.espn.com) adresine yapılan başka bir tarama oturumu için HTTP Paket Sayacı gösterilmektedir (httpespn2007.  
pcapng). Bazı HTTP 301 ve 302 yönlendirmelerini ve bir 404 Bulunamadı yanıtını görebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*2YKXJLq89yAY7hD0U-wqzQ.png)

HTTP İstekleri

HTTP İstekleri, her bir HTTP sunucusundan talep edilen her bir öğeyi listeler. Şekilde, HTTP İsteklerini inceliyoruz Web browser oturumumuz sırasında [www.espn.com](http://www.espn.com) adresine gönderilen istekler.

---

### HTTPS Trafik Analizi

Web analiziniz muhtemelen HTTPS iletişimlerinin analizini de içerecektir. Güvenli bir HTTP görüşmesinin başlangıcında, standart bir TCP el sıkışmasının ardından güvenli bir el sıkışma işlemi gerçekleştirilir.

RFC 2818, güvenli iletişim için Taşıma Katmanı Güvenliği (TLS) üzerinden HTTP kullanımını tanımlar. RFC 2246, SSL sürüm 3.0'ı temel alan Taşıma Katmanı Güvenliği sürüm 1.0'ı detaylandırmaktadır. TLS 1.0 ve SSL 3.0 arasında çok az fark olmasına rağmen, ikisi birlikte çalışabilir değildir

HTTPS iletişimi, güvenli iletişim için kullanılacak portta TCP el sıkışması ile başlar. Örneğimizde, 443 numaralı standart HTTPS bağlantı noktasını kullanıyoruz. SSL/TLS trafiği için başka bir port kullanıyorsanız, bu portları SSL/TLS portları için HTTP tercihleri ayarına ekleyin. Port 443 varsayılan olarak tanımlanmıştır.

![](https://cdn-images-1.medium.com/max/800/1*XjCeq6WCg-sCh-bmywOeXg.png)

FTP Nedir?TLS el sıkışmasını görüntülemek için ssl.record.content\_type==22 görüntüleme filtresini kullanın

HTTPS iletişimlerinde, TCP el sıkışmasından sonra bir TLS el sıkışması gerçekleşir. TLS el sıkışması, içerik türü değeri 22 olan bir dizi paketten oluşur. TLS el sıkışma paketlerini Şekilde gösterildiği gibi görüntülemek için *ssl.record.content\_type==22* filtresini kullanın.

TLS el sıkışması, eşlerin veri alışverişi için güvenlik parametreleri üzerinde anlaşmalarını ve kimliklerini doğrulamalarını sağlar. Ayrıca, el sıkışma işlemi sırasındaki hatalar TLS el sıkışma paketlerinde iletilir.

Bu el sıkışma süreci aşağıdaki trafik türlerini içerir:

* **Session identifier**: yeni veya devam eden bir oturumu tanımlar
* **Peer certificate**: X509 sertifikası
* **Compression method**: şifrelemeden önce veri için sıkıştırma yöntemi
* **Cipher spec**: veri şifreleme algoritmasını tanımlar
* **Master secret**: İstemci ve sunucu arasında paylaşılan 48 baytlık gizli bilgi

![](https://cdn-images-1.medium.com/max/800/1*nfOsRO6Q1iAWlV1OKsGsUw.png)

İstemci desteklenen 34 şifre paketini listeler; sunucu hangisinin kullanılacağını seçecektir

TLS el sıkışmasının ilk paketi olan Şekildeki Paket 4, el sıkışma protokolü alanında belirtildiği gibi bir İstemci Merhaba’dır. İstemci ayrıca TLS sürüm 1.0 kullandığını belirtir.

Random bölümünde, bu paket UNIX formatında sağlanan istemcideki Evrensel Koordineli Saati (UTC) içerir. Oturum Kimliği alanı, bunun yeni bir oturum olduğunu gösteren 0 değerine ayarlanmıştır. Oturum Kimliği alanı sıfır olmayan bir değer içeriyorsa, bu yeniden başlatılan bir oturumdur.

Bu paket ayrıca 28 rastgele bayt içerir. Bu rastgele bayt kümesi daha sonra el sıkışma sırasında tekrar gönderilecek, ancak daha sonra sunucunun açık anahtarı ile şifrelenecektir

İstemci, tarayıcı tarafından desteklenen şifre takımlarının listesini sağlar. Bu durumda, istemci 34 şifre paketini destekler ve hepsini Şekilde gösterildiği gibi client hello paketinde listeler. Nihayetinde, hangi şifre paketinin kullanılacağına sunucu karar verecektir, ancak listelenen en üst şifre istemcinin tercihidir.

Uzantılar TLS’ye işlevsellik katar. Uzantıların varlığı, İstemci Merhaba paketinin sonundaki Sıkıştırma Yöntemleri alanını takip eden baytlar olduğu için tespit edilir.

Bir uzantı, bu durumda [www.bankofamerica.com](http://www.bankofamerica.com) olan sunucu adını sağlar. Sunucu adı uzantısı, istemcinin tek bir IP adresinde çok sayıda sunucuyu destekleyen bir makinede barındırılabilecek bir sanal sunucuya güvenli bir bağlantı oluşturmasını sağlar.

![](https://cdn-images-1.medium.com/max/800/1*n8YUEDlR5Fog8x16NgsNSg.png)

Paket 10

10. pakette Sunucu üç fonksiyondan oluşan bir paketle yanıt verir:   
Server Hello, Certificate ve Server Hello Done.

Random bölümünde, sunucu 28 rastgele bayt ve istemcinin daha sonra yeniden bağlanmasına izin vermek için 32 baytlık bir Oturum Kimliği değeri sağlar. Bu rastgele bayt kümesi daha sonra el sıkışma sırasında tekrar gönderilecek, ancak daha sonra istemcinin açık anahtarıyla şifrelenecektir. Bu rastgele baytlar anahtar üretimi için kullanılır.

Sunulan 34 şifre paketi arasından sunucu TLS\_RSA\_with\_RC4\_128\_MD5'i (0x0004) seçmiştir, bu da şu anlama gelir:

* Sertifika imzalarını doğrulamak ve anahtarları değiştirmek için RSA açık anahtar algoritması kullanılacaktır.
* Değiş tokuş edilen verileri şifrelemek için RC4 şifreleme algoritması kullanılacaktır.
* 128-bit MD5 hash fonksiyonu, değiş tokuş edilen mesajların içeriğini doğrulamak için kullanılacaktır.

El sıkışma sürecinin bu ikinci paketi sunucudan gelen sertifikayı da içerir. Aynı paketin içinde, sunucunun Merhaba işlemini tamamladığını belirtmek için Server Hello Done ifadesi yer alır.

![](https://cdn-images-1.medium.com/max/800/1*L6vYPqYmakuATBNGQPSBnQ.png)

Paket 12

Şekilde gösterilen Paket 12, istemciden gelen bir sonraki pakettir. Bu paket, istemcinin hem istemci hem de sunucu rastgele değerlerinden bir premaster sırrı hesapladığını gösterir. Change Cipher Spe ataması, istemciden gelecek tüm mesajların tanımlanan anahtarlar ve algoritmalar kullanılarak şifreleneceğini gösterir.

![](https://cdn-images-1.medium.com/max/800/1*5-SH0IZAQCnHR0hROkZ1Uw.png)

Paket 14

14. pakette, el sıkışma sürecinin şifrelenmemiş kısmı, sunucunun göndereceği tüm mesajların da şifreleneceğini belirtmesiyle sona erer.

#### HTTPS Trafiğni Decrypt Etme

Wireshark’ın HTTPS trafiğinin şifresini çözebilmesi için RSA anahtarına sahip olmamız ve Wireshark’ı bunu kullanacak şekilde yapılandırmamız gerekir.

Bu verilerin şifresini çözmek için sunucu sertifikasının özel anahtarına(private-key) ihtiyacımız var. Özel anahtarı almak için sunucuya erişmeniz gerekir; özel anahtarı iletişimin istemci tarafından alamazsınız. Örneğimizde Bank of America’nın web sitesine bir göz atma oturumu kullanıldığından ve anahtarı elde etme imkanımız olmadığından, anahtarla birlikte sağlanan başka bir HTTPS trace dosyasına odaklanacağız.

Kasım 2009'da PhoneFactor’dan Steve Dispensa ve Marsh Ray, TLS yeniden müzakere sürecini çevreleyen güvenlik sorunlarına ilişkin 8 sayfalık bir genel bakış yazdı. Güvenlik sorunları son Microsoft IIS ve Apache HTTPD sürümlerine karşı gösterilmiştir. Özünde, tanımlanan yeniden müzakere saldırı yöntemi “güvenli” bağlantıya kötü amaçlı kod enjekte etmek için kullanılır.

Aşağıdaki örnekte, PhoneFactor belgesine ek olarak sağlanan client\_init\_renego.pcap dosyası ile çalışıyoruz. Ayrıca, PhoneFactor ws01.mogul.test.key adında bir RSA anahtarı sağlamıştır.

![](https://cdn-images-1.medium.com/max/800/1*UGaIEdpGL4TRQ8etJgQN0g.png)

Trafiğin şifresini çözmek için RSA anahtar dosyasının yolunu girin

HTTPS trafiğinin şifresini çözmek için RSA anahtarını yerel Wireshark ana bilgisayarındaki bir \keys dizinine kopyaladık. Wireshark’ın anahtarı tanıması için SSL tercihlerini şifresini çözmek istediğimiz konuşmayı tanıyacak ve \keys dizinini işaret edecek şekilde yapılandırmalıyız. Wireshark’ın RSA anahtarları listesi ayarı, sunucunun IP adresini, şifrelenmiş iletişim için kullanılan bağlantı noktasını, şifrelenen uygulamanın adını ve anahtar adının yanı sıra anahtara giden yolu içerir.

Şekilde bu dosyanın şifresini çözmek için kullanılan ayarlar gösterilmektedir. Protokol sütununun TCP, SSL veya TLSv1'i gösterdiğine dikkat edin. Henüz şifresi çözülmüş trafiği göremiyoruz.

![](https://cdn-images-1.medium.com/max/800/1*MP7YsmkIUYyh5XdMFlEUTw.png)

Anahtar yapılandırıldıktan ve uygulandıktan sonra, HTTP iletişimini net bir şekilde görebiliriz

Şekil, anahtarın uygulanmasının sonuçlarını gösterir. Protokol sütununda hala TCP ve TLSv1'i görüyoruz ancak şifresi çözülen trafik için HTTP’nin de listelendiğini görüyoruz. Buna ek olarak, artık Paket Listesi bölmesinde listelenen bir HTTP paketine sağ tıklayabilir ve iletişimi net bir şekilde görmek için *Follow SSL Stream*’i seçebiliriz

TLS trafiğinin şifresini çözdüğünüzde (tıpkı WLAN trafiğinin şifresini çözdüğünüzde olduğu gibi), Şekilde gösterildiği gibi Paket Baytları bölmesinin hemen altında bir sekme görünür. Şifresi çözülmüş trafiği Paket Baytları bölmesinde görüntülemek için *Decrypted SSL data* sekmesine tıklayın. Bu sekme yalnızca (a) trafiğin şifresini çözdüğünüzde ve (b) Paket Baytları bölmesini görünür hale getirdiğinizde görünecektir.

---

### HTTP Hataları Analizi

HTTP iletişim sorunları, site adı çözümlemesindeki sorunlar, TCP bağlantı sürecindeki sorunlar, var olmayan sayfalar veya öğeler için HTTP istekleri, paket kaybı ve HTTP sunucusu veya istemcisindeki tıkanıklık nedeniyle ortaya çıkabilir.

Herkes bir zamanlar yanlış web sitesi adresi yazmıştır. Site adı çözümlenemiyorsa, siteye erişemezsiniz. Bu bir DNS Adı Hatası oluşturur. Web tarama sorunlarını analiz ederken DNS trafiğine dikkat etmek önemlidir.

Ayrıca, HTTP arka plan programı(backend) web sunucusunda çalışmadığında HTTP bağlantı sorunları ortaya çıkabilir. HTTP arka plan programı sunucuda çalışmadığında, sunucu istemcinin SYN’sine bir TCP RST/ACK ile yanıt verir. Bağlantı kurulamaz.

![](https://cdn-images-1.medium.com/max/800/1*eAvT4-k9dlHwViEHYgBIxA.png)

Ayrıca, HTTP Birden fazla başarısız HTTP bağlantı denemesi Wiresharkdaemon’da bir şerit deseni oluşturduğunda web sunucusunda HTTP bağlantı sorunları oluşabilir.

Şekilde gösterildiği gibi bir port tarama işlemi sırasında SYN — RST/ACK kalıbı görüldüğünden bu durum dikkatle izlenmelidir.

HTTP istemcisi HTTP sunucusuna başarıyla bağlanır, ancak daha sonra var olmayan bir sayfa isterse, web sunucusu tarafından HTTP 404 Not Found hataları oluşturulur.

Bazı yeniden yönlendirme hizmetleri standart 404 Not Found mesajını önerilen bağlantılarla değiştirir veya HTTP istemcisini tamamen başka bir siteye yönlendirir. HTTP istemci ve sunucu hataları için http.response.code >= 400 kullanarak bir renklendirme kuralı oluşturun.

![](https://cdn-images-1.medium.com/max/800/1*Gy6gBNz0W8u_QdGzPmZ-OQ.png)

frys.com sunucusu bir iç sunucu hatası ile yanıt veriyor

Şekilde, [www.frys.com](http://www.frys.com) web sitesinde satılık dizüstü bilgisayarların bir listesini açarken yaşanan bir sorunu göstermektedir. Sitenin IP adresini çözebildik ve sayfa mevcut. TCP akışını takip ederek sunucunun sayfa başlığıyla yanıt verdiğini görebiliriz. Ancak dizüstü bilgisayar öğeleri sayfada görüntülenmiyor; sayfa boş.

trace dosyasına baktığımızda [www.frys.com](http://www.frys.com) web sunucusunun bir dahili sunucu hatası bildirdiğini görebiliriz. Bu, müşterinin sisteminde veya ağında bir sorun değildir. Bu sorun büyük olasılıkla Fry’ın web hizmetleri altyapısındaki bir veritabanı sorunundan kaynaklanmaktadır.

http-fault-post.pcapng dosyasını açın ve Time sütununu Seconds Since Previous Displayed Packet olarak ayarlayın. Paket 29'dan önce büyük bir gecikme olduğuna dikkat edin. Burada dikkatli olun. 29. pakette FIN biti ayarlanmıştır. Bu, istemcinin sunucuya bilgi göndermeyi bitirdiğini gösterir. Bu paketler (ve Reset biti ayarlı paketler) kullanıcı gerekli verileri almayı bitirdikten çok sonra tetiklenebilir. Kullanıcı bu gecikmeyi fark etmez, bu nedenle FIN (veya Reset) biti ile işaretlenmiş paketlerden önceki gecikmeleri gidermek için zamanınızı harcamayın.

![](https://cdn-images-1.medium.com/max/800/1*5T1I_7MbqgFJ_G0DjnkpMA.png)

İstemcinin POST’u başarısızdır ve bir web sunucusu sorununa işaret eder

Şekilde çevrimiçi bir form doldurmaya çalışıyoruz (http-fault-post.pcapng). Ancak Gönder düğmesine tıklandığında, istemci sistemi kilitleniyor gibi görünüyor. Bu durumda HTTP trafiğine bakabilir ve sunucudan gelen 403 Yasak durum kodunu gözlemleyebiliriz. TCP akışını takip ettiğimizde, durum hakkında daha fazla bilgi içeren açık metin ve HTML etiketleri görürüz (HTML etiketlerini kaldırdık):

“Sayfa görüntülenemiyor — programların yürütülmesine izin vermeyen bir dizinden bir CGI, ISAPI veya başka bir yürütülebilir program yürütmeye çalıştınız.”

Yine, sorun bir istemci sorunu gibi görünmüyor ve TCP aktarım hatalarını bir sorun olarak görmüyoruz. Sorun sunucuda.  
Web’de gezinme sorunlarını giderirken, HTTP trafiğine odaklanmadan önce TCP hatalarını arayın.

---

### **HTTP Paket Yapısı**

HTTP paketleri değişken uzunluktadır. Bu bölümde HTTP paket yapısındaki bazı önemli alanları listeliyoruz. HTTP istekleri, HTTP isteğinin amacını tanımlayan bir Yöntemden oluşur. HTTP yanıtları, Durum Kodu olarak adlandırılan sayısal bir yanıt kodu içerir.

![](https://cdn-images-1.medium.com/max/800/1*AU90ZRoS-ZXyas8DmkoIaQ.png)

Facebook ana sayfası için bir HTTP GET istek paketi

Şekilde, ana Facebook sayfası için bir GET isteğini göstermektedir. GET isteği, hedef ana bilgisayarın adını, bu GET isteğini gönderen tarayıcı hakkında ayrıntıları ve tarayıcının hangi veri türlerini ve biçimini kabul edeceği hakkında bilgileri içerir.

#### **HTTP Metotları**

HTTP metotları olarak da adlandırılan Yöntemler, HTTP paketinin amacını tanımlar.

* GET: URI (Tekdüzen Kaynak Göstergesi) alanı tarafından tanımlanan bilgileri alır
* HEAD: İstenen URI ile ilgili meta verileri alır
* POST: HTTP sunucusuna veri gönderir
* OPTIONS: Bir kaynakla ilişkili seçenekleri belirler
* PUT: HTTP sunucusuna veri gönderir
* DELETE: URI tarafından tanımlanan kaynağı siler
* TRACE: İstemcinin sunucunun istemciden ne aldığını görebilmesi için bir uzak geri döngü çağırır; bu nadiren görülür çünkü birçok şirket Siteler Arası İzleme güvenlik açığına karşı koruma sağlamak için bunu devre dışı bırakır
* CONNECT: Bir proxy cihazına bağlanır.

#### Host

Host alanı tüm HTTP/1.1 istek mesajlarında gereklidir. Host alanı, talep edilen kaynağın hedef internet ana bilgisayarını ve port numarasını tanımlar. Önceki örneğimizde, ana bilgisayar [www.facebook.com'dur](http://www.facebook.com%27dur). Herhangi bir bağlantı noktası numarası belirtilmezse, hizmet için varsayılan bağlantı noktası (örneğin, HTTP için 80 numaralı bağlantı noktası) kullanılır.

#### Request Modifiers

HTTP istekleri ve yanıtları, istekle ilgili ayrıntıları sağlamak için istek değiştiricileri kullanır. Aşağıda daha yaygın olarak kullanılan istek değiştiricileri listelenmiştir:

* **Accept**: Kabul edilebilir içerik türleri
* **Accept-Charset**: Kabul edilebilir karakter setleri
* **Accept-Encoding**: Kabul edilebilir kodlamalar
* **Accept-Language**: Kabul edilebilir diller
* **Accept-Ranges**: Sunucu aralık isteklerini kabul edebilir
* **Authorization**: HTTP kimlik doğrulaması için kimlik doğrulama bilgileri
* **Cache-Control**: Önbelleğe alma yönergeleri
* **Connection**: Kullanıcı aracısı tarafından tercih edilen bağlantı türü
* **Cookie**: HTTP cookie
* **Content-Length**: Length of the request body (bytes)
* **Content-Type**: Gövdenin Mime türü (POST ve PUT istekleri ile kullanılır)
* **Date**: Mesajın gönderildiği tarih ve saat
* **Expect**: İstemci tarafından beklenen sunucu davranışını tanımlar
* **If-Match**: İstemci tarafından sağlanan bilgiler eşleşirse eylem gerçekleştirin
* **IfModified-Since**: Önbelleğe alınan verilerin tarih/saatini sağlayın; güncelse 304 Değiştirilmedi
* **If-Range**: Eksik bilgi aralığı için talep
* **If-Unmodified-Since**: Yalnızca belirli tarih/saatten beri değiştirilmemişse gönderin
* **Max-Forwards**: Proxy’ler veya ağ geçitleri üzerinden iletim sayısını sınırlayın
* **Proxy-Authorization**: Proxy bağlantısı için yetkilendirme kimlik bilgileri
* **Range**: Bir varlığın yalnızca bir kısmını talep edin
* **Referer**: Mevcut web sitesine bağlantı veren önceki web sitesinin adresi
* **TE**: Aktarım kodlamaları kabul edildi
* **UserAgent**: Kullanıcı aracısı — tipik olarak tarayıcı ve işletim sistemi
* **Via**: Geçilen vekiller

---

### HTTP/HTTPS Trafiğinin Filtrelenmesi

HTTP veya HTTPS trafiği için filtreleme sözdizimi *tcp port http* veya *tcp port https*’dir.

* http.request.method==”GET” or http.request.method==”POST” — HTTP GET veya POST istekleri
* http.response.code > 399 — HTTP 4xx veya 5xx (istemci veya sunucu hataları)
* http contains “IfModified-Since” — Bir istemcinin bir sayfayı zaten önbelleğe alıp almadığını belirleme.
* http.host==”www.wireshark.org" — Hedef host [www.wireshark.org](http://www.wireshark.org)
* http.user\_agent contains “Firefox” — HTTP istemcisi Firefox tarayıcısını kullanıyor.
* http.referer contains “wireshark.org” — HTTP istemcisi wireshark.org’daki bir bağlantıdan geçerli konuma ulaştı
* tcp.port==443 — SSL-Secure Socket Layer (güvenli oturum)
* ssl.record.content\_type==22 — TLSv1 el sıkışması
* ssl.handshake.type==1 — El sıkışmada TLSv1 Client Hello
* ssl.handshake.type==16 — TLSv1 Client Key exchange
* ssl.record.content\_type==20 — TLSv1 Change Cipher Spec
* http.content\_type contains “ocsp” — Çevrimiçi Sertifika Durum Protokolü (OCSP) kullanılır

---

### HTTP Objelerini Dışa Aktarma

HTTP kullanırken indirilen nesneleri kaydetmek için Dosya | Nesneleri Export| HTTP öğesini seçin. HTTP nesnelerini dışa aktardığınızda, orijinal nesne adı korunur.

![](https://cdn-images-1.medium.com/max/800/1*MQa1Gu3-dpFdafp7wg2lQA.png)

Bir siteden indirilen nesneleri dışa aktarabiliriz

Bu menü üzerinden objeleri bilgisayarmıza kaydetebiliriz.