export class Symptom {
    code?: string;
    description: string;
    requiredAttention: boolean;

    constructor() {
        this.description = '';
        this.requiredAttention = false;
    }
}