import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router, 
    private auth: AuthService
    ){}

  async canActivate( next: ActivatedRouteSnapshot ) {
    const isSignedIn = await this.auth.isSignedIn();

    console.log("Is signed in: ", isSignedIn)

    if(!isSignedIn){
      this.router.navigateByUrl('/welcome');
    }

    return isSignedIn;
  }
}
