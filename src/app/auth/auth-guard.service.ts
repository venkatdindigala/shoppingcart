import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{
   constructor(private authService: AuthService){

   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
     return this.authService.isAuthenticated();
   }
}