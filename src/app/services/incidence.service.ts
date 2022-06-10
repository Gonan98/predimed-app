import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Incidence, IncidencePutModel } from '../models/Incidence';
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

  getIncidenceById(id: string): Observable<any>{
    return this.http.get(`${this.baseURL}/${id}`)
  }

  getIncidenceByUserId(userId: string): Observable<any>{
    return this.http.get(`${this.baseURL}/${userId}`)
  }

  putSolution(incidencePutModel: IncidencePutModel): Observable<any>{
    return this.http.put(`${this.baseURL}/${incidencePutModel.id}`, incidencePutModel)
  }

  /*updateUser(user: User): Observable<any> {
    return this.http.put(`${this.baseURL}/${user.id}?isAdmin=false`, user);
  }*/

}
