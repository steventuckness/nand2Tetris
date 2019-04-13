import { Asssembler } from "./assembler";
import { AssemblyFileParser } from "./assemblyFileParser";

main();

// tsc
// node assemblerDriver.js basicFile.txt

function main(): void { 
    var file = process.argv[2];
    var data = '';

    const assemblyFileParser = new AssemblyFileParser(file);
    const assembler = new Asssembler();

    while(assemblyFileParser.hasMoreCommands()) {
        assemblyFileParser.advance();
              
        // TODO: this isn't currently handling blank lines very well...so when we do the prescan count the number of lines check which line number we
        // are on instead for the hasMoreCommands check.
        if (!assemblyFileParser.line || isBlankLine(assemblyFileParser) || isCommentLine(assemblyFileParser)) {
            continue;
        }
 
        if (assemblyFileParser.commandType() === 'A_COMMAND') {
            data += assemblyFileParser.symbol() + "\n";
            console.log(assemblyFileParser.symbol());
        } else if (assemblyFileParser.commandType() === 'C_COMMAND') {
            let start = '111';
            let jump = assembler.jump(assemblyFileParser.jump());    
            let comp = assembler.comp(assemblyFileParser.comp());
            let dest = assembler.dest(assemblyFileParser.dest());
            data += start + comp + dest + jump + "\n";
            console.log(start + comp + dest + jump);
        }        
    } // end while
 
    var fs = require("fs");
    fs.writeFileSync(assemblyFileParser.newFile, data, function (err: any) {
        if (err) {
            console.log('error: ' + err);
        } else {
            console.log("Successfully written to File");
        }
    });
}

function isBlankLine(assemblyFileParser): boolean {
    return !assemblyFileParser.line.toString().replace(/\s/g, '').length;
}

function isCommentLine(assemblyFileParser): boolean {
    return assemblyFileParser.line.toString().substring(0, 2) === "//"
}