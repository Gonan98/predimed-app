import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientDTO } from 'src/app/models/Patient';
import { Symptom } from 'src/app/models/Symptom';
import { DiagnosticService } from 'src/app/services/diagnostic.service';
import { DiseaseService } from 'src/app/services/disease.service';
import { PatientService } from 'src/app/services/patient.service';
import { SymptomService } from 'src/app/services/symptoms.service';
import { DialogNoReferenceComponent } from '../dialog-no-reference/dialog-no-reference.component';

@Component({
  selector: 'app-analyzet',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {

  activeSymptoms: Symptom[];

  constructor(
    public diagnosticService: DiagnosticService,
    private router: Router,
    private patientService: PatientService,
    private diseaseService: DiseaseService,
    private symptomService: SymptomService,
  ) {
    this.activeSymptoms = this.symptomService.activeSymptoms;
  }

  ngOnInit(): void {
    this.getDisease();
  }

  getDisease() {
    this.diseaseService.getDiseaseById(this.diagnosticService.response.maxOutput.name).subscribe(
      data => this.diagnosticService.disease = data,
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
    //this.dialog.open(DialogNoReferenceComponent);
  }

}
