---
date: '2023-01-20'
description: 'The microprocessor works like the central processing unit of a computer. It carries out the vital functions of the computer. The functional configuration of a microprocessor is:'
draft: false
featuredImage: https://cdn-images-1.medium.com/max/800/1*eBP9qyGpkYsx-Zgy3Jvsqg.png
layout: single
title: Basic Microprocessor Architecture
type: posts
---

### What is a Microprocessor?

The microprocessor works like the central processing unit of a computer. It carries out the vital functions of the computer. The functional configuration of a microprocessor is:

* Loggers
* Command decoder
* Arithmetic and Logic unit
* Frequency generator
* Timing and Control elements

creates. As can be seen, the microprocessor represents a structure consisting of many parts.

![](https://cdn-images-1.medium.com/max/800/0*3j-qADs2-A3sg6Jz)

a standard microprocessor architecture

Microprocessors, called the heart and brain of the computer, are also called Central Processing Unit (CPU). The CPU generally performs the following operations:

* Retrieves commands from memory
* Decodes the command
* Provides control signals to all elements and units in the system
* Execute Arithmetic and Logic operations
* Responds to requests from other hardware units

If the architectural structure of a microprocessor is to be expressed in the simplest way, it consists of a group of registers, Arithmetic Logic Unit and a Control Unit that controls what work the system will do and when.

#### Registers

While a program is executing on the processor, registers are needed inside the processor, right next to it.

![](https://cdn-images-1.medium.com/max/800/0*0vAWs-tWxevtC27o)

loggers

Registers have an important place in the microprocessor architecture and are one of the elements that directly determine the processor architecture. Loggers are primarily responsible for the maneuvering and temporary retention of data.

#### Arithmetic and Logic Unit (ALU)

ALU is one of the most important units in the microprocessor where arithmetic and logic operations are performed. Input operations to this unit can be between the accumulator register and the data retrieved from memory, or between the accumulator and other registers.

![](https://cdn-images-1.medium.com/max/800/0*42MUW3fUda9LsAzC)

ALU

All operations taking place in the ALU are carried out simultaneously under the supervision of the Control Unit through control signals. The ALU receives the instruction and data (operand) and executes the order on this data.

#### Control Unit

This part, which constitutes the third part of the Central Processing Unit, is responsible for the entire operation of the system and the timeliness of the transaction. The control unit produces the control signals necessary to retrieve the instruction code in the program section in memory, decode it, process it by the ALU, and retrieve the result and put it back into memory. All internal and external elements in the computer system are controlled by these control signals.

![](https://cdn-images-1.medium.com/max/800/0*x0gYM5EH_2agDzdP)

control unit

In a simple microprocessor, this section performs three different functions:

1. **Timing Control:** The processor has an internal-clock circuit that receives input from a unit that generates an external clock signal. This signal is received and converted into timing signals according to demand and distributed to the system.
2. **Instruction decoder:** This circuit interprets the instructions held in the instruction register (IR) and sends appropriate signals to the ALU to operate with the registers. (referring to timing and interrupt signals)
3. **Interrupt logic unit:** This unit is similar to other control elements. It warns the processor by receiving interrupt signals when necessary.