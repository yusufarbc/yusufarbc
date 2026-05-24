---
title: "npm Paket Ekosistemine Yönelik Tedarik Zinciri Saldırıları"
date: 2026-05-23
description: "Yazılım tedarik zinciri güvenliği çerçevesinde npm (Node Package Manager) ekosistemindeki saldırı vektörleri, dependency confusion, typosquatting ve korunma yöntemleri."
draft: false
featuredImage: featured.webp
type: posts
---

# npm Ekosisteminde Tedarik Zinciri (Supply Chain) Güvenliği

Modern web geliştirme süreçlerinde açık kaynaklı kütüphaneler (open-source dependencies) projelerin yapı taşlarını oluşturmaktadır. Node.js dünyasının resmi paket yöneticisi olan **npm (Node Package Manager)**, milyonlarca pakete ev sahipliği yaparak dünyanın en büyük yazılım ekosistemlerinden biridir. Ancak bu devasa büyüklük ve paketlerin birbirine olan derin bağımlılık ağları, siber saldırganlar için benzersiz bir hedef alanı yaratmaktadır.

Saldırganlar artık doğrudan hedef kurumun ana altyapısına saldırmak yerine, kurumun kullandığı açık kaynaklı paketleri veya bu paketleri sağlayan geliştirici hesaplarını hedef almaktadır. **Yazılım Tedarik Zinciri Saldırıları (Software Supply Chain Attacks)** olarak adlandırılan bu yöntem, tek bir paketin zehirlenmesiyle binlerce sunucu ve istemcinin aynı anda enfekte olmasına yol açabilmektedir.

Aşağıdaki şema, tipik bir npm tedarik zinciri saldırı vektörünü (Dependency Confusion veya Typosquatting) ve bu saldırının geliştirici makinesinden canlı sunucuya kadar olan yayılımını göstermektedir:

```mermaid
graph TD
    subgraph Saldırganın Faaliyeti
        Attacker[Saldırgan] -->|Kötü Niyetli Paket Yayınlama| PublicRegistry[npm Public Registry]
    end

    subgraph Hedef Altyapı
        Dev[Geliştirici Makinesi] -->|npm install / typosquatting| PublicRegistry
        CI_CD[CI/CD Build Pipeline] -->|Otomatik Bağımlılık İndirme| PublicRegistry
        PrivateRegistry[Lokal Private Registry] -.->|Isırık / Dependency Confusion| PublicRegistry
    end

    subgraph Etki Alanı
        Dev -->|Zararlı Script Çalıştırma| DevEnv[Yerel Çevre Değişkenleri Sızıntısı]
        CI_CD -->|Zehirli Derleme| Prod[Canlı Sunucu / Backdoor]
    end

    style Attacker fill:#be123c,stroke:#f43f5e,stroke-width:2px,color:#fff;
    style PublicRegistry fill:#b45309,stroke:#f59e0b,stroke-width:2px,color:#fff;
    style PrivateRegistry fill:#0f766e,stroke:#14b8a6,stroke-width:2px,color:#fff;
    style CI_CD fill:#6d28d9,stroke:#8b5cf6,stroke-width:2px,color:#fff;
    style Prod fill:#be123c,stroke:#f43f5e,stroke-width:2px,color:#fff;
```

---

## npm Ekosistemindeki Temel Saldırı Yöntemleri

Yazılım tedarik zincirini hedef alan en yaygın npm saldırı taktikleri şunlardır:

<div class="render-cards">
  <div class="render-card render-card-ssr">
    <span class="render-badge">TYPOSQUATTING</span>
    <h3>Yazım Hatası İstismarı</h3>
    <p>Saldırganlar, popüler paketlerin isimlerindeki ufak yazım hatalarını (örneğin <code>lodash</code> yerine <code>laodsh</code> veya <code>request</code> yerine <code>requeset</code>) taklit eden kötü niyetli paketler yayınlar. Geliştiricinin yaptığı anlık bir klavye hatasıyla zararlı kod projeye dahil olur.</p>
  </div>
  
  <div class="render-card render-card-csr">
    <span class="render-badge">DEPENDENCY CONFUSION</span>
    <h3>Bağımlılık Karışıklığı</h3>
    <p>Kurum içi özel (private scope) paketlerin isimlerini tespit eden saldırganlar, aynı isim ve daha yüksek versiyon numarasıyla (örn. 99.0.0) npm public kayıt defterine sahte paketler yükler. <code>npm install</code> komutu varsayılan olarak en yüksek versiyonu çektiği için, sistem iç paket yerine dışarıdaki zehirli paketi indirir.</p>
  </div>

  <div class="render-card render-card-ssg">
    <span class="render-badge">ACCOUNT HIJACKING</span>
    <h3>Geliştirici Hesabı Ele Geçirme</h3>
    <p>Çok faktörlü doğrulama (MFA) kullanmayan popüler paket geliştiricilerinin npm hesapları oltalama veya parola sızıntılarıyla ele geçirilir. Saldırganlar doğrudan orijinal meşru paketin içerisine backdoor ekleyerek yeni bir resmi sürüm (minor/patch) yayınlar.</p>
  </div>
  
  <div class="render-card render-card-isr">
    <span class="render-badge">MALICIOUS SCRIPTS</span>
    <h3>Kurulum Betikleri İstismarı</h3>
    <p>npm paketlerinin kurulumu sırasında otomatik koşturulan <code>preinstall</code> ve <code>postinstall</code> lifecycle betikleri (scripts) kötüye kullanılır. Geliştirici paketi indirdiği anda hiçbir kod çağırmasa bile işletim sistemi seviyesinde komut çalıştırılarak ortam değişkenleri (env vars) uzaktaki sunucuya sızdırılır.</p>
  </div>
</div>

Bu tez çalışması kapsamında, npm ekosistemindeki bu zafiyetlerin teknik kök nedenleri analiz edilecek; büyük ölçekli tarama metodolojileri ile npm kayıt defterindeki anomali tespit yöntemleri ve kurumsal yapıları bu tehditlerden koruyacak proxy (Verdaccio/Nexus) konfigürasyonları geliştirilecektir.
