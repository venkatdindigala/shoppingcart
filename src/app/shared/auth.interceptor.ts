import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import{ AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // constructor(private authService: AuthService){

    // }
    constructor(private store:Store<fromApp.AppState>){}
  intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
       console.log('Intercepted!', req);
       //const copiedRequest= req.clone({headers: req.headers.set('','')})
       return this.store.select('auth')
        .take(1)
        .switchMap(
          (authState : fromAuth.State) => {
            const copiedRequest = req.clone({params:req.params.set('auth',authState.token)})
            return next.handle(copiedRequest);
          });
  }
}