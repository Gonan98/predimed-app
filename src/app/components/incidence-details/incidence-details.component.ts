import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incidence-details',
  templateUrl: './incidence-details.component.html',
  styleUrls: ['./incidence-details.component.css']
})
export class IncidenceDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let idIncidence = localStorage.getItem("idIncidence");
    console.log("aaaaaaaaaa");
    console.log(idIncidence);
  }

}
