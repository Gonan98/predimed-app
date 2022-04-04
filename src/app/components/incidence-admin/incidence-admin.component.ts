import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  idIncidence: string;
  dniDoctor: string;
  type: string;
  state: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {idIncidence: '01', dniDoctor: '020236', type:'Incidencia', state:'Pendiente'},
  {idIncidence: '02', dniDoctor: '120236', type:'Requerimiento', state:'Cerrado'},
  {idIncidence: '03', dniDoctor: '220236', type:'Incidencia', state:'Cerrado'},
  {idIncidence: '04', dniDoctor: '320236', type:'Requerimiento', state:'Pendiente'},
  {idIncidence: '05', dniDoctor: '420236', type:'Requerimiento', state:'Abierto'},
];


@Component({
  selector: 'app-incidence-admin',
  templateUrl: './incidence-admin.component.html',
  styleUrls: ['./incidence-admin.component.css']
})
export class IncidenceAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['idIncidence', 'dniDoctor', 'type', 'state', 'details'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView(){
    this.router.navigate(['/incidenciaDetalle']);
  }

}
