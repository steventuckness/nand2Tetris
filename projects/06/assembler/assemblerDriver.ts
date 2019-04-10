import { Asssembler } from "./assembler";
import { AssemblyFileParser } from "./assemblyFileParser";

// assembler for week 6 of nand to tetris...

// const Asssembler = require("./assembler");


main();

function main(): void {
    var file = process.argv[2];
    var data = '';

    console.log(file);
    
    const assemblyFileParser = new AssemblyFileParser(file);
    const assembler = new Asssembler();
    const fs = require('fs');

    console.log('blahh');

    assemblyFileParser.advance();
    
    while(assemblyFileParser.hasMoreCommands()) {
        console.log('processing...');
        assemblyFileParser.advance();
        data += assembler.translateAssemblyToMachineInstruction(assemblyFileParser.line.toString()).join("") + "\n";
    }

    
    fs.writeFileSync(assemblyFileParser.newFile, data, function (err: any, data: any) {
        if (err)
            console.log(err);
        console.log("Successfully written to File");
    });

    /*
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(file)
    });

    lineReader
    .on('line', function (line: string) {
        data += assembler.translateAssemblyToMachineInstruction(line).join("") + "\n"; 
        console.log('Line from file:', line);
    }).on('close', function() {
        fs.writeFileSync(fileNameWithoutExtension + '.asm', data, function (err, data) {
            if (err)
                console.log(err);
            console.log("Successfully written to File");
        });
    });
    */
}






