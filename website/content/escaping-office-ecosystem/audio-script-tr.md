Son yıllarda masaüstü yazılımlardan bulut tabanlı SaaS modellerine hızlı bir geçiş yaşadık. Bugün iş süreçlerinin ve kurumsal hafızanın büyük kısmı Microsoft 365 veya Google Workspace gibi kapalı ekosistemlerde tutuluyor. Bu platformlar eşzamanlı çalışma kolaylığı getirse de, veri egemenliği ve güvenlik açısından ciddi riskleri de beraberinde getiriyor.

Hızlı Kıyaslama: Bağımlılık vs. Egemenlik

Bölüm: Bulut Bağımlılığı ve Veri Egemenliği

Google ve Microsoft gibi servis sağlayıcılar, kurumsal kullanıcılar için veri gizliliği taahhütleri sunsa da veri mülkiyeti ve veriyi dışa aktarma (exit strategy) süreçlerinde ciddi bariyerler oluşturuyor. Belgelerimiz üzerindeki kontrolümüz, hizmet sağlayıcının tek taraflı güncelleyebileceği sözleşmelere bağlı.

Örneğin, bir abonelik iptal edildiğinde verileriniz hemen yerel sunucularınıza aktarılmıyor. Askıya alma ve silinme süreçleri, verilerinizin rehin kalmasına neden olabiliyor. Abonelik iptal edildikten sonraki ilk 30 günlük askıya alma periyodunda hizmetlere erişim kaybedilirken, sonraki aşamada veriler kalıcı olarak silinme kuyruğuna alınıyor.

Ayrıca, bu bulut platformlarının arka planda sürekli teşhis ve telemetri verisi toplaması da ayrı bir güvenlik sorunu. Kullanıcıların belge düzenleme alışkanlıkları ve kurumsal iletişim ağları taranıyor. IDC'nin verilerine göre dijital organizasyonların %45'i veri egemenliğini en büyük endişe olarak görüyor.

Çözüm, kurumsal hafızayı bu kapalı sistemlerden kurtarıp Unix felsefesinin temeli olan düz metin (plain text) sadeliğine taşımak. Ticari ofis platformlarından kaçmak sadece bir maliyet tasarrufu değil; belgelerin, tabloların ve sunumların mühendislik prensipleriyle yeniden inşa edilmesidir.

Bölüm: Belge Mühendisliği: Word'ün Hataları ve LaTeX'in Gücü

Microsoft Word gibi "Gördüğünü Alırsın" (WYSIWYG) mantığıyla çalışan editörler, günlük yazışmalar için standart olsa da teknik dokümantasyonda süreci zorlaştırıyor. Yazarın doğrudan nihai görsel çıktı üzerinde çalışması, içerik ile görsel tasarımın birbirine kilitlenmesine yol açıyor. Yazarken sayfa sonları, bozulan numaralar ve metni dağıtan görseller gibi tipografik detaylarla boğuşmak zorunda kalıyoruz.

Bölüm Detayı: DOCX'in Teknik Borcu ve Versiyonlama Sorunu

DOCX dosyaları aslında sıkıştırılmış XML yığınlarından oluşan arşivlerdir. Bu kapalı yapı, yazılım geliştirme süreçlerinin kalbi olan Git ve benzeri versiyon kontrol sistemleriyle tamamen uyumsuzdur.

Git satır satır değişiklikleri (diff) analiz eder. Ancak Word belgesinde yapılan tek bir boşluk veya referans değişikliği bile arka plandaki XML yapısını tamamen değiştirir. Git bunu "eski dosyanın silinip tamamen yeni bir ikili dosyanın eklenmesi" olarak algılar. Bu da ekip halinde aynı dosya üzerinde çalışmayı neredeyse imkansız hale getirir.

Bölüm Detayı: LaTeX ile Mantıksal Yapı ve Tasarım Ayrımı

LaTeX ise "Ne Demek İstiyorsan Onu Alırsın" (WYSIWYM) yaklaşımıyla içeriği tasarımdan tamamen ayırır. Yazar sadece belgenin mantıksal yapısına (başlıklar, bölümler, referanslar) odaklanır; görsel tasarımı ise sistem yönetir. LaTeX, belgeleri .tex uzantılı düz metin dosyaları olarak kaydettiği için sistem stabilitesi sunar:

Git Entegrasyonu: Her kelime değişikliği şeffaf bir tarihçe ile izlenir.
Dallanma (Branching): Aynı ana metin üzerinde farklı şablonlar kolayca uygulanabilir.
latexdiff: Sürümler arası farkları gösteren PDF'ler saniyeler içinde üretilebilir; silinen metinler kırmızı/çizili, yeniler mavi olarak işaretlenir.

Bölüm: Veri Analitiğinde Şeffaflık: Excel Felaketleri vs. CSV + DuckDB Mimarisi

Microsoft Excel büyük veri analitiğinde formüllerle veriyi aynı hücrede birleştirerek ciddi hatalara zemin hazırlıyor. Bilimsel tekrarlanabilirliğin temel şartı denetlenebilir adımlardır.

Bölüm Detayı: Tarihteki Excel Hataları

İngiltere COVID-19 Vaka Kaybı: Ekim 2020'de 15 binden fazla pozitif vaka sisteme kaydedilemedi. Hatanın nedeni, laboratuvarlardan gelen CSV dosyalarının eski .xls formatındaki şablonlara aktarılmasıydı. Excel, 65.536 satır sınırını aşan verileri sessizce kırptı.
Reinhart-Rogoff Ekonomi Politikası Hatası: Küresel kemer sıkma politikalarına yön veren bir makalede, Excel formülünün 20 satır yerine 15 satırı kapsaması nedeniyle büyüme oranı yanlış hesaplandı. Hücre içindeki formüller gizli olduğu için bu hata yıllarca fark edilmedi.
Genetik Terimlerin Bozulması: Excel'in otomatik düzeltme özelliği, gen isimlerini (MARCH1 gibi) tarihe ("1 Mart") dönüştürdü. Sırf Excel'in bu davranışı yüzünden 2020'de 27 insan geninin adı değiştirilmek zorunda kalındı.

Bölüm Detayı: DuckDB: Mantık ve Veri Ayrımı

Veri mühendisliğinde çözüm, veri (storage) ile mantığın (compute) ayrılmasıdır. Veri CSV/Parquet gibi şeffaf formatlarda saklanmalı; analiz ise SQL ile yapılmalıdır.

DuckDB, vektörel SQL motoruyla bu süreci optimize eder:
Sütun Tabanlı Saklama (Columnar): Sadece sorgulanan kolonları okuyarak disk/bellek performansını artırır.
Vektörel Sorgu: CPU'nun SIMD komutlarını kullanarak verileri yığınlar halinde işler.
Git Uyumluluğu: SQL sorguları düz metin olarak Git ile versiyonlanır.

Ham Veri
.csv / .parquet
DuckDB Motoru
SQL Sorguları
Şeffaf Sonuç
Tekrarlanabilir

Performans Kıyaslaması

Bölüm: Sunum Mimarisinde Kod Dönemi: Slidev ve Web Stack

PowerPoint sunumları veriyi statikleştirir. Excel'den kopyalanan bir grafik sunuma eklendiği an statikleşir; veri değiştiğinde slaytları tek tek güncellemek gerekir.

Modern mühendislik kültürü, Sunum Kod Olarak (Presentation-as-Code) yaklaşımını gerektiriyor. Slaytlar artık Markdown ve Web teknolojileriyle (HTML/CSS/JS) yazılmalıdır.

Bölüm Detayı: Slidev Entegrasyonu

Vue.js tabanlı Slidev, web tabanlı sunumların en gelişmiş örneğidir:

Dinamik Veriler: Grafiklerin verileri bir API'den anlık çekilebilir ve animasyonlarla sunulabilir.
Canlı Kod Çalıştırma: Monaco Editor entegrasyonu sayesinde slayt üzerinde canlı kod yazıp çalıştırabilirsiniz.
Git ve İşbirliği: Sunum içeriği tek bir slides.md dosyasındadır. Değişiklikler e-posta yerine Pull Request (PR) ile yapılır.

Slidev
Web Mimarisinin Zirvesi
Vue bileşenleri ve Monaco Editor ile güçlendirilmiş mimari. Canlı kod çalıştırabilir ve etkileşimli grafikler sunabilirsiniz.

Marp
Minimalist ve Hızlı
Tasarım karmaşasıyla ilgilenmeden sadece Markdown yazarak PDF veya HTML sunumlar üretmek için en hızlı çözüm.

Reveal.js
Esneklik ve Güç
Doğrudan HTML/JS ile 3D geçişler ve yatay/dikey slayt hiyerarşileri. Görselleştirmeleri anlık tetikleyebilirsiniz.

Impress.js
3D Görsel Şov
CSS3 transformasyonları ile dönen ve derinlik algısı yaratan sunumlar hazırlamak için ideal.

Bölüm: Açık Kaynaklı Alternatifler: LibreOffice ve ONLYOFFICE

Kod tabanlı araçlar herkes için uygun olmayabilir. Ancak ofis araçları ihtiyacı, verilerimizi dışarı aktaran platformlara bağımlı olmamızı gerektirmez.

LibreOffice: ISO standardı ODF (Open Document Format) kullanan, arka planda veri göndermeyen güvenli bir alternatiftir.
ONLYOFFICE: Microsoft OOXML formatıyla doğrudan uyumludur. Şirket içi sunucularınızda (Self-hosted) barındırılarak bulut benzeri bir işbirliği ortamı sunar.

ONLYOFFICE
Modern Entegrasyon
OOXML (DOCX) çekirdek mimarisi ve şirket içi işbirliği. Microsoft formatlarıyla yüksek görsel uyumluluk.

LibreOffice
Gizlilik Kalesi
ODF standartlarına bağlı, telemetrisiz ve tamamen çevrimdışı. Veri mahremiyetinin güçlü savunucusu.

Paket Kıyaslaması

Bölüm Detayı: Kapalı Ekosistemlerin Riskleri

Veri mülkiyetini kullanıcıya bırakmayan ve SaaS bağımlılığı yaratan platformlar, kurumlar için operasyonel birer kilit oluşturur. Google Docs, Microsoft 365 veya Zoho gibi tescilli bulut servisleri arasında geçiş yapmak veri egemenliği sağlamaz; sadece verinizi hangi sunucuda saklayacağınızı seçmenize yarar.

Microsoft 365
Ekosistem Kilidi
Bulut bağımlılığının ve 'vendor lock-in' kavramının endüstri standardı. Veri egemenliğinin önündeki en şık ama en katı bariyer.

Google Docs
SaaS Prangası
M365'ten kaçıp Google'a sığınmak veri egemenliği sağlamaz. Sadece verinizi hangi tekelin işleyeceğini seçersiniz.

Zoho Office
Kapsamlı Ama Kapalı
Bulut bağımlılığı ve tescilli doğası ile egemenlik kalesinin dışındadır. Veri yine sağlayıcının sunucusundadır.

Apple iWork
Donanım Kilidi
Sizi Apple donanımlarına ve kapalı iCloud ekosistemine kilitler. Formatları tescillidir ve Git uyumsuzdur.

WPS Office
Bütçe Dostu Klon
Microsoft formatlarıyla uyumlu çalışan Ribbon arayüzü. Ücretsiz sürümü reklam ve takip kodları barındırabilir.

FreeOffice
Hafif ve Hızlı
Düşük donanımlı bilgisayarlarda hızlı bir alternatif sunar. Kapalı kaynaklıdır ancak bireysel kullanım için uygundur.

Bölüm: Bütünleşik Çözüm: Nextcloud Hub

Nextcloud Hub, bulut servislerinin sunduğu dosya paylaşımı, ortak belge düzenleme ve iletişim araçlarını tek bir on-prem sunucuda toplar:

Nextcloud Files: Google Drive alternatifi dosya depolama.
Nextcloud Office: Tarayıcı üzerinden eşzamanlı belge düzenleme.
Nextcloud Talk: Uçtan uca şifreli toplantı ve sohbet.
Yerel Yapay Zeka: Verileri dışarı göndermeden çalışan yerel yapay zeka asistanı.

Nextcloud Files
Drive Alternatifi
Google Drive veya OneDrive'ın güvenli, self-hosted alternatifi. Veriler doğrudan sizin sunucunuzda saklanır.

Nextcloud Office
Canlı İşbirliği
ONLYOFFICE veya Collabora entegrasyonu ile tarayıcı üzerinden eşzamanlı belge düzenleme imkanı.

Nextcloud Talk
Güvenli Teams
Meet veya Teams yerine uçtan uca şifreli konferans ve sohbet. Veri sızıntısı riski sıfır.

Yerel Yapay Zeka
Mahrem Asistan
Verileri dışarı sızdırmadan yerel çalışan Nextcloud Assistant ile doküman analizi ve metin üretimi.

Bölüm: Dijital Özgürlük İçin Tamamlayıcı Araçlar

Mühendislik ve akademik çalışmaları destekleyen diğer açık kaynaklı araçlar:

Quarto: Markdown ve LaTeX arasında modern bir köprü. Teknik raporları farklı formatlarda üretmenizi sağlar.
Zotero: Akademik referansları ve bibliyografyayı kendi sunucunuzda saklayan açık kaynaklı çözüm.
Mermaid.js: Akış şemalarını kodla çizmenizi sağlar.
Vaultwarden: Şifrelerinizi kendi sunucunuzda saklayan Bitwarden uyumlu şifre yöneticisi.

Quarto
Bilimsel Yayıncılık
LaTeX ve Markdown arasındaki en modern köprü. Teknik raporları tek kaynaktan (Web/PDF/MS Word) üretmek için yeni dünya standardı.

Zotero
Bibliyografya Kalesi
Akademik çalışmaları Mendeley (SaaS) yerine kendi kontrolünüzde (WebDAV) tutmanızı sağlayan açık kaynaklı çözüm.

Mermaid.js
Diagram-as-Code
Akış diyagramlarını kodla yazıp dokümana gömmek için elzem. Visio gibi hantal araçlara elveda.

Vaultwarden
Egemen Şifreler
Şifrelerinizi Google/Apple'a emanet etmek yerine kendi sunucunuzda host ettiğiniz bitwarden uyumlu kasa.

Bölüm: Veri Egemenliğini Geri Kazanmak

Bulut tabanlı ofis platformlarının getirdiği kolaylıklar, verinin mülkiyetini kaybetme riskini de beraberinde getirir. Belgeleri LaTeX ile yazmak, verileri DuckDB ile işlemek ve sunumları Slidev ile kodlamak sadece bir araç tercihi değil; verinizin kontrolünü elinizde tutma duruşudur. Kendi verinizin mimarı olun ve dijital bağımsızlığınızı koruyun.

Bölüm Detayı: İleri Okuma ve Teknik Dokümantasyonlar

1. LaTeX (Belge Mühendisliği ve Dizgi)
LaTeX Resmi Dokümantasyonu:.
Hızlı Başlangıç Kılavuzu (PDF):.

2. DuckDB (Veri Analitiği ve İşleme)
CSV İçe Aktarma ve Yapılandırma Rehberi:.
Python API Dokümantasyonu:.
Çoklu Dosya Okuma ve Şema Birleştirme:.

3. HTML/CSS/JS Tabanlı Sunum Araçları
Slidev Resmi Dokümantasyonu:.
Slidev Sözdizimi Kılavuzu:.
Reveal.js ve D3.js Entegrasyonu (GitHub):.

4. Açık Kaynaklı Ofis ve İşbirliği Platformları
LibreOffice Kullanıcı Kılavuzları:.
Nextcloud Bilgi ve Kaynak Merkezi:.
Nextcloud Uyumluluk ve Veri Egemenliği Rehberleri:.
ONLYOFFICE Çözümleri:.

Verinizin mimarı olun, egemenliğinizi geri alın. Dinlediğiniz için teşekkürler!
