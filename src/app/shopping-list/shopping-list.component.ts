import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
 //ingredients : Ingredient[];
 shoppingListState: Observable<{ingredients: Ingredient[]}>;
 //subscription : Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    //this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscription = this.shoppingListService.ingredientChanged.subscribe(
    //   (ingredients : Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // )
  }
  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  onEditItem(id: number){
    //this.shoppingListService.startEditing.next(id);
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
  }
}
