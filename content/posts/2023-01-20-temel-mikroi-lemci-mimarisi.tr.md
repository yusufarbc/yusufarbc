---
title: "Temel Mikroişlemci Mimarisi"
date: 2023-01-20
draft: false
---

---

### Temel Mikroişlemci Mimarisi

![](https://cdn-images-1.medium.com/max/800/1*eBP9qyGpkYsx-Zgy3Jvsqg.png)

### Mikroişlemci Nedir?

Mikroişlemci, bir bilgisayarın merkezi işlem birimi gibi çalışır. Bilgisayarın hayati fonksiyonlarını yürütür. Bir mikroişlemcinin fonksiyonel konfigürasyonunu ise:

* Kaydediciler
* Komut kod-çözücüsü
* Aritmetik ve Mantık birimi
* Frekans üreteci
* Zamanlama ve Kontrol elemanları

oluşturur. Görüldüğü gibi mikroişlemci birçok bölümden meydana gelmiş bir yapıyı temsil eder.

![](https://cdn-images-1.medium.com/max/800/0*3j-qADs2-A3sg6Jz)

standart bir mikroişlemci mimarisi

Bilgisayarın kalbi ve beyni olarak adlandırılan mikroişlemciler aynı zamanda Merkezi İşlem Birimi (CPU) olarak anılırlar. CPU genel olarak aşağıdaki işlemleri yapar:

* Bellekten komut alıp getirir
* Komutun kodunu çözer
* Sistemdeki tüm elemanlar ve birimlere kontrol sinyalleri sağlar
* Aritmetik ve Mantık işlemlerini yürütür
* Diğer donanım birimlerinden gelen taleplere cevap verir

Bir mikroişlemcinin mimari yapısı en basit şekilde ifade edilmek istenirse, bir grup kaydedici, Aritmetik Mentık Birimi ve bir de sistemin ne zaman hangi işi yapcağını denetleyen Kontrol Biriminden meydana gelmektedir.

#### Kaydediciler (registers)

İşlemcide bir program yürütülürken, işlemcinin içerisinde yani yanı başında kaydedicilere (registers) ihtiyaç duyulur.

![](https://cdn-images-1.medium.com/max/800/0*0vAWs-tWxevtC27o)

Kaydediciler

Kaydediciler mikroişlemci mimarisinde önemli bir yer tutar ve doğrudan işlemci mimarisini belirleyen elemanlardan birisidir. Kaydediciler, verinin manevrasında ve geçici olarak tutulmasında birinci dereceden görevlidirler.

#### Aritmetik ve Mantık Birimi (ALU)

ALU, mikroişlemcide aritmetik ve mantık işlemlerinin yapıldığı en önemli birimlerden birisidir. Bu birime giriş işlemleri, akümülatör kaydedicisiyle bellekten alınan veri arasında veya akümülatörle diğer kaydediciler arasında olabilir.

![](https://cdn-images-1.medium.com/max/800/0*42MUW3fUda9LsAzC)

ALU

ALU’da gerçekleşen bütün işlemler kontrol sinyalleri vasıtasıyla Kontrol Biriminin gözetiminde eşzamanlı olarak yapılır. ALU, instruction(emir) ve verileri (operand) alır ve emri bu veriler üzerinde gerçekleştirir.

#### Kontrol Birimi

Merkezi İşlem Biriminin üçüncü bölümünü meydana getiren bu kısım, sistemin tüm işleyişinden ve işlemin zamanında yapılmasından sorumludur. Kontrol birimi, bellekte program bölümünde bulunan komut kodunun alınıp getirilmesi, kodunun çözülmesi, ALU tarafından işlenmesi ve sonucun alınıp belleğe geri konulması için gerekli olan kontrol sinyallerini üretir. Bilgisayar sisteminde bulunan dahili ve harici bütün elemanlar bu kontrol sinyalleri ile denetlenir.

![](https://cdn-images-1.medium.com/max/800/0*x0gYM5EH_2agDzdP)

Control Unit

Basit bir mikroişlemcide bu bölüm üç değişik işlevi yerine getirir:

1. **Zamanlama Kontrolü:** İşlemci, harici saat sinyali üreten bir birimden giriş alan iç-saat devresine sahiptir. Bu sinyal alınarak talebe göre zamanlama sinyallerine çevrilerek sisteme dağıtılır.
2. **Komut kod-çözücüsü:** Bu devre komut kaydedicisinde (IR) tutulan komutları yorumlar ve ALU’ya kaydedicilerle çalışması için uygun sinyaller gönderir. (kastedilen zamanlama ve kesme sinyalleri)
3. **Kesme mantık birimi:** Bu birim de diğer kontrol elemanlarına benzer. Gerekli durumlarda kesme sinyallerini alarak işlemciyi uyarır.