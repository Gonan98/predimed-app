import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { InfoMessageComponent } from './components/info-message/info-message.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicComponent,
    LoginComponent,
    DiagnosticComponent,
    NavbarComponent,
    ReferredComponent,
    AntecedentComponent,
    InfoMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
