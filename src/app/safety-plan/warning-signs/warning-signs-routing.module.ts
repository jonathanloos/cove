import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarningSignsPage } from './warning-signs.page';

const routes: Routes = [
  {
    path: '',
    component: WarningSignsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarningSignsPageRoutingModule {}
