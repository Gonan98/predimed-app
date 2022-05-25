export class History {

    id?: number;
    weight: number;
    height: number;
    pressure: number;
    temperature: number;
    heartRate: number;
    respirationRate: number;
    anamnesis: string;
    examSummary: string;
    createdAt: string;
    updatedAt: string;
    patientId: number;

    constructor() {
        this.weight = 0;
        this.height = 0;
        this.pressure = 0;
        this.temperature = 0;
        this.heartRate = 0;
        this.respirationRate = 0;
        this.anamnesis = '';
        this.examSummary = '';
        this.createdAt = '';
        this.updatedAt = '';
        this.patientId = 0;
    }
}