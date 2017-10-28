import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx'

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class DataStorageService{
   constructor(private http: Http, private recipeService: RecipeService){

   }

   storeRecipes(){
       const headers = new Headers({'Content-Type':'application/json'});
       return this.http.put('https://myshoppingcart-eaa2d.firebaseio.com/recipes.json',
       this.recipeService.getRecipes());
   }

   getRecipes(){
    return this.http.get('https://myshoppingcart-eaa2d.firebaseio.com/recipes.json')
    .map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for(let recipe of recipes){
            if(!recipe['ingredients']){
                console.log(recipe);
                recipe['ingredients'] = [];
            }
        }
        return recipes;
    })
    .subscribe( (recipes: Recipe[]) =>{
        this.recipeService.setRecipes(recipes);
     })

   }
}