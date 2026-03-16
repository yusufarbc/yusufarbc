---
date: '2022-12-22'
draft: false
title: 'Basic C Programming Tutorial #2'
---

---

### Basic C Programming Tutorial #2

In this article, I will share the notes and practice questions of the Basic C Programming Training, of which we completed the second week. You can access the first week of the training [here](https://medium.com/@yusufarbc/sosyal-c-programlama-eğitimi-1-b5ef99fe4262).

---

### Loops

A loop statement allows us to execute a statement or group of statements multiple times. Below is the general form of a loop statement in most programming languages:

![](https://cdn-images-1.medium.com/max/800/0*srHR3o1A16Y8ddWa)

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

![](https://cdn-images-1.medium.com/max/800/0*XyQbq3v5a6xiEvZT)

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

![](https://cdn-images-1.medium.com/max/800/0*vOFsWpd6gw0nvsbR)

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

---

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

In the above code snippet, the strcpy() function is used to assign string values. Other values can be assigned with the '=' operator.

**typedef**

typedef is a keyword used in C programming to provide a new name for existing data types. The typedef keyword is used to redefine the name that already exists. It is very easy to use with struct statement.It is sober. This way, we don't have to reuse the struct keyword in each definition:

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

#### Functions

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
int main() {  
  
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

---

### Practice Questions

#### question-1

Create a struct named computer, define it such as processor, memory capacity, disk capacity, and make assignments to these definitions.

#### question-2

Create a struct named course and define the name of the course, the teacher teaching the course, the class of the course and the code of the course in this struct. Take this data from the user in the registration section and write the program that prints the desired course on the screen in the control section.

#### question-3

Write a function that takes a name as a parameter and prints “hello \_name\_” on the screen with the name it receives.

#### question-4

Write a function that can calculate the area or perimeter of a circle based on a selected operation type and use it in the program.

#### question-5

Write a function that calculates the average for a data array with 25 elements and use it in the program.

#### question-6

Define three functions that return the minimum value, maximum value and average values for two numbers entered from the keyboard and write a program that uses them.

#### question-7

Define the function that reverses a given string and use it in the program.