import { Component, OnInit } from '@angular/core';
import { History } from 'src/app/models/History';
import { HistoryService } from 'src/app/services/history.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history: History;
  documentNumber: string;
  patientId: number;

  constructor(private historyService: HistoryService, private patientService: PatientService) {
    this.history = new History();
    this.documentNumber = '';
    this.patientId = 0;
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.patientService.getPatientByDocument(this.documentNumber).subscribe(
      (data) => {
        this.history.patientId = data.id
        this.saveHistory();
      }
    );
    this.history = new History();
  }

  saveHistory() {
    this.historyService.saveHistory(this.history).subscribe(
      console.log,
      console.error
    );
  }

}
