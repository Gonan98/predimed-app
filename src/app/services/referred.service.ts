import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Referred } from '../models/Referred';

@Injectable({
  providedIn: 'root'
})
export class ReferredService {
  referredSelected: boolean;
  patientStatusSelected = '';
  constructor(private http: HttpClient) {
    this.referredSelected = true
   }

  saveReference(reference: Referred): Observable<any> {
    return this.http.post(`${environment.API_URL}/references`, reference);
  }

  getReferences(): Observable<any> {
    return this.http.get(`${environment.API_URL}/referred`);
  }

  getReferenceById(id: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/referred/${id}`);
  }

  setReferredSelected(value: boolean) {
    console.log(value)
    this.referredSelected = value
  }

  getReferredSelected() {
    return this.referredSelected
  }
}
