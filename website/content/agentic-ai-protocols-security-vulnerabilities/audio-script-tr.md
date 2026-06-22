Yapay zeka serüveni, insan aklını kurallar ve sembolik mantık çerçevesine oturtmaya çalışan geleneksel yaklaşımlardan veriyle beslenen makine öğrenimi modellerine geçişle ilk büyük kırılmasını yaşamıştı. Bugün ise reaktif ve statik dil modellerinden, kendi kararlarını alıp uygulayabilen Agentic AI yani Eylemsel Yapay Zeka paradigmalarına geçişin tam ortasındayız. Bu ikinci dönüşüm, basit bir teknolojik ilerlemeden çok daha fazlası; zira siber güvenlik, karşılıklı güven ve sorumluluk paylaşımları söz konusu olduğunda oyunun kurallarını tamamen değiştiriyor.

Yapay zeka eylemcilerinin hızla hayatımıza girmesiyle birlikte yeni bir protokol ekosistemi de doğdu: MCP, A2A, ANP, UCP ve AP2. Bu protokoller birbiriyle rekabet etmek yerine, tıpkı TCP/IP katmanları gibi birbirini tamamlayan bir mimari sunuyor. Ancak bu katmanların her biri, geleneksel güvenlik çözümlerinin yetersiz kaldığı yepyeni saldırı yüzeylerini de beraberinde getiriyor.

---

Bölüm: Yapay Zeka Eylemci Protokollerinin Güvenlik ve Mimari Şeması

Aşağıdaki mimari şema, bir otonom yapay zeka uygulamasında kullanıcı, istemci, yönlendirici ve sunucular arasındaki güven sınırlarını ve potansiyel saldırı vektörlerini göstermektedir:

[Mermaid Diyagramı: Burada bir mimari veya akış şeması bulunmaktadır. Şema detayları görsel olarak mevcuttur.]

---

Bölüm: Agentic AI (Eylemsel Yapay Zeka) Nedir?

Bölüm Detayı: Reaktif Modellerden Agentic AI'a Geçiş

Geleneksel üretici yapay zeka araçları sadece birer asistan gibidir: Siz soru sorarsınız, onlar da yanıtlar. Agentic AI yani Eylemsel Yapay Zeka ise adeta bir iş ortağıdır: Siz sadece nihai hedefi belirlersiniz; eylemci, bu hedefe ulaşmak için izleyeceği adımları kendisi planlar ve yürütür.

Bu büyük paradigma değişimi şu formülle özetlenebilir: "Soru Soruldu — Yapay Zeka Cevap Verdi" yerine "Hedef Belirlendi — Yapay Zeka Çözüm Yolunu Buldu ve Uyguladı".

Bu fark sadece işlevsel değildir; siber güvenlik açısından da son derece kritiktir. Reaktif bir model doğrudan sistemler üzerinde aksiyon alıp fiziksel bir hasara yol açamazken; otonom bir yapay zeka eylemcisi dosya silebilir, veritabanı sorgulayabilir, e-posta gönderebilir, ödeme işlemlerini tetikleyebilir ve hatta diğer eylemcileri göreve çağırabilir.

Eylemsel yapay zeka, büyük dil modellerinin sağladığı muhakeme yeteneğini pekiştirmeli öğrenme prensipleriyle birleştirerek statik bir bilgi üreticisinden otonom bir eylemciye dönüştürür. Bu mimari; planlama yapabilen, hafızasını yöneten ve harici araçları otonom olarak çalıştırabilen bir yapı sunar. Bu geçiş, yapay sinir ağları ve derin öğrenme modellerinin ulaştığı olgunluk seviyesinin doğrudan bir sonucudur.

Bölüm Detayı: Yapay Zeka Eylemcilerinin Temel Bileşenleri

Modern otonom eylemciler temel olarak "algılama, muhakeme ve eylem" döngüsü üzerinden çalışır. Bu mimarinin temel yetenekleri ve beraberinde getirdiği güvenlik riskleri şunlardır:

[Tablo: Planlama, Bellek, Araç Kullanımı ve Öz-Denetim yetenekleri ile bunların güvenlik etkileri tablolandırılmıştır.]

Bölüm Detayı: Eylemcilerin Muhakeme ve Düşünce Tasarımları

Yapay zeka eylemcileri, karmaşık problemleri çözmek için çeşitli mantıksal örüntüler kullanır:

ReAct: Düşünme ve eyleme geçme süreçlerini birleştiren döngüdür. Eylemci aldığı girdiye göre bir karar verir, ilgili aracı çağırır, sonucu gözlemler ve bir sonraki adıma karar verir.
Düşünce Zinciri (Chain-of-Thought): Sorunları adım adım, mantıksal bir sırayla çözerek sonuca ulaşmayı sağlayan temel yaklaşımdır.
Öz-Denetim ve Geri Bildirim (Reflection): Eylemcinin kendi ürettiği yanıtları ve kararları doğruluk, kalite ve kısıtlamalar açısından değerlendirdiği katmandır. Hallüsinasyonları azaltmak için sıklıkla kullanılır.
Düşünce Ağacı (Tree of Thoughts): Problemin çözümüne giden birden fazla olasılığı eş zamanlı olarak değerlendiren ve en optimum yolu seçen gelişmiş karar verme örüntüsüdür.

Bölüm Detayı: Sektörde Popüler Olan Eylemci Çatıları (Frameworks)

[Tablo: LangGraph, AutoGen, CrewAI ve Smolagents çatıları ve odak noktaları karşılaştırılmıştır.]

---

Bölüm: RAG (Retrieval-Augmented Generation / Veri Geri Çağırmayla Artırılmış Üretim)

Büyük dil modellerinin eğitim verileriyle sınırlı parametrik hafızasını dinamik dış kaynaklarla zenginleştirmek amacıyla geliştirilen RAG yani Veri Geri Çağırmayla Artırılmış Üretim, otonom eylemcilerin de en kritik bilgi toplama mekanizmasıdır.

Aşağıdaki şema, tipik bir RAG sisteminin uçtan uca veri hazırlama, arama ve yanıt üretme akışını göstermektedir:

[Mermaid Diyagramı: Burada RAG veri hazırlama, depolama, arama ve üretim akışını gösteren bir şema bulunmaktadır.]

Bölüm Detayı: RAG Nedir ve Ne Yapar?

RAG, bir yapay zeka modelinin bir soruya yanıt verirken kendi hafızasına güvenmek yerine, dışarıdaki bir veri kaynağından ilgili bilgileri bulup getirerek yanıt üretmesini sağlayan bir mimaridir.

Ne yapar? Bir dil modeline "Git şu 500 sayfalık şirket kılavuzunu oku ve bana Ahmet'in yıllık izin hakkını söyle" dediğinizde, RAG mekanizması kılavuzdan ilgili sayfayı bulur, modele gösterir ve modelin doğru yanıtı yazmasını sağlar.

Bölüm Detayı: RAG'in Çalışma Mantığı Nedir?

RAG temelde üç adımdan oluşur: Gömme (Embedding), Geri Çağırma (Retrieval) ve Üretim (Generation).

Verinin Hazırlanması: Elindeki tüm dokümanlar küçük parçalara bölünür. Bu parçalar vektörlere dönüştürülür ve bir Vektör Veritabanına kaydedilir.
Arama ve Geri Çağırma: Kullanıcı bir soru sorduğunda, sistem bu soruyu da vektöre çevirir ve vektör veritabanında bu soruya anlamca en yakın olan doküman parçalarını saniyeler içinde bulup çıkarır.
Zenginleştirilmiş Üretim: Bulunan bu kaynak dokümanlar ve kullanıcının orijinal sorusu birleştirilerek dil modeline gönderilir. Model de kaynaklara sadık kalarak net bir cevap yazar.

Bölüm Detayı: Son Yıllarda Neden Popülerliğini Kaybetti? (Bir Yanılgıyı Düzeltelim!)

Aslında RAG popülerliğini kaybetmedi, aksine kurumsal dünyada şu an standart haline geldi. Ancak ilk dönemdeki büyülü ve kusursuz algısını kaybetti. Bunun sebepleri şunlardır:

"Çöp girerse çöp çıkar" sorunu: Şirketlerin verileri dağınık ve kirliyse, RAG yanlış dokümanları getirdi ve sistem çuvalladı.
Uzun Bağlam Penceresi: Gemini ve GPT-4 gibi modeller artık tek seferde milyonlarca kelimeyi hafızasına alabiliyor. İnsanlar RAG'e ne gerek var, tüm dokümanı doğrudan modele yüklüyorum demeye başladı.
Maliyet ve Gecikme: Vektör veritabanı yönetmek ve arama yapmak hem zaman hem de sunucu maliyeti yaratıyor.

Bölüm Detayı: Nasıl Kullanılır?

Bir RAG sistemi kurmak için genelde LangChain ve LlamaIndex gibi orkestrasyon araçları, Pinecone ve Chroma gibi vektör veritabanları ile büyük modellerin API'leri kullanılır. Basit bir akışla dokümanlarınızı yükler, endeksler ve model API'si ile bağlayarak kendi verilerinizle konuşan bir chatbot elde edersiniz.

Bölüm Detayı: Gelecek Vadediyor mu?

Kesinlikle evet, ancak evrilerek. Basit sistemler yerini Gelişmiş RAG ve Eylemsel RAG sistemlerine bırakıyor. Modellerin hafızaları ne kadar büyürse büyüsün, bir şirketin petabaytlarca verisini her seferinde modele sıfırdan yüklemek çok pahalıdır ve yavaştır. Geleceğin yapay zeka ajanları arka planda her zaman RAG mekanizmasını kullanacak.

---

Bölüm: Agentic Web (Eylemci Ağı) Protokol Haritası

Yapay zeka eylemcilerinin verimli çalışabilmesi için iki kritik sorunun çözülmesi gerekir: "Dış dünyaya ve araçlara nasıl bağlanırım?" ve "Diğer eylemcilerle nasıl güvenli iletişim kurarım?" Bu sorunları çözmek amacıyla geliştirilen protokoller, birbiriyle rekabet etmekten ziyade birbirini tamamlayan katmanlar oluşturur.

[Görsel: Eylemci Protokolleri Ekosistemi]

Bölüm Detayı: Protokol Katmanları ve Görevleri

Bu protokoller genel olarak yatay ve dikey olmak üzere iki ana kategoride incelenir:

Yatay Protokoller — "İşletim Sistemi" Katmanı: Sektörden bağımsız, temel altyapıyı oluşturan katmandır. Eylemcinin ihtiyaç duyduğu veri erişimini, kimlik yönetimini ve temel haberleşmeyi sağlar.
Dikey Protokoller — "Uygulama" Katmanı: Belirli sektörlere veya iş kollarına yönelik kuralları ve semantik yapıları tanımlar. Bu protokoller yatay altyapıların üzerine kurulur.

[Tablo: MCP, A2A, ANP, UCP ve AP2 protokollerinin seviyeleri, amaçları ve olgunluk seviyeleri karşılaştırılmıştır.]

---

Bölüm: MCP — Eylemcilerin "USB-C" Standardı

Bölüm Detayı: Neden Model Context Protocol (MCP)?

Yapay zeka entegrasyonlarının ilk dönemlerinde, her bir model ve araç için özel entegrasyon kodları yazılması gerekiyordu. Anthropic tarafından geliştirilen ve daha sonra Linux Foundation'a devredilen Model Context Protocol yani MCP, bu karmaşayı standart bir JSON-RPC 2.0 arayüzü ile çözüyor.

Geleneksel REST API'lerinin yapay zeka eylemcileri için yetersiz kalmasının başlıca nedenleri şunlardır: katı şemalar, durumsuzluk, token israfı ve yetersiz hata yönetimi.

Bölüm Detayı: MCP Mimarisi

MCP, rollerin net bir şekilde ayrıldığı klasik bir istemci-sunucu modelini esas alır:

[Görsel: MCP İstemci-Sunucu Mimarisi]

İletişim ve Taşıma Katmanları stdio ve HTTP/SSE üzerinden gerçekleştirilir. stdio aynı makine üzerinde süreçler arası yerel iletişim için kullanılırken; SSE uzak sunucular ve web tabanlı entegrasyonlar içindir.

Bölüm Detayı: MCP'nin Üç Ana Bileşeni

[Tablo: Araçlar (Tools), Kaynaklar (Resources) ve İstemler (Prompts) bileşenleri ile görevleri ve örnekleri tablolandırılmıştır.]

Bölüm Detayı: Gelişmiş Özellikler ve Güvenlik Sınırları

Kökler (Roots): URI tabanlı bir çalışma alanı sınırlandırmasıdır. Eylemcinin yetkilerini kısıtlamak için kritik bir güvenlik bariyeridir.
Örnekleme (Sampling): Sunucunun, host uygulamadan bir dil modeli çıktısı talep etmesini sağlayan akıştır. Bu tersine akış Konuşma Gaspı risklerine yol açabileceğinden, bu tür taleplerde her zaman İnsan Denetimi onay mekanizması kullanılmalıdır.

---

Bölüm: A2A — Eylemciler Arası İletişim Standartları

Bölüm Detayı: A2A Protokolü ve Yatay Koordinasyon

MCP, tek bir eylemcinin kendi araçları ve verileriyle konuşmasını sağlarken; otonom eylemcilerin birbirine görev devretmesi için bir standart sunmaz. İşte bu noktada devreye giren Agent-to-Agent yani A2A protokolü, otonom sistemler arasındaki yatay koordinasyon boşluğunu doldurur.

Google öncülüğünde Nisan 2025'te başlatılan ve şu an Linux Foundation çatısı altında geliştirilen A2A; farklı altyapılara sahip eylemcilerin birbirini tanımasını, kimlik doğrulamasını ve iş ortaklığı yapmasını hedefler.

Basit bir benzetmeyle MCP, eylemcinin kendi bilgisayarındaki araçları kullanabilmesini sağlarken; A2A eylemciye internet üzerinden diğer uzman eylemcilerle iletişim kurup onlardan iş talep etmesine imkan tanır.

Bölüm Detayı: A2A Çalışma Prensibi

Eylemci Tanıtım Kartları (Agent Cards): Her eylemci, kendi kimlik kartını JSON formatında sunar.
Görev Yönetimi ve Durum Makinesi: A2A, görevlerin takibini kolaylaştırmak için standart bir durum makinesi tanımlar.
İletişim Altyapısı: A2A haberleşmesi HTTPS protokolü üzerinde çalışır; mesajlaşma için JSON-RPC 2.0 kullanılır.

Bölüm Detayı: A2A Güvenlik Modeli

A2A protokolünün temel güvenlik prensipleri şunlardır: Güçlü kimlik doğrulama, HTTPS ile şifreleme, detaylı yetkilendirme ve webhook güvenliği. A2A protokolü, eylemciler arası gerçekleşebilecek dolaylı komut enjeksiyonu saldırılarını yapısal olarak engellemez; bu yüzden dış girdiler her zaman güvensiz kabul edilmelidir.

Bölüm Detayı: MCP ve A2A Karşılaştırması

MCP dikey erişimle eylemciden araçlara ve verilere bağlantı kurarken; A2A yatay iletişimle eylemciden diğer eylemcilere bağlantı kurar. Modern otonom sistemler bu iki yapıyı birlikte kullanır.

---

Bölüm: ANP — Otonom Eylemci Keşif Altyapısı

Bölüm Detayı: Eylemcilerin İnternette Birbirini Bulması

MCP ve A2A protokolleri, eylemcilerin birbirinin iletişim bilgilerini önceden bildiğini varsayar. Milyonlarca yapay zeka eylemcisinin internete dağıldığı açık bir ekosistemde otonom keşif problemini çözmek için Agent Network Protocol yani ANP geliştirilmektedir. ANP, herhangi bir merkezi otoriteye bağımlı olmadan eylemcilerin birbirini bulmasını sağlar.

Bölüm Detayı: ANP'nin Üç Katmanlı Yapısı

Kimlik ve Güvenli İletişim Katmanı: Merkeziyetsiz Tanımlayıcılar kullanarak eylemcilere doğrulanabilir kimlikler sağlar.
Meta-Protokol Katmanı: Farklı protokol sürümleri kullanan eylemcilerin ortak bir iletişim dilinde anlaşabilmesini sağlar.
Uygulama Protokolü Katmanı: Eylemcilerin sunduğu servisleri ve yetenekleri anlamsal olarak tanımlar.

Bölüm Detayı: Eylemci Keşif Yöntemleri (ADSP)

Aktif Keşif ve Pasif Keşif yöntemleri kullanılarak eylemciler kendilerini küresel dizinlere kaydedebilir veya web siteleri üzerinden yayınlayabilirler.

Bölüm Detayı: Karşılaştırma Tablosu

[Tablo: MCP, A2A ve ANP protokollerinin temel odak, mimari model, kullanım kapsamı ve kimlik altyapısı yönünden farkları tablolandırılmıştır.]

---

Bölüm: UCP ve AP2 — Yapay Zeka Eylemcileri İçin Finans ve Ödeme Standartları

Bölüm Detayı: Otonom Ticaret ve Ödeme Protokolleri

Yapay zeka eylemcilerinin kendi başlarına satın alma kararları verip ödeme yapmaya başlaması, klasik e-ticaret ve dolandırıcılık tespit sistemlerini kökten değiştiriyor. Bu finansal akışı güvenli hale getirmek için UCP ve AP2 standartları geliştirilmiştir.

UCP eylemciler için ortak bir ticaret dili sunarken; AP2 eylemcilerin yaptığı finansal işlemlerin yetkilendirme katmanını yönetir ve klasik modeli kriptografik kurallara bağlı sözleşmeli ödemelere dönüştürür.

Bölüm Detayı: AP2'nin Kriptografik Yetki (Mandate) Modeli

AP2 süreci üç ana sözleşmeye böler: İstek Yetkisi (Intent Mandate), Sepet Yetkisi (Cart Mandate) ve Ödeme Yetkisi (Payment Mandate). Satıcılar hem sepetin doğruluğunu hem de kullanıcının ödeme onayını kriptografik imzalar üzerinden doğrulayarak sahtekarlık risklerini sıfıra indirir.

Bölüm Detayı: Eylemcili Ticaretteki Yeni Riskler

Biyometrik doğrulamalar ve SMS kodları gibi klasik güvenlik doğrulamaları otonom eylemci dünyasında çalışmaz. Fiyat arbitrajı yapmaya çalışan eylemcilerin saniyeler içinde binlerce kez sipariş verip iptal etmesiyle sonsuz sipariş döngüleri yaşanabilir. Ayrıca hatalı satın almalarda yasal sorumluluk sınırları halen belirsizdir.

---

Bölüm: MCP Güvenliği ve Zafiyet Analizi

Bölüm Detayı: Tersine İletişim Akışı ve Riskleri

MCP kullanan yapay zeka eylemcilerinde iletişim akışı tersine döner. İstemci olan dil modeli hangi aracı, ne zaman ve hangi parametrelerle çağıracağına kendi mantık yürütme süreciyle karar verir. Bu durum girdi filtrelemeyi son derece zorlaştırır.

[Görsel: MCP Protokolü ve Tehdit Yüzeyi]

Bölüm Detayı: Confused Deputy (Yetki Devri) ve Dolaylı Komut Enjeksiyonu (Indirect Prompt Injection)

Dolaylı Komut Enjeksiyonu, eylemci güvenliğinin en zayıf halkasıdır. Eylemci, okuması için verilen bir içeriğe gizlenmiş kötü niyetli bir talimatla karşılaşabilir ve bunu güvenilir bir kaynaktan gelen talimat olarak algılayıp yerine getirdiğinde Yetki Devri zafiyeti tetiklenmiş olur.

Bölüm Detayı: Öne Çıkan MCP Saldırı Senaryoları

[Kartlar: Araç Tanımı Zehirlenmesi, Rug Pull, Sunucu ve Araç Gölgeleme ile Sampling Yetkisinin Kötüye Kullanımı senaryoları detaylandırılmıştır.]

Bölüm Detayı: Güvenlik Riskinde "Ölümcül Üçlü" (Toxic Trio)

Bir yapay zeka eylemcisi Geniş Veri Erişimi, Güvenilmeyen İçerik Okuma ve Harici Aksiyon Yeteneği özelliklerine aynı anda sahip olduğunda felaket senaryoları kaçınılmaz hale gelir.

---

Bölüm: Çoklu Eylemci (Multi-Agent) Güvenliği

Karmaşık problemleri çözmek için tek bir modelin sınırlarını aşarak birbiriyle haberleşen ve iş bölümü yapan Çoklu Ajan Sistemleri, verimliliği artırırken siber güvenlik risklerini de katlayarak artırmaktadır.

Bölüm Detayı: Yapay Zeka Ajanları İçin RAK Tehdit Modellemesi

Otonom eylemcilerin barındırdığı riskleri analiz etmek amacıyla RAK yani Root, Agency, Keys tehdit modelleme çerçevesi kullanılır. Bu çerçeve tehditleri altyapı seviyesindeki riskler, otonom yetki istismarı riskleri ve kimlik bilgisi sızıntısı riskleri olarak üç ana katmanda sınıflandırır.

Bölüm Detayı: OWASP Agentic Security Initiative (ASI) Top 10

[Tablo: OWASP ASI listesindeki Eylemci Hedef Kaçırma, Araçların Kötüye Kullanımı, Yetki İstismarı, Tedarik Zinciri Riskleri, RCE ve Bellek Zehirlenmesi gibi en kritik tehditler listelenmiştir.]

Bölüm Detayı: Zincirleme Saldırı Riski (Cascading Failure)

[Mermaid Diyagramı: Tek bir eylemcinin ele geçirilmesiyle başlayan zincirleme saldırı akışını gösteren bir şema bulunmaktadır.]

Ajanlar arasındaki örtük güven ilişkisi sömürülerek, en dıştaki en düşük yetkili ajanın manipüle edilmesi, en içteki kritik kurumsal sistemlerin ele geçirilmesine yol açabilir.

Bölüm Detayı: Klasik LLM Güvenliği ile Eylemci Güvenliği Arasındaki Farklar

[Tablo: Öncelik, durum bilgisi, çalışma şekli, etki alanı ve güven modeli yönünden klasik LLM güvenliği ile eylemci güvenliği farkları özetlenmiştir.]

---

Bölüm: Akademik Araştırmalar ve Sektör Analizleri

[Görsel: Protokol Ekosistem Karşılaştırması]

Bölüm Detayı: Benchmark Sonuçları ve Performans Verileri

Yapılan MCPGAUGE testleri, MCP entegrasyonunun büyük ticari modellerde ortalama %9.5 oranında muhakeme performansı kaybına yol açtığını gösteriyor. LiveMCP-101 ve MCP-Universe platformlarındaki testlerde ise en iyi yapay zeka eylemcilerinin çok adımlı görevleri başarıyla tamamlama oranının %60'ın altında kaldığı görüldü.

Bölüm Detayı: GitHub Ekosistemi İncelemesi

Açık kaynaklı 22 binin üzerinde GitHub deposunda yapılan taramada MCP etiketi taşıyan depoların sadece %5'inin işlevsel bir sunucu barındırdığı, bu sunucu kodlarının ortanca boyutunun sadece 920 satır olduğu ve %5.5'inde dolaylı kod zehirlenmesine açık zafiyetler bulunduğu saptanmıştır.

Bölüm Detayı: STAC (Sequenced Tool Attack Chaining) Saldırıları

Tek başına bakıldığında tamamen zararsız olan işlemlerin bir araya getirilerek kötüye kullanılmasıdır. Güvenlik filtreleri adımları tek tek engellemez fakat zincirleme çalışma veri sızıntısıyla sonuçlanır.

Bölüm Detayı: Bağlam Şişmesi (Context Bloat) ve Çözümü

Eylemcilerin çalışırken tüm API dokümantasyonunu bağlam penceresine alması, token tüketimini 3 kattan 200 kata kadar artırabilir. Çözüm olarak sunulan Kod Odaklı Çalışma yani Code Mode yöntemi, verileri doğrudan model yerine sandbox içinde filtreleyerek token kullanımında %98.7 oranında bir azaltma sağlar.

---

Bölüm: Gerçek Dünya Uygulama Alanları

[Görsel: Yapay Zeka Eylemci Mimarisi]

Bölüm Detayı: Yazılım Geliştirme ve DevOps

MCP, yazılım dünyasında vibe coding modelini hızlandırıyor. Geliştirici doğal dilde ne istediğini söyler; otonom eylemci kodu yazar, test eder ve hataları giderir. Örnek olarak lsp-mcp sunucusu yapay zekanın kodu bir IDE gibi derinlemesine analiz etmesini sağlarken, AWS ve Kubernetes sunucuları pod sayısını ölçekleme gibi komutları otonom olarak bulutta yürütür.

Bölüm Detayı: Kurumsal Süreç Otomasyonu

[Tablo: İşe Alım, Tedarikçi Müzakereleri, Uyum Denetimi ve Müşteri Desteği senaryolarındaki eylemci değerleri listelenmiştir.]

Bölüm Detayı: Siber Güvenlikte Çift Yönlü Kullanım (Dual-Use)

Tarihe otonom yapay zeka eylemcilerinin doğrudan kullanıldığı ilk gelişmiş siber saldırı olarak geçen GTG-1002 Olayı'nda devlet destekli siber gruplar, Claude Code gibi asistanları jailbreak yöntemleriyle aşarak sızma operasyonlarında kullandılar. Savunma tarafında mavi takımlar otonom SOC eylemcileriyle tehdit avcılığı yaparken, ofansif tarafta kırmızı takımlar MCP üzerinden zafiyet keşifleri yürütür.

---

Bölüm: Savunma Stratejileri ve Defansif Mimari

Otonom eylemcilerin güvenliğini sağlamak için tek bir güvenlik katmanına güvenmek yerine derinlemesine savunma modeli uygulanmalıdır.

Bölüm Detayı: Çok Katmanlı Güvenlik Yaklaşımı ve Yalıtılmış Çalışma (Sandboxing)

Eylemcilerin ürettiği kodların doğrudan ana sunucu çekirdeğinde çalıştırılması zafiyetlere yol açabilir. Bu nedenle Google gVisor ve AWS Firecracker gibi sanallaştırma ve yalıtım teknolojileriyle izole çalışma alanları oluşturulmalı, eylemci sözleşme modelleri uygulanmalı ve en az yetki prensipleri gözetilmelidir.

Bölüm Detayı: MCP-Guard Algılama Performansı

[Tablo: SQL, shell ve araç gölgeleme saldırılarında MCP-Guard'ın yüksek tespit başarısı ve düşük gecikme süreleri gösterilmiştir.]

Bölüm Detayı: Taint Tracking ve Bilgi Akışı Kontrolü (IFC)

Dış dünyadan gelen veriler taint yani güvenilmez olarak işaretlenmeli ve bu verileri işleyen eylemcilerin dosya silme ya da dışarıya veri gönderme gibi kritik eylemleri insan onayı olmadan gerçekleştirmesi engellenmelidir.

Bölüm Detayı: Güvenlik Geçidi ve Ajan Guardrail Altyapısı

Yapay zeka trafiğini tek noktada toplamak için Kong API Gateway ve CrowdStrike Falcon AIDR entegrasyonu, diyalog akışlarını kontrol etmek için NVIDIA NeMo Guardrails ve Colang kuralları, girdi filtreleme için Meta Llama Guard ve dinamik yetki yönetimi için RFC 8693 Token Exchange ile RFC 8707 Resource Indicators standartları kullanılmalıdır.

Bölüm Detayı: Ajan İzleme ve Olay Müdahale (Wazuh Entegrasyonu)

Ajan sistemlerinin loglarını analiz etmek için Wazuh SIEM altyapısında özel decoders ve kurallar tanımlanır. Dolaylı enjeksiyon saldırıları algılandığında Wazuh Active Response betikleri şüpheli ajanın ağını bloke eder, NIST olay müdahale yaşam döngüsü doğrultusunda SOAR ve Cortex XSOAR playbook'ları ile adli analizler toplanıp izolasyon adımları otonom yürütülür.

Bölüm Detayı: Otonom Ajan Saldırılarının Matematiksel Temelleri

Yapay zeka modellerine yönelik sömürülerin ardında matematiksel sapma modelleri yatar. Model atlatma saldırılarının matematiksel yapısı girdi üzerinde küçük gürültüler üretmeyi amaçlarken; sleeper agent modellerinde tetikleyici token'lar attention yani dikkat ağırlıklarını kendi üzerine çekerek zehirli eylemin gerçekleşmesini sağlar.

Bölüm Detayı: Proaktif Güvenlik ve Otomatik Kırmızı Takım (Red Teaming)

AutoMalTool testlerinde üretilen zararlı MCP araçlarının statik analiz araçlarına karşı %86'nın üzerinde bir kaçınma oranına ulaştığı görülmüştür. Bu durum sadece statik analizlere güvenmenin yeterli olmadığını, çalışma zamanı davranış analizlerinin de zorunlu olduğunu kanıtlamaktadır.

Bölüm Detayı: Kurumsal Standartlar ve Uyum

Yapay zeka sistemleri için NIST AI RMF risk yönetim çerçevesi, ISO 42001 standardı ile OWASP LLM ve ASI listeleri uyumluluk için temel rehberlerdir.

---

Sonuç ve Gelecek Öngörüleri

Yapay zeka eylemcilerinin protokol ekosistemi hızla olgunlaşıyor ve otonom internet altyapısının temel taşlarını döşüyor.

[Görsel: Güvenli Eylemci Tasarımı]

Bu yeni dünyada güvenlik, tasarım aşamasından itibaren temel alınan bir yaklaşım olmak zorundadır. Siber saldırıların otomatike edildiği bu dönemde tehditlere karşı otonom savunma yapan Agentic SOC yapıları yakın gelecekte standart hale gelecektir. Yerel geliştirme ortamlarınızda public endpoint açmaktan kaçınarak verinizin mimarı olun, egemenliğinizi geri alın.

Dinlediğiniz için teşekkürler!
