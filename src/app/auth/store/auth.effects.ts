import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';


import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.action$
        .ofType(AuthActions.TRY_SIGNUP)
        .map((action: AuthActions.TrySignUp) => {
            return action.payload;
        })
        .switchMap((authData: { username: string, password: string }) => {
            return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            return [{
                type: AuthActions.SIGNUP
            },
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            }];
        });

    @Effect()
    authSignIn = this.action$
        .ofType(AuthActions.TRY_SIGNIN)
        .map((action: AuthActions.TrySignIn) => {
            return action.payload;
        })
        .switchMap((authData: { username: string, password: string }) => {
            return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [{
                type: AuthActions.SIGNIN
            },
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            }];
        });

    @Effect({dispatch: false})
    authLogout = this.action$
    .ofType(AuthActions.LOGOUT)
    .do(()=>{
        this.router.navigate(['/']);
    })

    constructor(private action$: Actions, private router: Router) {

    }
}