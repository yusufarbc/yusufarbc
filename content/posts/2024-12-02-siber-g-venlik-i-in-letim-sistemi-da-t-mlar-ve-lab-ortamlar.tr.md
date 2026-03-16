---
title: "Siber Güvenlik için İşletim Sistemi Dağıtımları ve Lab Ortamları"
date: 2024-12-02
draft: false
---

---

### Siber Güvenlik için İşletim Sistemi Dağıtımları ve Lab Ortamları

![](https://cdn-images-1.medium.com/max/800/1*IVkwxKLbpKSPwYtqpYG93w.jpeg)

Merhaba bu yazımda siber güvenlik alanında sk kullanılan dağıtımlardan ve lab ortamlarından bahsedeceğim.

---

### Sızma Testi Dağıtımları

Genel olarak ofansif tarafta ve pentest amaçlı dağıtımlara bakalım.

#### 1- [Kali Linux](https://www.kali.org/)

Kali Linux, siber güvenlik ve etik hackerlar için özel olarak tasarlanmış bir Linux dağıtımıdır. Penetrasyon testleri, bilgisayar adli tıp incelemeleri ve güvenlik araştırmaları için kullanılır. Kali Linux, önceden yüklenmiş birçok güvenlik aracı ile gelir ve bu sayede kullanıcılar güvenlik açıklarını tespit etmek ve gidermek için gerekli olan araçları kolayca kullanabilirler.

![](https://cdn-images-1.medium.com/max/800/1*6kVOdYfemK90uvdQMWa_Mg.jpeg)

Kali Linux

Özellikle sızma testleri ve güvenlik araştırmaları yaparken çok değerli bir platform sağlar.

#### 2- [ParrotOS](https://www.parrotsec.org/)

ParrotOS, bilgi güvenliği, geliştirici araçları ve kişisel veri koruması için tasarlanmış bir başka Linux dağıtımıdır. Kali Linux gibi, ParrotOS da siber güvenlik ve penetrasyon testleri için kullanılan birçok araçla birlikte gelir. Ancak ParrotOS, ayrıca gelişmiş kodlama ve yazılım geliştirme araçları da sunarak, hem güvenlik profesyonelleri hem de geliştiriciler için uygun hale gelmiştir.

![](https://cdn-images-1.medium.com/max/800/1*9pRFLbO4beEU8Hu6nZD-0A.jpeg)

ParrotOS

ParrotOS, daha hafif ve kullanıcı dostu bir arayüz sunar. Bu, onu düşük donanım özelliklerine sahip cihazlarda bile rahatça kullanılabilir kılar. Aynı zamanda gizlilik ve anonimlik üzerine odaklanan özellikler içerir, bu nedenle çevrimiçi gizliliğe önem veren kullanıcılar tarafından da tercih edilebilir.

#### 3-[BackBox](https://www.backbox.org/)

BackBox, siber güvenlik uzmanları ve penetrasyon testi profesyonelleri için tasarlanmış bir Linux dağıtımıdır. Ubuntu tabanlı olan BackBox, sızma testleri, güvenlik değerlendirmeleri ve ağ analizleri için çeşitli açık kaynak araçları içerir. Kullanıcı dostu bir arayüze ve gelişmiş özelleştirme seçeneklerine sahip olan BackBox, özellikle güvenlik analizleri yapmak isteyen kullanıcılar için idealdir.

![](https://cdn-images-1.medium.com/max/800/1*tWO6fvwh67LLnG4-8zo4Sw.png)

BackBox

#### 4-[SamuraiWTF](https://www.samurai-wtf.org/)

SamuraiWTF (Web Training Framework), uygulama güvenliği eğitimi için tasarlanmış bir Linux masaüstü dağıtımıdır. OWASP (Open Web Application Security Project) tarafından geliştirilmiştir ve web uygulama test araçlarını içeren bir eğitim ortamı sağlar. Bu dağıtım, önceden yapılandırılmış sanal makineler olarak sunulur ve çeşitli güvenlik araçları ile birlikte gelir.

![](https://cdn-images-1.medium.com/max/800/1*tPPLOSp8K5ltCgS6iENnUQ.png)

SamuraiWTF

SamuraiWTF, özellikle web uygulama güvenliği testleri ve eğitimleri için kullanılır. İçerisinde OWASP Juice Shop, OWASP Zed Attack Proxy (ZAP) ve SQLMap gibi popüler araçlar bulunur. Ayrıca, PortSwigger’ın Burp Suite Community Edition gibi bazı tescilli yazılımlar da içerir.

#### 5-[ArchStrike](https://archstrike.org/)

ArchStrike, Arch Linux tabanlı güvenlik odaklı bir Linux dağıtımıdır. Bu dağıtım, siber güvenlik profesyonelleri ve meraklıları için tasarlanmıştır ve OWASP (Open Web Application Security Project) gibi güvenlik araçlarını içerir. ArchStrike, Arch Linux’in “Arch Way” prensiplerine uygun olarak tasarlanmıştır ve i686, x86\_64, ARMv6, ARMv7 ve ARMv8 mimarileri için optimize edilmiştir.

![](https://cdn-images-1.medium.com/max/800/1*CS2ETH60l6zAyrIgDk5ODQ.jpeg)

ArchStrike

#### 6-[BlackArch](https://www.blackarch.org/)

BlackArch, Arch Linux tabanlı bir siber güvenlik ve penetrasyon testi dağıtımıdır. Bu dağıtım, siber güvenlik profesyonelleri ve araştırmacılar için tasarlanmıştır ve OWASP (Open Web Application Security Project) gibi güvenlik araçlarını içerir. BlackArch, geniş bir araç yelpazesi sunar ve sadece siber güvenlik testleri için değil, genel güvenlik araştırmaları için de kullanılabilir.

![](https://cdn-images-1.medium.com/max/800/1*f5Q5KSaKKmMTupUyBMSeqw.jpeg)

BlackArch

BlackArch, Arch Linux’in “Arch Way” prensiplerine uygun olarak tasarlanmıştır ve i686, x86\_64, ARMv6, ARMv7 ve ARMv8 mimarileri için optimize edilmiştir. Ayrıca, BlackArch’un tam ISO’su ve Slim ISO’su farklı kullanıcı deneyimleri sunar.

#### 7-[Fedora Security Spin](https://fedoraproject.org/wiki/Security_Lab)

**Fedora Security Spin**, Fedora Linux’un özel bir sürümüdür ve bilgi güvenliği, sızma testleri, forensik analizler ve güvenlik eğitimleri için optimize edilmiştir. Bu spin, önceden yüklenmiş birçok güvenlik aracıyla birlikte gelir ve kullanıcılara kapsamlı bir güvenlik test ortamı sunar. Xfce masaüstü ortamını kullanarak, düşük kaynaklı sistemlerde bile rahatça çalışabilir.

![](https://cdn-images-1.medium.com/max/800/1*0MuE03ZAT1L5AegUaxdrQw.png)

Fedora Security Spin

#### 8-[Pentoo Linux](https://pentoo.org/)

Pentoo Linux, siber güvenlik ve penetrasyon testleri için tasarlanmış bir Linux dağıtımıdır. Gentoo Linux tabanlı olan Pentoo, sızma testleri ve güvenlik değerlendirmeleri için birçok araç ve yazılım içerir. Pentoo, hem 32 bit hem de 64 bit sistemlerde çalışabilir ve canlı CD veya USB üzerinden kullanılabilir.

![](https://cdn-images-1.medium.com/max/800/1*2a-FUAUE-IgWrgQu4IY4GA.png)

Pentoo Linux

Pentoo Linux, özellikle siber güvenlik uzmanları ve araştırmacılar için ideal bir platformdır. Daha fazla bilgi veya yardıma ihtiyacınız olursa, buradayım!

---

### Adli Bilişim Dağıtımları

Genel olarak defansif tarafta ve adli bilişim amaçlı dağıtımlara bakalım.

#### 1-[Tsurugi Linux](https://tsurugi-linux.org/)

Tsurugi Linux, dijital adli tıp (DFIR) ve OSINT (Open Source Intelligence) araştırmaları için özel olarak tasarlanmış bir Linux dağıtımıdır. Bu dağıtım, Ubuntu 22.04.3 LTS tabanlıdır ve özelleştirilmiş bir 6.9.3çekirdeği kullanır. Tsurugi Linux, malware analizi, olaylara müdahale ve dijital kanıt toplama gibi görevler için kullanılabilir.

![](https://cdn-images-1.medium.com/max/800/1*WcOK1Za6fFtqHVcwOZFj5w.jpeg)

[Tsurugi Linux](https://tsurugi-linux.org/)

Tsurugi Linux, özellikle dijital adli tıp ve OSINT araştırmaları yapmak isteyenler için ideal bir platformdır.

#### 2- [Santoku Linux](https://github.com/santoku/Santoku-Linux)

Santoku Linux, mobil güvenlik, malware analizi ve dijital adli tıp (DFIR) araştırmaları için tasarlanmış bir Linux dağıtımıdır. Bu dağıtım, Android ve iOS gibi mobil platformlar üzerinde çalışan güvenlik araçlarını içerir ve kullanıcı dostu bir arayüze sahiptir. Santoku Linux, canlı CD veya USB üzerinden çalıştırılabilir ve sabit diske kurulamadan kullanılabilir.

![](https://cdn-images-1.medium.com/max/800/1*3NOMJEWXqqvokNUrrTr62w.jpeg)

Santoku Linux

Santoku Linux, özellikle mobil güvenlik ve dijital adli tıp araştırmaları yapmak isteyenler için ideal bir platformdır.

#### 3- CAINE Linux

CAINE Linux (Computer Aided Investigative Environment), Giovanni “Nanni” Bassetti tarafından geliştirilen bir İtalyan Linux dağıtımıdır. CAINE, dijital adli tıp (DFIR) ve olaylara müdahale (Incident Response) için tasarlanmıştır. Bu dağıtım, veri koruma, toplama, inceleme ve analiz gibi dijital adli tıp süreçlerini gerçekleştirmek için gereken tüm araçları bir araya getirir.

![](https://cdn-images-1.medium.com/max/800/1*QQluwIM94H2dUgXH6TR8WA.jpeg)

CAINE Linux

CAINE Linux, dijital adli tıp uzmanları için güçlü bir araçtır.

#### 4-[REMnux](https://docs.remnux.org/)

REMnux (Reverse Engineering Malware Linux), kötü amaçlı yazılımların analizine ve tersine mühendislikine yönelik bir Linux dağıtımıdır. Bu dağıtım, kötü amaçlı yazılımları incelemek ve analiz etmek için önceden yüklenmiş birçok araç ve yazılım içerir. REMnux, özellikle güvenlik uzmanları ve araştırmacılar için ideal bir platformdır.

![](https://cdn-images-1.medium.com/max/800/1*dQk2J0VsBRiE0r_NXB_vCA.jpeg)

REMnux

REMnux, kötü amaçlı yazılımların analizinde ve güvenlik araştırmalarında kullanılan güçlü bir araçtır. Daha fazla bilgi veya yardıma ihtiyacınız olursa, buradayım!

#### 5-[FLAREVM](https://github.com/mandiant/flare-vm)

FLAREVM (FireEye Labs Reverse Engineering VM), FireEye tarafından geliştirilen ve Windows tabanlı bir tersine mühendislik ve zararlı yazılım analizi için kullanılan bir sanal makine dağıtımıdır. FLARE VM, birçok popüler güvenlik aracını ve yazılımını içerir ve kullanıcıların tersine mühendislik ve malware analizi yapmalarına yardımcı olur.

![](https://cdn-images-1.medium.com/max/800/1*h14mVtflvvT08Rbz52ZQiA.png)

FLAREVM

FLARE VM, güvenlik uzmanları ve araştırmacılar için güçlü bir araçtır. Daha fazla bilgi veya yardıma ihtiyacınız olursa, buradayım!

#### 6-[Security Onion](https://securityonionsolutions.com/)

Security Onion, bir ağ güvenliği ve olay izleme platformudur. Bu platform, ağ trafiğini izlemek, tehditleri tespit etmek ve güvenlik olaylarına yanıt vermek için kullanılır. Security Onion, Elasticsearch, Logstash, Kibana (ELK Stack) gibi araçlarla birlikte gelir ve Snort, Suricata, Bro, Wazuh, Sguil, Squert, CyberChef, NetworkMiner gibi birçok güvenlik aracını içerir.

![](https://cdn-images-1.medium.com/max/800/1*TvipQFtDzN0-MiAj55ypdw.png)

Security Onion

Security Onion, özellikle büyük ölçekli ağlarda güvenlik izleme ve tehdit analizi yapmak isteyenler için ideal bir platformdır.

#### 7-[CSI Linux](https://csilinux.com/)

CSI Linux, dijital adli tıp (DFIR) ve siber güvenlik araştırmaları için tasarlanmış bir Linux dağıtımıdır. CSI Linux, önceden yüklenmiş birçok araç ve yazılım ile birlikte gelir ve kullanıcıların dijital kanıt toplama, malware analizi ve ağ araştırmaları gibi görevleri gerçekleştirmelerine yardımcı olur.

![](https://cdn-images-1.medium.com/max/800/1*Ls3qjzmN_MJbJ9WGpDJyFw.png)

CSI Linux

#### 8-[Network Security Toolkit](https://www.networksecuritytoolkit.org)

Network Security Toolkit (NST), Fedora tabanlı bir Linux dağıtımıdır ve ağ güvenliği ve analiz araçları içerir](<https://www.networksecuritytoolkit.org/>). NST, ağ trafiğini izlemek, tehditleri tespit etmek ve güvenlik olaylarına yanıt vermek için tasarlanmıştır](<https://www.networksecuritytoolkit.org/>). Bu dağıtım, birçok popüler açık kaynaklı ağ güvenlik aracını içerir ve kullanıcı dostu bir web kullanıcı arayüzü (WUI) sunar](<https://www.networksecuritytoolkit.org/>).

![](https://cdn-images-1.medium.com/max/800/1*p6-f-z4SqaWqmgRfF9X-FQ.png)

NST

NST, özellikle ağ güvenliği uzmanları ve yöneticiler için ideal bir platformdır.

---

### Anonimleştirme Dağıtımları

Anonimleştirme ve gizlilik için kullanılan dağıtımlarda mevcuttur. Bunlara bakalım.

#### **1-** [**Tails**](https://tails.net/)

Tails(The Amnesic Incognito Live System), anonim ve gizlilik odaklı bir Linux dağıtımıdır. İnternet trafiğinizi şifreler ve kullanıcı verilerinizi korur.

#### **2-**[**Whonix**](https://www.whonix.org/)

Whonix, anonimliği ve güvenliği artırmak için KVM veya VirtualBox sanal makinelerinde çalışır.

#### **3-** [**Qubes OS**](https://www.qubes-os.org/)

Qubes OS, güvenlik odaklı bir dağıtımdır ve kullanıcı verilerini ve işlemlerini yalıtır.

---

### Lab Ortamları

Pentest pratikeri ve eğitimler için kullanılan lab ortamlarına bakalım.

#### 1- [**BloodHound**](https://github.com/BloodHoundAD/BloodHound)

BloodHound, Active Directory (AD) ortamlarında gizlenmiş ve genellikle planlanmamış ilişkileri ortaya çıkarmanıza yardımcı olan bir tek sayfa JavaScript web uygulamasıdır. Bu uygulama, Linkurious üzerine inşa edilmiş, Electron ile derlenmiş ve Neo4j veritabanına bağlanmıştır. BloodHound, AD veya Azure ortamlarında gizli ilişkileri ve potansiyel saldırı yollarını gösterir.

![](https://cdn-images-1.medium.com/max/800/1*RMLb-YKHxEx1C-4yu2jqIA.jpeg)

BloodHound

BloodHound, AD ortamlarında güvenlik analizlerinde ve saldırı yollarının belirlenmesinde kullanılan güçlü bir araçtır.

#### 2- [GOAD](https://github.com/Orange-Cyberdefense/GOAD)

GOAD (Game of Active Directory), Orange Cyberdefense tarafından geliştirilen ve GitHub’da bulunan bir projedir. GOAD, Active Directory (AD) ortamlarında sızma testleri ve güvenlik analizleri yapmak için tasarlanmış bir laboratuvar projesidir. Bu proje, pentesterlere AD ortamlarında yaygın saldırı tekniklerini pratik yapmalarını sağlar.

![](https://cdn-images-1.medium.com/max/800/1*yjYePcnjHde7j2BchrLHJQ.jpeg)

GOAD

GOAD, sızma testleri ve güvenlik analizlerinde kullanılan güçlü bir araçtır. Daha fazla bilgi veya yardıma ihtiyacınız olursa, buradayım!

#### 3- [DetectionLab](https://detectionlab.network/)

DetectionLab, bir Active Directory (AD) ortamını kurmak ve güvenlik araçlarıyla birlikte güvenlik izleme yapmak için tasarlanmış bir laboratuvar projesidir. Bu proje, \*\*Packer, Vagrant, PowerShell, Ansible ve Terraform\*\* gibi araçlar kullanılarak otomatikleştirilmiştir. DetectionLab, Windows tabanlı bir AD ortamını kurar ve güvenlik izleme ve analiz araçlarını içerir.

![](https://cdn-images-1.medium.com/max/800/1*GLWv6E89EmKwP433ItVOOA.png)

DetectionLab

DetectionLab, savunma odaklı güvenlik uzmanları için hızlı bir AD ortamı kurma ve güvenlik araçlarını kullanma imkanı sunar.

#### 4- [Attack Range](https://github.com/splunk/attack_range)

Splunk Attack Range, Splunk Threat Research Team tarafından geliştirilen ve GitHub’da bulunan açık kaynaklı bir proje olarak, \*\*güvenlik tehditlerini ve saldırılarını simüle eden yerel veya bulut ortamlarını oluşturmanıza\*\* olanak tanır. Bu ortamlar, Splunk örneğine tehdit veri analizlerini toplar ve bu verileri kullanarak tehdit tespiti kurallarını geliştirmenize yardımcı olur.

![](https://cdn-images-1.medium.com/max/800/1*FUPaCLyHG9iewygx0sVMmQ.png)

Attack Range

Splunk Attack Range, güvenlik uzmanları ve araştırmacılar için güçlü bir araçtır.

#### 5- [BlueTeam.Lab](https://github.com/op7ic/BlueTeam.Lab?tab=readme-ov-file)

BlueTeam.Lab, op7i tarafından geliştirilen ve GitHub’da bulunan bir proje olarak, Terraform ve Ansible kullanarak Azure’da kurulan bir Blue Team (savunma ekibi) tespit laboratuvarıdır\*\*. Bu laboratuvar, red (saldırı) ve blue (savunma) ekibin, çeşitli saldırı tekniklerini test etmek ve forensik kanıtları analiz etmek için kullanılabilir.

![](https://cdn-images-1.medium.com/max/800/1*Ojyy49GIR4ytCjm48fQ87g.png)

BlueTeam.Lab

BlueTeam.Lab, savunma odaklı güvenlik uzmanları ve araştırmacılar için güçlü bir araçtır.

#### 6- [Vulnhub](https://www.vulnhub.com/)

Vulnhub, siber güvenlik uzmanları ve meraklıları için eğitim amaçlı hazırlanmış bir platformdur. İçinde birçok çeşitli zorluk seviyelerindeki sanal makineler bulunur. Bu sanal makineler, kullanıcıların siber güvenlik bilgilerini ve deneyimlerini geliştirmelerine yardımcı olur.

![](https://cdn-images-1.medium.com/max/800/1*zSdkBH7dSenG5D7dOrOswQ.png)

Vulnhub

Vulnhub, özellikle sızma testleri ve ağ güvenliği konularında pratik yapmak isteyenler için ideal bir kaynaktır. Daha fazla bilgi veya yardıma ihtiyacınız olursa, buradayım!

---

![](https://cdn-images-1.medium.com/max/800/1*sMFj24PKbkp3fYj2Cy3S6w.jpeg)

Bu yazımda siber güvenlik alanında kullanılan tüm dağıtımlara değinmeye çalıştım. Eksik kaldığım noktalar var ise yorum yazarak katkıda bulunabilirsiniz.