import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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

  constructor(private router: Router) { }

  ngOnInit(): void {
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
