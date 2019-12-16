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

    public getParents = (): OrbitalObject[] => {
        if (this.parent === undefined)
            return [];

        return [this.parent, ...this.parent.getParents()];
    }

    public distanceTo(name: string): number {
        if (!this.parent || this.parent.name === name)
            return 0;

        return 1 + this.parent.distanceTo(name);
    }

    public countObjectsInOrbit(): number {
        if (this.parent === undefined)
            return 0;

        return 1 + this.parent.countObjectsInOrbit();
    }
}
