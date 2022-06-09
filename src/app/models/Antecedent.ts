export class Antecedent {
    id: number;
    detail: string;
    issuDate?: string;
    antecedentTypeId: number;

    constructor() {
        this.id = 0;
        this.detail = '';
        this.antecedentTypeId = 0;
    }
}

export class AntecedentType {
    id: number;
    name: string;

    constructor() {
        this.id = 0;
        this.name = '';
    }
}