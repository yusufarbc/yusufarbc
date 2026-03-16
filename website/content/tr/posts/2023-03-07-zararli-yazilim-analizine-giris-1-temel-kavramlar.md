---
title: "Zararlı Yazılım Analizine Giriş: #1 Temel Kavramlar"
date: 2023-03-07
description: "Bu yazı serimizde zararlı yazılım analizi hakkında bilgiler vereceğim; virüsler, solucanlar vb. terimleri duymuşsunuzdur. Ama bu şeyler ne anlama geliyor? Virüs solucan mıdır? Kötü amaçlı yazılım tam ..."
featuredImage: "https://cdn-images-1.medium.com/max/800/1*wRwVFbFX3SX1zyV-mTRt_w.png"
series: ["Zararlı Yazılım Analizine Giriş"]
---

![](https://cdn-images-1.medium.com/max/800/1*wRwVFbFX3SX1zyV-mTRt_w.png)

Bu yazı serimizde zararlı yazılım analizi hakkında bilgiler vereceğim; virüsler, solucanlar vb. terimleri duymuşsunuzdur. Ama bu şeyler ne anlama geliyor? Virüs solucan mıdır? Kötü amaçlı yazılım tam olarak ne yapar? Hadi bunları öğrenelim…

---

### Zararlı Yazılım (Malware)

Zararlı yazılım, zararlı(malicious) ve yazılım(software) kelimelerinin birleşiminden gelir. Hackerlar tarafından sistemlere bulaşmak ve zarar verecek eylemleri gerçekleştirmek için kullanılan bir yazılım parçasıdır.   
Bu tür yazılımlar, veri kaybına veya süreçlerinin kesintiye uğramasına yol açabilir.

Zararlı yazılımın iki ana bileşeni vardır:

* **Yayılma mekanizması:** Bir zararlı yazılımın kendisini bir veya daha fazla sisteme nasıl yaydığıdır.
* **Payload:** Bir zararlı yazılımın virüs bulaşmış bir cihazda veya sistemde gerçekleştirdiği eylemdir.

Zararlı yazılımları, yayılış biçimine ve işlevine göre sınıflandırabiliriz. Ancak, bir zararlı yazılım bu türlerin pek çoğunun karışımından da oluşabilir. Bu nedenle sınıflandırmayı kesiınleştirmek zor olabilir.

#### Zararlı Yazılım Belirtileri

Bir sisteme bulaşmış olan kötü amaçlı yazılımın türü ne olursa olsun, dikkat edilmesi gereken bazı yaygın belirtiler vardır. Bunlar:

* Merkezi işlem birimi (CPU) kullanımında artış, buna bağlı olarak bilgisayarınızın yavaşlaması
* Bilgisayarınızın sık sık donması veya çökmesi
* Web tarama hızınızda azalma
* Ağ bağlantılarınızla ilgili açıklanamayan sorunlar
* Değiştirilmiş veya silinmiş dosyalar
* Bilinmeyen dosyaların, programların veya masaüstü simgelerinin varlığı
* Çalışan bilinmeyen işlemler (process)
* Kendini kapatan veya yeniden yapılandıran programlar
* Bilginiz veya onayınız olmadan gönderilen e-postalar.

---

### Yayılma Mekanizmaları

Zararlı yazılımları yayılış biçimine yani propaganda mekanizmasına göre sınıflandırırsak genel olarak 3 türe ayırabiliriz.

#### Virüs

Virüsler, bir sisteme girmek için bazı giriş yollarına ve özellikle bir kullanıcı eylemine bağlıdır. Örneğin, bir kullanıcı virüs içeren ve sistemi kirleten bir dosya indirebilir veya bir USB cihazını takabilir. Spam mailleriyle veya güvensiz web sitelerinden indirilen dosyalarla virüsler sisteme bulaşabilir.

![](https://cdn-images-1.medium.com/max/800/0*7ixQhZJscn87lzCg)

Bilgisayar Virüsü

#### Worm (Solucan)

Bir virüsün aksine, bir worm kendisini sistemlere yaymak için herhangi bir kullanıcı eylemine ihtiyaç duymaz. Bunun yerine yararlanabileceği savunmasız sistemleri bularak hasara neden olur. Worm içeri girdikten sonra ağdaki diğer bağlı sistemlere yayılabilir.

![](https://cdn-images-1.medium.com/max/800/0*xEK2G3FlicDMuzXZ)

Bilgisayar Solucanı

#### Trojan (Truva Atı)

Trojan, gerçek bir yazılım parçası gibi davranan bir zararlı yazılım türüdür. Bir kullanıcı programı yüklediğinde, beklendiği gibi çalışır. Ancak program arka planda zararlı işlevler gerçekleştirir.

![](https://cdn-images-1.medium.com/max/800/0*KmP_iO_srKQD2TDY)

Bilgisayar Truva Atı

---

### Payloadlar

Zararlı yazılımlar sistemlere bulaştığında pek çok zararlı işlev gerçekleştirebilir. Bunlardan kabaca bazıları şulardır:

#### Ransomware

Bulaştığı sistemleri veya verileri kilitleyen bir programdır. Saldırgan daha sonra dosyaların kilidini çözme karşılığında fidye talep eder. Fidye belirlenen son tarihe kadar ödenmezse, tüm dosyalar silinebilir.

![](https://cdn-images-1.medium.com/max/800/0*zNpqSE4ZoUgG7GgR)

Fidye Yazılımı

#### Spyware

Bir cihaz veya sistem üzerinde casusluk yapan bir program türüdür. Bu tür yazılımlar, kullanıcının bilgisi olmadan bir cihaza klavye tarama yazılımı yükleyebilir, parola ayrıntılarını toplayabilir ve bunları saldırgana iletebilir.

![](https://cdn-images-1.medium.com/max/800/0*0CkR5kE0mHesfqKX)

Casus Yazılım

#### Backdoor

Bir siber suçlunun mevcut güvenlik önlemlerini atlamak için bir sistem veya cihazdaki bir güvenlik açığından yararlanmasını sağlayan yani saldırganın hedef sisteme erişimini sağlayan bir yazılımdır.

![](https://cdn-images-1.medium.com/max/800/0*2JMZbmGS09GLFE8C)

Arka Kapı

#### Botnet

Bir bilgisayarı, sunucuyu veya başka bir cihazı, bazı illegal faaliyetleri gerçekleştirmek için uzaktan kontrol edebilen ve benzer şekilde enfekte edilmiş cihazlardan oluşan bir ağa bağlayan bir yazılımdır. Bu sistemde enfekte olan cihazlara zombi, enfekte olmuş cihazların tamamından oluşan ağa ise botnet denir.

![](https://cdn-images-1.medium.com/max/800/0*YT69TLgbjiGn9kKr)

Botnet Ağı

---

### Zararlı Yazılım Analizi

Zararlı yazılım analizi, bir zararlı yazılımın nasıl çalıştığını, nasıl tanımlanacağını ve nasıl önleneceğini veya ortadan kaldırılacağını anlamak için yapılan analizler bütünüdür.

Zararlı yazılım analizine yönelik iki temel yaklaşım vardır:

* **Statik analiz:** zararlı yazılımı çalıştırmadan incelemeyi içerir.
* **Dinamik analiz:** zararlı yazılımın çalıştırılmasını içerir.

Bu analizler için geliştirilmiş pek çok araç ve dağıtım vardır. Bunlara sonraki yazılarımızda daha detaylı değineceğiz.

![](https://cdn-images-1.medium.com/max/800/0*z14dwVUCN5W82O2t)

#### Zararlı Yazılım Analizinin Genel Kuralları

Öncelikle ayrıntılara fazla takılmayın. Çoğu zararlı yazılım programı büyük ve karmaşıktır ve muhtemelen her ayrıntıyı anlayamazsınız. Bunun yerine temel özelliklere odaklanın.

İkinci olarak, farklı işler için farklı araçlar ve yaklaşımlar olduğunu unutmayın. Tek bir yaklaşım yok. Her durum farklıdır ve öğreneceğiniz çeşitli araçlar ve teknikler benzer ve bazen örtüşen işlevlere sahip olacaktır. Bir araçta şansınız yoksa, başka birini deneyin. Sıkışırsanız, herhangi bir konuda fazla zaman harcamayın. Kötü amaçlı yazılımı farklı bir açıdan analiz etmeyi deneyin veya farklı bir yaklaşım deneyin.

Son olarak, zararlı yazılım analizinin bir kedi-fare oyunu gibi olduğunu unutmayın. Yeni zararlı yazılım analizi teknikleri geliştirildikçe, zararlı yazılım geliştiricileri, analizi engellemek için yeni tekniklerle yanıt verir. Bir zararlı yazılım analisti olarak başarılı olmak için, bu teknikleri tanımanız, anlamanız ve yenmeniz gerekir.

---

### Zararlı Yazılımların Tespiti

Bir yazılımın zararlı olduğunu doğrulamak için birçok yöntem vardır. Bunlardan bazıları:

* Antivirüs araçlarını kullanma
* Yazılımın hash değerlerini kullanma
* Yazılımın stringlerini, fonksiyonlarını ve headerlarını inceleme

Her teknik farklı bilgiler sağlayabilir ve kullandığınız teknikler hedeflerinize bağlıdır.

#### Antivirüs Taraması

Muhtemel zararlı yazılımları ilk kez analiz ederken, onu zaten tanımlamış olabilecek bir antivirüs programı aracılığıyla çalıştırmak iyi bir ilk adımdır. Ancak antivirüs yazılımları kesinlikle mükemmel değildir.

![](https://cdn-images-1.medium.com/max/800/0*4e5QkMwSOlklDzTk)

Antivirüsler, şüpheli dosyaları belirlemek için bilinen zararlı kodların imzalarından oluşan bir veritabanına ve ayrıca davranışsal ve model eşleştirme analizine (buluşsal yöntemler) güvenirler. Buradaki sorun, zararlı yazılım geliştiricilerin kodlarını kolayca değiştirebilmeleri, böylece programlarının imzasını değişmesi ile virüs tarayıcılarından kaçabilmeleridir. Ayrıca, nadir görülen zararlı yazılımlar, veritabanında bulunmadığından genellikle antivirüsler tarafından algılanmaz. Son olarak danvranışsal yöntemler, genellikle bilinmeyen kötü amaçlı kodları tanımlamada başarılı olsa da, yeni ve benzersiz zararlı yazılımlar tarafından atlatılabilir.

#### Hash Değerleri

Hashing, zararlı yazılımları benzersiz bir şekilde tanımlamak için kullanılan yaygın bir yöntemdir. Zararlı yazılımı tanımlayan benzersiz bir karma (bir tür parmak izi) üreten bir karma program aracılığıyla benzersiz bir hash değeri elde edilir.

![](https://cdn-images-1.medium.com/max/800/0*j6kcHkQ7HOsZeTdY)

Message-Digest Algorithm 5 (MD5) hash fonksiyonu, kötü amaçlı yazılım analizi için en sık kullanılan algoritmadır, ancak Secure Hash Algorithm 1 (SHA-1) de popülerdir.

#### VirusTotal

[VirusTotal](http://www.virustotal.com), birçok zararlı yazılımdan koruma ürününü bir araya getiren çevrimiçi bir web platformudur. Buraya bir zaralı yazılım örneğini yükleyebilirsiniz. Burayayüklenen örnek birçok antivirüsürünü tarafından taranır ve size bir sonuç raporu döndürür. Bu raporda, örneğin hangi yazılımlar tarafından ne şekilde değerlendirildiği ve tür kategori aile olarak snıflandırmasını görebilirsiniz.

![](https://cdn-images-1.medium.com/max/800/0*8PmXisy7U6o1cF5d)

---

Zararlı Yazılım Analizi serimizin bu ilk yazısında temel kavramlardan bahsettim. Birdahaki yazımda analiz yöntemlerine ve kullanılacak araçlara daha detaylı değiniyor olacağım. Beğendiyseniz yorum yapmayı ve takip etmeyi unutmayın!