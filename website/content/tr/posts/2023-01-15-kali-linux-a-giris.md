---
date: '2023-01-15'
description: Merhaba, bu yazımda Kali Linux dağıtımından bahsedeceğim. Ne işe yaradığını ve ne gibi yetenekleri olduğunu anlatacağım. Kurulumundan bahsettikten sonra da, içinde hazır kurulu gelen araçlara değineceğim.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*zHe4hqRCHYvBY6Sul53MaQ.png
layout: single
title: Kali Linux’a Giriş
type: posts
---

### Kali Linux’a Giriş



### Giriş

Merhaba, bu yazımda Kali Linux dağıtımından bahsedeceğim. Ne işe yaradığını ve ne gibi yetenekleri olduğunu anlatacağım. Kurulumundan bahsettikten sonra da, içinde hazır kurulu gelen araçlara değineceğim.

### Kali Linux Nedir?

[Kali Linux](https://www.kali.org/), siber güvenlik alanında kullanılmak için geliştirilmiş debian tabanlı bir linux dağıtımıdır. Hazır kurulu halde gelen birçok siber güvenlik yazılımını barındırır. Bu yönüyle çok kullanışlı ve kullanıcıya hitap eden bir yapısı olduğu söylenebilir.

Kali ile pek çok sisteme yönelik sızma testi yapabilirsiniz. Ayrıca adli bilişim alanında da çalışabilirsiniz.

### Kurulum

Kali, GNOME ve XFCE olmak üzere iki farklı masaüstü ortamı seçeniğini sunar. Ayrıca 32-bit ve 64-bit sistemleri destekler.

Kali Linux’u kurmanın birkaç farklı yolu vardır:  
1-Ana işletim sistemi olarak bilgisayaranıza kurabilirsiniz.  
2-İkincil işletim sistemi(dual-boot) olarak bilgisayarınıza kurabilirsiniz.  
3-Sanal makine olarak bilgisayaranıza kurabilirsiniz.

Kalinin [dökümantasyon sayfasında](https://www.kali.org/docs/) kurulum ve sonraki işlemlerle ilgili ayrıntılı bilgi bulunuyor.

Üstte saydığım yöntemlerden en kolay olanı sanal makine olarak bilgisayara kurulumdur. Bunun için [VMware](https://www.vmware.com/) veya [virtualbox](https://www.virtualbox.org/) gibi bir sanallaştırma programlarına ihtiyaç duyarız. Kalinin [download sayfasında](https://www.kali.org/get-kali/#kali-virtual-machines) bu programlara yönelik kurulum dosyalarını indirebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*oGbHJaE4HvWhKg2MLcBg7g.png)

Bu sayfada, üstte 32-bit ve 64-bit seçenekleri de mevcut. Sanallaştırma programımıza uygun dosyayı indirdikten sonra geriye kalan tek şey bu dosyayı sanallaştırma programımızda açmak. Ardından Kalinin başlatıldığını göreceksiniz.

Kali başladğında gelecek giriş ekranında:  
username: kali  
password: kali  
varsayılan kullanıcı adı ve şifreyi girerek makineye erişebilirsiniz.

### Sızma Testi Nedir?

Penetration Test(pentest) amacı herhangi bir sistemde var olan açığı bulmak, sömürmek ve raporlamaktır. Sızma testini genel olarak ikiye ayırabiliriz:

Network sızma testi, sistemin yanlış yapılandırılmasından kaynaklanan zafiyetlerden yararlanarak sisteme sızma şeklidir.

Uygulama sızma testi, uygulama yazılımında bulunan açıklıklar üzerinden sisteme erişme ve sömürme faaliyetleridir.

Sızma testi yapılışı olarak 3'e ayrılır:

* Siyah kutu: hedef sistem hakkında hiçbir bilgi verilmeden yapılan sızma testidir.
* Beyaz kutu: hedef sistemle ilgili pek çok bilgi verilerek yapılan sızma testidir.
* Gri kutu: hedef sistem hakkında detay bilgi vermeden yapılan sızma testidir.

Sızma testi alanında, Kali Linux çok kullanılan bir dağıtımdır. Şimdi, bu iş için kullanılan araçlara bir göz atalım.

### Kali Linux Araçları

Kali Linux masaüstü ortamındayken, logosunun bulunduğu kısma tıklarsanız genel menüsünün açıldığını göreceksiniz. Burada, ayarlar kısmından çeşitli özelleştirmeler yapabilirsiniz. Daha aşağıya baktığınızda çeşitli bölümlerle karşılacaksınız.

![](https://cdn-images-1.medium.com/max/800/1*oRREtWWP_05h_uj2e0gZvQ.png)

Kali Linux Menu

Bu kısımda, kali linux ile hazır kurulu olarak gelen siber güvenlik araçları işlevlerine göre sınıflandırılmıştır. Kali, bilgi toplama, zafiyet taraması, şifre saldırıları, kablosuz ağ saldırıları, adli bilişim vb. gibi pek çok alanda hazır araçlar içermektedir. Bu araçlara ve araçların nasıl kullanıldıklarına dair bilgilere [Kali Linux Tools](https://www.kali.org/tools/) sayfasından ayrıntılı olarak ulaşabilirsiniz.

Bu yazımızda, kısaca bu araçlardan ve ne işe yaradıklarından bahsedeceğiz.

#### 01-Information Gathering

Belirli bir hedefe yönelik aktif ve pasif bilgi toplama faaliyetlerinde kullanılan araçlar bu bölümde yer alır. Bunlar:

* [**dmitry**](https://www.kali.org/tools/dmitry/): dmitry, C ile yazılmış bir Linux komut satırı uygulamasıdır. dmitry, olası subdomainleri, e-posta adreslerini, çalışma süresi bilgilerini bulabilir.
* [**ike-scan**](https://www.kali.org/tools/ike-scan/): ike-scan, IKE ana bilgisayarlarını keşfeder ve ayrıca yeniden iletim geri alma modelini kullanarak bunların parmak izini alabilir.
* [**netdiscover**](https://www.kali.org/tools/netdiscover/): Netdiscover bir aktif/pasif adres keşif aracıdır. Özellikle DHCP sunucusu olmayan kablosuz ağlar için geliştirilmiştir. Hub/Switched ağlarda da kullanılabilir.
* [**nmap**](https://www.kali.org/tools/nmap/): nmap(network mapper), ağ keşfi veya güvenlik denetimi için bir yardımcı programdır. Ping taramayı (hangi ana bilgisayarların açık olduğunu belirleme), birçok bağlantı noktası tarama tekniğini, sürüm algılamayı (hizmet protokollerini ve bağlantı noktalarını dinleyen uygulama sürümlerini belirleme) ve TCP/IP parmak izini (uzak ana bilgisayar işletim sistemi veya cihaz tanımlama) destekler.
* [**recon-ng**](https://www.kali.org/tools/recon-ng/)**:** Recon-ng, Python’da yazılmış tam özellikli bir Web Keşif frameworküdür. Bağımsız modüller, veritabanı etkileşimi, etkileşimli yardım ve komut tamamlama özellikleriyle donatılan Recon-ng, web tabanlı keşiflerin hızlı ve kapsamlı bir şekilde yürütülebileceği güçlü bir ortam sağlar.
* [**spiderfoot**](https://www.kali.org/tools/spiderfoot/)**:** Bu paket, bir açık kaynak istihbaratı (OSINT) otomasyon aracı içerir. Amacı, IP adresi, etki alanı adı, ana bilgisayar adı, ağ alt ağı, ASN, e-posta adresi veya kişinin adı olabilecek belirli bir hedef hakkında istihbarat toplama sürecini otomatikleştirmektir.

#### 02-Vulnerability Analysis

Belirli bir hedefe yönelik zafiyet taraması yapmak için kullanılan araçlar bu bölümde yer alır. Bunlar:

* [**legion**](https://www.kali.org/tools/legion/)**:** Bu paket, bilgi sistemlerinin keşfedilmesine ve kullanılmasına yardımcı olan açık kaynaklı, kullanımı kolay, genişletilebilir ve yarı otomatik bir ağ penetrasyon testi aracı içerir.
* [**nikto**](https://www.kali.org/tools/nikto/)**:** Nikto, hızlı güvenlik veya bilgi kontrolleri yapmak için rfp’nin LibWhisker’ını kullanan, Perl’de yazılmış bir web sunucusu ve CGI tarayıcıdır.
* [**unix-privesc-check**](https://www.kali.org/tools/unix-privesc-check/)**:** Unix-privesc-checker, Unix sistemlerinde çalışan bir betiktir (Solaris 9, HPUX 11, Çeşitli Linux’lar, FreeBSD 6.2'de test edilmiştir). Yerel ayrıcalıksız kullanıcıların ayrıcalıkları diğer kullanıcılara yükseltmesine veya yerel uygulamalara (ör. veritabanları) erişmesine izin verebilecek yanlış yapılandırmaları bulmaya çalışır.

#### 03-Web Applicaton Analysis

Web Uygulamalarındaki açıklıkları bulmak ve söürmek için kullanılan araçlar bu bölümde yer alır. Bunlar:

* [**burpsuite**](https://www.kali.org/tools/burpsuite/)**:** Burp Suite, web uygulamalarının güvenlik testlerini gerçekleştirmek için entegre bir platformdur. Çeşitli araçları, bir uygulamanın saldırı yüzeyinin ilk haritalanması ve analizinden güvenlik açıklarının bulunmasına ve kullanılmasına kadar tüm test sürecini desteklemek için sorunsuz bir şekilde birlikte çalışır.
* [**commix**](https://www.kali.org/tools/commix/)**:** Bu paket basit bir ortama sahiptir ve web geliştiricileri, penetrasyon test edicileri ve hatta güvenlik araştırmacıları tarafından komut enjeksiyon saldırılarıyla ilgili hataları veya güvenlik açıklarını bulmak amacıyla web uygulamalarını test etmek için kullanılabilir. Bu aracı kullanarak, güvenlik açığı bulunan belirli bir parametre veya dizide command injection zafiyetini bulmak ve yararlanmak çok kolaydır. Commix, Python programlama dilinde yazılmıştır.
* [**skipfish**](https://www.kali.org/tools/skipfish/)**:** Skipfish, aktif bir web uygulaması güvenlik keşif aracıdır. Özyinelemeli tarama ve sözlük tabanlı yoklamalar yaparak hedeflenen site için etkileşimli bir site haritası hazırlar. Araç tarafından oluşturulan nihai raporun, profesyonel web uygulaması güvenlik değerlendirmeleri için bir temel oluşturması amaçlanmıştır.
* [**wpscan**](https://www.kali.org/tools/wpscan/)**:** WPScan, güvenlik sorunlarını bulmak için WordPress uygulamalarını tarar.

#### 04-Database Assesment

Veritabanlarındaki açıklıkları bulmak ve sömürmek için ayrıca veritabanlarını görüntülemek için kullanılan araçlar bu bölümde yer alır. Bunlar:

* [**sqlitebrowser**](https://www.kali.org/tools/sqlitebrowser/)**:** SQLite Veritabanı Tarayıcısı, SQLite ile uyumlu veritabanı dosyalarını oluşturmak, tasarlamak ve düzenlemek için kullanılan görsel bir araçtır. Arabirimi QT’ye dayalıdır ve karmaşık SQL komutlarını öğrenmeye ihtiyaç duymadan tanıdık elektronik tablo benzeri bir arabirim kullanarak veritabanları oluşturmak, verileri düzenlemek ve aramak isteyen kullanıcılar ve geliştiriciler için tasarlanmıştır.
* [**sqlmap**](https://www.kali.org/tools/sqlmap/)**:** sqlmap’in amacı, web uygulamalarındaki SQL enjeksiyon güvenlik açıklarını tespit etmek ve bunlardan yararlanmaktır.

#### 05-Password Attacks

Şifre saldırıları için kullanılan araçlar bu bölümde yer alır. Bu araçlar:

* [**cewl**](https://www.kali.org/tools/cewl/)**:** CeWL (Custom Word List generator), John the Ripper gibi şifre kırıcılar için kullanılabilecek bir kelime listesi oluşturan bir ruby uygulamasıdır. Opsiyonel olarak CeWL harici linkleri takip edebilir.
* [**crunch**](https://www.kali.org/tools/crunch/)**:** crunch, standart bir karakter seti veya kelime listelerini oluştururken kullanılacak herhangi bir karakter setini belirtebileceğiniz bir kelime listesi oluşturucusudur. Kelime listeleri, bir dizi karakterin kombinasyonu ve permütasyonu yoluyla oluşturulur. Karakter miktarını ve liste boyutunu belirleyebilirsiniz.
* [**hashcat**](https://www.kali.org/tools/hashcat/)**:** hashcat, 300'den fazla yüksek düzeyde optimize edilmiş karma algoritma için beş benzersiz saldırı modunu destekler. hashcat şu anda Linux’ta CPU’ları, GPU’ları ve diğer donanım hızlandırıcıları desteklemektedir ve dağıtılmış parola kırmaya yardımcı olacak olanaklara sahiptir.
* [**john**](https://www.kali.org/tools/john/)**:** John the Ripper, sistem yöneticilerinin zayıf (tahmin etmesi veya kaba kuvvetle kırması kolay) parolaları bulmasına ve hatta istenirse kullanıcıları bu konuda otomatik olarak e-posta ile uyarmasına yardımcı olmak için tasarlanmış bir araçtır.
* [**medusa**](https://www.kali.org/tools/medusa/)**:** medusa’nın hızlı, büyük ölçüde paralel, modüler, kaba kuvvet saldırısı uygulaması olması amaçlanmıştır. Amaç, mümkün olduğu kadar uzaktan kimlik doğrulamaya izin veren çok sayıda hizmeti desteklemektir.
* [**ncrack**](https://www.kali.org/tools/ncrack/)**:** ncrack, yüksek hızlı bir ağ kimlik doğrulama aracıdır. Tüm ana bilgisayarlarını ve ağ aygıtlarını zayıf parolalar için proaktif olarak test ederek şirketlerin ağlarını güvence altına almalarına yardımcı olmak için oluşturulmuştur.
* [**ophcrack**](https://www.kali.org/tools/ophcrack/)**:** ophcrack, rainbow tablolarını kullanan bir zaman-bellek takasına dayalı bir Windows parola kırıcıdır. Saniyeler içinde alfanümerik şifrelerin %99,9'unu kurtarır.

#### 06-Wireless Attacks

Kablosuz ağ saldırıları için kullanılan araçlar bu bölümde yer alır. Bunlar:

* [**aircrack-ng**](https://www.kali.org/tools/aircrack-ng/)**:** aircrack-ng, yeterli miktarda şifrelenmiş paket toplandıktan sonra 40 bit, 104 bit, 256 bit veya 512 bit WEP anahtarını kurtarabilen bir 802.11a/b/g WEP/WPA kırma programıdır. Ayrıca WPA1/2 ağlarına bazı gelişmiş yöntemlerle veya sadece kaba kuvvetle saldırabilir.
* [**fern wifi cracker**](https://www.kali.org/tools/fern-wifi-cracker/)**:** Bu paket, Python Programlama Dili ve Python Qt GUI kitaplığı kullanılarak yazılmış bir Kablosuz güvenlik denetim ve saldırı yazılım programı içerir, program WEP/WPA/WPS anahtarlarını kırabilir ve kurtarabilir ve ayrıca kablosuz veya ethernet tabanlı diğer ağ tabanlı saldırıları gerçekleştirebilir.
* [**kismet**](https://www.kali.org/tools/kismet/)**:** Kısmet, bir kablosuz ağ ve cihaz dedektörü, sniffer, güvenlik aracı ve WIDS (kablosuz izinsiz giriş tespiti) frameworküdür.
* [**pixiewps**](https://www.kali.org/tools/pixiewps/)**:** Pixiewps, bazı AP’lerin pixie tozu saldırısından yararlanarak WPS anahtarını çevrimdışı olarak zorlamak için kullanılan C ile yazılmış bir araçtır.
* [**reaver**](https://www.kali.org/tools/reaver/)**:** Reaver, bir erişim noktasının WiFi Korumalı Kurulum pin koduna kaba kuvvet saldırısı gerçekleştirir. WPS pini bulunduğunda, WPA PSK kurtarılabilir ve dönüşümlü olarak AP’nin kablosuz ayarları yeniden yapılandırılabilir.
* [**wifite**](https://www.kali.org/tools/wifite/)**:** Wifite, WEP veya WPA şifreli kablosuz ağları denetlemek için oluşturulmuş bir araçtır. Denetimi gerçekleştirmek için aircrack-ng, pyrit, reaver, tshark araçlarını kullanır.

#### 07-Reverse Engineering

Tersine mühendislik için kullanılan araçlar ve komut ortamları bu bölümde yer alır. Bunlar:

* [**radare2**](https://www.kali.org/tools/radare2/): Proje, tersine mühendislik için eksiksiz, taşınabilir, çok mimarili, bir araç zinciri oluşturmayı hedefliyor.

#### 08-Exploitation Tools

Bir hedef sistemi exploit etmek yani hedef sisteme erişim elde etmek için kullanılan araçlar bu bölümde yer alır. Bunlar:

* [**crackmapexec**](https://www.kali.org/tools/crackmapexec/)**:** Bu paket, Windows/Active Directory ortamlarına sızma testi yapmak için kullanışlıdır.
* [**metasploit framework**](https://www.kali.org/tools/metasploit-framework/)**:** Metasploit framework, güvenlik açığı araştırmasını, istismar yöntemi geliştirmeyi ve özel güvenlik araçlarının oluşturulmasını destekleyen açık kaynaklı bir platformdur.
* [**searchsploit**](https://www.kali.org/tools/exploitdb/#searchsploit): Exploit [Veritabanında](https://www.exploit-db.com/) hazır exploit araması yapar.

#### 09-Sniffing&Spoofing

sniffing ve spoofing için kullanılan araçlar bu bölümde yer alır. Bunlar:

* [**ettercap**](https://www.kali.org/tools/ettercap/)**:** Ettercap, birçok protokolün aktif ve pasif incelemesini destekler ve ağ ve ana sistem analizi için birçok özellik içerir.
* [**minicom**](https://www.kali.org/tools/minicom/)**:** Minicom, MS-DOS “Telix” iletişim programının bir kopyasıdır. ANSI ve VT102 terminallerini çalıştırır.
* [**mitmproxy**](https://www.kali.org/tools/mitmproxy/)**:** mitmproxy, HTTP ve HTTPS için etkileşimli bir Man-in-the-Middle proxy’sidir. Ağ trafik akışlarının anında denetlenmesine ve düzenlenmesine izin veren bir konsol arabirimi sağlar.
* [**netsniff-ng**](https://www.kali.org/tools/netsniff-ng/)**:** netsniff-ng, ağ paketi incelemesi için yüksek performanslı bir Linux ağ algılayıcısıdır. Protokol analizi, tersine mühendislik veya ağ hata ayıklaması için kullanılabilir.
* [**responder**](https://www.kali.org/tools/responder/)**:** Bu paket Responder/MultiRelay, bir LLMNR, NBT-NS ve MDNS zehirleyici içerir. Ad soneklerine göre belirli NBT-NS (NetBIOS Ad Hizmeti) sorgularına yanıt verir.
* [**wireshark**](https://www.kali.org/tools/wireshark/)**:** Wireshark, ağ paketlerini yakalayan ve analiz eden bir ağ “sniffer” aracıdır. Wireshark, burada listelenemeyecek kadar çok protokolün kodunu çözebilir.

#### 10-Post Exploitation

Exploit sonrası işlemler, Enumaration(sistem hakkında detaylı bilgi toplama), Privelege Escalatio(yetki yükseltme) ve Pivoting(başka sisteme atlama), için geliştirilmiş araçlar bu bölümde yer alır. Bunlar:

* [**evil-winrm**](https://www.kali.org/tools/evil-winrm/)**:** Bu paket, hackleme/sızma testi için nihai WinRM kabuğunu içerir.
* [**exe2hex**](https://www.kali.org/tools/exe2hexbat/)**:** Bir Windows PE yürütülebilir dosyasını bir toplu iş dosyasına ve tersini dönüştürmek için hazırlanmış bir Python scripti.
* [**mimikatz**](https://www.kali.org/tools/mimikatz/)**:** Mimikatz, şu anda oturum açmış kullanıcıların parolalarını düz metin olarak görüntülemek için Windows’ta yönetici haklarını kullanan bir araçtır.
* [**powershell empire**](https://www.kali.org/tools/powershell-empire/)**:** Bu paket, saf bir PowerShell2.0 Windows aracısı ve saf bir Python Linux/OS X aracısı içeren bir framework içerir. Önceki PowerShell Empire ve Python EmPyre projelerinin birleşimidir.
* [**powersploit**](https://www.kali.org/tools/powersploit/)**:** PowerSploit, yetkili sızma testleri sırasında istismar sonrası senaryolarda kullanılabilen bir dizi Microsoft PowerShell betiğidir.
* [**proxychains4**](https://www.kali.org/tools/proxychains-ng/)**:** Proxychains, ağla ilgili libc işlevlerini önceden yüklenmiş bir DLL (dlsym(), LD\_PRELOAD) aracılığıyla dinamik olarak bağlı programlara bağlayan ve bağlantıları SOCKS4a/5 veya HTTP proxy’leri aracılığıyla yeniden yönlendiren bir UNIX programıdır. Yalnızca TCP’yi destekler (UDP/ICMP vb. yoktur).
* [**weevely**](https://www.kali.org/tools/weevely/)**:** Weevely, telnet benzeri bağlantıyı simüle eden gizli bir PHP web kabuğudur. Bu, web uygulamalarının kullanım sonrası kullanımı için önemli bir araçtır ve yasal web hesaplarını, hatta ücretsiz olarak barındırılanları bile yönetmek için gizli bir arka kapı(backdoor) veya bir web kabuğu olarak kullanılabilir.

#### 11-Forensics

Adli bilişim için geliştirilmiş araçlar bu bölümde yer alır. Bunlar:

* [**autopsy**](https://www.kali.org/tools/autopsy/)**:** autopsy Forensic Browser, The Sleuth Kit’teki komut satırı dijital adli bilişim analiz araçlarına grafiksel bir arayüzdür. The Sleuth Kit ve Autopsy birlikte, Windows ve UNIX dosya sistemlerinin (NTFS, FAT, FFS, EXT2FS ve EXT3FS) analizi için ticari dijital adli bilişim araçlarıyla aynı özelliklerin birçoğunu sağlar.
* [**binwalk**](https://www.kali.org/tools/binwalk/)**:** binwalk, belirli bir ikili görüntüde gömülü dosyalar ve yürütülebilir kod aramak için kullanılan bir araçtır. Özellikle, ürün yazılımı görüntülerinin içine gömülü dosyaları ve kodu tanımlamak için tasarlanmıştır. Binwalk, libmagic kitaplığını kullanır, dolayısıyla Unix dosya yardımcı programı için oluşturulan sihirli imzalarla uyumludur.
* [**bulk\_extractor**](https://www.kali.org/tools/bulk-extractor/)**:** bulk\_extractor, bir disk görüntüsünü, bir dosyayı veya bir dosya dizinini tarayan ve dosya sistemi veya dosya sistemi yapılarını ayrıştırmadan faydalı bilgileri çıkaran bir C++ programıdır. Sonuçlar, kolayca incelenebilen, ayrıştırılabilen veya otomatik araçlarla işlenebilen özellik dosyalarında saklanır.
* [**hashdeep**](https://www.kali.org/tools/hashdeep/)**:** hashdeep, keyfi sayıda dosyanın MD5, SHA1, SHA256, tiger ve whirlpool hashsum’larını yinelemeli olarak hesaplamak için bir dizi araçtır.

### Son

Bu yazımda, kali linux’un ne olduğundan ve ne gibi yetenekleri olduğundan bahsetmeye çalıştım. Kısaca, içinde hazır kurulu halde gelen araçlardan bahsettim. Bu araçların nasıl kullanılacağı ile ilgili hem kalinin kendi sayfasında hem de internette pek çok bilgi mevcut. Ayrıca, kali terminalinde “arac\_ismi -h” yazarak da o aracın kullanımı hakkında bilgi edinebiliyorsunuz. Yazımı beğenip yorum yapmayı unutmayın!