import fs from 'fs'
import { ArithmeticCommands } from './vmTranslatorTypes';

export class VmTranslatorCodeWriter {
    private fileName = '';
    
    /* Opens the output file stream and gets ready to write into it */
    constructor(file: string) {
        // TODO: make this work without sub paths as well
        this.setFileName(this.getNewFilePath(file));

        console.log(this.fileName);

        fs.writeFileSync(this.fileName, '');
        fs.appendFileSync(this.fileName, 'test crap 2');
    }

    /* Informs the code writer that the translation of a new vm file
       is started */
    public setFileName(fileName: string): void {
        this.fileName = fileName;
    }

    /* Writes the assembly code that is the translation of the given 
       arithmetic command. */
    public writeArithmetic(command: ArithmeticCommands): void {
        // TODO: add type...
    }

    /* Writes the assembly code that is the translation of the given command, 
       where command is either C_PUSH or C_POP */
    public writePushPop(command: 'C_PUSH' | 'C_POP', segment: string, index: number): void {
        // TODO:
    }

    /* closes the output file */
    public close(): void {
        fs.closeSync(2);
    }

    private getNewFilePath(file: string): string {
       let newFile = '';
       
       if (file.includes('/')) {
           newFile = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));  
       } else {
           newFile = file.substring(0, file.lastIndexOf('.'));
       }

       newFile = newFile.concat(newFile, 'asm');
       return newFile;
    }
}