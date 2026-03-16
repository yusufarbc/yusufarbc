---
title: "Docker Temelleri"
date: 2023-01-02
draft: false
---

---

### Docker Temelleri

![](/images/1_2Vt-GnSjtWGchPVgF1fX6g.png)

### Docker Nedir?

Docker, sanallaştırılmış ortamlarda uygulamalar geliştirmek, dağıtmak ve yönetmek için kullanılan açık kaynak kodlu bir kapsayıcı platformudur. İşletim sisteminin kaynaklarını yönettiği uygulamalara dağıtan bir teknolojidir. Docker, sanal makinelerden daha hafif ve daha hızlıdır.

![](https://cdn-images-1.medium.com/max/800/0*Q1duQRvSkdgwr289)

docker vs virtual machines

Docker kapsayıcıları(containers), çalışan uygulamalar için hafif sanallaştırılmış çalışma ortamları sağlar. Uygulamaları izole ortamlarda paketlemek; uygulamaları geliştirmeyi, dağıtmayı ve bakımını kolaylaştırır. Konteynırlar, ana bilgisayardan ve ana bilgisayar üzerinde çalışan diğer uygulamalardan bağımsız ve izoledir.

#### Docker Hub Nedir?

Docker’ın repository servisidir. Bu platforma üye olup hazırladığınız docker konteynırlarını burada saklayabilirsiniz. Ayrıca hazır docker konteynırlarını da yine bu platform üzerinden indirip hızlı bir şekilde kurabilirsiniz. Docker hub’a [*buradan*](https://hub.docker.com/) ulaşabilirsiniz.

![](https://cdn-images-1.medium.com/max/800/0*t1XOZZHUt_GtjX9F)

---

### Docker Kurulumu

Docker windows, mac ve linux platformlarını destekler.

#### Docker Daemon Kurulumu

Docker servisini, [websitesinde](https://docs.docker.com/get-docker/) bulunan adımları izleyerek kolay bir şekilde kurabilirsiniz.

Linux kurulumu için: <https://docs.docker.com/desktop/install/linux-install/>

Windows kurulumu için: <https://docs.docker.com/desktop/install/windows-install/>

MacOS kurulumu için: <https://docs.docker.com/desktop/install/mac-install/>

#### Docker Imaj Kurulumu

Yukarıda bahsettiğimiz gibi docker bir repository servisine sahiptir. Docker hub üzerinden hazır imajları direk kurabiliriz. Bu hazır imajlar içinde çeşitli web uygulamaları, sistem araçları ve servis yazılımları vardır.

Bu imajların kurulumu için Docker CLI komutlarını kullanabilirsiniz veya dekstop uygulaması üzerinden kurulum yapabilirsiniz.

Örnek olarak, [vulnhub](https://github.com/vulhub/vulhub)’ı verebiliriz. Siber Güvenlik alanında pratik yapmak için test ortamlarına ihtiyaç duyulmaktadır. Bu noktada, docker konteynırları çok kullanışlı bir hale gelir. vulnhubda bu konteynırları kurulumunu kolaylaştıran bir docker compose’dur.

Zafiyetli web uygulamalarını kurmanın daha kolay bir yolu ise [dockervuln](https://github.com/yusufarbc/DockerVuln) aracıdır. Bu araç bir grafik arayüz ile indexlenmiş imajların otomatik kurulumunu ve çalıştırılmasını sağlamaktadır. Tavsiye ederim :)

---

### Docker Mimarisi

Docker mimarisi, birçok alt programdan oluşur. Docker CLI ve API’ın görevi kullanıcının docker daemon ile iletişim kurabilmesini sağlamaktır.

![](https://cdn-images-1.medium.com/max/800/0*oBvVrZxl7WnZ3EAf)

docker mimarisi

#### Docker Image

Docker konteynırlarını oluşturmak için kullanılan imajdır. Docker tarafından sağlanan base imajlar vardır. Bu base imajlar kullanılarak yeni imajlar oluşturulabilir.

![](https://cdn-images-1.medium.com/max/800/0*GTA-gR97eLVfV8dy)

#### Docker Container

Docker konteynırları, içlerine kurulan uygulamaları ana sistemden bağımsız ve izole bir şekilde çalıştıran yapılardır.

![](https://cdn-images-1.medium.com/max/800/0*aXW2UYqzuJdk-7yx)

#### Docker Volume

Konteynır silinse dahi içindeki dataları tutmak istiyorsak docker volume kullanırız. Volume, docker konteynırı tarafından üretilen ve verileri ana bilgisayarda saklayan bir mekanizmadır.

![](/images/0_wWoNuW_cAt4LTNiH.jpg)

Docker volume içindeki datalar birden fazla konteynırda kullanılabilir. Docker imaj güncellemesi yapılsa bile volume içerisindeki datalar değişmez. Docker volume içerisindeki datalar taşınabilir ve yedeklenebilir. Docker volumes konteynır boyutunu arttırmaz.

#### Docker Network

Aynı ağ üzerindeki konteynırların birbiriyle iletişim kurmasını sağlar. Çoklu network trafiğini bölümlere ayırır. Konteynırların birden fazla networke dahil edilebilmesini sağlar.

![](https://cdn-images-1.medium.com/max/800/0*8VlhQr5TKVSiZYPW)

---

### Docker CLI (Command Line Interface)

Bu bölümde docker’ın temel komutlarına değineceğiz.

Docker komutlarını öğrenmek ve pratik yapmak için “[play with docker](https://www.docker.com/play-with-docker/)” uygulamasını da kullanabilirsiniz.

#### docker info

Mevcut işletim sisteminde, docker özelinde bir çok bilginin tamamını veren komuttur. Docker ile ilgili detayları getirir.

#### docker ps

Docker ortamında çalışan konteynırları gösterir.

#### docker ps -a

Docker ortamında kurulu olan bütün konteynırları gösterir.

#### docker run <container>

Belirtilen konteynırın imaj dosyasını kurar ve çalıştırır.

#### docker container run -it <container> bash

Yeni bir konteynır yaratır ve shelline girer.

#### docker container start <container\_name>

Mevcut konteynırı başlatmak için kullanılır.

#### docker container exec <container\_id> <command>

Belirtilen komutu ilgili konteynırda çalıştırır ve sonucu döndürür.

#### docker container exec -it <container\_id> bash

Çalışan bir konteynırın shelline bağlanır.

#### docker container run -d <container>

deattach modda yani arka planda konteynırı yaratıp çalıştırır.

#### docker container stop <container\_name>

çalışan bir konteynırı durdumak için kullanılır.

#### docker container kill <container\_id>

çalışan konteynırı direk kapatır.

#### docker container inspect <container\_id>

Konteynırın bütün detaylarını getirir.

#### docker container rm <container\_id>

Konteynırı silmek için kullanılır. Çalışan konteynırı silemez!

#### docker images

kurulu imajları listeler.

#### docker pull <docker\_image>

Docker imajı indirmek için kullanılır.

#### docker push <docker\_repo>

Docker reposuna imajı yüklemek için kullanılır.

---

### Docker File

Docker file, docker imajlarını oluşturmak için kullandığımız bir dosyadır. Dockerfile dosyasında bulunan komutlar sırayla docker engine tarafından çalıştırılır. Docker build sonunda elimizde uygulamamıza ait bir docker imaj oluşmuş olur. Daha sonra bu imaj kullanılarak docker konteynırları oluşturulabilir.

![](https://cdn-images-1.medium.com/max/800/0*9ZQ34zEz4UwTDF2j)

Dockerfile yazılırken bir base imaj seçilir. Belirtilen komutlar bu base imajda çalıştırılır ve yeni imaj oluşturulmuş olur.

#### Dockerfile Komutları

* **FROM:** base imajınızı belirteceğiniz komut.
* **RUN:** ilgili uygulama içerisinde build aşamasında komut çalıştırmak için kullanılır.
* **CMD:** konteynır ayağa kalktığında çalıştırılacak komutlar için kullanılır.
* **LABEL:** isimlendirme yapmak için kullanılır
* **MAINTAINER:** dosyayı oluşturan ile ilgili bilgiler içerir.
* **EXPOSE:** konteynıra port açmak için kullanılır.
* **ENV:** ortamda değişken tanımlamak için kullanılır.
* **ADD:** localden veya internetten dosya kopyalamak için kullanılır.
* **COPY:** belirtilen dosyaları direk olarak konteynırda belirtilen yere kopyalar.
* **ENTRYPOINT:** konteynır çalıştığında varsayılan bir parametre tanımlar.
* **VOLUME:** konteynırdaki dataların tutulacağı bir volume tanımlar.
* **USER:** kullanıcıda bulunan yetkili kullanıcıyı tanımlar.
* **WORKDIR:** konteynırın çalışma dizinini belirler.
* **MKDIR:** konteynırda dizin oluşturur.

#### Dockerfile örneği

```
# syntax=docker/dockerfile:1  
FROM golang:1.16-alpine AS build  
  
# Install tools required for project  
# Run `docker build --no-cache .` to update dependencies  
RUN apk add --no-cache git  
RUN go get github.com/golang/dep/cmd/dep  
  
# List project dependencies with Gopkg.toml and Gopkg.lock  
# These layers are only re-built when Gopkg files are updated  
COPY Gopkg.lock Gopkg.toml /go/src/project/  
WORKDIR /go/src/project/  
# Install library dependencies  
RUN dep ensure -vendor-only  
  
# Copy the entire project and build it  
# This layer is rebuilt when a file changes in the project directory  
COPY . /go/src/project/  
RUN go build -o /bin/project  
  
# This results in a single layer image  
FROM scratch  
COPY --from=build /bin/project /bin/project  
ENTRYPOINT ["/bin/project"]  
CMD ["--help"]
```