# Blog Yazısı Yayınlama Standartları ve Prosedürü (Blog Publishing Standards & Procedure)

Bu doküman, yusufarbc blog sitesinde yeni yazı yazma, çeviri, görsel/ses optimizasyonu ve seslendirme süreçlerinde takip edilmesi gereken standartları belirler.

---

## 📂 Klasör Yapısı ve Dosya Hiyerarşisi

Tüm varlıklar (görsel, ses, metin) yazının kendi klasörü (slug) altında saklanmalıdır. Genel `/public` klasörü **kullanılmamalıdır**.

```text
website/content/yazı-slug-adı/
├── tr.md                 # Türkçe makale
├── en.md                 # İngilizce makale
├── audio-script-tr.md    # Türkçe seslendirme metni (otomatik üretilir)
├── audio-script-en.md    # İngilizce seslendirme metni (otomatik üretilir)
├── tr.mp3                # Sıkıştırılmış Türkçe ses dosyası (96kbps Mono)
├── en.mp3                # Sıkıştırılmış İngilizce ses dosyası (96kbps Mono)
├── featured.webp         # Kapak görseli (WebP)
└── [diger-gorseller].webp # Diğer görseller (WebP)
```

> [!IMPORTANT]
> Depo boyutunu korumak amacıyla ham görsel (`.png`, `.jpg`) ve yüksek boyutlu ham ses (`.wav`) dosyaları kesinlikle repoya eklenmemelidir.

---

## 🏷️ İçerik ve Yazım Standartları

### 1. Başlık Hiyerarşisi
- **Numaralandırma Yok:** Başlıklarda `1.`, `1.1` gibi numaralar kullanılmaz. Otomatik TOC (İçindekiler) menüsü ve seslendirme scriptleri hiyerarşiyi kendiliğinden yönetir.
- **Seviyeler:** Makale gövdesinde `# H1` kullanılmaz (YAML frontmatter'daki `title` alanından çekilir). Bölümler için `## H2`, alt başlıklar için `### H3` (en fazla `#### H4`) kullanılır.
- **Geçişler:** Her `## H2` başlığından önce yatay çizgi (`---`) eklenmelidir. H2 başlığının hemen altına araya açıklayıcı bir paragraf girmeden H3 başlığı getirilmemelidir.

### 2. Giriş ve Sonuç Bölümleri
- **H2 Başlığı Kullanılmamalıdır:** Giriş ve Sonuç kısımları için kesinlikle `## Giriş` veya `## Sonuç` gibi H2 başlıkları açılmamalıdır. Bu sayede sol TOC menüsü yalnızca teknik ana bölümlere odaklanır.
- **Giriş:** Doğrudan başlar, 1-2 paragrafın ardından kıyaslama tablosu içeren `<div class="glass-panel reveal-on-scroll">` bloğu ile devam eder.
- **Sonuç:** Son teknik bölümden (veya `---` çizgisinden) sonra düz paragraf olarak akmalıdır. Türkçe kapanışta `"Verinizin mimarı olun, egemenliğinizi geri alın. Dinlediğiniz için teşekkürler!"` veya benzeri bir ifade kullanılmalıdır.

### 3. Mermaid Diyagramları
- **Sadelik:** Node sayısı 8-10 adedi geçmeyen, doğrusal/katmanlı (`graph TD` veya `graph LR`) akışlar tercih edilmelidir.
- **Dinamik Temalandırma:** Kutuların renkleri için elle hex kod yazılmamalı, Aydınlık/Karanlık modla uyumlu küresel CSS sınıfları atanmalıdır:
  - `node-accent` (Mavi/Vurgu)
  - `node-success` (Yeşil/Güvenli/İç sistem)
  - `node-danger` (Kırmızı/Saldırı/Tehdit)
  - `node-warning` (Sarı/Ara durum/Uyarı)
- **Örnek:**
  ```text
  graph LR
      A[Saldırgan] -->|Prompt Injection| B[AI İstemcisi]
      class A node-danger;
      class B node-accent;
  ```

---

## 🛠️ Otomasyon Scriptleri ve Adım Adım İş Akışı

Scriptlerin ve bu dokümanın [static-prompt/](file:///c:/Users/yusuf/Github/yusufarbc/static-prompt/) dizininde bulunması, yapay zeka ajanlarının bu kuralları doğrudan okuyabilmesini sağlar.

### Ön Gereksinimler:
Sisteminizde Python 3, Pillow kütüphanesi ve FFmpeg kurulu olmalıdır:
```powershell
pip install pillow
winget install ffmpeg
```

### Adım 1: Klasör ve Metin Dosyaları
`website/content/yazı-slug-adı/` klasörünü oluşturup içine `tr.md` ve `en.md` dosyalarını yazın.

### Adım 2: Görsel Optimizasyonu (WebP)
Görselleri WebP formatına dönüştürüp kalitelerini optimize etmek (2000px üzeri görselleri yeniden boyutlandırıp %80 WebP yapar) ve ham dosyaları silmek için:
```bash
python static-prompt/optimize_images.py website/content/yazı-slug-adı/ --delete
```
*(Yazı içerisindeki görsel referanslarını `.webp` olarak güncellemeyi unutmayın!)*

### Adım 3: Seslendirme Metinlerinin (Audio Script) Üretilmesi
Makale metinlerinden, konuşma diline uygun ve kod/tablo etiketli seslendirme scriptlerini üretin:
```bash
python static-prompt/convert_to_audio_script.py website/content/yazı-slug-adı/tr.md
python static-prompt/convert_to_audio_script.py website/content/yazı-slug-adı/en.md
```

### Adım 4: Seslendirme Kaydı ve MP3 Sıkıştırma
Üretilen `audio-script-*.md` dosyalarını Google AI Studio üzerinden seslendirin (Ayar detayları için bir sonraki bölüme bakın). Elde edilen ham sesleri (`.wav` vb.) web performansı ve mobil akıcılık için 96kbps Mono MP3 formatına dönüştürün:
```bash
python static-prompt/convert_audio.py website/content/yazı-slug-adı/tr.wav -o website/content/yazı-slug-adı/tr.mp3
python static-prompt/convert_audio.py website/content/yazı-slug-adı/en.wav -o website/content/yazı-slug-adı/en.mp3
```

### Adım 5: YAML Frontmatter Yapılandırması
`tr.md` ve `en.md` dosyalarının başına ses parametrelerini ekleyin:
```yaml
---
title: "Ofis Ekosisteminden Kaçış"
date: 2026-05-18
description: "Veri egemenliğini geri kazanmak."
tags: ["Sovereign Stack", "Open Source"]
category: Engineering
image: featured.webp
type: posts
audioFile: tr.mp3 # İngilizce için en.mp3
---
```

### Adım 6: Test ve Yayına Alma
Yerel sunucuda test edip yayına alın:
```bash
cd website
npm run dev
```

---

## 🤖 Yapay Zeka (AI) ve LLM Prompt Standartları

### 1. Yeni Blog Yazısı Yazma Promptu
```text
Role: Senior Security/System Engineer and Technical Writer.
Task: Write a deep-dive technical blog post.
Guidelines:
1. Provide rich technical details, keeping it engaging.
2. Use markdown tables and Mermaid.js diagrams.
3. Utilize CSS styles/HTML panels:
   - <div class="glass-panel reveal-on-scroll"> (for comparison tables/highlights)
   - <div class="render-cards"> and <article class="render-card ..."> (for alternative tools/features)
4. Reference local WebP images: `![Alt Text](filename.webp)`.
5. Add the following YAML frontmatter block at the top:
---
title: "[Post Title]"
date: [YYYY-MM-DD]
description: "[Brief hook description]"
tags: ["Tag1", "Tag2"]
category: [Category]
image: featured.webp
type: posts
audioFile: [tr.mp3 or en.mp3]
---

Topic: [ENTER BLOG TOPIC OR OUTLINE HERE]
```

### 2. Çeviri ve Senkronizasyon (1:1) Promptu
```text
Role: Technical Translator.
Task: Translate the blog post from source language to target language.
Guidelines:
1. Maintain strict 1:1 structural alignment. Do not split, merge, or change the order of paragraphs.
2. Keep all HTML tags (`<div>`, `<span>`, `<table>`, `<img>`) and class names intact.
3. Keep image filenames exactly the same (e.g., `featured.webp`).
4. Translate frontmatter `title` and `description`. Keep `date`, `tags`, `image`, and `type` identical. Set `audioFile` to the correct target (tr.mp3 or en.mp3).
5. Use standard, precise industry terms in the target language.

Source Text:
[ENTER SOURCE MD CONTENT HERE]
```

### 3. Google AI Studio `gemini-2.5-pro-preview-tts` Konfigürasyonu
Seslendirme dosyalarını üretirken aşağıdaki arayüz ayarlarını ve kullanın:

#### Arayüz Ayarları:
- **Model:** `gemini-2.5-pro-preview-tts`
- **Voice (Ses):** `Orus`
- **Temperature:** `0.5` ile `0.7` aralığı
- **Scene (Sahne):** `A professional cybersecurity expert recording a technical blog post.`
- **Sample Context (Bağlam):** `The speaker is explaining complex system architecture and security protocols clearly and confidently to an audience of IT professionals.`