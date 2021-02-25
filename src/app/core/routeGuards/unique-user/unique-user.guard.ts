import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueUserGuard implements CanActivate {
  constructor(
    private router: Router, 
    private auth: AuthService
    ){}

  async canActivate( next: ActivatedRouteSnapshot ) {
    const isSignedIn = await this.auth.isSignedIn();

    if(isSignedIn){
      console.log("Redirect to safety plan")
      this.router.navigateByUrl('/tabs/safety-plan');
    }

    return !isSignedIn;
  }
  
}
