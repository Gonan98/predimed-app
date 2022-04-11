import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Establishment} from 'src/app/models/Estableishment'

@Injectable({
  providedIn: 'root'
})
export class EstableishmentService {

  private baseURL = `${environment.API_URL}/establishments`;
  establishmentArray : Establishment[] = [];

  constructor(private http: HttpClient) { }

  getEstableishments() {
      return this.http.get<Establishment[]>(this.baseURL);
  }

  getData(){
    this.http.get(this.baseURL)
    .subscribe((response: any) =>{
      this.establishmentArray = response.data;
    })
  }
}