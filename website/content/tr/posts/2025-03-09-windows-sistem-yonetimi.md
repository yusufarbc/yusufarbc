---
title: "Windows Sistem Yönetimi"
date: 2025-03-09
description: "Windows Sistem Yönetimi, Windows işletim sistemlerini yönetmeyi içeren bir dizi süreç ve araçtır. Bu süreçler, kullanıcı ve hesap yönetiminden kaynakların optimize edilmesine, güvenlik politikalarının..."
featuredImage: "https://cdn-images-1.medium.com/max/800/1*QTSThAAz9yc368eD-MMw5g.png"
---

### Windows Sistem Yönetimi

![](https://cdn-images-1.medium.com/max/800/1*QTSThAAz9yc368eD-MMw5g.png)

Windows Sistem Yönetimi, Windows işletim sistemlerini yönetmeyi içeren bir dizi süreç ve araçtır. Bu süreçler, kullanıcı ve hesap yönetiminden kaynakların optimize edilmesine, güvenlik politikalarının uygulanmasından ağ yapılandırmalarının kontrol edilmesine kadar geniş bir yelpazeyi kapsar. Sistem yöneticileri; Microsoft Management Console (MMC), PowerShell ve Grup İlkesi Yönetimi (GPO) gibi araçları kullanarak sistem performansını izler, sorun giderir ve otomasyon sağlayarak operasyonel verimliliği artırır. Ayrıca, kullanıcıların ve sistem kaynaklarının merkezi veya yerel düzeyde uyum içinde çalışmasını sağlamak için gerekli yapılandırmaları gerçekleştirir. Windows sistem yönetimi, bireysel kullanıcılar ve kurumsal ağların ihtiyaçlarını karşılamak için kritik bir rol oynar.

---

### Command Prompt — CMD

**Command Prompt (CMD)**, Windows işletim sisteminin komut satırı arayüzüdür ve temel sistem yönetimi işlemleri dahil olmak üzere birçok görevi gerçekleştirmek için kullanılabilir.

Otomasyon veya tekrar eden görevler için CMD komutları **BAT dosyası** (veya **Batch dosyası**) içinde toplanabilir. Bu dosyalar, `.bat` uzantısına sahiptir ve çift tıklanarak veya CMD üzerinden çalıştırılabilir.

Bazı sık kullanılan cmd komutları listelenmiştir:

#### 1- **Sistem Bilgilerini Görüntüleme**

> systeminfo

İşletim sistemi, donanım ve ağ bilgileri gibi detaylı sistem bilgilerini listeler.

#### 2- **İşletim Sistemi Sürümünü Görüntüleme**

> ver

İşletim sisteminin sürüm bilgisini gösterir

#### 3- **Bilgisayar Adını Görüntüleme**

> hostname

Bilgisayarın adını gösterir.

#### 4- **Sistem Zamanını Görüntüleme**

> time

Sistem saatini gösterir ve değiştirmenize izin verir.

#### 5- Sistem saatini görüntüleme

> date

Sistem tarihini gösterir ve değiştirmenize izin verir.

#### **6- Dosya Silme**

> del <dosya\_adı>

Belirtilen dosyayı siler.

#### **7- Dizin Silme**

> rmdir <dizin\_adı>

Belirtilen dizini siler.

#### 8- **IP Adresini Görüntüleme**

> ipconfig

Ağ bağdaştırıcılarının IP adresi, alt ağ maskesi ve varsayılan ağ geçidi gibi bilgilerini gösterir.

#### **9- Ağ Bağlantılarını Test Etme (Ping)**

> ping <hedef\_adres>

Belirtilen hedefe ping atarak bağlantıyı test eder

#### 10- **Ağ Yönlendirme Tablosunu Görüntüleme**

> route print

Ağ yönlendirme tablosunu gösterir.

#### 11- **Ağ Paylaşımlarını Listeleme**

> net share

Bilgisayardaki paylaşılan kaynakları listeler.

#### 12- **DNS Önbelleğini Temizleme**

> ipconfig /flushdns

DNS önbelleğini temizler.

#### 13- **Görevleri Listeleme**

> tasklist

Çalışan süreçleri listeler.

#### 14- **Görevi Sonlandırma**

> taskkill /pid <süreç\_id> /f

Belirtilen süreci sonlandırır.

#### **15- Hizmetleri Listeleme**

> sc start <hizmet\_adı>  
> sc stop <hizmet\_adı>

Belirtilen hizmeti başlatır veya durdurur.

#### 16- **Hizmet Başlatma/Durdurma**

> shutdown /s /t 0  
> shutdown /r /t 0

Belirtilen hizmeti başlatır veya durdurur.

#### 17- **Sistem Kapatma/Yeniden Başlatma**

> shutdown /s /t 0  
> shutdown /r /t 0

Sistemi kapatır veya yeniden başlatır.

#### 18- **Güç Seçeneklerini Yönetme**

> powercfg /list

Güç planlarını listeler.

#### 19- **Disk Birimlerini Listeleme**

> diskpart  
> list volume

Disk birimlerini listeler.

#### 20- **Disk Temizleme**

> cleanmgr

Disk temizleme aracını başlatır.

#### 21- **Disk Kontrolü**

> chkdsk <sürücü\_harfi>

Diski kontrol eder ve hataları düzeltir.  
**Örnek**: `chkdsk C: /f`

#### 22- **Kullanıcı Hesaplarını Listeleme**:

> net user

Sistemdeki kullanıcı hesaplarını listeler

#### **23- Kullanıcı Ekleme/Silme**

> net user <kullanıcı\_adı> <şifre> /add  
> net user <kullanıcı\_adı> /delete

Belirtilen kullanıcı hesabını siler.  
**Örnek**: net user Ahmet /delete

#### 24- **Grup Üyeliklerini Görüntüleme**

> net localgroup

Yerel grupları ve üyelerini listeler.

#### 25- **Komut Geçmişini Temizleme**

> cls

Komut penceresini temizler.

#### 26- İçeriği Ekrana Yazdırmak

> echo

bir değişkenin veya stringi ekrana yazdırır.

#### 27- Dosyayı Ekrana Yazdırmak

> type

bir metin dosyasının içeriğini ekrana yazdırır.

#### 28- Dizin Değiştirme

> cd

cd (Change Directory), belirtilen dizine geçiş yapmak için kullanılır. Bu komut, dizinler arasında gezinmeyi sağlar.

#### 29- Dizini Görüntüleme

> dir

Dosya ve dizinlerin adlarını, boyutlarını, oluşturulma tarihlerini ve diğer özelliklerini görüntülemek için kullanılır

#### 30- Dosya/Dizin Kopyalama

> copy

dosya veya dosyaları bir yerden başka bir yere kopyalamak için kullanılan temel bir komuttur.

---

### Microsoft Management Console — MMC

Windows işletim sisteminde birçok konfigürasyonu yapmamıza ve sistemi izlememize olanak tanıyan birçok araç içerir. **MSC**, Windows işletim sistemlerinde kullanılan **Microsoft Management Console (MMC)** dosyalarının bir uzantısıdır. Bu dosyalar, farklı yönetim araçlarını ve bileşenlerini bir arada çalıştırmayı sağlayan bir çerçeve sunar. MSC uzantılı dosyalar, sistem yöneticilerinin günlük yönetim görevlerini kolaylaştırmak için belirli bir yönetime odaklı araçlara doğrudan erişim sağlar. Şimdi bu araçlara teker ter bakalım.

MSC dosyalarını bilgisayarınızda “Win + R” kısayol tuşuna bastıktan sonra açılan çalıştır menüsüne ismini yazarak çalıştırabilirsiniz.

#### 1- Bilgisayar Yönetimi

![](https://cdn-images-1.medium.com/max/800/1*MpU8TSbaM6qR2u2-ihXfqg.png)
> `compmgmt.msc`

![](https://cdn-images-1.medium.com/max/800/1*qYkUr1fgV87iFe6utqzSdA.png)

**Computer Management**

Windows işletim sisteminde **Bilgisayar Yönetimi (Computer Management)** konsolunu açmak için kullanılan bir arayüzdür. Bu araç, kullanıcıların sistem kaynaklarını ve hizmetlerini bir arada yönetmesini sağlayan bir kontrol paneli gibidir. Bilgisayar Yönetimi, üç ana bölümü içerir: **Sistem Araçları** (Olay Görüntüleyici, Aygıt Yöneticisi, Paylaşılan Klasörler), **Depolama** (Disk Yönetimi gibi araçlarla disk yapılandırması) ve **Hizmetler ve Uygulamalar**

#### 2- Aygıt Yöneticisi

![](https://cdn-images-1.medium.com/max/800/1*-9-W8H4OOTMvEsRMj-Hqdw.png)
> `devmgmt.msc`

![](https://cdn-images-1.medium.com/max/800/1*7w5iLQ5wGIt1r8PDdJxh9A.png)

Device Manager

Windows işletim sisteminde **Aygıt Yöneticisi** (Device Manager) aracını açmak için kullanılan bir komut dosyasıdır. Aygıt Yöneticisi, bilgisayarınızda bulunan donanım aygıtlarını görüntülemenizi ve yönetmenizi sağlar. Bu araç, sürücüleri güncelleme, devre dışı bırakma, kaldırma veya sorun giderme işlemleri için kullanılır. Donanım kategorileri; işlemciler, ağ bağdaştırıcıları, ekran kartları, disk sürücüleri ve daha fazlasını içerir. Ayrıca, bir donanım aygıtıyla ilgili hatalar varsa, sarı üçgen uyarı simgeleri aracılığıyla bunu kullanıcıya bildirir. Aygıt Yöneticisi, sistem yöneticileri ve kullanıcılar için donanımla ilgili sorunları teşhis etmek ve yönetmek için kritik bir araçtır.

#### 3- Disk Yönetimi

![](https://cdn-images-1.medium.com/max/800/1*R4PceSSdAKcNpyGNmeTdkw.png)
> `diskmgmt.msc`

![](https://cdn-images-1.medium.com/max/800/1*eBTghtHiVBRBsAQj8f8e_w.png)

Disk Management

Windows işletim sisteminde **Disk Yönetimi** aracını açmak için kullanılan bir komut dosyasıdır. Disk Yönetimi, bilgisayarınızda bulunan sabit disklerin ve diğer depolama birimlerinin yapılandırılması ve yönetilmesi için kullanılır. Bu araç; disk bölümleri oluşturma, silme, biçimlendirme, birleştirme ve küçültme gibi işlemleri gerçekleştirmenizi sağlar. Ayrıca, disklerin çevrimdışı veya çevrimiçi durumlarını yönetebilir ve sürücü harflerini atayabilirsiniz. `diskmgmt.msc`, özellikle depolama düzenini optimize etmek ve yeni diskleri yapılandırmak gibi görevlerde önemli bir rol oynar.

#### 4- Hizmetler

![](https://cdn-images-1.medium.com/max/800/1*0KIsamFvchIgkx-NituRgg.png)
> `services.msc`

![](https://cdn-images-1.medium.com/max/800/1*6uv3dpx_XipXh_qbq01PFg.png)

Windows işletim sisteminde **Hizmetler (Services)** yönetim konsolunu açmak için kullanılan bir komut dosyasıdır. Bu araç, sistemde çalışan veya durdurulan tüm hizmetlerin listesini görüntülemenize ve yönetmenize olanak tanır. Kullanıcılar, hizmetleri başlatabilir, durdurabilir, yeniden başlatabilir ya da başlangıç türlerini (otomatik, manuel, devre dışı) yapılandırabilir. Örneğin, Windows Update veya Ağ Bağlantıları gibi hizmetler bu konsolda yönetilebilir. `services.msc`, sistem performansını optimize etmek ve sorun giderme işlemleri için kritik bir rol oynar.

#### 5- Olay Görüntüleyici

![](https://cdn-images-1.medium.com/max/800/1*ULhrQ5wKEn3HO73IVquJtw.png)
> `eventvwr.msc`

![](https://cdn-images-1.medium.com/max/800/1*N8gONxQA7kwwBszjUEvAWg.png)

Event Viewer

Windows işletim sisteminde **Olay Görüntüleyici** aracını açmak için kullanılan bir komut dosyasıdır. Olay Görüntüleyici, sistemde meydana gelen olayları ve hataları incelemek için kullanılan bir yönetim aracıdır. Sistem, güvenlik, uygulama ve diğer kategorilerdeki log kayıtlarını (olay günlüğü) düzenli olarak bu araçta depolar. Kullanıcılar bu logları inceleyerek, uygulama hatalarını, güvenlik ihlallerini veya donanım sorunlarını teşhis edebilir. Bu araç, özellikle sistem sorunlarını tespit etmek ve gidermek için kritik öneme sahiptir.

#### 6- Yerel Güvenlik İlkesi

![](https://cdn-images-1.medium.com/max/800/1*eQz3psGx6dDTuQOk0rRyCA.png)
> secpol.msc

![](https://cdn-images-1.medium.com/max/800/1*l3kApq4SYaZ7M-8L5KQVKg.png)

Local Security Policy

Windows işletim sisteminde **Yerel Güvenlik İlkesi** aracını açmak için kullanılan bir komut dosyasıdır. Bu araç, sistemin güvenlik ayarlarını merkezi bir şekilde yönetmek ve yapılandırmak için kullanılır. Yerel güvenlik ilkeleri; hesap politikaları (şifre gereksinimleri gibi), yerel politikalar (kayıt ve denetim kuralları gibi) ve kullanıcı izinleri üzerinde kontrol sağlar. Örneğin, şifre karmaşıklığını zorunlu kılma veya belirli bir kullanıcıya erişim kısıtlamaları uygulama gibi görevler `secpol.msc` üzerinden gerçekleştirilebilir. Bu araç, özellikle sistemin güvenliğini optimize etmek ve erişim kontrollerini düzenlemek için kritik bir rol oynar.

#### 7- Yerel Grup İlkesi Düzenleyicisi

![](https://cdn-images-1.medium.com/max/800/1*dQsN3KsDl549381FOo6nDA.png)
> `gpedit.msc`

![](https://cdn-images-1.medium.com/max/800/1*XETMBSBOzK7D4tqp1o8mrQ.png)

Local Group Policy Editor

Windows işletim sisteminde **Yerel Grup İlkesi Düzenleyicisi**ni açmak için kullanılan bir komut dosyasıdır. Bu araç, kullanıcıların ve bilgisayarların sistem üzerindeki davranışlarını kontrol eden yerel grup ilkelerini yapılandırmak için kullanılır. Grup İlkesi Düzenleyicisi; yazılım kısıtlamalarını belirleme, oturum açma politikalarını yönetme, ağ ayarlarını yapılandırma ve güvenlik gereksinimlerini uygulama gibi geniş bir ayar yelpazesini içerir. Özellikle Windows Pro ve üst sürümlerde bulunur ve sistem yöneticileri için yerel politikaları merkezi bir şekilde düzenlemek adına kritik bir araçtır.

#### 8- Yerel Kullanıcılar ve Gruplar

![](https://cdn-images-1.medium.com/max/800/1*Ph4cBMvCzWWC8F4wSrBKMA.png)
> `lusrmgr.msc`

![](https://cdn-images-1.medium.com/max/800/1*PpzC4VflE9EQfpHgFzywDA.png)

Local Users and Groups

Windows işletim sisteminde **Yerel Kullanıcılar ve Gruplar (Local Users and Groups)** yönetim aracını açmak için kullanılan bir komut dosyasıdır. Bu araç, bir bilgisayar üzerindeki yerel kullanıcı hesaplarını ve grupları yönetmek için kullanılır. Kullanıcılar `lusrmgr.msc` aracılığıyla yeni kullanıcı hesapları oluşturabilir, mevcut hesapları düzenleyebilir, gruplara üyelik atayabilir ve kullanıcı izinlerini yapılandırabilir. Ayrıca, parola ayarlarını değiştirme, hesapların etkinlik durumunu kontrol etme veya belirli kullanıcılar için erişim sınırlamaları getirme gibi işlemleri de destekler. Bu araç, özellikle sistem yöneticileri tarafından yerel güvenlik ve kullanıcı erişimini yönetmek için önemli bir role sahiptir.

#### 9- Görev Zamanlayıcı

![](https://cdn-images-1.medium.com/max/800/1*aw0BmV1O3rpNqEEpvbv07Q.png)
> `taskschd.msc`

![](https://cdn-images-1.medium.com/max/800/1*771nW9DentMsT-0R_XxE2w.png)

Task Scheduler

Windows işletim sisteminde **Görev Zamanlayıcı (Task Scheduler)** aracını açmak için kullanılan bir komut dosyasıdır. Görev Zamanlayıcı, belirli zamanlarda veya olaylar gerçekleştiğinde görevleri otomatik olarak çalıştırmanızı sağlar. Kullanıcılar, bu araçla sistemdeki varsayılan görevleri inceleyebilir, yeni görevler oluşturabilir ve bu görevlerin zamanlama ayarlarını yapılandırabilir. Örneğin, belirli bir saatte bir yedekleme çalıştırma, sistem bakımı yapma veya bir uygulamayı başlatma gibi işlemler gerçekleştirilebilir. `taskschd.msc`, otomasyon sağlayarak kullanıcıların rutin işlemleri kolayca planlamasına olanak tanır.

#### 10- Paylaşılan Klasörler

![](https://cdn-images-1.medium.com/max/800/1*1_05HPAMwCvgzwqHjRKYKw.png)
> `fsmgmt.msc`

![](https://cdn-images-1.medium.com/max/800/1*weE9YAJ7nRYtMRsPpYRszw.png)

Shared Folders

Windows işletim sisteminde **Paylaşılan Klasörler (Shared Folders)** yönetim konsolunu açmak için kullanılan bir komut dosyasıdır. Bu araç, bir bilgisayarda paylaşıma açılmış klasörleri ve bu klasörlere bağlı kullanıcı oturumlarını görüntülemek ve yönetmek için kullanılır. Kullanıcılar, bu konsol aracılığıyla mevcut paylaşımları inceleyebilir, yeni paylaşımlar ekleyebilir, erişim izinlerini yapılandırabilir ve aktif oturumları kontrol edebilir. Ayrıca, açık dosyaları yöneterek belirli kullanıcıların erişimini sonlandırma gibi işlemleri de destekler. `fsmgmt.msc`, özellikle ağ kaynaklarını paylaşan sistemlerde kullanıcı etkinliklerini ve paylaşım ayarlarını denetlemek için önemli bir rol oynar.

#### 11- Windows Defender Güvenlik Duvarı ile Gelişmiş Güvenlik

![](https://cdn-images-1.medium.com/max/800/1*XejYGc58spUFIjCG_1iN2A.png)
> `wf.msc`

![](https://cdn-images-1.medium.com/max/800/1*ChA1HxpNqJ7ucgVk_cA-mw.png)

**Windows Defender Güvenlik Duvarı**

Windows işletim sisteminde **Windows Defender Güvenlik Duvarı ile Gelişmiş Güvenlik** aracını açmak için kullanılan bir komut dosyasıdır. Bu araç, güvenlik duvarı ayarlarını ayrıntılı bir şekilde yönetmenizi sağlar. Kullanıcılar, bu konsol aracılığıyla gelen ve giden bağlantılar için kurallar oluşturabilir, mevcut kuralları düzenleyebilir veya devre dışı bırakabilir. Ayrıca, belirli uygulamalar veya portlar için özel güvenlik kuralları yapılandırılabilir. `wf.msc`, ağ trafiğini kontrol ederek bilgisayarın güvenliğini artırmak ve istenmeyen bağlantıları engellemek için kritik bir rol oynar.

#### 12- Yazdırma Yönetimi

![](https://cdn-images-1.medium.com/max/800/1*MTSqO1OEapX1hDEQ_s7QuA.png)
> printmanagement.msc

![](https://cdn-images-1.medium.com/max/800/1*HmtdMCPwr-n95OLQwRQFNg.png)

Print Management

Windows işletim sisteminde **Yazdırma Yönetimi (Print Management)** konsolunu açmak için kullanılan bir komut dosyasıdır. Bu araç, yazıcıları ve yazdırma kuyruklarını merkezi bir şekilde yönetmenizi sağlar. Kullanıcılar, bu konsol aracılığıyla bağlı yazıcıları ekleyebilir, kaldırabilir, paylaşılan yazıcıları yönetebilir ve yazdırma işleri hakkında bilgi alabilir. Ayrıca, sürücü güncellemeleri, yazıcı sorunlarını giderme ve yazıcı erişim izinlerini yapılandırma gibi görevler de bu araç üzerinden gerçekleştirilebilir. `printmanagement.msc`, özellikle ağ yazıcılarını yöneten sistem yöneticileri için önemli bir rol oynar.

#### 13- Sertifika Yönetimi

![](https://cdn-images-1.medium.com/max/800/1*cijWlhOxGxjRqXHwSebeOQ.png)
> `certlm.msc`

![](https://cdn-images-1.medium.com/max/800/1*4kxWFhlcjgX6STpedTFqDA.png)

Certificates — Local Computers

Windows işletim sisteminde **Yerel Bilgisayar Sertifikaları Yönetimi** aracını açmak için kullanılan bir komut dosyasıdır. Bu araç, bir bilgisayar üzerinde yüklü olan sertifikaları incelemek, yönetmek ve düzenlemek için kullanılır. Sertifikalar, güvenli bağlantılar, kimlik doğrulama ve şifreleme işlemleri gibi güvenlik görevlerinde kullanılır. Kullanıcılar, bu konsol üzerinden sertifika depolarını görüntüleyebilir, yeni sertifikalar ekleyebilir, mevcut sertifikaları silebilir veya sertifika özelliklerini inceleyebilir. `certlm.msc`, özellikle sistem yöneticileri için bilgisayar düzeyindeki sertifika yönetiminde kritik bir rol oynar.

#### 14- Performans İzleyicisi

![](https://cdn-images-1.medium.com/max/800/1*drGVabk1_JuCxoBQLN9ldw.png)
> `perfmon.msc`

![](https://cdn-images-1.medium.com/max/800/1*PkQsxpMaGI2TSQDpb9R8wQ.png)

Performance Monitor

Windows işletim sisteminde **Performans İzleyici (Performance Monitor)** aracını açmak için kullanılan bir komut dosyasıdır. Bu araç, bilgisayarın performansını gerçek zamanlı olarak izlemek ve performansla ilgili geçmiş verileri toplamak için kullanılır. Kullanıcılar, CPU, bellek, disk ve ağ kullanımı gibi sistem kaynaklarını ayrıntılı bir şekilde analiz edebilir. Ayrıca, özel performans sayaçları ekleyerek belirli süreçlerin veya uygulamaların performansını izlemek mümkündür. `perfmon.msc`, sistem performans sorunlarını teşhis etmek ve optimizasyon fırsatlarını belirlemek için kritik bir rol oynar.

#### 15- Uzak Masaüstü Hizmetleri Yöneticisi

![](https://cdn-images-1.medium.com/max/800/1*kO1BtfC5frTaF-qbfuBCaQ.png)
> `tsadmin.msc`

![](https://cdn-images-1.medium.com/max/800/1*BPLbsJAB4eySqgSpwwG3uw.jpeg)

Remote Desktop Services Manager olarak da bilinen, Windows Server işletim sistemlerinde kullanılan bir yönetim aracıdır. Bu araç, özellikle Terminal Server kullanıcı oturumlarını yönetmek için tasarlanmıştır. Yöneticiler, bu konsol aracılığıyla bağlı kullanıcıların oturumlarını izleyebilir, oturumları sonlandırabilir, mesaj gönderebilir ve kullanıcı oturumlarını uzaktan kontrol edebilir. Ayrıca, oturumlarla ilgili performans verilerini görüntülemek ve sorunları gidermek için kullanılır. Ancak, Windows Server 2012 ve sonraki sürümlerde bu araç varsayılan olarak bulunmamaktadır; bunun yerine, Server Manager veya Group Policy gibi alternatif yönetim araçları kullanılmaktadır.

#### 16- Yetkilendirme Yöneticisi

![](https://cdn-images-1.medium.com/max/800/1*5ycPzQAAhzh_4Ut2SLA1Ow.png)
> `azman.msc`

![](https://cdn-images-1.medium.com/max/800/1*tPmIFI6iET881lNc83L8EQ.png)

Authorization Manager

Microsoft Authorization Manager (Yetkilendirme Yöneticisi) olarak bilinen bir yönetim aracıdır. Bu araç, .NET tabanlı uygulamalar için rol tabanlı erişim kontrolü ve güvenlik çerçevesi sağlar. Yöneticiler, bu konsolu kullanarak kullanıcıların ve grupların belirli kaynaklara erişim izinlerini yönetebilir, politikalar oluşturabilir ve uygulayabilir. Ayrıca, uygulamaların bu erişim kontrollerini çalıştırma zamanında kullanmasına olanak tanır. Ancak, bu araç daha yeni Windows sürümlerinde varsayılan olarak bulunmaz ve yerini genellikle daha modern güvenlik yönetim araçlarına bırakmıştır.

#### 17- Bileşen Hizmetleri

![](https://cdn-images-1.medium.com/max/800/1*q5vZ5cZncnQHSTB3ADbqzg.png)
> `comexp.msc`

![](https://cdn-images-1.medium.com/max/800/1*pIdbGHCOEizkpzvXjro0aA.png)

Component Services

Windows işletim sistemlerinde kullanılan bir Microsoft Yönetim Konsolu (MMC) bileşenidir ve “Component Services” (Bileşen Hizmetleri) olarak bilinir. Bu araç, özellikle COM+ uygulamalarını ve hizmetlerini yönetmek için tasarlanmıştır. Yöneticiler, bu konsolu kullanarak COM+ uygulama yapılandırmalarını düzenleyebilir, olay günlüklerini inceleyebilir ve sistemdeki bileşenlerin performansını optimize edebilir. Ayrıca, uygulamalar arasındaki iletişimi ve kaynak paylaşımını kolaylaştıran ayarları yapılandırma imkanı sunar. Bu araç, özellikle kurumsal uygulamaların güvenilir ve verimli bir şekilde çalışmasını sağlamak için kritik bir rol oynar.

---

### Active Directory Administrative Tools — ADAT

Windows Active Directory Administrative Tools (ADAT), bir Active Directory (AD) ortamını yönetmek ve yapılandırmak için kullanılan araçlardır. Bu araçlar, sistem yöneticilerine kullanıcı hesaplarını, bilgisayarları, grupları, politikaları ve diğer AD nesnelerini yönetme imkanı sunar. Active Directory, özellikle kurumsal ağlarda kullanıcı ve kaynak yönetimi için merkezi bir rol oynar. İşte en yaygın kullanılan Active Directory yönetim araçları:

![](https://cdn-images-1.medium.com/max/800/1*KUc3xyohoMX461oMMITE7g.png)

ADAT

#### 1. Active Directory Users and Computers (ADUC)

Microsoft’un Active Directory hizmeti içinde, kullanıcı hesaplarını, bilgisayarları, grupları ve organizasyon birimlerini (OU) yönetmek için kullanılır. Yöneticiler, yeni kullanıcılar oluşturabilir, hesapları düzenleyebilir, parola politikalarını uygulayabilir ve nesneleri farklı organizasyon birimleri arasında taşıyabilir

![](https://cdn-images-1.medium.com/max/800/1*K_zUm1r0QVCnLQgnDwczLA.png)

Active Directory Users and Computers

#### 2. Active Directory Domains and Trusts

Microsoft’un Active Directory hizmeti içinde, etki alanları (domain) arasındaki güven ilişkilerini yönetmek için kullanılır. Yöneticiler, etki alanı güvenlerini oluşturabilir, düzenleyebilir veya kaldırabilir. Ayrıca, etki alanı işlevsel düzeyini yükseltmek gibi işlemler de bu araç üzerinden gerçekleştirilir.

![](https://cdn-images-1.medium.com/max/800/1*QDVkcGG3felLhq9GADjBeA.png)

Active Directory Domains and Trusts

#### 3. Active Directory Sites and Services

AD’nin fiziksel topolojisini yönetmek için kullanılır. Yöneticiler, siteleri, alt ağları ve site bağlantılarını yapılandırarak ağ trafiğini optimize edebilir ve replikasyon ayarlarını düzenleyebilir.

![](https://cdn-images-1.medium.com/max/800/1*eFJ89GnmWgGiAWAFvMmwsQ.png)

Active Directory Sites and Services

#### 4. Active Directory Administrative Center (ADAC)

AD nesnelerini yönetmek için daha modern bir arayüz sunar. Özellikle Windows Server 2008 R2 ve sonrasında kullanılan bu araç, PowerShell cmdlet’leri ile entegre çalışarak daha gelişmiş yönetim seçenekleri sunar.

![](https://cdn-images-1.medium.com/max/800/1*gVvHgx857TBhTzD6NmW7jQ.png)

Active Directory Administrative Center

#### **5- Group Policy Management Console (GPMC)**

Grup Politikalarını (Group Policy) yönetmek için kullanılır. Yöneticiler, politikalar oluşturabilir, düzenleyebilir ve bunları belirli kullanıcı veya bilgisayar gruplarına uygulayabilir. GPMC, politika ayarlarını merkezi olarak yönetmeyi kolaylaştırır.

![](https://cdn-images-1.medium.com/max/800/1*xbLyZ5DCZebIw1hn2NsiVw.png)

Group Policy Management Console

#### 6- **Active Directory Module for Windows PowerShell**

AD yönetim işlemlerini komut satırı üzerinden gerçekleştirmek için kullanılır. PowerShell cmdlet’leri ile kullanıcı hesapları, gruplar, politikalar ve diğer AD nesneleri üzerinde çeşitli işlemler yapılabilir. Bu, özellikle otomasyon ve toplu işlemler için oldukça kullanışlıdır.

![](https://cdn-images-1.medium.com/max/800/1*26CfeO0LwUnxTiVbXoBOxg.png)

Active Directory Module for Windows PowerShell

---

### **Windows Management Instrumentation —**WMI

**Windows Management Instrumentation (WMI)**, Microsoft’un Windows tabanlı işletim sistemlerinde sistem yönetimi ve veri erişimi için geliştirdiği bir altyapıdır.

WMI, sistem yöneticilerine aşağıdaki işlemleri yapma imkanı sağlar:

* Sistem bilgilerini sorgulama (örneğin, işlemci, bellek, disk kullanımı).
* Hizmetleri başlatma, durdurma veya yeniden başlatma.
* Olayları izleme ve yönetme (örneğin, belirli bir olay gerçekleştiğinde bir komut çalıştırma).
* Uzak bilgisayarları yönetme.

WMI, **WMI Provider’lar** aracılığıyla çalışır. Bu sağlayıcılar, donanım, yazılım ve işletim sistemi bileşenleri hakkında bilgi toplar ve bu bilgileri WMI’ye sunar. WMI, bu bilgileri **WMI Query Language (WQL)** adı verilen bir sorgu diliyle sorgulanabilir hale getirir.

![](https://cdn-images-1.medium.com/max/800/1*8Uxx0e4xpvHQA5JVh43iIQ.png)

#### WMI ile Çalışma Yöntemleri

WMI, sistem yönetimi için çeşitli yöntemler sunar. Bu yöntemler arasında **PowerShell**, **VBScript**, **WMIC (WMI Command-Line)** ve .**NET** gibi araçlar bulunur.

#### 1- **PowerShell**

**PowerShell**, Windows işletim sistemi üzerinde kullanılan, komut satırı arabirimi ve betik dili bir arada sunan bir yönetim aracıdır. ve WMI sorgularını çalıştırmak için idealdir.

Örnek: İşlemci bilgilerini sorgulama:

```
Get-WmiObject -Class Win32_Processor
```

#### 2- **VBScript**

**VBScript (Visual Basic Scripting Edition)**, Microsoft tarafından geliştirilen hafif bir betik dilidir. Özellikle Windows işletim sistemleri için tasarlanmış olup, görev otomasyonu ve uygulama geliştirme gibi işlemlerde kullanılır. Dolayısıyla, WMI sorgularını çalıştırmak için kullanılabilir.

Örnek: Disk bilgilerini sorgulama:

```
strComputer = "."  
Set objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\cimv2")  
Set colDisks = objWMIService.ExecQuery("SELECT * FROM Win32_DiskDrive")  
For Each objDisk in colDisks  
    WScript.Echo "DeviceID: " & objDisk.DeviceID  
Next
```

#### 3- **.NET**

**.NET**, Microsoft tarafından geliştirilen bir yazılım platformudur. Hem uygulama geliştirme hem de çalışma zamanı ortamı sunar. NET uygulamaları, `System.Management` namespace'i ile WMI sorguları çalıştırabilir.

Örnek: İşlemci bilgilerini sorgulama:

```
using System.Management;  
  
ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT * FROM Win32_Processor");
```

#### 4- **WMIC**

**WMIC (Windows Management Instrumentation Command-line)**, Windows işletim sisteminde kullanılan bir komut satırı aracıdır. WMI’ya (Windows Management Instrumentation) komut satırı üzerinden erişim sağlar ve sistem yönetimini kolaylaştırır.

Örnek: İşlemci bilgilerini sorgulama:

```
wmic cpu get name
```

---

### Azure Active Directory

**Azure Active Directory (Azure AD)**, Microsoft’un dijital dönüşüm stratejisinin temel taşlarından biridir ve yeni nesil kimlik ve erişim yönetimi çözümleriyle modern organizasyonların ihtiyaçlarını karşılar. İşte dönüşümün temel bileşenleri:

* **Bulut ve Hibrit Entegrasyon**: Azure AD, şirket içi Active Directory ile entegre çalışarak hibrit kimlik yönetimine olanak tanır, böylece hem bulut hem de yerel kaynaklara güvenli erişim sağlar.
* **Zero Trust Güvenlik Modeli**: Yeni nesil güvenlik stratejileri ile her erişim isteğini doğrular ve minimum ayrıcalık ilkesi uygular.
* **Koşullu Erişim**: Cihaz durumu, konum ve oturum açma riski gibi faktörlere dayalı güvenlik politikaları oluşturur.
* **Kimlik Koruma**: Yapay zeka destekli analizlerle riskli oturum açmaları algılar ve önler.
* **Mobil ve Uzak Çalışma Destekleri**: Microsoft Intune ile entegrasyon sayesinde mobil cihazların ve uzak çalışanların yönetimi kolaylaşır.

Microsoft’un bulut tabanlı kimlik ve erişim yönetimi çözümüdür. Hem kullanıcıların hem de uygulamaların güvenli bir şekilde yönetilmesini sağlar ve modern iş ortamları için kritik bir altyapı sunar.

![](https://cdn-images-1.medium.com/max/800/1*pqT3BvT-gibeMBhl0SiIFg.jpeg)

Azure AD ekosisteminde birçok yönetim ve iş aracı mevcuttur. Bu da Azure AD’yi hem güvenlik hem de yönetim açısından güçlü ve entegre bir çözüm haline getirir.

Bu ekosisteme; <https://portal.azure.com> adresinden microsoft hesabınız ile erişip inceleyebilirsiniz.