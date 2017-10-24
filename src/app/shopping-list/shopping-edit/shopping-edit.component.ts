import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputElement : ElementRef;
  @ViewChild('amountInput') amountInputElement : ElementRef;
  ingredient: Ingredient;

  constructor(private shoppingListService :  ShoppingListService) {

  }

  ngOnInit() {
  }

  addIngredient(){
    const newIngredient = new Ingredient(this.nameInputElement.nativeElement.value,this.amountInputElement.nativeElement.value);
    this.shoppingListService.addIngredient(newIngredient);
    //this.shoppingListService.ingredientAdded.emit();
  }

}
