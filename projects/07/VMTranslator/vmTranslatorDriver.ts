/*
    tsc
    node vmTranslatorDriver.js '../StackArithmetic/SimpleAdd/SimpleAdd.vm'

    should output SimpleAdd.asm
*/

import { VmTranslatorFileParser } from "./vmTranslatorFileParser";
import { VmTranslatorCodeWriter } from './vmTranslatorCodeWriter';

main();

function main(): void {
    var file = process.argv[2];

    console.log('test')

    const vmTranslatorFileParser = new VmTranslatorFileParser(file);
    const vmTranslatorCodeWriter = new VmTranslatorCodeWriter(file); // TODO: add name as constructor

    let data = '';

    while(vmTranslatorFileParser.hasMoreCommands()) {
        vmTranslatorFileParser.advance();

        console.log(vmTranslatorFileParser.line);
        data += vmTranslatorFileParser.line + '\n';
    }

    // TODO: blah

    var fs = require("fs");

    fs.writeFileSync(vmTranslatorFileParser.newFile, data, function (err: any) {
        if (err) {
            console.log('error: ' + err);
        } else {
            console.log("Successfully written to File");
        }
    });
}