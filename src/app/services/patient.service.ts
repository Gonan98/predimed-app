import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private baseURL = `${environment.API_URL}/patients`;

    constructor(private http: HttpClient) { }

    getPatientByDocument(documentNumber: string): Observable<any> {
        return this.http.get(`${this.baseURL}/document/${documentNumber}`);
    }
}