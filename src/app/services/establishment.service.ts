import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Establishment} from 'src/app/models/Estableishment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstableishmentService {

  private baseURL = `${environment.API_URL}/establishments?ubigeo_id=150108`;
  establishmentArray : Establishment[] = [];

  constructor(private http: HttpClient) { }

  getEstablishments(): Observable<any> {
    return this.http.get(`${environment.API_URL}/ubigeo/150108/establishments`);
  }

  getCurrentEstablishment(): Observable<any> {
    return this.http.get(`${environment.API_URL}/establishments/source`);
  }

  getDestinyEstablishments(): Observable<any> {
    return this.http.get(`${environment.API_URL}/establishments/destiny`);
  }

  getEstablishmentServices(code: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/establishments/${code}/services`);
  }

  getEstablishmentSpecialties(code: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/establishments/${code}/specialties`);
  }

  getEstablishmentDestinyServices(code: any): Observable<any> {
    return this.http.get(`${environment.API_URL}/establishments/${code}/destiny-services`);
  }
  
  getData(){
    this.http.get(this.baseURL)
    .subscribe((response: any) =>{
      this.establishmentArray = response.data;
    })
  }
}