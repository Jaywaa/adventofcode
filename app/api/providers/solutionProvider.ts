import day1part1 from '../../solutions/day1/part1';
import day1part2 from '../../solutions/day1/part2';
import day2part1 from '../../solutions/day2/part1';
import day2part2 from '../../solutions/day2/part2';
import day3part1and2 from '../../solutions/day3/part1&2';
import day4part1 from '../../solutions/day4/part1';
import day4part2 from '../../solutions/day4/part2';
import day5part1 from '../../solutions/day5/part1';
import day5part2 from '../../solutions/day5/part2';
import day6part1 from '../../solutions/day6/part1';
import day6part2 from '../../solutions/day6/part2';

const solutions: { [key: string]: () => Promise<any> } = {
    day1part1,
    day1part2,
    day2part1,
    day2part2,
    day3part1and2,
    day4part1,
    day4part2,
    day5part1,
    day5part2,
    day6part1,
    day6part2,
};

export default {
    async get(day:string, part:string): Promise<any> {
        const key = `${day}${part}`;
        
        if (key in solutions)
            return solutions[key]();

        throw new Error(`InvalidArgumentException: Unable to find solution for ${day} and ${part}`);
    }
}