Başlık: Hackerlar İçin Golang: Modern Siber Güvenlik Mimarisi ve Ofansif Kodlama Rehberi


Sızma testi uzmanları, Red Team operatörleri ve zararlı yazılım geliştiricileri yıllarca otomasyon için Python'ı, bellek manipülasyonu ve yerel API çağrıları içinse C/C++'ı kullandı. Ancak EDR, XDR ve gelişmiş izleme mekanizmalarıyla donatılmış modern savunma hatları, bu geleneksel araçların hareket alanını ciddi şekilde kısıtladı. Google'ın dağıtık sistemler için geliştirdiği Go (Golang), sunduğu yapısal avantajlarla ofansif güvenlik dünyasının yeni standardı haline geldi.

Bu rehberde, Go dilinin güvenlik süreçlerindeki yapısal avantajlarını ele alacak ve pratik örneklerle ofansif kullanım senaryolarına değineceğiz.

🎯 Bu Rehber Kimler İçin?
Red Team / Pentester
Sızma Testi Uzmanları
Sistemlerde sıfır bağımlılıkla (standalone) çalışan, yüksek hızlı tarayıcılar ve özel araçlar geliştirmek isteyen güvenlik uzmanları.
Malware Dev
Zararlı Yazılım Geliştiricileri
Antivirüs ve EDR sistemlerini aşmak (evasion) amacıyla derleme parametrelerini kullanan, statik analizi zorlaştırmak ve CGO bağımlılığı olmadan yerel API çağrıları yapmak isteyen araştırmacılar.
Blue Team / SOC
Mavi Takım & Tehdit Avcıları
Go ile yazılmış araçların runtime (çalışma zamanı) davranışlarını ve bellek yapılarını analiz ederek daha etkili savunma kuralları (YARA, Sigma vb.) yazmak isteyen savunmacılar.


Bölüm: Ofansif Güvenlikte Python ve C++ Neden Yetersiz Kalıyor?


Ofansif bir aracın başarısı, hedef sistemde bıraktığı ayak izine ve çalışma esnekliğine bağlıdır. Python ve C++ gibi dillerin derleme ve çalışma mimarileri, modern operasyonlarda bazı temel engellere takılır:


Bölüm Detayı: Python'ın Karşılaştığı Zorluklar


Çalışma Zamanı Bağımlılığı (Runtime Dependency): Python script'ini hedef sistemde çalıştırmak için sistemde yorumlayıcı kurulu olmalıdır. PyInstaller gibi çözümlerle paketlenen .exe dosyaları ise arka planda Temp dizinine kütüphaneleri ve yorumlayıcıyı açar. Bu disk hareketi, modern EDR/AV çözümleri için doğrudan bir alarm sebebidir.
GIL (Global Interpreter Lock) Engeli: Python, yerleşik GIL mekanizması yüzünden CPU çekirdeklerini gerçek anlamda paralel kullanamaz. Bu da yüksek hızlı port tarama, subdomain keşfi veya kaba kuvvet saldırısı yazarken performans darboğazı demektir.


Bölüm Detayı: C/C++ ve Operasyonel Zorluklar


Manuel Bellek Yönetimi ve Stabilite: C/C++ ile çalışırken bellek yönetiminin (malloc/free) geliştiriciye bırakılması, kararsız bellek sızıntılarına veya çökme (Segmentation Fault) risklerine yol açar. Bir sızma testinde hedef sunucuyu çökertmek, bir operatörün yapabileceği en kötü hatalardan biridir.
Çapraz Derleme (Cross-Compilation) Çilesi: Linux üzerinde yazdığınız Windows API çağrıları içeren C++ kodunu derlemek, kütüphane ve derleyici bağımlılıkları yüzünden çoğunlukla kabusa dönüşür.


Bölüm Detayı: Go Hepsini Nasıl Çözüyor?


Go; Python'ın pratikliği ve hızlı geliştirme avantajını, C/C++'ın makine koduna derlenme gücüyle birleştirir. Statik tip güvenliği ve yerleşik bellek yönetimi (Garbage Collector) sayesinde siber güvenlik uzmanlarına çökme riski taşımayan, son derece kararlı araçlar geliştirme fırsatı verir.


Bölüm: Ofansif Güvenlikte Go Dilinin Mimari Avantajları


Go'yu siber güvenlikte vazgeçilmez kılan üç ana mimari özellik şunlardır:


Bölüm Detayı: A. Statik Derleme ve Çapraz Derleme Gücü


Go derleyicisi, kodunuzu ve bağımlı olduğunuz tüm paketleri tek bir bağımsız binary içine statik olarak gömer. Hedef makinede ne bir DLL dosyasına ne de bir yorumlayıcıya ihtiyaç kalır.

Üzerinde çalıştığınız işletim sisteminden bağımsız olarak, tek bir komutla farklı platformlar için çıktı alabilirsiniz:


Bölüm Detayı: B. Tersine Mühendislik (Reversing) Dinamikleri


Standart C/C++ binary'leri Ghidra veya IDA Pro gibi araçlarla açıldığında, kütüphane çağrıları ve fonksiyon isimleri doğrudan analiz edilebilir. Go'da ise bu süreç farklı zorluklar barındırır:
Büyük Binary Dosyası: Go ile yazılan en basit program bile kendi runtime motorunu (Garbage Collector, Scheduler vb.) barındırdığı için birkaç megabayt boyutundadır. Analist, binlerce runtime fonksiyonu arasından sizin yazdığınız asıl kodu bulmak için vakit kaybetmek zorundadır.
pclntab Yapısı ve Semboller: Go, hata anında çağrı geçmişini (stack trace) ekrana basabilmek için dosya içinde pclntab adında bir fonksiyon adı tablosu tutar. Eğer bu semboller derleme sırasında temizlenmezse (strip edilmezse), tersine mühendisler go-resym gibi araçlarla kodun tüm akışını ve fonksiyon isimlerini saniyeler içinde çözebilir. Ancak bu tabloyu -ldflags="-s -w" ile silmek ve garble gibi araçlarla karartmak, analistin işini C/C++'a göre çok daha fazla zorlaştırır; çünkü standart runtime fonksiyonları ile kendi kodunuz birbirine karışır.


Bölüm Detayı: C. Eşzamanlılık (Concurrency) Yetenekleri ve GMP Modeli


Go, işletim sisteminin yüksek maliyetli thread'leri yerine, 2 KB gibi son derece düşük bir başlangıç belleğiyle çalışan Goroutine'leri kullanır. Bu asenkron yapının arkasında ise GMP Modeli (M:N Scheduler) yer alır:
G (Goroutine): En küçük iş birimi. Kendi stack alanına ve durum verilerine sahiptir.
M (Machine): İşletim sisteminin fiziksel thread'ini (OS Thread) temsil eder.
P (Processor): Goroutine'leri çalıştırmak için gereken mantıksal işlem kaynağıdır. Varsayılan olarak CPU çekirdek sayısı kadardır.

OS thread geçişleri (context switch) yerine kullanıcı katmanında son derece hızlı geçişler yapılır. Binlerce goroutine, work-stealing (iş çalma) algoritmalarıyla işlemci çekirdeklerine dinamik olarak dağıtılır.

Aşağıdaki şema, Go'nun goroutine yapısının tek bir işletim sistemi iş parçacığı üzerinde binlerce görevi nasıl koordine ettiğini göstermektedir:


Bölüm Detayı: Uygulama: Yüksek Hızlı Eşzamanlı Port Tarayıcı


Go'nun sync.WaitGroup ve kanallarını (channels) kullanarak yüksek hızlı ve eşzamanlı bir port tarayıcıyı nasıl yazacağımızı inceleyelim:


Bölüm: Sektör Standardı Haline Gelmiş Go Tabanlı Güvenlik Araçları


Teorik üstünlüğün ötesinde, bugün siber güvenlik endüstrisinin en kritik araçları Go ile sıfırdan inşa edilmektedir.

C2 Framework
🛸 Bishop Fox - Sliver C2
Cobalt Strike'a güçlü ve açık kaynaklı bir alternatif. mTLS, WireGuard, HTTP(S) ve DNS tünelleme kullanarak eylemci (implant) yönetimini sağlar.

Paket Analiz / AD
📦 Mandiant - gopacket
Python'daki Impacket kütüphanesinin Go üzerindeki karşılığıdır. Ağ paketlerinin analiz edilmesi, SMB/RPC paket yönetimi ve Active Directory operasyonları için sıklıkla tercih edilir.

Exploit Framework
⚙️ VulnCheck - go-exploit
Exploit geliştirme süreçlerini standartlaştırmak, kararlı ve platformlar arası taşınabilir exploit kodları yazmak amacıyla oluşturulmuş bir altyapıdır.

Recon / Web
🔍 Gobuster / FFUF
Web dizinleri, gizli sayfalar ve subdomain keşifleri için kullanılan yüksek hızlı fuzzer ve kaba kuvvet (brute-force) araçları.


Bölüm: Savunma Atlatma (Evasion) ve Derleme Teknikleri


Bir Red Team operasyonunda üretilen binary boyutu ve AV/EDR çözümlerine takılmama durumu kritiktir. Go derleyicisi, dosya boyutunu düşürmek ve analizi zorlaştırmak için yerleşik parametreler sunar.


Bölüm Detayı: Derleme Parametreleri ve Optimizasyon


Varsayılan ayarlarla derlenen Go dosyaları, debug sembollerini ve DWARF tablolarını da içerir. Bu durum hem boyutu büyütür hem de statik analiz yapan güvenlik motorlarının (örneğin YARA kurallarının) dosyayı kolayca analiz etmesine imkan tanır.


Bölüm Detayı: Windows API ve Sistem Çağrıları (Syscalls)


CGO'yu kapatsak bile Go'nun yerleşik "syscall" ve "golang.org/x/sys/windows" paketleriyle Windows API'lerini tetikleyebiliriz. Çalışma zamanında DLL dosyalarını dinamik olarak yükleyip çağırmak, IAT'yi (Import Address Table) temiz tutarak imza tabanlı tespitleri atlatmanın ilk adımıdır:

Bir adım sonrası ise Direct Syscalls (Doğrudan Sistem Çağrıları) yöntemidir. Go, assembly (.s) dosyalarını doğrudan derleyebildiği için, EDR sistemlerinin kullanıcı katmanındaki API kancalarını (hooking) atlatmak üzere syscall numaralarını doğrudan assembly seviyesinde çağırıp kernel moduna geçiş yapabilir.


Bölüm Detayı: Garble ile Kod Obfuscation (Karartma)


Go derleyicisi paket ve fonksiyon isimlerini binary içerisinde açık bırakır. Güvenlik analistlerinin işini zorlaştırmak ve imza tabanlı tespitlerden kaçınmak için Garble kullanabiliriz. Garble derleme aşamasında şunları yapar:
Sembol Karıştırma: Fonksiyon, değişken ve paket isimlerini anlamsız hash'lere dönüştürür.
String Şifreleme: Kod içindeki tüm string'leri (IP, URL, anahtarlar) şifreli saklar ve bellek üzerinde çalışma zamanında çözer.
Runtime Temizliği: DWARF ve hata ayıklama verilerini tamamen kazır.


Bölüm Detayı: Temel Literatür ve Kitaplar


Temel Başvuru
📖 Black Hat Go
No Starch Press tarafından basılan, Go diliyle siber güvenlik araçları, exploitler ve ağ tarayıcıları yazmayı öğreten en popüler başvuru kitabıdır.

Ofansif Programlama
📖 Go Programming for Hackers
Ofansif araç geliştirme süreçlerine ve sızma testi betiklerine odaklanan, pratik örnekler içeren bir kılavuzdur.

Pratik El Kitabı
📖 Black Hat Go Manual (BHGM)
Teorik bilgileri pratik laboratuvar ortamlarıyla birleştiren, hızlı kod referansları ve ipuçları sunan el kitabıdır.


Bölüm Detayı: Video ve Canlı Laboratuvar Serileri


Video Seri (TR)
🔴 Mehmet İnce - Golang For Hackers
YouTube ve Twitch üzerinde yayınlanan, sıfırdan ileri seviyeye kadar Go ile gerçekçi araçların (örneğin LDAP enjektörleri) nasıl yazıldığını gösteren en kapsamlı Türkçe video serisi.
▶ Playlist'i İzle

Video Seri (EN)
🔵 IppSec - Golang for Hackers
Hack The Box çözümleriyle bilinen IppSec'in, Go dilini otomasyon süreçlerinde, tarayıcılarda ve sızma testlerinde nasıl kullandığını anlatan İngilizce eğitim serisi.
▶ Watch Playlist

Siber güvenlikte Go kullanımı geçici bir popülerlik değil, modern savunma sistemlerine karşı doğan net bir mühendislik ihtiyacıdır. Tek bir binary ile çalışabilen, yüksek hızda asenkron iş üreten ve kolayca çapraz derlenen bu dil, siber operasyonların vazgeçilmezidir. Sadece Red Team ekipleri için değil; tehdit avcılığı, tersine mühendislik veya SOC analizi yapan Blue Team uzmanları için de Go'nun çalışma mekanizmalarını bilmek kritik önem taşır. Saldırganın silahını anlamadan savunma hattı kuramazsınız.


Bölüm: 📺 Ofansif Go Geliştirme Eğitim Serisi


Go diliyle siber güvenlik araçları (port tarayıcılar, subdomain bulucular, ağ araçları vb.) geliştirmeyi anlatan Türkçe YouTube serisine aşağıdan göz atabilirsiniz:

Seriye doğrudan erişmek için Hackerlar İçin Golang Türkçe Oynatma Listesi bağlantısını kullanabilirsiniz.

Verinizin mimarı olun, egemenliğinizi geri alın. Dinlediğiniz için teşekkürler!
