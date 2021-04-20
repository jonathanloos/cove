import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmptyStateModalPage } from './empty-state-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EmptyStateModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmptyStateModalPageRoutingModule {}
