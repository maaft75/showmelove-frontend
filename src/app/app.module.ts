//Router
import { AppRoutes } from './approuting/approuting.module';
import { environment } from 'src/environments/environment';

//Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule} from '@angular/fire';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireStorageModule } from '@angular/fire/storage';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PaymentresponseComponent } from './components/paymentresponse/paymentresponse.component';
import { CreatefundraiserComponent } from './components/createfundraiser/createfundraiser.component';
import { FundraiserComponent } from './components/fundraiser/fundraiser.component';
import { InitiatepaymentComponent } from './components/initiatepayment/initiatepayment.component';

//Services
import { HttperrorinterceptorService } from './Services/httperrorinterceptor/httperrorinterceptor.service'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    PaymentresponseComponent,
    CreatefundraiserComponent,
    FundraiserComponent,
    InitiatepaymentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    RouterModule.forRoot(AppRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttperrorinterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
