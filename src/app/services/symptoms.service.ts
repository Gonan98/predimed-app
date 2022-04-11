import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Symptom } from 'src/app/models/Symptom';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {

  private baseURL = `${environment.API_URL}/symptoms`;

  constructor(private http: HttpClient) { }

  getSymptoms(): Observable<any> {
    return this.http.get(this.baseURL);
  }
  getSymptoms2() {
      return this.http.get<Symptom[]>(this.baseURL);
  }
}
