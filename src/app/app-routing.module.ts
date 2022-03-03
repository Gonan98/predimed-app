import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagnosticComponent } from './components/diagnostic/diagnostic.component';
import { LoginComponent } from './components/login/login.component';
import { ReferredComponent } from './components/referred/referred.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'diagnostico', component: DiagnosticComponent },
  { path: 'referidos', component: ReferredComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
