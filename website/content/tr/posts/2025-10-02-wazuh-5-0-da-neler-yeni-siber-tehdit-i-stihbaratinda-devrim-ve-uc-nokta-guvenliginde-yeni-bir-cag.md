---
date: '2025-10-02'
draft: false
title: Wazuh 5.0'da Neler Yeni? Siber Tehdit İstihbaratında Devrim ve Uç Nokta Güvenliğinde
  Yeni Bir Çağ
---

---

### Wazuh 5.0'da Neler Yeni? Siber Tehdit İstihbaratında Devrim ve Uç Nokta Güvenliğinde Yeni Bir Çağ

![](https://cdn-images-1.medium.com/max/800/0*EOeMobbpF6asHcmm)

[wazuh](https://wazuh.com/)

Wazuh, Host-Based Intrusion Detection System (HIDS) mirasını modern siber güvenlik ihtiyaçlarıyla birleştirerek, Güvenlik Bilgi ve Olay Yönetimi (SIEM) ve Genişletilmiş Tespit ve Yanıt (XDR) yeteneklerini tek bir platformda topladı. Wazuh 5.0, bu birleşimi bir üst seviyeye taşıyarak, özellikle büyük ölçekli ve yüksek hacimli ortamlarda stabilite, ölçeklenebilirlik ve tehdit istihbaratı konusunda çığır açan yenilikler sunuyor. Platform, tamamen açık kaynaklı olup, bileşenleri **GNU GPL v2** ve **Apache 2.0 (ALv2)** gibi açık kaynak lisanslarına tabidir.

---

### 1. Temel Bileşenler, Stabilite ve Dağıtık Mimari (CLUSTER)

#### Binlerce Agent’ı Yönetmek: Yüksek Erişilebilir (HA) Dağıtık Mimari

Günümüzün dinamik dijital ortamları, binlerce Agent’tan gelen olayları anlık olarak yönetmeyi gerektirir. Tek bir Manager mimarisi bu yükü kaldıramayacağı için, 500–1000+ Agent’a sahip üretim ortamları için temel önerilen yaklaşım **yatay ölçekleme (horizontal scaling)** üzerine kurulu dağıtık mimaridir.

#### **Önerilen Dağıtık Yapının Ana Bileşenleri:**

1. **Wazuh Manager Kümesi (Cluster):** İş yükünü dengelemek için birden çok Manager düğümü kullanılır. Yatay ölçeklenebilirliği sağlamak için Manager düğümleri arasında Agent anahtarları, özel dekoderler/kurallar ve Agent canlılık durumları sürekli senkronize edilir.
2. **Yük Dengeleyici (Load Balancer):** Agent’lar, yapılandırmalarını değiştirmeye gerek kalmadan tüm Manager düğümlerine rapor verecek şekilde Yük Dengeleyici arkasında konumlanır.
3. **Indexer Kümesi (OpenSearch):** Uzun süreli depolama, büyük hacimli log yönetimi ve uyumluluk gereksinimlerini karşılamak için kullanılır.

**Manager Performans Optimizasyonları:** Son sürümlerde, Manager’ın ölçeklenebilirlik ve performansını artırmak amacıyla çekirdek bileşenlerde optimizasyonlar yapılmıştır. Buna, büyük HTTP isteklerini desteklemek için iyileştirilmiş `wazuh-db` protokolü ve daha verimli eşzamanlı Agent kayıt isteklerini yönetmek için geliştirilmiş `Authd` bağlantı yönetimi dahildir. Bu iyileştirmeler, yüksek Agent sayılarının yönetilmesinde istikrarı güçlendirir.

Bileşenlerin (Manager, Indexer, Dashboard) farklı sunuculara kurulması (Multi-node), her bir iş yükünün izole edilmesini sağlayarak, yüksek olay hacimleri altında performans darboğazlarını engeller ve platform kararlılığını artırır.

#### Indexer Kümeleme (OpenSearch) ve Güvenli İletişim

Wazuh Indexer (OpenSearch) kümesinde, düğümlere roller atanarak kararlılık artırılır:

* **Veri Düğümleri (Data Nodes):** Veri düğümü, verileri depolamaktan ve aramaktan sorumludur. Tüm veriyle ilgili işlemleri (indeksleme, arama, toplama) yerel shard’lar üzerinde gerçekleştirir ve kümenin işçi düğümleridir. Kullanım durumuna bağlı olarak düğüm tiplerinin özelleştirilmesi (master-eligible, data, ingest) önerilir.

**Güvenli İletişim (TLS/Sertifikalar):** Wazuh, merkezi bileşenleri (Indexer, Filebeat ve Dashboard) arasında güven ve gizlilik sağlamak için sertifikalar kullanır. **Root CA sertifikası**, tüm düğümlerin kimliğini doğrular ve iletişim sırasında düğümün IP adresi veya DNS adı sertifikada yer almalıdır.

#### Wazuh Agent Değişiklikleri ve Eski OS Desteğinin Sonlanması

Wazuh Agent, Windows, UNIX, macOS, Solaris, AIX veya HP-UX gibi çeşitli uç noktalardan logları izlemek ve toplamak için tasarlanmış evrensel bir ajandır. Agent, ortalama **35 MB RAM** tüketimiyle kaynak kullanımını optimize etmek üzere verimli çalışır.

**Kritik Değişiklikler (Eski OS Desteğinin Sonlanması):** Wazuh 5.0.0 ile birlikte, Red Hat 5, CentOS 5, Oracle Linux 5, SUSE Linux Enterprise Server 11, Windows XP, Windows Vista, Windows Server 2003, Solaris, AIX ve HP-UX gibi bazı eski işletim sistemleri için Agent desteği **sona ermiştir**.

---

### 2. Yeni Gelen Özellikler ve Geliştirilmiş Modüller

#### Oyun Değiştirici Yenilikler: CTI ve Gelişmiş Zafiyet Tespiti

Wazuh 5.0'ın en büyük katkısı, mevcut HIDS yeteneklerini modernize ederek, platformun genel güvenlik duruşuna **SIEM ve XDR kabiliyetlerini birleştirerek** yapmasıdır.

**Öne Çıkan Yenilik: Genişletilmiş CTI Kapsamı:** Başlangıçta zafiyet istihbaratına odaklanan Wazuh Siber Tehdit İstihbaratı (CTI), 5.0 ile birlikte kapsamını ciddi ölçüde genişletiyor:

* **Saldırı Göstergeleri (IOC’ler):** IP adresleri, dosya karmaları (hash) ve URL’ler gibi kritik IOC’ler eklenecektir.
* **Doğrudan Kural Sağlama:** Tehdit tespit kuralları, platforma doğrudan ve güncel olarak Wazuh CTI platformundan sağlanacaktır.

#### Geliştirilmiş Zafiyet Tarayıcısı (Vulnerability Detector)

Zafiyet Tespit modülü, Agent’tan toplanan sistem envanter verilerini kullanarak çalışır ve bunları CTI platformundan alınan güncel zafiyet bilgileriyle ilişkilendirir.

**Doğruluk ve Veri Kaynakları:** CTI platformu, NVD, Microsoft Güvenlik Güncellemeleri (MSU) ve CISA gibi güvenilir güvenlik veri tabanlarından ve OS satıcılarından veri toplar. Özellikle Windows sistemlerinde, modül yama uygulanmış paketleri tespit etme yeteneğine sahiptir ve bu yamaların ilgili CVE’leri çözüp çözmediğini doğrulamak için Microsoft tarafından sağlanan bilgileri kullanarak envanterdeki zafiyetlerin durumunu güncelleyebilir.

#### eBPF Tabanlı FIM (Dosya Bütünlüğü İzleme) Avantajları

Dosya Bütünlüğü İzleme (FIM) modülü, Linux uç noktalarında **eBPF (Extended Berkeley Packet Filter)** desteği kazanmıştır ve bu özellik 5.0'da platformun merkezinde yer almaktadır.

**eBPF’nin Teknik Üstünlükleri:**

* **Verimlilik:** eBPF, dosya ve dizin değişikliklerini gerçek zamanlı tespit etmek için doğrudan kernel (çekirdek) içinde çalışır. Bu, Linux Audit sistemi gibi harici bağımlılıklara güvenmek yerine olay toplama işlemini hızlandırır.
* **Bağlam Yakalama (Who-Data):** eBPF, değişikliklerden sorumlu kullanıcı ve süreci (who-data) tanımlayarak daha gelişmiş bağlam yakalamayı sağlar.
* **Geri Dönüş (Fallback):** eBPF kullanılamadığında, Wazuh otomatik olarak Linux Audit sistemi veya inotify gibi geleneksel sistemlere geri döner.

---

### 3. Kural Yazımı, Analiz ve Alerting Mekanizmaları

#### Kural Seti Optimizasyonu

Özel kural yazımında sistem kurallarıyla çakışmayı önlemek için **100000 ile 120000** arasındaki kimlik numaralarını kullanmak kritik öneme sahiptir.

#### MITRE ATT&CK Çerçevesi ile Kural Zenginleştirme

Wazuh, MITRE ATT&CK çerçevesi ile entegre bir yapı sunar ve ürettiği uyarıları standartlaştırılmış siber saldırı taktikleri ve teknikleri (TTP’ler) ile otomatik olarak eşleştirir. Kural yazımında `<mitre>` etiketi kullanılarak, kuralın tetiklediği uyarıya özgü MITRE Teknik Kimlikleri (Technique IDs) eklenerek kural zenginleştirilebilir.

#### **Örnek MITRE ATT&CK Kural Eşleştirmesi (.xml):**

```
<group name="syslog,sshd,">  
  <rule id="100011" level="10" frequency="5" timeframe="60">  
    <if_matched_sid>5710</if_matched_sid>  
    <same_source_ip />  
    <description>Multiple SSH failed attempts from same source IP (Brute Force Detected).</description>  
    <mitre>  
      <tactic>Initial Access</tactic>  
      <technique>T1110</technique>  
      <id>T1110</id>  
    </mitre>  
  </rule>  
</group>
```

#### Örnek Kural ve Alerting Senaryoları

#### Hata Eşiği Tespiti:

Manager’ın korelasyon yeteneği, belirli bir süre içinde tekrarlanan olayları sayan kural mekanizmasıyla kritik eşik tespiti sağlar. Örneğin, 60 saniye içinde tekrarlanan 5 başarısız SSH denemesini tespit eden bir kural, yöneticilere yönelik yüksek seviyeli bir uyarı (Alerting) oluşturabilir.

#### Kritik FIM Tespiti (Yüksek Seviyeli Uyarı):

Özel kural yazımı ile FIM olaylarını belirli bir dizinle (örneğin /etc/security/) ve belirli bir kullanıcıyla (root kullanıcısı) ilişkilendirmek mümkündür. Özel bir kural (seviye 10+), bu dizinde yalnızca root tarafından yapılan dosya değişikliğini tespit eden spesifik bir filtreleme yaparak kritik sistem dosyalarının korunmasını sağlar.

---

### 4. Active Response (Aksiyonlar) ve Aksiyon Örnekleri

Active Response modülü, tehdit tespiti ve yanıt için işlenmiş log verilerini kullanır. Modül, güvenlik ekiplerinin yüksek önemdeki olaylara anında müdahale etmesini sağlar. Wazuh, bu süreçleri otomatikleştirmek için kullanıma hazır (out-of-the-box) komut dosyaları sunar.

Bu otomatik yanıt aksiyonları, aşağıdakiler dahil olmak üzere geniş bir yelpazeyi kapsar:

* **IP Bloklama:** Kötü amaçlı ağ erişimini engelleme. (`firewall-drop` scripti).
* **Host İzolasyonu:** Güvenliği ihlal edilmiş uç noktaları, tehdidin yayılmasını önlemek amacıyla ağdan izole etme.
* **Zararlı Dosya Silme/Hash Bloklama:** İzlenen uç noktalarda tespit edilen kötü amaçlı dosyaları silme veya karantinaya alma.
* **Hesap Devre Dışı Bırakma:** Şüpheli oturum açma girişimlerinden sonra kullanıcı hesaplarını devre dışı bırakma. (`disable-account` scripti).

**Manager Üzerindeki Yük:** Active Response, komut dosyalarını Agent’lar üzerinde çalıştırdığı için (genellikle `location: local`), aksiyon yükü Agent'lara dağıtılır. Bu, Manager üzerindeki yükü minimize eder.

#### Örnek Aksiyon Senaryosu (Firewall Engelleme)

Yüksek seviyeli bir uyarı (örneğin Rule ID 5712) tetiklendiğinde, kurala eşlenen IP adresini geçici olarak engellemek için Manager yapılandırmasına (ossec.conf) aşağıdaki tanım eklenebilir:

```
<active-response>  
  <command>firewall-drop</command>   
  <location>local</location>   
  <rules_id>5712</rules_id>   
  <timeout>1800</timeout>   
</active-response>
```

Bu yapılandırma, `firewall-drop` komutunu kullanarak, olayı bildiren Agent üzerinde tetiklenen IP adresini 1800 saniye boyunca yerel güvenlik duvarında geçici olarak engeller.

---

### 5. Uyumluluk (Compliance), OSSEC ve OpenSearch İlişkisi

#### Yasal Uyumluluk (Compliance) ve SCA Gelişmeleri

Wazuh, otomasyon, log analizi ve olay müdahalesi sağlayarak yasal uyumluluğa destek olur. Wazuh’un varsayılan kural seti, aşağıdaki kritik düzenleyici uyumluluk standartlarına destek sunar: **PCI DSS, HIPAA, NIST 800–53, TSC, GDPR**.

**SCA Modülünün Rolü ve Yeni Politikalar:** **Security Configuration Assessment (SCA)** modülü, yapılandırmaların güvenlik politikalarına uygunluğunu periyodik olarak kontrol eder. Wazuh, **Distribution Independent Linux** için yeni SCA politikaları oluşturulmasına olanak tanıyarak, Linux dağıtımından bağımsız sertleştirme politikalarının yaygınlaştırılması anlamına gelir.

**Wazuh Dashboard Uyumluluk Panoları:** Wazuh Dashboard, PCI DSS, GDPR, HIPAA ve NIST 800–53 gibi düzenleyici uyumluluk standartları için **kullanıma hazır (out-of-the-box) panolar** sunar. Ayrıca, Dashboard’un kullanıcı deneyimini (UX) baştan sona iyileştirmek ve 5.0'ın getirdiği yeni özellikleri tam olarak desteklemek amacıyla kapsamlı bir yeniden tasarım sürecinden geçtiği bilinmektedir.

#### OSSEC/XDR Birleşimi ve Indexer Stabilizasyonu

Wazuh 5.0, HIDS açısından OSSEC’in temel yeteneklerini (FIM, Log Analizi) modernize ederek XDR ve SIEM özellikleriyle birleştirmiştir.

Indexer bileşeni, işlenmiş log verilerinin depolanmasında ve arşivlenmesinde kritik bir rol oynar. Indexer’ın uzun süreli depolama kapasitesi, **PCI DSS (Gereksinim 10)** gibi standartlar tarafından zorunlu kılınan uzun süreli log saklama ve uyumluluk denetim raporlama gerekliliklerinin karşılanmasına yardımcı olur. Wazuh, v4.6 sonrası eski entegrasyon uygulamalarından uzaklaşarak, OpenSearch ve diğer üçüncü taraf platformlarla (Splunk, Elastic) entegrasyonu doğrudan Indexer veya Server üzerinden yapma stratejisine odaklanmıştır.

---

### Sonuç

Wazuh 5.0, sadece bir sürüm yükseltmesi değil, siber güvenlik platformunun olgunluğunu gösteren stratejik bir ilerlemedir. Genişletilmiş Siber Tehdit İstihbaratı (CTI) ile tehditlere karşı daha derin bir görünürlük sunarken, yatay ölçeklenebilir mimarisi ile günümüzün binlerce Agent’lık yüksek hacimli ortamlarına kararlılık ve yüksek erişilebilirlik (HA) getiriyor. Ayrıca, eBPF tabanlı FIM gibi teknik optimizasyonlar performansı artırmakta ve Active Response otomasyonu, olay müdahale süreçlerini hızlandırmaktadır. Kuruluşlar, 5.0 ile birlikte gelen yenilikleri kullanarak güvenlik duruşlarını güçlendirebilir ve yasal uyumluluk yükümlülüklerini daha etkin bir şekilde yönetebilirler.