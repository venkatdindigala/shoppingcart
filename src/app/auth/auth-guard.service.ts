import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

//import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{
   //constructor(private authService: AuthService){}
   constructor(private store: Store<fromApp.AppState>){

   }

   canActivate(){
     return this.store.select('auth')
     .take(1)
      .map((authState:fromAuth.State) =>
       {
          return authState.authenticated;
       });
   }

  //  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  //   return this.authService.isAuthenticated();
  // }
}