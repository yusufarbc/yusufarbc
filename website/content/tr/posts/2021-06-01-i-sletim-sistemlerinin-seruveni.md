---
date: '2021-06-01'
description: Bu yazımızda, günümüzde bilgisayar sistemleri için olmazsa olmaz konuma gelmiş olan işletim sistemlerini inceleyeceğiz. Nasıl geliştiğine, bu günlere nasıl geldiğine deyineceğiz. Günümüzde popüler olan işletim sistemelerinin nasıl ortaya çıktığına şa...
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*xr3hyWH8B1uBJitVrIH3xQ.jpeg
layout: single
title: İşletim Sistemlerinin Serüveni
type: posts
---

Bu yazımızda, günümüzde bilgisayar sistemleri için olmazsa olmaz konuma gelmiş olan işletim sistemlerini inceleyeceğiz. Nasıl geliştiğine, bu günlere nasıl geldiğine deyineceğiz. Günümüzde popüler olan işletim sistemelerinin nasıl ortaya çıktığına şahit olacağız.

İşletim sisteminin ne olduğuyla başlamak gerekirse; işletim sistemi bir bilgisayarın tüm işlemlerini kontrol eden bir yazılımdır. Bu yazılım, bir kullanıcının dosya kaydedip açmasını sağlayan araçları, bir programı yürütme isteğini iletebileceği arayüzü ve istenilen programların yürütülebileceği ortamı sağlar. İşletim sistemi deyince akla Microsoft firmasının geliştirdiği Windows işletim sistemi gelir. Bunun dışında Unix ve Linux işletim sistemleri de vardır. Ama bunlardan önce işletim sistemlerinin tarihine bir bakalım.

### İlk bilgisayarlar

![](https://cdn-images-1.medium.com/max/800/0*mQmzkEmOfRVLwzCZ.jpeg)

İlk bilgisayarlar bir oda büyüklüğündeydi. Bir işletim sistemine de sahip değillerdi. Programlar delikli kartlar üzerine kodlanırdı ve bilgisayara sırayla verilip çalıştırılırdı. Görev adı verilen bu süreç ciddi bir hazırlık gerektiriyordu. Bilgisayarda bir program yürütmek için önceden rezervasyon yapılır ve bu süre içerisinde bilgisayarın kullanım hakkı o kullanıcının olurdu.

Böyle bir ortamda işletim sistemleri program kurulumunu basitleştiren ve görevler arasındaki geçişleri düzenleyen sistemler olarak ortaya çıktılar. Bir görev yürütmek isteyen kullanıcı, programı, işlenecek veriyi ve talimatları operatöre verir, görev kuyruğa alınır ve operatör talimatlar doğrultusunda programı yürütürdü. Ardından kullanıcı sonuçları almaya gelirdi. Bu toplu işlem kavramının ilk örneğidir. Bu sistem bilgisayarların verimliliğini ve çalışma hızını arttırmasına karşın kullanıcının bilgisayarla etkileşime geçmesini de engelliyordu. Yürütülmesi sırasında kullanıcının programla etkileşime geçmesi zorunlu olan uygulamalar için kabul edilemezdi.

Bu ihtiyaçları karşılamak için etkileşimli işleme modeli geliştirilmiş, kullanıcıların yürütülen programla bir terminal üzerinden diyalog kurabilmesi sağlanmıştı. Bu terminal ekranları günümüz işletim sistemlerinde de varlığını sürdürmektedirler. Ancak, bu model de beraberinde yeni sorunlar getirmişti. Şöyle ki, terminal ile aynı anda sadece bir kullanıcı program yürütebiliyordu. Bilgisayarların çok pahalı sistemler olduğu o dönemlerde, tek bir bilgisayar birden çok kullanıcıya hizmet vermek zorundaydı.

Bu problemin çözümü aynı anda birden çok kullanıcıya hizmet verebilen bir işletim sistemi geliştirmekti. Bu durum, zaman paylaşımlı sistemlerin ortaya çıkmasına yol açtı. Bu teknikte zaman belli aralıklara bölünür ve her bir görevin yürütülmesi tek bir zaman aralığıyla sınırlandırılırdı. Her aralığın sonunda mevcut görev durdurulur, geçici olarak saklanır, bir diğer görev yürütülürdü. Birden çok görevin hızlı bir şekilde işleme alınıp çıkartılması, bu görevlerin aynı anda yürütüldüğü izlenimini yaratırdı. Ayrıca,bu sistem sayesinde bir kullanıcının aynı anda birden çok program yürütebilmesi de sağlanmıştı.

Kısacası, işletim sistemleri zaman içinde, aynı anda tek bir görevi yürütebilen basit programlardan, zaman paylaşımını yöneten, depolama alanındaki program ve veri dosyalarından sorumlu ve kullanıcıların isteklerine cevap verebilen karmaşık sistemler haline gelmişlerdir.

### Unix’in doğuşu

![](https://cdn-images-1.medium.com/max/800/0*j5b0VF0AN66jHyIQ.gif)

1960'lı yıllarda AT&T’nin Bell laboratuarları, MIT ve General Electric’in birlikte yürüttükleri bir projede zaman paylaşımlı bir işletim sistemi üzerinde çalışmışlardır. Bu proje sonucunda ortaya “Multics” adında bir işletim sistemi çkmıştır. Bell laboratuarı projeden çekilince, burada çalışan **Dennis Ritchie** ve **Ken Thompson** “Multics” projesindeki tecrübelerinden de yararlanarak yeni bir projede yeni bir işletim sistemi ortaya çıkardılar. Başlangıçta assembly dilinde yazılarak geliştirilen bu işletim sistemine “Unix” adı verildi.

Dennis Ritchie 1973 yılında kendi geliştirdiği C programlama dili ile Unix’i tekrar yazdı, daha önce assembly dili ile yazılmış olan işletim sistemini çalıştığı donanımın mimarisine bağımlı iken, C dili ile birlikte farklı platformlarda da çalışabilme yeteneği kazandı. Bu aşamadan sonra Unix işletim sistemi duyulmaya ve başta üniversitelerin bilgisayar bölümlerinde okuyanlar ve çalışanların desteği ile hızla büyük ilerleme kaydetti ve en önemli işletim sistemi konumuna geldi.

Unix işletim sistemi, komut satırlı ve Windows gibi bazı grafik ögelerini içerisinde barındıran tam bir işletim sistemiydi. Kullanıcılar komut satırlarıyla işlemlerini gerçekleştirirlerdi. Zaman paylaşımlı bir işletim sistemi olması sayesinde birden çok kullanıcı bilgisayarı kullanabilir veya bir kullanıcı birden fazla programı aynı anda yürütebilirdi.

1980'lerin başında AT&T UNIX işletim sisteminden para kazanma yoluna gitti ve işletim sistemini özel lisanslar ile pazarlamaya başladı. UNIX’in ortaya çıktığı günden itibaren işletim sisteminin gelişmesine yardımda bulunan birçok kişi bu karara karşı çıktı. Bunun üzerine amacı UNIX benzeri ve parasız dağıtılabilen bir işletim sistemi ortaya çıkarmak olan **GNU** projesi **Richard Stallman** tarafından başlatıldı ve bu proje için “Free Software Foundation (FSF — Özgür Yazılım Vakfı)” kuruldu.

### Linux’un doğuşu

![](https://cdn-images-1.medium.com/max/800/0*kTMsIQ1DbZOPM85o.jpg)

**GNU** projesi kapsamında Unix türevi olan **Minix** işletim sistemini ortaya çıktı. Bu işletim sistemi Prof. Andrew S. Tanenbaum tarafından, üniversitelerde bilgisayar bölümlerinde öğrencilere işletim sistemlerinin çalışma prensipleri ve işlevlerini öğretebilmek için mikro çekirdek mimarili olarak geliştirilmişti.

1991 yılında bilgisayar bilimi öğrencisi **Linus Torwalds** Unix ve Minix işletim sistemleri üzerinde bilgi alışverişlerinin yapıldığı bir haber grubuna bir mesaj gönderdi. Linus mesajında, ücretsiz bir işletim sistemi üzerinde çalıştığını ve geliştirme için öneri istediğini belirtti. Linus, yeni işletim sistemine Linus’un Minix’i olarak tanımladığı **Linux** adını verdi. Geliştiricilerden Linux’ın geliştirilmesi için yardım teklifleri gelmeye başladı. Linux’ın bir diğer önemli yanı, GNU projesi çerçevesinde geliştirilen Unix benzeri işletim sisteminin büyük bir bölümü bitmişti, eksik kalan işletim sisteminin çekirdeği idi ve Linux bu eksiği kapatıyordu. 1991 Eylül’ünde Linux’un ilk sürümü paylaşıma sunuldu ve böylece Linux doğmuş oldu.

### Windows’un doğuşu

![](https://cdn-images-1.medium.com/max/800/0*NSHG5-qdcNnonu_n.jpg)

Kişisel bilgisayarlar 70'li yılların ortasında henüz gelişimlerinin ilk aşamasında bulunuyorlardı. MITS şirketinin Altair adını verdikleri en önemli numunesi henüz tek biςim, kullanılabilir bir yazılıma sahip olmayıp ancak tamamlanmamış bir işletim sistemine sahipti. Bill Gates ve Allen’ın, Altair iςin 1974'te geliştirdikleri yazılım dili BASIC sayesinde bilgisayar kullanıcıları programlarını kendileri yazabiliyorlardı. MITS şirketi genç araştırmacılardan pazarlama ruhsatını satın alarak kendilerine sistemi daha da geliştirmeleri iςin sipariş verdi. Bunun üzerine, Gates Allen ile birlikte New Mexico’da Microsoft adlı şirketi kurdu.

Microsoft, IBM PC uyumlu bilgisayarlar için MS -DOS isminde bir işletim sistemi geliştirdi. 1980'de IBM ile bir ortaklık kurdu ve bu anlaşmayla IBM, Microsoft’a her satış için bir lisans ücreti ödedi. Ardından, MS-DOS için “Arayüz Yöneticisi” adı altında yeni bir grafik kullanıcı arayüzü (GUI) geliştirdi. Ancak, 1985'teki resmi tanıtımdan önce, pazarlama uzmanları Bill Gates’i Windows’un daha uygun bir isim olduğuna ikna ettiler. Böylece, Windows kişisel bilgisayarların kullanımını kolaylaştıran bir arayüz programı olarak doğmuş oldu. MS-DOS işletim sisteminin üstüne kurulan bir arayüz yazılımı olan windows, sonraki yıllarda yeni sürümlerinin çıkmasıyla tam bir işletim sistemi olmuştur.

### Günümüz İşletim Sistemleri

![](https://cdn-images-1.medium.com/max/800/0*L1PHGnrU90lDyD_b.png)

Bilgisayar dünyasında, Windows, Unix ve Linux işletim sistemleri genel kabul görmüş ve zamanla gelişerek farklı sürümlerle günümüze kadar gelmişlerdir. Günümüzdeki işletim sistemleri, Windows, Unix veya Lnux işletim sistemlerinden birini temel almışlardır. Bu 3 işletim sisteminden türemişlerdir. Bu yönüyle işletim sistemlerini 3 sınıfa ayırabiliriz.

1- Unix Tabanlı işletim sistemleri  
 2 -Windows tabanlı işletim sistemleri  
 3- Linux tabanlı işletim sistemleri

### Unix tabanlı sistemler

Unix’in gün yüzüne çıkmasının ardından popüler bir hale gelmesinin en önemli nedenlerinden biri de farklı girişimlere izin vermesidir. Unix telif hakkı bulunan ticari bir üründür. The Open Group adlı kuruluş Unix ilişkili tüm ticari lisanslama programlarını yönetir. Sadece lisansı bulunan bazı büyük firmalar UNIX ticari markasını ve ismini kullanabilir. Bu sayede Unix tabanlı işletim sistemlerinin varlığından söz edebiliyoruz. Bazı Unix dağıtımları ise şöyledir;

MacOS, Oracle Solaris, IBM AIX, HP-UX, IRIX ve BSD.

### Windows tabanlı sistemler

Windows, programları çalıştırmak, komut vermek gibi işlemler yapmak için kullanışlı grafik arayüzler ve görsel iletiler kullanır. Hızlı işlem gerçekleştirebilme kolaylığı sağlar. Windows işletim sistemlerinin en büyük özelliği kolay öğrenilebilmesidir. Bu kolaylık sayesinde en çok kullanılan işletim sistemi olmuştur. Windows´un şu ana kadar birçok sürümleri çıkarılmıştır. Bunlar sırasıyla;

Windows 1.0, Windows 2.0, Windows 3.0, Windows 95, Windows 98, Windows ME, Windows XP, Windows Vista, Windows 7, Windows 8, Windows 8.1 ve Windows 10'dur.

### Linux tabanlı sistemler

Linux ortaya çıkışından sonra dünyaca ilgi görmüş ve GNU tarafından da sahiplenilmişti. Bu yüzden GNU/LİNUX kavramı ortaya çıkmıştır. Linux’u günümüzde GNU desteklemektedir. Aslında Linux sadece çekirdekten(kernel) ibarettir ve bir arayüzü yoktur. Açık kaynak kodlu, özgür bir yazılım olduğu için ücretsizdir ve istenildiği gibi özelleştirilip farklı Linux dağıtımları oluşturulabilir. Dolayısıyla sayısız Linux tabanlı işletim sistemi vardır.

Linux tabanlı bir sisteminin var olması için kernelden sonra iskelet sistemi diyebileceğimiz bir yapı gerekir. Bazı sistemler burada kendi sistemlerini geliştirir. Ancak, her bir Linux dağıtımı için ayrı arayüz(GUI) , paket yöneticisi ve uygulamalar geliştirmek çok maliyetlidir. Bu nedenle, bazıları da var olan sistemi alıp, onun üzerinde eklemeler yaparak işletim sistemini oluşturur. Arayüzde; GNOME, XFCE, MATE, CİNAMON gibi hazır arayüzler kullanılır. Paket yöneticilerine örnek olarak da APT, DNF ve PACMAN verilebilir. Farklı paket yöneticileri ve arayüz(GUI) kullanan sayısız Linux dağıtımı türemiştir. Bunlardan bazıları;

Ubuntu, Kali Linux, Pardus, Linux Mint, Zorin, Deepin, SteamOS, MX Linux, PureOS, Raspbian, Parrot, elementaryOS, Pop!\_OS, Linux Lite, Fedora, Redhat, Opensuse, CentOS ve Arch Linux’tur.

*Originally published at* [*https://pwnlab.me*](https://pwnlab.me/tr-isletim-sistemlerinin-seruveni/) *on June 1, 2021.*