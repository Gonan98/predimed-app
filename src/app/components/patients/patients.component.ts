import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Patient } from 'src/app/models/Patient';
import { Department, District, Province } from 'src/app/models/Ubigeo';
import { PatientService } from 'src/app/services/patient.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  document = '';
  patient: Patient;
  patientList: Patient[];
  currentPatientList: Patient[];
  departments: Department[];
  provinces: Province[];
  districts: District[];
  departmentId: string;
  provinceId: string;
  districtId: string;

  constructor(
    private patientService: PatientService,
    private ubigeoService: UbigeoService,
    private router: Router
  ) { 
    this.patient = new Patient();
    this.patientList = [];
    this.currentPatientList = [];
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
      data => {
        this.patientList = [data]
      },
      err => alert(err.error.message)
    );
  }

  search() {
    const result = this.patientList.filter(p => p.documentNumber.includes(this.document));
    this.currentPatientList = result
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
      (data) => { 
        this.patientList = data 
        this.currentPatientList = data
      },
      (err) => console.error(err)
    );
  }

  loadDeparments() {
    this.ubigeoService.getDepartments().subscribe(
      (data) => { this.departments = data },
      (err) => console.error(err)
    );
  }

  getLocation(districtId: string) {    
    this.ubigeoService.getDistrictById(districtId).subscribe(
      data => {
        this.patientService.patientDTO.location = data.ubigeoPeruDepartment.name + '/' + data.ubigeoPeruProvince.name + '/' + data.name;
      },
      console.error
    );
  }

  goDetail(id: number) {
    this.router.navigate([`/paciente/${id}`]);
  }
  diagnostico(id: number) {
    this.patientService.getPatientById(id).subscribe(
      data => {
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
    this.router.navigate(['/diagnostico']);
  }
}