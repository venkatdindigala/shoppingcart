import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
//import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  ingredient: Ingredient;
  subscription: Subscription;
  editMode: boolean = false;
  //editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService :  ShoppingListService,
              private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {

    this.subscription = this.store.select('shoppingList')
    .subscribe(
      data => {
        if(data.editedIngredientIndex>-1){
          this.editedItem= data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
             name: this.editedItem.name,
             amount: this.editedItem.amount
          });
        }
        else{
          this.editMode=false;
        }
      }
    )
    // this.subscription = this.shoppingListService.startEditing.subscribe(
    //   (index:number) =>{
    //     this.editMode = true;
    //     this.editItemIndex = index;
    //     this.editedItem = this.shoppingListService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     });
    //   }
    // )
  }

  addIngredient(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount)
    if(this.editMode){
      //this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}))
    } else {
      //this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();

    //this.shoppingListService.ingredientAdded.emit();
  }
  ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
  onClear(){
    this.slForm.reset();
    this.editMode= false;
  }

  onDelete(){
    //this.shoppingListService.deleteIgredient(this.editItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

}
