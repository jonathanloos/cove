import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/routeGuards/auth/auth.guard';
import { UniqueUserGuard } from './core/routeGuards/unique-user/unique-user.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: './login-flow/register/register.module#RegisterPageModule',
    canActivate: [UniqueUserGuard]
  },
  {
    path: 'entry',
    loadChildren: './login-flow/entry/entry.module#EntryPageModule',
    canActivate: [UniqueUserGuard]
  },
  {
    path: 'account-verification',
    loadChildren: './login-flow/account-verification/account-verification.module#AccountVerificationPageModule',
    canActivate: [UniqueUserGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login-flow/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'empty-state-modal',
    loadChildren: () => import('./modals/empty-state-modal/empty-state-modal.module').then( m => m.EmptyStateModalPageModule),
    canActivate: [false]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
