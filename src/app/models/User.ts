export class User {
    id?: number;
    firstName: string;
    lastName: string;
    documentNumber: string;
    documentMedic: string;
    profession: string;
    employeeStatus: string;
    contactCenter: string;
    username: string;
    password?: string;
    isAdmin?: boolean;
    gender: string;
    workingCondition: string;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.documentNumber = '';
        this.documentMedic = '';
        this.profession = '';
        this.employeeStatus = '';
        this.contactCenter = '';
        this.username = '';
        this.gender = '';
        this.workingCondition = '';
    }
}