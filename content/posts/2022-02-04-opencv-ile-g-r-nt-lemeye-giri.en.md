---
title: "Introduction to Image Processing with OpenCV"
date: 2022-02-04
draft: false
---

---

### Introduction to Image Processing with OpenCV

![](https://cdn-images-1.medium.com/max/800/0*tAmPWiGxMp-BWqSx.png)

Hello, in this article, we will talk about what OpenCV is, computer vision and how to do these operations with Python.

### OpenCV Overview

### What is Computer Vision?

Computer vision is a process by which we make sense of how images and videos are stored in the computer environment and how we can retrieve data from them. The purpose of computer vision is to know the content of the image. For this, it uses artificial intelligence and machine learning technologies.

### What is OpenCV?

OpenCV (Open Source Computer Vision Library) is an open source computer vision library. It is a very functional platform for computer vision applications. It is often used in image processing, face recognition, video capture and object recognition.  
 OpenCV; It has C++, Python, MATLAB and Java interfaces. It supports Windows, Linux, MacOS, iOS and Android. Written in optimized C/C++. It is designed for real-time computer vision applications. It contains more than 2500 optimized algorithms. There is also a detailed [documentation page](https://docs.opencv.org/3.4/index.html).

### OpenCV Components

OpenCV consists of five basic components:

1. **CV (Computer Vision) Component:** It is the library that contains basic image processing functions.
2. **MLL (Machine Learning Library) Component:** It is a library containing the necessary functions for Machine Learning.
3. **HighgGUI Component:** It contains functions where objects defined in the library are created and images and videos are saved and deleted.
4. **CXCore Component:** It is a library that contains general data structures, enables drawing on the image and provides XML support.
5. **CvAux Component:** It is a library containing algorithms such as mouth-tracking, face-recognition and shape matching.

### What is NumPy?

Numpy is a Python library for working with arrays. It also has the necessary functions for working in the field of linear algebra and matrices. NumPy is an abbreviation for Numerical Python. We use the NumPy module a lot along with the OpenCV module. Because the image is also a matrix, and keeping the image as NumPy arrays allows us to use many functions offered by NumPy. For more detailed information about Numpy, you can check out this [article](https://pwnlab.me/tr-veri-analizi-numpy/).

Image processing is a method of performing some operations on an image to obtain an improved image or to extract some useful information from it. If we talk about the basic definition of image processing, “Image processing is the analysis and processing of a digitized image, especially to improve its quality.”  
 Image processing basically takes place in three steps:

* Import image
* Analyzing the image
* Export analysis result

### OpenCV with Python

### OpenCV Installation

To use the OpenCV library with Python, we first need to install it using the pip package installation system. We can access the module page in PyPI [here](https://pypi.org/project/opencv-python/). To perform the installation, we write the following code in the terminal.

```
pip install opencv-python
```

To use OpenCV in our Python application, we first need to import it. We can also import the numpy module, which we use frequently with OpenCV, as 'np'.

```
import cv2 import numpy as np
```

### Image Reading

Pictures are kept in the computer memory as image matrices. Each cell of these matrices is a pixel. We can keep images in memory in different color spaces depending on the type of data these pixels contain. As examples of these color spaces; We can provide RBG, HSV and Gray color spaces.  
 In the Opencv-python library, image reading is done with the *imread()* function. This function takes as parameters the path of the image it will read and the format it will use. By default it reads in RGB color space.

```
cv2.imread(path, flag)
```

Additionally, the *imshow()* function is used to show the image we read. As parameters, it takes the name of the window to be opened and the variable in which we hold the image.

```
cv2.imshow(window_name, image)
```

After calling this function, the window will open and the program will end. We use the following functions to prevent the program from terminating. B.In this way, unless the window is closed, the program does not terminate and the window remains open.

```
cv2.waitKey(0) cv2.destroyAllWindows()
```

Now, let's take a more detailed look at how to use these functions with Python and the color spaces we mentioned above.

#### BGR Color Space

In OpenCV, the RGB color space is realized as BGR (Blue-Green-Red), that is, the order of the colors blue, red and green. Other colors are obtained by mixing these colors. Each color is a number in the range 0–255, and each pixel of the image is a 3-element array consisting of numbers in the range 0–255 for these 3 colors. So BGR is a 3-channel color space.  
 In OpenCV, the *imread()* function reads in the BGR color space by default.

```
image = cv2.imread("picture.png") cv2.imshow("BGR",image)
```

#### HSV Color Space

HSV (Hue, Saturation, Value) defines colors as color essence, saturation and brightness respectively. While saturation determines the vividness of the color, brightness refers to the brightness of the color. In HSV space, color and saturation values ​​for black color can take any number between 0 and 255, while brightness value is zero. In white color, the brightness value is 255.

As in BGR, each pixel of the image is a 3-element array consisting of numbers from 0 to 255, and in HSV it is a 3-channel color space.  
 In OpenCV, the image can be converted from BGR color space to HSV color space. For this we use the *cvtColor()* function.

```
image = cv2.imread("picture.png") image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV) cv2.imshow("HSV",image)
```

#### Gray Color Space

Gray color space is a color space that describes colors as grayscale. Each color pixel is a number between 0 and 255 and represents shades of gray starting from black and ending with white. 0 defines black and 255 defines white. It is a single-channel color space because a single number is used for each pixel.  
 When we give the parameter 0 to the *imread()* function in OpenCV, it reads in the Gray color space.

```
image = cv2.imread("picture.png",0) cv2.imshow("Gray",image)
```

### Image Editing

We can edit the image with OpenCV. We can crop an image and add text or shapes to the image.

#### Image Cropping

Since images are a matrix, we can take a part of this matrix when we want to crop the image. Let's crop the image matrix between 200 and 500 pixels widthwise and 400 and 800 pixels lengthwise.

```
frame = picture[200:500,400:800]
```

#### Adding Lines

We use the line() function to add a line on the image. This function takes as parameters the variable where the image is stored, the pixel where the line will start, the pixel where the line will end, the color of the line and the thickness of the line. Let's add a blue line with a thickness of 4 units going from the (0,0)th pixel to the (100,100)th pixel in the image matrix. We will give the color in BGR (blue, green, red) type, so if we set the blue value to 255 and the other values ​​to 0, we will get the blue color.

```
cv2.line(picture,(0,0),(100,100),(255,0,0),thickness=4)
```

#### Adding a Circle

We use the circle() function to add a circle on the image. This function takes as parameters the variable in which the image is kept, the center pixel of the circle, the radius of the circle, the color of the circle and the thickness of the line. Let's create a red circle on the image with a center of (100,100) pixels and a radius of 70 pixels.

```
cv2.circle(picture,(500,200),70,(0,0,255),thickness=8)
```

#### Adding a Rectangle

We use the rectangle() function to add a rectangle on the image. This function takes as parameters the variable in which the image is kept, the pixel where one end corner of the rectangle will be located, the pixel where the other end corner of the rectangle will be located, the color and thickness of the line. Let's create a green rectangle with one end at (200,100) pixels and the other end at (700,400) pixels.

```
cv2.rectangle(original_image,(200,100),(700,400),(0,255,0),thickness=3)
```

#### Adding Text

The putText() function is used to add text on the image. This function uses the retention variable of the image as parameters, the text to be written on the image, the text; Gets its position, font, size, color and thickness on the image. Let's print a green "Hello World" on the image at (50,200) in HERSHEY\_COMPLEX font, size 2.

```
cv2.putText(picture,"Hello World",(100,200),cv2.FONT_HERSHEY_COMPLEX,2,(0,255,0),thickness=2)
```

### Image Filters

Image filtering changes the shadows or color of the pixelIt is the process of changing an image. It is also used to increase brightness and contrast. There are many different types of filters. We will use the image below when trying these filters.

In the mean filter, the pixel value is replaced with the average of neighboring pixel values. src: specifies the image to be processed, ksize: specifies the size of the pixel matrix to be averaged (such as height-width, 3 by 3, 5 by 5).

```
cv2.blur(src, ksize)
```

#### Gaussian Blur

Applies a flattening operation on the image. sigmaX- Gaussian kernel standard deviation. By default it is 0.

```
cv2.GaussianBlur(src, ksize, sigmaX)
```

#### Median Blur

Instead of replacing the pixel value with the average of neighboring pixel values, the median filter sorts the neighboring pixels and replaces them with the value in the middle of the row. That is, it takes the median of all pixels in the image and replaces it with the median value of the filter to be used. Effectively reduces noise.

```
cv2.medianBlur(src, ksize)
```

#### Erosion — Dilation

Erosion wears away the boundaries of the foreground object. Dilation is the exact opposite of this.

While dilation tries to close the area, i.e. increases the white area, erosion is useful in removing small white noise and the foreground object.

Dilation tries to make it holistic, erosion makes it more specific.

```
cv2.erode(image, kernel) cv2.dilate(image, kernel)
```

Opening makes the object on the image more visible by opening the gaps and increasing the color difference.

Closing closes the object on the image, increases the white area and removes noise on the image.

There are also more advanced functions used in filtering. Some of these are: **bilateralFilter(), boxfilter()** and **Filter2D()**. You can find more detailed information about these filters [here](https://www.javatpoint.com/opencv-image-filters).

The basic concept of treshold is to make visual data simpler for analysis. When we convert the image to gray scale, each pixel contains values ​​between 0 and 255. Threshold converts each pixel to white or black depending on the threshold value. So simply, it is the process of converting a grayscale image into a black and white image. However, there are also more advanced applications. Let's say we want the threshold value to be 125 (out of 255), then pixels below 125 will be converted to 0, that is, black, and pixels above 125 will be converted to 255, that is, white. There are several different ways to implement Thresholding. Let's look at these together.

#### Simple Tresholding

In Simple Tresholding, the same threshold value is applied to each pixel, as we mentioned above. If the pixel value is smaller than the threshold, it is set to 0, otherwise it is set to the maximum value. The treshold() function is used to apply the threshold. The first parameter is a grayscale image. The second parameter is the threshold value used to classify pixel values. The third parameter is the maximum value assigned to pixel values ​​that exceed the threshold. The fourth parameter provides different types of thresholds given by OpenCV. All basic threshold types:

These Threshold types are given as parameters to the threshold() function.

```
ret, thresh1 = cv2.threshold(image, 160, 255, cv2.THRESH_BINARY) cv2.imshow("simple thresholding",thresh1) ret, thresh2 = cv2.threshold(image, 160, 255, cv2.THRESH_BINARY_INV) cv2.imshow("simple thresholding",thresh2)
```

#### Adaptive Tresholding

In Adaptive Thresholding, instead of using the same threshold value for all pixel values, separate threshold values are determined for each pixel according to the region around the pixel. In this way, we can use different threshold values ​​in different parts of the same image. This gives better results for images with various lighting. There are two different methods we can use for this:

* cv2.ADAPTIVE\_THRESH\_MEAN\_C: Threshold value is the average of the region around the pixel.
* cv2.ADAPTIVE\_THRESH\_GAUSSIAN\_C: Threshold value is the weighted sum of the region around the pixel.

```
thresh1 = cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY,11,2) cv2.imshow("ADAPTIVE_THRESH_MEAN_C",thresh1) thresh2 = cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2) cv2.imshow("ADAPTIVE_THRESH_GAUSSIAN_C",thresh2)
```

#### Herbaceous Thersholding

In the Otsu method, an optimum constant threshold value is determined from the image histogram. The histogram consists of only two peaks and a good threshold would be the average of these two values. do thiscv2.thresh\_otsu is added as an additional flag to the Threshold() function. The threshold value can be chosen arbitrarily. The algorithm then finds the optimal threshold value.

```
ret,thresh = cv2.threshold(image, 0, 255,cv2.THRESH_BINARY+cv2.THRESH_OTSU) cv2.imshow("Otsu Thersholding",thresh)
```

### Video Capture

In OpenCV, video capture is done with the videoCapture() function. With this function, you can operate a camera connected to your computer and process the image you receive in real-time. The 0 parameter you give to the function indicates your computer's webcam. If you have connected an external camera, you must give the value 1. The code below will run your computer's webcam and show you the received image. To end the program, simply press the ESC key.

```
importcv2 cam = cv2.VideoCapture(0) while True: reject,view=cam.read() cv2.imshow("video capture",image) if cv2.waitKey(30)==27: #Exit the loop if ESC is pressed break cam.release() cv2.destroyAllWindows()
```

### Canny Edge Detection

Canny Edge Detection is a popular edge detection algorithm. In OpenCV, we implement this algorithm with the canny() function. The first parameter of the function is the source image. The second and third parameters are the minimum and maximum threshold values, respectively.

```
cv2.Canny(image, treshold1, treshold2)
```

#### A fun app

To obtain better results with the Canny() function, treshold values must be determined well and the image must be softened. We can also determine Treshold values ​​based on the median of the image matrix. In this way, thresold values ​​are calculated automatically. Let's make an application where we apply the canny algorithm in real time with a webcam.

```
import cv2 as cv  
import numpy as np  
  
cam = cv.VideoCapture(0)  
  
def autoCanny(blur, sigma=0.33):   
  median = np.median(blur)
```

---

*Originally published at* [*https://pwnlab.me*](https://pwnlab.me/tr-opencv-ile-goruntu-isleme-giris/) *on February 4, 2022.*