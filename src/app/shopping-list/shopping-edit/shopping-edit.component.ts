import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


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
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService :  ShoppingListService) {

  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (index:number) =>{
        this.editMode = true;
        this.editItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    )
  }

  addIngredient(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount)
    this.shoppingListService.addIngredient(newIngredient);
    //this.shoppingListService.ingredientAdded.emit();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
