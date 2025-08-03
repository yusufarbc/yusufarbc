

# **Güvenlik Operasyon Merkezi (SOC) için ELK Stack: Kapsamlı Kurulum, Yapılandırma ve Tehdit Tespiti Kılavuzu**

## **Bölüm 1: Elastic Stack'e Giriş ve SOC için Stratejik Önemi**

Modern siber güvenlik operasyonlarının merkezinde, devasa miktardaki veriyi anlamlandırma ve tehditleri proaktif olarak tespit etme ihtiyacı yatar. Bu ihtiyaca cevap veren en güçlü ve esnek platformlardan biri, başlangıçta ELK Stack olarak bilinen ve günümüzde Elastic Stack adını alan teknoloji yığınıdır. Bu bölüm, yığının temellerini, tarihsel gelişimini ve modern bir Güvenlik Operasyon Merkezi (SOC) için neden vazgeçilmez bir teknoloji olduğunu stratejik bir bakış açısıyla ortaya koyacaktır.

### **1.1. ELK'den Elastic Stack'e: Evrim ve Temel Bileşenler**

Elastic Stack, başlangıçta üç temel açık kaynaklı aracın baş harflerinden oluşan ELK kısaltmasıyla tanınıyordu. Bu üç bileşen, birlikte çalışarak log verilerinin toplanması, aranması, analiz edilmesi ve görselleştirilmesi için güçlü bir temel oluşturur.1

* **Elasticsearch:** Yığının kalbi ve beynidir. Apache Lucene üzerine inşa edilmiş, dağıtık, JSON tabanlı bir arama ve analitik motorudur. Temel görevi, kendisine gönderilen yapılandırılmış veya yapılandırılmamış verileri depolamak, "tersine dizin (inverted index)" adı verilen özel bir yapıda indeksleyerek inanılmaz hızlı aramalara olanak tanımak ve bu veriler üzerinde karmaşık analizler yapmaktır. Yatay ölçeklenebilirlik için tasarlanmıştır, bu da veri hacmi arttıkça yeni sunucular (node'lar) eklenerek performansın korunabileceği anlamına gelir.1  
* **Logstash:** Yığının veri işleme boru hattıdır. Sunucu tarafında çalışan bu araç, sistem logları, web sunucu logları, uygulama logları ve daha birçok farklı kaynaktan veri toplar. Logstash'in asıl gücü, bu ham verileri alıp, filtreler aracılığıyla dönüştürme (transformation), ayrıştırma (parsing) ve zenginleştirme (enrichment) yeteneğidir. Örneğin, yapılandırılmamış bir log satırını anlamlı alanlara (IP adresi, kullanıcı adı, zaman damgası vb.) ayırabilir ve ardından bu veriyi Elasticsearch gibi bir hedefe gönderebilir.2  
* **Kibana:** Yığının görselleştirme katmanı ve kullanıcı arayüzüdür. Analistlerin Elasticsearch'te depolanan verilerle etkileşime girmesini sağlar. Kibana ile veriler; çizgisel grafikler, pasta grafikler, haritalar ve en önemlisi, birden çok görselleştirmeyi bir araya getiren interaktif panolar (dashboards) şeklinde sunulabilir. Bu, analistlerin karmaşık veri setlerindeki eğilimleri, anormallikleri ve potansiyel güvenlik tehditlerini hızla tespit etmelerine olanak tanır.3

Yığının evrimindeki en önemli dönüm noktası, 2015 yılında "Beats" adı verilen hafif veri göndericilerinin (lightweight data shippers) aileye katılmasıyla yaşandı. Bu ekleme, yığının adının ELK Stack'ten daha kapsayıcı olan **Elastic Stack**'e dönüşmesine neden oldu.5 Bu değişim, sadece bir isimlendirme güncellemesi değil, aynı zamanda temel mimaride stratejik bir iyileştirmeydi. Logstash, veri işleme için son derece güçlü olmasına rağmen, Java tabanlı yapısı nedeniyle kaynak tüketimi yüksekti. Binlerce sunucuya sadece log iletmek amacıyla tam bir Logstash kurmak, hem yönetimsel bir yük hem de ciddi bir performans maliyeti getiriyordu. Elastic, bu sorunu çözmek için Go dilinde yazılmış, son derece hafif ve tek bir amaca hizmet eden Beats ajanlarını geliştirdi.9 Beats, uç noktalardaki (sunucular, ağ cihazları vb.) verileri minimum kaynak kullanarak toplar ve merkezi bir Logstash örneğine veya doğrudan Elasticsearch'e gönderir. Bu mimari ayrım, yani veri toplama katmanının (Beats) veri işleme katmanından (Logstash) ayrılması, yığının dağıtım esnekliğini ve ölçeklenebilirliğini kökten değiştirdi.9

Bu evrim, günümüzde **Elastic Agent** ve **Fleet** ile devam etmektedir. Elastic Agent, farklı Beats ajanlarının (Filebeat, Metricbeat, Auditbeat vb.) işlevlerini tek bir ajan altında birleştirirken, Fleet ise bu binlerce ajanın merkezi olarak tek bir arayüzden yönetilmesini, yapılandırılmasını ve güncellenmesini sağlayarak operasyonel verimliliği en üst düzeye çıkarır.4

### **1.2. Neden SOC için Elastic Stack?**

Elastic Stack, modern bir SOC'nin ihtiyaçlarını karşılamak için bir dizi stratejik avantaj sunar, bu da onu geleneksel SIEM (Security Information and Event Management) çözümlerine güçlü bir alternatif haline getirir.

* **Merkezi Log Yönetimi (Centralized Logging):** Bir SOC'nin en temel gereksinimi, izlediği tüm varlıklardan (sunucular, güvenlik duvarları, uygulamalar, bulut ortamları) gelen logları tek bir yerde toplamaktır. Elastic Stack, bu logları merkezi bir Elasticsearch kümesinde toplayarak, analistlerin farklı sistemlerdeki olayları birbiriyle ilişkilendirmesine (korelasyon) ve bir saldırının bütünsel resmini görmesine olanak tanır. Bu, hem tehdit tespiti hem de uyumluluk (compliance) raporlaması için kritik bir yetenektir.6  
* **Gerçek Zamanlı Analiz ve Görselleştirme:** Elasticsearch'in neredeyse gerçek zamanlı arama yetenekleri ve Kibana'nın dinamik görselleştirme araçları sayesinde, güvenlik analistleri olaylar meydana geldikçe onları analiz edebilir. Bu, tehditlere anında müdahale etme ve zararı en aza indirme kapasitesini artırır.6  
* **Ölçeklenebilirlik ve Esneklik:** Elastic Stack'in dağıtık mimarisi, yatay olarak ölçeklenmek üzere tasarlanmıştır. Organizasyon büyüdükçe ve izlenen sistem sayısı arttıkça, artan veri hacmini karşılamak için Elasticsearch ve diğer bileşenlere yeni node'lar eklemek yeterlidir. Bu, yığının küçük bir departmandan küresel bir kuruluşa kadar her ölçekte etkili bir şekilde kullanılabilmesini sağlar.6  
* **Maliyet Etkinliği:** Temel bileşenlerin açık kaynaklı olması, Elastic Stack'in geleneksel, lisans maliyeti yüksek SIEM çözümlerine göre daha düşük bir başlangıç maliyeti sunmasını sağlar.13 Ancak, bu "ücretsiz" algısı, toplam sahip olma maliyeti (Total Cost of Ownership \- TCO) bağlamında dikkatli değerlendirilmelidir. Açık kaynaklı temel yığın, bir SIEM'in altyapısını sağlar: log toplama, depolama ve arama. Fakat modern bir SIEM'in beynini oluşturan otomatik tehdit tespiti için önceden oluşturulmuş korelasyon kuralları, gelişmiş uyarı mekanizmaları, olay müdahale iş akışları (case management) ve makine öğrenmesi gibi özellikler, genellikle Elastic'in ticari lisans katmanları altında sunduğu  
  **Elastic Security** çözümünün bir parçasıdır.15 Dolayısıyla, tam fonksiyonel bir SIEM kurarken lisans, donanım ve uzman personel maliyetleri de hesaba katılmalıdır.17  
* **Modern SIEM Yetenekleri:** Elastic, temel log yönetiminin çok ötesine geçerek, Elastic Security çözümü ile modern bir SIEM'in tüm gereksinimlerini karşılar. Bu çözüm; MITRE ATT\&CK® çerçevesiyle hizalanmış yüzlerce önceden oluşturulmuş tespit kuralı, proaktif tehdit avcılığı için araçlar, makine öğrenmesi tabanlı anomali tespiti ve entegre olay müdahale yetenekleri sunar.18

### **1.3. Elastic Common Schema (ECS): Veri Standardizasyonunun Gücü**

Farklı üreticilere ait yüzlerce farklı cihaz ve uygulamadan veri toplamanın en büyük zorluklarından biri, her birinin kendine özgü bir log formatına ve alan adlarına sahip olmasıdır. Örneğin, bir güvenlik duvarı logunda kaynak IP adresi src\_ip olarak adlandırılırken, bir Windows olay kaydında IpAddress olarak geçebilir. Bu tutarsızlık, farklı veri kaynakları arasında tutarlı analizler ve korelasyonlar yapmayı imkansız hale getirir.

**Elastic Common Schema (ECS)**, bu sorunu çözmek için geliştirilmiş, açık kaynaklı bir veri modelleme standardıdır.21 ECS, farklı kaynaklardan gelen verileri ortak bir alan adı, veri tipi ve taksonomi setine göre standartlaştırır. Örneğin, ECS'ye göre kaynak IP adresi, hangi log kaynağından gelirse gelsin, her zaman

source.ip alanında saklanır. Benzer şekilde, hedef IP adresi destination.ip, kullanıcı adı ise user.name olarak standartlaştırılır.22

ECS'nin bir SOC için önemi büyüktür çünkü:

* **Analitik Tutarlılık Sağlar:** Analistler, verinin kaynağından bağımsız olarak tutarlı sorgular yazabilirler. Bu, bir kuralın veya panonun hem güvenlik duvarı logları hem de bulut logları üzerinde değişiklik yapılmadan çalışabilmesi anlamına gelir.  
* **Korelasyonu Kolaylaştırır:** Farklı sistemlerden gelen olaylar arasında (örneğin, bir ağ akışı ile bir process oluşturma olayı arasında) ilişki kurmayı basitleştirir.  
* **İçerik Paylaşımını Mümkün Kılar:** Elastic tarafından veya topluluk tarafından geliştirilen tespit kuralları, panolar ve makine öğrenmesi işleri, ECS uyumlu verilerle "kutudan çıktığı gibi" çalışır. Bu, bir SOC'nin hızla değer üretmesini sağlar.21

Kısacası ECS, Elastic Stack'i dağınık logları toplayan bir sistemden, verileri anlayan ve aralarında anlamlı ilişkiler kurabilen entegre bir güvenlik analitiği platformuna dönüştüren temel yapıştırıcıdır.

## **Bölüm 2: SOC için Elastic Stack Mimarisi ve Veri Akışı**

Teorik altyapıyı anladıktan sonra, bir SOC ortamında Elastic Stack'in nasıl bir mimariyle kurulacağını ve bir güvenlik verisinin bu mimari içinde hangi aşamalardan geçerek analiste ulaştığını anlamak kritik öneme sahiptir. Bu bölüm, farklı ölçekteki organizasyonlar için referans mimarileri ve veri akışının anatomisini detaylandıracaktır.

### **2.1. Referans Mimariler: Başlangıçtan Üretim Ortamına**

Elastic Stack mimarisi, ihtiyaca göre son derece esnek bir şekilde tasarlanabilir.

* **Küçük Ölçekli/Test Mimarisi:** Bu mimari, genellikle kavram kanıtlama (Proof of Concept \- PoC) çalışmaları, küçük laboratuvar ortamları veya çok sınırlı veri hacmine sahip organizasyonlar için uygundur. Genellikle tek bir sunucu üzerinde tüm temel bileşenler (Elasticsearch, Logstash, Kibana) çalışır. Birkaç ajanstan (Beats) gelen veriler, doğrudan bu tek sunucuya yönlendirilir. Bu kurulum basit ve hızlıdır ancak yüksek erişilebilirlik veya hata toleransı sunmaz; herhangi bir bileşenin çökmesi tüm sistemin durmasına neden olabilir.23  
* **Tam Teşekküllü Üretim Mimarisi:** Orta ve büyük ölçekli organizasyonlar için tasarlanan bu mimari, yüksek erişilebilirlik (High Availability), hata toleransı (Fault Tolerance) ve ölçeklenebilirlik üzerine kuruludur.  
  * **Elasticsearch Cluster:** Veri güvenliği ve arama performansı için en az üç Elasticsearch node'undan oluşan bir küme (cluster) kurulur. Veriler, "shard" adı verilen parçalara bölünür ve bu shard'ların kopyaları (replicas) farklı node'lara dağıtılır. Bu sayede bir node çökse bile veri kaybı yaşanmaz ve sistem çalışmaya devam eder.5  
  * **Veri Katmanları (Data Tiers):** Veri yaşam döngüsünü ve depolama maliyetlerini optimize etmek için veri katmanları kullanılır. Bu strateji, verinin yaşına ve erişim sıklığına göre farklı performans ve maliyetteki donanımlarda saklanmasını sağlar:  
    * **Hot Tier:** En yeni ve en sık sorgulanan veriler (örn. son 7 günün logları) için kullanılır. En hızlı depolama birimlerinde (SSD) bulunur.15  
    * **Warm Tier:** Daha az sıklıkla erişilen veriler için kullanılır. Daha yavaş ama daha ucuz disklerde saklanabilir.15  
    * **Cold Tier:** Nadiren erişilen, salt okunur (read-only) veriler için kullanılır. Daha da ucuz depolama çözümlerinde tutulur.15  
    * **Frozen Tier:** Arşiv amaçlı veriler için kullanılır. Veriler, aranabilir anlık görüntüler (searchable snapshots) olarak nesne depolama (object storage) gibi çok ucuz alanlarda saklanır ve sorgulanmadan önce "rehydrate" edilmesine gerek kalmaz. Bu, uzun süreli veri saklama maliyetlerini önemli ölçüde düşürür.15  
  * **Logstash Kümesi ve Kuyruk Mekanizması:** Gelen veri yükünü dengelemek ve veri kaybını önlemek için mimariye ek katmanlar eklenir. Birden fazla Logstash örneği bir yük dengeleyici arkasında çalıştırılarak işleme kapasitesi artırılır. Daha da önemlisi, Beats ile Logstash arasına **Apache Kafka** veya **Redis** gibi bir mesaj kuyruğu (message queue) yerleştirilir. Bu kuyruk, bir tampon görevi görür. Ani veri patlamalarında veya Logstash geçici olarak hizmet dışı kaldığında, veriler bu kuyrukta güvenli bir şekilde bekletilir ve Logstash tekrar müsait olduğunda işlenmek üzere çekilir. Bu, veri kaybına karşı kritik bir güvencedir.25  
  * **Kibana Yedekliliği:** Kullanıcı arayüzüne kesintisiz erişimi garanti altına almak için birden fazla Kibana örneği, bir yük dengeleyici (load balancer) arkasında çalıştırılabilir. Bu sayede bir Kibana örneği çökse bile analistler çalışmalarına devam edebilir.14

### **2.2. Veri Akışının Anatomisi: Bir Güvenlik Verisinin Yolculuğu**

Bir güvenlik olayının (örneğin, bir sunucudaki başarısız bir giriş denemesi) log kaydının, analistin ekranındaki bir uyarıya dönüşme süreci aşağıdaki adımları izler:

1. **Toplama (Collection):** Yolculuk, verinin doğduğu yerde, yani uç noktada başlar. Bir sunucu, dizüstü bilgisayar, ağ cihazı veya bulut hizmeti üzerindeki **Elastic Agent** veya spesifik bir **Beat** (örn. Winlogbeat Windows olay günlükleri için, Auditbeat Linux audit verileri için, Filebeat genel log dosyaları için) bu ham log kaydını yakalar.4  
2. **İşleme ve Zenginleştirme (Processing & Enrichment):** Ham log, tek başına çok anlamlı değildir. Analiz edilebilir hale gelmesi için işlenmesi gerekir. Bu aşamada iki temel yol izlenebilir:  
   * **Seçenek A (Hafif İşleme):** Veri, doğrudan Elasticsearch'e gönderilir. Elasticsearch'e yazılmadan hemen önce, **Ingest Pipeline** adı verilen bir mekanizma tarafından işlenir. Ingest Pipeline'lar, Elasticsearch node'ları üzerinde çalışır ve alan ekleme/çıkarma, veri tipi değiştirme gibi basit dönüşümler için idealdir. Bu yaklaşım, mimariden Logstash'i çıkararak daha basit ve hafif bir yapı sunar.4  
   * **Seçenek B (Gelişmiş İşleme):** Veri, daha karmaşık ve yoğun kaynak gerektiren işlemler için merkezi bir **Logstash** örneğine gönderilir. Logstash, filter eklentileri aracılığıyla veriyi derinlemesine işler:  
     * **Ayrıştırma (Parsing):** grok filtresi ile yapılandırılmamış bir log satırını anlamlı alanlara böler.  
     * **Dönüştürme (Mutation):** Alanları yeniden adlandırır, siler veya veri tiplerini değiştirir.  
     * **Zenginleştirme (Enrichment):** geoip filtresi ile bir IP adresine coğrafi konum bilgisi (şehir, ülke) ekler; translate filtresi ile bir tehdit istihbaratı listesindeki kötücül IP adreslerini işaretler veya dns filtresi ile IP adreslerini alan adlarına çözümler.6  
3. **Depolama ve İndeksleme (Storage & Indexing):** İşlenmiş, zenginleştirilmiş ve ECS formatına getirilmiş olan veri, son durağı olan **Elasticsearch**'e ulaşır. Elasticsearch, bu veriyi alıp, daha önce bahsedilen "tersine dizin" yapısını kullanarak indeksler. Bu işlem, verinin saniyeler içinde aranabilir hale gelmesini sağlar. Veriler, index adı verilen ve genellikle zaman tabanlı (örn. winlogbeat-2024.05.20) mantıksal gruplar halinde saklanır.5  
4. **Analiz ve Görselleştirme (Analysis & Visualization):** Veri artık analistin erişimine hazırdır. Analist, **Kibana** arayüzünü kullanarak:  
   * **Discover** sekmesinde KQL (Kibana Query Language) veya EQL (Event Query Language) kullanarak verileri sorgular.  
   * **Dashboard**'larda önceden hazırlanmış panolar aracılığıyla güvenlik duruşunu izler.  
   * **Security** uygulamasında tehditleri tespit etmek için tespit kuralları (detection rules) çalıştırır.  
   * Bir uyarıyı araştırmak için **Timeline** aracını kullanır ve bulgularını bir **Case**'e kaydeder.3

### **2.3. Dağıtım Modelleri: On-Premise vs. Elastic Cloud**

Bir SIEM platformu kurarken verilmesi gereken en temel stratejik kararlardan biri, platformun nerede barındırılacağıdır. Bu karar, maliyet, yönetim yükü, esneklik ve güvenlik sorumluluklarını doğrudan etkiler.16

Aşağıdaki tablo, bu iki temel dağıtım modelini çeşitli kriterlere göre karşılaştırmaktadır:

**Tablo 1: On-Premise ve Elastic Cloud Dağıtım Modellerinin Karşılaştırması**

| Özellik / Kriter | On-Premise (Self-Managed) | Elastic Cloud (Managed Service) |
| :---- | :---- | :---- |
| **Başlangıç Maliyeti** | Düşük yazılım maliyeti (temel bileşenler ücretsiz), ancak sunucu, depolama ve ağ donanımı için yüksek sermaye harcaması (CapEx) gerektirir.17 | Düşük başlangıç maliyeti (donanım yatırımı yok), ancak kullanım ve özelliklere dayalı, öngörülebilir bir abonelik ücreti (OpEx) vardır.16 |
| **Operasyonel Maliyet** | Yüksek. Sistemi yönetecek uzman personel maaşları, veri merkezi kirası, elektrik, soğutma ve sürekli bakım maliyetlerini içerir.17 | Tahmin edilebilir. Abonelik ücreti, altyapı yönetimi, bakım ve destek gibi operasyonel maliyetlerin büyük bir kısmını kapsar.29 |
| **Yönetim ve Bakım** | Tamamen organizasyonun sorumluluğundadır. Kurulum, yapılandırma, yedekleme, felaket kurtarma, yazılım güncellemeleri ve güvenlik yamaları şirket içi ekipler tarafından yapılmalıdır.28 | Elastic tarafından yönetilir. Altyapının sağlığı, güncellemeler, yedeklemeler ve temel güvenlik, hizmet sağlayıcının sorumluluğundadır. Bu, ekiplerin altyapı yerine güvenliğe odaklanmasını sağlar.28 |
| **Ölçeklenebilirlik** | Mümkündür, ancak manuel planlama, yeni donanım tedariki ve yapılandırma gerektirir. Yavaş ve zahmetli bir süreç olabilir.14 | Kolay ve hızlıdır. Birkaç tıklama ile veya API çağrıları aracılığıyla işlem gücü ve depolama kapasitesi anında artırılabilir veya azaltılabilir.15 |
| **Kurulum Hızı** | Yavaştır. Tam bir üretim ortamının kurulması ve yapılandırılması günler, hatta haftalar sürebilir.28 | Hızlıdır. Birkaç dakika içinde, seçilen bulut sağlayıcısında (AWS, Azure, GCP) tam fonksiyonel bir küme oluşturulabilir.33 |
| **Güvenlik ve Uyumluluk** | Organizasyonun tam sorumluluğundadır. Veri merkezi güvenliği ve PCI-DSS, HIPAA gibi uyumluluk sertifikasyonlarının alınması ve sürdürülmesi şirkete aittir.36 | Paylaşılan sorumluluk modeline dayanır. Elastic, altyapı katmanı için SOC 2, ISO 27001, HIPAA ve PCI gibi birçok uluslararası standardı karşılar. Müşteri, uygulama katmanındaki verilerin güvenliğinden sorumludur.37 |
| **Özelleştirme ve Kontrol** | Maksimum kontrol sunar. Organizasyonlar, altyapının her detayı üzerinde (işletim sistemi, ağ yapılandırması, donanım seçimi) tam kontrole sahiptir.16 | Daha az kontrol vardır. Altyapı düzeyindeki özelleştirmeler sınırlıdır, ancak uygulama katmanında (Elasticsearch, Kibana ayarları) yüksek derecede esneklik devam eder.16 |

Bu tablo, "ücretsiz" açık kaynaklı yazılımın getirdiği yönetim yükü ve gizli maliyetler ile yönetilen bir hizmetin sunduğu kolaylık ve öngörülebilir maliyetler arasındaki takası net bir şekilde ortaya koymaktadır. Karar, organizasyonun teknik yetkinliği, bütçesi ve stratejik önceliklerine bağlıdır.

## **Bölüm 3: On-Premise Elastic Stack Kurulumu (Adım Adım Ubuntu Kılavuzu)**

Bu bölüm, kendi sunucuları üzerinde (on-premise) bir Elastic Stack SIEM ortamı kurmak isteyen siber güvenlik profesyonelleri için pratik, adım adım bir teknik kılavuz sunmaktadır. Yaygın kullanımı ve güçlü topluluk desteği nedeniyle temel işletim sistemi olarak Ubuntu 22.04 seçilmiştir. Bu kılavuz, temel bir test ortamı kurmak için gereken tüm adımları içermektedir.

### **3.1. Ön Gereksinimler ve Sistem Hazırlığı**

Kuruluma başlamadan önce sistemin belirli gereksinimleri karşıladığından emin olunmalıdır.

* **Donanım:** Test ortamı için en az 4 GB RAM ve 2 CPU'ya sahip bir sanal veya fiziksel sunucu gereklidir.40 Üretim ortamları için bu kaynaklar, günlük veri hacmi (GB/gün), kullanıcı sayısı ve çalıştırılacak tespit kurallarının karmaşıklığına göre önemli ölçüde artırılmalıdır.  
* **Yazılım:** Elastic Stack bileşenleri Java Sanal Makinesi (JVM) üzerinde çalışır. Bu nedenle, uyumlu bir Java sürümünün kurulması zorunludur. Genellikle Java 8 veya Java 11 tavsiye edilir. Logstash gibi bazı bileşenlerin en yeni Java sürümleriyle uyumluluk sorunları yaşayabileceği unutulmamalıdır.32  
  Bash  
  sudo apt update  
  sudo apt install openjdk-11-jdk \-y  
  java \-version

* **Ağ Yapılandırması:** Bileşenler arasındaki iletişimi ve Kibana panosuna dışarıdan erişimi sağlamak için ilgili portların güvenlik duvarında (örneğin, Ubuntu'da ufw) açılması gerekir.  
  * Elasticsearch: 9200 (API erişimi)  
  * Kibana: 5601 (Web arayüzü)  
  * Beats'ten Logstash'e veri alımı: 5044

Bash  
sudo ufw allow 5601/tcp  
sudo ufw allow 9200/tcp  
sudo ufw allow 5044/tcp  
sudo ufw enable

### **3.2. Adım Adım Kurulum**

Kurulum sırası, bileşenlerin birbirine olan bağımlılıkları nedeniyle önemlidir. Bu bağımlılık, sistemin sorunsuz çalışması için mantıksal bir zorunluluktur. Elasticsearch, yığının veri deposu olduğu için ilk kurulmalıdır. Kibana, verileri görselleştirmek için Elasticsearch'e bağlanır, bu yüzden ikinci sırada yer alır. Logstash ve Beats ise verileri bu kurulu altyapıya göndereceği için en son kurulur.42

* Adım 1: Elastic Repository Ekleme  
  Elastic'in resmi yazılım paketlerine erişmek için APT paket yöneticisine Elastic'in GPG anahtarı ve deposu eklenmelidir.26  
  Bash  
  wget \-qO \- https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg \--dearmor \-o /usr/share/keyrings/elasticsearch-keyring.gpg  
  sudo apt-get install apt-transport-https  
  echo "deb \[signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg\] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list  
  sudo apt-get update

* Adım 2: Elasticsearch Kurulumu ve Yapılandırması  
  Elasticsearch, verilerin depolandığı ve arandığı merkezi motordur.  
  * **Kurulum:**  
    Bash  
    sudo apt-get install elasticsearch

  * **Yapılandırma:** Temel ayarlar için /etc/elasticsearch/elasticsearch.yml dosyası düzenlenir.3  
    Bash  
    sudo nano /etc/elasticsearch/elasticsearch.yml

    Dosya içinde aşağıdaki satırları bulun ve düzenleyin (başlarındaki \# işaretini kaldırarak):  
    YAML  
    \# Tek node'lu bir test ortamı için temel ayarlar  
    cluster.name: my-soc-cluster  
    node.name: node-1  
    network.host: 0.0.0.0 \# Tüm ağ arayüzlerinden erişime izin ver  
    http.port: 9200  
    \# Tek node'lu cluster için discovery ayarı  
    discovery.type: single-node

  * **Servisi Başlatma:**  
    Bash  
    sudo systemctl daemon-reload  
    sudo systemctl enable elasticsearch.service  
    sudo systemctl start elasticsearch.service

    Servisin durumunu kontrol etmek için: curl \-X GET "localhost:9200/" komutu çalıştırıldığında JSON formatında bir yanıt alınmalıdır.  
* Adım 3: Kibana Kurulumu ve Yapılandırması  
  Kibana, verileri görselleştirmek ve yönetmek için kullanılan web arayüzüdür.  
  * **Kurulum:**  
    Bash  
    sudo apt-get install kibana

  * **Yapılandırma:** /etc/kibana/kibana.yml dosyası düzenlenir.3  
    Bash  
    sudo nano /etc/kibana/kibana.yml

    Dosya içinde aşağıdaki satırları bulun ve düzenleyin:  
    YAML  
    server.port: 5601  
    server.host: "0.0.0.0" \# Dışarıdan erişim için  
    elasticsearch.hosts: \["http://localhost:9200"\]

  * **Servisi Başlatma:**  
    Bash  
    sudo systemctl enable kibana.service  
    sudo systemctl start kibana.service

    Birkaç dakika sonra, bir web tarayıcısından http://\<sunucu\_ip\_adresi\>:5601 adresine giderek Kibana arayüzüne erişilebilmelidir.  
* Adım 4: Logstash Kurulumu ve Yapılandırması  
  Logstash, verileri toplayıp işleyerek Elasticsearch'e gönderir.  
  * **Kurulum:**  
    Bash  
    sudo apt-get install logstash

  * **Yapılandırma:** Logstash yapılandırmaları /etc/logstash/conf.d/ dizini altına .conf uzantılı dosyalar olarak oluşturulur. Beats'ten veri alacak basit bir yapılandırma dosyası oluşturalım 26:  
    Bash  
    sudo nano /etc/logstash/conf.d/02-beats-input.conf

    İçine aşağıdaki yapılandırmayı ekleyin:  
    Kod snippet'i  
    input {  
      beats {  
        port \=\> 5044  
      }  
    }

    \# Bu bölümde veriyi ayrıştırmak ve zenginleştirmek için filtreler eklenebilir.  
    \# Örneğin: filter { grok {... } }

    output {  
      elasticsearch {  
        hosts \=\> \["http://localhost:9200"\]  
        index \=\> "%{\[@metadata\]\[beat\]}-%{\[@metadata\]\[version\]}-%{+YYYY.MM.dd}"  
      }  
    }

  * **Servisi Başlatma:**  
    Bash  
    sudo systemctl enable logstash.service  
    sudo systemctl start logstash.service

* Adım 5: Filebeat Kurulumu ve Yapılandırması (İstemci Sunucuda)  
  Filebeat, izlenecek istemci sunuculara kurulur ve logları merkezi Logstash'e gönderir.  
  * **Kurulum:**  
    Bash  
    sudo apt-get install filebeat

  * **Yapılandırma:** /etc/filebeat/filebeat.yml dosyası düzenlenir.10 Önce sistem loglarını toplamak için  
    system modülü etkinleştirilir:  
    Bash  
    sudo filebeat modules enable system

    Ardından, filebeat.yml dosyasında çıktının Logstash'e yönlendirilmesi sağlanır. output.elasticsearch bölümü yorum satırı (\#) haline getirilir ve output.logstash bölümü aktif edilir 26:  
    YAML  
    \#... diğer ayarlar...

    \#output.elasticsearch:  
      \# Array of hosts to connect to.  
      \#hosts: \["localhost:9200"\]

    output.logstash:  
      \# The Logstash hosts  
      hosts: \["\<logstash\_sunucu\_ip\>:5044"\]

    \#... diğer ayarlar...

  * **Servisi Başlatma:**  
    Bash  
    sudo filebeat setup  
    sudo systemctl enable filebeat.service  
    sudo systemctl start filebeat.service

Artık Filebeat, sistem loglarını toplayıp 5044 portu üzerinden Logstash'e, oradan da işlenerek Elasticsearch'e gönderecektir. Kibana'da **Discover** sekmesi altında bu loglar görülebilir olmalıdır.

### **3.3. Temel Güvenlik Yapılandırması: Nginx ile Proxyleme**

Varsayılan kurulumda Kibana panosuna erişim herkese açıktır. Bu, bir üretim ortamı için kabul edilemez bir güvenlik açığıdır. En basit güvenlik önlemi, Nginx'i bir ters proxy (reverse proxy) olarak kurup Kibana'ya erişimi parola ile korumaktır.26

1. **Nginx ve Gerekli Araçları Kurma:**  
   Bash  
   sudo apt-get install nginx apache2-utils \-y

2. **Kibana Erişimi için Kullanıcı Oluşturma:**  
   Bash  
   sudo htpasswd \-c /etc/nginx/htpasswd.users kibanaadmin

   Bu komut, kibanaadmin adında bir kullanıcı oluşturur ve sizden bir parola belirlemenizi ister.  
3. **Nginx Site Yapılandırması Oluşturma:**  
   Bash  
   sudo nano /etc/nginx/sites-available/kibana

   Dosyanın içine aşağıdaki yapılandırmayı ekleyin:  
   Nginx  
   server {  
       listen 80;  
       server\_name \<sunucu\_ip\_adresi\_veya\_alan\_adi\>;

       auth\_basic "Restricted Access";  
       auth\_basic\_user\_file /etc/nginx/htpasswd.users;

       location / {  
           proxy\_pass http://localhost:5601;  
           proxy\_http\_version 1.1;  
           proxy\_set\_header Upgrade $http\_upgrade;  
           proxy\_set\_header Connection 'upgrade';  
           proxy\_set\_header Host $host;  
           proxy\_cache\_bypass $http\_upgrade;  
       }  
   }

4. **Yapılandırmayı Etkinleştirme ve Nginx'i Yeniden Başlatma:**  
   Bash  
   sudo ln \-s /etc/nginx/sites-available/kibana /etc/nginx/sites-enabled/  
   sudo nginx \-t \# Yapılandırma dosyasını test et  
   sudo systemctl restart nginx

Artık http://\<sunucu\_ip\_adresi\> adresine gidildiğinde, Kibana panosuna erişmeden önce bir kullanıcı adı ve parola sorulacaktır.

## **Bölüm 4: Elastic Security ile Tehdit Tespiti: Pratik Kural Yazımı ve Yönetimi**

Elastic Stack'i bir SIEM olarak güçlü kılan asıl yetenek, toplanan veriler üzerinde çalışan ve potansiyel tehditleri otomatik olarak belirleyen tespit motorudur. Bu bölüm, Elastic Security'nin tehdit tespit yeteneklerini kullanarak sıfırdan nasıl etkili kurallar yazılacağını ve bu kuralların nasıl yönetileceğini uygulamalı örneklerle gösterecektir.

### **4.1. Elastic Security Arayüzüne Genel Bakış**

Kibana'daki "Security" uygulaması, bir SOC analistinin ana çalışma alanıdır ve birkaç temel bölümden oluşur:

* **Detections Sayfası:** Burası, tüm tespit kurallarının (detection rules) merkezi yönetim noktasıdır. Elastic tarafından sağlanan yüzlerce önceden oluşturulmuş (prebuilt) kural ve analistler tarafından oluşturulan özel (custom) kurallar burada listelenir, etkinleştirilir veya devre dışı bırakılır.27  
* **Alerts Sayfası:** Etkinleştirilmiş kurallar, koşullarıyla eşleşen bir olay tespit ettiğinde bir "uyarı" (alert veya signal) oluşturur. Bu sayfa, oluşturulan tüm uyarıların görüntülendiği, önem derecesine göre sıralandığı ve ilk triyajın yapıldığı yerdir.46  
* **Timeline (Zaman Çizelgesi):** Bir analistin en güçlü araştırma aracıdır. Bir veya daha fazla şüpheli uyarı seçildiğinde, bu uyarılar tek bir tıkla Timeline'a gönderilebilir. Timeline, ilgili olayları, logları ve diğer verileri kronolojik bir sırada bir araya getirerek analistin bir saldırının tam hikayesini oluşturmasına, olaylar arasında ilişki kurmasına ve kanıtları belgelemesine olanak tanır.27  
* **Cases (Vakalar):** Bir araştırma, resmi bir müdahale gerektirdiğinde "vaka"ya dönüştürülür. Cases özelliği, bir olayla ilgili tüm bulguları (Timeline anlık görüntüleri, notlar, uyarılar) tek bir yerde toplayan, diğer analistlerle işbirliği yapmayı sağlayan ve müdahale sürecini belgeleyen bir vaka yönetim sistemidir.27

### **4.2. Tespit Kurallarının Anatomisi ve Dilleri**

Etkili bir kural yazmak için, bir kuralı oluşturan bileşenleri ve bu kuralın mantığını ifade etmek için kullanılan farklı sorgu dillerini anlamak gerekir.

* **Kural Bileşenleri:** Her tespit kuralı genellikle şu temel unsurları içerir:  
  * **Temel Ayarlar:** Kuralın adı, açıklaması, önem derecesi (Low, Medium, High, Critical) ve ilişkilendirildiği MITRE ATT\&CK® taktik ve teknikleri gibi meta veriler.45  
  * **Tanım (Define):** Kuralın kalbi olan sorgu mantığı. Hangi verinin (index pattern), hangi koşullarla aranacağını belirtir.  
  * **Zamanlama (Schedule):** Kuralın ne sıklıkla çalışacağını (örn. her 5 dakikada bir) ve ne kadar geriye dönük veriyi tarayacağını (look-back time) belirler.  
  * **Aksiyonlar (Actions):** Kural tetiklendiğinde otomatik olarak gerçekleştirilecek eylemler. Örneğin, bir Slack kanalına bildirim gönderme, bir e-posta atma veya bir vaka yönetim sisteminde (Jira, ServiceNow) bilet açma gibi.15  
* **Kural Dilleri ve Türleri:** Elastic Security, farklı senaryolar için farklı kural türleri ve dilleri sunar. Bu dillerin evrimi, platformun basit log aramasından karmaşık davranışsal analize doğru gelişimini yansıtır.  
  * **Custom Query (KQL/Lucene):** En temel kural türüdür. Tekil olayları veya basit mantıksal koşulları tespit etmek için kullanılır. KQL (Kibana Query Language), process.name : "powershell.exe" gibi basit ve kullanıcı dostu bir sözdizimi sunar.44  
  * **Event Correlation (EQL):** Siber güvenliğin doğası, tekil olaylardan çok olayların bir dizisiyle ilgilidir. Bir saldırı genellikle keşif, sızma, yanal hareket gibi bir dizi adımdan oluşur. EQL (Event Query Language), bu tür davranışsal dizileri (sequences) tespit etmek için özel olarak tasarlanmıştır. Örneğin, "Önce A olayı oldu, ardından 5 dakika içinde aynı ana makinede B olayı oldu" gibi kurallar yazmak için idealdir. Bu dil, Elastic'i reaktif bir log arama aracından proaktif bir davranışsal tespit platformuna dönüştüren en önemli adımlardan biridir.45  
  * **Threshold:** Belirli bir olayın, tanımlanan bir süre içinde belirli bir eşik değerini aşması durumunda alarm üretir. Brute-force saldırıları veya veri sızdırma girişimleri gibi tekrarlayan aktiviteleri tespit etmek için kullanılır.49  
  * **Machine Learning:** Elastic'in denetimsiz (unsupervised) makine öğrenmesi modellerini kullanarak normal davranıştan sapan anormal aktiviteleri tespit eder. Örneğin, bir kullanıcının daha önce hiç erişmediği bir sunucuya erişmesi veya sistemde çok nadir görülen bir işlemin çalıştırılması gibi "bilinmeyen bilinmeyenleri" bulmak için güçlüdür.21  
  * **ES|QL:** Elastic'in en yeni ve en güçlü sorgu dilidir. Analistlerin sadece veri aramakla kalmayıp, sorgu sırasında veriyi dönüştürmesine, zenginleştirmesine, birleştirmesine ve istatistiksel analizler yapmasına olanak tanır. Tehdit avcılığı ve karmaşık veri analizi senaryoları için muazzam bir esneklik sağlar ve Splunk'ın SPL diline bir yanıt niteliğindedir.29

### **4.3. Pratik Kural Yazımı Örnekleri**

Aşağıda, farklı kural türleri kullanılarak oluşturulmuş, gerçek dünya senaryolarına dayalı üç pratik tespit kuralı örneği verilmiştir.

* **Örnek 1: Başarısız Giriş Denemeleri ile Brute-Force Tespiti (Threshold Rule)**  
  * **Senaryo:** Bir saldırganın, kısa bir süre içinde tek bir kullanıcı hesabına veya tek bir kaynaktan birden çok hesaba yönelik çok sayıda başarısız parola denemesi yaparak kaba kuvvet saldırısı gerçekleştirmesini tespit etmek.  
  * **Veri Kaynağı:** Windows Güvenlik Olayları (Event ID 4625 \- An account failed to log on), Linux auth.log veya herhangi bir kimlik doğrulama logu.  
  * **Kural Türü:** Threshold  
  * **Yapılandırma:**  
    * **Index Pattern:** winlogbeat-\* veya auditbeat-\*  
    * **Custom Query:** event.action : "logon-failure" and event.outcome : "failure"  
    * **Threshold Field:** source.ip (Tek bir IP'den gelen saldırılar için) veya user.name (Tek bir kullanıcıya yönelik saldırılar için).  
    * **Threshold:** 10 (Eşik değeri, 10 deneme)  
    * **Time Window:** 5 minutes (Zaman aralığı, 5 dakika)  
  * **Açıklama:** Bu kural, 5 dakika içinde aynı kaynak IP adresinden 10'dan fazla başarısız giriş denemesi yapıldığında bir uyarı oluşturur.  
* **Örnek 2: Şüpheli PowerShell Komutları Tespiti (Custom Query \- KQL)**  
  * **Senaryo:** Saldırganların sistemde gizlenmek ve kötü amaçlı kod çalıştırmak için sıkça başvurduğu "living-off-the-land" tekniği kapsamında, tehlikeli veya gizlenmiş PowerShell komutlarını tespit etmek.  
  * **Veri Kaynağı:** Windows PowerShell logları veya process execution logları (Sysmon Event ID 1).  
  * **Kural Türü:** Custom Query  
  * **KQL Sorgusu:**  
    Kod snippet'i  
    event.category:process and process.name:powershell.exe and process.args : ("-nop", "-enc", "-w", "hidden", "IEX", "Invoke-Expression", "DownloadString")

  * **Açıklama:** Bu kural, powershell.exe işleminin komut satırı argümanlarında (process.args) şüpheli parametrelerin varlığını arar. \-nop (NoProfile), \-enc (EncodedCommand), \-w hidden (WindowStyle Hidden) ve Invoke-Expression gibi komutlar, genellikle kötü amaçlı betiklerin çalıştırıldığının güçlü göstergeleridir.53  
* **Örnek 3: Olay Dizisi ile Olası Fidye Yazılımı Aktivitesi Tespiti (Event Correlation \- EQL)**  
  * **Senaryo:** Bir fidye yazılımının tipik davranışını tespit etmek: Önce gölge kopyaları (shadow copies) siler, ardından çok sayıda dosyayı şifreler (değiştirir).  
  * **Veri Kaynağı:** Windows process execution logları (Sysmon Event ID 1\) ve dosya sistemi aktivite logları (Sysmon Event ID 11).  
  * **Kural Türü:** Event Correlation  
  * **EQL Sorgusu:**  
    Kod snippet'i  
    sequence by host.id with maxspan=5m

      \[file where event.action \== "creation"\]

  * **Açıklama:** Bu EQL kuralı, bir olay dizisini arar. İlk olarak, bir ana makinede (host.id) vssadmin.exe aracının gölge kopyaları silmek için kullanıldığı bir işlem başlatma olayını arar. Ardından, 5 dakika içinde (maxspan=5m) aynı ana makinede çok sayıda dosya oluşturma (şifrelenmiş dosyaların yeni kopyaları) olayının gerçekleşip gerçekleşmediğini kontrol eder. Bu iki olayın ardışık olarak gerçekleşmesi, aktif bir fidye yazılımı saldırısının güçlü bir göstergesidir.

### **4.4. Kural Yönetimi ve Optimizasyonu**

Etkili bir tehdit tespiti, sadece kural yazmakla bitmez; bu kuralların sürekli olarak yönetilmesi ve iyileştirilmesi gerekir.

* **False Positive Ayıklama (Tuning):** Hiçbir kural mükemmel değildir ve bazen meşru aktiviteleri de yanlışlıkla "kötücül" olarak işaretleyebilir (false positive). Bir kural çok fazla yanlış alarm üretiyorsa, exceptions (istisnalar) özelliği kullanılarak bu gürültü azaltılabilir. Örneğin, bir zafiyet tarayıcısının IP adresi veya bir sistem yöneticisinin kullandığı meşru bir betik, kuralın istisna listesine eklenerek bu kaynaklardan gelen aktiviteler için alarm üretilmesi engellenebilir.27  
* **Sigma Kurallarının Entegrasyonu:** Sigma, farklı SIEM platformları için evrensel bir tespit kuralı formatı sunan açık kaynaklı bir projedir. Güvenlik topluluğu tarafından oluşturulmuş ve sürekli güncellenen binlerce Sigma kuralı mevcuttur. sigmac adı verilen komut satırı aracı kullanılarak, bu YAML tabanlı Sigma kuralları otomatik olarak Elastic'in sorgu dillerine (KQL veya EQL) dönüştürülebilir ve SIEM'e kolayca aktarılabilir. Bu, bir SOC'nin tespit yeteneklerini hızla ve kapsamlı bir şekilde genişletmesini sağlar.22  
* **Kural Yönetimi için Sürüm Kontrolü (Detection as Code):** Gelişmiş SOC'ler, tespit kurallarını yazılım kodu gibi ele alır. Bu yaklaşım, "Detection as Code" (DaC) olarak bilinir. Özel kurallar, istisnalar, değer listeleri ve diğer kural yapılandırmaları, bir sürüm kontrol sisteminde (VCS), örneğin bir Git deposunda saklanır. Bu yöntem, kural değişikliklerinin kim tarafından, ne zaman ve neden yapıldığının takibini sağlar, ekip içinde işbirliğini (peer review) kolaylaştırır ve kuralların test ve dağıtım süreçlerini (CI/CD) otomatikleştirmeye olanak tanır.52

## **Bölüm 5: Gelişmiş SOC Yetenekleri ve Stratejiler**

Elastic Stack, temel log toplama ve kural tabanlı uyarıların ötesinde, proaktif ve olgun bir Güvenlik Operasyon Merkezi'nin (SOC) ihtiyaç duyduğu gelişmiş yetenekleri de destekler. Bu bölümde, proaktif tehdit avcılığı, entegre olay müdahalesi ve uyumluluk raporlaması gibi stratejiler ele alınacaktır.

### **5.1. Proaktif Tehdit Avcılığı (Threat Hunting)**

Tehdit avcılığı, mevcut otomatikleştirilmiş güvenlik kontrollerini ve tespit kurallarını atlatmayı başarmış olan gizli ve gelişmiş tehditleri bulmak için yürütülen proaktif, insan odaklı ve genellikle hipotez tabanlı bir araştırma sürecidir. Reaktif bir duruş sergilemek yerine (yani bir alarmın tetiklenmesini beklemek yerine), "sistemlerimizde zaten bir saldırgan var" varsayımıyla hareket eder. Temel amaç, bir saldırganın bir ağda fark edilmeden kaldığı süre olan "dwell time"ı en aza indirmektir.58

* Avcılık Süreci ve Hipotez Tabanlı Yaklaşım:  
  Etkili bir tehdit avı, genellikle bir hipotezle başlar. Bu hipotezler, güncel tehdit istihbaratı, MITRE ATT\&CK® çerçevesindeki taktikler veya sistemlerdeki anormal gözlemlerden türetilebilir.59  
  * **Örnek Hipotez:** "Bir saldırgan, yanal hareket (lateral movement) yapmak ve diğer sistemlere sızmak için meşru bir yönetici aracı olan PsExec'i kötüye kullanıyor olabilir." (MITRE ATT\&CK T1569.002 \- System Services: Service Execution).  
  * **Avcılık Adımları (Kibana Discover Arayüzünde):**  
    1. **Veri Kümesini Daraltma:** İlk olarak, process oluşturma olaylarını içeren log kaynaklarına odaklanılır. Bu genellikle Sysmon Olay ID 1 veya Auditbeat process verileridir. Sorgu: event.category:process.  
    2. **Şüpheli Süreçleri Arama:** PsExec'in çalışma şekli, hedef sistemde PSEXESVC.exe adında geçici bir hizmet oluşturmasıdır. Bu nedenle, bu isimde bir process'in çalıştırılıp çalıştırılmadığı kontrol edilir. Sorgu: process.name:PSEXESVC.exe.  
    3. **Anormallikleri İnceleme:** Eğer PSEXESVC.exe bulunduysa, bu aktivitenin meşru olup olmadığını anlamak için ek sorular sorulur:  
       * Bu işlemi hangi ana süreç (process.parent.name) başlattı? Genellikle services.exe olması beklenir.  
       * Bu aktivite hangi ana makineden (source.ip) hangi ana makineye (destination.ip) doğru gerçekleşti? Bu, sistem yöneticilerinin normal aktivite profiline uyuyor mu?  
       * Bu aktivite hangi kullanıcı hesabı (user.name) tarafından gerçekleştirildi? Beklenmedik bir kullanıcı mı?  
    4. **Hipotezi Genişletme:** Eğer PsExec bulunamazsa, hipotez genişletilebilir. "Yanal hareket için kullanılan diğer 'living-off-the-land' araçları nelerdir?" sorusu sorularak wmic.exe, sc.exe veya PowerShell Remoting gibi diğer araçların kullanımına yönelik aramalar yapılır.  
* **Elastic'in Tehdit Avcılığı Kütüphanesi:** Elastic, bu süreci kolaylaştırmak için kendi güvenlik uzmanları tarafından hazırlanmış, MITRE ATT\&CK ile hizalanmış ve kullanıma hazır yüzlerce tehdit avcılığı sorgusu içeren açık kaynaklı bir kütüphane sunmaktadır. Bu sorgular, analistlere avcılık faaliyetleri için mükemmel bir başlangıç noktası sağlar.61

### **5.2. Olay Müdahale (Incident Response) İş Akışları**

Elastic Security, bir alarm tetiklendiği andan itibaren olayın çözümlenmesine kadar olan tüm olay müdahale yaşam döngüsünü destekleyen entegre araçlar sunar.

* **Tipik Bir Olay Müdahale İş Akışı:**  
  1. **Triyaj ve Doğrulama:** Bir uyarı (örneğin, Bölüm 4'teki şüpheli PowerShell kuralından gelen bir uyarı) **Alerts** panosuna düştüğünde, analist ilk olarak uyarının önem derecesini, etkilenen varlıkları ve kuralın tanımını inceler.  
  2. **Derinlemesine Araştırma (Timeline):** Analist, tek bir tıklama ile uyarıyı ve ilgili olayları **Timeline**'a gönderir. Timeline, uyarının tetiklendiği zaman dilimindeki tüm ilgili olayları kronolojik olarak gösteren interaktif bir tuvaldir.  
  3. **Kapsamı Genişletme ve Korelasyon:** Analist, saldırının tam resmini görmek için araştırmanın kapsamını genişletir. Timeline'a, uyarıdaki ana makine (host.name), kullanıcı (user.name) ve IP adresleri (source.ip, destination.ip) ile ilgili diğer tüm logları (ağ akışları, dosya oluşturma olayları, kimlik doğrulama logları vb.) ekler. Bu, "saldırgan bu komutu çalıştırmadan önce ne yaptı?" ve "sonrasında ne oldu?" gibi soruları yanıtlamaya yardımcı olur.  
  4. **Belgeleme ve İşbirliği:** Araştırma sırasında, analist önemli olayları Timeline üzerinde işaretleyebilir (pin), yorumlar ve notlar ekleyebilir. Bu, araştırma sürecinin adımlarını belgelemek için kritiktir.  
  5. **Vaka Yönetimi (Case Management):** Araştırma, resmi bir müdahale gerektiren doğrulanmış bir olay (incident) haline geldiğinde, analist bulgularını bir **Case**'e dönüştürür. Case, Timeline anlık görüntülerini, notları, kanıtları ve müdahale adımlarını merkezi bir yerde toplar. Bu, olayın durumunu takip etmeyi, diğer ekip üyelerine atamayı ve tüm müdahale sürecini denetlenebilir bir şekilde kaydetmeyi sağlar.27  
* **Otomasyon ve Orkestrasyon Entegrasyonları (SOAR):** Elastic Security, müdahale süreçlerini hızlandırmak ve otomatikleştirmek için dış sistemlerle entegre olabilir. Örneğin, yüksek önem dereceli bir vaka oluşturulduğunda, otomatik olarak bir PagerDuty uyarısı gönderebilir, bir Jira bileti açabilir veya bir SOAR (Security Orchestration, Automation, and Response) platformunu tetikleyerek bir güvenlik duvarı kuralı ekleme veya bir kullanıcı hesabını devre dışı bırakma gibi müdahale eylemlerini başlatabilir.15

### **5.3. Uyumluluk (Compliance) Raporlaması**

Birçok organizasyon, PCI-DSS (Payment Card Industry Data Security Standard), HIPAA (Health Insurance Portability and Accountability Act), GDPR (General Data Protection Regulation) gibi yasal düzenlemelere uymak zorundadır. Bu düzenlemeler genellikle logların güvenli bir şekilde toplanması, merkezi olarak saklanması, düzenli olarak gözden geçirilmesi ve belirli bir süre boyunca (genellikle en az bir yıl) saklanması gibi katı gereksinimler içerir.38

Elastic Stack, bu gereksinimleri karşılamak için güçlü bir temel sunar:

* **Veri Toplama ve Merkezi Depolama:** Yığının temel işlevi, uyumluluk kapsamındaki tüm sistemlerden (güvenlik duvarları, kart sahibi verilerini işleyen sunucular, hasta kayıtlarına erişen sistemler vb.) logları toplayıp merkezi bir Elasticsearch kümesinde güvenli bir şekilde depolamaktır.6  
* **Veri Saklama (Data Retention):** Elastic'in **Index Lifecycle Management (ILM)** özelliği, veri saklama politikalarını otomatikleştirmek için kritik bir araçtır. ILM ile, verilerin ne kadar süreyle Hot, Warm, Cold ve Frozen katmanlarda tutulacağı tanımlanabilir. Örneğin, PCI-DSS'in gerektirdiği "ilk 3 ay anında erişilebilir, toplam 1 yıl saklanacak" kuralı, ILM ile kolayca uygulanabilir: veriler 90 gün Hot/Warm katmanlarda tutulur, ardından daha ucuz olan Cold/Frozen katmanlara taşınarak toplam saklama süresi 365 güne tamamlanır.15  
* **Erişim Kontrolü ve Raporlama:** Kibana'nın rol tabanlı erişim kontrolü (RBAC) özellikleri, sadece yetkili personelin hassas log verilerine erişmesini sağlar. Analistler, belirli uyumluluk kontrollerini izlemek için özel Kibana panoları oluşturabilir. Örneğin, "başarısız yönetici giriş denemeleri", "kritik sistem yapılandırma dosyalarındaki değişiklikler" veya "kart sahibi veri ortamına yapılan tüm ağ bağlantıları" gibi metrikleri gösteren panolar hazırlanabilir ve düzenli olarak denetçilere sunulmak üzere raporlanabilir.36

Bununla birlikte, geleneksel SIEM çözümlerinin genellikle belirli düzenlemeler için "kutudan çıktığı gibi" hazır rapor şablonları sunduğu, Elastic'te ise bu panoların ve raporların genellikle organizasyonun özel ihtiyaçlarına göre manuel olarak oluşturulması gerektiği unutulmamalıdır.16

## **Bölüm 6: Geleceğe Bakış ve Stratejik Öneriler**

Elastic Stack, sürekli evrilen bir platformdur ve geleceği, siber güvenlik operasyonlarının doğasını temelden değiştirmeyi hedefleyen yapay zeka ve makine öğrenmesi entegrasyonları tarafından şekillendirilmektedir. Bu son bölüm, Elastic SIEM'in gelecekteki yönünü, bu teknolojilerin pratik etkilerini ve başarılı bir implementasyon için gereken stratejik adımları özetleyecektir.

### **6.1. SIEM'in Geleceği: Yapay Zeka Destekli Güvenlik Analitiği**

Elastic, geleneksel, kural tabanlı SIEM anlayışını, insan analistlerin yeteneklerini artıran ve en zahmetli görevlerini otomatikleştiren bir **"AI-driven security analytics"** (Yapay Zeka Destekli Güvenlik Analitiği) platformuna dönüştürmektedir.20 Bu dönüşüm, sadece yeni özellikler eklemekten ziyade, bir SOC'nin temel iş akışlarında bir devrim yaratmayı amaçlamaktadır. Geleneksel SOC'lerin en büyük sorunu, analistlerin her biri ayrı ayrı incelenmesi gereken devasa bir alarm kuyruğuyla boğuşmasıdır. Bu "alarm yorgunluğu", yavaş, hataya açık ve moral bozucu bir süreçtir. Elastic'in yapay zeka stratejisi, tam olarak bu acı noktalarını hedef almaktadır.

* **Anahtar Yapay Zeka Yetenekleri ve İş Akışı Üzerindeki Etkileri:**  
  * **Anomaly Detection (Anomali Tespiti):** Platformun temelinde, denetimsiz makine öğrenmesi (unsupervised ML) yatar. Bu teknoloji, sistemlerin ve kullanıcıların normal davranış profillerini öğrenir ve bu profillerden sapan anormal aktiviteleri otomatik olarak tespit eder. Bu, daha önce hiç görülmemiş, imza tabanlı kuralların yakalayamayacağı "sıfır gün" (zero-day) tehditlerini veya içeriden gelen tehditleri (insider threats) bulmak için kritik öneme sahiptir. Elastic, ağ trafiği, kullanıcı davranışı, process aktiviteleri gibi alanlar için önceden yapılandırılmış 100'den fazla kullanıma hazır makine öğrenmesi işi sunar.51  
  * **Attack Discovery (Saldırı Keşfi):** Bu, belki de en devrim niteliğindeki özelliktir. Attack Discovery, yüzlerce veya binlerce bireysel, düşük seviyeli alarmı analiz etmek için Üretken Yapay Zeka (GenAI) ve RAG (Retrieval-Augmented Generation) teknolojisini kullanır. Birbiriyle ilişkili alarmları birleştirerek, "Bu 500 alarm aslında tek bir saldırganın 5 adımlık bir saldırı zincirini temsil ediyor" diyerek analistin önüne sadece birkaç tane, bağlamı zenginleştirilmiş ve yüksek öncelikli "saldırı" çıkarır. Bu, analistlerin zamanlarını alarmları ayıklamakla değil, gerçek tehditleri araştırmakla geçirmelerini sağlar.20  
  * **AI Assistant (Yapay Zeka Asistanı):** Genç veya deneyimsiz analistlerin en büyük zorluklarından biri, karmaşık bir alarmı nasıl araştıracaklarını veya doğru sorguyu nasıl yazacaklarını bilememektir. AI Assistant, bu bilgi boşluğunu doldurur. Analistler, "Bu alarm ne anlama geliyor?", "Bu saldırıyı araştırmak için hangi adımları izlemeliyim?" veya "Bu KQL sorgusunu EQL'e çevir" gibi doğal dilde sorular sorabilirler. AI Assistant, Elastic'in genel bilgi tabanını ve organizasyonun kendi özel belgelerini (runbook'lar vb.) kullanarak adım adım rehberlik ve yanıtlar sunar.66  
  * **Otomatik Veri Entegrasyonu ve Migrasyon:** SIEM projelerinin en zahmetli kısımlarından biri, özel uygulamalardan veri toplamak veya eski bir SIEM'den mevcut kuralları taşımaktır. Elastic'in **Automatic Import** ve **Automatic Migration** gibi yeni özellikleri, bu süreçleri otomatikleştirmek için yapay zekayı kullanır. Bir log örneği yükleyerek veya eski kural setini sağlayarak, platformun otomatik olarak bir veri ayrıştırıcısı oluşturmasını veya kuralları Elastic formatına çevirmesini sağlar. Bu, implementasyon süresini haftalardan dakikalara indirebilir.70  
* **Gelecek Yol Haritası (Roadmap):** Elastic'in özellikle bulut tabanlı Serverless platformu için yayınladığı yol haritası, bu yapay zeka odaklı vizyonu desteklemektedir. Yol haritasında, daha fazla uyumluluk sertifikası (PCI, HIPAA), bölgeler arası arama yetenekleri, daha gelişmiş yapay zeka/ML modelleri ve üretken yapay zeka için yönetilen LLM hizmetleri gibi yenilikler bulunmaktadır. Bu, platformun geleceğinin daha akıllı, daha entegre ve daha otonom bir yönde ilerlediğini göstermektedir.39

### **6.2. Başarılı Bir Implementasyon için Kritik Başarı Faktörleri**

Elastic Stack gibi güçlü ve esnek bir platformdan en yüksek verimi almak, sadece teknolojiyi kurmaktan daha fazlasını gerektirir. Başarılı bir SIEM projesi için aşağıdaki stratejik faktörler hayati önem taşır:

* **Net Hedefler ve Kullanım Senaryoları Belirleme:** Projeye başlamadan önce, "Bu SIEM ile neyi başarmak istiyoruz?" sorusu net bir şekilde yanıtlanmalıdır. Hedefler, "PCI-DSS uyumluluğunu sağlamak", "fidye yazılımı saldırılarını erken aşamada tespit etmek" veya "içeriden gelen veri sızıntılarını önlemek" gibi spesifik ve ölçülebilir olmalıdır. Bu hedefler, hangi veri kaynaklarının öncelikli olduğunu ve hangi tespit kurallarının geliştirilmesi gerektiğini belirleyecektir.24  
* **Veri Kalitesi ve Standardizasyon (ECS):** Bir SIEM'in etkinliği, ona beslenen verinin kalitesiyle doğru orantılıdır. "Çöp girerse, çöp çıkar" ilkesi burada mutlak geçerlidir. Toplanan tüm verilerin temiz, doğru ve en önemlisi **Elastic Common Schema (ECS)**'ya uygun şekilde ayrıştırıldığından ve normalleştirildiğinden emin olunmalıdır. ECS uyumluluğu, tüm tespit kurallarının, panoların ve makine öğrenmesi işlerinin tutarlı bir şekilde çalışmasının temelidir.21  
* **Aşamalı Yaklaşım:** Tüm veri kaynaklarını aynı anda sisteme entegre etmeye çalışmak, genellikle başarısızlıkla sonuçlanan bir yaklaşımdır. Bunun yerine, en kritik varlıklarla (örneğin, Domain Controller'lar, kritik web sunucuları, güvenlik duvarları) ilgili veri kaynaklarından başlayarak aşamalı bir şekilde ilerlemek daha yönetilebilirdir. Her aşamada, toplanan veriler için ilgili tespit kuralları ve panolar oluşturulmalı ve sistemin kararlılığı test edilmelidir.24  
* **Sürekli Optimizasyon ve Ayarlama (Tuning):** Bir SIEM, "kur ve unut" türü bir sistem değildir. Canlı bir organizma gibi sürekli bakım ve ilgi gerektirir. Tespit kuralları düzenli olarak gözden geçirilmeli, yanlış alarmlar (false positives) istisnalar eklenerek ayıklanmalı ve ortaya çıkan yeni tehdit vektörlerine karşı yeni kurallar geliştirilmelidir. Bu, sürekli bir iyileştirme döngüsüdür.55  
* **Ekip Yetkinliği ve Eğitim:** Elastic Stack, açık kaynak kökenli ve son derece esnek bir araç olduğu için, genellikle geleneksel, "anahtar teslim" SIEM çözümlerine göre daha fazla teknik uzmanlık gerektirir. Platformu yönetecek ve kullanacak olan SOC analistleri ve güvenlik mühendislerinin, Elasticsearch, Kibana, KQL/EQL ve kural yazımı konularında yeterli eğitimi alması, projenin uzun vadeli başarısı için kritik bir yatırımdır.17

Sonuç olarak, Elastic Stack, modern bir SOC için olağanüstü derecede güçlü ve ölçeklenebilir bir platform sunmaktadır. Temel log yönetiminden, yapay zeka destekli proaktif tehdit avcılığına kadar geniş bir yelpazede yetenekler barındırır. Ancak bu gücün tam potansiyelini ortaya çıkarmak, sadece teknik bir kurulumdan ziyade, net hedefler, kaliteli veri, sürekli optimizasyon ve yetkin bir ekibi içeren stratejik bir yaklaşım gerektirir.

#### **Alıntılanan çalışmalar**

1. www.ninjaone.com, erişim tarihi Temmuz 28, 2025, [https://www.ninjaone.com/blog/what-is-elk-stack/\#:\~:text=The%20ELK%20Stack%20is%20a,For%20data%20visualization%20and%20exploration.](https://www.ninjaone.com/blog/what-is-elk-stack/#:~:text=The%20ELK%20Stack%20is%20a,For%20data%20visualization%20and%20exploration.)  
2. What is the ELK stack? \- Elasticsearch, Logstash, Kibana Stack Explained \- AWS, erişim tarihi Temmuz 28, 2025, [https://aws.amazon.com/what-is/elk-stack/](https://aws.amazon.com/what-is/elk-stack/)  
3. What Is ELK Stack? | Elasticsearch, Logstash, & Kibana \- NinjaOne, erişim tarihi Temmuz 28, 2025, [https://www.ninjaone.com/blog/what-is-elk-stack/](https://www.ninjaone.com/blog/what-is-elk-stack/)  
4. The Elastic Stack | Elastic Docs, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/docs/get-started/the-stack](https://www.elastic.co/docs/get-started/the-stack)  
5. Elastic Stack overview \- PowerStore \- Dell Technologies Info Hub, erişim tarihi Temmuz 28, 2025, [https://infohub.delltechnologies.com/l/dell-powerstore-elastic-stack/elastic-stack-overview/](https://infohub.delltechnologies.com/l/dell-powerstore-elastic-stack/elastic-stack-overview/)  
6. ELK Stack: The Essentials of Elasticsearch, Logstash, and Kibana \- Medium, erişim tarihi Temmuz 28, 2025, [https://medium.com/@williamwarley/elk-stack-the-essentials-of-elasticsearch-logstash-and-kibana-3a09ff647352](https://medium.com/@williamwarley/elk-stack-the-essentials-of-elasticsearch-logstash-and-kibana-3a09ff647352)  
7. Introduction to the Elastic stack | by Eduardo Rost | ilegra \- Medium, erişim tarihi Temmuz 28, 2025, [https://medium.com/ilegra/introduction-to-the-elastic-stack-96a72f6e2666](https://medium.com/ilegra/introduction-to-the-elastic-stack-96a72f6e2666)  
8. Elasticsearch: 15 years of indexing it all, finding what matters, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/search-labs/blog/elasticsearch-history-15-years](https://www.elastic.co/search-labs/blog/elasticsearch-history-15-years)  
9. Elastic Beats & Where They Fit With ELK Stack \- Instaclustr, erişim tarihi Temmuz 28, 2025, [https://www.instaclustr.com/blog/elastic-beats-and-where-they-fit-with-elk-stack/](https://www.instaclustr.com/blog/elastic-beats-and-where-they-fit-with-elk-stack/)  
10. Filebeat vs. Logstash \- The Evolution of a Log Shipper \- Logz.io, erişim tarihi Temmuz 28, 2025, [https://logz.io/blog/filebeat-vs-logstash/](https://logz.io/blog/filebeat-vs-logstash/)  
11. Elastic Docs, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/guide/index.html](https://www.elastic.co/guide/index.html)  
12. 30 Day SOC Challenge- Day 2 & 3 : ELK Stack / Elastic Search \- DEV Community, erişim tarihi Temmuz 28, 2025, [https://dev.to/https\_aneesah/30-day-soc-challenge-day-2-3-elk-stack-elastic-search-coe](https://dev.to/https_aneesah/30-day-soc-challenge-day-2-3-elk-stack-elastic-search-coe)  
13. 5 Elk Stack Pros and Cons \- ChaosSearch, erişim tarihi Temmuz 28, 2025, [https://www.chaossearch.io/blog/elk-stack-pros-and-cons](https://www.chaossearch.io/blog/elk-stack-pros-and-cons)  
14. What Is The ELK Stack (Elasticsearch, Logstash, Kibana)? \- Secoda, erişim tarihi Temmuz 28, 2025, [https://www.secoda.co/glossary/what-is-the-elk-stack-elasticsearch-logstash-kibana](https://www.secoda.co/glossary/what-is-the-elk-stack-elasticsearch-logstash-kibana)  
15. Elastic (ELK) Stack features list, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/elastic-stack/features](https://www.elastic.co/elastic-stack/features)  
16. Comparing Elastic SIEM with Traditional SIEM Solutions \- IT Butler, erişim tarihi Temmuz 28, 2025, [https://itbutler.sa/blog/comparing-elastic-siem-with-traditional-siem-solutions/](https://itbutler.sa/blog/comparing-elastic-siem-with-traditional-siem-solutions/)  
17. Is Elastic Stack (ELK) the Best SIEM Tool? | BitLyft Cybersecurity, erişim tarihi Temmuz 28, 2025, [https://www.bitlyft.com/resources/is-elastic-stack-elk-the-best-siem-tool](https://www.bitlyft.com/resources/is-elastic-stack-elk-the-best-siem-tool)  
18. What is SIEM? A comprehensive guide \- Elastic, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/what-is/siem](https://www.elastic.co/what-is/siem)  
19. Elastic Stack: (ELK) Elasticsearch, Kibana & Logstash, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/elastic-stack](https://www.elastic.co/elastic-stack)  
20. AI-driven SIEM Solution & Security Analytics \- Elastic, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/security/siem](https://www.elastic.co/security/siem)  
21. Elastic SIEM Fundamentals | by Hassen Hannachi \- Medium, erişim tarihi Temmuz 28, 2025, [https://hassen-hannachi.medium.com/elastic-elastic-siem-fundamentals-3337d580fafe](https://hassen-hannachi.medium.com/elastic-elastic-siem-fundamentals-3337d580fafe)  
22. Elastic SIEM detection rules \- Download now at elastic content share, erişim tarihi Temmuz 28, 2025, [https://elastic-content-share.eu/downloads/category/kibana/siem-detection-rules/](https://elastic-content-share.eu/downloads/category/kibana/siem-detection-rules/)  
23. Complete Log Management Guide Using ELK Stack \- Sematext, erişim tarihi Temmuz 28, 2025, [https://sematext.com/guides/elk-stack/](https://sematext.com/guides/elk-stack/)  
24. Log it like you mean it: Best practices for security | Elastic Blog, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/blog/best-practices-security-log](https://www.elastic.co/blog/best-practices-security-log)  
25. Using the ELK Stack for SIEM \- Logz.io, erişim tarihi Temmuz 28, 2025, [https://logz.io/blog/elk-siem/](https://logz.io/blog/elk-siem/)  
26. How to Install Elastic (ELK) Stack on Ubuntu | PhoenixNAP KB, erişim tarihi Temmuz 28, 2025, [https://phoenixnap.com/kb/how-to-install-elk-stack-on-ubuntu](https://phoenixnap.com/kb/how-to-install-elk-stack-on-ubuntu)  
27. Complete Guide to Elastic SIEM \- Security Boulevard, erişim tarihi Temmuz 28, 2025, [https://securityboulevard.com/2023/05/complete-guide-to-elastic-siem/](https://securityboulevard.com/2023/05/complete-guide-to-elastic-siem/)  
28. The benefits of the ELK stack without the operational overhead \- AWS, erişim tarihi Temmuz 28, 2025, [https://aws.amazon.com/opensearch-service/resources/the-benefits-of-the-elk-stack/](https://aws.amazon.com/opensearch-service/resources/the-benefits-of-the-elk-stack/)  
29. Replace Splunk with Elastic for logs, security, and observability, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/splunk-replacement](https://www.elastic.co/splunk-replacement)  
30. Self-managed cluster | Elastic Docs, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/docs/deploy-manage/deploy/self-managed](https://www.elastic.co/docs/deploy-manage/deploy/self-managed)  
31. Comparison of Different Elastic License Types, erişim tarihi Temmuz 28, 2025, [https://discuss.elastic.co/t/comparison-of-different-elastic-license-types/374156](https://discuss.elastic.co/t/comparison-of-different-elastic-license-types/374156)  
32. Building a Home SOC Lab \- ELK Stack SIEM solution | by Khalid Chbail \- Medium, erişim tarihi Temmuz 28, 2025, [https://medium.com/@khalid.chbail4/building-a-home-soc-lab-part-1-elk-stack-siem-solution-b82dd396836f](https://medium.com/@khalid.chbail4/building-a-home-soc-lab-part-1-elk-stack-siem-solution-b82dd396836f)  
33. Elastic Security: Getting Started with detecting threats in my data with SIEM, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/getting-started/security/detect-threats-in-my-data-with-siem](https://www.elastic.co/getting-started/security/detect-threats-in-my-data-with-siem)  
34. Quickly Get Started with Elastic, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/getting-started](https://www.elastic.co/getting-started)  
35. Getting started: Use Elastic Security for SIEM | Starting with the Elasticsearch Platform and its Solutions \[8.18\], erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/guide/en/starting-with-the-elasticsearch-platform-and-its-solutions/8.18/getting-started-siem-security.html](https://www.elastic.co/guide/en/starting-with-the-elasticsearch-platform-and-its-solutions/8.18/getting-started-siem-security.html)  
36. AI and the 2025 SIEM landscape: A guide for SOC leaders | Elastic Blog, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/blog/ai-siem-landscape](https://www.elastic.co/blog/ai-siem-landscape)  
37. Trust Center | Elastic, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/trust](https://www.elastic.co/trust)  
38. Elastic Stack SIEM Lab \- vidalcybersec.com, erişim tarihi Temmuz 28, 2025, [https://vidalcybersec.com/elastic-stack-siem-lab/](https://vidalcybersec.com/elastic-stack-siem-lab/)  
39. Elastic Cloud Serverless roadmap, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/cloud/serverless/roadmap](https://www.elastic.co/cloud/serverless/roadmap)  
40. ELK Stack: Definition, Use Cases, and Tutorial \- Coralogix, erişim tarihi Temmuz 28, 2025, [https://coralogix.com/guides/elasticsearch/](https://coralogix.com/guides/elasticsearch/)  
41. Install and configure Elastic Stack on ubuntu \- Gary Woodfine, erişim tarihi Temmuz 28, 2025, [https://garywoodfine.com/install-configure-elastic-stack-ubuntu/](https://garywoodfine.com/install-configure-elastic-stack-ubuntu/)  
42. Deploy an Elasticsearch cluster | Elastic Docs, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/docs/deploy-manage/deploy/self-managed/installing-elasticsearch](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/installing-elasticsearch)  
43. How to Install Elastic Stack on Ubuntu 20.04 LTS \- HowtoForge, erişim tarihi Temmuz 28, 2025, [https://www.howtoforge.com/tutorial/ubuntu-elastic-stack/](https://www.howtoforge.com/tutorial/ubuntu-elastic-stack/)  
44. www.elastic.co, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/docs/solutions/security/detect-and-alert/create-detection-rule\#:\~:text=Find%20Detection%20rules%20(SIEM)%20in,the%20rule%20searches%20for%20alerts.](https://www.elastic.co/docs/solutions/security/detect-and-alert/create-detection-rule#:~:text=Find%20Detection%20rules%20\(SIEM\)%20in,the%20rule%20searches%20for%20alerts.)  
45. Create a detection rule | Elastic Docs, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/docs/solutions/security/detect-and-alert/create-detection-rule](https://www.elastic.co/docs/solutions/security/detect-and-alert/create-detection-rule)  
46. How to create a detection rule \- Expedient Knowledge Base, erişim tarihi Temmuz 28, 2025, [https://kb.expedient.com/docs/how-to-create-a-detection-rule](https://kb.expedient.com/docs/how-to-create-a-detection-rule)  
47. Suspicious Execution via Scheduled Task | Elastic Security Solution \[8.18\], erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/guide/en/security/8.18/suspicious-execution-via-scheduled-task.html](https://www.elastic.co/guide/en/security/8.18/suspicious-execution-via-scheduled-task.html)  
48. Incident management | Elastic Docs, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/docs/solutions/observability/incident-management](https://www.elastic.co/docs/solutions/observability/incident-management)  
49. Elastic SIEM \- Detection Rules \- Combination of Time-based, Threshold, Aggregation and Sequence Events, erişim tarihi Temmuz 28, 2025, [https://discuss.elastic.co/t/elastic-siem-detection-rules-combination-of-time-based-threshold-aggregation-and-sequence-events/263175](https://discuss.elastic.co/t/elastic-siem-detection-rules-combination-of-time-based-threshold-aggregation-and-sequence-events/263175)  
50. Suspicious Powershell Script | Prebuilt detection rules reference \- Elastic, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/guide/en/security/current/suspicious-powershell-script.html](https://www.elastic.co/guide/en/security/current/suspicious-powershell-script.html)  
51. Machine Learning for Elasticsearch | Elastic, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/elasticsearch/machine-learning](https://www.elastic.co/elasticsearch/machine-learning)  
52. In your experience, what is the best “modern” SIEM? : r/cybersecurity \- Reddit, erişim tarihi Temmuz 28, 2025, [https://www.reddit.com/r/cybersecurity/comments/1d4ilnn/in\_your\_experience\_what\_is\_the\_best\_modern\_siem/](https://www.reddit.com/r/cybersecurity/comments/1d4ilnn/in_your_experience_what_is_the_best_modern_siem/)  
53. Mastering Kusto Query Language (KQL) for SOC, SIEM & Forensics | by Prakriti Timilsina, erişim tarihi Temmuz 28, 2025, [https://medium.com/@prakrititimilsina56/mastering-kusto-query-language-kql-for-soc-siem-forensics-62178b4d6151](https://medium.com/@prakrititimilsina56/mastering-kusto-query-language-kql-for-soc-siem-forensics-62178b4d6151)  
54. Suspicious Windows Powershell Arguments | Prebuilt detection rules reference \- Elastic, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/docs/reference/security/prebuilt-rules/rules/windows/execution\_windows\_powershell\_susp\_args](https://www.elastic.co/docs/reference/security/prebuilt-rules/rules/windows/execution_windows_powershell_susp_args)  
55. Tuning alert Elastic SIEM (custom rule) \- Stack Overflow, erişim tarihi Temmuz 28, 2025, [https://stackoverflow.com/questions/68738695/tuning-alert-elastic-siem-custom-rule](https://stackoverflow.com/questions/68738695/tuning-alert-elastic-siem-custom-rule)  
56. Advanced Guide to Sigma Rules for Elastic SIEM: Web Server Log Analysis \- Medium, erişim tarihi Temmuz 28, 2025, [https://medium.com/@balasubramanya.c/advanced-guide-to-sigma-rules-for-elastic-siem-web-server-log-analysis-3fd595c9e74d](https://medium.com/@balasubramanya.c/advanced-guide-to-sigma-rules-for-elastic-siem-web-server-log-analysis-3fd595c9e74d)  
57. Core Component: Managing Detection Rules in Elastic Security \- DaC Reference, erişim tarihi Temmuz 28, 2025, [https://dac-reference.readthedocs.io/en/latest/core\_component\_managing\_detection\_rules\_in\_elastic\_security.html](https://dac-reference.readthedocs.io/en/latest/core_component_managing_detection_rules_in_elastic_security.html)  
58. Introduction to Threat Hunting & Hunting With Elastic Module \- Whoami | FaresMorcy, erişim tarihi Temmuz 28, 2025, [https://faresbltagy.gitbook.io/footprintinglabs/soc-hackthebox-notes-and-labs/introduction-to-threat-hunting-and-hunting-with-elastic-module](https://faresbltagy.gitbook.io/footprintinglabs/soc-hackthebox-notes-and-labs/introduction-to-threat-hunting-and-hunting-with-elastic-module)  
59. Introduction to Threat Hunting & Hunting With Elastic Course | HTB Academy, erişim tarihi Temmuz 28, 2025, [https://academy.hackthebox.com/course/preview/introduction-to-threat-hunting--hunting-with-elastic](https://academy.hackthebox.com/course/preview/introduction-to-threat-hunting--hunting-with-elastic)  
60. The Elastic Guide to Threat Hunting | NCSI, erişim tarihi Temmuz 28, 2025, [https://www.ncsi.com/wp-content/uploads/2021/04/Elastic-Guide-to-Threat-Hunting-.pdf](https://www.ncsi.com/wp-content/uploads/2021/04/Elastic-Guide-to-Threat-Hunting-.pdf)  
61. Elevate Your Threat Hunting with Elastic — Elastic Security Labs, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/security-labs/elevate-your-threat-hunting](https://www.elastic.co/security-labs/elevate-your-threat-hunting)  
62. Kibana Incident Management \- Get notified on incident in Kibana \- Squadcast, erişim tarihi Temmuz 28, 2025, [https://www.squadcast.com/integrations/kibana](https://www.squadcast.com/integrations/kibana)  
63. Elastic Kibana | Integrate and Automate all your Tools with Mindflow, erişim tarihi Temmuz 28, 2025, [https://mindflow.io/integrations/elastic-kibana](https://mindflow.io/integrations/elastic-kibana)  
64. Replace Legacy SIEM with Security Analytics \- Elastic, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/security/siem-replacement](https://www.elastic.co/security/siem-replacement)  
65. SIEM Compliance: How to Meet Regulatory Requirements Effectively \- SearchInform, erişim tarihi Temmuz 28, 2025, [https://searchinform.com/articles/cybersecurity/measures/siem/management/compliance/](https://searchinform.com/articles/cybersecurity/measures/siem/management/compliance/)  
66. Elastic changes the SIEM game with AI-driven security analytics, erişim tarihi Temmuz 28, 2025, [https://elasticnv2022rd.q4web.com/news/news-details/2024/Elastic-changes-the-SIEM-game-with-AI-driven-security-analytics/default.aspx](https://elasticnv2022rd.q4web.com/news/news-details/2024/Elastic-changes-the-SIEM-game-with-AI-driven-security-analytics/default.aspx)  
67. Why invest in Elastic for AI-powered security \- Carahsoft, erişim tarihi Temmuz 28, 2025, [https://static.carahsoft.com/concrete/files/9817/3193/2653/Swish\_Why\_invest\_in\_Elastic\_for\_AI-powered\_security\_Feb\_20248090.pdf](https://static.carahsoft.com/concrete/files/9817/3193/2653/Swish_Why_invest_in_Elastic_for_AI-powered_security_Feb_20248090.pdf)  
68. Elastic Can Detect Threats Faster with AI \- YouTube, erişim tarihi Temmuz 28, 2025, [https://www.youtube.com/watch?v=xt1FR3AvuVg](https://www.youtube.com/watch?v=xt1FR3AvuVg)  
69. Elastic Security | AI Assistant Demo \- YouTube, erişim tarihi Temmuz 28, 2025, [https://www.youtube.com/watch?v=j5VKGPFSeUo](https://www.youtube.com/watch?v=j5VKGPFSeUo)  
70. Elastic Accelerates SIEM Data Onboarding with Automatic Import Powered by Search AI, erişim tarihi Temmuz 28, 2025, [https://ir.elastic.co/news/news-details/2024/Elastic-Accelerates-SIEM-Data-Onboarding-with-Automatic-Import-Powered-by-Search-AI/default.aspx](https://ir.elastic.co/news/news-details/2024/Elastic-Accelerates-SIEM-Data-Onboarding-with-Automatic-Import-Powered-by-Search-AI/default.aspx)  
71. Elastic Launches Automatic Migration to Simplify SIEM Migration, erişim tarihi Temmuz 28, 2025, [https://ir.elastic.co/news/news-details/2025/Elastic-Launches-Automatic-Migration-to-Simplify-SIEM-Migration/default.aspx](https://ir.elastic.co/news/news-details/2025/Elastic-Launches-Automatic-Migration-to-Simplify-SIEM-Migration/default.aspx)  
72. Introducing Elastic SIEM | Elastic Blog, erişim tarihi Temmuz 28, 2025, [https://www.elastic.co/blog/introducing-elastic-siem](https://www.elastic.co/blog/introducing-elastic-siem)  
73. Sentinel, Splunk or Elastic \- Reddit, erişim tarihi Temmuz 28, 2025, [https://www.reddit.com/r/Splunk/comments/1ldgcee/sentinel\_splunk\_or\_elastic/](https://www.reddit.com/r/Splunk/comments/1ldgcee/sentinel_splunk_or_elastic/)