---
title: "Küresel Siber Tehdit Aktörleri: APT (Gelişmiş Kalıcı Tehditler)"
date: 2025-07-26
draft: false
---

---

### Küresel Siber Tehdit Aktörleri: APT (Gelişmiş Kalıcı Tehditler)

![](https://cdn-images-1.medium.com/max/800/1*-TdWFhjfQyoq9f--c4bfLw.png)

### Bölüm 1: Modern Tehdit Ortamına Giriş

Bu giriş bölümü, sonraki ayrıntılı aktör profillerini anlamak için gerekli temel kavramları oluşturacaktır. Modern bağlamda bir APT’nin ne anlama geldiğini tanımlayacak ve uygulayıcılar için temel zorluk olan tehdit aktörü adlandırma kurallarının kafa karıştırıcı ortamını ele alacaktır.

#### **1.1 Gelişmiş Kalıcı Tehdit (APT) Tanımı**

* **Temel Özellikler:** Bir APT, sadece bir kötü amaçlı yazılım değil, bir davetsiz misafirin hassas verileri çalmak amacıyla uzun süreli ve tespit edilemeyen bir varlık oluşturduğu sofistike, sürekli bir siber saldırı kampanyası olarak tanımlanacaktır. Temel nitelikleri şunlardır:
* **Gelişmiş** (tam spektrumlu istihbarat toplama teknikleri), **Kalıcı** (fırsatçı değil, belirli hedeflere yönelik) ve **Tehdit** (sadece otomatik araçlar değil, insan liderliğinde).
* **Motivasyonlar ve Hedefler:** APT’lerin temel hedefleri dört ana kategoriye ayrılır: Siber Casusluk (devlet sırlarının veya fikri mülkiyetin çalınması), e-Suç (finansal kazanç için), Hacktivizm ve Yıkım. Bu motivasyonlar genellikle politiktir veya ekonomiktir ve hükümet, savunma, finans ve sanayi gibi geniş bir sektör yelpazesini hedefler.
* **APT Yaşam Döngüsü:** Tipik saldırı zincirine kısa bir genel bakış sunulacaktır: ilk sızma (genellikle sosyal mühendislik yoluyla), genişleme (yetki yükseltme ve yanal hareket) ve sızdırma (veri hırsızlığı). Bu, ilerleyen bölümlerde ayrıntılı olarak ele alınacak olan TTP’leri (Taktikler, Teknikler ve Prosedürler) anlamak için bir zemin hazırlar.

#### **1.2 Atıflandırma ve Adlandırma Kurallarının Zorluğu**

* **“Babil Kulesi” Sorunu:** Bu alt bölüm, tehdit aktörleri için evrensel bir adlandırma standardının neden pratik olmadığını ve mümkün olmayabileceğini açıklayacaktır. Farklı güvenlik sağlayıcıları (Microsoft, CrowdStrike, Mandiant, Kaspersky, Palo Alto Networks vb.) kendi telemetrilerine, görünürlüklerine ve iç araştırma önceliklerine sahip olduklarından, benzersiz adlandırma şemaları geliştirirler. Bu durum, birden fazla kaynaktan gelen istihbaratı ilişkilendirmek zorunda olan savunucular için bir “Rosetta Taşı” sorunu yaratır.
* **Sağlayıcı Taksonomileri:** Okuyucunun karşılaşacağı takma adlar için zihinsel bir model sağlamak amacıyla başlıca sağlayıcı adlandırma şemalarının üst düzey mantığı tanıtılacaktır.
* **Microsoft:** Hava durumu temalı bir taksonomi kullanır. “Blizzard” (Rusya), “Typhoon” (Çin), “Sandstorm” (İran) ve “Sleet” (Kuzey Kore) gibi aile adları ulus-devlet kökenini belirtirken, “Tempest” finansal motivasyonlu aktörleri belirtir. Yeni keşfedilen faaliyetler “Storm” ve sayısal bir kodla belirtilir.
* **CrowdStrike:** Hayvan temalı bir kural kullanır. Ulus-devletler için ulusal hayvanlar kullanılır (“Bear” Rusya için, “Panda” Çin için, “Kitten” İran için, “Chollima” Kuzey Kore için). Finansal motivasyonlu gruplar “Spider”, hacktivistler ise “Jackal” olarak adlandırılır.
* **Mandiant (Google Cloud):** Tarihsel olarak sayısal bir sistem kullanır: devlet destekli casusluk grupları için “APT” (ör. APT28, APT29) ve finansal motivasyonlu aktörler için “FIN” (ör. FIN7). Kategorize edilmemiş gruplar “UNC” olarak adlandırılır.
* **Palo Alto Networks (Unit 42):** Göksel bir tema kullanır; motivasyonlar için takımyıldızlar (ör. finansal için “Libra”) ve ulus-devletler için mitolojik yaratıklar (ör. Rusya için “Ursa”, İran için “Serpens”) kullanılır.
* **Kaspersky:** Genellikle kötü amaçlı yazılım eserlerinden veya kampanya özelliklerinden türetilen adlar kullanır (ör. APT28 için “Sofacy”, Kuzey Koreli grup için “Lazarus”).
* **Endüstri İşbirliği:** Microsoft ve CrowdStrike arasında, düşman adlarını çözümlemek ve birbiriyle uyumlu bir haritalama oluşturmak için yapılan son stratejik ittifaka dikkat çekilecektir. Bu, tek bir standardın olası olmamasına rağmen, daha iyi bir korelasyonun endüstri hedefi olduğunu göstermektedir.

Farklı ve karmaşık adlandırma şemalarının varlığı, siber güvenlik endüstrisinin yapısını doğrudan yansıtır: her biri özel verilere sahip özel kuruluşlardan oluşan rekabetçi bir pazar. Bu parçalanma, zengin ve çeşitli istihbarat kaynağı olsa da, bu farklı akışları sentezlemek zorunda olan savunucular üzerinde doğal olarak operasyonel bir yük oluşturur. Bir Güvenlik Operasyon Merkezi (SOC) analisti için zorluk sadece teknik (tehdidi tespit etmek) değil, aynı zamanda analitiktir (tehdit hakkındaki istihbaratı ilişkilendirmek). Bu raporun temel değeri, bu analitik boşluğu dolduracak bir araç olarak hizmet etmektir.

![](https://cdn-images-1.medium.com/max/800/1*AKhTf6UJZmCzPzY3lZvMPw.png)

**Tehdit Aktörü Taksonomisi Rosetta Taşı**

Bu tablo, bir “Rosetta Taşı” görevi görerek, bir bakışta isim çakışmalarını çözme aracı sağlar. Bir Microsoft raporunda “Typhoon” aktörüyle karşılaşan bir kullanıcı, bunun Çin bağlantılı bir grup olduğunu anında anlayabilir ve CrowdStrike’dan gelen “Panda” raporlarıyla çapraz referans yapabilir. Bu, kullanıcının karmaşık istihbarat ortamında gezinmesini sağlar ve raporun geri kalanını daha anlaşılır ve kullanışlı hale getirir.

---

### Bölüm 2: Rusya Bağlantılı Tehdit Aktörleri

Bu bölüm, sofistike casusluk, yıkıcı yetenekler ve entegre “bilgi çatışması” doktrinleriyle tanınan Rusya Federasyonu’na atfedilen tehdit aktörlerini detaylandıracaktır.

#### **2.1 APT28 (Fancy Bear / Forest Blizzard)**

* **Takma Adlar:** Fancy Bear (CrowdStrike), Forest Blizzard, STRONTIUM (Microsoft), Sofacy (Kaspersky), Sednit (ESET), Pawn Storm (Trend Micro), IRON TWILIGHT (Secureworks), Tsar Team, Group 74, APT 28, G0007 ve daha fazlası dahil olmak üzere kapsamlı bir liste.
* **Atıflandırma ve Motivasyon:** Yüksek güvenle Rusya Genelkurmay Başkanlığı Ana İstihbarat Direktörlüğü’ne (GRU), özellikle 26165 numaralı birime atfedilir. Motivasyonları öncelikle askeri ve politik casusluk olup, Rus hükümetinin çıkarlarıyla uyumludur. Ekonomik kazanç için yaygın fikri mülkiyet hırsızlığı yapmıyor gibi görünmektedirler.
* **Hedef Profili:** Hedefleri arasında hükümet, askeri ve güvenlik kuruluşları, özellikle NATO ve Transkafkasya devletleri bulunmaktadır. Ayrıca savunma sektörü, enerji, medya, sivil toplum ve Dünya Anti-Doping Ajansı (WADA) ve Kimyasal Silahların Yasaklanması Örgütü (OPCW) gibi uluslararası kurumları da hedef almışlardır.
* **Operasyonel Özet ve TTP’ler:** En az 2004'ten beri aktif olan APT28, agresif ve yüksek etkili operasyonlarıyla tanınır.
* **Önemli Kampanyalar:** 2016'da Demokratik Ulusal Komite’nin (DNC) ele geçirilmesi , 2015'te Alman Federal Meclisi’ne (Bundestag) yapılan siber saldırı ve WADA’ya yönelik “hack-and-leak” (saldır ve sızdır) operasyonları. Şu anda Ukrayna’yı destekleyen lojistik ve teknoloji firmalarına karşı yaygın bir siber casusluk kampanyası yürütmektedirler.
* **İlk Erişim:** Kötü amaçlı bağlantılar veya ekler içeren hedefli oltalama (spear-phishing) saldırılarına , sahte web siteleri aracılığıyla kimlik bilgisi toplamaya ve özellikle e-posta sunucuları ve yönlendiriciler gibi halka açık uygulamaları istismar etmeye büyük ölçüde güvenirler.
* **Sızma Sonrası:** X-Agent, Zebrocy, Sofacy gibi özel kötü amaçlı yazılımlar ile Mimikatz, Cobalt Strike gibi halka açık araçların bir karışımını kullanırlar. Önemli bir TTP, çalınan verileri sızdırmak ve bilgi operasyonlarını ilerletmek için Guccifer 2.0 ve “Fancy Bears’ Hack Team” gibi “hacktivist” kimliklerini kullanmalarıdır, bu da onlara makul bir inkâr edilebilirlik sağlar.

#### **2.2 APT29 (Cozy Bear / Midnight Blizzard)**

* **Takma Adlar:** Cozy Bear (CrowdStrike), Midnight Blizzard, NOBELIUM (Microsoft), The Dukes, IRON HEMLOCK, UNC2452, APT29, G0016.
* **Atıflandırma ve Motivasyon:** Rusya Dış İstihbarat Servisi’ne (SVR) atfedilir. Temel motivasyonları, Rus devletine avantaj sağlayacak dış politika, diplomatik ve jeopolitik verileri toplamaya odaklanan uzun vadeli istihbarat toplama ve casusluktur.
* **Hedef Profili:** Avrupa ve NATO üyesi ülkelerdeki hükümet ağlarını, diplomatik kuruluşları, düşünce kuruluşlarını, araştırma enstitülerini ve BT hizmet sağlayıcılarını hedefler. Ayrıca COVID-19 aşı araştırmalarıyla ilgili kuruluşları da hedef almışlardır.
* **Operasyonel Özet ve TTP’ler:** En az 2008'den beri aktif olan APT29, gizliliği, sofistike taktikleri ve sabrıyla tanınır.
* **Önemli Kampanyalar:** 2015–2016 DNC sızması (APT28'den ayrı olarak yürütülmüştür) , 2020 SolarWinds tedarik zinciri saldırısı (UNC2452/NOBELIUM olarak izlenir) ve 2024'te Microsoft ve TeamViewer’a yönelik son saldırılar.
* **İlk Erişim:** Sofistike hedefli oltalama , tedarik zinciri sızmaları (SolarWinds) ve bulut hizmetlerine yönelik parola püskürtme (password spraying) gibi kimlik tabanlı saldırılar da dahil olmak üzere çok çeşitli ilk erişim vektörleri kullanırlar.
* **Sızma Sonrası:** Özel “Duke” ailesi kötü amaçlı yazılımlarıyla (MiniDuke, CozyDuke vb.) tanınırlar. Tespitten kaçmak için PowerShell ve meşru bulut yönetim araçlarını kullanarak “yerel araçları kullanma” (living off the land) tekniklerinden yoğun bir şekilde yararlanırlar. Önemli bir TTP, bulut ortamlarında kalıcılık ve yanal hareket için OAuth uygulamalarını ve çalınan belirteçleri (token) kötüye kullanmalarıdır.

#### **2.3 Sandworm (APT44)**

* **Takma Adlar:** APT44 (Mandiant), Seashell Blizzard (Microsoft), VOODOO BEAR, IRON VIKING, Telebots.
* **Atıflandırma ve Motivasyon:** GRU’nun 74455 numaralı Askeri Birimi’ne atfedilir. Sandworm, casusluk, saldırı ve etki operasyonlarının tam spektrumunda aktif olan dinamik ve olgun bir aktördür. Temel motivasyonları, özellikle yıkıcı ve tahrip edici saldırılar yoluyla Rusya’nın askeri ve politik hedeflerini desteklemektir.
* **Hedef Profili:** Öncelikle hükümet, savunma, ulaşım, enerji ve medya kuruluşlarını, özellikle Ukrayna ve Rusya’nın “yakın çevresi” üzerinde yoğunlaşarak hedefler. Ayrıca Batı seçim sistemlerini ve küresel kritik altyapıyı da hedeflerler.
* **Operasyonel Özet ve TTP’ler:** Tarihteki en önemli siber saldırılardan bazılarından sorumludur.
* **Önemli Kampanyalar:** 2015 ve 2016 Ukrayna elektrik şebekesi saldırıları, 2017 küresel NotPetya saldırısı ve 2018 Pyeongchang Olimpiyatları’nın sabote edilmesi. Şu anda Ukrayna’da silici (wiper) kötü amaçlı yazılımlar kullanarak yüksek yoğunluklu bir siber sabotaj kampanyası yürütmektedirler.
* **TTP’ler:** Yönlendiriciler ve VPN’ler gibi uç altyapıyı istismar etmekten tedarik zinciri sızmalarına kadar geniş bir ilk erişim vektörü yelpazesinden yararlanırlar. Yıkıcı silici kötü amaçlı yazılımlar dağıtmalarıyla tanınırlar ve son zamanlarda ABD ve Avrupa’daki kritik altyapıya yönelik saldırıların sorumluluğunu üstlenmek ve veri sızdırmak için “CyberArmyofRussia\_Reborn” gibi hacktivist kimlikleriyle ilişkilendirilmişlerdir.

#### **2.4 Gamaredon (Primitive Bear / Aqua Blizzard)**

* **Takma Adlar:** Primitive Bear (CrowdStrike), Aqua Blizzard (Microsoft), Armageddon, Shuckworm.
* **Atıflandırma ve Motivasyon:** Rusya Federal Güvenlik Servisi’ne (FSB) atfedilir. Temel motivasyonları siber casusluktur.
* **Hedef Profili:** Neredeyse tamamen Ukrayna hükümeti ve askeri kuruluşlarına odaklanmıştır.
* **Operasyonel Özet ve TTP’ler:** Büyük ölçekli hedefli oltalama kampanyalarıyla tanınan oldukça aktif ve kalıcı bir tehdit aktörüdür. Komuta ve kontrol (C2) iletişimleri için özel kötü amaçlı yazılımlar kullanır ve genellikle meşru yazılım ve hizmetlerden yararlanırlar.

GRU/SVR operasyonel ikilemi, bu grupların gözlemlenen TTP’lerinde ve hedeflemelerinde açıkça görülmektedir. Bir askeri istihbarat teşkilatı olan GRU’ya bağlı APT28 ve APT44, seçimlere müdahale ve yıkıcı saldırılar gibi taktiksel askeri ve politik hedeflerle uyumlu, agresif ve genellikle gürültülü operasyonlar yürütür. Buna karşılık, bir dış istihbarat teşkilatı olan SVR’ye bağlı APT29, geleneksel dış casuslukla uyumlu olarak diplomatik ve politika yapıcı kurumlardan stratejik istihbarat toplamak için uzun vadeli, gizli operasyonlara odaklanır ve daha fazla operasyonel güvenlik ve sabır gösterir. Bu ayrım, savunucuların tespit edilen gruba dayanarak düşmanın niyetini daha iyi tahmin etmelerini sağlar.

Ayrıca, Rusya bağlantılı aktörler, devlet hedefleri için e-suç altyapısını ve aktörlerini kullanma eğilimi göstermektedir. Bu, makul bir inkâr edilebilirlik sağlar ve daha geniş bir araç ve kaynak havuzuna erişim imkanı tanır. Örneğin, Rusya merkezli e-suç grubu SCULLY SPIDER tarafından işletilen DanaBot kötü amaçlı yazılımı, Rus askeri hedefleriyle uyumlu olarak Ukrayna Savunma Bakanlığı’na karşı DDoS saldırıları düzenlemek için kullanılmıştır. DOJ iddianamesi, DanaBot alt botnetlerinin casusluk amaçlı da kullanıldığını ortaya koymuştur ki bu, devlet faaliyetlerinin bir özelliğidir. Bu durum, Rusya’nın “bilgi çatışması” doktrini içinde devlet ve suç faaliyetleri arasındaki çizgileri kasıtlı olarak bulanıklaştıran bir stratejiyi ima eder ve Batılı uluslar için atıflandırmayı ve müdahaleyi karmaşıklaştırır.

---

### Bölüm 3: Çin Bağlantılı Tehdit Aktörleri

Bu bölüm, genellikle büyük ölçekli fikri mülkiyet hırsızlığı, geniş spektrumlu casusluk ve artan operasyonel karmaşıklık ile karakterize edilen Çin Halk Cumhuriyeti’ne atfedilen tehdit aktörlerini detaylandıracaktır.

#### **3.1 APT1 (Comment Crew)**

* **Takma Adlar:** Comment Crew, Shanghai Group, PLA Unit 61398.
* **Atıflandırma ve Motivasyon:** Halk Kurtuluş Ordusu (PLA) 61398 Birimi’ne atfedilir. Temel motivasyon, ekonomik kazanç ve fikri mülkiyet hırsızlığı için yapılan siber casusluktur.
* **Hedef Profili:** Savunma, havacılık ve teknoloji dahil olmak üzere geniş bir endüstri yelpazesi.
* **Operasyonel Özet ve TTP’ler:** Kamuoyuna açıklanan ilk APT’lerden biridir (2013'te Mandiant tarafından). Kurban ağlarında ortalama bir yıl kalma süresiyle uzun süreli sızmalarıyla tanınır. Mimikatz gibi özel kötü amaçlı yazılımlar ve halka açık araçlar kullanırlar.

#### **3.2 APT10 (Stone Panda / Red Apollo)**

* **Takma Adlar:** Stone Panda (CrowdStrike), Red Apollo, MenuPass, POTASSIUM (Microsoft), Cloud Hopper.
* **Atıflandırma ve Motivasyon:** Çin Devlet Güvenlik Bakanlığı’na (MSS), Tianjin Devlet Güvenlik Bürosu’na atfedilir. Motivasyon siber casusluktur.
* **Hedef Profili:** “Cloud Hopper” kampanyasında sağlık, savunma, havacılık ve yönetilen hizmet sağlayıcıları (MSP) dahil olmak üzere küresel olarak birden fazla sektörü hedefler.
* **Operasyonel Özet ve TTP’ler:** Müşterilerine erişim sağlamak için MSP’leri hedef alan tedarik zinciri saldırılarıyla tanınır. HAYMAKER, SNUGRIDE gibi özel kötü amaçlı yazılımların ve PowerShell, WMIExec gibi meşru araçların bir karışımını kullanır.

#### **3.3 APT41 (Winnti / Brass Typhoon)**

* **Takma Adlar:** BARIUM, WICKED PANDA, Winnti Group, Double Dragon (CrowdStrike/Mandiant), Brass Typhoon (Microsoft).
* **Atıflandırma ve Motivasyon:** Muhtemelen devlet yetkililerinin zımni onayıyla finansal motivasyonlu operasyonlar da yürüten Çin devlet destekli yükleniciler olduğuna inanılmaktadır. Bu, benzersiz bir çift amaçlı casusluk ve siber suç motivasyonu yaratır.
* **Hedef Profili:** Casusluk kampanyaları sağlık, telekomünikasyon ve yüksek teknoloji sektörlerini hedefler. Siber suç saldırıları, video oyunu endüstrisine (sanal para birimlerini manipüle etme) ve fidye yazılımı dağıtımına odaklanır.
* **Operasyonel Özet ve TTP’ler:** En az 2012'den beri aktif olan üretken ve sofistike bir aktördür. Arka kapılar, rootkitler ve kimlik bilgisi hırsızları da dahil olmak üzere 46'dan fazla farklı kötü amaçlı yazılım ailesinden oluşan geniş bir cephanelik kullanmalarıyla tanınırlar. İlk erişim için genellikle derlenmiş HTML (.chm) dosyaları içeren hedefli oltalama saldırılarına güvenirler.

#### **3.4 Diğer Önemli Çin Bağlantılı Gruplar:**

* **APT3 (Gothic Panda / Brocade Typhoon):** Havacılık, savunma ve teknolojiyi hedefler.
* **APT18 (Dynamite Panda / Wekby):** PLA Donanması ile bağlantılıdır, sağlık, ilaç ve biyoteknolojiyi hedefler.
* **APT27 (Emissary Panda / Linen Typhoon):** Orta Asya ve Avrupa’da hükümet ve savunma sektörlerini hedefler.
* **APT31 (Zirconium / Violet Typhoon):** Politik kuruluşları, savunma ve yüksek teknoloji sektörlerini hedefler.
* **APT40 (Leviathan / Gingham Typhoon):** Denizcilik endüstrilerini ve Çin’in Kuşak ve Yol Girişimi için stratejik olan sektörleri hedefler.

APT41'in profili, Çin siber operasyonlarında önemli bir eğilimi ortaya koymaktadır: kendi kâr amaçlı siber suçlarını yürütmelerine izin verilen devlet sözleşmeli aktörlerin kullanılması. Bu ikili amaçlı model, atıflandırmayı ve müdahaleyi karmaşıklaştırır. Bu durum, savunucular için, başlangıçta finansal motivasyonlu gibi görünen bir sızmanın (örneğin, bir oyun şirketini hedef alan fidye yazılımı) devlet destekli bir casusluk operasyonunun habercisi veya örtüsü olabileceği anlamına gelir. Bu, yalnızca ilk göstergelere dayanarak motivasyonun varsayılmadığı daha bütünsel bir olay müdahalesi yaklaşımını gerektirir.

Ek olarak, Çinli APT’lerin hedefleme kalıpları rastgele değildir; Kuşak ve Yol Girişimi (APT40) ve 5 yıllık ekonomik planlar (APT41'in fikri mülkiyet hırsızlığı) gibi Çin’in ulusal stratejik hedefleriyle sıkı bir şekilde uyumludur. Bu, jeopolitik/ekonomik politika ile siber operasyonlar arasında doğrudan bir bağlantı olduğunu göstermektedir. Bunun anlamı, kuruluşların Çin’in kamuya açık stratejik belgelerini analiz ederek proaktif tehdit modellemesi yapabileceğidir. Bir şirket, Çin’in kalkınması için öncelikli olarak belirlenen bir sektörde faaliyet gösteriyorsa, Çin bağlantılı bir APT için olası bir hedeftir.

### Bölüm 4: İran Bağlantılı Tehdit Aktörleri

Bu bölüm, sosyal mühendisliğe yoğun bir şekilde güvenmeleri, muhalifleri hedef almaları ve casusluk ile yıkıcı operasyonların bir karışımını kullanmalarıyla dikkat çeken İran’a atfedilen tehdit aktörlerini kapsayacaktır.

#### **4.1 APT33 (Elfin / Peach Sandstorm)**

* **Takma Adlar:** Elfin, Magnallium (Mandiant), HOLMIUM, Peach Sandstorm (Microsoft), Refined Kitten (CrowdStrike).
* **Atıflandırma ve Motivasyon:** En az 2013'ten beri aktif olan, şüpheli İran hükümeti destekli bir grup. Motivasyonları arasında siber casusluk ve potansiyel olarak kritik altyapıya yönelik yıkıcı operasyonlara hazırlanma bulunmaktadır.
* **Hedef Profili:** Öncelikle ABD, Suudi Arabistan ve Güney Kore’deki havacılık, enerji ve hükümet sektörlerini hedefler.
* **Operasyonel Özet ve TTP’ler:** Düşük maliyetli ilk erişim yöntemlerini özel yapım kötü amaçlı yazılımlarla birleştirir.
* **İlk Erişim:** Kötü amaçlı ekler (genellikle iş ilanı temalı) içeren hedefli oltalama saldırılarına ve parola püskürtmeye dayanır. Kamuoyuna açıklanmış güvenlik açıklarını (N-days) istismar ettikleri bilinmektedir.
* **Kötü Amaçlı Yazılım:** DROPSHOT ve SHAPESHIFT gibi özel kötü amaçlı yazılımların yanı sıra kötü şöhretli Shamoon veri silme yazılımını kullanır. Kimlik bilgisi dökümü için Mimikatz ve LaZagne gibi halka açık araçları da kullanırlar.

#### **4.2 APT34 (OilRig / Hazel Sandstorm)**

* **Takma Adlar:** OilRig, Helix Kitten (Kaspersky), Hazel Sandstorm, EUROPIUM (Microsoft), Crambus, IRN2.
* **Atıflandırma ve Motivasyon:** İran İstihbarat ve Güvenlik Bakanlığı (MOIS) ile bağlantılıdır. 2014'ten beri aktif olan motivasyonları, İran devlet çıkarlarıyla uyumlu siber casusluk ve istihbarat toplamadır.
* **Hedef Profili:** Finans, hükümet, enerji, kimya ve telekomünikasyon sektörlerini geniş bir şekilde hedef alır ve öncelikli olarak Orta Doğu’ya odaklanır.
* **Operasyonel Özet ve TTP’ler:** PowerShell tabanlı araçlar ve C2 için DNS tünelleme kullanmalarıyla tanınırlar.
* **Kampanyalar:** 2016 Helminth arka kapı kampanyası ve 2018 QUADAGENT dağıtımı önemli örneklerdir. Genellikle, birincil hedeflerine ulaşmak için daha az güvenli bir kuruluşu ele geçirerek tedarik zinciri saldırıları düzenlerler.
* **Kötü Amaçlı Yazılım:** Helminth ve QUADAGENT gibi özel arka kapılar kullanırlar. 2019'daki bir sızıntı, araç setlerinin önemli bir bölümünü ortaya çıkarmıştır.

#### **4.3 APT35/APT42 (Charming Kitten / Mint Sandstorm)**

* **Takma Adlar:** Charming Kitten, Phosphorus, Magic Hound (CrowdStrike), Mint Sandstorm (Microsoft), Agent Serpens (Palo Alto), Newscaster Team, TA453.
* **Atıflandırma ve Motivasyon:** İran Devrim Muhafızları Ordusu’na (IRGC) atfedilir. Temel motivasyonları, İran hükümeti için stratejik öneme sahip kişi ve kuruluşlara, özellikle muhaliflere ve rejimin düşmanlarına karşı gözetim ve bilgi toplamadır.
* **Hedef Profili:** Gazetecileri, araştırmacıları, akademisyenleri, insan hakları aktivistlerini, hükümet yetkililerini ve yurtdışındaki İran diasporasını hedefler.
* **Operasyonel Özet ve TTP’ler:** Sosyal mühendislik ve aldatma ustalarıdır.
* **Teknikler:** Kurbanlarla güven ve ilişki kurmak için sahte kimlikler ve web siteleri oluşturarak uzun vadeli, kaynak yoğun sosyal mühendislik kampanyaları yürütürler, ardından oltalama bağlantıları veya kötü amaçlı yazılımlar gönderirler. Tespitten kaçmak için ele geçirilmiş e-posta hesaplarını ve meşru bulut hizmetlerini C2 için kullanırlar. Bazı kampanyalarda fidye yazılımı da kullanmışlardır.

İranlı APT’ler, daha teknik odaklı Rus ve Çinli grupların aksine, sofistike ve uzun soluklu sosyal mühendislikte ustalık ve yoğun bir bağımlılık sergilemektedir. Sıfır gün (zero-day) açıklarını kullanmamalarını, psikolojik manipülasyona yaptıkları yatırımla telafi ederler. Birden fazla kaynak, Charming Kitten’ın (APT35/42) temel TTP’sinin bir saldırıdan önce uzun süreler boyunca güven ve ilişki kurmak olduğunu belirtmektedir. Bu, diğer devlet aktörlerinden görülen daha doğrudan hedefli oltalama veya güvenlik açığı istismarından farklıdır. Bu durum, İran’ın siber doktrininin, dijital alana uyarlanmış insan istihbaratı (HUMINT) tekniklerine öncelik verdiğini göstermektedir. Savunucular için bunun anlamı, yalnızca e-posta filtreleme gibi teknik kontrollerin yetersiz olduğudur. Güçlü bir savunma, sağlam bir kullanıcı güvenlik farkındalığı eğitimi ve ne kadar makul görünürse görünsün bilinmeyen kişilerin kimliğini doğrulama süreçleri gerektirir.

---

### Bölüm 5: Kuzey Kore Bağlantılı Tehdit Aktörleri

Bu bölüm, rejim için gelir elde etmek amacıyla devlet destekli casusluk ve büyük ölçekli mali suçları bir arada yürütme gibi benzersiz bir göreve sahip olan Kore Demokratik Halk Cumhuriyeti’ne (KDHC) atfedilen tehdit aktörlerini analiz edecektir.

#### **5.1 Lazarus Group (Diamond Sleet)**

* **Takma Adlar:** Diamond Sleet, ZINC (Microsoft), HIDDEN COBRA (ABD Hükümeti), Guardians of Peace, APT38 (Mandiant, finansal operasyonlar için).
* **Atıflandırma ve Motivasyon:** Keşif Genel Bürosu’na (RGB) atfedilen Kuzey Kore devlet destekli bir grup. Geleneksel casusluk ve uluslararası yaptırımları ihlal ederek yasadışı gelir elde etmek için kripto para hırsızlığı ve banka soygunları da dahil olmak üzere finansal motivasyonlu saldırılar gibi ikili bir motivasyona sahiptirler.
* **Hedef Profili:** Casusluk hedefleri arasında küresel olarak medya, savunma ve BT endüstrileri bulunmaktadır. Finansal hedefler arasında bankalar, finansal kurumlar ve kripto para borsaları ve kullanıcıları yer almaktadır.
* **Operasyonel Özet ve TTP’ler:** En az 2009'dan beri aktiftir.
* **Önemli Kampanyalar:** 2014 Sony Pictures saldırısı (Destover silici kötü amaçlı yazılımını kullanarak) , 2016 Bangladeş Bankası soygunu (SWIFT aracılığıyla 81 milyon dolar çalındı) , 2017 WannaCry fidye yazılımı saldırısı ve çok sayıda milyonlarca dolarlık kripto para soygunu.
* **TTP’ler:** Destover, Manuscrypt gibi geniş bir özel kötü amaçlı yazılım yelpazesi kullanırlar. İlk erişim için genellikle hedefli oltalama kullanırlar ve savunmadan kaçma ve yanal hareket konusunda ustadırlar. Finansal alt grupları olan Bluenoroff, finansal kurumlara yönelik son derece hedefli saldırılarda uzmanlaşmıştır.

#### **5.2 Kimsuky (Emerald Sleet / APT43)**

* **Takma Adlar:** Emerald Sleet (Microsoft), Velvet Chollima, Black Banshee (CrowdStrike), THALLIUM, APT43, TA406.
* **Atıflandırma ve Motivasyon:** Muhtemelen RGB’ye bağlı olan ve küresel istihbarat toplama göreviyle görevlendirilmiş bir Kuzey Kore APT grubu. Odak noktaları, Kore yarımadası, nükleer politika ve yaptırımlarla ilgili dış politika, ulusal güvenlik ve nükleer politika konularıdır. Ayrıca operasyonları finanse etmek için finansal motivasyonlu suçlara da karışırlar.
* **Hedef Profili:** Öncelikle Güney Kore, ABD, Japonya ve Avrupa’daki hükümet kuruluşlarını, düşünce kuruluşlarını, gazetecileri ve akademik uzmanları hedefler.
* **Operasyonel Özet ve TTP’ler:** En az 2012'den beri aktiftir.
* **Teknikler:** Kötü amaçlı bağlantılar veya ekler göndermeden önce ilişki kurmak için gazeteci veya akademisyen gibi davranarak sosyal mühendislik ve hedefli oltalama ustalarıdır. BabyShark gibi özel kötü amaçlı yazılımlar kullanır ve yürütme ve kalıcılık için PowerShell ve VBScript gibi meşru araçlardan yararlanırlar. Oltalama kampanyalarını geliştirmek için kötü amaçlı tarayıcı uzantıları kullandıkları ve yanlış yapılandırılmış DMARC politikalarını istismar ettikleri bilinmektedir.

#### **5.3 Diğer Önemli Kuzey Kore Bağlantılı Gruplar:**

* **APT45 (Andariel / Onyx Sleet):** Yine RGB ile bağlantılı, 2009'dan beri aktif olan orta düzeyde sofistike bir operatör. Savunma ve hükümete karşı casusluk yürütürler, ancak hastanelere karşı MAUI fidye yazılımının şüpheli kullanımı da dahil olmak üzere finansal motivasyonlu operasyonlara genişlemişlerdir.

Kuzey Kore’nin siber operasyonları, devlet casusluğunun büyük ölçekli suç girişimiyle en açık şekilde birleştiği noktayı temsil etmektedir. Diğer uluslarda e-suçun tolere edildiği veya fırsatçı bir şekilde kullanıldığı durumların aksine, KDHC için bu, yaptırımları aşmak ve devleti ile askeri ve nükleer programlarını finanse etmek için ulusal stratejisinin temel bir direğidir. Lazarus Grubu, Bangladeş Bankası soygunu gibi büyük finansal soygunlar ve yüz milyonlarca dolarlık sayısız kripto para hırsızlığıyla açıkça ilişkilidir. ABD hükümeti ve güvenlik firmaları, bu faaliyetlerin rejim için yasadışı gelir elde etme amaçlı olduğunu doğrudan belirtmektedir. Bu, sadece “suç” değil; devlet tarafından yönlendirilen finansal savaş ve dış politikalarının temel bir bileşenidir. Bunun anlamı, finans veya kripto para sektörlerindeki herhangi bir kuruluşun, sadece casusluk için değil, aynı zamanda doğrudan hırsızlık için de bir Kuzey Kore devlet aktörünün doğrudan hedefi olduğudur.

---

### Bölüm 6: Diğer Önemli Tehdit Aktörleri

Bu bölüm, daha eksiksiz bir küresel resim sunmak için araştırma materyalinde bahsedilen diğer önemli devlet destekli ve finansal motivasyonlu grupları kısaca ele alacaktır.

#### **6.1 Vietnam Bağlantılı: APT32 (OceanLotus)**

* **Takma Adlar:** OceanLotus, Canvas Cyclone (Microsoft).
* **Operasyonel Özet:** Vietnam’ın imalat, tüketim ürünleri ve konaklama sektörlerinde çıkarları olan yabancı şirketlere, yabancı hükümetlere ve siyasi muhaliflere karşı siber casusluğa odaklanan Vietnam devlet destekli bir grup.

#### **6.2 Finansal Motivasyonlu Aktörler (e-Suç)**

* **FIN7:** Restoran, oyun ve konaklama sektörlerindeki satış noktası (POS) sistemlerini hedef alarak ödeme kartı verilerini çalmakla tanınan sofistike ve üretken bir e-suç grubu.
* **SCATTERED SPIDER (Octo Tempest):** Özellikle telekomünikasyon ve BPO sektörlerindeki büyük şirketlere ilk erişim sağlamak için BT yardım masalarını hedef alan sosyal mühendislik saldırılarıyla tanınan son derece yetenekli bir e-suç grubu.

FIN7 ve SCATTERED SPIDER gibi finansal motivasyonlu gruplar tarafından kullanılan TTP’ler, giderek artan bir şekilde ulus-devletlerin kullandıklarına benzemektedir. Yüksek düzeyde operasyonel güvenlik, sosyal mühendislik uzmanlığı ve MFA gibi modern savunmaları atlatma yeteneği sergilemektedirler. SCATTERED SPIDER’ın sesli oltalama (vishing) ve yardım masası dolandırıcılığı kullanımı, sofistike bir sosyal mühendislik taktiğidir. Genel eğilim, sadece ulus-devletlerden değil, tüm tehdit aktörleri arasında kötü amaçlı yazılım içermeyen, kimlik tabanlı saldırılarda büyük bir artış olduğunu göstermektedir. Bu, bir zamanlar “gelişmiş” olarak kabul edilen araç ve tekniklerin artık standart e-suç oyun kitabının bir parçası olduğunu göstermektedir. Bunun anlamı, teknik ve savunma açısından “ulus-devlet” ile “üst düzey bir suçlu” arasında savunma yapma ayrımının giderek bulanıklaşmasıdır. Kuruluşlar, herhangi bir düşmanın sofistike, kimlik odaklı TTP’ler kullanabileceğini varsaymalıdır.

---

### Bölüm 7: Stratejik Görünüm ve Savunma Gereklilikleri

Bu sonuç bölümü, mevcut ve gelecekteki tehdit ortamına ilişkin üst düzey bir stratejik genel bakış sunmak için aktör profillerinden elde edilen bulguları sentezleyecektir.

#### **7.1 APT Ortamındaki Temel Eğilimler**

* **Kimliğin Önceliği:** Açık ve genel bir eğilim, kötü amaçlı yazılım merkezli saldırılardan kimlik tabanlı sızmalara doğru bir kaymadır. Düşmanlar, “kırmak” yerine “giriş yapmak” için oltalama, parola püskürtme ve sosyal mühendislik yoluyla geçerli kimlik bilgilerini ele geçirmeye odaklanmaktadır.
* **“Hacktivist” Kimliğinin Yükselişi:** Özellikle Rusya ve İran gibi ulus-devletler, makul inkâr edilebilirlik için bir araç olarak ve etki operasyonlarını güçlendirmek için sahte hacktivist gruplarını giderek daha fazla kullanmaktadır.
* **Tedarik Zinciri ve Güvenilir İlişkilerin Vektör Olarak Kullanılması:** APT29 (SolarWinds) ve APT10 (Cloud Hopper) gibi sofistike aktörler, çok sayıda aşağı akış hedefine erişim sağlamak için yazılım satıcılarını ve MSP’leri ele geçirmenin yüksek etkili potansiyelini göstermiştir.
* **Casusluk ve e-Suç Arasındaki Çizgilerin Bulanıklaşması:** APT41 (Çin) gibi grupların ikili görev profilleri ve tüm Kuzey Kore siber aygıtı, casusluk ve finansal kazanç motivasyonlarının artık birbirini dışlamadığını göstermektedir.

#### **7.2 Modern İşletmeler İçin Savunma Gereklilikleri**

* **Sıfır Güven Zihniyetini Benimseyin:** Kimlik ve “yerel araçları kullanma” odaklı saldırılar göz önüne alındığında, geleneksel çevre savunması artık geçerliliğini yitirmiştir. Savunmalar, “asla güvenme, her zaman doğrula” ilkesi üzerine inşa edilmelidir.
* **Kimlik Çevresini Güçlendirin:** Bu, oltalama saldırılarına dayanıklı Çok Faktörlü Kimlik Doğrulama (MFA) uygulanmasını, eski kimlik doğrulama protokollerinin ortadan kaldırılmasını ve sağlam Kimlik ve Erişim Yönetimi (IAM) ile Ayrıcalıklı Erişim Yönetimi (PAM) kontrollerinin uygulanmasını içerir.
* **Sofistike Tespit Mühendisliği Geliştirin:** Savunmalar, imza tabanlı tespitin ötesine geçmeli ve ele geçirilmiş hesaplarla ve meşru araçların kötü amaçlı kullanımıyla ilişkili anormal davranışları belirlemek için davranışsal analitik (UEBA) üzerine odaklanmalıdır.
* **Tehdit İstihbaratını Entegre Edin ve İlişkilendirin:** Adlandırma karmaşasının da gösterdiği gibi, kuruluşlar tek bir istihbarat kaynağına güvenemez. Temel bir yetenek, tehdit ortamının kapsamlı bir operasyonel resmini oluşturmak için birden fazla sağlayıcıdan gelen istihbaratı alma, ilişkilendirme ve çakışmaları çözme yeteneğidir.

---

APT grupları, uluslararası ilişkilerde ve ulusal güvenlikte kalıcı ve dinamik bir tehdit unsuru olmaya devam etmektedir. Bu tehditlere karşı koymak, yalnızca teknik savunma mekanizmaları kurmayı değil, aynı zamanda aktörlerin motivasyonlarını, stratejik hedeflerini ve gelişen taktiklerini anlamayı gerektiren derinlemesine ve sürekli bir tehdit istihbaratı çalışması gerektirmektedir.