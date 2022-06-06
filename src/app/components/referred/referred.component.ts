import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Referred } from 'src/app/models/Referred';
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

  constructor(private router: Router, private referredService: ReferredService) { }

  ngOnInit(): void {
    this.referredService.getReferences().subscribe(data => {
      console.log(data);
      this.referred = data;
    }
    );
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.referred);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView(){
    this.router.navigate(['/detalleReferencia']);
  }

}
