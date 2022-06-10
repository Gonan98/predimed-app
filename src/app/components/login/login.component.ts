import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public formLogin!: FormGroup;

  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      user: ['',[Validators.required]],
      password: ['',[Validators.required]]

    });
  }

  onSubmit() {
    this.authService.signIn(this.username, this.password)
      .subscribe(
        (data) => {
          localStorage.setItem('token', data.token);
          this.authService.isAdmin = data.isAdmin;
          data.isAdmin ? this.router.navigate(['/dashboard']) : this.router.navigate(['/diagnostico'])
        },
        (err) => alert(err.message)
      );
  }

  // redirectIfAuthenticated() {
  //   this.authService.getProfile().subscribe(
  //     data => data.isAdmin ? this.router.navigate(['/dashboard']) : this.router.navigate(['/diagnostico']),
  //     err => console.error(err)
  //   );
  // }
}