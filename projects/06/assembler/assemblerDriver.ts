import { Asssembler } from "./assembler";
import { AssemblyFileParser } from "./assemblyFileParser";

// assembler for week 6 of nand to tetris...

main();

function main(): void {
    var file = process.argv[2];
    var data = '';
    
    const assemblyFileParser = new AssemblyFileParser(file);
    const assembler = new Asssembler();
    const fs = require('fs');

    while(assemblyFileParser.hasMoreCommands()) {
        assemblyFileParser.advance();

        // TODO: yuck
        if (assemblyFileParser.line) {
            data += assembler.translateAssemblyToMachineInstruction(assemblyFileParser.line.toString()).join("") + "\n";
        }
    }

    
    fs.writeFileSync(assemblyFileParser.newFile, data, function (err: any, data: any) {
        if (err)
            console.log(err);
        console.log("Successfully written to File");
    });
}






