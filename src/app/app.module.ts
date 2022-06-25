import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicComponent } from './components/medic/medic.component';
import { LoginComponent } from './components/login/login.component';
import { DiagnosticComponent } from './components/diagnostic/diagnostic.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReferredComponent } from './components/referred/referred.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { AntecedentComponent } from './components/antecedent/antecedent.component';
import { ReferralsComponent } from './components/referrals/referrals.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'  
import { MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReferredDetailsComponent } from './components/referred-details/referred-details.component';
import { IncidenceAdminComponent } from './components/incidence-admin/incidence-admin.component';
import { IncidenceDetailsComponent } from './components/incidence-details/incidence-details.component';
import { IncidenceCreateComponent } from './components/incidence-create/incidence-create.component';
import { DialogProcessComponent} from './components/dialog-process/dialog-process.component';
import { AnalyzeComponent } from './components/analyze/analyze.component';
import { DialogNoReferenceComponent } from './components/dialog-no-reference/dialog-no-reference.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatButtonModule } from '@angular/material/button';
import { DialogExamComponent } from './components/dialog-exam/dialog-exam.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { HistoryComponent } from './components/history/history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { PatientsComponent } from './components/patients/patients.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MedicProfileComponent } from './components/medic-profile/medic-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicComponent,
    LoginComponent,
    DiagnosticComponent,
    NavbarComponent,
    ReferredComponent,
    AntecedentComponent,
    ReferralsComponent,
    ReferredDetailsComponent,
    IncidenceAdminComponent,
    IncidenceDetailsComponent,
    IncidenceCreateComponent,
    DialogProcessComponent,
    AnalyzeComponent,
    DialogNoReferenceComponent,
    PatientInfoComponent,
    DialogExamComponent,
    AddPatientComponent,
    HistoryComponent,
    PatientDetailComponent,
    PatientsComponent,
    MedicProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    NgCircleProgressModule.forRoot(),
    ReactiveFormsModule,
    ErrorTailorModule.forRoot(
        {
          errors:{
            useValue: {
              required: 'El campo es requerido',
              minLength:({requiredLength,actualLength})=>
              `Esperando ${requiredLength} pero se obtuvo ${actualLength}`
            },
          }
        }
        
    )
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  entryComponents: [DialogNoReferenceComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
