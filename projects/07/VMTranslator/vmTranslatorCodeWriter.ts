import fs from 'fs'
import { ArithmeticCommands } from './vmTranslatorTypes';
import { FileWriter } from './fileWriter';

export class VmTranslatorCodeWriter {
    private fileWriter: FileWriter;
    
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
    public writeArithmetic(command: ArithmeticCommands): void {
        // TODO: add type...
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

        this.fileWriter.writeLine(`// ${command} ${segment} ${index}`)

        if (segment === 'constant') {
            this.fileWriter.writeLine(`@${index}`);
            this.fileWriter.writeLine('D=A');    
        }
        
        if (command === 'C_PUSH') {
            this.fileWriter.writeLine('@SP');
            this.fileWriter.writeLine('M=M+1');
            this.fileWriter.writeLine('A=M');
            this.fileWriter.writeLine('M=D');
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