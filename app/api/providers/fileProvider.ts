import fs from 'fs';
import path from 'path';

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