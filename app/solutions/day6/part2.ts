import Solution from "../solution";
import { getFileLines } from "../../api/providers/fileProvider";
import { OrbitalObject } from "./OrbitalObject";

class Day6Part2 extends Solution {

    protected dayNumber = 6;

    public computeAsync = async (): Promise<string> => {

        const orbits = await getFileLines("app/solutions/day6/input");

        const objects = this.constructOrbitalObjects(orbits);

        const YOU = objects.find(x => x.name === "YOU") as OrbitalObject;
        const SAN = objects.find(x => x.name === "SAN") as OrbitalObject;

        const youParents = YOU.getParents().map(x => x.name);
        const sanParents = SAN.getParents().map(x => x.name);

        const nearestCommonParent = youParents.filter(x=> sanParents.includes(x))[0];

        const d1 = YOU.distanceTo(nearestCommonParent);
        const d2 = SAN.distanceTo(nearestCommonParent);

        return (d1 + d2).toString();        
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

var solution = new Day6Part2();

export default solution.computeAsync;

