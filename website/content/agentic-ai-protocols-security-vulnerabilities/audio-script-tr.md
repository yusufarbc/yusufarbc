Eylemsel Yapay Zeka Protokolleri: Yeni Bir Saldırı Yüzeyi mi? Otonom yapay zeka eylemcilerinin yaygınlaşmasıyla birlikte Model Context Protokolü, A2A, Agent Network Protokolü, Universal Commerce Protokolü ve Agent Payments Protokolü gibi protokoller yapay zeka mimarisinin omurgasını oluşturuyor. Bu yazıda Eylemsel Yapay Zeka kavramını, protokol ekosistemini katman katman ele alıyor ve güvenlik açıklarını kapsamlı biçimde inceliyoruz.

Yapay zeka tarihi şimdiye kadar iki büyük kırılma noktası yaşadı. İlki, sembolik yapay zekadan makine öğrenimine geçişti. Bugün ise reaktif dil modellerinden Eylemsel Yapay Zeka yani Agentic AI paradigmalarına geçişin tam ortasındayız. Bu ikinci dönüşüm, basit bir teknolojik ilerlemeden çok daha fazlası; zira siber güvenlik, karşılıklı güven ve sorumluluk paylaşımları söz konusu olduğunda oyunun kurallarını tamamen değiştiriyor.

Yapay zeka eylemcilerinin hızla hayatımıza girmesiyle birlikte yeni bir protokol ekosistemi de doğdu. Model Context Protokolü yani MCP, Agent-to-Agent yani A2A, Agent Network Protokolü yani ANP, Universal Commerce Protokolü yani UCP ve Agent Payments Protokolü yani AP2. Bu protokoller birbiriyle rekabet etmek yerine, tıpkı TCP IP katmanları gibi birbirini tamamlayan bir mimari sunuyor. Ancak bu katmanların her biri, geleneksel güvenlik çözümlerinin yetersiz kaldığı yepyeni saldırı yüzeylerini de beraberinde getiriyor.

Bölüm 1: Yapay Zeka Eylemci Protokollerinin Güvenlik ve Mimari Şeması.

Bir otonom yapay zeka uygulamasında kullanıcı, istemci, yönlendirici ve sunucular arasındaki güven sınırlarını ve potansiyel saldırı vektörlerini gösteren mimari şemayı incelediğimizde akış şu şekilde gerçekleşir.

Kullanıcı, hedef tanımları doğrudan İstemci Güvenli Alanı içinde yer alan Yapay Zeka İstemcisi ve Orkestratörüne iletir. Bu sırada dolaylı bir prompt injection saldırısı gerçekleştirmek isteyen bir saldırgan, istemciye dolaylı yoldan etki etmeye çalışabilir. İstemci katmanı ile yürütme alanı arasında bir güven sınırı bulunur. Bu güven sınırında Model Context Protokolü yani araç ve veri erişimi sağlayan MCP, eylemciler arası iletişimi yöneten A2A, ve keşif ile kimlik yönetimini üstlenen ANP protokolleri yer alır. Yapay zeka istemcisi, MCP sunucusuyla JSON-RPC protokolü üzerinden haberleşirken, A2A ile eylemciler arası mesajları iletir. ANP ise istemciye keşif yapılandırması sağlar.

Güven sınırının ötesindeki yürütme alanında, dosya sistemleri, veritabanları ve terminal gibi yerel sistemler ile uzak eylemciler bulunur. MCP yerel sistemlere doğrudan erişirken, A2A protokolü uzak eylemcilere bağlanır. Bu mimarideki en kritik güvenlik risklerinden biri, istemcinin yerel sistemler üzerinde yetki devri yani Confused Deputy zafiyeti yaşamasıdır.

Bölüm 2: Agentic AI yani Eylemsel Yapay Zeka Nedir?

Geleneksel üretici yapay zeka araçları sadece birer asistan gibidir: Siz soru sorarsınız, onlar da yanıtlar. Eylemsel Yapay Zeka ise adeta bir iş ortağıdır: Siz sadece nihai hedefi belirlersiniz; eylemci, bu hedefe ulaşmak için izleyeceği adımları kendisi planlar ve yürütür.

Bu büyük paradigma değişimi şu formülle özetlenebilir: Soru Soruldu ve Yapay Zeka Cevap Verdi paradigmasından, Hedef Belirlendi ve Yapay Zeka Çözüm Yolunu Bulup Uyguladı paradigmasına geçiş yapılmıştır.

Bu fark sadece işlevsel değildir; siber güvenlik açısından da son derece kritiktir. Reaktif bir model, örneğin standart bir chatbot, doğrudan sistemler üzerinde aksiyon alıp fiziksel bir hasara yol açamazken; otonom bir yapay zeka eylemcisi dosya silebilir, veritabanı sorgulayabilir, e-posta gönderebilir, ödeme işlemlerini tetikleyebilir ve hatta diğer eylemcileri göreve çağırabilir.

Modern otonom eylemciler temel olarak algılama, muhakeme ve eylem döngüsü üzerinden çalışır. Bu mimarinin temel yeteneklerini ve beraberinde getirdiği güvenlik risklerini incelediğimizde:

İlk yetenek Planlamadır. Büyük hedefleri küçük adımlara böler ve hata durumlarında alternatif yollar bulur. Bunun güvenlik etkisi, öngörülemeyen zincirleme eylemler ve mantık hatalarıdır.

İkinci bileşen Bellektir. Kısa ve uzun vadeli bağlamı korur ve vektör veritabanlarını kullanır. Güvenlik tarafındaki etkisi ise bellek zehirlenmesi ve yetkisiz veri sızıntısı riskleridir.

Üçüncü bileşen Araç Kullanımıdır. API çağırma, yerel sistemlerde kod çalıştırma ve tarayıcı yönetme gibi yetenekleri kapsar. Bunun güvenlik etkisi ise araçların kötüye kullanılması ve uzaktan kod yürütme yani RCE riskidir.

Dördüncü bileşen ise Öz-Denetimdir. Kendi ürettiği çıktıyı analiz edip hata varsa düzeltir. Güvenlik etkisi ise sonsuz döngü zafiyetleri ve manipüle edilebilir doğrulama mekanizmalarıdır.

Yapay zeka eylemcileri, karmaşık problemleri çözmek için çeşitli mantıksal muhakeme ve düşünce tasarımları kullanır. Bunlardan ilki, düşünme ve eyleme geçme süreçlerini birleştiren ReAct döngüsüdür. Eylemci aldığı girdiye göre bir karar verir, ilgili aracı çağırır, sonucu gözlemler ve bir sonraki adıma karar verir. İkincisi, sorunları adım adım mantıksal bir sırayla çözerek sonuca ulaşmayı sağlayan Düşünce Zinciri yani Chain-of-Thought yaklaşımıdır. Üçüncüsü, eylemcinin kendi ürettiği yanıtları ve kararları doğruluk, kalite ve kısıtlamalar açısından değerlendirdiği Öz-Denetim yani Reflection katmanıdır. Dördüncüsü ise problemin çözümüne giden birden fazla olasılığı eş zamanlı olarak değerlendiren ve en optimum yolu seçen Düşünce Ağacı yani Tree of Thoughts karar verme örüntüsüdür.

Sektörde popüler olan eylemci çatılarını ele aldığımızda ise öne çıkan dört büyük yapı mevcuttur. Graf tabanlı durum yönetimine odaklanan LangGraph, döngü içeren karmaşık ve çok adımlı iş akışları için tasarlanmıştır. Çoklu eylemci iletişimine odaklanan AutoGen, birden fazla eylemcinin bir arada çalıştığı karmaşık problem çözme süreçlerinde kullanılır. Rol tabanlı ekip yönetimine odaklanan CrewAI, belirli rollere sahip eylemcilerin hiyerarşik veya ardışık iş birliği yapmasını sağlar. Smolagents ise hafif ve kod tabanlı muhakemeye odaklanarak, düşük maliyetli, güvenli ve doğrudan kod yürüten hafif yapılar sunar.

Bölüm 3: RAG yani Veri Geri Çağırmayla Artırılmış Üretim.

Veri Geri Çağırmayla Artırılmış Üretim yani RAG, yapay zeka dünyasının en akıllıca çözümlerinden biridir. Büyük dil modellerinin güncel olmayan bilgi ve uydurma eğilimi gibi en büyük zayıflıklarını kapatmak için geliştirilmiştir.

Tipik bir RAG sisteminin uçtan uca veri hazırlama, arama ve yanıt üretme akışını incelediğimizde süreç şöyle işler:

Veri Hazırlama ve Gömme aşamasında PDF, veritabanı veya sıkça sorulan sorular gibi belgeler öncelikle küçük parçalara bölünür ve ardından vektör gömme işlemiyle matematiksel vektörlere dönüştürülür. İkinci aşama depolamadır; bu vektörler bir Vektör Veritabanına kaydedilir. Üçüncü aşama Arama ve Geri Çağırmadır; kullanıcı bir sorgu gönderdiğinde bu sorgu da vektöre çevrilir ve vektör veritabanında benzerlik araması yapılarak en yakın doküman parçaları bağlam olarak geri çağrılır. Son aşama olan Yanıt Üretiminde ise, geri çağrılan bağlam ile kullanıcının orijinal sorgusu birleştirilerek dil modeline gönderilir ve model bu kaynaklara sadık kalarak doğru ve güvenilir bir yanıt üretir.

Kısaca özetlemek gerekirse RAG, bir yapay zeka modelinin bir soruya yanıt verirken kendi hafızasına güvenmek yerine, dışarıdaki bir veri kaynağından ilgili bilgileri bulup getirerek yanıt üretmesini sağlayan bir mimaridir. Bir dil modeline devasa bir şirket kılavuzunu okutup belirli bir bilgiyi sorduğunuzda, RAG mekanizması kılavuzdan ilgili sayfayı bulur, modele gösterir ve modelin doğru yanıtı yazmasını sağlar.

RAG'in çalışma mantığı temelde üç adımdan oluşur: Gömme, Geri Çağırma ve Üretim. Eldeki dokümanlar küçük parçalara bölünerek vektör veritabanına kaydedilir. Kullanıcı soru sorduğunda, sistem bu soruyu da vektöre çevirip veritabanındaki en yakın doküman parçalarını saniyeler içinde bulur. Son olarak bu kaynak dokümanlar ve orijinal soru birleştirilerek modele gönderilir ve model uydurmadan net bir cevap yazar.

Son yıllarda RAG'in popülerliğini kaybettiği yönündeki algı aslında bir yanılgıdan ibarettir. RAG popülerliğini kaybetmemiş, aksine kurumsal dünyada standart haline gelmiştir. Ancak ilk dönemdeki büyülü ve kusursuz algısı değişmiştir. Bunun nedenleri arasında şirketlerin verileri dağınık olduğunda yanlış dokümanların getirilmesiyle oluşan çöp girerse çöp çıkar sorunu, modellerin artık tek seferde milyonlarca kelimeyi hafızasına alabilmesini sağlayan uzun bağlam penceresi, ve vektör veritabanı yönetmenin getirdiği maliyet ile gecikmeler yer almaktadır.

Bir RAG sistemi kurmak için genelde LangChain ve LlamaIndex gibi orkestrasyon araçları, Pinecone, Chroma, Milvus veya Weaviate gibi vektör veritabanları, ve OpenAI ya da Anthropic API'leri kullanılır. Gelecek açısından ise basit RAG sistemleri yerini Gelişmiş RAG ve Eylemsel RAG sistemlerine bırakmaktadır. Modellerin hafızası ne kadar büyürse büyüsün, petabaytlarca veriyi her seferinde sıfırdan modele yüklemek hem pahalı hem de yavaştır. Geleceğin ajanları internette araştırma yaparken veya veritabanı sorgularken arka planda her zaman RAG mekanizmasını kullanacaktır.

Bölüm 4: Agentic Web yani Eylemci Ağı Protokol Haritası.

Yapay zeka eylemcilerinin verimli çalışabilmesi için dış dünyaya nasıl bağlanılacağı ve diğer eylemcilerle nasıl güvenli iletişim kurulacağı sorunlarının çözülmesi gerekir. Bu amaçla geliştirilen protokoller iki ana kategoride incelenir:

Sektörden bağımsız temel altyapıyı oluşturan yatay protokoller yani işletim sistemi katmanı, ve belirli sektörlere yönelik semantik yapıları tanımlayan dikey protokoller yani uygulama katmanı.

Bu protokollerin katmanlarını ve görevlerini özetleyecek olursak:

Yatay katmanda yer alan Model Context Protokolü yani MCP, eylemci ile veri kaynakları ve araçlar arasında standart bir köprü kurar ve şu an canlı kullanıma hazırdır. Yine yatay katmanda yer alan Agent-to-Agent yani A2A protokolü, eylemcilerin birbiriyle konuşmasını ve iş birliği yapmasını sağlar ve o da canlı kullanıma hazırdır. Geliştirilme aşamasında olan Agent Network Protokolü yani ANP, yatay katmanda eylemcilerin internet üzerinde birbirini otonom keşfetmesini amaçlar. Dikey katmanda yer alan ve geliştirilme aşamasında olan Universal Commerce Protokolü yani UCP, e-ticaret süreçlerinin otonom yönetilmesi için ortak dil sunar. Son olarak yine dikey katmanda yer alan Agent Payments Protokolü yani AP2 ise eylemciler için kriptografik işlem ve ödeme yetkilendirmesi sağlar.

Bölüm 5: MCP yani Eylemcilerin USB-C Standardı.

Yapay zeka entegrasyonlarının ilk dönemlerinde, her model ve araç için özel entegrasyon kodları yazılması gerekiyordu. Bu durum büyük bir karmaşaya yol açıyordu. Anthropic tarafından geliştirilen ve daha sonra Linux Foundation'a devredilen Model Context Protokolü yani MCP, bu karmaşayı standart bir JSON-RPC 2.0 arayüzü ile çözmektedir.

Geleneksel REST API'lerinin yapay zeka eylemcileri için yetersiz kalmasının başlıca nedenleri; dil modellerinin esnek muhakeme yeteneğini sınırlayan katı şemalar, durumsuzluk, geniş API dokümanlarının her sorguda tekrar yüklenmesiyle oluşan token israfı, ve dil modelinin hatayı anlayıp otonom olarak düzeltmesini zorlaştıran yetersiz hata yönetimidir.

MCP, rollerin net ayrıldığı bir istemci-sunucu modelini esas alır. Bu mimarideki bileşenler şunlardır:

Yapay zeka mantığının ve uygulamanın çalıştığı ana ortamı temsil eden MCP Host; host uygulamanın içinde yer alan ve sunucuyla iletişimi kuran MCP İstemcisi; ve veri kaynakları ile araçları istemciye sunan MCP Sunucusu. İletişim ise stdio adı verilen yerel süreçler arası taşıma veya web tabanlı entegrasyonlar için sunucu tarafından gönderilen olaylar yani Server-Sent Events ve HTTP üzerinden gerçekleşir.

MCP'nin üç ana bileşeni ise şunlardır: Model tarafından kontrol edilen ve yapay zekanın çağırabileceği işlevleri tanımlayan Araçlar yani Tools; uygulama tarafından kontrol edilen ve modele salt okunur veri sunan Kaynaklar yani Resources; ve kullanıcı tarafından kontrol edilen, sık kullanılan görevleri otomatikleştiren İstemler yani Prompts bileşenleridir.

Güvenlik sınırları açısından MCP, çalışma alanını kısıtlayan URI tabanlı Kökler yani Roots özelliği ve sunucunun host uygulamadan dil modeli çıktısı talep etmesini sağlayan Örnekleme yani Sampling özelliğini içerir. Ancak örnekleme yetkisi konuşma gaspı risklerine yol açabileceğinden her zaman insan onayına tabi tutulmalıdır.

Bölüm 6: A2A yani Eylemciler Arası İletişim Standartları.

MCP tek bir eylemcinin kendi araçlarıyla konuşmasını sağlarken, otonom eylemcilerin birbirine görev devretmesi veya ortak çalışması için A2A protokolü devreye girer. Google öncülüğünde geliştirilen A2A, farklı platformlardaki eylemcilerin birbirini tanımasını, kimlik doğrulamasını ve iş ortaklığı yapmasını sağlar. A2A eylemcinin internet üzerinden diğer uzman eylemcilerle iletişim kurup onlardan iş talep etmesine imkan tanır.

A2A protokolünün çalışma prensibine baktığımızda, her eylemcinin yeteneklerini ve kimlik doğrulama yöntemlerini içeren ve well-known adresi altında yayınlanan Eylemci Tanıtım Kartları yer alır. Ayrıca görevlerin takibini kolaylaştırmak için gönderildi, çalışıyor, girdi bekleniyor ve tamamlandı veya başarısız gibi adımlardan oluşan standart bir durum makinesi tanımlanmıştır. İletişim ise HTTPS üzerinde JSON-RPC 2.0 ve Server-Sent Events ile gerçekleştirilir.

Güvenlik modelinde ise güçlü kimlik doğrulama, HTTPS üzerinden şifreleme, detaylı yetkilendirme ve webhook güvenliği gibi endüstri standartları uygulanır. Ancak A2A protokolü, eylemciler arası gerçekleşebilecek dolaylı komut enjeksiyonu saldırılarını yapısal olarak engellemez; bu nedenle girdiler her zaman filtrelenmelidir. Kısacası MCP dikey erişimle eylemciden araçlara bağlantı kurarken, A2A yatay iletişimle eylemciden diğer eylemcilere bağlantı sağlar.

Bölüm 7: ANP yani Otonom Eylemci Keşif Altyapısı.

Milyonlarca yapay zeka eylemcisinin internete dağıldığı açık bir ekosistemde, bir eylemcinin diğer uzman eylemcileri nasıl bulacağı ve onlara nasıl güveneceği sorununu çözmek için Agent Network Protokolü yani ANP geliştirilmektedir. ANP merkezi bir otoriteye bağımlı olmadan keşif, kimlik doğrulama ve haberleşmeyi sağlar.

ANP üç katmanlı bir yapıya sahiptir. İlk katman, merkeziyetsiz tanımlayıcılar kullanarak doğrulanabilir kimlikler ve uçtan uca şifreli bağlantı sağlayan Kimlik ve Güvenli İletişim Katmanıdır. İkinci katman, eylemcilerin ortak bir iletişim dilinde anlaşabilmesini yöneten Meta-Protokol Katmanıdır. Üçüncü katman ise JSON-LD standartlarını kullanarak anlamsal olarak zengin ve sorgulanabilir bir keşif ortamı oluşturan Uygulama Protokolü Katmanıdır. Keşif yöntemleri ise aktif keşif ve pasif keşif olarak ikiye ayrılır.

MCP, A2A ve ANP protokollerini karşılaştırdığımızda farklar şöyledir:

Temel odak açısından; MCP lokal veri ve araç erişimine, A2A eylemciler arası iş birliğine, ANP ise keşif ve kimlik doğrulamasına odaklanır.

Mimari model olarak; MCP istemci-sunucu modelini, A2A eşler arası modeli, ANP ise merkeziyetsiz modeli esas alır.

Kullanım kapsamında; MCP lokal ve kurumsal sınırları, A2A kurumsal ortaklıkları, ANP ise açık internet ekosistemini kapsar.

Kimlik altyapısında ise; MCP OAuth 2.1 ve stdio yetkilerini, A2A OAuth 2.0 ve OpenID Connect standartlarını, ANP ise merkeziyetsiz tanımlayıcılar ile kriptografik anahtarları kullanır.

Bölüm 8: UCP ve AP2 yani Yapay Zeka Eylemcileri İçin Finans ve Ödeme Standartları.

Yapay zeka eylemcilerinin kendi başlarına satın alma kararları verip ödeme yapmaya başlaması, klasik e-ticaret ve dolandırıcılık tespit sistemlerini kökten değiştirmektedir. Bu finansal akışı güvenli hale getirmek için UCP ve AP2 standartları geliştirilmiştir.

Universal Commerce Protokolü yani UCP, eylemciler için ortak bir ticaret dili sunarak satıcıları bulmayı, katalogları taramayı ve ödeme adımına geçmeyi sağlar. Agent Payments Protokolü yani AP2 ise ödemelerin yetkilendirme katmanını yöneterek süreci kriptografik kurallara bağlı sözleşmeli ödemelere dönüştürür.

AP2'nin yetki modelinde üç ana sözleşme yer alır. Kullanıcının eylemcisine verdiği sınırları belirleyen İstek Yetkisi; fiyat netleştiğinde oluşturulan Sepet Yetkisi; ve ödeme kuruluşu tarafından üretilen, kredi kartı bilgilerini eylemciden gizleyen Ödeme Yetkisidir. Bu süreçte satıcılar çift imza doğrulaması kullanarak sahtekarlık risklerini sıfıra indirir.

Eylemcili ticaretteki yeni riskler ise; biyometrik doğrulama veya tek kullanımlık şifre gibi klasik güvenlik doğrulamalarının çalışmaması, fiyat arbitrajı yapmaya çalışan eylemciler arasındaki mantıksal çakışmalar nedeniyle oluşan sonsuz sipariş döngüleri, ve hatalı satın almalarda yasal sorumluluk sınırlarının belirsizliğidir.

Bölüm 9: MCP Güvenliği ve Zafiyet Analizi.

MCP kullanan yapay zeka eylemcilerinde iletişim akışı tersine döner. Dil modeli, sunucudan alabileceği araç listesini çeker fakat hangi aracı, ne zaman ve hangi parametrelerle çağıracağına kendi mantık yürütme süreciyle karar verir. Bu durum girdi filtrelemeyi son derece zorlaştırır.

Dolaylı Komut Enjeksiyonu yani Indirect Prompt Injection, eylemci güvenliğinin en zayıf halkasıdır. Eylemci, okuması için verilen bir e-postayı veya web sayfasını incelerken o içeriğe gizlenmiş kötü niyetli bir talimatla karşılaşabilir. Model bu veriyi güvenilir bir kaynaktan gelen talimat olarak algılayıp yerine getirdiğinde, Confused Deputy yani Yetki Devri zafiyeti tetiklenmiş olur ve saldırgan eylemcinin yüksek yetkilerini kullanarak sisteme zarar verir.

Öne çıkan MCP saldırı senaryolarını incelediğimizde:

İlk senaryo Araç Tanımı Zehirlenmesidir. Saldırganlar, kötü niyetli talimatları doğrudan MCP aracının JSON şemasındaki açıklama alanına yerleştirir. Dil modeli bu aracı nasıl kullanacağını okurken bu gizli komutları yürütür.

İkinci senaryo Rug Pull yani Gecikmeli Saldırıdır. Temiz olarak sunulan ve güven kazanan bir MCP sunucusu, daha sonra kötü amaçlı bir güncellemeyle arka kapıya dönüştürülür.

Üçüncü senaryo Sunucu ve Araç Gölgelemedir. Saldırganın hazırladığı zararlı bir sunucu, güvenilir bir aracın adını birebir taklit ederek dil modelini sahte sürümü tetiklemeye yönlendirir.

Dördüncü senaryo ise Sampling Yetkisinin Kötüye Kullanımıdır. Zararlı bir sunucu, mesaj oluşturma özelliğini suistimal ederek modelin geçmiş konuşmalarını çalabilir veya sisteme kalıcı yönlendirmeler enjekte edebilir.

Güvenlik riskinde Ölümcül Üçlü yani toxic trio; Geniş Veri Erişimi, Güvenilmeyen İçerik Okuma ve Harici Aksiyon Yeteneğinin aynı anda bulunması durumunda felaket senaryolarını kaçınılmaz hale getirir.

Bölüm 10: Çoklu Eylemci Güvenliği.

OWASP, otonom yapay zeka sistemlerine yönelik tehditleri sınıflandırmak amacıyla ASI Top 10 risk listesini yayınlamıştır. Bu listedeki öne çıkan riskler şunlardır:

ASI01, Eylemci Hedef Kaçırma; prompt enjeksiyonuyla eylemcinin asıl hedefinin saptırılmasıdır. ASI02, Araçların Kötüye Kullanımı; API veya kod çalıştırma araçlarının veri sızdırmak amacıyla manipüle edilmesidir. ASI03, Yetki ve Kimlik İstismarı; gereğinden fazla yetki verilmesiyle ortaya çıkan ayrıcalık yükseltme açıklarıdır. ASI04, Tedarik Zinciri Riskleri; güvenilmeyen üçüncü taraf eylemcilerin veya zayıf modellerin sisteme dahil edilmesidir. ASI05, Kontrolsüz Kod Yürütme; yalıtılmış alan dışında veya içinde izin verilmeyen kodların çalıştırılmasıdır. ASI06 ise Bellek ve Bağlam Zehirlenmesi; RAG veritabanlarına veya bellek kayıtlarına yanlış veriler gömülerek kararların sabote edilmesidir.

Çoklu eylemci sistemlerinde zincirleme saldırı riski de son derece yükkündür. Eylemciler arasındaki örtük güven nedeniyle, bir dış saldırgan dolaylı prompt injection ile düşük ayrıcalıklı bir dış eylemciyi ele geçirebilir. Bu eylemci güven ilişkisini istismar ederek yüksek ayrıcalıklı bir iç eylemciyle konuşabilir, ve iç eylemci de yetki sınırlarını aşarak nihayetinde kritik sistemlere sızabilir.

Klasik dil modeli güvenliği ile otonom eylemci güvenliğini karşılaştırdığımızda:

Birincil öncelik olarak; klasik LLM güvenliğinde girdi ve çıktıların temizlenmesi hedeflenirken, eylemci güvenliğinde hedeflerle hizalanma ve otonom davranış denetimi esastır.

Durum bilgisinde; klasik modeller durumsuz çalışırken, eylemciler kalıcı bellek ve bağlam yönetimi içeren durumlu yapılardır.

Çalışma şeklinde; klasik modeller pasif bilgi üretirken, eylemciler aktif araç kullanımı ve eylem gerçekleştirme yeteneğine sahiptir.

Etki alanında; klasik güvenlik tekil model etkileşimiyle sınırlıyken, eylemci güvenliği birbiriyle konuşan eylemci zincirlerini kapsar.

Güven modelinde ise; klasik çevre tabanlı güvenliğin aksine otonom eylemcilerde Sıfır Güven yaklaşımı uygulanır.

Bölüm 11: Akademik Araştırmalar ve Sektör Analizleri.

Yapılan benchmark testleri, MCP entegrasyonunun büyük ticari modellerde ortalama yüzde 9.5 oranında muhakeme performansı kaybına yol açtığını göstermektedir. Testlerde en iyi yapay zeka eylemcilerinin çok adımlı görevleri başarıyla tamamlama oranının yüzde 60'ın altında kaldığı görülmüştür.

Görev alanlarındaki başarı skorlarına baktığımızda; finansal analiz alanında GPT-4o yüzde 72 başarım gösterirken, dosya sistemi işlemlerinde Qwen 2.5 max yüzde 88.7, web aramada Claude 3.7 Sonnet yüzde 62, otonom muhasebede OpenAI Agent SDK yüzde 60 ve üç boyutlu tasarımda yüzde 36.84 başarı skoru elde etmiştir.

GitHub ekosistemi incelemesinde ise, MCP etiketi taşıyan depoların sadece yüzde 5'inin işlevsel bir sunucu barındırdığı, bu sunucu kodlarının ortanca boyutunun 920 satır olduğu, ve aktif MCP sunucularının yüzde 5.5'inde dolaylı kod zehirlenmesine açık zafiyetler bulunduğu saptanmıştır. Ayrıca tek başına zararsız olan işlemlerin bir araya getirilerek veri sızıntısıyla sonuçlanması riski, yani Sequenced Tool Attack Chaining kısaca STAC saldırıları öne çıkmaktadır.

Eylemcilerin çalışırken tüm API dokümantasyonunu bağlam penceresine alması durumunda oluşan Bağlam Şişmesi yani Context Bloat sorunu da kritiktir. Doğrudan araç çağrısı yaklaşık 150 bin token tüketirken, sandbox içerisinde kod çalıştırma yaklaşımı sadece 2 bin token tüketerek yüzde 98.7 oranında devasa bir tasarruf sağlar.

Bölüm 12: Gerçek Dünya Uygulama Alanları.

Yazılım mühendisliği ve DevOps alanında MCP, vibe coding modelini hızlandırmaktadır. Bu kapsamda eylemci dünyası ile dil sunucu protokolü arasında köprü kuran lsp-mcp sunucusu ve AWS ya da Kubernetes üzerinde otonom pod yönetimi sağlayan sistemler öne çıkmaktadır.

Kurumsal iş süreçlerinde eylemcilerin katkılarını incelediğimizde:

İnsan kaynakları alanında en uygun aday kısa listelerini hazırlar. Satın alma ve anlaşmalarda tedarikçilere karşı en avantajlı pazarlık pozisyonunu çıkarır. Uyum ve denetimde şirket politikaları ile sistem günlüklerini bağlayarak uyumluluk açıklarını denetler. Müşteri ilişkilerinde ise CRM ve veritabanlarına erişerek sorulara anında ve tutarlı yanıtlar verir.

Siber güvenlikte ise çift yönlü kullanım mevcuttur. Claude Code gibi otonom kodlama asistanlarının jailbreak yöntemleriyle aşılıp çok aşamalı sızma operasyonlarında kullanıldığı GTG-1002 Olayı, tarihe otonom eylemcilerin kullanıldığı ilk gelişmiş siber saldırı olarak geçmiştir. Savunma tarafında otonom eylemciler anomali tespiti ve tehdit avcılığı yaparken, ofansif tarafta sızma testi araçlarını otonom çalıştırarak zafiyetleri keşfederler.

Bölüm 13: Savunma Stratejileri ve Defansif Mimari.

Eylemcilerin güvenliğini sağlamak için derinlemesine savunma modeli uygulanmalıdır. Çok katmanlı güvenlik yaklaşımının katmanları şunlardır:

Araçların çalıştığı ortamın izole edilmesini sağlayan Yalıtılmış Çalışma yani Sandbox; araç çağrılarının önceden tanımlanmış kurallara uyması durumunda onaylandığı Eylemci Sözleşme Modeli yani ACM; Llama Guard veya MCP-Guard gibi sistemlerle girdi çıktı kontrolünün yapıldığı Semantik WAF ve LLM Guard; ve süre sınırlı, göreve özel token kullanımını içeren En Az Yetki Prensibi.

MCP-Guard algılama performansına bakıldığında; SQL enjeksiyonunda yüzde 96.31 tespit başarısı ve 0.11 milisaniye gecikme, Shell enjeksiyonunda yüzde 94.32 tespit başarısı ve 0.05 milisaniye gecikme, Araç gölgeleme saldırılarında ise yüzde 86.83 tespit başarısı ve 0.20 milisaniye gecikme elde edilmiştir.

Ayrıca dış dünyadan gelen verilerin tainted yani güvenilmez olarak işaretlenip insan onayı olmadan kritik eylemlerin engellendiği bilgi akışı kontrolü, yetki aşımını engellemek için OAuth 2.1 standardındaki Resource Indicators kullanımı, ve proaktif güvenlik amacıyla AutoMalTool gibi otomatik kırmızı takım araçlarının kullanılması kritik savunma stratejileridir. Kurumsal standartlarda ise NIST AI RMF, ISO/IEC 42001, OWASP LLM Top 10 ve OWASP ASI Top 10 uyumluluk çerçeveleri esas alınmalıdır.

Bölüm 14: Sonuç ve Gelecek Öngörüleri.

Yapay zeka eylemcilerinin protokol ekosistemi hızla olgunlaşıyor. MCP, A2A, ANP, UCP ve AP2 protokolleri otonom internet altyapısının temel taşlarını döşüyor.

Bu yeni dünyada güvenlik, sistem kurulduktan sonra eklenen bir yama değil; tasarım aşamasından itibaren temel alınan bir yaklaşım olmak zorundadır. Yerleşik yetkilendirme katmanları, dijital imzalı yazılım envanterleri ve standartlaştırılmış sandbox yapıları geleceğin siber güvenlik mimarisini şekillendirecektir. Savunmanın da makine hızında yapılması gerektiğinden, tehditlere karşı otonom savunma yapan Eylemci Destekli Güvenlik Merkezleri yani Agentic SOC yapısı çok yakın bir gelecekte standart hale gelecektir.

Dinlediğiniz için teşekkürler!
