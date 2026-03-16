---
title: "Windows Kalıcılık Sağlama(Persistence) Metotları"
date: 2024-11-18
draft: false
---

---

### Windows Kalıcılık Sağlama(Persistence) Metotları

![](/images/1_embmEuQRxJRHe7TWE4Y6hw.png)

Windows’ta kalıcılık sağlama (persistence) yöntemleri, bir sistemin yeniden başlatılması veya kullanıcı oturumunun kapatılması durumunda bile zararlı yazılımların veya yetkisiz erişimlerin devam etmesini sağlamak için kullanılır.

### 1- Kullanıcı Manipülasyonu (Users)

Saldırganlar tarafından kalıcılığı sürdürmek için yaygın olarak kullanılan bir yöntem de kullanıcı yaratmaktır. Aslında bunun yapılmasının tek nedeni kalıcılığı sağlamak değildir. Saldırgan(lar)ın “Administrator” hesabının kontrolünü ele geçirdiklerinde yeni kullanıcılar oluşturduklarını gözlemliyoruz. Çünkü bu önemli bir kullanıcıdır ve faaliyetleri düzenli olarak takip edilebilir. Bu nedenle, çok dikkat çekmeyecek yeni bir kullanıcı yaratıyorlar ve mümkünse bu kullanıcının ayrıcalıklarını artırıyorlar.

Oluşturulan kullanıcılar genellikle “support”, “sysadmin”, “admin” gibi anahtar kelimeler içerir. Çoğu şirkette bu gibi isimlere sahip kullanıcılar fazla dikkat çekmeyecektir.

Bilgisayarda var olan hesapları görüntülemek için “net users” komutunu kullanabiliriz.

![](/images/1_HvOGzRb3pHx18C05BL9HYg.png)

net user

Bir olay müdahale prosedürü sırasında, hızlı bir şekilde değerlendirmemiz gereken 2 şey vardır. Şu anda sistemde olmaması gereken bir kullanıcı var mı? Saldırı sırasında bir kullanıcı oluşturuldu ve daha sonra silindi mi?

Oluşturulan ve silinen kullanıcıları görmek için EventViewer üzerinde araştırabiliriz.

1. **Kullanıcı Oluşturma**:

* **Event ID 4720**: Yeni bir kullanıcı hesabı oluşturulduğunda bu olay kaydedilir.

1. **Kullanıcı Silme**:

* **Event ID 4726**: Bir kullanıcı hesabı silindiğinde bu olay kaydedilir.

![](/images/1_4nn-RZO_QOj2Z31N2iW__Q.png)

Event Viewer Filtereleme

Olay Görüntüleyecisinde yer alan kayıtlarda oluşturulan kullanıcıyı, zamanını ve hangi kullanıcı üzerinden oluşturulduğunu görebiliriz.

![](/images/1_1xVpZh22clB0-MLj_t8dfA.png)

EventViewer log inceleme

---

### 2- Zamanlanmış Görevler (Scheduled Task)

En çok kullanılan kalıcılık yöntemlerinden biri zamanlanmış görevler oluşturmaktır. Virüslerden fidye yazılımlarına kadar çoğu zararlı şey, kalıcılığı korumak için zamanlanmış görevler kullanır. Saldırgan, zamanlanmış görevler kullanarak zararlı dosyanın düzenli aralıklarla çalışmasını sağlar. Sistemde aktif olarak çalışan şüpheli zamanlanmış görevleri tespit etmenin çeşitli yolları vardır. Öncelikle bir sysinternals aracı olan “Autoruns” kullanılarak bunun nasıl yapıldığını gösterelim. Autoruns: [İndir](https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns).

![](/images/1_idpBPfOpk5jfDLg-y3C8wA.png)

Autoruns aracı ile analiz

Autorun aracı ile scheduled tasks bölümüne baktığımızda OneDrive servisinin zamanlanmış görevlerini görebiliriz. Tabi bu servis microsoft imzalı ve doğrulanmış olduğu için güvenli ve yasaldır.

---

### 3- Kayıt Defteri Çalıştırma Anahtarları(Registry Run Keys)

**Registry run keyleri**, Windows işletim sisteminde, belirli programların veya komutların otomatik olarak başlatılmasını sağlamak için kullanılan yerlerdir. Bu anahtarlar, sistem açıldığında veya bir kullanıcı oturum açtığında devreye girer. Zararlı yazılımlar, bu anahtarları kullanarak sistemde kalıcılık (persistence) sağlamaya çalışır, yani sistem yeniden başlatıldığında veya kullanıcı oturum açtığında kendilerini yeniden başlatabilirler.

Registry keyleri regedit aracı ile düzenlenebilir.

![](/images/1_KJ7xCp0G-BiHtQ1-wsCjBw.jpeg)

registry editor

**Aşağıdaki çalıştırma anahtarları Windows sistemlerinde varsayılan olarak oluşturulur:**  
   
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\Run  
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\RunOnce   
 ● HKEY\_LOCAL\_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run  
 ● HKEY\_LOCAL\_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnce

**Başlangıç klasörü öğelerini kalıcılık için ayarlamak üzere aşağıdaki Kayıt Defteri anahtarları kullanılabilir:**

● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\UserShellFolders  
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\ShellFolders   
 ● HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellFolders   
 ● HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\UserShellFolders

**Aşağıdaki Kayıt Defteri anahtarları, önyükleme sırasında hizmetlerin otomatik olarak başlatılmasını kontrol edebilir:**

● HKEY\_LOCAL\_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunServices Once   
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\RunServices Once   
 ● HKEY\_LOCAL\_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunServices   
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\RunServices

**Başlangıç programlarını belirtmek için ilke ayarlarını kullanmak, iki Kayıt Defteri anahtarından birinde karşılık gelen değerleri oluşturur:**

● HKEY\_LOCAL\_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run  
 ● HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run

Bu anahtarlar ile boot zamanında veya logon zamanında programlar başlatıabilir. Autoruns aracı ile başlatılan programlaarı görebiliriz.

![](/images/1_y3d5O0LdaV4GmOdbHnHpng.png)

Autoruns Logon Keys

![](/images/1_Z-1VEztRVjoi7huNxW_u3A.png)

Autoruns Boot Keys

---

### 4-Başlangıç Klasörü(Startup Folder)

Başlangıç dosyasına eklenen dosyaları görüntülemek için aşağıdaki indekslerin işaretlenmesi gerekmektedir.

* C:\Users\[Username]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
* C:\Programshell:startupData\Microsoft\Windows\Start Menu\Programs\StartUp

Windowsta win+R tuşları ile açılan çalıştır penceresi ile başlandıç klasörüne erişebiliriz.

> shell:startup

![](/images/1_1VKN6kfhHUHtAxIC_SMn-g.png)

startup folder

Çalıştır aracı ile açtığımız başlangıç klasöründe zararlının bırakmış olduğu dosyaları görebiliriz.

![](/images/1_wYEoJlBvJhUvXomYDotB-g.png)

Başlangıç Klasörü

---

### 5- Hizmetler(Services)

Saldırganlar, zararlı komutlar çalıştırmak için yeni bir hizmet oluşturabilir veya mevcut bir hizmeti değiştirebilir. Oluşturdukları veya değiştirdikleri hizmetin tespit edilmesini zorlaştırmak için “Chrome Update” gibi yasal kod adları kullanabilirler.

Olay Günlüklerinden yeni oluşturulmuş bir hizmeti tespit etmek için **4697**:**Sisteme bir hizmet yüklendi** ID’li log kullanılabilir.

Kalıcılığın yanı sıra hack faaliyetlerini kolaylıkla yürütebilmek için güvenlik önlemleri için çalıştırılan “Windows Defender”, “Firewall” vb. servisleri sürekli durdururlar.

Bu nedenlerle bir Windows cihazı analiz edilirken hangi servislerin oluşturulduğu/değiştirildiği ve hangi sistemlerin durdurulduğu incelenmelidir.

Bu incelemede yine autoruns aracı ve olay görüntületyicisi kullanılabilir.

Not: Test makinem ransomware bulaşması sonucu çöktüğü için bu bölümün resimlerini alamadım, tekrar kurmayla da uğraşmak istemedim :)

#### 6-BITS Jobs

**BITS (Background Intelligent Transfer Service)**, Windows işletim sisteminin bir bileşenidir ve genellikle güncellemeleri ve dosya aktarımı işlemlerini gerçekleştirmek için kullanılır.Ancak, kötü niyetli kullanıcılar BITS’yi kötü amaçlı yazılımlar için kullanabilir.

**BITS Jobs ile malware persistence** şu şekilde gerçekleşebilir:

1. Dosya İndirme ve Yürütme: Kötü niyetli bir uygulama BITS job oluşturarak bir dosyayı indirebilir ve bu dosyayı yürütebilir. Bu, uygulamanın uzun süre çalışmasını sağlar ve sistem yeniden başlatıldığında bile etkili olabilir.  
2. Gizlilik ve Güvenlik Bypass: BITS jobs, genellikle güvenlik duvarları tarafından izin verilir ve kötü amaçlı işlemler için ideal bir yöntem olabilir. Bu, kötü niyetli uygulamaların tespiti ve engellenmesini zorlaştırır.  
3. Komut Çalıştırma: BITS jobs, belirli bir komutu yürütmek için kullanılabilir. Bu komut, BITS job tamamlandığında veya hata oluştuğunda çalıştırılabilir.

Örnek olarak, kötü niyetli bir uygulama BITSAdmin aracılığıyla bir job oluşturabilir ve bu job, belirli bir dosyayı indirip çalıştıracak şekilde ayarlanabilir.

---

Bu yazımda zararlı yazılımların bilgisayarlarda kalıcılık sağlama yöntemlerine değindim. Daha fazlası için mitre attack enterprise matrisinin persistence taktiğini inceleyebilirsiniz. Bknz: <https://attack.mitre.org/tactics/TA0003/>