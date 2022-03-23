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

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post(this.baseURL, user);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.baseURL}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
