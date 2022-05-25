import { Component, OnInit } from '@angular/core';
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

  createIncidence() {
    this.router.navigate(['/incidenciaCrear']);
  }
  regresar() {
    this.router.navigate(['/incidenciaAdmin']);
  }

}