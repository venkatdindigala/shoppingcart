import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService{
    ingredientChanged= new Subject<Ingredient[]>();
    startEditing = new Subject<number>();

    private ingredients : Ingredient[] = [
        new Ingredient('Apples',10),
        new Ingredient('Black Berries',5),
        new Ingredient('Kiwis',8)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }
      getIngredient(index: number){
        return this.ingredients.slice()[index];
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        //this.ingredientChanged.emit(this.ingredients.slice());
        this.ingredientChanged.next(this.ingredients.slice());
     }

     updateIngredient(index:number, newItem:Ingredient){
       this.ingredients[index] = newItem;
       this.ingredientChanged.next(this.ingredients.slice());
     }

     addIngredients(ingredients: Ingredient[]){
       this.ingredients.push(...ingredients);
       //this.ingredientChanged.emit(this.ingredients);
       this.ingredientChanged.next(this.ingredients);
     }

     deleteIgredient(index:number){
      this.ingredients.slice(index,1);
      this.ingredientChanged.next(this.ingredients.slice());
     }
}