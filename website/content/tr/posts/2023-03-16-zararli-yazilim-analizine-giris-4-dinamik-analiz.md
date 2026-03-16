---
date: '2023-03-16'
draft: false
title: 'Zararlı Yazılım Analizine Giriş: #4 Dinamik Analiz'
---

---

### Zararlı Yazılım Analizine Giriş: #4 Dinamik Analiz

![](https://cdn-images-1.medium.com/max/800/1*XhHw4q_6KEejBGJHX3iENw.png)

Bir önceki yazımda statik analiz yöntemlerinden bahsetmiştim. Bu yazımda ise Zararlı Yazılım Analizinde, dinamik analiz yöntemlerinden bahsedeceğim. Ne tür dinamik analiz teknikleri var? hangi araçlar kullaılıyor? nasıl analiz yapılıyor? hepsi bu yazıda!

---

### Dinamik Analiz Yöntemleri

Çeşitli araçların yardımıyla bir zararlı yazılım örneğini yürütmeyi ve yalnızca davranışı kaydetmeyi değil, aynı zamanda yürütülen zararlı yazılım tarafından üretilen çeşitli yapıtları da gözlemlemeyi içerir.

Dinamik analiz ve statik analiz, analiz sürecinde iki farklı aşama gibi görünse de öyle değildir. Çeşitli dinamik analiz adımlarını ve araçlarını gözden geçirirken, geri dönüp öğrendiğiniz çeşitli statik analiz adımlarını uygulamanız ve ardından tekrar dinamik analize geri dönmeniz gerekebilir. Bu döngü birkaç kez daha devam edebilir.

Dinamik analize başlamadan önce analiz ortamnızın izole ve yedeklenmiş olmasından emin olmalısınız. Bunun için sandbox kurulum yazısında değindiğimiz gibi win7 makinenizin bir klonunu oluşturabilirsiniz ve işlemleri bu klon üzerinde gerçekleştirebilirsiniz. Ayrıca, ağ adaptörünün devredışı veya host-only modda olduğundan emin olun. Base sisteminizi korumak için sanal makine içinde herhangi bir ağ bağlantısı olmaması gerekiyor.

Bundan sonraki aşamalarda adım adım analiz tekniklerine değineceğiz.

---

### İlk Çalıştırma

Analiz sürecindeki en iyi ilk adım, örneği gelişigüzel bir şekilde çalıştırmak ve davranışını çok yüksek bir düzeyde fark etmektir.

Fidye yazılımı gibi pek çok örneğin açık davranışları vardır. Örneği çalıştırmak ve yazılımın sistem ve diskteki dosyalar üzerindeki etkilerini gözlemlemek, örneğin zararlı yazılım olduğu sonucuna varmak, zararlı yazılımın türünü ve amacını anlamak için yeterli olabilir.

Yürütülen zararlı yazılımın davranışını gelişigüzel bir şekilde gözlemlemek beklentilerimizi belirlememize ve derinlemesine analizine devam etmek için gereken bir sonraki araç setine kendimizi hazırlamamıza yardımcı olur.

Tek bir yürütme, davranışı hakkında yeterince gözlem yapmamıza yardımcı olmayacağından, bu işlemi tekrarlamamız ve aynı örneği gelişigüzel bir şekilde birden çok kez yeniden çalıştırmamız gerekebilir. Örneği gelişigüzel bir şekilde her yeniden çalıştırdığımızda, VM’i sıfırlamamız önerilir. Bunun için çalıştırmadan önce [snapshot](https://www.techrepublic.com/article/how-to-use-snapshots-in-virtualbox/) alabilirsiniz ve zararlı yazılımı çalıştırdıktan sonra restore edebilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*TeWf88TlRm-4hgARIytSFA.png)

Bu işlemi gerçekleştirirken, örneğin davranışını pasif olarak gözlemlememize yardımcı olan Process Hacker ve dosya tarayıcısı gibi birkaç basit araçtan da yardım alabiliriz.

![](https://cdn-images-1.medium.com/max/800/1*3Gszc0IZVUjKcJiNdTTGFQ.png)

örneğin burada sample.exe adında bir zararlı yazılımız var Bunu çalıştırdığımızda neler olacak gözlemleyelim.

![](https://cdn-images-1.medium.com/max/800/1*A_SOhSImS-Ag6WFwPd4H0Q.png)

sample.exe öğresi ortadan kayboldu ve yeni prosesler başladı. Artık bilgisayarımız enfekte olmuş durumda.

![](https://cdn-images-1.medium.com/max/800/1*bbN3yVKANOp7YerFaB1qBw.png)

işlemimiz tamamlandıktan sonra makinemizi sıfırlamak için snapshotu restore etmemiz gerekli. Tekrar başlattığımızda makine snapshot aldığımız hali ile başlayacak.

---

### API Log Davranışı

Zararlı yazılım, Win API çağrılarıyla faaliyetlerini gerçekleştirir. APIMiner veya Cuckoo Sandbox gibi bir API kaydedici aracı kullanarak bir örnek tarafından kullanılan API’leri elde edebilirsiniz. API’lere dayanarak, örneğin zararlı yazılım olup olmadığı sonucuna varabilir ve kategorisini öğrenebilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*pfOmNJu2eNiLE6VdAnRwcg.png)

[APIminer](https://github.com/poona/APIMiner) aracı bize bir log dosyası yaratır. Log dosyaları, zaman sırasına göre düzenlenir. Gördüğünüz ilk dosya oluşturulan ilk dosya olur. Oluşturulan log dosyasını alttaki şekilde görebilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*tB_oxh5iHu7jN3Ni5dgR1Q.png)

Peki bu bilgilerden ne gibi çıkarımlar yapacağız.

CreateProcessInternalW([command\_line]”svchost.exe”,  
 [process\_identifier]4080,  
 [thread\_identifier]3248,  
 [creation\_flags]4  
 [process\_handle]0x00002A7C,  
 [thread\_handle]0x00002A78)  
NtReadVirtualMemory([process\_handle]0x00002A7C)  
NtMapViewOfSection([process\_handle]0x00002A7C)  
NtReadVirtualMemory([process\_handle]0x00002A7C)  
NtUnmapViewOfSection([process\_handle]0x00002A7C)  
NtResumeThread([thread\_handle]0x00002A78,  
 [process\_identifier]4080)

Bu kısmı ele alalım ve madde madde gidelim.

* CreateProcessInternalW API’sini kullanan örnek, bir sistem olan svchost.exe programı için yeni bir işlem oluşturur.  
  C:\Windows\System32\svchost.exe konumunda bulunan işlem
* Oluşturulan işlem, [creation\_flags]4 kullanılarak 4 bağımsız değişken değeri kullanılarak tanımlanan ASKIYA ALINMIŞ durumda. 4 değerinin ASKIYA ALINDI anlamına geldiğini nasıl bilebiliriz? CreateProcess API için MSDN’deki API açıklamasına bakın ve CREATE\_SUSPENDED bayrağını kontrol edin.
* Bu yeni oluşturulan işlemin tanıtıcısı ve iş parçacığı 0x00002A7C ve 0x00002A78'dir.
* NtReadVirtualMemory API’sini kullanan örnek daha sonra, 0x00002A7C işlem tanıtıcısı kullanılarak tanımlanan uzak işlemden belleği okur
* NtMapViewOfSection API’sini kullanan örnek daha sonra bir bölüm oluşturur ve bunun bir görünümünü, 0x00002A7C tanıtıcısı kullanılarak tanımlanan uzak işleme eşler.
* 0x00002A78 iş parçacığı tanıtıcısı ve 4080 işlem tanımlayıcısı kullanılarak tanımlanan ResumeThread API’sini kullanarak ASKIYA ALINAN iş parçacığını/işlemini sürdürür.

Tüm bu API dizisi neye benziyor? Bu, örneğin yalnızca kullanılmasa bile çoğunlukla zararlı yazılım tarafından kullanılan bir özellik olan işlem boşluğunu kullandığı anlamına gelir. Böylece bunun kötü amaçlı bir yazılım olduğu sonucuna varmamızı sağlar.

---

### Zararlı Yazılım Ailesinin Belirlenmesi

API loglarından zararlı yazılım olduğu sonucuna vardık, ancak zararlı yazılımın ailesini anlayabilir miyiz? Aynı aileye ait her zararlı yazılımın o aileye özgü özellikleri veya yapıları vardır. Özellikleri API logları aracılığıyla araştırılabilir. Örnek için, oluşturulan üç API log dosyası vardır. İlk log dosyasını alın ve bir muteks oluşturan CreateMutant API’sini arayın.   
Zararlı yazılımlar tarafından yaygın olarak kullanılan bir senkronizasyon yöntemidir. Zararlı yazılımımız, API çağrısı aracılığıyla görebileceğiniz gibi, 2GVWNQJz1 adlı bir muteks oluşturur.

![](https://cdn-images-1.medium.com/max/800/1*gd1heUrxhjyJuqn7_SnqYg.png)

Örneğimiz tarafından oluşturulan Mutex, kuluoz ailesine ait olduğunu ve bir botnet virüsü olduğunu ortaya koyuyor

---

### Dinamik String Analizi

String analizinde ilk adım, paketlenmiş olup olmadığını anlamaktır. Paketlenmemiş ise statik analiz yöntemleri ile stringler tespit edilebilir. Eğer paketlenmişse bu durumda dinamik analize ihtiyaç duyulur.

PEiD, örneğin paketlenip paketlenmediğini anlayabileceğiniz statik dosyanın entropisini sağlayabilen harika bir araçtır.

![](https://cdn-images-1.medium.com/max/800/1*Po9quWJijYlHKhvJpMIlkQ.png)

Paketlenen zararlı yazılımlarda stringler gizlenmiş olur. Bu, BinText kullanarak stringlerin statik analizini işe yaramaz hale getirir. Paketlenmiş zararlı yazılım çalıştırdığımızda, kendilerini bellekte açarlar. Kendi paketini açtıktan sonra, tüm gizlenmiş stringleri artık görünür hale gelir. Bu stringleri tespit etmeye çalışacağız.

Bu noktada yardımımıza yine process hacker koşuyor. process hacker ile başlatılan sürece tıklayıp bellek verilerini görüntüleyebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*3m0V-UQ4Yb1nse2pzeteTA.png)

Burada, birçok stringi görebiliyoruz.

Bu stringlerde ne çıkarabiliriz? SMTP ve POP gibi çeşitli protokoller ve Filezilla ve Internet Explorer gibi çeşitli araçlarla birlikte Kullanıcı Adı ve Parolaya atıfta bulunan çok sayıda string bulunuyor. Bu, örneğin kullanıcıların kullandığı çeşitli araçlardan kimlik bilgilerini çalmaya çalışan infoStealers sınıfınfa bir zararlı yazılım olduğunu gösterir.

Stringler içinde farklı görünen ama yine de bir anlamı olan garip isimler arayın (bunun için çok sabırlı olmanız gerekir). Tüm bu stringler arasında bir de YUIPWDFILE0YUIPKDFILE0YUICRYPTED0YUI1.0 stringi var ki bu string çok tuhaf görünüyor ama aynı zamanda CRYPTED ve FILE0 gibi kelimelerden oluşan bir yapıya sahip.

![](https://cdn-images-1.medium.com/max/800/1*el0yaQ8iSrmox-8IUb3CbQ.png)

Google’da bu stringi aradığımızda, örneğimizle aynı aileye ait olan Pony Loader veya Fareit gibi diğer zararlı yazılım örnekleri için birçok analiz raporuna işaret eder.

---

### Debuging

Örneği assembly kodıuna çevirip yürütmek, yaptığı çağrıları görmemiz açısından faydalı olabilir. OllyDbg bu noktada bize yardımcı olacak.

Öncelikle OllyDbg üzerinde birkaç küçük ayar yapamız lazım option menüsüne geliyoruz.

![](https://cdn-images-1.medium.com/max/800/1*eri6ggOwF_WG8_bhqPcVqQ.png)

Burada sol taraftan start bölümüne gelip Entry point of main module seçeneğini işaretliyoruz.

![](https://cdn-images-1.medium.com/max/800/1*mIJOmn4P3sGowZPeg3L87A.png)

Ardından SFX bölümüne gelip kutucuklardaki tikleri kaldırıyoruz. Artık hazırız. OllyDbg ile zararlı yazılım dosyamızı açıyoruz. Açılması biraz sürebilir.

![](https://cdn-images-1.medium.com/max/800/1*Or7YLdKi5dvafIWnuo-wXw.png)

Burada OllyDbg’ın ana ekranını görüyorsunuzç Görüntü gözünüzü biraz korkutabilir. Aslında bu kısım assembly bilginize bağlı.

![](https://cdn-images-1.medium.com/max/800/1*EqbuAGEZvZeUYzrb9FERwQ.png)

OllyDbg üzerindeki hızlı erişim butonları şekildeki gibidir. OllyDbg ile yazılımı satır satır çalıştırabilir ve yaptığı işlemleri gözlemleyebilirsiniz.

---

### Davranış Olayları Analizi

Örneğimizi analiz edip çalıştırdığımızda çeşitli olayları yakalayabilen çok önemli bir başka analiz aracı olan ProcMon’a değineceğiz. Yaptığımız analizi adım adım inceleyelim.

1. Örneğiniz çalıştırdığınızda başlatılan süreç(ler) üzerinde bir gözünüz olması için Process Hacker’ı çalıştırın.
2. ProcMon’u başlatın ve olayları yakalamayı durdurmak için Ctrl+E tuşlarına basın. Varsayılan olarak, ProcMon sistemdeki tüm olayları yakalar ve bazen çok fazla etkinliğiniz olur.
3. Görüntülediği mevcut olayları temizleyebilmek için Ctrl+X tuşlarına basın.
4. Olayları yakalamaya başlayabilmeniz için Ctrl+E tuşlarına basın.
5. Process Hacker aracılığıyla çalıştığından veya en azından başka alt süreçler oluşturduğundan emin olarak Sample.exe’yi çalıştırın.
6. Örneği bir süre çalıştırın ve ardından ProcMon’da Ctrl+E tuşlarına basın. Ancak çok uzun süre çalıştırmak istemezsiniz; aksi takdirde, analiz edilecek çok fazla olayla boğulursunuz.

Olayları gözden geçirelim ve örnek sürecimizle doğrudan veya dolaylı olarak ilgili olaylardan herhangi bir kötü niyetli olay/gösterge fark edip edemeyeceğimize bakalım.

![](https://cdn-images-1.medium.com/max/800/1*ML1czN-nNauQcOxJ4Y4PAw.png)

Tüm olaylar zararlı bir aktiviteyi gösteriyor.

1. SCOHOST.EXE adında bir dosya oluşturmaya çalışıyor ki bu isim sistem programı olcan svchost.exe’ye çok yakın.
2. sample.exe kendi içeriğini okuyor.
3. SVOHOST.EXE’ye okudupu içeriği yazıyor. Yani kendini kopyalıyor.

İçeriğini kopyalayıp bu yeni dosyaya yapıştırmak, yaygın olarak kullanılan bir zararlı yazılım tekniğidir, burada kötü amaçlı yazılım kendilerini sistemdeki başka bir klasördeki yeni bir dosyaya kopyalar ve bu yeni klasörde bulunan bu yeni dosyadan yeni bir işlem olarak çalışır.

#### Autoruns

Zararlı yazılım örneği bir RUN kalıcılık girişi oluşturduğundan, bu kalıcılık RUN girişinin hala var olup olmadığını AutoRuns aracıyla doğrulayalım.

![](https://cdn-images-1.medium.com/max/800/1*O8xKtlyx0K9aReVvbccSPw.png)

Autoruns aracı ile oluşturulan kaydı görebilirsiniz.

---

### Kod Enjeksiyonu Tespiti

Kod enjeksiyonu çeşitli teknikler kullanılarak yakalanır. Yöntemlerden biri, belirli Win32 API’lerinin kullanımını algılar. Bu API’leri göz önünde bulundurarak ve APIMiner gibi bir araç kullanarak kod enjeksiyonunu kolayca tespit edebilirsiniz.

#### GMER

Zararlı yazılım örneğinin kod enjeksiyonu gerçekleştirdiğini anladığınızı varsayalım. Her kod enjeksiyon tekniği, zararlı yazılımın API hooking yapmayı planladığını veya rootkit işlevini kullanmaya çalıştığını göstermez. Ancak bu noktada kötü amaçlı yazılımın amaçlarından birinin API hooking veya rootkit olma olasılığı yüksek. Bu aşamada, GMER aracını kullanmak iyi bir adımdır.

![](https://cdn-images-1.medium.com/max/800/1*ailBIordEk9B2cmjVNPNVQ.png)

GMER Taraması

---

### Memory Forensics (Adli Bilişim)

Zararlı yazılım yürütüldüğünde, belirli işlemler, dosyalar, log girdileri oluşturabilir, rootkit’ler yükleyebilir vb. Bu zararlı yazılım yapıları bazen kendisitarafından yok edilebilir, böylece bir analist bunları algılayamaz. Örneğin, zararlı bir işlem, meşru bir işleme kod enjekte edildikten sonra sona erebilir veya zararlı yazılım tarafından oluşturulan geçici bir dosya kullanıldıktan sonra silinir. Adli bilişim tekniklerini kullanarak, zararlı yazılım tarafından yok edilmiş olmasına rağmen bu tür bilgileri ve verileri geri alabilirsiniz, böylece zararlı etkinlikleri tespit edebilirsiniz.

Memory Forensiğin 2 temel adımı vardır:

* Memory acquisition (bellek edinimi)
* Memory analysis (bellek analizi)

#### Memory Acquisition

Adli bilişim veri toplama ile başlar. Hafızaya bakmak istediğimiz için hafıza edinim araçlarını kullanmamız gerekiyor. Bellekten bir imaj (RAM dökümü) alabilen araçlardan bazıları şunlardır:

* FTK Imager
* RAM Capture
* Dump It
* Memoryze

Bellek imajını almak için FTP Imager Lite’u kullanabiiriz. Bu araç son derece hafif ve kullanımı kolaydır.

![](https://cdn-images-1.medium.com/max/800/1*xpfdO7cMxtGKfdMhM179ug.png)

Capture memory düğmesine tıklayarak bir hafıza dökümü oluşturabilirsiniz. Oluşturulan bellek dökümü dosyası, adli bellek araçları tarafından anlaşılabilecek özel bir dosya biçimine sahiptir.

#### Memory Analysis

Dökümlerimizi analiz etmek için, Volatility adlı iyi bilinen bir açık kaynaklı adli bellek aracını kullanabiliriz.

![](https://cdn-images-1.medium.com/max/800/1*NId-X0OTydEM4KekMvEpeQ.png)

volality

Volality bir komut satırı aracıdır ve aracın çıktısı çok büyükse çıktıyı komut isteminden görüntülemek sakıncalıdır. Bunun yerine komutun çıktısını bir metin dosyasına yönlendirebilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*1PBp2-WEY1sk0r6l7oehsw.png)

Komuttan help.txt dosyasına yönlendirilen çıktı artık Notepad veya Notepad++ gibi bir metin düzenleyici kullanılarak görüntülenebilir.

![](https://cdn-images-1.medium.com/max/800/1*1VOuaZCymL2zzn8nWbVmsA.png)

Ekran görüntüsü, araç tarafından sağlanan komutların listesini görüntüler. Volality çok kapsamlı bir araçtır. Bütün özelliklerini bu yazıda anlatmayacağım.

![](https://cdn-images-1.medium.com/max/800/1*52I5nvpzGb-GDJfZ6LamjQ.png)

imaj bilgileri

Bellek imajını analiz etmek için pek çok komut ve teknik vardır. Bunları araştırarak öğrenebilirsiniz.

---

Bu yazımda dinamik analiz tekniklerine değindim. Zararlı yazılımı yürüterek nasıl analiz edebiliriz? hangi araçları kullanabiliriz bunlardan bahsettim. Yazıyı beğendiyseniz yorum yapabilirsiniz.