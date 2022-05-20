import { Component, OnInit } from '@angular/core';
import { Incidence, IncidencePostModel } from 'src/app/models/Incidence';
import {IncidenceService } from 'src/app/services/incidence.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incidence-create',
  templateUrl: './incidence-create.component.html',
  styleUrls: ['./incidence-create.component.css']
})
export class IncidenceCreateComponent implements OnInit {
  public formCreateIncidence!: FormGroup;
  establishmentId?: string;
  topic?: string;
  description?: string;
  status?: string;
  phone?: string;
  priority?: string;
  registerType?: string;
  userId?: string;
  docMedic = localStorage.getItem("documentMedic");

  constructor(private incidenceService : IncidenceService, private http: HttpClient,private router: Router,private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(localStorage.getItem("docMedic"));
    this.formCreateIncidence = this.formBuilder.group({
      saludid: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      asunto: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],

    });
    
  }
  
  regresar() {
    this.router.navigate(['/incidenciaAdmin']);
  }

  createIncidence(){
    if(
      this.description==null || this.description == undefined || this.description == "" &&
      this.establishmentId==null || this.establishmentId == undefined || this.establishmentId == "" &&
      this.phone==null || this.phone == undefined || this.phone == "" &&
      this.topic==null || this.topic == undefined || this.topic == ""
      ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Debe completar todos los campos requeridos!',
      })
  }else{
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
    this.router.navigate(['/incidenciaAdmin']);
  }
  
  }

  ra(){
    console.log("raaaa");
  }
  makeActive(){
    
  }

}
