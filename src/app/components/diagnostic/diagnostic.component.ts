import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { SymptomService } from 'src/app/services/symptoms.service';
import { Symptom } from 'src/app/models/Symptom';
import * as moment from 'moment';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import Swal from 'sweetalert2';
import { DiagnosticService } from 'src/app/services/diagnostic.service';
import { Neuron } from 'src/app/models/NN';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent implements OnInit {
  
  searchInput = '';
  //patientDTO : PatientDTO;
  symptoms: Symptom[]
  neurons: Neuron[];

  constructor(
    private patientService: PatientService,
    private ubigeoService: UbigeoService,
    private symptomService: SymptomService,
    private router: Router,
    private diagnosticService: DiagnosticService
  ) {
    //this.patientDTO = new PatientDTO();
    this.symptoms = [];
    this.neurons = [];
  }

  ngOnInit(): void {
    this.getAllSymptoms();
  }

  getAllSymptoms(){
    this.symptomService.getSymptoms().subscribe(
      data => this.symptoms = data,
      err => console.error(err),
    )
  }

  onSearch() {
    this.patientService.getPatientByDocument(this.searchInput).subscribe(
      data => {
        //this.patientService.basePatient = data;
        this.patientService.patientDTO.id = data.id;
        this.patientService.patientDTO.fullName = data.firstName + ' ' + data.lastName;
        this.patientService.patientDTO.documentNumber = data.documentNumber;
        this.patientService.patientDTO.gender = data.gender === 'M' ? 'MASCULINO' : 'FEMENINO';
        this.patientService.patientDTO.age = moment(data.birthdate, "YYYY-MM-DD").fromNow().substring(0,2);
        this.patientService.patientDTO.address = data.address;
        this.getLocation(data.ubigeoId);
      },
      console.error
    );
  }

  isThereAPatient() {
    return this.patientService.patientDTO.id;
  }
  
  getLocation(districtId: string) {    
    this.ubigeoService.getDistrictById(districtId).subscribe(
      data => {
        this.patientService.patientDTO.location = data.ubigeoPeruDepartment.name + '/' + data.ubigeoPeruProvince.name + '/' + data.name;
      },
      console.error
    );
  }

  onAnalize() {
    if (this.patientService.patientDTO.id) {
      this.symptoms.forEach(s => this.neurons.push(new Neuron(s.code, s.active ? 1 : 0)));

      this.diagnosticService.doPrediction(this.neurons).subscribe(
        res => {
          this.diagnosticService.response = res;
          this.symptomService.activeSymptoms = this.symptoms.filter(s => s.active);
          console.log(res);
          
          this.router.navigate(['/analizar']);
        },
        console.error
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Debe buscar un paciente primero!',
      })
    }
  }

}
