---
date: '2021-07-01'
draft: false
title: Asenkron Programlama
---

---

### Asenkron Programlama

![](https://cdn-images-1.medium.com/max/800/0*DH7q_354Ghtgzp3H.jpg)

Bu yazımda, birçoğumuzun anlamakta zorlandığı asenkron programlama konusunu anlatmaya çalışacağım. Python dilinde async-await yapılarıyla bilinen bu programlama türü nedir? Ne işe yarar? Nasıl kullanılır? Hep beraber bakalım.

### Asenkron programlama nedir?

Asenkron programlama, bir uygulamada ana akışta meydana gelebilecek gecikmelerde akışın bloklanmamasını ve devam etmesini sağlayan programlama türüdür. Bu yüzden bloklanmayan kod diyoruz.  
Senkron(sıralı) programlamada bir işlem sonuçlanmadan diğer bir işleme başlanamaz. Asenkron programlamada ise bir işlem sonuçlanmadan diğer bir işlem başlayabilir. Bu bizi özellikle yüksek bekleme sürelerinin olduğu API işlemlerinde, programımızın bloke olmasından kurtarır.

### Senkron ve Asenkron arasındaki fark

Senkron(synchronous ) yani eşzamanlı programlama, işlemleri sırayla yaptırdığımız programlama türüdür. Bir işlem bitmeden diğerine geçilmez veya sırada olan işlem atlanmaz.

Asenkron(asynchronous ) yani eşzamansız programlama ise birden çok işlemin aynı anda yürütülmesi prensibiyle çalışır. İşlemler herhangi bir sıraya alınmadan, diğer işlemlerden bağımsız şekilde yürütülür.

![](https://cdn-images-1.medium.com/max/800/0*1mtD1Dvr0zhe2FMH.png)

API, veritabanı gibi sistemlere aynı anda birden çok işlemin erişmesi sorunlar yaratabilir. Örneğin, veritabanında iki işlem aynı veriyi aynı anda güncellemeye çalışabilir. Bunun sonucunda, hatalar ortaya çıkabilir. Bu yüzden API ve veritabanı erişimlerinde işlemler kuyruğa alınır yani **senkronize** edilir.

Senkron yazılmış bir masaüstü uygulamasında veya bir mobile uygulamada, bir butona basıldığında uzun işlemler yapılacaksa, işlem bitene kadar program bloke olur. Bu yüzden butona basılınca yapılacak işlemler **asenkronize** edilir, farklı akışlarda( thread) yürütülür. Bunun sayesinde, program arka planda işlemleri yaparken bloke olmaz, diğer butonlar da çalışabilir.

Program yürütülürken senkron ve asenkron işlemlerin işlemciye iletilmesi, bellekte tutulması gibi işlemleri işletim sistemi yönetir. İşletim sisteminin bu işlemleri nasıl yürüttüğü detayına girmeyeceğim. Asenkron programlama sayesinde işlemci http protokolüyle bir I/O işlemi yaptığında bloklanmaz, halletmesi gereken işleri yapmaya devam eder.

### API ile kullanımı

Asenkron programlama API erişimlerinde çok sık kullanılır. Bu yazımda örnek olarak discord’un API’sine erişeceğim ve bu API ile işlemler yapacağım.

![](https://cdn-images-1.medium.com/max/800/0*nQM6utN7rsQyrkQG.png)

Yukarıda ki python kodunda gördüğünüz gibi fonksiyonların başında “ **async** “ anahtar kelimesi var. Bu kelime fonksiyonu senkronize eder ki discord API’si de bunu zorunlu tutar. Bu kelimeyi yazmadığınız taktirde kodunuz çalışmaz. Peki bu senkronizasyon işlemi nedir?

Senkronizasyon işlemi, asenkron işlemleri kuyruğa alır, yani işlemleri sıralar. Senkronize edilmiş bir fonksiyon çağırıldığında kuyruk yapısı oluşturulur. Fonksiyon çağırıları bu kuyruğa alınır ve sırayla yürütülür. API erişimlerinde işlemlerin kuyruğa alınması çok önemlidir, aynı anda birden çok işlemin API’ye erişmesi sorunlar doğurabilir.

Peki, bizim yazdığımız program API’den cevap gelinceye kadar boş mu bekleyecek? Böyle olduğu taktirde, programımız bloke olur ve API’den cevap gelinceye kadar hiçbirşey yapamazdı. Bu noktada “ **await** “ anahtar kelimesi devreye giriyor. API’den gelen cevabı bekleyecek olan işlemlerin başına “await” anahtar kelimesini yazarız ki API’den cevap gelinceye kadar geçecek sürede programımız bloke olmasın, başka işlemleri yapmaya devam etsin.

![](https://cdn-images-1.medium.com/max/800/0*8LjK86AP9OU2d4QV.png)

Eğer “await” anahtar kelimesi yazılmayıp, bu işlem senkron olarak yapılsaydı, programımız discord sunucusuna talebi gönderir, cevap alıncaya kadar bekler ve cevap alınca sıradaki yeni talebi gönderirdi. Asenkron yaptığımızda ise bir yandan sırayla talepler gönderilirken diğer yandan sırayla cevaplar alınıyor. Bu yönüyle, senkron işlemi tek yönlü bir yola, asenkron işlemi çift yönlü bir yola benzetebiliriz. Senkron işlemde yol tek şeritli ve tek yön olduğu için paket giderken karşıdan başka bir paket gelemiyor, asenkron işlemde ise çift yönlü yolda paketler birbirinden bağımsız olarak gidip gelebiliyor.

Konunun anlaşılabilmesi için basit bir şekilde anlatmaya çalıştım, diyagramlarla ve kod örneğiyle destekledim. Umarım faydalı olmuştur. Okuduğunuz için teşekkür ederim.