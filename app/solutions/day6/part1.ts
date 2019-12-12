import Solution from "../solution";
import { getFileLines } from "../../api/providers/fileProvider";

class OrbitalObject {
    
    public readonly name: string;
    public parent?: OrbitalObject;

    constructor(name: string, parent?: OrbitalObject) {
        this.name = name;
        this.parent = parent;
    }

    public setParent = async (parent: OrbitalObject): Promise<void> => {
        if (this.parent !== undefined)
            throw new Error(`Unable to set parent to ${parent}. Parent is already defined as ${this.parent}`);

        this.parent = parent;
    }

    public countObjectsInOrbit(): number
    {
        if (this.parent === undefined)
            return 0;
        
        return 1 + this.parent.countObjectsInOrbit();
    }
}

class Day6Part1 extends Solution {

    protected dayNumber = 6;

    public async computeAsync(): Promise<string> {

        const orbits = await getFileLines("app/solutions/day6/input");
        const objects: OrbitalObject[] = [];

        // AAA)BBB
        orbits.forEach(orbit => {
            const [ parentName, childName ] = orbit.split(')');

            const existingParent = objects.find(object => object.name === parentName);
            const parent = existingParent || new OrbitalObject(parentName);

            const existingChild = objects.find(object => object.name === childName);
            const child = existingChild || new OrbitalObject(childName, parent);

            // child may only have 1 parent
            if (existingChild && existingChild.parent !== undefined)
                throw new Error("This child was already defined! Name: "+childName)
            
            if (existingChild)
                existingChild.setParent(parent);
            else
                objects.push(child);

            if (!existingParent)
                objects.push(parent);
        });
        console.log(objects.map(x => { return "Name: " + x.name + ", ParentName: " + (x.parent || {}).name }))
        return objects.reduce((total, x) => total + x.countObjectsInOrbit(), 0).toString();        
    }
}

var solution = new Day6Part1();

export default solution.computeAsync;

