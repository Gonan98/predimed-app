import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Patient } from "../models/Patient";

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private baseURL = `${environment.API_URL}/patients`;

    basePatient : Patient;
    
    constructor(private http: HttpClient) {
        this.basePatient = new Patient();
    }

    getPatientByDocument(documentNumber: string): Observable<any> {
        return this.http.get(`${this.baseURL}/document/${documentNumber}`);
    }
}