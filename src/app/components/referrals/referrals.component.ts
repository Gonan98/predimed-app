import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogProcessComponent } from '../dialog-process/dialog-process.component';
import { EstableishmentService } from 'src/app/services/establishment.service';
import { Establishment } from 'src/app/models/Estableishment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Specialty } from 'src/app/models/Specialty';
import { Service } from 'src/app/models/Service';
import { DestinyService } from 'src/app/models/DestinyService';
import { Referred } from 'src/app/models/Referred';
import { DiagnosticService } from 'src/app/services/diagnostic.service';
import { DialogExamComponent } from '../dialog-exam/dialog-exam.component';
import { LabExam } from 'src/app/models/LabExam';
import { MatTableDataSource } from '@angular/material/table';
import { ReferredService } from 'src/app/services/referred.service';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { History } from 'src/app/models/History';
import { ServiceService } from 'src/app/services/service.service';

export interface ProcessElement {
  code: string;
  description: string;
}

export interface LaboratoryExam {
  description: string;
}

let ELEMENT_DATA: ProcessElement[] = [
  { code: '001', description: 'Cirugía General' },
  { code: '002', description: 'Cirugía Especial' },
  { code: '003', description: 'Cardiología' },
  { code: '004', description: 'Psicología' },
];
const ELEMENT_DATA1: LaboratoryExam[] = [
  { description: 'Sangre' },
  { description: 'Orina' },
];

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css'],
})
export class ReferralsComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  displayedColumns: string[] = ['code', 'description'];
  displayedColumns1: string[] = ['description'];
  dataSource: ProcessElement[] = [];
  dataSource1: LaboratoryExam[] = [];
  selected = '';

  isShown: boolean = false;
  isShownAnamnesis: boolean = true;
  isShownDiagnostic: boolean = false;
  isShownProcedure: boolean = false;
  isShownExam: boolean = false;

  idElementAdded: string = '';

  sourceEstablishment: Establishment;

  specialties: Specialty[] = [];
  services: Service[] = [];
  destinyServices: DestinyService[] = [];

  destinyEstablishments: Establishment[] = [];
  code: number = 0;
  referred: Referred = new Referred();
  isRefDataEnabled: boolean = true;

  userId?: string;
  reason?: string;

  numberRegEx = '/^[0-9]+$/';

  constructor(
    public dialog: MatDialog,
    private estableishmentService: EstableishmentService,
    public router: Router,
    private formBuilder: FormBuilder,
    public diagnosticService: DiagnosticService,
    public referredService: ReferredService,
    private http: HttpClient,
    private authService: AuthService,
    private serviceService: ServiceService
  ) {
    this.isRefDataEnabled = referredService.getReferredSelected();
    this.sourceEstablishment = new Establishment();
    console.log(document.getElementById('reasonText')?.textContent ?? null);
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((data) => {
      this.userId = data['id'];
      //this.establishmentId = data['establishmentCode']
      //this.medicData = data['documentMedic']
    });

    this.estableishmentService.getCurrentEstablishment().subscribe(
      (data) => {
        this.sourceEstablishment = data;
      },
      (err) => console.error(err)
    );

    this.estableishmentService.getDestinyEstablishments().subscribe(
      (data) => (this.destinyEstablishments = data),
      (err) => console.error(err)
    );

    this.form = this.formBuilder.group({
      destinyEstablishmentControl: [
        { value: '', disabled: !this.isRefDataEnabled },
        [Validators.required],
      ],
      destinyService: [{ value: '', disabled: !this.isRefDataEnabled }],
      speciality: [{ value: '', disabled: !this.isRefDataEnabled }],
      temperatura: ['', [Validators.required]],
      pa: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
      fc: ['', [Validators.required]],
      fr: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      altura: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    console.log('DESTROYING');
    this.referredService.setReferredSelected(true);
    console.log(document.getElementById('anamnesisResume')?.textContent);
  }

  onDestinyEstablishmentChange(code: string) {
    let index = parseInt(code);
    console.log(index);
    this.estableishmentService.getEstablishmentDestinyServices(index).subscribe(
      (data) => (this.destinyServices = data.destinyServices),
      (err) => console.error(err)
    );

    this.estableishmentService.getEstablishmentSpecialties(index).subscribe(
      (data) => (this.specialties = data.specialties),
      (err) => console.error(err)
    );
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

  async addProcedimiento() {
    let dialogRef = this.dialog.open(DialogProcessComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      height: '',
      position: {
        top: '50vh',
        left: '50vw',
      },
      panelClass: 'makeItMiddle',
    });
    await dialogRef.afterClosed().subscribe(async (result) => {
      let newElement: ProcessElement = { code: '000', description: 'None' };
      if (result != '') {
        let newDatasource: any;
        await this.serviceService.getServices().subscribe((data) => {
          newDatasource = data;
          for (let i = 0; i < newDatasource.length; i++) {
            if (newDatasource[i].serviceName == result) {
              newElement.code = newDatasource[i].code;
              newElement.description = newDatasource[i].serviceName;
            }
          }
          newDatasource.push(newElement);
          this.dataSource = [newElement];
        });
      }
    });
  }

  addExamen() {
    let dialogRef = this.dialog.open(DialogExamComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      height: '',
      position: {
        top: '50vh',
        left: '50vw',
      },
      panelClass: 'makeItMiddle',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != '') {
        let newElement: LaboratoryExam = { description: result };
        let newDatasource = this.dataSource1;
        newDatasource.push(newElement);
        this.dataSource1 = [...newDatasource];
      }
    });
  }

  onSend() {
    let isAnamnesisReady = false;
    let isReferenceReady = false;
    console.log('Is data enabled?: ', this.isRefDataEnabled);
    if (this.isRefDataEnabled === true) {
      if (this.validateReference() == true) {
        isReferenceReady = true;
      }
      if (this.validateAmnesis() == true) {
        isAnamnesisReady = true;
      }
      if (isReferenceReady && isAnamnesisReady) {
        this.http
          .post<Referred>(`${environment.API_URL}/referred`, {
            reason: document.getElementById('reasonText')?.textContent,
            userId: this.userId,
            sourceEstablishmentCode: this.sourceEstablishment.code,
            destinyEstablishmentCode:
              this.form.value.destinyEstablishmentControl,
            destinyServiceCode: this.form.value.destinyService,
            serviceCode: this.dataSource[0].code,
            specialtyCode: this.form.value.speciality,
            patientId: parseInt(localStorage.getItem('patientId') ?? '1'),
            diseaseCode: this.diagnosticService.disease.code,
          })
          .subscribe((data) => {
            console.log(data);
          });

        this.http
          .post<History>(`${environment.API_URL}/histories`, {
            weight: parseInt(this.form.value.peso),
            height: parseInt(this.form.value.altura),
            pressure: parseInt(this.form.value.pa),
            temperature: parseInt(this.form.value.temperatura),
            heartRate: parseInt(this.form.value.fc),
            respirationRate: parseInt(this.form.value.fr),
            anamnesis: document.getElementById('anamnesisResume')?.textContent,
            examSummary: document.getElementById('examResume')?.textContent,
            patientId: parseInt(localStorage.getItem('patientId') ?? '1'),
          })
          .subscribe((response) => {
            console.log(response);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Referencia enviada con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
            this.router.navigate(['/referidos']);
          });
      } else {
        console.log('Refence ready?: ', isReferenceReady);
        console.log('Anamnesis ready?: ', isAnamnesisReady);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Formulario de referencia y/o anamesis fallaron',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      if (this.validateAmnesis() == true) {
        this.http
          .post<History>(`${environment.API_URL}/histories`, {
            weight: parseInt(this.form.value.peso),
            height: parseInt(this.form.value.altura),
            pressure: parseInt(this.form.value.pa),
            temperature: parseInt(this.form.value.temperatura),
            heartRate: parseInt(this.form.value.fc),
            respirationRate: parseInt(this.form.value.fr),
            anamnesis: document.getElementById('anamnesisResume')?.textContent,
            examSummary: document.getElementById('examResume')?.textContent,
            patientId: parseInt(localStorage.getItem('patientId') ?? '1'),
          })
          .subscribe((response) => {
            console.log(response);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Referencia enviada con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
            this.router.navigate(['/referidos']);
          });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Formulario de referencia y/o anamesis fallaron',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  validateAmnesis() {
    console.log(document.getElementById('anamnesisResume')?.textContent);
    console.log(document.getElementById('examResume')?.textContent);
    return (
      parseInt(this.form.value.peso) != null &&
      parseInt(this.form.value.pa) != null &&
      parseInt(this.form.value.temperatura) != null &&
      parseInt(this.form.value.fc) != null &&
      parseInt(this.form.value.fr) != null &&
      (document.getElementById('anamnesisResume')?.textContent != null ||
        document.getElementById('anamnesisResume')?.textContent != undefined) &&
      parseInt(localStorage.getItem('patientId') ?? '1') != null &&
      (document.getElementById('examResume')?.textContent != null ||
        document.getElementById('examResume')?.textContent != undefined) &&
      parseInt(this.form.value.altura) != null
    );
  }

  validateReference() {
    return (
      (document.getElementById('reasonText')?.textContent != '' ||
        document.getElementById('reasonText')?.textContent != undefined) &&
      this.userId != null &&
      this.sourceEstablishment.code != null &&
      this.form.value.destinyService != null &&
      this.dataSource[0].code != null &&
      this.form.value.speciality != null &&
      parseInt(localStorage.getItem('patientId') ?? '1') != null &&
      this.diagnosticService.disease.code != null
    );
  }

  onBack() {
    this.router.navigate(['/analizar']);
  }
}
