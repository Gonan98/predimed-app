export class Symptom {
    code: string;
    active: boolean;
    description: string;
    requiredAttention: boolean;

    constructor() {
        this.code = '';
        this.description = '';
        this.requiredAttention = false;
        this.active = false;
    }
}