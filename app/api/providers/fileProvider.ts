import fs from 'fs';
import path from 'path';
import linereader from 'line-reader';

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

export function getFileLines(path: string): string[] {

    if (path === "")
        throw new Error("ArgumentException: path provided was empty.");
    if (!fs.existsSync(path))
        throw new Error(`FileNotFoundException: Could not find file ${path}`);

    linereader.open(path, console.error);

    const lines: string[] = [];

    while (linereader.hasNextLine)
    {
        linereader.nextLine((error, line : string) => {
            if (error)
                throw error;

            else lines.push(line);
        });
    }

    return lines;
}