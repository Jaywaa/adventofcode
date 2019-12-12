import readline from 'readline-sync';

interface IOperation {
    code: number;
    name: string;
    compute: (opcodes: number[], instruction: IInstruction, pointer: number) => Promise<number>;
    numParams: number;
}

interface IInstruction {
    opcode: number;
    operation: IOperation;
    parameters: number[];
    parameterModes: number[];
}

export default class OpcodeComputer {

    private readonly _haltCode = 99;
    private readonly _inputs: number[];
    
    constructor(inputs: number[] = []) {
        this._inputs = inputs.reverse();
    }

    public async execute(opcodes: number[]): Promise<number[]> {
        console.log("Begin execution.");

        for (let pointer = 0; pointer < opcodes.length;)
        {
            const instruction = await this.getInstruction(opcodes, pointer); 

            if (instruction.opcode === this._haltCode)
            {
                console.log(`Operation: ${instruction.opcode} - Program halting.`)
                return opcodes;          
            }

            if (!(instruction.opcode in this._operations))
                throw `Unknown_Opcode_Exception: Unable to handle opcode ${instruction}`;

            pointer += await instruction.operation.compute(opcodes, instruction, pointer);
        }

        return opcodes;
    }

    private async getInstruction(opcodes: number[], pointer: number): Promise<IInstruction> {
        const instruction = opcodes[pointer];
        const opcode = instruction%100;
        const operation = this._operations[opcode];

        const firstParamMode = Math.floor((instruction/100)%10);
        const secondParamMode = Math.floor((instruction/1000)%10);
        const thirdParamMode = Math.floor((instruction/10000)%10);

        const parameters: number[] = [];
        for (let i = 1; i <= operation.numParams; i++)
        {
            parameters.push(opcodes[pointer+i]);
        }
        return {
            opcode,
            operation,
            parameters,
            parameterModes: [firstParamMode, secondParamMode, thirdParamMode]
        };
    }

    private async add(opcodes: number[], instruction: IInstruction) : Promise<number> {
        const operand1 = instruction.parameterModes[0] === 0 ? opcodes[instruction.parameters[0]] : instruction.parameters[0];
        const operand2 = instruction.parameterModes[1] === 0 ? opcodes[instruction.parameters[1]] : instruction.parameters[1];

        const result = operand1 + operand2;

        opcodes[instruction.parameters[2]] = result;

        return instruction.operation.numParams+1;
    };
    private async multiply(opcodes: number[], instruction: IInstruction) : Promise<number> { 
        const operand1 = instruction.parameterModes[0] === 0 ? opcodes[instruction.parameters[0]] : instruction.parameters[0];
        const operand2 = instruction.parameterModes[1] === 0 ? opcodes[instruction.parameters[1]] : instruction.parameters[1];

        const result = operand1 * operand2;

        opcodes[instruction.parameters[2]] = result;


        return instruction.operation.numParams+1;
    };
    private readInt = async (opcodes: number[], instruction: IInstruction) : Promise<number> => { 
        const input = this._inputs.pop();
        console.log("Reading next input:", input);
        
        if (input === undefined)
            throw new Error(`No input provided for instruction. Exiting.\nInstruction: ${instruction}`);
        
        opcodes[instruction.parameters[0]] = input;

        return instruction.operation.numParams+1;
    };
    private async output(opcodes: number[], instruction: IInstruction) : Promise<number> { 
        console.log(`out: ${opcodes[instruction.parameters[0]]}`) 
        return instruction.operation.numParams+1;
    };
    private async noOp(opcodes: number[], instruction:IInstruction) : Promise<number> {
        return instruction.operation.numParams+1;
    };
    private async jumpIfTrue(opcodes: number[], instruction:IInstruction, pointer: number): Promise<number> {
        const value = instruction.parameterModes[0] === 1 ? instruction.parameters[0] : opcodes[instruction.parameters[0]];
        
        if (value !== 0)
            return instruction.parameterModes[1] === 1 
                ? instruction.parameters[1] - pointer
                :opcodes[instruction.parameters[1]] - pointer;
                 

        return instruction.operation.numParams+1;

    }
    private async jumpIfFalse(opcodes: number[], instruction:IInstruction, pointer: number): Promise<number> {
        const value = instruction.parameterModes[0] === 1 ? instruction.parameters[0] : opcodes[instruction.parameters[0]];
        
        if (value === 0)
            return instruction.parameterModes[1] === 1 
                ? instruction.parameters[1] - pointer 
                : opcodes[instruction.parameters[1]] - pointer;                

        return instruction.operation.numParams+1;

    }
    private async equals(opcodes: number[], instruction:IInstruction): Promise<number> {
        const operand1 = instruction.parameterModes[0] === 1 ? instruction.parameters[0] : opcodes[instruction.parameters[0]];
        const operand2 = instruction.parameterModes[1] === 1 ? instruction.parameters[1] : opcodes[instruction.parameters[1]];

        opcodes[instruction.parameters[2]] = operand1 === operand2 ? 1 : 0;

        return instruction.operation.numParams+1;

    }
    private async lessThan(opcodes: number[], instruction:IInstruction): Promise<number> {
        const operand1 = instruction.parameterModes[0] === 1 ? instruction.parameters[0] : opcodes[instruction.parameters[0]];
        const operand2 = instruction.parameterModes[1] === 1 ? instruction.parameters[1] : opcodes[instruction.parameters[1]];

        opcodes[instruction.parameters[2]] = operand1 < operand2 ? 1 : 0;

        return instruction.operation.numParams+1;
    }

    private readonly _operations : { [key: number]: IOperation } = {
        1: { code: 1, name: "add", compute: this.add, numParams: 3 },
        2: { code: 2, name: "multiply", compute: this.multiply, numParams: 3 },
        3: { code: 3, name: "readInt", compute: this.readInt, numParams: 1 },
        4: { code: 4, name: "output", compute: this.output, numParams: 1 },
        5: { code: 5, name: "jump-if-true", compute: this.jumpIfTrue, numParams: 2 },
        6: { code: 6, name: "jump-if-false", compute: this.jumpIfFalse, numParams: 2 },
        7: { code: 7, name: "less-than", compute: this.lessThan, numParams: 3 },
        8: { code: 8, name: "equals", compute: this.equals, numParams: 3 },
        99: { code: 99, name: "exit", compute: this.noOp, numParams: 0 },
    };
}







