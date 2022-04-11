export class Incidence {
    id: string;
    docMedic: string;
    type: string;
    status: string;
    estableishmentId?: number;
    topic: string;
    phone: string;
    description: string;
    registerType: string;
    priority: string;
    userId?: number;

    constructor() {
        this.id = '';
        this.docMedic = '';
        this.type = '';
        this.status = '';
        this.topic = '';
        this.phone = '';
        this.description = '';
        this.registerType = '';
        this.priority = '';
    }
}


export class IncidencePostModel {
    id?: number;
    topic : string; 
    description : string; 
    status : string; 
    phone : string;
    priority : string;
    registerType: string; 
    createdAt : string;
    updatedAt : string; 
    userId? : number;

    constructor() {
        this.topic = '';
        this.description = '';
        this.status = '';
        this.phone = '';
        this.priority = '';
        this.registerType = '';
        this.createdAt = '';
        this.updatedAt = '';
    }
}
  
  