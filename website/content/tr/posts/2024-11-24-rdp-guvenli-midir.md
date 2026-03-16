---
date: '2024-11-24'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*UP8fyAdYI17KDIqhtDK4Sg.png
title: RDP Güvenli midir?
type: posts
---

### RDP Güvenli midir?

![](https://cdn-images-1.medium.com/max/800/1*UP8fyAdYI17KDIqhtDK4Sg.png)

Bu yazımda RDP(Remote Desktop Protocol) protokolünün güvenli olup olmadığını tartışacağız. **RDP (Remote Desktop Protocol)**, **APT (Advanced Persistent Threat)** grupları tarafından **lateral movement** yani ağ içinde yatay hareket için sıklıkla kullanılan bir protokol haline gelmiştir. Bu yönüyle güvenli bir protokol olmadığı izlenimini yaratmaktadır. Peki bunun sebebi nedir?

---

### **RDP (Remote Desktop Protocol) Nedir?**

> Önce RDP’nin tam olarak ne olduğunu anlayalım.

RDPMicrosoft tarafından geliştirilmiş ve uzak masaüstü bağlantıları için yaygın olarak kullanılan bir protokoldür. RDP, kullanıcıların başka bir bilgisayara veya sunucuya ağ üzerinden bağlanarak, uzak bir masaüstü ortamını yerelmiş gibi kullanmalarını sağlar.

![](https://cdn-images-1.medium.com/max/800/1*_XjdN0sbwr04IpjBK0mVcA.jpeg)

RDP Protokolü

#### RDP’nin Temel Özellikleri:

1. **Uzaktan Erişim**: RDP, kullanıcıların uzak bir sistemin masaüstünü veya sunucusunu doğrudan yönetmelerini sağlar.
2. **Şifreleme ve Güvenlik**: RDP, bağlantıları şifrelemek için TLS (Transport Layer Security) kullanarak veri iletiminin güvenliğini sağlar. Ancak, eski sürümlerde güvenlik açıkları olabilir.
3. **Erişim Denetimi**: RDP, sistem yöneticilerinin uzak erişimi denetlemesine olanak tanır, fakat doğru yapılandırılmadığında kötü niyetli saldırılara açık olabilir.
4. **Kullanıcı Kimlik Doğrulama**: RDP, oturum açmak için geleneksel kullanıcı adı ve şifre doğrulaması kullanır, ancak güvenlik eklemek amacıyla **çok faktörlü kimlik doğrulama (MFA)** da entegre edilebilir.

> MFA, SSL/TLS, erişim denetimi gibi mekanizmaların varlığında RDP güvenli bir protokol gibi görünüyor. Bu yönüyle RDP gerçekten güvenli bir protokoldür. Sorun bu mekanizmaların gerçekten kullanılıp kullanılmaması. Sorun doğru konfigürasyonların yapılıp yapılmaması!

#### RDP’nin Güvenlik Riskleri:

* **Zayıf Şifreler ve Kaba Kuvvet Saldırıları**: RDP, zayıf şifreler kullanıldığında ve kaba kuvvet saldırılarına karşı savunmasız olduğunda, uzak sistemlere yetkisiz erişim sağlanabilir.
* **Açık Portlar ve Saldırılara Açık Erişim**: RDP’nin **3389 numaralı portu** internet üzerinden doğrudan erişilebilir hale getirildiğinde, saldırganlar tarafından port taraması yapılarak bu bağlantılar hedef alınabilir.
* **Güvenlik Açıkları**: RDP, geçmişte güvenlik açıklarına sahipti (örneğin, **BlueKeep** açığı). Bu tür güvenlik açıkları, sistemlere sızmak için kullanılabilir.

> **RDP (Remote Desktop Protocol)**, **APT (Advanced Persistent Threat)** grupları tarafından **lateral movement** yani ağ içinde yatay hareket için sıklıkla kullanılan bir protokol haline gelmiştir.

---

### RDP’nin APT Saldırıları İçindeki Rolü

APT grupları genellikle belirli bir hedefi uzun süreli ve dikkatlice izler. İlk erişim(initial access) sağlandıktan sonra, saldırganlar genellikle **lateral movement** yapmak amacıyla mevcut sistemlerdeki açıkları ve kimlik bilgilerini kullanarak ağda ilerler. RDP, bu tür saldırılarda kritik bir rol oynar çünkü RDP, saldırganlara bir ağdaki farklı cihazlara uzaktan bağlanma imkânı tanır. APT grupları, ele geçirdikleri ilk hedefteki kimlik bilgilerini kullanarak ağdaki başka sistemlere geçiş yapar. Bu, ağda hızla hareket etmelerini sağlar.

![](https://cdn-images-1.medium.com/max/800/1*XsWJxISsqgpXS_I2ecBx9g.png)

RDP ile Yanal Hareket

APT grupları, **lateral movement** yapmak için RDP’yi çeşitli yollarla kullanabilirler:

* **Pass-the-Hash (PTH):** Ele geçirilen kullanıcı adı ve şifrelerin hash’lerini kullanarak, şifreyi bilmeden başka sistemlere bağlanılabilir.
* **Credential Dumping**: **Mimikatz** gibi araçlarla, RDP oturumları açmak için ağdaki kullanıcı adı ve şifreleri elde etmek.
* **Brute-force saldırıları**: Zayıf şifreler veya varsayılan şifreler kullanılıyorsa, saldırganlar RDP portunu hedef alarak kaba kuvvet saldırıları yapabilirler.

> Aslında bu saldırıların yapılabiliyor olması doğrudan RDP protokolünü güvensiz yapmaz.

> **İlk saldırıya bakacak olursak**: RDP kimlik doğrulama süreçleri için Active Directory ortamında kerberos protokolünü kullanır. Pass-the-Hash saldırısı ise kerberos protokolünün stateless yapısı nedeniyle TGT ticketlarının manipüle edilerek kullanılabilmesinin sonucu ortaya çıkan bir saldırı türüdür. Burada esas suçlu kerberos protokolüdür.

> **ikinci saldırı**, mimikatz aracı ile lsass.exe prosesinin bellek alanının okunması ve içindeki credentialların çalınması ardından kimlik doğrulamada kullanılmasını içerir. Burada da RDP protokkolünün bir suçu yoktur.

> **üçüncü saldırıda** ise brute-force saldırısında gelen RDP login istekleri yine kerberos protokolü tarafından doğrulanır. Yine canım RDPnin bir suçu günahı yok:(

> Aslında, RDP’nin temel işlevi uzaktan erişim sağlamak bunu da SSL/TLS şifreli olarak güvenli bir şekilde yapıyor. Kerberos kimlik doğrulama süreçlerinden kaynaklanan saldırıları RDP protokolüne yüklemek haksızlık olur.

#### APT Saldırıları ve RDP’nin Kullanımı: Örnekler ve Yöntemler

* **APT33**: İran destekli olduğu düşünülen bu grup, RDP’yi kullanarak hedef sistemlere sızdı ve ağda ilerlemek için **kimlik bilgisi hırsızlığı** gibi yöntemler uyguladı.
* **APT29 (Cozy Bear)**: Rusya ile bağlantılı bir diğer APT grubu olan Cozy Bear, RDP’yi kullanarak iç ağlara ve kritik sistemlere erişim sağladı. Grubun kullandığı yöntemlerden biri, ağda yayılmak ve veri çalmak için ele geçirilen RDP oturumlarını kullanmaktı.

#### RDP’nin APT’ler Tarafından Tercih Edilmesinin Nedenleri

1. **Kolay Erişim ve Yayılma**: RDP, hedefe sızdıktan sonra saldırganların kolayca farklı cihazlara geçiş yapmalarını sağlar. Bu, özellikle geniş ağlarda kritik bir avantajdır.
2. **Etkili ve Hızlı Veri Çalma**: RDP, saldırganların önemli verilere veya sistem kaynaklarına hızlıca erişmesini sağlar. Bu, özellikle uzun süreli, düşük profilli sızma saldırılarında kullanışlıdır.
3. **RDP’nin Yaygınlığı ve Konfigürasyon Hataları**: Çoğu ağda RDP, uzak bağlantıların yapılması için yaygın olarak kullanılır. Ancak, çoğu zaman güvenlik önlemleri eksiktir. Bu da saldırganların **brute force** saldırıları veya kimlik bilgisi hırsızlığı yoluyla kolayca sisteme girmelerini sağlar.

> RDPnin suçsuz olması gerçeğine karşın sunduğu imkanlar hackerların ağzını sulandırmaya devam ediyor! Peki ne yapabiliriz. Şimdi bunları tartışalım.

---

### RDP ile Lateral Movement’a Karşı Alınacak Güvenlik Önlemleri

1. **RDP Erişimini Kısıtlamak**: **RDP portu (3389)** yalnızca iç ağlara açılmalı ve mümkünse **VPN** veya başka güvenli bağlantı yolları üzerinden erişilmelidir.
2. **Ağ Seviyesi Kimlik Doğrulaması (NLA)**: RDP bağlantıları, NLA ile korunmalıdır. Bu, kimlik doğrulaması yapmadan önce bağlanmayı engeller ve kötü niyetli kişilerin sistemi ele geçirmesini zorlaştırır.
3. **Çok Faktörlü Kimlik Doğrulama (MFA)**: RDP oturumları için MFA uygulamak, yalnızca şifre ile giriş yapılmasını engelleyebilir ve ek bir güvenlik katmanı ekler.
4. **Şifre Güvenliği**: Şifrelerin güçlü ve karmaşık olması gerekmektedir. Basit şifreler RDP’yi kötüye kullanmayı kolaylaştırabilir.
5. **Saldırı Tespiti ve İzleme**: RDP oturumları izlenmeli ve şüpheli aktiviteler tespit edilmelidir. Şüpheli oturum açma denemeleri veya ağda hareket eden bilinmeyen IP adresleri dikkatle izlenmelidir.
6. **Güncellemeler ve Yamalamanın Yapılması**: Sistemler düzenli olarak güncellenmeli ve güvenlik açıkları yamalanmalıdır. Eski sürümler ve açıklar, saldırganlara kolayca erişim sağlayabilir.

> Peki tek sorun RDP’de mi? diğer uzaktan erişim araçları tehlikeli değiller mi? Şimdi bunu tartışalım.

---

### APT Saldırıları ve Uzaktan Erişim Araçlarının Popüler Kullanımı

1. **RDP (Remote Desktop Protocol)**:   
   **RDP**, saldırganlar tarafından ağda yayılmak için çok sık kullanılan bir araçtır.
2. **TeamViewer**:  
   **TeamViewer**, yaygın olarak kullanılan bir uzaktan erişim aracıdır ve genellikle sistem yöneticileri tarafından kullanılır. Ancak, **APT grupları** bu aracı kötüye kullanarak hedef bilgisayarlara bağlanabilirler. TeamViewer’in kurulmuş ve çalışıyor olması, çoğu zaman ağ yöneticileri tarafından fark edilmeyebilir, bu da saldırganların gizlice ağda hareket etmelerini sağlar. **Sosyal mühendislik** saldırılarıyla TeamViewer’ın kurulumunu hedef makinelerde başlatmak, saldırganlara ağda gizli erişim sağlar.
3. **AnyDesk**:  
   **AnyDesk**, TeamViewer’a benzer şekilde, hedef sistemlere erişim sağlamak için kullanılan bir başka yaygın uzaktan erişim aracıdır. Genellikle **hızlı bağlantılar** ve **yüksek performans** sunduğu için tercih edilir. APT grupları, bu yazılımı kullanarak, ağda hedef cihazlardan veri çalmak ya da daha fazla sisteme sızmak için kullanabilir. AnyDesk, tıpkı TeamViewer gibi, genellikle kullanıcılar tarafından iş amaçlı yasal olarak kullanıldığından, kötü amaçlı kullanım tespit edilemeyebilir.

> Gördüğünüz gibi suçlu RDP değilmiş. Uzaktan erşim araçlarının tümü benzer riskleri taşır. Aslında, RDP’nin APT saldırılarındaki kullanımının popülerliği, RDP kullanımının popülerliğinden kaynaklanıyor. Birçok kurum halihazırda RDP kullandığı için hackerlarda bu aracı kullanıyor. Aynı durum diğer çok kullanılan uzaktan erişim araçları içinde geçerli!   
> Bir süre önce Anydesk uygulaması üzerinde çıkan bir açık yüzünden hacklenen birçok kurum oldu. Bu durum uzaktan erişim araçlarının riskleri konusunda ne kadar dikkatli olmamız gerektiğini gösteriyor.

---

### Privileged Access Management (PAM)

PAM, **Privileged Access Management** (Ayrıcalıklı Erişim Yönetimi), organizasyonlarda sistemler ve ağlar üzerinde yüksek ayrıcalıklara sahip kullanıcıların erişimini kontrol etmek ve denetlemek için kullanılan bir güvenlik çözümüdür. PAM çözümleri, özellikle sistem yöneticileri, ağ yöneticileri ve diğer ayrıcalıklı hesaplar için geçerlidir.

![](https://cdn-images-1.medium.com/max/800/1*4a2mtAcF5OWpT77b-eeS0g.jpeg)

PAM

> Uzaktan erişimi daha güvenli hale getirmek için kullanılabilecek bir sistemden bahsediyorum.

#### PAM’ın RDP ile İlişkisi:

PAM, özellikle yüksek ayrıcalıklı erişimlerin yönetilmesinde kritik bir rol oynar. RDP ile yapılan uzak masaüstü bağlantıları, kötüye kullanılabilecek ve saldırılara açık potansiyel bir giriş noktasıdır. PAM, RDP bağlantıları üzerinden yapılan yüksek ayrıcalıklı işlemlerin denetlenmesi, şifrelerinin yönetilmesi ve erişim izleme için güçlü güvenlik önlemleri sunar.

---

Bu yazımda RDP protokolünün güvenli olup olmadığını tartıştım. Sizde yorumlarda fikirlerinizi belirtebilir ve bana destek olabilirsiniz.