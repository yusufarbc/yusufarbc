---
date: '2025-09-21'
description: Günümüz dijital dünyasında siber tehditlerin sayısı ve karmaşıklığı hızla artmaktadır. Bu tehditlere karşı etkili bir savunma stratejisi geliştirmek her geçen gün daha da zorlaşmaktadır. Bu bağlamda, SIEM Sistemleri ve Tehdit Avcılığı faaliyetleri, bir kuruluşun siber güvenlik olgunluğunu artırmada kritik bir rol oynamaktadır.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/0*MV50j2d8HexWcGdC.png
layout: single
title: SIEM ile Tehdit Avcılığı Çözümü - LetsDefend
series: ["threat-hunting-writeups"]
type: writeups
---


[Letsdefend Blue Team Eğitim Platformu](https://letsdefend.io/)

## Giriş

Günümüz dijital dünyasında siber tehditlerin sayısı ve karmaşıklığı hızla artmaktadır. Bu tehditlere karşı etkili bir savunma stratejisi geliştirmek her geçen gün daha da zorlaşmaktadır. Bu bağlamda, SIEM Sistemleri ve Tehdit Avcılığı faaliyetleri, bir kuruluşun siber güvenlik olgunluğunu artırmada kritik bir rol oynamaktadır.

SIEM (Güvenlik Bilgisi ve Olay Yönetimi) sistemleri; çeşitli kaynaklardan log verisi toplayan, bu verileri analiz eden ve korelasyon kurallarını kullanarak anlamlı içgörüler üreten güvenlik teknolojileridir. SIEM sistemleri gerçek zamanlı izleme, olay tespiti, uyarı verme ve raporlama gibi yeteneklerle donatılmıştır. Bu özellikler güvenlik ekiplerinin ağ içinde meydana gelen anomalileri ve şüpheli aktiviteleri tespit etmesini sağlar.

Öte yandan Tehdit Avcılığı, siber tehditleri tespit etmeyi ve ortadan kaldırmayı amaçlayan proaktif bir araştırma sürecidir. Tehdit Avcılığı, SIEM tarafından oluşturulan uyarılara yanıt vermenin ötesine geçer; aynı zamanda bilinmeyen veya gizli tehditleri ortaya çıkarmayı amaçlar. Bu süreç güvenlik analistlerinin belirli hipotezler geliştirmesini ve ağ içindeki potansiyel tehditleri aramasını içerir.

SIEM ve Tehdit Avcılığı arasındaki ilişki bu iki yaklaşımın birbirini tamamlayıcı doğasından kaynaklanmaktadır. SIEM geniş bir veri yelpazesi sunarak tehdit avcılarının ihtiyaç duyduğu kritik bilgileri sağlar. Tehdit avcıları da potansiyel tehditleri tanımlamak ve doğrulamak için SIEM tarafından sağlanan veriler üzerinde derinlemesine analizler gerçekleştirir. Bu sinerji organizasyonun güvenlik duruşunu güçlendirerek siber saldırılara karşı daha hazırlıklı olmasını sağlar.

Bu derste kurs içeriğine bir giriş yapılmıştır. Bir sonraki derste "**Tehdit Avcılığında SIEM'in Rolü**" tartışılacaktır.

## Sorular

Cevap Gerekmiyor

## Tehdit Avcılığında SIEM'in Rolü

SIEM (Security Information and Event Management) sistemleri, siber güvenlik tehditlerini tespit etmede ve önlemede kritik bir rol oynar. Tehdit avcılığı süreçlerinde, SIEM'in kapsamlı veri toplama, analiz ve korelasyon yetenekleri potansiyel tehditlerin hızlı ve etkili bir şekilde tespit edilmesini sağlar.

## Veri Toplama ve Birleştirme

SIEM sistemleri ağ cihazları, sunucular, uygulamalar, uç noktalar ve güvenlik cihazları dahil olmak üzere birden fazla kaynaktan veri toplar, birleştirir ve depolar. SIEM bu verileri analiz ederek anomalilerin ve potansiyel tehditlerin belirlenmesine yardımcı olur.

* **Çeşitli Kaynaklardan Log Toplama:** Güvenlik duvarları, IDS/IPS, antivirüs sistemleri, DLP (Veri Kaybı Önleme) araçları ve diğer güvenlik cihazlarından loglar toplanır.
* **Veri Zenginleştirme:** Toplanan veriler; IP adresi coğrafi konumu ve tehdit istihbaratı gibi bağlamsal bilgilerle zenginleştirilir.
* **Merkezi Depolama:** Tüm loglar merkezi bir konumda saklanarak ihtiyaç duyulduğunda hızlı erişim sağlanır.

![](https://cdn-images-1.medium.com/max/800/0*Mu7xAmpFVC6THHcG.png)

( **Görsel Kaynağı** : <https://www.elastic.co/campaigns/elastic-guide-to-threat-hunting> )

## Gerçek Zamanlı Analiz ve Korelasyon

SIEM toplanan verileri gerçek zamanlı olarak analiz eder ve korelasyon kurallarını kullanarak anlamlı içgörüler üretir. Böylece farklı kaynaklardan gelen veriler arasında ilişkiler kurulmasına olanak tanıyarak potansiyel tehditlerin daha hızlı tespit edilmesini sağlar.

* **Anomali Tespiti:** Kullanıcı ve sistem faaliyetlerindeki anormal davranışları tanımlar.
* **Korelasyon Kuralları:** Anlamlı olaylar oluşturmak için farklı loglar arasında ilişkiler kurar.
* **Anlık Uyarılar:** Tespit edilen anomaliler için anında uyarılar ve bildirimler oluşturur.

## Olay Tespiti ve Müdahale

SIEM, tespit edilen olayları güvenlik ekibine bildirir ve hızlı müdahale için gerekli bilgileri sağlar. Bu durum tehditlerin hızla kontrol altına alınmasını sağlar ve hasarı en aza indirir.

* **Olay Yönetimi:** Tespit edilen olayların hızlı ve etkili bir şekilde yönetilmesini sağlar.
* **Uyarı Önceliklendirme:** Gelen uyarıları önem derecelerine göre önceliklendirir.
* **Müdahale ve İyileştirme:** Tespit edilen tehditlere karşı hızlı müdahale ve düzeltici eylemleri kolaylaştırır.

## Raporlama ve Görselleştirme

SIEM sistemleri tehdit avcılığı süreçlerinden elde edilen verileri ve bulguları anlamlı raporlar ve görselleştirmeler şeklinde sunarak güvenlik ekiplerinin ve yönetimin tehdit ortamını daha iyi anlamasına yardımcı olur.

* **Ayrıntılı Raporlama:** Tehdit avcılığı bulgularının ayrıntılı raporlarını sunarak üst yönetim ve paydaşlarla bilgi paylaşımını kolaylaştırır.
* **Dinamik Dashboardlar:** Gerçek zamanlı tehdit görselleştirmesi ve gelişmiş izleme süreçleri için canlı ve etkileşimli panolar sunar.
* **Uyum Raporları:** Kuruluşların yasal gereklilikleri karşılamasını sağlamak için mevzuata uygunluk raporları oluşturur.

## Otomasyon ve Orkestrasyon

SIEM sistemleri tehdit avcılığı süreçlerini otomatikleştirerek ve diğer güvenlik araçlarıyla entegre ederek güvenlik operasyonlarını iyileştirir, manuel müdahale ihtiyacını azaltır ve tehditlere daha hızlı yanıt verilmesini sağlar.

* **Otomatik Tehdit Tespiti:** Tekrarlayan görevleri ve tehdit tespit süreçlerini otomatikleştirir.
* **SOAR Entegrasyonu:** SIEM, olay müdahale süreçlerini hızlandırmak için SOAR (Güvenlik Orkestrasyonu, Otomasyonu ve Müdahalesi) araçlarıyla entegre olur.
* **Artan Verimlilik:** Otomasyon ve orkestrasyon, güvenlik ekiplerinin verimliliğini artırarak tehditlere karşı daha etkili savunma yapılmasını sağlar.

## Özet

SIEM sistemleri siber güvenlik tehditlerini tespit etmek ve önlemek için vazgeçilmezdir. Birden fazla kaynaktan gelen verileri toplayarak, analiz ederek ve ilişkilendirerek anomalilerin ve potansiyel tehditlerin hızla belirlenmesini sağlayarak tehdit avcılığında üstünlük sağlarlar. Temel özellikler arasında gerçek zamanlı analiz, olay önceliklendirme ve otomatik yanıtlar yer alır ve bunlar güvenlik ekibinin verimliliğini artırır. SIEM ayrıca daha iyi tehdit görselleştirmesi ve uyumluluk için ayrıntılı raporlama ve dinamik panolar sağlar. Süreçleri otomatikleştirerek ve SOAR gibi araçlarla entegre olarak SIEM, manuel çabayı azaltır ve tehdit müdahalesini hızlandırarak kuruluşları siber tehditlere karşı daha dirençli hale getirir.

Bu derste SIEM'in tehdit avcılığı süreçlerindeki önemi açıklanmıştır. Bir sonraki derste "**Hipotez Oluşturma ve Test Etme**" konusuna odaklanılacaktır.

## Sorular

Cevap Gerekmiyor

## Hipotez Oluşturma ve Test Etme

Çözüm üretmek tehdit avcılığı sürecinde kritik bir adımdır. Siber güvenlik analistleri mevcut verilere ve tehdit istihbaratına dayanarak potansiyel tehditlerin nasıl ortaya çıkabileceğini belirler ve buna göre gelişim gösterirler. Bu bulgular belirli saldırgan davranışlarının veya anormal faaliyetlerin tespit edilmesine rehberlik eder.

![](https://cdn-images-1.medium.com/max/800/0*id6b7Z8ltJlqKSlt.png)

## Hipotez Oluşturma

### Veri Analizi ve Ön İnceleme

Tehdit avcılığı sürecindeki ilk adım toplanan verilerin hızlı ve etkili bir şekilde incelenmesidir. Bu aşamada SIEM sistemi tarafından toplanan loglar, ağ trafiği ve uç nokta verileri gözden geçirilmelidir. Bu ön inceleme potansiyel tehditleri ve anomalileri belirlemek için temel taşıdır.

Veri incelemesi sırasında aşağıdaki anormal davranışları ve olağandışı faaliyetleri aramanız gerekir:

* **Olağandışı Erişim Girişimleri:** Kullanıcıların normalde erişmedikleri sistemlere veya verilere erişme girişimleri.
* **Şüpheli Oturum Açma Girişimleri:** Bir kullanıcı tarafından yapılan birden fazla başarısız oturum açma girişimi veya olağandışı zamanlarda yapılan oturum açmalar.
* **Beklenmedik Veri Transferleri:** Ağdaki olağandışı veri akışları, özellikle büyük dosya transferleri veya yüksek bant genişliği kullanımı.
* **Olağandışı Sistem Kaynağı Kullanımı:** CPU, bellek veya disk kullanımı gibi kaynak kullanımında ani ve beklenmedik artışlar.

Geçmiş olay kayıtları ve tehdit istihbaratı verileri yeni tehditleri tespit etmek için önemli ipuçları sağlar. Güvenlik analistleri, benzer tehditlerin yeniden ortaya çıkma olasılığını değerlendirmek için geçmiş güvenlik olaylarını gözden geçirirler. Ayrıca mevcut tehdit ortamı hakkında fikir edinmek için güncel tehdit istihbaratı kaynaklarından (örneğin ISAC'ler, ticari tehdit beslemeleri) yararlanılabilir.

### Tehdit Modelleri ve TTP'ler

Tehdit avcılığı sürecinde saldırganlar tarafından yaygın olarak kullanılan teknikleri ve yöntemleri anlamak; güvenlik analistlerinin potansiyel tehditleri daha etkili bir şekilde tespit etmesine yardımcı olduğu için kritiktir. Yaygın teknikler arasında oltalama (phishing), kötü amaçlı yazılım dağıtımı, kaba kuvvet (brute force) saldırıları ve veri sızdırma yer alır.

MITRE ATT&CK Çerçevesi saldırganlar tarafından kullanılan teknik ve prosedürleri sistematik olarak sınıflandırarak güvenlik analistlerine aşağıdaki alanlarda rehberlik eder:

* **Taktikler:** Temel olarak saldırganların neyi başarmaya çalıştığı (örneğin başlangıç erişimi elde etme, ayrıcalık yükseltme).
* **Teknikler:** Saldırganların taktiklere ulaşmak için kullandıkları yöntemler (örneğin oltalama, PowerShell kullanımı).
* **Prosedürler:** Belirli saldırgan gruplarının teknikleri nasıl uyguladığına dair ayrıntılar.

Analistler bu çerçeveyi kullanarak potansiyel saldırı vektörlerini belirler ve tehdit avcılığı sürecini daha etkili hale getirir.

### Hipotezleri Tanımlama

Hipotez oluşturma sürecinde güvenlik analistleri belirli tehdit senaryoları ve saldırı vektörleri tanımlarlar. Bu senaryolar bir kuruluşun karşı karşıya olduğu potansiyel tehditlerin anlaşılmasına yardımcı olur. Örneğin:

* **İç Tehditler (Insider Threats):** Örneğin hassas verileri çalmaya çalışan bir çalışan.
* **APT (Gelişmiş Sürekli Tehditler):** Belirli bir kuruluşu hedef alan uzun vadeli, hedefli saldırılar.
* **Veri Sızdırma (Data Exfiltration):** Kritik verilerin sızdırılması.

Hipotezler belirli bir olayın veya davranışın nasıl tespit edilebileceğini açıklamalıdır. İyi tanımlanmış formüller aşağıdaki bileşenleri içerir:

* **Tanım:** Hipotezin neyi tespit etmeyi amaçladığını ve ele aldığı tehdit türünü açıkça belirtir.
* **Beklenen Göstergeler:** Hipotezi test etmek için izlenecek belirli göstergeler (örneğin belirli bir dosya türünün sık sık kopyalanması, belirli zamanlarda anormal veri akışları).
* **Test Yöntemleri:** Bunlar hipotezin nasıl test edileceğini ve hangi veri kaynaklarının kullanılacağını açıklar.
* **Beklenen Sonuçlar:** Hipotez doğrulanırsa veya çürütülürse beklenen sonuçlar.

## Hipotezleri Test Etme

### Veri Toplama

Hipotez testindeki ilk adım hipotezi değerlendirmek için gerekli verileri toplamaktır. Bu süreçte çeşitli veri kaynaklarından yararlanılır:

* **Kaynakları Belirleme:** Hipotezle ilgili tüm veri kaynaklarını tanımlayın.
* **Toplama Yöntemleri:** Veri toplama yöntemlerine (örneğin syslog, ajan tabanlı toplama, API entegrasyonları) karar verin ve bunları buna göre uygulayın.
* **Veri Depolama:** Toplanan verileri analiz için bir veri havuzunda saklayın.

### Veri Analizi

Veri toplama işleminden sonra toplanan veriler ayrıntılı olarak analiz edilir. Bu aşamada hipotezde belirtilen anormal davranışlar ve faaliyetler incelenmelidir.

* **Ön İşleme:** Toplanan veriler gereksiz bilgilerden arındırılmak ve analize hazırlanmak üzere ön işlemeden geçirilir.
* **Veri Görselleştirme:** Verilerin grafikler ve tablolar aracılığıyla görselleştirilmesi anomalilerin ve kalıpların tanımlanmasını kolaylaştırır.
* **Veri Filtreleme:** Hipotezle ilgili belirli veri türleri ve olaylar için filtreleme yapılması.

### Analiz Süreci

* **Anomali Tespiti:** Kullanıcı ve sistem davranışındaki anomalilerin belirlenmesi.
* **Trend Analizi:** Olağandışı faaliyetleri tespit etmek için veri modellerinin ve trendlerinin incelenmesi.
* **Davranışsal Analiz:** Anormal davranışı tanımlamak için normal kullanıcı faaliyetlerinden sapmaların araştırılması.

### Korelasyon ve Anomali Tespiti

Veri analizi sürecinde farklı veri kaynaklarının birbiriyle ilişkilendirilmesi (correlation) daha anlamlı ve kapsamlı sonuçlar verir.

* **Korelasyon Kuralları:** Bunlar farklı loglar ve veri kaynakları arasında ilişkiler kurmak için oluşturulan kurallardır. Örneğin belirli bir zaman diliminde büyük miktarda veri indiren ve ardından aynı dönemde hassas verilere erişen bir kullanıcı gibi.
* **Olay Korelasyonu:** Büyük resmi görmek için benzer olay ve faaliyetlerin ilişkilendirilmesidir.

### Anomali ve Şüpheli Aktivite Tespiti

* **Anomali Tespit Yöntemleri:** Anomalileri tespit etmek için makine öğrenmesi algoritmalarından, istatistiksel analizden ve kural tabanlı yaklaşımlardan yararlanabilirsiniz.
* **Şüpheli Faaliyetlerin Belirlenmesi:** Anormal davranışların ve faaliyetlerin şüpheli olup olmadığını değerlendirin.

### Doğrulama ve Sonuç

Bu hipotez doğrulanırsa potansiyel bir tehdit tanımlanmış demektir. Daha sonra gerekli aksiyonlar alınmalıdır. Hipotez doğrulanmazsa süreç tekrarlanmalı ve yeni hipotezler formüle edilmelidir.

* **Doğrulama:** Hipotez doğrulanırsa tehdidi ve olayın kapsamını detaylandırın.
* **Müdahale:** Doğrulanan tehditler için derhal harekete geçin. Örneğin şüpheli bir kullanıcının hesabı askıya alınabilir, kötü amaçlı yazılım tespit edilirse sistem temizlenebilir veya etkilenen cihazlar ağdan izole edilebilir.
* **Yanlış Pozitif (False Positive) Yönetimi:** Yanlış pozitifleri ayıklayın ve hipotezi yeniden değerlendirin.
* **Yeni Hipotezler:** Yanlış pozitiflerden sonra yeni hipotezler oluşturulur ve test süreci devam eder.

### Sürekli İyileştirme

* **Geri Bildirim Döngüsü:** Hipotez testi sürecinden elde edilen içgörülerin ve geri bildirimlerin gelecekteki tehdit avcılığı faaliyetlerine dahil edilmesini içerir.
* **Dokümantasyon ve Raporlama:** Hipotez testi sonuçlarının ve müdahale süreçlerinin ayrıntılı dokümantasyonunun yapılarak ilgili paydaşlarla paylaşılmasıdır.

## Özet

Bu derste hipotez oluşturma ve test etme sürecinin nasıl yürütüleceği ve bu adımlarda nelere dikkat edilmesi gerektiği açıklanmıştır. Bu süreçler tehdit avcılığı faaliyetlerinde etkili ve proaktif bir güvenlik stratejisi geliştirmeye yardımcı olur.

Bir sonraki derste "**İç Tehdit Hipotezi**" ele alınacaktır.

## Sorular

Cevap Gerekmiyor

## İç Tehdit (Insider Threat) Hipotezi

## Hipotez

"Bu hipotez bir çalışanın şirketten ayrılmadan önce hassas bilgileri yasa dışı yollarla sızdırmaya çalışabileceği varsayımına dayanmaktadır. Çalışan bu verileri kişisel kazanç için veya başka bir kuruluşa fayda sağlamak amacıyla kullanmayı planlıyor olabilir."

Hipotezi oluşturduktan sonra tehdit avcılığı süreci aşağıdaki adımları gerektirir.

## Veri Toplama

SIEM sistemleri birden fazla kaynaktan veri toplama yeteneğine sahiptir. Hipotezin geçerliliğini test etmek için bu adımda ilgili tüm verileri toplayın.

## Kullanıcı Aktivite Logları

**Oturum Açma/Kapatma Loglarını Toplayın:** Kullanıcının sisteme ne zaman giriş ve çıkış yaptığı hakkında bilgi toplayın.

SIEM'de ilgili kullanıcı hesaplarının faaliyetlerini filtreleyin ve oturum açma/kapatma zamanlarını analiz edin.

**Dosya Erişim Kayıtlarını Toplayın:** Kullanıcının hangi dosyalara ne zaman eriştiği hakkında bilgi toplayın.

SIEM'de dosya sunucusu loglarını inceleyin ve belirli kullanıcıların dosya erişim faaliyetlerini gözden geçirin.

## Ağ Trafiği Verileri

**FTP Trafik Loglarını Toplayın:** Kullanıcının büyük dosya transferleri gerçekleştirip gerçekleştirmediğini kontrol etmek için FTP loglarını toplayın.

SIEM'de ağ trafiği loglarını inceleyin ve FTP protokolü üzerinden yapılan büyük veri transferlerini analiz edin.

**E-Posta Trafik Loglarını Toplayın:** Kullanıcının e-posta yoluyla büyük dosya ekleri gönderip göndermediğini kontrol edin.

SIEM'de e-posta sunucu loglarını analiz edin ve büyük dosya ekleri içeren e-postaları filtreleyin.

## Uç Nokta (Endpoint) Verileri

**USB Cihaz Kullanım Loglarını Toplayın:** Kullanıcının veri sızdırmak için USB cihazları kullanıp kullanmadığını kontrol edin.

SIEM'de uç nokta güvenlik yazılımı loglarını inceleyin ve USB cihazlarının takıldığı ve çıkarıldığı zamanları gözden geçirin.

**Dosya Kopyalama Aktivite Loglarını Toplayın:** Kullanıcının dosya kopyalama faaliyetlerini izleyin.

SIEM'de uç nokta cihaz loglarını analiz edin ve belirli kullanıcılar tarafından yapılan büyük dosya kopyalama işlemlerini kontrol edin.

## Veri Analizi

Toplanan verileri ayrıntılı olarak analiz edin. Hipotezde belirtilen anormal davranışları ve faaliyetleri inceleyin.

## Kullanıcı Aktivitelerini Analiz Edin

Kullanıcının son faaliyetlerini iyice gözden geçirin.

SIEM'de kullanıcı faaliyetlerini zaman aralığına göre filtreleyin ve bunları ayrıntılı olarak inceleyin.

Kullanıcının dosya erişim ve kopyalama faaliyetlerini analiz edin.

SIEM'de dosya sunucusu ve uç nokta cihaz loglarını inceleyin ve dosya erişim ve kopyalama faaliyetlerini karşılaştırın.

## Korelasyon ve Anomali Tespiti

Anomali ve şüpheli etkinlikleri tespit etmek için birden fazla veri kaynağını ilişkilendirin.

## Olağandışı Saatlerde Yapılan Dosya Kopyalama

Kullanıcının alışılmadık zamanlarda büyük miktarda veri kopyalayıp kopyalamadığını belirleyin.

SIEM'de belirli zaman dilimlerindeki büyük dosya kopyalama işlemlerini filtreleyin ve inceleyin.

## Olağandışı Veri Transferleri

Ağ trafiğinde olağandışı veri transferlerini (örneğin büyük dosya yüklemeleri) arayın.

SIEM'de ağ trafiği loglarını analiz edin ve büyük dosya transferlerini ve olağandışı bağlantıları tespit edin.

## Doğrulama ve Sonuç

Hipotezi doğrulayın. Onaylanırsa gerekli aksiyonları alın. Çürütülürse yeni hipotezler oluşturun ve test sürecini tekrarlayın.

## Hipotezi Doğrulayın

Kullanıcının şirketten ayrılmadan önce büyük miktarda hassas veriyi kopyaladığını ve sızdırmaya çalıştığını onaylayın.

SIEM'de toplanan ve analiz edilen verileri gözden geçirerek hipotezi doğrulayan anomalileri ve faaliyetleri onaylayın.

## Uygun Şekilde Müdahale Edin

Hipotez doğrulanırsa kullanıcının hesabını derhal askıya alın.

SIEM'de kullanıcı hesabının erişimini iptal edin ve gerekli güvenlik önlemlerini uygulayın.

Olayı ayrıntılı olarak incelemek için dahili bir soruşturma başlatın.

SIEM'de ilgili tüm logları ve olay kayıtlarını kapsamlı bir şekilde inceleyin ve raporlayın.

## Çürütülen Hipotez ve Yeni Hipotez Oluşturma

Hipotez çürütülürse yeni hipotezler oluşturun ve test sürecini tekrarlayın.

SIEM'de yeni anomaliler ve şüpheli faaliyetler için ek hipotezler geliştirin ve bu hipotezlere dayanarak yeni tehdit avcılığı süreçleri başlatın.

## Özet

Bu adımlar SIEM kullanarak iç tehdit tespit hipotezinin nasıl test edileceğini ve doğrulanacağını detaylandırmaktadır. Bu süreci takip etmek kuruluşunuzun iç tehditlere karşı daha hazırlıklı ve daha proaktif olmasına yardımcı olacaktır.

Bir sonraki derste "**Şüpheli Yönetici Hesabı Aktivite Hipotezi**" ele alınacaktır.

## Sorular

Cevap Gerekmiyor

## Şüpheli Yönetici (Admin) Hesabı Aktivite Hipotezi

## Hipotez

"Bir saldırgan kritik sistemlere erişim sağlamak için bir yönetici hesabını ele geçirmiş olabilir."

![](https://cdn-images-1.medium.com/max/800/0*lUJJmMsCH5EQIDN4.png)

( **Görsel Kaynağı** : <https://blog.admindroid.com/enable-report-suspicious-activity-in-azure-ad/> )

## Veri Kaynakları

* **SIEM Logları:** Merkezi log yönetim sistemi aracılığıyla toplanan tüm ilgili loglar.
* **İşletim Sistemi Logları:** Sistem olayları ve kullanıcı faaliyetleri.
* **Hesap Yönetimi Logları:** Kullanıcı ve grup değişiklikleri, şifre değişiklikleri.
* **Active Directory (AD) Logları:** Active Directory'deki kullanıcı ve grup değişiklikleri.
* **Güvenlik Duvarı Logları:** Gelen ve giden ağ trafiği.
* **Uç Nokta Tespit ve Müdahale (EDR) Logları:** Uç noktalardaki anormal faaliyetlerin kayıtları.
* **Tehdit İstihbaratı Veritabanları:** Bilinen kötü niyetli IP adresleri ve alan adları.

## Analiz Adımları

### Yönetici Oturum Açma Girişimleri

* **Başarısız Oturum Açmalar:** Yönetici hesapları için başarısız oturum açma girişimlerini tespit edin.
* **Başarılı Oturum Açmalar:** Başarısız girişimlerin ardından yapılan başarılı oturum açmaları kontrol edin.

### Hesap Yönetimi Aktivitesi

* **Yetki Değişiklikleri:** Kullanıcı ve grup yetkilerindeki değişiklikleri izleyin.
* **Şifre Değişiklikleri:** Yönetici hesaplarındaki şifre değişikliklerini kontrol edin.
* **Hesap Oluşturma/Silme:** Beklenmedik kullanıcı veya grup oluşturma/silme faaliyetlerini izleyin.

### Ağ Trafiği ve Bağlantı

* **Anormal Trafik:** Yönetici hesapları tarafından başlatılan anormal bağlantıları izleyin.
* **Yeni Hedefler:** Yönetici hesapları tarafından daha önce erişilmemiş IP adreslerine yapılan bağlantıları kontrol edin.
* **Port Kullanımı:** Beklenmedik portlar üzerinden yapılan bağlantıları izleyin.

### EDR Loglarının Analizi

* **Anormal İşlemler:** Uç noktalarda çalışan olağandışı işlemleri izleyin.
* **Yönetici Ayrıcalıkları:** Yönetici ayrıcalıklarına sahip işlemlerin anormal faaliyetlerini izleyin.
* **Kötü Amaçlı Yazılım:** Antivirüs ve antimalware yazılımı tarafından tespit edilen kötü amaçlı yazılımları kontrol edin.

### Active Directory Loglarının Analizi

* **Kritik Değişiklikler:** AD'deki kritik değişiklikleri (örneğin grup politikası değişiklikleri, hesap kilitlenmeleri) izleyin.
* **Oturum Açma Girişimleri:** AD'deki yönetici hesaplarında oturum açma girişimlerini kontrol edin.

### Tehdit İstihbaratı Entegrasyonu

* **Bilinen Kötü Niyetli IP'ler:** Yönetici hesapları tarafından bağlanan IP adreslerini tehdit istihbaratı veritabanlarıyla karşılaştırın.
* **Alan Adı İtibarı:** Yönetici hesapları tarafından erişilen alan adlarının itibarını kontrol edin.

### Beklenen Sonuçlar

* Yönetici hesaplarında başarısız oturum açma girişimlerini takiben başarılı oturum açmalar.
* Kullanıcı ve grup yetkilerinde beklenmedik değişiklikler.
* Yönetici hesapları tarafından başlatılan anormal ağ bağlantıları.
* Uç noktalarda anormal işlem veya dosya faaliyetleri.
* AD'de kritik değişiklikler ve beklenmedik oturum açma girişimleri.
* Bilinen kötü niyetli IP adreslerine veya alan adlarına erişim.

## Özet

SIEM sistemleri belirli raporlar dahilinde tehdit avcılığı süreçlerini destekler ve şüpheli yönetici hesabı faaliyetlerini tespit etmek için güçlü araçlar sunar. Bu derste özetlenen adımlar SIEM'in yönetici hesaplarına yönelik yetkisiz erişim girişimlerini tespit etmek için nasıl kullanılabileceğini göstermektedir. Bu süreç organizasyonların siber güvenlik duruşlarını proaktif olarak yönetmelerine ve potansiyel tehditlere karşı daha dirençli hale gelmelerine yardımcı olur.

## Sorular

Cevap Gerekmiyor

## Uygulamalı Laboratuvar-1

## Hipotez-1

**Not:** Bu bölümdeki sorular, aşağıdaki hipoteze dayalı olarak Tehdit Avcılığı yürütmeyi amaçlamaktadır.

**Hipotez:** DMZ ortamında bulunan bir Linux sunucusundan yetkisiz sunuculara ve portlara erişim girişimleri olabilir.

## Tehdit Avcılığı Laboratuvar Ortamı

* **DMZ Sunucu IP Bloğu**: 172.16.8.0/24
* **Diğer Ağlar**: 10.10.10.0/24
* SIEM (Wazuh)
* Güvenlik Duvarı Trafik Olayları
* Güvenlik Duvarı Sistem Olayları
* Linux Güvenlik Olayları
* Linux Denetim (Audit) Olayları
* Linux Yum Olayları

## Sorular

> **Güvenlik duvarı loglarına göre, 1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında eklenen güvenlik duvarı kuralının "log_id" değeri nedir?**

Sistemde güvenlik duvarı logları için gerekli filtrelemeyi yaptığımızda logid değerini buluyoruz.

![](https://cdn-images-1.medium.com/max/800/1*gic-ndoay-0M_G-dlcvSYw.png)

**Cevap:** 13579

![](https://cdn-images-1.medium.com/max/800/1*kx41JqzXoJTxeQuyvR_ROQ.png)

> **Güvenlik duvarı loglarına göre, 1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında "172.16.8.190" IP adresine 22 numaralı port üzerinden erişime hangi kullanıcı izin vermiştir?**

Önceki soruda bulduğumuz logu dikkatlice incelersek 22 SSH erişim isteği olduğunu gözlemliyoruz. Bize sorulan kullanıcı (user) değeri de logun içindedir.

![](https://cdn-images-1.medium.com/max/800/1*Ikvc0ow8S12lW7P3g16-Vw.png)

**Cevap:** fwadmin

![](https://cdn-images-1.medium.com/max/800/1*Kts9_EcqCAEUgwIEw4fA7Q.png)

> **DMZ sunucu loglarına göre, 1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında kaç adet "sshd: authentication failed." olayı gerçekleşmiştir?**

172.16.8 IP'lerinin DMZ varlıkları olduğunu anlıyoruz. Bu hostlara yönelik ssh fail olaylarını arayalım. Bunun için sshd grubunu ve authentication_failed olayını aramamız gerekiyor. Gerekli filtreleri yazdığımızda cevabı 24 olarak buluyoruz.

![](https://cdn-images-1.medium.com/max/800/1*4xh57yWlMzfXhJqY3NVt_A.png)

**Cevap:** 24

![](https://cdn-images-1.medium.com/max/800/1*uCQ_Jh-GRgg5GZ2yQAZI9A.png)

> **DMZ sunucu loglarına göre, 1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında başarısız bir denemenin (sshd: authentication failed) ardından başarılı bir şekilde oturum açan (sshd: authentication success) IP adresi nedir?**

Önceki soruda 172.16.8.190 hostunun çok sayıda ssh yetkilendirme hatası aldığını görmüştük. Şimdi yetkilendirme başarısı (success) loglarına bakalım. Başarı loglarında 172.16.8.190 hostuna çok sayıda ssh hatasından sonra başarı alarak bağlanıldığını görüyoruz. Kaynak IP bilgisini 12.13.14.15 olarak belirliyoruz.

![](https://cdn-images-1.medium.com/max/800/1*JDRNNg4vAGzUJSRheFW18g.png)

**Cevap:** 12.13.14.15

![](https://cdn-images-1.medium.com/max/800/1*MmKXW-ITd4XY91aUFBgWhg.png)

> **DMZ ortamındaki "172.16.8.190" IP adresli web sunucusuna yetkisiz erişimden sonra 1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında hangi uygulama yüklenmiştir?**

İlgili agent ip'sini yum grubunda arattığımızda bir sonuç alıyoruz ve bu sonuçtaki tam log içeriğine baktığımızda nmap uygulamasının yüklendiğini gözlemliyoruz.

![](https://cdn-images-1.medium.com/max/800/1*i4kRvCiG1YgZGg-I74j4gQ.png)

**Cevap:** nmap-6.40-19.el7.x86_64

![](https://cdn-images-1.medium.com/max/800/1*eAe-igWD4N4j-JLxfhHW_w.png)

> **DMZ ortamındaki "172.16.8.190" IP adresli web sunucusuna yetkisiz erişimden sonra yüklenen uygulama kullanılarak 1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında hangi IP bloğu taranmıştır?**

agent.name üzerinden filtreleyip nmap aktivitelerini aradığımızda denetim (audit) loglarında taranan subnet bilgisini buluyoruz.

![](https://cdn-images-1.medium.com/max/800/1*Ofx0mBiHu7ZECUns4ERtrQ.png)

**Cevap:** 10.10.10.0/24

![](https://cdn-images-1.medium.com/max/800/1*VE5LZ4nnxc3s_Pvwz5LCHQ.png)

> **DMZ ortamındaki "172.16.8.190" IP adresli web sunucusuna yetkisiz erişimden sonra yüklenen uygulama kullanılarak 1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında taranan port numarası nedir?**

Yine aynı log içeriğinde taranan port bilgisinin 22 ssh portu olduğunu görüyoruz.

![](https://cdn-images-1.medium.com/max/800/1*9ybv94n_n1-pwVeGPqrdiQ.png)

**Cevap:** 22

![](https://cdn-images-1.medium.com/max/800/1*gKvAxV8XHw2AHAGKtUHBFg.png)

> **Güvenlik duvarı loglarına göre, 1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında "172.16.8.190" IP adresinden "10.10.10.0/24" ağına "accept/allow" trafiği alan kaç benzersiz hedef IP adresi bulunmaktadır?**

Güvenlik duvarı grubunda 172.16.8.190 kaynak ip'sinden gelen 22 ssh isteğinden izin verilen (allow) alanları filtrelediğimizde 4 adet sonuç görüyoruz.

![](https://cdn-images-1.medium.com/max/800/1*z793CO0Aj9gHGXyAZzWRtA.png)

**Cevap:** 4

![](https://cdn-images-1.medium.com/max/800/1*7vczN-m10e6vCx5CKs6XWA.png)

> **Güvenlik duvarı loglarına göre, 1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında "172.16.8.190" IP adresinden "10.10.10.0/24" ağına yönelik kaç adet "SSH authentication_failed" olayı gerçekleşmiştir?**

Bu cevabı güvenlik duvarı loglarından değil, sshd loglarından bulabiliriz. Soruda bir hata var gibi görünüyor. Ssh loglarından auth fail olaylarına baktığımızda 8 hata aldığını görebiliyoruz.

![](https://cdn-images-1.medium.com/max/800/1*tRkYMuRdpQbEjKdLsm_SAw.png)

**Cevap:** 8

![](https://cdn-images-1.medium.com/max/800/1*L1Gobb0NR84TXPAKLkxRxw.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında "172.16.8.190" IP adresinden SSH yoluyla başarıyla oturum açan (authentication_success) "10.10.10.0/24" ağındaki sistemin IP adresi nedir?**

Aynı filtreyi kullanarak fail yerine success olaylarını ararsak 1 adet sonuç elde ederiz. Bu olaydaki agent ip bilgisi bizim cevabımızdır.

![](https://cdn-images-1.medium.com/max/800/1*k46XKIhfXzcww5UIwcfs3g.png)

**Cevap:** 10.10.10.24

![](https://cdn-images-1.medium.com/max/800/1*kH-37eWANC5YG25iZGALhw.png)

## Uygulamalı Laboratuvar-2

## Hipotez-2

**Not:** Bu bölümdeki sorular, aşağıdaki hipoteze dayalı olarak Tehdit Avcılığı yürütmeyi amaçlamaktadır.

**Hipotez:** VPN erişimi olan kullanıcı hesapları ele geçirilmiş olabilir ve yetkisiz erişim girişimleri gerçekleşiyor olabilir.

## Tehdit Avcılığı Laboratuvar Ortamı

* SIEM (Wazuh)
* Güvenlik Duvarı Trafik Olayları
* VPN Olayları

## Sorular

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında en fazla SSL VPN oturum açma hatası alan kullanıcı adı nedir?**

Güvenlik duvarı loglarında vpn alt türünü (subtype) ve yetkilendirme hatası (auth fail) olaylarını filtrelersek cevaba ulaşırız.

![](https://cdn-images-1.medium.com/max/800/1*0iuUMF-O_zPPvvTUqFarpA.png)

**Cevap:** adm_eric

![](https://cdn-images-1.medium.com/max/800/1*MbO7wHQAWqCda3Wo8ZN1FQ.png)

> **Almanya dışında, 1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında en fazla SSL VPN oturum açma hatası alan VPN hesabı için hangi ülkeden başarılı oturum açma işlemi gerçekleşmiştir?**

adm_eric hesabı için Almanya dışındaki hangi ülkeden başarılı giriş yapıldığını bulmamız gerekiyor. Bunun için hesabı filtreleyip başarı (success) durumuna ulaşmalıyız.

![](https://cdn-images-1.medium.com/max/800/1*u94Hu0GERjlEjBC37CAEIg.png)

**Cevap:** Meksika

![](https://cdn-images-1.medium.com/max/800/1*szFgQqiUtWSWnyr89B7vtQ.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında en fazla SSL VPN oturum açma hatası alan VPN hesabı için başarılı girişten sonra (Almanya hariç) hangi "tunnel_ip" atanmıştır?**

Bir önceki soruda, Meksika kaynaklı olan başarı logunu incelediğimizde ilgili logun tam içeriğini incelediğimizde tunnelip değerine ulaşıyoruz.

![](https://cdn-images-1.medium.com/max/800/1*KJePJ1yb2PeRV4YUgCONhw.png)

**Cevap:** 10.34.1.13

![](https://cdn-images-1.medium.com/max/800/1*jFLuhbZli4d5AlLaK8pazA.png)

> **Trafik loglarına göre, 1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında en fazla SSL VPN oturum açma hatası alan VPN hesabı için başarılı oturum açma (Almanya hariç) sonrasında atanan "tunnel_ip" adresinden en sık hangi hedef porta erişilmiştir?**

Bunun için güvenlik duvarı loglarında bulduğumuz 10.34.1.13 adresinden kaynaklanan trafiği filtrelememiz gerekir. Ardından dstport alanına baktığımızda giden trafiğin en çok hangi portu hedeflediğini görebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*gm5EHuxGTLVKaYq4ugKa3g.png)

**Cevap:** 22

![](https://cdn-images-1.medium.com/max/800/1*GgvFqp5XqwRX-TO8QBMLfw.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında en fazla SSL VPN oturum açma hatası alan VPN hesabı için başarılı oturum açma (Almanya hariç) sonrasında atanan "tunnel_ip" üzerinden kaç benzersiz hedefe SSH servis erişimine izin verilmiştir?**

Bunun için 10.34.1.13 IP adresinden gelen ve 22 numaralı portu hedefleyen trafikten 'action allow' alanlarını filtrelememiz gerekir. Benzersiz sonuç sayısı cevabı verecektir.

![](https://cdn-images-1.medium.com/max/800/1*0y4OPg_0OZ0nIKeZH7-O6w.png)

**Cevap:** 3

![](https://cdn-images-1.medium.com/max/800/1*DNm0sfXfxNmv1b9ckHZpnQ.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında en fazla SSL VPN oturum açma hatası alan VPN hesabı için başarılı oturum açma (Almanya hariç) sonrasında atanan "tunnel_ip" adresinden hangi IP adresi ssh başarılı oturum açma (auth success) almıştır?**

Bunu yapmak için SSHD loglarına bakmamız gerekir. Başarılı SSH girişlerini kaynak IP adresine göre filtrelemek, agent.ip alanı üzerinden hangi hostun başarıyla oturum açtığını ortaya çıkaracaktır.

![](https://cdn-images-1.medium.com/max/800/1*GsIzZ-MKcm-SXhV05RrzhA.png)

**Cevap:** 10.10.10.11

![](https://cdn-images-1.medium.com/max/800/1*fTCDRmf2vNNY8D3mPtb6Xw.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında en fazla SSL VPN oturum açma hatası alan VPN hesabı için başarılı oturum açma (Almanya hariç) sonrasında atanan "tunnel_ip" adresinden başarılı SSH erişiminden sonra "T1057-Process Discovery" aktivitesi için hangi komut yürütülmüştür?**

Bunun için denetim (audit) loglarına bakmalıyız. agent.name ile filtrelediğimizde host üzerinde çalışan komutları bulabiliriz.

![](https://cdn-images-1.medium.com/max/800/1*8ge_N2yB10CjjjOfKAl99Q.png)

**Cevap:** ps

![](https://cdn-images-1.medium.com/max/800/1*SQaYw4UT5oth9mrSyb8z-Q.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında en fazla SSL VPN oturum açma hatası alan VPN hesabı için başarılı oturum açma (Almanya hariç) sonrasında atanan "tunnel_ip" adresinden başarılı SSH erişiminden sonraki "T1057-Process Discovery" aktivitesi sırasında hangi işlem (process) aranmıştır?**

Tam loga detaylı baktığımızda "ps -aux | grep proftp" komutunun yürütüldüğünü görüyoruz.

![](https://cdn-images-1.medium.com/max/800/1*a7L0ckeu5IvmSA67j5TT3g.png)

**Cevap:** proftp

![](https://cdn-images-1.medium.com/max/800/1*JrcF4Hc77iZaPrIANHWRvQ.png)

## Uygulamalı Laboratuvar-3

## Hipotez-3

**Not:** Bu bölümdeki sorular, aşağıdaki hipoteze dayalı olarak Tehdit Avcılığı yürütmeyi amaçlamaktadır.

**Hipotez:** DMZ ortamındaki bir sunucudaki yanlış yapılandırılmış FTP hizmetleri anonim kullanıcı hesaplarını açık bırakmış olabilir ve bu da yetkisiz dosya yükleme ve indirmelerine izin verebilir.

## Tehdit Avcılığı Laboratuvar Ortamı

* **DMZ Sunucu IP Bloğu**: 172.16.8.0/24
* SIEM (Wazuh)
* FTP Olayları
* Linux Sistem Olayları
* Linux Güvenlik Olayları
* Linux Denetim (Audit) Olayları

## Sorular

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında FTP üzerinden anonim olarak başarıyla oturum açan IP adresi nedir?**

Bu filtre ile bulabiliriz.

![](https://cdn-images-1.medium.com/max/800/1*mxlLJQ5_KBeC1FKXDvs3tg.png)

**Cevap:** 111.1.2.3

![](https://cdn-images-1.medium.com/max/800/1*PVx5AEpyYTXq2s31eefx-A.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında FTP üzerinden anonim olarak başarıyla oturum açan IP adresinin "ülke adı" (country name) nedir?**

Bulduğumuz logdaki GeoLocation.country_name bilgisini ararsak cevabı buluruz. Veya tam logda arama yapabilirsiniz.

![](https://cdn-images-1.medium.com/max/800/1*0SVCvuWZTTxOk1jHEbO-aQ.png)

**Cevap:** Çin (China)

![](https://cdn-images-1.medium.com/max/800/1*NFB4U4m2aQh5LT8SwgJfAA.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında anonim FTP oturum açmalarına izin veren sistemin IP adresi nedir?**

Bulduğumuz logdaki agent.ip bilgisini ararsak cevabı buluruz.

![](https://cdn-images-1.medium.com/max/800/1*vb0pwafIW15pl1iJOV9edw.png)

**Cevap:** 172.16.8.21

![](https://cdn-images-1.medium.com/max/800/1*29aRwlhh7jd8A7xlprDNTw.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında anonim girişlere izin veren sistemde çalışan FTP servisinin adı nedir?**

Tam log içeriğinden cevabı görebiliriz.

**Cevap:** proftpd

![](https://cdn-images-1.medium.com/max/800/1*LkcDV8wSduIagbs8eige4g.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında anonim girişlere izin veren sistemde FTP servisi ne zaman yeniden başlatılmıştır?**

FTP loglarında 'stopping' metnini aramak, servisin ne zaman durdurulduğuna dair logu bulmamıza yardımcı olacaktır.

![](https://cdn-images-1.medium.com/max/800/1*V7ZeyrSaXZdtQJhlat4hfw.png)

**Cevap:** 2 Ağustos 14:00:15

![](https://cdn-images-1.medium.com/max/800/1*Q7pgyw3m1R02RtHtDQFANg.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında anonim girişlere izin veren sistemde FTP servisi yeniden başlatılmadan önce değiştirilen FTP servisiyle ilgili dosyanın tam yolu nedir?**

İlgili hostun denetim (audit) loglarını incelemek aktiviteyi gözlemlememizi sağlar. Cevap tam log içeriğinde bulunabilir.

![](https://cdn-images-1.medium.com/max/800/1*2Xm0SzPg5P0_CT4W6NQPoQ.png)

**Cevap:** /etc/proftpd/proftpd.conf

![](https://cdn-images-1.medium.com/max/800/1*VpptpMS6F773-ZDFkTVidQ.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında anonim girişlere izin veren sistemde FTP servisi yeniden başlatılmadan önce FTP servisiyle ilgili dosyayı hangi kullanıcı değiştirmiştir?**

Tam log içeriğine bakarsak root kullanıcısı olduğunu belirleyebiliriz.

**Cevap:** root

![](https://cdn-images-1.medium.com/max/800/1*koOb08H3gKtgMxpSTzGc_Q.png)

> **1 Ağustos 2024 00:00 - 7 Ağustos 2024 00:00 tarihleri arasında anonim girişlere izin veren sistemde FTP servisi yeniden başlatılmadan önce FTP servis dosyasını değiştiren kullanıcı hangi IP adresinden SSH yoluyla bağlanmıştır?**

sshd loglarına bakarsak ssh bağlanan IP'yi tespit edebiliriz.

![](https://cdn-images-1.medium.com/max/800/1*dz0fEg3Nx24YDQ1jKMOS2Q.png)

**Cevap:** 10.34.1.13
---