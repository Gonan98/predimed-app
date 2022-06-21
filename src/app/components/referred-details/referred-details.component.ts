import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PatientDTO } from 'src/app/models/Patient';
import { Referred } from 'src/app/models/Referred';
import { HistoryService } from 'src/app/services/history.service';
import { PatientService } from 'src/app/services/patient.service';
import { ReferredService } from 'src/app/services/referred.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';


export interface ProcesElement {
  code: string;
  description: string;
}

export interface LaboratoryExam {
  description: string;
}

const ELEMENT_DATA: ProcesElement[] = [
  {description: 'Cirugía General', code: '001'},
  {description: 'Cardiología', code: '002'},
];

const ELEMENT_DATA1: LaboratoryExam[] = [
  {description: 'Sangre'},
  {description: 'Orina'},
];

@Component({
  selector: 'app-referred-details',
  templateUrl: './referred-details.component.html',
  styleUrls: ['./referred-details.component.css']
})
export class ReferredDetailsComponent implements OnInit {

  displayedColumns: string[] = ['code', 'description'];
  displayedColumns1: string[] = ['description'];
  dataSource = ELEMENT_DATA;
  dataSource1 = ELEMENT_DATA1;

  isShown: boolean = false ;
  isShownAnamnesis: boolean = true;
  isShownDiagnostic: boolean = false;

  patientDto: PatientDTO;
  reference: Referred;

  constructor(
    private router: Router, 
    private patientService: PatientService,
    private route: ActivatedRoute,
    private ubigeoService: UbigeoService,
    private referenceService: ReferredService,
    private historyService: HistoryService
  ) {
    this.patientDto = new PatientDTO();
    this.reference = new Referred();
  }

  ngOnInit(): void {
    this.loadReference();
  }

  loadReference() {
    this.referenceService.getReferenceById(this.route.snapshot.params['id']).subscribe(
      data => {
        this.reference = data
        this.patientService.getPatientById(this.reference.patientId).subscribe(
          data => {
            this.patientDto.id = data.id;
            this.patientDto.fullName = data.firstName + ' ' + data.lastName;
            this.patientDto.documentNumber = data.documentNumber;
            this.patientDto.gender = data.gender === 'M' ? 'MASCULINO' : 'FEMENINO';
            this.patientDto.age = moment(data.birthdate, "YYYY-MM-DD").fromNow().substring(0,2);
            this.patientDto.address = data.address;
            this.getLocation(data.ubigeoId);
          },
          console.error
        )
      },
      console.error
    );
  }

  getLocation(districtId: string) {    
    this.ubigeoService.getDistrictById(districtId).subscribe(
      data => {
        this.patientDto.location = data.ubigeoPeruDepartment.name + '/' + data.ubigeoPeruProvince.name + '/' + data.name;
      },
      console.error
    );
  }

  toggleShow() {
    this.isShown = ! this.isShown;
  }

  toggleShowAnamnesis(){
    this.isShownAnamnesis = true
    this.isShownDiagnostic = false;
  }

  toggleDiagnostic(){
    this.isShownAnamnesis = false;
    this.isShownDiagnostic = true;
  }

  onBack(){
    this.router.navigate(['/referidos']);
  }

}
