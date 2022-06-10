import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Patient, PatientDTO } from "../models/Patient";

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private baseURL = `${environment.API_URL}/patients`;
    patientDTO: PatientDTO;
    
    constructor(private http: HttpClient) {
        this.patientDTO = new PatientDTO();
    }

    getPatientByDocument(documentNumber: string): Observable<any> {
        return this.http.get(`${this.baseURL}/document/${documentNumber}`);
    }

    savePatient(patient: Patient): Observable<any> {
        return this.http.post(this.baseURL, patient);
    }
    
    getAllPatients(): Observable<any> {
        return this.http.get(this.baseURL);
    }
    
    getPatientById(id: number): Observable<any> {
        return this.http.get(`${this.baseURL}/${id}`);
    }
}