export class OrbitalObject {
    
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
    };

    public countObjectsInOrbit(): number {
        if (this.parent === undefined)
            return 0;

        return 1 + this.parent.countObjectsInOrbit();
    }
}
