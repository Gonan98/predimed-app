import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Incidence } from 'src/app/models/Incidence';
import { IncidenceService } from 'src/app/services/incidence.service';

let ELEMENT_DATA: Incidence[] = [];

@Component({
  selector: 'app-incidence-admin',
  templateUrl: './incidence-admin.component.html',
  styleUrls: ['./incidence-admin.component.css']
})
export class IncidenceAdminComponent implements OnInit {

  constructor(private router: Router, private incidenceService : IncidenceService) { }

  ngOnInit(): void {
    this.getIncidences();
  }

  getIncidences(){
    this.incidenceService.getIncidences().subscribe(
      incidencias => {
        ELEMENT_DATA = incidencias;
        console.log(ELEMENT_DATA);
      }
    )
  }


  displayedColumns: string[] = ['id', 'docMedic', 'type', 'status', 'details'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView(idIncidence: String){
    this.router.navigate(['/incidenciaDetalle']);
    console.log(idIncidence);
    localStorage.setItem("idIncidence", idIncidence.toString());
  }

}
