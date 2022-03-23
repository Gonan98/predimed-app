import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/Patient';
import { PatientService } from 'src/app/services/patient.service';

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
  documentNumber = '';

  constructor(
    private patientService: PatientService,
  ) {

  }

  ngOnInit(): void {

  }

  onSearch() {
    this.patientService.getPatientByDocument(this.searchInput).subscribe(
      data => {
        this.fullname = data.firstName + ' ' + data.lastName;
        this.documentNumber = data.documentNumber;
        this.location = data.location.department + '/' + data.location.province + '/' + data.location.district;
        this.gender = data.gender === 'M' ? 'Masculino' : 'Femenino';
      },
      err => {
        console.error(err.error.message);
      }
    );
  }

}
