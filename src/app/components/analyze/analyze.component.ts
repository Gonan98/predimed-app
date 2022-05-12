import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogNoReferenceComponent } from 'src/app/dialog-no-reference/dialog-no-reference.component';
import { Disease } from 'src/app/models/Disease';
import { NeuralNetwork } from 'src/app/models/NN';
import { Patient, PatientDTO } from 'src/app/models/Patient';
import { Symptom } from 'src/app/models/Symptom';
import { DiagnosticService } from 'src/app/services/diagnostic.service';
import { DiseaseService } from 'src/app/services/disease.service';
import { PatientService } from 'src/app/services/patient.service';
import { SymptomService } from 'src/app/services/symptoms.service';

@Component({
  selector: 'app-analyzet',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {

  response: NeuralNetwork;
  activeSymptoms: Symptom[];
  disease: Disease;

  constructor(
    private diagnosticService: DiagnosticService,
    private router: Router,
    private patientService: PatientService,
    private diseaseService: DiseaseService,
    private symptomService: SymptomService
  ) {
    this.response = this.diagnosticService.response;
    this.disease = new Disease();
    this.activeSymptoms = this.symptomService.activeSymptoms;
  }

  ngOnInit(): void {
    this.getDisease();
  }

  getDisease() {
    this.diseaseService.getDiseaseById(this.response.maxOutput.name).subscribe(
      data => this.disease = data,
      console.error
    );
  }

  onReference() {
    this.router.navigate(['/referencia']);
  }

  goBack() {
    this.router.navigate(['..']);
    this.patientService.patientDTO = new PatientDTO();
  }

  onNoReferenceDialog() {
    this.dialog.open(DialogNoReferenceComponent);
  }

}
