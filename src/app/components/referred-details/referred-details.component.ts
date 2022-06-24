import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Establishment } from 'src/app/models/Estableishment';
import { PatientDTO } from 'src/app/models/Patient';
import { EstableishmentService } from 'src/app/services/establishment.service';
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
  {description: 'Consulta ambulatoria por médico especialista en oftalmología', code: 'S001'},
];

const ELEMENT_DATA1: LaboratoryExam[] = [
  {description: 'Sangre'},
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
  reference: any;
  sourceEstablishment: Establishment;

  constructor(
    private router: Router, 
    private patientService: PatientService,
    private route: ActivatedRoute,
    private ubigeoService: UbigeoService,
    private referenceService: ReferredService,
    private establishmentService: EstableishmentService
  ) {
    this.patientDto = new PatientDTO();
    this.sourceEstablishment = new Establishment();
  }

  ngOnInit(): void {
    this.establishmentService.getCurrentEstablishment().subscribe(
      (data) => {
        this.sourceEstablishment = data;
      },
      (err) => console.error(err)
    );
    this.loadReference();
  }

  loadReference() {
    this.referenceService.getReferenceById(this.route.snapshot.params['id']).subscribe(
      data => {
        console.log(data);
        this.reference = data;
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
