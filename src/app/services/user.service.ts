import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = `${environment.API_URL}/users`;

  private baseNewUrl = `${environment.API_URL}/users?isAdmin=false`;

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post(this.baseURL, user);
  }

  getCredentials(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}/credentials`);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseNewUrl);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.baseURL}/${user.id}?isAdmin=false`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
