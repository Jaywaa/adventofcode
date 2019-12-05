import lineReader from 'line-reader';

const file = './day_2/input';

const _operations : { [key: number]: { name: string, compute: (...operands: any[]) => any} } = {
    1: { name: "add", compute: add },
    2: { name: "multiply", compute: multiply },
    99: { name: "exit", compute: exit }
};

const _exitOp = 99;

lineReader.eachLine(file, function(line : string, last? : boolean) {
    const opcodes = line.split(',').map(x => parseInt(x));
    
    executeProgram(opcodes);
});

function executeProgram(opcodes : number[]) {
    for (let i = 0; i < opcodes.length; i+=4)
    {
        const opcode = opcodes[i]; 

        if (!(opcode in _operations))
            throw `Unknown_Opcode_Exception: Unable to handle opcode ${opcode}`;

        compute(opcodes, i);        
    }
}

function compute(opcodes : number[], pointer : number) {
    const opcode = opcodes[pointer];
    const operand_1_position = opcodes[pointer+1];
    const operand_2_position = opcodes[pointer+2];
    const result_position = opcodes[pointer+3];

    const operand1 = opcodes[operand_1_position];
    const operand2 = opcodes[operand_2_position];

    opcodes[result_position] = _operations[opcode].compute(operand1, operand2);
}

function add(...operands: number[]) : number { return operands.reduce((total, num) => num + total)};
function multiply(...operands: number[]) : number { return operands.reduce((total, num) => num * total)};
function exit(opcodes: number[]) {
    console.log(`Exiting with opcode ${_exitOp}.`);
    console.log("Final state of program:", opcodes.join(','));
}