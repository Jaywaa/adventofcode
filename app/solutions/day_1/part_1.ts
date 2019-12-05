import linereader from 'line-reader';

function compute() {
  const file = 'app/solutions/day_1/input';

  let total = 0;
  linereader.eachLine(file, function(line : string, last? : boolean) {
    total += Math.floor(parseInt(line)/3)-2;
    
    if (last)
      console.log(total);
  });
}

compute();

export default compute;
