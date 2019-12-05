import lineReader from 'line-reader';
import fs from 'fs';

const file = 'app/solutions/day1/input';

function calculateFuel(mass : number) : number {
    let requiredFuel = Math.floor(mass/3)-2;
    if (requiredFuel <= 0)
        return 0;
    
    return requiredFuel + calculateFuel(requiredFuel);
}

async function compute(): Promise<number> {
    
    if (!fs.existsSync(file))
        throw new Error(`FileNotFoundException: Could not find file ${file}`);

    return new Promise<number>(resolve => {
        let total = 0;

        lineReader.eachLine(file, function(payloadMass : string, last? : boolean) {
            total += calculateFuel(parseInt(payloadMass))
            
            if(last)
              resolve(total);
          });
    });
}

export default compute;




