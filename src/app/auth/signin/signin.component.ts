import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

//import { AuthService } from '../auth.service';
import * as fromApp from '../store/auth.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  //constructor(private authService: AuthService) { }
  constructor(private store:Store<fromApp.State>){

  }

  ngOnInit() {

  }

  onSignIn(signinForm: NgForm){
    const email= signinForm.value.email;
    const password = signinForm.value.password;
    //this.authService.signinUser(email,password);
    this.store.dispatch(new AuthActions.TrySignIn({username:email, password:password}));
  }
}
