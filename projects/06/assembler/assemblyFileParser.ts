const LineByLine  = require('n-readlines');

export class AssemblyFileParser {
    public readonly file: string;
    public readonly newFile: string;
    private readonly liner;
    public line: string | boolean; // blah
    private lineNumber: number;
    
    constructor(file: string) {
        this.file = file;
        this.newFile = this.file.substring(0, file.lastIndexOf('.')) + '.asm';
        this.line = '';
        this.lineNumber = 0;
        this.liner = new LineByLine(file);
        this.advance();
    }

    public hasMoreCommands(): Boolean {
     return !!this.line;   
    }

    public advance(): void {
        this.line = this.liner.next();
        this.lineNumber++;
    }

    public commandType(): 'A_COMMAND' | 'C_COMMAND' {
        return 'A_COMMAND'; // TODO:
    }

    // TODO: symbol: string

    public dest(): string {
        // TODO
        return ''; 
    }
    
    public comp(): string {
        // TODO:
        return '';
    }

    public jump(): string {
        // TODO: 
        return '';
    }
}