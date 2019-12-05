import linereader from 'line-reader';

const file = './advent_of_code/day_1/input';

let total = 0;

linereader.eachLine(file, function(line : string, last? : boolean) {
  total += Math.floor(parseInt(line)/3)-2;
  
  if (last)
    console.log(total);
});
