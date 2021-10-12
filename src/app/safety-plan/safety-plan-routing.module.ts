import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

import { SafetyPlanPage } from './safety-plan.page';

const routes: Routes = [
  {
    path: '',
    component: SafetyPlanPage,
    children: [
      { path: 'warning-signs', loadChildren: '../safety-plan/warning-signs/warning-signs.module#WarningSignsPageModule' },
      { path: 'coping-strategies', loadChildren: '../safety-plan/coping-strategies/coping-strategies.module#CopingStrategiesPageModule' },
      { path: 'people-to-call', loadChildren: '../safety-plan/people-to-call/people-to-call.module#PeopleToCallPageModule' },
      { path: 'places-to-go', loadChildren: '../safety-plan/places-to-go/places-to-go.module#PlacesToGoPageModule' },
      { path: 'resources', loadChildren: '../help-resources/resources.module#ResourcesPageModule' },
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
      { path: 'menu', component: MenuComponent },
      { path: '', redirectTo: 'app/safety-plan/coping-strategies', pathMatch: 'full'}
    ]
  },
  { path: '', redirectTo: 'app/safety-plan/coping-strategies'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafetyPlanPageRoutingModule {}
