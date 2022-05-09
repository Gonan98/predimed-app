export class Patient {
    id: number;
    firstName: string;
    lastName: string;
    documentNumber: string;
    birthdate: string;
    gender: string;
    address: string;
    ubigeoId: string;

    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.documentNumber = '';
        this.birthdate = '';
        this.gender = '';
        this.address = '';
        this.ubigeoId = '';
    }
}

export class PatientDTO {
    fullName: string;
    gender: string;
    documentNumber: string;
    location: string;
    age: string;
    address: string;

    constructor() {
        this.fullName = '';
        this.gender = '';
        this.documentNumber = '';
        this.location = '';
        this.age = '';
        this.address = '';
    }
}