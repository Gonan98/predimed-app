export class Symptom {
    id?: number;
    name: string;
    type: string;
    aliasName: string;

    constructor() {
        this.name = '';
        this.type = '';
        this.aliasName = '';
    }
}