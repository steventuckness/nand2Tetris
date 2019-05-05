import { error } from "util";
const LineByLine  = require('n-readlines');

export class VmTranslatorFileParser {
    public readonly file: string;
    public readonly newFile: string;
    private liner;
    public line: string; // blah
    private lineNumber: number;
    private totalLines: number;

    constructor(file: string) {
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

    public hasMoreCommands(): boolean {
        return this.lineNumber <= this.totalLines-1;
    }

    public advance(): void {
        this.line = this.scrub(this.liner.next());
        this.lineNumber++;
    }

    public commandType(): 'C_ARITHMETIC' | 'C_PUSH' | 'C_POP' | 'C_LABEL' | 'C_GOTO' | 'C_IF' | 'C_FUNCTION' | 'C_RETURN' | 'C_CALL' {
        // TODO: finsih me
        return 'C_ARITHMETIC';
    }

    private scrub(value: string): string {     
        if (!value) {
            return value;
        }
        
        let commentIndex = value.toString().indexOf("//");
        
        if (commentIndex !== -1) {
            return value.toString().substring(0, commentIndex-1);
        } else {
            return value.toString().trim();
        }
    }
}