import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  readonly API_URL = `${environment.API_URL}/diseases`;

  constructor(private http: HttpClient) { }

  getDiseaseById(code: string) : Observable<any> {
    return this.http.get(`${this.API_URL}/${code}`);
  }
}
