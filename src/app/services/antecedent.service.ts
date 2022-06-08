import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Antecedent } from '../models/Antecedent';

@Injectable({
  providedIn: 'root'
})
export class AntecedentService {

  private baseURL = `${environment.API_URL}/antecedents`;

  constructor(private http: HttpClient) { }

  saveAntecedent(antecedent: Antecedent): Observable<any> {
    return this.http.post(this.baseURL, antecedent);
  }

  getAntecedentsByPatient(patientId: string): Observable<any> {
    return this.http.get(`${this.baseURL}?patient=${patientId}`);
  }
}