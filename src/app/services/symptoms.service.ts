import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Symptom } from 'src/app/models/Symptom';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {

  private baseURL = `${environment.API_URL}/symptoms`;

  activeSymptoms: Symptom[];

  constructor(private http: HttpClient) {
    this.activeSymptoms = [];
  }

  getSymptoms(): Observable<any> {
    return this.http.get(this.baseURL);
  }

}
