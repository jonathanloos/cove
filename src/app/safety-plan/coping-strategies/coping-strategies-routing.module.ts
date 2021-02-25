import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopingStrategiesPage } from './coping-strategies.page';

const routes: Routes = [
  {
    path: '',
    component: CopingStrategiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopingStrategiesPageRoutingModule {}
