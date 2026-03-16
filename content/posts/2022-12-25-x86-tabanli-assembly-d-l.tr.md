---
title: "X86 TABANLI ASSEMBLY DİLİ"
date: 2022-12-25
draft: false
---

---

### X86 Tabanlı Assembly Dili

![](https://cdn-images-1.medium.com/max/800/1*BAtuHRcfthhw1Adspm0Jsg.png)

### Assembly diline Genel Bakış

Bir bilgisayar sistemi temel olarak donanım ve yazılım gini unsurlardan meydana gelmektedir. Donanım, bilgisayarın elektronik ve mekamik sistemlerini birbirine bağdaştıran oluşumdur. Bir kişisel bilgisayar ele alınırsa, monitör, klavye, sistem birimi ve diğer fiziksel kablo ve cihazların tümü donanım parçalarını oluştururlar. Bütün bu elemanların var olması yazılım olmadan bir işe yaramaz. Yazılım, sistemin açılmasından kapanmasına kadar olan bütün işlemlerini düzenler. Yazılımlar, sistem yazılımları ve uygulama yazılımları olmak üzere ikiye ayrılır. Uygulama yazılımları,istatiksel analizlerin yapılmasında, oyun programlarının yürütülmesinde vb. işlemlerde kullanılır. Sistem yazılımları sistemin işlevlerinin yerine getirilmesinde kullanılır. Uygulama yazılımları sistem yazılımları vasıtasıyla yönlendirilir. Sistem yazılımlarına en güzel örnek işletim sistemleridir (windows, linux, unix) .

#### **Makine Dili**

İnsan oğlunun makine ile iletişimde bulunabilmesi için onun dilinden anlaması gerekmektedir. Bunun için sistemin çalışmasında temel unsur olan mantıksal 0 ve 1 değerlerinin belli oranlarda dizi haline getrilmesi ve belli bir düzene göre yorumlanması ile sistemin dili oluşturulur.

![](https://cdn-images-1.medium.com/max/800/0*ORZKX7SQuqXG8bU2.jpg)

Mikroişlemcili sistemlerde mantıksal 0 ve 1'lerden oluşan ve belli bir görevi yerine getirek üzere yazılmış dile makine dili denir. Makine dilini meydana getiren bu sayıların yan yana gelmesi programcı için anlaşılmayan bir dizi oluşturur.

Makine dilinde yazılan programlar programcılar veya kullanıcılar tarafından çok zor yorumlanır ve hatırlaması zordur. Doğrudan makine dilince bir program yazmanın birkaç mahzuru vardır. Küçük programlar dışında hatasız program yazmak çok zordur. Yazılanlar 0 ya da 1'lerden oluştuğu için herşey birbirine benzer ve hatalardan arındırma kolay olmaz.

#### Assembly Dili

Makine dilinde ortaya çıkan zorlukların üstesinden gelmek için düşük seviyeli dil grubuna giren assembly dili kullanılır. Komut kodlarının ikili veya hex gösteriminin yerine assembly dili mnemonik denilen komut kısaltmaları kullanır.

Mnemonik kullanımı:

```
MOV AX,05  
ADD AX,10  
SUB AX,05  
NOT AX  
MOV BX,AX  
INT 21H
```

Her firma ürettiği mikroişlemciyle ilgili mnemonikleri de piyasaya sunmaktadır. Yukarıdaki küçük program parçasında her bir satır tam bir komutu ele alır. Her bir komut, bir iki veya 3 baytlık ikili koda karşılık gelir.

![](https://cdn-images-1.medium.com/max/800/0*JB_H9rRUMsl76-cW.png)

assembler

Assembly dilinde yazılan her program bellekte saklanırken ya da işlenirken makine koduna çevrilmeye ihtiyaç duyar. Bu çevirme işlemi elle veya bir assembler yardımıyla yapılır.

#### ISA (Instruction Set Architecture)

Komutlardan bahsederken [ISA](https://en.wikipedia.org/wiki/Instruction_set_architecture)’dan bahsetmemek olmaz. Komut Seti Mimarisi (ISA), CPU’nun yazılım tarafından nasıl kontrol edildiğini tanımlayan soyut bir bilgisayar modelinin parçasıdır. ISA, donanım ve yazılım arasında bir arabirim görevi görerek, hem işlemcinin neler yapabileceğini hem de nasıl yaptığını belirtir.

ISA, bir kullanıcının donanımla etkileşime geçebilmesi için tek yolu sağlar. Bir programcının el kitabı olarak görülebilir, çünkü makinenin birleştirme dili programcısı, derleyici yazarı ve uygulama programcısı tarafından görülebilen kısmıdır.

#### Program Formatı

Komutlar ve Talimatlardan meydana gelen assembly dilinde yazılmış kaynak kodlarnın her bir satrında, dört ayrı alan tanımlanabilir.

* Etiket alanı
* Komut alanı
* Operand alanı
* Açıklama alanı

Etiket, komut ve operand alanları birbirinden bir veya daha fazla boşluk ya da tab ile ayrılırlar. Açıklama alanı ise mutlaka noktalı virgül ile ayrılmalıdır.

```
Start:  
  MOV EDX, 2025H;  ;2025H sayısını EDX kaydedicine yükle  
  ADD EAX, EDX;    ;Bu değeri EAX kaydedicisine ekle  
End:
```

Yukarıdaki küçük kod parçasında görülen *Start* ve *End* etiket, *MOV* ve *ADD* komut, *EDX, 2025H* ve *EAX, EDX* operand, noktalı virgülden sonrası ise açıklama alanıdır.

---

### X86 Komut Kümesi

X86 tabanlı işlemcilerin kullandığı komut kümesi, program yazımı sırasında kullanılan bir dizi mnemoiklerden meydana gelmiştir. Komut kümesindeki bazı komutlar birbiriyle aynı işlevi yerine getirebilir. Programcının komut kümesindeki tüm komutları bilmesi gerekmez. 500 adet komut içerisinden yaklaşık 100 tanesini bilmesi assembly diline program yazmak için yeterli olaracaktır.

Komutları kullanılış amançlarına göre gruplara ayırabiliriz:

* Veri aktarım komutları
* Artimetik ve Mantık komutları
* Program Kontrol Komutları

Bu komutlardan yaygın olarak kullanılanlara bakalım.

#### Veri Aktarım Komutları

* **MOV**operand2'yi operand1'e kopyalar. CS ve IP kaydedicilerinin değerini değiştiremez. Bir segment kaydının değerini veya immediate bir değeri başka bir segment kaydına direk olarak kopyalamaz. Durum bayraklarını etkilemez. **Operandlar:  
  -** REG, memory  
  - memory, REG  
  - REG, REG  
  - memory, immediate  
  - REG, immediate
* **PUSH/POP**PUSH ve POP komutları verileri stack segmentte saklamamıza sağlar. PUSH verileri yığına iter, POP verileri yığından çeker. Tek operand alır. Durum bayraklarını etkilemez.  
  **Openrandlar:**- REG  
  - memory  
  - immediate
* **IN/OUT**IN komutu portlar üzerinden AL veya AX’e veri aktarımını sağlar, gerekirse DX’de kullanılabilir.İkinci operand bir port numarasıdır.   
  Out komutu bunun tersidir. **Operandlar:  
  -** AL, im.byte — im.byte, AL  
  - AL, DX — DX, AL  
  - AX, im.byte — im.byte, AX  
  - AX, DX — DX, AX

#### **Aritmetik ve Mantık Komutları**

* **ADD/ADC**operand2'yi operand1'e ekler ve sonucu operand1'e atar. ADC’nin farkı carry bitini de toplamaya dahil etmesidir. Tüm durum bayraklarını etkiler.  
  **Operandlar:  
  -** REG, memory  
  - memory, REG  
  - REG, REG  
  - memory, immediate  
  - REG, immediate
* **SUB/SBB**operand2'yi operand1'den çıkarır ve sonucu operand1'e atar. SBB’nin farkı carry bitini de çıkarmaya dahil etmesidir. Tüm durum bayraklarını etkiler.  
  **Operandlar:  
  -** REG, memory  
  - memory, REG  
  - REG, REG  
  - memory, immediate  
  - REG, immediate
* **MUL/IMUL**MUL ve İMUL komutu 8-bitlik sayılar için aldığı operandı AL ile çarpıp sonucu AX’e atar. 16-bitlik sayılar için ise aldığı operandı AX ile çarpıp sonucu DX:AX kaydedicilerine atar. İMUL’un MUL komutundan farkı işaretli sayılar için olmasıdır.Sadece carry ve overflow bayraklarını etkiler. **Operandlar:  
  -** REG  
  - memory
* **DIV/IDIV**DIV ve IDIV komutu 8-bitlik operand için AX kaydedicisini operanda bölü sonucu AL’ye atar. 16- bitlik operand için ise DX:AX kaydedicilerini operanda bölüm sonucu AX’e atar. IDIV’in DIV komutundan farkı işaretli sayılar için olmasıdır.**Operandlar:  
  -** REG  
  - memory
* **INC/DEC**INC komutu operandın değerini bir arttırmak için DEC komutu ise 1 azaltmak için kullanılır. Carry bayrağı hariç tüm bayrakları etkiler. **Operandlar:  
  -** REG  
  - memory
* **NEG**Operandın 2'ye tümleyenini geri operanda atar.  
  **Operandlar:  
  -** REG  
  - memory
* **AND/OR/XOR/NOT**Mantıksal işlemleri yerine getirmek için kullanılan komutlardır. NOT komutu hariç iki operand alırlar. Zero, sign ve parity bayraklarını etkilerler. **Operandlar:  
  -** REG, memory  
  - memory, REG  
  - REG, REG  
  - memory, immediate  
  - REG, immediate
* **SHR/SHL**SHR komutu operand1'i, operand2'de belirtilen sayı kadar sağa kaydırır. Kaydırılan kısımdan içeri lojik-0 alır çıkan değer carry’e kopyalanır. SHL ise aynı işlemi sola kaydırarak yapar. Carry ve Overflow bayraklarını etkiler. OF=0, eğer ilk işlenen orijinal işareti koruyorsa.  
  **Operandlar:**  
  - memory, immediate  
  - REG, immediate  
  - memory, CL  
  - REG, CL
* **ROR/ROL**ROR komutu operand1'i, operand2 de belirtilen sayı kadar sağa döndürür. Çıkan değer tekrar baştan geri alınır ayrıca Carry’e kopyalanır. ROL komutu ise bu işlemin sola döndürülen halidir. Carry ve Overflow bayraklarını etkiler. OF=0, eğer ilk işlenen orijinal işareti koruyorsa. **Operandlar:**  
  - memory, immediate  
  - REG, immediate  
  - memory, CL  
  - REG, CL
* **RCR/RCL**RCR komutu operand1'i, operand2 de belirtilen sayı kadar carry bayrağı üzerinden sağa döndürür. Çıkan değer carry’e kopyalanır, carry’nin değeri ise baştan geri alınır. RCL komutu ise bu işlemin sola döndürülen halidir. Carry ve Overflow bayraklarını etkiler. OF=0, eğer ilk işlenen orijinal işareti koruyorsa. **Operandlar:**  
  - memory, immediate  
  - REG, immediate  
  - memory, CL  
  - REG, CL
* **CMP**Karşılaştrma işlemi için kullanılan komuttur. İki operand alır, operand2'yi operand1'den çıkarır ancak atama yapmaz. Bu çıkarma işlemine göre bayrakları düzenler.  
  **Operandlar:  
  -** REG, memory  
  - memory, REG  
  - REG, REG  
  - memory, immediate  
  - REG, immediate

![](https://cdn-images-1.medium.com/max/800/1*cTFBzk0u0qRVO5sdUCTZtw.png)

CMP işleminin sonunda bayrakların durumları

#### Program Kontrol Komutları

* **JMP**  
  Program akışında dallanmalar yapmamızı sağlayan komutlardır. JMP komutu koşulsuz dallanma için kullanılır. Operand olarak program akışının dallanma yapılacak bölümünü bir label ile alır. Koşulu bağlı dallanma yapmamıza yarayan pek çok komut vardır.

![](https://cdn-images-1.medium.com/max/800/0*rqiV9TW4c9eHSlii)

JUMP INSTRUCTIONS

* **LOOP**  
  LOOP komutu, döngü kurmamızı kolaylaştırır. Her tekrarda CX kaydedcisini bir azaltır ve CX sıfır ise döngüyü sonlandırır.Operand olarak program akışının dallanma yapılacak bölümünü bir label ile alır.

---

### Assembly Talimatları

Assembly dilinde program geliştirmek için bazı temel kuralların bilinmesi gerekmektedir. Bu kurallar içerisinde, genel kodlama formatı, açıklama alanları, çevrilecek program listesinin denetimini sağlayan talimatlar, segment ve prosedürlerin tanımlanması aşamaları vardır.

Daha önce belirtildiği gibi komut alanında iki tip ifade kullanılmaktadır. Bunlar, komut(instruction) ve talimatlardır(directive). Her ikiside emir kelimesini ifade eder, fakat komutlar işlemci, talimatlar assembler içindir. Talimatlar, segmentlerin ve altyordam gibi prosedürlerin kurulumunda, sembollerin tanımı, geçici saklama yapmak için bellek ayırmaları ve benzer işleri yapmak için kullanılır. Talimatları; data, listeleme ve çalışma modu olmak üzere 3 grupda ele alabiliriz.

#### Listeme Talimatları

Assemble edilmiş bir programda, sayfa formatı, program başlığı ve alt başlıklar gibi tanımlar ve yazım formatını berlirler.

```
Page 60,120 ;sayfa 60 satır ve 120 sütündan oluşacak  
Title prog1 ;prog1 başlık
```

Satır ve sütun sayısı assembly dilinde yazılı programın yazdırılmasında bir sayfanın enini ve boyunu belirler. Title talimatıyla, programın genel olarak ne yaptığı her listenin ikinci satırına yazdırılır.

#### Data Talimatları

Veri talimatları kendi arasında beş gruba ayrılır. Bunlar segment veya prosedür tanımlamaları, sembol tanımlamaları, veri tanımlamaları, harici referanslar ve assembly kontrol tanımlamalarıdır.

**SEGMENT Talimatı**Segment talimatı, bir segmentin başlangıcını tanımlamada kullanılır. Her segment mutlaka bir anlamlı etiket ile ifade edilmelidir.bir segmentin açılması bir adla başlarken aynı adla ve ENDS ile kapanmalıdır.

```
ISIM SEGMENT  
...    ...  
...    ...  
...    ...  
...    ...  
ISIM ENDS
```

Bir programda tipine göre (exe veya com) bir veya birden fazla segment tanımlanabilir. X86 mikroişlemci mimarisinden hatırlayacağımız üzere; kod segment komutların yerleştirildiği, data segmenti verilerin depolandığı alanı ve yığın segmenti verilerin geçici bir süre için atıldığı bellek alanını ifade ederler. Yığının dışında, data segmentleri ve kod segmentleri birden fazla tanımlanabilirler.

**PROC Talimatı**Özel bir amaçla yazılmış kodları içerisine alan program parçalarına prosedür denir. Kod segmentinin içerisine, birisi ana olmak üzere pek çok prosedür konulabilir. Ana prosedür, programın kurulum (giriş-initial) ve icra (gelişme-executing) ve sonuç aşamasını barındırır. İcra bölümünde genelde prosedür çağrıları yapılır. Basit bir prosedür mekanizması segment içerisinde şu şekilde ifade edilir:

```
PROCADI PROC FAR/NEAR  
   <ifadeler>  
PROCADI ENDP
```

Görüldüğü gibi, etiket adlandırması dışında prosedür tanımlaması aynı segment tanımlamasına benzemektedir. Ana prosedür içerisinden ya da ana prosedür içerisinden çağrılan başka bir prosedür içerisinden başka bir prosedür çağrılabilir. Fakat dikkat edilecek nokta her prosedürün kendine has adının ve dönüş komutunun olmasıdır. Alt prosedürler genelde ana prosedür içerisinden CALL komutuyla adı verilerek çağrılırlar.

**ASSUME Talimatı**Asuume talimatı, assembleri kullanılan segment hakkında bilgilendirir ve hangi segmentlerin hangi segment kaydedicilerini kullanacağını tanımlar. Formatı aşağıdaki gibidir:

```
ASSUME Segment kaydedicisi:segment adı
```

Segment kaydedicileri; CS, DS, SS, ve ES, segment adları ise programcı tarafından segmentlere verilen adlardır. JMP, CALL ve benzeri kod referansları o anki kod segmentine görecelidir. Assembler hangi segmentin veri, hangi segmentin kod segmenti olduğunu bilmek zorundadır. Çünkü assembler, programcı tarafından yazılan assembl dilindeki programı makine koduna çevirirken, segmentlerin belleğe yerleşecekleri yerleri tanımlarken, program çalışması sırasında segmentlerin etiket adresine göre hareket etmek durumundadır.

**Çalışma Modları** 8086 ve 8088 işlemcilerinin ortaya çıkmasıyla birlikte işletim sistemi olarak da DOS gündeme gelmiştir. DOS’un o zamanki işlemcide çalıştırabileceği komutlar ve bellek kullanımı halihazırdaki sistem için yeterli gelmekteydi.

X86 mikromimarisini kullanan işlemcilerin geriye uyumlu olması zorunludur. Fakat işlemcilerin gelişimi ve performansının artması geriye uyumluluğu zorlar duruma gelmiştir. Bu uyumluluğu sağlamak için işlemci çeşitli çalışma modlarına ayrılmıştır.

* Real Mode: DOS işletim sisteminin üzerinde çalıştığı sistemler Real Mode altında çalışmaktadır.
* Protected Mode: Verilerin korunması öncelikli olan Korumalı Mod programları Protected Mode altında çalışmaktadır.
* Virtual Mode: Sanal bellek uzayını kullanarak birden fazla real mode programını aynı anda çalıştırabilen ve aynı zamanda protected mode programlarını da çalıştırabilen bir sanallaştırma teknolojisidir.

---

### 8086 İşlemcisini Kullanan Bir Assembly Programı

```
;EMU8086'nın sanal portlarından klavyeden alinan artis  
;miktarını bir sayacta biriktirerek sanal portlardan display  
;portunda belirli bir gecikme ile yansitan program  
  
PORTA EQU 110 ; Klayveden giris yapmaya yarayan sanal giris portu  
PORTB EQU 199 ; Sanal cikis portu, diplay  
  
org 100h  
  MOV SI,1 ;displayde gosterilecek sayac degeri  
  MOV CX,1 ; artis miktari  
  
tekrar:  
  MOV DX,PORTA  
  IN AL,DX ;Giris portundan klavyeden girilen degeri oku  
  cbw ;ax registerindeki byte worde çcevir  
  MOV CX,AX ;klavyeden girilen artis miktarini yedekle  
  ADD SI,CX ;sayactaki degeri guncelle  
  MOV DX,PORTB  
  MOV AX,SI  
  OUT PORTB,AX ;sayacytaki degeri diplaye tasi  
  CALL DELAY ;displaydeki degerin gorunebilmesi icin gecikme  
  JMP tekrar  
  RET  
  
  
;Prosedür tanımalaması  
DELAY PROC  
  PUSH CX ; ana programda kullanilan registerlari yigina yedekle  
  MOV CX,020H  
J1:  
  NOP  
  NOP  
  LOOP J1  
  POP CX ;yeeklenen reg yigindan geri cek  
  RET  
DELAY ENDP
```

---

Bu yazımda X86 tabanlı mikroişlemcilerde Assembly Programlama konusunu çok detaya inmeden ele almaya çalıştım. Bu yazımdan once yayınladığım X86 mikroişlemci mimarisini anlatan yazıma [buradan](https://medium.com/@yusufarbc/x86-tabanlı-mikroişlemci-mimarisi-9b3248a5dfbe) ulaşabilirsiniz. Assembly programlamada en kritik nokta kullandığımız donanımın/işlemcinin mimarisini tanımak ve bu mimarinin bize sunduğu komut setine ve talimatlara göre programımızı yazmaktır. Bu yönü, assembly dilini donanıma bağlı olmadığımız yüksek seviyeli dillerden ayırır. Düşük seviyeli dil tanımına girer. Umarım faydalı olmuştur. Yorum yapmayı unutmayın!