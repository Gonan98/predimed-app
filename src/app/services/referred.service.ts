import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Referred } from '../models/Referred';

@Injectable({
  providedIn: 'root'
})
export class ReferredService {

  patientStatusSelected = '';
  constructor(private http: HttpClient) { }

  saveReference(reference: Referred): Observable<any> {
    return this.http.post(`${environment.API_URL}/references`, reference);
  }

  getReferences(): Observable<any> {
    return this.http.get(`${environment.API_URL}/referred`);
  }

  getReferenceById(id: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/referred/${id}`);
  }

}
