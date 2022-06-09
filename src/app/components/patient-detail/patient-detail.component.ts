import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Antecedent } from 'src/app/models/Antecedent';
import { History } from 'src/app/models/History';
import { Patient } from 'src/app/models/Patient';
import { AntecedentService } from 'src/app/services/antecedent.service';
import { HistoryService } from 'src/app/services/history.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  patient: Patient;
  histories: History[];
  antecedents: Antecedent[];
  selectedHistory: History;
  patientId: string;
  historyIndex: number;
  antecedentType: string;

  constructor(
    private patientService: PatientService,
    private historyService: HistoryService,
    private antecedentsService: AntecedentService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.patient = new Patient();
    this.selectedHistory = new History();
    this.patientId = this.route.snapshot.params['id'];
    this.histories = [];
    this.antecedents = [];
    this.historyIndex = 0;
    this.antecedentType = 'EXAMENES' //AM, AF, IM
  }

  ngOnInit(): void {
    this.patientService.getPatientById(this.patientId).subscribe(
      res => this.patient = res,
      err => console.error(err)
    );

    this.loadHistores();
    this.loadAntecedents();
  }

  loadAntecedents() {
    this.antecedentsService.getAntecedentsByPatient(this.patientId).subscribe(
      res => this.antecedents = res,
      err => console.error(err)
    );
  }

  loadHistores() {
    this.historyService.getHistoriesByPatient(this.patientId).subscribe(
      data => {
        this.histories = data;
        if (this.histories.length > 0) this.selectedHistory = this.histories[this.historyIndex];
      },
      err => console.error(err)
    );
  }

  getNext() {
    if (this.historyIndex < this.histories.length - 1) {
      this.historyIndex++;
      this.selectedHistory = this.histories[this.historyIndex];
    }
  }

  getPrevious() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.selectedHistory = this.histories[this.historyIndex];
    }
  }

  clickTab(type:string) {
    this.antecedentType = type;
  }

  goBack(){
    this.router.navigate(['/crearPaciente']);
  }

}