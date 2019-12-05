import day1part1 from '../../solutions/day1/part1';
import day1part2 from '../../solutions/day1/part2';

const solutions: { [key: string]: () => Promise<any> } = {
    day1part1,
    day1part2,
};

export default {
    async get(day:string, part:string): Promise<any> {
        const key = `${day}${part}`;
        
        if (key in solutions)
            return solutions[key]();

        throw new Error(`InvalidArgumentException: Unable to find solution for ${day} and ${part}`);
    }
}