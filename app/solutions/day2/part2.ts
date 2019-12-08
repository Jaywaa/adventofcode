import lineReader from 'line-reader';
import fs from 'fs';
import OpcodeComputer from './opcodeComputer';

const finalValue = 19690720;

const file = 'app/solutions/day2/input';

if (!fs.existsSync(file))
    throw new Error(`FileNotFoundException: ${file}`);

const getOpcodes = new Promise<number[]>(resolve => {
    let opcodes: number[];
    lineReader.eachLine(file, function(line : string, last? : boolean) {
        opcodes = line.split(',').map(x => parseInt(x));
        
        resolve(opcodes);
    });
});

async function compute(): Promise<{ noun: number, verb: number }> {
    const opcodes = await getOpcodes;
        
    const opcodeComputer = new OpcodeComputer();
    
    for (let i=0; i<100; i++)
    {
        for (let j=0; j<100; j++)
        {
            opcodes[1] = i;
            opcodes[2] = j;

            const finalProgramState = await opcodeComputer.execute([...opcodes]);

            if (finalProgramState[0] === finalValue)
                return { noun: i, verb: j }
        }
    }

    throw new Error('Result not found');
}

export default compute;