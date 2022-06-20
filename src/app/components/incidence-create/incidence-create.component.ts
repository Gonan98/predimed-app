import { Component, OnInit } from '@angular/core';
import { Incidence, IncidencePostModel } from 'src/app/models/Incidence';
import { IncidenceService } from 'src/app/services/incidence.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { EstableishmentService } from 'src/app/services/establishment.service';

//small change

@Component({
  selector: 'app-incidence-create',
  templateUrl: './incidence-create.component.html',
  styleUrls: ['./incidence-create.component.css'],
})
export class IncidenceCreateComponent implements OnInit {
  public formCreateIncidence!: FormGroup;
  establishmentId?: string;
  establishmentName?: string;
  topic?: string;
  description?: string;
  status?: string;
  phone?: string;
  priority?: string;
  incidenceType?: string;
  userId?: string;
  medicName?: string;
  docMedic?: string;
  medicData: any;

  constructor(
    private incidenceService: IncidenceService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private establishmentService: EstableishmentService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((data) => {
      console.log(data);
      this.userId = data['id'];
      this.medicName = data['firstName'] + ' ' + data['lastName'];
      this.establishmentId = data['establishmentCode'];
      this.medicData = data['documentMedic'];
      this.establishmentService.getCurrentEstablishment().subscribe((data) => {
        this.establishmentName = data['name'].substring(
          data['name'].indexOf('-') + 1
        );
        console.log(this.establishmentName?.toString());
      });
    });

    this.formCreateIncidence = this.formBuilder.group({
      userId: [{ value: '', disabled: true }, [Validators.required]],
      medicName: [{ value: '', disabled: true }, [Validators.required]],
      establishmentId: [{ value: '', disabled: true }, [Validators.required]],
      establishmentName: [{ value: '', disabled: true }, [Validators.required]],
      phone: ['', [Validators.required]],
      topic: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      status: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      incidenceType: ['', [Validators.required]],
    });
  }

  regresar() {
    this.router.navigate(['/incidenciaAdmin']);
  }

  createIncidence() {
    if (
      this.description == null ||
      this.description == undefined ||
      (this.description == '' && this.establishmentId == null) ||
      this.establishmentId == undefined ||
      (this.establishmentId == '' && this.phone == null) ||
      this.phone == undefined ||
      (this.phone == '' && this.topic == null) ||
      this.topic == undefined ||
      this.topic == ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Debe completar todos los campos requeridos!',
      });
    } else {
      console.log(this.status, this.priority, this.incidenceType);
      this.http
        .post<IncidencePostModel>(`${environment.API_URL}/incidences`, {
          establishmentId: this.establishmentId,
          subject: this.topic,
          description: this.description,
          status: this.status,
          phone: this.phone,
          priority: this.priority,
          incidenceType: this.incidenceType,
          userId: this.userId,
        })
        .subscribe((data) => {
          console.log(data);
        });
      this.router.navigate(['/incidenciaAdmin']);
    }
  }

  ra() {
    console.log('raaaa');
  }
  makeActive() {}
}
