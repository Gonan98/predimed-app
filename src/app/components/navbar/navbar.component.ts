import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name = '';
  isAdmin = false;


  constructor(private authService: AuthService, private router: Router, private userService: UserService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.authService.getProfile().subscribe(
      (user) => {
        this.name = user.firstName + ' ' +user.lastName
        this.isAdmin = user.isAdmin,
        localStorage.setItem("userId", user.id.toString());
      },
      (err) => alert(err.message)
    );
  }

  logOut() {
    this.authService.logOut();
  }

}
