---
title: "Zararlı Yazılım Analizine Giriş: #2 Sandbox Kurulum"
date: 2023-03-12
description: "Bir önceki yazımda temel havramlardan bahsetmiştim. Bu yazımda ise zararlı yazılım analizinde kullacağımız ortam kurulumunu anlatacağım. Analiz ortamını hazırlarken nelere dikkat etmeliyiz? Hangi araç..."
featuredImage: "https://cdn-images-1.medium.com/max/800/1*rXDQnvecujpcn5O9zt_liQ.png"
series: ["Zararlı Yazılım Analizine Giriş"]
---

### Zararlı Yazılım Analizine Giriş: #2 Sandbox Kurulum

![](https://cdn-images-1.medium.com/max/800/1*rXDQnvecujpcn5O9zt_liQ.png)

Bir önceki yazımda temel havramlardan bahsetmiştim. Bu yazımda ise zararlı yazılım analizinde kullacağımız ortam kurulumunu anlatacağım. Analiz ortamını hazırlarken nelere dikkat etmeliyiz? Hangi araçları kullanacağız? Hepsi bu yazıda….

---

### Sandbox

Zararlı Yazılım Analizinde kullandığımız ortama sandbox ismini veriyoruz. Özellikle dinamik analiz ile inceleme yaparken, zararlı yazılımı izole bir ortamda çalıştırmak zorundayız. Bunun için en kullanışlı yöntem sanal makine(Virutal Machine) kullanmaktır. Tabi bunun için birçok sanallaştırma yazılımı mevcut; VirtualBox, VMWare Workstation ve QEMU/kvm bunlardan birkaçı. Bu yazımızda [virutalbox](https://www.virtualbox.org/) üzerinden ilerleyeceğiz.

![](https://cdn-images-1.medium.com/max/800/0*o2kFbeokidhcI32C)

Bunun dışında bir de sanallaştırılmış ortamda kullanacağımız işletim sistemi ve sürümünü belirlememiz gerekiyor. Zararlı yazlımların çoğunluğu windows işletim sistemi üzerinde çalışacak şekilde geliştirilmiştir. Eğer bu yazılımları çalıştırmak istiyorsak , dinamik olarak analizini yapacaksak, bizim de windows işletim sistemini kullanmamız gerekir. Ancak, eğer zararlı yazılımı statik olarak incelemek istiyorsak bu noktada, bize sunduğu birçok tersine mühendislik aracıyla linux işletim sistemini de kullanabiliriz. Dahası, linux işletim sistemi kullanarak zararlı yazılım analizi yapmak için geliştirilmiş, gerekli araçlar kurulu olarak gelen, bir linux dağıtımı da mevcut. [Sans Enstitüsü](https://www.sans.org) tarafından geliştirilmiş remnux ismindeki dağıtımı [buradan](https://docs.remnux.org/) inceleyebilirsiniz.

Biz bu yazımızda emektar windows7 32-bit işletim sistemini kullanacağız. Çünkü zararlı yazılımların büyük çoğunluğu windows7 üzerinde çalışır ve 32-bittir.

---

### VirtualBox Kurulumu

VirtualBox, Oracle tarafından geliştirilmiş genel amaçlı bir sanallaştırma yazılımıdır. <https://www.virtualbox.org/> adresinden downloads sekmesinden mevcut işletim sistemi ve sürümünüze uygun olan versiyonu indirebilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*bAHl-81CJsNK9t4vmvylOg.png)

Kurulum dosyasını indirdikten sonra çalıştırın ve kurulumu tamamlayın.

---

### Windows7 Kurulumu

Windows7 kurulumu için önce 32-bitlik ISO dosyası bulmanız gerekiyor. Microsoft windows7'ye desteği kestiği için kendi sitesinden ISO dosyasını indiremiyoruz. İnternette windows7 iso yazarak diğer sitelerden iso dosyasını bulabilirsiniz. Hangi siteye güveneceğiniz size kalmış.

#### Sanal Makine Kurulumu

ISO dosyamızı hazır ettikten sonra artık kuruluma başlayabiliriz. Öncellikle virtualbox üzerinde boş bir makine oluşturmamız gerekiyor. Bunun için;

![](https://cdn-images-1.medium.com/max/800/1*-0pEFla7ntLU8wE_1F2sMQ.png)

1

new butonuna tıklıyoruz açılan pencerede bizden işletim sistemi bilgilerini istiyor.

![](https://cdn-images-1.medium.com/max/800/1*_Z9Dl9qcu5ivIFjMh5HeyA.png)

Windows 7 (32-bit)’i seçiyoruz ve makinemize bir isim veriyoruz. Ben SANDBOX ismini verdim. Siz başka bir isim de verebilirsiniz. Ardından Next butonuna tıklıyoruz.

![](https://cdn-images-1.medium.com/max/800/1*0o-EluVqdxumU78nWRr36A.png)

Burada makineye vereceğimiz RAM alanını ayarlıyoruz ben 4GB RAM verdim. Makine çalıştığında bilgisayarımın 4GB RAMi bu makineye tahsis edilecek. Siz isterseniz daha fazla da verebilirsiniz sisteminizin durumuna göre. Next butonuna tıklıyoruz.

![](https://cdn-images-1.medium.com/max/800/1*YelA6_DmCbJbJzjknDkmRQ.png)

Burada sistem dosyalarının kurulacağı bir sanal harddisk oluşturuyoruz. Default olarak seçili olan kısım bizim işimizi görür. Create butonuna tıklyıoruz.

![](https://cdn-images-1.medium.com/max/800/1*uo7tJ4EQAe00OSAvmZLJbQ.png)

Create Virtual Hard Disk menüsü karşımıza çıkacak, VDI, VHDI, VMDK gibi seçenekler karşımıza çıkıyor. Ben VDI’ı tercih ediyorum. Next butonuna basıyoruz.

![](https://cdn-images-1.medium.com/max/800/1*sWxdSieNwBwGcBUX8tfHXg.png)

Gelen menüde, sabit boyut ve dinamik boyut seçenekleri var. Eğer sabit boyut seçerseniz sisteminiz daha stabi olur ancak sisteme ayırdığınız alanı tamamen kaybedersiniz. Dinamik boyutda ise sisteme ayırdığınız alan sanal makine içinde doldukça arttırılır. Yani sanal makineye 100GB alan verseniz bile, sanal makine kendi içinde 20GB’ı kullanılıyorsa 80GB’ı temel işletim sisteminizde boş olarak görünür, kllanılabilir. Ben sandbox makinesi olduğu için sabit boyutu tercih ederim. Fixed Size’ı seçtim. Next butonuyla devam.

![](https://cdn-images-1.medium.com/max/800/1*ERtiLWewifFLdwCUqRsvsA.png)

Burada makine için ayıracağınız disk alanını belirliyorsunuz. Minimum 32GB olması gerekiyor. Ben 64GB verdim. Create butonu ile devam edebiliriz. Ve sonunda boş sanal makinemizi oluşturduk

![](https://cdn-images-1.medium.com/max/800/1*3NgY5McJzyVr-GTdmJexXQ.png)

Start butonu ile makineyi başlatırsanız karşınıza sadece siyah ekran çıkacaktır. Çünkü daha ISO dosyamızı yüklemedik.

#### Windows ISO Yükleme

Oluşturduğumuz boş sanal makineye Windows ISO’sunu yüklemek için sanal makinenin ayarlarını düzenlememiz lazım.

![](https://cdn-images-1.medium.com/max/800/1*-JYi1XcTSXAnsadBUb0-uA.png)

Şimdi soldaki menüde SANDBOX makinemiz seçili halde settings butonuna tıklıyoruz. Burada makine için ayarları yapacağız.

![](https://cdn-images-1.medium.com/max/800/1*YJNsG-sra5t4ZauZlPllbA.png)

Açılan menüden sanal makinamız ile ilgili pek çok ayarı yapabiliriz. Soldaki menüden storage sekmesine geliyoruz. Burda cd üzerinde + olan simgeye tıklıyoruz. Burdan ISO dosyamızı yükleeceğiz.

![](https://cdn-images-1.medium.com/max/800/1*6mcDi5d4T8DUJX5Z1jdVWQ.png)

Açılan menüden Add butonuna tıklıyoruz ve açılan pencereden Windows7 (32-bit) ISO dosyamızı bilgisayarımızda nereye kaydettiysek bulup seçiyoruz.

![](https://cdn-images-1.medium.com/max/800/1*ddD0E9vEge4iuRehfIf6-A.png)

Ardından yüklediğimiz ISO’yu seçip choose butonuna basıyoruz. İşlememiz tamamlandı artık makineyi çalıştırabiliriz.

#### Windows Kurulıumu

Bundan sonrası klasik windows kurulumu. Start butonundan makineyi çalıştırabilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*W0pHYBmPMUHFqYxiid_vCA.png)

windows7 kurulum

Windows kurulumu oldukça basittir. Windowsun kurulum arayüzünden kolaylıkla yapabilirsiniz. Makine kurulumu bittikten sonra windows başlatılacaktır.

![](https://cdn-images-1.medium.com/max/800/1*feg30wY7_q3Nlj5JaMWALg.png)

Bundan sonraki aşama Zararlı Yazılım Analizi için gerekli olan araçları kurmanızdır. Tabi bunların hepsini bir anda da kurabilirsiniz, peyder pey de kurabilirsiniz.

#### Makine Klonlama

Şimdi makinemize birşey olursa tekrar kurmak ile uğraşmamak için makineyi konlamayı görelim.

![](https://cdn-images-1.medium.com/max/800/1*H0PHw86ioHsxZ9NP3aCO4Q.png)

Bunun için makinemize sağ tıklayıp açılan pencerede clone’a tıklıyoruz.

![](https://cdn-images-1.medium.com/max/800/1*-_W07d55vop2s7pojzqSeQ.png)

karşımıza böyle bir pencere çıkıyor next butonuna basıp devam edebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*4y8XvnOmd-eCcx0bSpM4xA.png)

Burada klon tipini belirlememiz gerekiyor. İki çeşit klon tipimiz var.

**Full clone:** adından da anlaşılacağı gibi sanal makinenin aynısından bir tane daha oluşturur. Dolaysıyla klonlandığı makineye bir bağımlılığı yoktur.

**Linked clone:** klonlanan makine ana makineye bağımlıdır. Yani ana makine silinirse bağlantılı klonu da işlevsiz kalır.

![](https://cdn-images-1.medium.com/max/800/1*GkV9fxO_Uf7K_a_AsQaLYQ.png)

full cloneu seçip devam edebilirsiniz. Ardından VM klonlanana kadar bekleyiniz ve klonunuz hazır.

---

### Önerilen Araçlar

Zararlı yazılım analizi, çeşitli araçların yardımını gerektirir. Analiz VM’ine yüklenmesi gereken çeşitli araçların listesini inceleyeceğiz ve bu araçların kullanımını sonraki bölümlerde gerektiğinde ve gerektiğinde tanıtacağız. Bu araçlardan birkaçının GUI’si yoktur ve komut satırı istemi aracılığıyla çalıştırılmaları gerekir. Bazıları ise masaüstünden kısayol ile çalıştırılabilir.

#### [QuickHash](https://quickhash-gui.org)

QuickHash, hızlı ve güvenilir cross platform bir hashing aracıdır. Zararlı Yazılımın hashini almak için bu programı kullanabilirsiniz.   
Bu linkten indirebilirsiniz: <https://quickhash-gui.org>

![](https://cdn-images-1.medium.com/max/800/0*aQiJmFJU4ZX2I7q_)

#### [PEView](http://wjradburn.com/software/)

PEView popüler bir PE dosya ayrıştırıcısıdır.   
Bu linkten indirebilirsiniz: <http://wjradburn.com/software/>

![](https://cdn-images-1.medium.com/max/800/0*jWxArTitASdjxEZI)

#### [TrID](http://mark0.net/soft-trid-e.html)

Dosya türünün belirlenmesi için kullanılan bir araçtır.  
Bu linkten indirebilirsiniz: <http://mark0.net/soft-trid-e.html>

![](https://cdn-images-1.medium.com/max/800/0*-QEiy9fIOA1uogNw)

#### [Process Hacker](https://processhacker.sourceforge.io/)

Process Hacker, çalışan süreçleri bunların iş parçacıklarını, çalışan hizmetleri, yapılan ağ bağlantılarını, disk kullanımını, işlem başına yüklenmiş DLL’leri vb. görüntüleme dahil olmak üzere sistemin çeşitli durumlarını görselleştirmeye yardımcı olur. Ayrıca, uygun şekilde kullanılırsa kötü amaçlı yazılımın analiz edilmesine ve incelenmesine yardımcı olabilecek, süreçle ilgili çeşitli özellikleri de gösterir.  
Bu linkten indirebilirsiniz: <https://processhacker.sourceforge.io/>

![](https://cdn-images-1.medium.com/max/800/0*c8qlSG0QBvJdItJU)

#### [ProcMon](https://docs.microsoft.com/en-us/sysinternals/downloads/procmon)

ProcMon, süreç ve iş parçacığı oluşturma, ağ etkinlikleri, dosya oluşturma ve silme gibi dosyayla ilgili etkinlikler, kayıt defteriyle ilgili etkinlikler vb. dahil olmak üzere sistemde çalışan işlemlerin çeşitli etkinliklerini yakalayan ve görüntüleyen, iyi bilinen bir işlem izleme aracıdır.  
Bu linkten indirebilirsiniz:<https://docs.microsoft.com/en-us/sysinternals/downloads/procmon>

![](https://cdn-images-1.medium.com/max/800/0*C95pxifPHhRN0cKG)

#### [Autoruns](https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns)

Kötü amaçlı yazılım, sistem yeniden başlatıldıktan veya kullanıcı yeniden oturum açtıktan sonra devam etmek ve otomatik olarak çalışmak için kalıcılık mekanizmalarını kullanır. Autoruns, kötü amaçlı yazılım tarafından kullanılan kalıcılık mekanizmalarını yakalar ve sistem açılışında veya oturum açma sırasında çalışacak şekilde yapılandırılmış tüm programların bir listesini sağlar.  
Bu linkten indirebilirsiniz: [**https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns**](https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns)

![](https://cdn-images-1.medium.com/max/800/0*--P_Mg0HGlnYc4Rt)

#### [Regshot](https://sourceforge.net/projects/regshot/)

Regshot, registry farkını görüntülemek için Windows registry anlık görüntüsünü almanıza ve ikinci bir anlık görüntüyle karşılaştırmanıza olanak tanıyan bir registry farkı/karşılaştırma aracıdır.  
Bu linkten indirebilirsiniz: <https://sourceforge.net/projects/regshot/>

![](https://cdn-images-1.medium.com/max/800/0*Dmm8n56NqImVavtB)

#### [FakeNet](https://sourceforge.net/projects/fakenet/)

FakeNet, zararlı yazılımdan giden ağ bağlantılarını yakalayıp loglayan ve simüle edilmiş yanıtlar döndüren, böylece kötü amaçlı yazılıma harici ağ erişimini devre dışı bırakan, Windows için kullanılabilen dinamik bir zararlı yazılım analiz aracıdır.   
Bu linkten indirebilirsiniz: <https://sourceforge.net/projects/fakenet/>

![](https://cdn-images-1.medium.com/max/800/0*QSnrA_ZzaxFOhl37)

#### [BinText](http://b2b-download.mcafee.com/products/tools/foundstone/bintext303.zip)

Bintext, dosyalardan ASCII ve Unicode metin dizelerini çıkarabilen bir statik analiz aracıdır.  
Bu linkten indirebilirsiniz: <http://b2b-download.mcafee.com/products/tools/foundstone/bintext303.zip>

![](https://cdn-images-1.medium.com/max/800/0*PiKjgAUB7xGAnCv0)

#### [YARA](https://virustotal.github.io/yara/)

YARA, zararlı yazılım araştırmacıları için İsviçre çakısı olarak tanımlanıyor. Zararlı yazılımları tespit etmek ve sınıflandırmak için çok kullanışlıdır.  
Bu linkten indirebilirsiniz: <https://virustotal.github.io/yara/>

![](https://cdn-images-1.medium.com/max/800/0*NfEcY779z-bTEzPr)

#### [Wireshark](http://www.wireshark.org)

Wireshark, canlı ağ trafiğini yakalayıp inceleyebilen veya statik paket yakalama (PCAP) dosyalarını analiz edebilen bir grafik paket analiz aracıdır. Wireshark, çeşitli protokollerin kodunu çözmeyi destekler ve herhangi bir ağ trafiğini hızlı bir şekilde incelememize izin veren dahili paket filtreleme özelliği sağlar.   
Bu linkten indirebilirsiniz: <http://www.wireshark.org>

![](https://cdn-images-1.medium.com/max/800/0*7-CPmBPDPgux12np)

#### [GMER](http://www.gmer.net)

GMER, hem kullanıcı alanı API kancalarını hem de çekirdek modeli SSDT kancalarını tespit etmek için kullanabileceğimiz bir araçtır.  
Bu linkten indirebilirsiniz: <http://www.gmer.net>

![](https://cdn-images-1.medium.com/max/800/0*iwTyjPPJVFCGDBBy)

#### [DriverView](http://www.nirsoft.net/utils/driverview.html)

DriverView, sisteminizdeki tüm yüklü sürücüleri görüntülemenize yardımcı olan bir GUI aracıdır ve sisteminizde herhangi bir kötü amaçlı çekirdek modülü/rootkit’in yüklü olup olmadığını kontrol etmek için harika bir araçtır.  
Bu linkten indirebilirsiniz: <http://www.nirsoft.net/utils/driverview.html>

![](https://cdn-images-1.medium.com/max/800/0*PNLh21poQc8rvUkr)

#### [Strings](https://docs.microsoft.com/en-us/sysinternals/downloads/strings)

Sysinternals Strings, dosyalardan tüm stringleri bulmanıza yardımcı olan bir komut satırı aracıdır.  
Bu linkten indirebilirsiniz: <https://docs.microsoft.com/en-us/sysinternals/downloads/strings>

![](https://cdn-images-1.medium.com/max/800/0*Q6YCNKcVS-uLZ8JI)

#### [Bulk Extractor](http://downloads.digitalcorpora.org/downloads/bulk_extractor/)

Bulk Extractor ağ paketi, dosyaları bellek dökümlerinden yakalayan bir komut satırı aracıdır.  
Bu linkten indirebilirisiniz: <http://downloads.digitalcorpora.org/downloads/bulk_extractor/>

![](https://cdn-images-1.medium.com/max/800/0*ZPk6z5Btkygw5C4c)

#### [OllyDbg](http://www.ollydbg.de/version2.html)

OllyDbg, zararlı yazılım tersine mühendisliği için sahip olunması gereken bir araçtır. x86 yürütülebilir dosyalarını pencerelerde çalıştırabilen ve hatalarını ayıklayabilen grafiksel bir x86 hata ayıklayıcıdır.  
Bu linkten indirebilirsiniz: <http://www.ollydbg.de/version2.html>

![](https://cdn-images-1.medium.com/max/800/0*XCSuwkqXtNnKGGQT)

---

Bu yazımda, analiz ortamının hazırlanmasını ele aldım. Analiz için kullanacağımız windows7 sanal makine kurulumuna ve gerekli araçlara değindim. Bir sonraki yazımda analiz teknikleriyle devam edeceğiz. Yazıyı beğendiyseniz yorum yapmayı ve takip etmeyi unutmayın….