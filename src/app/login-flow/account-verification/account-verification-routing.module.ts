import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountVerificationPage } from './account-verification.page';

const routes: Routes = [
  {
    path: '',
    component: AccountVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountVerificationPageRoutingModule {}
