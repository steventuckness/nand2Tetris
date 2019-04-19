import { error } from "util";
const LineByLine  = require('n-readlines');
import { SymbolTable } from './symbolTable';

export class AssemblyFileParser {
    public readonly file: string;
    public readonly newFile: string;
    private liner;
    public line: string; // blah
    private lineNumber: number;
    private totalLines: number;
    public symbolTable: SymbolTable;
    private variableAddress = 16;
    
    constructor(file: string) {
        this.symbolTable = new SymbolTable();
        this.file = file;
        this.newFile = this.file.substring(0, file.lastIndexOf('.')) + '.hack';
        this.line = '';
        this.liner = new LineByLine(file);
        this.totalLines = 0;

        while (this.liner.next()) {
            this.totalLines++;
        }

        this.liner = new LineByLine(file);
        this.lineNumber = 0;
    }

    public reset(): void {
        this.line = '';
        this.lineNumber = 0;
        this.liner = new LineByLine(this.file);
    }

    public hasMoreCommands(): Boolean {
        return this.lineNumber <= this.totalLines-1;
    }

    public advance(): void {
        this.line = this.scrubComment(this.liner.next());
        this.lineNumber++;
    }

    private convertToBinary16(value: string): string {
        let binaryNumber = Number(value.trim()).toString(2);
        let length = binaryNumber.length;
        let leadingZerosToAdd = 15;
        let leadingZeros = '';
        for (let i = 0; i < leadingZerosToAdd - length; i++) {
            leadingZeros += '0';
        }
        return '0' + leadingZeros + binaryNumber;  
    }

    private isDecimal(value: string): boolean {
        return !isNaN(+value);
    }

    public symbol(): string {
        if (this.commandType() === 'A_COMMAND') {    
            let line = this.line.toString().trim().replace("@", "");
            
            if (this.isDecimal(line)) {
                return this.convertToBinary16(line);
            } else {
                if (!this.symbolTable.contains(line)) {
                    this.symbolTable.addEntry(line, this.variableAddress);
                    this.variableAddress++; 
                } 

                return this.convertToBinary16(this.symbolTable.getAddress(line).toString());
            }
        } else if (this.commandType() === 'L_COMMAND') {
            let label = this.line.toString().trim();
            return this.symbolTable.getAddress(label).toString();            
            
        } else {
            throw new error("we shouldn't have called symbol for this");
        }
    }

    public commandType(): 'A_COMMAND' | 'L_COMMAND' | 'C_COMMAND' {
        let a = this.line.toString().trim().substring(0, 1);
        if (a === "@") {
            return 'A_COMMAND'
        } else if (a === "(") {
            return 'L_COMMAND';
        } else {
            return 'C_COMMAND';
        }    
    }

    public dest(): string {
        let it = this.line.toString().trim().indexOf('=');
        if (it !== -1) {
            return this.line.toString().trim().substring(0, it);
        } else {
            return null;
        }
        
    }
    
    public comp(): string {
        let it = this.line.toString().trim().indexOf("=");
        if (it !== -1) {
            return this.line.toString().trim().substring(it+1, this.line.length);
        } else {
            let it = this.line.toString().trim().indexOf(";");
            if (it !== -1) {
                return this.line.toString().trim().substr(0, 1);
            } else {
                return null;
            }
        }
    }

    public jump(): string { 
        let it = this.line.toString().trim().indexOf(';');
        if (it !== -1) {
            return this.line.toString().trim().substring(it+1, this.line.length);
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