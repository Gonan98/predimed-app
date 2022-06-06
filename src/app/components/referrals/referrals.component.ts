import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogProcessComponent} from '../dialog-process/dialog-process.component';
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

export interface ProcessElement {
  code: string;
  description: string;
}

export interface LaboratoryExam {
  description: string;
}

const ELEMENT_DATA: ProcessElement[] = [
  {code: '001', description: 'Cirugía General'},
  {code: '002', description: 'Cirugía Especial'},
  {code: '003', description: 'Cardiología'},
  {code: '004', description: 'Psicología'},
];
const ELEMENT_DATA1: LaboratoryExam[] = [
  {description: 'Sangre'},
  {description: 'Orina'},
];

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})


export class ReferralsComponent implements OnInit {
  public formAnamnesis!: FormGroup;

  displayedColumns: string[] = ['code', 'description'];
  displayedColumns1: string[] = ['description'];
  dataSource: ProcessElement[] = [];
  dataSource1: LaboratoryExam[] = [];
  selected = '';

  isShown: boolean = false ;
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

  constructor(
    public dialog: MatDialog,
    private estableishmentService: EstableishmentService,
    public router: Router,
    private formBuilder: FormBuilder,
    public diagnosticService: DiagnosticService
  ) {
    this.sourceEstablishment = new Establishment();
  }

  ngOnInit(): void {
    this.formAnamnesis = this.formBuilder.group({
      temperatura: ['',[Validators.required]],
      pa: ['',[Validators.required]],
      fc: ['',[Validators.required]],
      fr: ['',[Validators.required]],
      peso: ['',[Validators.required]],
      altura: ['',[Validators.required]],

    });

    this.estableishmentService.getCurrentEstablishment().subscribe(
      data => {
        this.sourceEstablishment = data
      },
      err => console.error(err)
    );

    this.estableishmentService.getDestinyEstablishments().subscribe(
      data => this.destinyEstablishments = data,
      err => console.error(err)
    );
  }

  onDestinyEstablishmentChange(code: string) {
    console.log(code)
    let index = parseInt(code);
    console.log(index);
    this.estableishmentService.getEstablishmentDestinyServices(index).subscribe(
      data => this.destinyServices = data.destinyServices,
      err => console.error(err)
    );

    this.estableishmentService.getEstablishmentSpecialties(index).subscribe(
      data => this.specialties = data.specialties,
      err => console.error(err)
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
    this.isShownAnamnesis = false
    this.isShownDiagnostic = true;
  }


  addProcedimiento(){ 
    let dialogRef = this.dialog.open(DialogProcessComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      height: '',
      position: {
          top: '50vh',
          left: '50vw'
      },
      panelClass:'makeItMiddle',
  });
    dialogRef.afterClosed().subscribe(result => {
      let newElement: ProcessElement = {code: '000', description: 'None'};
      if (result != '') {
        let newDatasource = this.dataSource;
        for(let i = 0; i < ELEMENT_DATA.length; i++) {
          if (ELEMENT_DATA[i].description == result) {
            newElement = ELEMENT_DATA[i]
          }
        }
        newDatasource.push(newElement); 
        this.dataSource = [...newDatasource]
      };
      
    }) 
  }

  addExamen(){
    let dialogRef = this.dialog.open(DialogExamComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      height: '',
      position: {
          top: '50vh',
          left: '50vw'
      },
      panelClass:'makeItMiddle',
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result != ''){
      let newElement: LaboratoryExam = {description: result};
      let newDatasource = this.dataSource1;
      newDatasource.push(newElement); 
      this.dataSource1 = [...newDatasource]
    }
  }) 
  }

  onSend(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Referencia enviada con éxito',
      showConfirmButton: false,
      timer: 1500
    })
  }
  onBack(){
    this.router.navigate(['/analizar']);
  }

}