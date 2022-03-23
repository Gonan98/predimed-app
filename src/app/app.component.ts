import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/User';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'predimed-app';

  constructor(private authService: AuthService, private router: Router) {

  }

  isAuthenticated() {
    return this.authService.isLogged();
  }
}
