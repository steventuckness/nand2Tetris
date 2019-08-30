// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

@fillbits
M=0

(LOOP)    
    @SCREEN
    D=A
    @colorloopiterator
    M=D
    
    @KBD 
    D=M

    @SETWHITEBITS
    D;JEQ

    @SETBLACKBITS
    D;JNE

(SETWHITEBITS)
    @fillbits
    M=0
    @COLORFILL
    0;JMP

(SETBLACKBITS)
    @fillbits
    M=-1
    @COLORFILL
    0;JMP

(COLORFILL)
    @fillbits
    D=M
   
    @colorloopiterator
    A=M
    M=D

    @colorloopiterator
    MD=M+1
    
    @24576
    D=A-D

    @COLORFILL
    D;JNE
 
    @LOOP
    0;JMP

   
