---
title: "Debian ELK Stack(Elasticsearch, Logstash ve Kibana) Kurulumu ve Konfigürasyonu"
date: 2024-11-05
draft: false
---

---

### Debian ELK Stack(Elasticsearch, Logstash ve Kibana) Kurulumu ve Konfigürasyonu

![](/images/1_0wM3nsUfgol-TsAFYBZJzQ.png)

Merhaba bu yazımda Debian tabanlı linux dağıtımları üzerine ELK Stack kurulumu ve konfigürasyonunu anlatacağım.

### ELK Stack Nedir?

ELK Stack, log yönetimi ve analiz alanında sıkça kullanılan açık kaynaklı bir platformdur. Adını oluşturan üç ana bileşenden oluşur: Elasticsearch, Logstash ve Kibana.

![](/images/1_Bp8Ab2mZiMAygbxDYEqFmQ.png)

ELK Stack

* **Elasticsearch:** Büyük miktarda yapılandırılmış ve yapılandırılmamış veriyi depolamak, indekslemek ve hızlı bir şekilde arama yapmak için kullanılan bir arama ve analiz motorudur. Log verilerinin yanı sıra çeşitli kaynaklardan gelen verileri de indeksleyebilir.
* **Logstash:** Veri toplama, işleme ve dönüştürme süreçlerini yöneten bir araçtır. Farklı kaynaklardan (sistem logları, uygulama logları, ağ trafiği vb.) gelen verileri toplar, filtreler, zenginleştirir ve Elasticsearch’e gönderir.
* **Kibana:** Elasticsearch’te depolanan verileri görselleştirmek için kullanılan bir araçtır. İnteraktif dashboardlar, grafikler ve haritalar oluşturarak verilerden anlamlı sonuçlar çıkarmayı sağlar.

Elastic Stack ürünlerinin kurulum sırası:  
 1- **Elasticsearch**  
 2- **Kibana**  
 3- **Logstash**

İlk olarak kurulumu yapacağımız ortamı hazırlamamız gerekiyor. Bunun için elimizde bir işletim sistemi olması gerekiyor.

### Debian Nedir?

Debian, 1993 yılında başlatılmış, Dünya’nın çeşitli bölgelerindeki gönüllüler tarafından hazırlanan; GNU/Hurd, GNU/Linux gibi farklı çekirdek seçeneklerine dayalı tamamen özgür bir Linux dağıtımıdır. Bazı popüler debian tabanlı linux dağıtımları:

* **Ubuntu**
* **PureOS**
* **antix**
* **Derin**
* **PopOS**!
* **MX Linux**
* **Linux Mint**
* **Kali Linux**
* **Pardus**

Debian ailesinin bazı üyelerini burada saydık. ELK stack’i bunun dışında **Windows**, **Macos** veya **Redhat** tabanlı veya bağımsız diğer linux dağıtımları üzerine de kurabilirsiniz. Ben bu yazımda bir **ubuntu** makine üzerine kurulum yapacağım. Ancak aynı kurulum admları diğer debian tabanlı dağıtımlar içinde geçerlidir.

---

### 1- Ön Hazırlık

İlk olarak kurulum yapacağımız sistemin bilgilerine bakalım ve güvenlik sebebiyle dağıtımın son sürüm olmasına dikkat edelim.

![](/images/1_pw90BcHIGlE5VaK1ZZuUVw.png)

Kurulum yaptığım ubuntu dağıtımının versyon bilgileri.

Ben mevcut sunucuma hostname olarak “elastic” ismini verdim ve kendime “superman” isminde yetkili bir kullanıcı oluşturdum.

Ardından sistemimizdeki güncelleştirmeleri yapalım. Her kurulumdan önce bu güncelleştirmeleri yapmamız bağımlılıklardan kaynaklanan olası hataları en aza indirmemizi sağlar.

> sudo apt update && sudo apt upgrade

![](/images/1_RmnuJn-ue_IxM-v_HVKbiw.png)

Paket güncelleştirmeleri

Son olarak makinemizin yeterli kaynağa sahip olduğundan emin olmalıyız. Yani yeterli disk, ram ve CPU’ya sahip olmalı. Bu sizin gereksinimlerinize göre değişecektir.

---

### 2- **Elasticsearch Kurulumu**

Elasticsearch kurulumu için ilk olarak debian paketini indirmemiz lazım.

![](/images/1_AceB4HkqR-_Vhu5jPvDkiw.png)

wget ile elasticsearch debian paketinin indirme işlemi

```
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.15.3-amd64.deb
```

wget aracını kullanarak indirme işlemini gerçekleştirebiliriz.

Ardından debianın paket kurulum aracı olan dpkg ile kurulum işlemini gerçekleştirelim. Kurulum için root yetkisine ihtiyacımız var.

![](/images/1_juhgX_jliDWJaXNGhR2_RA.png)

Elasticsearch kurulum

```
sudo dpkg -i elasticsearch-8.15.3-amd64.deb
```

Kurulum sonunda bize kuruluma nasıl devam etmemiz gerektiği hakkında öneriler sunuyor.

![](/images/1_9iK82eWFRbtdDSDV_HxY1A.png)

Kurulum sonrası adımlar

Buradan da hareketle kurulum sonrası adımlara devam edelim. İlk olarak servisimizi başlatalım.

```
sudo systemctl daemon-reload  
sudo systemctl enable elasticsearch.service  
sudo systemctl start elasticsearch.service
```

Journalctl komutunu kullanarak servisin durumu hakkında bilgi edinebiliriz.

![](/images/1_iiD9Azwdmg2h8zAxXbyjsg.png)

journalctl ile servis durumu inceleme

Şimdi elasticsearch arayüzüne erişmemizi sağlayan varsayılan yetkili kullanıcı olan “elastic” kullanıcısının şifresini sıfırlayalım. Burada istediğimiz şifreyi verebiliriz.

```
sudo /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic -i
```

![](/images/1_5z1Fz-4kByoU9dcWfWWOiQ.png)

elastic kullanıcısı parola sıfırlama

Şimdi sıra kibana bağlantısında kullanacağımız tokenı üretmeye geldi.

```
sudo /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```

![](/images/1_J94WTHXjHFlwjNDD7PQXbg.png)

kibana bağlantısı için token üretme

Bu tokenı dikkatli bir şekilde saklamalıyız. İleride kibana bağlantısı yapmak için kullanacağız.

Son olarak sistemimizin firewalı üzerinde elasticsearch portunu açmamız gerekiyor.

```
sudo ufw allow 9200
```

![](/images/1_HyY2hwiWpzI2Nq7KMoOY_A.png)

Firewall port açma işlemi

Şimdi sistemimiz bulunduğu networke elasticsearch servisini yayınlıyor. Browser üzerinden erişebiliriz.

> https://<host-ip>:9200

![](/images/1_DKO6wjEJvGNu288erqcVww.png)

Browser üzerinden erişim

Burada kullanıcı adı olarak elastic ve şifre olarak önceki adımlarda belirlediğiniz şifreyi girerek elasticsearche erişebilirsiniz.

---

### 2- Kibana Kurulumu

Kibana kurulumu için ilk olarak debian paketini indirmemiz lazım.

![](/images/1_86bu_iqDIMsOtPeqFpDM9Q.png)

wget ile elasticsearch debian paketinin indirme işlemi

```
wget https://artifacts.elastic.co/downloads/kibana/kibana-8.15.3-amd64.deb
```

wget aracını kullanarak indirme işlemini gerçekleştirebiliriz.

Ardından debianın paket kurulum aracı olan dpkg ile kurulum işlemini gerçekleştirelim. Kurulum için root yetkisine ihtiyacımız var.

![](/images/1_3mmYQBaOZcZ5dL7QllEQjw.png)

Kibana kurulum

```
sudo dpkg -i kibana-8.15.3-amd64.deb
```

Kurulum tamamlandıktan sonra kibana konfigürasyonlarına başlayabiliriz. Bunun için kibananın konfigürasyon dosyasını nano ile açıyoruz.

```
sudo nano /etc/kibana/kibana.yml
```

![](/images/1_2wmFBqMb-196gT4FAxSJHQ.png)

kibana.yml dosyası

Burada sadece değiştirilmesi gereken yerleri göstereceğim.

![](/images/1_xXYvST90ltTvpnbTtpGllw.png)

server.port

server.port alanının önündeki # işaretini silip tırnaklar içine kibana servisinin çalışmasnı istediğiniz portu yazın. Varsayılan olarak 5601'dir.

![](/images/1_lh2yAPGIeDqfd3g6q1yqXA.png)

server.host

server.host alanının önündeki # işaretini silip tırnaklar içine kendi sisteminizin IP adresini yazın.

![](/images/1_QDnnLo2LEY-j6UHLc3H2tg.png)

server.name

server.name alanının önündeki # işaretini silip tırnaklar içine kendi sisteminizin hostname’ini yazın. Benimki “elastic” olduğu için onu yazdım.

![](/images/1_nIirHOJJZRFIMoT2nfCv6Q.png)

elasticsearch.hosts

kibananın bağlanacağı elasticsearch servisi. Bu serviside aynı makineye kurduğum için localhost kalabilir. Farklı bir host olsaydı onun IPsini yazmam gerekirdi. Ayrıca başdaki protokolü “https” olarak değiştirmeyi gözden kaçırmayalım.

![](/images/1_qTZgYDVXyheJ8YX8firPEg.png)

elasticsearch token bağlantısı

kibana elasticsearch bağlantısındaki kimlik doğrulama için 2 yol sunuyor. Bunlardan biri kullanıcı adı ve parola ile doğrulama diğeri ise bizim kullanacağımız token ile doğrulama. Hatırlarsanız elasticsearch kurulumu esnasında bir token oluşturmuştuk. Bu tokenı tırnak işaretleri arasına giriyoruz.

![](/images/1_Gsnn46-BQ3AWc43sEMAiHQ.png)

ssl.verification

elasticsearch’un kullandığı sertifika self-signed olduğu için herhangi bir otorite tarafından doğrulanmamıştır. Bu durum kibana ile bağlantısında ssl doğrulama hatası almamıza yol açar. Bu hatadan kaçınmak için ssl.verification alanını “none” yapıyoruz. Veya doğrulanmış bir ssl sertifikası yükleyebilirsiniz.

Temelde gerekli yapılandırmalarımız bu kadar. Diğer alanları ayarlamak için kibananın dokümanlarını inceleyebilirsiniz. Ben geri kalanı için varsayılan yapılandırmalarla devam ediyorum.

Şimdi servisimizi başlatalım.

```
sudo systemctl daemon-reload  
sudo systemctl enable kibana.service  
sudo systemctl start kibana.service
```

Journalctl komutunu kullanarak servisin durumu hakkında bilgi edinebiliriz.

![](/images/1_1_rsonaVsKsxze1R0baGYg.png)

kibana servisinin başlatılması

Son olarak kibananın kullandığı 5601 portunu sistem firewallından açıyoruz.

```
sudo ufw allow 5601
```

![](/images/1_A37mSKxxkscotaC3ebJnrQ.png)

Port Açma İşlemi

şimdi browserınız üzerinden kibana paneline erişebilirsiniz.

> https://<host-ip>:5601/

Kibananın ayağa kalkması biraz uzun sürebilir.

![](/images/1_RyBvS-VDY3UCca5O0DYwVw.png)

kibana paneli

Kibana panelimiz göründü. “elastic” kullanıcı ile bu panele giriş yapabilirsiniz. Biz kurulumlara devam edelim.

---

### 3- Logstash Kurulumu

Logstash kurulumu için ilk olarak debian paketini indirmemiz lazım.

![](/images/1_tA9E8Yt9URg678EjB31jxw.png)

wget ile logstash paketini indirme işlemi

```
wget https://artifacts.elastic.co/downloads/logstash/logstash-8.15.3-amd64.deb
```

Ardından debianın paket kurulum aracı olan dpkg ile kurulum işlemini gerçekleştirelim. Kurulum için root yetkisine ihtiyacımız var.

![](/images/1_NjLTqnfQa1SiyzhxR9iD4A.png)

logstash kurulum işlemi

```
sudo dpkg -i logstash-8.15.3-amd64.deb
```

Kurulum tamamlandıktan sonra konfigürasyonlara başlayabiliriz.

ilk olarak elasticsearch bağlantısı için logstash\_system kullanıcısına şifre verelim. bu şifreyi unutmayın

```
sudo /usr/share/elasticsearch/bin/elasticsearch-reset-password -u logstash_system -i
```

![](/images/1_9DZhN0vdF_SVqx7PQ7XzjA.png)

logstash\_system kullanıcısı şifre belirleme

ardından logstashin konfigürasyon dosyasını açıp düzenleyelim.

```
sudo nano /etc/logstash/logstash.yml
```

![](/images/1_mxiT9gqvMZzk0-UAUrdVDg.png)

logstash.yml dosyası

Bu dosyada verdiğimiz string değerleri tırnak içine almayı unutmayın.

Artık logstash servisini başlatabiliriz.

![](/images/1_4dOXa3frSYz4B_PZ4kpjYA.png)

logstash servisi başlatma

```
sudo systemctl daemon-reload  
sudo systemctl enable logstash.service  
sudo systemctl start logstash.service
```

Son olarak logstashin varsayılan portu olan 5044 portunu sistemimizde açıyoruz.

![](/images/1_Dx8ZAvD-yDQbhtg8LI0-RQ.png)

Port açma işlemi

```
sudo ufw allow 5044
```

Logstashe elasticsearch veya kibanada olduğu gibi browser üzerinden erişemeyiz. Çünkü logstash 5044 portundan log almakta ve kuyruklamaktadır. Yani herhangi bir cevap vermemektedir.

İlk pipeline’ımızı yapılandıralım!

![](/images/1_DXhxcdqUi6XyHxgqB8Zonw.png)

```
/usr/share/logstash/bin/logstash -e 'input { stdin { } } output { stdout {} }'
```

![](/images/1_Kk9b336oR1cUIE-FWJPYfA.png)

logstash pipeline oluşturma

![](/images/1_T-DI81u4d3jc5zpCW_tX9A.png)

Girdi için hazır

pipeline’ımız 5044 portuna gelecek loglar içn dinlemede ve hazır.

logstash ile çeşitli parserlar yazıp loglarınızı parse edebilirsiniz.

---

Bu yazımda ELK stack kurulumuna değindim. Birdahaki yazımda ELK’ya log gönderme, ajan kurulumu ve log parselamaya değineceğim. Yayınladığım yazılardan haberdar olmak için beni takip edebilirsiniz.