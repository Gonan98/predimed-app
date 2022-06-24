import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EstableishmentService } from 'src/app/services/establishment.service';
import { titleCase } from 'src/app/util/functions';

@Component({
  selector: 'app-medic-profile',
  templateUrl: './medic-profile.component.html',
  styleUrls: ['./medic-profile.component.css']
})
export class MedicProfileComponent implements OnInit {
  username?:string;
  names?: string;
  documentNumber?:string;
  documentMedic?:string;
  gender?:string;
  profession?:string;
  college?:string;
  employeeStatus?:string;
  establishment?:string;

  constructor(private authService: AuthService, private establishmentService: EstableishmentService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (user) => {
        console.log(user)
        this.username = user.username
        this.names = user.firstName + ' ' +user.lastName
        this.documentNumber = user.documentNumber
        this.documentMedic = user.documentMedic
        if (user.gender == "M") this.gender = "Masculino"
        else this.gender = "Femenino"
        this.college = titleCase(user.college)
        this.profession = titleCase(user.profession)
        this.employeeStatus = titleCase(user.employeeStatus)
      },
      (err) => alert(err.message)
    );

    this.establishmentService.getCurrentEstablishment().subscribe(
      data => this.establishment = titleCase(data.name),
      err => console.error(err)
    );
  }
}
