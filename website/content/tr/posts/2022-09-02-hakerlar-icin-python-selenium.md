---
title: "Hakerlar için Python: selenium"
date: 2022-09-02
description: "Merhaba bu yazımızda web siteleri üzerinde bir kullanıcı gibi işlemler yapmamızı sağlayan selenium modülünü tanıyacağız."
featuredImage: "https://cdn-images-1.medium.com/max/800/1*0uUmJ2J01vpcie8grd91Yw.png"
series: ["Hakerlar için Python"]
---

### **Hakerlar için Python: selenium**

![](https://cdn-images-1.medium.com/max/800/1*0uUmJ2J01vpcie8grd91Yw.png)

### Giriş

Merhaba bu yazımızda web siteleri üzerinde bir kullanıcı gibi işlemler yapmamızı sağlayan selenium modülünü tanıyacağız.

### Selenium Nedir?

[Selenium](https://selenium-python.readthedocs.io/) bir web otomasyon kütüphanesidir. Selenium ile bir web sitesini ziyaret edip etkileşimde bulunabiliriz.

### Kurulum

[Selenium](https://pypi.org/project/selenium/) modülünü kurmak ve çalıştırmak için birkaç farklı yöntem izleyebilirsiniz. Herşeyi manuel olarak kurup bilgisayarınızda çalıştırabilirsiniz, tarayıcınızı çalıştıracak driverı otomatik kurabilirsiniz veya docker teknoloisinden faydalanabilirsiniz.

Klasik manuel kurulumdan başlayalım;   
Bunun için aşağıdaki komutu terminalde çalıştırın.

```
pip install selenium
```

Selenium bir web tarayıcı üzerinde çalıştığı için bu tarayıcı yönetecek bir drivera ihtiyacımız var.

**Chrome**:  
<https://chromedriver.chromium.org/downloads>

**Edge**:  
<https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/>

**Firefox**:  
<https://github.com/mozilla/geckodriver/releases>

**Safari**:  
<https://webkit.org/blog/6900/webdriver-support-in-safari-10/>

Buradan kullanmak istediğiniz tarayıcının driverini indirebilirsiniz Driverı indirirken tarayıcınızın sürümü ile uyumlu olmasına dikkat edin. Ardından driverı python dosyanızla aynı dizine kopyalayın.

Şimdi ilk test kodumuzu çalıştırabiliriz.

```
from selenium import webdriver  
driver = webdriver.Chrome()  
driver.get("http://google.com")
```

Driverı elle kurmak yerine otomatik olarak son sürümü kuran webdriver\_manager modülünü de kurabiliriz.

```
pip install webdriver-manager
```

Bu modülü kurduktan sonra aşağıdaki test kodunu çalıştırabiliriz.

```
from selenium import webdriver  
from webdriver_manager.chrome import ChromeDriverManager
```

```
driver = webdriver.Chrome(ChromeDriverManager().install())  
driver.get("http://google.com")
```

Seleniumu [docker](https://hub.docker.com/r/selenium/standalone-firefox) ile çalıştırmak için ise [github](https://github.com/SeleniumHQ/docker-selenium) sayfasınındaki yönlendirmeleri izleyebilirsiniz. Dockerı kurup çalıştırınca [http://localhost:4444](http://localhost:4444/) adresinde seslenium grid arayüzüne erişebilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*ibMLsRZmjC54Fxcif1XP_A.png)

<http://localhost:7900/> adresinden de web tarayıcıyı görüntüleyebiliriz. Varsayılan parola *secret* dır.  
 Docker ayakta iken aşağıdaki test kodunu çalıştırabiliriz.

```
from selenium import webdriver  
from selenium.webdriver.common.keys import Keys  
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities  
					   
driver = webdriver.Remote(  
   command_executor="http://127.0.0.1:4444/wd/hub",  
   desired_capabilities={"browserName": "firefox"})  
driver.get("http://google.com")
```

Burada browserName kısmına dockerı hangi browser ile kurduysanız o browserın ismini yazmalısınız. Kodu çalıştırılınca <http://localhost:7900/> adresi üzerinde google’ın açıldığını görebilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*WoWx7BtNKQIIwMPjVnMg4w.png)

Python kodu çalıştırıldı ve selenium grid üzerinde bir sesssion oluşturuldu. Bu session ile google.com adresine gittik. Ancak bu oturumu kapatmadan python kodumuz sonlandı ve oturumumuz açık kaldı. Sessionı kapatmadan başka python kodları çalıştıramayız. Oturumu kapatmak için python kodumuzun sonuna *driver.quit()* ekleyebiliriz ya da docker’ı yeniden başlatabilrisiniz.

### Selenium Modülü Nasıl Kullanılır?

Kurulum kısmında selenium ile tarayıcıyı açmayı ve bir sayfaya gitmeyi görmüştük. Sayfaya gittikten sonra o sayfada çeşitli işlemler yapabiliriz. Örneğin sayfadaki belli bir metini almak isteyebiliriz, sayfadaki bir butona basmak isteyebiliriz veya sayfayı yukarı-aşağı kaydırmak isteyebiliriz. Bunların hepsi bot yapımında bizim için gereken işlemlerdir.

Web sayfası üzerinde her ne yapmak istersek isteyelim önce o işlemi yapacağımız HTML elemenına erişmemiz gerekir. Bunun için birkaç farklı yol var. Bunlardan bazıları:,

* ID: Elemena bir id değeri atanmışsa bu değer ile elemana erişebiliriz. Id değerleri benzersizdir.
* NAME: Elemana bir name değeri atanmışsa bu değer ile elemana erişebiliriz. Name değerleri benzersiz değildir, bir sayfada aynı name değerinde başka elemanlar olabilir. Bu durumda ilk bulduğunu alır.
* CLASS: Elemana bir class değeri eklenmişse bu class değeri ile erişebiliriz.
* XPATH: Sayfa kaynağında erişmek istediğimiz elemanın xpath’ini vererek erişebiliriz. Xpath’i inspector aracından kopyalayabiliriz.

![](https://cdn-images-1.medium.com/max/800/1*6iylSyMtw2y6d-OsZcECpA.png)

Burada Google’daki arama çubuğunun XPath’ini almış olduk. Şimdi küçük bir örnek uygulama üzerinde temel mantığı anlamaya çalışalım.

```
#import işlemleri
```

```
from selenium import webdriver                    
from selenium.webdriver.common.keys import Keys  
from selenium.webdriver.common.by import By  
import time
```

```
#driver nesnesini çağır (Ben seleniumu docker üzerinde çalıştırdım)					
```

```
driver = webdriver.Remote(  
   command_executor="http://127.0.0.1:4444/wd/hub",  
   desired_capabilities={"browserName": "firefox"})
```

```
driver.get("https://github.com") #github web sayfasına git
```

```
# XPATH ile github sayfasındaki arama çubuğuna eriş  
searchInput = driver.find_element(By.XPATH, "/html/body/div[1]/header/div/div[2]/div[2]/div[1]/div/div/form/label/input[1]")
```

```
time.sleep(1)  
searchInput.send_keys("CVE") # arama çubuğuna ‘CVE’ yaz.  
time.sleep(3)  
searchInput.send_keys(Keys.ENTER) # arama çubuğunda ENTER’a bas.  
time.sleep(5)
```

```
driver.quit()
```

Örnek uygulamayı çalıştırdığımızda, github web sayfası açılır, arama çubuğunu CVE yazılıp arama sayfasına gidilir. Ardından 5 saniye sonra tarayıcı kapanacaktır.

![](https://cdn-images-1.medium.com/max/800/1*MWyxd0MQQ9IsRkFYJK7s8w.png)

Burada çıkan sonuçları çekip indeksleyebiliriz. Bu işleme web scraping diyoruz.

### Shodan

Şimdi Shodan üzerinde çalışan bir web botu uygulaması yapalım. Bunun için [shodan.io](https://www.shodan.io/)’a girip buradaki arana çubuğununun Xpath değerini kopyalıyoruz. Bu değeri uygulamamızda arama çubuğuna erişmek için kullanacağız.

![](https://cdn-images-1.medium.com/max/800/1*e5yR7mUfSRno_MxYDkshNg.png)

Şimdi kodumuzu yazmaya başlayabiliriz. Öncellikle yukarıda bahsettiğimiz gibi import işlemlerini yapıp driver nesnemizi oluşturacağız. Ardından aldığımız xpath değeri ile arama çubuğuna sorgulayacağımız değeri gönderip ‘*ENTER’* değerini göndereceğiz.

```
from selenium import webdriver  
from selenium.webdriver.common.keys import Keys  
from selenium.webdriver.common.by import By  
import time
```

```
driver = webdriver.Remote(  
   command_executor="http://127.0.0.1:4444/wd/hub",  
   desired_capabilities={"browserName": "firefox"})
```

```
driver.get("https://www.shodan.io/")
```

```
searchInput = driver.find_element(By.XPATH, "/html/body/div[2]/div/div/div[1]/form/div/div/input")
```

```
searchInput.send_keys("phpMyAdmin", Keys.ENTER)
```

```
time.sleep(10)  
driver.quit()
```

Uygulamamızı çalıştırdığımızda arama çubuğuna ‘phpMyAdmin’ yazıp sorgulayacaktır. Şimdi dönen değerleri almaya çalışalım.

![](https://cdn-images-1.medium.com/max/800/1*nryPmk-rhb0RiU-lv0zniw.png)

Gördüğümüz gibi dönen bütün sonuçların class isimleri ‘result’ olarak atanmış. Bu durumdan yararlanarak gelen sonuçlara erişebiliriz.

```
results = driver.find_elements(By.CLASS_NAME, 'result')  
print(results)
```

![](https://cdn-images-1.medium.com/max/800/1*YjRwxuXoOD18s9ceUn04MA.png)

Burada alınan elementleri görebiliyoruz.

### Twitter Bot

Twitterdaki bot hesapları elbet duymuşsunuzdur. Bu botlar sosyal medya hesaplarını otomatize etmenin yanı sıra, Twitter üzerinde yapay gündem oluşturmak, çeşitli manipülasyon ve propaganda faaliyetleri için de kullanılıyor. Twitter bot hesapları engellemek için çeşitli önlemler alıyor. Örneğin, agresif biçimde hızlı işlem yapan kullanıcıları yakalıyor. Bunun dışında elemanlara erişimi zorlaştırmak için id, name değerleri ile oynuyor, xpath’i işlevsiz kılıyor.   
   
 Twitterın eski versiyonunda selenium ile yazılmış bot örneklerini webde kolayca bulabilirsiniz. Ne yazık ki bugünkü versiyonunda bu botlar çalışmıyor.   
 Bunun dışında Twitterın kendi apisi ile çeşitli uygulamalar hazırlayabilirsiniz. Ancak apiler tamamen twitterın denetimine tabi. Kısacası Twitter tamamen kontrolü eline aldı diyebiliriz.  
   
 Aynı durum instagram ve facebook içinde geçerlidir. Birçok web uygulaması botlara karşı önlemler almış durumda.

### Son

Sonuç olarak, selenium modülü gerçek bir browser üzerinde otomatize işlemler yapmamıza, botlar oluşturmamıza yardımcı olan güzel bir modül ancak bazı web uygulamaları bu botlara karşı önlemler almış durumda. Selenium ile başka ne tür uygulamalar yapılabilir yorumlara beklerim…