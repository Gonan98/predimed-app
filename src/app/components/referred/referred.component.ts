import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Referred } from 'src/app/models/Referred';
import { PatientService } from 'src/app/services/patient.service';
import { ReferredService } from 'src/app/services/referred.service';

export interface PeriodicElement {
  patient: string;
  idReference: number;
  dni: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {idReference: 102009, patient: 'Steven Ramirez', dni: 15456235},
  {idReference: 102010, patient: 'Jorge Diaz', dni: 25854796},
  {idReference: 102011, patient: 'Harold Alcántara', dni: 85957558},
  {idReference: 102012, patient: 'Kevin Mosqueira', dni: 71717273},
  {idReference: 102013, patient: 'Jhon Lagos', dni: 70724115},
  {idReference: 102014, patient: 'Luis Cardama', dni: 75744568},
];


@Component({
  selector: 'app-referred',
  templateUrl: './referred.component.html',
  styleUrls: ['./referred.component.css']
})
export class ReferredComponent implements OnInit {

  referred: Referred[] = [];
  data: any;
  dataSource: any;
  patients: any;
  constructor(private router: Router, private referredService: ReferredService, private patientService: PatientService) { }

  ngOnInit() {
  this.referredService.getReferences().subscribe( data => {
      this.data = data;

      this.patientService.getAllPatients().subscribe(patients => {
        
        this.patients = patients 
        let elementArray: { id: any; patient: string; dni: any; }[] = []

        for (let i = 0; i < this.data.length; i++) {
          for (let j = 0; i < this.data.length; i++) { 
            
            if (this.data[i].patientId === this.patients[j].id) {
              console.log("true")
              let element = {
            "id": this.data[i].id,
            "patient": this.patients[j].firstName + ' ' + this.patients[j].lastName,
            "dni": this.patients[j].documentNumber,
          };
          
          elementArray.push(element);
          this.dataSource = [...elementArray];
        }
          }
        }
      })
     
    }
    );
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView(){
    this.router.navigate(['/detalleReferencia']);
  }

}
