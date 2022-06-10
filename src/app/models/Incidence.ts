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
    establishmentId: string;
    subject : string; 
    description : string; 
    status : string; 
    phone : string;
    priority : string;
    incidenceType: string; 
    createdAt : string;
    updatedAt : string; 
    userId? : number;

    constructor() {
        this.establishmentId = '';
        this.subject = '';
        this.description = '';
        this.status = '';
        this.phone = '';
        this.priority = '';
        this.incidenceType = '';
        this.createdAt = '';
        this.updatedAt = '';
        this.userId = 0;
    }
}

export class IncidencePutModel {
    id: string;
    establishmentId? : number;
    status: string;
    topic: string;
    phone: string;
    description: string;
    registerType: string;
    priority: string;
    userId?: number;
    solutionDetail: string;
    dateSolution: string;

    constructor(){
        this.id = '';
        this.status = '';
        this.topic = '';
        this.phone = '';
        this.description = '';
        this.registerType = '';
        this.priority = '';
        this.solutionDetail ='';
        this.dateSolution = '';
    }
}
  
  