import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
    //recipeSelected = new EventEmitter<Recipe>();
    recipeChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            'Google Recipe',
            'Recipe from Google',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
            new Ingredient('Meat',1),
            new Ingredient('Bun',2),
        ]),
        new Recipe(
            'Microsoft Recipe',
            'Recipe from Microsoft',
            'https://c.pxhere.com/photos/26/d0/zucchini_wraps_zucchini_slices_food_fish_fillet_recipe_fish_recipes_food_photography_plated_food_delicious_food-1376204.jpg!d',
        [
            new Ingredient('French Fries',15),
            new Ingredient('Potato',2),
        ]),
        new Recipe(
            'Apple Recipe',
            'Recipe from Apple',
            'http://www.ndtv.com/cooks/images/zucchini%20roll-330.jpg',
        [
            new Ingredient('Spinach',13),
            new Ingredient('Chillis',5),
        ])
      ];

    constructor(private shoppingListService: ShoppingListService){

    }
      getRecipes()
      {
          return this.recipes.slice();
      }

      getRecipe(id: number){
          return this.recipes.slice()[id];
      }

      addIngedientsToShoppingList(ingredients: Ingredient[]){
       this.shoppingListService.addIngredients(ingredients);
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number,newRecipe:Recipe ){
         this.recipes[index] = newRecipe;
         this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index:number){
         this.recipes.splice(index,1);
         this.recipeChanged.next(this.recipes.slice());
      }
}