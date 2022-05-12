export class Symptom {
    code: string;
    active: number;
    description: string;
    requiredAttention: boolean;

    constructor() {
        this.code = '';
        this.description = '';
        this.requiredAttention = false;
        this.active = 0;
    }
}