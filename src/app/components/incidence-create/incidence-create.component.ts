import { Component, OnInit } from '@angular/core';
import { Incidence, IncidencePostModel } from 'src/app/models/Incidence';
import {IncidenceService } from 'src/app/services/incidence.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-incidence-create',
  templateUrl: './incidence-create.component.html',
  styleUrls: ['./incidence-create.component.css']
})
export class IncidenceCreateComponent implements OnInit {
  establishmentId?: string;
  topic?: string;
  description?: string;
  status?: string;
  phone?: string;
  priority?: string;
  registerType?: string;
  userId?: string;
  docMedic = localStorage.getItem("documentMedic");

  constructor(private incidenceService : IncidenceService, private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log(localStorage.getItem("docMedic"));
    
  }

  createIncidence(){
    this.http.post<IncidencePostModel>('https://predimed-node.herokuapp.com/api/v1/incidences', {
      establishmentId: this.establishmentId,
      topic : this.topic,
      description : this.description,
      status : this.status,
      phone : this.phone,
      priority : this.priority,
      registerType: this.registerType,
      userId : localStorage.getItem("userId")
    }).subscribe(data => {
        console.log(data);
    })
  }

  ra(){
    console.log("raaaa");
  }
}
