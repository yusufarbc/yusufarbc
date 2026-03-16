---
date: '2024-11-08'
draft: false
title: ELK Stack Log Yönetimi ve Analizi
---

---

### ELK Stack Log Yönetimi ve Analizi

![](https://cdn-images-1.medium.com/max/800/1*O7bMqTbQv_OX5x75qkY6Ug.png)

Merhaba bu yazımda, geçen yazımda kurulumunu yaptığımız ELK Stack’in log yönetimini, yani log toplama, parse etme ve zenginleştirme işlemlerine değineceğim. Logstash ile loglar Nasıl Toplanır, İşlenir ve Gönderilir?

### Log Yönetimi Nedir?

**Log yönetimi**, bir sistemin veya uygulamanın ürettiği tüm günlük kayıtlarını (logları) toplama, depolamak, analiz etmek ve yönetmek sürecidir. Bu loglar, sistemin çalışmasıyla ilgili önemli bilgiler içerir ve sorun giderme, güvenlik analizi, performans takibi gibi birçok alanda kullanılır.

ELK Stack (Elasticsearch, Logstash, Kibana) ile log toplama yöntemleri:

1. **Syslog**: UNIX tabanlı sistemlerde yaygın olan bu protokol ile Logstash veya Beats aracılığıyla log toplanabilir.
2. **Beats**: Log toplama için farklı araçlar sunar. **Metricbeat** performans metriklerini toplarken, **Winlogbeat** Windows olaylarını toplar. **Heartbeat** ise sunucuların durumunu izler. .**Filebeat** ise dosya sistemlerinden log dosyalarını toplar ve bu verileri Logstash veya Elasticsearch’a gönderir. Herbirinin ayrı kurulumu gerekmektedir.
3. **Agent Kurulumu**: Log kaynağı olan sistemlere (sunucular, ağ cihazları vb.) agent kurulumu yapılır ve bu agentlar Logstash veya Beats’e veri gönderir.

**Agent Kurulumu Avantajları:**

1. **Merkezi Yönetim**: Log verilerini toplamak ve yönetmek için merkezi bir nokta sağlar. Bu, log verilerinin düzenli bir şekilde saklanmasını ve analiz edilmesini kolaylaştırır.
2. **Gerçek Zamanlı İzleme**: Agentlar, olayları gerçek zamanlı olarak izleyebilir ve anında raporlama yapabilir. Bu, anormallikleri hızlı bir şekilde tespit etmeyi sağlar.
3. **Özelleştirilebilirlik**: Agentlar, belirli gereksinimlere göre yapılandırılabilir. Farklı kaynaklardan gelen log verilerini toplamak ve dönüştürmek için çeşitli kurallar ve filtreler uygulayabilirsiniz.
4. **Gelişmiş Güvenlik**: Agentlar, log verilerinin güvenli bir şekilde iletilmesini sağlamak için şifreleme protokollerini destekler.
5. **Performans İzleme**: Agentlar, sistem performansını izlemek ve performans sorunlarını tespit etmek için kullanılabilir.

**Agent Kurulumu Dezavantajları:**

1. **Kaynak Kullanımı**: Agentlar, kurulu oldukları sistemlerde kaynak tüketimi yaratabilir. Bu, özellikle yüksek yoğunluklu sistemlerde performans sorunlarına neden olabilir.
2. **Yönetim Karmaşıklığı**: Birden fazla agentın yönetimi, özellikle büyük ölçekli sistemlerde karmaşık olabilir. Her bir agentın güncellenmesi ve yönetilmesi zaman alıcı olabilir.
3. **Güvenlik Riskleri**: Yanlış yapılandırılmış agentlar, güvenlik açıklarına neden olabilir. Bu nedenle, agentların güvenli bir şekilde yapılandırılması ve yönetilmesi önemlidir.
4. **Uyumluluk Sorunları**: Farklı sistemler ve platformlar arasında uyumluluk sorunları yaşanabilir. Bazı agentlar, belirli sistemlerde tam işlevselliğe sahip olmayabilir.

Biz bu yazımızda bir linux sistemden beats ile log gönderim ve logstash ile log toplama yapacağız.

---

### 1- Logstash Yapılandırması

Logstash’ı bir boru hattı olarak hayal ettiğinizde anlamak daha kolaydır. Bu boru hattının bir ucunda veri kaynaklarını temsil eden **girdiler** bulunur. Günlük kayıtları Logstash boru hattından geçerken, gereksinimlerinize göre zenginleştirilebilir, filtrelenebilir veya manipüle edilebilir. Nihayetinde, boru hattının sonuna ulaştıklarında, Logstash bu günlükleri depolama veya analiz için yapılandırılmış hedeflere teslim edebilir.

![](https://cdn-images-1.medium.com/max/800/1*sf3D7DyNWppst-cVl_z42g.png)

Logstash Boru Hattı

Bu veri işleme işlem hattını oluşturmak için Logstash’ı bir yapılandırma dosyası kullanarak yapılandırabilirsiniz. Tipik bir logstash yapılandırma dosyası:

```
input {  
      plugin_name{...}  
 }  
  
filter {  
     plugin_name{...}  
}  
  
output {  
     plugin_name{...}  
}
```

Şimdi bu bileşenleri inceleyelim:

* `input`: dosyalar veya uç noktalar gibi log kaynaklarını temsil eder.
* `filtre`(isteğe bağlı): log kayıtlarını birleştirir ve dönüştürür.
* `çıktı`: işlenen logların iletileceği hedef.

Bu girdilerin, filtrelerin ve çıktıların rollerini yerine getirebilmeleri için eklentilere ihtiyaçları vardır. Bu eklentiler Logstash’ı güçlendiren ve çok çeşitli görevleri yerine getirmesini sağlayan yapı taşlarıdır. Logstash’ın yeteneklerini daha iyi anlamanızı sağlamak için bu eklentileri inceleyelim.

### Logstash girdi eklentileri

Girdiler için Logstash, aşağıdaki gibi çeşitli kaynaklardan logları toplayabilen girdi [eklentileri](https://www.elastic.co/guide/en/logstash/current/input-plugins.html) sağlar:

* [HTTP](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-http.html): HTTP uç noktaları üzerinden günlük kayıtlarını alır.
* [Beats](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-beats.html): Beats çerçevesinden günlükleri toplar.
* [Redis](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-redis.html): bir Redis örneğinden günlük kayıtlarını toplar.
* [Unix](https://www.elastic.co/guide/en/logstash/current/plugins-inputs-unix.html): günlük kayıtlarını bir Unix soketi üzerinden okuyun.

### Logstash filtre eklentileri

Günlükleri manipüle etmek, zenginleştirmek veya değiştirmek istediğinizde, buradaki filtre [eklentilerinden](https://www.elastic.co/guide/en/logstash/current/plugins-filters-elasticsearch.html) bazıları bunu yapmanıza yardımcı olabilir:

* [JSON](https://www.elastic.co/guide/en/logstash/current/plugins-filters-json.html): JSON günlüklerini ayrıştırır.
* [Grok](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html): günlük verilerini ayrıştırır ve yapılandırır.
* [I18n](https://www.elastic.co/guide/en/logstash/current/plugins-filters-i18n.html): günlük kayıtlarınızdan özel karakterleri kaldırır.
* [Geoip](https://www.elastic.co/guide/en/logstash/current/plugins-filters-geoip.html): coğrafi bilgi ekler.

### Logstash çıktı eklentileri

Verileri işledikten sonra, aşağıdaki [çıktı](https://www.elastic.co/guide/en/logstash/current/output-plugins.html) eklentileri yararlı olabilir:

* [WebSocket](https://www.elastic.co/guide/en/logstash/current/plugins-outputs-websocket.html): günlükleri bir WebSocket uç noktasına iletin.
* [S3](https://www.elastic.co/guide/en/logstash/current/plugins-outputs-s3.html): günlük kayıtlarını Amazon Simple Storage Service’e (Amazon S3) gönderin.
* [Syslog](https://www.elastic.co/guide/en/logstash/current/plugins-outputs-syslog.html): günlükleri bir Syslog sunucusuna iletin.
* [Elasticsearch](https://www.elastic.co/guide/en/logstash/current/plugins-outputs-elasticsearch.html): günlük girdilerini Elastic yığınının bir parçası olan Elasticsearch’e iletin.

Logstash pipeline’nı kurmak için `etc/logstash/conf.d` dizininde bir yapılandırma dosyası oluşturun.

```
sudo nano /etc/logstash/conf.d/logstash.conf
```

Biz beats ile log aktarımı yapacağız. Bunun için konfigürasyon dosyamız:

```
# Sample Logstash configuration for creating a simple  
# Beats -> Logstash -> Elasticsearch pipeline.  
  
input {  
  beats {  
    port => 5044  
  }  
}  
  
filter {  
  grok {  
    # Match nginx headers  
    match => {  
      "message" => '%{IP:client_ip} - - \[%{HTTPDATE:access_time}\] "%{WORD:http_method} %{URIPATH:request_page} HTTP/%{NUMBER:http_version}" %{NUMBER:response_code} %{NUMBER:response_size} "-" "%{GREEDYDATA:user_agent}"'  
    }  
  }  
  }  
  
output {  
  elasticsearch {  
    hosts => ["https://<host-ip>:9200"]  
    index => "filebeat-test-%{+YYYY.MM.dd}"  
    ssl => true  
    ssl_certificate_verification => false  
    user => "elastic"  
    password => "changeme"  
  }  
}                                                                                         beats {                                                                                                           port => 5044                                                                                                  }                                                                                                             }                                                                                                                                                                                                                               filter {                                                                                                          grok {                                                                                                            # Match nginx headers                                                                                           match => {                                                                                                        "message" => '%{IP:client_ip} - - \[%{HTTPDATE:access_time}\] "%{WORD:http_method} %{URIPATH:request_page} HTTP/%{NUMBER:http_version}" %{NUMBER:response_code} %{NUMBER:response_size} "-" "%{GREEDYDATA:user_agent}"'       }                                                                                                             }                                                                                                               }                                                                                                                                                                                                                             output {                                                                                                          elasticsearch {                                                                                                   hosts => ["https://192.168.1.100:9200"]                                                                         index => "filebeat-test-%{+YYYY.MM.dd}"                                                                         ssl => true                                                                                                     ssl_certificate_verification => false                                                                           user => "elastic"                                                                                               password => "123456"                                                                                          }                                                                                                             }
```

Bu dosyada password alanına kendi “elastic” kullanıcınızın parolasını yazmanız gerekli.

Logstash üzerinde filter olarak grok eklentisini kullandım. grok çok iyi bir parser eklentisidir. Gelen loglarımızı logstash üzerinde grok eklentisi ile parse ediyor olacağız.

Şimdi `/usr/share/logstash/data` dizininin sahipliğini `logstash` kullanıcısına değiştirin:

![](https://cdn-images-1.medium.com/max/800/1*AQQWHHMHTuYtBxAsZ0DWzg.png)

Logstash data dizinin sahipliğini değiştirme

```
sudo chown -R logstash:logstash /usr/share/logstash/data
```

Şimdi, yapılandırma dosyasının yolunu ileterek Logstash’ı başlatın:

```
sudo -u logstash /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/logstash.conf
```

![](https://cdn-images-1.medium.com/max/800/1*IN4dRRoxrItJa5eUNsAFqw.png)

Logstashi başlatma

Logstash konfigürasyon dosyası ile başlattığınızda eğer herhangi bir hata yok ise pipeline’ın dinlemede ve hazır olduğuna dair bir mesaj alacaksınız.

![](https://cdn-images-1.medium.com/max/800/1*eGddI0ws1vfegy_IhfJl_w.png)

Pipeline dinlemede

![](https://cdn-images-1.medium.com/max/800/1*j93RhXtzHMuobzrXoKpjDQ.png)

Logstash Servis Durumu

Artık pipilenımız hazır. Servisimiz ayakta ve çalışıyor. Bir sonraki adıma geçebiliriz.

### 2- Beats Yapılandırması

ELK sunucumuzda çalışan Logstash servisimize clientlar üzerinden log göndermek için beats aracını kullanacağız. Client sistemlere beats kurulumu yaparak sistemlerden log gönderebiliriz.

Her Beat ayrı olarak kurulabilir bir üründür:

* [Auditbeat](https://www.elastic.co/guide/en/beats/auditbeat/8.15/auditbeat-installation-configuration.html)
* [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/8.15/filebeat-installation-configuration.html)
* [Heartbeat](https://www.elastic.co/guide/en/beats/heartbeat/8.15/heartbeat-installation-configuration.html)
* [Metricbeat](https://www.elastic.co/guide/en/beats/metricbeat/8.15/metricbeat-installation-configuration.html)
* [Packetbeat](https://www.elastic.co/guide/en/beats/packetbeat/8.15/packetbeat-installation-configuration.html)
* [Winlogbeat](https://www.elastic.co/guide/en/beats/winlogbeat/8.15/winlogbeat-installation-configuration.html)

Gördüğünüz gibi birçok beat ürünü var. Biz bunlardan sistemimizdeki log dosyalarını göndermek için **filebeat** ürününü kullanalım.

Client sistemimizde kuruluma başlıyoruz. Ben yine aynı sistemimde devam edeceğim. ELK sistemimi kurduğum sunucum ayrıca clientım olacak.

```
wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.15.3-amd64.deb  
sudo dpkg -i filebeat-8.15.3-amd64.deb
```

![](https://cdn-images-1.medium.com/max/800/1*h8EWICxmNAUUwQgfbizXjQ.png)

Filebeat kurulumu

Filebeati indirip kurduktan sonra konfigürasyon işlemlerine geçiyoruz.

```
sudo nano /etc/filebeat/filebeat.yml
```

![](https://cdn-images-1.medium.com/max/800/1*CigAmS2AF5tsJWQYLetpkg.png)

Elasticsearch Output

Biz çıktımızı logstashe yönlendireceğimiz için elasticsearch kısmını kare işareti ile kapatıyoruz.

![](https://cdn-images-1.medium.com/max/800/1*Hnz7Cpp4QzquIrc10rjBdQ.png)

Logstash Output

Logstash bölümüne Logstash sunucumuzun IPsini ve port numarasını giriyoruz.

![](https://cdn-images-1.medium.com/max/800/1*MBSKQNv8BjcCL-dWN4oZCg.png)

Log Toplama Yaplandırması

Paths kısmında beatimizin toplayacağı logları yapılandırbiliriz. Varsayılan olarak /var/log/ dizini altındaki log dosyalarını topluyor. Daha fazlası için bu kısma sunucumuzda çalışan önemli servislerin(WEB, DNS, DHCP vb.) loglarını ekleyebiliriz.

Yapılandırma ayarlarımız tamamlandığında dosyayı kaydedip çıkabiliriz.

Şimdi sıra filebeatimizi başlatmada.

```
sudo systemctl daemon-reload  
sudo systemctl enable filebeat.service  
sudo systemctl start filebeat.service
```

![](https://cdn-images-1.medium.com/max/800/1*5fkN3mf3RSkcR8i5pj_eXg.png)

Filebeat Servis Durumu

Artık filebeat yapılandırmamızı da tamamladık ve servisimizi başlattık. Servisimiz ayakta ve çalışıyor.

Diğer beats ürünlerini de benzre şekilde kurup yapılandırabilirsiniz.

---

### 3- Kibana Yapılandırması

Logstash ve Filebeat kurulumlarımızı tamamladık. Şimdi kibana arayüzümüzü açalım. Ardından elasticsearch bölümüne girelim. Indicies alanında indeximiz gelmiş mi kontrol edelim.

![](https://cdn-images-1.medium.com/max/800/1*Y2bco0zQhKvUxE1T2mvOxw.png)

Kibana Arayüzü

Bu arayüzde gelen indeximizi görebiliyoruz. Şimdi “Discover” bölümüne gidelim.

![](https://cdn-images-1.medium.com/max/800/1*t9aAyIPyNRzcWZK7wsbouA.png)

Discover Paneli

Create Data View butonuna tıklayarak yeni bir data view oluşturacağız.

![](https://cdn-images-1.medium.com/max/800/1*oDaljym5JgsWwDuNrK5cjg.png)

Data View Oluşturma

Bir isim verin ve index pattern seçin, oluşturulduğu zamana rağmen filebeat dizinini istediğiniz için adını filebeat\* olarak vermek isteyebilirsiniz, filebat-test-2023.10.03\* seçerseniz yalnızca bir dizin yüklenecek ve yeni dizin farklı veriler altında olacağından gerçek zamanlı veri alamayacaktır. Bu nedenle, bundan kaçınmalısınız.

Data Viewi kaydettikten sonra discover paneline logların gelmiş olması lazım. Gelmediyse bir sorun vardır.

![](https://cdn-images-1.medium.com/max/800/1*yXjPbz-6CYRJekTkqSvHwQ.png)

Discover Paneli

Artık bu panel üzerinden log search yani log arama işlemi yapabiliriz.

---

Bu yazımda ELK sistemimize bir log kaynağı ekledik. Logları parse edip elasticsearche gönderdik. Kibana arayüzünde gerekli yapılandırmaları yaptık.