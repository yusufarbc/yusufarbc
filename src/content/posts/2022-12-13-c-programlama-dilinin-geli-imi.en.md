---
title: "Development of C Programming Language"
date: 2022-12-13
draft: false
---

---

### Development of C Programming Language

![](https://cdn-images-1.medium.com/max/800/1*LNiEJoSd69b4K-ABg14OYw.png)

### **What is a Programming Language?**

Programming is giving a computer a set of instructions to execute. The computer executes the given instructions sequentially. Various methods have been used to program a computer since the first computers.

Programming languages ​​are the tools we use to write instructions for computers to follow. Computers think in binary, that is, they perform operations with strings of 1s and 0s. Programming languages ​​allow us to translate 1s and 0s into something humans can understand and write. A programming language consists of a set of symbols that act as a bridge that allows humans to translate our thoughts into instructions that computers can understand. Sentences consisting of these symbols are converted into machine code (binary code) through the compiler.

![](https://cdn-images-1.medium.com/max/800/1*JTvQeZhMZ--8BDeKaABmKw.jpeg)

Compiler's Task

### Classification of Programming Languages

With the developing technology, many different application types have emerged today and programming languages are specialized according to these application types. You can find a list of programming languages ​​[here](https://tr.wikipedia.org/wiki/List_of_programming_languages).

For example;

* PHP, JavaScript for web application development.
* Kotlin, Swift for mobile application development.
* Python, R for developing artificial intelligence applications.
* C, C++ for system program development.

can be given. So is there a single programming language that works for everything? While computer programs are so diverse, it must be quite difficult to develop a language that is good at everything.

We can classify programming languages ​​according to their closeness to human language and machine language. In this image, the programming language gets closer to spoken language as you go up, and to machine language as you go down.

![](https://cdn-images-1.medium.com/max/800/1*ezQx18YckMStFClue9R1qg.jpeg)

Classification of Programming Languages

---

### C Programming Language

Although C is mostly known as an intermediate level language; This does not mean that it is less powerful or less useful than other languages. The reason why it is called so is because it has functions that both low-level languages ​​such as assembly language and high-level languages ​​such as C# and Pascal have.

C is a systems language used by high-level professional programmers today. The most distinctive feature of C is that it allows direct access to pointers, words, bits and bytes. This allows C to be used in writing system programs - in embedded systems.

Another advantage of C is that the number of keywords is low. Keywords are very important in a language. For example; While there are 159 keywords in Basic, this number is only 27 in C.

As a result, C is a language used by professional programmers that allows the programmer to do whatever he needs. Programmers can create incredible programs using C. One of these incredible programs is the operating system.

### History of the C language

First BCPL language and then B language were used to develop operating system software. BCPL was developed in 1967, but the inadequacies of this language led to the development of the B language in 1970. There is no concept of data type in either the BCPL language or the B language. The Unix operating system was initially written in B language. However, B language was not sufficient to implement operating system software. Thereupon, in 1972, the C programming language was developed by [Dennis Ritchie](https://en.wikipedia.org/wiki/Dennis_Ritchie) on DEC PDP-11 computers used in the UNIX operating system. There are many data types in C language. C language was used successfully in the development of the UNIX operating system.

In later years, the C language became available outside the operating system. It was used especially in engineering studies and scientific applications. Although C peripherals were very good at the source code level and in their adaptation to machine language, the lack of standards in this period was a negative situation. There were many variants of C, and they all had differences in syntax. To correct this situation, ANSI (American National Standards Institute) created a board in 1983 and prepared a standard for C. This board determines the functions that should be included in the C compiler, in other words, the standard library functions.suction.

---

### Introduction to Programming

When entering C programming, we start with the "hello world" program, which is the same as in every programming language. We can get an idea about the syntax of the language from this program.

```
#include <stdio.h>  
#include <stdlib.h>  
  
int main()  
{  
    printf("Hello world!\n");  
    return 0;  
}
```

When we look at the C program structure;

* In the first section, we see that there is adding a library. At the very beginning of a C program, libraries for the functions to be used in the program must be added. For example; If a message is to be displayed on the screen, the function required for this is the printf() function, and the <stdio.h> library, which includes this function, should be added at the beginning as #include<stdio.h>.
* In the second section, we see the main() function. This command shows where the program starts. The main() function consists of two parts. function definition and function body.  
  - int main(): function definition  
  -{} between curly braces: function body  
  In the function definition, the name of the function and input-output types are specified. The function body contains the statements necessary to perform the desired operations and see their results.
* The return() statement indicates that the function is finished. The program exits this function and returns to the line that called it.

---

In this article, we took a look at the development of the C language. We talked about how it was born, what it brought and how it was used. In the next step, you can take a look at [this site](https://www.tutorialspoint.com/cprogramming/index.htm) to continue on the programming side.