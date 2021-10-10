import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/routeGuards/auth/auth.guard';
import { UniqueUserGuard } from './core/routeGuards/unique-user/unique-user.guard';

const routes: Routes = [
  { path: 'welcome', loadChildren: './login-flow/welcome/welcome.module#WelcomePageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'register', loadChildren: './login-flow/register/register.module#RegisterPageModule', canActivate: [UniqueUserGuard] },
  { path: 'account-verification', loadChildren: './login-flow/account-verification/account-verification.module#AccountVerificationPageModule', canActivate: [UniqueUserGuard] },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
