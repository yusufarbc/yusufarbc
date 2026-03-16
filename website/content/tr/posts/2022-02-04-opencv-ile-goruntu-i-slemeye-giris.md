---
date: '2022-02-04'
description: Merhaba, bu yazımızda, OpenCVnin ne olduğundan, bilgisayarlı görüden ve Python ile bu işlemlerin nasıl yapılacağından bahsedeceğiz.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/0*tAmPWiGxMp-BWqSx.png
layout: single
title: OpenCV ile Görüntü İşlemeye Giriş
type: posts
---

### OpenCV ile Görüntü İşlemeye Giriş



Merhaba, bu yazımızda, OpenCVnin ne olduğundan, bilgisayarlı görüden ve Python ile bu işlemlerin nasıl yapılacağından bahsedeceğiz.

### OpenCV’ye Genel Bakış

### Bilgisayarlı Görü Nedir?

Bilgisayarlı görü (computer vision), görüntülerin ve videoların bilgisayar ortamında nasıl depolandıklarını ve onlardan nasıl veri alabileceğimizi anlamlandırdığımız bir süreçtir. Bilgisayarlı görünün amacı görüntünün içeriğini bilmektir. Bunun için, yapay zeka ve makine öğrenmesi teknolojilerinden yararlanır.

### OpenCV Nedir?

OpenCV (Open Source Computer Vision Library) açık kaynak bir bilgisayarlı görü kütüphanesidir. Bilgisayarlı görü uygulamaları için çok işlevsel bir platformdur. Genellikle görüntü işleme, yüz tanıma, video yakalama ve nesne tanımada kullanılır.  
 OpenCV; C++, Python, MATLAB ve Java arayüzlerine sahiptir. Windows, Linux, MacOS, iOS ve Android’i destekler. Optimize edilmiş C/C++ ile yazılmıştır. Gerçek zamanlı bilgisayarlı görü uygulamalarına yönelik tasarlanmıştır. 2500'den fazla optimize edilmiş algoritmayı bünyesinde barındırır. Ayrıca detaylı bir [dokümantasyon sayfası](https://docs.opencv.org/3.4/index.html) da vardır.

### OpenCV Bileşenleri

OpenCV beş temel bileşenden oluşmaktadır:

1. **CV(Computer Vision-Bilgisayarla Görme) Bileşeni:** Temel görüntü işleme fonksiyonlarını barındıran kütüphanedir.
2. **MLL(Machine Learning Library) Bileşeni:** Makine Öğrenmesi için gerekli fonksiyonları içeren bir kütüphanedir.
3. **HighgGUI Bileşeni:** Kütüphane içerisinde tanımlı nesnelerin oluşturulduğu, resim ve videoların kaydedilip silindiği fonksiyonları içerir.
4. **CXCore Bileşeni:** Genel veri yapılarını barındıran, görüntü üzerinde çizim yapmayı sağlayan ve XML desteği sağlayan kütüphanedir.
5. **CvAux Bileşeni:** Ağız hareketleri izleme(mouth-tracking), yüz tanıma(face-recognition), şekil eşleştirme(shape matching) gibi algoritmaları içeren kütüphanedir.

### NumPy Nedir?

Numpy, dizilerle çalışmak için kullanılan bir Python kütüphanesidir. Ayrıca doğrusal cebir ve matrisler alanında çalışmak için de gerekli işlevlere sahiptir. NumPy, Numerical Python (Sayısal Python)’un kısaltmasıdır. OpenCV modülüyle birlikte çokça NumPy modülüne kullanırız. Çünkü, görüntü de bir matristir ve görüntüyü NumPy dizileri şeklinde tutmak bize NumPy’nin sunduğu bir çok fonksiyonu kullanabilme olanağı tanır. Numpy ile alakalı daha detaylı bilgi için bu [yazımıza](https://pwnlab.me/tr-veri-analizi-numpy/) bakabilirsiniz.

Görüntü işleme, gelişmiş bir görüntü elde etmek veya ondan bazı yararlı bilgiler çıkarmak için bir görüntü üzerinde bazı işlemleri gerçekleştirme yöntemidir. Görüntü işlemenin temel tanımından bahsedecek olursak, “Görüntü işleme, sayısallaştırılmış bir görüntünün, özellikle kalitesini artırmak için analiz edilmesi ve işlenmesidir”.  
 Görüntü işleme temel olarak üç adımda gerçekleşir:

* Görüntüyü içe aktarma
* Görüntüyü analiz etme
* Analiz sonucunu dışa aktarma

### Python ile OpenCV

### OpenCV Kurulumu

Python ile OpenCV kütüphanesini kullanmak için öncelikle pip paket yükleme sistemiyle kurulum yapmamız gerekmektedir. PyPI’da modül sayfasına [buradan](https://pypi.org/project/opencv-python/) erişebiliriz. Kurulumu yapmak için terminale aşağıdaki kodu yazarız.

```
pip install opencv-python
```

OpenCV’yi python uygulamamızda kullanmak için ilk olarak import etmemiz gerekir. OpenCV ile birlikte sık kullandığımız numpy modülünüde ‘np’ olarak import edebiliriz.

```
import cv2 import numpy as np
```

### Resim Okuma

Resimler, bilgisayar belleğinde görüntü matrisleri şeklinde tutulurlar. Bu matrislerin her hücresi bir pixeldir. Bu pixellerin barındırdığı veri türüne göre resimleri farklı renk uzaylarında bellekte tutabiliriz. Bu renk uzaylarına örnek olarak; RBG, HSV ve Gray renk uzaylarını verebilriiz.  
 Opencv-python kütüphanesinde resim okuma işlemi *imread()* fonksiyonu ile yapılır. Bu fonksiyon parametre olarak, okuyacağı resmin yolunu ve kullanacağı formatı alır. Varsayılan olarak RGB renk uzayında okuma yapar.

```
cv2.imread(path, flag)
```

Ayrıca, okuduğumuz resmi göstermek için de *imshow()* fonksiyonu kullanılır. Parametre olarak ise açılacak pencerenin ismini ve resimi tuttuğumuz değişkeni alır.

```
cv2.imshow(window_name, image)
```

Bu fonksiyonu çağırdıktan sonra pencere açılıp program sonlanacaktır. Programın sonlanmasını engellemek için aşağıdaki fonksiyonaları kullanırız. Bu sayede pencere kapatılmadığı sürece program sonlanmaz ve pencere açık kalır.

```
cv2.waitKey(0) cv2.destroyAllWindows()
```

Şimdi, python ile bu fonksiyonların nasıl kullanılacağına ve yukarıda bahsettiğimiz renk uzaylarına daha detaylı bakalım.

#### BGR Renk Uzayı

OpenCV’de RGB renk uzayı BGR(Blue-Green-Red) olarak yani, mavi, kırmızı, yeşil renklerinin sıralamasıyla gerçekleştirilir. Bu renklerin karışımıyla diğer renkler elde edilir. Her renk 0–255 aralığında bir sayıdır ve resmin her pixeli bu 3 renk için 0–255 aralığında olan sayılardan oluşan 3 elemanlı bir dizidir. Bu yüzden BGR 3-kanallı renk uzayıdır.  
 OpenCV’de *imread()* fonksiyonu varsayılan olarak BGR renk uzayında okuma yapar.

```
image = cv2.imread("picture.png") cv2.imshow("BGR",image)
```

#### HSV Renk Uzayı

HSV (Hue, Saturation, Value) renkleri sırasıyla renk özü, doygunluk ve parlaklık olarak tanımlar. Doygunluk rengin canlılığını belirlerken parlaklık rengin aydınlığını ifade eder. HSV uzayında siyah renk için renk ve doygunluk değerleri 0 ile 255 arasında herhangi bir sayı alabilir iken parlaklık değeri sıfırdır. Beyaz renkte ise ise parlaklık değeri 255'dir.

BGR’da olduğu gibi resmin her pixeli 0–255 arası sayılardan oluşan 3 elemanlı bir dizidir ve HSV’de 3 kanallı bir renk uzayıdır.  
 OpenCV’de resim BGR renk uzayından HSV renk uzayına çevirilebilir. Bunun için *cvtColor()* fonksiyonunu kullanırız.

```
image = cv2.imread("picture.png") image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV) cv2.imshow("HSV",image)
```

#### Gray Renk Uzayı

Gray renk uzayı, renkleri gri tonlamalı olarak tanımlayan bir renk uzayıdır. Her renk pixeli 0–255 arası bir sayıdır ve bir siyahtan başlayıp beyaza kadar giden gri tonlamalarını ifade eder. 0 siyahı, 255 ise beyazı tanımlar. Her pixel için tek bir sayı kullanıldığından tek kanallı bir renk uzayıdır.  
 OpenCV’de *imread()* fonksiyonuna 0 parametresini verdiğimizde Gray renk uzaıynda okuma yapar.

```
image = cv2.imread("picture.png",0) cv2.imshow("Gray",image)
```

### Resim Düzenleme

OpenCV ile resim üzerinde düzenleme işlemleri yapabiliriz. Bir resmi kırpabilir, resim üzerine yazılar veya şekiller ekleyebiliriz.

#### Resim Kırpma

Resimler birer matris olduğu için resmi kırpmak istediğimizde bu matrisin bir kısmını alabiliriz. Resim matrisinin enine 200 ile 500 pixelleri boyuna 400 ile 800 pixelleri arasını kırpalım.

```
frame = picture[200:500,400:800]
```

#### Çizgi Ekleme

Resim üzerine bir çizgi eklemek için line() fonksiyonunu kullanırız. Bu fonksiyon parametre olarak sırasıyla resmin tutulduğu değişkeni, çizginin başlayacağı pixeli, çizginin biteceği pixeli, çizginin rengini ve çizginin kalınlığını alır. Resim matrisinde (0,0)’ıncı pixelden (100,100)’üncü pixele giden mavi renkte ve 4 birim kalınlıkta bir çizgi ekleyelim. Rengi BGR(blue,green,red) türünde vereceğiz dolayısıyla blue değerini 255 yapıp diğer değerleri 0 yaparsak mavi rengi elde etmiş oluruz.

```
cv2.line(picture,(0,0),(100,100),(255,0,0),thickness=4)
```

#### Çember Ekleme

Resim üzerine bir daire eklemek için circle() fonksiyonunu kullanırız. Bu fonksiyon parametre olarak sırasıyla resmin tutulduğu değişkeni, çemberin merkez pixeli, çemberin yarıçapını, çemberin rengini ve çizginin kalınlığını alır. Resim üzerinde merkezi (100,100) pixeli, yarıçapı 70 pixel uzunluğunda olan kırmızı renkli bir çember oluşturalım.

```
cv2.circle(picture,(500,200),70,(0,0,255),thickness=8)
```

#### Dikdörtgen Ekleme

Resim üzerine bir dikdörtgen eklemek için rectangle() fonksiyonunu kullanırızç Bu fonksiyon parametre olarak sırasıyla resmin tutulduğu değişkeni, dikdörtgenin bir uç köşesinin bulunacağı pixeli, dikdörtgenin diğer uç köşesinin bulunacağı pixeli, çizginin rengini ve kalınlığını alır. Bir ucu (200,100) pixelinde, diğer ucu (700,400) pixelinde olan yeşil renkli bir dikdörtgen oluşturalım.

```
cv2.rectangle(original_image,(200,100),(700,400),(0,255,0),thickness=3)
```

#### Metin Ekleme

Resim üzerine bir metin eklemek için putText() fonksiyonu kullanılır. Bu fonksiyom parametre olarak sırasıyla resmin tutuluğu değişkeni, resim üzerine yazılacak yazıyı, yazının; resim üzerinde konumunu, fontunu, boyutunu, rengini ve kalınlığını alır. Resim üzerine (50,200) konumuna, HERSHEY\_COMPLEX fontunda, 2 boyutunda, yeşil bir “Hello World” yazdıralım.

```
cv2.putText(picture,"Hello World",(100,200),cv2.FONT_HERSHEY_COMPLEX,2,(0,255,0),thickness=2)
```

### Görüntü Filtreleri

Görüntü filtreleme, pikselin gölgelerini veya rengini değiştirerek bir görüntüyü değiştirme işlemidir. Parlaklığı ve kontrastı artırmak için de kullanılır. Birçok farklı filtre türü vardır. Bu filtreleri denerken aşağıdaki resimi kullanacağız.

Mean yani ortalama filtresinde piksel değeri komşu piksel değerlerinin ortalaması ile değiştirilir. src: işlenecek resmi, ksize: ortalaması alınacak pixel matrisinin boyutunu (yükseklik genişlik, 3'e 3, 5'e 5 gibi) belirtir.

```
cv2.blur(src, ksize)
```

#### Gaussian Blur

Görüntü üzerinde düzleştirme işlemi uygular. sigmaX- Gauss çekirdek standart sapmasıdır. Varsayılan olarak 0'dır.

```
cv2.GaussianBlur(src, ksize, sigmaX)
```

#### Median Blur

Medyan filtresi, piksel değerini komşu piksel değerlerinin ortalaması ile değiştirmek yerine , komşu pikselleri sıralayıp sıranın ortasındaki değer ile değiştirir. Yani görüntüdeki tüm piksellerin medyanını alır ve kullanılacak filtrenin medyan değeriyle değiştirir. Gürültüyü etkili bir şekilde azaltır.

```
cv2.medianBlur(src, ksize)
```

#### Erosion — Dilation

Erosion, ön plandaki nesnenin sınırlarını aşındırır. Dilation ise bunun tam tersidir.

Dilation alanı kapatmaya çalışır yani beyaz alanı arttırırken, erosion küçük beyaz gürültüleri ve ön plandaki nesneyi çıkarmakta yararlıdır.

Dilation bütünsel yapmaya çalışır, erosion ise daha spesifik yapmaktadır

```
cv2.erode(image, kernel) cv2.dilate(image, kernel)
```

Opening görüntü üzerindeki nesnenin daha belirgin olmasını sağlar bunu boşlukları açıp renk farkını arttırarak yapar.

Closing görüntü üzerindeki nesneyi kapatıp beyaz alanı arttırıp görüntü üzerindeki gürültüleri kaldırır.

Filtrelemede kullanılan daha gelişmiş fonksiyonlarda vardır. Bunlardan bazıları: **bilateralFilter(), boxfilter()** ve **Filter2D()** ‘dir. Bu filtreler ile ilgili daha detaylı bilgiye [buradan](https://www.javatpoint.com/opencv-image-filters) ulaşabilirsiniz.

Tresholdun temel konsepti, analiz için görsel verileri daha basit hale getirmektir. Görüntüyü gri skalaya dönüştürdüğümüzde her pixel 0–255 arasındaki değerler içerir. Threshold, eşik değerine bağlı olarak her pixeli beyaza veya siyaha dönüştürülür. Yani basit olarak, gri tonlamalı bir resmi siyah-beyaz resme dönüştürme işlemidir. Ancak bunun dışında daha gelişmiş uygulamaları da vardır. Eşik değeri 125 (255 üzerinden) olmasını istediğimizi varsayalım, o zaman 125'in altındaki pixeller 0'a yani siyaha dönüştürülür ve 125'in üzerindeki pixeller 255'e yani beyaza dönüştürülür. Thresholdingi uygulamanın birkaç farklı yolu vardır. Bunlara hep beraber bakalım.

#### Simple Tresholding

Simple Tresholding’de yukarıda bahsettiğimiz gibi her piksel için, aynı eşik değeri uygulanır. Piksel değeri eşikten daha küçükse, 0 olarak ayarlanır, aksi takdirde maksimum değere ayarlanır. treshold() fonksiyonu eşiği uygulamak için kullanılır. İlk parametre, gri tonlamalı bir görüntüdür. İkinci parametre, piksel değerlerini sınıflandırmak için kullanılan eşik değeridir. Üçüncü parametre, eşiği aşan piksel değerlerine atanan maksimum değerdir. Dördüncü parametre ise OpenCV tarafından verilen farklı eşik türleri sağlar. Tüm basic threshold tipleri:

Bu Threshold türleri, threshold() fonksiyonuna parametre olarak verilir.

```
ret, thresh1 = cv2.threshold(image, 160, 255, cv2.THRESH_BINARY) cv2.imshow("simple thresholding",thresh1) ret, thresh2 = cv2.threshold(image, 160, 255, cv2.THRESH_BINARY_INV) cv2.imshow("simple thresholding",thresh2)
```

#### Adaptive Tresholding

Adaptive Tresholding de, tüm pixel değerleri için aynı eşik değeri kullanmak yerine, pixel etrafındaki bölgeye göre her pixel için ayrı eşik değerleri belirlenir. Bu sayede, aynı görüntünün farklı bölgelerinde, farklı eşik değerleri kullanabiliriz. Bu da çeşitli aydınlatmalı görüntüler için daha iyi sonuçlar verir. Bunun için kullanabileceğimiz iki farklı yöntem vardır:

* cv2.ADAPTIVE\_THRESH\_MEAN\_C: Eşik değeri, pixel çevresindeki bölgenin ortalamasıdır.
* cv2.ADAPTIVE\_THRESH\_GAUSSIAN\_C: Eşik değeri, pixel çevresindeki bölgenin ağırlıklı toplamıdır.

```
thresh1 = cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY,11,2) cv2.imshow("ADAPTIVE_THRESH_MEAN_C",thresh1) thresh2 = cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2) cv2.imshow("ADAPTIVE_THRESH_GAUSSIAN_C",thresh2)
```

#### Otsu Thersholding

Otsu yönteminde, görüntü histogramından optimum bir sabit eşik değeri belirlenir. Histogram sadece iki zirveden oluşur ve iyi bir eşik bu iki değerin ortalaması olacaktır. Bunu yapmak için Threshold() fonksiyonuna, cv2.thresh\_otsu’nun ilave bir bayrak olarak eklenir. Eşik değeri keyfi seçilebilir. Algoritma daha sonra en uygun eşik değerini bulur.

```
ret,thresh = cv2.threshold(image, 0, 255,cv2.THRESH_BINARY+cv2.THRESH_OTSU) cv2.imshow("Otsu Thersholding",thresh)
```

### Video Yakalama

OpenCV’de video yakalama videoCapture() fonksiyonu ile yapılır. Bu fonksiyon ile bilgisayarınıza bağlı olan bir kamerayı çalıştırabilir ve gerçek-zamanlı olarak aldığınız görüntüyü işleyebilirsiniz. Fonksiyona verdiğiniz 0 parametresi bilgisayarınızın webcamini belirtir. Eğer harici bir kamera bağladıysanız 1 değerini vermeniz gerekir. Aşağıdaki kod bilgisayarınızın webcamini çalıştırarak, alınan görüntüyü size gösterecektir. Programı sonlandırmak için ESC tuşuna basmanız yeterli olacaktır.

```
importcv2 cam = cv2.VideoCapture(0) while True: ret,goruntu=cam.read() cv2.imshow("video capture",goruntu) if cv2.waitKey(30)==27: #ESC'ye basılırsa döngüden çık break cam.release() cv2.destroyAllWindows()
```

### Canny Edge Detection

Canny Edge Detection, popüler bir kenar algılama algoritmasıdır. OpenCV’de bu algoritmayı canny() fonksiyonu ile uygularız. Fonksiyonun ilk parametresi kaynak görüntüdür. İkinci ve üçüncü parametreler sırasıyla minimum ve maksimum eşik değerleridir.

```
cv2.Canny(image, treshold1, treshold2)
```

#### Eğlenceli bir uygulama

Canny() fonksiyonu ile daha iyi sonuçlar elde etmek için treshold değerlerinin iyi belirlenmesi ve resmin yumuşatılması gerekir. Ayrıca, Treshold değerlerinin görüntü matrisinin medyanına görede belirleyebiliriz. Bu sayede, thresold değerleri otomatik hesaplanmış olur. Webcam ile gerçek zamanlı olarak canny algoritmasını uyguladığımız bir uygulama yapalım.

```
import cv2 as cv  
import numpy as np  
  
cam = cv.VideoCapture(0)  
  
def autoCanny(blur, sigma=0.33):   
  median = np.median(blur)
```

*Originally published at* [*https://pwnlab.me*](https://pwnlab.me/tr-opencv-ile-goruntu-islemeye-giris/) *on February 4, 2022.*