import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';
import { LogincustomerComponent } from './logincustomer/logincustomer.component';
import { SignupcustomerComponent } from './signupcustomer/signupcustomer.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './services/authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SignupsellerComponent } from './signupseller/signupseller.component';
import { FeaturesComponent } from './features/features.component';
import { AboutComponent } from './about/about.component';
import { PhoneDetailsComponent } from './phone-details/phone-details.component';
import { MobileListComponent } from './mobile-list/mobile-list.component';
import { MobileCreateComponent } from './mobile-create/mobile-create.component';
import { MobileEditComponent } from './mobile-edit/mobile-edit.component';
import { SellerApiService } from './services/seller-api.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule, MatInputModule,
  MatAutocompleteModule, MatChipsModule,
  MatFormFieldModule

} from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { WhyMobihubComponent } from './why-mobihub/why-mobihub.component';
import { NgxSpinnerModule } from 'ngx-spinner';

const matireal=[
  MatIconModule, MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreComponent,
    FeaturesComponent,
    LogincustomerComponent,
    SignupcustomerComponent,
    SignupsellerComponent,
    FeaturesComponent,
    AboutComponent,
    PhoneDetailsComponent,
    MobileListComponent,
    MobileCreateComponent,
    MobileEditComponent,
    FooterComponent,
    HeaderComponent,
    NewsletterComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    WhyMobihubComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleChartsModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule, MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    NgxSpinnerModule
    
  ],
  providers: [AuthenticationService, AuthGuard, SellerApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
