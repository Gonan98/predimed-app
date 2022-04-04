import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/Patient';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent implements OnInit {

  searchInput = '';
  fullname = '';
  location = '';
  gender = '';
  age= '';
  documentNumber = '';
  direction = '';
  histories = '';
  dateTime = new Date();

  constructor(
    private patientService: PatientService, private router: Router
  ) {

  }

  ngOnInit(): void {

  }

  onSearch() {
    this.patientService.getPatientByDocument(this.searchInput).subscribe(
      data => {
        this.fullname = data.firstName + ' ' + data.lastName;
        this.documentNumber = data.documentNumber;
        this.location = data.location.department + ' / ' + data.location.province + ' / ' + data.location.district;
        this.gender = data.gender === 'M' ? 'Masculino' : 'Femenino';
        console.log(data);
        let birthday = new Date(data.birthdate);
        var years = this.dateTime.getFullYear() - birthday.getFullYear();
        this.age = years.toString();
        this.direction = data.location.address;
        if(data.histories.length == 0){
          this.histories = 'No tiene historias'
        }
        else{
          this.histories = '000-235'
        }
      },
      err => {
        console.error(err.error.message);
      }
    );
  }

  onAnalize() {
    this.router.navigate(['/analizar']);
  }

}
