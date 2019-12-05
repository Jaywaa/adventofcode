import filesystem, { readFile } from 'fs';

const file = './advent_of_code/day_1/input';

var lineReader = require('line-reader');
let total = 0;

lineReader.eachLine(file, function(payloadMass : string, last : boolean) {
  total += calculateFuel(parseInt(payloadMass))
  
  if(last)
    console.log(total);
});

function calculateFuel(mass : number) : number {
    let requiredFuel = Math.floor(mass/3)-2;
    if (requiredFuel <= 0)
        return 0;
    
    return requiredFuel + calculateFuel(requiredFuel);
}