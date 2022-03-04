import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signIn(this.username, this.password)
      .subscribe(
        (data) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/diagnostico'])
        },
        (err) => alert(err.message)
      );
  }

}
