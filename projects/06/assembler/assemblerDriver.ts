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
            return;
        }

        if (assemblyFileParser.commandType() === 'A_COMMAND') {
            data += assemblyFileParser.symbol();
            console.log(assemblyFileParser.symbol() + "\n");
        } else if (assemblyFileParser.commandType() === 'C_COMMAND') {
            let start = '111';
            let jump = assembler.jump(assemblyFileParser.jump());    
            let comp = assembler.comp(assemblyFileParser.comp());
            let dest = assembler.dest(assemblyFileParser.dest());
            data += start + comp + dest + jump + "\n";
            console.log(start + comp + dest + jump + "\n");
        }        
    } // end while

    data  = "monkey";

    console.log('about to start writing file');
    var fs = require("fs");
    fs.writeFile(assemblyFileParser.newFile, data, function (err: any, data: any) {
        if (err) {
            console.log('error: ' + err);
        } else {
            console.log("Successfully written to File");
        }
    });
}