import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceModalPage } from './resource-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ResourceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceModalPageRoutingModule {}
