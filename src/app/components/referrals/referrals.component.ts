import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import { DialogProcessComponent} from '../dialog-process/dialog-process.component';
import { EstableishmentService } from 'src/app/services/establishment.service';
import { Establishment } from 'src/app/models/Estableishment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})


export class ReferralsComponent implements OnInit {
  public formAnamnesis!: FormGroup;

  displayedColumns: string[] = ['code', 'description'];
  displayedColumns1: string[] = ['description'];
  dataSource = ELEMENT_DATA;
  dataSource1 = ELEMENT_DATA1;

  selected = '';

  isShown: boolean = false ;
  isShownAnamnesis: boolean = true;
  isShownDiagnostic: boolean = false;

  idElementAdded: string = '';

  establishmentArrayComponent : Establishment[] = [];

  sourceEstablishment = '';

  constructor(public dialog: MatDialog, private estableishmentService: EstableishmentService, public router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getEstableishments();
    this.formAnamnesis = this.formBuilder.group({
      temperatura: ['',[Validators.required]],
      pa: ['',[Validators.required]],
      fc: ['',[Validators.required]],
      fr: ['',[Validators.required]],
      peso: ['',[Validators.required]],
      altura: ['',[Validators.required]],

    });

    this.estableishmentService.getCurrentEstablishment().subscribe(
      data => this.sourceEstablishment = data.name,
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
    this.isShownAnamnesis = false;
    this.isShownDiagnostic = true;
  }

  getEstableishments(){
    this.estableishmentService.getData();
    console.log(this.estableishmentService.establishmentArray);
    this.establishmentArrayComponent = this.estableishmentService.establishmentArray;
    console.log("aaaaaa");
    console.log(this.establishmentArrayComponent);
  }

  addProcedimiento(){
    //const dialogRef = this.dialog.open(DialogContentExampleDialog);
    let dialogRef = this.dialog.open(DialogProcessComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.idElementAdded = result;
      console.log(this.idElementAdded);
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