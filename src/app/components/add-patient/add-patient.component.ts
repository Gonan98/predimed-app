import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/Patient';
import { Department, District, Province } from 'src/app/models/Ubigeo';
import { PatientService } from 'src/app/services/patient.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  document = '';
  patient: Patient;
  patientList: Patient[];
  departments: Department[];
  provinces: Province[];
  districts: District[];
  departmentId: string;
  provinceId: string;
  districtId: string;

  constructor(
    private patientService: PatientService,
    private ubigeoService: UbigeoService
  ) { 
    this.patient = new Patient();
    this.patientList = [];
    this.departments = [];
    this.provinces = [];
    this.districts = [];
    this.departmentId = '';
    this.provinceId = '';
    this.districtId = '';
  }

  ngOnInit(): void {
    this.loadData();
    this.loadDeparments();
  }

  onSearch() {
    this.patientService.getPatientByDocument(this.document).subscribe(
      data => this.patientList = [data],
      err => alert(err.error.message)
    );
  }

  onSubmit() {
    this.patientService.savePatient(this.patient).subscribe(
      () => this.loadData(),
      (err) => console.error(err)
    );
    this.patient = new Patient();
    this.departmentId = '';
    this.provinceId = '';
    this.districtId = '';
  }

  onSelectDepartment() {
    this.ubigeoService.getProvincesByDepartment(this.departmentId).subscribe(
      data => { 
        this.provinces = data;
      },
      err => console.error(err)
    );
    this.districts = [];
    this.provinceId = '';
    this.districtId = '';
  }

  onSelectPronvice() {
    this.ubigeoService.getDistrictsByProvince(this.provinceId).subscribe(
      data => { this.districts = data },
      err => console.error(err)
    );
    this.districtId = '';
  }

  loadData() {
    this.patientService.getAllPatients().subscribe(
      (data) => { this.patientList = data },
      (err) => console.error(err)
    );
  }

  loadDeparments() {
    this.ubigeoService.getDepartments().subscribe(
      (data) => { this.departments = data },
      (err) => console.error(err)
    );
  }

}