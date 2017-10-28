import {Component} from '@angular/core'
import { Response } from '@angular/http';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent{
 //@Output()  headerMenuClick = new EventEmitter<string>();
    constructor( private dataStorageService: DataStorageService){

    }
    // onRecipeClick(){
    //   this.headerMenuClick.emit("recipe");
    // }

    // onShoppingListClick(){
    //     this.headerMenuClick.emit("shoppinglist");
    // }

    onSaveData(){
      this.dataStorageService.storeRecipes().
        subscribe((response: Response) =>{
          console.log(response);
        })
    }

    onFetchData(){
      this.dataStorageService.getRecipes();
    }
}