import Solution from "../solution";

class Day4Part1 extends Solution {
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

            if (!this.hasTwoAdjacentDigits(i))
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

    private hasTwoAdjacentDigits(number:number) {
        const digits = number.toString().split('');

        for (let i = 0; i < digits.length-1; i++)
        {
            if (digits[i] === digits[i+1])
                return true;
        }

        return false;
    }    
}

const solution = new Day4Part1();

export default solution.computeAsync;