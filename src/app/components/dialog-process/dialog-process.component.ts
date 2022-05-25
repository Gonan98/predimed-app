import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  code: string;
  description: string;

}

@Component({
  selector: 'app-dialog-process',
  templateUrl: './dialog-process.component.html',
  styleUrls: ['./dialog-process.component.css']
})
export class DialogProcessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  onView(a: String){

  }

}

