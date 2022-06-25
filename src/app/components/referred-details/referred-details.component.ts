import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Patient, PatientDTO } from 'src/app/models/Patient';
import { Referred } from 'src/app/models/Referred';
import { EstableishmentService } from 'src/app/services/establishment.service';
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
  { description: 'Cirugía General', code: '001' },
  { description: 'Cardiología', code: '002' },
];

const ELEMENT_DATA1: LaboratoryExam[] = [
  { description: 'Sangre' },
  { description: 'Orina' },
];

@Component({
  selector: 'app-referred-details',
  templateUrl: './referred-details.component.html',
  styleUrls: ['./referred-details.component.css'],
})
export class ReferredDetailsComponent implements OnInit {
  displayedColumns: string[] = ['code', 'description'];
  displayedColumns1: string[] = ['description'];
  dataSource = ELEMENT_DATA;
  dataSource1 = ELEMENT_DATA1;

  isShown: boolean = false;
  isShownAnamnesis: boolean = true;
  isShownDiagnostic: boolean = false;

  patientDto: PatientDTO;
  reference: Referred;
  patient: Patient;
  sourceEstablishment: any;
  destinyEstablishment: any;
  referenceId: number;
  destinyService: string = '';
  speciality: string = '';

  constructor(
    private router: Router,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private ubigeoService: UbigeoService,
    private referenceService: ReferredService,
    private historyService: HistoryService,
    private establishmentService: EstableishmentService
  ) {
    this.patientDto = new PatientDTO();
    this.patient = new Patient();
    this.reference = new Referred();
    this.referenceId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadReferenceById(this.referenceId);
  }

  loadReferenceById(referenceId: number) {
    this.referenceService.getReferenceById(referenceId).subscribe((data) => {
      this.reference = data;
      this.patientService.getPatientById(data.patientId).subscribe((data) => {
        this.patient = data;
      });
      let index = 1;
      console.log(this.reference)
      this.establishmentService.getEstablishments().subscribe((data) => {
        for (let i = 0; i < data.length; i++){
          if (data[i].code == this.reference.sourceEstablishmentCode) {
            this.sourceEstablishment = data[i].name
          }
        }
      });

      this.establishmentService.getDestinyEstablishments().subscribe(data => {
        for (let i = 0; i < data.length; i++){
          if (data[i].code == this.reference.destinyEstablishmentCode) {
            this.destinyEstablishment = data[i].name
          }
        }
        console.log(data)
      })

      this.establishmentService
        .getEstablishmentDestinyServices(+this.reference.destinyEstablishmentCode)
        .subscribe(
          (data) => {
            console.log(data)
            
            for (let i = 0; i < data.destinyServices.length; i++){
              if (data.destinyServices[i].code == this.reference.destinyServiceCode) {
                this.destinyService = data.destinyServices[i].destinyServiceName 
              }
            }
            console.log(this.destinyService)
          },
          (err) => console.error(err)
        );

      this.establishmentService.getEstablishmentSpecialties(+this.reference.destinyEstablishmentCode).subscribe(
        (data) => {
          for (let i = 0; i < data.specialties.length; i++){
            if (data.specialties[i].code == this.reference.specialtyCode) {
              this.speciality = data.specialties[i].specialtyName 
            }
          }
        },
        (err) => console.error(err)
      );
      /*this.establishmentService.getEstablishmentSpecialties(index).subscribe(
        (data) => (this.speciality = data.specialties),
        (err) => console.error(err)
      );*/
    });
  }

  getLocation(districtId: string) {
    this.ubigeoService.getDistrictById(districtId).subscribe((data) => {
      this.patientDto.location =
        data.ubigeoPeruDepartment.name +
        '/' +
        data.ubigeoPeruProvince.name +
        '/' +
        data.name;
    }, console.error);
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  toggleShowAnamnesis() {
    this.isShownAnamnesis = true;
    this.isShownDiagnostic = false;
  }

  toggleDiagnostic() {
    this.isShownAnamnesis = false;
    this.isShownDiagnostic = true;
  }

  goBack() {
    this.router.navigate(['/referidos']);
  }
}
