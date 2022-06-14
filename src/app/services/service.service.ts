import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Referred } from '../models/Referred';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) {
   }

  getServices(): Observable<any> {
    return this.http.get(`${environment.API_URL}/services`);
  }

}
