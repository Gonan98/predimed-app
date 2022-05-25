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
import { ReferralsComponent } from './components/referrals/referrals.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  declarations: [
    AppComponent,
    MedicComponent,
    LoginComponent,
    DiagnosticComponent,
    NavbarComponent,
    ReferredComponent,
    ReferralsComponent,
    ReferredDetailsComponent,
    IncidenceAdminComponent,
    IncidenceDetailsComponent,
    IncidenceCreateComponent,
    DialogProcessComponent,
    AnalyzeComponent,
    DialogNoReferenceComponent,
    PatientInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
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
