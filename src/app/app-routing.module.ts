import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AntecedentComponent } from './components/antecedent/antecedent.component';
import { DiagnosticComponent } from './components/diagnostic/diagnostic.component';
import { AnalyzeComponent } from './components/analyze/analyze.component';
import { LoginComponent } from './components/login/login.component';
import { MedicComponent } from './components/medic/medic.component';
import { ReferredComponent } from './components/referred/referred.component';
import {ReferralsComponent} from './components/referrals/referrals.component';
import {ReferredDetailsComponent} from './components/referred-details/referred-details.component';
import {IncidenceAdminComponent} from './components/incidence-admin/incidence-admin.component';
import {IncidenceDetailsComponent} from './components/incidence-details/incidence-details.component';
import {IncidenceCreateComponent} from './components/incidence-create/incidence-create.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';

const routes: Routes = [
  { path: '', redirectTo: 'diagnostico', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'diagnostico', component: DiagnosticComponent, canActivate: [AuthGuard] },
  { path: 'analizar', component: AnalyzeComponent, canActivate: [AuthGuard]},
  { path: 'referencia', component: ReferralsComponent, canActivate: [AuthGuard]},
  { path: 'referidos', component: ReferredComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: MedicComponent, canActivate: [AuthGuard] },
  { path: 'antecedentes', component: AntecedentComponent, canActivate: [AuthGuard]},
  { path: 'detalleReferencia', component: ReferredDetailsComponent, canActivate: [AuthGuard]},
  { path: 'incidenciaAdmin', component: IncidenceAdminComponent, canActivate: [AuthGuard]},
  { path: 'incidenciaDetalle', component: IncidenceDetailsComponent, canActivate: [AuthGuard]},
  { path: 'incidenciaCrear', component: IncidenceCreateComponent, canActivate: [AuthGuard]},
  { path: 'crearPaciente', component: AddPatientComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
