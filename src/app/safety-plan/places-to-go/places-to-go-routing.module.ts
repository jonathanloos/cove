import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesToGoPage } from './places-to-go.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesToGoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesToGoPageRoutingModule {}
