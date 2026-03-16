---
date: '2023-05-17'
description: Merhaba, Bu yazımda OSI modeli üzerinde Siber Saldırıları anatmaya çalıştım. Birçok siber saldırı türünü bu yazımda bulabilirsiniz.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*rOqngZk6L49NHbPm8MIG8w.png
layout: single
title: OSI Modelinde Siber Saldırılar
type: posts
---

Merhaba, Bu yazımda OSI modeli üzerinde Siber Saldırıları anatmaya çalıştım. Birçok siber saldırı türünü bu yazımda bulabilirsiniz.

### OSI Modeli Nedir?

OSI (Open Systems Interconnection) modeli, bilgisayar ağlarının tasarımını ve işleyişini açıklamak için kullanılan bir referans modelidir. ISO (International Organization for Standardization) tarafından geliştirilmiştir ve 7 katmandan oluşur. Her katman, belirli bir işlevi yerine getirir ve bir ağdaki iletişimi yönetir.

![](https://cdn-images-1.medium.com/max/800/1*NO93ucFJGdZnGEbqFZ9LWg.jpeg)

OSI MODEL

Aşağıda, OSI modelinin katmanlarını ve her birinin görevlerini açıklayan bir özet bulunmaktadır:

1. **Fiziksel Katman (Physical Layer):** Elektriksel, mekanik ve fiziksel bağlantıları yönetir. Bu katman, verinin iletimi için kullanılan kablo türleri, konektörler, fiziksel bağlantı noktaları ve veri sinyallerinin nasıl iletilip alınacağı gibi detayları içerir.
2. **Veri Bağlantı Katmanı (Data Link Layer):** Fiziksel bağlantı üzerinde hataları düzeltir ve güvenli bir iletişim sağlar. Veri paketlerini alır, parçalara ayırır (framing), her bir parçayı adresler (MAC adresiyle), hataları kontrol eder ve gerekirse düzeltir.
3. **Ağ Katmanı (Network Layer):** Veri paketlerinin iletilmesi için en uygun yolun belirlenmesini sağlar. İletim rotalarını yönetir ve ağdaki diğer cihazlarla bağlantıyı sağlar. IP adreslemesi ve yönlendirme gibi işlemler bu katmanda gerçekleşir.
4. **Taşıma Katmanı (Transport Layer):** Veri akışını kontrol eder ve veri bütünlüğünü sağlar. Verilerin doğru bir şekilde gönderilmesini, sıralanmasını ve hedefe ulaşmasını sağlar. Bu katmanda yaygın olarak kullanılan protokoller arasında TCP (Transmission Control Protocol) ve UDP (User Datagram Protocol) bulunur.
5. **Oturum Katmanı (Session Layer):** İki cihaz arasında oturumların oluşturulması, yönetilmesi ve sonlandırılmasından sorumludur. Oturum katmanı, veri transferi sırasında güvenlik, kimlik doğrulama ve veri senkronizasyonu gibi işlevleri gerçekleştirir.
6. **Sunum Katmanı (Presentation Layer):** Verilerin farklı sistemler arasında uyumlu bir şekilde temsil edilmesini sağlar. Veri şifreleme, sıkıştırma ve format dönüşümü gibi işlemleri gerçekleştirir.
7. **Uygulama Katmanı (Application Layer):** Son kullanıcıların ağa erişimini sağlayan uygulamaları içerir. E-posta, web tarayıcıları, dosya transfer protokolleri (FTP) gibi uygulamalar bu katmanda yer alır.

### 1-Fiziksel Katman (Physical Layer) Saldırıları

Bu katman, fiziksel cihazların bulunduğu katmandır. Bu katmanda saldırganlar sistemlere fiziksel saldırılarda blunabilirler. Örneğin, sunucu odasına girebilmiş bir saldırgan sunucuyu kapatabilir veya yapılandırmalarını değiştirebilir. Sistemlerin siber güvenliği kadar fiziksel güvenlikleri de önemlidir. Bu katmanda saldırganların yapabileceği bir siber saldırı türü sniffingdir. Sisteme giren çıkan paketleri koklamak :)

#### snıffing

Sniffing saldırıları, bir ağdaki veri iletimini izlemek veya yakalamak amacıyla gerçekleştirilen kötü niyetli faaliyetlerdir. Saldırganlar, ağdaki veri paketlerini ele geçirir ve içerisindeki hassas bilgileri (kullanıcı adları, şifreler, kredi kartı bilgileri vb.) çalmak veya izlemek için kullanır.

![](https://cdn-images-1.medium.com/max/800/0*QX0yUeqWbkWlrcSM.png)

sniffing

Sniffing saldırıları genellikle ağdaki veri paketlerinin izlenmesi veya ele geçirilmesi amacıyla gerçekleştirilir. Bunun için saldırganlar, ağa bağlı bir bilgisayar veya ağ cihazı üzerinde özel yazılımlar veya araçlar kullanabilir. Saldırganlar, ağ trafiğini dinleyebilmek için ağa izinsiz olarak erişebilir veya ağ cihazlarına zararlı yazılım bulaştırabilir.

Sniffing saldırıları, ağda gerçekleşen iletişimin gizliliğini tehlikeye atar. Saldırganlar, ağdaki veri paketlerini ele geçirerek içerisindeki bilgilere erişebilir ve bunları çeşitli amaçlarla kullanabilir. Örneğin, kullanıcı giriş bilgilerini çalabilir, finansal verileri ele geçirebilir veya hassas iş bilgilerine erişebilir.

Smiffing’e alınabilecek en iyi tedbir şifreli iletişimdir. SSH, HTTPS gibi şifreli iletişim protokollerinin kullanılması bu saldırıyı önleyecektir.

### 2-Veri Bağlantı Katmanı (Data Link Layer) Saldırıları

Bu katman, verileri bağlantılı bir fiziksel ağ boyunca taşımak için kullanılır. IP adresleri, adres çözümleme protokolü (ARP) adı verilen bir prosedür kullanılarak ağ üzerindeki her bir fiziksel cihaz adresiyle (ortam erişim kontrolü (MAC) adresi olarak da bilinir) eşleştirilir.

En basit ifadeyle, MAC adresi ağ üzerinden gönderilen bir IP adresinin hedeflenen alıcısını tanımlar ve ARP veri iletimi için IP adreslerini MAC adreslerini çözümler.

#### spoofing

Spoofing (sahtecilik) veya poisoning (zehirleme), iki sistem arasındaki güvenilir bir ilişkiden yararlanan bir tür kimliğe bürünme saldırısıdır.

![](https://cdn-images-1.medium.com/max/800/1*dIW8GRH3OsHnLOP8WJixGA.png)

Spoofing

* MAC adresi sahteciliği(MAC address spoofing), bir saldırgan kendi cihazını ağdaki geçerli bir cihaz gibi gösterdiğinde ve böylece kimlik doğrulama sürecini atlayabildiğinde ortaya çıkar.
* ARP Zehirleme(ARP spoofing), LAN üzerinden sahte ARP mesajları gönderir. Bu, bir saldırganın MAC adresini ağdaki yetkili bir cihazın IP adresine bağlar.
* IP sahteciliği(IP spoofing), IP paketlerini gizlemek için sahte bir kaynak adresten gönderir.

### 3-Ağ Katmanı (Network Layer) Saldırıları

Bu katman, veri paketlerinin iletilmesini sağlar. Ancak saldırganlar kimi zaman bu iletim trafiğini dinleyebilir. Ayrıca nmap ile yapılan host taramaları bu katmanda gerçekleşir.

#### MITM(Man-in-the-Middle) Attacks

Saldırganlar, cihazlardan birinden bilgi çalmak veya cihazlardan birinin kimliğine bürünmek için iki cihaz arasındaki iletişimi kesebilir veya değiştirebilir.

MitM saldırısı, saldırgan, bir kullanıcının bilgisi olmadan bir cihazın kontrolünü ele geçirdiğinde gerçekleşir. Bu düzeyde bir erişimle saldırgan, gönderici ile hedeflenen yer arasında yanlış bilgileri kesebilir, manipüle edebilir ve aktarabilir.

![](https://cdn-images-1.medium.com/max/800/0*YhglJjz3Et2gKfDW)

MITM

Ortadaki adamın bir varyasyonu olan MitMo, bir kullanıcının mobil cihazının kontrolünü ele geçirmek için kullanılan bir saldırı türüdür. Virüs bulaştığında, mobil cihaza kullanıcıya özel bilgileri dışarı sızdırması ve saldırganlara göndermesi talimatı verilir.

#### ICMP Attacks

ICMP, teşhis(diagnostic) mesajları taşımak ve sunucular ile bağlantı noktaları kullanılamadığında hata koşullarını bildirmek için geliştirilmiştir. ICMP mesajları, bir ağ hatası veya kesintisi meydana geldiğinde cihazlar tarafından oluşturulur. Ping komutu, bir hedefe bağlanabilirliği doğrulamak için kullanılan ve yankı isteği olarak adlandırılan, kullanıcı tarafından oluşturulan bir ICMP mesajıdır.

Saldırganlar, ICMP’yi keşif ve tarama amaçlı kullanır. Bu sayede bir ağ topolojisinin haritasını çıkarmak, hangi ana bilgisayarların aktif (erişilebilir) olduğunu keşfetmek, ana bilgisayar işletim sistemini tanımlamak (OS parmak izi) ve bir güvenlik duvarının durumunu belirlemek için bilgi toplama faaliyetleri yürütebilirler.

![](https://cdn-images-1.medium.com/max/800/1*OaMHg5vMHFfRn5qPET_l7g.png)

ICMP Flood

Tehdit aktörleri ayrıca şekildeki ICMP flood saldırısında gösterildiği gibi DoS ve DDoS saldırıları için de ICMP kullanırlar.

**DoS( Denial-of-Service)**, Tehdit aktörleri meşru kullanıcıların bilgi veya hizmetlere erişimini engellemeye çalışır.

**DDoS(Distiributed-Denial-of-Service)**, DoS saldırısına benzer, ancak birden fazla kaynak makineden eşzamanlı, koordineli bir saldırı içerir.

ICMP Mesajları:

* **ICMP echo request ve echo reply:** Sunuculara doğrulama ve DoS saldırıları gerçekleştirmek için kullanılır.
* **ICMP unreachable:** Ağ keşif ve tarama saldırıları gerçekleştirmek için kullanılır.
* **ICMP mask reply:** Dahili bir IP ağını eşlemek için kullanılır.
* **ICMP redirect:** Bir hedef sunucunun, trafik güvenliği ihlal edilmiş bir cihaz üzerinden gönderim yapmaya ikna etmek ve bir MiTM saldırısı oluşturmak için kullanılır.
* **ICMP router discovery:** Bir hedef sunucunun yönlendirme tablosuna sahte rota girişleri enjekte etmek için kullanılır.

Ağlar, internetten ICMP problamasını önlemek için ağ kenarında sıkı ICMP erişim kontrol listesi (ACL) filtrelemesine sahip olmalıdır. Güvenlik analistleri, yakalanan trafiğe ve günlük dosyalarına bakarak ICMP ile ilgili saldırıları tespit edebilmelidir. Büyük ağlar söz konusu olduğunda, güvenlik duvarları ve saldırı tespit sistemleri (IDS) gibi güvenlik cihazları bu tür saldırıları tespit etmeli ve güvenlik analistlerine uyarılar göndermelidir.

### 4-Taşıma Katmanı (Transport Layer) Saldırıları

Bu katmanda, ağ uygulamaları TCP veya UDP portlarını kullanır. Saldırganlar, hangi hizmetleri sunduklarını keşfetmek için hedef cihazların port taramalarını gerçekleştirir. Ayrıca, nmap ile yapılan port taramaları bu katmanda gerçekleşir.

#### TCP SYN Flood Attack

TCP SYN Flood saldırısı TCP üç yönlü el sıkışmasını istismar eder.

![](https://cdn-images-1.medium.com/max/800/0*zoyXVMkpin-5lPBM)

TCP SYN Flood Attack

Şekilde, bir saldırganın bir hedefe rastgele sahte bir kaynak IP adresi ile sürekli olarak TCP SYN oturum isteği paketleri gönderdiği gösterilmektedir Hedef cihaz, sahte IP adresine bir TCP SYN-ACK paketi ile yanıt verir ve bir TCP ACK paketi bekler. Bu yanıtlar asla gelmez. Sonunda hedef ana bilgisayar yarı açık TCP bağlantılarıyla boğulur ve TCP hizmetleri meşru kullanıcılara engellenir.

#### **TCP Reset Attack**

İki ana bilgisayar arasındaki TCP iletişimini sonlandırmak için bir TCP sıfırlama saldırısı kullanılabilir.

![](https://cdn-images-1.medium.com/max/800/0*jXqki2wzff98grNF)

TCP Reset Attack

Bir TCP bağlantısı RST biti aldığında sonlanır. Bu, TCP bağlantısını koparmanın ve alıcı ana bilgisayara TCP bağlantısını kullanmayı derhal durdurmasını bildirmenin ani bir yoludur. Bir saldırgan TCP Reset saldırısı yapabilir ve bir veya her iki uç noktaya TCP RST içeren sahte bir paket gönderebilir.

#### **UDP Flood Attack**

Bir UDP flood saldırısı görme olasılığınız TCP SYN flooda göre daha yüksektir.

![](https://cdn-images-1.medium.com/max/800/0*RNfQT2Tp6YfE_xx9)

UDP flood saldırısında ağdaki tüm kaynaklar tüketilir. Saldırgan, UDP Unicorn veya Low Orbit Ion Cannon gibi bir araç kullanmalıdır. Bu araçlar, genellikle sahte bir ana bilgisayardan alt ağdaki bir sunucuya UDP paketleri gönderir. Program bilinen tüm portları tarayarak kapalı portları bulmaya çalışacaktır. Bu, sunucunun bir ICMP portuna ulaşılamıyor mesajı ile yanıt vermesine neden olur. Sunucuda çok sayıda kapalı port olduğundan, bu segment üzerinde bant genişliğinin çoğunu kullanan çok fazla trafik oluşturur. Sonuç bir DoS saldırısına çok benzer.

### 5-Oturum Katmanı (Session Layer) Saldırıları

Bu katmanda, ağ uygulamalarının oturum işlemleri gerçekleştirilir. Saldırganlar, uygulamalarda kullanıcı oturumlarını çalma girişimlerinde bulunabilirler.

#### Session Hijacking Attack

Session Hijacking, bir kullanıcı oturumunun bir saldırgan tarafından ele geçirildiği saldırıdır. Bir oturum, örneğin bankacılık uygulamanız gibi bir hizmete giriş yaptığınızda başlar ve çıkış yaptığınızda sona erer. Saldırı, saldırganın oturum çerezinizi bilmesine dayanır, bu nedenle çerez kaçırma veya çerez yan kaçırma olarak da adlandırılır.

![](https://cdn-images-1.medium.com/max/800/0*uo_0InuvSBOItucg)

Session Hijacking

Nasıl yapıldığına bağlı olarak iki tür oturum ele geçirme vardır. Saldırgan doğrudan hedefe dahil olursa buna aktif kaçırma denir ve bir saldırgan sadece pasif olarak trafiği izlerse buna pasif kaçırma denir.

Kullanılan Yöntemler:

* **Session Sniffing:** Saldırgan önce “Oturum Kimliği” adı verilen geçerli bir belirteç oturumunu yakalamak için bir sniffer kullanır, ardından Web Sunucusuna yetkisiz erişim elde etmek için geçerli oturumu kullanır.
* **Cross-site scripting attack**: Saldırgan, istemci tarafında çalışan kötü amaçlı kod veya programlar kullanarak oturum çerezini ele geçirir.
* **Session Prediction Attacks:** Oturum kimliğini tahmin etmek, saldırganın, kimlik doğrulamasını atlamasına ve bir kurbanın oturumuna erişmesine izin verebilir, ancak saldırganın oturum kimliği oluşturma sürecini bilmesini gerektirir.

### 6-Sunum Katmanı (Presentation Layer) Saldırıları

Bu katman, verilerin sunumunu sağlar. Saldırganlar, bu katmanda sosyal mühendislik yöntemlerini kullanırlar.

Sosyal mühendislik saldırıları, insanların güvenini kazanma, manipülasyon, kandırma veya yanıltma gibi taktikleri içerebilir. Saldırganlar, kurumsal veya kişisel düzeyde sosyal mühendislik saldırılarını gerçekleştirebilirler. Örnek olarak, bir saldırgan bir kurumun çalışanı gibi davranarak telefonla arama yapabilir ve kendini güvenilir bir kaynak olarak tanıtarak çalışanın kimlik bilgilerini veya gizli şirket bilgilerini elde etmeye çalışabilir.

#### Spam Attack

Önemsiz posta olarak da bilinen spam, basitçe istenmeyen e-postadır. Çoğu durumda bir reklam yöntemidir. Bununla birlikte, birçok spam virüs veya solucan bulaşmış bilgisayarlar tarafından toplu olarak gönderilir ve genellikle alıcıları sosyal güvenlik numarası veya banka hesap bilgileri gibi hassas bilgileri ifşa etmeleri için kandırmayı amaçlayan kötü amaçlı bağlantılar, zararlı yazılımlar veya aldatıcı içerik içerir.

![](https://cdn-images-1.medium.com/max/800/0*hopIofzMsEChiLsi)

Spam

Spam mailler ile gelebilen bazı zararlı yazılım türleri:

* **Spyware(casus yazılım):** Bilgisayar veya mobil cihazlara izinsiz şekilde yüklenen ve kullanıcının aktivitelerini izleyen, bilgi toplayan veya kontrol altına alan kötü niyetli yazılımlardır. Genellikle kullanıcının bilgilerini çalmak, reklam geliri elde etmek veya kullanıcının davranışlarını izlemek amacıyla kullanılır.
* **Adware(reklam yazılımı):** Ücretsiz yazılımlarla birlikte bilgisayar veya mobil cihazlara yüklenen ve kullanıcılara reklam göstermek amacıyla tasarlanmış yazılımlardır. Adware, kullanıcının rızası olmadan, reklamcıların ürünlerini veya hizmetlerini tanıtmak için kullanıcının tarayıcısında veya sisteminde reklamlar gösterir.
* **Ransomware(fidye yazılımı):** kötü niyetli bir yazılım türüdür ve hedeflenen sistemi veya dosyaları şifreleyerek kullanıcının erişimini engeller. Ardından saldırganlar, fidye ödenmediği sürece dosyaların veya sistemlerin kilidini açmayı reddeder. Ransomware saldırıları genellikle fidye talebiyle birlikte gerçekleşir.
* **Keylogger(tuş kaydedici):** Bir bilgisayar veya mobil cihaz üzerinde kullanıcının klavye girişlerini kaydeden bir yazılımdır. Keylogger’lar, kullanıcının tuş vuruşlarını izleyerek şifreleri, kullanıcı adlarını, kredi kartı bilgilerini ve diğer hassas bilgileri kaydedebilir.
* **Rootkit:** Bilgisayar korsanlarına veya saldırganlara yetkisiz erişim sağlamak, sistem kaynaklarını kontrol etmek veya diğer kötü niyetli faaliyetlerde bulunmak için kullanılır. Rootkit’ler, bir işletim sistemi veya güvenlik yazılımı tarafından tespit edilmesi ve kaldırılması zor olacak şekilde gizlenmeye çalışılır.
* **Backdoor(arka kapı):** Bilgisayar sistemlerine veya yazılımlara yetkisiz erişim sağlayan ve sistemde gizli bir giriş noktası oluşturan kötü niyetli bir mekanizmadır. Backdoor’lar, genellikle bilgisayar korsanları veya saldırganlar tarafından kullanılır ve sistemi kontrol etmek, bilgileri çalmak veya zararlı faaliyetlerde bulunmak için kullanılır.

#### Phishing Attacks

Kimlik avı, bir kullanıcı ile e-posta veya anlık mesaj yoluyla — ya da başka bir şekilde — meşru bir kişi veya kuruluş gibi davranan biri tarafından iletişime geçildiğinde meydana gelir. Amaç, alıcıyı cihazına kötü amaçlı yazılım yüklemesi veya oturum açma bilgileri ya da finansal bilgiler gibi kişisel bilgilerini paylaşması için kandırmaktır.

![](https://cdn-images-1.medium.com/max/800/0*u9pddjEJBTX2V0Fb)

Phishing

Örneğin, bir ödül kazandığınız için sizi tebrik eden bir e-posta alıyorsunuz. İyi bilinen bir perakende mağazasından gönderilmiş gibi görünür ve ödülünüzü almak için bir bağlantıya tıklamanızı ister. Bu bağlantı aslında sizi kişisel bilgilerinizi girmenizi isteyen sahte bir siteye yönlendirebilir veya cihazınıza bir virüs bile yükleyebilir.

Phishing Türleri:

* **Spear phishing:** Oldukça hedefli bir saldırı olan spear phishing, saldırganın belirli bir kişi hakkında bildiği bilgilere (ilgi alanları, tercihleri, faaliyetleri ve iş projeleri olabilir) dayanarak bu kişiye özelleştirilmiş e-postalar gönderir.
* **Vishing:** Genellikle sesli oltalama olarak adlandırılan bu saldırı türünde suçlular, kullanıcıları kredi kartı bilgileri gibi bilgileri ifşa etmeye teşvik etmek için sesli iletişim teknolojisini kullanmaktadır.
* **Pharming:** Bu saldırı türü kullanıcıları kasıtlı olarak resmi bir web sitesinin sahte bir versiyonuna yönlendirir. Meşru bir siteye bağlandıklarına inandırılan kullanıcılar, kimlik bilgilerini sahte web sitesine girerler.
* **Whaling:** Bir kuruluştaki üst düzey yöneticiler, politikacılar ve ünlüler gibi yüksek profilli kişileri hedef alan bir oltalama saldırısıdır.

### **7-Uygulama Katmanı (Application Layer) Saldırıları**

Bu katman, son kullanıcıların ağa erişimini sağlayan uygulamaları içerir. Bu uygulamalarda çeşitli zafiyetler meydana gelebilir. Saldırganlar bu zafiyetlerden yararlanarak saldırılar gerçekleştirirler.

#### Remote Code Execution — RCE Attack

Uzaktan kod yürütme, bir siber suçlunun hedef cihazda uygulamayı çalıştıran kullanıcının ayrıcalıklarıyla herhangi bir komutu yürütmek için uygulama güvenlik açıklarından yararlanmasına olanak tanır.

![](https://cdn-images-1.medium.com/max/800/0*zPLdjZJ62BP1lrMb)

RCE

Yetki yükseltme, normalde kısıtlı olan kaynaklara erişim elde etmek için bir işletim sistemindeki veya yazılım uygulamasındaki bir hatadan, tasarım kusurundan veya yanlış yapılandırmadan yararlanır.

Bu zafiyetler genelde güncellenmeyen servislerde ortaya çıkar. Bunun için sistemleri güncel tutmak hayati öneme sahiptir.

#### Code Injection Attack

Çoğu modern web sitesi, verileri depolamak ve yönetmek için Yapılandırılmış Sorgu Dili (SQL) veya Genişletilebilir İşaretleme Dili (XML) veritabanı gibi bir veritabanı kullanır. Enjeksiyon saldırıları bu veritabanlarındaki zayıflıklardan yararlanmaya çalışır.

![](https://cdn-images-1.medium.com/max/800/0*OyICM-80RxDiRx2i)

Code Injeciton

Birkaç türde kod enjeksiyonu saldırısı vardır:

1. **XML Injection Attack:** Bu saldırısı, XML veritabanındaki verileri bozabilir ve web sitesinin güvenliğini tehdit edebilir. Veritabanında depolanan tüm hassas bilgilere erişebilir ve web sitesinde istedikleri değişiklikleri yapabilirler.
2. **SQL Injection Attack:** Bir giriş alanına kötü niyetli bir SQL ifadesi ekleyerek web sitelerine veya herhangi bir SQL veritabanına SQL enjeksiyon saldırısı gerçekleştirebilir.
3. **DLL Injection Attack:** Dinamik bağlantı kitaplığı (DLL) dosyası, Windows’ta belirli bir etkinliği gerçekleştirmek için bir dizi kod ve veri içeren bir kitaplıktır. Uygulamalar bu tür bir dosyayı, bu etkinliği gerçekleştirmeleri gerektiğinde yerleşik olmayan işlevsellik eklemek için kullanır. DLL enjeksiyonu, bir saldırganın bir uygulamayı hedef sürecin bir parçası olarak çalışan zararlı bir DLL dosyasını çağırması için kandırmasına olanak tanır.
4. **LDAP Injection Attack:** Hafif Dizin Erişim Protokolü (LDAP), dizin hizmetlerine kullanıcı erişimini doğrulamak için kullanılan açık bir protokoldür. Bu saldırı, LDAP sunucularına sorgular enjekte ederek girdi doğrulama güvenlik açıklarından yararlanır.
5. **Command Injection Attack:** Uygulamanın**,** kullanıcı tarafından sağlanan girdilerle oluşturulan komutları doğrudan yürütmek için güvenlik kontrollerini yapmadığı durumlarda gerçekleşen bir güvenlik açığıdır. Bu tür saldırılar, saldırganların, web uygulaması üzerindeki komutları manipüle ederek, zararlı komutlar çalıştırmasına olanak tanır

#### File Inclusion Attack

File Inclusion Attack (Dosya Dahil Etme Saldırısı), bir web uygulamasının, kullanıcı tarafından sağlanan girişleri doğrulamadan veya düzgün şekilde temizlemeden, dışarıdan gelen dosyaları veya kaynakları dahil ettiği durumlarda ortaya çıkan bir güvenlik açığıdır. Bu saldırı türü, saldırganların web uygulamasının sunucusunda bulunan dosyalara yetkisiz erişim sağlamasını ve hedef sistemi istismar etmesini amaçlar.

![](https://cdn-images-1.medium.com/max/800/0*6vHEhYTL9O5inMoO)

File Inclusion

File Inclusion Attack genellikle iki farklı şekilde gerçekleştirilebilir:

1. Local File Inclusion (LFI): Saldırgan, web uygulamasının sunucusunda yer alan yerel dosyalara erişim sağlamak için kullanıcı tarafından sağlanan girişleri manipüle eder. Saldırgan, sunucuda bulunan hassas dosyalara (örneğin, konfigürasyon dosyalarına, kullanıcı kimlik doğrulama bilgilerine vb.) erişebilir ve bu bilgileri istismar edebilir.
2. Remote File Inclusion (RFI): Saldırgan, dışarıdaki uzak bir sunucuda bulunan dosyaları web uygulamasına dahil etmek için kullanıcı tarafından sağlanan girişleri manipüle eder. Saldırgan, hedef sunucuya zararlı bir dosya veya betik dahil ederek sistemde istenmeyen işlemler gerçekleştirebilir.

Bu tür saldırılardan korunmak için, web uygulamalarının kullanıcı tarafından sağlanan girişleri doğrulamak, düzgün şekilde temizlemek ve güvenlik kontrolleri uygulamak önemlidir. Ayrıca, dosya yolunu sınırlamak, erişim izinlerini doğru şekilde yapılandırmak ve güvenlik açıklarını tespit etmek için düzenli güvenlik denetimleri yapmak da önemli güvenlik önlemleridir.

#### XSS(Cross-Site Scripting) Attack

XSS saldırıları, kullanıcı tarafından sağlanan verilerin yeterince doğrulanmadığı veya temizlenmediği durumlarda gerçekleşir. Saldırganlar, web uygulamasının güvenlik açığından yararlanarak, tarayıcıda çalıştırılan zararlı betikleri hedef kullanıcının tarayıcısına enjekte eder.

![](https://cdn-images-1.medium.com/max/800/0*BWSb8CfeOu6knzd-)

XSS saldırıları, genellikle saldırganın kendi betik kodunu web uygulamasına yerleştirmesiyle gerçekleştirilir. Bu betikler, hedef kullanıcının tarayıcısında çalışır ve saldırganın istediği işlemleri gerçekleştirebilir. Saldırganlar, XSS saldırılarıyla kullanıcıların oturum açma bilgilerini çalabilir, kullanıcılara zararlı içerik sunabilir, kullanıcılara yönlendirme yapabilir veya sayfa içeriğini değiştirebilir.

XSS saldırıları üç farklı türe ayrılabilir:

1. **Stored (Kalıcı) XSS:** Zararlı betikler, web uygulamasında kalıcı olarak saklanır ve her defasında hedef kullanıcılar tarafından görüntülenir. Bu tür saldırılar, forumlar, yorum alanları veya mesaj panoları gibi kullanıcı tarafından oluşturulan içeriği saklayan uygulamalarda yaygındır.
2. **Reflected (Yansıtılan) XSS:** Zararlı betikler, kullanıcının web uygulamasına gönderdiği istekle birlikte gönderilir ve geri dönen yanıtta hedef kullanıcı tarafından çalıştırılır. Bu tür saldırılar, arama formları veya URL parametreleri gibi kullanıcının sağladığı girişleri işleyen uygulamalarda ortaya çıkar.
3. **DOM-based XSS:** Bu tür XSS saldırıları, Document Object Model (DOM) üzerindeki güvenlik açıklarını hedef alır. Saldırganlar, web sayfasının DOM yapısını manipüle ederek zararlı betikleri hedef kullanıcının tarayıcısında çalıştırır.

XSS saldırılarından korunmak için, web uygulamalarının kullanıcı tarafından sağlanan verileri doğrulamak, düzgün şekilde temizlemek ve güvenlik kontrolleri uygulamak önemlidir. Güvenli kodlama standartlarına uyum sağlamak, veri girişlerini sınırlamak ve tarayıcı tarafı korumaları kullanmak da etkili koruma yöntemleridir.

#### CSRF(cross-site request forgery) Attack

CSRF, yetkisiz komutların bir kullanıcının tarayıcısından güvenilir bir web uygulamasına gönderildiği bir web sitesinin kötü niyetli kullanımını tanımlar.

![](https://cdn-images-1.medium.com/max/800/0*bu98J5uQcNq-jogw)

CSRF

Kötü niyetli bir web sitesi bu tür komutları özel olarak hazırlanmış görüntü etiketleri, gizli formlar veya JavaScript istekleri aracılığıyla iletebilir — bunların tümü kullanıcının bilgisi olmadan çalışabilir.

#### SSRF (Server-Side Request Forgery) Attack

bir web uygulamasının sunucu tarafında (server-side) yapılan isteklerin istemci tarafında (client-side) hedeflenen kaynakları etkileme yeteneğini sömüren bir güvenlik açığıdır. SSRF saldırıları, web uygulamasının güvenlik kontrollerinin yeterince sağlanmadığı durumlarda gerçekleşebilir.

![](https://cdn-images-1.medium.com/max/800/0*94ELlkDPF_7kUzpI)

SSRF

Bu saldırı türünde, saldırganlar hedeflenen web uygulamasını kullanarak, sunucu tarafından yapılan HTTP isteklerini manipüle edebilir. Saldırgan, bu güvenlik açığından yararlanarak, genellikle ağa erişim sağlamak veya hedef sisteme yetkisiz erişim elde etmek amacıyla iç ağa yönlendirilen veya dış kaynaklara yapılan istekleri tetikleyebilir.

#### Directory Traversal Attack

Dizin geçişi, bir saldırgan web sunucusundaki dosyaları web sitesinin dizini dışında okuyabildiğinde gerçekleşir.

![](https://cdn-images-1.medium.com/max/800/0*pmfNvyxdCo5cBq1k)

Directory Traversal

Saldırgan daha sonra bu bilgileri hassas bilgiler içeren sunucu yapılandırma dosyalarını indirmek, potansiyel olarak daha fazla sunucu güvenlik açığını ortaya çıkarmak ve hatta sunucunun kontrolünü ele geçirmek için kullanabilir!

#### Buffer Overflow Attack

Bufferlar bir uygulamaya tahsis edilen bellek alanlarıdır. Veriler bir tamponun sınırlarının ötesine yazıldığında tampon taşması meydana gelir. Uygulama, verileri arabellek sınırlarının ötesinde değiştirerek diğer işlemlere ayrılmış belleğe erişebilir. Bu durum sistemin çökmesine veya verilerin ele geçirilmesine yol açabilir ya da ayrıcalıkların artmasını sağlayabilir.

![](https://cdn-images-1.medium.com/max/800/1*NQ9MzPUcJmS-Ku2GjvYBsA.png)

Buffer Overflow

Bu bellek kusurları saldırganlara hedefin cihazı üzerinde tam kontrol de sağlayabilir. Örneğin, bir saldırgan, program bellekte yüklenirken savunmasız bir uygulamanın talimatlarını değiştirebilir ve sonuç olarak kötü amaçlı yazılım yükleyebilir ve virüs bulaşmış cihazdan dahili ağa erişebilir.

#### Race Condition Attack

Kontrol zamanı (TOC) veya kullanım zamanı (TOU) saldırısı olarak da bilinen yarış koşulu saldırısı, görevleri belirli bir sırayla yerine getirmek üzere tasarlanmış bir bilgisayar sistemi aynı anda iki veya daha fazla işlem yapmaya zorlandığında meydana gelir.

![](https://cdn-images-1.medium.com/max/800/0*iwW58zmHvfpRykTf)

Race Condition

Örneğin, işletim sistemleri, bir işlemi gerçekleştirmek için gereken en küçük program talimatları dizisi olan iş parçacıklarından oluşur. İki veya daha fazla iş parçacığı paylaşılan verilere eriştiğinde ve bunları aynı anda değiştirmeye çalıştığında, bir yarış koşulu saldırısı meydana gelir.

Bu yazımda, OSI referans modeline göre gerçekleşebilecek siber saldırıların bir sınıflandırmasını yapmaya çalıştım. Eksiklerim varsa yorum bölümüne yazabilirsiniz. Yazımı beğenmeyi ve paylaşmayı unutmayın!