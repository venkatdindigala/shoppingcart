import {Component} from '@angular/core'

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent{
 //@Output()  headerMenuClick = new EventEmitter<string>();
    constructor(){

    }
    // onRecipeClick(){
    //   this.headerMenuClick.emit("recipe");
    // }

    // onShoppingListClick(){
    //     this.headerMenuClick.emit("shoppinglist");
    // }
}