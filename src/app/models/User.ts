export class User {
    id?: number;
    firstName: string;
    lastName: string;
    contactCenter: string;
    username: string;
    isAdmin?: boolean;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.contactCenter = '';
        this.username = '';
    }
}