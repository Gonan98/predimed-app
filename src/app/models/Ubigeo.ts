export class Department {
    id: string;
    name: string;
    
    constructor() {
        this.id = '';
        this.name = '';
    }
}

export class Province {
    id: string;
    name: string;
    departmentId: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.departmentId = '';
    }
}

export class District {
    id: string;
    name: string;
    provinceId: string;
    departmentId: string;

    constructor() {        
        this.id = '';
        this.name = '';
        this.provinceId = '';
        this.departmentId = '';
    }
}