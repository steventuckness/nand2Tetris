export class SymbolTable {
    private symbolAddresses: IHash = { };
    
    constructor() {
        this.loadPredinedSymbols();
    }

    // number is int
    public addEntry(symbol: string, address: number): void {
        this.symbolAddresses[symbol] = address;
    }

    public contains(symbol: string): boolean {
        return this.symbolAddresses[symbol] !== undefined;
    }

    public getAddress(symbol: string): number {
        return this.symbolAddresses[symbol];
    }

    private loadPredinedSymbols(): void {
        this.symbolAddresses["SP"] = 0;
        this.symbolAddresses["LCL"] = 1;
        this.symbolAddresses["ARG"] = 2;
        this.symbolAddresses["THIS"] = 3;
        this.symbolAddresses["THAT"] = 4;
        this.symbolAddresses["R0"] = 0;
        this.symbolAddresses["R1"] = 1;
        this.symbolAddresses["R2"] = 2;
        this.symbolAddresses["R3"] = 3;
        this.symbolAddresses["R4"] = 4;
        this.symbolAddresses["R5"] = 5;
        this.symbolAddresses["R6"] = 6;
        this.symbolAddresses["R7"] = 7;
        this.symbolAddresses["R8"] = 8;
        this.symbolAddresses["R9"] = 9;
        this.symbolAddresses["R10"] = 10;
        this.symbolAddresses["R11"] = 11;
        this.symbolAddresses["R12"] = 12;
        this.symbolAddresses["R13"] = 13;
        this.symbolAddresses["R14"] = 14;
        this.symbolAddresses["R15"] = 15;
        this.symbolAddresses["SCREEN"] = 16384;
        this.symbolAddresses["KBD"] = 24576;
    }
}

export interface IHash {
    [details: string] : number;
} 