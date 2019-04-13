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
        this.newFile = this.file.substring(0, file.lastIndexOf('.')) + '.txt';
        this.line = '';
        this.liner = new LineByLine(file);
        this.lineNumber = 0;
    }

    public hasMoreCommands(): Boolean {
     return !!this.line || this.lineNumber === 0;   
    }

    public advance(): void {
        this.line = this.scrubComment(this.liner.next());
        this.lineNumber++;
    }

    public symbol(): string {
        if (this.commandType() === 'A_COMMAND') {    
            let value = this.line.toString().replace("@", "");
            
            let binaryNumber = Number(value).toString(2);
            let length = binaryNumber.length;
            let leadingZerosToAdd = 15;
            let leadingZeros = '';
            for (let i = 0; i < leadingZerosToAdd - length; i++) {
                leadingZeros += '0';
            }
            return '0' + leadingZeros + binaryNumber;  

        } else {
            throw new error("we shouldn't have called symbol for this");
        }
    }

    public commandType(): 'A_COMMAND' | 'C_COMMAND' {
        let a = this.line.toString().substring(0, 1);
        if (a === "@"){
            return 'A_COMMAND';
        } else {
            return 'C_COMMAND';
        }    
    }

    public dest(): string {
        let it = this.line.toString().indexOf('=');
        if (it !== -1) {
            return this.line.toString().substring(0, it-1);
        } else {
            return null;
        }
        
    }
    
    public comp(): string {
        let it = this.line.toString().indexOf("=");
        if (it !== -1) {
            return this.line.toString().substring(it+1, this.line.length);
        } else {
            let it = this.line.toString().indexOf(";");
            if (it !== -1) {
                return this.line.toString().substring(0, it-1);
            } else {
                return null;
            }
        }
    }

    public jump(): string { 
        let it = this.line.toString().indexOf(';');
        if (it !== -1) {
            return this.line.toString().substring(it+1, this.line.length);
        } else {
            return null;
        }        
    }

    private scrubComment(value: string): string {
        if (!value) {
            return value;
        }
        
        let commentIndex = value.toString().indexOf("//");
        
        if (commentIndex !== -1) {
            return value.toString().substring(0, commentIndex-1);
        } else {
            return value;
        }
    }
}