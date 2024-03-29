import { ArithmeticCommands } from './vmTranslatorTypes';
import { FileWriter } from './fileWriter';

export class VmTranslatorCodeWriter {
    public fileWriter: FileWriter;
    
    /* Opens the output file stream and gets ready to write into it */
    constructor(file: string) {
        // TODO: make this work without sub paths as well
        this.fileWriter = new FileWriter(this.getNewFilePath(file));
    }      

    /* Informs the code writer that the translation of a new vm file
       is started */
    //public setFileName(fileName: string): void {
        // this.fileName = fileName;
    //}

    /* Writes the assembly code that is the translation of the given 
       arithmetic command. */
    // ArithmeticCommands
    public writeArithmetic(command: string): void {
        // TODO: add type...
        /*
        
        add / - need to test
        sub
        neg
        eq
        gt
        lt
         
        or
        not
        */

        if (command === 'add') {
          // assumes constants...          
          this.fileWriter.writeLine('@SP');   // select sp
          this.fileWriter.writeLine('M=M-1')  // move up in memory to the expected address for the first number
          this.fileWriter.writeLine('A=M');   // go to the address stored in memroy
          this.fileWriter.writeLine('D=M');   // set the first number to add in the D register
          this.fileWriter.writeLine('M=0');

          this.fileWriter.writeLine('@SP');   // select sp again
          this.fileWriter.writeLine('M=M-1'); // decrement the sp
          this.fileWriter.writeLine('A=M');   // go to the address for the 2nd number to add
          this.fileWriter.writeLine('M=M+D'); // add number with the new number
          this.fileWriter.writeLine('@SP');
          this.fileWriter.writeLine('M=M+1'); // set the sp back to 1 after
        }
    }

    /* Writes the assembly code that is the translation of the given command, 
       where command is either C_PUSH or C_POP */
    public writePushPop(command: 'C_PUSH' | 'C_POP', segment: string, index: number): void {
        /* todo: handle
        
        push X
        pop 
        
        argument 
        local
        static
        constant X
        this
        that
        pointer
        temp 
        */

        console.log(command);
        console.log(segment);

        if (segment === 'constant') {
            this.fileWriter.writeLine(`@${index}`);
            this.fileWriter.writeLine('D=A');
        }
        
        if (command === 'C_PUSH') {
            this.fileWriter.writeLine('@SP');      // select stack pointer
            this.fileWriter.writeLine('A=M');      // set address to stack pointer memory
            this.fileWriter.writeLine('M=D');      // set memory value to D (constant)
            this.fileWriter.writeLine('@SP');      // select stack pointer again..
            this.fileWriter.writeLine('M=M+1');    // increment the stack pointer
        }
    }

    /* closes the output file */
    public close(): void {
        this.fileWriter.close();
    }

    private getNewFilePath(file: string): string {
       let newFile = '';
       
       if (file.includes('/')) {
           newFile = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));  
       } else {
           newFile = file.substring(0, file.lastIndexOf('.'));
       }

       newFile = newFile.concat('.asm');
       return newFile;
    }
}