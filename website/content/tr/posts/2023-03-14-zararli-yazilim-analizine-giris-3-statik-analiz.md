---
date: '2023-03-14'
description: Bir önceki yazımda analiz ortamının hazırlanmasından bahsetmiştim. Bu yazımda ise kurduğumuz ortam ile bir zararlı yazılımın statik analizini yapmaya çalışacağız. Statik analiz yöntemlerine ve ilgili araçlar bu yazıda!
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*uStJb6CCMfH5-GAZXQbcOA.png
layout: single
series:
- Zararlı Yazılım Analizine Giriş
title: 'Zararlı Yazılım Analizine Giriş: #3 Statik Analiz'
type: posts
---

### Zararlı Yazılım Analizine Giriş: #3 Statik Analiz



Bir önceki yazımda analiz ortamının hazırlanmasından bahsetmiştim. Bu yazımda ise kurduğumuz ortam ile bir zararlı yazılımın statik analizini yapmaya çalışacağız. Statik analiz yöntemlerine ve ilgili araçlar bu yazıda!

### Statik Analiz Yöntemleri

Statik analiz, dinamik analiz olarak bilinen, yürütme ve davranışını analiz etmenin aksine, bir zararlı yazılımın yürütülmeden analizidir.

Statik analiz, analiz sürecinde iyi bir ilk adımdır. Bunu kullanarak, bir örneğin zararlı mı yoksa temiz mi olduğunu onu çalıştırmanıza bile gerek kalmadan anlayabilirsiniz. Hatta herhangi bir dinamik analiz yapmanıza gerek kalmadan zararlı yazılımın türünü, ailesini ve amacını bulmaya kadar gidebilirsiniz.

Statik analiz veya dinamik olsun, ilk adım her zaman başkalarının yazılım örneğiniz hakkında herhangi bir düşüncesi veya sonucu olup olmadığını kontrol etmeyi içerir. Çoğu zaman başkaları, örneğinizi veya aynı zararlı yazılım ailesine ait benzer bir örneği zaten analiz etmiş ve analizi hakkında bir blog yazısı yazmıştır. Diğer durumlarda, aynı örnek VirusTotal ve diğer kötü amaçlı yazılım analiz platformlarına girmiş olabilir. Bu konuda internette ararştırma yapabilirsiniz.

Bundan sonraki aşamalarda adım adım analiz tekniklerine değineceğiz.

### Hash değeri

Bir zararlı yazılımın hash değeri daha önce kullanılmışsa o zararlı yazılım ile ilgili pek çok bilgi verebilir.

![](https://cdn-images-1.medium.com/max/800/1*mD_yq3uoXjfXpsRBoQBRWA.png)

Zararlı yazılım öğrneğimizin hash değerini QuickHash aracı ile elde edebiliriz. Bunun dışında pek çok araçta mevcuttur. Bu değeri googleda aratırsak.

![](https://cdn-images-1.medium.com/max/800/1*CUZw8_kVp9UI80lZZDTJqA.png)

Karşımıza bu zararlı yazılım örneği ile ilgili pekçok bilgi çıkıyor. Ayrıca bu hash değerini virustotal üzerinde de aratabilirsiniz.

### Dosya Formatını Tespit Etme

Zararlı yazılımlar farklı dosya biçimlerinde gelir: PE dosyaları, .NET dosyaları, Java dosyaları, Komut dosyaları, JavaScript yazılımı vb. Farklı işletim sistemleri için de yazılmış olabilirler: Linux, Windows, macOS veya Android. Belirli bir işlemci mimarisi için hedeflenmiş olabilirler: x86, x64, PowerPC, arm vb. Analiz ettiğiniz örnek dosyanın türüne ve hedefine bağlı olarak, örnek dosyayı analiz etmek için farklı araçlara ve hatta işletim sistemi kurulumuna veya işlemci türüne ihtiyacınız olabilir.  
İyi bir ilk adım, dosyanın biçimini bulmaktır, çünkü bu, örneğin hedefinin neye benzediği hakkında çok şey gösterir. Bunun için **trid** aracını kulanabiliriz.

Uzantı sahteciliği, dosya adlarının bir parçası olarak sahte uzantılar kullanarak çalışır. Bu teknik, .pdf, .xlsx ve .doc gibi uzantılar olarak tanıyan ve bu nedenle güvenli olduklarını düşünen çoğu kullanıcı kurbanının cehaletinden yararlanır. Saldırganlar, bu uzantıları zararlı yazılım dosya adlarına ekleyerek, kurbanları onları .exe olmayan dosyalar olarak yanlış okumaları için kandırmayı başarır ve temelde onları indirip tıklamaları için kandırır.

### Versiyon Bilgileri

Sistemimizdeki çoğu temiz yazılım ve dosya, Özellikler penceresinin altında, dosyaya sağ tıklayıp Özellikler’i seçerek erişilebilen bir Ayrıntılar sekmesine sahiptir. Ayrıntılar sekmesi, Dosya sürümü, Ürün adı, Ürün sürümü ve Telif Hakkı gibi dosyayla ilgili çeşitli ayrıntıları gösterir.

![](https://cdn-images-1.medium.com/max/800/1*anLorCseI2uGz5rMjPGjqg.png)

Uygulamayı açıklayan iyi tanımlanmış alanlar ve özellikler görmüyorsanız, numuneyi daha fazla araştırmayı garanti edecek şekilde şüpheli olarak değerlendirebilirsiniz. Aynı şekilde, önemsiz görünen veya çok az anlamı olan veya hiçbir anlamı olmayan alan değerleri görürseniz, örneği şüpheli olarak değerlendirebilirsiniz. Özelliklerini ve sürüm bilgilerini açıklamak için gereksiz değerler kullanan temiz uygulamalar görmezsiniz.

### Kod İmza Bilgileri

Belgeleri imzamızla imzaladığımız gibi, dosyaları imzalamak için kriptografik olarak oluşturulmuş, kod imzalama sertifikaları olarak da bilinen dijital anahtarlar kullanılır. Bu kod imzalama sertifikalarını kullanan dosyalar için oluşturulan benzersiz dijital imzalar, dosyanın orijinal yazarına kadar uzanır.

![](https://cdn-images-1.medium.com/max/800/1*g5Jca8N37FnNvWsLyHQo3g.png)

### String Analizi

Zararlı yazılım örnekleri, yazılım programlarından başka bir şey değildir ve oluşturulan son çalıştırılabilir yazılımın bir parçası olarak birçok string içerir. Bu diziler genellikle yazılımın türünü, işlevselliğini ve amacını belirlemek için çok iyi göstergeler olarak hizmet edebilir.

![](https://cdn-images-1.medium.com/max/800/1*xxiRJuUPCO0OXfBg0cty8g.png)

BinText aracı ile dosya içindeki stringleri bulabiliriz ve burdan bilgi edinebiliriz. Bu GOAT dosyası Andreas Marx tarafından oluşturulmuştur. RR’den ROSEGOAT! (23.08.1998) Dosya: ROSE001.COM — 20.000 (4E20h) bayt uzunluk! gibi bilgilere burdan ulaştık.

### YARA Kuralı Oluşturma

YARA, zararlı yazılım araştırmacıları için İsviçre Çakısı olarak tanımlanan bir araçtır. Dosyalara ve genel olarak her türlü arabelleğe karşı kural eşleştirme motorudur. YARA’yı kullanarak, insan tarafından okunabilen stringler ve hatta ikili kalıplar kullanarak kurallar oluşturabilir ve bu kalıpları, dosyalarda ve arabelleklerde eşleştirmek için boolean ifadeler kullanarak birleştirebilirsiniz.

```
rule YARA_example  
{  
      meta:  
          description = "This is just an example"  
      strings:  
          $a = "ROSEGOAT"  
      condition:  
          $a  
}
```

Bu kuralı sample.exe üzerinde çalıştırırsak eşleşme olduğunu görürüz.

![](https://cdn-images-1.medium.com/max/800/1*DPMdAbAOT9U8dwFjbrKy6Q.png)

YARA ile daha detaylı bilgite internet üzerinden ulaşabilirsiniz.

### PE Dosya Başlıkları ve Bölümleri

PE dosya biçimi, bir dizi bölümün izlediği bir başlık içerir. Başlık, dosyanın kendisiyle ilgili meta verileri içerir. Başlığın ardından, dosyanın her biri yararlı bilgiler içeren gerçek bölümleri bulunur. PEview aracı ile bunları görüntüleyebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*i5paAwoi1b4Mar08cmxetA.png)

Yaygın PE bölümleri:

* .**text** bölümü, CPU’nun yürüttüğü talimatları içerir. Diğer tüm bölümler verileri ve destekleyici bilgileri saklar. Yürütülebilen, kodların bulunduğu, tek bölümdür.
* .**rdata** bölümü tipik olarak içe ve dışa aktarma bilgilerini içerir. Bu bölüm, program tarafından kullanılan diğer salt okunur verileri de saklayabilir.
* .**data** bölümü, programın herhangi bir yerinden erişilebilen programın genel verilerini içerir.
* .**rsrc** bölümü, yürütülebilir dosya tarafından kullanılan ve yürütülebilir dosyanın parçası sayılmayan simgeler, resimler, menüler ve stringler gibi kaynakları içerir.

### Disassembly

Makine kodunu assembly diline çevirebilen birçok program olsa da IDA Pro en iyi yazılım diyebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*8mnPSAupPgJ7C7pZWqVjug.png)

IDA pro ücretli bir yazılım ancak IDA freeware isminde ücretsiz bir sürümüde mevcut bu sürümü ile analiz gerçekleştirebilirsiniz.

Bu yazımda, statik analiz yöntemlerine değinmeye çalıştım. Temel olarak statik analiz nasıl yapılır? hangi teknikler kullanılır? bunları anlattım. Sizin bildiğiniz benim değinmediğim başka teknikler var ise yorumlara yazabilirsinniz. Bir sonraki yazımda dinamik analiz yöntemlerinden bahsedeceğim.