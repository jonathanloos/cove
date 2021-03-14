import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'safety-plan',
        children: [
          {
            path: '',
            loadChildren: '../safety-plan/safety-plan.module#SafetyPlanPageModule'
          },
          {
            path: 'warning-signs',
            loadChildren: '../safety-plan/warning-signs/warning-signs.module#WarningSignsPageModule'
          },
          {
            path: 'coping-strategies',
            loadChildren: '../safety-plan/coping-strategies/coping-strategies.module#CopingStrategiesPageModule'
          },
          {
            path: 'places-to-go',
            loadChildren: '../safety-plan/places-to-go/places-to-go.module#PlacesToGoPageModule'
          },
          {
            path: 'people-to-call',
            loadChildren: '../safety-plan/people-to-call/people-to-call.module#PeopleToCallPageModule'
          },
          {
            path: 'resources',
            loadChildren: '../safety-plan/resources/resources.module#ResourcesPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/safety-plan',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/safety-plan',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
