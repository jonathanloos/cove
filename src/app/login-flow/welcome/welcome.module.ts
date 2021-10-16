import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { RouterModule } from '@angular/router';
import { EntryComponent } from '../entry/entry.component';
import { LoginComponent } from '../login/login.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { RegistrationComponent } from '../registration/registration.component';
import { VerifyComponent } from '../verify/verify.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    WelcomePageRoutingModule
  ],
  declarations: [
      EntryComponent,
      LoginComponent,
      ResetPasswordComponent,
      RegistrationComponent,
      VerifyComponent,
      WelcomePage
  ]
})
export class WelcomePageModule {}
