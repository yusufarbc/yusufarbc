

# **Splunk ile Gelişmiş Web Saldırısı Tespiti: Kapsamlı Bir Analiz ve Uygulama Rehberi**

## **Giriş: Splunk Web Veri Modeli ile Tehdit Tespiti: Teoriden Pratiğe**

Modern siber güvenlik operasyonlarında, web uygulamaları en sık hedeflenen saldırı yüzeylerinden birini oluşturmaktadır. Bu uygulamaların ürettiği günlük (log) kayıtları, saldırıları tespit etmek ve müdahale etmek için hayati öneme sahip kanıtlar içerir. Ancak, Apache, Microsoft IIS, Nginx gibi farklı web sunucularının her birinin kendine özgü log formatları kullanması, güvenlik analistleri için ciddi bir zorluk teşkil eder.1 Her bir log kaynağı için ayrı ayrı tespit kuralları yazmak, hem zaman alıcı hem de sürdürülebilir olmayan bir yaklaşımdır. Bu karmaşıklık, operasyonel verimsizliğe ve tespit kör noktalarına yol açar.

Bu raporun temelini oluşturan stratejik çözüm, veri normalizasyonudur. Splunk Ortak Bilgi Modeli (Common Information Model \- CIM), bu sorunu çözmek için tasarlanmış, farklı kaynaklardan gelen verileri ortak bir standartta birleştiren anlamsal bir modeldir.3 CIM, bir nevi "evrensel çevirmen" görevi görerek, bir Apache logundaki

request alanı ile bir IIS logundaki cs-uri-stem ve cs-uri-query alanlarının her ikisini de Web.url gibi standart bir alana eşler.5 Bu standardizasyon, analistlerin kaynak-bağımsız, daha genel ve güçlü tespit kuralları yazmasına olanak tanır.

Bu sürecin merkezinde, web sunucusu ve proxy olaylarını tanımlamak için özel olarak tasarlanmış olan Web veri modeli yer alır.5 Bu veri modeli,

Splunk Add-on for Apache Web Server 7 ve

Splunk Add-on for Microsoft IIS 8 gibi Teknik Eklentiler (Technical Add-ons \- TA) aracılığıyla beslenir. Bu eklentiler, ham log verilerini ayrıştırır ve CIM alanlarına doğru bir şekilde eşleyerek

Web veri modelinin tutarlı ve güvenilir olmasını sağlar.9

CIM'in benimsenmesi, bir güvenlik operasyonları ekibinin reaktif bir duruştan (her yeni log kaynağı için özel kural yazma zorunluluğu) proaktif ve ölçeklenebilir bir duruşa (kavramsal tehditler için genel kurallar yazma yeteneği) geçişini sağlayan stratejik bir olgunluk adımıdır. Örneğin, bir analist başlangıçta Apache logları için bir SQL enjeksiyonu kuralı yazabilir. Kuruma IIS sunucuları eklendiğinde, aynı mantığı IIS log formatına uyarlamak için yeni bir kural yazması gerekir. Bu durum, kural sayısını ve bakım yükünü artırır.4 Ancak CIM kullanıldığında, her iki log kaynağı da

Web.url alanına normalize edildiği için, analistin yazdığı tek bir | tstats... from datamodel=Web where Web.url LIKE "..." sorgusu, mevcut ve gelecekte eklenecek tüm CIM uyumlu web kaynakları için geçerli olur. Bu yaklaşım, analistlerin zamanını "veri formatı çevirisi" gibi düşük değerli işlerden, "yeni tehdit davranışlarını modelleme" gibi yüksek değerli işlere kaydırır. Dolayısıyla CIM, yalnızca teknik bir araç değil, aynı zamanda bir operasyonel verimlilik ve yetenek çarpanıdır.

Performans açısından, bu rapordaki sorgular büyük ölçüde tstats komutunu ve hızlandırılmış veri modellerini kullanır. Veri modeli hızlandırma, sık kullanılan veriler için özet indeksler oluşturarak arama sürelerini önemli ölçüde azaltır.4

summariesonly=true parametresi, sorguların yalnızca bu hızlı özetler üzerinde çalışmasını sağlayarak, ham logların tamamını taramanın getireceği performans yükünü ortadan kaldırır.11

Aşağıdaki tablo, bu rapor boyunca kullanılacak olan Web veri modelindeki kritik alanları ve güvenlik analizindeki rollerini özetlemektedir.

**Tablo 1: Splunk Web Veri Modeli: Tehdit Tespiti için Kritik Alanlar**

| CIM Alanı | Veri Tipi | Açıklama 5 | Güvenlik Analizindeki Rolü ve Örnek Kullanımı |
| :---- | :---- | :---- | :---- |
| Web.url | string | İsteğin tam URL'i (sorgu parametreleri dahil). | Enjeksiyon, Yol Geçişi (Path Traversal), SSRF gibi URL tabanlı saldırıların anahtar kelimelerini ve desenlerini aramak için kullanılır. |
| Web.src | string | İsteği başlatan kaynak IP adresi. | Brute-force, DoS, IDOR taraması gibi hacimsel saldırılarda saldırganı tespit etmek ve anomali analizi için temeldir. |
| Web.dest | string | İsteğin yapıldığı hedef sunucu IP adresi veya ana bilgisayar adı. | Belirli bir sunucuya yönelik anormal aktiviteleri izlemek ve iç ağ tarama girişimlerini tespit etmek için kullanılır. |
| Web.status | number | Sunucunun döndürdüğü HTTP yanıt durum kodu. | Kimlik doğrulama hatalarını (401, 403), sunucu hatalarını (5xx) ve kaynak bulunamadı hatalarını (404) tespit ederek anomali aramak için temeldir. |
| Web.http\_method | string | Kullanılan HTTP metodu (GET, POST, PUT vb.). | Genellikle POST olması beklenen bir uç noktaya yapılan GET istekleri gibi anormallikleri veya TRACE gibi tehlikeli metodların kullanımını tespit etmek için kullanılır. |
| Web.bytes | number | Aktarılan toplam bayt (giriş \+ çıkış). | Büyük veri sızıntısı girişimlerini (yüksek bytes\_out) veya DoS saldırılarını (yüksek bytes\_in veya bytes\_out) tespit etmek için kullanılır. |
| Web.http\_user\_agent | string | İstemci uygulamasının (tarayıcı, araç vb.) kendini tanıttığı dize. | Bilinen kötücül araçların (sqlmap, nmap, nikto) User-Agent'larını veya normal dışı, şüpheli User-Agent dizelerini aramak için kullanılır. |
| Web.user | string | Kimliği doğrulanmış kullanıcı adı. | Belirli bir kullanıcı hesabına yönelik anormal aktiviteleri, yetki yükseltme girişimlerini veya kimlik hırsızlığını izlemek için kritik öneme sahiptir. |
| Web.http\_referrer | string | Kullanıcının mevcut sayfaya hangi sayfadan geldiğini gösteren URL. | Siteler Arası İstek Sahteciliği (CSRF) ve yönlendirme tabanlı saldırıların analizinde kullanılır. |

Bu temel üzerine inşa edilen aşağıdaki bölümler, belirli saldırı türlerini, bunların loglardaki yansımalarını ve Splunk Web veri modeli kullanılarak nasıl etkili bir şekilde tespit edilebileceğini ayrıntılı SPL sorguları ile açıklayacaktır.

## **1\. Enjeksiyon Saldırıları (Injection Attacks)**

Enjeksiyon saldırıları, bir uygulamanın yorumlayıcısına (veritabanı, işletim sistemi, şablon motoru vb.) güvenilmeyen veriler göndererek, bu verilerin komut olarak yorumlanmasını ve çalıştırılmasını sağlayan geniş bir zafiyet sınıfıdır.13 Bu saldırıların temelinde yatan ortak ilke, uygulamanın

**veri düzlemi (data plane)** ile **komut düzlemini (control plane)** birbirinden ayırt edememesidir.14 Bir web formu aracılığıyla alınan kullanıcı adı bir "veri" iken, bu veriyi işleyen SQL sorgusu bir "komut"tur. Saldırgan, veri alanına komut sözdizimi içeren özel karakterler enjekte ettiğinde, uygulama bu sınırı aşar ve veriyi komutun bir parçası olarak yürütür. Web sunucusu loglarına yansıyan URL veya POST gövdesi gibi alanlardaki bu anormal sözdizimi, bu "düzlem sızıntısının" en somut kanıtıdır ve tespit stratejimizin temelini oluşturur.

### **1.1. SQL Enjeksiyonu (SQL Injection \- SQLi)**

#### **A. Kavramsal Açıklama**

SQL Enjeksiyonu (SQLi), bir saldırganın, uygulamanın veritabanına gönderdiği SQL sorgularını manipüle etmesine olanak tanıyan bir enjeksiyon tekniğidir. Başarılı bir SQLi saldırısı, saldırganın hassas verileri okumasına (veri sızdırma), verileri değiştirmesine veya silmesine (veri bütünlüğünü bozma), veritabanı üzerinde yönetimsel işlemler yapmasına ve hatta bazı durumlarda temel işletim sistemine komutlar göndermesine olanak tanıyabilir.14 Saldırganlar, sorgunun orijinal mantığını değiştirmek için tek tırnak (

'), çift tire (--), yorum blokları (/\* \*/), UNION, SELECT gibi SQL metakarakterlerini ve anahtar kelimelerini kullanır.15

#### **B. Tespit Mantığı ve Göstergeler**

SQLi girişimleri, web erişim loglarının Web.url (GET istekleri için) ve Web.form\_data (POST istekleri için, eğer loglanıyorsa) alanlarında SQL'e özgü desenlerin aranmasıyla tespit edilebilir. Aranacak temel göstergeler şunlardır:

* **Sözdizimi Bozucular:** Tek tırnak ('), çift tire (--), C-stili yorumlar (/\*, \*/).  
* **Anahtar Kelimeler:** UNION, SELECT, FROM, WHERE, ORDER BY, GROUP BY.  
* **Veritabanı Fonksiyonları:** Zaman tabanlı kör SQLi için sleep(), BENCHMARK(); bilgi toplama için @@version, user(), database().15  
* **Totolojiler (Her Zaman Doğru İfadeler):** Kimlik doğrulama atlatma girişimleri için OR 1=1, 'a'='a' gibi ifadeler.14  
* **URL Kodlanmış Karakterler:** %27 ('), %20 (boşluk), %3D (=), %2B (+).

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Aşağıdaki sorgu, Web veri modelini kullanarak yaygın SQLi girişimlerini ve bilinen saldırı araçlarını tespit etmeyi amaçlar.

Splunk SPL

| tstats summariesonly=true count min(\_time) as firstTime max(\_time) as lastTime from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url="\*'\*" OR Web.url="\*--\*" OR Web.url="\*/\*" OR Web.url="\*/" OR lower(Web.url)="\*union\*select\*" OR lower(Web.url)="\*order\*by\*" OR lower(Web.url)="\*group\*by\*") by Web.url, Web.src, Web.dest, Web.http\_user\_agent  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=http\_user\_agent "(?i)(?P\<sqli\_tool\>sqlmap|havij|bsqlbf|sqlninja|pangolin)"  
| eval is\_suspicious\_pattern \= if(match(url, "(\\'|%27)\\s\*(OR|--|;|UNION|SELECT)"), "High", "Medium")  
| table firstTime, lastTime, src, dest, http\_user\_agent, url, sqli\_tool, is\_suspicious\_pattern, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats...: Sorguyu, yalnızca hızlandırılmış Web veri modeli özetleri üzerinde çalıştırarak performansı artırır.11  
2. where (Web.url="..." OR...): Web.url alanı içinde en yaygın SQLi desenlerini arar. Bu desenler, sorgu yapısını bozmak veya ek komutlar eklemek için kullanılan temel teknikleri kapsar.15  
3. by Web.url, Web.src,...: Olayları kaynak IP, hedef, user-agent ve tam URL bazında gruplayarak her bir benzersiz saldırı girişimini sayar.  
4. | rex field=http\_user\_agent...: http\_user\_agent alanında sqlmap gibi bilinen otomatize SQLi araçlarının isimlerini arar ve bulursa sqli\_tool alanına atar. Bu, bir bulgunun ciddiyetini teyit etmede güçlü bir göstergedir.  
5. | eval is\_suspicious\_pattern...: eval ve match fonksiyonlarını kullanarak daha karmaşık ve yüksek olasılıklı saldırı desenlerini (örneğin, bir tırnak işaretini takip eden OR veya UNION) belirleyip is\_suspicious\_pattern alanı ile etiketler. Bu, analistin önceliklendirme yapmasına yardımcı olur.  
6. | table...: Analiz için en önemli alanları (zaman damgaları, kaynak, hedef, URL, tespit edilen araç, şüphe seviyesi ve olay sayısı) içeren bir tablo oluşturur.

### **1.2. NoSQL Enjeksiyonu**

#### **A. Kavramsal Açıklama**

NoSQL enjeksiyonu, MongoDB, CouchDB gibi şemasız veritabanlarını hedef alır. Bu veritabanları genellikle SQL yerine JSON, BSON veya JavaScript tabanlı sorgu dilleri kullandığından, enjeksiyon vektörleri de farklılık gösterir. Saldırganlar, sorgu mantığını değiştirmek için \[ , \], {, }, $ne (eşit değil), $gt (büyüktür), $regex (düzenli ifade) gibi NoSQL'e özgü operatörleri veya JavaScript fonksiyonlarını enjekte etmeye çalışır.

#### **B. Tespit Mantığı ve Göstergeler**

Tespit, Web.url ve form\_data alanlarında NoSQL'e özgü operatörlerin ve sözdiziminin aranmasına dayanır:

* **Operatörler:** $ne, $gt, $lt, $in, $regex, $where. Dolar işareti ($) ile başlayan bu operatörlerin URL parametrelerinde ham olarak bulunması oldukça şüphelidir.  
* **Sözdizimi Karakterleri:** Beklenmedik veya iç içe geçmiş {, }, \[, \] karakterleri.  
* **JavaScript Enjeksiyonu:** sleep(), function(), this gibi anahtar kelimeler (özellikle $where veya mapReduce operatörleriyle birlikte).

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Aşağıdaki sorgu, URL'lerde NoSQL operatörlerinin varlığını tespit eder.

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url LIKE "%\[$\]ne%" OR Web.url LIKE "%\[$\]gt%" OR Web.url LIKE "%\[$\]lt%" OR Web.url LIKE "%\[$\]in%" OR Web.url LIKE "%\[$\]regex%" OR Web.url LIKE "%\[$\]where%") by Web.url, Web.src, Web.dest  
| \`drop\_dm\_object\_name("Web")\`  
| rename src as source\_ip, dest as destination\_server, url as vulnerable\_url, count as attempt\_count  
| table \_time, source\_ip, destination\_server, vulnerable\_url, attempt\_count  
| sort \- attempt\_count

**Sorgu Açıklaması:**

1. | tstats...: Hızlandırılmış Web veri modelini kullanır.  
2. where (Web.url LIKE "%\[$\]ne%" OR...): URL içinde, köşeli parantezlerle $ karakterini escape ederek, NoSQL'e özgü operatörlerin ($ne, $gt vb.) tam olarak varlığını arar. Bu, $ karakterinin meşru kullanımlarından kaynaklanabilecek yanlış pozitifleri azaltır.  
3. by Web.url, Web.src, Web.dest: Olayları kaynak, hedef ve URL'e göre gruplar.  
4. | rename...: Sonuç tablosundaki sütun başlıklarını daha anlaşılır hale getirir.

### **1.3. Komut Enjeksiyonu (Command Injection)**

#### **A. Kavramsal Açıklama**

Komut Enjeksiyonu, bir saldırganın savunmasız bir uygulama aracılığıyla sunucunun temel işletim sisteminde keyfi komutlar çalıştırmasını sağlayan kritik bir zafiyettir.17 Bu durum genellikle, uygulamanın kullanıcıdan aldığı girdiyi (örneğin bir dosya adı veya IP adresi)

ping, nslookup, find gibi bir sistem komutuna parametre olarak eklemesi ve bu girdiyi düzgün bir şekilde temizlememesi (sanitization) sonucu ortaya çıkar.18

#### **B. Tespit Mantığı ve Göstergeler**

Tespit, Web.url alanında shell metakarakterlerinin ve yaygın işletim sistemi komutlarının aranmasına odaklanır:

* **Komut Ayırıcılar ve Zincirleyiciler:** ;, |, ||, &, &&, %0a (URL-encoded newline), \` (backtick), $( ). Bu karakterler, bir komutu sonlandırıp yenisini başlatmak için kullanılır.  
* **Linux/UNIX Komutları:** ls, cat, id, whoami, uname, ifconfig, wget, curl, nc, bash, sh.  
* **Windows Komutları:** dir, type, whoami, net user, ipconfig, powershell, certutil.

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Bu sorgu, hem shell metakarakterlerini hem de bilinen OS komutlarını arayarak komut enjeksiyonu girişimlerini tespit eder.

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url LIKE "%;%" OR Web.url LIKE "%|%" OR Web.url LIKE "%&&%" OR Web.url LIKE "%\`%" OR Web.url LIKE "%$(%") by Web.url, Web.src, Web.dest  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=url "(?i)(%3B|%7C|%26|%60|%24%28).\*(?P\<os\_command\>cat|ls|dir|whoami|uname|net\\suser|powershell|wget|curl|ncat|nc|bash|sh)"  
| eval confidence \= if(isnotnull(os\_command), "High", "Medium")  
| table \_time, src, dest, url, os\_command, confidence, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: Web.url içinde |, ;, && gibi yaygın komut ayırıcılarını arayarak potansiyel girişimleri filtreler.  
2. | rex field=url...: URL içinde hem URL-encoded formdaki metakarakterleri (%3B, %7C vb.) hem de ardından gelen yaygın OS komutlarını (cat, ls vb.) yakalamaya çalışır. Yakalanan komut os\_command alanına atanır.  
3. | eval confidence...: Eğer rex ile açıkça bir komut yakalanmışsa, bu bulgunun güvenilirliğini "High" olarak belirler. Sadece metakarakter varsa "Medium" olarak bırakır. Bu, analistin incelemesini önceliklendirmesine yardımcı olur.  
4. | table...: Bulguları, güvenilirlik seviyesi ve tespit edilen komutla birlikte tablo halinde sunar.

### **1.4. Sunucu Tarafı Şablon Enjeksiyonu (Server-Side Template Injection \- SSTI)**

#### **A. Kavramsal Açıklama**

SSTI, bir saldırganın, sunucu tarafında kullanılan şablon motorunun (örneğin Jinja2, Twig, FreeMarker) sözdizimini enjekte ederek sunucuda kod çalıştırmasına olanak tanıyan bir zafiyettir.20 Web uygulamaları, dinamik içerik (örneğin, kişiselleştirilmiş bir selamlama mesajı) oluşturmak için şablonları kullanır. Eğer kullanıcı girdisi, veri olarak işlenmek yerine doğrudan şablonun kendisine birleştirilirse, saldırgan şablon motoruna ait komutları çalıştırabilir.21

#### **B. Tespit Mantığı ve Göstergeler**

Tespit, farklı şablon motorlarına ait yaygın sözdizimi desenlerinin Web.url gibi alanlarda aranmasına dayanır:

* **Yaygın Desenler:** {{...}}, {%...%}, ${...}, \<\#...\#\>.  
* **Matematiksel İşlemler:** Saldırganlar genellikle zafiyeti doğrulamak için {{7\*7}} gibi basit matematiksel ifadeler kullanır. Eğer yanıt 49 olarak dönerse, şablon motoru girdiyi yorumluyor demektir.21  
* **Nesne ve Metot Çağrıları:** \_\_class\_\_, \_\_mro\_\_, \_\_globals\_\_, os.popen, system gibi Python veya diğer dillerdeki nesne ve metotlara erişim denemeleri.22

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Bu sorgu, çeşitli şablon motorlarına ait enjeksiyon girişimlerini arar.

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url LIKE "%{{%" OR Web.url LIKE "%{%") by Web.url, Web.src, Web.dest  
| \`drop\_dm\_object\_name("Web")\`  
| search (url LIKE "%}}%" OR url LIKE "%}%")  
| rex field=url "(?i)(?P\<ssti\_payload\>{{.\*}}|{%.\*%}|\\$.\*\\{.\*\\})"  
| where isnotnull(ssti\_payload)  
| rex field=ssti\_payload "(?i)(?P\<sensitive\_keyword\>\_\_class\_\_|\_\_mro\_\_|\_\_globals\_\_|popen|system|request|config)"  
| eval confidence \= if(isnotnull(sensitive\_keyword), "High", "Low")  
| table \_time, src, dest, url, ssti\_payload, sensitive\_keyword, confidence, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: {{ veya {% gibi şablon başlangıç karakterlerini içeren olayları verimli bir şekilde filtreler.  
2. | search...: Filtrelenen olaylar içinde }} veya %} gibi kapanış karakterlerini arayarak yanlış pozitifleri azaltır.  
3. | rex field=url...: Potansiyel SSTI yükünü ssti\_payload olarak ayıklar.  
4. | rex field=ssti\_payload...: Ayıklanan yük içinde \_\_class\_\_ veya popen gibi tehlikeli anahtar kelimeleri arar ve bulursa sensitive\_keyword alanına atar.  
5. | eval confidence...: Tehlikeli bir anahtar kelime bulunmuşsa, bulgunun güvenilirliğini "High" olarak işaretler.

### **1.5. XML Harici Varlık Enjeksiyonu (XML External Entity \- XXE)**

#### **A. Kavramsal Açıklama**

XXE, bir uygulamanın XML girdisini ayrıştırırken, saldırgan tarafından tanımlanmış bir harici varlığı (external entity) işlemesiyle ortaya çıkan bir zafiyettir.23 Bu, saldırganın sunucu dosya sisteminden yerel dosyaları okumasına (örneğin,

/etc/passwd), iç ağdaki diğer sistemlere ağ istekleri yapmasına (SSRF'e yol açar) veya hizmet reddi (DoS) saldırıları gerçekleştirmesine (örneğin, "billion laughs" saldırısı) olanak tanır.24

#### **B. Tespit Mantığı ve Göstergeler**

XXE saldırıları genellikle HTTP POST isteklerinin gövdesinde gerçekleşir, bu nedenle bu verilerin loglanması tespiti kolaylaştırır. Ancak, GET istekleri aracılığıyla da denenebilir. Web.url ve form\_data alanlarında aranacak göstergeler:

* **DOCTYPE Deklarasyonu:** \<\!DOCTYPE...\> ifadesinin varlığı.  
* **ENTITY Tanımlaması:** \<\!ENTITY...\> anahtar kelimesi.  
* **SYSTEM Anahtar Kelimesi:** Harici bir kaynağa işaret etmek için kullanılan SYSTEM anahtar kelimesi.  
* **Protokol İşleyicileri:** file:///, http://, https://, ftp:// gibi protokollerin SYSTEM ile birlikte kullanılması.  
* **Parametre Varlıkları:** %xxe; gibi yüzde işareti ile başlayan varlık referansları (kör XXE için).26

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Bu sorgu, URL parametrelerinde XXE saldırılarına işaret eden anahtar kelimeleri arar.

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (lower(Web.url) LIKE "%\<\!doctype%" OR lower(Web.url) LIKE "%\<\!entity%" OR lower(Web.url) LIKE "%system \\"file:%") by Web.url, Web.src, Web.dest  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=url "(?i)(?P\<xxe\_pattern\>\<\!DOCTYPE.\*\>|\<LENTITY.\*\>|SYSTEM\\s\*\\".\*?\\")"  
| table \_time, src, dest, url, xxe\_pattern, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: URL içinde küçük/büyük harf duyarsız bir şekilde \<\!doctype, \<\!entity veya system "file: gibi XXE saldırılarının temel yapı taşlarını arar.  
2. | rex field=url...: Tespit edilen spesifik XXE desenini xxe\_pattern alanına ayıklayarak analizi kolaylaştırır.  
3. by Web.url, Web.src, Web.dest: Olayları gruplayarak hangi kaynakların bu tür saldırıları denediğini gösterir.

### **1.6. LDAP Enjeksiyonu**

#### **A. Kavramsal Açıklama**

LDAP (Lightweight Directory Access Protocol) enjeksiyonu, LDAP sorguları oluşturan uygulamalara yönelik bir saldırı türüdür. SQLi'ye benzer şekilde, saldırgan LDAP filtre sözdizimini manipüle etmek için özel karakterler (\*, (, ), &, |) enjekte eder. Başarılı bir saldırı, saldırganın normalde erişemeyeceği dizin bilgilerine (kullanıcı adları, parolalar, izinler) erişmesini veya dizin yapısını değiştirmesini sağlayabilir.

#### **B. Tespit Mantığı ve Göstergeler**

Tespit, Web.url veya form\_data alanlarında LDAP filtrelerine özgü metakarakterlerin ve yapının beklenmedik şekillerde kullanılmasına odaklanır:

* **LDAP Filtre Karakterleri:** \*, (, ), &, |, \=.  
* **Joker Karakterler:** \* karakterinin beklenmedik kullanımı (örneğin, user=\*).  
* **Filtre Mantığı:** (&(, (|, )() gibi filtre birleştirme yapılarının enjeksiyonu.  
* **URL Kodlanmış Karakterler:** %2A (\*), %28 ((), %29 ()), %26 (&), %7C (|).

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url LIKE "%\*)" OR Web.url LIKE "%)(%" OR Web.url LIKE "%|(\*" OR Web.url LIKE "%&(\*") by Web.url, Web.src, Web.dest  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=url "(?i)(?P\<ldap\_payload\>\\\*\\(|\\)\\(|\\)\\(\\\*)"  
| eval confidence \= if(match(url, "user=\\\*|uid=\\\*"), "High", "Medium")  
| table \_time, src, dest, url, ldap\_payload, confidence, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: URL'lerde \*), )(, |(\* gibi yaygın LDAP enjeksiyonu desenlerini arar. Bu desenler, bir filtrenin sonlandırılıp yeni bir filtrenin başlatılması girişimlerini temsil eder.  
2. | rex field=url...: Potansiyel olarak zararlı LDAP yükünü ldap\_payload alanına çıkarır.  
3. | eval confidence...: user=\* gibi çok belirgin bir desen bulunursa, bulgunun güvenilirliğini "High" olarak işaretler.

### **1.7. CRLF Enjeksiyonu**

#### **A. Kavramsal Açıklama**

CRLF Enjeksiyonu, saldırganın bir web uygulamasına Carriage Return (CR, \\r, %0d) ve Line Feed (LF, \\n, %0a) karakterlerini enjekte etmesiyle gerçekleşir.27 HTTP protokolünde, bu karakterler başlıkları (headers) birbirinden ayırmak ve başlık bölümünü gövde (body) bölümünden ayırmak için kullanılır.28 Saldırgan, bu karakterleri enjekte ederek HTTP yanıtını bölebilir (HTTP Response Splitting), sahte başlıklar ekleyebilir (örneğin, sahte bir

Set-Cookie başlığı ile oturum çalma), log dosyalarını zehirleyebilir veya XSS saldırıları gerçekleştirebilir.30

#### **B. Tespit Mantığı ve Göstergeler**

Tespit, Web.url alanında CRLF karakterlerinin URL-encoded formlarının aranmasına dayanır:

* %0d (CR \- Carriage Return)  
* %0a (LF \- Line Feed)  
* %0d%0a (CRLF dizisi)  
  Bu karakterlerin bir URL parametresinin içinde bulunması, neredeyse her zaman kötü niyetli bir girişimin göstergesidir.

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url LIKE "%\_d%" OR Web.url LIKE "%\_a%") by Web.url, Web.src, Web.dest  
| \`drop\_dm\_object\_name("Web")\`  
| search (url LIKE "%0d%" OR url LIKE "%0a%")  
| rex field=url "(?P\<crlf\_payload\>%0\[ad\].\*)"  
| eval injected\_headers \= rex(crlf\_payload, "Set-Cookie|Location|Content-Type")  
| eval confidence \= if(isnotnull(injected\_headers), "High", "Medium")  
| table \_time, src, dest, url, crlf\_payload, injected\_headers, confidence, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: \_d veya \_a içeren URL'leri ön filtrelemeden geçirerek arama alanını daraltır. Bu, %0d ve %0a için bir ön optimizasyondur.  
2. | search...: Daha sonra bu olaylar üzerinde %0d veya %0a dizelerini tam olarak arar.  
3. | rex field=url...: Enjeksiyonun başladığı noktadan itibaren olan kısmı crlf\_payload olarak ayıklar.  
4. | eval injected\_headers...: Yükün içinde Set-Cookie veya Location gibi kritik başlıkların enjekte edilip edilmediğini kontrol eder ve bulursa injected\_headers alanına atar.  
5. | eval confidence...: Kritik bir başlık enjeksiyonu tespit edilirse, bulgunun güvenilirliğini "High" olarak belirler.

## **2\. Bozuk Kimlik Doğrulama ve Oturum Yönetimi**

Kimlik doğrulama ve oturum yönetimi mekanizmaları, bir uygulamanın kullanıcı kimliğini doğruladığı ve kullanıcı oturumlarını takip ettiği temel güvenlik kontrolleridir. Bu mekanizmalardaki zafiyetler, saldırganların parolaları, anahtarları veya oturum belirteçlerini ele geçirmesine ve diğer kullanıcıların kimliğine bürünerek yetkisiz işlemler yapmasına olanak tanır.

### **2.1. Zayıf ve Tahmin Edilebilir Parolalar (Brute-Force Saldırıları)**

#### **A. Kavramsal Açıklama**

Brute-force saldırısı, bir saldırganın geçerli kimlik bilgilerini (genellikle kullanıcı adı ve parola) bulmak için olası tüm kombinasyonları sistematik olarak denediği bir yöntemdir.32 Bu saldırı türleri arasında basit denemeler, sözlük saldırıları (yaygın kelimeleri deneme), kimlik bilgisi doldurma (credential stuffing \- başka sızıntılardan elde edilen kimlik bilgilerini deneme) ve parola püskürtme (password spraying \- tek bir yaygın parolayı birçok kullanıcı üzerinde deneme) bulunur.32

#### **B. Tespit Mantığı ve Göstergeler**

Brute-force saldırıları, web loglarında belirgin davranışsal desenler bırakır:

* **Yüksek Sayıda Başarısız Giriş:** Tek bir kaynak IP adresinden (Web.src), kısa bir süre içinde çok sayıda başarısız kimlik doğrulama denemesi. Bu denemeler genellikle status=401 (Unauthorized) veya status=403 (Forbidden) ile sonuçlanır.  
* **Çoklu Kullanıcı Hedefleme:** Tek bir Web.src'den, birden fazla farklı kullanıcı hesabına (Web.user) yönelik başarısız giriş denemeleri.  
* **Parola Püskürtme (Password Spraying):** Birden fazla Web.src'den, çok sayıda farklı Web.user hesabına yönelik, genellikle her hesap için sadece birkaç deneme yapılması. Bu, hesap kilitleme mekanizmalarını atlatmak için kullanılır.

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Aşağıdaki sorgu, tek bir kaynaktan gelen yüksek sayıdaki başarısız giriş denemesini tespit eder.

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND Web.status=401 by \_time, Web.src, Web.user, Web.url span=5m  
| \`drop\_dm\_object\_name("Web")\`  
| stats count as failed\_logins, dc(user) as distinct\_users by src, url  
| where failed\_logins \> 20 AND distinct\_users \>= 1  
| eval attack\_type \= if(distinct\_users \> 5, "Credential Stuffing / Spraying", "Brute-force on single user(s)")  
| table src, url, failed\_logins, distinct\_users, attack\_type  
| sort \- failed\_logins

**Sorgu Açıklaması:**

1. | tstats... where Web.status=401... span=5m: 5 dakikalık zaman pencereleri içinde, kimlik doğrulama hatası (status=401) veren tüm olayları toplar.33  
2. by \_time, Web.src, Web.user, Web.url: Olayları zaman, kaynak IP, kullanıcı ve giriş URL'ine göre gruplar.  
3. | stats count as failed\_logins, dc(user) as distinct\_users by src, url: Her bir kaynak IP ve giriş URL'i için toplam başarısız giriş sayısını (failed\_logins) ve hedeflenen benzersiz kullanıcı sayısını (distinct\_users) hesaplar.  
4. | where failed\_logins \> 20...: Eşik değerleri belirler. 5 dakika içinde 20'den fazla başarısız giriş, bir anormalliği işaret eder. Bu eşik, ortama göre ayarlanmalıdır.  
5. | eval attack\_type...: Hedeflenen benzersiz kullanıcı sayısına göre saldırının türünü (tek bir kullanıcıya yönelik brute-force veya çoklu kullanıcıya yönelik credential stuffing/spraying) tahmin etmeye çalışır.

## **3\. Siteler Arası Komut Dosyası Çalıştırma (Cross-Site Scripting \- XSS)**

Siteler Arası Komut Dosyası Çalıştırma (XSS), bir saldırganın, savunmasız bir web uygulaması aracılığıyla diğer kullanıcıların tarayıcılarında zararlı istemci tarafı betikler (genellikle JavaScript) çalıştırmasına olanak tanıyan bir enjeksiyon zafiyetidir.13 XSS saldırıları, oturum çerezlerini çalmak, tuş vuruşlarını kaydetmek, sayfa içeriğini değiştirmek veya kullanıcı adına yetkisiz işlemler yapmak için kullanılabilir.

### **3.1. Yansıtılmış XSS (Reflected XSS)**

#### **A. Kavramsal Açıklama**

Yansıtılmış XSS'te, zararlı betik bir HTTP isteğinin (genellikle bir URL parametresi) parçası olarak sunucuya gönderilir ve sunucu, bu betiği yanıtın bir parçası olarak "yansıtarak" kullanıcının tarayıcısına geri gönderir. Betik, sunucuda kalıcı olarak saklanmaz. Saldırı genellikle, kurbanın zararlı bir bağlantıya tıklamasıyla (örneğin, bir oltalama e-postası aracılığıyla) tetiklenir.

#### **B. Tespit Mantığı ve Göstergeler**

Tespit, Web.url alanında yaygın JavaScript betik etiketlerinin ve olay işleyicilerinin varlığının aranmasına dayanır:

* **Betik Etiketleri:** \<script\>, \</script\>.  
* **Olay İşleyicileri:** onerror, onload, onmouseover.  
* **JavaScript Fonksiyonları:** alert(), confirm(), prompt(), document.cookie, eval().  
* **URL Kodlanmış Formlar:** \< (%3c), \> (%3e), " (%22), ' (%27).

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (lower(Web.url) LIKE "%\<script\>%" OR lower(Web.url) LIKE "%javascript:%" OR lower(Web.url) LIKE "%onerror=%" OR lower(Web.url) LIKE "%onload=%") by Web.url, Web.src, Web.dest  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=url "(?i)(?P\<xss\_payload\>\<script\>.\*\</script\>|javascript:.\*|onerror=.\*)"  
| eval confidence \= if(match(xss\_payload, "(alert|document\\.cookie|eval)"), "High", "Medium")  
| table \_time, src, dest, url, xss\_payload, confidence, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: URL içinde küçük/büyük harf duyarsız olarak en yaygın XSS vektörlerini (\<script\>, javascript:, onerror=, onload=) arar.  
2. | rex field=url...: Potansiyel XSS yükünü xss\_payload alanına ayıklar.  
3. | eval confidence...: Yükün içinde alert, document.cookie gibi tehlikeli JavaScript fonksiyonları varsa, bulgunun güvenilirliğini "High" olarak işaretler.

**Not:** Depolanmış (Stored) XSS'in tespiti daha zordur çünkü zararlı betik veritabanında saklanır ve normal bir sayfa isteğiyle sunulur. Tespiti genellikle, betiğin ilk yüklendiği POST isteğini (yukarıdaki sorguya benzer şekilde Web.form\_data üzerinde çalışarak) yakalamayı veya web uygulama güvenlik duvarı (WAF) loglarını analiz etmeyi gerektirir. DOM tabanlı XSS ise tamamen istemci tarafında gerçekleştiği için sunucu loglarında genellikle iz bırakmaz ve tespiti için istemci tarafı enstrümantasyon veya dinamik analiz araçları gerekir.

## **4\. Bozuk Erişim Kontrolü (Broken Access Control)**

Bozuk Erişim Kontrolü, kimliği doğrulanmış kullanıcıların, yetkileri dahilinde olmayan eylemleri gerçekleştirmesine veya verilere erişmesine izin veren bir zafiyet kategorisidir. Bu tür zafiyetler, saldırganların diğer kullanıcıların hesaplarına erişmesine, hassas dosyaları görüntülemesine, kullanıcıların verilerini değiştirmesine veya yönetici işlevlerini ele geçirmesine olanak tanır. Bu saldırıların tespiti, genellikle tek bir olaydan ziyade, bir dizi olayın oluşturduğu davranışsal anormalliklerin analizine dayanır.

### **4.1. Yol Geçişi (Path Traversal / Directory Traversal)**

#### **A. Kavramsal Açıklama**

Yol Geçişi, bir saldırganın, web sunucusunun kök dizininin (web root) dışındaki dosya ve dizinlere erişmek için ../ (Linux/UNIX) veya ..\\\\ (Windows) gibi karakter dizilerini manipüle ettiği bir saldırıdır.34 Amaç genellikle

/etc/passwd, /etc/shadow, C:\\Windows\\win.ini gibi hassas yapılandırma veya sistem dosyalarını okumaktır.35

#### **B. Tespit Mantığı ve Göstergeler**

Tespitin anahtarı, Web.url alanında yol geçişi dizilerinin varlığını aramaktır. Saldırganlar genellikle filtreleri atlatmak için çeşitli kodlama teknikleri kullandığından, şu varyasyonlar aranmalıdır:

* **Düz Metin:** ../ ve ..\\\\  
* **URL Kodlama:** %2e%2e%2f (../), %2e%2e\\\\ (..\\\\), %2e%2e%5c (..\\\\)  
* **Çift URL Kodlama:** %252e%252e%252f  
* **Karma Kodlama:** ..%2f

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url LIKE "%../%" OR Web.url LIKE "%..\\\\%" OR Web.url LIKE "%..%2f%" OR Web.url LIKE "%..%5c%" OR Web.url LIKE "%252e%252e%252f%") by Web.url, Web.src, Web.dest  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=url "(?i)(?P\<traversal\_string\>(\\.\\./|\\.\\.\\\\|%2e%2e%2f|%2e%2e%5c|%252e%252e%252f)+)"  
| table \_time, src, dest, url, traversal\_string, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: Web.url alanı içinde, düz metin ve en yaygın kodlanmış formlardaki yol geçişi dizelerini arar. Bu dizelerin bir URL'de bulunması, yüksek bir kesinlikle bir saldırı girişimini gösterir.  
2. | rex field=url...: Tespit edilen spesifik yol geçişi dizisini traversal\_string alanına ayıklayarak analizi kolaylaştırır ve saldırganın ne kadar derine inmeye çalıştığı hakkında fikir verir.

### **4.2. Güvensiz Doğrudan Nesne Referansları (Insecure Direct Object References \- IDOR)**

#### **A. Kavramsal Açıklama**

IDOR, bir uygulamanın, veritabanı anahtarı, dosya adı veya kullanıcı ID'si gibi bir iç nesne referansını doğrudan bir URL parametresinde veya form alanında kullanması ve bu nesneye erişim için sunucu tarafında yeterli yetkilendirme kontrolü yapmaması durumunda ortaya çıkar.35 Saldırgan, bu referansı (örneğin,

?invoice\_id=1001 parametresini ?invoice\_id=1002 olarak değiştirerek) manipüle edip başka kullanıcılara ait verilere yetkisiz bir şekilde erişebilir.35

#### **B. Tespit Mantığı ve Göstergeler**

IDOR saldırısı genellikle tek bir olayla değil, bir tarama (enumeration) faaliyetiyle kendini belli eder. Bu nedenle tespit, davranışsal anormalliklere odaklanır:

* **Başarısız Tarama (Yüksek Hata Oranı):** Tek bir kaynak IP'nin (Web.src), belirli bir URL yoluna (örneğin, /api/v1/account/) kısa bir süre içinde çok sayıda farklı ID ile istek yapması ve bu isteklerin çoğunun status=403 (Yasak) veya status=404 (Bulunamadı) ile sonuçlanması.37 Bu, saldırganın var olan ancak kendisine ait olmayan ID'leri denediğinin güçlü bir göstergesidir.  
* **Başarılı Tarama (Anormal Erişim Deseni):** Tek bir Web.src veya Web.user'ın, normal bir kullanıcının davranışının ötesinde, kısa sürede çok sayıda farklı nesneye (dc(id)) başarılı bir şekilde (status=200) erişmesi. Bu, erişim kontrolünün hiç olmadığını gösterir.

#### **C. Splunk ile Tespit (SPL Sorgusu \- Başarısız Tarama)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.status=403 OR Web.status=404) by \_time, Web.src, Web.url, Web.status span=10m  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=url "(?P\<base\_url\>.+?id=)\\d+"  
| where isnotnull(base\_url)  
| stats count as error\_count, dc(url) as distinct\_urls\_tried by src, base\_url  
| where error\_count \> 10 AND distinct\_urls\_tried \> 5  
| eval confidence \= case(error\_count \> 50, "High", error\_count \> 20, "Medium", true(), "Low")  
| table src, base\_url, error\_count, distinct\_urls\_tried, confidence  
| sort \- error\_count

**Sorgu Açıklaması:**

1. | tstats... span=10m: 10 dakikalık pencereler içinde 403 veya 404 hatası veren istekleri toplar.  
2. | rex field=url...: URL'den id= gibi bir parametrenin sayısal değerini atarak, sorgunun yapıldığı temel yolu (base\_url) çıkarır. Bu, /app?id=1, /app?id=2 gibi istekleri aynı base\_url altında gruplamayı sağlar.  
3. | stats... by src, base\_url: Her bir kaynak IP ve temel URL için toplam hata sayısını (error\_count) ve denenen benzersiz URL sayısını (distinct\_urls\_tried) hesaplar.  
4. | where error\_count \> 10 AND distinct\_urls\_tried \> 5: Belirli bir eşiğin üzerinde hata ve farklı ID denemesi yapan kaynakları filtreler. Bu eşikler, ortamın normal trafiğine göre ayarlanmalıdır.  
5. | eval confidence...: Hata sayısına göre bulgunun güvenilirliğini derecelendirerek analiste önceliklendirme imkanı sunar.

### **4.3. Eksik Fonksiyon Seviyesi Yetki Kontrolü**

#### **A. Kavramsal Açıklama**

Bu zafiyet, bir kullanıcının, normalde sadece yöneticiler gibi daha yüksek ayrıcalıklı rollere açık olması gereken işlevlere doğrudan erişebilmesi durumunda ortaya çıkar. Genellikle, bu işlevlere giden bağlantılar standart kullanıcı arayüzünde gizlenir, ancak URL'leri tahmin edilebilir (örneğin, /admin/settings, /api/users/delete?id=123). Saldırgan, bu URL'leri doğrudan tarayıcısına yazarak veya istekleri manipüle ederek bu işlevleri çağırabilir.

#### **B. Tespit Mantığı ve Göstergeler**

Tespit, normal kullanıcıların erişmemesi gereken URL'lere yapılan erişim denemelerine odaklanır:

* **Yönetici URL'lerine Erişim:** admin, manage, config, settings gibi anahtar kelimeler içeren URL'lere, yönetici olmayan kullanıcılar veya beklenmedik kaynak IP'ler tarafından erişilmesi.  
* **Yetki Hataları:** Bu tür URL'lere yapılan isteklerin status=403 (Yasak) ile sonuçlanması, bir denemenin varlığını gösterir. status=200 (Başarılı) ile sonuçlanması ise zafiyetin başarılı bir şekilde sömürüldüğünü gösterir.

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url="\*/admin/\*" OR Web.url="\*/manage/\*" OR Web.url="\*/config/\*" OR Web.url="\*/settings/\*") by Web.src, Web.user, Web.url, Web.status  
| \`drop\_dm\_object\_name("Web")\`  
| lookup admin\_users.csv user as user OUTPUT isAdmin  
| where isAdmin\!="true" OR isnull(isAdmin)  
| eval result \= if(status=200, "Successful Access", "Attempted Access")  
| table \_time, src, user, url, status, result, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: admin, manage gibi yönetici işlevlerini ima eden anahtar kelimeler içeren URL'lere yapılan tüm istekleri filtreler.  
2. | lookup admin\_users.csv...: admin\_users.csv adlı bir lookup dosyası (bu dosyanın önceden oluşturulmuş olması gerekir) kullanarak, isteği yapan kullanıcının (user) yönetici olup olmadığını kontrol eder.  
3. | where isAdmin\!="true" OR isnull(isAdmin): Yalnızca yönetici olmayan veya kimliği doğrulanamamış kullanıcılar tarafından yapılan istekleri bırakır.  
4. | eval result...: İsteğin durum koduna göre, erişimin başarılı mı yoksa sadece bir deneme mi olduğunu belirtir.

## **5\. İstemci Tarafı Saldırıları (Client-Side Attacks)**

Bu saldırı kategorisi, doğrudan sunucuyu değil, son kullanıcının tarayıcısını ve tarayıcıda çalışan ortamı (DOM, JavaScript motoru vb.) hedefler. Amaç genellikle, kullanıcının oturumunu ele geçirmek, onun adına işlemler yapmak veya onu kandırarak hassas bilgilerini ifşa etmesini sağlamaktır. Sunucu logları bu saldırıların bazılarını dolaylı olarak tespit etmede kullanılabilir.

### **5.1. Siteler Arası İstek Sahteciliği (Cross-Site Request Forgery \- CSRF)**

#### **A. Kavramsal Açıklama**

CSRF, bir saldırganın, kurbanın kimliği doğrulanmış bir web uygulamasındaki oturumunu kullanarak, kurbanın isteği ve bilgisi dışında işlemler (örneğin, parola değiştirme, para transferi, ürün satın alma) yaptırmasıdır. Saldırı, kurbanın zararlı bir web sitesini ziyaret etmesi veya bir e-postadaki bağlantıya tıklamasıyla tetiklenir. Bu site, kurbanın tarayıcısının, hedef uygulamaya otomatik olarak kimlik bilgileri (çerezler) ile birlikte sahte bir istek göndermesine neden olur.

#### **B. Tespit Mantığı ve Göstergeler**

CSRF'nin sunucu loglarından tespiti zordur çünkü sahte istek, kurbanın tarayıcısından geldiği için meşru bir istek gibi görünür. Ancak, bazı anormallikler şüphe uyandırabilir:

* **Beklenmedik http\_referrer:** Durum değiştiren bir POST isteğinin (örneğin, /account/update) http\_referrer başlığının, uygulamanın kendi alan adı dışında, şüpheli veya bilinmeyen bir alan adından gelmesi.  
* **http\_referrer Eksikliği:** Hassas bir işlem için yapılan POST isteğinde http\_referrer başlığının hiç olmaması. Bazı tarayıcılar veya saldırı araçları bu başlığı göndermeyebilir.  
* **GET ile Durum Değişikliği:** Normalde POST, PUT veya DELETE ile yapılması gereken durum değiştirici bir işlemin (örneğin, /user/delete?id=123) GET metoduyla yapılması. Bu, saldırganın kurbanı basit bir \<img\> etiketiyle bile kandırmasına olanak tanır.

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND Web.http\_method="POST" AND (Web.url="\*/transfer" OR Web.url="\*/update" OR Web.url="\*/delete" OR Web.url="\*/change\_password") by Web.src, Web.user, Web.url, Web.http\_referrer  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=http\_referrer "https?:\\/\\/(?P\<referrer\_domain\>\[^\\/\]+)"  
| where isnull(referrer\_domain) OR referrer\_domain\!="www.my-trusted-app.com"  
| table \_time, src, user, url, http\_referrer, referrer\_domain, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: POST metoduyla yapılan ve transfer, update, delete gibi durum değiştiren anahtar kelimeler içeren URL'lere odaklanır.  
2. | rex field=http\_referrer...: http\_referrer başlığından alan adını (referrer\_domain) ayıklar.  
3. | where isnull(referrer\_domain) OR referrer\_domain\!="www.my-trusted-app.com": Referrer'ı olmayan veya beklenen alan adından (www.my-trusted-app.com değeri kendi uygulamanızın alan adıyla değiştirilmelidir) gelmeyen istekleri filtreler. Bu, potansiyel bir CSRF saldırısını işaret eder.

## **6\. Sunucu ve Altyapı Zafiyetleri**

Bu kategori, uygulamanın kodundaki mantık hatalarından ziyade, üzerinde çalıştığı sunucu, ağ altyapısı, web sunucusu yazılımı ve diğer bileşenlerdeki yapılandırma ve tasarım hatalarını hedef alan saldırıları kapsar. Bu tür zafiyetler, genellikle altyapının güvenliğinin göz ardı edilmesi veya varsayılan, güvensiz ayarlarla bırakılması sonucu ortaya çıkar.

### **6.1. Güvenlik Konfigürasyon Hataları (Security Misconfiguration)**

#### **A. Kavramsal Açıklama**

Güvenlik Konfigürasyon Hataları, geniş bir yelpazeyi kapsar: varsayılan parolaların değiştirilmemesi, gereksiz portların açık bırakılması, bulut depolama izinlerinin yanlış yapılandırılması, hata ayıklama (debug) modunun üretim ortamında açık bırakılması ve sunucu veya uygulama sürüm bilgilerini içeren detaylı hata mesajlarının gösterilmesi gibi. Bu hatalar, saldırganlara sisteme sızmak veya daha fazla bilgi toplamak için kolay giriş noktaları sunar.

#### **B. Tespit Mantığı ve Göstergeler**

Web loglarından tespit, genellikle anormal yanıt kodları ve sızan bilgilere odaklanır:

* **Detaylı Hata Mesajları:** status=500 (Internal Server Error) yanıtlarının gövdelerinde (eğer loglanıyorsa) veya başlıklarında (örn. X-Powered-By) uygulama framework'ü (ASP.NET, PHP, Tomcat), veritabanı türü veya sürüm bilgileri gibi detayların sızdırılması.  
* **Dizin Listeleme:** Bir dizine yapılan istek sonucunda index.html veya index.php gibi bir varsayılan dosya yerine, dizin içeriğinin listelendiği bir yanıt alınması. Bu genellikle status=200 ile birlikte gelir ve logda belirli bir dosya adı yerine sadece dizin yolu görünür.  
* **Yönetim Arayüzlerine Erişim:** /phpmyadmin, /cpanel, /solr/admin gibi bilinen yönetim panellerine veya /server-status, /server-info gibi Apache durum sayfalarına yapılan istekler.

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url="\*/server-status\*" OR Web.url="\*/server-info\*" OR Web.url="\*/phpmyadmin/\*" OR Web.url="\*/.git/\*" OR Web.url="\*/.svn/\*") by Web.src, Web.url, Web.status  
| \`drop\_dm\_object\_name("Web")\`  
| eval is\_successful \= if(status \>= 200 AND status \< 300, "Yes", "No")  
| table \_time, src, url, status, is\_successful, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: server-status, phpmyadmin, .git gibi hassas ve genellikle dışarıya açık olmaması gereken dosya ve dizinlere yapılan istekleri arar.  
2. | eval is\_successful...: Yanıtın durum koduna (status) bakarak, erişim denemesinin başarılı olup olmadığını (2xx kodları başarılı demektir) belirler. Başarılı bir erişim, acil müdahale gerektiren bir konfigürasyon hatasını gösterir.

### **6.2. Sunucu Tarafı İstek Sahteciliği (Server-Side Request Forgery \- SSRF)**

#### **A. Kavramsal Açıklama**

SSRF, bir saldırganın, web sunucusunun kendisi adına başka bir sunucuya (genellikle iç ağdaki veya bulut ortamındaki bir hedefe) istek yapmasını sağlamasıdır.38 Bu saldırı, güven sınırlarının (trust boundaries) ihlaline dayanır. Sunucu, internetten aldığı bir parametreyi (örneğin bir resim URL'si) doğrulamadan işleyip, bu parametrede belirtilen hedefe bir ağ bağlantısı kurduğunda zafiyet ortaya çıkar. Saldırganlar bu yolla iç ağları tarayabilir, AWS veya Azure gibi bulut sağlayıcılarının metadata servislerine erişerek hassas kimlik bilgilerini çalabilir veya iç servislerdeki zafiyetleri sömürebilir.39

#### **B. Tespit Mantığı ve Göstergeler**

Tespit stratejisi, güven sınırını aşan beklenmedik ağ etkileşimlerinin kanıtlarını aramaktır. Web.url veya Web.form\_data gibi dışarıdan gelen veri alanlarında, iç ağa veya yerel makineye işaret eden adreslerin bulunması temel göstergedir:

* **Loopback Adresleri:** 127.0.0.1, localhost.  
* **Bulut Metadata Servisleri:** 169.254.169.254 (AWS, GCP, Azure), metadata.google.internal.  
* **Özel IP Aralıkları:** 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.  
* **Özel Protokol Şemaları:** file:///, gopher://, dict://.  
* **Alternatif IP Gösterimleri:** 2130706433 (127.0.0.1'in ondalık hali), 0x7f000001 (onaltılık hali).38

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url LIKE "%127.0.0.1%" OR lower(Web.url) LIKE "%localhost%" OR Web.url LIKE "%169.254.169.254%" OR lower(Web.url) LIKE "%file:///%" OR lower(Web.url) LIKE "%gopher://%" OR Web.url LIKE "%metadata.google.internal%") by Web.url, Web.src, Web.dest  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=url "(?i)(url|uri|path|dest|target)=(?P\<ssrf\_target\>.\*)"  
| table \_time, src, dest, url, ssrf\_target, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: Web.url alanı içinde, SSRF saldırılarında yaygın olarak kullanılan hedef adresleri (loopback, metadata servisleri) ve protokolleri (file://, gopher://) arar.  
2. | rex field=url...: url=, uri= gibi yaygın parametre adlarından sonra gelen ve asıl hedefi gösteren kısmı ssrf\_target olarak ayıklayarak analizi kolaylaştırır.  
3. Bu desenlerin bir URL parametresinde tespiti, yüksek doğrulukla bir SSRF girişimini gösterir ve genellikle yanlış pozitifi düşüktür.

### **6.3. Dosya Yükleme Zafiyetleri**

#### **A. Kavramsal Açıklama**

Bu zafiyet, bir uygulamanın kullanıcıların dosya yüklemesine izin verdiği ancak yüklenen dosyaların türünü, içeriğini veya boyutunu yeterince kontrol etmediği durumlarda ortaya çıkar. Saldırganlar, bu zafiyeti kullanarak sunucuya zararlı dosyalar, özellikle de bir "web shell" (örneğin, PHP, ASPX, JSP ile yazılmış ve sunucuda komut çalıştırmaya yarayan bir betik) yükleyebilir. Web shell yüklendikten sonra, saldırgan sunucu üzerinde tam kontrol sahibi olabilir.

#### **B. Tespit Mantığı ve Göstergeler**

Tespit, iki aşamalı bir sürece dayanır: yükleme anı ve web shell'e erişim anı.

* **Yükleme Anı:** Web.http\_method="POST" olan ve URL'si upload, import gibi kelimeler içeren isteklere bakılır. Yüklenen dosyanın adı (filename parametresi) .php, .aspx, .jsp, .sh gibi çalıştırılabilir bir uzantıya sahipse bu şüphelidir. Bu, genellikle Web.form\_data alanının loglanmasını gerektirir.  
* **Erişim Anı:** uploads/, images/ gibi genellikle statik dosyaların bulunduğu dizinler altındaki .php, .aspx gibi çalıştırılabilir dosyalara doğrudan GET veya POST isteği yapılması, yüklenmiş bir web shell'in kullanıldığını gösterir.

#### **C. Splunk ile Tespit (SPL Sorgusu \- Erişim Anı)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url LIKE "%.php" OR Web.url LIKE "%.aspx" OR Web.url LIKE "%.jsp" OR Web.url LIKE "%.pl" OR Web.url LIKE "%.cgi") by Web.src, Web.url  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=url "\\/(?P\<directory\>uploads|images|content|temp|tmp)\\/"  
| where isnotnull(directory)  
| table \_time, src, url, directory, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: .php, .aspx, .jsp gibi çalıştırılabilir uzantılara sahip dosyalara yapılan tüm istekleri filtreler.  
2. | rex field=url...: URL içinde uploads/, images/, temp/ gibi genellikle statik içerik barındırması beklenen dizinlerin varlığını arar ve bulursa directory alanına atar.  
3. | where isnotnull(directory): Yalnızca bu şüpheli dizinler altında bulunan çalıştırılabilir dosyalara yapılan istekleri bırakır. Bu durum, meşru bir uygulama davranışından ziyade, yüklenmiş bir web shell'e erişim girişimini kuvvetle düşündürür.

## **7\. Veri Güvenliği Zafiyetleri**

Bu kategori, hassas verilerin (parolalar, kredi kartı bilgileri, kişisel veriler) depolanması, iletilmesi veya işlenmesi sırasında yeterli korumanın sağlanmamasından kaynaklanan zafiyetleri içerir. Bu tür hatalar, veri sızıntılarına, kimlik hırsızlığına ve yasal yaptırımlara yol açabilir.

### **7.1. Bilgi İfşası (Information Disclosure)**

#### **A. Kavramsal Açıklama**

Bilgi İfşası, bir uygulamanın istemeden hassas bilgileri sızdırmasıdır. Bu, detaylı hata mesajları (stack trace'ler), kaynak kodundaki yorum satırları, sunucu sürüm bilgileri içeren HTTP başlıkları (Server, X-Powered-By), herkese açık .git veya .svn dizinleri veya yedekleme dosyaları (.bak, .old) aracılığıyla gerçekleşebilir.40 Bu bilgiler, saldırganlar için keşif aşamasında son derece değerlidir ve daha karmaşık saldırılar için zemin hazırlayabilir.

#### **B. Tespit Mantığı ve Göstergeler**

* **Hassas Dosyalara Erişim:** .git/config, .svn/entries, web.config.bak, database.yml gibi yapılandırma, sürüm kontrolü ve yedekleme dosyalarına yönelik istekler.  
* **Yüksek Sayıda Sunucu Hatası:** Tek bir Web.src'den gelen ve çok sayıda status=5xx ile sonuçlanan istekler, saldırganın hata mesajlarından bilgi sızdırmak için kasıtlı olarak uygulamayı çökertmeye çalıştığını gösterebilir.  
* **Hata Ayıklama Parametreleri:** URL'lerde debug=true, test=1 gibi hata ayıklama modunu etkinleştirebilecek parametrelerin kullanılması.

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url="\*/.git/\*" OR Web.url="\*/.svn/\*" OR Web.url="\*.bak" OR Web.url="\*.old" OR Web.url="\*\~" OR Web.url="\*/web.config" OR Web.url="\*/wp-config.php") by Web.src, Web.url, Web.status  
| \`drop\_dm\_object\_name("Web")\`  
| eval is\_successful\_leak \= if(status \>= 200 AND status \< 300, "High", "Low")  
| table \_time, src, url, status, is\_successful\_leak, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: .git, .svn gibi sürüm kontrol dizinlerine veya .bak, .old, \~ gibi yaygın yedekleme dosyası uzantılarına sahip URL'lere yapılan istekleri arar.  
2. | eval is\_successful\_leak...: İsteğin durum koduna bakarak, bu hassas dosyalara erişimin başarılı olup olmadığını belirler. status=200 ile sonuçlanan bir istek, aktif bir bilgi sızıntısı olduğunu ve acil müdahale gerektiğini gösterir.

## **8\. Tedarik Zinciri ve İş Mantığı Zafiyetleri**

Bu kategorideki zafiyetler, uygulamanın kendi kodundan ziyade, kullandığı harici bileşenlerden (tedarik zinciri) veya uygulamanın iş akışındaki mantıksal hatalardan kaynaklanır.

### **8.1. Zafiyetli ve Güncel Olmayan Bileşenlerin Kullanımı**

#### **A. Kavramsal Açıklama**

Modern uygulamalar, işlevselliklerini hızlandırmak için çok sayıda açık kaynaklı veya ticari kütüphane, framework ve bileşen kullanır. Bu bileşenlerden herhangi birinde bilinen bir zafiyet (CVE) varsa ve uygulama güncellenmemişse, tüm uygulama bu zafiyete karşı savunmasız hale gelir. Saldırganlar, bilinen zafiyetleri tarayan otomatize araçlar kullanarak bu tür sistemleri kolayca bulup sömürebilirler.

#### **B. Tespit Mantığı ve Göstergeler**

Tespit, genellikle bilinen zafiyetlere yönelik sömürü (exploit) girişimlerinin bıraktığı belirli izleri aramaya dayanır. Bu, genellikle belirli URL desenleri veya User-Agent dizeleri şeklinde olur.

* **Bilinen Exploit Desenleri:** Örneğin, Log4Shell (CVE-2021-44228) zafiyeti için ${jndi:ldap:...} dizisinin URL'lerde veya User-Agent'larda aranması. Struts2 zafiyetleri için URL'de .action veya .do uzantılarıyla birlikte belirli başlıkların (örneğin, Content-Type) manipüle edilmesi.  
* **Sürüm Bilgisi Sızıntısı:** Bir önceki bölümde bahsedilen bilgi ifşası ile, saldırganlar Server veya X-Powered-By gibi başlıklardan veya hata mesajlarından bileşenin sürümünü öğrenip, o sürüme özel bir saldırı deneyebilirler.

#### **C. Splunk ile Tespit (SPL Sorgusu \- Örnek: Log4Shell)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND (Web.url LIKE "%jndi:%" OR Web.http\_user\_agent LIKE "%jndi:%") by Web.src, Web.dest, Web.url, Web.http\_user\_agent  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=url|http\_user\_agent "(?i)(?P\<log4shell\_payload\>\\$\\{jndi:(ldap|rmi|dns):\\/.\*?\\})"  
| where isnotnull(log4shell\_payload)  
| table \_time, src, dest, url, http\_user\_agent, log4shell\_payload, count  
| sort \- count

**Sorgu Açıklaması:**

1. | tstats... where...: Web.url veya Web.http\_user\_agent alanlarında, Log4Shell zafiyetinin en belirgin göstergesi olan jndi: dizesini arar.  
2. | rex...: Saldırının tam yükünü (${jndi:...}) log4shell\_payload olarak ayıklar. Bu, saldırganın hangi sunucuya (örneğin, bir LDAP sunucusu) bağlanmaya çalıştığını gösterir ve olayın analizinde kritik öneme sahiptir.  
3. Bu sorgu, belirli bir CVE'ye yönelik bir örnektir. Etkili bir tespit programı, ortaya çıkan yeni ve yaygın zafiyetler için benzer sorguların sürekli olarak geliştirilmesini gerektirir.

## **9\. Yeni Nesil ve İnsan Odaklı Tehditler**

Bu kategori, modern teknolojilerin (API'ler, yapay zeka) getirdiği yeni saldırı yüzeylerini ve her zaman en zayıf halka olan insan faktörünü hedef alan geleneksel ama hala etkili yöntemleri içerir.

### **9.1. API Güvenlik Açıkları**

#### **A. Kavramsal Açıklama**

Modern web ve mobil uygulamalar, arka uç servisleriyle iletişim kurmak için büyük ölçüde RESTful veya GraphQL gibi API'lere dayanır. API güvenliği açıkları, genellikle yetkilendirme hataları (bozuk nesne seviyesi veya fonksiyon seviyesi yetkilendirme), aşırı veri pozlaması (gereğinden fazla veri döndürme), hız sınırlama (rate limiting) eksikliği ve enjeksiyon zafiyetlerini içerir.

#### **B. Tespit Mantığı ve Göstergeler**

API trafiği de Web veri modeli tarafından yakalanır ve birçok saldırı türü (SQLi, IDOR vb.) API uç noktaları için de geçerlidir. API'lere özgü bazı tespit mantıkları şunlardır:

* **Anormal Hacimde İstek:** Tek bir Web.src'den, belirli bir API uç noktasına (örneğin, /api/v2/users) kısa sürede çok sayıda istek yapılması, hız sınırlama eksikliğini ve veri toplama (scraping) veya brute-force girişimini gösterebilir.  
* **GraphQL Saldırıları:** Web.form\_data veya Web.url içinde query, introspection gibi GraphQL'e özgü anahtar kelimelerin beklenmedik kullanımı. Özellikle, IntrospectionQuery denemeleri, saldırganın API şemasını tamamen indirmeye çalıştığını gösterir.  
* **Sürüm Taraması:** /api/v1/, /api/v2/, /api/v3/ gibi farklı API sürümlerine yönelik sistematik istekler, saldırganın eski ve potansiyel olarak zafiyetli bir API sürümü aradığını gösterebilir.

#### **C. Splunk ile Tespit (SPL Sorgusu \- Hız Sınırlama Eksikliği)**

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND Web.url LIKE "/api/%" by \_time, Web.src, Web.url span=1m  
| \`drop\_dm\_object\_name("Web")\`  
| stats count as requests\_per\_minute by src, url  
| where requests\_per\_minute \> 100  
| table src, url, requests\_per\_minute  
| sort \- requests\_per\_minute

**Sorgu Açıklaması:**

1. | tstats... where Web.url LIKE "/api/%"... span=1m: /api/ ile başlayan tüm URL'lere yapılan istekleri, 1 dakikalık zaman pencereleri içinde toplar.  
2. | stats count as requests\_per\_minute by src, url: Her bir kaynak IP ve API uç noktası için dakika başına istek sayısını hesaplar.  
3. | where requests\_per\_minute \> 100: Dakikada 100'den fazla istek yapan kaynakları filtreler. Bu eşik, API'nin normal kullanım profiline göre dikkatlice ayarlanmalıdır. Bu tür bir anomali, kaba kuvvet saldırıları, veri kazıma veya hizmet reddi girişimlerinin bir işareti olabilir.

### **9.2. Oltalama (Phishing)**

#### **A. Kavramsal Açıklama**

Oltalama, saldırganların meşru bir kurum veya kişi gibi davranarak kullanıcıları kandırdığı ve kimlik bilgileri, kredi kartı numaraları gibi hassas verilerini ele geçirmeye çalıştığı bir sosyal mühendislik saldırısıdır. Genellikle sahte web sitelerine yönlendiren e-postalar veya mesajlar aracılığıyla gerçekleştirilir.

#### **B. Tespit Mantığı ve Göstergeler**

Web sunucusu logları, doğrudan oltalama e-postasını göremez, ancak oltalama saldırısının bir parçası olarak kullanılan sahte web sitelerine yapılan yönlendirmeleri veya bu sitelerden gelen istekleri tespit edebilir:

* **Şüpheli Yönlendirmeler:** Uygulamanızdan, bilinen oltalama alan adlarına veya yeni kaydedilmiş (düşük itibarlı) alan adlarına doğru yapılan yönlendirmeler (status=301 veya status=302 ile birlikte Location başlığı).  
* **http\_referrer Analizi:** Uygulamanıza, bilinen oltalama kampanyalarında kullanılan alan adlarından gelen trafik (http\_referrer başlığı). Bu, kullanıcıların oltalama sitesinden sizin sitenize yönlendirildiği anlamına gelebilir (örneğin, kimlik bilgileri çalındıktan sonra meşru siteye yönlendirme).

#### **C. Splunk ile Tespit (SPL Sorgusu)**

Bu sorgu, bilinen kötü amaçlı alan adlarını içeren bir lookup dosyası kullanarak şüpheli yönlendirmeleri tespit eder.

Splunk SPL

| tstats summariesonly=true count from datamodel=Web where (nodename=Web.Proxy OR nodename=Web.Traffic) AND isnotnull(Web.http\_referrer) by Web.src, Web.http\_referrer  
| \`drop\_dm\_object\_name("Web")\`  
| rex field=http\_referrer "https?:\\/\\/(?P\<referrer\_domain\>\[^\\/\]+)"  
| lookup malicious\_domains.csv domain as referrer\_domain OUTPUT is\_malicious  
| where is\_malicious="true"  
| table \_time, src, http\_referrer, count

**Sorgu Açıklaması:**

1. | tstats...: http\_referrer alanı boş olmayan tüm olayları toplar.  
2. | rex...: Referrer URL'sinden alan adını (referrer\_domain) ayıklar.  
3. | lookup malicious\_domains.csv...: malicious\_domains.csv adlı (önceden oluşturulmuş ve tehdit istihbaratı kaynaklarından beslenen) bir lookup dosyası kullanarak, referrer alan adının bilinen kötü amaçlı bir alan adı olup olmadığını kontrol eder.  
4. | where is\_malicious="true": Yalnızca bilinen kötü amaçlı bir siteden gelen trafiği filtreler. Bu, oltalama kampanyalarının bir parçası olarak sitenizin kullanıldığını veya kullanıcılarınızın bu sitelerden yönlendirildiğini gösterebilir.

## **Sonuç**

Bu rapor, modern web uygulamalarını hedef alan çok çeşitli siber saldırıların, Splunk platformu ve Ortak Bilgi Modeli (CIM) Web veri modeli kullanılarak nasıl tespit edilebileceğine dair kapsamlı bir çerçeve sunmuştur. Her bir saldırı türü için sunulan kavramsal açıklamalar, tespit mantıkları ve pratik SPL sorguları, güvenlik analistlerine teorik bilgiyi eyleme dönüştürülebilir tespit kurallarına çevirme konusunda somut bir yol haritası sağlamaktadır.

Analizden çıkarılan temel sonuç, Splunk CIM'in sadece teknik bir veri normalizasyon aracı olmanın ötesinde, stratejik bir güvenlik varlığı olduğudur. CIM, güvenlik operasyonlarını kaynak-bağımlı, reaktif ve kırılgan bir yapıdan; kaynak-bağımsız, proaktif ve ölçeklenebilir bir yapıya dönüştürür. Bu, analistlerin enerjisini tekrarlayan ve düşük değerli görevlerden, gelişen tehdit ortamına uyum sağlayan karmaşık davranışsal anomalileri ve yeni saldırı vektörlerini modellemeye odaklamasına olanak tanır.

Sunulan SPL sorguları, birer başlangıç noktası olarak görülmelidir. Her kuruluşun teknoloji yığını, iş akışları ve normal trafik profili farklıdır. Bu nedenle, bu sorguların en yüksek verimlilikle ve en düşük yanlış pozitif oranıyla çalışabilmesi için her bir ortamın özel koşullarına göre ayarlanması (tuning) ve eşik değerlerinin (thresholds) dikkatlice kalibre edilmesi esastır.

Son olarak, log analizi ve SIEM tabanlı tespit, çok katmanlı bir savunma stratejisinin yalnızca bir parçasıdır. Güvenli kodlama pratikleri, düzenli zafiyet taramaları, web uygulama güvenlik duvarları (WAF), kullanıcı eğitimi ve güçlü erişim kontrolü politikaları gibi önleyici tedbirlerle birleştirildiğinde, bu raporda açıklanan tespit yetenekleri en etkili hale gelecektir. Tehditlerin tespiti kritik öneme sahipken, nihai hedef, saldırı yüzeyini en başından itibaren küçülterek bu tespitlere olan ihtiyacı en aza indirmektir.

#### **Alıntılanan çalışmalar**

1. About access logs \- Splunk Documentation, erişim tarihi Ağustos 9, 2025, [https://docs.splunk.com/Documentation/Splunk/9.4.2/Troubleshooting/AboutAccessLogs](https://docs.splunk.com/Documentation/Splunk/9.4.2/Troubleshooting/AboutAccessLogs)  
2. Splunk Add-on for Microsoft IIS: IIS logs are a co, erişim tarihi Ağustos 9, 2025, [https://community.splunk.com/t5/All-Apps-and-Add-ons/Splunk-Add-on-for-Microsoft-IIS-IIS-logs-are-a-complete-mess-Is/m-p/302180](https://community.splunk.com/t5/All-Apps-and-Add-ons/Splunk-Add-on-for-Microsoft-IIS-IIS-logs-are-a-complete-mess-Is/m-p/302180)  
3. Overview of the Splunk Common Information Model, erişim tarihi Ağustos 9, 2025, [https://help.splunk.com/en/splunk-enterprise/common-information-model/6.0/introduction/overview-of-the-splunk-common-information-model](https://help.splunk.com/en/splunk-enterprise/common-information-model/6.0/introduction/overview-of-the-splunk-common-information-model)  
4. Writing better searches with the Common Information Model \- Splunk Lantern, erişim tarihi Ağustos 9, 2025, [https://lantern.splunk.com/Splunk\_Platform/Product\_Tips/Data\_Management/Writing\_better\_searches\_with\_the\_Common\_Information\_Model](https://lantern.splunk.com/Splunk_Platform/Product_Tips/Data_Management/Writing_better_searches_with_the_Common_Information_Model)  
5. Web | Splunk Docs, erişim tarihi Ağustos 9, 2025, [https://help.splunk.com/en/splunk-cloud-platform/common-information-model/6.0/data-models/web](https://help.splunk.com/en/splunk-cloud-platform/common-information-model/6.0/data-models/web)  
6. Apache \- Splunk Lantern, erişim tarihi Ağustos 9, 2025, [https://lantern.splunk.com/Data\_Descriptors/Apache](https://lantern.splunk.com/Data_Descriptors/Apache)  
7. Splunk Add-on for Apache Web Server \- Splunkbase, erişim tarihi Ağustos 9, 2025, [https://splunkbase.splunk.com/app/3186](https://splunkbase.splunk.com/app/3186)  
8. Splunk Add-on for Microsoft IIS \- Splunkbase, erişim tarihi Ağustos 9, 2025, [https://splunkbase.splunk.com/app/3185](https://splunkbase.splunk.com/app/3185)  
9. About the Splunk Add-on for Apache Web Server, erişim tarihi Ağustos 9, 2025, [https://docs.splunk.com/Documentation/AddOns/released/ApacheWebServer/About](https://docs.splunk.com/Documentation/AddOns/released/ApacheWebServer/About)  
10. Introduction \- Splunk Add-on for Microsoft IIS, erişim tarihi Ağustos 9, 2025, [https://splunk.github.io/splunk-add-on-for-microsoft-iis/](https://splunk.github.io/splunk-add-on-for-microsoft-iis/)  
11. datamodel | Splunk Docs, erişim tarihi Ağustos 9, 2025, [https://docs.splunk.com/Documentation/SplunkCloud/9.3.2411/SearchReference/Datamodel](https://docs.splunk.com/Documentation/SplunkCloud/9.3.2411/SearchReference/Datamodel)  
12. datamodel | Splunk Docs, erişim tarihi Ağustos 9, 2025, [https://docs.splunk.com/Documentation/Splunk/9.3.1/SearchReference/Datamodel](https://docs.splunk.com/Documentation/Splunk/9.3.1/SearchReference/Datamodel)  
13. Injection Flaws \- OWASP Foundation, erişim tarihi Ağustos 9, 2025, [https://owasp.org/www-community/Injection\_Flaws](https://owasp.org/www-community/Injection_Flaws)  
14. SQL Injection \- OWASP Foundation, erişim tarihi Ağustos 9, 2025, [https://owasp.org/www-community/attacks/SQL\_Injection](https://owasp.org/www-community/attacks/SQL_Injection)  
15. SQL Injection Cheat Sheet \- Invicti, erişim tarihi Ağustos 9, 2025, [https://www.invicti.com/blog/web-security/sql-injection-cheat-sheet/](https://www.invicti.com/blog/web-security/sql-injection-cheat-sheet/)  
16. Blind SQL Injection \- OWASP Foundation, erişim tarihi Ağustos 9, 2025, [https://owasp.org/www-community/attacks/Blind\_SQL\_Injection](https://owasp.org/www-community/attacks/Blind_SQL_Injection)  
17. Command Injection \- OWASP Foundation, erişim tarihi Ağustos 9, 2025, [https://owasp.org/www-community/attacks/Command\_Injection](https://owasp.org/www-community/attacks/Command_Injection)  
18. What Is Command Injection? | Examples, Methods & Prevention \- Imperva, erişim tarihi Ağustos 9, 2025, [https://www.imperva.com/learn/application-security/command-injection/](https://www.imperva.com/learn/application-security/command-injection/)  
19. OS Command Injection Defense \- OWASP Cheat Sheet Series, erişim tarihi Ağustos 9, 2025, [https://cheatsheetseries.owasp.org/cheatsheets/OS\_Command\_Injection\_Defense\_Cheat\_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html)  
20. Server-side template injection | Web Security Academy \- PortSwigger, erişim tarihi Ağustos 9, 2025, [https://portswigger.net/web-security/server-side-template-injection](https://portswigger.net/web-security/server-side-template-injection)  
21. Server-Side Template Injection | PortSwigger Research, erişim tarihi Ağustos 9, 2025, [https://portswigger.net/research/server-side-template-injection](https://portswigger.net/research/server-side-template-injection)  
22. Server Side Template Injection with Jinja2 for you now \- OnSecurity, erişim tarihi Ağustos 9, 2025, [https://www.onsecurity.io/blog/server-side-template-injection-with-jinja2/](https://www.onsecurity.io/blog/server-side-template-injection-with-jinja2/)  
23. What is XXE (XML external entity) injection? Tutorial & Examples | Web Security Academy, erişim tarihi Ağustos 9, 2025, [https://portswigger.net/web-security/xxe](https://portswigger.net/web-security/xxe)  
24. A4: XML External Entities (XXE) \- Top 10 OWASP \- Wallarm, erişim tarihi Ağustos 9, 2025, [https://www.wallarm.com/what/a4-xml-external-entities-xxe-2017-owasp](https://www.wallarm.com/what/a4-xml-external-entities-xxe-2017-owasp)  
25. XXE attack | Tutorials & Examples \- Snyk Learn, erişim tarihi Ağustos 9, 2025, [https://learn.snyk.io/lesson/xxe/](https://learn.snyk.io/lesson/xxe/)  
26. What is a blind XXE attack? Tutorial & Examples | Web Security Academy \- PortSwigger, erişim tarihi Ağustos 9, 2025, [https://portswigger.net/web-security/xxe/blind](https://portswigger.net/web-security/xxe/blind)  
27. CRLF Injection \- OWASP Foundation, erişim tarihi Ağustos 9, 2025, [https://owasp.org/www-community/vulnerabilities/CRLF\_Injection](https://owasp.org/www-community/vulnerabilities/CRLF_Injection)  
28. CRLF Injection \- Invicti, erişim tarihi Ağustos 9, 2025, [https://www.invicti.com/learn/crlf-injection/](https://www.invicti.com/learn/crlf-injection/)  
29. What Are CRLF Injection Attacks \- Acunetix, erişim tarihi Ağustos 9, 2025, [https://www.acunetix.com/websitesecurity/crlf-injection/](https://www.acunetix.com/websitesecurity/crlf-injection/)  
30. CRLF Injection: Types, Impacts & Prevention | Indusface Blog, erişim tarihi Ağustos 9, 2025, [https://www.indusface.com/learning/what-is-crlf-injection/?amp](https://www.indusface.com/learning/what-is-crlf-injection/?amp)  
31. What is CRLF Injection | Types & Prevention Techniques \- Imperva, erişim tarihi Ağustos 9, 2025, [https://www.imperva.com/learn/application-security/crlf-injection/](https://www.imperva.com/learn/application-security/crlf-injection/)  
32. Brute Force Attacks: Techniques, Types & Prevention \- Splunk, erişim tarihi Ağustos 9, 2025, [https://www.splunk.com/en\_us/blog/learn/brute-force-attacks.html](https://www.splunk.com/en_us/blog/learn/brute-force-attacks.html)  
33. Detect brute force attacks using Splunk \- Netwerk\_LABS, erişim tarihi Ağustos 9, 2025, [https://netwerklabs.com/detect-brute-force-attacks-using-splunk/](https://netwerklabs.com/detect-brute-force-attacks-using-splunk/)  
34. Insecure Direct Object Reference (IDOR) | Best Practices \- Imperva, erişim tarihi Ağustos 9, 2025, [https://www.imperva.com/learn/application-security/insecure-direct-object-reference-idor/](https://www.imperva.com/learn/application-security/insecure-direct-object-reference-idor/)  
35. Insecure Direct Object References (IDOR) \- Invicti, erişim tarihi Ağustos 9, 2025, [https://www.invicti.com/learn/insecure-direct-object-references-idor/](https://www.invicti.com/learn/insecure-direct-object-references-idor/)  
36. Hunting IDOR: A Deep Dive into Insecure Direct Object References | by Shah kaif | System Weakness, erişim tarihi Ağustos 9, 2025, [https://systemweakness.com/%EF%B8%8F-hunting-idor-a-deep-dive-into-insecure-direct-object-references-b550a9f77333](https://systemweakness.com/%EF%B8%8F-hunting-idor-a-deep-dive-into-insecure-direct-object-references-b550a9f77333)  
37. What Is IDOR? Finding and Preventing Insecure Direct Object References in AWS APIs, erişim tarihi Ağustos 9, 2025, [https://thehiddenport.dev/posts/aws-preventing-idor/](https://thehiddenport.dev/posts/aws-preventing-idor/)  
38. What is SSRF (Server-side request forgery)? Tutorial & Examples | Web Security Academy, erişim tarihi Ağustos 9, 2025, [https://portswigger.net/web-security/ssrf](https://portswigger.net/web-security/ssrf)  
39. What is SSRF (server-side request forgery)? | Tutorial & examples \- Snyk Learn, erişim tarihi Ağustos 9, 2025, [https://learn.snyk.io/lesson/ssrf-server-side-request-forgery/](https://learn.snyk.io/lesson/ssrf-server-side-request-forgery/)  
40. CIM fields per associated data model \- Splunk Docs, erişim tarihi Ağustos 9, 2025, [https://help.splunk.com/en/splunk-cloud-platform/common-information-model/6.0/data-models/cim-fields-per-associated-data-model](https://help.splunk.com/en/splunk-cloud-platform/common-information-model/6.0/data-models/cim-fields-per-associated-data-model)