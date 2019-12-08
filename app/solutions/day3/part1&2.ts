import fs from 'fs';
import lineReader from 'line-reader';

const file = 'app/solutions/day3/input';

if (!fs.existsSync(file))
    throw new Error(`FileNotFoundException: ${file}`);

interface Point {
    x: number,
    y: number,  
}
interface Positions extends Point {
    cumulativeDistance: number
}

interface IWire {
    id: number;
    moves: string[];
    positions: Positions[];

    move: (direction: string, distance: number) => void;
}

class Wire implements IWire {
    id: number;
    moves: string[];
    relativeX: number = 0;
    relativeY: number = 0;
    positions: Positions[] = [{ x: 0, y: 0, cumulativeDistance: 0 }];

    constructor(id: number, moves: string[]) {
        this.id = id;
        this.moves = moves;
    }

    move(direction: string, distance: number) {
        const currentLocation = this.positions.slice(-1)[0];
        switch (direction) {
            case "U":
                for (let i = 1; i <= distance; i++) {
                    this.positions.push({ x: currentLocation.x, y: currentLocation.y + i, cumulativeDistance: currentLocation.cumulativeDistance + i });
                }
                break;
            case "R":
                for (let i = 1; i <= distance; i++) {
                    this.positions.push({ x: currentLocation.x + i, y: currentLocation.y, cumulativeDistance: currentLocation.cumulativeDistance + i  });
                }
                break;
            case "D":
                for (let i = 1; i <= distance; i++) {
                    this.positions.push({ x: currentLocation.x, y: currentLocation.y - i, cumulativeDistance: currentLocation.cumulativeDistance + i  });
                }
                break;
            case "L":
                for (let i = 1; i <= distance; i++) {
                    this.positions.push({ x: currentLocation.x - i, y: currentLocation.y, cumulativeDistance: currentLocation.cumulativeDistance + i  });
                }
                break;

            default:
                throw new Error(`Invalid Direction: ${direction}`);
        }
    }
}

const getWiresAsync = () => new Promise<IWire[]>(resolve => {
    const wires: IWire[] = [];
    let id = 0;
    lineReader.eachLine(file, function (line: string, last?: boolean) {
        const moves = line.split(',');

        wires.push(new Wire(id++, moves));

        if (last)
            resolve(wires);
    });
});

export default async function computeAsync() {
    const wires = await getWiresAsync();

    wires.forEach(wire => {
        wire.moves.forEach(move => {
            const direction = move.charAt(0);
            const distance = parseInt(move.slice(1));

            wire.move(direction, distance);
        });
    });

    const intersections: { point: Point, cumulativeDistance1: number, cumulativeDistance2: number }[] = [];
    // all the wires now have their positions plotted
    for (let i = 0; i < wires[0].positions.length; i++) {
        const wire1Position = wires[0].positions[i];

        for (let j = 0; j < wires[1].positions.length; j++) {
            const wire2Position = wires[1].positions[j];

            if (wire1Position.x === wire2Position.x && wire1Position.y === wire2Position.y)
                intersections.push({ 
                    point: wire1Position, 
                    cumulativeDistance1: wire1Position.cumulativeDistance,
                    cumulativeDistance2: wire2Position.cumulativeDistance
                });
        }
    }

    const getDistance = (point: Point) => Math.abs(point.x) + Math.abs(point.y);
    const getCumulativeDistance = (intersection: {cumulativeDistance1: number, cumulativeDistance2: number}) => intersection.cumulativeDistance1 + intersection.cumulativeDistance2;

    const cumulativeDistance = intersections.reduce((min, intersection) => { 
        const combinedDistance = getCumulativeDistance(intersection);

        return combinedDistance < min && combinedDistance !== 0 
            ? getCumulativeDistance(intersection) 
            : min;
    }, 1e90);

    const distanceFromSource = intersections.reduce((min, intersection) => getDistance(intersection.point) < min && getDistance(intersection.point) !== 0 ? getDistance(intersection.point) : min, 10000000);

    return { cumulativeDistance, distanceFromSource };
}