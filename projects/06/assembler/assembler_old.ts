export type bit = 0 | 1;
export type instructions = Array<bit>;
type comp = Array<bit>;

let compA: Array<string> = ['0','1', '-1', 'D', 'A', '!D', '!A', '-D+1', 'A+1', 'D+A', 'D-A', 'A-D', 'D&A', 'D|A'];
let compb: Array<string> = ['', 'M', '!M', '-M', 'M+1', 'D+M', 'D-M', 'M-D', 'D&M', 'D|M'];
let compTable: Array<string>[][]

let compT: []

export class Asssembler {
    
    public machineInstructions: instructions;
    
    constructor() {
        this.machineInstructions = new Array(16);   
    }

    public translateAssemblyToMachineInstruction(assembly: string): Array<bit> {
        let instruction: instructions = new Array(16);
        // TODO: write dst
        // TODO: write jmp
        // TODO: write cmd

        // TODO: pre defined symbols
        // TODO: new symbols

        // TODO: ignore spaces
        // TODO: ignore comments
        // TODO: ignore empty lines
        
        if (this.isCInstruction(assembly)) {
            instruction = this.translateCInstruction(assembly);
        } else {
            instruction = this.translateAInstruction(assembly.substr(1, 15));
        }

        return instruction;
    }

    private isCInstruction(instruction: string): Boolean {
        return instruction.indexOf("@") !== 0;
    }

    private translateAInstruction(number: string): instructions {
        let translatedInstruction: instructions = new Array(16);
        translatedInstruction[0] = 0; // is C instructionsm the rest is the decimal
        
        // TODO: using Number instead of number seems to be a no no here: 
        // https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html
        let binaryNumber = Number(number).toString(2); 
    
        let translatedInstructionIterator = 15; // start from 1 because 0 is the isC instruction indicator
    
        for (var binaryNumberIterator = number.length; binaryNumberIterator >= 0; binaryNumberIterator--) {
            translatedInstruction[translatedInstructionIterator] = binaryNumber.charAt(binaryNumberIterator) === '1' ? 1 : 0;
            translatedInstructionIterator--;
        }
    
        while (translatedInstructionIterator >= 1) {
            translatedInstruction[translatedInstructionIterator] = 0;
            translatedInstructionIterator--;
        }
      
        return translatedInstruction;
    }

    private translateCInstruction(instruction: string): instructions {
        let translatedInstruction: instructions = new Array(16);
    
        translatedInstruction[0] = 1;
        translatedInstruction[1] = 1;
        translatedInstruction[2] = 1;
        
        return translatedInstruction;
    }
    
    private translateComp(assembly: string): comp {
        let command = assembly.substr(0, assembly.indexOf("="));
    
    
        let translatedComp: comp = new Array(7);
    
        return translatedComp;
    }
    
    private  getAbit(command: string): bit {
        return 0;
    }
}