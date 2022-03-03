import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicComponent } from './components/medic/medic.component';
import { LoginComponent } from './components/login/login.component';
import { DiagnosticComponent } from './components/diagnostic/diagnostic.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReferredComponent } from './components/referred/referred.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    MedicComponent,
    LoginComponent,
    DiagnosticComponent,
    NavbarComponent,
    ReferredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
