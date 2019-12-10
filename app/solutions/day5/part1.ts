import OpcodeComputer from "../day2/opcodeComputer";
import Solution from "../solution";
import { getFileLines } from "../../api/providers/fileProvider";

class Day5Part1 extends Solution {

    protected dayNumber = 5;

    public async computeAsync(): Promise<string> {

        const lines = getFileLines("app/solutions/day5/input");

        const opcodes = lines[0].split(',').map(x => parseInt(x));
        var opcodeComputer = new OpcodeComputer();


        return "";
    }
}

var solution = new Day5Part1();

export default solution.computeAsync;