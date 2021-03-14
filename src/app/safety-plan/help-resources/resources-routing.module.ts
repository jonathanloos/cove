import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourcesPage } from './resources.page';

const routes: Routes = [
  {
    path: '',
    component: ResourcesPage
  },
  {
    path: 'resource-modal',
    loadChildren: () => import('./resource-modal/resource-modal.module').then( m => m.ResourceModalPageModule)
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ResourcesPageRoutingModule {}
