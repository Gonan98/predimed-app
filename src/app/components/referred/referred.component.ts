import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Referred } from 'src/app/models/Referred';
import { PatientService } from 'src/app/services/patient.service';
import { ReferredService } from 'src/app/services/referred.service';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';

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

export class ReferredComponent implements OnInit, AfterViewInit  {
  referred: Referred[] = [];
  data: any;
  dataSource = new MatTableDataSource<any>();
  patients: any;
  patient: any

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private router: Router, private referredService: ReferredService, private patientService: PatientService) { }
  
  ngAfterViewInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);

  }

  ngOnInit() {
    this.referredService.getReferences().subscribe( data => {
        this.data = data;

        this.patientService.getAllPatients().subscribe(patients => {
          
          this.patients = patients 
          let elementArray: { id: any; patient: string; dni: any; }[] = []

          for (let i = 0; i < this.data.length; i++) {
            let patientId = this.data[i].patientId

            for (let j = 0; j < this.patients.length; j++) { 
              if (patients[j].id == patientId) {
                this.patient = patients[j]
              }
            }
            
            let element = {
              "id": this.data[i].id,
              "patient": this.patient.firstName + ' ' + this.patient.lastName,
              "dni": this.patient.documentNumber,
            };
        
            elementArray.push(element);
            this.dataSource = new MatTableDataSource([...elementArray]);
            this.dataSource.paginator = this.paginator
          }
            })
        });
    }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView(id: number){
    this.router.navigate(['/referido/' + id]);
  }

}
