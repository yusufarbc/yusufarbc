# Blog Post Publishing Procedure (Blog Yazısı Yayınlama Prosedürü)

Bu doküman, yeni bir blog yazısı yayınlarken izlenmesi gereken standart adımları ve bu işlemleri otomatikleştiren betiklerin kullanımını içerir.

---

## Ön Gereksinimler (Prerequisites)

Betiklerin çalışması için bilgisayarınızda aşağıdaki araçların kurulu olması gerekir:

1. **Python 3.x** ve **Pillow** kütüphanesi (Görsel optimizasyonu için):
   ```bash
   pip install pillow
   ```
2. **FFmpeg** (Ses sıkıştırma/MP3 dönüştürme için):
   - PowerShell'i yönetici olarak açın ve çalıştırın:
     ```powershell
     winget install ffmpeg
     ```
   - Kurulumdan sonra terminali yeniden başlatın.

---

## Adım Adım Yayınlama Süreci

### Adım 1: Yazı İçeriğini ve Görselleri Hazırlama
1. `website/content/` dizini altında yazıya özel bir klasör oluşturun (Örn: `website/content/yazı-slug-adı/`).
2. Klasör içinde `tr.md` (Türkçe) ve `en.md` (İngilizce) dosyalarını oluşturup yazıyı kaleme alın.
3. Görselleri bu klasör altındaki `media/` alt klasörüne (Örn: `website/content/yazı-slug-adı/media/`) kaydedin.

### Adım 2: Görselleri WebP Formatına Dönüştürme
Görsellerin site performansını düşürmemesi için `.webp` formatına dönüştürülmesi ve gereksiz orijinallerin silinmesi gerekir.
Terminalden aşağıdaki komutu çalıştırın:
```bash
python scripts/optimize_images.py website/content/yazı-slug-adı/media --delete
```
*Not: `--delete` parametresi eklenirse, başarıyla dönüştürülen orijinal formatlar (`.png`, `.jpg` vb.) otomatik olarak silinir.*

### Adım 3: Seslendirme Metinlerini (Audio Script) Oluşturma
Blog yazılarındaki paragrafları **birebir koruyarak**, tabloları seslendirilebilir cümlelere dönüştüren ve Mermaid şemaları ile kod bloklarını seslendirme için etiketleyen betiği çalıştırın:

- **Türkçe Seslendirme Metni İçin:**
  ```bash
  python scripts/convert_to_audio_script.py website/content/yazı-slug-adı/tr.md
  ```
  *(Bu komut `website/content/yazı-slug-adı/audio-script-tr.md` dosyasını oluşturur)*

- **İngilizce Seslendirme Metni İçin:**
  ```bash
  python scripts/convert_to_audio_script.py website/content/yazı-slug-adı/en.md
  ```
  *(Bu komut `website/content/yazı-slug-adı/audio-script-en.md` dosyasını oluşturur)*

*Oluşturulan markdown dosyalarındaki metinleri TTS (Text-To-Speech) modeline veya seslendirme aracına besleyerek ses dosyalarını oluşturun.*

### Adım 4: Ses Dosyalarını Sıkıştırma ve MP3 Yapma
Kayıt sonrasında veya TTS çıktısı olarak aldığınız yüksek boyutlu ses dosyalarını (örneğin `.wav` veya `.m4a`), sitenin hızlı yüklenmesi için 96kbps Mono olarak sıkıştırın:

- **Türkçe Ses Dosyası Dönüşümü:**
  ```bash
  python scripts/convert_audio.py website/content/yazı-slug-adı/tr.wav -o website/content/yazı-slug-adı/tr.mp3
  ```
- **İngilizce Ses Dosyası Dönüşümü:**
  ```bash
  python scripts/convert_audio.py website/content/yazı-slug-adı/en.wav -o website/content/yazı-slug-adı/en.mp3
  ```
*Varsayılan olarak bu betik dosyayı 96kbps mono formatına sıkıştırarak ses kalitesini korur ve dosya boyutunu ciddi oranda düşürür.*

### Adım 5: Frontmatter ve Site Ayarlarını Güncelleme
Seslendirme dosyalarınızı yazıya bağlamak için `tr.md` ve `en.md` dosyalarının YAML frontmatter alanına `audioFile` parametresini ekleyin:
```yaml
---
title: "Yazı Başlığı"
date: '2026-06-15'
description: "Yazı açıklaması..."
featuredImage: featured.png
audioFile: tr.mp3 # İngilizce için en.mp3
draft: false
---
```

### Adım 6: Test ve Yayınlama
Değişiklikleri yerelde doğrulamak için web sitesini başlatın:
```bash
cd website
npm run dev
```
Her şey sorunsuz görünüyorsa değişikliklerinizi git ile commit edip gönderin.
