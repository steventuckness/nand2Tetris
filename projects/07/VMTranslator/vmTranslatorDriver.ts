import { VmTranslatorFileParser } from "./vmTranslatorFileParser";


main();

function main(): void {
    var file = process.argv[2];

    const vmTranslatorFileParser = new VmTranslatorFileParser(file);
    let data = '';

    while(vmTranslatorFileParser.hasMoreCommands()) {
        vmTranslatorFileParser.advance();
        data += vmTranslatorFileParser.line + '\n';
    }

    var fs = require("fs");
    fs.writeFileSync(vmTranslatorFileParser.newFile, data, function (err: any) {
        if (err) {
            console.log('error: ' + err);
        } else {
            console.log("Successfully written to File");
        }
    });
}