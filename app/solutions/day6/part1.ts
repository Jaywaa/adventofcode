import OpcodeComputer from "../opcodeComputer";
import Solution from "../solution";
import { getFileLines } from "../../api/providers/fileProvider";

class Day6Part1 extends Solution {

    protected dayNumber = 6;

    public async computeAsync(): Promise<string> {

        const lines = await getFileLines("app/solutions/day6/input");

        const orbits = lines[0].split(',').map(x => parseInt(x));
        

      
        return "wooo! orbits!";
        
    }
}

var solution = new Day6Part1();

export default solution.computeAsync;