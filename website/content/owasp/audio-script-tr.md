Yazılım geliştirme ekosistemi genişledikçe ve monolitik yapılardan bulut-doğal, mikroservis tabanlı ve yapay zekâ destekli mimarilere evrildikçe, tehdit yüzeyleri de benzeri görülmemiş bir hızla parçalanmaktadır. Tek başına geleneksel web güvenlik kontrolleri, modern sistemleri korumakta yetersiz kalmaktadır. Açık dünya uygulama güvenliği ekosisteminin en kritik referansı konumundaki OWASP (Open Worldwide Application Security Project) vakfı, bu karmaşık tehdit manzarasını yönetilebilir kılmak amacıyla farklı teknolojik katmanlara özel farkındalık projeleri geliştirmektedir.

Bu yazı, uygulama güvenliğinin parametre doğrulamaya dayalı basit girdi/çıktı kontrollerinden (Input Validation), dağıtık mimarilerde kimlik ve yetki yönetimine (Access Control), yazılım tedarik zinciri bütünlüğüne (Supply Chain Integrity) ve otonom çalışan yapay zekâ ajanları ile insan dışı kimliklerin (Non-Human Identities - NHI) güvenliğine doğru köklü bir paradigma değişimi yaşadığıdır. Aşağıda, modern yazılım mimarilerinde yer alan başlıca on OWASP projesi ile en yeni sınırları temsil eden Ajan Güvenliği ve İnsan Dışı Kimlikler (NHI) girişimlerinin kapsamlı bir kıyaslaması sunulmaktadır.

Bölüm: OWASP Metodolojisi, Veri Analitiği ve Katmanlı Tehdit Modelleri

OWASP’ın geleneksel listelerinden modern veri odaklı analizlerine geçişi, yazılım güvenliği disiplininin olgunlaşmasını simgelemektedir. Erken dönem listeleri (2003–2010) büyük ölçüde kısıtlı uzman görüşü ve sınırlı zafiyet veri setlerine dayanırken, günümüz metodolojisi devasa veri çağrıları (data call), endüstri genelindeki CVE analizleri ve CWE (Common Weakness Enumeration) eşlemeleri üzerine kuruludur.

Örneğin, en son yayınlanan Web Top 10 (2025) sürümünde metodoloji, 2.8 milyondan fazla uygulamadan elde edilen veriler ile 589 farklı CWE sınıfının analizine dayanmaktadır. Bu yeni dönemde kullanılan "vaka oranı" (incidence rate) metriği, otomatik tarama araçlarının aynı bulguyu binlerce kez tekrarlayarak veriyi manipüle etmesini engeller. Bu metrik, bir zafiyetin incelenen uygulamalarda en az bir kez görülme yüzdesini esas almaktadır. Topluluk anketleri ise verilerde düşük frekansta görünen ancak etkisi ve sömürülebilirliği aşırı yüksek olan riskleri (örneğin Yazılım Tedarik Zinciri Açıkları veya SSRF) listelere dahil etmek amacıyla hibrit bir modelde dengeleyici rol oynamaktadır.

Bölüm Detayı: Katmanlı Tehdit Modelleri ve Domain Çeşitliliği

Güvenlik ekiplerinin yaptığı en büyük hatalardan biri, Web Top 10 listesini tüm yazılım ekosistemine tek tip bir şablon olarak uygulamaya çalışmaktır. Oysa her teknoloji katmanının mimari tasarımı, güven sınırları ve saldırı yüzeyi kökten farklıdır.

Web uygulamalarında temel güven sınırı tarayıcı ve sunucu arasındayken ve zafiyetler genellikle sunucu kaynaklı kod hatalarından türetilirken; mobil uygulamalarda saldırgan, cihaz üzerinde tam fiziksel ve yönetimsel (root/jailbreak) kontrole sahiptir. Bu durum, mobil güvenlik modelinde ikili dosya (binary) korumasını, statik şifreleme anahtarlarının ifşasını engellemeyi ve istemci tarafındaki güvenli depolama gereksinimlerini öncelikli hale getirir. API dünyasında ise kullanıcı arayüzü ortadan kalktığı için saldırganlar doğrudan arka plandaki veri modellerini ve iş mantıklarını (business logic) hedef alırlar. API'lere yönelik saldırıların büyük kısmı meşru HTTP protokolleri ve normal veri akışları içerisinde gerçekleştiğinden, geleneksel WAF sistemlerinin bunları tespit etmesi zordur. Bu nedenle API projeleri, nesne ve fonksiyon düzeyindeki yetkilendirme doğrulama hatalarına odaklanmaktadır.

Bölüm: Web Uygulama Güvenliği (OWASP Web Top 10)

Bölüm Detayı: Stratejik Değerlendirme, Tarihsel Evrim ve Kritik Risk Detayları

Web güvenliği tehditleri son yirmi yılda radikal bir biçimde evrilmiştir. 2000'lerin başında en büyük tehdit olan enjeksiyonlar (SQL Injection, Cross-Site Scripting - XSS) gibi girdi filtreleme hataları, günümüzde modern yazılım çatılarının (React, Angular, Spring, Django) sunduğu yerleşik parametreli sorgular ve otomatik çıktı kodlama mekanizmaları sayesinde gerilemiştir. Nitekim 2017 yılında listenin zirvesinde yer alan enjeksiyonlar, 2021'de üçüncülüğe, 2025'te ise beşinciliğe düşmüştür.

Buna karşın, monolitik yapılardan mikroservislere ve tek sayfalık uygulamalara (SPA) geçiş, yetkilendirme mantığının sunucudan istemciye ve dağıtık servislere kaymasına neden olmuştur. Bu durum, otomatik araçlarla tespiti son derece zor olan Erişim Kontrolü İhlalleri'ni (Broken Access Control) 2021 ve 2025 sürümlerinde tartışmasız liderliğe taşımıştır. Modern web güvenliği artık yalnızca girdiyi temizlemekle değil, karmaşık yetki matrislerini yönetmek ve yazılım tedarik zincirinin (SBOM ve üçüncü taraf paket bütünlüğü) güvenliğini sağlamakla tanımlanmaktadır.

Bölüm: API Güvenliği (OWASP API Security Top 10)

Bölüm Detayı: Stratejik Değerlendirme, Tarihsel Evrim ve Kritik Risk Detayları

API'ler modern mikroservis mimarilerinin ve mobil uygulamaların can damarı haline gelmiştir. Geleneksel web uygulamalarından farklı olarak, API'lerde sunum katmanı (HTML/CSS) bulunmaz; istemci ve sunucu doğrudan JSON/XML formatında veri takas eder. Bu durum, saldırı yüzeyini veri modellerine ve iş mantığına (business logic) indirgemiştir. 2019 yılında yayınlanan ilk listeyle API'lere özel tehditler tanımlanmış, 2023 yılında ise API ekosisteminin olgunlaşmasıyla liste güncellenmiştir.

2023 güncellemesi, zafiyetlerin teknik kod hatalarından ziyade mantıksal tasarım hatalarına kaydığını doğrulamaktadır. Örneğin, aşırı veri ifşası (Excessive Data Exposure) ve toplu atama (Mass Assignment) gibi zafiyetler, nesnelerin alt özelliklerine yönelik yetersiz kontrollerden kaynaklandığı için "Broken Object Property Level Authorization (BOPLA)" altında birleştirilmiştir. API dünyasında geleneksel WAF (Web Application Firewall) çözümleri yetersiz kalmaktadır; çünkü saldırganlar genellikle meşru HTTP istekleri ve geçerli tokenlar kullanarak sistemi suistimal etmektedir. Dolayısıyla, API güvenliği tamamen "istek bağlamına uygun nesne seviyesinde yetkilendirme" (BOLA/IDOR) kontrollerine dayanmaktadır.

Bölüm: Mobil Uygulama Güvenliği (OWASP Mobile Top 10)

Bölüm Detayı: Stratejik Değerlendirme, Tarihsel Evrim ve Kritik Risk Detayları

Mobil cihazlar (iOS ve Android), geleneksel web platformlarından tamamen farklı bir güvenlik mimarisine sahiptir. Mobil güvenlikte en kritik kabul, saldırganın cihaz üzerinde tam fiziksel ve yönetimsel (root/jailbreak) kontrole sahip olduğu gerçeğidir. Bu durum, tarayıcı güvenliği veya sunucu tarafı kontrollerinden ziyade, istemci tarafındaki binary dosyanın (APK/IPA) korunmasını öncelikli kılmaktadır. 2016 sürümünden sonra uzun bir süre güncellenmeyen Mobile Top 10, mobil ekosistemdeki büyük değişimlerin (hibrit frameworkler, OAuth entegrasyonları, biyometrik doğrulamalar) ardından 2024 yılında tamamen yenilenmiştir.

2024 listesinde en dikkat çekici değişim, "Hatalı Kimlik Bilgisi Kullanımı" (Improper Credential Usage - M1) kategorisinin birinci sıraya yerleşmesidir. Geliştiriciler, mobil uygulamanın kaynak kodunun tersine mühendislikle kolayca çözülebileceğini unutarak kodun içine AWS anahtarlarını, Firebase veritabanı şifrelerini veya API sırlarını sabit (hardcoded) olarak gömmektedir. Saldırganlar bu dosyaları açıp sırları saniyeler içinde çalabilmektedir. Ayrıca, mobil uygulamalarda kullanılan kütüphanelerin denetimsizliği (M2: Inadequate Supply Chain Security) ve kişisel verilerin cihaz loglarına veya güvensiz depolama alanlarına yazılması (M6: Inadequate Privacy Controls) modern regülasyonlar (KVKK, GDPR) çerçevesinde en kritik mobil riskler haline gelmiştir.

Bölüm: Yapay Zekâ ve Büyük Dil Modelleri Güvenliği (OWASP LLM Top 10)

Bölüm Detayı: Stratejik Değerlendirme, Tarihsel Evrim ve Kritik Risk Detayları

Üretken Yapay Zekâ (Generative AI) ve Büyük Dil Modellerinin (LLM) kurumsal yazılımlara hızla entegre edilmesi, güvenlik dünyasında yepyeni bir tehdit alanı yaratmıştır. LLM uygulamaları, deterministik (belirli girdiye belirli çıktı veren) yazılımlardan farklı olarak olasılıksal (probabilistic) çalışır. Bu durum, veri kanalı ile talimat kanalının (data vs. instruction channel) aynı sözel arayüzde birleşmesine yol açmıştır. İlk kez 2023 yılında yayınlanan LLM Top 10 listesi, AI entegrasyonlarının otonom ajanlara ve RAG (Retrieval-Augmented Generation) mimarilerine dönüşmesiyle 2025 yılında güncellenmiştir.

2025 sürümünde en dikkat çeken değişim, "Hassas Bilgi İfşası" (Sensitive Information Disclosure - LLM02) riskinin ikinci sıraya yükselmesidir. Kurumlar, veritabanlarını ve dahili dokümanlarını RAG sistemleri üzerinden LLM'lere bağlamaktadır. Ancak, model kullanıcının yetkisini denetlemeden, normalde erişemeyeceği departman sırlarını veya finansal verileri prompt yanıtlarında ifşa edebilmektedir. Ayrıca, AI sistemlerinin otonom olarak eyleme geçmesini sağlayan ajan mimarileri, "Aşırı Yetkilendirilmiş Ajanlar" (Excessive Agency - LLM06) riskini doğurmuştur. Saldırganlar, prompt enjeksiyonları vasıtasıyla ajana tanımlanmış veri silme, e-posta gönderme veya API tetikleme yetkilerini kötüye kullanabilmektedir. LLM güvenliği artık yalnızca prompt filtrelemekten ibaret değildir; modelin çıktılarını denetleyen ve ajanların yetki sınırlarını çizen katı bir mimari kontrol gerektirmektedir.

Bölüm: Makine Öğrenimi Güvenliği (OWASP ML Security Top 10)

Bölüm Detayı: Stratejik Değerlendirme, Tarihsel Evrim ve Kritik Risk Detayları

Makine Öğrenimi (ML) Güvenliği projesi, LLM gibi uygulama katmanı entegrasyonlarından farklı olarak, doğrudan modellerin matematiksel, istatistiksel ve algoritmik yapısındaki zayıflıkları hedefler. Geleneksel denetimli (supervised) ve denetimsiz (unsupervised) öğrenme modelleri (CNN, SVM, regresyon modelleri), verilerin istatistiksel dağılımları üzerine kuruludur. Saldırganlar bu modellerin karar sınırlarını (decision boundaries) manipüle ederek sistemleri yanıltmayı hedefler.

ML dünyasındaki en kritik paradigma değişimi, saldırıların kod enjeksiyonundan "veri manipülasyonuna" kaymasıdır. Örneğin, otonom bir aracın kamera sistemindeki trafik levhası tanıma modelini yanıltmak amacıyla levha üzerine yapıştırılan küçük, insan gözüyle fark edilemeyen bir gürültü (adversarial perturbation), modelin levhayı "hız sınırı" yerine "dur tabelası" olarak algılamasına yol açar. Bu istatistiksel manipülasyonlar (ML01) ve eğitim veri setinin zehirlenmesi (ML02), geleneksel yazılım güvenlik araçlarıyla (SAST/DAST) asla tespit edilemez. ML güvenliği; modellerin matematiksel olarak savunulmasını (adversarial training), girdi verilerinin parazitlerden arındırılmasını ve serileştirilmiş model dosyalarının güvenliğini sağlamayı gerektirir.

Bölüm: Kubernetes Güvenliği (OWASP Kubernetes Top 10)

Bölüm Detayı: Stratejik Değerlendirme, Tarihsel Evrim ve Kritik Risk Detayları

Bulut-doğal (cloud-native) mimarilerin yaygınlaşması, mikroservislerin orkestrasyonu için Kubernetes'i (K8s) endüstri standardı haline getirmiştir. Kubernetes güvenliği, geleneksel sunucu güvenliğinin çok ötesinde, dinamik çalışma zamanı (runtime), konteyner izolasyonu ve bulut entegrasyonu katmanlarını kapsar. İlk kez 2022'de yayınlanan K8s Top 10 listesi, orkestrasyon güvenliğindeki olgunlaşma ve tehditlerin evrimi doğrultusunda 2025 yılında güncellenmiştir.

2025 sürümünde göze çarpan en büyük trend, tehditlerin küme içi (in-cluster) konfigürasyonlardan "Kümeden Buluta Yanal Hareket" (Cluster-to-Cloud Lateral Movement - K08) alanına kaymasıdır. Bulut sağlayıcıları (AWS, GCP, Azure) üzerinde çalışan Kubernetes kümelerinde podlar, node'a atanan geçici bulut kimlik bilgilerine erişebilmektedir. Saldırganlar bir podu ele geçirdiklerinde, bu IAM kimlik bilgilerini çalarak Kubernetes sınırlarından çıkmakta ve doğrudan şirketin tüm bulut altyapısını ele geçirmektedir. Bu nedenle, K8s güvenliği artık yalnızca RBAC (Role-Based Access Control) sıkılaştırmasıyla sınırlı değildir; podların bulut metadata servislerine erişimini kısıtlayan ve orkestrasyon ile bulut sağlayıcı arasındaki sınırları çizen entegre bir mimari gerektirmektedir.

Bölüm: CI/CD Pipeline Güvenliği (OWASP CI/CD Security Risks)

Bölüm Detayı: Stratejik Değerlendirme, Tarihsel Evrim ve Kritik Risk Detayları

Yazılım teslimat süreçlerinin otomasyona dökülmesi, kodun hızla yayına alınmasını sağlarken siber saldırganlar için de en çekici hedef haline gelmiştir. CI/CD (Continuous Integration / Continuous Deployment) süreçleri, yazılım tedarik zincirinin merkezinde yer alır. Geleneksel güvenlik yaklaşımları üretim ortamındaki sunucuları korumaya odaklanırken; SolarWinds ve Codecov gibi büyük siber saldırılar, derleme (build) sunucularının ve pipeline araçlarının (Jenkins, GitLab CI, GitHub Actions) sömürülmesinin ne kadar yıkıcı olabileceğini göstermiştir. 2022 yılında yayınlanan CI/CD Security Risks projesi, bu alandaki ilk standart tehdit çerçevesini oluşturmuştur.

CI/CD güvenliğinde en büyük risk, pipeline konfigürasyonlarının (örneğin .github/workflows/deploy.yml veya Jenkinsfile) geliştiriciler tarafından kod repolarında yönetilmesidir. Saldırganlar, kod reposuna veya bir geliştirici hesabına erişim sağladıklarında, bu konfigürasyon dosyalarını değiştirerek derleme sunucularında (runners) kendi kötü niyetli komutlarını çalıştırabilirler (Poisoned Pipeline Execution - CICD-SEC-4). Bu durum, derleme sunucusunun hafızasında veya ortam değişkenlerinde duran üretim ortamına ait AWS gizli anahtarlarının veya API şifrelerinin çalınmasıyla sonuçlanmaktadır. CI/CD güvenliği; pipeline üzerinde katı akış kontrolleri (PR onay mekanizmaları), derleme sunucularının izolasyonu ve üretilen paketlerin dijital imzalarla doğrulanmasını gerektirir.

Bölüm: Veri Gizliliği Güvenliği (OWASP Privacy Risks)

Bölüm Detayı: Stratejik Değerlendirme, Tarihsel Evrim ve Kritik Risk Detayları

Kişisel Verilerin Korunması Kanunu (KVKK), GDPR (General Data Protection Regulation) ve CCPA gibi küresel regülasyonlar, kişisel verilerin korunmasını yasal bir zorunluluk haline getirmiştir. Ancak veri gizliliği, yalnızca hukuk departmanlarının hazırladığı sözleşmelerle sağlanamaz; doğrudan yazılım mimarisi seviyesinde mühendislik çözümleri gerektirir. 2014 yılında yayınlanan ilk listenin ardından, veri ekonomisinin büyümesi ve kullanıcı haklarının (veri silme talepleri, rıza yönetimi) önem kazanması üzerine Privacy Risks projesi 2021 yılında (v2.0) güncellenmiştir.

Gizlilik güvenliğinde en büyük teknik zorluk, verilerin toplanması aşamasındaki kontrolsüzlük ve veri silme taleplerinin (Right to be Forgotten) teknik olarak tam uygulanamamasıdır. Kurumlar, kullanıcının hesabını sildiğinde veritabanındaki ana kullanıcı tablosundan kaydı silmekte; ancak o kullanıcıya ait verilerin yedekleme sunucularında, ilişkisel veri tablolarında, analitik araçlarında veya uygulama log dosyalarında kalmaya devam etmesini engellememektedir (P6: Insufficient Deletion of User Data). Ayrıca, uygulamaların her işlem için kullanıcının karşısına rıza onay pencereleri çıkarması, kullanıcıda "onay yorgunluğuna" (consent fatigue - P4) yol açmakta ve rızanın bilinçli verilmesini engellemektedir. Veri gizliliği; veri minimizasyonu, tasarım yoluyla gizlilik (privacy-by-design) ve veri silme akışlarının otomatikleştirilmesini gerektirir.

Bölüm: Sunucusuz Mimari Güvenliği (OWASP Serverless Top 10)

Bölüm Detayı: Stratejik Değerlendirme, Tarihsel Evrim ve Kritik Risk Detayları

Sunucusuz (Serverless) mimari, altyapı yönetiminin (sunucu güncelleme, işletim sistemi sıkılaştırma) tamamen bulut sağlayıcıya (AWS Lambda, Google Cloud Functions vb.) devredildiği ve kodun olay-tetiklemeli (event-driven) mikro fonksiyonlar (FaaS - Function-as-a-Service) olarak çalıştığı modern bir yaklaşımdır. Bu mimaride, işletim sistemi seviyesindeki güvenlik yamaları gibi sorumluluklar bulut sağlayıcıya ait olsa da, uygulama seviyesindeki kod ve yapılandırma güvenliği tamamen geliştiricinin sorumluluğundadır (Shared Responsibility Model). 2018 yılında yayınlanan Serverless Top 10 yorumlama dokümanı, FaaS mimarilerinin getirdiği yeni güven sınırlarını ele almaktadır.

Serverless dünyasında en büyük risk, fonksiyonların tetiklendiği olay kaynaklarının (event sources) çeşitliliği ve bu fonksiyonlara atanan aşırı yetkili IAM rolleridir. Geleneksel uygulamalarda girdi yalnızca HTTP istekleri üzerinden gelirken; serverless fonksiyonlar bir S3 kova dosya yüklemesiyle, bir veritabanı loguyla veya bir IoT cihaz mesajıyla tetiklenebilir. This situation pushes event data injection to new scales. Ayrıca, geliştiriciler kolaylık olsun diye fonksiyonlara tüm bulut kaynaklarına erişebilen geniş IAM rolleri (Over-privileged IAM Roles) atamaktadır. Saldırgan tek bir fonksiyona sızdığında, bu rolü kullanarak şirketin tüm AWS hesabını ele geçirebilir. Serverless güvenliği; katı least-privilege IAM rollerinin tanımlanmasını, olay verilerinin doğrulanmasını ve "Denial of Wallet" riskine karşı bütçe limitlerinin kurulmasını gerektirir.

Bölüm: Düşük Kod/Kodsuz Platform Güvenliği (OWASP Low-code / No-code Risks)

Bölüm Detayı: Stratejik Değerlendirme, Tarihsel Evrim ve Kritik Risk Detayları

Düşük Kod/Kodsuz (Low-code/No-code - LCNC) platformları (Microsoft PowerApps, Retool, Mendix vb.), yazılım geliştirme yetkinliği olmayan iş birimlerinin (citizen developers - vatandaş geliştiriciler) görsel arayüzler ve hazır bileşenler kullanarak hızlıca uygulamalar geliştirmesini sağlamaktadır. Bu durum iş süreçlerini hızlandırırken, kurumsal bilgi güvenliği ekiplerinin denetimi dışında kalan devasa bir "Gölge BT" (Shadow IT - LCNC-SEC-09) tehdidi yaratmaktadır. 2022 yılında yayınlanan LCNC Risks projesi, bu yeni ekosisteme özel mimari ve idari zafiyetleri ele almaktadır.

LCNC platformlarındaki en büyük güvenlik riski, kullanıcıların platformların sunduğu hazır veri bağlayıcıları (connectors) üzerinden kurumsal veritabanlarını internete kontrolsüzce açmasıdır. Yazılım güvenliği eğitimi almamış bir iş analisti, geliştirdiği uygulamada girdi kontrolleri yapmayarak SQL Injection (LCNC-SEC-06) açıklarına neden olabilir veya platformun varsayılan paylaşım ayarlarını "herkese açık" bırakarak hassas verileri sızdırabilir (LCNC-SEC-05). Ayrıca, bu platformların pazar yerlerinden (marketplace) indirilen doğrulanmamış şablonlar ve eklentiler (LCNC-SEC-07), kurumsal ağlara sızmak için yeni bir tedarik zinciri vektörü oluşturmaktadır. LCNC güvenliği; platform düzeyinde katı veri kaybı önleme (DLP) politikalarının uygulanmasını, envanter takibini ve citizen developer'ların güvenlik farkındalığının artırılmasını gerektirir.

Bölüm: Domainler Arası Karşılaştırma ve Yanal Hareket Senaryosu

Güvenlik ekiplerinin yaptığı en büyük hatalardan biri, zafiyetleri izole alanlar olarak değerlendirmektir. Modern siber saldırganlar, tek bir zafiyeti sömürmek yerine sistemler arasındaki mimari geçişleri kullanarak yanal hareket (lateral movement) yapmaktadır. Bu senaryonun en tipik örneği, CI/CD pipeline'ından başlayarak Kubernetes kümesine, oradan da tüm bulut altyapısına uzanan saldırı zinciridir.

Bölüm Detayı: Entegre Karşılaştırma ve Yanal Hareket Analizi

Aşağıdaki etkileşimli panelde, mimari yapıları ve çalışma prensipleri açısından sıkça karıştırılan kritik OWASP projelerinin karşılaştırmalarını inceleyebilirsiniz.

Web vs API vs Mobile
LLM vs ML Security
CI/CD vs Kubernetes
Serverless vs LCNC

WEB vs API vs MOBILE
Sınır ve Yetkilendirme Farkları
Web uygulama güvenliği, sunucu tarafındaki oturumlar (session) ve tarayıcı politikaları (CORS, CSP) etrafında şekillenir. API güvenliğinde ise durum tamamen değişir; oturum bilgisi yerini her istekte doğrulanan token bazlı mimariye (OAuth, JWT) bırakır. API'lerde en sık görülen hata, veri tabanından gelen nesnelerin istemciye filtrelenmeden doğrudan sunulmasıdır (BOPLA). Mobil güvenlikte ise saldırganın cihaz üzerinde fiziksel kontrole sahip olduğu kabul edilerek, verilerin diskte şifreli saklanması ve binary dosyanın tersine mühendisliğe karşı korunması birincil önceliktir.

LLM vs ML SECURITY
Uygulama vs Model Güvenliği
LLM Top 10, büyük dil modellerinin uygulama katmanındaki davranışlarını hedefler. Burada en kritik tehdit, veri ile talimat kanalının ayrılmamasından kaynaklanan prompt enjeksiyonudur. ML Security projesi ise modelin altındaki istatistiksel ve matematiksel yapıyı hedefler. ML saldırıları, eğitim verilerinin zehirlenmesini (data poisoning), model ağırlıklarının sızdırılarak kopyalanmasını veya girdi görüntülerine insan gözünün fark edemeyeceği parazitler eklenerek modelin kararlarının saptırılmasını (adversarial evasion) kapsar.

CI/CD vs KUBERNETES
SDLC vs Çalışma Zamanı (Runtime)
CI/CD güvenliği, yazılımın derlenmesinden paketlenmesine kadar olan teslimat (delivery) aşamasını kapsar ve birincil amacı zehirli kod enjeksiyonunu (Poisoned Pipeline Execution) engellemektir. Kubernetes güvenliği ise bu paketlerin üretim (production) ortamında çalıştırıldığı andan itibaren başlar. CI/CD seviyesinde imzasız üretilen bir imaj, Kubernetes aşamasında zafiyet barındıran konteynerların çalıştırılmasına ve aşırı yetkili RBAC rolleriyle küme kaynaklarının istismar edilmesine zemin hazırlar. İki proje, pipeline'dan runtime'a kesintisiz bir zincir oluşturur.

SERVERLESS vs LCNC
Dağıtık Altyapı vs Citizen Development
Serverless mimari, yönetimi bulut sağlayıcıda olan binlerce kısa ömürlü fonksiyondan (FaaS) oluşur ve buradaki güvenlik zafiyetleri genellikle aşırı yetkilendirilmiş IAM rolleri ve fonksiyonların geçici disk alanlarında bıraktığı verilerden kaynaklanır. Low-code/No-code ise yazılım geliştirme yetkinliği olmayan iş birimlerinin (citizen developer) ürettiği "gölge" uygulamaları kapsar. Serverless'ta mikro seviyedeki altyapı sıkılaştırması hedeflenirken, LCNC projelerinde kurumsal veri sızıntılarını önlemek amacıyla veritabanı bağlayıcılarının (connectors) yönetimi ve varlık takibi ön plana çıkar.

Aşağıdaki diyagramda, bir CI/CD pipeline zafiyetinin (Poisoned Pipeline Execution - PPE) bulut altyapısının tamamının ele geçirilmesiyle sonuçlanan yanal hareket zinciri modellenmiştir.

Bu saldırı akışında, CI/CD pipeline'ı üzerinde çalışan bir betiğin manipüle edilmesiyle (CICD-SEC-4), derleme sunucusunun kontrolü ele geçirilir. Saldırgan bu sunucu üzerinden yetkisiz şekilde imzaladığı zararlı bir konteyner imajını kayıt defterine yükler. Kubernetes kümesi, imaj doğrulama politikası eksikliği nedeniyle bu zehirli imajı çalıştırır (K01).

Konteyner içinde çalışan zararlı kod, pod içerisinden bulut sağlayıcının metadata servisine (169.254.169.254) istek atarak node'a atanan geçici kimlik bilgilerini çalar. Eğer bu kimlik bilgilerini least-privilege ilkesine aykırı olarak aşırı yetkilendirilmişse (K08), saldırgan pod sınırlarından çıkarak bulut sağlayıcısının IAM rolü üzerinden tüm kurumsal altyapıyı ele geçirir.

Bölüm: Stratejik Yol Haritası: Olgunluk Modelleri, Ajan Güvenliği ve Makine Kimlikleri (NHI)

Uygulama güvenliğini sürdürülebilir kılmak, statik bir kontrol listesinin ötesine geçerek kurumsal bir olgunluk modeli inşa etmeyi gerektirir. Bu yol haritası, kuruluşların mevcut durumlarını analiz etmelerini, yeni nesil yapay zekâ tehditlerine karşı savunma geliştirmelerini ve insan dışı kimlikleri (NHI) yönetmelerini hedefleyen bütünsel bir güvenlik programıdır.

Bölüm Detayı: OWASP SAMM ve ASVS: Olgunluk Seviyesinin Belirlenmesi

Farklı teknoloji katmanlarına ait Top 10 listelerini kurumsal seviyede uygulamak için iki temel OWASP referans modeli kullanılır:
OWASP ASVS (Application Security Verification Standard): Yazılımların tasarımından test aşamasına kadar karşılaması gereken teknik güvenlik gereksinimlerini tanımlayan katı bir standarttır. Web, API ve mobil zafiyetleri önlemek için kodlama ve mimari standartları ASVS seviyelerine (Level 1, 2, 3) göre yapılandırılır.
OWASP SAMM (Software Assurance Maturity Model): Bir organizasyonun yazılım geliştirme süreçlerindeki güvenlik olgunluğunu ölçen ve iyileştiren bir yönetim modelidir. SAMM sayesinde şirketler, yönetişim, tasarım, uygulama, doğrulama ve operasyon olmak üzere 5 ana başlıkta güvenlik olgunluk skorlarını çıkarabilir ve bütçe planlamalarını bu verilere göre yapabilirler.

Projelerin olgunluk ve sektörel uyum seviyeleri ise bütçe yatırımlarının önceliklendirilmesinde kilit rol oynar:
Flagship (Amiral Gemisi) Sınıfı: Web, API ve Mobil Top 10 projeleri ile ASVS ve SAMM, PCI DSS veya ISO 27001 gibi yasal standartlarca doğrudan zorunlu kılınan yüksek olgunluktaki projelerdir.
Lab Sınıfı: Hızla evrilen Kubernetes, LLM ve CI/CD projeleri, sektörel farkındalığı yüksek ancak henüz küresel yasalara tam entegre olmamış uzman konsensüsüne dayanan dinamik rehberlerdir.
Incubator ve Durağan Sınıfı: Privacy Risks v2.0 veya eski Serverless rehberleri gibi, teknolojinin evrilmesiyle durağanlaşan projeler yerine modern bulut-doğal kılavuzların tercih edilmesi gereken alanlardır.

Bölüm Detayı: Ajan Güvenliği (Agentic AI Security) ve Otonom Tehditler

Yazılım mimarilerinde deterministik yapılardan otonom çalışan Ajan (Agentic AI) sistemlerine geçilmesi, geleneksel girdi/çıktı denetimlerini etkisiz kılmaktadır. Bu tehdit alanını adreslemek için yayınlanan en yeni Top 10 for Agentic Applications 2026 çerçevesi, otonom sistemlerdeki şu kritik risklere odaklanır:
ASI01 – Agent Goal Hijack (Ajan Hedefinin Sabote Edilmesi): Prompt enjeksiyonu yoluyla ajanın başlangıçtaki kurumsal talimatlarının geçersiz kılınarak siber saldırganın hedeflerine (veri çalma veya sistemlere sızma) yönlendirilmesidir.
ASI02 – Tool Misuse (Araçların Kötüye Kullanımı): Ajanın kendisine verilen e-posta gönderme, SQL sorgulama veya dosya silme araçlarını, manipüle edilmiş girdiler nedeniyle beklenmedik parametrelerle işleterek sistemlere zarar vermesidir.
ASI06 – Memory & Context Poisoning (Bellek ve Bağlam Zehirlenmesi): Uzun süreli çalışan ajanların bellek alanlarına kötü niyetli bağlamların enjekte edilmesiyle, ajanın karar alma mekanizmasının zaman içinde kalıcı ve sinsi bir şekilde manipüle edilmesidir.

Bölüm Detayı: İnsan Dışı Kimliklerin (Non-Human Identities - NHI) Güvenliği

Modern cloud-native sistemlerde en hızlı büyüyen ve en az denetlenen saldırı yüzeyini İnsan Dışı Kimlikler (NHI) oluşturmaktadır. Sistemlerin birbirleriyle haberleşmesi için kullanılan API anahtarları, servis hesapları, OAuth izinleri, veritabanı bağlantı dizeleri ve JWT tokenları siber saldırganlar için en kolay sızma noktaları haline gelmiştir.

Geleneksel kullanıcı hesapları katı 2FA/MFA ve parola politikalarıyla korunurken, bu makine-to-makine (M2M) kimlik bilgileri genellikle kod repolarında veya pipeline runner'larında unutulmakta, izlenmemekte ve rotasyon süreçlerinden geçmemektedir. Bir saldırganın otonom bir API tokenını ele geçirmesi, doğrudan yetkilendirme zincirini bypass ederek veritabanlarına sızmasıyla sonuçlanır. Dolayısıyla, NHI güvenliği sağlanmadığı sürece en sağlam Kubernetes kümeleri veya güvenli web kodları bile bypass edilmeye açıktır.

Bölüm Detayı: Güvenlik Liderleri İçin Aksiyon Planı (Roadmap)

Kuruluşların bu çok katmanlı tehdit yüzeyini yönetebilmesi için atması gereken stratejik adımlar şunlardır:
Sürekli SBOM ve Paket İmzalama: Derleme hattında (CI/CD) kullanılan tüm bağımlılıkları SBOM ile envanterleyin ve üretilen Docker imajlarını derleme aşamasında dijital olarak imzalayarak doğruluğunu Kubernetes runtime aşamasında admission controller ile denetleyin.
Konteyner ve Bulut Arasındaki IAM Sınırları: Podların node IAM rollerini taklit ederek bulut metadata servislerine erişmesini engelleyin. Her iş yükü için en az yetkili ve kısıtlı bulut rolleri tanımlayın.
Kimlik ve Sırların Dinamik Yönetimi: LCNC platformlarından serverless fonksiyonlara kadar hiçbir kod veya konfigürasyonda şifre veya API anahtarını düz metin (hardcoded) olarak saklamayın; tüm sırları HashiCorp Vault veya bulut secret manager servislerinden çalışma zamanında dinamik olarak çağırın.
Yapay Zekâ İçin Çift Katmanlı Koruma: LLM uygulamalarında girdi kanallarını prompt injection filtrelerinden geçirin; modelden dönen çıktıları ise veri tabanlarına veya tarayıcılara iletmeden önce zararlı kodlara ve hassas veri sızıntılarına karşı deterministik filtrelerle doğrulayın.

Verinizin mimarı olun, egemenliğinizi geri alın. Dinlediğiniz için teşekkürler!
