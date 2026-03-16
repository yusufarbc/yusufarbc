---
date: '2021-07-01'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/0*DH7q_354Ghtgzp3H.jpg
title: Asynchronous Programming
type: posts
---

![](https://cdn-images-1.medium.com/max/800/0*DH7q_354Ghtgzp3H.jpg)

In this article, I will try to explain asynchronous programming, which many of us have difficulty understanding. What is this type of programming known as async-await structures in the Python language? What does it do? How to use? Let's see together.

### What is asynchronous programming?

Asynchronous programming is a type of programming that ensures that the flow is not blocked and continues in case of delays that may occur in the main flow in an application. That's why we call it non-blocking code.  
In synchronous (sequential) programming, another operation cannot be started before one operation is completed. In asynchronous programming, one process can start before another process is completed. This saves us from blocking our program, especially in API transactions with high waiting times.

### Difference between Synchronous and Asynchronous

Synchronous programming is a type of programming in which we carry out operations sequentially. You cannot move on to another process before completing one process or skip the next process.

Asynchronous programming works on the principle of executing multiple processes simultaneously. Transactions are executed independently of other transactions, without being placed in any order.

![](https://cdn-images-1.medium.com/max/800/0*1mtD1Dvr0zhe2FMH.png)

Multiple processes accessing systems such as APIs and databases at the same time may cause problems. For example, two processes in the database may try to update the same data at the same time. As a result, errors may occur. Therefore, transactions are queued in API and database accesses, that is, they are **synchronized**.

In a synchronously written desktop application or a mobile application, if long operations are to be performed when a button is pressed, the program will be blocked until the operation is completed. Therefore, the operations to be performed when the button is pressed are **asynchronized** and executed in different threads. Thanks to this, the program is not blocked while performing operations in the background, and other buttons can also work.

While the program is executing, the operating system manages operations such as transmitting synchronous and asynchronous operations to the processor and keeping them in memory. I will not go into detail about how the operating system carries out these operations. Thanks to asynchronous programming, when the processor performs an I/O operation with the http protocol, it is not blocked and continues to do the work it needs to do.

### Usage with API

Asynchronous programming is used very frequently in API access. In this article, I will access Discord's API as an example and perform operations with this API.

![](https://cdn-images-1.medium.com/max/800/0*nQM6utN7rsQyrkQG.png)

As you can see in the Python code above, there is the "**async**" keyword at the beginning of the functions. This word synchronizes the function, which the discord API requires. If you do not write this word, your code will not work. So what is this synchronization process?

The synchronization process enqueues asynchronous operations, that is, it queues the operations. When a synchronized function is called, the queue structure is created. Function calls are placed in this queue and executed sequentially. It is very important to queue transactions for API access; multiple transactions accessing the API at the same time may cause problems.

So, will the program we wrote wait idle until a response comes from the API? If this were the case, our program would be blocked and could not do anything until a response came from the API. At this point, the "**await**" keyword comes into play. We write the keyword "await" at the beginning of the operations that will wait for the response from the API, so that our program will not be blocked and can continue to perform other operations until the response from the API.

![](https://cdn-images-1.medium.com/max/800/0*8LjK86AP9OU2d4QV.png)

If the "await" keyword was not written and this process was done synchronously, our program would send the request to the discord server, wait until it received a response, and send the next request when it received a response. When we do it asynchronously, requests are sent sequentially while responses are received sequentially. In this respect, we can compare synchronous operation to a one-way road, and asynchronous operation to a two-way road. In synchronous operation, since the road is single-lane and one-way, no other packet can come from the other side while the packet is traveling, whereas in asynchronous operation, packets can go back and forth independently of each other on the two-way road.

I tried to explain the subject in a simple way so that it can be understood, and supported it with diagrams and code examples. I hope it was useful. Thank you for reading.

---

*origininally published at* [*https://pwnlab.me*](https://pwnlab.me/aseknron-programlama/) *on July 1, 2021.*