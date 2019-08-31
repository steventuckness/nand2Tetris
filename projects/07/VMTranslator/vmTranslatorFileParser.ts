/* Parser: Handles the parsing of a single .vm file, and encapsulates access 
   to the input code. It reads VM commands, perses them, and provides convenient access to their
   components. In addition, it removes all white space and comments.
*/

const LineByLine = require('n-readlines');

type CommandType = 'C_ARITHMETIC' | 
                         'C_PUSH' | 
                          'C_POP' | 
                        'C_LABEL' | 
                         'C_GOTO' | 
                           'C_IF' | 
                     'C_FUNCTION' | 
                       'C_RETURN' | 
                          'C_CALL';

export class VmTranslatorFileParser {
    public readonly file: string;
    public readonly newFile: string;
    private liner: any;
    public line: string;
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

    /* Are there more commands fro mthe input? */
    public hasMoreCommands(): boolean {
        return this.lineNumber <= this.totalLines-1;
    }

    /* Read the next comamnd from the input and makes it the current command. Should be called only if hasMoreComamnds() is true. Initially
       there is no current command
    */ 
    public advance(): void {
        this.line = this.scrub(this.liner.next());
        this.lineNumber++;
    }

    /* Returns the type of the current VM command. C_ARITHMETIC is returned for all the arithmetic commands.
    */
    public commandType(): CommandType  {
        // TODO: finsih me
        return 'C_ARITHMETIC';
    }

    /* Returns the first argument of the current command. In the case of C_ARITHMETIC, the command itelsef (add, sub, etc.) is returned.
       Should not be called if the current command is C_RETURN */
    public arg1(): string {
        return 'TODO'; // TODO:
    }

    /*  Returns the second argument of the current command. Should be called only if the current comamnd is C_PUSH, C_POP, C_FUNCTION,
        or C_CALL. 
    */
    public arg2(): number {
        return 1; // TODO
    }

    // remove comments and empty lines
    private scrub(value: string): string {     
        if (!value) {
            return value;
        }
        
        let commentIndex = value.toString().indexOf("//");
        
        if (commentIndex !== -1) {
            return value.toString().substring(0, commentIndex-1); // TODO: why need tostring
        } else {
            return value.toString().trim(); // TODO: get rid of to tostring
        }
    }
}