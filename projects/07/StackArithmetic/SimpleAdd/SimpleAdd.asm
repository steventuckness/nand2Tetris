// push constant 7
@7
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 8
@8
D=A
@SP
A=M
M=D
@SP
M=M+1
// add
@2
D=2

@SP   // select stack pointer
M=M-2 // move to second number
A=M
D=M   // save value to d register... D should be 2nd number

@SP
M=M-1 // move to first number
A=M
M=M+D // set first number to first number + second number