import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppTemplatePage } from './app-template.page';

const routes: Routes = [
  {
    path: '',
    component: AppTemplatePage,
    children: [
      { path: 'safety-plan', loadChildren: '../safety-plan/safety-plan.module#SafetyPlanPageModule' },
      { path: '', redirectTo: 'app/safety-plan/coping-strategies', pathMatch:'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppTemplatePageRoutingModule {}
