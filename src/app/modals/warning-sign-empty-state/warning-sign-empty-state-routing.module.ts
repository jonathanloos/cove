import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarningSignEmptyStatePage } from './warning-sign-empty-state.page';

const routes: Routes = [
  {
    path: '',
    component: WarningSignEmptyStatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarningSignEmptyStatePageRoutingModule {}
