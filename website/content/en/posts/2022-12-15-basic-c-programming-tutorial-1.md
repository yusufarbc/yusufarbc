---
date: '2022-12-15'
draft: false
title: 'Basic C Programming Tutorial #1'
type: posts
---

### Basic C Programming Tutorial #1

In this article, I will share the notes and practice questions of the Basic C Programming Training, the first week of which we completed. You can access my previous article [here](https://medium.com/@yusufarbc/c-programlama-dilinin-gelişimi-24ec503f108a), where I explained the development and syntax of the C language.

---

### Definitions

In our first lesson, we introduced the C language and touched on the basic definitions.

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

To access the elements of the arrays, we write the index of the element we will access in square brackets. The index of an element is the number that indicates the rank of that element in the array. The first element of an array is at index 0, and when each element is added, it gets the next index value.

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
printf("Enter a number: ");scanf("%d", &number);  
printf("The entered number is %d", number);
```

Things we need to pay attention to here:  
In the scanf() function, placing the '&' sign when specifying the variable to which the value will be assigned and using the specifiers in the first parameter and in double quotes in both functions.

```
char[20] name;  //Definition of a 20-character string named name  
printf("enter your name: ");
```

In the example above, a program was written that takes a string from the user and returns this value to the user in a message.

---

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
  
switch(condition){  
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

ternaty operator is used to define quick and short conditional expressions in a single line

```
(a==b)?printf("a and b are equal"):printf("a and b are not equal");
```

A condition is written in parentheses, followed by a question mark. The section after the question mark is the section that will be executed if the condition is true. Two points are placed after this section. The next part runs if the condition is false.

---

### Practice Questions

#### question-1

Write a C program that displays the sum of two given numbers on the console screen.

#### question-2

Write a C program that performs four operations with two numbers received from the user and displays the results on the console screen.

#### question-3

Write a C program that calculates the area of a rectangle given two side lengths and prints it to the screen.

#### question-4

Write a C program that finds the largest of 3 numbers received from the user.

#### question-5

Write a C program that performs the specified operation among four operations based on an operation code entered from the keyboard and two numbers, and prints the result on the screen.

#### question-6

Calculate the average of three different grade values for a course. If the result is less than 50, write a C program that says "fail", if the result is greater than 50, "pass".

#### question-7

Get 3 numbers from the user. Write a C program that calculates the square of the first number when you enter 1, the square of the second number when you enter 2, and the square of the 3rd number when you enter 3, using the switch structure.