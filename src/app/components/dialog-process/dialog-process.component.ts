import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';

export interface PeriodicElement {
  code: string;
  description: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {code: '001', description: 'Cirugía General'},
  {code: '002', description: 'Cirugía Especial'},
  {code: '003', description: 'Cardiología'},
  {code: '004', description: 'Psicología'},
];

@Component({
  selector: 'app-dialog-process',
  templateUrl: './dialog-process.component.html',
  styleUrls: ['./dialog-process.component.css']
})
export class DialogProcessComponent implements OnInit {
  dataSource: any;
  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getServices().subscribe(data => {
      this.dataSource = data
    })
  }

  displayedColumns: string[] = ['Código', 'Descripción', 'Acciones']

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView(a: String){
    
  }

}

