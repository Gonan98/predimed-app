import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost/5000';

  constructor(private http: HttpClient) { }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.URL}/api/v1/auth/login`, user);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${URL}/api/v1/auth/profile`);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
