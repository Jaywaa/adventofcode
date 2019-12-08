import fileSystem from 'fs';
import lineReader from 'line-reader';

export default abstract class Solution {
    protected abstract dayNumber: number;
    abstract computeAsync: () => any;

    protected async readLinesAsync(fileName: string): Promise<string[]> {
        const file = `app/solutions/day${this.dayNumber}/${fileName}`;

        if (!fileSystem.existsSync(fileName))
            throw new Error(`FileNotFoundException: ${fileName}`);

        return new Promise<string[]>(resolve => {
            const lines: string[] = [];
            lineReader.eachLine(file, function (line: string, last?: boolean) {
        
                lines.push(line);
        
                if (last)
                    resolve(lines);
            });
        });
    }
}