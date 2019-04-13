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
        if (!assemblyFileParser.line) {
            break;
        }

        if (!assemblyFileParser.line.toString().replace(/\s/g, '').length) {
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