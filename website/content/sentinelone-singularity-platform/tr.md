---
title: "SentinelOne Singularity Platform: Yapay Zeka Güçlü XDR"
date: '2025-11-18'
description: "SentinelOne Singularity Platformu üzerine 180+ sayfalık teknik raporlardan damıtılmış dev rehber; otonom mimari, Storyline, Rollback, XDR ve Purple AI detayları."
featuredImage: featured.webp
draft: false
layout: single
type: posts
audioFile: tr.mp3
---

**Mimariden Yapay Zeka Güçlü XDR'a Kapsamlı Teknik Rehber**

<div class="audio-narration">
  <p><strong>🎙️ Blog yazısının seslendirmesi:</strong> Bu makale, seslendirme dosyası hazırlandığında yukarıdaki oynatıcıdan dinlenebilir. Teknik detaylar için okumaya devam edin.</p>
</div>

![](https://cdn-images-1.medium.com/max/800/1*jlrnbhcogdwACT7gXmQjYw.png)

## Hızlı Özet

- **Otonom Mimari:** Bulut bağlantısı olmasa dahi uç noktada karar verebilen yerel yapay zeka.
- **Storyline™:** Binlerce olaydan anlamlı bir saldırı hikayesi çıkaran patentli teknoloji.
- **1-Click Rollback:** Fidye yazılımı hasarlarını saniyeler içinde geri alan VSS tabanlı kurtarma.
- **Geniş Kapsam:** Tek ajanda EPP, EDR, XDR ve Kimlik Güvenliği (ITDR) entegrasyonu.
- **Performans:** MITRE 2024 testlerinde %100 tespit ve sıfır gecikme skoru.

## Giriş: Otonom Güvenliğin Yeni Paradigması

Modern siber güvenlik manzarasında kuruluşlar; uç nokta, bulut ve kimlik gibi çok sayıda saldırı yüzeyini hedef alan karmaşık tehditlerle mücadele etmektedir. SentinelOne Singularity Platformu, bu paradigmaya uygun olarak tüm bu katmanları tek bir otonom platform altında birleştiren, **Gartner 2024 Magic Quadrant** liderlerinden biridir.

Platform; uç nokta koruması (EPP), uç nokta tespiti ve yanıtı (EDR), genişletilmiş tespit ve yanıt (XDR) ile kimlik tabanlı tehdit tespiti ve yanıtı (ITDR) yeteneklerini tek bir mimaride sunar.

![](https://cdn-images-1.medium.com/max/800/1*v_dw2Vr5-UjnAo2d02KXBg.png)

---

## 1. Platform Mimarisi ve Tek Ajan Gücü

SentinelOne'ın mimarisi **"Tek Ajan, Çoklu Motor"** prensibiyle tasarlanmıştır. Bu hafif ajan, işletim sistemi çekirdeği (kernel) seviyesinde çalışarak dosya sistemi, işlem ve bellek aktivitelerini gerçek zamanlı izler.

### 1.1. Kaynak Verimliliği
SentinelOne ajanı, uç nokta performansını etkilemeyecek şekilde optimize edilmiştir:
*   **CPU Kullanımı:** %0–4 (Sadece tarama anında hafif yükselme)
*   **Bellek Kullanımı:** ~20MB
*   **Disk Alanı:** ~200MB

![](https://cdn-images-1.medium.com/max/800/1*_hbumiRrnimNfSolItu4dg.png)

### 1.2. Otonom Karar Mekanizması
En kritik mimari özellik, tespit ve yanıt mantığının yerel olarak çalışabilmesidir. Ajan, bulut bağlantısı olmasa bile (çevrimdışı) yerleşik AI modelleri sayesinde tehditleri engelleyebilir. Bu özellik, izole ağlar veya OT/ICS sistemleri için hayati önem taşır.

![](https://cdn-images-1.medium.com/max/800/1*cRqq7JFeY3W2TDgR9BznmA.png)

---

## 2. Çok Katmanlı Tehdit Tespit Akışı

SentinelOne, bir dosyanın sisteme girişinden çalıştırılmasına kadar geçen süreci iki ana aşamada kontrol eder:

### Aşama 1: Pre-Execution (Çalıştırma Öncesi) - Statik AI
Bir dosya diske yazıldığı (On-Write) anda devreye girer. İmza veya hash gerektirmeden, makine öğrenimi modelleri ile dosya yapısını analiz eder. Bilinen zararlı yazılımları ve ransomware varyantlarını dosya daha açılmadan engeller.

### Aşama 2: On-Execution (Çalışma Anı) - Davranışsal AI
Dosya çalışmaya başladığı anda devreye girer. API çağrıları, ağ bağlantıları ve sistem değişikliklerini izler. Özellikle **dosyasız (fileless) saldırıları**, **Living off the Land (LotL)** tekniklerini ve **sıfır-gün (0-day)** istismarlarını tespit eder.

![](https://cdn-images-1.medium.com/max/800/1*Ti63wzo9C4Vci3ZJbJ242A.png)

<div class="render-cards">
<article class="render-card render-card-static reveal-on-scroll">
<div class="render-card-head">
<span class="render-badge">PRE-EXECUTION</span>
<h3>Statik Yapay Zeka</h3>
</div>
<p>Dosya çalıştırılmadan önce devreye girer. İmza gerektirmeden dosya yapısını analiz eder.</p>
<ul>
<li><strong>Tespit:</strong> Bilinen malware ve truva atları.</li>
<li><strong>Avantaj:</strong> Sıfır gecikme, proaktif engelleme.</li>
<li><strong>Teknoloji:</strong> Derin öğrenme tabanlı dosya taraması.</li>
</ul>
</article>

<article class="render-card render-card-behavioral reveal-on-scroll">
<div class="render-card-head">
<span class="render-badge">ON-EXECUTION</span>
<h3>Davranışsal Yapay Zeka</h3>
</div>
<p>Süreç çalışmaya başladığı anda devreye girer. Uygulama davranışlarını gerçek zamanlı izler.</p>
<ul>
<li><strong>Tespit:</strong> Dosyasız (fileless) ve 0-day saldırıları.</li>
<li><strong>Avantaj:</strong> "Niyet" odaklı tespit, imzasız koruma.</li>
<li><strong>Teknoloji:</strong> API ve bellek aktivite izleme.</li>
</ul>
</article>

<article class="render-card render-card-storyline reveal-on-scroll">
<div class="render-card-head">
<span class="render-badge">CONTEXT</span>
<h3>Storyline™</h3>
</div>
<p>Dağınık EDR olaylarını otomatik ilişkilendirerek tek bir saldırı hikayesi oluşturur.</p>
<ul>
<li><strong>RCA:</strong> Kök neden analizini saniyelere indirir.</li>
<li><strong>Görünürlük:</strong> Saldırı zincirini görsel olarak sunar.</li>
<li><strong>Verimlilik:</strong> Analistlerin iş yükünü %80 azaltır.</li>
</ul>
</article>

<article class="render-card render-card-rollback reveal-on-scroll">
<div class="render-card-head">
<span class="render-badge">RECOVERY</span>
<h3>Rollback</h3>
</div>
<p>Özellikle ransomware saldırıları sonrası sistemleri temiz durumuna geri döndürür.</p>
<ul>
<li><strong>Mekanizma:</strong> Windows VSS altyapısını kullanır.</li>
<li><strong>Hız:</strong> Saniyeler içinde veri kurtarma.</li>
<li><strong>Güvenlik:</strong> Fidye ödeme zorunluluğunu ortadan kaldırır.</li>
</ul>
</article>
</div>

---

## 3. Patentli Teknolojiler: Storyline™ ve ActiveEDR

SentinelOne'ın en büyük fark yaratan teknolojisi **Storyline™**'dır.

*   **Otomatik Korelasyon:** Her bir olay bir "Storyline ID" ile etiketlenir. Örneğin; bir Word belgesinin PowerShell tetiklemesi ve ardından bir DLL yüklemesi tek bir olay hikayesinde birleştirilir.
*   **Kök Neden Analizi (RCA):** Analistler, binlerce ham log içinde kaybolmak yerine, saldırı zincirini en başından sonuna kadar tek bir görsel arayüzde görebilirler. Bu, müdahale süresini saniyeler mertebesine indirir.

---

## 4. Olay Yanıtı: Rollback ve Remediation

SentinelOne, saldırı sonrası sistemleri temiz bir duruma döndürmek için benzersiz bir yetenek sunar:

*   **One-Click Rollback:** Özellikle fidye yazılımı saldırıları için tasarlanmıştır. Windows **Volume Shadow Copy Service (VSS)** altyapısını kullanarak, şifrelenmiş dosyaları tek bir tıklamayla saldırı öncesi temiz hallerine geri döndürür.
*   **Ajan Koruması (Tamper Protection):** Gelişmiş saldırganların EDR ajanını kapatmasını engellemek için ajan servisleri şifreyle korunur ve çekirdek seviyesinde müdahalelere karşı direnç gösterir.

![](https://cdn-images-1.medium.com/max/800/1*hFQ_jeDEtsU3QEl9pSJbGA.png)

---

## 5. Genişletilmiş Görünürlük: Ranger ve Deep Visibility

### 5.1. Ranger® (Ağ Keşfi)
Ranger modülü, ajanları birer sensöre dönüştürür. Ağdaki yönetilmeyen cihazları (IoT, yazıcılar, misafir cihazlar) keşfeder ve görünürlük sağlar. Ayrıca bu cihazlara otomatik ajan dağıtımı yapılmasını tetikleyebilir.

### 5.2. Deep Visibility ve S1QL
Telemetri verileri bulutta saklanır ve **S1QL** diliyle sorgulanabilir. Örneğin, son 180 gün içinde belirli bir komutu çalıştıran süreçleri avlamak için:

```sql
SELECT Timestamp, DeviceName, ProcessName, CommandLine  
FROM ProcessActivities  
WHERE LOWER(CommandLine) LIKE '%net user%' AND Timestamp > NOW()-180d;
```

![](https://cdn-images-1.medium.com/max/800/1*pMu0HoEd4BRugo45sjXNmA.png)

---

## 6. Otonom SOC: Purple AI ve STAR

*   **Purple AI:** Üretken yapay zeka (GenAI) destekli bir güvenlik asistanıdır. Doğal dilde ("Son 24 saatteki PowerShell aktivitelerini özetle") gelen sorulara yanıt verir ve otomatik triyaj yapar.
*   **STAR (Storyline Active Response) Kuralları:** Analistlerin özel sorgularını otonom dedektörlere dönüştürmesini sağlar. Belirli bir kural tetiklendiğinde cihazın otomatik izolasyonu gibi aksiyonlar atanabilir.

![](https://cdn-images-1.medium.com/max/800/1*QnY2c-2-jEBISzxsEEgOAA.png)

---

## 7. Lisanslama ve Paket Karşılaştırması

SentinelOne, farklı kurumsal ihtiyaçlara yönelik beş ana paket sunar:

| Özellik / Paket | Core | Control | Complete | Commercial | Enterprise |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **NGAV (Statik AI)** | Evet | Evet | Evet | Evet | Evet |
| **Davranışsal AI** | Evet | Evet | Evet | Evet | Evet |
| **Rollback & Remediation** | Evet | Evet | Evet | Evet | Evet |
| **Firewall & Device Control** | Hayır | Evet | Evet | Evet | Evet |
| **Deep Visibility (EDR)** | Hayır | Hayır | Evet | Evet | Evet |
| **STAR Kuralları** | Hayır | Hayır | Evet | Evet | Evet |
| **Kimlik Koruması (ITDR)** | Hayır | Hayır | Kısmen | Evet | Evet |
| **Purple AI** | Opsiyonel | Opsiyonel | Opsiyonel | Evet | Evet |
| **Veri Saklama (DV)** | 14 Gün | 14 Gün | 14 Gün | 90 Gün | 90-365+ Gün |

![](https://cdn-images-1.medium.com/max/800/1*-_aMQrqV4B2SeCtfuWtLYA.png)

---

## 8. Dağıtım ve Yönetim

*   **Esnek Kurulum:** SaaS (Bulut), On-Prem (Yerinde) veya Hybrid (Hibrit) kurulum seçenekleri mevcuttur.
*   **Entegrasyon:** Microsoft Intune, SCCM, GPO gibi araçlarla tam otomatize dağıtım desteklenir.
*   **Singularity Marketplace:** 340'tan fazla API fonksiyonu ile ServiceNow, Splunk, Okta ve QRadar gibi 3. taraf çözümlerle tek tıkla entegrasyon sunar.

![](https://cdn-images-1.medium.com/max/800/1*iLFyX0FNTl5lkXBZsij6Aw.png)

---

## Sonuç: Stratejik Değer

![](https://cdn-images-1.medium.com/max/800/1*ngCUgm4Pkesl_gBvk_Sdlg.png)

SentinelOne Singularity Platformu, **MITRE ATT&CK 2024** değerlendirmelerinde %100 tespit oranı ve sıfır gecikme ile teknolojik liderliğini kanıtlamıştır. Sektör ortalamasından **%88 daha az gürültü (alarm)** üreterek SOC ekiplerinin asıl tehditlere odaklanmasını sağlar.

Kurumlar için SentinelOne seçimi, sadece bir antivirüs değişikliği değil, yapay zeka hızında otonom bir savunma mimarisine geçiş yapmak anlamına gelir.
