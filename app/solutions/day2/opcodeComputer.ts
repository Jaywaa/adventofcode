import readline from 'readline-sync';

interface IOperation {
    code: number;
    name: string;
    compute: (opcodes: number[], ...parameters: number[]) => Promise<void>;
    numParams: number;
}

export default class OpcodeComputer {
    
    private readonly _operations : { [key: number]: IOperation } = {
        1: { code: 1, name: "add", compute: this.add, numParams: 3 },
        2: { code: 2, name: "multiply", compute: this.multiply, numParams: 3 },
        3: { code: 3, name: "readInt", compute: this.readInt, numParams: 1 },
        4: { code: 4, name: "output", compute: this.output, numParams: 0 },
    };

    private readonly _haltCode = 99;

    public async execute(opcodes: number[]): Promise<number[]> {
        for (let i = 0; i < opcodes.length; i+=4)
        {
            const opcode = opcodes[i]; 

            if (opcode == this._haltCode)
            {
                console.log("Program halting.")
                return opcodes;          
            }

            if (!(opcode in this._operations))
                throw `Unknown_Opcode_Exception: Unable to handle opcode ${opcode}`;

            const { result, savePosition } = this.computeOperation(opcodes, i);
            
            opcodes[savePosition] = result;
        }

        return opcodes;
    }

    private async computeOperation(opcodes : number[], pointer : number): Promise<void> {
        
        const opcode = opcodes[pointer];
        const operation = this._operations[opcode];

        const parameters: number[] = [];
        for (let i = 1; i <= operation.numParams; i++)
        {
            parameters.push(opcodes[pointer+i]);
        }    
    
        return operation.compute(opcodes, ...parameters);
    }

    private async add(opcodes: number[], ...parameters: number[]) : Promise<void> {
        const operands = parameters.map(parameter => opcodes[parameter]);

        const result = operands.reduce((total, num) => num + total);

        opcodes[parameters[2]] = result;
    };
    private async multiply(opcodes: number[], ...parameters: number[]) : Promise<void> { 
        const operands = parameters.map(parameter => opcodes[parameter]);

        const result = operands.reduce((total, num) => num * total);

        opcodes[parameters[2]] = result;

        return Promise.resolve()
    };
    private async readInt(opcodes: number[], ...parameters: number[]) : Promise<void> { 
        const input = parseInt(readline.question(">  "));

        opcodes[parameters[0]] = input;

        return Promise.resolve();
    };
    private async output(value: number) : Promise<void> { 
        return console.log(`out: ${value}`) 
    };

}







