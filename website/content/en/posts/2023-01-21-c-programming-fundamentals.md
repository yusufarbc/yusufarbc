---
date: '2023-01-21'
description: It is an English word with Turkish meaning and syntax. All the rules of the language used in programming are called syntax. In this article, we will talk about the syntax of the C language.
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*wb7CfskOL2Lhc26j2XpbTQ.png
layout: single
title: C Programming Fundamentals
type: posts
---

### What is Syntax?

It is an English word with Turkish meaning and syntax. All the rules of the language used in programming are called syntax. In this article, we will talk about the syntax of the C language.

### Definitions

#### Variable & Constant Definition

Variables and Constants are the components we use to hold data. The point we need to pay attention to when defining these components is the data type that the variable or constant accepts. There are 5 types of data types in standard C:

* int — used for integer values.
* float — used for decimal number values.
* double — used for large decimal number values.
* char — used for character values.
* void — means without type.

We can define variables using these data types:

```
int a = 5;            // a variable of integer type named a with value '5'  
float b = 7.5;        //a variable named b of type float with value '7.5'  
char c = 'a';         //A variable named c with value 'a' of type char  
double d = 8965.3645; //A variable of double type named d with value '8965.3645'
```

If we want to define constants with these data types, all we need to do is add the 'const' keyword to the beginning of the variable definition.

```
const int a = 5;            // a constant of integer type named a with value '5'  
const float b = 7.5;        //a constant named b of type float with value '7.5'  
const char c = 'a';         //Create a constant named c with value 'a' of type char  
const double d = 8965.3645; //a constant with the name d of type double and the value '8965.3645'
```

Constants, unlike variables, remain at the same value throughout the program's runtime. If you try to change the value they hold in the program flow, they will give an error.

#### Array Definition

The definition of arrays is very similar to variables. In fact, arrays are structures that hold more than one variable of the same type. For example, an array of type int; It contains integer values ​​that can change.

The most important point when defining arrays is to specify the array size. When the program runs, it requests space from memory according to the size of this array, and this size does not change during the program's runtime.

We can define arrays in two ways. One of them is specifying its size and the other is specifying the values it will take:

```
int array1[10];            //A 10-element integer array.  
int array2[] = {1,2,3,4} //A 4-element integer array.
```

```
To access the elements of the arrays, we write the index of the element we will access in square brackets. The index of an element is the number that indicates the rank of that element in the array. The first element of an array is at index 0, and when each element is added, it gets the next index value.
```

```
number1 = array2[0];  //assigns the first element of array2 to number1  
number2 = array2[1];  //assigns the second element of array2 to number2  
number3 = array3[2];  //assigns the third element of array2 to number3  
number4 = array4[3];  //assigns the fourth element of array2 to number4
```

We can access the elements of the array named array2, which we defined in the previous example, as above.

We could only receive a single character with the char variable type. We need strings of characters to get a word.

```
char str1[20]; //Definition of a 20-character string  
char str2[] = "string expression"; //character array with a certain value (string)
```

#### printf() & scanf() functions

These are two functions we use to interact with the user while making console applications in C language. printf() is used to return a message to the user and scanf() is used to get a value from the user.

```
printf("Hello World\n");
```

With printf, we can return the message we want to the user within double quotes. The '\n' statement at the end is used to move to the next line in the console.

If we want to suppress the console screen of a variable or get a value from the console, we need specifiers. Some of them are:

* %d: used for integer values.
* %f: Used for float values.
* %lf : used for double values.
* %c: used for char values.
* %s : used for string values.
* %x: used for hexadecimal values.

We can take input from the user and give output using these specifiers:

```
int number;  
printf("Enter a number: ");  
scanf("%d", &number);  
printf("The entered number is %d", number);
```

What we need to pay attention to heres;  
In the scanf() function, placing the '&' sign when specifying the variable to which the value will be assigned and using the specifiers in the first parameter and in double quotes in both functions.

```
char[20] name;  //Definition of a 20-character string named name  
printf("enter your name: ");
```

In the example above, a program was written that takes a string from the user and returns this value to the user in a message.

### Condition Structures

In our second volume, we touched on condition structures and made examples of these structures. There are three types of conditionals in the C language. Comparison operators and logical operators are used in these conditionals.

Comparison operators:

* == — if equal
* != — if not equal
* > — if greater
* < — if small
* < = — if greater than or equal to
* > = — if less than equal

Logical operators:

* && — and
* || - or
* ! — not

#### if-else structure

The if else structure is one of the structures we can use to define condition statements. It always starts with an *if* statement, and falls into an *else* statement if the condition is not met. *else if* statement can be used to define more than one condition.

```
if(a==b){  
  printf("a and b equal");  
}else if(a>b){  
  printf("a is greater than b");  
}else{  
  printf("a is less than b");  
}  
printf("outside condition);
```

If the if condition is met, the statements within the condition are executed and the program flow continues outside the condition statement. If the *if* condition is not met, the next *else looks at the condition in if* (if any), if no condition is met, it falls to *else* (if any).

#### switch-case structure

The switch-case structure is a structure developed to deal with multiple situations.

```
int number;  
printf("Enter a number: ");   
scanf("%d", &number);  
  
switch(number){  
  case 1:  
    printf("Number 1 entered");  
    break;  
  case 2:  
    //Since we don't break it, it continues to run with case3.  
  case 3:  
    printf("The number 2 or 3 was entered");  
    break;  
  case 4:  
    printf("The number 4 was entered");  
    //Since we do not put a break statement, it also works as default  
  default:  
    printf("undefined number");  
}
```

It executes the statements in *case* that are appropriate based on the value of the given condition variable. This condition variable can only be of type *int* and *char*. Execution of statements continues until you see a *break* statement. That is, unless there is a *break*, the program continues to execute the statements in other *cases*.

#### ternary operator

ternaty operator is used to define fast and short conditional expressions in a single line.

```
(a==b)?printf("a and b are equal"):printf("a and b are not equal");
```

A condition is written in parentheses, followed by a question mark. The section after the question mark is the section that will be executed if the condition is true. Two points are placed after this section. The next part runs if the condition is false.

### Loops

A loop statement allows us to execute a statement or group of statements multiple times. Below is the general form of a loop statement in most programming languages:

![](https://cdn-images-1.medium.com/max/800/0*tZ55-KwCaatkE92j)

There are three types of loops in C language. These are for, while and do-while loops.

#### for loop

It executes statements multiple times and shortens the code that manages the loop variable.

```
//Program that prints numbers from 0 to 10  
for(int i=0;i<=10;++i){  
    printf("number: %d\n",i);  
}
```

Loop expressions can be nested, this is called a nested loop. This is mostly used in matrix operations.

```
//Program that prints the indices of a 20x20 matrix  
for(int i=1;i<=20;++i}{  
  for(int j=1;j<=20;++j){  
    printf("(%d,%d)\n",i,j);  
  }  
}
```

![](https://cdn-images-1.medium.com/max/800/0*oZLlTX132HC6pdpw)

#### while loop

Repeats a statement or group of statements when a given condition is true. Tests the condition before executing the loop body.

```
//Program that prints numbers from 10 to 1  
int i = 10;  
while(i>0){  
  printf("number: %d\n",i);  
  i--;  
}
```

If the condition inside the while loop is always true, an infinite loop occurs. Since there is no condition to stop the loop, the loop continues until the program is terminated.

```
//Value 1 represents true value  
while(1){  
  printf("this is an infinite loop");  
}
```

#### do while loop

Unlike the while loop, it checks the loop condition at the end, not at the beginning.

```
//Program that prints numbers from 10 to 1  
int number=10;  
do{  
  printf("number: %d\n", number);  
  number--;  
}while(number>0);
```

The do-while loop first executes the statements and then queries the condition. This can be quite useful in some situations.

```
//program that prints the numbers received from the user until 0 is reached.  
int number;  
do{  
  printf("Enter a number: ");  
  scanf("%d", &number);  
  printf("\nEntered number: %d", number);  
}while(number!=0);
```

![](https://cdn-images-1.medium.com/max/800/0*LIayjiTDiNr-k5rJ)

#### Loop control statements

**break statement:** Terminates the loop statement and transfers execution to the statement immediately after the loop.

```
//program to press q to exit the loop  
char c;  
while(1){  
  printf("enter a character: ");  
  scanf("%c", &c);  
  if(c=='q'){  
    break;  
  }  
  printf("\n loop continues");  
}  
printf("\n loop ended");
```

**continue statement:** Skips the rest of the body of the loop and moves on to the next iteration of the loop.

```
for(;;){ // infinite loop with for  
  printf("this statement works");  
  continue;  
  printf("this statement does not work");  
}
```

In the example above, if the remainder is below the continue statement, printf() will not work at all because it skips the statements under continue and starts the loop.

### Functions and Structures

The main function of functions and structures is to group/package statements. In general, we can say that functions are working statements and structures are groups of data.

#### Struct Definition

Structs are used to represent a record. Let's say you want to keep track of your books in the library. You may want to keep the following properties associated with each book:

* Book name
* Subject
* Author
* Number of Pages

If we want to define this book with a struct:

```
struct books {  
   char title[50];  
   char author[50];  
   char subject[100];  
   int pages;  
} books;
```

We can define it as . As can be seen, we obtain a wider range of data types by using many data types. To use this broad data type:

```
struct Books book1;   
//A data type definition named book1 of type struct books  
strcpy(book1.title, "C programming");  
strcpy(book1.author, "author name");   
strcpy(book1.subject, "C");  
book1.pages = 680;
```

In the above code snippet, the strcpy() function is used to assign string values. Other values ​​can be assigned with the '=' operator.

#### **typedef**

typedef is a keyword used in C programming to provide a new name for existing data types. The typedef keyword is used to redefine the name that already exists. It is very common to use it with the struct statement. This way, we don't have to reuse the struct keyword in each definition:

```
#include <stdio.h>  
#include <string.h>  
    
typedef struct students   
{  
  char name[50];  
  char branch[50];  
  int ID_no;  
} students;  
    
int main()  
{  
  students st;  //We did not use the struct keyword in the definition  
  strcpy(st.name,   
         "Ahmet Yilmaz");  
  strcpy(st.branch,   
         "Computer Science");  
  st.ID_no = 108;  
      
  return 0;  
}
```

#### Function Definition

A function is a group of statements that together perform a task. Every C program has at least one function, main(). Functions are symbolized with following () signs.

Defining a function:

```
return_type function_name( parameters) {  
   function body  
  return   
}
```

* **return type:** Specifies the type of value returned by the function with the return statement.
* **function name:** The name we use when calling the function.
* **parameters:** parameter is like a placeholder. When the function is called, values ​​are given to the parameters and this is called the actual value.
* **function body:** The section where the statements inside the function are written.

```
//returns an integer value and returns num1 and num2 values in integer type.   
//a function named field max  
int max(int num1, int num2) {  
int result;  
   
   if (num1 > num2)  
      result = num1;  
   else  
      result = num2;  
   
   return result;   
}
```

**function signature/declaration**

A function declaration tells the compiler a function name and information about how to call the function. The actual body of the function can be defined separately.

```
int max(int num1, int num2);   //function signature
```

**function call**

To use a function, you must call that function according to the defined parameters.

```
#include <stdio.h>  
   
/* function signature*/  
int max(int num1, int num2);  
/* main function */  
int main(){  
   int a = 100;  
   int b = 200;  
   int rejection;  
   
   /* function call*/  
   ret = max(a, b);  
   
   printf( "Max value is : %d\n", ret );  
   
   return 0;  
}  
   
/* function definition */  
int max(int num1, int num2) {  
   int result;  
   
   if (num1 > num2)  
      result = num1;  
   else  
      result = num2;  
   
   return result;   
}
```

#### Recursive Functions

They are loop-like structures created with functions that call themselves. In short, it is a function calling itself.

```
void recursion() {  
   recursion(); /* function calls itself */  
}  
  
int main() {  
   recursion();  
}
```

As seen above, the function named recursion calls itself. However, in this usage, the program continues forever, because there is no condition to stop it. Therefore, two cases are required when using recursive functions:

Base case: The state in which the function stops calling itself.

Recursive case: This is the case where the function calls itself.

```
int factorial(unsigned int i) {  
if(i <= 1) {  
      return 1;  //base case  
   }  
   return i * factorial(i - 1); //recursive case  
}
```

### Referencing

#### Pointers

Pointers are part of what makes the C programming language a systems language. With pointers, we can access and manage memory as much as the operating system allows. Some C programming tasks are more easily accomplished with pointers, and other tasks, such as dynamic memory allocation, cannot be accomplished without using pointers.

A pointer is a variable whose value is the address of another variable, that is, the direct address (physical address) of the memory location. We can directly access memory cells using pointers. An array or function in C is actually a pointer, it points to the starting address of the array or function in memory.

```
int *ip;    /* pointer to an integer */  
double *dp;    /* pointer to a double */  
float *fp;    /* pointer to a float */  
char *ch /* pointer to a character */
```

Above you see the definitions of different types of pointers. Two operators are important in the use of pointers:

* referencing \* : returns the value held at the referenced address.
* de-referencing &: retrieves the memory location address of a value.

We can think of these two operators as opposites of each other. While the \* operator retrieves the memory address of the value, the & operator retrieves the value at the given address.

![](https://cdn-images-1.medium.com/max/800/0*xhwIoaH5XH3vBH9k)

referencing de-referencing

Let p be a variable that holds the memory address, that is, a pointer. \*p returns the value at the memory address held in p, &p returns the memory address of p itself.

With this logic, we can create another pointer that references a pointer.

![](https://cdn-images-1.medium.com/max/800/0*fqOhphnMCqrtdVI2.jpg)

pointer to pointer

Let's have a variable named var and assign the address of this variable to ptr. Afterwards, let's assign the address of ptr to another pointer named pptr.

```
int var = 1234;  
int *ptr = &var;  
int **pptr = &ptr;
```

We defined the pointer to pointer case above. We can extend this situation as a chain as long as we want. Below is a working example.

```
#include <stdio.h>  
   
int main() {  
  
   int var;  
   int *ptr;  
   int **pptr;  
  
   var = 3000;  
  
   /* take the address of var */  
   ptr = &var;  
  
   /* take the address of ptr using address of operator & */  
   pptr = &ptr;  
  
   /* take the value using pptr */  
   printf("Value of var = %d\n", var );  
   printf("Value available at *ptr = %d\n", *ptr );  
   printf("Value available at **pptr = %d\n", **pptr);  
  
   return 0;  
}
```

#### pointer arithmetic

In the previous section, we mentioned that pointers are variables that hold memory addresses. That is, the value it holds is only the memory address. However, we have seen it defined in different types such as int, float, char, double. These 4 definitions actually hold the same type of value. So what are the differences?

This is where pointer arithmetic comes into play. The pointer in c is an address, which is a numeric value. Therefore, you can perform arithmetic operations on a pointer as well as on a numeric value. These arithmetic operations will be performed depending on the type you define the pointer. For example:

* char — 1 byte: increment the pointer by one and it will point to the next location in memory by 1 byte.
* int — 4 bytes: increment the pointer by one and it will point to the next 4 bytes in memory.
* float — 4byte: signWhen you increase the value by one, it will point to the next 4 bytes in memory.
* double — 8byte: increment the pointer by one and it will point to the next 8 bytes in memory.

This logic comes in handy in TV series. Consider an integer array with 10 elements; You can easily navigate that array with an integer pointer. When you increment the pointer by one, it moves to the next element. When you lower it, it moves to the previous element. However, you must be careful not to stray from the sequence!

```
#include <stdio.h>  
  
const int MAX = 3;  
  
int main() {  
  
   int var[] = {10, 100, 200};  
   int i, *ptr;  
  
   /* let us have array address in pointer */  
   ptr = var;  
   
   for ( i = 0; i < MAX; i++) {  
  
      printf("Address of var[%d] = %x\n", i, ptr );  
      printf("Value of var[%d] = %d\n", i, *ptr );  
  
      /* move to the next location */  
      ptr++;  
   }  
   
   return 0;  
}
```

The example above gives an example of navigating an array with pointers. ptr++ points to the next location 4 bytes in memory.

#### Dynamic Memory Management

This section explains dynamic memory management in C. The C programming language provides various functions for memory allocation and management. These are:

* **malloc():** allocates a certain size of space from memory.
* **calloc():** clears and allocates a certain size of space from memory.
* **realloc():** resizes and reallocates an area in memory.
* **free():** terminates the allocation of an area in memory.

If you know the size of an array while programming, you can define it as a static array. The space of this array is allocated when the program starts and persists until the program terminates. However, if you want to define or modify an array within the program flow, you cannot do this statically. To define an array dynamically you have to use dynamic memory management.

```
#include <stdio.h>  
#include <stdlib.h>  
#include <string.h>  
  
int main() {  
  
   char name[100];  
   char *a1;  
  
   strcpy(name, "Zara Ali");  
  
   /* allocate memory dynamically */  
   a1 = malloc( 200 * sizeof(char) );  
   
   printf("Name = %s\n", name );  
   printf("Description: %s\n", a1);  
    
  free(a1);  
}
```

In the above program, a space of 200 chars is allocated dynamically from memory. This area is left with free() at the end of the program.

### File operations

We need some functions to read/write from a file in C language. These are fopen() and fclose() functions. File opening modes are important when performing operations with these functions. Operations can be performed in whatever mode the file is opened in.   
File opening modes:

* r: Opens an existing text file for reading.
* w: Opens a text file for writing. If it does not exist, a new file is created. If it exists, it overwrites it.
* a: Opens a text file for writing in insertion mode. If it does not exist, a new file is created. It will start adding content to the file if it is available.
* r+: Opens a text file for both reading and writing.
* w+: Opens a text file for both reading and writing. If it exists, it first resets the file,. Otherwise it creates a file.
* a+: Opens a text file for both reading and writing. If the file does not exist, it creates the file. Reading will start from the beginning, but text can only be added.

We can use these functions and modes together to open and close files.

```
FILE *fp;  
fp = fopen( filename, mode );
```

Below is a working example of file operations.

```
#include <stdio.h>  
  
void main() {  
   FILE *fp;  
  
   fp = fopen("/tmp/test.txt", "w+");  
   fprintf(fp, "This is testing for fprintf...\n");  
   fputs("This is testing for fputs...\n", fp);  
   fclose(fp);  
}
```