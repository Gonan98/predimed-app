import { Component, OnInit } from '@angular/core';
import { PatientDTO } from 'src/app/models/Patient';
import { PatientService } from 'src/app/services/patient.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {

  patientDTO: PatientDTO;

  constructor(private patientService: PatientService, private ubigeoService: UbigeoService) {
    this.patientDTO = new PatientDTO();
  }
  
  ngOnInit(): void {
    this.patientDTO = this.patientService.patientDTO;
  }

}
