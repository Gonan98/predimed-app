export class Referred {
    id: number;
    reason: string;
    referenceDate?: string;
    sourceEstablishmentCode: number;
    destinyEstablishmentCode: number;
    serviceCode: string;
    specialtyCode: string;
    destinyServiceCode: string;
    diseaseCode: string;
    patientId: number;
    userId: number;

    constructor() {
        this.id = 0;
        this.reason = '';
        this.sourceEstablishmentCode = 0;
        this.destinyEstablishmentCode = 0;
        this.serviceCode = '';
        this.specialtyCode = '';
        this.destinyServiceCode = '';
        this.diseaseCode = '';
        this.patientId = 0;
        this.userId = 0;
    }
}