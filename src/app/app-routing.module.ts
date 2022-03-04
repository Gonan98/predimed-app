import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DiagnosticComponent } from './components/diagnostic/diagnostic.component';
import { LoginComponent } from './components/login/login.component';
import { MedicComponent } from './components/medic/medic.component';
import { ReferredComponent } from './components/referred/referred.component';

const routes: Routes = [
  { path: '', redirectTo: 'diagnostico', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'diagnostico', component: DiagnosticComponent, canActivate: [AuthGuard] },
  { path: 'referidos', component: ReferredComponent, canActivate: [AuthGuard] },
  { path: 'medicos', component: MedicComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
