---
title: "[TR] Hidden Tunnels (C&C) Wireshark ile Analizi"
date: 2024-07-19
draft: false
---

---

### [TR] Hidden Tunnels (C&C) Wireshark ile Analizi

Merhaba bu yazımda HTTP tünelleme tekniklerinden bahsedeceğim.

![](/images/1_cWRqt_otCGQkQf0iobOVnw.png)

Bilgisayar güvenliği alanında “Hidden Tunnels” terimi genellikle kötü amaçlar için kullanılan veri sızdırma, komuta ve kontrol (C&C) veya ağ tespitini atlama gibi çeşitli amaçlar için kullanılan gizli veya izinsiz ağ bağlantılarını ifade eder. Bu gizli tüneller, saldırganların faaliyetlerini gizlemelerine ve güvenlik önlemlerini aşmalarına yardımcı olur.

---

### HTTP/HTTPS Tünelleme

HTTP/HTTPS tünellemesi, ağ güvenlik önlemlerini atlatmak için kullanılan bir tekniktir. Bu yöntem, HTTP veya HTTPS paketlerinin içine HTTP olmayan trafiği kapsüllenerek gerçekleştirilir. HTTP/HTTPS tünellemesi, kısıtlayıcı web filtreleme politikalarının olduğu ortamlarda sıkışmış web sitelerine veya hizmetlere erişim sağlamak gibi meşru amaçlar için kullanılabilir, ancak aynı zamanda veri sızdırma veya kompromize edilmiş sistemlerin uzaktan kontrolü gibi kötü amaçlı aktiviteler için de kullanılabilir.

1. **Kapsülleme:** HTTP/HTTPS tünellemesinde, HTTP olmayan trafiği HTTP veya HTTPS paketleri içine kapsüllenir. Bu, başka bir uygulama veya protokolün verilerinin düzenli web trafiği gibi paketlenmesi anlamına gelir.
2. **Gönderim:** Kapsüllenmiş veri daha sonra HTTP veya HTTPS bağlantısı üzerinden uzak bir sunucuya veya hedefe gönderilir. Hedef sunucu gelen HTTP/HTTPS isteklerini ve yanıtları normal web istekleri gibi işler, bu nedenle ağ güvenlik cihazlarının trafiğin gerçek doğasını tanımlaması zorlaşır.
3. **Kapsüllemenin Açılması:** Alıcı tarafta, HTTP/HTTPS paketleri açılarak orijinal HTTP olmayan veriler çıkartılır. Bu veri daha sonra gerektiği gibi işlenir veya yürütülür.

Güvenlik perspektifinden bakıldığında, HTTP/HTTPS tünellemenin kullanımı, geleneksel güvenlik cihazlarının böyle gizli iletişim kanallarını tespit ve engelleme konusunda zorluklar yaşatabileceği anlamına gelir. Bu sorunla mücadele etmek için organizasyonlar genellikle trafiği daha derinlemesine inceleyebilen, anormallikleri ve şüpheli davranış belirtilerini arayan gelişmiş tehdit algılama ve önleme çözümleri kullanır. Ayrıca, güvenlik politikaları ve ağ izleme, HTTP/HTTPS tünelleme ile ilişkilendirilen riskleri tanımlamak ve azaltmak için önemlidir.

Siber suçlular, HTTP veya HTTPS protokollerini kullanarak web trafiği içinde gizli tüneller oluşturabilirler, böylece veri sızdırabilir veya enfekte sistemleri kontrol edebilirler.

HTTP/HTTPS tünelleme, bir ağ üzerinden HTTP (Hypertext Transfer Protocol) veya HTTPS (HTTP Secure) trafiğini başka bir sunucuya yönlendirmek veya tünellemek amacıyla kullanılan bir tekniktir. Bu tür bir tünelleme, özellikle ağ güvenliği açısından önemli bir sorun teşkil edebilir.

#### HTTP/HTTPS Tünelleme nasıl yapılır?

HTTP/HTTPS tünelleme, normalde web trafiği olarak kabul edilen HTTP veya HTTPS isteklerini veya yanıtlarını başka bir sunucuya iletmek veya yönlendirmek için kullanılır. Bunun için birkaç farklı yöntem kullanabilirler:

1. **HTTP Proxy Sunucuları**: Kullanıcılar veya zararlı yazılım, bir HTTP proxy sunucusu aracılığıyla internete erişim sağlar. Bu proxy sunucusu, kullanıcıların isteklerini alır, hedef sunucuya iletir ve yanıtları geri kullanıcıya ileterek tünelleme yapar.
2. **VPN (Virtual Private Network)**: VPN’ler, kullanıcıların internet üzerinde gizlilik ve güvenlik sağlamak için kullandığı bir tür tünelleme teknolojisidir. VPN istemcisi ve sunucusu arasında şifreli bir tünel oluşturarak HTTP veya HTTPS trafiği tünel içinden geçebilir.
3. **SSH (Secure Shell):** SSH ağdaki iki cihaz arasında güvenli bir iletişim kanalı oluşturmak için kullanılan bir yöntemdir. Bu, bilgisayarlar arasında veri iletimini şifrelemek ve güvenliğini sağlamak için kullanılır. SSH tunnel, özellikle internet üzerinden güvenli bir şekilde veri iletimi gerektiğinde yaygın olarak kullanılır.

#### HTTP/HTTPS Tünelleme Analizi

HTTP/HTTPS tünelleme, ağ güvenliği açısından dikkatle izlenmesi gereken bir konudur. Güvenlik duvarları, IDS/IPS (Intrusion Detection System/Intrusion Prevention System) sistemleri ve diğer güvenlik önlemleri, bu tür tünelleme trafiğini izlemek ve tespit etmek için kullanılabilir. Ayrıca, kullanıcı eğitimi ve güvenlik politikaları, HTTP/HTTPS tünelleme ile ilgili riskleri azaltmaya yardımcı olabilir.

---

### **DNS Tünelleme**

DNS tünelleme, veri aktarımı için tasarlanmamış bir protokol olan DNS protokolü üzerinden veri göndermek için kullanılan bir yöntemdir. Bu, DNS paketleri içinde başka veri türlerini taşıma veya başka bir sunucu ile iletişim kurma amacıyla gerçekleştirilir. DNS tünelleme, özellikle ağ güvenliği açısından önemli bir sorun teşkil edebilir. Bunun bir nedeni, DNS paktlerinin firewall gibi güvenlik ürünlerine takılmadan geçebilmesidir.

#### DNS Tünelleme nasıl yapılır?

DNS tünelleme işlemi, DNS sorgularının ve cevaplarının normal DNS trafiği içinde gizlenmesiyle gerçekleştirilir.

1. Saldırgan *kötüsite.com* gibi bir alan adı kaydeder. Alan adının sunucusu, tünelleme programının yüklü olduğu saldırganın sunucusuna işaret eder.
2. Saldırgan, genellikle bir şirketin güvenlik duvarının arkasında bulunan bir bilgisayara zararlı yazılım bulaştırır. DNS isteklerinin güvenlik duvarına girip çıkmasına her zaman izin verildiğinden, virüs bulaşmış bilgisayarın DNS çözümleyicisine bir sorgu göndermesine izin verilir.
3. DNS çözümleyici, IP adresi isteklerini kök ve üst düzey etki alanı sunucularına ileten bir sunucudur. Bu sorguyu tünelleme programının yüklü olduğu saldırganın komuta ve kontrol sunucusuna yönlendirir.
4. Artık kurban ile saldırgan arasında DNS çözümleyicisi üzerinden bir bağlantı kurulmuştur. Bu tünel veri sızdırmak ya da diğer kötü niyetli amaçlar için kullanılabilir. Saldırgan ve kurban arasında doğrudan bir bağlantı olmadığından, saldırganın bilgisayarının izini sürmek daha zordur.

![](/images/1_gpckGRQF8yG7icj509DazA.png)

DNS Tünelleme

#### DNS Tünelleme Analizi

wireshark

DNS tünelleme, ağ güvenliği açısından ciddi bir tehdit oluşturabilir, bu nedenle güvenlik duvarları, IDS/IPS sistemleri ve DNS denetimleri, bu tür saldırılara karşı korunma amacıyla kullanılmalıdır. Ayrıca, iyi bir güvenlik politikası ve DNS trafiği izleme ve analiz etme yetenekleri bu tür tehditleri tespit etmeye yardımcı olabilir.

---

### **ICMP** Tünelleme

ICMP tünelleme veya ICMP gizli kanallar, ICMP (Internet Control Message Protocol — İnternet Kontrol İleti Protokolü) paketleri içinde gizli iletişim kanalları oluşturmak için kullanılan bir yöntemdir. ICMP genellikle ağ sorun giderme ve hata raporlama için kullanılır, ancak saldırganlar bu protokolü veri iletimi için gizlice kullanabilirler. Bu teknik, ağ güvenlik kontrollerini atlatmak için ICMP paketleri içinde ICMP olmayan trafiği kapsüllenmesini içerdiği için “ICMP tünelleme” olarak da bilinir.

ICMP tünelleme nasıl çalışır:

1. **Kapsülleme:** ICMP tünelleme, ICMP “ping” istekleri gibi genellikle ağ teşhis amaçları için kullanılan ICMP “echo request” ve “echo reply” paketleri içinde ICMP olmayan veri veya trafik kapsüllenmesini içerir.
2. **İletim:** Kapsüllenmiş veri daha sonra gönderici ve alıcı arasında ICMP trafiği olarak iletilir. Gönderici ve alıcı genellikle bir saldırganın kontrolü altındaki kompromize edilmiş sistemler veya cihazlardır.
3. **Kapsüllemenin Açılması:** Alıcı tarafta, ICMP paketleri açılarak orijinal ICMP olmayan veri çıkarılır, bu veri daha sonra işlenir veya gerektiği gibi kullanılır.

ICMP tünelleme, kötü amaçlı amaçlar için kullanılabileceği gibi, belirli senaryolarda ağ teşhisinde kullanıldığında meşru uygulamalara da sahip olabilir.

Güvenlik perspektifinden bakıldığında, ICMP tünelleme tespit ve önleme konusunda zorluklar yaşatabilir. Ağ güvenliği çözümleri, anormal veya yetkilendirilmemiş ICMP trafiği desenlerini tanımlamak için gelişmiş anormallik tespiti tekniklerini kullanmalıdır. Ayrıca, organizasyonlar ICMP trafiğinin kullanımını sınırlamak ve gizli kanalın kötüye kullanılma riskini azaltmak için ağ segmentasyonu ve erişim kontrolü uygulamalıdır.

ICMP (Internet Control Message Protocol) tünelleme, siber saldırganların ağ güvenlik önlemlerini atlayarak veri iletimi ve tarama yapmalarına olanak tanıyan bir tekniktir. ICMP, ağ cihazları arasında hata mesajlarını ve diğer kontrol mesajlarını iletmek için kullanılan bir protokoldür. ICMP tünelleme, bu kontrol mesajları üzerinden veri tünelleme amacıyla kullanılır.

#### ICMP tünelleme nasıl yapılır?

ICMP tünelleme, aşağıdaki temel adımları içerebilir:

1. **Tünel Başlatma**: İlk olarak, siber saldırganlar genellikle bir hedef sunucuya veya ağa erişim sağlamak için ICMP tünelini başlatır. Bu, genellikle bir kötü amaçlı yazılım veya saldırı aracı kullanılarak yapılır.
2. **Veri Gönderme**: Saldırganlar, ICMP paketleri içinde verileri gizlerler. Bu veriler, hedef sunucuya veya ağa iletilmesi gereken bilgileri içerebilir.
3. **ICMP Paketleri Gönderme**: Veriler, ICMP paketleri içinde gizlendikten sonra, bu paketler hedef sunucuya veya ağa gönderilir. Bu paketler normal ICMP trafiği gibi görünebilir.
4. **Alıcı Taraf**: Hedef sunucu veya ağ üzerindeki bir alıcı taraf, gelen ICMP paketlerini yakalar ve içlerinden gizlenmiş verileri çıkarır.

Siber saldırılar ve ICMP tünelleme:

Siber saldırganlar, ICMP tünelleme yöntemini kötü amaçlı amaçlar için kullanabilirler. İşte bazı örnekler:

1. \*\*Veri Sızdırma\*\*: Saldırganlar, hedef sunucuya veya ağa sızdırmaları gereken verileri ICMP tünelleme kullanarak gizleyebilirler. Bu, hassas bilgilerin çalınmasını kolaylaştırabilir.

2. \*\*Engelleme ve Filtreleme Atlatma\*\*: Bazı ağ güvenlik duvarları veya filtreler, ICMP trafiğini engellemek veya sınırlamak için kullanılabilir. ICMP tünelleme, bu tür engellemeleri atlamak için kullanılabilir.

3. Tarama ve Keşif: Saldırganlar, hedef ağdaki güvenlik açıklarını tespit etmek ve hedefleri taramak için ICMP tünelleme kullanabilirler.

ICMP tünelleme, ağ güvenliği açısından ciddi bir tehdit oluşturabilir çünkü bu tür trafiği izlemek ve engellemek zor olabilir. Bu nedenle, ağ güvenlik duvarları ve IDS/IPS (Intrusion Detection System/Intrusion Prevention System) sistemleri, ICMP tünelleme trafiğini tespit etmek ve engellemek için iyi yapılandırılmalıdır. Ayrıca, düzenli güvenlik denetimleri ve güvenlik politikaları da bu tür tehditlere karşı önlem alınmasına yardımcı olabilir.

---

### Kaynaklar