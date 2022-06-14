import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Incidence } from 'src/app/models/Incidence';
import { AuthService } from 'src/app/services/auth.service';
import { IncidenceService } from 'src/app/services/incidence.service';



@Component({
  selector: 'app-incidence-admin',
  templateUrl: './incidence-admin.component.html',
  styleUrls: ['./incidence-admin.component.css']
})

export class IncidenceAdminComponent implements OnInit {

  docMedic: string = '';
  incidences: Incidence[] = [];
  dataSource: any; 
  
  constructor(private router: Router, private incidenceService : IncidenceService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.incidenceService.getIncidences().subscribe(data => {
      console.log(data);
      this.dataSource = data;
      console.log(this.incidences);
    }
    );

    this.authService.getProfile().subscribe(async data => {
      this.docMedic = data['documentMedic']     
     });
  }

  displayedColumns: string[] = ['id', 'docMedic', 'type', 'status', 'details'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createIncidence() {
    this.router.navigate(['/incidenciaCrear']);
  }
  regresar() {
    this.router.navigate(['/incidenciaAdmin']);
  }

  onView(idIncidence: String){
    this.router.navigate(['/incidenciaDetalle']);
    console.log(idIncidence);
    localStorage.setItem("idIncidence", idIncidence.toString());
  }

}