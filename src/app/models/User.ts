export class User {
    id?: number;
    firstName: string;
    lastName: string;
    documentNumber: string;
    documentMedic: string;
    profession: string;
    employeeStatus: string;
    username: string;
    password?: string;
    isAdmin?: boolean;
    gender: string;
    workingCondition: string;
    establishmentId?: number;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.documentNumber = '';
        this.documentMedic = '';
        this.profession = '';
        this.employeeStatus = '';
        this.username = '';
        this.gender = '';
        this.workingCondition = '';
    }
}