import { Component, OnInit } from '@angular/core';
import { Incidence, IncidencePostModel } from 'src/app/models/Incidence';
import {IncidenceService } from 'src/app/services/incidence.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

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
  incidenceType?: string;
  userId?: string;
  docMedic?: string;
  medicData: any;

  constructor(private incidenceService : IncidenceService, private http: HttpClient,private router: Router,private formBuilder: FormBuilder, private authService:AuthService) {
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(data => {
      this.userId = data['id']
      this.establishmentId = data['establishmentCode']
      this.medicData = data['documentMedic']
    })
    this.formCreateIncidence = this.formBuilder.group({
      userId: [{value: '', disabled: true},[Validators.required,]],
      establishmentId: [{value: '', disabled: true},[Validators.required]],
      phone: ['',[Validators.required]],
      topic: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      status: ['',[Validators.required]],
      priority: ['',[Validators.required]],
      incidenceType: ['',[Validators.required]],
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
    this.http.post<IncidencePostModel>('https://predimed-node.herokuapp.com/api/v2/incidences', {
      establishmentId: this.establishmentId,
      subject : this.topic,
      description : this.description,
      status : this.status,
      phone : this.phone,
      priority : this.priority,
      incidenceType: this.incidenceType,
      userId : 2,
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
