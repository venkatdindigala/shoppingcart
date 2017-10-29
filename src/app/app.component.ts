import { Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  //recipeActive :boolean = true;
  //shoppingListActive :boolean = false;

  constructor(){

  }

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBOjqF4N0syfCmReIkingdXNfNTw-8TRqg",
      authDomain: "myshoppingcart-eaa2d.firebaseapp.com"
    });
  }

  // onMenuClick(name:string){
  //   if(name=="recipe")
  //   {
  //     this.recipeActive = true;
  //     this.shoppingListActive = false;
  //   }
  //   else if(name=="shoppinglist")
  //   {
  //     this.recipeActive = false;
  //     this.shoppingListActive = true;
  //   }
  // }


}
