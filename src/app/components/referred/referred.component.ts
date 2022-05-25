import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  patient: string;
  idReference: number;
  dni: number;
}


@Component({
  selector: 'app-referred',
  templateUrl: './referred.component.html',
  styleUrls: ['./referred.component.css']
})
export class ReferredComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
