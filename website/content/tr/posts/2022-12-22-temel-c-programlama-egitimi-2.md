---
date: '2022-12-22'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/0*srHR3o1A16Y8ddWa
title: 'Temel C Programlama Eğitimi #2'
type: posts
---

### Temel C Programlama Eğitimi #2

Bu yazımda ikinci haftasını tamamladığımız Temel C Programlama Eğitiminin notlarını ve alıştırma sorularını paylaşacağım. Eğitimin ilk haftasına [buradan](https://medium.com/@yusufarbc/temel-c-programlama-eğitimi-1-b5ef99fe4262) ulaşabilirsiniz.

---

### Döngüler

Bir döngü deyimi, bir deyimi veya deyimler grubunu birden çok kez yürütmemize izin verir. Aşağıda, programlama dillerinin çoğunda bir döngü ifadesinin genel biçimi verilmiştir:

![](https://cdn-images-1.medium.com/max/800/0*srHR3o1A16Y8ddWa)

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

![](https://cdn-images-1.medium.com/max/800/0*XyQbq3v5a6xiEvZT)

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

![](https://cdn-images-1.medium.com/max/800/0*vOFsWpd6gw0nvsbR)

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

**typedef**

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

#### Fonksiyonlar

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

### Alıştırma Soruları

#### soru-1

Bilgisayar isminde bir struct oluşturup, işlemcisi, bellek kapasitesi, disk kapasitesi gibi tanımlamalar yapınız ve bu tanımlamalara atamalar yapınız.

#### soru-2

Ders isminde bir struct oluşturup, dersin adını, dersi veren öğretmeni, dersin sınıfını ve dersin kodunu bu structta tanımlayınız. Bu verileri kayıt bölümünde kullanıcıdan alıp, kontrol bölümünde istenilen dersi ekrana basan programı yazınız.

#### soru-3

Parametre olarak bir isim alan ve aldığı isimle ekrana “merhaba \_isim\_” yazdıran fonksiyonu yazınız.

#### soru-4

seçilen bir işlem türüne göre dairenin alanını veya çevresini hesaplayabilecek fonksiyonu yazınız ve programda kullanınız.

#### soru-5

25 elemanlı bir veri dizisi için ortalamayı hesaplayan fonksiyonu yazıp programda kullanınız.

#### soru-6

klavyeden girilen iki sayı için minimum değer, maximum değer ve ortalama değerleri dönen 3 foksiyon tanımlayıp bunları kullanan programı yazınız.

#### soru-7

Verilen bir stringi tersine çeviren fonksiyonu tanımlayınız ve programda kullanınız.