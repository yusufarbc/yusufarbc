Bölüm: Apache Web Sunucusunda Saldırı Tespiti



[Görsel: Apache HTTP Sunucusu]


Günümüzde web uygulamaları ve siteler, farklı türlerde siber saldırılara maruz kalmaktadır. Bu saldırıların erken tespiti, güvenlik önlemlerinin etkinliği ve sistemin sürekliliği açısından büyük önem taşır. Apache Web Sunucusu, dünya genelinde en yaygın kullanılan web sunucularından biridir ve bu nedenle saldırıların izlenmesi ve tespiti için doğru yöntemlerin uygulanması gerekmektedir.

---


Bölüm: Saldırı Tespit Mimarisi Akışı


Aşağıdaki diyagram, Apache Web Sunucusu üzerinden geçen bir HTTP isteğinin yaşam döngüsünü, WAF seviyesindeki gerçek zamanlı tespiti ve log seviyesindeki manuel/otomatik analiz süreçlerini göstermektedir:

[Mermaid Diyagramı: Burada bir mimari veya akış şeması bulunmaktadır. Şema detayları görsel olarak mevcuttur.]

---


Bölüm: Apache Erişim Logları Nedir?



[Görsel: Apache Erişim Logları]


Apache, sunucuya gelen her HTTP isteğini erişim loglarında kaydeder. Bu loglar, istek yapan IP adresi, istek zamanı, istenen dosya veya kaynak, kullanılan HTTP metodu, durum kodu gibi önemli bilgileri içerir. Erişim logları, sistemde gerçekleşen aktivitelerin izlenmesi ve analiz edilmesi için birincil veri kaynağıdır.

Apache erişim logları genellikle /var/log/apache2/access.log (veya benzeri) dosyasında bulunur.


Bölüm Detayı: Apache Combined Log Formatı Alanları


Çoğu canlı sistem, Combined Log Format (Birleşik Log Formatı) kullanır. Bu formatta kaydedilen alanlar ve açıklamaları aşağıda detaylandırılmıştır:

[Tablo Başlangıcı]
Log Yönergesi: %h. Alan Adı: Uzak Host. Açıklama: İstekte bulunan istemcinin IP adresi. Örnek Değer: 192.168.1.200.
Log Yönergesi: %l. Alan Adı: Uzak Log Adı. Açıklama: identd tarafından belirlenen istemci kimliği (genelde -).
Log Yönergesi: %u. Alan Adı: Uzak Kullanıcı. Açıklama: HTTP kimlik doğrulaması ile giriş yapan kullanıcı adı (genelde -). Örnek Değer: admin.
Log Yönergesi: %t. Alan Adı: Zaman. Açıklama: İsteğin sunucuya ulaştığı tarih ve saat damgası. Örnek Değer: [01/Jun/2025:12:00:10 +0300].
Log Yönergesi: \"%r\". Alan Adı: İstek Satırı. Açıklama: HTTP metodu, talep edilen URI ve HTTP sürümü. Örnek Değer: "GET /index.php HTTP/1.1".
Log Yönergesi: %>s. Alan Adı: Durum Kodu. Açıklama: İstemciye döndürülen nihai HTTP durum kodu. Örnek Değer: 200.
Log Yönergesi: %b. Alan Adı: Gönderilen Bayt. Açıklama: İstemciye gönderilen yanıt gövdesinin bayt cinsinden boyutu. Örnek Değer: 1024.
Log Yönergesi: \"%{Referer}i\". Alan Adı: Referer Başlığı. Açıklama: İstemciyi bu sayfaya yönlendiren kaynak sayfa adresi. Örnek Değer: "https://google.com".
Log Yönergesi: \"%{User-Agent}i\". Alan Adı: User-Agent. Açıklama: İstemcinin tarayıcı veya tarama botu imza bilgisi. Örnek Değer: "Mozilla/5.0".
[Tablo Bitişi]


---


Bölüm: Tespit İçin Kullanılabilecek Yöntemler


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Manuel Log Analizi



[Görsel: Manuel Log Analizi]


grep, awk gibi Linux komutları kullanılarak log dosyalarında şüpheli aktiviteler aranabilir. Örneğin, tüm erişim loglarında genel saldırı belirtilerini hızlıca taramak için şu komut kullanılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Otomatik İzleme ve Uyarı Sistemleri


ModSecurity: Apache üzerinde çalışan bir Web Application Firewall (WAF) olarak saldırıları daha uygulamaya ulaşmadan gerçek zamanlı tespit eder ve engeller.
Fail2Ban: Belirlenen kurallara ve eşik değerlere göre logları sürekli okur, şüpheli IP'leri güvenlik duvarı (iptables) üzerinden otomatik engeller.
Log Analiz Araçları: GoAccess, AWStats gibi araçlar logları görselleştirip analiz yapmayı kolaylaştırır.

---


Bölüm: Dizin Gezinme (Directory Traversal)



[Görsel: Dizin Gezinme Saldırı Örneği]


Dizin Gezinme saldırısı, bir saldırganın web sunucusunda yetkisiz olarak üst dizinlere veya hassas dosyalara erişmeye çalıştığı saldırı türüdür. Amaç, sunucudaki kritik dosyaları (örneğin /etc/passwd, yapılandırma dosyaları) elde etmektir.


Bölüm Detayı: Dizin Gezinme Saldırısının Göstergeleri (İndikatörleri)


Apache erişim loglarında dikkat edilmesi gereken göstergeler:

URL parametrelerinde veya istek yollarında ../ veya benzeri dizin atlama ifadeleri.
..%2F (URL encoded ../) gibi kodlanmış karakterler.
Hassas dosyalara erişim denemeleri: /etc/passwd, /boot.ini, /windows/win.ini gibi dosya isimleri.
Anormal uzun URL istekleri veya çok sayıda dizin atlama örüntüsü.
Sunucu hataları (403 Forbidden, 404 Not Found) artışı.


Bölüm Detayı: Apache Erişim Loglarında Dizin Gezinme Tespiti


Dizin Gezinme saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: File Upload (Dosya Yükleme)



[Görsel: Dosya Yükleme Güvenlik Açığı]


File Upload saldırısı, bir saldırganın web uygulamasının dosya yükleme özelliğini kötüye kullanarak zararlı dosyalar yüklemesiyle gerçekleşir. Bu dosyalar genellikle web sunucusunda çalıştırılabilir komutlar içeren scriptler (Webshell) olabilir.

Webshell, saldırganların bir web sunucusuna yükleyip çalıştırabildiği küçük kötü amaçlı komut dosyalarıdır. Genellikle PHP, ASP, JSP gibi sunucu tarafı dillerle yazılır. Webshell, saldırganlara sunucuda komut çalıştırma, dosya yükleme/indirme, veri çalma, arka kapı oluşturma gibi geniş yetkiler sağlar.


Bölüm Detayı: File Upload Saldırısı Göstergeleri (İndikatörleri)


Apache erişim loglarında dikkat edilmesi gereken işaretler:

/upload, /uploads, /file-upload, /image-upload gibi dosya yükleme endpointlerine yapılan istekler.
Yüklenen dosya adlarında şüpheli uzantılar: .php, .exe, .jsp, .asp, .phtml, .pl gibi.
Uzun veya karmaşık dosya isimleri (örneğin shell.php, cmd.jsp, image.jpg.php).
HTTP metodunun genellikle POST olması ve içerik tipinin multipart/form-data olması.
Aynı IP'den kısa sürede çok sayıda dosya yükleme denemesi.
Yükleme sonrası yapılan şüpheli GET istekleri ile dosyanın çalıştırılmaya çalışılması.


Bölüm Detayı: Apache Erişim Loglarında File Upload Tespiti


File Upload saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: RFI (Remote File Inclusion)



[Görsel: Uzaktan Dosya Dahil Etme RFI]


RFI, web uygulamalarında kötü niyetli bir saldırganın, uzak bir sunucudan zararlı dosyaları (genellikle PHP, JavaScript gibi) dahil ederek (include) çalıştırmasına olanak sağlayan bir saldırı türüdür.

Bu saldırı, özellikle PHP gibi include(), require() fonksiyonlarını kullanıcı girdisiyle doğrudan kullanan zayıf uygulamalarda görülür. Saldırgan, uzak bir dosyanın URL'sini parametre olarak verip sunucuya zararlı kodu çalıştırtırabilir.


Bölüm Detayı: RFI Saldırısının Göstergeleri (İndikatörleri)


Apache erişim loglarında aşağıdaki işaretlere dikkat etmek gerekir:

URL veya parametrelerde http://, https:// gibi uzak dosya adresleri.
Parametrelerde .php, .txt, .inc gibi dosya uzantıları.
include=, file=, page=, template= gibi parametre isimlerinde uzaktan dosya çağrısı.
Anormal uzun URL ve karmaşık parametre yapıları.
500 Internal Server Error gibi hata kodları.


Bölüm Detayı: Apache Erişim Loglarında RFI Tespiti


RFI saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: LFI (Local File Inclusion)



[Görsel: Yerel Dosya Dahil Etme LFI]


LFI, web uygulamasında kullanıcıdan alınan girdilerle sunucu üzerindeki yerel dosyaların (örneğin sistem dosyaları, yapılandırma dosyaları) izinsiz olarak dahil edilip çalıştırılmasına olanak veren bir saldırı türüdür.

Bu saldırı, özellikle include(), require() gibi fonksiyonlar kullanıcı girdisiyle doğrudan çağrıldığında ortaya çıkar. Amaç genellikle hassas dosyalara erişmek veya sunucu üzerinde komut çalıştırmaktır.


Bölüm Detayı: LFI Saldırısının Göstergeleri (İndikatörleri)


Apache erişim loglarında dikkat edilmesi gereken işaretler:

URL veya parametrelerde ../ gibi dizin atlama karakterleri (Directory Traversal ile benzerlik gösterir).
php://, data://, expect:// gibi PHP wrapper ifadeleri.
Sistem dosyaları: /etc/passwd, /proc/self/environ, /var/log/apache2/access.log gibi dosya isimleri.
Parametrelerde include=, page=, file= gibi dosya dahil etmeye yönelik anahtar kelimeler.
Anormal uzun ve karmaşık URL yapıları.
403 Forbidden veya 500 Internal Server Error gibi hata kodları.


Bölüm Detayı: Apache Erişim Loglarında LFI Tespiti


LFI saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: Brute Force (Kaba Kuvvet)



[Görsel: Kaba Kuvvet Saldırısı]


Brute Force saldırısı, bir saldırganın bir kullanıcı hesabına ya da sisteme erişim sağlamak için çok sayıda kullanıcı adı ve parola kombinasyonunu otomatik ve hızlı şekilde denemesiyle gerçekleşir. Amaç, doğru kimlik bilgilerini bularak yetkisiz erişim elde etmektir.

Bu saldırı genellikle login (giriş) sayfalarına yöneliktir ve otomatik araçlarla gerçekleşir.


Bölüm Detayı: Brute Force Saldırı Türleri


Kaba kuvvet (Brute Force) saldırıları tek bir yöntemden ibaret değildir; farklı stratejilerle uygulanabilen çeşitli türleri mevcuttur:

Pure Brute Force (Saf Kaba Kuvvet): Tüm olası karakter kombinasyonlarını sırayla dener.
Örnek: aaaa -> aaab -> aaac -> ...
Avantajı: Teorik olarak %100 başarı sağlar (yeterli süre verildiğinde).
Dezavantajı: Son derece yavaş ve yüksek işlem maliyetlidir.
Dictionary Attack (Sözlük Saldırısı): Önceden hazırlanmış parola listelerini (wordlist) kullanır.
Örnek: password, 123456, qwerty, admin123.
Avantajı: Çok hızlıdır.
Dezavantajı: Güçlü ve rastgele oluşturulmuş parolalarda tamamen başarısız olur.
Hybrid Attack (Hibrit Saldırı): Sözlük ve kaba kuvvet yöntemlerinin birleşimidir; sözlükteki kelimelere belirli kurallarla varyasyonlar ekler.
Örnek: password -> password123, admin -> Admin!2024.
Avantajı: Gerçek dünyada çok etkilidir çünkü kullanıcılar genellikle tahmin edilebilir kalıplar kullanır.
Credential Stuffing (Kimlik Bilgisi Doldurma): Daha önce sızdırılmış kullanıcı adı/şifre kombinasyonlarını hedeflenen sisteme karşı dener.
Örnek: Sızdırılmış veritabanlarındaki bilgileri farklı platformlarda test etmek (şifre tekrar kullanımına dayanır).
Avantajı: Kullanıcıların aynı parolayı tekrar kullanma alışkanlığı nedeniyle çok başarılı olabilir.
Dezavantajı: Çok Faktörlü Kimlik Doğrulama (MFA) varsa engellenir.
Password Spraying (Parola Püskürtme): Çok sayıda kullanıcı hesabına karşı az sayıda ve yaygın kullanılan parolayı dener.
Örnek: kullanıcı1, kullanıcı2 ve kullanıcı3 için Password123! parolasını denemek.
Avantajı: Hesap kilitleme (account lockout) politikalarına yakalanmadan sızma şansı verir.
Dezavantajı: Tüm kullanıcıların güçlü parola politikalarına uyması durumunda başarısız olur.
Reverse Brute Force (Ters Kaba Kuvvet): Tek bir parola seçilip çok sayıda kullanıcı adı üzerinde denenir. Password spraying'e benzer ancak odak noktası tek bir zayıf paroladır.
Rainbow Table Attack (Gökkuşağı Tablosu Saldırısı): Önceden hesaplanmış hash tabloları kullanılarak şifrelenmiş parolaları çözmeyi hedefler.
Avantajı: Hash çözme işlemlerinde çok hızlıdır.
Dezavantajı: Parola özetlerine "Salt" (tuzlama) eklenmişse tamamen etkisiz kalır.
Distributed Brute Force (Dağıtık Kaba Kuvvet): Birden fazla makine (örneğin botnet) üzerinden paralel olarak saldırı gerçekleştirilir.
Avantajı: Tespit edilmesi zordur ve yük dağıtımı sayesinde son derece hızlıdır.
Offline Brute Force (Çevrimdışı Kaba Kuvvet): Hedef sistemin parola hash veritabanı ele geçirildikten sonra, yerel makinede kırma işlemi gerçekleştirilir.
Avantajı: IDS/IPS gibi güvenlik sistemleri tarafından kesinlikle fark edilemez ve GPU gücüyle inanılmaz derecede hızlandırılabilir.


Bölüm Detayı: Brute Force Saldırı Türleri Özet Tablosu


[Tablo Başlangıcı]
Tür: Pure Brute Force. Temel Özellik: Tüm kombinasyonları dener.
Tür: Dictionary. Temel Özellik: Wordlist (sözlük) kullanır.
Tür: Hybrid. Temel Özellik: Wordlist + varyasyon ve kalıplar.
Tür: Credential Stuffing. Temel Özellik: Sızdırılmış hesap bilgilerini dener.
Tür: Password Spraying. Temel Özellik: Az sayıda popüler şifreyi çok sayıda hesaba dener.
Tür: Reverse Brute Force. Temel Özellik: Tek bir şifre hedefli tarama yapar.
Tür: Rainbow Table. Temel Özellik: Önceden hesaplanmış hash tablolarını kullanır.
Tür: Distributed. Temel Özellik: Botnet ile paralel saldırı yapar.
Tür: Offline. Temel Özellik: Ele geçirilen hash veritabanında çalışır.
[Tablo Bitişi]



Bölüm Detayı: Log Analizi ve IDS İlişkisi


Apache erişim loglarını veya kimlik doğrulama loglarını analiz ederken, bu brute force türleri farklı trafik izleri (signature) bırakır:
Password Spraying: Aynı IP adresinden, farklı kullanıcı adlarına yönelik ancak benzer parola deneme zamanlamaları.
Klasik Brute Force: Tek bir IP adresinden, tek bir kullanıcı hesabına yönelik çok kısa sürede aşırı sayıda başarısız login denemesi.
Credential Stuffing: Kısa bir zaman diliminde, çok sayıda farklı IP adresinden (botnet vb.) farklı kullanıcı hesaplarına yönelik login denemeleri.

---


Bölüm Detayı: Brute Force Saldırısının Göstergeleri (İndikatörleri)


Apache erişim loglarında aşağıdaki işaretler Brute Force saldırısına işaret edebilir:

Aynı IP adresinden kısa sürede çok sayıda POST (genellikle login) isteği.
Farklı kullanıcı adları veya parola denemeleri ile tekrarlayan login girişimleri.
Artan sayıda 401 Unauthorized veya 403 Forbidden HTTP yanıt kodları.
Belirli endpointlerde (örneğin /login, /wp-login.php, /admin/login.php) yoğun istek trafiği.
User-Agent veya IP adreslerinde tekrar eden kalıplar.


Bölüm Detayı: Apache Erişim Loglarında Brute Force Tespiti


Brute Force saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: Komut Enjeksiyonu (Command Injection)



[Görsel: Komut Enjeksiyonu]


Komut enjeksiyonu, bir saldırganın web uygulamasına zararlı işletim sistemi komutları enjekte ederek, sunucuda yetkisiz komutlar çalıştırmasına olanak veren bir güvenlik açığıdır.

Bu saldırı, özellikle kullanıcı girdilerinin doğrulanmadığı ve doğrudan işletim sistemi komutlarını çalıştıran fonksiyonlara (örneğin system(), exec(), shell_exec()) geçirildiği durumlarda ortaya çıkar.

Amaç, sunucuyu ele geçirmek, dosya içeriği okumak veya değiştirmek, ya da başka zararlı işlemler gerçekleştirmektir.


Bölüm Detayı: Komut Enjeksiyonu Göstergeleri (İndikatörleri)


Apache erişim loglarında dikkat edilmesi gereken işaretler:

URL veya parametrelerde ;, &&, |, `  `` (backtick) gibi komut ayırıcı karakterler.
curl, wget, nc, bash, sh, python gibi sistem komut isimleri.
Parametrelerde anormal uzun veya karmaşık yapılar.
Sunucu tarafında hata (500 Internal Server Error) kodları artışı.
Komut çıktısını gösteren veya etkileyen istekler.


Bölüm Detayı: Apache Erişim Loglarında Komut Enjeksiyonu Tespiti


Komut Enjeksiyonu saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: SQL Enjeksiyon (SQL Injection)



[Görsel: SQL Enjeksiyonu]


SQL Enjeksiyon, saldırganın web uygulamasına zararlı SQL komutları enjekte ederek, uygulamanın veritabanını manipüle ettiği bir saldırı türüdür. Amaç; veritabanından gizli bilgileri çalmak, verileri değiştirmek veya silmek olabilir.


Bölüm Detayı: SQL Enjeksiyonun Göstergeleri


Apache erişim loglarında veya web isteklerinde aşağıdaki işaretlere dikkat etmek gerekir:

URL veya parametrelerde SQL komutları: UNION SELECT, SELECT, INSERT, DROP TABLE, AND 1=1, ' OR '1'='1' gibi ifadeler.
Parametrelerde anormal karakter kullanımı: Tek tırnak ', çift tırnak ", noktalı virgül ;, yorum satırı işaretleri -- veya #.
Anormal uzun URL veya parametre değerleri: Karmaşık ve uzun sorgular.
Sunucu hata kodları: 500 Internal Server Error, 400 Bad Request gibi beklenmedik hatalar artışı.
Tekrarlayan aynı parametre veya sorgu kalıpları: Özellikle farklı varyasyonlarla denemeler yapılması.


Bölüm Detayı: Apache Erişim Loglarında SQL Enjeksiyon Tespiti


SQL Enjeksiyon saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: NoSQL Enjeksiyonu (NoSQL Injection)


NoSQL Enjeksiyonu, geleneksel SQL enjeksiyonuna benzer şekilde, NoSQL veri tabanlarına yönelik yapılan kötü amaçlı sorgu manipülasyonudur. MongoDB, CouchDB gibi NoSQL veri tabanlarında, uygulamanın kullanıcı girdilerini doğru şekilde filtrelememesi durumunda ortaya çıkar.

Amaç, sorgu yapısını değiştirerek yetkisiz veri erişimi sağlamak, veri sızdırmak veya veri tabanında değişiklik yapmaktır.


Bölüm Detayı: NoSQL Enjeksiyonu Göstergeleri (İndikatörleri)


Apache erişim loglarında aşağıdaki göstergeler tespit edilebilir:

Parametrelerde JSON yapısı veya operatörleri: { "$ne": null }, { "$gt": "" }, { "$regex": "" } gibi.
Sorgu parametrelerinde anormal veya beklenmedik JSON dizileri.
{"$where": "function() { ... }"} gibi kod enjekte etmeye yönelik yapılar.
URL veya parametrelerde tipik NoSQL operatör ifadeleri ($gt, $lt, $ne, $regex, $or).
Beklenmedik sayıda veya yapıda parametre kullanımı.


Bölüm Detayı: Apache Erişim Loglarında NoSQL Enjeksiyonu Tespiti


NoSQL Enjeksiyonu saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: XML Enjeksiyonu (XML Injection)


XML Enjeksiyonu, web uygulamalarının XML veri işleme aşamasında, kullanıcı girdilerinin yeterince doğrulanmaması sonucu kötü amaçlı XML içeriğinin uygulamaya gönderilmesiyle gerçekleşen bir saldırıdır. Bu saldırı, uygulamanın XML parser'ını kandırarak istenmeyen işlemler yapılmasına yol açabilir.

Örneğin, XML External Entity (XXE) saldırıları bu kategoriye girer; saldırgan zararlı XML dış kaynaklarını uygulamanın işlemesine sebep olabilir.


Bölüm Detayı: XML Enjeksiyonu Göstergeleri (İndikatörleri)


Apache erişim loglarında dikkat edilmesi gerekenler:

İstek parametrelerinde veya POST verilerinde <, >, &, <!ENTITY gibi XML özel karakterleri ve yapıları.
XML içeriğinde <!DOCTYPE, SYSTEM, ENTITY ifadeleri.
Normalden uzun veya karmaşık XML verisi gönderimleri.
XML External Entity referansları.
400 Bad Request veya 500 Internal Server Error gibi hata kodları artışı.


Bölüm Detayı: Apache Erişim Loglarında XML Enjeksiyonu Tespiti


XML Enjeksiyonu saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: LDAP Enjeksiyonu (LDAP Injection)


LDAP (Lightweight Directory Access Protocol) enjeksiyonu, bir saldırganın uygulamanın LDAP sorgularına kötü amaçlı girdiler enjekte ederek, yetkisiz erişim sağlaması veya LDAP veritabanı sorgularını manipüle etmesi saldırısıdır.

Özellikle kullanıcı doğrulama ve yetkilendirme işlemlerinde, LDAP sorgularının kullanıcı girdisiyle doğrudan oluşturulması durumunda ortaya çıkar.


Bölüm Detayı: LDAP Enjeksiyonu Göstergeleri (İndikatörleri)


Apache erişim loglarında dikkat edilmesi gereken işaretler:

URL veya parametrelerde *, |, &, (, ) gibi LDAP özel karakterleri.
Parametrelerde )(uid=), (|(uid=)), (objectClass=) gibi sorgu manipülasyonları.
Normal dışı karakterlerle dolu veya karmaşık filtre ifadeleri.
Hatalı veya başarısız giriş denemeleri artışı.
Aynı IP'den çok sayıda deneme.


Bölüm Detayı: Apache Erişim Loglarında LDAP Enjeksiyonu Tespiti


LDAP Enjeksiyonu saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: Template Enjeksiyonu (Template Injection)



[Görsel: Şablon Enjeksiyonu]


Template Enjeksiyonu, web uygulamalarında kullanıcıdan alınan verilerin, şablon motorlarında (template engine) yeterince filtrelenmeden işlenmesi sonucu ortaya çıkan bir güvenlik açığıdır.

Saldırgan, şablon içine kötü niyetli kod enjekte ederek sunucu tarafında kod çalıştırabilir, hassas verilere erişebilir ya da uygulamayı kontrol edebilir.

Örnek olarak, Jinja2 (Python), Twig (PHP), Freemarker (Java) gibi template motorlarında bu tür zafiyetler görülebilir.


Bölüm Detayı: Template Enjeksiyonu Göstergeleri (İndikatörleri)


Apache erişim loglarında dikkat edilmesi gereken işaretler:

URL veya parametrelerde {{ }}, {% %}, {# #} gibi şablon değişkenleri ve ifadeleri.
{{ config }}, {{ self }}, {{ ''.class.mro() }} gibi zararlı kod denemeleri.
Parametrelerde anormal ve şablon motoruna özgü sözdizimi.
Sunucu hata kodlarında artış (500 Internal Server Error gibi).
Tekrarlayan aynı tip kötü niyetli istekler.


Bölüm Detayı: Apache Erişim Loglarında Template Enjeksiyonu Tespiti


Template Enjeksiyonu saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: HTTP Başlık Enjeksiyonu (HTTP Header Injection)



[Görsel: HTTP Başlık Enjeksiyonu]


HTTP Header Injection, bir saldırganın web uygulamasına kötü niyetli veriler enjekte ederek HTTP başlıklarını manipüle etmesine olanak veren bir güvenlik açığıdır.

Bu saldırı, özellikle kullanıcı girdilerinin HTTP başlıklarında (örneğin Set-Cookie, Location gibi) doğru şekilde filtrelenmemesi durumunda ortaya çıkar.

Saldırgan bu açığı kullanarak HTTP yanıtlarını bölebilir (Response Splitting), Cross-Site Scripting (XSS) saldırısı yapabilir veya oturum çalma gibi zararlar verebilir.


Bölüm Detayı: HTTP Başlık Enjeksiyonu Göstergeleri (İndikatörleri)


Apache erişim kayıtlarında dikkat edilmesi gereken işaretler:

URL veya parametrelerde \r (satır başı), \n (satır sonu) karakterlerinin bulunması.
Başlıklarda satır sonu karakteri enjeksiyonu (örneğin %0d, %0a).
Parametrelerde Set-Cookie:, Location: gibi başlık isimlerinin anormal şekilde kullanılması.
Sunucudan beklenmeyen hata veya anormal yanıt kodlarının artması.
Aynı türden şüpheli isteklerin tekrarlanması.


Bölüm Detayı: Apache Erişim Kayıtlarında HTTP Başlık Enjeksiyonu Tespiti


HTTP Başlık Enjeksiyonu saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: İçerik Enjeksiyonu (Content Injection)


Content Injection, bir saldırganın web uygulamasına veya web sayfasına kötü niyetli içerik enjekte ederek, ziyaretçilere zararlı veya istenmeyen içerik göstermesini sağlayan bir güvenlik açığıdır.

Bu saldırı, genellikle kullanıcı girdilerinin doğru şekilde filtrelenmemesi sonucu ortaya çıkar ve HTML, JavaScript, metin ya da diğer içeriklerin içine kötü amaçlı kod eklenmesine yol açar.

İçerik enjeksiyonu, web sitesinin görünümünü veya işlevselliğini bozebilir, kullanıcıları phishing (oltalama) saldırılarına veya kötü amaçlı yazılım dağıtımına maruz bırakabilir.


Bölüm Detayı: Content Injection Göstergeleri (İndikatörleri)


Apache erişim loglarında dikkat edilmesi gereken işaretler:

URL parametrelerinde veya form verilerinde şüpheli HTML/JavaScript kod parçaları.
Parametrelerde &lt;script&gt;, &lt;iframe>, on-error=, javascript: gibi zararlı içerik ifadeleri.
Anormal uzunlukta veya karmaşık kod parçaları içeren istekler.
Sunucudan beklenmedik içerik tipleri veya hata kodları.
Tekrarlayan aynı tip zararlı içerik denemeleri.


Bölüm Detayı: Apache Erişim Loglarında Content Injection Tespiti


Content Injection saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: XSS (Cross-Site Scripting)



[Görsel: Siteler Arası Komut Dosyası Çalıştırma XSS]


XSS, bir web uygulamasına kötü amaçlı JavaScript veya HTML kodu enjekte edilerek, bu kodun diğer kullanıcıların tarayıcılarında çalıştırılmasıdır. Tüm XSS saldırıları içerik enjeksiyonudur (Content Injection), fakat tüm içerik enjeksiyonları XSS değildir. Amaç, kullanıcı oturumlarını çalmak, zararlı yazılımlar bulaştırmak veya kullanıcıları yanıltmaktır. XSS saldırıları üçe ayrılır:

Stored (Saklanan) XSS: Zararlı kod veritabanına veya kalıcı alanlara kaydedilir ve her kullanıcıya gösterilir.
Reflected (Yansıtılan) XSS: Zararlı kod, URL veya form aracılığıyla geçici olarak yansıtılır.
DOM-based XSS: Zararlı kod, kullanıcı tarafında (tarayıcıda) DOM manipülasyonu yoluyla çalıştırılır.


Bölüm Detayı: XSS Saldırısının Göstergeleri (İndikatörleri)


Apache erişim loglarında XSS işaretleri genellikle şunlar olur:

URL veya parametrelerde &lt;script&gt;, &lt;/script&gt;, alert-msg(, on-error=, javascript: gibi JavaScript veya HTML etiketleri.
Kodlanmış HTML karakterleri: %3C ( < ), %3E ( > ), %22 ( " ), %27 ( ' ).
Parametrelerde anormal uzunlukta ve karmaşık karakter dizileri.

Örnek parametreler:
q=&lt;script&gt;alert-msg('XSS')&lt;/script&gt;
search=%3Cimg%20src=x%20on-error=alert-msg(1)%3E


Bölüm Detayı: Apache Erişim Loglarında XSS Tespiti


XSS saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: SSRF (Server-Side Request Forgery)



[Görsel: Sunucu Tarafı İstek Sahteciliği SSRF]


SSRF, saldırganın, hedef sunucunun kendisi veya erişebildiği diğer iç sistemlere zararlı istekler göndermesini sağladığı bir güvenlik açığıdır.

Saldırgan, uygulamanın kullanıcıdan aldığı URL ya da IP adresi gibi girdileri manipüle ederek, sunucunun yetkisiz kaynaklara erişmesine neden olur. Bu sayede iç ağdaki sistemlere sızabilir, hassas verilere ulaşabilir veya sistemde başka saldırılar gerçekleştirebilir.


Bölüm Detayı: SSRF Göstergeleri (İndikatörleri)


Apache erişim loglarında gözlemlenebilecek işaretler:

URL parametrelerinde şüpheli IP adresleri veya localhost adresleri (127.0.0.1, localhost, 169.254.x.x, 10.x.x.x, 192.168.x.x).
Beklenmedik veya uygulama dışı URL'lere yapılan istekler.
Sunucunun kendi IP adresine ya da özel ağ adreslerine yönelik sık istekler.
Uzun URL parametreleri veya URL içi kodlama (encoding) kullanımı.
Aynı IP'den çok sayıda farklı hedefe yönelik istek denemeleri.


Bölüm Detayı: Apache Erişim Loglarında SSRF Tespiti


SSRF saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: CSRF (Cross-Site Request Forgery)



[Görsel: Siteler Arası İstek Sahteciliği CSRF]


CSRF, kullanıcıların yetkili olduğu bir web uygulamasına, kötü niyetli bir sitenin kullanıcı adına istek göndermesini sağlayan saldırı türüdür. Kullanıcı farkında olmadan, yetkilerini kötü amaçlarla kullanan istekler yapılır.

Örneğin, kullanıcı oturumu açıkken kötü amaçlı bir linke tıkladığında veya bir form gönderdiğinde, saldırganın istediği işlemler gerçekleşebilir.


Bölüm Detayı: CSRF Göstergeleri (İndikatörleri)


Apache erişim loglarında direkt tespiti zor olsa da dolaylı göstergeler şunlar olabilir:

Beklenmedik POST veya GET istekleri.
Aynı IP veya kullanıcı ajanından farklı oturumlar için anormal sayıda işlem.
Anormal ve tekrar eden belirli endpoint'lere yönelik istekler.
İsteklerde referer (yönlendiren site) başlığının olmaması veya şüpheli olması.
Oturum açmış kullanıcılar için beklenmeyen yetki gerektiren işlemler.


Bölüm Detayı: Apache Erişim Loglarında CSRF Tespiti


CSRF saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir. Apache loglarından doğrudan CSRF saldırısını kesin olarak tespit etmek zor olsa da, Referer kontrolü ve anormal istek davranışları tespiti için log analizi yapılabilir.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: IDOR (Insecure Direct Object Reference)



[Görsel: Güvensiz Doğrudan Nesne Referansı IDOR]


IDOR, bir kullanıcının yetkisi olmadan doğrudan başka bir kullanıcının verilerine veya nesnelerine erişim sağlayabildiği bir güvenlik açığıdır. Web uygulamaları, kaynaklara (dosyalar, kullanıcı verileri, kayıtlar vb.) erişirken, nesne referanslarını (örneğin dosya isimleri, kullanıcı ID'leri, sipariş numaraları) doğrudan ve doğrulanmadan URL parametrelerinde kullanırsa, saldırgan bu referansları değiştirerek başkalarının verilerine erişebilir.


Bölüm Detayı: IDOR Göstergeleri (İndikatörleri)


Apache erişim loglarında dikkat edilmesi gereken işaretler:

URL parametrelerinde değiştirilebilir ve doğrudan nesne referansı içeren ID veya dosya isimleri (user_id=123, file=report45.pdf).
Aynı IP'den veya kullanıcı ajanından farklı kullanıcıya ait ID'lere erişim denemeleri.
Anormal sıra dışı veya beklenmeyen nesne numaralarının URL parametrelerinde kullanılması.
Kısa süre içinde farklı nesnelere ardışık erişim denemeleri.
Oturum veya kimlik doğrulama kontrollerinin zayıf olduğu durumlarda, yetkisiz erişim istekleri.


Bölüm Detayı: Apache Erişim Loglarında IDOR Tespiti


IDOR saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: Open Redirect (Açık Yönlendirme)



[Görsel: Açık Yönlendirme]


Open Redirect, bir web uygulamasının kullanıcıları başka bir URL'ye yönlendirmek için kullandığı parametrelerin kötüye kullanılması sonucu ortaya çıkan güvenlik açığıdır. Saldırgan, kullanıcıları zararlı veya sahte sitelere yönlendirmek için bu açıkları kullanır.

Bu saldırı türü, phishing (oltalama) saldırılarının yaygın bir aracıdır; kullanıcılar güvenilir bir siteye tıkladıklarını düşünürken, aslında zararlı bir siteye yönlendirilirler.


Bölüm Detayı: Open Redirect Göstergeleri (İndikatörleri)


Apache erişim loglarında dikkat edilmesi gereken işaretler:

URL parametrelerinde redirect=, url=, next=, return=, dest=, continue= gibi yönlendirme amaçlı parametreler.
Bu parametrelerde tam veya kısmi başka domain adreslerinin (ör. http://malicious.com) yer alması.
Aynı IP'den farklı zararlı URL'lere yönlendirme denemeleri.
Kısa süre içinde aynı parametreye farklı dış URL'lerin girilmesi.
HTTP durum kodu 3xx (301, 302, 307) olan isteklerde şüpheli yönlendirmeler.


Bölüm Detayı: Apache Erişim Loglarında Open Redirect Tespiti


Open Redirect saldırısı içeren örnek apache logu verilmiştir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu log üzerinde aşağıdaki sorgu çalıştırılarak tespit yapılabilir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: ModSecurity: Gerçek Zamanlı Saldırı Engelleme (WAF)



[Görsel: ModSecurity WAF]


Erişim loglarının manuel analizi adli analiz ve tehdit avcılığı için harika bir yöntem olsa da, aktif saldırıların gerçek zamanlı engellenmesi için bir Web Uygulaması Güvenlik Duvarı (WAF) gereklidir. ModSecurity, Apache modülü olarak çalışır ve gelen HTTP isteklerini daha web uygulamasına ulaşmadan denetler.


Bölüm Detayı: Örnek: Dizin Gezinme (LFI) Engelleme Kuralı

Aşağıdaki ModSecurity kuralı, URI içinde /etc/passwd erişim denemelerini tespit ederek isteği bloklar ve istemciye 403 Forbidden yanıtı döner:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Örnek: SQL Enjeksiyon Engelleme Kuralı

Bu kural, parametrelerde veya yollarda geçen yaygın UNION SELECT örüntülerini yakalar:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm: Fail2Ban: Otomatik IP Engelleme



[Görsel: Fail2Ban]


Fail2Ban, log dosyalarını (örneğin /var/log/apache2/access.log) sürekli izleyerek belirli saldırı kalıplarını yakalar ve kuralı ihlal eden IP adreslerini güvenlik duvarı kuralları (iptables) üzerinden otomatik olarak engeller.


Bölüm Detayı: Adım 1: Filtre Tanımı Oluşturma

/etc/fail2ban/filter.d/apache-sqli.conf adresinde bir filtre tanımlayın:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Adım 2: Jail (Hapis) Yapılandırması

Bu filtreyi /etc/fail2ban/jail.local dosyasında etkinleştirin:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

Apache web sunucuları, dünya genelinde en çok kullanılan ve güvenilir sunucu yazılımlarından biri olmasına rağmen, çeşitli web saldırılarına karşı her zaman savunmasız kalabilir. Bu nedenle, olası saldırıların tespiti ve önlenmesi için erişim loglarının düzenli olarak analiz edilmesi kritik öneme sahiptir.

Erişim loglarında görülebilecek anormal istekler, şüpheli parametreler ve beklenmedik dosya erişimleri, web sunucusunun hedef alındığını gösteren önemli ipuçlarıdır. Bu nedenle, logların etkin şekilde izlenmesi, otomatik analiz araçları ve güvenlik duvarları ile desteklenmeli; kullanıcı girdileri mutlaka filtrelenmeli ve güvenlik güncellemeleri düzenli olarak uygulanmalıdır.

Sonuç olarak, Apache web sunucusunda saldırı tespiti, güçlü bir güvenlik duruşu oluşturmanın temel taşlarından biridir. Proaktif yaklaşımlar, hem veri kaybını önler hem de sistemin sürekliliğini sağlar. Güvenlik, sadece bir teknoloji değil, sürekli takip ve iyileştirme gerektiren bir süreçtir.

Verinizin mimarı olun, egemenliğinizi geri alın. Dinlediğiniz için teşekkürler!
