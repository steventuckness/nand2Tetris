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

    const vmTranslatorFileParser = new VmTranslatorFileParser(file);
    const vmTranslatorCodeWriter = new VmTranslatorCodeWriter(file);

    while(vmTranslatorFileParser.hasMoreCommands()) {
        vmTranslatorFileParser.advance();

        if (vmTranslatorFileParser.commandType() === 'C_PUSH') {
            vmTranslatorCodeWriter.writePushPop('C_PUSH', vmTranslatorFileParser.arg1(), vmTranslatorFileParser.arg2());
        } else if(vmTranslatorFileParser.commandType() === 'C_POP') {
            // TODO:
        } else if (vmTranslatorFileParser.commandType() === 'C_ARITHMETIC') {
            // TODO:
        }
        
        if (vmTranslatorFileParser.line) {
            console.log('debug line: ' + vmTranslatorFileParser.line);
        }
    }

    vmTranslatorCodeWriter.close();
}