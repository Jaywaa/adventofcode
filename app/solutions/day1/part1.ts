import linereader from 'line-reader';
import fs from 'fs';

const file = 'app/solutions/day1/input';

async function compute(): Promise<number> {

  if (!fs.existsSync(file))
    throw new Error(`FileNotFoundException: Could not find file ${file}`);

  return new Promise<number>(resolve => {
    let total = 0;
    linereader.eachLine(file, function(line : string, last? : boolean) {
      total += Math.floor(parseInt(line)/3)-2;
      
      if (last)
        resolve(total);
    });
  });  
}

export default compute;
