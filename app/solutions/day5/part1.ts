import OpcodeComputer from "../opcodeComputer";
import Solution from "../solution";
import { getFileLines } from "../../api/providers/fileProvider";

class Day5Part1 extends Solution {

    protected dayNumber = 5;

    public async computeAsync(): Promise<string> {

        const lines = await getFileLines("app/solutions/day5/input");

        const opcodes = lines[0].split(',').map(x => parseInt(x));
        
        var opcodeComputer = new OpcodeComputer(1);

        const resultCodes = await opcodeComputer.execute(opcodes); 

        return resultCodes.join(',');
    }
}

var solution = new Day5Part1();

export default solution.computeAsync;