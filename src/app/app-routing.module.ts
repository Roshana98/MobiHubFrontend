import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';
import { LogincustomerComponent } from './logincustomer/logincustomer.component';
import { SignupcustomerComponent } from './signupcustomer/signupcustomer.component';
import { SignupsellerComponent } from './signupseller/signupseller.component';
import { FeaturesComponent } from './features/features.component';
import { AboutComponent } from './about/about.component';
import { PhoneDetailsComponent } from './phone-details/phone-details.component';
import { MobileCreateComponent } from './mobile-create/mobile-create.component';
import { MobileEditComponent } from './mobile-edit/mobile-edit.component';
import { MobileListComponent } from './mobile-list/mobile-list.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { WhyMobihubComponent } from './why-mobihub/why-mobihub.component';

const routes: Routes = [
  {
    path : '', 
    redirectTo: '/home',
    pathMatch: "full"
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component :AboutComponent
  },
  { 
    path : 'store/:customer_id', 
    component : StoreComponent
  },
  {
    path: 'home/:phone_name',
    component: PhoneDetailsComponent
  },
  {
    path: 'store/:phone_name',
    component: PhoneDetailsComponent
  },
  {
    path: 'features',
    component : FeaturesComponent
  },

  { 
    path : 'signIn', 
    component : LogincustomerComponent
  },

  { 
    path : 'customer_signUp', 
    component : SignupcustomerComponent
  },

  { 
    path : 'seller_signUp', 
    component : SignupsellerComponent
  },

  { path: 'create-mobile', 
    component: MobileCreateComponent 
  },

  { 
    path: 'edit-mobile/:id', component: MobileEditComponent 
  },
  
  { 
    path: 'mobile-list/:seller_id', component: MobileListComponent 
  },
  
  { 
    path: 't&c', 
    component: TermsConditionsComponent 
  },
  
  { 
    path: 'policy', 
    component: PrivacyPolicyComponent 
  },

  { 
    path: 'why', 
    component: WhyMobihubComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
