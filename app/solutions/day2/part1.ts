import lineReader from 'line-reader';
import fs from 'fs';
import OpcodeComputer from './opcodeComputer';

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

async function compute(): Promise<number[]> {
    return getOpcodes.then(opcodes => {
        const opcodeComputer = new OpcodeComputer();

        const finalProgramState = opcodeComputer.execute(opcodes);
        finalProgramState.then(console.log).catch(console.error)
        return finalProgramState;
    });
}

export default compute;