import Solution from '../solution';
import OpcodeComputer from '../opcodeComputer';
import { getFileLines } from "../../api/providers/fileProvider";

class Day7Part1 extends Solution {

    public dayNumber = 7;

    public computeAsync = async (): Promise<string> => {

        let max = 0;
        let maxInput = "";
        const maxValue = 4;
        const phaseSettings = this.permutations([4, 3, 2, 1, 0]);

        phaseSettings.forEach(async phaseSetting => {


            const lines = (await getFileLines("app/solutions/day7/test-input"))[0].split(',').map(x => parseInt(x));

            const ampA = new OpcodeComputer(phaseSetting[0], 0);
            await ampA.execute([...lines]);
            let outputA = parseInt(ampA.readOutputs()[0]);

            const ampB = new OpcodeComputer(phaseSetting[1], outputA);
            await ampB.execute([...lines]);
            let outputB = parseInt(ampB.readOutputs()[0]);

            const ampC = new OpcodeComputer(phaseSetting[2], outputB);
            await ampC.execute([...lines]);
            let outputC = parseInt(ampC.readOutputs()[0]);

            const ampD = new OpcodeComputer(phaseSetting[3], outputC);
            await ampD.execute([...lines]);
            let outputD = parseInt(ampD.readOutputs()[0]);

            const ampE = new OpcodeComputer(phaseSetting[4], outputD);
            await ampE.execute([...lines]);
            let outputE = parseInt(ampE.readOutputs()[0]);

            console.log(`Outputs:
A: ${outputA}
B: ${outputB}
C: ${outputC}
D: ${outputD}                            
E: ${outputE}                            
`)
            console.log(lines)
            console.log(outputE);
            if (outputE > max) {
                max = outputE;
                maxInput = phaseSetting.join(', ');
                console.log(`new max of ${max} for inputs ${maxInput}`);
            }

        });
        return maxInput;
    }

    permutations(array: number[]): number[][] {

    }
}

export default new Day7Part1().computeAsync;