---
date: '2022-12-19'
draft: false
title: X86 Based Microprocessor Architecture
---

---

### X86 Based Microprocessor Architecture

![](https://cdn-images-1.medium.com/max/800/1*LCI0x-uWvBBHYDnFGti6BA.png)

### What is X86?

The name x86 is the name given to processors based on the original Intel processor core license. X86-based microprocessors (Intel and AMD etc.) are used in more than 90% of desktop and laptop computers in the world. The basic structure of all modern processors is similar to each other, but they differ from each other only in some of their features.

### Processor Architecture for Programming

Advanced microprocessors also have a register section, ALU and Control unit, basically like 8-bit microprocessors. However, as the architectural structure was later adapted to a multitasking environment, the sections within the processor needed to be explained in more detail in terms of functionality, as two logical main sections.

![](https://cdn-images-1.medium.com/max/800/0*7PswzKiGH1B4pThm.png)

X86-based processors can be examined in two main parts: Bus Adaptation Unit (BIU) and Execution Unit (EU). The BIU unit is responsible for feeding the EU unit with data, while the EU unit is responsible for executing the instructions.

#### Data Integration Unit (BIU)

It handles all data and address movements on buses for the EU.

Duties:

* Fetching orders (Instruction Fetching)
* Calculating addresses of operands
* Writing operands to memory, reading operands from memory
* Transferring order bytes to the instruction queue

Main Components:

**1.Segment registers:**

Memory addresses used in advanced microprocessor systems are today expressed in two parts. These are segment and offset addresses. The reason why it is expressed this way is that the amount of memory must be quite high. Management of information in large capacity memories is quite complex. For this reason, large memories can be managed more easily by dividing them into small groups (segments) of 64KB for certain purposes. The starting addresses of these segments are kept in memory by segment registers. The addresses of the data in this section are the distance from the segment recorder content and are called offset addresses.

Each segment register holds the starting address of a segment. Segments have special functions. Advanced processors have 6 segments:

* **CS — Code Segment:** Segment where orders are kept
* **DS — Data Segment:** Segment where data is kept
* **SS — Stack Segment:** It is a stack segment, it can temporarily hold orders when necessary.
* **ES — Extra Segment:** This is the extra segment used when DS and CS are not sufficient.
* **FS — File Segment:** It has no predetermined purpose by the CPU. Used by the windows operating system on i386 and later processors to point to a thread information block (TIB).
* **GS — Graphic Segment:** It has no predetermined purpose by the CPU. Used by the windows operating system to access thread-specific memory on i386 and later processors.

**2.Instruction Queue:**

BIU implements pipeline architecture using a mechanism known as order queuing. Received orders are kept in a queue that works with FIFO (first-in first-out) logic. When the EU unit is ready for the execution of the next order, it easily reads the next order from this queue in the BIU.

![](https://cdn-images-1.medium.com/max/800/0*5HINjHYeweY7DKic)

pipeline architecture

**3. Order Pointer (IP):**

It is a 16-bit register. The code keeps the 16-bit offset of the next order in the segment. BIU; It generates the 20-bit address of the order to be brought from memory by using IP and CS registers.

**4. Address Summing Block:**

It is used to generate memory addresses. For example; It combines the 16-bit offset address in the IP register with the code segment address in the CS register to create the 20-bit address of the next instruction.

Like this; CS:IP, SS:SP, SS:BP, DS:BX, DS:SI, ES:DI, DS:DI combine to produce a 20-bit address.

#### Enforcement Unit (EU)

It is the unit where orders are decoded and executed.

Duties:

* Decode orders
* Ensuring the execution of orders
* Returning the result to BIU

Main Components:

**1.Instruction Decoder:**

It decodes the orders coming from memory and transforms them into a series of actions executed by the execution unit.

**2. Control System:**

It generates timing and control signals for the processor to perform its internal operations.

**3. ALU:**

As we mentioned before, AriThe unit responsible for mechanical and logic operations.

**4. General Purpose Loggers:**

EU has many general purpose registers. We can divide it into 3 categories: 32-bit, 16-bit and 8-bit. Non-32-bit processors do not support 32-bit registers starting with E (extended).

![](https://cdn-images-1.medium.com/max/800/0*pzTX1-e1-p0u4LXW)

General Purpose Loggers

16-bit registers are a combination of their 8-bit derivatives. For example; The AX register is a combination of the AH and AL registers. The first 8-bits of AX are kept by the AH register, and the last 8-bits are kept by the AL register. H-high means L-low. Likewise, this applies to registers BX, CX, DX.

Multi-purpose loggers are generally used in operations specific to their name:

* **AX recorder (accumulator):** This recorder, known as the accumulator, plays a leading role in handling data. It is effectively used in arithmetic operations and some I/O operations.
* **BX register (base):** The register, known as the base address register, is used to keep the offset values ​​of data groups in memory.
* **CX register (count):** It is known as the counter register and is used as a loop variable, especially in loops.
* **DX register (data):** The data register is the register that generally supports the accumulator and acts as a buffer in all operations.

**5. Pointer and Index Registers:**

In microprocessor systems, registers that show intermediate addresses in memory are called pointers. Pointer and index registers in x86 architecture:

* DI — destination-index
* SI — source-index
* SP — stack-pointer
* BP — base-pointer
* IP — instruction pointer

These registers are 16-bit. Extended 32-bit variants starting with E are also supported on processors above i386.

IP-instruction pointer helps to find the offset value of the CS register in determining the location of an instruction in the code segment. The CS:IP pair gives the address of the next instruction to be processed in the code segment.

The SP or BP register along with the SS register helps in locating a data in the stack segment. The SS:SP pair gives the address of a free space in the stacked segment.

DS and SI registers are used in address indexing operations. These index registers are needed for string and array operations. The DS:SI pair gives the address of string instructions.

**6.Flag Recorder:**

The flag register consists of a memory cell that reflects in the register bits what the result is at the end of an operation. The arithmetic operations performed affect the flags present in the X86 architecture. There are 9 flags in total, 6 status and 3 control.

![](https://cdn-images-1.medium.com/max/800/0*ROPSMM_4v9sB0bPB)

Flag Register

6 status flags:

* **Carry Flag (CF-Carry Flag):** Holds the bit in hand.
* **Parity Bit (PF-Parity Flag):** Holds the parity bit.
* **Auxiliary Carry Flag (AC-Auxilary Carry):** If there is an excess of the 3rd bit, it is set. It does the same job as CF.
* **ZF-Zero Flag:** is set if the result of the operation is 0.
* **Sign Flag (SF-Sign Flag):** 1 for negative numbers and 0 for positive numbers.
* **OF-Overflow Flag:** is set if overflow occurs as a result of the process.

3 control flags:

* **Trap Flag (TF-Trap Flag):** It is used to execute the commands step by step in debug operations.
* **Interrupt Flag (IF-Interrupt Flag):** allows interrupt requests from other processes connected to the system.
* **Direction Flag (DF-Direction Flag):** Allows the index register to move forward or backward in string operations.

---

In this article, I talked about the basic and programming-based X86-based microprocessor architecture. In order to write a program with assembly, you have to know the architecture of the processor you are using. There have been many architectural changes in the x86 family, from more primitive processors to today's advanced processors. Here we tried to discuss architecture in general.