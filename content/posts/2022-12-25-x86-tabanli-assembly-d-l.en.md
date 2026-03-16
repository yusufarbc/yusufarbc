---
title: "X86-BASED ASSEMBLY LANGUAGE"
date: 2022-12-25
draft: false
---

---

### X86 Based Assembly Language

![](https://cdn-images-1.medium.com/max/800/1*BAtuHRcfthhw1Adspm0Jsg.png)

### Assembly language Overview

A computer system basically consists of elements such as hardware and software. Hardware is the structure that connects the electronic and mechanical systems of the computer. If we consider a personal computer, the monitor, keyboard, system unit and other physical cables and devices all constitute hardware parts. The existence of all these elements is useless without software. The software regulates all operations of the system from opening to closing. Software is divided into two: system software and application software. Application software is used in performing statistical analysis, executing game programs, etc. used in transactions. System software is used to perform the functions of the system. Application software is routed through system software. The best example of system software is operating systems (windows, linux, unix).

#### **Machine Language**

In order for a human being to communicate with a machine, he must understand its language. For this purpose, the language of the system is created by serializing the logical 0 and 1 values, which are the basic elements in the operation of the system, in certain proportions and interpreting them according to a certain order.

![](https://cdn-images-1.medium.com/max/800/0*ORZKX7SQuqXG8bU2.jpg)

In microprocessor systems, the language consisting of logical 0s and 1s and written to perform a certain task is called machine language. The juxtaposition of these numbers that make up the machine language creates a sequence that is incomprehensible to the programmer.

Programs written in machine language are difficult to interpret by programmers or users and are difficult to remember. There are a few drawbacks to writing a program directly in machine language. It is very difficult to write error-free programs, except for small programs. Since what is written consists of 0s or 1s, everything is similar and it is not easy to eliminate errors.

#### Assembly Language

To overcome the difficulties that arise in machine language, assembly language, which belongs to the low-level language group, is used. Instead of binary or hex representation of command codes, assembly language uses command abbreviations called mnemonic.

Usage of mnemonic:

```
MOV AX.05  
ADD AX,10  
SUB AX.05  
NOT AX  
MOV BX,AX  
INT 21H
```

Each company also offers mnemonics related to the microprocessor it produces to the market. In the small program snippet above, each line handles a complete command. Each instruction corresponds to one two or 3 bytes of binary code.

![](https://cdn-images-1.medium.com/max/800/0*JB_H9rRUMsl76-cW.png)

assembler

Every program written in assembly language needs to be translated into machine code while being stored or processed in memory. This conversion process is done manually or with the help of an assembler.

#### ISA (Instruction Set Architecture)

When talking about commands, it is impossible not to mention [ISA](https://en.wikipedia.org/wiki/Instruction_set_architecture). Instruction Set Architecture (ISA) is part of an abstract computer model that defines how the CPU is controlled by software. ISA acts as an interface between hardware and software, specifying both what the processor can do and how it does it.

ISA provides the only way a user can interact with the hardware. It can be viewed as a programmer's manual because it is the part of the machine visible to the assembly language programmer, compiler writer, and application programmer.

#### Program Format

Four separate fields can be defined in each line of source codes written in assembly language, consisting of Commands and Instructions.

* Label area
* Command area
* Operand space
* Description field

Label, command and operand fields are separated from each other by one or more spaces or tabs. The description field must be separated by a semicolon.

```
Start:  
  MOV EDX, 2025H;  ;Load number 2025H into EDX register  
  ADD EAX, EDX;    ;Add this value to the EAX register  
End:
```

In the small code snippet above, *Start* and *End* are labels, *MOV* and *ADD* are commands, *EDX, 2025H* and *EAX, EDX* are operands, and after the semicolon is the description field.

---

### X86 Instruction Set

The instruction set used by x86-based processors consists of a series of mnemoics used during program writing. Some commands in the instruction set may perform the same function as each other. The programmer does not need to know all the commands in the instruction set. 500 commandsKnowing about 100 of them will be enough to write a program in assembly language.

We can divide commands into groups according to their intended use:

* Data transfer commands
* Arthimetic and Logic commands
* Program Control Commands

Let's look at the commonly used commands.

#### Data Transfer Commands

* **MOV**copies operand2 to operand1. It cannot change the value of the CS and IP registers. It does not directly copy the value of a segment record or an immediate value to another segment record. It does not affect status flags. **Operands:  
  -** REG, memory  
  - memory, REG  
  - REG, REG  
  - memory, immediate  
  - REG, immediate
* **PUSH/POP**PUSH and POP commands allow us to store data in the stack segment. PUSH pushes data to the stack, POP pulls data from the stack. It takes a single operand. It does not affect status flags.  
  **Openrands:**- REG  
  memory  
  - immediate
* **IN/OUT**IN command enables data transfer to AL or AX via ports, it can be used in DX if necessary. The second operand is a port number.   
  The out command is the opposite. **Operands:  
  -** GET, im.byte — im.byte, GET  
  - BUY, DX — DX, BUY  
  - AX, im.byte — im.byte, AX  
  - AX, DX — DX, AX

#### **Arithmetic and Logic Instructions**

* **ADD/ADC**adds operand2 to operand1 and assigns the result to operand1. The difference of ADC is that it also includes the carry bit in addition. Affects all status flags.  
  **Operands:  
  -** REG, memory  
  - memory, REG  
  - REG, REG  
  - memory, immediate  
  - REG, immediate
* **SUB/SBB**subtracts operand2 from operand1 and assigns the result to operand1. The difference of SBB is that it also includes the carry bit in extraction. Affects all status flags.  
  **Operands:  
  -** REG, memory  
  - memory, REG  
  - REG, REG  
  - memory, immediate  
  - REG, immediate
* **MUL/IMUL**MUL and IMUL instructions multiply the operand it receives for 8-bit numbers with AL and assign the result to AX. For 16-bit numbers, it multiplies the received operand by AX and assigns the result to the DX:AX registers. The difference between İMUL and the MUL command is that it is for signed numbers. It only affects the carry and overflow flags. **Operands:  
  -** REG  
  memory
* **DIV/IDIV**DIV and IDIV instruction divides the AX register into the operand for the 8-bit operand and assigns the result to AL. For the 16-bit operand, it assigns the DX:AX registers to AX as the result of dividing the operand. The difference between IDIV and DIV command is that it is for signed numbers.**Operands:  
  -** REG  
  memory
* **INC/DEC**INC command is used to increase the value of the operand by one, and DEC command is used to decrease it by 1. Affects all flags except the Carry flag. **Operands:  
  -** REG  
  memory
* **NEG**Assigns the 2's complement of the operand to the back operand.  
  **Operands:  
  -** REG  
  memory
* **AND/OR/XOR/NOT**These are commands used to perform logical operations. They take two operands except the NOT instruction. They affect the zero, sign and parity flags. **Operands:  
  -** REG, memory  
  - memory, REG  
  - REG, REG  
  - memory, immediate  
  - REG, immediate
* **SHR/SHL**The SHR instruction shifts operand1 to the right by the number specified in operand2. It takes logic-0 from the shifted part and the resulting value is copied to carry. SHL does the same by shifting it to the left. Affects the Carry and Overflow flags. OF=0 if the first operand retains the original sign.  
  **Operands:**  
  - memory, immediate  
  - REG, immediate  
  -memory, CL  
  - REG, CL
* **ROR/ROL**The ROR command rotates operand1 to the right by the number specified in operand2. The resulting value is taken back from the beginning and also copied to Carry. The ROL command is the left-rotated version of this operation. Affects the Carry and Overflow flags. OF=0 if the first operand retains the original sign. **Operands:**  
  - memory, immediate  
  - REG, immediate  
  -memory, CL  
  - REG, CL
* **RCR/RCL**RCR command rotates operand1 to the right via the carry flag by the number specified in operand2. The resulting value is copied to carry, and the value of carry is taken back from the beginning. The RCL command is the left-rotated version of this operation. Affects the Carry and Overflow flags. OF=0 if the first operand retains the original sign. **Operands:**  
  - memory, immediate  
  - REG, immediate  
  -memory, CL  
  - REG, CL
* **CMP**This is the command used for the comparison process. It takes two operands, subtracts operand2 from operand1 but does not assign. This arranges the flags according to the subtraction process.  
  **Operands:  
  -** REG, memory  
  - memory, REG  
  - REG, REG  
  - memory, immediate  
  - REG, immediate

![](https://cdn-images-1.medium.com/max/800/1*cTFBzk0u0qRVO5sdUCTZtw.png)

Status of flags at the end of the CMP process

#### Program Control Commands

* **JMP**  
  These are commands that allow us to make branches in the program flow. The JMP command is used for unconditional branching. It takes the part of the program flow to be branched as an operand with a label. There are many commands that allow us to do conditional branching.

![](https://cdn-images-1.medium.com/max/800/0*rqiV9TW4c9eHSlii)

JUMP INSTRUCTIONS

* **LOOP**  
  The LOOP command makes it easier to set up a loop. At each iteration, it decrements the CX register by one and ends the loop if CX is zero. It takes the part of the program flow to be branched as an operand with a label.

---

### Assembly Instructions

To develop a program in assembly language, some basic rules need to be known. These rules include the general coding format, description fields, instructions that control the list of programs to be translated, and stages of defining segments and procedures.

As mentioned before, two types of expressions are used in the command field. These are instruction and instructions. Both refer to the word instruction, but instructions are for the processor and instructions are for the assembler. Instructions are used to set up segments and procedures such as subroutines, define symbols, allocate memory for temporary storage, and perform similar tasks. Instructions; We can discuss it in 3 groups: data, listing and operating mode.

#### Listing Instructions

In an assembled program, they determine the page format, program title and subheadings, and the writing format.

```
Page 60,120; the page will consist of 60 rows and 120 columns  
Title prog1 ;prog1 title
```

The number of rows and columns determines the width and height of a page when printing a program written in assembly language. With the Title instruction, what the program generally does is printed on the second line of each list.

#### Data Instructions

Data instructions are divided into five groups. These are segment or procedure definitions, symbol definitions, data definitions, external references and assembly control definitions.

**SEGMENT Instruction**The segment instruction is used to define the beginning of a segment. Each segment must be expressed with a meaningful label. While the opening of a segment begins with a name, it must be closed with the same name and ENDS.

```
NAME SEGMENT  
... ...  
... ...  
... ...  
... ...  
NAME ENDS
```

One or more segments can be defined in a program depending on its type (exe or com). As we remember from the x86 microprocessor architecture; The code segment refers to the area where commands are placed, the data segment refers to the area where data is stored, and the stack segment refers to the memory area where data is temporarily discarded. Outside the stack, data segments and code segments can be defined more than once.

**PROC Instruction** Program parts that contain codes written for a specific purpose are called procedures. Many procedures can be placed inside the code segment, one of which is the main one. The main procedure includes the installation (initial) and execution (development) and result phases of the program. Procedure calls are generally made in the enforcement department. A simple procedural mechanism is expressed within the segment as follows:

```
PROCADI PROC HEADLIGHT/NEAR  
   <expressions>  
PROCADI ENDP
```

As can be seen, the procedure definition is similar to the segment definition, except for the label naming. Another procedure can be called from within the main procedure or from another procedure called from within the main procedure. However, the important point is that each procedure has its own name and return command. Subprocedures are generally called from within the main procedure by calling them with the CALL command.

**ASSUME Instruction**The Assume instruction informs the assembler about the segment used and defines which segments will use which segment registers. The format is as follows:

```
ASSUME Segment register:segment name
```

Segment registers; Segment names CS, DS, SS, and ES are the names given to the segments by the programmer. JMP, CALL, and similar code references are relative to the current code segment. The assembler has to know which segment is data and which segment is code segment. Because the assembler translates the program in the assembly language written by the programmer into machine code, defines the places where the segments will be placed in memory, and acts according to the tag address of the segments during program execution.has to push.

**Operating Modes** With the emergence of 8086 and 8088 processors, DOS came to the fore as an operating system. The commands and memory usage that DOS could run on the processor at that time were sufficient for the current system.

Processors using the x86 microarchitecture must be backward compatible. However, the development and increased performance of processors have made backward compatibility difficult. To ensure this compatibility, the processor is divided into various operating modes.

* Real Mode: Systems on which the DOS operating system runs operate under Real Mode.
* Protected Mode: Protected Mode programs, where data protection is a priority, run under Protected Mode.
* Virtual Mode: It is a virtualization technology that can run more than one real mode program at the same time by using virtual memory space and can also run protected mode programs.

---

### An Assembly Program Using the 8086 Processor

```
;Increase received from the keyboard through the virtual ports of EMU8086  
display from virtual ports by accumulating the amount in a counter.  
program that reflects on its port with a certain delay  
  
PORTA EQU 110 ; Virtual input port for logging in from the keyboard  
PORTB EQU 199 ; Virtual output port, diplay  
  
organ 100h  
  MOV SI,1 ; counter value to be shown on the display  
  MOV CX,1 ; increase amount  
  
again:  
  MOV DX,PORTA  
  IN AL,DX ;Read the value entered from the keyboard from the input port  
  cbw ;convert the byte in the ax register to word  
  MOV CX,AX ;back up the increment amount entered from the keyboard  
  ADD SI,CX ; update the value in the counter  
  MOV DX,PORTB  
  MOV AX,SI  
  OUT PORTB,AX ;carry the value from the counter to the diplayer  
  CALL DELAY; delay for the value on the display to be visible  
  JMP again  
  REJECTION  
  
  
;Procedure recognition  
DELAY PROC  
  PUSH CX ; backup the registers used in the main program to the stack  
  MOV CX,020H  
J1:  
  NOP  
  NOP  
  LOOP J1  
  POP CX ;get backed up reg from stack  
  REJECTION  
DELAY ENDP
```

---

In this article, I tried to cover the issue of Assembly Programming in X86-based microprocessors without going into too much detail. You can access my article describing the The most critical point in assembly programming is to recognize the architecture of the hardware/processor we use and to write our program according to the command set and instructions that this architecture offers us. This aspect distinguishes assembly language from high-level languages ​​in which we do not depend on hardware. It falls under the definition of low-level language. I hope it was useful. Don't forget to comment!