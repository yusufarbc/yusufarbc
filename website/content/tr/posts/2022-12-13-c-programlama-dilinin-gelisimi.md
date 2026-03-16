---
date: '2022-12-13'
description: Programlama bir bilgisayara yürütmesi için bir dizi talimat vermektir. Bilgisayar verilen talimatları sıra ile yürütür. Bir bilgisayarı programlamak için ilk bilgisayarlardan itibaren çeşitli yöntemler kullanılmıştır.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*LNiEJoSd69b4K-ABg14OYw.png
title: C Programlama Dilinin Gelişimi
type: posts
---

### C Programlama Dilinin Gelişimi



### **Programlama Dili Nedir?**

Programlama bir bilgisayara yürütmesi için bir dizi talimat vermektir. Bilgisayar verilen talimatları sıra ile yürütür. Bir bilgisayarı programlamak için ilk bilgisayarlardan itibaren çeşitli yöntemler kullanılmıştır.

Programlama dilleri, bilgisayarların izleyeceği talimatları yazmak için kullandığımız araçlardır. Bilgisayarlar ikili olarak düşünür yani 1'ler ve 0'lardan oluşan diziler ile işlemlerini gerçekleştirir. Programlama dilleri, 1'leri ve 0'ları insanların anlayabileceği ve yazabileceği bir şeye çevirmemizi sağlar. Bir programlama dili, insanların düşüncelerimizi bilgisayarların anlayabileceği talimatlara çevirmesini sağlayan bir köprü görevi gören bir dizi sembolden oluşur. Bu sembollerden oluşan cümleler derleyici aracılığıyla makine koduna(ikili koda) çevrilir.

![](https://cdn-images-1.medium.com/max/800/1*JTvQeZhMZ--8BDeKaABmKw.jpeg)

Derleyicinin Görevi

### Programlama Dillerinin Sınıflandırılması

Gelişen teknoloji ile günümüzde pek çok farklı uygulama türü ortaya çıkmıştır ve programlama dilleri bu uygulama türlerine göre özelleşmiştir. Programlama dillerinin bir listesine [buradan](https://tr.wikipedia.org/wiki/List_of_programming_languages) ulaşabilirsiniz.

Örnek olarak;

* web uygulaması geliştirmek için PHP, JavaScript.
* mobil uygulama geliştirmek için kotlin, swift.
* yapay zeka uygulamaları geliştirmek için Python, R.
* sistem programı geliştirmek için C, C++.

verilebilir. Peki her işe yarayan tek bir programlama dili var mıdır? Bilgisayar programları bu kadar çeşitli iken her işte iyi olan bir dil geliştirmek oldukça zor olsa gerek.

Programlama dillerini, insan diline ve makine diline yakınlıklarına göre sınıflandırabiliriz. Bu görselde programlama dili, üste çıkıldıkça konuşma diline, aşağı indikçe makine diline yaklaşır.

![](https://cdn-images-1.medium.com/max/800/1*ezQx18YckMStFClue9R1qg.jpeg)

Programlama Dillerinin Sınıflandırılması

### C Programlama Dili

C çoğunlukla orta seviye dili olarak bilinse de; bu onun diğer dillerden daha az güçlü, daha az kullanışlı olduğu anlamına gelmez. Böyle adlandırılmasının sebebi hem assembly dili gibi düşük seviyeli dillerin hem de C#, Pascal gibi yüksek seviyeli dillerin sahip olduğu fonksiyonlara sahip olmasındandır.

C bugün üst düzey profesyonel programcıların kullandığı bir sistem dilidir. C’nin en belirgin özelliği işaretçilere(pointer), kelimelere(word), bit ve baytlara doğrudan doğruya erişime izin vermesidir. Bu durum C’nin sistem programlarının yazımında -gömülü sistemlerde- kullanılabilmesine olanak tanır.

C’nin diğer üstün yanı da anahtar sözcük sayısının az olmasıdır. Bir dilde anahtar sözcükler çok önemlidir. Örneğin; Basic’te 159 adet anahtar sözcük varken bu sayı C’de sadece 27'dir.

Sonuç olarak C programcıya neye ihtiyaç duyuyorsa onu yapabilme imkanı veren profesyonel programcıların kullandığı bir dildir. Programcı C’yi kullanarak inanılmaz programlar yapabilir. Bu inanılmaz programlardan biri de işletim sistemidir.

### C dilinin Tarihi

İşletim sistemi yazılımları geliştirmek amacıyla önce BCPL dili, ardından da B dili kullanıldı. BCPL 1967 yılında geliştirildi ancak bu dilin yetersizlikleri 1970 yılında B dilinin geliştirilmesine neden oldu. Gerek BCPL dilinde gerekse de B dilinde veri türü kavramı yoktur. Unix işletim sistemi önceleri B dili ile yazıldı. Ancak B dili işletim sistemi yazılımını gerçekleştirmek için yeterli olmadı. Bunun üzerine 1972 yılında, UNIX işletim sisteminde kullanılan DEC PDP-11 bilgisayarları üzerinde [Dennis Ritchie](https://en.wikipedia.org/wiki/Dennis_Ritchie) tarafından C programlama dili geliştirildi. C dilinde birçok veri türü vardır. UNIX işletim sisteminin geliştirilmesinde C dili başarılı bir şekilde kullanılmıştır.

Daha sonraki yıllarda C dili işletim sistemi dışında da kullanılır hale geldi. Özellikle mühendislik çalışmalarında ve bilimsel uygulamalarda kullanıldı. C çevrebirimleri, kaynak kodu seviyesinde ve makine diline uyarlamasında çok iyi olmasına karşın, bu dönemde standartların olmayışı olumsuz bir durumdu. Pek çok C türü türemişti ve hepsinin sözdiziminde farklılıklar vardı. Bu durumu düzeltmek için ANSI(American National Standarts Institue) 1983 yılında bir kurul oluşturarak C için bir stansart hazırladı. Bu kurul C derleyicisinde bulunması gereken fonksiyonalrı başka bir söyleyişle standart kütüphane fonksiyonlarını belirlemiştir.

### Programlamaya Giriş

C Programlamaya giriş yaparken her programlama dilinde olduğu “hello world” programından başlıyoruz. Bu programdan dilin sözdizimi(syntax) hakkında bir fikir edinebiliriz.

```
#include <stdio.h>  
#include <stdlib.h>  
  
int main()  
{  
    printf("Hello world!\n");  
    return 0;  
}
```

C program yapısına baktığımızda;

* ilk bölümde kütüphane ekleme olduğunu görüyoruz. Bir C programnının en başında programda kullanılacak fonksiyonlara ait kütüphanelerin eklenmesi gerekir. Örneğin; ekranda bir mesaj gösterilecekse bunun için gerekli olan fonksiyon printf() fonksiyonu olup bu fonksiyonun da içinde yer aldığı <stdio.h> kütüphanesi #include<stdio.h> şeklinde en başa eklenmelidir.
* ikinci bölümde main() fonksiyonunu görmekteyiz. Bu komut programın başladığı yeri gösterir. main() fonksiyonu iki kısımdan oluşur. fonksiyon tanımı ve fonksiyon gövdesi.  
  - int main(): fonksiyon tanımı  
  -{} süslü parantezler arası: fonksiyon gövdesi  
  Fonksiyon tanımında fonksiyonun ismi ve giriş-çıkış türleri belitrilir. Fonksiyon gövdesinde ise istenilen işlemleri yapmak ve bunların sonuçlarını görmek için gerekli deyimler bulunur.
* return() deyimi, fonksiyonun işinin bittiğini gösterir. Program bu fonksiyondan çıkarak kendini çağıran satıra geri döner.

Bu yazımızda C dilinin gelişimine bir göz attık. Nasıl doğduğuna, neler getirdiğine ve nasıl kullanıldığına değindik. Bundan sonraki aşamada programlama tarafında devam etmek için [bu siteye](https://www.tutorialspoint.com/cprogramming/index.htm) göz atabilirsiniz.