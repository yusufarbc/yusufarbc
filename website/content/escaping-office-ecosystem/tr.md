---
title: "Ofis Ekosisteminden Kaçış: Modern Mühendislik Araçları"
date: 2026-05-18
description: "Modern bilişim paradigmalarında veri egemenliğini geri kazanmak: LaTeX, DuckDB ve Slidev ile mühendislik odaklı bir gelecek."
tags: ["Sovereign Stack", "Open Source", "Engineering", "Privacy", "LaTeX", "DuckDB"]
category: Engineering
image: featured.webp
type: posts
audioFile: tr.mp3
---

<style>
.duckdb-flow {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.45);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 14px;
}
.flow-step {
  text-align: center;
  flex: 1;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.3);
}
.flow-arrow {
  font-size: 1.5rem;
  color: var(--app-accent-color);
  padding: 0 1rem;
}
</style>

Son yıllarda masaüstü yazılımlardan bulut tabanlı SaaS modellerine hızlı bir geçiş yaşadık. Bugün iş süreçlerinin ve kurumsal hafızanın büyük kısmı Microsoft 365 veya Google Workspace gibi kapalı ekosistemlerde tutuluyor. Bu platformlar eşzamanlı çalışma kolaylığı getirse de, veri egemenliği ve güvenlik açısından ciddi riskleri de beraberinde getiriyor.

<div class="glass-panel reveal-on-scroll">
<h4 style="text-align: center; margin-bottom: 1rem;">Hızlı Kıyaslama: Bağımlılık vs. Egemenlik</h4>
<div style="overflow-x: auto;">
<table style="width: 100%; font-size: 0.9rem;">
<thead>
<tr>
<th>Kriter</th>
<th>SaaS / Bulut Altyapısı</th>
<th>Mühendislik Stack'i (Veri Egemenliği)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Mimari</td>
<td>Kapalı XML yığınları, rehin tutulan veriler.</td>
<td>Düz metin (Plain-text) sadeliği, Git uyumlu.</td>
</tr>
<tr>
<td>Güvenlik</td>
<td>Telemetri ve dijital ayak izi taraması.</td>
<td>On-premise (Self-hosted) tam kontrol.</td>
</tr>
<tr>
<td>Veri Ömrü</td>
<td>Hizmet sonlandırıldığında silinme riski.</td>
<td>Yıllarca saklanabilecek kod ve metin blokları.</td>
</tr>
<tr>
<td>Maliyet</td>
<td>Sürekli artan abonelik ücretleri.</td>
<td>Kendi kendine yeten amorti edilmiş altyapı.</td>
</tr>
</tbody>
</table>
</div>
</div>

---

## Bulut Bağımlılığı ve Veri Egemenliği

Google ve Microsoft gibi servis sağlayıcılar, kurumsal kullanıcılar için veri gizliliği taahhütleri sunsa da veri mülkiyeti ve veriyi dışa aktarma (exit strategy) süreçlerinde ciddi bariyerler oluşturuyor. Belgelerimiz üzerindeki kontrolümüz, hizmet sağlayıcının tek taraflı güncelleyebileceği sözleşmelere bağlı. 

Örneğin, bir abonelik iptal edildiğinde verileriniz hemen yerel sunucularınıza aktarılmıyor. Askıya alma ve silinme süreçleri, verilerinizin rehin kalmasına neden olabiliyor. Abonelik iptal edildikten sonraki ilk 30 günlük askıya alma periyodunda hizmetlere erişim kaybedilirken, sonraki aşamada veriler kalıcı olarak silinme kuyruğuna alınıyor.

Ayrıca, bu bulut platformlarının arka planda sürekli teşhis ve telemetri verisi toplaması da ayrı bir güvenlik sorunu. Kullanıcıların belge düzenleme alışkanlıkları ve kurumsal iletişim ağları taranıyor. IDC'nin verilerine göre dijital organizasyonların %45'i veri egemenliğini en büyük endişe olarak görüyor.

![SaaS Ekosistem Bağımlılığı: Google ve Microsoft](gsuite-m365.webp)

Çözüm, kurumsal hafızayı bu kapalı sistemlerden kurtarıp Unix felsefesinin temeli olan **düz metin (plain text)** sadeliğine taşımak. Ticari ofis platformlarından kaçmak sadece bir maliyet tasarrufu değil; belgelerin, tabloların ve sunumların mühendislik prensipleriyle yeniden inşa edilmesidir.

---

## 1. Belge Mühendisliği: Word'ün Hataları ve LaTeX'in Gücü

Microsoft Word gibi "Gördüğünü Alırsın" (WYSIWYG) mantığıyla çalışan editörler, günlük yazışmalar için standart olsa da teknik dokümantasyonda süreci zorlaştırıyor. Yazarın doğrudan nihai görsel çıktı üzerinde çalışması, içerik ile görsel tasarımın birbirine kilitlenmesine yol açıyor. Yazarken sayfa sonları, bozulan numaralar ve metni dağıtan görseller gibi tipografik detaylarla boğuşmak zorunda kalıyoruz.

### DOCX'in Teknik Borcu ve Versiyonlama Sorunu
DOCX dosyaları aslında sıkıştırılmış XML yığınlarından oluşan arşivlerdir. Bu kapalı yapı, yazılım geliştirme süreçlerinin kalbi olan **Git** ve benzeri versiyon kontrol sistemleriyle tamamen uyumsuzdur. 

Git satır satır değişiklikleri (diff) analiz eder. Ancak Word belgesinde yapılan tek bir boşluk veya referans değişikliği bile arka plandaki XML yapısını tamamen değiştirir. Git bunu "eski dosyanın silinip tamamen yeni bir ikili dosyanın eklenmesi" olarak algılar. Bu da ekip halinde aynı dosya üzerinde çalışmayı neredeyse imkansız hale getirir.

### LaTeX ile Mantıksal Yapı ve Tasarım Ayrımı
LaTeX ise "Ne Demek İstiyorsan Onu Alırsın" (WYSIWYM) yaklaşımıyla içeriği tasarımdan tamamen ayırır. Yazar sadece belgenin mantıksal yapısına (başlıklar, bölümler, referanslar) odaklanır; görsel tasarımı ise sistem yönetir. LaTeX, belgeleri `.tex` uzantılı düz metin dosyaları olarak kaydettiği için sistem stabilitesi sunar:

* **Git Entegrasyonu:** Her kelime değişikliği şeffaf bir tarihçe ile izlenir.
* **Dallanma (Branching):** Aynı ana metin üzerinde farklı şablonlar kolayca uygulanabilir.
* **latexdiff:** Sürümler arası farkları gösteren PDF'ler saniyeler içinde üretilebilir; silinen metinler kırmızı/çizili, yeniler mavi olarak işaretlenir.

![LaTeX Belge Mühendisliği: İçerik ve Tasarım Ayrımı](LaTex.png)

---

## 2. Veri Analitiğinde Şeffaflık: Excel Felaketleri vs. CSV + DuckDB Mimarisi

Microsoft Excel büyük veri analitiğinde formüllerle veriyi aynı hücrede birleştirerek ciddi hatalara zemin hazırlıyor. Bilimsel tekrarlanabilirliğin temel şartı denetlenebilir adımlardır.

### Tarihteki Excel Hataları
1. **İngiltere COVID-19 Vaka Kaybı:** Ekim 2020'de 15 binden fazla pozitif vaka sisteme kaydedilemedi. Hatanın nedeni, laboratuvarlardan gelen CSV dosyalarının eski `.xls` formatındaki şablonlara aktarılmasıydı. Excel, 65.536 satır sınırını aşan verileri sessizce kırptı.
2. **Reinhart-Rogoff Ekonomi Politikası Hatası:** Küresel kemer sıkma politikalarına yön veren bir makalede, Excel formülünün 20 satır yerine 15 satırı kapsaması nedeniyle büyüme oranı yanlış hesaplandı. Hücre içindeki formüller gizli olduğu için bu hata yıllarca fark edilmedi.
3. **Genetik Terimlerin Bozulması:** Excel'in otomatik düzeltme özelliği, gen isimlerini (`MARCH1` gibi) tarihe ("1 Mart") dönüştürdü. Sırf Excel'in bu davranışı yüzünden 2020'de 27 insan geninin adı değiştirilmek zorunda kalındı.

### DuckDB: Mantık ve Veri Ayrımı
Veri mühendisliğinde çözüm, veri (storage) ile mantığın (compute) ayrılmasıdır. Veri CSV/Parquet gibi şeffaf formatlarda saklanmalı; analiz ise SQL ile yapılmalıdır.

DuckDB, vektörel SQL motoruyla bu süreci optimize eder:
* **Sütun Tabanlı Saklama (Columnar):** Sadece sorgulanan kolonları okuyarak disk/bellek performansını artırır.
* **Vektörel Sorgu:** CPU'nun SIMD komutlarını kullanarak verileri yığınlar halinde işler.
* **Git Uyumluluğu:** SQL sorguları düz metin olarak Git ile versiyonlanır.

<div class="duckdb-flow reveal-on-scroll">
  <div class="flow-step">
    <div style="font-size: 2rem;">💾</div>
    <strong>Ham Veri</strong>
    <p style="font-size: 0.7rem;">.csv / .parquet</p>
  </div>
  <div class="flow-arrow">➔</div>
  <div class="flow-step" style="border-color: var(--app-accent-color);">
    <div style="font-size: 2rem;">🦆</div>
    <strong>DuckDB Motoru</strong>
    <p style="font-size: 0.7rem;">SQL Sorguları</p>
  </div>
  <div class="flow-arrow">➔</div>
  <div class="flow-step">
    <div style="font-size: 2rem;">📊</div>
    <strong>Şeffaf Sonuç</strong>
    <p style="font-size: 0.7rem;">Tekrarlanabilir</p>
  </div>
</div>

<div class="glass-panel reveal-on-scroll">
<h4 style="text-align: center; margin-bottom: 1rem;">Performans Kıyaslaması</h4>
<div style="overflow-x: auto;">
<table style="width: 100%; font-size: 0.9rem;">
<thead>
<tr>
<th>Kriter</th>
<th>Microsoft Excel</th>
<th>DuckDB (SQL Motoru)</th>
</tr>
</thead>
<tbody>
<tr>
<td>İşlem Kapasitesi</td>
<td>1 Milyon Satır Sınırı</td>
<td>Terabaytlarca veri (Disk/Bellek verimli)</td>
</tr>
<tr>
<td>Mantıksal Şeffaflık</td>
<td>Düşük (Hücreye gizlenmiş formüller)</td>
<td>Çok Yüksek (Sorgu dosyaları)</td>
</tr>
<tr>
<td>Hata Riski</td>
<td>Yüksek (Otomatik tür dönüştürme)</td>
<td>Sıfır (Katı veri tipleri)</td>
</tr>
<tr>
<td>Versiyon Kontrolü</td>
<td>Zor (İkili dosya formatı)</td>
<td>Kusursuz (Git Diff/Merge uyumlu)</td>
</tr>
</tbody>
</table>
</div>
</div>

---

## 3. Sunum Mimarisinde Kod Dönemi: Slidev ve Web Stack

PowerPoint sunumları veriyi statikleştirir. Excel'den kopyalanan bir grafik sunuma eklendiği an statikleşir; veri değiştiğinde slaytları tek tek güncellemek gerekir.

Modern mühendislik kültürü, **Sunum Kod Olarak** (Presentation-as-Code) yaklaşımını gerektiriyor. Slaytlar artık Markdown ve Web teknolojileriyle (HTML/CSS/JS) yazılmalıdır.

![Web Teknolojileri ile Sunum: HTML5, CSS3 ve JavaScript](html5-css3-js.webp)

### Slidev Entegrasyonu
Vue.js tabanlı **Slidev**, web tabanlı sunumların en gelişmiş örneğidir:

1. **Dinamik Veriler:** Grafiklerin verileri bir API'den anlık çekilebilir ve animasyonlarla sunulabilir.
2. **Canlı Kod Çalıştırma:** Monaco Editor entegrasyonu sayesinde slayt üzerinde canlı kod yazıp çalıştırabilirsiniz.
3. **Git ve İşbirliği:** Sunum içeriği tek bir `slides.md` dosyasındadır. Değişiklikler e-posta yerine Pull Request (PR) ile yapılır.

<div class="render-cards">
  <article class="render-card render-card-ssr reveal-on-scroll">
    <div class="render-card-head">
      <span class="render-badge" style="background: #42b883; color: #ffffff;">Slidev</span>
      <h3>Web Mimarisinin Zirvesi</h3>
    </div>
    <img src="slidev.webp" alt="Slidev" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
    <p>Vue bileşenleri ve Monaco Editor ile güçlendirilmiş mimari. Canlı kod çalıştırabilir ve etkileşimli grafikler sunabilirsiniz.</p>
  </article>

  <article class="render-card render-card-ssg reveal-on-scroll">
    <div class="render-card-head">
      <span class="render-badge" style="background: #3e82f7; color: #ffffff;">Marp</span>
      <h3>Minimalist ve Hızlı</h3>
    </div>
    <img src="marp.png" alt="Marp" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
    <p>Tasarım karmaşasıyla ilgilenmeden sadece Markdown yazarak PDF veya HTML sunumlar üretmek için en hızlı çözüm.</p>
  </article>

  <article class="render-card render-card-csr reveal-on-scroll">
    <div class="render-card-head">
      <span class="render-badge" style="background: #111111; color: #ffffff;">Reveal.js</span>
      <h3>Esneklik ve Güç</h3>
    </div>
    <img src="revealjs.jpg" alt="Reveal.js" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
    <p>Doğrudan HTML/JS ile 3D geçişler ve yatay/dikey slayt hiyerarşileri. Görselleştirmeleri anlık tetikleyebilirsiniz.</p>
  </article>

  <article class="render-card render-card-isr reveal-on-scroll">
    <div class="render-card-head">
      <span class="render-badge" style="background: #000000; color: #ffffff;">Impress.js</span>
      <h3>3D Görsel Şov</h3>
    </div>
    <img src="impressjs.png" alt="Impress.js" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
    <p>CSS3 transformasyonları ile dönen ve derinlik algısı yaratan sunumlar hazırlamak için ideal.</p>
  </article>
</div>

---

## 4. Açık Kaynaklı Alternatifler: LibreOffice ve ONLYOFFICE

Kod tabanlı araçlar herkes için uygun olmayabilir. Ancak ofis araçları ihtiyacı, verilerimizi dışarı aktaran platformlara bağımlı olmamızı gerektirmez.

* **LibreOffice:** ISO standardı ODF (Open Document Format) kullanan, arka planda veri göndermeyen güvenli bir alternatiftir.
* **ONLYOFFICE:** Microsoft OOXML formatıyla doğrudan uyumludur. Şirket içi sunucularınızda (Self-hosted) barındırılarak bulut benzeri bir işbirliği ortamı sunar.

<div class="render-cards">
<article class="render-card render-card-ssr reveal-on-scroll">
<div class="render-card-head">
<span class="render-badge" style="background: #ff6f3c; color: #ffffff;">ONLYOFFICE</span>
<h3>Modern Entegrasyon</h3>
</div>
<img src="onlyoffice.webp" alt="ONLYOFFICE" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
<p>OOXML (DOCX) çekirdek mimarisi ve şirket içi işbirliği. Microsoft formatlarıyla yüksek görsel uyumluluk.</p>
</article>

<article class="render-card render-card-csr reveal-on-scroll">
<div class="render-card-head">
<span class="render-badge" style="background: #3a7610; color: #ffffff;">LibreOffice</span>
<h3>Gizlilik Kalesi</h3>
</div>
<img src="LibreOffice.jpg" alt="LibreOffice" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
<p>ODF standartlarına bağlı, telemetrisiz ve tamamen çevrimdışı. Veri mahremiyetinin güçlü savunucusu.</p>
</article>
</div>

<div class="glass-panel reveal-on-scroll">
<h4 style="text-align: center; margin-bottom: 1rem;">Paket Kıyaslaması</h4>
<div style="overflow-x: auto;">
<table style="width: 100%; font-size: 0.9rem; margin: 0 auto;">
<thead>
<tr>
<th>Kriter</th>
<th>LibreOffice</th>
<th>ONLYOFFICE Docs</th>
</tr>
</thead>
<tbody>
<tr>
<td>Çekirdek Format</td>
<td>ODF (Open Document)</td>
<td>OOXML (DOCX/XLSX)</td>
</tr>
<tr>
<td>MS Uyumluluğu</td>
<td>Gelişmiş (Dönüştürme ile)</td>
<td>Mükemmel (Doğrudan uyumlu)</td>
</tr>
<tr>
<td>Arayüz (UI)</td>
<td>Klasik Menü Sistemi</td>
<td>Sekmeli Ribbon Arayüzü</td>
</tr>
<tr>
<td>İşbirliği</td>
<td>Collabora entegrasyonu ile</td>
<td>Yerleşik Self-hosted servisleri</td>
</tr>
</tbody>
</table>
</div>
</div>

---

### Kapalı Ekosistemlerin Riskleri
Veri mülkiyetini kullanıcıya bırakmayan ve SaaS bağımlılığı yaratan platformlar, kurumlar için operasyonel birer kilit oluşturur. Google Docs, Microsoft 365 veya Zoho gibi tescilli bulut servisleri arasında geçiş yapmak veri egemenliği sağlamaz; sadece verinizi hangi sunucuda saklayacağınızı seçmenize yarar.

<div class="render-cards">
  <article class="render-card render-card-ssr reveal-on-scroll">
    <div class="render-card-head">
      <span class="render-badge" style="background: #d83b01; color: #ffffff;">Microsoft 365</span>
      <h3>Ekosistem Kilidi</h3>
    </div>
    <img src="m365.webp" alt="Microsoft 365" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
    <p>Bulut bağımlılığının ve 'vendor lock-in' kavramının endüstri standardı. Veri egemenliğinin önündeki en şık ama en katı bariyer.</p>
  </article>

  <article class="render-card render-card-ssr reveal-on-scroll">
    <div class="render-card-head">
      <span class="render-badge" style="background: #4285f4; color: #ffffff;">Google Docs</span>
      <h3>SaaS Prangası</h3>
    </div>
    <img src="google-docs.webp" alt="Google Docs" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
    <p>M365'ten kaçıp Google'a sığınmak veri egemenliği sağlamaz. Sadece verinizi hangi tekelin işleyeceğini seçersiniz.</p>
  </article>

  <article class="render-card render-card-csr reveal-on-scroll">
    <div class="render-card-head">
      <span class="render-badge" style="background: #f47b20; color: #ffffff;">Zoho Office</span>
      <h3>Kapsamlı Ama Kapalı</h3>
    </div>
    <img src="zoho-office.jpg" alt="Zoho" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
    <p>Bulut bağımlılığı ve tescilli doğası ile egemenlik kalesinin dışındadır. Veri yine sağlayıcının sunucusundadır.</p>
  </article>

  <article class="render-card render-card-ssg reveal-on-scroll">
    <div class="render-card-head">
      <span class="render-badge" style="background: #000000; color: #ffffff;">Apple iWork</span>
      <h3>Donanım Kilidi</h3>
    </div>
    <img src="iwork.webp" alt="iWork" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
    <p>Sizi Apple donanımlarına ve kapalı iCloud ekosistemine kilitler. Formatları tescillidir ve Git uyumsuzdur.</p>
  </article>

  <article class="render-card render-card-ssr reveal-on-scroll">
    <div class="render-card-head">
      <span class="render-badge" style="background: #e11d48; color: #ffffff;">WPS Office</span>
      <h3>Bütçe Dostu Klon</h3>
    </div>
    <img src="wps.jpg" alt="WPS Office" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
    <p>Microsoft formatlarıyla uyumlu çalışan Ribbon arayüzü. Ücretsiz sürümü reklam ve takip kodları barındırabilir.</p>
  </article>

  <article class="render-card render-card-ssr reveal-on-scroll">
    <div class="render-card-head">
      <span class="render-badge" style="background: #2563eb; color: #ffffff;">FreeOffice</span>
      <h3>Hafif ve Hızlı</h3>
    </div>
    <img src="FreeOffice.webp" alt="FreeOffice" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
    <p>Düşük donanımlı bilgisayarlarda hızlı bir alternatif sunar. Kapalı kaynaklıdır ancak bireysel kullanım için uygundur.</p>
  </article>
</div>

---

## 5. Bütünleşik Çözüm: Nextcloud Hub

Nextcloud Hub, bulut servislerinin sunduğu dosya paylaşımı, ortak belge düzenleme ve iletişim araçlarını tek bir on-prem sunucuda toplar:

* **Nextcloud Files:** Google Drive alternatifi dosya depolama.
* **Nextcloud Office:** Tarayıcı üzerinden eşzamanlı belge düzenleme.
* **Nextcloud Talk:** Uçtan uca şifreli toplantı ve sohbet.
* **Yerel Yapay Zeka:** Verileri dışarı göndermeden çalışan yerel yapay zeka asistanı.

<div class="render-cards">
  <article class="render-card render-card-ssr reveal-on-scroll" style="border: 1px solid rgba(0, 130, 201, 0.3); box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
    <div class="render-card-head">
      <span class="render-badge" style="background: #0082c9; color: #ffffff;">Nextcloud Files</span>
      <h3>Drive Alternatifi</h3>
    </div>
    <p>Google Drive veya OneDrive'ın güvenli, self-hosted alternatifi. Veriler doğrudan sizin sunucunuzda saklanır.</p>
  </article>

  <article class="render-card render-card-csr reveal-on-scroll" style="border: 1px solid rgba(0, 130, 201, 0.3); box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
    <div class="render-card-head">
      <span class="render-badge" style="background: #0082c9; color: #ffffff;">Nextcloud Office</span>
      <h3>Canlı İşbirliği</h3>
    </div>
    <p>ONLYOFFICE veya Collabora entegrasyonu ile tarayıcı üzerinden eşzamanlı belge düzenleme imkanı.</p>
  </article>

  <article class="render-card render-card-ssg reveal-on-scroll" style="border: 1px solid rgba(0, 130, 201, 0.3); box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
    <div class="render-card-head">
      <span class="render-badge" style="background: #0082c9; color: #ffffff;">Nextcloud Talk</span>
      <h3>Güvenli Teams</h3>
    </div>
    <p>Meet veya Teams yerine uçtan uca şifreli konferans ve sohbet. Veri sızıntısı riski sıfır.</p>
  </article>

  <article class="render-card render-card-isr reveal-on-scroll" style="border: 1px solid rgba(0, 130, 201, 0.3); box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
    <div class="render-card-head">
      <span class="render-badge" style="background: #0082c9; color: #ffffff;">Yerel Yapay Zeka</span>
      <h3>Mahrem Asistan</h3>
    </div>
    <p>Verileri dışarı sızdırmadan yerel çalışan Nextcloud Assistant ile doküman analizi ve metin üretimi.</p>
  </article>
</div>

---

## 6. Dijital Özgürlük İçin Tamamlayıcı Araçlar

Mühendislik ve akademik çalışmaları destekleyen diğer açık kaynaklı araçlar:

* **Quarto:** Markdown ve LaTeX arasında modern bir köprü. Teknik raporları farklı formatlarda üretmenizi sağlar.
* **Zotero:** Akademik referansları ve bibliyografyayı kendi sunucunuzda saklayan açık kaynaklı çözüm.
* **Mermaid.js:** Akış şemalarını kodla çizmenizi sağlar.
* **Vaultwarden:** Şifrelerinizi kendi sunucunuzda saklayan Bitwarden uyumlu şifre yöneticisi.

<div class="render-cards">
  <article class="render-card render-card-ssr reveal-on-scroll" style="border: 1px solid rgba(var(--app-accent-rgb, 37, 99, 235), 0.3); box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
    <div class="render-card-head">
      <span class="render-badge" style="background: #4752b2; color: #ffffff;">Quarto</span>
      <h3>Bilimsel Yayıncılık</h3>
    </div>
    <p>LaTeX ve Markdown arasındaki en modern köprü. Teknik raporları tek kaynaktan (Web/PDF/MS Word) üretmek için yeni dünya standardı.</p>
  </article>

  <article class="render-card render-card-csr reveal-on-scroll" style="border: 1px solid rgba(var(--app-accent-rgb, 37, 99, 235), 0.3); box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
    <div class="render-card-head">
      <span class="render-badge" style="background: #313131; color: #ffffff;">Zotero</span>
      <h3>Bibliyografya Kalesi</h3>
    </div>
    <p>Akademik çalışmaları Mendeley (SaaS) yerine kendi kontrolünüzde (WebDAV) tutmanızı sağlayan açık kaynaklı çözüm.</p>
  </article>

  <article class="render-card render-card-ssg reveal-on-scroll" style="border: 1px solid rgba(var(--app-accent-rgb, 37, 99, 235), 0.3); box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
    <div class="render-card-head">
      <span class="render-badge" style="background: #ff3e00; color: #ffffff;">Mermaid.js</span>
      <h3>Diagram-as-Code</h3>
    </div>
    <p>Akış diyagramlarını kodla yazıp dokümana gömmek için elzem. Visio gibi hantal araçlara elveda.</p>
  </article>

  <article class="render-card render-card-isr reveal-on-scroll" style="border: 1px solid rgba(var(--app-accent-rgb, 37, 99, 235), 0.3); box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
    <div class="render-card-head">
      <span class="render-badge" style="background: #175ddc; color: #ffffff;">Vaultwarden</span>
      <h3>Egemen Şifreler</h3>
    </div>
    <p>Şifrelerinizi Google/Apple'a emanet etmek yerine kendi sunucunuzda host ettiğiniz bitwarden uyumlu kasa.</p>
  </article>
</div>

---

## Veri Egemenliğini Geri Kazanmak

Bulut tabanlı ofis platformlarının getirdiği kolaylıklar, verinin mülkiyetini kaybetme riskini de beraberinde getirir. Belgeleri LaTeX ile yazmak, verileri DuckDB ile işlemek ve sunumları Slidev ile kodlamak sadece bir araç tercihi değil; verinizin kontrolünü elinizde tutma duruşudur. Kendi verinizin mimarı olun ve dijital bağımsızlığınızı koruyun.

---

### İleri Okuma ve Teknik Dokümantasyonlar

**1. LaTeX (Belge Mühendisliği ve Dizgi)**
* **LaTeX Resmi Dokümantasyonu:** https://www.latex-project.org/help/documentation/
* **Hızlı Başlangıç Kılavuzu (PDF):** http://tug.ctan.org/info/latex-veryshortguide/veryshortguide.pdf

**2. DuckDB (Veri Analitiği ve İşleme)**
* **CSV İçe Aktarma ve Yapılandırma Rehberi:** https://duckdb.org/docs/stable/data/csv/overview
* **Python API Dokümantasyonu:** https://duckdb.org/docs/stable/clients/python/overview
* **Çoklu Dosya Okuma ve Şema Birleştirme:** https://duckdb.org/docs/stable/data/multiple_files/overview

**3. HTML/CSS/JS Tabanlı Sunum Araçları**
* **Slidev Resmi Dokümantasyonu:** https://sli.dev/
* **Slidev Sözdizimi Kılavuzu:** https://sli.dev/guide/syntax
* **Reveal.js ve D3.js Entegrasyonu (GitHub):** https://github.com/gcalmettes/reveal.js-d3

**4. Açık Kaynaklı Ofis ve İşbirliği Platformları**
* **LibreOffice Kullanıcı Kılavuzları:** https://books.libreoffice.org/en/
* **Nextcloud Bilgi ve Kaynak Merkezi:** https://nextcloud.com/resources/
* **Nextcloud Uyumluluk ve Veri Egemenliği Rehberleri:** https://nextcloud.com/compliance/
* **ONLYOFFICE Çözümleri:** https://www.onlyoffice.com/best-microsoft-office-alternative
