---
date: '2024-12-10'
draft: false
title: Sıfırncı-Gün Ataklarına Karşı Siber Savunma Stratejileri
---

---

### Sıfırncı-Gün Ataklarına Karşı Siber Savunma Stratejileri

![](https://cdn-images-1.medium.com/max/800/1*iZ-lydJs7z0gBXIAY58wQQ.png)

Bu yazımda, genel olarak tespit edilmesinin ve önlenmesinin zor olduğu kabul edilen sıfıncı-gün ataklarına karşı nasıl bir siber savunma stratejisinin geliştirilebileceğine değineceğim. Birçok kurumun muzdarip olduğu sıfıncı gün ataklarına karşı elbette elimiz boş bekleyemeyiz. Nasıl bir savunma altyapısı kurmamız gerekiyor? hadi biraz tartışalım.

---

### Sıfırıncı-Gün(Zero-Day) Atakları Nedir?

Öncelikle, sıfırıncı-gün ataklarının ve zafiyetlerinin tam olarak ne olduğu ve neden tespit edilmesinin zor olduğunu anlayalım

**Zafiyet**, genellikle bir sistem, ağ, yazılım veya donanımda var olan ve kötü niyetli kişilerin saldırmasına veya istismar etmesine olanak tanıyan bir güvenlik açığını ifade eder. Bu tür zafiyetler, bir sistemin güvenliğini tehlikeye atabilir ve veri hırsızlığı, yetkisiz erişim veya hizmet kesintisi gibi sonuçlara yol açabilir.

**Sıfırıncı Gün Atakları**, bilgisayar sisteminin yazılımlarında veya donanım bileşenlerinde henüz keşfedilmemiş veya bildirilmemiş güvenlik açıklarını kullanan saldırılardır. Bu güvenlik açıkları, zafiyetler, tespit edildikleri anda saldırganlar tarafından istismar edilir ve bu durum saldırıya uğrayan tarafın savunmasız yakalanmasına yol açar.

![](https://cdn-images-1.medium.com/max/800/1*5VuTqvd6RWdb2I052Nr74g.png)

Peki neden savunmasızlar? Kurum zafiyet yönetimi süreçlerine ne kadar dikkat ederse etsin, varlığından haberdar olmadığı bir güvenlik açığını yönetemez. Zafiyet yönetimi için kullanılan pek çok ürünün çalışma mantığı da bilinen zafiyetlerin tespit edilmesi ve giderilmesine yöneliktir. Dolayısıyla, henüz keşfedilmemiş bir zafiyetin giderilmesi mümkün değildir.

Yeni keşfedilen zafiyetlerinde giderilmesi süreci ise bir miktar zaman alır. Şayet, zafiyetin keşfedildiği platformun sağlayıcısının yama yayınlaması ve kurumun bu yama ile gerekli güncelleştirmeleri yaparak açığı kapatmasına kadar belli bir miktar zaman gereklidir. Bu zaman zarfında ise kurum bu zafiyete karşı savunmasız duruma düşer.

![](https://cdn-images-1.medium.com/max/800/1*ciB4g3FrciO4GMJ5R6q_IA.png)

Zafiyetin yayınlandığı anda kurumların savunmasız kalmasıyla saldırganlar harekete geçer. Shodan gibi platformlar üzerinden zafiyetli platforma sahip olan kurumları tespit ederler ve zafiyet giderilmeden saldırılarını gerçekleştirmeye çalışırlar.

Peki, kurumlar bu saldırlara karşı gerçekten savunmasız mı kalacak? Eli kolu bağlı mı bekleyecek? elbetteki hayır. Peki nasıl bir savunma stratejisi gereklidir? Şimdi buna değinelim.

---

### Derinlemesine Savunma(Defense-in-Depth) Stratejisi

**Derinlemesine Savunma (Defense-in-Depth)**, bir dizi savunma mekanizmasını kullanarak veri ve bilgileri korumak amacıyla katmanlar halinde uygulanan bir siber güvenlik yaklaşımıdır.

![](https://cdn-images-1.medium.com/max/800/1*tymURTTvBKKQGCOSzpLpWQ.png)

Defense-in-Depth

Bir katmanın aşılması durumunda diğer katmanlarda saldırının yakalanması ve önlenmesi prensibiyle çalışır. Bu stratejinin bir otorite tarafından yayınlanmış belli katmanları yoktur. Ancak, bu yazımda ben kendi yorumumla olası birkaç katman ile birlikte nasıl korunabileceğimizi anlatmaya çalışacağım. Bu konuya detaylı değindiğim yazıma [buradan](https://medium.com/@yusufarbc/derinlemesine-savunma-defense-in-depth-stratejisi-64e0be8ec1f0) erişebilirsiniz.

Ancak bundan önce değinmemiz gereken bir husus daha var. Bir siber saldırıda kullanılan taktikler ve yöntemler Mitre tarafından sınıflandırılmış ve listelenmiştir. Yazımda, bu taktiklere sıkça değineceğim ancak yazıyı uzatmamak adına bu taktiklerin detayına girmiyorum. Mitre attack enterprise matrisine linkten erişebilirsiniz:<https://attack.mitre.org/matrices/enterprise/>

Senaryom, bir kuruluşun belli bir hizmetinde keşfedilen sıfırıncı gün zafiyetinin ve bu zafiyeti istismar eden bir saldırının tespiti ve önlenmesini kapsamaktadır. Tabi, keşfedilen zafiyetler arasında en kritik olanlarından birini; kurumun dışarı açık bir servisinde ortaya çıkan ve uzaktan erişime(RCE) olanak tanıyan bir zero-day zafiyetini istismar eden bir saldırının tespiti ve önlenmesini ele alalım.

![](https://cdn-images-1.medium.com/max/800/1*TW-N4pXoQLDERr1qtD09LA.png)

Banka Ağ Topolojisi

Sernaryo kapsamında bir bankanın dışarı açık bir servisinde bir RCE zafiyeti yayınlandığını ele alalım. Ve katman katman bu zafiyeti istismar eden bir saldırıyı gerçekleştirip önleyelim.

---

### 1- Application Protection

İlk savunma katmanımız uygulama güvenliği katmanı. Bu katmanda, dışarıya sunduğumuz servislere gelen saldırıları önlemeye çalışırız. Saldırganın ise bu katmanda amacı hedef sisteme erişim sağlamak veya hizmet kesintisine yol açmaktır.

Bu katmanda:

* Kullandığımız uygulamalar ve servisler için düzenli zafiyet taramaları yapılır. (Vulnerability Management Solutions)
* Uygulamalara gelen saldırıları tespit etmek için uygulama logları toplanır ve SIEM sisteminde incelenir. (SOC)
* Uygulama güvenlik duvarlarının(Application Firewall) arkasına alınarak uygulamar saldırılardan korunmaya çalışılır. (WAF)

![](https://cdn-images-1.medium.com/max/800/1*ux6CxhDniTrfK7vaDwSz-A.jpeg)

Application Protection

Sıfırıncı gün saldırıları bu katmanı aşabilir. Çünkü, yapılan zafiyet taramaları sıfırıncı gün zafiyetini tespit edemez. SIEM sistemimizde yer alan kurallar sıfırıncı gün zafiyeti için uyarı vermez. Uygulama güvenlik duvarımız ise çeşitli metotlar([Defense Evasion](https://attack.mitre.org/tactics/TA0005)-Mitre) ile aşılabilir.

Bizim senaryomuzda RCE zafiyetinin istismar edilmesi ve hedef sisteme erişim sağlanması bu katmanın aşıldığı anlamına gelir. Mitre’de yer alan ilk erişim([Initial Access](https://attack.mitre.org/tactics/TA0001)-Mitre) aşaması başarılı olmuştur. Yetkisiz erişim sağlanmıştır ve bizim bundan haberimiz yoktur. Ancak henüz saldırganın elinde bir kazanım olmadığını da ekleyelim. Yinede saldırgan bizden 1–0 önde görünüyor. Ancak bizim daha geride 3 savunma hattımız daha bulunuyor. Hadi bunlara göz atmaya devam edelim.

---

### 2-Endpoint Protection

Uç nokta güvenliği katmanında sahip olduğumuz bilgisayar sistemlerini izleriz. Bu sistemler temel olarak ikiye ayrılır: Windows tabanlı sistemler, Unix/Linux tabanlı sistemler. Bu iki sistemede yapılacak saldırının amacı aynı olmasına rağmen yöntemleri farklıdır. Peki bu katmanda saldırganın amacı nedir? ve biz ne yapacağız?  
Saldırganın ilk erişimi sağladıktan sonra erişim sağladığı sisteme yönelik iki temel amacı vardır:

* Erişim sağladığı sistemde **kalıcılık sağlama**( [Persistence](https://attack.mitre.org/tactics/TA0003)-Mitre). Yani bağlantının sonlandığı veya sistemin kapandığı durumda bile yeniden sıfıncı-gün zafiyetini istismar etmekle uğraşmadan sisteme erişim sağlayabilmek. Bunu sağlamak için Windows ve Linux/Unix sistemlerde farklı pek çok teknik bulunmaktadır.
* Erişim sağladığı sistemde **yetki yükseltme**([Privilege Escalation](https://attack.mitre.org/tactics/TA0004)-Mitre). Yani eriştiği sistemde üst seviye yetki kullanabilme. Bu windows sistemlerde **administrator** kullanıcısının yetkileri, Unix/Linux sistemlerde ise **root** kullanıcısının yetkileridir**.**

Windows tabanlı sistemlerde kalıcılık sağlama metotları için ilgili [yazıma](https://medium.com/@yusufarbc/windows-kal%C4%B1c%C4%B1l%C4%B1k-sa%C4%9Flama-persistence-metotlar%C4%B1-b5fb4ac481c5) göz atabilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*3Tnfzr-Vt3pRPL_UF2j_Jg.jpeg)

Endpoint Protection

Peki saldırgan bunları yaparken biz ne yapacağız? Öncelikle, bir önceki katmana göre bu katmanda biz daha avantajlıyız. Çünkü, saldırganların sistemlerde kalıcılık sağlamak ve yetki yükseltmek için kullandığı teknikler büyük çoğunlukta bilinmektedir. Bu teknikleri tespit etmek ise zero-day istismarını tespit etmek kadar zor değildir.

Herşeyden önce, uç nokta güvenliğini sağlamak için çeşitli ürünlere ihtiyacımız vardır. Bunlar, en basit antivirüs sisteminden en gelişmiş XDR sistemine kadar çeşitllik gösterir. Kısaca adlarını vermem gerekirse:

* Antivirüs/Antimalware
* Antiphishing/Mail Security
* Malware Sandbox
* EPP(Endpoint Protection Platform)
* EDR(Endpoint Detection and Response)
* XDR( Extended Detection and Response)

Hepsinin ne işe yaradığına teker teker değinip uzatmayacağım. Bu sistemlerin ne olduğuna dair tonla yazı google’da mevcut. Ancak, genel olarak hepsi uç nokta güvenlik çözümleridir. Uç noktalar üzerindeki zararlı yazılımları tespit edip engellemeyi amaçlarlar. Şayet, saldırganın erişim sağladığı bir sistemde bişeyler yapmak için bir zararlı kod (payload) gönderip çalıştırması ve şüpheli bir bağlantı yapması elzemdir. Bu zararlı kod ve bağlantı bu ürünler ile tespit edilip engellendiğinde biz durumu 1–1 yaparız. Ancak en önemli nokta artık bişeylerin ters gittiğinden haberdar oluruz.

Bunun yanında, uygulamalarımızda yaptığımız gibi uç noktalarımızdan da log toplamamız gerekir. Temel olarak, Linux sistemlerde syslog ile windows sistemlerde eventlog ile SIEM sistemimize gerçek zamanlı log gönderimi yapılır. SIEM sistemimizdeki kurallar yetki yükseltme ve kalıcılık sağlama aktivitelerini tespit edip uyarı oluşturabilir. Bu uyarıyı gören güvenlik ekibimiz ise birşeylerin ters gittiğini anlayabilir.

İşletim sistemi her ne olursa olsun, saldırıya uğradığına inanılan bir uç noktayı analiz ederken cevaplanması gereken **3 önemli soru** vardır.

* 1. Sistemde aktif olarak bulunan bir zararlı yazılım(**malware**) var mı?
* 2. Şüpheli bir iç veya dış iletişim(**network connection**) var mı?
* 3. Herhangi bir kalıcılık(**persistence**) var mı?

Uç nokta üzerinde yukarıda bahsettiğim **önemli 3 şeye** yönelik detaylı bir inceleme saldırganın faaliyetini açığa çıkaracaktır. Bunun için çeşitli adli bilişim araçlarından yararlanılır. En bilinenleri, [**kape**](https://www.kroll.com/en/insights/publications/cyber/kroll-artifact-parser-extractor-kape) ve [**thor**](https://www.nextron-systems.com/thor/) araçlarıdır.

Tabi bu haberdar olma durumu bu ürünleri inceleyen uzmanların olduğu kurumlar için geçerlidir. Ne yazık ki, pek çok kurum bu tür uç nokta güvenliği ürünlerini satın alsa bile açıp bakmamaktadır. Her ne kadar güvenlik ürünleri zararlı yazılımları tespit edip otomatik olarak engellese de, saldırganın sisteme erişimini tamamen ortadan kaldırmayabilir. Bu durumda saldırgan güvenlik ürününü bypass etmek veya devredışı bırakmak için çeşitli yöntemler dener ve başarılı olursa bu katmanı da aşabilir.

---

### 3-Network Protection

Ağ güvenliği katmanında sahip olduğumuz kurum ağını izleriz. Bu noktada, pek çok ağ güvenliği sisteminden yararlanırız. Peki bu katmanda saldırganın amacı nedir? ve biz ne yapacağız?

![](https://cdn-images-1.medium.com/max/800/1*_t2bS_tKYBo8Z2TwG2p8XA.jpeg)

Network Protection

Bu aşamada, saldırgan enfekte ettiği uç nokta üzerinden kurum varlıklarının keşfetmeye([Reconnaissance](https://attack.mitre.org/tactics/TA0043)-Mitre) ve diğer sistemlere yanal hareket([Lateral Movement](https://attack.mitre.org/tactics/TA0008)-Mitre) ile yayılamaya çalışır. Bunun için intrusion atakları gerçekleştirir.

Ağ güvenliğini sağlamak için çeşitli ürünlere kullanırız:

* Firewalls
* IDS/IPS(Intrusion Detection Systems/Intrusion Prevention Systems)
* NAC(Network Access Control)
* NDR(Network Detection and Response)
* PAM (Privileged Access Management)

Hepsinin ne işe yaradığına teker teker değinip uzatmayacağım. Bu sistemlerin ne olduğuna dair tonla yazı google’da mevcut. Ancak, genel olarak hepsi ağ güvenlik çözümleridir.

Ağ trafiğini analiz edip taramaları ve intrusion ataklarını önlemek için kullanılırlar. Bu sistemlerden gelen logları SIEM sistemimizde toplamamız gereklidir. SIEM sistemimizde bu loglar analiz edilerek şüpheli ağ aktiviteleri görülebilir ve kaynak hostlar tespit edilebilir.

Firewall ile tespit ettiğimiz zararlı IPleri bloklayıp saldırganların kurumumuza zarar vermesini engelleyebiliriz. IDS/IPS sistemleri ise kurum ağındaki intrusion ataklarını tespit edip otomatik olarak engeller. Şayet, saldırganların yaptığı taramalar ve ataklar büyük miktarda ağ trafiği/gürültü yaratır. Bu nedenle tespit edilmesi kolaydır. Ancak bu durumu farkında olan saldırgan fazla gürültü çıkarmadan işini halletmeye çalışabilir. Taramalarını yavaşlatarak kalabalık ağ trafiği içinde görünürlüğünü azaltabilir. Ağ güvenlik ürünleri her ne kadar etkili olsalarda aşılamaz değillerdir.

Uç nokta güvenlik ürünleri ve ağ güvenlik ürünleri aşılamaz olmamalarının yanında aşmaları için saldırganlara engel teşkil ederler. Bu sistemleri aşmakla uğraşan saldırganlar vakit kaybeder ve yavaşlarlar. Bu durum, saldırının güvenlik uzmanlarınca tespit edilmesi için bir zaman oluşturur. Kimi siber saldırılar haftalar hatta aylar sürebilmektedir. Daha önce de dediğim gibi bu saldırıyı fark edecek güvenlik uzmanlarının yokluğunda saldırgan yavaşda olsa yine yoluna devam edecektir.

---

### 4-Data Protection

Son katmanımız olan veri güvenliği katmanında bir veri ihlalini(data breach) önlemek için bazı sistemler kullanılır. Peki bu katmanda saldırganın amacı nedir? ve biz ne yapacağız?

![](https://cdn-images-1.medium.com/max/800/1*tsNGz2GCC_G-OIMTA0xmpA.jpeg)

Data Protection

Önceki aşamalarda artık saldırgan kurum ağını tanımış ve pek çok sisteme yayılmış durumdadır. Dolayısıyla veritabanlarının(database) olduğu sunuculara da erişebilmiştir. Artık amacı bu kıymetli veriyi dışarı çıkarmak ve saldırısını nihayetlendirmek([Impact](https://attack.mitre.org/tactics/TA0040)-Mitre) olacaktır. Bir siber saldırının pek çok hedefi olabilir. Ama genelde, fidye yazılımı (ransomware), veri ihlali (data breach) ve hizmet kesintisi (service stop) etkisine sahiptir.

Bizim senaryomuzda ise banka kullanıcılarının kredi kart bilgileri hedeflendiğini varsayalım. Saldırgan veritabanlarına erişip ilgili veriyi bulduktan sonra bu veriyi dışarı çıkarmalıdır.

Bu noktada biz ne yapacağız? Veri güvenliği ürünlerine değinelim:

* Data Encryption Software
* DLP(Data Loss Prevention)
* Backup and Recovery Solutions
* IAM(Identity and Access Management)

Bu ürünlerin amacı veriye erişimi denetlemek, veriyi korumak ve veri ihlalini engellemektir. Yedekleme sistemleri ile olası veri kayıplarının önüne geçilir, veri şifreleme sistemleriyle veriler korunur, DLP sistemi ile ihlaller önlenir, IAM sistemi ile veriye erişim denetlenir.

Her ne kadar bu sistemler doğru yapılandırılmış olsa da daha önce bahsettiğimiz ağ güvenliği ve uç nokta güvenliği ürünleri gibi aşılamaz değildir. Saldırgan küçük miktarlarda veri kaçırarak DLP’den kaçınabilir. Eline geçen şifreli veriyi uğraştırıcı da olsa kırabilir. Hatta yedekleme sistemlerindeki veriyi imha edebilir. Ve saldırısını nihayetlendirebilir.

---

### Sonuç

Sonuç olarak, her ne kadar güçlü güvenlik çözümlerimiz olursa olsun bu ürünler saldırıyı tamamen engelleyemeyebilir. Ancak, büyük oranda geciktireceği aşikardır. Bu da, saldırgan için bir zaman maliyeti oluşturur. Bu nedenle, saldırgan tarafında ele geçecek kazanım, zaman maliyetine değmiyorsa saldırı caydırılmış olur. Hepsinden önemlisi ise siber saldırılardan korunmak için gerçek uzmanlarca düzenli olarak izleme yapılması gerekliliğidir.