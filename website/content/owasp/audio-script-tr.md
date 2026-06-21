Yazılım geliştirme ekosistemi genişledikçe ve monolitik yapılardan bulut-doğal, mikroservis tabanlı ve yapay zekâ destekli mimarilere evrildikçe, tehdit yüzeyleri de benzeri görülmemiş bir hızla parçalanmaktadır. Tek başına geleneksel web güvenlik kontrolleri, modern sistemleri korumakta yetersiz kalmaktadır. Açık dünya uygulama güvenliği ekosisteminin en kritik referansı konumundaki OWASP (Open Worldwide Application Security Project) vakfı, bu karmaşık tehdit manzarasını yönetilebilir kılmak amacıyla farklı teknolojik katmanlara özel farkındalık projeleri geliştirmektedir.

Aşağıda, modern yazılım mimarilerinde yer alan başlıca on OWASP projesi ile en yeni sınırları temsil eden Ajan Güvenliği ve İnsan Dışı Kimlikler (NHI) girişimlerinin kapsamlı bir kıyaslaması sunulmaktadır.


Bölüm: OWASP Metodolojisi ve Veri Analitiği


OWASP’ın geleneksel listelerinden modern veri odaklı analizlerine geçişi, yazılım güvenliği disiplininin olgunlaşmasını simgelemektedir. Erken dönem listeleri (2003–2010) büyük ölçüde kısıtlı uzman görüşü ve sınırlı zafiyet veri setlerine dayanırken, günümüz metodolojisi devasa veri çağrıları (data call), endüstri genelindeki CVE analizleri ve CWE (Common Weakness Enumeration) eşlemeleri üzerine kuruludur.

Örneğin, en son yayınlanan Web Top 10 (2025) sürümünde metodoloji, 2.8 milyondan fazla uygulamadan elde edilen veriler ile 589 farklı CWE sınıfının analizine dayanmaktadır. Bu yeni dönemde kullanılan "vaka oranı" (incidence rate) metriği, otomatik tarama araçlarının aynı bulguyu binlerce kez tekrarlayarak veriyi manipüle etmesini engeller. Bu metrik, bir zafiyetin incelenen uygulamalarda en az bir kez görülme yüzdesini esas almaktadır. Topluluk anketleri ise verilerde düşük frekansta görünen ancak etkisi ve sömürülebilirliği aşırı yüksek olan riskleri (örneğin Yazılım Tedarik Zinciri Açıkları veya SSRF) listelere dahil etmek amacıyla hibrit bir modelde dengeleyici rol oynamaktadır.


Bölüm: Domain Bazında Tehdit Çeşitliliği


Güvenlik ekiplerinin yaptığı en büyük hatalardan biri, Web Top 10 listesini tüm yazılım ekosistemine tek tip bir şablon olarak uygulamaya çalışmaktır. Oysa her teknoloji katmanının mimari tasarımı, güven sınırları ve saldırı yüzeyi kökten farklıdır.

Web uygulamalarında temel güven sınırı tarayıcı ve sunucu arasındayken ve zafiyetler genellikle sunucu kaynaklı kod hatalarından türetilirken; mobil uygulamalarda saldırgan, cihaz üzerinde tam fiziksel ve yönetimsel (root/jailbreak) kontrole sahiptir. Bu durum, mobil güvenlik modelinde ikili dosya (binary) korumasını, statik şifreleme anahtarlarının ifşasını engellemeyi ve istemci tarafındaki güvenli depolama gereksinimlerini öncelikli hale getirir. API dünyasında ise kullanıcı arayüzü ortadan kalktığı için saldırganlar doğrudan arka plandaki veri modellerini ve iş mantıklarını (business logic) hedef alırlar. API'lere yönelik saldırıların büyük kısmı meşru HTTP protokolleri ve normal veri akışları içerisinde gerçekleştiğinden, geleneksel WAF sistemlerinin bunları tespit etmesi zordur. Bu nedenle API projeleri, nesne ve fonksiyon düzeyindeki yetkilendirme doğrulama hatalarına odaklanmaktadır.


Bölüm: On Temel OWASP Projesinin Detaylı Analizi ve Sürüm Karşılaştırmaları


Uygulama güvenliğinin farklı katmanlarını anlamak, her bir OWASP projesinin kendi tarihsel evrimini, sürüm geçişlerindeki tehdit değişimlerini ve barındırdığı zafiyetlerin teknik detaylarını incelemeyi gerektirir.


Bölüm Detayı: Web Uygulama Güvenliği (OWASP Web Top 10)


Web uygulamaları için hazırlanan bu temel liste, 2003 yılından bu yana tarayıcı ve uygulama sunucusu arasındaki zafiyetleri ele almaktadır. 2017, 2021 ve 2025 sürümleri karşılaştırıldığında tehdit trendlerinde köklü bir değişim görülür. 2017 yılında birinci sırada yer alan SQL ve komut enjeksiyonları (A01:2017-Injection), modern ORM (Object-Relational Mapping) araçlarının ve parametreli sorguların yaygınlaşmasıyla 2021'de üçüncü sıraya, 2025'te ise beşinci sıraya gerilemiştir. Buna karşılık, 2017'de beşinci sırada yer alan Erişim Kontrolü İhlalleri (Broken Access Control), 2021 ve 2025 yıllarında birinci sıraya yükselmiştir. Bunun nedeni, mikroservis geçişleri ile yetkilendirme mantığının (authorization logic) dağıtık hale gelmesi ve otomatik araçların bu bağlamsal hataları yakalamakta yetersiz kalmasıdır.

Ayrıca 2025 yılında, Sunucu Taraflı İstek Sahteciliği (SSRF) ayrı bir kategori olmaktan çıkarılıp Broken Access Control altına dahil edilmiş; eski "Vulnerable Components" kategorisi ise SBOM (Software Bill of Materials) ve paket bütünlüğünü kapsayacak şekilde "Software Supply Chain Failures" (A03:2025) adıyla genişletilmiştir. Yeni eklenen "Mishandling of Exceptional Conditions" (A10:2025) ise sistemlerin güvenli şekilde hata vermesini (fail-secure) ve hata mesajlarından bilgi sızdırılmamasını hedefler.

A01:2025 – Broken Access Control: Kullanıcıların yetkileri dışındaki kaynaklara erişebilmesi (SSRF entegre edilmiştir).
A02:2025 – Security Misconfiguration: Güvenlik ayarlarının eksik yapılması, gereksiz servislerin veya varsayılan kimlik bilgilerinin açık bırakılması.
A03:2025 – Software Supply Chain Failures: Üçüncü taraf bağımlılıklardaki zafiyetler, imzasız paket kullanımı ve derleme araçlarındaki güvenlik açıkları.
A04:2025 – Cryptographic Failures: Hassas verilerin zayıf şifrelenmesi veya ağda şifresiz aktarılması (eski Sensitive Data Exposure).
A05:2025 – Injection: Kullanıcı girdilerinin SQL/NoSQL veya OS komutlarına sızması; Cross-Site Scripting (XSS) bu kategoridedir.
A06:2025 – Insecure Design: Geliştirme öncesi threat modeling (tehdit modelleme) ve güvenli mimari tasarım eksiklikleri.
A07:2025 – Authentication Failures: Oturum yönetimi hataları, kaba kuvvet saldırılarına ve kimlik doldurmaya (credential stuffing) açık yapılar.
A08:2025 – Software or Data Integrity Failures: Güvenilmeyen kaynaklardan gelen verilerin doğrulanmadan kabul edilmesi (insecure deserialization dahil).
A09:2025 – Security Logging & Alerting Failures: Güvenlik olaylarının kaydedilmemesi ve siber saldırı durumunda alarm üretilmemesi.
A10:2025 – Mishandling of Exceptional Conditions: Hata durumlarında sistemin açık vermesi (fail-open) ve debug loglarının sızması.


Bölüm Detayı: API Güvenliği (OWASP API Security Top 10)


API Security Top 10 projesi, istemci ile sunucu arasındaki veri alışverişini sağlayan web servislerine odaklanır. 2019 ve 2023 sürümleri karşılaştırıldığında, API ekonomisinin büyümesiyle zafiyetlerin iş mantığına (business logic) kaydığı açıkça görülmektedir. 2019'da ayrı kategoriler olan "Excessive Data Exposure" (A3) ve "Mass Assignment" (A6), 2023'te kök neden odaklı bir yaklaşımla "Broken Object Property Level Authorization" (API3:2023) altında birleştirilmiştir. Bunun nedeni, her iki zafiyetin de nesnelerin alt özelliklerine (properties) yönelik erişim denetimi eksikliğinden kaynaklanmasıdır.

2023 sürümünde en dikkat çeken güncellemelerden biri, "Unrestricted Access to Sensitive Business Flows" (API6:2023) kategorisidir. Bu zafiyette API kod seviyesinde kusursuz çalışsa bile, captcha veya oran sınırlaması (rate limiting) eksikliği nedeniyle bilet stoklarının botlarla saniyeler içinde tüketilmesi gibi iş mantığı suistimalleri yaşanmaktadır. Harici entegrasyonların artmasıyla "Server-Side Request Forgery" (API7:2023) ve güvenilmeyen harici API'lerin kullanımından kaynaklanan "Unsafe Consumption of APIs" (API10:2023) listeye yeni eklenen kritik zafiyetlerdendir.

API1:2023 – Broken Object Level Authorization (BOLA): İstek parametrelerindeki nesne kimliklerinin kullanıcı yetkileriyle eşleştirilmemesi (IDOR).
API2:2023 – Broken Authentication: API anahtarlarının, JWT belirteçlerinin veya kimlik doğrulama akışlarının zayıf yapılandırılması.
API3:2023 – Broken Object Property Level Authorization (BOPLA): Kullanıcıların nesnelerin gizli alanlarını görmesi veya mass assignment ile değiştirebilmesi.
API4:2023 – Unrestricted Resource Consumption: CPU, bellek veya istek sınırlarının (rate limit) olmaması sonucu DoS oluşması.
API5:2023 – Broken Function Level Authorization (BFLA): Normal kullanıcıların idari API uç noktalarını (endpoints) tetikleyebilmesi.
API6:2023 – Unrestricted Access to Sensitive Business Flows: İş akışlarının (örneğin indirim kuponu denemeleri) otomatik botlarla suistimal edilmesi.
API7:2023 – Server-Side Request Forgery (SSRF): API sunucusunun saldırgan yönlendirmesiyle iç ağdaki sunuculara istek atması.
API8:2023 – Security Misconfiguration: Hatalı yapılandırılmış CORS (Cross-Origin Resource Sharing) başlıkları ve gereksiz HTTP metodları.
API9:2023 – Improper Inventory Management: Belgelenmemiş shadow API'lerin, test ortamlarının veya eski v1 uç noktalarının açık unutulması.
API10:2023 – Unsafe Consumption of APIs: API'nin entegre olduğu diğer üçüncü taraf servislerden gelen verileri filtrelemeden kabul etmesi.


Bölüm Detayı: Mobil Uygulama Güvenliği (OWASP Mobile Top 10)


Mobil güvenlik dünyası, sunucu kontrollerinden ziyade istemci tarafındaki (iOS/Android cihaz üzerindeki) güvenlik sınırlarını korumayı amaçlar. 2016 ve 2024 sürümleri kıyaslandığında, mobil ekosistemdeki tehditlerin ciddi şekilde evrildiği görülür. Sekiz yıllık aranın ardından yayınlanan 2024 listesinde, eskiden alt sıralarda yer alan "Improper Credential Usage" (M1:2024) birinci sıraya yerleşmiştir. Bunun en büyük nedeni, mobil uygulamaların kaynak kodlarının (APK/IPA) tersine çevrilerek içindeki AWS gizli anahtarlarının, Firebase şifrelerinin ve OAuth istemci sırlarının kolayca ele geçirilmesidir.

Ayrıca mobil kütüphanelerin kontrolsüz kullanımı "Inadequate Supply Chain Security" (M2:2024) kategorisini listenin üst sıralarına taşımıştır. Kişisel verilerin korunması kanunları (GDPR, KVKK) çerçevesinde "Inadequate Privacy Controls" (M6:2024) yeni bir kategori olarak eklenmiştir. Eski sürümlerde yer alan "Reverse Engineering" ve "Code Tampering" gibi başlıklar ise "Insufficient Binary Protections" (M7:2024) altında konsolide edilmiştir.

M1:2024 – Improper Credential Usage: Hassas kimlik bilgilerinin veya API anahtarlarının uygulama paketi içerisinde şifresiz saklanması.
M2:2024 – Inadequate Supply Chain Security: Güvenilmeyen harici SDK'ların entegrasyonu ve bağımlılıkların bütünlük kontrolü eksikliği.
M3:2024 – Insecure Authentication/Authorization: Kimlik doğrulama işlemlerinin sadece mobil cihaz üzerinde yapılması, sunucu doğrulaması olmaması.
M4:2024 – Insufficient Input/Output Validation: Deeplink (derin bağlantı) girdilerinin, IPC mesajlarının ve form alanlarının doğrulanmaması.
M5:2024 – Insecure Communication: SSL/TLS pinning uygulanmaması veya geçersiz sertifikaların kabul edilmesiyle MITM saldırılarına kapı açılması.
M6:2024 – Inadequate Privacy Controls: Kullanıcı rızası olmadan arka planda veri toplanması ve PII verilerinin cihaz loglarına yazılması.
M7:2024 – Insufficient Binary Protections: Kodun karartılmaması (de-obfuscation yapılabilmesi) ve kök kullanıcı (root/jailbreak) denetimlerinin olmaması.
M8:2024 – Security Misconfiguration: AndroidManifest.xml veya Info.plist dosyalarında debug modunun açık bırakılması, aşırı izin talepleri.
M9:2024 – Insecure Data Storage: Hassas verilerin cihaz diskinde, şifresiz yerel SQLite veritabanlarında veya log dosyalarında saklanması.
M10:2024 – Insufficient Cryptography: Eskimiş şifreleme yöntemlerinin (örneğin RC4, DES, MD5) kullanılması veya anahtarların zayıf üretilmesi.


Bölüm Detayı: Yapay Zekâ ve Büyük Dil Modelleri Güvenliği (OWASP LLM Top 10)


Büyük Dil Modeli (LLM) uygulamalarına yönelik bu liste, üretken yapay zekâ sistemlerinin entegrasyonundan kaynaklanan uygulama katmanı risklerini tanımlar. 2023 (v1.1) ve en güncel 2025 sürümleri karşılaştırıldığında, AI sistemlerinin otonom ajanlara ve RAG (Retrieval-Augmented Generation) mimarilerine dönüşmesinin yarattığı yeni riskler göze çarpmaktadır. 2023 yılında veri sızıntısı alt sıralardayken, 2025 sürümünde "Sensitive Information Disclosure" (LLM02) ikinci sıraya yükselmiştir. Bunun nedeni, LLM'lere bağlanan kurumsal RAG sistemlerinin yetkilendirme sınırlarını gözetmeksizin kullanıcıların erişmemesi gereken departman sırlarını prompt yanıtlarında ifşa etmesidir.

Ayrıca 2025 sürümünde, RAG veri tabanlarını zehirleyen "Vector and Embedding Weaknesses" (LLM08) ve modellerin sistem prompt'larının çalınmasını ele alan "System Prompt Leakage" (LLM07) yeni kategoriler olarak eklenmiştir. "Model Denial of Service" zafiyeti ise yerini API maliyetlerini şişiren ve sunucuyu yoran "Unbounded Consumption" (LLM10) kategorisine bırakmıştır.

LLM01: Prompt Injection: Saldırganların girdi metinleriyle modelin sistem talimatlarını (system instructions) geçersiz kılması veya manipüle etmesi.
LLM02: Sensitive Information Disclosure: Modelin eğitim verisinde veya RAG sistemindeki gizli kurumsal verileri yetkisiz kullanıcılara sızdırması.
LLM03: Supply Chain: Güvenli olmayan önceden eğitilmiş modellerin (base models), üçüncü taraf eklentilerin ve veri kaynaklarının kullanımı.
LLM04: Data and Model Poisoning: Eğitim verilerinin veya ince ayar (fine-tuning) veri setlerinin manipüle edilerek modelde arka kapılar açılması.
LLM05: Improper Output Handling: Modelden gelen ham çıktıların doğrudan çalıştırılması sonucu XSS veya komut enjeksiyonu oluşması.
LLM06: Excessive Agency: LLM'e bağlı ajanların (agents) eklentiler üzerinde gereğinden fazla okuma, yazma veya silme yetkisine sahip olması.
LLM07: System Prompt Leakage: Modelin davranışını belirleyen gizli sistem prompt'larının dolaylı enjeksiyonlarla dışarı sızdırılması.
LLM08: Vector and Embedding Weaknesses: Vektör veritabanlarında tenant (kiracı) izolasyonunun olmaması ve yerleştirme matrislerinin sabote edilmesi.
LLM09: Misinformation: Modelin ürettiği yanlış veya halüsinasyon içeren verilerin kritik iş süreçlerinde doğrulanmadan kullanılması.
LLM10: Unbounded Consumption: Aşırı kaynak tüketen sorgularla sunucunun servis dışı bırakılması veya API kota maliyetlerinin suistimal edilmesi.


Bölüm Detayı: Makine Öğrenimi Güvenliği (OWASP ML Security Top 10)


Makine öğrenimi sistemlerinin güvenliğini hedef alan bu taslak liste, LLM uygulama katmanından farklı olarak doğrudan modellerin matematiksel ve istatistiksel zayıflıklarını inceler. ML Security projesi, geleneksel denetimli ve denetimsiz öğrenme modellerindeki (örneğin SVM, CNN, regresyon modelleri) veri zehirlenmesi ve adversarial (saldırgan) girdi manipülasyonlarını kapsar.

LLM Top 10 listesi prompt manipülasyonu gibi sözel/metinsel girdi-çıktı kanallarını hedeflerken; ML listesi modelin karar sınırlarını (decision boundaries) kaydırmayı hedefleyen veri manipülasyonlarına odaklanır. Örneğin, otonom sürüş sistemlerindeki trafik levhası tanıma modelini yanıltmak için levha üzerine yapıştırılan görünmez bir parazit etiket (adversarial perturbation) ML01 kategorisinde değerlendirilir. Modelin eğitildiği veri kümesini tahmin etmeye çalışan üyelik çıkarımı (membership inference) ve model parametrelerini tersine mühendislikle çalma (model inversion) bu listenin en kritik matematiksel zafiyetlerindendir.

ML01: Input Manipulation Attack: Modele sunulan test girdilerine eklenen mikro gürültülerle model kararlarının saptırılması (evasion).
ML02: Data Poisoning Attack: Eğitim veri setine kötü niyetli veriler yerleştirilerek modelin belirli durumlarda yanlış tahmin yapmasının sağlanması.
ML03: Model Inversion Attack: Modelin tahmin çıktılarından yola çıkarak eğitimde kullanılan gizli verilerin matematiksel olarak geri elde edilmesi.
ML04: Membership Inference Attack: Belirli bir veri kaydının modelin eğitim veri setinde yer alıp almadığının istatistiksel analizle doğrulanması.
ML05: Model Theft: Modele gönderilen sorgulara alınan yanıtlarla modelin davranışsal bir kopyasının (surrogate model) çıkarılması.
ML06: ML Supply Chain Attacks: Güvensiz serileştirme formatlarında (örneğin PyTorch pickle) saklanan modeller üzerinden zararlı kod yürütülmesi.
ML07: Transfer Learning Attack: Önceden eğitilmiş kaynak modelin içerisine gömülmüş gizli tetikleyicilerin (backdoor) hedef sisteme taşınması.
ML08: Model Skewing: Sürekli öğrenme (online learning) yapan modellerde, gelen sahte geri bildirimlerle karar sınırlarının çarpıtılması.
ML09: Output Integrity Attack: Model çıktılarının ve tahmin sonuçlarının bütünlüğünün ara katmanlarda sabote edilmesi.
ML10: Model Poisoning: Model parametrelerinin veya ağırlık matrislerinin doğrudan güncellenerek modelin işlevsiz hale getirilmesi.


Bölüm Detayı: Kubernetes Güvenliği (OWASP Kubernetes Top 10)


Kubernetes Top 10 projesi, modern mikroservis mimarilerinin runtime (çalışma zamanı) ve orkestrasyon katmanını korumayı hedefler. 2022 ve 2025 sürümleri karşılaştırıldığında, Kubernetes bileşenlerinin güvenliğinden ziyade, bulut entegrasyonlarının ve yanal hareket (lateral movement) sınırlarının ön plana çıktığı görülmektedir. 2025 sürümünde en kritik güncellemelerden biri, "Cluster to Cloud Lateral Movement" (K08:2025) kategorisidir.

Bulut sağlayıcıları üzerinde çalışan Kubernetes kümelerinde podların, node'a atanan IAM (Identity and Access Management) rollerini taklit ederek bulut hesabına sızması bu kategorinin temelini oluşturur. Ayrıca 2022'de ayrı olan bileşen zafiyetleri ve güncel olmayan cluster versiyonları, 2025 sürümünde "Misconfigured and Vulnerable Cluster Components" (K07:2025) başlığı altında birleştirilmiştir. Yetkilendirme modeli ise sadece RBAC ile sınırlı tutulmayıp, webhook yetkilendiricilerini de kapsayacak şekilde "Overly Permissive Authorization Configurations" (K02:2025) adıyla genişletilmiştir.

K01: Insecure Workload Configurations: Podların root yetkisiyle veya privileged modda çalıştırılması sonucu container escape (konteynerdan kaçış) riski.
K02: Overly Permissive Authorization Configurations: RBAC rollerinin aşırı geniş yetkilerle (örneğin * wildcard kullanımı) tanımlanması.
K03: Secrets Management Failures: Kubernetes sırlarının etcd üzerinde şifresiz saklanması veya pod dosyalarına güvensiz mount edilmesi.
K04: Lack of Cluster Level Policy Enforcement: Admission Controller yapılandırmalarının (örneğin Kyverno veya OPA) olmaması.
K05: Missing Network Segmentation Controls: Podlar arası trafiğin kısıtlanmaması, tehlikeye giren bir podun tüm ağa erişebilmesi.
K06: Overly Exposed Kubernetes Components: API server, Kubelet veya dashboard arayüzlerinin dış internete şifresiz açılması.
K07: Misconfigured and Vulnerable Cluster Components: Eski Kubernetes sürümlerinin kullanılması ve kube-apiserver konfigürasyon hataları.
K08: Cluster to Cloud Lateral Movement: Podların servis hesapları üzerinden AWS IAM / GCP Service Account yetkilerini ele geçirerek buluta sızması.
K09: Broken Authentication Mechanisms: Küme içi haberleşmede kullanılan mTLS sertifikalarının veya kullanıcı tokenlarının zayıf yönetilmesi.
K10: Inadequate Logging and Monitoring: Küme içi denetim loglarının (audit logs) toplanmaması, saldırıların tespit edilememesi.


Bölüm Detayı: CI/CD Pipeline Güvenliği (OWASP CI/CD Security Risks)


CI/CD Security Risks projesi, yazılımın kod aşamasından üretim aşamasına taşındığı teslimat zincirinin (delivery pipeline) güvenliğini ele alır. Bu liste, DevSecOps süreçlerinin en kritik zayıf noktası olan derleme sunucularının (runners) ve üçüncü taraf paket depolarının istismar edilmesini engellemeyi amaçlar.

Listenin en tehlikeli zafiyeti, derleme konfigürasyon dosyalarının (örneğin GitHub Actions .yml veya Jenkinsfile) manipüle edilerek pipeline üzerinde kötü niyetli komutların çalıştırılmasını sağlayan "Poisoned Pipeline Execution" (CICD-SEC-4) zafiyetidir. Bağımlılık yönetimi hataları (CICD-SEC-3: Dependency Chain Abuse) ise geliştiricilerin şirket içi özel paket adlarıyla npm/pip depolarına zararlı kod yükleyen saldırganların tuzağına düşmesini (dependency confusion) açıklar. Pipeline sunucularına atanan aşırı yetkili AWS/Azure gizli anahtarları ve bu anahtarların log dosyalarında düz metin olarak ifşa olması (CICD-SEC-6) bu projenin temel odak alanlarındandır.

CICD-SEC-1: Insufficient Flow Control Mechanisms: Kod değişikliklerinin akran denetimi (peer review / PR) olmadan doğrudan yayına alınabilmesi.
CICD-SEC-2: Inadequate Identity and Access Management: Pipeline sisteminde kullanılan kullanıcı ve servis hesaplarının aşırı yetkilendirilmesi.
CICD-SEC-3: Dependency Chain Abuse: Geliştiricilerin typosquatting veya dependency confusion yöntemleriyle zehirli kütüphaneleri indirmesi.
CICD-SEC-4: Poisoned Pipeline Execution (PPE): Kod reposuna erişimi olan bir saldırganın, derleme dosyalarını değiştirerek runner sunucusunda komut çalıştırması.
CICD-SEC-5: Insufficient PBAC (Pipeline-Based Access Controls): Pipeline aşamaları arasında izolasyon olmaması, bir projenin diğerinin sırlarına erişmesi.
CICD-SEC-6: Insufficient Credential Hygiene: Dağıtım anahtarlarının ve API şifrelerinin pipeline değişkenlerinde düz metin olarak saklanması veya loglara sızması.
CICD-SEC-7: Insecure System Configuration: Jenkins veya GitLab runner sunucularının güncellenmemesi, işletim sistemi seviyesinde zafiyet barındırması.
CICD-SEC-8: Ungoverned Usage of 3rd Party Services: Pipeline içerisine eklenen harici analiz araçlarının veya Slack botlarının denetlenmemesi.
CICD-SEC-9: Improper Artifact Integrity Validation: Üretilen paketlerin veya Docker imajlarının bütünlüğünün dijital imzalarla (örneğin Cosign) doğrulanmaması.
CICD-SEC-10: Insufficient Logging and Visibility: Pipeline üzerindeki yetkisiz tetiklemelerin ve sır erişimlerinin loglanmaması.


Bölüm Detayı: Veri Gizliliği Güvenliği (OWASP Privacy Risks)


OWASP Privacy Risks projesi, kişisel verilerin (PII) toplanması, işlenmesi ve saklanması aşamalarındaki mahremiyet ihlallerini ele alır. Bu proje, yasal uyumluluk (GDPR, KVKK) ile yazılım mühendisliği arasındaki teknik köprüyü oluşturur. 2014 ve 2021 (v2.0) sürümleri karşılaştırıldığında, kullanıcı rızasının (consent) ve veri sahiplerinin haklarının (DSAR - Data Subject Access Requests) önem kazandığı görülmektedir.

2021 sürümünde eklenen "Consent on Everything" (P4:2021) kategorisi, uygulamaların her işlem için kullanıcının karşısına rıza onay pencereleri çıkarmasını ve bu rıza yorgunluğunun (consent fatigue) rızanın hukuki geçerliliğini sakatlamasını inceler. "Insufficient Deletion of User Data" (P6:2021) ise sistemlerden silindiği sanılan kullanıcı verilerinin arka plandaki ilişkili veritabanlarında, yedekleme sunucularında veya log dosyalarında saklanmaya devam etmesi riskini teknik boyutuyla ele almaktadır.

P1: Web Application Vulnerabilities: Teknik zafiyetler (örneğin SQL injection) nedeniyle kullanıcı kişisel verilerinin dışarı sızması.
P2: Operator-sided Data Leakage: Uygulama yöneticilerinin hatalı yapılandırmaları sonucu verilerin yetkisiz departmanlara veya harici analiz araçlarına sızması.
P3: Insufficient Data Breach Response: Veri ihlallerinin tespit edilememesi ve yasal sürede (örneğin KVKK 72 saat) regülatörlere bildirilmemesi.
P4: Consent on Everything: Kullanıcıları rıza pencerelerine boğarak (consent fatigue) bilinçsiz onay alınması, açık rıza ilkesinin çiğnenmesi.
P5: Non-transparent Policies: Gizlilik sözleşmelerinin çok uzun, karmaşık ve teknik terimlerle okunulamaz şekilde sunulması.
P6: Insufficient Deletion of User Data: Kullanıcının hesabını silmesine rağmen kişisel verilerin yedeklerden veya ilişkili tablolardan temizlenmemesi.
P7: Insufficient Data Quality: Verilerin güncel tutulmaması sonucu kullanıcılar hakkında yanlış değerlendirmeler yapılması.
P8: Missing or Insufficient Session Expiration: Oturum sürelerinin sonlandırılmaması sonucu ortak bilgisayarlarda kişisel verilerin ifşa olması.
P9: Inability of Users to Access and Modify Data: Kullanıcıların kendi kişisel verilerini görüntüleyebileceği veya güncelleyebileceği arayüzlerin olmaması.
P10: Collection of Data Not Required: Sunulan hizmetle doğrudan ilgisi olmayan verilerin (örneğin bir fener uygulamasının konum verisi istemesi) toplanması.


Bölüm Detayı: Sunucusuz Mimari Güvenliği (OWASP Serverless Top 10)


Serverless projesi, yönetimi tamamen bulut sağlayıcıda olan ve olay-tetiklemeli (event-driven) çalışan FaaS (Function-as-a-Service) mimarilerindeki riskleri inceler. Bu liste, sunucusuz mimarilerin getirdiği yeni güven sınırlarını ele alan bir yorumlama (interpretation) dokümanıdır. Serverless dünyasında işletim sistemi yamaları gibi sorumluluklar bulut sağlayıcıya ait olsa da, uygulama seviyesindeki riskler geliştiricinin sorumluluğundadır.

Fonksiyonların tetiklendiği olay kaynaklarının (API Gateway, S3 dosya yüklemesi, veritabanı logları) çeşitliliği, enjeksiyon saldırılarını "Event Data Injection" (Risk 1) boyutuna taşır. Ayrıca, kısa ömürlü olan bu fonksiyonlara atanan IAM rollerinin kısıtlanmaması ("Over-privileged IAM Roles"), saldırganların tek bir fonksiyona sızarak tüm AWS/GCP hesabını ele geçirmesine neden olmaktadır. Sunucusuz mimarideki "Denial of Wallet" (Risk 7) ise sonsuz döngüye giren fonksiyonların dakikalar içinde binlerce dolarlık bulut maliyeti üretmesi riskini açıklar.

1: Event Data Injection: Kullanıcı girdilerinin yanı sıra harici olay tetikleyicilerinden (örneğin S3 kova bildirimleri) gelen verilerin doğrulanmadan işlenmesi.
2: Broken Authentication: Stateless (durumsuz) çalışan mikro fonksiyonların kimlik doğrulama kontrollerinin her istekte eksik yapılması.
3: Insecure Serverless Deployment Configuration: Fonksiyon dağıtım ayarlarının gevşek bırakılması, gizli çevre değişkenlerinin (env) dışarıya sızması.
4: Over-privileged IAM Roles: Fonksiyonlara least-privilege (en az yetki) yerine çok geniş bulut kaynak erişim yetkilerinin atanması.
5: Inadequate Function Monitoring and Logging: Kısa ömürlü binlerce sunucusuz fonksiyonun loglarının merkezi bir SIEM sistemine aktarılamaması.
6: Shared Execution Environment Risks: Aynı fiziksel sunucu üzerinde çalışan farklı fonksiyonların bellek sızıntıları üzerinden birbirini etkilemesi.
7: Denial of Wallet / Resource Abuse: Fonksiyonların aşırı çağrılması veya sonsuz döngülerle bulut faturasının astronomik seviyelere çıkarılması.
8: Insecure Third-Party Dependencies: Fonksiyonların paket boyutunu küçültmek amacıyla doğrulanmadan yüklenen güvensiz paket bağımlılıkları.
9: Impersonation and Session Hijacking: Kısa ömürlü oturum anahtarlarının sunucusuz bellek alanlarında şifresiz tutulması sonucu çalınması.
10: Serverless Function Data Leakage: Fonksiyonların geçici yazma dizininde (/tmp) kalan verilerin sonraki fonksiyon çağrılarında okunabilmesi.


Bölüm Detayı: Düşük Kod/Kodsuz Platform Güvenliği (OWASP Low-code / No-code Risks)


Low-code ve No-code platformlarına yönelik bu liste, grafiksel arayüzler ve hazır şablonlar kullanılarak yapılan yazılım geliştirme (citizen development) süreçlerindeki riskleri ele alır. Bu projenin temel motivasyonu, profesyonel yazılım geliştirici olmayan iş analistlerinin veya insan kaynakları çalışanlarının ürettiği uygulamaların kurumsal güvenlik denetimlerinin dışarısında kalmasıdır.

Platformların hazır sağladığı veri bağlayıcılar (connectors) üzerinden şirket içi veri tabanlarının internete açılması "Data Leakage" (LCNC-SEC-03) riskini doğurur. En büyük idari boşluk ise, kurum genelinde kimlerin hangi uygulamaları geliştirdiğinin ve bu uygulamaların hangi dış sistemlere bağlandığının takip edilememesinden kaynaklanan "Asset Management Failures" (LCNC-SEC-09) zafiyetidir. Bu durum kurumsal yapılarda ciddi bir "gölge BT" (shadow IT) tehdidi oluşturmaktadır.

LCNC-SEC-01: Account Impersonation: Uygulama içerisindeki yetkisiz kullanıcıların, arka planda tanımlı yetkili sistem hesaplarının haklarını devralması.
LCNC-SEC-02: Authorization Misuse: Grafiksel arayüzde yetkilendirme mantığının hatalı tasarlanması sonucu veri sınırlarının aşılması.
LCNC-SEC-03: Data Leakage and Unexpected Consequences: Verilerin onaylanmamış harici bulut depolarına veya formlar üzerinden dış dünyaya sızdırılması.
LCNC-SEC-04: Authentication Failures: Platformlar arası veri entegrasyonlarında zayıf veya şifresiz haberleşme protokollerinin kullanılması.
LCNC-SEC-05: Security Misconfiguration: Platform yönetim panelindeki paylaşım izinlerinin varsayılan olarak "herkese açık" bırakılması.
LCNC-SEC-06: Injection Handling Failures: Citizen developer'ların girdi kontrolü yapmaması sonucu SQL veya komut enjeksiyonlarının oluşması.
LCNC-SEC-07: Vulnerable and Untrusted Components: Platform pazar yerinden (marketplace) indirilen doğrulanmamış şablon ve eklentilerin kullanımı.
LCNC-SEC-08: Data and Secret Handling Failures: Veritabanı şifrelerinin veya API anahtarlarının tasarım arayüzünde düz metin olarak unutulması.
LCNC-SEC-09: Asset Management Failures: Kurum genelinde kimin hangi Low-code uygulamasını yayına aldığının takip edilememesi (Shadow IT).
LCNC-SEC-10: Security Logging and Monitoring Failures: Kullanıcıların kendi ürettiği uygulamalardaki işlemlerin kurumsal SIEM sistemlerince izlenememesi.


Bölüm: Kritik Projelerin Karşılaştırmalı Teknik İncelemesi


Aşağıdaki kartlarda, mimari benzerlikleri ve uygulama farklılıkleri nedeniyle sıkça karıştırılan veya birlikte yönetilmesi gereken kritik projelerin teknik karşılaştırmaları yer almaktadır.

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


Bölüm: Mimari Sınırlar ve Yanal Hareket Senaryosu


Modern saldırganlar, tek bir zafiyeti sömürmek yerine sistemler arasındaki mimari geçişleri kullanarak yanal hareket (lateral movement) yapmaktadır. Bu senaryonun en tipik örneği, CI/CD pipeline'ından başlayarak Kubernetes kümesine, oradan da tüm bulut altyapısına uzanan saldırı zinciridir.

Aşağıdaki diyagramda, bir CI/CD pipeline zafiyetinin (Poisoned Pipeline Execution - PPE) bulut altyapısının tamamının ele geçirilmesiyle sonuçlanan yanal hareket zinciri modellenmiştir.

Bu saldırı akışında, CI/CD pipeline'ı üzerinde çalışan bir betiğin manipüle edilmesiyle (CICD-SEC-4), derleme sunucusunun kontrolü ele geçirilir. Saldırgan bu sunucu üzerinden yetkisiz şekilde imzaladığı zararlı bir konteyner imajını kayıt defterine yükler. Kubernetes kümesi, imaj doğrulama politikası eksikliği nedeniyle bu zehirli imajı çalıştırır (K01).

Konteyner içinde çalışan zararlı kod, pod içerisinden bulut sağlayıcının metadata servisine (169.254.169.254) istek atarak node'a atanan geçici kimlik bilgilerini çalar. Eğer bu kimlik bilgilerini least-privilege ilkesine aykırı olarak aşırı yetkilendirilmişse (K08), saldırgan pod sınırlarından çıkarak bulut sağlayıcısının IAM rolü üzerinden tüm kurumsal altyapıyı ele geçirir.


Bölüm: Olgunluk Analizi ve Sektörel Uyum


OWASP projelerinin sektörel benimsenme düzeyleri ve olgunluk seviyeleri, organizasyonların AppSec bütçelerini nereye yatırmaları gerektiği konusunda önemli sinyaller verir.

Projeler üç ana başlık altında sınıflandırılır:
Flagship (Amiral Gemisi) Projeler: Yıllardır sürekli güncellenen, geniş veri havuzlarına sahip ve PCI DSS, ISO 27001 veya NIST SSDF gibi yasal standartlar tarafından doğrudan zorunlu kılınan projelerdir (örneğin Web, API, Mobile Top 10 projeleri ile ASVS ve SAMM olgunluk modelleri).
Lab Projeleri: Geliştirilmesi aktif devam eden, sektörel farkındalığı yüksek ancak henüz küresel regülasyonlar tarafından doğrudan entegre edilmemiş, veri havuzu yerine uzman consensus'una dayanan projelerdir (örneğin Kubernetes, LLM ve CI/CD Top 10).
Incubator ve Durağan Projeler: Belirli bir dönem popüler olmuş ancak teknolojinin evrilmesi veya gönüllü katkıcıların azalması nedeniyle bakımı duraksamış projelerdir (örneğin Privacy Risks v2.0 veya 2018 Serverless yorumu). Bu projelerin güncel olmayan sürümleri yerine, modern cloud-native rehberlerin kullanılması tavsiye edilmektedir.


Bölüm: Geleceğin Tehdit Sınırları: Ajan Güvenliği ve NHI


Yazılım dünyasındaki en kritik paradigma değişimi, deterministik uygulamalardan otonom çalışan Ajan (Agentic AI) sistemlerine ve insan dışı kimliklerin (Non-Human Identities - NHI) kitlesel yayılımına geçiştir. Bu durum, geleneksel uygulama güvenliği yaklaşımlarını tamamen geçersiz kılmaktadır.

OWASP, bu yeni dönemin risklerini yönetmek amacıyla en son Top 10 for Agentic Applications 2026 projesini duyurmuştur. Bu yeni ekosistemde öne çıkan başlıca tehditler şunlardır:
ASI01: Agent Goal Hijack (Ajan Hedefinin Sabote Edilmesi): Dışarıdan gelen verilerin prompt enjeksiyonu yoluyla ajanın asıl amacını saptırarak saldırganın hedeflerine hizmet etmesi.
ASI02: Tool Misuse (Araçların Kötüye Kullanımı): Ajanın kendisine verilen araçları (örneğin veritabanı sorgulama, e-posta gönderme, kod çalıştırma) beklenmeyen parametrelerle çalıştırarak sistemlere zarar vermesi.
ASI03: Identity & Privilege Abuse (Kimlik ve Yetki İstismarı): Ajanların karmaşık işleri halledebilmesi için aşırı yetkilerle donatılması ve bu yetkilerin manipüle edilmesi.
ASI06: Memory & Context Poisoning (Bellek ve Bağlam Zehirlenmesi): Uzun süreli çalışan ajanların bellek alanlarına kötücül veriler eklenerek ajan kararlarının zaman içinde kalıcı olarak manipüle edilmesi.

Bu sistemlerin en büyük zayıf noktası, insan müdahalesi olmadan birbirleriyle haberleşen İnsan Dışı Kimlikler (NHI) üzerindeki kontrol eksikliğidir. Bir uygulamanın diğerine erişmek için kullandığı API anahtarları, servis hesapları, OAuth izinleri ve JWT tokenları, siber saldırganlar için en kolay sızma noktaları haline gelmiştir. Geleneksel kullanıcı hesapları sıkı 2FA/MFA politikalarıyla korunurken, bu servis-servis kimlikleri çoğunlukla denetlenmemekte ve izlenememektedir. Ajanların ve NHI'ların güvenliği sağlanmadığı sürece, en sağlam Kubernetes kümeleri veya en güvenli web kodları bile otonom yetkilendirme zincirleri üzerinden kolayca bypass edilecektir.

Yazılım güvenliği artık statik bir kontrol listesi değil, yaşayan bir mimari dirençlilik sürecidir. Sistemlerinizi tasarlarken tehdit modellerinizi statik kod analizlerinin ötesine taşımalı; bağımlılıklarınızı, pipeline yapılarınızı ve insan dışı erişim yetkilerinizi sürekli denetim altında tutmalısınız.

Verinizin mimarı olun, egemenliğinizi geri alın. Dinlediğiniz için teşekkürler!
