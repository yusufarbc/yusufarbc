---
title: "X86 Tabanlı Mikroişlemci Mimarisi"
date: 2022-12-19
description: "X86 adı, orjinal Intel işlemci çekirdek lisansına dayanan işlemcilere verilen isimdir. Dünyada masaüstü ve dizüstü bilgisayarların %90'ından fazlasında X86 tabanlı mikroişlemciler(Intel ve AMD vb.) ku..."
featuredImage: "https://cdn-images-1.medium.com/max/800/1*LCI0x-uWvBBHYDnFGti6BA.png"
---

![](https://cdn-images-1.medium.com/max/800/1*LCI0x-uWvBBHYDnFGti6BA.png)

### X86 Nedir?

X86 adı, orjinal Intel işlemci çekirdek lisansına dayanan işlemcilere verilen isimdir. Dünyada masaüstü ve dizüstü bilgisayarların %90'ından fazlasında X86 tabanlı mikroişlemciler(Intel ve AMD vb.) kullanılmaktadır. Çağdaş işlemcilerin tamamının temel yapısı birbirine benzemekte, sadece bazı özellikleri ile birbirinden ayrılmaktadır.

### Programlamaya Yönelik İşlemci Mimarisi

Gelişmiş mikroişlemciler de temel olarak 8-bitlik mikroişlemcilerde olduğu gibi kaydedici Bölümü, ALU ve Kontrol birimine sahiptir. Fakat daha sonra mimari yapısı çoklu görev ortamına uygun hale getirildiğinden, işlemci içerisindeki bölümlerin de fonksiyonel açıdan iki mantıksal ana bölüm halinde daha ayrıntılı açıklanması gerekmektedir.

![](https://cdn-images-1.medium.com/max/800/0*7PswzKiGH1B4pThm.png)

X86 tabanlı işlemciler Veri Yolu Bağdaştırma Birimi(BIU) ve İcra Birimi(EU) olmak üzere iki ana bölümde incelenebilir. BIU birimi, EU birimini veriyle beslemekten sorumluyken, EU birimi talimatların icrasından sorumludur.

#### Veri Bağdaştırma Birimi (BIU)

Veriyolları üzerindeki tüm veri ve adres hareketlerini EU için halleder.

Görevleri:

* Emirleri getirme (Instruction Fetching)
* Operandların adreslerini hesaplama
* Belleğe operand yazma, bellekten operand okuma
* Emir baytlarını emir kuyruğuna(Instruction Queue) transfer etme

Ana Bileşenleri:

**1.Segment kaydedicileri:**

Gelişmiş mikroişlemcili sistemlerde kullanılan bellek adresleri günümüzde iki parça halinde ifade edilirler. Bunlar segment ve ofset adresleridir. Böyle ifade edilmesinin sebebi, bellek miktarının oldukça yüksek olma zorunuluğudur. Büyük kapasiteli belleklerde bilginin yönetimi oldukça karmaşıktır. Bu sebeple büyük bellekler belli amaçlarla 64kb’lik küçük gruplara(segmentlere) ayrılarak daha kolay yönetilirler. Bellekte bu bölümlerin başlangıç adresleri segment kaydedicileri tarafından tutulurlar. Bu bölümdeki verilerin adresleri ise, segment kaydedici içeriğine olan uzaklığıdır ve ofset adres olarak anılırlar.

Her segment kaydedicisi bir segmentin başlangıç adresini tutar. Segmentlerin özel işlevleri vardır. Gelişmiş işlemcilerde 6 segment bulunur:

* **CS — Code Segment:** Emirlerin tutulduğu segment
* **DS — Data Segment:** Verilerin tutulduğu segment
* **SS — Stack Segment:** Yığın segmentidir, gerektiğinde emrileri geçici olarak tutabilir.
* **ES — Extra Segment:** DS ve CS’nin yetmediği durumlarda ekstra kullanılan segmenttir.
* **FS — File Segment:** CPU tarafından önceden belirlenmiş bir amacı yoktur. i386 ve sonraki işlemcilerde windows işletim sistemi tarafından iş parçacığı bilgi bloğuna (TIB) işaret etmek için kullanılır.
* **GS — Graphic Segment:** CPU tarafından önceden belirlenmiş bir amacı yoktur. i386 ve sonraki işlemcilerde windows işletim sistemi tarafından iş parçacığına özgü belleğe erişmek için kullanır.

**2.Emir Kuyruğu (Instruction Queue):**

BIU emir kuyruğu olarak bilinen bir mekanizma kullanarak pipeline mimarisini yerine getirir. Alınan emirler FIFO(first-in first-out) mantığıyla çalışan bir kuyrukta tutulur. EU birimi sıradaki emrin icrası için hazır olduğunda kolayca BIU’daki bu kuyruktan sıradaki emri okur.

![](https://cdn-images-1.medium.com/max/800/0*5HINjHYeweY7DKic)

pipeline mimarisi

**3. Emir İşaretçisi (Instruction Pointer-IP):**

16-bitlik bir kaydedicidir. kod segmentteki sıradaki emrin 16-bitlik offsetini tutar. BIU; IP ve CS registerlarını kullanarak bellekten getirilecek emrin 20 bitlik adresini üretir.

**4. Adres toplama bloğu(The Address Summing Block):**

Bellek adreslerini üretmek için kullanılır. Örneğin; bir sonraki emrin 20-bitlik adresini oluşturmak için IP kaydedicisinde bulunan 16-bitlik ofset adresi ile CS kaydedicisinde bulunan kod segment adresini birleştirir.

Bunun gibi; CS:IP, SS:SP, SS:BP, DS:BX, DS:SI, ES:DI, DS:DI birleştirmeler yaparak 20 bitlik adres üretir.

#### İcra Birimi (EU)

Emirlerin kodunun çözüldüğü ve icra edildiği birimdir.

Görevleri:

* Emirleri çözmek(decode)
* Emirlerin icrasını sağlamak(execute)
* Sonucu BIU’ya döndürmek

Ana Bileşenleri:

**1.Kod Çözücüsü(Instruction Decoder):**

Bellekten gelen emirleri çözerek icra birimi tarafından yerine getirilen bir dizi harekete dönüştürür.

**2. Kontrol Sistemi:**

İşlemcinin iç operasyonlarını gerçekleştirmesi için zamanlama ve kontrol sinyallaerini üretir.

**3. ALU:**

Daha öncede bahsettiğimiz gibi aritmetik ve lojik işlemlerden sorumlu birim.

**4. Genel Amaçlı Kaydediciler:**

EU, birçok genel amaçlı registera sahiptir. 32-bitlik, 16-bitlik, 8-bitlik olmak üzere 3 kategoriye ayırabiliriz. 32 -bit olmayan işlemciler E ile başlayan(extended genişletilmiş anlamında) 32-bitlik registerları desteklemez.

![](https://cdn-images-1.medium.com/max/800/0*pzTX1-e1-p0u4LXW)

Genel Amaçlı Kaydediciler

16-bitlik kaydediciler, 8-bitlik türevlerinin birleşiminden oluşmuşlardır. Örneğin; AX kaydedicisi AH ve AL kaydedicilerinin birleşiminden ibarettir. AX’in ilk 8-bitini AH kaydedicisi son 8-bitini AL kaydedisicisi tutar. H-high, L-low anlamındadır. Aynı şekilde bu BX, CX, DX kaydedicileri için de geçerlidir.

Çok amaçlı kaydediciler genelde adlarına has işlemlerde kullanılır:

* **AX kaydedicisi (accumulator):** Akümülatör adıyla bilinen bu kaydedici verilen ele alınmasında başrol oynar. Aritmerik işlemlerde ve bazı I/O işlemlerinde etkin bir şekilde kullanılır.
* **BX kaydedicisi (base):** Taban adres kaydedicisi olarak bilinen kaydedici, bellekteki veri gruplarının ofset değerlerinin tutulmasında kullanılır.
* **CX kaydedicisi (count):** Sayaç kaydedicisi olarak bilinir özellikle döngülerde döngü değişkeni olarak kullanılır.
* **DX kaydedicisi (data):** Veri kaydedicisi genellikle akümülatöre destek olan ve bütün işlemlerde bir tampon gibi davranan kaydedicidir.

**5. İşaretçi ve İndis Kaydedicileri:**

Mikroişlemcili sistemlerde bellekteki ara adresleri gösteren kaydedicilere işaretçi (pointer) adı verilir. X86 mimarisinde bulnan işaretçi ve indis kaydedicileri:

* DI — destination-index
* SI — source-index
* SP — stack-pointer
* BP — base-pointer
* IP — instruction pointer

Bu kaydediciler 16-bitliktir. E ile başlayan genişletilmiş 32-bitlik türevleri de i386 üstü işlemcilerde desteklenir.

Kod segmentte bulunan bir komutun yerinin belirlenmesinde CS kaydedicisine ofset değerini bulmada IP-instruction pointer yardımcı olur. CS:IP çifti, kod segmentteki işlenecek bir sonraki komutun adresini verir.

Yığın segmentindeki bir verinin yerinin belirlenmesinde SS kaydediciyle birlikte SP ya da BP kaydedicisi yardımcı olur. SS:SP çifti, yığın segmentteki boş bir alanın adresini verir.

DS ve SI kaydedicileri adres indislemesi işlemlerinde kullanılmaktadır. Bu indis kaydedicilerine string ve dizi işlemlerinde ihtiyaç duyulur. DS:SI çifti string komutlarının adresini verir.

**6.Bayrak Kaydedicisi:**

Bayrak kaydedicisi, bir işlemin sonunda sonucun ne olduğunu kaydedici bitlerine yansıtan bir bellek hücresinden oluşur. Yapılan aritmetik işlemler X86 mimarisinde mevcut bulunan bayrakları etkiler. 6 durum ve 3 kontrol olmak üzere toplam 9 bayrak vardır

![](https://cdn-images-1.medium.com/max/800/0*ROPSMM_4v9sB0bPB)

Flag Register

6 durum bayrağı:

* **Elde Bayrağı (CF-Carry Flag):** Elde bitini tutar.
* **Eşlik Biti (PF-Parity Flag):** Eşlik bitini tutar.
* **Yardımcı Elde Bayrağı (AC-Auxilary Carry):** 3.bitten bir fazlalık olursa setlenir. CF ile aynı işi yapar.
* **Sıfır Bayrağı (ZF-Zero Flag):** işlem sonucu 0 ise setlenir.
* **İşaret Bayrağı (SF-Sign Flag):** negatif sayılar için 1 pozitif sayılar için 0'dır.
* **Taşma Bayrağı (OF-Overflow Flag):** işlem sonucunda taşma meydana gelirse setlenir.

3 kontrol bayrağı:

* **Tuzak Bayrağı (TF-Trap Flag):** Hata ayıklama işlemlerinde(debug) komutların adım adım yürütülmesi maksadıyla kullanılır.
* **Kesme Bayrağı (IF-Interrupt Flag):** sisteme bağlı diğer işlemelrden gelen kesme taleplerine izin verir.
* **Yön Bayrağı (DF- Direction Flag):** hafrdizi(string) işlemlerinde indis kaydedicisinin ileri veya geri hareket etmesini sağlar.

---

Bu yazımda temel ve programlamaya dayalı X86 tabanlı mikroişlemci mimarisinden bahsettim. Assembly ile program yazabilmek için kullandığınız işlemcinin mimarisini bilmek zorundasınız. X86 ailesinde de daha ilkel işlemcilerden şimdiki gelişmiş işlemcilere mimari olarak pek çok değişiklik olmuştur. Burda mimariyi genel olarak ele almaya çalıştık.