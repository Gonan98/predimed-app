import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  private baseURL = `${environment.API_URL}/ubigeo`;

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any> {
    return this.http.get(`${this.baseURL}/departments`);
  }

  getProvincesByDepartment(deparmentId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/departments/${deparmentId}/provinces`)
  }

  getDistrictsByProvince(provinceId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/provinces/${provinceId}/districts`);
  }

  getDistrictById(districtId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${districtId}`);
  }

  getEstablishmentByUbigeo(districtId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${districtId}/establishments`);
  }
}
