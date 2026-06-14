Başlık: Windows'ta Kalıcılık ve Yatay Hareket — Sızma Sonrası Tam Rehber


---

Bir saldırgan hedef sisteme ilk erişimi (Initial Access) sağladığında gerçek mücadele yeni başlar. Kimlik avı e-postası tıklandı, zafiyet istismar edildi ya da VPN kimlik bilgisi ele geçirildi — ama bu yalnızca kapıdan girmektir. Asıl hedef; fark edilmeden kalmak, köklü bir yer edinmek ve ağın derinliklerine yayılmaktır.

Bu yazıda bir saldırganın gözünden sızma sonrası dönemi kronolojik olarak inceliyoruz:

Kalıcılık (Persistence): Sistem yeniden başlatılsa, şifre değiştirilse bile varlığını sürdürmek.
Yatay Hareket (Lateral Movement): İlk ele geçirilen makineden kritik sunuculara, Domain Controller'a sıçramak.
Tespit (Detection): Blue Team'in bu zinciri nasıl kırabileceği.
Sıkılaştırma (Hardening): Önleyici savunma adımları.

> Bu yapı MITRE ATT&CK Enterprise Matrix'in TA0003 (Persistence) ve TA0008 (Lateral Movement) taktikleriyle birebir örtüşmektedir.

---

---

Bölüm: Windows Sistemlerde Kalıcılık (Persistence) Mekanizmaları


Kalıcılık yöntemleri, bir sistemin yeniden başlatılması veya kullanıcı oturumunun kapatılması durumunda bile zararlı yazılımların veya yetkisiz erişimlerin devam etmesini sağlar. Saldırganlar bu aşamada mümkün olduğunca sessiz olmayı tercih eder: antivirüs atlatılmalı, log kayıtları minimum düzeyde tutulmalı, meşru sistem araçlarıyla iç içe geçilmelidir.


Bölüm Detayı: Kullanıcı Manipülasyonu


Saldırganlar Administrator hesabını ele geçirdiğinde, bu hesabın faaliyetleri izlendiği için doğrudan kullanmak yerine yeni ve "sıradan görünen" kullanıcılar oluştururlar. Bu kullanıcılar genellikle support, sysadmin, helpdesk gibi adlar taşır — SOC ekibinin radarına girme ihtimali düşüktür.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Mevcut kullanıcıları listelemek için:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


[Görsel: Görsel açıklaması yok]


SOC Tespiti — Event ID'leri:

[Tablo Başlangıcı]
Event ID: 4720. Anlam: Yeni kullanıcı hesabı oluşturuldu.
Event ID: 4726. Anlam: Kullanıcı hesabı silindi.
Event ID: 4732. Anlam: Kullanıcı bir gruba eklendi (Administrators gibi).
[Tablo Bitişi]


Event Viewer → Windows Logs → Security üzerinden bu Event ID'leri filtreleyerek iz sürülebilir.


[Görsel: Görsel açıklaması yok]



[Görsel: Görsel açıklaması yok]


---


Bölüm Detayı: Zamanlanmış Görevler (Scheduled Tasks)


Fidye yazılımlarından APT gruplarına kadar kalıcılık için en yaygın kullanılan yöntemlerden biridir. Saldırgan, zararlı dosyanın belirli aralıklarla ya da sistem açılışında çalışmasını sağlar.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Sysinternals Autoruns aracı, zamanlanmış görevleri imza doğrulamasıyla birlikte listeler; Microsoft imzalı olmayan görevler kırmızı ile işaretlenir.


[Görsel: Görsel açıklaması yok]


SOC Tespiti:
Event ID 4698: Yeni zamanlanmış görev oluşturuldu.
Autoruns → Scheduled Tasks sekmesi.

---


Bölüm Detayı: Kayıt Defteri Çalıştırma Anahtarları (Registry Run Keys)


Registry Run key'leri, Windows'un meşru bir özelliğidir; sistem açılışında veya kullanıcı oturum açtığında belirtilen programları otomatik çalıştırır. MITRE ATT&CK verilerine göre T1547.001 tekniği, 54'ten fazla bilinen tehdit grubu tarafından kullanılmaktadır.

Temel Run Anahtarları:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Startup Klasörü Yönlendirme Anahtarları:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

İleri Düzey Anahtarlar (APT'lerin Tercihi):

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Registry değişikliklerini görselleştirmek için regedit veya Autoruns kullanılabilir:


[Görsel: Görsel açıklaması yok]



[Görsel: Görsel açıklaması yok]



[Görsel: Görsel açıklaması yok]


SOC Tespiti:
Event ID 4657: Registry değeri değiştirildi/oluşturuldu (Auditing etkin olmalı).
Sysmon Event ID 12 (anahtar oluşturma/silme) ve 13 (değer değişikliği).

---


Bölüm Detayı: Startup Klasörü


[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Çalıştır (Win+R) → shell:startup ile erişilebilir:


[Görsel: Görsel açıklaması yok]



[Görsel: Görsel açıklaması yok]


---


Bölüm Detayı: Windows Servisleri


Saldırganlar sc create komutuyla meşru isimler taşıyan (ör. ChromeUpdateService) yeni servisler oluşturabilir veya mevcut servisleri ele geçirebilir.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

SOC Tespiti:
Event ID 4697: Sisteme yeni servis yüklendi.
Autoruns → Services sekmesi.

---


Bölüm Detayı: BITS Jobs (Background Intelligent Transfer Service)


BITS, Windows'un dosya transfer altyapısıdır; güvenlik duvarları tarafından genellikle engellenmez. Saldırganlar BITS üzerinden dosya indirip çalıştırabilir ve güvenlik araçlarının radarından kaçabilir.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Tespiti: bitsadmin /list /verbose veya Sysmon süreç yaratma logları.

---


Bölüm Detayı: WMI Event Subscriptions — Disksiz (Fileless) Kalıcılık


WMI (Windows Management Instrumentation), gelişmiş tehdit aktörlerinin disk üzerinde iz bırakmadan kalıcılık sağladığı en sofistike yöntemlerden biridir. Payload registry ve WMI veritabanında saklanır; geleneksel antivirüs taramaları dosya sistemi odaklı olduğundan bu tekniği genellikle atlayabilir.

Üç bileşen birlikte çalışır:

Filter (Filtre): Tetikleyici olay — ör. sistem açılışı.
Consumer (Tüketici): Çalıştırılacak komut/script.
Binding (Bağlayıcı): Filtre ile Consumer'ı ilişkilendirir.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

SOC Tespiti:
Sysmon Event ID 19 (WmiEventFilter), 20 (WmiEventConsumer), 21 (WmiEventConsumerToFilter).
PowerShell script block logging etkinleştirilmişse Event ID 4104.
Get-WMIObject -Namespace root\subscription -Class __EventFilter ile manuel sorgu.

---


Bölüm Detayı: COM Hijacking


COM (Component Object Model), Windows uygulamalarının birbirleriyle iletişim kurduğu bir altyapıdır. Her COM nesnesi registry'de bir CLSID ile kayıtlıdır. Saldırganlar HKCU\Software\Classes\CLSID altına meşru bir COM nesnesinin CLSID'ini kopyalayarak kendi kötü amaçlı DLL'lerini yükletebilir — bunu yapmak için yönetici yetkisi bile gerekmez.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Windows, HKCU'yu HKLM'den önce kontrol ettiği için kötü amaçlı DLL yüklenir. explorer.exe gibi sık yeniden başlatılan süreçlerin COM nesneleri bu saldırı için ideal hedeflerdir.

Tespit: Sysmon Event ID 7 (Image Load) — meşru süreçlerin C:\Users\ yolundan DLL yüklemesi anomalidir.

---


Bölüm Detayı: IFEO (Image File Execution Options) Enjeksiyonu


IFEO, geliştiricilerin bir uygulamayı başlatıldığında hata ayıklayıcıya bağlamasını sağlar. Saldırganlar bu mekanizmayı, engellilik kısayol tuşlarına bağlı sistem uygulamalarının (sethc.exe — Sticky Keys, utilman.exe — Erişilebilirlik) yerine kendi arka kapılarını çalıştırmak için kullanır. Bu yöntem özellikle dikkat çekicidir çünkü giriş ekranından, yani herhangi bir kullanıcı oturumu açmadan çalıştırılabilir.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Artık giriş ekranında Shift tuşuna 5 kez basıldığında sethc.exe yerine cmd.exe çalışır — sistem yetkisiyle.

Tespit:
Sysmon Event ID 13: IFEO registry anahtarına yazma.
Event ID 4688: Olağandışı parent-child süreç ilişkisi (sethc.exe → cmd.exe).

---


Bölüm Detayı: DLL Search Order Hijacking / Sideloading


Windows bir DLL'i yüklerken belirli bir sırayla arama yapar: önce uygulamanın kendi dizini, sonra sistem dizinleri. Saldırganlar, meşru ve dijital imzalı bir uygulamanın çalıştığı dizine aynı isimde kötü amaçlı bir DLL yerleştirerek yasal süreçler aracılığıyla kod çalıştırabilir.

Sideloading: Özellikle güvenlik araçlarının veya antivirüs yazılımlarının kendi dizinlerine yerleştirilen sahte DLL'lerle gerçekleşir — güvenlik ürününün kendi ayrıcalıklarıyla çalışır.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

LegitApp.exe başlatıldığında önce kendi dizinine bakar ve version.dll'i bularak yükler.

Tespit: Sysmon Event ID 7 — imzasız veya beklenmedik yoldan DLL yüklenmesi.

---

---

Bölüm: Kalıcılıktan Yatay Harekete — Köprü


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Saldırgan Neden Yerinde Durmaz?


Saldırgan ilk makineyi ele geçirdiğinde bu genellikle bir son kullanıcı iş istasyonudur: sınırlı erişim, sınırlı veri, sınırlı etki. Gerçek hedef ağdaki kritik varlıklardır:

Domain Controller (DC): Tüm Active Directory kimlik bilgileri, Group Policy kontrolü, NTDS.dit veritabanı.
Dosya Sunucuları: Hassas belgeler, kaynak kodları.
Yedekleme Sunucuları: Veri şifreleme (ransomware) için ideal hedef.
SIEM/Log Sunucuları: İzlerin silinmesi.


Bölüm Detayı: Active Directory: Saldırganın Altın Madeni


Kurumsal ağların büyük çoğunluğu Active Directory (AD) altyapısı üzerinde çalışır. AD, merkezi kimlik yönetimi sağlar; bu da onu hem saldırganlar için birincil hedef, hem de bir kez ele geçirildiğinde tüm ağın kapılarını açan bir "master key" haline getirir.

Credential Harvesting — Kimlik Bilgisi Toplama:

İlk makinede kalıcılık sağlandıktan sonra saldırgan kimlik bilgilerini toplamaya başlar:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu noktadan itibaren saldırgan elindeki kimlik bilgileri ve hash'lerle yatay harekete geçmeye hazırdır.

---

---

Bölüm: Ağ İçinde Yatay Hareket (Lateral Movement)


Yatay hareket, saldırganın ağ içindeki diğer sistemlere erişim sağlaması sürecidir. Bir APT grubunun lateral movement aşamasında ortalama süre, kurumsal ağlarda 4-5 gün olmakla birlikte bu süre bazen haftalara uzayabilir. Saldırganlar bu süreçte mümkün olduğunca "gürültüsüz" çalışmayı, meşru araçları kullanmayı (Living off the Land — LotL) ve normal trafik içinde eriyip gitmeyi hedefler.


Bölüm Detayı: RDP (Remote Desktop Protocol) — APT'lerin Favorisi


RDP, Microsoft'un uzak masaüstü bağlantı protokolüdür ve port 3389 üzerinden çalışır. APT gruplarının lateral movement aracısı olarak en sık kullandığı protokoldür; bunun ana nedeni RDP'nin kurumsal ağlarda zaten yaygın olmasıdır — normal trafik içinde kaybolur.


[Görsel: Görsel açıklaması yok]


RDP'nin Temel Özellikleri:
Uzaktan Erişim: Tam masaüstü kontrolü.
TLS Şifreleme: Güvenli veri iletimi (eski sürümlerde zafiyetler mevcut — BlueKeep, CVE-2019-0708).
Kerberos Entegrasyonu: AD ortamında kimlik doğrulama Kerberos protokolü üzerinden yapılır.


[Görsel: Görsel açıklaması yok]


APT'lerin RDP ile Lateral Movement Yöntemleri:

Pass-the-Hash (PtH): NTLM hash'i kullanarak şifresiz kimlik doğrulama.
Credential Dumping: Mimikatz ile LSASS belleğinden kimlik bilgisi çalma.
Brute-Force: Zayıf RDP şifrelerini kaba kuvvetle kırma.

> Önemli Not: Bu saldırıların gerçekleşmesi doğrudan RDP'yi suçlu kılmaz. Pass-the-Hash, Kerberos protokolünün stateless yapısından; Credential Dumping ise Windows'un LSASS sürecinin bellek yönetiminden kaynaklanır. RDP yalnızca bu saldırıların vektörüdür.

APT Örnekleri:
APT33 (İran): RDP üzerinden lateral movement + credential theft.
APT29 (Cozy Bear / Rusya): Ele geçirilmiş RDP oturumlarıyla iç ağda yayılma.

---


Bölüm Detayı: WinRM & PowerShell Remoting — Living off the Land


Windows Remote Management (WinRM), Windows'un yerleşik uzaktan yönetim protokolüdür ve portlar 5985 (HTTP) ve 5986 (HTTPS) üzerinden çalışır. Sistem yöneticilerinin günlük yönetim için kullandığı bu altyapı, saldırganların "arazi üzerinde yaşama" (Living off the Land — LotL) taktiği için birebir uygundur.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Neden tehlikelidir?
powershell.exe ve wsmprovhost.exe gibi tamamen meşru Windows süreçleri kullanılır.
Trafik WinRM üzerinden şifreli geçer.
Birçok EDR çözümü PowerShell Remoting'i varsayılan olarak beyaz listeye alır.

SOC Tespiti:
Event ID 4624 (Type 3 — Network Logon): Uzak sisteme oturum açma.
Event ID 4688: wsmprovhost.exe süreç oluşturma.
Sysmon Event ID 3: 5985/5986 portuna giden ağ bağlantısı.
PowerShell Script Block Logging (Event ID 4104).

---


Bölüm Detayı: SMB Share ve PsExec — Klasik Ama Etkili


SMB (Server Message Block), Windows'un dosya paylaşım protokolüdür (port 445). Saldırganlar özellikle yönetici paylaşımları olan ADMIN$ ve C$ üzerinden lateral movement gerçekleştirir.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

PsExec Nasıl Çalışır?
ADMIN$ paylaşımına PSEXESVC.exe servisini kopyalar.
Hedef sistemde bu servisi başlatır.
Named Pipe üzerinden komut/cevap iletişimi kurar.
İşlem bitince servisi siler (ama izler kalır).

SOC Tespiti:
Event ID 7045: Yeni servis kurulumu (PSEXESVC).
Event ID 4624 (Type 3): SMB kimlik doğrulaması.
Sysmon Event ID 1: PSEXESVC.exe süreç oluşturma.
Sysmon Event ID 11: ADMIN$ paylaşımına dosya bırakma.

---


Bölüm Detayı: Kerberos İstismarları: PtT ve Overpass-the-Hash


Active Directory ortamlarında kimlik doğrulama Kerberos protokolüyle gerçekleşir. Kerberos'un "stateless" (durumsuz) mimarisi — yani bilet tabanlı çalışması — bazı kritik saldırı vektörlerine kapı açar.

Kerberos Bilet Sistemi:
TGT (Ticket Granting Ticket): Kullanıcı giriş yaptığında KDC (Key Distribution Center) tarafından verilir.
TGS (Ticket Granting Service): Belirli servislere erişim için TGT ile talep edilir.


Bölüm Detayı: Pass-the-Ticket (PtT)


Bellekten çalınan bir Kerberos bileti, başka bir sistemde kimlik doğrulama için kullanılabilir. Bilet geçerlilik süresi dolmadığı sürece (varsayılan 10 saat) şifre değiştirilse bile çalışır.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]


Bölüm Detayı: Overpass-the-Hash


NTLM hash'ini kullanarak Kerberos TGT bileti talep etme yöntemidir. Bu teknikle saldırgan, hash'i doğrudan NTLM kimlik doğrulamasında kullanmak yerine onu Kerberos biletiyle değiştirerek daha az iz bırakır.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu komut NTLM hash'iyle yeni bir oturum açar ve arka planda Kerberos TGT talep eder.

Kerberos'un Stateless Yapısı ve RDP İlişkisi:

RDP, AD ortamında kimlik doğrulama için Kerberos'u kullanır. Pass-the-Ticket saldırısında çalınan bilet doğrudan RDP oturumu açmak için kullanılabilir — çünkü Kerberos, biletin hangi makinede oluşturulduğunu takip etmez. Bu nedenle, Pass-the-Hash ile RDP lateral movement birleştiğinde görünen "suçlu" RDP'dir, ama gerçek zafiyet Kerberos'un tasarım felsefesindedir.

SOC Tespiti:
Event ID 4768: TGT talebi (AS-REQ).
Event ID 4769: TGS talebi (TGS-REQ) — aynı kullanıcıdan çok sayıda kısa süre içinde farklı servis talepleri anomalidir.
Event ID 4771: Kerberos ön kimlik doğrulama başarısız.

---

---

Bölüm: Blue Team / SOC Perspektifinden Tespit ve Tehdit Avcılığı


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Tespit Felsefesi: Tek Log Yerine Anomali Zinciri


Bireysel log kayıtları çoğu zaman yanıltıcıdır. Meşru yazılımlar da Run anahtarlarını değiştirebilir, sistem yöneticileri de PsExec kullanır. Etkili tespit için korelasyon gereklidir: birden fazla olayı bir araya getirerek anlam çıkarmak.

> Altın Kural: Tek bir Event ID alarm değildir. Anomali zinciri alarmdir.

---


Bölüm Detayı: Event ID Referans Tablosu


[Tablo Başlangıcı]
Event ID: 4720. Kaynak: Windows Security. Anlam: Kullanıcı oluşturuldu.
Event ID: 4726. Kaynak: Windows Security. Anlam: Kullanıcı silindi.
Event ID: 4732. Kaynak: Windows Security. Anlam: Gruba üye eklendi.
Event ID: 4697. Kaynak: Windows Security. Anlam: Servis kuruldu.
Event ID: 4698. Kaynak: Windows Security. Anlam: Zamanlanmış görev oluşturuldu.
Event ID: 4624 (Type 3). Kaynak: Windows Security. Anlam: Ağ üzerinden oturum açma.
Event ID: 4624 (Type 10). Kaynak: Windows Security. Anlam: Uzak etkileşimli oturum (RDP).
Event ID: 4657. Kaynak: Windows Security. Anlam: Registry değeri değiştirildi.
Event ID: 4768. Kaynak: Windows Security. Anlam: Kerberos TGT talebi.
Event ID: 4769. Kaynak: Windows Security. Anlam: Kerberos TGS talebi.
Event ID: 1. Kaynak: Sysmon. Anlam: Süreç oluşturma.
Event ID: 3. Kaynak: Sysmon. Anlam: Ağ bağlantısı.
Event ID: 7. Kaynak: Sysmon. Anlam: DLL yükleme.
Event ID: 11. Kaynak: Sysmon. Anlam: Dosya oluşturma.
Event ID: 12/13. Kaynak: Sysmon. Anlam: Registry oluşturma/değişiklik.
Event ID: 19/20/21. Kaynak: Sysmon. Anlam: WMI Event aboneliği.
[Tablo Bitişi]


---


Bölüm Detayı: Sysmon ile Derinlemesine Telemetri


Sysmon (System Monitor), Windows'un yerel log altyapısını önemli ölçüde zenginleştirir. Registry değişiklikleri için kritik event ID'ler:

Event ID 12 (RegistryEvent - Object create/delete): Yeni Run anahtarı oluşturulması.
Event ID 13 (RegistryEvent - Value Set): Mevcut anahtar değerinin değiştirilmesi.

Her Sysmon kaydı ParentImage ve ParentCommandLine alanlarını içerir — değişikliği kimin yaptığını ve bu sürecin nasıl başlatıldığını gösterir. Bu alan, saldırı zincirini geriye doğru takip etmek için kritiktir.


[Görsel: Görsel açıklaması yok]


---


Bölüm Detayı: EDR/XDR Korelasyon Zinciri


XDR platformları, izole olayları bir saldırı hikayesine dönüştürür. Örnek bir persistence → C2 zinciri:

İlk Erişim: Phishing e-postası → outlook.exe → powershell.exe başlatma (Sysmon EID 1).
Dosya Bırakma: C:\Users\Public\payload.exe oluşturuldu (Sysmon EID 11).
Kalıcılık: HKCU\...\Run anahtarına yazıldı (Sysmon EID 13).
C2 Bağlantısı: Bilinmeyen IP:443'e bağlantı (Sysmon EID 3).


[Görsel: Görsel açıklaması yok]


---


Bölüm Detayı: Pratik SOC Senaryoları — KQL Pseudo-Code


Senaryo 1: Şüpheli Konumdan Registry Yazma

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Senaryo 2: Lateral Movement — WinRM + Yeni Oturum Zinciri

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Senaryo 3: WMI Kalıcılık Tespiti

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Senaryo 4: Kerberos Anomali — Olağandışı Bilet Talebi

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm Detayı: Yanlış Pozitif Yönetimi


Meşru yazılımlar (antivirüs güncellemeleri, kurumsal araçlar) da Run anahtarlarını değiştirebilir. Gürültüyü azaltmak için:

Baseline oluşturun: Get-PSAutorun ile sistemin normal otomatik başlatma girdilerini belgeleyin.
Whitelist: C:\Program Files\ ve C:\Windows\ altından çalışan, imzalı uygulamaları kural dışı bırakın.
İstisna değil korelasyon: Tek başına şüpheli olmayan bir olayı diğer olaylarla ilişkilendirin.

---


Bölüm Detayı: Saldırgan Gizlenme Taktikleri


Null Karakterle Gizleme:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Regedit.exe ve reg.exe null karakter sonrasını gösteremez; bu anahtarlar standart araçlardan gizlenir. Sysmon veya gelişmiş EDR zorunludur.

Sahte Süreç/Dosya Adları:

C:\Windows\System32\svchost32.exe (meşru: svchost.exe).
C:\Windows\Temp\WindowsUpdate.exe.

LOLBins (Living off the Land Binaries):

Meşru Windows araçlarının kötü amaçlı kullanımı:
certutil.exe -decode → dosya indirme/çözme.
mshta.exe → uzak HTA script çalıştırma.
regsvr32.exe /s /n /u /i:http://... → COM object üzerinden payload.

---

---

Bölüm: Sıkılaştırma ve Savunma (Hardening)


Bu bölüm detayları ve etkileri incelemektedir.


Bölüm Detayı: Privileged Access Management (PAM)


PAM, kurumsal ağlarda yüksek ayrıcalıklı erişimleri yönetmek, izlemek ve denetlemek için kullanılan merkezi bir güvenlik çözümüdür.


[Görsel: Görsel açıklaması yok]


PAM'ın Sağladığı Korumalar:

Just-In-Time (JIT) Erişim: Yönetici hakları yalnızca gerektiğinde ve belirli süre için verilir; süre dolunca otomatik iptal edilir.
Oturum Kaydı: Tüm ayrıcalıklı oturumlar video ve log olarak kaydedilir.
Şifre Kasası: Yönetici şifreleri PAM tarafından otomatik yönetilir; kullanıcılar şifreyi görmez.
Çift Onay Mekanizması: Kritik sistemlere erişim için ikinci bir yöneticinin onayı gerekir.

PAM ve RDP İlişkisi: Bir PAM çözümü devredeyken RDP oturumları doğrudan değil, PAM proxy'si üzerinden açılır. Bu sayede kimlik bilgileri hedef sistemde hiç görünmez ve tüm oturum kayıt altına alınır.

---


Bölüm Detayı: Ağ Seviyesinde Kimlik Doğrulama (NLA)


NLA (Network Level Authentication), RDP oturumu kurulmadan önce kimlik doğrulaması yapılmasını zorunlu kılar. Bu, kimlik doğrulanmamış bağlantı isteklerinin sisteme ulaşmasını engeller.

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---


Bölüm Detayı: Çok Faktörlü Kimlik Doğrulama (MFA)


RDP, WinRM ve diğer uzaktan erişim yöntemleri için MFA zorunlu olmalıdır. Kimlik bilgileri ele geçirilse bile ikinci faktör olmadan giriş mümkün olmaz.

Azure AD / Microsoft Entra ID entegrasyonu.
RADIUS tabanlı MFA çözümleri.
Donanım anahtarları (FIDO2 / YubiKey).

---


Bölüm Detayı: Least Privilege (En Az Ayrıcalık) Prensibi


Her kullanıcı ve servis hesabı yalnızca görevini yapabilmek için gereken minimum yetkiyle çalışmalıdır.

Pratik Adımlar:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Local Administrator hesabını devre dışı bırakın veya şifreyi LAPS ile yönetin.
Service hesapları için yönetici yetkisi vermeyin.
Domain Admin hesaplarını yalnızca DC üzerinde kullanın.

---


Bölüm Detayı: Ağ Segmentasyonu ve Erişim Kontrolü


[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

RDP (3389): Yalnızca PAM proxy veya Jump Server üzerinden izin verin.
WinRM (5985/5986): Yönetim ağı segmentiyle sınırlayın.
SMB (445): İş istasyonları arası doğrudan SMB trafiğini engelleyin.
Mikro-segmentasyon: Host-based firewall kurallarıyla East-West trafiği kısıtlayın.

---


Bölüm Detayı: Audit Politikaları ve Merkezi Log Yönetimi


[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Tüm logları merkezi SIEM çözümüne iletIn (Splunk, Microsoft Sentinel, Elastic).
Log saklama süresi en az 90 gün (ideal 1 yıl) olmalı.
Sysmon yapılandırmasını SwiftOnSecurity veya Olaf Hartong şablonlarıyla dağıtın.

---


Bölüm Detayı: Proaktif Tehdit Avcılığı


Reaktif olmak yetmez. Blue Team düzenli aralıklarla şu kontrolleri yapmalıdır:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

---

---

Bir saldırganın sızma sonrası yolculuğu şu kronolojik zinciri izler:

[Kod Bloğu: Burada bir kod örneği yer almaktadır. Kod içeriği seslendirmede atlanmıştır.]

Bu yazıda her aşamayı hem saldırgan hem de savunmacı perspektifinden inceledik:

Persistence: Kullanıcı manipülasyonu, Scheduled Tasks, Registry Run Keys, BITS Jobs, WMI Event Subscriptions, COM Hijacking, IFEO ve DLL Hijacking.
Lateral Movement: RDP, WinRM/PowerShell Remoting, SMB/PsExec ve Kerberos istismarları (PtT, Overpass-the-Hash).
Tespit: Sysmon, Event ID korelasyonu, KQL pseudo-code senaryoları.
Sıkılaştırma: PAM, NLA, MFA, Least Privilege, ağ segmentasyonu.

> Güvenlik bir ürün değil, süreçtir. Tek bir araç veya kural sizi koruyamaz; katmanlı savunma (Defense in Depth), sürekli izleme ve proaktif tehdit avcılığı bir arada uygulandığında anlamlı koruma sağlanır.

Daha fazlası için:
MITRE ATT&CK — Persistence (TA0003).
MITRE ATT&CK — Lateral Movement (TA0008).

Verinizin mimarı olun, egemenliğinizi geri alın. Dinlediğiniz için teşekkürler!
