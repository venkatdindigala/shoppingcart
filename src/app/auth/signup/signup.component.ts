import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromApp from '../store/auth.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //constructor(private authService: AuthService) { }
  constructor(private store: Store<fromApp.State>) { }

  ngOnInit() {
  }

  onSignUp(signupform: NgForm){
    const email= signupform.value.email;
    const password = signupform.value.password;
    //this.authService.signupUser(email,password);
    this.store.dispatch(new AuthActions.TrySignUp({username:email, password:password}));
  }

}
