import lineReader from 'line-reader';
import fs from 'fs';

export default class OpcodeComputer {
    
    private readonly _operations : { [key: number]: { name: string, compute: (...operands: any[]) => any} } = {
        1: { name: "add", compute: this.add },
        2: { name: "multiply", compute: this.multiply },        
    };

    private readonly _haltCode = 99;

    public async execute(opcodes: number[]): Promise<number[]> {
        for (let i = 0; i < opcodes.length; i+=4)
        {
            const opcode = opcodes[i]; 

            if (opcode == this._haltCode)
                return opcodes;          

            if (!(opcode in this._operations))
                throw `Unknown_Opcode_Exception: Unable to handle opcode ${opcode}`;

            const { result, savePosition } = this.computeOperation(opcodes, i);
            
            opcodes[savePosition] = result;
        }

        return opcodes;
    }

    private computeOperation(opcodes : number[], pointer : number): { result: number, savePosition: number } {
        const opcode = opcodes[pointer];
        const operand_1_position = opcodes[pointer+1];
        const operand_2_position = opcodes[pointer+2];
        const savePosition = opcodes[pointer+3];
    
        const operand1 = opcodes[operand_1_position];
        const operand2 = opcodes[operand_2_position];
    
        return { result: this._operations[opcode].compute(operand1, operand2), savePosition };
    }

    private add(...operands: number[]) : number { return operands.reduce((total, num) => num + total)};
    private multiply(...operands: number[]) : number { return operands.reduce((total, num) => num * total)};
}







