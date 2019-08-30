// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

@i          // i refers to some mem. location.
M=1         // i=1
@R2         // select R2 mem register
M=0         // R2=0

@R0
D=M     // D=R0
@END
D;JEQ   // GOTO end

@R1
D=M     // D=R1
@END
D;JEQ   // GOTO end

(LOOP)
    @i
    D=M     // D=i
    @R1
    D=D-M   // D=i-R1
    @END
    D;JGT   // If (i-R1) > 0 goto End

    @R0
    D=M     // D=R0
    @R2     
    M=D+M   // R2=R2+R0

    @i
    M=M+1   // i=i+1
    @LOOP
    0;JMP   // GOTO loop
(END)
    @END
    0;JMP   // Infinite loop