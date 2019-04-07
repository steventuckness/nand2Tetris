"use strict";
exports.__esModule = true;
// assembler for week 6 of nand to tetris...
var file = process.argv[2];
var fileNameWithoutExtension = file.substring(0, file.lastIndexOf('.'));
var debugging = true;
var fs = require('fs');
var data = '';
var instruction = '';
//const FIFTEEN = 0;
//const FOURTEEN = 1;
//const THIRTEEN = 2;
if (debugging) {
    console.log(file);
}
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(file)
});
lineReader
    .on('line', function (line) {
    data += translateToInstruction(line).join("") + "\n";
    console.log('Line from file:', line);
}).on('close', function () {
    fs.writeFileSync(fileNameWithoutExtension + '.asm', data, function (err, data) {
        if (err)
            console.log(err);
        console.log("Successfully written to File");
    });
});
// var instruction: Bit[] = new Array(16);
function translateToInstruction(command) {
    var instruction = new Array(16);
    // TODO: write isC isntructions
    // TODO: write dst
    // TODO: write jmp
    // TODO: write cmd
    // TODO: pre defined symbols
    // TODO: new symbols
    if (isCInstruction(command)) {
        instruction[0] = 1;
        instruction[1] = 1;
        instruction[2] = 1;
    }
    else {
        instruction = translateAInstruction(command.substr(1, 15));
    }
    return instruction;
}
function isCInstruction(instruction) {
    return instruction.indexOf("@") !== 0;
}
function translateAInstruction(number) {
    var translatedInstruction = new Array(16);
    translatedInstruction[0] = 0; // is C instructionsm the rest is the decimal
    // TODO: set the other bits...
    var binaryNumber = Number(number).toString(2);
    var translatedInstructionIterator = 15; // start from 1 because 0 is the isC instruction indicator
    for (var binaryNumberIterator = number.length; binaryNumberIterator >= 0; binaryNumberIterator--) {
        translatedInstruction[translatedInstructionIterator] = binaryNumber.charAt(binaryNumberIterator) === '1' ? 1 : 0;
        translatedInstructionIterator--;
    }
    while (translatedInstructionIterator >= 1) {
        translatedInstruction[translatedInstructionIterator] = 0;
        translatedInstructionIterator--;
    }
    console.log(number);
    console.log(binaryNumber);
    console.log(translateAInstruction);
    return translatedInstruction;
}
function translateCInstruction(instruction) {
    // TODO: me
    return new Array();
}
function firstPass() {
}
