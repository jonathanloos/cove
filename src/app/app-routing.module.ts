import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/routeGuards/auth/auth.guard';

const routes: Routes = [
  { path: 'welcome', loadChildren: './login-flow/welcome/welcome.module#WelcomePageModule' },
  { path: 'app', loadChildren: './app-template/app-template.module#AppTemplatePageModule', canActivate: [AuthGuard] },
  { path: 'safety-plan', loadChildren: './safety-plan/safety-plan.module#SafetyPlanPageModule', canActivate: [AuthGuard] },
  { path: '', redirectTo: '/app/safety-plan/coping-strategies', pathMatch: 'full' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
