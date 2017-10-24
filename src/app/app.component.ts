import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  //recipeActive :boolean = true;
  //shoppingListActive :boolean = false;

  constructor(){

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
