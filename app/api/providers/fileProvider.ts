import fs from 'fs';
import lineReader from 'line-reader';

const rootDirectory = process.cwd();
const viewsDirectory = rootDirectory + "/app/views";

export function getHtmlView(filename : string): string {

    if (filename === "")
        throw new Error("ArgumentException: View name provided was empty.");

    let fullPathName = `${viewsDirectory}/${filename}`; 

    if (!fullPathName.endsWith(".html"))
        fullPathName += ".html";

    if (!fs.existsSync(fullPathName))
        throw new Error(`FileNotFoundException: Could not find file ${fullPathName}`);

    return fullPathName;
}

export async function getFileLines(path: string): Promise<string[]> {

    if (path === "")
        throw new Error("ArgumentException: path provided was empty.");
    if (!fs.existsSync(path))
        throw new Error(`FileNotFoundException: Could not find file ${path}`);

    return new Promise<string[]>(resolve => {
        let lines: string[] = [];
        
        lineReader.eachLine(path, function(line : string, last? : boolean) {
            lines.push(line);
            
            if (last)
                resolve(lines);
        });
    });
}