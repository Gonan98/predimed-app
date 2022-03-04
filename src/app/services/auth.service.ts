import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:5000/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) { }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post(`${this.URL}/login`, { username, password });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.URL}/profile`);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
