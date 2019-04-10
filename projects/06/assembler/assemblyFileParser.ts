import { error } from "util";
const LineByLine  = require('n-readlines');

export class AssemblyFileParser {
    public readonly file: string;
    public readonly newFile: string;
    private readonly liner;
    public line: string; // blah
    private lineNumber: number;
    
    constructor(file: string) {
        this.file = file;
        this.newFile = this.file.substring(0, file.lastIndexOf('.')) + '.asm';
        this.line = '';
        this.liner = new LineByLine(file);
        this.lineNumber = 0;
    }

    public hasMoreCommands(): Boolean {
     return !!this.line || this.lineNumber === 0;   
    }

    public advance(): void {
        this.line = this.liner.next();
        console.log('this.line: ' + this.line);
        this.lineNumber++;
    }

    public commandType(): 'A_COMMAND' | 'C_COMMAND' {
        switch(this.line.substr(0, 1)) {
            case('0'):
                return 'C_COMMAND';
            case('1'):
                return 'A_COMMAND';
            default:
                throw error('fix this');
        }
            
    }

    // TODO: symbol: string

    public dest(): string {
        return this.line.substring(10, 12); 
    }
    
    public comp(): string {
        return this.line.substring(3, 9);
    }

    public jump(): string { 
        return this.line.substring(13, 15);
    }
}