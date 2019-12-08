import Solution from "../solution";

class Day4Part2 extends Solution {
    dayNumber = 4;

    computeAsync = async (): Promise<number> => {

        const range = [387638, 919123];

        const possiblePasswords = [];
        for (let i = range[0]; i <= range[1]; i++)
        {
            if (i.toString().length !== 6)
                continue;

            if (i < range[0] && i > range[1])
                continue;

            if (!this.getDigitGroups(i).some(num => num.length === 2))
                continue;

            if (!this.digitsAscending(i))
                continue;


            possiblePasswords.push(i);
        }

        return possiblePasswords.length;
    }

    private digitsAscending(number : number) : boolean {
        const digits = number.toString().split('');

        for (let i = 0; i < digits.length-1; i++)
        {
            if (digits[i] > digits[i+1])
                return false;
        }

        return true;
    }

    private getDigitGroups(number: number): string[] {
        const digits = number.toString().split('').map(x => parseInt(x));

        const digitGroups: string[] = [];
        let digitGroup: number[] = [];
        for (let i = 0; i < digits.length; i++)
        {            
            digitGroup.push(digits[i]);
            
            if (digits[i] !== digits[i+1]) {
                digitGroups.push(digitGroup.join(''));
                digitGroup = [];
            }
        }

        return digitGroups;
    }
}

const solution = new Day4Part2();

export default solution.computeAsync;