import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Incidence } from '../models/Incidence';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidenceService {

  private baseURL = `${environment.API_URL}/incidences`;

  constructor(private http: HttpClient) { }

  getIncidences() {
    return this.http.get<Incidence[]>(this.baseURL);
  }

  createIncidence(incidence:Incidence): Observable<any>{
    return this.http.post(this.baseURL, incidence);
  }
}
