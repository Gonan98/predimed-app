import { Component, Input, OnInit } from '@angular/core';
import { PatientDTO } from 'src/app/models/Patient';
import { PatientService } from 'src/app/services/patient.service';
import { ReferredService } from 'src/app/services/referred.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {

  patientDTO: PatientDTO;
  @Input() readMode = false;

  constructor(private patientService: PatientService, public referenceService: ReferredService) {
    this.patientDTO = new PatientDTO();
  }
  
  ngOnInit(): void {
    this.patientDTO = this.patientService.patientDTO;
  }

}
