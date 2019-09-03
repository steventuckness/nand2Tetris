import fs from 'fs'

export class FileWriter {
    private fileName: string;
    
    constructor(fileName: string) {
        this.fileName = fileName;
        fs.writeFileSync(this.fileName, '');
    }
    
    /* creates a new file */
    /*public writeFile(line: string): void {
        fs.writeFileSync(this.fileName, line);
    } */
    
    /* appends current file */
    public writeLine(line: string): void {
        fs.appendFileSync(this.fileName, line + '\n');
    }

    public close(): void {
        fs.closeSync(2);
    }
}