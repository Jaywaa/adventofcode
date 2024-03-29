import Solution from "../solution";
import { getFileLines } from "../../api/providers/fileProvider";
import { OrbitalObject } from "./OrbitalObject";

class Day6Part1 extends Solution {

    protected dayNumber = 6;

    public computeAsync = async (): Promise<string> => {

        const orbits = await getFileLines("app/solutions/day6/input");

        const objects = this.constructOrbitalObjects(orbits);        

        return objects.reduce((total, x) => total + x.countObjectsInOrbit(), 0).toString();        
    }

    constructOrbitalObjects = (orbits: string[]): OrbitalObject[] => {
        const objects: OrbitalObject[] = [];
        
        // AAA)BBB
        orbits.forEach(orbit => {
            const [ parentName, childName ] = orbit.split(')');

            const existingParent = objects.find(object => object.name === parentName);
            const parent = existingParent || new OrbitalObject(parentName);

            const existingChild = objects.find(object => object.name === childName);

            // child may only have 1 parent
            if (existingChild && existingChild.parent !== undefined)
                throw new Error("This child was already defined! Name: "+childName)
            
            if (existingChild)
                existingChild.setParent(parent);
            else
                objects.push(new OrbitalObject(childName, parent));

            if (!existingParent)
                objects.push(parent);
        });

        return objects;
    }
}

var solution = new Day6Part1();

export default solution.computeAsync;