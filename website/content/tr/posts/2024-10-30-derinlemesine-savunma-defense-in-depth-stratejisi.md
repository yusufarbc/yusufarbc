---
date: '2024-10-30'
description: Çoğu güvenlik uzmanı, mükemmel ağ güvenliğinin imkansız olduğu ve herhangi bir savunmanın her zaman aşılabileceği görüşünde birleşiyor. Derinlemesine savunma stratejisi, saldırganı birden fazla savunma katmanıyla engellemeyi benimsiyor. Her bir katma...
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*T4RL-NrRsRdZSjXM4Ja3Lg.png
title: Derinlemesine savunma (Defense in Depth) Stratejisi
type: posts
---

Çoğu güvenlik uzmanı, mükemmel ağ güvenliğinin imkansız olduğu ve herhangi bir savunmanın her zaman aşılabileceği görüşünde birleşiyor. Derinlemesine savunma stratejisi, saldırganı birden fazla savunma katmanıyla engellemeyi benimsiyor. Her bir katmanın aşılabileceğini kabul ediyor. Değerli varlıklar, daha fazla savunma katmanıyla korunuyor. Birden fazla katmanın kombinasyonu, saldırının başarı maliyetini artırıyor ve bu maliyet korunan varlıkların değeriyle orantılı oluyor. Ayrıca, birden fazla katmanın kombinasyonu, beklenmedik saldırılara karşı optimize edilmiş tek bir savunmadan daha etkili oluyor. Saldırgan için maliyet, ek zaman, çaba veya ekipman olarak ortaya çıkabilir. Örneğin, bir saldırganın gecikmesi, bir kuruluşun devam eden saldırıyı tespit etme ve yanıt verme şansını artırabilir. Eğer artan maliyetler, başarılı bir saldırıdan elde edilebilecek kazançtan daha ağır basıyorsa, bazı girişimler caydırabilir.

![](https://cdn-images-1.medium.com/max/800/1*m1IdlCgTOzsBqAq42efKQA.png)

Defense In Depth

Derinlemesine savunmanın bazen insan, teknoloji ve operasyonları içerdiği söylenir. Eğitimli güvenlik çalışanları tesislerin güvenliğinden ve bilgi güvencesinden sorumlu olmalıdır. Ancak, bir kuruluştaki her bilgisayar kullanıcısı güvenlik politikaları ve uygulamaları konusunda bilinçlendirilmelidir. Evdeki her İnternet kullanıcısı güvenli uygulamalar (e-posta eklerini açmaktan veya şüpheli bağlantılara tıklamaktan kaçınmak gibi) ve uygun korumanın (antivirüs yazılımı, güvenlik duvarları) faydaları hakkında bilgi sahibi olmalıdır.

Koruma katmanları için çeşitli teknolojik önlemler kullanılabilir. Bunlar arasında güvenlik duvarları, IDS’ler, erişim kontrol listeleri (ACL’ler), antivirüs yazılımı, erişim kontrolü, spam filtreleri vb. yer almalıdır.

![](https://cdn-images-1.medium.com/max/800/1*tymURTTvBKKQGCOSzpLpWQ.png)

Defense in Depth

### Önleyici Tedbirler — Proaktif Yaklaşım

Çoğu bilgisayar kullanıcısı İnternet kullanımının güvenlik riskleri oluşturduğunun farkındadır. Saldırılara maruz kalmayı en aza indirmek için önlemler almak mantıklı olacaktır. Neyse ki, bilgisayar kullanıcılarının sistemlerini güçlendirerek riskleri azaltmaları için çeşitli seçenekler mevcuttur.

#### 1- Erişim Kontrolü (Access Control)

Bilgisayar güvenliğinde erişim kontrolü, kullanıcıların yetkili oldukları seviyeye kadar işlevleri yerine getirmelerine izin veren ve kullanıcıların yetkisiz işlevleri yerine getirmelerini kısıtlayan mekanizmaları ifade eder. Erişim kontrolü(**Access Control**) şunları içerir:

* Kullanıcıların kimlik doğrulaması (**Authentication**)
* Ayrıcalıklarının yetkilendirilmesi (**Authorization**)
* Kullanıcı eylemlerini izlemek ve kaydetmek için denetim (**Auditing**)

Tüm bilgisayar kullanıcıları bir tür erişim kontrolüne aşina olacaktır.

Kimlik doğrulama(**Authentication**), bir kullanıcının kimliğini doğrulama işlemidir. Kimlik doğrulama tipik olarak bu faktörlerden bir veya daha fazlasına dayanır:

* Şifre veya PIN gibi kullanıcının bildiği bir şey (**Something the user knows**)
* Kullanıcının sahip olduğu akıllı kart veya token gibi bir şey (**Something the user has**)
* Parmak izi, retina deseni veya diğer biyometrik tanımlayıcılar gibi kullanıcı hakkında kişisel bir şey (**Something the user is**)

Birden fazla kanıt sunulsa bile tek bir faktörün kullanılması zayıf kimlik doğrulama olarak kabul edilir. İki faktörlü (veya çok faktörlü) kimlik doğrulama olarak adlandırılan şifre ve parmak izi gibi iki faktörün kombinasyonu güçlü kimlik doğrulama olarak kabul edilir.

Yetkilendirme (**Authorization**), kimliği doğrulanmış bir kullanıcının neler yapabileceğini belirleme sürecidir. Çoğu işletim sisteminde okuma, yazma veya yürütme erişimiyle ilgili belirlenmiş bir dizi izin vardır. Örneğin, sıradan bir kullanıcının belirli bir dosyayı okuma izni olabilir ancak dosyaya yazma izni olmayabilir, oysa bir root veya süper kullanıcı her şeyi yapmak için tam ayrıcalıklara sahip olacaktır.

Denetim (**Auditing**) kullanıcıların hesap verebilir olmasını sağlamak için gereklidir. Bilgisayar sistemleri sistemdeki eylemleri denetim izlerine ve günlüklerine kaydeder. Güvenlik amacıyla, olayları yeniden yaratmak ve analiz etmek için çok değerli adli araçlardır. Örneğin, çok sayıda başarısız oturum açma girişiminde bulunan bir kullanıcı davetsiz misafir olarak görülebilir.

#### 2- Zafiyet Testi ve Yama(Testing and Patching)

Daha önce de belirtildiği gibi, güvenlik açıkları, bir bilgisayarı tehlikeye atmak için kullanılabilecek yazılımdaki zayıflıklardır. Savunmasız yazılımlar her türlü işletim sistemini ve uygulama programını içerir. Sürekli olarak farklı şekillerde yeni güvenlik açıkları keşfedilmektedir. Güvenlik araştırmacıları tarafından keşfedilen yeni güvenlik açıkları genellikle satıcıya gizli olarak bildirilir ve satıcıya güvenlik açığını incelemesi ve bir yol geliştirmesi için zaman verilir. 2007'de açıklanan tüm güvenlik açıklarının %50'si satıcı yamalarıyla düzeltilebilmiştir. Hazır olduğunda, satıcı, umarız bir yama ile birlikte güvenlik açığını yayınlayacaktır.

Güvenlik açıklarının yayınlanmasının saldırganlara yardımcı olacağı iddia edilmiştir. Bu doğru olsa da, yayınlama aynı zamanda tüm toplumda farkındalık yaratır. Sistem yöneticileri sistemlerini değerlendirebilecek ve uygun önlemleri alabileceklerdir. Sistem yöneticilerinin ağlarındaki bilgisayarların yapılandırmasını bilmeleri beklenebilir, ancak büyük kuruluşlarda kullanıcılar tarafından yapılan olası yapılandırma değişikliklerini takip etmek zor olacaktır. Zafiyet testi, bir ağdaki bilgisayarların yapılandırması hakkında bilgi edinmek için basit bir yol sunar.

Zafiyet testi, bilinen güvenlik açıkları için sistemleri araştırmaya yönelik bir alıştırmadır. Belirli bir güvenlik açığını test etmek üzere bir dizi paket oluşturmak için bilinen güvenlik açıklarından oluşan bir veritabanı, bir paket oluşturucu ve test rutinleri gerektirir. Bir güvenlik açığı bulunursa ve bir yazılım yaması mevcutsa, o an bilgisayar yamalanmalıdır.

#### 3- Portları Kapatma

Aktarım(Transport) katmanı protokolleri, yani İletim Kontrol Protokolü (TCP) ve Kullanıcı Datagram Protokolü (UDP), port numaraları aracılığıyla birbirleriyle iletişim kuran uygulamaları tanımlar. 1'den 1023'e kadar olan port numaraları iyi bilinir ve Internet Assigned Numbers Authority (IANA) tarafından root ayrıcalıklarıyla çalışan standartlaştırılmış hizmetlere atanır. Örneğin, Web sunucuları istemci istekleri için 80 numaralı TCP bağlantı noktasını dinler. 1024 ila 49151 arasındaki bağlantı noktası numaraları, sıradan kullanıcı ayrıcalıklarına sahip çeşitli uygulamalar tarafından kullanılır. 49151'in üzerindeki port numaraları uygulamalar tarafından dinamik olarak kullanılır.

Saldırganlar açık portları kullanabileceğinden, gereksiz portları kapatmak iyi bir uygulamadır,

özellikle de daha yüksek aralıkta olanlar. Örneğin, Sub7 Truva atının varsayılan olarak 27374 numaralı portu kullandığı bilinmektedir ve Netbus 12345 numaralı portu kullanmaktadır. Ancak portların kapatılması tek başına bir bilgisayarın güvenliğini garanti etmez. Bazı bilgisayarların HyperText Transfer Protocol (HTTP) için TCP port 80'i açık tutması gerekir, ancak saldırılar bu port üzerinden gerçekleştirilebilir.

#### 4- Güvenlik Duvarları

Çoğu insan ağ güvenliğini düşündüğünde, güvenlik duvarları akla gelen ilk şeylerden biridir. Güvenlik duvarları, dahili bir ağı harici tehditlerden koruyan bir çevre güvenliği aracıdır. Bir güvenlik duvarı gelen ve giden trafiğe seçici olarak izin verir veya engeller. Güvenlik duvarları, özel bir ağın girişinde bulunan bağımsız ağ cihazları veya bilgisayarlarda çalışan kişisel güvenlik duvarı programları olabilir. Bir kuruluşun güvenlik duvarı iç topluluğu korur; kişisel bir güvenlik duvarı bireyin ihtiyaçlarına göre özelleştirilebilir.

![](https://cdn-images-1.medium.com/max/800/1*9_PlK7S2sJYQmOwWCz8sAw.png)

Çeşitli ağ bölgelerini izole eden bir güvenlik duvarı.

Güvenlik duvarları, şekilde gösterildiği gibi çeşitli ağ bölgeleri, yani genel İnternet, özel intranetler ve silahsızlandırılmış bölge (DMZ — demilitarized zone) arasında ayrım ve izolasyon sağlayabilir. Yarı korumalı DMZ tipik olarak bir kuruluş tarafından sağlanan hizmetleri içerir. Genel sunucular genel İnternet’ten biraz korunmaya ihtiyaç duyar, bu nedenle genellikle bir güvenlik duvarının arkasında yer alırlar. Bu güvenlik duvarı tamamen kısıtlayıcı olamaz çünkü genel sunucuların dışarıdan erişilebilir olması gerekir.

Çeşitli güvenlik duvarı türleri vardır: paket filtreleyen güvenlik duvarları, durum bilgisi içeren güvenlik duvarları ve proxy güvenlik duvarları. Her durumda, bir güvenlik duvarının etkinliği kurallarının yapılandırılmasına bağlıdır. Düzgün yazılmış kurallar ağ protokolleri hakkında ayrıntılı bilgi gerektirir. Ne yazık ki, bazı güvenlik duvarları ihmal veya eğitim eksikliği nedeniyle yanlış yapılandırılmaktadır.

Paket filtreleyen güvenlik duvarları (**Packet-filtering firewalls**) paketleri her iki yönde de analiz eder ve bir dizi kurala göre geçişe izin verir veya reddeder. Kurallar genellikle bağlantı noktası numaralarını, protokolleri, IP adreslerini ve paket başlıklarının diğer niteliklerini inceler. Birden fazla paketi bir akış veya akımla ilişkilendirme girişimi yoktur. Güvenlik duvarı durum bilgisizdir, bir paketten diğerine dair hiçbir hafıza tutmaz.

Durum bilgisine sahip güvenlik duvarları (**Stateful firewalls**), aynı akışa veya bağlantıya ait paketleri tanıyarak ve bağlantı durumunu takip ederek paket filtreleyen güvenlik duvarlarının sınırlamasının üstesinden gelir. Ağ katmanında çalışırlar ve oturumların meşruiyetini tanırlar.

Proxy güvenlik duvarları (**Proxy firewalls**) uygulama katmanına kadar işlem yaptıkları için uygulama düzeyinde güvenlik duvarları olarak da adlandırılırlar. Belirli uygulamaları tanırlar ve istenmeyen bir protokolün standart olmayan bir bağlantı noktası kullanıp kullanmadığını veya bir uygulama katmanı protokolünün kötüye kullanılıp kullanılmadığını tespit edebilirler. Dahili ağdan genel internete proxy bağlantıları için birincil ağ geçitleri olarak hizmet vererek dahili bir ağı korurlar. Analizin doğası gereği ağ performansı üzerinde bir miktar etkiye sahip olabilirler.

Güvenlik duvarları genel bir savunma stratejisinin temel unsurlarıdır ancak sadece çevreyi korumaları gibi bir dezavantajları vardır. Eğer bir saldırganın çevreyi aşmak için bir yolu varsa işe yaramazlar. Ayrıca özel bir ağdan kaynaklanan içeriden gelen tehditlere karşı da işe yaramazlar.

#### 5- Antivirus and Antispyware Tools

Zararlı yazılımların çoğalması antivirüs yazılımına ihtiyaç duyulmasına neden olmaktadır. Antivirüs yazılımı kötü amaçlı yazılımın varlığını tespit etmek, doğasını tanımlamak, zararlı yazılımı kaldırmak (bilgisayarı dezenfekte etmek) ve bir bilgisayarı gelecekteki enfeksiyonlardan korumak için geliştirilmiştir. Algılama ideal olarak yanlış pozitifleri (yanlış alarmlar) ve yanlış negatifleri (gözden kaçan zararlı yazılımlar) aynı anda en aza indirmelidir. Antivirüs yazılımı bir dizi zorlukla karşı karşıyadır:

* Zararlı yazılım taktikleri karmaşıktır ve sürekli gelişmektedir.
* Virüs bulaşmış bilgisayarlardaki işletim sistemine bile güvenilemez.
* Zararlı yazılımlar dosyaları etkilemeden tamamen bellekte bulunabilir.
* Zararlı yazılımlar antivirüs işlemlerine saldırabilir.
* Antivirüs yazılımının işlem yükü, kullanıcıların rahatsız olup antivirüs yazılımını kapatmasına neden olacak şekilde bilgisayar performansını düşüremez.

Antivirüs yazılımı tarafından gerçekleştirilen en basit görevlerden biri dosya taramasıdır. Bu işlem, dosyalardaki baytları, bilinen bir zararlı yazılımın göstergesi olan bayt desenleri olan bilinen imzalarla karşılaştırır. İmza tabanlı(**signature-based**) tespitin genel yaklaşımını temsil eder. Yeni zararlı yazılım yakalandığında, bir imzada tanımlanabilecek benzersiz özellikler açısından analiz edilir. Yeni imza antivirüs programlarına güncelleme olarak dağıtılır. Antivirüs, dosya taraması sırasında imzayı arar ve bir eşleşme bulunursa, imza zararlı yazılımı özel olarak tanımlar. Ancak bu yöntemin önemli dezavantajları vardır: Yeni imzaların geliştirilmesi ve test edilmesi zaman alır; kullanıcıların imza dosyalarını güncel tutmaları gerekir; ve bilinen bir imzası olmayan yeni zararlı yazılımlar tespit edilemeyebilir.

Davranış tabanlı(**behavior-based**) tespit tamamlayıcı bir yaklaşımdır. Davranış tabanlı tespit, zararlı yazılımın ne olduğunu ele almak yerine, zararlı yazılımın ne yapmaya çalıştığına bakar. Başka bir deyişle, riskli bir eyleme kalkışan her şey şüphe altında kalacaktır. Bu yaklaşım imza tabanlı tespitin sınırlamalarının üstesinden gelir ve yeni zararlı yazılımları imza olmadan, sadece davranışlarından yola çıkarak bulabilir. Ancak bu yaklaşım pratikte zor olabilir. İlk olarak, şüpheli davranışın ne olduğunu ya da tersine normal davranışın ne olduğunu tanımlamamız gerekir. Bu tanım genellikle güvenlik uzmanları tarafından geliştirilen sezgisel kurallara dayanır, çünkü normal davranışı kesin olarak tanımlamak zordur. İkinci olarak, şüpheli davranışı ayırt etmek mümkün olabilir, ancak kötü niyetli davranışı belirlemek çok daha zordur, çünkü kötü niyetin çıkarılması gerekir. Davranış tabanlı tespit şüpheli davranışları işaretlediğinde, tehdit riskini daha iyi anlamak için genellikle daha fazla takip araştırması gerekir.

Zararlı yazılımların görünümlerini değiştirme veya gizleme yeteneği, dosya taramasını yenebilir. Ancak, biçimi ne olursa olsun, zararlı yazılım nihayetinde görevini yerine getirmelidir. Bu nedenle, zararlı yazılıma çalışma şansı verilirse davranışından tespit etme fırsatı her zaman ortaya çıkacaktır. Antivirüs yazılımı, bilgisayar için tehdit oluşturabilecek eylemleri aramak için sabit disk erişimi gibi sistem olaylarını izleyecektir. Olaylar, işletim sistemi işlevlerine yapılan çağrıları yakalayarak izlenir.

Sistem olaylarını izlemek dosya taramanın ötesinde bir adım olsa da, zararlı programlar bilgisayar yürütme ortamında çalışır ve bilgisayar için risk oluşturabilir. Emülasyon fikri, şüpheli kodu izole bir ortamda çalıştırmak, bilgisayar kaynaklarının görünümünü koda sunmak ve zararlı yazılımın belirtisi olan eylemleri aramaktır.

Sanallaştırma, emülasyonu bir adım öteye taşır ve şüpheli kodu gerçek bir işletim sistemi içinde yürütür. Bir dizi sanal işletim sistemi ana bilgisayar işletim sisteminin üzerinde çalışabilir. Zararlı yazılımlar sanal bir işletim sistemini bozabilir, ancak güvenlik nedenleriyle sanal bir işletim sisteminin bilgisayar işletim sistemine sınırlı erişimi vardır. Bir “**sandbox**”, belirli bir eylem talep edilmediği ve izin verilmediği sürece sanal ortamı bilgisayar ortamına müdahaleden izole eder. Buna karşılık, emülasyon şüpheli koda bir işletim sistemi sunmaz; kodun adım adım çalışmasına izin verilir, ancak kontrollü ve kısıtlı bir şekilde, sadece ne yapmaya çalışacağını keşfetmek için.

Casus yazılım önleme yazılımı, antivirüs yazılımının özel bir sınıfı olarak görülebilir. Geleneksel virüslerden biraz farklı olarak, casus yazılımlar sabit disk ve sistem dosyalarında çok sayıda değişiklik yapma konusunda özellikle zararlı olabilir. Virüs bulaşmış sistemler, muhtemelen belirli çerezler (Web siteleri tarafından hafızada tutmak amacıyla tarayıcıya yerleştirilen metin parçaları) de dahil olmak üzere çok sayıda yüklü casus yazılım programına sahip olma eğilimindedir.

#### 6- Spam Filtreleme

Her İnternet kullanıcısı spam e-postaya aşinadır. Spam’in tam bir tanımı üzerinde fikir birliği yoktur, ancak çoğu kişi spam’ın istenmeyen, toplu olarak gönderilen ve ticari nitelikte olduğu konusunda hemfikirdir. Ayrıca e-postaların büyük çoğunluğunun spam olduğu konusunda da fikir birliği vardır. Spam bir sorun olmaya devam etmektedir çünkü alıcıların küçük bir kısmı bu mesajlara yanıt vermektedir. Bu oran küçük olsa da, elde edilen gelir spam’i karlı hale getirmek için yeterlidir çünkü spam’i toplu olarak göndermenin maliyeti düşüktür. Özellikle büyük bir botnet hızlı bir şekilde muazzam miktarda spam üretebilir.

Yahoo! ve Hotmail gibi popüler Webmail hizmetlerinin kullanıcıları spam için cazip hedeflerdir çünkü adreslerinin tahmin edilmesi kolay olabilir. Buna ek olarak, spam gönderenler e-posta adreslerini çeşitli kaynaklardan toplarlar: Web siteleri, haber grupları, çevrimiçi dizinler, veri çalan virüsler vb. Spam gönderenler ayrıca müşteri bilgilerini satmak isteyen şirketlerden adres listeleri de satın alabilirler.

Spam, kullanıcılar için bir rahatsızlık ve ağ kaynaklarının israfından daha fazlasıdır. Spam, zararlı yazılımları dağıtmak ve zararlı Web sitelerine yönlendirmek için popüler bir araçtır. Kimlik avı saldırılarının ilk adımıdır.

Spam filtreleri kurumsal düzeyde ve kişisel düzeyde çalışır. Kurumsal düzeyde, e-posta ağ geçitleri gelen iletileri zararlı yazılımlara karşı tarayarak ve şüpheli veya sahte gönderenlerden gelen iletileri engelleyerek tüm bir kuruluşu koruyabilir. Kurumsal düzeydeki bir endişe, spam sanılan meşru mesajlar olan yanlış pozitiflerin oranıdır. Meşru postaları engellenen kullanıcılar üzülebilir. Neyse ki spam filtreleri genellikle özelleştirilebilir ve yanlış pozitiflerin oranı çok düşük hale getirilebilir. Kişisel düzeyde ek spam filtreleme, bireysel tercihleri hesaba katmak için filtrelemeyi daha da özelleştirebilir.

#### 7- Honeypots

Bir bal küpünün(honeypots) temel fikri, görünüşte savunmasız bir bilgisayara saldırıları çekerek saldırgan teknikleri hakkında bilgi edinmektir. Esasen bir savunma hattından ziyade bir adli tıp aracıdır. Bir bal küpü, başka yerlerde kullanılan saldırı yöntemleri veya gerçekleşmeden önce yakın saldırılar hakkında değerli bilgiler edinmek için kullanılabilir. Bal küpleri araştırma ve üretim ortamlarında rutin olarak kullanılmaktadır.

Bir bal küpünün normal bir bilgisayardan daha özel gereksinimleri vardır. İlk olarak, bir bal küpü meşru hizmetler veya trafik için kullanılmamalıdır. Sonuç olarak, bal küpü tarafından görülen her faaliyet gayrimeşru olacaktır. Örneğin, bal küpleri IDS’lere kıyasla genellikle az veri kaydetse de, IDS verilerinin büyük kısmı güvenlik açısından genellikle ilgi çekici değilken, verilerinde çok az “gürültü” vardır.

İkinci olarak, bir bal küpü tüm faaliyetleri izlemek ve kaydetmek için kapsamlı ve güvenilir yeteneklere sahip olmalıdır. Bir bal küpünün adli değeri, saldırılar hakkında yakalayabileceği ayrıntılı bilgilere bağlıdır.

Üçüncü olarak, bir bal küpü gerçek ağdan izole edilmelidir. Bal küplerinin saldırıları cezbetmesi amaçlandığından, bal küpünün ele geçirilmesi ve ağdaki daha fazla bilgisayara saldırmak için bir fırlatma rampası olarak kullanılması gibi gerçek bir risk vardır.

Honeypot’lar genellikle etkileşim düzeylerine göre düşükten yükseğe doğru sınıflandırılır. Honeyd gibi düşük etkileşimli balküpleri basit hizmetler sunar. Bir saldırgan balküpünü tehlikeye atmayı deneyebilir ancak elde edeceği fazla bir şey olmaz. Etkileşimlerin sınırlı olması, saldırganın bilgisayarın bir bal küpü olduğunu keşfetmesi riskini doğurur. Aralığın diğer ucunda, yüksek etkileşimli bal küpleri daha çok gerçek sistemler gibi davranır. Bir saldırganla etkileşime girmek ve etkinlikleri kaydetmek için daha fazla yeteneğe sahiptirler, ancak ele geçirildiklerinde daha fazla kazanç sağlarlar.

#### 8- Ağ Erişim Kontrolü (NAC — Network Access Control)

Savunmasız bir bilgisayar yalnızca kendisini değil tüm topluluğu riske atabilir. Öncelikle, savunmasız bir bilgisayar saldırıları üzerine çekebilir. Ele geçirilirse, ana bilgisayar diğer ana bilgisayarlara saldırı düzenlemek için kullanılabilir. Ele geçirilen bilgisayar saldırgana bilgi verebilir ya da bilgisayarlar arasında saldırgana yardımcı olabilecek güven ilişkileri olabilir. Her durumda, ağınızda zayıf korumalı bir bilgisayar olması istenmez.

![](https://cdn-images-1.medium.com/max/800/1*dJpeXIwbTsTpQForJQxrlw.png)

Network Access Control

Ağ erişim kontrolünün (NAC) genel fikri, bilgisayar güçlü bir güvenlik duruşu kanıtı sağlayamadığı sürece bir ana bilgisayarın bir ağa erişimini kısıtlamaktır. NAC süreci Şekilde gösterildiği gibi bilgisayarı, ağı (genellikle yönlendiriciler veya anahtarlar ve sunucular) ve bir güvenlik politikasını içerir.

Bazı uygulamalarda, bir yazılım aracısı bilgisayarda çalışır, bilgisayarın güvenlik duruşu hakkında bilgi toplar ve bunu ağa kabul talebinin bir parçası olarak ağa bildirir. Ağ, bir kabul kararı vermek üzere ana bilgisayarın güvenlik duruşunu güvenlik politikasıyla karşılaştırmak için bir politika sunucusuna başvurur.

Kabul kararı, retten kısmi kabule veya tam kabule kadar herhangi bir şey olabilir. Reddetme güncel olmayan antivirüs yazılımı, yama gerektiren bir işletim sistemi veya güvenlik duvarı yanlış yapılandırması nedeniyle gerçekleşebilir. Reddedilme, karantinaya (izole bir ağa yönlendirme) veya zorunlu düzeltmeye yol açabilir

### İzleme ve Tespit — Reaktif Yaklaşım

Önleyici tedbirler, reaktif yaklaşım, gereklidir ve saldırı riskini azaltmaya yardımcı olur, ancak tüm saldırıları önlemek pratikte imkansızdır. Hırsız alarmına benzer şekilde, kötü niyetli faaliyetleri tespit etmek ve teşhis etmek için izinsiz giriş tespiti de gereklidir. İzinsiz giriş tespiti esasen izleme, analiz ve yanıtın bir kombinasyonudur. Tipik olarak bir IDS, insan arayüzü ve görüntüleme için bir konsolu destekler. İzleme ve analiz genellikle pasif teknikler olarak görülür çünkü devam eden faaliyetlere müdahale etmezler. Tipik IDS yanıtı, daha fazla araştırmayı sürdürmeyi veya sürdürmemeyi seçebilecek sistem yöneticilerine bir uyarıdır. Başka bir deyişle, geleneksel IDS’ler, güvenlik olaylarının takip için insan uzmanlığına ve yargısına ihtiyaç duyduğu varsayımı altında, uyarıların ötesinde fazla yanıt sunmazlar.

IDS yaklaşımları en az iki şekilde kategorize edilebilir. Bir yol, algılamanın nerede yapıldığına bağlı olarak ana bilgisayar tabanlı ve ağ tabanlı IDS’leri ayırt etmektir. Bilgisayar tabanlı(Host-Based) bir IDS tek bir bilgisayarı izlerken, ağ tabanlı(Network-Based) bir IDS ağ paketleri üzerinde çalışır. IDS’leri görmenin bir başka yolu da analiz yaklaşımlarıdır. Geleneksel olarak, iki analiz yaklaşımı kötüye kullanım (imza tabanlı) tespiti ve anomali (davranış tabanlı) tespitidir.

![](https://cdn-images-1.medium.com/max/800/1*Sy2rKhp9DU3_9_5GeiFI0w.png)

Yanlış kullanım tespiti ve anomali tespiti

Şekilde gösterildiği gibi, bu iki görüş birbirini tamamlayıcı niteliktedir ve genellikle birlikte kullanılır.

Uygulamada, izinsiz giriş tespiti birkaç zorlukla karşı karşıyadır: imza tabanlı tespit yalnızca bilinen bir imzayla eşleşen olayları tanıyabilir; davranış tabanlı tespit normal davranışın anlaşılmasına dayanır, ancak “normal” büyük ölçüde değişebilir. Saldırganlar zeki ve kaçamaktır; saldırganlar IDS’yi parçalanmış, şifrelenmiş, tünellenmiş veya önemsiz paketlerle karıştırmaya çalışabilir; bir IDS bir olaya gerçek zamanlı olarak veya bir saldırıyı durduracak kadar hızlı tepki vermeyebilir; ve olaylar herhangi bir zamanda herhangi bir yerde meydana gelebilir, bu da çoklu dağıtılmış sensörlerin korelasyonu ile sürekli ve kapsamlı izleme gerektirir.

#### 1- Bilgisayar Tabanlı İzleme (Host-Based Monitoring)

Bilgisayar tabanlı IDS bir bilgisayarda çalışır ve şüpheli davranış belirtileri için sistem etkinliklerini izler. Örnekler, sistem Kayıt Defteri’ndeki değişiklikler, tekrarlanan başarısız oturum açma girişimleri veya bir arka kapının yüklenmesi olabilir. Ana bilgisayar tabanlı IDS’ler genellikle sistem nesnelerini, süreçleri ve bellek bölgelerini izler. Her sistem nesnesi için, IDS genellikle değişiklikleri tanımak için izinler, boyut, değişiklik tarihleri ve karma içerikler gibi öznitelikleri takip eder.

Bilgisayar tabanlı bir IDS için bir endişe, bir saldırgan tarafından olası kurcalamadır. Bir saldırgan bir sistemin kontrolünü ele geçirirse, IDS’ye güvenilemez. Bu nedenle, IDS’nin kurcalanmaya karşı özel koruması bir bilgisayarda tasarlanmalıdır.

Bilgisayar tabanlı bir IDS tek başına tam bir çözüm değildir. Bilgisayarı izlemek mantıklı olsa da, üç önemli dezavantajı vardır: görünürlük tek bir bilgisayarla sınırlıdır; IDS süreci kaynakları tüketir, muhtemelen bilgisayardaki performansı etkiler; ve saldırılar bilgisayara ulaşana kadar görülmeyecektir. Bilgisayar tabanlı ve ağ tabanlı IDS genellikle güçlü yönleri birleştirmek için birlikte kullanılır.

#### 2- Ağ Tabanlı İzleme (Network-Based/Traffic Monitoring)

Ağ tabanlı IDS’ler genellikle ağ paketlerini keşif, istismar, DoS saldırıları ve kötü amaçlı yazılım belirtileri için izler. Ana bilgisayar tabanlı IDS’leri tamamlayan güçlü yönleri vardır: ağ tabanlı IDS’ler bir ana bilgisayar popülasyonunun trafiğini görebilir; birden fazla ana bilgisayar tarafından paylaşılan kalıpları tanıyabilir; ve saldırıları ana bilgisayarlara ulaşmadan önce görme potansiyeline sahiptirler.

![](https://cdn-images-1.medium.com/max/800/1*Hpz_IDGuT1fn2cEHAG4EWg.png)

Çeşitli ağ bölgelerini izleyen IDS’ler.

IDS’ler Şekilde gösterildiği gibi farklı görünümler için çeşitli konumlara yerleştirilir. Güvenlik duvarının dışındaki bir IDS, İnternet’teki kötü niyetli faaliyetler hakkında bilgi edinmek için kullanışlıdır. DMZ’deki bir IDS, dış güvenlik duvarından geçerek genel sunuculara ulaşabilen İnternet kaynaklı saldırıları görecektir. Son olarak, özel ağdaki bir IDS, çevre güvenliğini başarıyla aşabilen saldırıları tespit etmek için gereklidir.

#### 3-Saldırı Önleme Sistemleri (IPS)

IDS’ler pasif tekniklerdir. Genellikle sistem yöneticisine daha fazla araştırma yapması ve uygun eylemi gerçekleştirmesi için bildirimde bulunurlar. Sistem yöneticisi meşgulse veya olayın araştırılması zaman alıyorsa yanıt yavaş olabilir.

Saldırı önleme sistemi (IPS) olarak adlandırılan bir varyasyon, bir IDS’nin geleneksel izleme ve analiz işlevlerini, bir saldırıyı engellemek için güvenlik duvarlarını otomatik olarak yeniden yapılandırmak gibi daha aktif otomatik yanıtlarla birleştirmeye çalışır. Bir IPS, insanların başarabileceğinden daha hızlı bir yanıt vermeyi amaçlar, ancak doğruluğu geleneksel IDS ile aynı tekniklere bağlıdır. Yanıt meşru trafiğe zarar vermemelidir, bu nedenle doğruluk kritik öneme sahiptir.

#### 4- Reaktif Önlemler

Bir saldırı tespit edilip analiz edildiğinde, sistem yöneticilerinin saldırıya uygun bir yanıt vermesi gerekir. Güvenlikteki ilkelerden biri, yanıtın tehditle orantılı olması gerektiğidir. Açıkçası, yanıt koşullara bağlı olacaktır, ancak çeşitli seçenekler mevcuttur. Genel olarak, kötü niyetli trafiği engellemek, yavaşlatmak, değiştirmek ya da yönlendirmek mümkündür. Her olası yanıtı tanımlamak mümkün değildir. Burada yalnızca iki yanıtı açıklayacağız: karantina ve geri izleme.

* **Karantina**: Bilgisayar güvenliğinde dinamik karantina, bulaşıcı hastalıklar için karantinaya benzer. Özellikle zararlı yazılım bağlamında, virüslü bir bilgisayarın diğer bilgisayarlara bulaşmasını önlemek uygun bir yanıttır.
* **Geri İzleme**: Bir saldırının kritik yönlerinden biri, failin kimliği veya konumudur. Ne yazık ki, IP ağlarında bir saldırganın bulunması neredeyse imkansızdır çünkü:   
  - IP paketlerindeki kaynak adresi kolayca taklit edilebilir (sahte)  
  - Yönlendiriciler tasarımları gereği iletilen paketlerin kaydını tutmazlar.  
  - Saldırganlar saldırılarını gerçekleştirmek için bir dizi aracı bilgisayar (zombiler olarak adlandırılır) kullanabilir.

Aracılar genellikle bir açık veya kötü amaçlı yazılım tarafından ele geçirilen ve saldırganın kontrolüne verilen masum bilgisayarlardır. Pratikte, bir saldırıyı en yakın aracıya kadar takip etmek mümkün olabilir, ancak bir saldırıyı gerçek saldırgana kadar takip etmeyi beklemek çok fazla olabilir.

### Defense in Depth

katmanları şöyle özetleyebiliriz:

* **Network Protection**: Firewalls, IPS/IDS, NDR. NAC
* **Application Protection**: WAF, Application Logs, Updates
* **Endpoint Protection**: Antivirus/Antimalware, Antiphishing/Mail Security, EPP, EDR, syslog/eventlog, Patching
* **Data Protection**: DLP, ACL

Hepsini toplayan bir de SIEM.

### Sonuç

Ağ izinsiz girişlerine karşı korunmak için, istismarlardan(exploit) zararlı yazılımlara ve sosyal mühendisliğe kadar çeşitli saldırıları anlamalıyız. Doğrudan saldırılar yaygındır, ancak kurbanları kötü niyetli bir Web sitesine çekmek için yemlere dayanan bir oltalama saldırıları sınıfı ortaya çıkmıştır. Oltalama saldırılarını ortaya çıkarmak ve bir şekilde bunlara karşı savunma yapmak çok daha zordur. Hemen hemen herkes mağdur olabilir.

Bilgisayarları güçlendirmek ve maruz kaldıkları riskleri azaltmak için çok şey yapılabilir, ancak bazı saldırılar kaçınılmazdır. Derinlemesine savunma, savunma katmanlarını birleştiren en pratik savunma stratejisidir. Her savunma katmanı kusurlu olsa da, davetsiz misafirler için maliyetin üstesinden gelmek daha zor hale gelir.

### Kaynakça

John R. Vacca — Network and System Security-Syngress (2010)