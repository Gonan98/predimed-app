export class User {
    id?: number;
    firstName: string;
    lastName: string;
    contactCenter: string;
    username: string;
    password?: string;
    isAdmin?: boolean;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.contactCenter = '';
        this.username = '';
    }
}