---
title: "C Programlama Temelleri"
date: 2023-01-21
draft: false
---

---

### C Programlama Temelleri

![](https://cdn-images-1.medium.com/max/800/1*wb7CfskOL2Lhc26j2XpbTQ.png)

### Syntax Nedir?

Türkçe anlamı söz dizimi olan ingilizce bir sözcüktür. Programlamada kullanılan dilin kurallarının tamamına syntax denir. Bu yazıda, C dilinin sözdizimine(syntaxına) değineceğiz.

---

### Tanımlar

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

```
Dizilerin elemanlarına erişmek için köşeli parantezler içine erişeceğimiz elemanın indisini yazarız. Bir elemanın indisi, o elemanın dizide kaçıncı sırada olduğunu belirten sayıdır. Bir dizinin ilk elemanı 0.indistedir, her bir eleman eklendiğinde bir sonraki indis değerini alır.
```

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

---

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
  
switch(sayi){  
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

ternaty operator, tek satırda hızlı ve kısa kosul ifadeleri tanımlamak icin kullanılır.

```
(a==b)?printf("a ve b eesittir"):printf("a ve b esit değildir");
```

parantezler içine koşul yazılır ardından bir soru işareti konur. soru işaretinden sonra gelen bölüm koşul doğruysa çalıştırılacak bölümdür. Bu bölümden sonra iki nokta konur. Sonraki bölüm ise koşul yanlışsa çalışır.

---

### Döngüler

Bir döngü deyimi, bir deyimi veya deyimler grubunu birden çok kez yürütmemize izin verir. Aşağıda, programlama dillerinin çoğunda bir döngü ifadesinin genel biçimi verilmiştir:

![](https://cdn-images-1.medium.com/max/800/0*tZ55-KwCaatkE92j)

C dilinde 3 çeşit döngü vardır. Bunlar for, while ve do-while döngüleridir.

#### for döngüsü

Deyimleri birden çok kez yürütür ve döngü değişkenini yöneten kodu kısaltır.

```
//0'dan 10a kadar olan sayıları yazdıran program  
for(int i=0;i<=10;++i){  
    printf("sayi: %d \n",i);  
}
```

Döngü ifadeleri iç içe kullanılabilir buna iç-içe döngü(nested loop) denir. Bu daha çok matris işlemlerinde kullanılır.

```
//20x20lik bir matrisin indislerini yazdıran program  
for(int i=1;i<=20;++i}{  
  for(int j=1;j<=20;++j){  
    printf("(%d,%d)\n",i,j);  
  }  
}
```

![](https://cdn-images-1.medium.com/max/800/0*oZLlTX132HC6pdpw)

#### while döngüsü

Belirli bir koşul doğruyken bir ifadeyi veya ifade grubunu tekrarlar. Döngü gövdesini yürütmeden önce durumu test eder.

```
//10dan 1'e kadar olan sayıları yazdıran program  
int i = 10;  
while(i>0){  
  printf("sayi: %d \n",i);  
  i--;  
}
```

while döngüsü içindeki koşul sürekli doğru olursa sonsuz döngü oluşur. Döngüyü durduracak bir koşul olmadığı için döngü program sonlandırılana dek devam eder.

```
//1 değeri doğru(True) değeri temsil eder  
while(1){  
  printf("bu bir sonsuz dongudur");  
}
```

#### do while döngüsü

while döngüsünden farklı olarak döngü koşulunu başta değil sonda kontrol eder.

```
//10dan 1'e kadar olan sayıları yazdıran program  
int sayi=10;  
do{  
  printf("sayi: %d \n", sayi);  
  sayi--;  
}while(sayi>0);
```

do-while döngüsü önce deyimleri yürütür sonra koşulu sorgular. Bu bazı durumlarda oldukça kullanışlı olabilir.

```
//kullanıcıdan 0 gelinceye kadar alınan sayıları ekrana bastıran program.  
int sayi;  
do{  
  printf(" Bir sayi giriniz: ");  
  scanf("%d", &sayi);  
  printf("\n Girilen sayi: %d",sayi);  
}while(sayi!=0);
```

![](https://cdn-images-1.medium.com/max/800/0*LIayjiTDiNr-k5rJ)

#### Döngü kontrol deyimleri

**break deyimi:** Döngü ifadesini sonlandırır ve yürütmeyi döngünün hemen sonrasındaki ifadeye aktarır.

```
//donguden çıkmak için q'ya basmak gereken program  
char c;  
while(1){  
  printf("bir karakter giriniz: ");  
  scanf("%c", &c);  
  if(c=='q'){  
    break;  
  }  
  printf("\n dongu devam ediyor");  
}  
printf("\n dongu sonlandı");
```

**continue deyimi:** Döngünün gövdesinin geri kalanını atlar ve döngünün sonraki iterasyonuna geçer.

```
for(;;){    // for ile sonsuz döngü  
  printf("bu deyim çalışır");  
  continue;  
  printf("bu deyim çalışmaz");  
}
```

yukarıdaki örnekte continue deyiminin altınsa kalan printf(), continue altında kalan deyimleri atlayıp döngüyü başa aldığı için hiç çalışmaz.

---

### Fonksiyonlar ve Yapılar

Fonksiyonlar ve yapıların temel işlevi deyimleri gruplamak/paketlemektir. Genel olarak fonskiyonlar çalışan deyimleri, yapılar verileri gruplar diyebiliriz.

#### Struct Tanımlama

Structlar bir kaydı temsil etmek için kullanılır. Kitaplıktaki kitaplarınızın kaydını tutmak istediğinizi varsayalım. Her kitapla ilgili aşağıdaki özellikleri tutmak isteyebilirsiniz:

* Kitap adı
* Konu
* Yazar
* Sayfa Sayısı

Bu kitabı bir struct ile tanımlamak istersek:

```
struct Books {  
   char  title[50];  
   char  author[50];  
   char  subject[100];  
   int   pages;  
} book;
```

şeklinde tanımlayabiliriz. Görüldüğü gibi bir çok veri türünü kullanarak daha geniş bir veri türü elde ediyoruz. Bu geniş veri türünü kullanmak için:

```
struct Books kitap1;   
//struct books türünde kitap1 isminde bir veri tipi tanımı  
strcpy( kitap1.title, "C programlama");  
strcpy( kitap1.author, "yazar adi");   
strcpy( kitap1.subject, "C");  
kitap1.pages = 680;
```

Yukaridaki kod parçasında karakter dizisi(string) değerlerini atamak için strcpy() fonksiyonu kullanılır. Diğer değerler ‘=’ operatörü ile atanabilir.

#### **typedef**

typedef, C programlamasında mevcut veri türlerine yeni bir ad sağlamak için kullanılan bir anahtar kelimedir. typedef anahtar sözcüğü, zaten var olan adı yeniden tanımlamak için kullanılır. struct deyimiyle kullanımı çok yaygındır. Bu sayede struct anahtar kelimesini her tanımlamada tekrar kullanmamız gerekmez:

```
#include <stdio.h>  
#include <string.h>  
    
typedef struct students   
{  
  char name[50];  
  char branch[50];  
  int ID_no;  
} students;  
    
int main()  
{  
  students st;  //Tanımlamadas struct anahtar kelimesini kullanmadık  
  strcpy(st.name,   
         "Ahmet Yılmaz");  
  strcpy(st.branch,   
         "Bilgisayar Bilimleri");  
  st.ID_no = 108;  
      
  return 0;  
}
```

#### Fonksiyon Tanımlama

Bir fonksiyon, birlikte bir görevi gerçekleştiren deyimler grubudur. Her C programının en az bir işlevi vardır, bu da main()’dir. Fonksiyonlar devamında gelen () işaretleriyle simgelenir.

Bir fonksiyon tanımlama:

```
dönüş_tipi fonksiyon_ismi( parametreler) {  
   fonksiyon gövdesi  
  return   
}
```

* **dönüş tipi:** Fonksiyonun return deyimiyle döndürdüğü değerin türünü belirtir.
* **fonksiyon ismi:** fonksiyonu cağırırken kullandığımız isim.
* **parametreler:** parametre bir yer tutucu gibidir. Fonksiyon çağrıldığında parametrelere değerler verilir ve bu gerçek değer olarak adlandırılır.
* **fonksiyon gövdesi:** fonksiyonun içindeki deyimlerin yazıldığı bölüm.

```
//integer türünde değer dönen ve integer türünde num1 ve num2 değerlerini   
//alan max isminde bir fonksiyon  
int max(int num1, int num2) {  
int result;  
   
   if (num1 > num2)  
      result = num1;  
   else  
      result = num2;  
   
   return result;   
}
```

**fonksiyon imzası/bildirimi**

Bir fonksiyon bildirimi, derleyiciye bir işlev adı ve işlevin nasıl çağrılacağı hakkında bilgi verir. Fonksiyonun gerçek gövdesi ayrı ayrı tanımlanabilir.

```
int max(int num1, int num2);   //fonksiyon imzası
```

**fonksiyon çağrısı**

Bir fonksiyonu kullanmak için, tanımlanan parametrelere göre o fonksiyonu çağırmanız gerekir.

```
#include <stdio.h>  
   
/* fonksiyon imzası*/  
int max(int num1, int num2);  
/* main fonksiyonu */  
int main () {  
   int a = 100;  
   int b = 200;  
   int ret;  
   
   /* fonksiyon çağrısı*/  
   ret = max(a, b);  
   
   printf( "Max value is : %d\n", ret );  
   
   return 0;  
}  
   
/* fonksiyon tanımı */  
int max(int num1, int num2) {  
   int result;  
   
   if (num1 > num2)  
      result = num1;  
   else  
      result = num2;  
   
   return result;   
}
```

#### Özyinelemeli Fonksiyonlar

Kendini çağıran fonksiyonlarla oluşturulmuş döngüye benzer yapılardır. Kısaca bir fonksiyonun kendini çağırmasıdır.

```
void recursion() {  
   recursion(); /* fonksiyon kendini çağırıyor*/  
}  
  
int main() {  
   recursion();  
}
```

Yukarıda görüldüğü gibi recursion isimli fonksiyon kendini çağırıyor. Ancak bu kullanımda program sonsuza dek devam eder, çünkü durduracak bir koşul yok. Bu yüzden, özyinelemeli fonksiyonların kullanımında 2 durum gereklidir:

Temel durum: fonksiyonun kendini çağırmayı bıraktığı durumudur.

Rekürsif durum: fonksiyonun kendini çağırdığı durumdur.

```
int factorial(unsigned int i) {  
if(i <= 1) {  
      return 1;  //temel durum  
   }  
   return i * factorial(i - 1); //rekürsif durum  
}
```

---

### Referanslama

#### İşaretçiler (pointers)

İşaretçi(pointer), C programlama dilini bir sistem dili yapan parçasıdır. İşaretçiler ile işletim sisteminin izin veriği ölçüde belleğe erişebilir ve yönetebiliriz. Bazı C programlama görevleri, işaretçiler ile daha kolay gerçekleştirilir ve dinamik bellek ayırma gibi diğer görevler, işaretçiler kullanılmadan gerçekleştirilemez.

İşaretçi, değeri başka bir değişkenin adresi, yani bellek konumunun doğrudan adresi(fiziksel adresi) olan bir değişkendir. İşaretçileri kullanarak bellek hücrelerine doğrudan erişim sağlayabiliriz. C’deki bir dizi veya vir fonksiyon da aslında bir işaretçidir, dizinin veya fonksiyonun bellekteki başlangıç adresini işaret eder.

```
int    *ip;    /* pointer to an integer */  
double *dp;    /* pointer to a double */  
float  *fp;    /* pointer to a float */  
char   *ch     /* pointer to a character */
```

Yukarıda farklı türlerde işaretçi tanımlarını görüyorsunuz. İşaretçilerin kullanımında iki operatörün önemi büyüktür:

* referencing \* : referansı verilen adreste tutlan değeri getirir.
* de-referencing & : bir değerin bellek konum adresini getirir.

Bu iki operatörü birbirinin zıttı olarak düşünebilriz. \* operatörü değerin bellek adresini getirirken, & operatörü verilen adresteki değeri getirir.

![](https://cdn-images-1.medium.com/max/800/0*xhwIoaH5XH3vBH9k)

referencing de-referencing

p bellek adresi tutan bir değişken olsun yani pointer. \*p, p’de tutulan bellek adresindeki değeri verir, &p ise p’nin kendi bellek adresini verir.

Bu mantıkla bir pointerı referans eden başka bir pointer yaratabiliriz.

![](https://cdn-images-1.medium.com/max/800/0*fqOhphnMCqrtdVI2.jpg)

pointer to pointer

var isminde bir değişkenimiz olsun, bu değişenin adresini ptr’ye atalım. Sonrasında, ptr’nin adresini de pptr isminde başka bir pointera atalım.

```
int var = 1234;  
int *ptr = &var;  
int **pptr = &ptr;
```

Yukarıda pointer to pointer durumunu tanımladık. Bu durumu bir zincir şeklinde istediğimiz kadar uzatabiliriz. Aşağıda çalışan bir örnek verilmiştir.

```
#include <stdio.h>  
   
int main () {  
  
   int  var;  
   int  *ptr;  
   int  **pptr;  
  
   var = 3000;  
  
   /* take the address of var */  
   ptr = &var;  
  
   /* take the address of ptr using address of operator & */  
   pptr = &ptr;  
  
   /* take the value using pptr */  
   printf("Value of var = %d\n", var );  
   printf("Value available at *ptr = %d\n", *ptr );  
   printf("Value available at **pptr = %d\n", **pptr);  
  
   return 0;  
}
```

#### pointer aritmertiği

Bir önceki bölümde pointerların bellek adresi tutan değişkenler olduğundan bahsetmiştik. Yani, tuttuğu değer tek sadece bellek adresi tutuyor. Buna rağmen, int, float, char, double gibi farklı türlerde tanımlandığını görmüştük. Bu 4 tanımlamada aslında aynı tür değeri tutuyor. Peki farkları ne?

Burada pointer aritmetiği devreye giriyor. c’deki işaretçi, sayısal bir değer olan bir adrestir. Bu nedenle, sayısal bir değerde olduğu gibi bir işaretçide de aritmetik işlemler gerçekleştirebilirsiniz. İşaretçiyi tanımladığınız türe göre bu aritmetik işlemler yapılacaktır. Örneğin:

* char — 1 byte: işaretçiyi bir arttırdığınızda bellekte 1 bayt sonraki konumu gösterecektir.
* int — 4 byte: işaretçiyi bir arttırdığınızda bellekte 4bayt sonraki konumu gösterecektir.
* float — 4byte: işaretçiyi bir arttırdığınızda bellekte 4bayt sonraki konumu gösterecektir.
* double — 8byte: işaretçiyi bir arttırdığınızda bellekte 8 bayt sonraki konumu gösterecektir.

Bu mantık dizilerde çok işimize yarar. 10 elemanlı bir integer dizisi düşünün; bir integer pointer ile o diziyi rahatlıkla dolaşabilirsiniz. pointerı bir arttırdığınızda sonraki elemana geçmiş olur. Bir aalltığınızda önceki elemana geçer. Ancak, dizinin dışına çıkmamaya dikkat etmelisiniz!

```
#include <stdio.h>  
  
const int MAX = 3;  
  
int main () {  
  
   int  var[] = {10, 100, 200};  
   int  i, *ptr;  
  
   /* let us have array address in pointer */  
   ptr = var;  
   
   for ( i = 0; i < MAX; i++) {  
  
      printf("Address of var[%d] = %x\n", i, ptr );  
      printf("Value of var[%d] = %d\n", i, *ptr );  
  
      /* move to the next location */  
      ptr++;  
   }  
   
   return 0;  
}
```

Yukarıdaki örnekte, pointerlar ile bir dizide gezmeye örnek verilmiştir. ptr++ bellekte 4 bayt sonraki konuma işaret eder.

#### Dinamik Bellek Yönetimi

Bu bölüm, C’deki dinamik bellek yönetimini açıklar. C programlama dili, bellek tahsisi ve yönetimi için çeşitli işlevler sağlar. Bunlar:

* **malloc():** bellekten belirli boyutta bir alan tahsis eder.
* **calloc():** bellekten belirli boyutta bir alanı temizleyip tahsis eder.
* **realloc():** bellekteki bir alanın boyutunu değiştirip yeniden tahsis eder.
* **free():** bellekteki bir alanın tahsisini sonlandırır.

Programlama yaparken bir dizinin boyutunu bilirseniz onu statik bir dizi olarak tanımlayabilirsiniz. Bu dizinin alanı, program başladığında tahsis edilir ve program sonlanana kadar devam eder. Ancak, program akışı içinde bir dizi tanımlamak veya değiştirmek isterseniz bunu statik olarak yapamazsınız. Dinamik olarak bir dizi tanımlamak için dinamik bellek yönetimini kullanmak zorundasınız.

```
#include <stdio.h>  
#include <stdlib.h>  
#include <string.h>  
  
int main() {  
  
   char name[100];  
   char *a1;  
  
   strcpy(name, "Zara Ali");  
  
   /* allocate memory dynamically */  
   a1 = malloc( 200 * sizeof(char) );  
   
   printf("Name = %s\n", name );  
   printf("Description: %s\n", a1);  
    
  free(a1);  
}
```

Yukarıki programda, 200 charlık bir alan bellekten dinamik olarak tahisis edilmiştir. Program sonunda free() ile bu alan bırakılmıştır.

---

### Dosya işlemleri

C dilinde bir dosyadan okuma/yazma yapmak için bazı fonksiyonlara ihtiyaç duyarız. Bunlar, fopen() ve fclose() fonksiyonlarıdır. Bu fonksiyonlarla birlikte yapılacak işlemlerde dosya açma modları önemlidir. Dosya hangi modda açıldıysa o moddaki işlemler yapılabilir.   
Dosya açma modları:

* r: Okuma amacıyla mevcut bir metin dosyasını açar.
* w: Yazmak için bir metin dosyası açar. Mevcut değilse, yeni bir dosya oluşturulur. Mevcut ise üstüne yazar.
* a: Ekleme moduda yazmak için bir metin dosyası açar. Mevcut değilse, yeni bir dosya oluşturulur. Mevcut ise dosya içeriğine içerik eklemeye başlayacaktır.
* r+: Hem okuma hem de yazma için bir metin dosyası açar.
* w+: Hem okuma hem de yazma için bir metin dosyası açar. Varsa, önce dosyayı sıfırlar,. Yoksa bir dosya oluşturur.
* a+: Hem okuma hem de yazma için bir metin dosyası açar. Dosya yoksa, dosyayı oluşturur. Okuma baştan başlayacak, ancak yazı sadece eklenebilir.

Dosya açmak ve kapatmak için bu fonksiyonları ve modları beraber kullanabiliriz.

```
FILE *fp;  
fp = fopen( filename, mode );
```

Aşağıda dosya işlemleriyle ilgili çalışan bir örnek verilmiştir.

```
#include <stdio.h>  
  
void main() {  
   FILE *fp;  
  
   fp = fopen("/tmp/test.txt", "w+");  
   fprintf(fp, "This is testing for fprintf...\n");  
   fputs("This is testing for fputs...\n", fp);  
   fclose(fp);  
}
```