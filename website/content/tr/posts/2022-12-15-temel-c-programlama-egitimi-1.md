---
date: '2022-12-15'
description: Bu yazımda ilk haftasını tamamladığımız Temel C Programlama Eğitiminin notlarını ve alıştırma sorularını paylaşacağım. C dilinin gelişimini ve sözdizimini anlattığım bir önceki yazıma buradan erişebilirsiniz.
draft: false
layout: single
title: 'Temel C Programlama Eğitimi #1'
type: posts
---

### Temel C Programlama Eğitimi #1

Bu yazımda ilk haftasını tamamladığımız Temel C Programlama Eğitiminin notlarını ve alıştırma sorularını paylaşacağım. C dilinin gelişimini ve sözdizimini anlattığım bir önceki yazıma [buradan](https://medium.com/@yusufarbc/c-programlama-dilinin-gelişimi-24ec503f108a) erişebilirsiniz.

### Tanımlamalar

ilk dersimizde C diline giriş yaptık, temel tanımlamalara değindik.

#### Değişken & Sabit Tanımlama

Değişenler ve Sabitler verileri tutmak için kullandığımız bileşenlerdir. Bu bileşenleri tanımlarken dikkat etmemiz gereken nokta değiken veya sabitin kabul ettiği veri türüdür. Standart C dilinde 5 çeşit veri türü vardır:

* int — tam sayı değerleri için kullanılır.
* float — ondalıklı sayı değerleri için kullanılır.
* double — büyük ondalıklı sayı değerleri için kullanılır.
* char — karakter değerleri için kullanılır.
* void — türü olmayan demektir.

Bu veri türlerini kullanarak değişkenler tanımlayabiliriz:

```
int a = 5;            // integer türünde a isminde '5' değerinde bir değişken  
float b = 7.5;        //float türünde b isminde '7.5' değerinde bir değişken  
char c = 'a';         //char türüne c isminde 'a' değerinde bir değişken  
double d = 8965.3645; //double türünde d isminde '8965.3645' değerinde bir değişken
```

bu veri türleri ile sabit tanımlamak istiyorsak tek yapmamız gereken değişken tanımlamasının başına ‘const’ anahtar kelimesini getirmek.

```
const int a = 5;            // integer türünde a isminde '5' değerinde bir sabit  
const float b = 7.5;        //float türünde b isminde '7.5' değerinde bir sabit  
const char c = 'a';         //char türüne c isminde 'a' değerinde bir sabit  
const double d = 8965.3645; //double türünde d isminde '8965.3645' değerinde bir sabit
```

Sabitler, değişkenlerden farklı olarak programın çalışma zamanı boyunca aynı değerde kalırlar. Tuttukları değer program akışında değiştirilmeye çalışılırsa hata veririler.

#### Dizi Tanımlama

Dizilerin tanımlaması da değişkenlere oldukça benzerdir. Aslında diziler aynı türde birden fazla değişken tutan yapılardır. Örneğin int türünde bir dizi; içinde integer değişebilen değerler tutar.

Dizileri tanımlarken en önemli nokta dizi boyutunun belitirtilmesidir. Program çalıştırıldığında bu dizi boyutuna göre bellekten yer talep eder ve programın çalışma zamanı boyunca bu boyut değişmez.

Dizileri iki şekilde tanımlayabiliriz. Bunlardan biri boyutunu belirterek diğeri alacağı değerleri belirterek:

```
int dizi1[10];            //10 elemanlı integer türünde bir dizi.  
  
int dizi2[] = {1,2,3,4}   //4 elemanlı integer türünde bir dizi.
```

Dizilerin elemanlarına erişmek için köşeli parantezler içine erişeceğimiz elemanın indisini yazarız. Bir elemanın indisi, o elemanın dizide kaçıncı sırada olduğunu belirten sayıdır. Bir dizinin ilk elemanı 0.indistedir, her bir eleman eklendiğinde bir sonraki indis değerini alır.

```
sayi1 = dizi2[0];  //dizi2'nin ilk elemanını sayi1'e atar  
sayi2 = dizi2[1];  //dizi2'nin ikinci elemanını sayi2'e atar  
sayi3 = dizi3[2];  //dizi2'nin üçüncü elemanını sayi3'e atar  
sayi4 = dizi4[3];  //dizi2'nin dördüncü elemanını sayi4'e atar
```

Bir önceki örnekte tanımladığımız dizi2 isimli dizinin elemanlarını yukarıdaki gibi erişebiliriz.

char değişken türüyle sadece tek bir karakter alabiliyorduk. Bir kelime almak için karakter dizilerine ihtiyacımız var.

```
char str1[20]; //20 karakterlik bir karakter dizisi(string) tanımı  
  
  
char str2[] = "string ifadesi"; //değeri belli karakter dizisi(string)
```

#### printf() & scanf() fonksiyonları

C diliyle konsol uygulamaları yaparken kullanıcıyla etkileşim kurmak için kullandığımız iki fonksiyondur. printf() kullanıcıya bir mesaj döndürmek için scanf() ise kullanıcından bir değer almak için kullanılır.

```
printf("Hello World\n");
```

printf ile çift tırnaklar içinde istediğimiz mesajı kullanıcıya döndürebiliriz. Sondaki ‘\n’ ifadesi konsolda alt satıra geçmek için kullanılır.

Eğer bir değişkenden geleni konsol ekranını bastırmak veya konsoldan bir değer almak istiyorsak belirleyicilere (specifiers) ihtiyacımız var. Bunlardan bazıları:

* %d : integer değerler için kullanılır.
* %f : float değerler için kullanılır.
* %lf : double değerler için kullanılır.
* %c : char değerleri için kullanılır.
* %s : string değerleri için kullanılır.
* %x : hexadecimal değerleri için kullanılır.

Bu belirleyicileri kullanarak kullanıcıdan girdi alıp çıktı verebiliriz:

```
int sayi;  
printf("Bir sayi giriniz: ");  
scanf("%d", &sayi);  
printf("Girilen sayi %d'dir", sayi);
```

Burada dikkat etmemiz gerekenler;  
scanf() fonksiyonunda değerin atanacağı değişkeni belirtirken ‘&’ işareti koymak ve belirleyicilerin her iki fonksiyon içinde ilk parametrede ve çift tırnak içinde kullanmak.

```
char[20] isim;  //20 karakterlik isim adında bir karakter dizisi tanımı  
printf("isminizi giriniz: ");
```

Yukarıdaki örnekte kullanıcıdan bir karakter dizisi(string) alıp bu değeri mesaj içinde kullanıcıya döndüren bir program yazılmıştır.

### Koşul Yapıları

ikinci derisimizde koşul yapılarına değindik ve nu yapılarla ilgili örnekler yaptık. C diline üç tip koşul ifadesi vardır. Bu koşul ifadelerinde karşılaştırma operatörleri ve mantıksal operatörler kullanılır.

Karşılaştırma operatörleri:

* == — eşitse
* != — eşit değilse
* > — büyükse
* < — küçükse
* < = — büyük eşitse
* > = — küçük eşitse

Mantıksal operatörler:

* && — ve
* || — veya
* ! — değil

#### if-else yapısı

if else yapısı, koşul ifadelerini tanımlamak için kullanabileceğimiz yapılardan biridir. Her zaman *if* deyimiyle başlar, koşulun sağlanmadığı durumda varsa *else* durumuna düşer. Birden fazla koşul tanımlamak için *else if* ifadesi kullanılabilir.

```
if(a==b){  
  printf("a ve b esit");  
}else if(a>b){  
  printf("a, b den buyuk");  
}else{  
  printf("a, b den kucuk");  
}  
printf("kosulun disi);
```

Eğer if koşulu sağlanırsa koşul içindeki deyimler yürütülür ve program akışı koşul ifadesinin dışından devam eder. Eğer *if* koşulu sağlanmaz ise sıradaki *else if*’de bulunan koşula bakar(eğer varsa), hiçbir koşul sağlanmaz ise *else*’e düşer(eğer varsa).

#### switch-case yapısı

switch-case yapısı çoklu durumlarla baş edebilmek için geliştirilmiş bir yapıdır.

```
int sayi;  
printf("Bir sayi giriniz: ");   
scanf("%d", &sayi);  
  
switch(kosul){  
  case 1:  
    printf("1 sayisi girildi");  
    break;  
  case 2:  
    //break koymadığımız için case3 ile çalıştırmaya devam eder.  
  case 3:  
    printf("2 veya 3 sayisi girildi");  
    break;  
  case 4:  
    printf("4 sayisi girildi");  
    //break ifadesi koymadığımız için default da çalışır  
  default:  
    printf("tanimlanmamis sayi");  
}
```

Verilen koşul değişkeninin değerine göre uygun olan *case* içindeki deyimleri çalıştırır. Bu koşul değişkeni sadece *int* ve *char* türünde olabilir. deyimlerin çalıştırılması *break* ifadesi görene kadar devam eder. Yani, *break* olmadığı sürece program diğer *case*lerde bulunan deyimleri çalıştırmaya devam eder.

#### ternary operator

ternaty operator, tek satırda hızlı ve kısa kosul ifadeleri tanımlamak icin kullanılır

```
(a==b)?printf("a ve b eesittir"):printf("a ve b esit değildir");
```

parantezler içine koşul yazılır ardından bir soru işareti konur. soru işaretinden sonra gelen bölüm koşul doğruysa çalıştırılacak bölümdür. Bu bölümden sonra iki nokta konur. Sonraki bölüm ise koşul yanlışsa çalışır.

### Alıştırma Soruları

#### soru-1

Verilen iki sayının toplamını konsol ekranında gösteren bir C programı yazınız.

#### soru-2

Kullanıcıdan alınan iki sayı ile dört işlemi yerine getiren ve konsol ekranında sonuçları gösteren bir C programı yazınız.

#### soru-3

İki kenar uzunluğu verilen bir dikdörtgenin alanını hesaplayıp ekrana yazan bir C programı yazınız.

#### soru-4

Kullanıcıdan alınan 3 sayıdan en büyüğünü bulan C programını yazınız.

#### soru-5

Klavyeden girilen bir işlem kodu ve iki sayıya göre dört işlem arasında belirtilen işlemi yapan ve sonucu ekrana bastıran bir C programı yazınız.

#### soru-6

Bir derse ait üç farklı not değerinin ortalamasını hesaplayın, sonuc 50'den küçükse kaldınız büyükse geçtiniz yazan bir C programı yazınız.

#### soru-7

Kullanıcıdan 3 sayı alınız. switch yapısı kullanarak 1 girdiğinizde birinci sayının karesini 2 girdiğinizde ikinci sayının karesini, 3 girdiğinizde 3.sayının karesini hesaplayan bir C programı yazınız.