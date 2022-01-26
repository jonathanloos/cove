import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleToCallPage } from './people-to-call.page';

const routes: Routes = [
  {
    path: '',
    component: PeopleToCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleToCallPageRoutingModule {}
