import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IncidencePutModel } from 'src/app/models/Incidence';
import { AuthService } from 'src/app/services/auth.service';
import { IncidenceService } from 'src/app/services/incidence.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-incidence-details',
  templateUrl: './incidence-details.component.html',
  styleUrls: ['./incidence-details.component.css']
})
export class IncidenceDetailsComponent implements OnInit {

  private baseURL = `${environment.API_URL}/incidences`;

  incidence: any;
  
  docMedic = '';
  establishmentId = '';
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
  incidencesData: any;

  constructor(private incidenceService: IncidenceService, private http: HttpClient, private authService: AuthService) {
    this.incidencePutModel = new IncidencePutModel();
  }

  async ngOnInit() {
    let idIncidence = localStorage.getItem("idIncidence");
    console.log(idIncidence);
     await this.authService.getProfile().subscribe(async data => {
      this.docMedic = data['documentMedic']
      this.establishmentId = data['establishmentCode']
      console.log(data)
      
     });
     await this.incidenceService.getIncidenceByUserId(this.userId).subscribe(
     data => {
       this.incidencesData = data;
       for(let i = 0; i < this.incidencesData.length; i++) {
         if (this.incidencesData[i].id == idIncidence){
          this.incidence = this.incidencesData[i]
          this.status = this.incidence['status']
          this.topic = this.incidence['subject']
          this.phone = this.incidence['phone']
          this.type = this.incidence['incidenceType']
          this.priority = this.incidence['priority']
          this.description = this.incidence['description']
          this.userId = this.incidence['id']

          let date = new Date(this.incidence["createdAt"])
          this.inputDate =  (date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear();
          this.inputHour = date.getHours() + ":" + date.getMinutes().toString()
          console.log(this.incidence)
         }else {
           console.log("not found")
         }
       }
    })    
    
    
  }

  update(){
    this.http.put(`${this.baseURL}/${this.a}`,
      {
        "establishmentId": this.establishmentId,
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
