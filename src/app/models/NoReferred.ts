export class NoReferred {
    id?: number;
    reason: string;
    userId: number;
    patientId: number;

    constructor() {
        this.reason = '';
        this.userId = 0;
        this.patientId = 0;
    }
}