---
title: "Nextcloud ve OnlyOffice: M365 ve Google Workspace'e Karşı Egemen Çözüm"
date: '2026-05-25'
description: "Kurumsal veri egemenliğini sağlamak amacıyla Nextcloud Hub, OnlyOffice ve Mailcow entegrasyonunun mimari analizi; M365 ve Google Workspace karşılaştırması ve performans optimizasyon rehberi."
image: featured.webp
type: posts
audioFile: tr.mp3
---

**M365 ve Google Workspace'e Karşı Açık Kaynaklı, Veri Egemen Kurumsal Altyapı ve Entegrasyon Rehberi**

Modern iş dünyasında bulut tabanlı ortak çalışma platformları kurumsal iletişimin ve veri yönetiminin kalbini oluşturmaktadır. Ancak teknoloji dünyasında sıkça dile getirilen **"Bulut (cloud) diye bir şey yoktur, o sadece başkasının bilgisayarıdır"** vurgusunun da işaret ettiği gibi, verinin değeri arttıkça ve gizlilik regülasyonları (KVKK, GDPR) sıkılaştıkça Microsoft 365 (M365) ve Google Workspace gibi genel bulut (public cloud) devlerine bağımlı olmak; veri egemenliği, güvenlik ve maliyet açılarından ciddi riskler doğurmaktadır. ABD Bulut Yasası (US Cloud Act) gibi yasal düzenlemeler nedeniyle, verilerinizin fiziksel olarak hangi ülkede depolandığından bağımsız olarak yabancı otoritelerin erişimine açık olması kurumsal risk yöneticilerini endişelendirmektedir.

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
  <iframe src="https://www.youtube.com/embed/CFdZWgiAj8I" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

Bu teknik blog yazısında, bu bağımlılığı sıfıra indiren ve kurumlara kendi sunucularında (on-premises veya private cloud) tam veri egemenliği sunan **Nextcloud Hub**, **OnlyOffice Document Server** ve **Mailcow** ekosisteminin bütünsel mimarisini ele alacağız. Platformun yeteneklerini M365 ve Google Workspace ile kıyaslayacak; performans, güvenlik, ölçeklenebilirlik ve otonom yapay zeka entegrasyonu detaylarına mikroskobik bir bakış atacağız.

---

## Dijital Egemenlik Savaşı: Nextcloud Hub vs. M365 & Google Workspace

<div style="display: flex; justify-content: center; gap: 2rem; align-items: center; margin: 1.5rem 0; flex-wrap: wrap; background-color: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px;">
  <img src="./nextcloud-logo.webp" alt="Nextcloud" style="height: 100px; object-fit: contain;" />
  <img src="./m365.webp" alt="Microsoft 365" style="height: 100px; object-fit: contain;" />
  <img src="./google-workspace.webp" alt="Google Workspace" style="height: 100px; object-fit: contain;" />
</div>

Kurumsal veri yönetiminde Nextcloud, basit bir dosya barındırma (drive) çözümü olmanın çok ötesine geçerek, iletişim ve işbirliği araçlarını entegre eden bütünsel bir ekosisteme dönüşmüştür.

Aşağıdaki tablo, kendi sunucularınızda barındırılan Nextcloud ekosistemi ile genel bulut alternatifleri arasındaki mimari ve stratejik farkları özetlemektedir:

<div class="glass-panel reveal-on-scroll">

| Kriter | Nextcloud Hub Ekosistemi | Microsoft 365 | Google Workspace |
| :--- | :--- | :--- | :--- |
| **Barındırma (Hosting)** | On-Premises, Özel Bulut (Private Cloud) veya Hava Boşluklu (Air-gapped) izole ağlar. | Sadece Microsoft Genel Bulutu (Azure). | Sadece Google Genel Bulutu. |
| **Veri Egemenliği (Data Sovereignty)** | **Mutlak**. Veri tabanı, şifreleme anahtarları ve dosyalar tamamen kurumun kontrolündedir. | **Sınırlı**. Veriler şifrelense de anahtarlar ve altyapı Microsoft yönetimindedir. | **Sınırlı**. Veriler Google altyapısında barındırılır; anahtar kontrolü Google'dadır. |
| **KVKK / GDPR Uyumluluğu** | Yerel sunucularda barındırma sayesinde regülasyonlara %100 yerel uyum sağlanır. | Verilerin yurt dışına çıkması ve Cloud Act nedeniyle uyumluluk riskleri barındırır. | Benzer şekilde, verinin sınır ötesi transferi KVKK/GDPR açısından ek onaylar gerektirir. |
| **Lisans Denetimi & Maliyet** | Açık kaynaklı (AGPLv3) lisanslama. Kullanıcı sınırı yoktur; beklenmedik denetimler yaşanmaz. | Kullanıcı başına aylık ödeme. Sürüm değişikliklerinde ani lisans artışları ve denetim riskleri. | Kullanıcı başına aylık abonelik. Ölçek büyüdükçe artan lisans maliyetleri. |
| **Yapay Zeka (AI) Yaklaşımı** | **Yerel/Otonom**. Modeller (Llama, Mistral) kurum sunucularında çalışır; veri dışarı sızmaz. | Bulut tabanlı Copilot. Veriler Microsoft'un LLM motorları tarafından işlenir. | Bulut tabanlı Gemini. Veriler Google bulutunda işlenir ve analiz edilir. |
| **Çevrimdışı ve İzole Çalışma** | İnternet erişimi olmayan (air-gapped) askeri veya kritik ağlarda dahi tam kararlılıkla çalışır. | Çalışmak için sürekli internet ve Microsoft bulut servislerine aktif bağlantı gerektirir. | Sürekli internet bağlantısı ve Google hesap doğrulaması zorunludur. |

</div>

### Microsoft'un Bulut Odaklı (Cloud-First) Baskısı ve Deprecation Riskleri

Kurumların genel bulut sağlayıcılarına geçişini hızlandırmak için yazılım devleri on-premises (yerel) ürün desteklerini ve özelliklerini kademeli olarak daraltmaktadır. Bu stratejik baskının en somut örneği Microsoft'un **"cloud-first"** yaklaşımıdır:

Microsoft, son yıllarda **"cloud-first"** yaklaşımını net bir biçimde benimsemiş; Windows Server, kimlik yönetimi ve diğer ürünlerini Azure bulutuyla entegrasyon sağlayacak şekilde konumlandırmaktadır. Bu stratejik dönüşüm, kurumların altyapı yönetimini kökten değiştirirken, beraberinde yeni fırsatlar ve riskler getirmektedir.

#### Kritik Araçlardaki Değişim

*   **WSUS (Windows Server Update Services):** Eylül 2024’te Microsoft, WSUS’un "deprecated" (kullanımdan kaldırılmış) ilan edildiğini duyurdu. Yeni yerel güncelleme sunucusu özellik yatırımı beklenmiyor; yönetim bulut araçlarına (Autopatch, Intune) kayıyor. WSUS, Windows Server 2025 bünyesinde çalışmaya devam etse de yeni inovasyonlardan mahrum kalacaktır.
    
    ![WSUS Değişimi](./wsus-deprecation-tr.webp)
    
*   **Windows Admin Center (WAC):** Aktif geliştirme sürüyor. Özellikle Azure Arc entegrasyonu ile on-prem sunucuların bulut üzerinden yönetimi hedefleniyor.
*   **Azure Local (Azure Stack HCI):** On-prem donanımı tamamen terk etmek yerine, bu altyapıyı "Azure ile birleştirilmiş" bir hibrit platform olarak konumlandırıyor.

#### Kimlik Yönetimi ve On-Prem AD'nin Durumu

Microsoft'un kimlik çözümlerindeki ana eğilim bulut merkezlidir. **Microsoft Entra ID** (eski adıyla Azure AD), platformun kalbi haline gelmiştir.

![Entra ID Portalı](./entra-id-portal.webp)

Klasik On-Premise Active Directory (AD DS), Windows Server 2025 ile bazı performans iyileştirmeleri (32k veritabanı sayfa boyutu, LAPS geliştirmeleri) alsa da Microsoft'un kimlik alanındaki yatırımlarının %90'ı bulut tabanlı Entra ID üzerine yapılmaktadır. Kurumlar, bulut servisleriyle senkronizasyon (Azure AD Connect) kurmaya ve kimlik doğrulamayı buluta taşımaya teşvik edilmektedir.

![Active Directory Modern Yönetim Arayüzleri](./active-directory-classic-tr.webp)

Uzun vadede iş yüklerinin Entra ID üzerinde tutulması ve on-prem AD ile hibrit bir köprü (Azure AD Connect) kurulması önerilmektedir. Aşağıdaki şema, kurumsal kimlik bilgilerinizin on-premise sınırlarından çıkıp buluta taşınmasındaki yasal ve teknik akışı özetlemektedir:

```mermaid
graph TD
    subgraph "Kurum Sınırları (On-Premises)"
        AD[Lokal Active Directory DS]
        User[Kullanıcı Girişi]
    end

    subgraph "ABD Merkezli Bulut Sağlayıcı (Azure)"
        Entra[Microsoft Entra ID <br/> Kimlik Deposu]
        SaaS[Office 365 / OneDrive]
    end

    subgraph "Yabancı Hukuk Otoriteleri"
        Court[ABD Mahkemeleri]
        CloudAct[CLOUD Act Talebi]
    end

    AD -->|Azure AD Connect Sync| Entra
    User -->|Lokal Giriş| AD
    User -->|SSO / Modern Kimlik Doğrulama| Entra
    Entra -->|Erişim İzinleri| SaaS
    
    Court -->|Kanuni Talep| CloudAct
    CloudAct -->|Veri Teslim Zorunluluğu| Entra
    CloudAct -.->|Veri Sızıntısı Riski| SaaS
```

Bu yasal riskler ve bulut dayatmaları karşısında, verilerin ve kimlik altyapısının kurum içi sunucularda barındırıldığı, açık kaynak kodlu (AGPLv3) **Nextcloud Hub ve OnlyOffice** entegrasyonu, veri egemenliğini yasal ve teknik düzeyde koruyan yegane alternatif hale gelmektedir.

---
## Nextcloud Hub Çekirdek Bileşenleri ve Entegrasyon Mimari Yapısı




Nextcloud Hub, veri silolarını ortadan kaldıran ve tüm uygulamaların birbiriyle tutarlı bir şekilde haberleşmesini sağlayan API tabanlı bir orkestrasyona sahiptir. Kurumsal bir private cloud ortamında Nextcloud Hub, OnlyOffice Document Server ve Mailcow entegrasyonunun bütünsel ağ ve servis mimarisi aşağıdaki gibidir:

```mermaid
graph TD
    %% Nodes
    Client["Tarayıcı / Mobil Uygulamalar"]
    Proxy["Nginx / Traefik Tersine Vekil<br/>(SSL Sonlandırma & JWT Doğrulama)"]
    
    subgraph NC_Stack["Nextcloud Hub Kümesi (On-Premises / Private Cloud)"]
        NC_Core["Nextcloud Çekirdek Motoru<br/>(PHP-FPM, WebDAV, OIDC)"]
        Redis["Redis Önbellek & Dosya Kilitleme<br/>(Oturum ve Kilit Yönetimi)"]
        DB[("PostgreSQL Veritabanı<br/>(Meta Veri & Parçalanmış Tablolar)")]
        S3_MinIO[("Birincil Nesne Depolama<br/>(MinIO / Ceph / S3)")]
    end

    subgraph OO_Stack["OnlyOffice Doküman Sunucusu"]
        OO_Doc["OnlyOffice Document Server<br/>(Node.js, Canvas Çizim)"]
    end

    subgraph Talk_Stack["Nextcloud Talk HPB"]
        Janus["Janus WebRTC Ağ Geçidi<br/>(SFU Medya Akışı)"]
        NATS["NATS Mesaj Kuyruğu"]
    end

    subgraph Mail_Stack["Mailcow Docker Altyapısı"]
        Postfix["Postfix SMTP & Dovecot IMAP"]
        Rspamd["Rspamd Antispam & ClamAV"]
    end

    %% Connections
    Client -->|HTTPS| Proxy
    Proxy -->|Yönlendirme /| NC_Core
    Proxy -->|Yönlendirme /onlyoffice| OO_Doc
    Proxy -->|Yönlendirme /standalone-signaling| Janus
    
    NC_Core -->|Key-Value Önbellek / Kilitler| Redis
    NC_Core -->|SQL Sorguları| DB
    NC_Core -->|İkili Dosya Depolama| S3_MinIO
    NC_Core -->|JWT El Sıkışması & Belge Eşleme| OO_Doc
    
    Client -.->|WebRTC SFU Medya Akışları| Janus
    Janus <-->|Yayınla/Abone Ol| NATS
    
    NC_Core -->|IMAP / SMTP İstemcisi| Postfix
    Postfix -->|Giriş/Çıkış Posta Tarama| Rspamd
```

### Nextcloud Files ve Depolama Optimizasyonu
Files modülü, WebDAV protokolünü temel alan çekirdek dosya sistemidir. Kurumsal ölçekte (500+ kullanıcı) dosya listeleme hızını korumak ve veritabanı üzerindeki disk I/O yükünü azaltmak amacıyla **ADA (Advanced Data Access) Engine** geliştirilmiştir. ADA Engine, eski Nextcloud sürümlerindeki devasa monolitik `oc_filecache` tablosunu parçalayarak (database sharding) küçük resim önizlemelerini (thumbnails), avatarları ve uygulama meta verilerini ayrı tablolara taşımıştır. Bu sayede çekirdek veritabanı boyutu %56 küçülmüş ve WebDAV istemcilerinin yaptığı gereksiz PROPFIND (durum sorgulama) istekleri %80 oranında azaltılmıştır.

Petabayt seviyesindeki kurumsal depolama ihtiyaçları için Nextcloud, geleneksel blok depolama (NFS, Local RAID) yerine **Primary Object Storage** mimarisini destekler. Bu mimaride Nextcloud; Amazon S3, MinIO veya Ceph Object Gateway gibi nesne depolama havuzlarına doğrudan bağlanır. Dosya sistemi hiyerarşisi S3 üzerinde düz (flat) bir yapıda, rastgele UUID'ler ile tutulurken, klasör yapısı lokal PostgreSQL veritabanında saklanır. 

> [!CAUTION]
> **Kritik Pitfall:** Primary Object Storage yapılandırması yalnızca Nextcloud kurulumunun ilk aşamasında yapılabilir. Sonradan birincil depolamayı S3'e taşımak eski dosyaların erişilemez hale gelmesine yol açar. Ayrıca, S3 birincil depolamaya geçildiğinde, yerel Docker disk hacimlerini yedeklemek üzere tasarlanmış olan entegre **BorgBackup** sistemi çalışmayı durdurur. Bu senaryoda felaket kurtarma planı; veritabanı yedekleri (pg_dump) ile S3 bucket replikasyonunu (MinIO Mirroring) ayrı ayrı senkronize edecek şekilde kurgulanmalıdır.

---

### OnlyOffice Belge Yönetimi: Client-Side Rendering Devrimi
Kurumsal belgelerin (Word, Excel, PowerPoint) web tarayıcılarında bozulma yaşanmadan, eşzamanlı olarak düzenlenmesi iş verimliliğinin temelidir. Nextcloud, ofis entegrasyonu için iki güçlü alternatif sunar: **Collabora Online (CODE)** ve **ONLYOFFICE**. 

İki çözüm arasındaki temel fark, tarayıcıda belgenin nasıl çizildiğidir (rendering):

<div class="render-cards">
  <div class="render-card render-card-ssr">
    <span class="render-badge">Collabora Online</span>
    <h3>Server-Side Rendering (SSR)</h3>
    <ul>
      <li><strong>Motor:</strong> Doküman sunucu tarafındaki LibreOffice motorunda çalıştırılır ve tarayıcıya sadece sayfanın görselleri (tiles) aktarılır.</li>
      <li><strong>Sunucu Yükü:</strong> Yüksek CPU/RAM tüketimi. 50 aktif kullanıcıda 16 GB RAM sınırına ulaşabilir.</li>
      <li><strong>Ağ Duyarlılığı:</strong> Gecikme süresi (latency) yüksek olan bağlantılarda yazma yavaşlığı hissedilir.</li>
    </ul>
  </div>
  
  <div class="render-card render-card-csr">
    <span class="render-badge">ONLYOFFICE</span>
    <h3>Client-Side Rendering (CSR)</h3>
    <ul>
      <li><strong>Motor:</strong> HTML5 Canvas ve JavaScript tabanlı bir çizim mimarisi kullanır.</li>
      <li><strong>Sunucu Yükü:</strong> Çizim işlemi tamamen kullanıcının bilgisayarında gerçekleşir. 50-100 eşzamanlı kullanıcı için 2-4 GB RAM yeterlidir.</li>
      <li><strong>Uyumluluk:</strong> Microsoft Office formatlarıyla (.docx, .xlsx, .pptx) %99 oranında yüksek uyumluluk sağlar.</li>
    </ul>
  </div>
</div>

```
OnlyOffice İletişim Akışı:
[Nextcloud WebUI] --(Düzenleme İsteği)--> [Nextcloud Core] --(JWT Doğrulama)--> [OnlyOffice Document Server]
       ^                                                                                   |
       |                                                                                   v
[Client Browser] <-------------(JS & OOXML Belge Yükü / Client Rendering)------------------+
```

![OnlyOffice Entegrasyonu](onlyoffice.webp)

> [!WARNING]
> **JWT ve Proxy Engelleri:** OnlyOffice ile Nextcloud arasındaki veri trafiği, belgelerin yetkisiz indirilmesini önlemek için JSON Web Token (JWT) ile imzalanır. Ancak kurumsal ağlarda araya konumlandırılan Tersine Vekil Sunucular (Reverse Proxy), standart `Authorization` başlıklarını (header) silebilir. Bu durum belge açılışında kimlik doğrulama hatalarına sebep olur. Çözüm için OnlyOffice yapılandırmasında (`local.json`) JWT başlık adı `AuthorizationJwt` gibi özel bir değere atanmalı ve Nextcloud yönetim panelindeki "Authorization Header" alanı da buna göre güncellenmelidir.
>
> **Topluluk Sürümü Limiti:** Ücretsiz OnlyOffice Docs Community Edition, kod seviyesinde gömülü olarak **maksimum 20 eşzamanlı bağlantı (sekme)** limitiyle gelir. 21. kullanıcı doküman açtığında belge salt okunur (read-only) açılır. 50+ kullanıcılı kurumsal yapılarda bu limitin aşılması kaçınılmazdır. Bu durumda ya bütçe ayrılarak OnlyOffice Enterprise sürümüne geçilmeli ya da sunucu RAM'i güçlendirilerek limitsiz Collabora alternatifi tercih edilmelidir.

---

### Nextcloud Talk ile Güvenli Gerçek Zamanlı İletişim
Nextcloud Talk; sesli/görüntülü konferans, sohbet ve ekran paylaşımı sunan WebRTC tabanlı bir çözümdür. 

Talk'un kurumsal dağıtımında en kritik mimari seçim sinyalleşme altyapısıdır:
*   **Standart Kurulum (Mesh Network / P2P):** Katılımcılar medya akışlarını doğrudan birbirlerine gönderir. 5 kişilik bir görüşmede her istemci diğer 4 kişiye ayrı ayrı video yüklemek (upload) zorundadır. Bu durum kullanıcı tarafındaki upload bant genişliğini ve CPU'yu tüketerek 3-5 katılımcıdan sonra görüşmenin çökmesine yol açar.
*   **High Performance Backend (HPB - SFU Mimarisi):** Janus WebRTC Gateway ve NATS mesajlaşma kuyruğundan oluşan bu özel orkestrasyon, **Selective Forwarding Unit (SFU)** mimarisini kullanır. Katılımcı videosunu sunucuya tek bir kanal üzerinden yükler; Janus sunucusu bu akışı çoğaltarak diğer katılımcılara dağıtır. Kullanıcı upload yükü sabittir. 10, 20 veya 50 kişilik kurumsal toplantılar ancak HPB mimarisiyle mümkündür.

> [!IMPORTANT]
> **Bant Genişliği ve Kayıt Performansı:** 20 katılımcılı bir HD video konferansta sunucu giriş (inbound) trafiği ~40 Mbps, çıkış (outbound) trafiği ise ~100 Mbps seviyelerini görebilir. Bu nedenle Talk HPB kurulu sunucuların en az 500 Mbps simetrik internet hattına sahip olması önerilir. Ek olarak, toplantı kaydetme (Recording) özelliği devreye alındığında, sunucuda video birleştirme (transcoding/encoding) işlemi başlayacağından, her bir kayıt işlemi 2-4 vCPU'yu %100 meşgul eder. Kayıt özelliği için HPB sunucusunun ayrı bir VM veya fiziksel makinede izole edilmesi donanım sağlığı açısından elzemdir.

---

### Kurumsal Mail Hizmetleri ve Mailcow Entegrasyonu
Nextcloud içerisindeki yerleşik "Mail" uygulaması bağımsız bir e-posta sunucusu değildir; yalnızca web tabanlı bir IMAP/SMTP istemcisidir. Verinin şirket içinde kalmasını garantilemek için arkada Dockerized mimaride çalışan **Mailcow** gibi tam teşekküllü bir e-posta sunucu kümesi konumlandırılmalıdır.

![Kurumsal E-posta Entegrasyonu ve Mailcow](./sso_mailcow.webp)

Mailcow (Postfix, Dovecot, SOGo, Rspamd ve ClamAV ile); Exchange ActiveSync (EAS) desteği sayesinde mobil cihazlarla CalDAV/CardDAV üzerinden kişileri ve takvimleri anlık (push) senkronize edebilir. Ancak kendi e-posta altyapınızı kurarken, gönderilen e-postaların Gmail/Outlook gibi sağlayıcılar tarafından spam olarak engellenmemesi için aşağıdaki DNS ve kriptografik standartlar DNS paneline işlenmelidir:

<div class="render-cards">
  <div class="render-card render-card-ssg">
    <span class="render-badge">SPF</span>
    <h3>Sender Policy Framework</h3>
    <p>Domain adınıza e-posta göndermeye yetkili IP adreslerini belirtir. DNS kaydı:</p>
    <code>v=spf1 mx a -all</code>
    <p>Buradaki <code>-all</code> parametresi yetkisiz göndericilerin doğrudan reddedilmesini sağlar.</p>
  </div>
  
  <div class="render-card render-card-isr">
    <span class="render-badge">DKIM</span>
    <h3>DomainKeys Identified Mail</h3>
    <p>E-postanın yoldayken değiştirilmediğini kanıtlayan asimetrik şifrelemedir. Mailcow üzerinde üretilen 2048-bit RSA anahtarı, DNS'te <code>dkim._domainkey</code> adına TXT kaydı olarak girilmelidir.</p>
  </div>
  
  <div class="render-card render-card-ssr">
    <span class="render-badge">DMARC</span>
    <h3>Domain-based Message Authentication</h3>
    <p>SPF ve DKIM doğrulamaları başarısız olan e-postaların karşı sunucu tarafından nasıl işleneceğini tanımlar:</p>
    <code>v=DMARC1; p=reject; rua=mailto:postmaster@domain.com</code>
  </div>
  
  <div class="render-card render-card-csr">
    <span class="render-badge">rDNS / PTR</span>
    <h3>Tersine DNS (Reverse DNS)</h3>
    <p>E-posta sunucusunun IP adresine ping atıldığında geri dönen ismin sunucu hostname'iyle (<code>mail.domain.com</code>) eşleşmesi şarttır. Bu işlem ISP tarafında tanımlanır.</p>
  </div>
</div>

---

### Otonom ve Yerel Yapay Zeka: Nextcloud AI Assistant
M365 Copilot veya Google Gemini gibi çözümler, kullanıcı verilerini işlemek üzere bulut tabanlı API'lere ihtiyaç duyar; bu da kurumsal verilerin dışarı sızma riskini beraberinde getirir. Nextcloud Hub, **AppAPI** mimarisi sayesinde sunucunuzun sınırları dışına tek bir bayt veri çıkarmadan **%100 Yerel Yapay Zeka (Local LLM)** deneyimi sunar.

AppAPI, Python/Go tabanlı yapay zeka uygulamalarını Nextcloud ana PHP sürecinden ayırarak izole Docker konteynerleri olarak çalıştırır. "Nextcloud AI Assistant" modülü; sunucunun kendi işlemci veya GPU gücünü kullanarak **Llama** ve **Mistral** gibi yerel dil modellerini koşturur. Ses dosyalarının metne dönüştürülmesi (Speech-to-Text) işlemleri ise yerel **Whisper** modeliyle tamamlanır. Bu otonom yapı, e-posta özetleme, Talk toplantı transkriptleri çıkarma ve Text uygulamasında metin üretme gibi işlemleri tamamen şirket içinde, GDPR/KVKK uyumlu olarak gerçekleştirir.

---
## Kurumsal Güvenlik Mimarisi ve Erişim Denetimi




Yüzlerce kullanıcının dosya paylaştığı bir ortamda kimlik yönetimi ve güvenlik katmanları en sıkı standartlara göre tasarlanmalıdır.

### LDAP/Active Directory ve SSO Entegrasyonu
Nextcloud ve Mailcow, kullanıcı veritabanını senkronize etmek için merkezi Active Directory veya OpenLDAP sunucularına bağlanır. Güvenlik için düz LDAP (port 389) yerine her zaman SSL/TLS şifreli **LDAPS (port 636)** kullanılmalıdır. 

AD/LDAP entegrasyonunda oturum açma hızını korumak için:
*   **Cache TTL (Önbellek Süresi):** Nextcloud LDAP ayarlarında önbellek süresi `3600` saniye (1 saat) veya üzerine çıkarılmalıdır. Böylece Nextcloud her işlemde AD sunucusunu sorgulamaz.
*   **Paging (Sayfalama):** AD sunucusunda sorgu limitlerinin aşılmasını önlemek için sayfalama aktif edilmeli ve sayfa boyutu `500-1000` arası seçilmelidir.
*   **Single Sign-On (SSO):** Kullanıcıların tek bir şifreyle tüm sistemlere erişmesi için Keycloak veya Authentik gibi modern SSO portalları konumlandırılmalı, Nextcloud ve Mailcow bu portallara OpenID Connect (OIDC) protokolü üzerinden entegre edilmelidir. Çok faktörlü doğrulama (MFA - TOTP/FIDO2 YubiKey) politikaları merkezi olarak bu SSO portalında yönetilmelidir.

### Veri Sızıntısı Önleme (DLP) ve Flow Motoru
Nextcloud'un yerleşik "File Access Control" (Dosya Erişim Kontrolü) motoru; kullanıcı grubu, cihaz türü (User Agent), dosya uzantısı ve IP adresine dayalı dinamik erişim kuralları tanımlamayı sağlar. Örneğin, İK departmanındaki kullanıcıların şirket ağı dışındaki bir IP adresinden bağlandıklarında finansal `.xlsx` dosyalarını açması veya indirmesi bloke edilebilir.

Ayrıca, platform **ICAP (Internet Content Adaptation Protocol)** desteği sunar. Dosyalar diske yazılmadan önce kurumsal DLP tarayıcısına yönlendirilir; dosya içerisinde T.C. Kimlik Numarası veya Kredi Kartı verisi saptandığında dosya otomatik olarak "Hassas" etiketiyle işaretlenir ve dış linklerle paylaşılması engellenir.

### Server-Side Encryption (SSE) vs. End-to-End Encryption (E2EE)
Nextcloud disk güvenliğini sağlamak için iki farklı kriptografik yöntem sunar:

<div class="render-cards">
  <div class="render-card render-card-ssr">
    <span class="render-badge">SSE</span>
    <h3>Sunucu Taraflı Şifreleme (Server-Side Encryption)</h3>
    <p>Dosya Nextcloud sunucusundan çıkıp Amazon S3 veya harici depolamaya yazılmadan önce AES-256 ile sunucu işlemcisinde şifrelenir. Anahtarlar Nextcloud belleğindedir.</p>
    <p>Bu yöntem, depolama sağlayıcısından veriyi korur ancak sunucuyu ele geçiren root yetkili bir saldırgan RAM dump alarak anahtarları çalabilir.</p>
  </div>
  
  <div class="render-card render-card-ssg">
    <span class="render-badge">E2EE</span>
    <h3>Uçtan Uca Şifreleme (End-to-End Encryption)</h3>
    <p>Şifreleme kullanıcının masaüstü/mobil cihazında yerel üretilen 256-bit AES-GCM anahtarlarıyla başlar. Sunucu dosyaların adını veya içeriğini asla göremez (Zero-Knowledge).</p>
    <p>E2EE, tarayıcıya sunucudan inen JavaScript koduna güvenilemediği için (Browser Trust Model açığı) web arayüzünde çalışmaz; sadece masaüstü/mobil istemcilerde etkindir.</p>
  </div>
</div> 

---
## Prodüksiyon Ortamları İçin Performans İnce Ayarları (Tuning Checklist)




![Docker ve Kubernetes ile Konteyner Altyapısı](docker-k8s.webp)

Sisteminizin yük altında donmasını önlemek için sunucu işletim sistemi, PHP-FPM, Redis ve veritabanı seviyesinde aşağıdaki performans ayarlamalarını yapmanız hayati önem taşır:

<div class="render-cards">
  <div class="render-card render-card-isr">
    <span class="render-badge">REDIS</span>
    <h3>İşlemsel Dosya Kilitleme</h3>
    <p>Senkronizasyon çakışmalarını önlemek için kilit yönetimini PostgreSQL yerine Redis'e devredin:</p>
    <code>'memcache.locking' => '\OC\Memcache\Redis',</code>
    <p>Redis tahliye politikasını <code>noeviction</code> yapmayı unutmayın.</p>
  </div>
  
  <div class="render-card render-card-csr">
    <span class="render-badge">PHP-FPM</span>
    <h3>Worker Limit Ayarları</h3>
    <p>Worker sayısını (<code>pm.max_children</code>) hesaplamak için <code>pm = static</code> kullanarak şu formülü uygulayın:</p>
    <code>max_children = (Toplam RAM - OS/DB RAM) / 100MB</code>
  </div>
  
  <div class="render-card render-card-ssr">
    <span class="render-badge">OPCACHE</span>
    <h3>OPCache & JIT Optimizasyonu</h3>
    <p>CPU yükünü düşürmek ve yürütme hızını maksimuma çıkarmak için JIT ve OPCache ayarlarını etkinleştirin:</p>
    <code>opcache.jit=1255</code>
  </div>
  
  <div class="render-card render-card-ssg">
    <span class="render-badge">CRON</span>
    <h3>Sistem Cron Entegrasyonu</h3>
    <p>AJAX arka plan işleri arayüzde yavaşlığa sebep olur. Arka plan işlerini sistem Crontab'ına taşıyın:</p>
    <code>*/5 * * * * php -f /var/www/nextcloud/cron.php</code>
  </div>
</div>

### İşlemsel Dosya Kilitleme (File Locking) için Redis Entegrasyonu
Eşzamanlı dosya senkronizasyonlarında çakışmaları önlemek için kullanılan dosya kilitleme mekanizması, varsayılan kurulumda PostgreSQL veritabanını (`oc_file_locks` tablosu) kullanır. Bu durum disk IOPS limitlerini tüketerek sistemi kilitler. Kilit yönetimi mutlaka RAM üzerinde çalışan Redis'e devredilmelidir:
```php
'memcache.locking' => '\OC\Memcache\Redis',
```
Redis bellek tahliye politikası (`maxmemory-policy`), kilitlerin süresinden önce silinip dosya bütünlüğünü bozmasını önlemek için `noeviction` olarak ayarlanmalıdır.

### PHP-FPM Süreç Limiti (Worker Hesaplama Formülü)
Anlık istek dalgalanmalarında sunucunun yanıt vermez duruma geçmesini engellemek için kurumsal sunucularda `pm = static` süreç yöneticisi kullanılmalıdır. Sunucunuzda çalıştırabileceğiniz maksimum PHP-FPM worker sayısı (`pm.max_children`) şu formülle hesaplanır:

```text
max_children = (Toplam RAM - İşletim Sistemi ve Diğer Servislerin RAM İhtiyacı) / Süreç Başına Ortalama PHP Bellek Tüketimi (~100MB)
```

*Örnek:* 32 GB RAM'li bir sunucuda; OS (4GB), DB (8GB) ve Redis/Yan Servisler (4GB) düşüldüğünde kalan 16 GB (16.384 MB) RAM, 100 MB'lık PHP sürecine bölünürse `pm.max_children = 150` olarak atanmalıdır.

### OPCache ve JIT Yapılandırması
`php.ini` dosyanızda aşağıdaki optimizasyonları etkinleştirerek CPU tüketimini azaltın ve derleme hızını maksimize edin:
```ini
opcache.memory_consumption=256
opcache.max_accelerated_files=20000
opcache.interned_strings_buffer=32
opcache.jit=1255
opcache.save_comments=1 ; Kapatılması Nextcloud yönlendirme (routing) sistemini bozarak sunucuyu çökertecektir.
```

### AJAX Yerine Sistem Cron Görevleri
Nextcloud arka plan işlerini varsayılan olarak "AJAX" (sayfa tıklandıkça) çalıştırır. Bu durum sayfa yüklenmelerini yavaşlatır. Arka plan görevleri sistem seviyesinde işletim sistemi Cron'una (`crontab`) bağlanmalı ve her 5 dakikada bir çalışacak şekilde ayarlanmalıdır:
```bash
*/5 * * * * php -f /var/www/nextcloud/cron.php
```
---





Nextcloud Hub, OnlyOffice ve Mailcow entegrasyonu; kurumlara M365 ve Google Workspace'in sunduğu tüm modern ortak çalışma ve iletişim yeteneklerini sunarken, **verinin mutlak kontrolünü ve yasal uyumluluğunu** garanti eder. 

Doğru donanım planlaması, Redis kilitleme optimizasyonları ve Talk SFB/Janus orkestrasyonu ile kurgulanan bu yerel altyapı, genel bulut maliyetlerini düşürmekle kalmayıp kurumunuzun dijital geleceğini güvenceye alan aşılmaz bir siber kale inşa edilmesini sağlayacaktır.

Verinizin mimarı olun, egemenliğinizi geri alın. Dinlediğiniz için teşekkürler!