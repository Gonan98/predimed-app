import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IncidencePutModel } from 'src/app/models/Incidence';
import { IncidenceService } from 'src/app/services/incidence.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-incidence-details',
  templateUrl: './incidence-details.component.html',
  styleUrls: ['./incidence-details.component.css']
})
export class IncidenceDetailsComponent implements OnInit {

  private baseURL = `${environment.API_URL}/incidences`;

  docMedic = localStorage.getItem("documentMedic");
  centroSaludId = '';
  status = '';
  topic = '';
  description = '';
  type = '';
  priority = '';
  phone = '';
  inputDate = '';
  inputHour = '';
  userId = '';
  solution = '';
  a = localStorage.getItem("idIncidence");
  incidencePutModel : IncidencePutModel;

  constructor(private incidenceService: IncidenceService, private http: HttpClient) {
    this.incidencePutModel = new IncidencePutModel();
  }

  ngOnInit(): void {
    let idIncidence = localStorage.getItem("idIncidence");
    console.log(idIncidence);
    this.incidenceService.getIncidenceById(idIncidence!).subscribe(
      data => {
        this.phone = data.phone;
        this.status = data.status;
        this.topic = data.topic;
        this.centroSaludId = data.establishment_id;
        this.description = data.description;
        this.type = data.registerType;
        this.priority = data.priority;
        this.userId = data.user_id;
      }
    );
  }

  update(){
    this.http.put(`${this.baseURL}/${this.a}`,
      {
        "establishmentId": this.centroSaludId,
        "status": this.status,
        "topic": this.topic,
        "phone": this.phone,
        "description": this.description,
        "registerType": this.type,
        "priority": this.priority,
        "userId": this.userId,
        "solutionDetail": this.solution,
        "dateSolution": this.inputDate + this.inputHour
      })
      .subscribe(
          data => {
          console.log("PUT Request is successful ", data);
        },
        error => {
          console.log("Rrror", error);
        }
      );
    console.log(this.inputDate);
    console.log(this.inputHour);
    console.log(this.userId);
  }

}
