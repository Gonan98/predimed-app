import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.authService.getProfile().subscribe(
      (user) => this.name = user.firstName,
      (err) => alert(err.message)
    );
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
