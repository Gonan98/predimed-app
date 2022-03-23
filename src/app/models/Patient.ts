import { Location } from "./Location";

export class Patient {
    _id: string;
    firstName: string;
    lastName: string;
    documentNumber: string;
    birthdate: string;
    gender: string;
    location: Location;

    constructor() {
        this._id = '';
        this.firstName = '';
        this.lastName = '';
        this.documentNumber = '';
        this.birthdate = '';
        this.gender = '';
        this.location = new Location();
    }
}