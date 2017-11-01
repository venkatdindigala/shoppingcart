import { Component, OnInit } from '@angular/core'
//import { Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service'
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit{
  authState: Observable<fromAuth.State>;
 //@Output()  headerMenuClick = new EventEmitter<string>();
    constructor( private dataStorageService: DataStorageService,
                 public authService : AuthService,
                private store: Store<fromApp.AppState>){

    }

    ngOnInit(){
        this.authState = this.store.select('auth');
    }
    // onRecipeClick(){
    //   this.headerMenuClick.emit("recipe");
    // }

    // onShoppingListClick(){
    //     this.headerMenuClick.emit("shoppinglist");
    // }

    onSaveData(){
      this.dataStorageService.storeRecipes().
        subscribe((response) =>{
          console.log(response);
        })
    }

    onFetchData(){
      this.dataStorageService.getRecipes();
    }

    onLogout(){
        //this.authService.logout();
        this.store.dispatch(new AuthActions.LogOut());
    }
}