import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { History } from '../models/History';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private baseURL = `${environment.API_URL}/histories`;

  constructor(private http: HttpClient) { }

  saveHistory(history: History): Observable<any> {
    return this.http.post(this.baseURL, history);
  }

  getHistoriesByPatient(patientId: string): Observable<any> {
    return this.http.get(`${this.baseURL}?patientId=${patientId}`);
  }
}