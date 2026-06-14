Bölüm: requests


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş


Merhaba, bu yazımızda web uygulama güvenliği alanında araçlar yazabileceğimiz python'un requests modülünü tanıyacağız.


Bölüm Detayı: requests nedir?


requests python'un basit ama zarif bir HTTP modulüdür. HTTP isteklerini son derece kolay bir şekilde göndermenizi sağlar. GET metodu ile yapılan isteklerde URL'lerinize manuel olarak sorgu dizeleri eklemenize veya POST verilerinizi biçimsel olarak kodlamanıza gerek yoktur, requests modülü bu işleri sizin için halleder. Bu yazımızda requests ile çeşitli web toolları yazacağız ama önce kuruluma bir göz atalım. Python dilini temel olarak bildiğinizi varsayıp devam ediyoruz. Eğer isterseniz sitemizdeki python ile ilgili yazılara da bakabilirsiniz.


Bölüm Detayı: Kurulum


request modülünü kurmak için terminal ekranınıza aşağıdaki komutu yazabilirsiniz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

kurulum tamamlandıktan sonra bir python dosyası oluşturup aşağıdaki kodu yazıp çalıştırdığınızda bir hata almıyorsanız, kurulumunuz başarılı demektir.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

şimdi bu modülün yapısını biraz irdeleyelim.


Bölüm Detayı: Metotlar


request modülünün birçok metodu olsa da bizim için önemli olan GET ve POST isteklerini yaptığımız metotlardır. Bunların ne olduğunu bilmiyorsanız HTTP request metotlarını araştırabilirsiniz.

get(): En çok kullandığımız istek türü GET isteğidir. Tarayıcımızda herhangi bir web sayfasına girdiğimizde aslında GET isteği atmış oluruz. Bir URL adresine GET isteği attığımzda bize sayfanın HTML dökümünü (sayfa kaynağını) döndürür, tarayıcımız bu HTML'i yorumlayarak bize sayfayı gösterir. (Sadece HTML değil beraberinde CSS ve Javascript kodları da geliyor ama onlarla işimiz yok) requests.get() metodu ile GET istekleri yapabiliriz. Kullanımı temel olarak aşağıdaki gibidir: get(url, params, args)

post(): POST metodu genellikle HTML formlarını gönderirken (submit) kullanılan metottur. Giriş ve kayıt sayfalarında bu metot kullanılır. Yani bir giriş sayfasına kaba kuvvet saldırısı yapmak için bu metodu kullanacağız. GET metodundan farklı olarak bu metodla gönderdiğimiz parametreler/veri URL'e eklenmez. POST istekleri göndermek için requests.post() metodu kullanılır. Kullanımı temel olarak aşağıdaki gibidir: post(url, data, json, args)


Bölüm Detayı: Parametreler


url: GET veya POST isteğini göndereceğimiz web sayfasının adresidir.

params, data, json, files: Bu parametreler GET veya POST isteğiyle göndereceğimiz parametreler/veridir. params get() metodunda, diğerleri ise post() metodunda kullanılır. Bu metotların kullanımı hedef siteye bağlıdır; eğer hedef site bir parametre değeri almıyorsa kullanımına gerek yoktur. Eğer parametre alıyorsa, yani bir HTML formu varsa, name etiket değerlerine istenilen verileri göndermemiz gerekir.

params: get() metodunda dictionary veya tuple yapısında parametre/veri alır.
data: post() metodunda dictionary, tuple veya bytes yapısında parametre/veri alır.
json: post() metodunda json yapısında parametre/veri alır.
files: post() metodunda XML veya farklı dosya türlerinde parametre/veri alır.

GET isteğinde parametreler yani veri URL'in devamına eklenir. Bu yüzden direkt URL'i düzenleyerek parametreleri ekleyebiliriz ya da get() metodunun params parametresine dictionary yapısında verileri verebiliriz. Bunun için:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

şeklinde sözlük (dictionary) yapısında parametreleri tanımlarız. Bu parametreler ile bir istek yaptığımızda parametreler aşağıdaki şekilde URL'in sonuna eklenir:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Şimdi küçük bir Python kodu yazarak GET isteği gönderelim:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

POST isteğiyle veri göndermenin farklı yolları vardır. GET isteğinde olduğu gibi sözlük yapısında veya json yapısında veri gönderilebilir. Sözlük yapısında veri göndermek için:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

json yapısında veri göndermek için json modülünü kullanabilirsiniz.


Bölüm Detayı: args


Argümanlar get() ve post() metotları için aynıdır ve kullanımları isteğe bağlıdır; kullanılmadığı takdirde varsayılan değerleri ile yürütülür.

allow_redirects (bool): Yeniden yönlendirmeyi etkinleştirmek/devre dışı bırakmak için TRUE/FALSE değeri alır. Varsayılan olarak TRUE'dur, yani yönlendirmelere izin verir.
auth (tuple): Belirli bir HTTP kimlik doğrulamasını etkinleştirmek için kullanılır. Varsayılan olarak NULL değeri alır, kimlik doğrulaması yapmaz.
cert (tuple): Bir sertifika dosyasını tuple yapısında alır. Varsayılan olarak NULL değeri alır.
cookies (dict): Belirtilen url'ye gönderilecek çerez sözlüğünü alır. Varsayılan olarak çerez göndermez.
headers (dict): Belirtilen url'ye gönderilecek HTTP headerını alır. Varsayılan olarak header göndermez.
proxies (dict): Proxy URL'sine gönderilecek protokolü alır. Varsayılan olarak NULL değeri alır.
stream (bool): Yanıtın hemen indirilmesi (FALSE) veya akışa alınması (TRUE) değeri ile belirlenir. Varsayılan olarak FALSE değerini alır yani yanıt hemen indirilir.
timeout (int): İstemcinin bağlantı kurması ve/veya yanıt göndermesi için kaç saniye bekleneceğini gösteren timeout süresini alır. Varsayılan olarak NULL değer alır, bu da isteğin bağlantı kapatılana kadar devam edeceği anlamına gelir.
verify (bool): Sunucuların TLS sertifikasını doğrulamak için TRUE, doğrulamayı kapatmak için FALSE değer alır. Varsayılan olarak TRUE değerdedir.


Bölüm Detayı: response


Sunucunun gönderdiğimiz isteğe döndüğü yanıttır. Yazdığımız python kodlarında get() metodu ile aldığımız cevabı response isimli bir değişkende tutmuştuk. Şimdi bu cevabın içeriğini irdeleyelim.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

ile response'in içeriğini text olarak yadırabiliriz. Karşımıza aşağıdaki gibi bir metin çıkacaktır.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Burada aldığımız cevap ile ilgili bilgiler görüyoruz. Ayrıca aldığımız response'un tipine bakalım.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

requests.models.Response türünde bir nesne olduğunu anlıyoruz. Kaynak koduna baktığımzda:


[Görsel: Görsel açıklaması yok]


uzunca bir kod görüyoruz. Kendi dökümantasyonuna da buradan ulaşabilirsiniz. Bizim için burada önemli olan \\attrs\\ kısmında yazan attiributeleridir.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Ayrıca yukarıdaki kod ile de bu attiributeleri görebiliriz. Bu attiributeler ile response.text aldığımız metinde yazan değerlere ulaşabiliriz ama burda bizim için önemli olan content 'tir.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

bize sayfa kaynağını döndürecektir. Şimdi verilen websitesinin adresini alan ve kaynağını bir html dosyasına kaydeden bir uygulama yapalım.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

sayfa kaynağının aşağıdaki gibi çekildiğini görebilirsiniz. (CSS ve Javascript kodlarıyla birlikte)


[Görsel: Görsel açıklaması yok]


Sayfa kaynağını BeautifulSoup modülü ile ayrıştırabilir içinden istedğiniz bilgileri alabilirsiniz. Ama bu yazımızda daha farklı şeyler yapacağız.


Bölüm Detayı: Usomdan zararlı web sitelerini çekme


USOM(Ulusal Sİber Olaylara Müdahale Merkezi) ülkemizde ki siber olaylara karşı 7/24 çalışma esasında göre faaliyet gösteren bir oluşumdur. İnternetteki zararllı siteleri indekslediği bir listesi bulunmaktadır. Bu listeye buradan ulaşabilirsiniz. Şimdi python ile bu listeyi çekmeye çalışalım.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Basit bir GET isteği ile bu listeyi çekebildik. Şimdi elimizde olan bir URL'in bu listede yer alıp almadığını kontrol eden bir fonksiyon yazalım.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Fonksiyona verdiğimiz URL'i aldığımız metin dosyasında arayarak bulduğu takride bize zararlı olduğunu bulamadığı taktirde zararsız olduğunu döndüren bir uygulama yapmış olduk.


Bölüm Detayı: Kaba Kuvvet Saldırısı


Kaba Kuvvet Saldırısı, doğrusunu bulma umuduyla deneme yanılma yönetimi kullanarak bir web sayfasına giriş yapmak için kullanabileceğimiz basit ancak hala etkili bir saldırı türüdür. Bunu python uygulamamızla nasıl yapabileceğimize bir bakalım. Bunun için DVWA uygulamasını kullanacağım.


[Görsel: Görsel açıklaması yok]


Burada giriş sayfamı burp suite aracıyla dinledim. username ve password alanlarına 'aa' değerini girerek login butonuna bastım. Yapılan GET isteği burp aracım üzerinde HTTP History bölümünde yakalanmış oldu. Tabi bunun için faklı araçlar da kullanabilirsiniz. Biz buradaki bazı bilgileri kullanacağız. Öncellikle DVWA sayfasına oturum açarak eriştiğimiz için python uygulamamızında bir şekilde oturuma erişmesi gerekiyor. Peki oturum nedir? kısaca bahsedecek olursak, bir giriş sayfasından kullanıcı adı/şifre bilgilerimizle giriş yaptığımızda aslında bir oturum başlatmış oluruz. İşimiz bitip tarayıcımızı kapattığımızda veya üzerinden belli bir süre geçtiğinde oturum sonlandırılır. Web uygulamaları oturum oluştururken çerelerden(cookie) yararlanır, bir çerez istemci bilgisayarında bir çerez sunucuda olmak üzere iki çerez oluşturulur. Bu iki çerez de kaybolmadığı sürece oturum devam eder. Biz burada DVWA sayfasına giriş yaparak aldığımız oturum çerezini python uygulamamıza vererek bizim otururumuz ile web sayfasına erişmesini sağlayacağız. Burp aracında işaretli alan 'PHPSESID' bizim oturum çerezimizdir. Yalnız acele etsek iyi olur, oturumun süresi bitiyor”¦

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


[Görsel: Görsel açıklaması yok]


Kodu python dosyasına yazıp çalıştırdığımızda canlıdaki DVWA sunucusuna GET istekleri göndererek denemeler yapacaktır.

Ve evet saldırımız başarılı kullanıcı adı ve şifre bilgisini bulduk. Bu web sayfasında GET metodu kullanıldığı için saldırıyı URL üzerinde düzenleme yaparak kolayca gerçekleştirebildik. Eğer POST metodu kullanılmış olsaydı HTML formundaki name niteliklerinin isimlerine göre bir tuple oluşturup post() metodunun data parametresine verip saldırımızı gerçekleştirebilirdik. Bu kadar ipucu yeter, gerisi sizde”¦


Bölüm Detayı: URL Fuzzing


URL Fuzzing işleminde olası dosya/dizin isimlerinin yer aldığı bir liste oluşturulur ve bununla sisteme http isteği attırılır. Bu sayede sunucu üzerindeki dizinler ve dosyalar bulunmaya çalışılır. Tabi bu işlemi manuel olarak tek tek deneyerek yapmak yorucudur. Bunun için küçük bir python kodu yazmaya ne dersiniz?

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

python kodunu çalıştırdığımızda listedeki dizin ve dosya adlarını deneyerek bize aşağıdaki sonucu verecektir.


[Görsel: Görsel açıklaması yok]



Bölüm Detayı: XSS Saldırısı


XSS, temelinde web sayfası girdilerinden alınan değerlerin filtrelenmeden sayfa kaynağına dahil edilmesi sonucu ortaya çıkan bir güvenlik zafiyetidir. Bunun nedeni filtrelenmeyen girdilerden sayfaya zararlı javascript kodlarının dahil edilebilecek olmasıdır. Bu zafiyeti açığa çıkarabilecek birçok XSS scripti bulunmaktadır. Github üzerinde bulduğum bir listeye buradan ulaşabilirsiniz. Bu uygulamamızda, XSS scriptlerini içeren bir listedeki değerleri sayfaya göndererek sayfa kaynağına eklenip eklenmediğini kontrol eden bir uygulama yapacağız. Bunun için bir önceki uygulamada yaptığımız oturum çerezini yine header değişkenine verdim, bu kısmı bir daha anlatmıyorum.

DVWA sayfamız yine GET isteğiyle çalışıyor, bu yüzden requests.get() fonksiyonunu kullanacağız. Girdi bölümüne yazdıklarımız URL'de name bölümüne yazılıyor. Buradan hareketle biz de XSS scriptlerimizi name parametresine vereceğiz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Kodu python dosyasına yazıp çalıştırdığımızda canlıdaki DVWA sunucusuna GET istekleri göndererek denemeler yapacaktır.


[Görsel: Görsel açıklaması yok]


Aldığımız sonuca bakarsak, web sayfası filtreleme yaptığı için XSS scriptlerimiz çalışmadı. <h1>xss</h1> HTML injection scriptiydi, XSS ise düz bir stringden ibaret. Siz daha farklı XSS scriptleri deneyebilirsiniz.


Bölüm Detayı: Command Injection Saldırısı


Command injection,kod çalıştırma açıklığı olarak da bilinen bir zafiyet çeşididir. Girdiler filtrelenmeden sunucu shellinde çalıştırılması bu zafiyeti doğuruur. Saldırgan bu sayede istediği zararlı kodları sunucu shellinde çalıştırabilir. Uygulamamızda DVWA'nın command injection web sayfasını kullanacağız.


[Görsel: Görsel açıklaması yok]


Burada verilen ip adresine ping atan bir girdi bulunuyor. ip'nin devamına noktalı virgül atıp ls komutunu çalıştırmayı denediğimizde, çalıştıığını ve sunucu dizinini bize listelediğini görürürüz. Buradan hareketle bu sayfada comman injection zaafiyeti olduğunu belirleyebiliriz. Şimdi python ile nu zafiyeti nasıl tesğit edebileceğimize bakalım.


[Görsel: Görsel açıklaması yok]


Sayfaya gönderdiğimiz isteği burp ile dinlediğimizde bu isteğin bir POST metodu ile yapıldığını ve gönderilen parametreleri görebiliyoruz. Önceki uygulamalarda yaptığımız gibi yine oturum çerezimizi('PHPSESSID) header parametremize vereceğiz. Devamında POST isteği olduğu için bir data tuple yapısı oluşturacağız ve bunu post() metodumuza vereceğiz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

'www-data' gelen cevapta bulunduğunda komutun çalıştığını anlayabileceğimiz bir stringden ibaret, passwd dosyası içinde bulunuyor. Bu yöntemi kullanarak daha uzun komutları sırayla python ile çalıştırabilirsiniz.


[Görsel: Görsel açıklaması yok]


Sonuç olarak, python kodunu çalıştırarak zafiyeti bulmuş olduk.


Bölüm Detayı: Son


python ile web güvenliği alanında yapabileceğimiz başka ne tür işlemler olabilir yorumlara beklerim”¦

---

Bölüm: selenium


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş


Merhaba bu yazımızda web siteleri üzerinde bir kullanıcı gibi işlemler yapmamızı sağlayan selenium modülünü tanıyacağız.


Bölüm Detayı: Selenium Nedir?


Selenium bir web otomasyon kütüphanesidir. Selenium ile bir web sitesini ziyaret edip etkileşimde bulunabiliriz.


Bölüm Detayı: Kurulum


Selenium modülünü kurmak ve çalıştırmak için birkaç farklı yöntem izleyebilirsiniz. Herşeyi manuel olarak kurup bilgisayarınızda çalıştırabilirsiniz, tarayıcınızı çalıştıracak driverı otomatik kurabilirsiniz veya docker teknoloisinden faydalanabilirsiniz.

Klasik manuel kurulumdan başlayalım;
Bunun için aşağıdaki komutu terminalde çalıştırın.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Selenium bir web tarayıcı üzerinde çalıştığı için bu tarayıcı yönetecek bir drivera ihtiyacımız var.

Chrome:
<https://chromedriver.chromium.org/downloads>

Edge:
<https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/>

Firefox:
<https://github.com/mozilla/geckodriver/releases>

Safari:
<https://webkit.org/blog/6900/webdriver-support-in-safari-10/>

Buradan kullanmak istediğiniz tarayıcının driverini indirebilirsiniz Driverı indirirken tarayıcınızın sürümü ile uyumlu olmasına dikkat edin. Ardından driverı python dosyanızla aynı dizine kopyalayın.

Şimdi ilk test kodumuzu çalıştırabiliriz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Driverı elle kurmak yerine otomatik olarak son sürümü kuran webdriver\_manager modülünü de kurabiliriz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu modülü kurduktan sonra aşağıdaki test kodunu çalıştırabiliriz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Seleniumu docker ile çalıştırmak için ise github sayfasınındaki yönlendirmeleri izleyebilirsiniz. Dockerı kurup çalıştırınca http://localhost:4444 adresinde seslenium grid arayüzüne erişebilirsiniz.


[Görsel: Görsel açıklaması yok]


<http://localhost:7900/> adresinden de web tarayıcıyı görüntüleyebiliriz. Varsayılan parola secret dır.
Docker ayakta iken aşağıdaki test kodunu çalıştırabiliriz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Burada browserName kısmına dockerı hangi browser ile kurduysanız o browserın ismini yazmalısınız. Kodu çalıştırılınca <http://localhost:7900/> adresi üzerinde google'ın açıldığını görebilirsiniz.


[Görsel: Görsel açıklaması yok]


Python kodu çalıştırıldı ve selenium grid üzerinde bir sesssion oluşturuldu. Bu session ile google.com adresine gittik. Ancak bu oturumu kapatmadan python kodumuz sonlandı ve oturumumuz açık kaldı. Sessionı kapatmadan başka python kodları çalıştıramayız. Oturumu kapatmak için python kodumuzun sonuna driver.quit() ekleyebiliriz ya da docker'ı yeniden başlatabilrisiniz.


Bölüm Detayı: Selenium Modülü Nasıl Kullanılır?


Kurulum kısmında selenium ile tarayıcıyı açmayı ve bir sayfaya gitmeyi görmüştük. Sayfaya gittikten sonra o sayfada çeşitli işlemler yapabiliriz. Örneğin sayfadaki belli bir metini almak isteyebiliriz, sayfadaki bir butona basmak isteyebiliriz veya sayfayı yukarı-aşağı kaydırmak isteyebiliriz. Bunların hepsi bot yapımında bizim için gereken işlemlerdir.

Web sayfası üzerinde her ne yapmak istersek isteyelim önce o işlemi yapacağımız HTML elemenına erişmemiz gerekir. Bunun için birkaç farklı yol var. Bunlardan bazıları:,

ID: Elemena bir id değeri atanmışsa bu değer ile elemana erişebiliriz. Id değerleri benzersizdir.
NAME: Elemana bir name değeri atanmışsa bu değer ile elemana erişebiliriz. Name değerleri benzersiz değildir, bir sayfada aynı name değerinde başka elemanlar olabilir. Bu durumda ilk bulduğunu alır.
CLASS: Elemana bir class değeri eklenmişse bu class değeri ile erişebiliriz.
XPATH: Sayfa kaynağında erişmek istediğimiz elemanın xpath'ini vererek erişebiliriz. Xpath'i inspector aracından kopyalayabiliriz.


[Görsel: Görsel açıklaması yok]


Burada Google'daki arama çubuğunun XPath'ini almış olduk. Şimdi küçük bir örnek uygulama üzerinde temel mantığı anlamaya çalışalım.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Örnek uygulamayı çalıştırdığımızda, github web sayfası açılır, arama çubuğunu CVE yazılıp arama sayfasına gidilir. Ardından 5 saniye sonra tarayıcı kapanacaktır.


[Görsel: Görsel açıklaması yok]


Burada çıkan sonuçları çekip indeksleyebiliriz. Bu işleme web scraping diyoruz.


Bölüm Detayı: Shodan


Şimdi Shodan üzerinde çalışan bir web botu uygulaması yapalım. Bunun için shodan.io'a girip buradaki arana çubuğununun Xpath değerini kopyalıyoruz. Bu değeri uygulamamızda arama çubuğuna erişmek için kullanacağız.


[Görsel: Görsel açıklaması yok]


Şimdi kodumuzu yazmaya başlayabiliriz. Öncellikle yukarıda bahsettiğimiz gibi import işlemlerini yapıp driver nesnemizi oluşturacağız. Ardından aldığımız xpath değeri ile arama çubuğuna sorgulayacağımız değeri gönderip 'ENTER' değerini göndereceğiz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Uygulamamızı çalıştırdığımızda arama çubuğuna 'phpMyAdmin' yazıp sorgulayacaktır. Şimdi dönen değerleri almaya çalışalım.


[Görsel: Görsel açıklaması yok]


Gördüğümüz gibi dönen bütün sonuçların class isimleri 'result' olarak atanmış. Bu durumdan yararlanarak gelen sonuçlara erişebiliriz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


[Görsel: Görsel açıklaması yok]


Burada alınan elementleri görebiliyoruz.


Bölüm Detayı: Twitter Bot


Twitterdaki bot hesapları elbet duymuşsunuzdur. Bu botlar sosyal medya hesaplarını otomatize etmenin yanı sıra, Twitter üzerinde yapay gündem oluşturmak, çeşitli manipülasyon ve propaganda faaliyetleri için de kullanılıyor. Twitter bot hesapları engellemek için çeşitli önlemler alıyor. Örneğin, agresif biçimde hızlı işlem yapan kullanıcıları yakalıyor. Bunun dışında elemanlara erişimi zorlaştırmak için id, name değerleri ile oynuyor, xpath'i işlevsiz kılıyor.

Twitterın eski versiyonunda selenium ile yazılmış bot örneklerini webde kolayca bulabilirsiniz. Ne yazık ki bugünkü versiyonunda bu botlar çalışmıyor.
Bunun dışında Twitterın kendi apisi ile çeşitli uygulamalar hazırlayabilirsiniz. Ancak apiler tamamen twitterın denetimine tabi. Kısacası Twitter tamamen kontrolü eline aldı diyebiliriz.

Aynı durum instagram ve facebook içinde geçerlidir. Birçok web uygulaması botlara karşı önlemler almış durumda.


Bölüm Detayı: Son


Sonuç olarak, selenium modülü gerçek bir browser üzerinde otomatize işlemler yapmamıza, botlar oluşturmamıza yardımcı olan güzel bir modül ancak bazı web uygulamaları bu botlara karşı önlemler almış durumda. Selenium ile başka ne tür uygulamalar yapılabilir yorumlara beklerim”¦

---

Bölüm: socket


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş


Merhaba bu yazımızda, uzak sunucuların ip ve port adreslerine bağlantı kurmak için kullanabileceğimiz socket modülünü tanıyacağız.


Bölüm Detayı: Socket nedir?


Socket python ile birlikte kurulu halde gelen bir modüldür. Bu modül sayesinde, istenilen ip ve port adresine bağlantı kurabiliriz. Şimdi gelin bu modülü nasıl kullanacağımıza ve bu modül ile neler yapabileceğimize bir bakalım.


Bölüm Detayı: Socket modülü nasıl kullanılır?


Öncelikle socket modülünü import edip bir socket objesi oluşturmamız gerekiyor, bunun için;

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

sonra bu objenin metotlarını kullanarak işlemlerimizi yapacağız, bu metotlar:

socket.listen(): Belirtilen port numarasında açılan sokette dinleme yapar.
socket.accept(): Belirtilen port numarasında açılan sokete gelen istekleri alır.
socket.bind(address): Soketi belirtilen IP adresine bağlar.
socket.close(): Soketi kapatır.
socket.connect(address): Belirtilen adresteki uzak bir sokete bağlanır.
socket.recv(bufsize): Sokete gelen veriyi alır.
socket.sendall(bytes): Sokete veri gönderir.


Bölüm Detayı: Soketi dinleme


Soket açarak belirli bir portu dinleyebiliriz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu kod 127.0.0.1:2222 adresinde açılan soketi dinleyecek, bir bağlantı yakaladığında gelen veriyi aynı şekilde geri gönderecektir. Ardından program sonlanır.


Bölüm Detayı: Sokete bağlanma


Soket açarak belirli bir ip adresi ve porta bağlantı kurabiliriz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu kod 127.0.0.1:2222 adresinde çalışan soketle bağlantı kuracak bir bir data gönderecektir. Burada gönderilen data 'merhaba' mesajıdır. Ardından karşıdan gelen datayı alır ve program sonlanır.


[Görsel: Görsel açıklaması yok]


Soket dinlediğimiz kodu server.py isimli bir dosyaya kaydedelim. Sokete bağlandığımız kodu ise client.py isimli bir dosyaya kaydedelim. Önce server.py dosyasını sonra client.py dosyasını çalıştırdığımızda bağlantı kurulmuş olacaktır.


Bölüm Detayı: Port Taraması


Socket modülü ile ip ve port adreslerine bağlantı kurabiliyorduk. Bu sayede bir host üzerinde açık portları ve banner bilgilerini bulabiliriz. Banner bilgileri bu portta hangi servisin çalıştığı hakkında bize bilgi verecektir.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Typhoon makinesi üzerinde bu kodu çalıştırırsak bize açık portları ve banner bilgilerini gertirir.


[Görsel: Görsel açıklaması yok]



Bölüm Detayı: SSL


Https protokolü ile çalışan güvenli sitelere erişmeye çalıştığımızda bir SSL sertifikasına ihiyaç duyarız. Bunun için ssl modülünden yardım alabiliriz.

Varsayılan olarak http protokolü 80, https protokolü 443 portlarında çalışır.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Son


Bu modül ile siber güvenlik alanında yapabileceğimiz başka ne tür işlemler olabilir? Yorumlara beklerim”¦

---

Bölüm: paramiko


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş


Merhaba, bu yazımda Python ile SSH bağlantıları kurmamızı sağlayan paramiko modülünü tanıyacağız.


Bölüm Detayı: paramiko nedir?


SSH (Secure Shell), ağ hizmetlerinin güvenli olmayan bir ağ üzerinde güvenli şekilde çalıştırılması için kullanılan bir kriptografik ağ protokolüdür. SSH ile ağ cihazlarınıza, linux ve windows makinelere bağlanabilir ve onları yönetebilirsiniz. Ön tanımlı olarak 22 portunda çalışır.

Paramiko Python ile SSH bağlantılarını kolaylıkla yapmamızı sağlayan bir modüldür. Bu sayede Python ile uzak sunucuları yöneten uygulamalar yazabiliriz. Örneğin; bir botnet kurabilir, uzak bir sunucu üzerinde zararlı yazılım çalıştırabilir ya da SSH zafiyetlerini tarayan uygulamalar yazabiliriz. Şimdi bu modülü nasıl kullanacağımıza bir bakalım.


Bölüm Detayı: Kurulum


Paramiko kurulumu için aşağıdaki aşağıdaki kodu terminal ekranında çalıştırınız.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Ardından bir python dosyası açıp modülü projemize dahil edebiliriz.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

şimdi paramiko modülü ile bir SSH bağlantısı yapalım


Bölüm Detayı: Paramiko Modülü nasıl kullanılır?


Paramiko modülü ile SSH bağlantısı kurmak için;

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu örnekte pramaiko modülü ile bir SSH client'ı oluşturduk. Uygulama belirtilen ip ve port adresine kullanıcı adı ve parola bilgileri ile bir bağlantı gerçekleştirir ve 'whoami' komutunu çalıştırır. Ardından dönen cevabı ekrana yazdırır ve SSH bağlantısını kapatır.


[Görsel: Görsel açıklaması yok]


Bu örnekte, sanal ortamda Typhoon makinesini çalıştırarak SSH ile bağlandık. Şimdi bu modül ile daha neler yapabileceğimize bir bakalım.


Bölüm Detayı: SSH brute force saldırısı


Paramiko ile SSH bağlantısı yapabilediğimize göre bir kabaa kuvvet saldırısı da yapabiliriz. Bunun için bir kullanıcı adı listesi bir de parola listesi oluşturacağız. Ardından bu listedeki bilgiler ile SSH bağlantısı kurmaya çalışacağız.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Yukarıdaki kodda saldırı için bir kullanıcı adı listesi bir de parola listesi gerekmektedir, bunları koddaki listelere ekleyebilirsiniz. Hedef ip adresi de ssh.connect() fonskiyonuna verilmelidir. Ardından kod çalıştırıldığında, ilgili ip adresine kullanıcı adı ve parola listelerindeki değerler teker teker denenir. Bu işlemde hedef sunucuda SSH servisinin açık olduğundan emin olun. Aksi takdirde, işlem başarısız olacaktır.


Bölüm Detayı: Passwd dosyasını çekme


SSH bağlantısını sağladığımız taktirde, hedef sunucudan aldığımız shell ile istediğimiz işlemi yapabiliriz. Bunun için ssh.exec\_command() metodunu kullanırız.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Yukarıdaki kod ile hedef sunucunun passwd dosyasını okuyup ekrana yazdırdık.


Bölüm Detayı: Son


Sonuç olarak, paramiko modülü ile uzak sunuculara SSH bağlantısı yaptık ve sunucular üzerinde komut çalıştırdık. Paramiko ile başka ne tür uygulamalar yapılabilir yorumlara beklerim”¦

---

Bölüm: scapy


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş

Scapy, ağ paketlerini göndermek, koklamak (sniffing), analiz etmek ve manipüle etmek için kullanılan güçlü bir interaktif paket manipülasyon kütüphanesidir. Geleneksel araçların (ping, traceroute, nmap, tcpdump vb.) yaptığı işlerin çoğunu kendi özel scriptlerinizle yapabilmenizi sağlar.


Bölüm Detayı: Kurulum

Scapy'yi sisteminize kurmak için aşağıdaki komutu kullanabilirsiniz:
[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Temel Kullanım

Aşağıdaki örnekte, Scapy kullanarak basit bir ICMP (Ping) paketi oluşturup gönderiyoruz ve gelen yanıtı yazdırıyoruz:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

Bölüm: python-nmap


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş

python-nmap, popüler port tarayıcı ve ağ keşif aracı Nmap'i Python scriptleri içerisinden kontrol etmenizi sağlar. Tarama sonuçlarını otomatikleştirerek raporlama veya diğer otomasyon süreçlerinde kullanmak için idealdir.


Bölüm Detayı: Kurulum

Bu kütüphaneyi kullanmak için sisteminizde Nmap'in kurulu olması gerekir. Kütüphaneyi kurmak için:
[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Temel Kullanım

Belirli bir hedef üzerinde hızlı bir port taraması gerçekleştirmek ve sonuçları almak için aşağıdaki kodu kullanabiliriz:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

Bölüm: beautifulsoup4


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş

BeautifulSoup, HTML ve XML dökümanlarını ayrıştırmak (parse etmek) için kullanılan popüler bir web kazıma (web scraping) kütüphanesidir. Karışık HTML yapıları içerisinden belirli etiketleri, sınıfları veya id'leri kolayca ayıklamayı sağlar.


Bölüm Detayı: Kurulum

BeautifulSoup4 modülünü kurmak için:
[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Temel Kullanım

Aşağıdaki örnekte, requests ile bir web sayfasını çekip BeautifulSoup ile içerisindeki tüm linkleri (a etiketlerini) listeliyoruz:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

Bölüm: playwright


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş

Playwright, modern web sitelerinde tarayıcı otomasyonu ve testleri gerçekleştirmek için geliştirilmiş güçlü bir kütüphanedir. Chromium, Firefox ve WebKit tarayıcılarını headless (arayüzsüz) veya normal modda kontrol etmenizi sağlar.


Bölüm Detayı: Kurulum

Playwright modülünü kurup gerekli tarayıcıları indirmek için:
[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Temel Kullanım

Aşağıdaki kod, Playwright kullanarak arka planda bir tarayıcı açıp belirtilen web sayfasının ekran görüntüsünü kaydeder:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

Bölüm: hashlib


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş

hashlib, Python'un yerleşik (built-in) kriptografik hash fonksiyonlarını barındıran modülüdür. Verilerin bütünlüğünü doğrulamak, parolaları güvenli bir şekilde saklamak veya hash kırma algoritmaları yazmak için MD5, SHA-1, SHA-256 gibi algoritmaları destekler.


Bölüm Detayı: Kurulum

Yerleşik bir modül olduğu için ek bir kuruluma gerek yoktur. Doğrudan import hashlib yazarak kullanabilirsiniz.


Bölüm Detayı: Temel Kullanım

Bir metnin SHA-256 hash değerini hesaplamak için aşağıdaki yapıyı kullanabilirsiniz:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

Bölüm: cryptography


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş

cryptography, modern simetrik (AES gibi) ve asimetrik (RSA gibi) şifreleme yöntemlerini içeren kapsamlı bir kütüphanedir. Güvenli veri iletimi ve şifreleme işlemleri yapmak için standart kütüphanelerin başında gelir.


Bölüm Detayı: Kurulum

Kütüphaneyi kurmak için:
[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Temel Kullanım

Aşağıdaki örnekte Fernet (simetrik şifreleme) kullanarak bir veriyi şifreliyor ve ardından şifreyi çözüyoruz:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

Bölüm: os ve sys


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş

os ve sys, Python'un yerleşik işletim sistemi ve sistem parametreleri ile etkileşime giren temel modülleridir. Dosya işlemleri, çevre değişkenleri, komut satırı argümanları ve çalışma ortamını yönetmek için kullanılırlar.


Bölüm Detayı: Kurulum

Yerleşik (built-in) modüller oldukları için kuruluma ihtiyaç duymazlar.


Bölüm Detayı: Temel Kullanım

Komut satırından parametre almayı ve güncel çalışma dizinini öğrenmeyi gösteren basit bir script:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

Bölüm: subprocess


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş

subprocess modülü, Python scriptleri içerisinden yeni süreçler (process) başlatmanıza, işletim sistemine ait yerel komutları çalıştırmanıza ve bunların girdi/çıktı/hata akışlarını yönetmenize olanak tanır.


Bölüm Detayı: Kurulum

Yerleşik (built-in) bir modüldür, kuruluma gerek yoktur.


Bölüm Detayı: Temel Kullanım

Aşağıdaki örnekte, sistemde "ping" komutunu çalıştırıp çıktısını yakalıyor ve ekrana yazdırıyoruz:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

Bölüm: ctypes


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş

ctypes, Python için bir dış fonksiyon kütüphanesidir. Doğrudan C dilinde yazılmış dinamik kütüphaneleri (Windows'ta DLL, Linux'ta .so dosyalarını) belleğe yüklemeyi ve C veri tiplerini kullanmayı sağlar. Sistem API'leri ile doğrudan konuşmak için kullanılır.


Bölüm Detayı: Kurulum

Yerleşik (built-in) bir modüldür, kuruluma gerek yoktur.


Bölüm Detayı: Temel Kullanım

Windows işletim sisteminde ctypes kullanarak basit bir bilgi mesaj kutusun (MessageBox) gösteren örnek:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

Bölüm: pwntools


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Giriş

Pwntools, exploit yazımını, ağ bağlantılarını (sockets), ELF dosyalarının analizini ve yerel/uzak süreç manipülasyonunu kolaylaştırmak için geliştirilmiş, CTF (Capture The Flag) yarışmacıları ve exploit geliştiricileri için standart haline gelmiş bir CTF framework'üdür.


Bölüm Detayı: Kurulum

Pwntools'u kurmak için:
[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Temel Kullanım

Yerel bir süreçle veya uzak bir portla etkileşim kurmak, veri gönderip almak için pwntools kullanımı:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Python, siber güvenlik dünyasında (hem ofansif yani saldırı, hem de defansif yani savunma tarafında) en çok tercih edilen dillerden biridir. Bir hackerın ya da siber güvenlik uzmanının Python kullanırken işini kolaylaştıran, hazır fonksiyonlar sunan birçok modül ve kütüphane bulunur.

Bu modülleri kullanım amaçlarına göre kategorize ederek inceleyebiliriz. Aşağıdaki interaktif diyagramda kategorileri ve içerdikleri modülleri görebilir, ilgilendiğiniz modülün üzerine tıklayarak doğrudan detaylı anlatımına gidebilirsiniz:

---

Bölüm: Modül Haritası


[Mermaid Diyagramı: Burada bir mimari veya akış şeması bulunmaktadır. Şema detayları görsel olarak mevcuttur.]
---

> ⚠️ Önemli Not: Bu modüllerin siber güvenlik testlerinde (Sızma Testleri) ve eğitim amaçlı laboratuvar ortamlarında kullanımı tamamen yasaldır. Ancak, yetkiniz olmayan sistemlere karşı bu araçlarla tarama veya saldırı yapmak yasal suç teşkil eder.

Verinizin mimarı olun, egemenliğinizi geri alın. Dinlediğiniz için teşekkürler!
