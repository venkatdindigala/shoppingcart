import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';


import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService{
   constructor(private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
    ){

   }

   storeRecipes(){
       const token = this.authService.getToken();
       const headers = new Headers({'Content-Type':'application/json'});
       return this.http.put('https://myshoppingcart-eaa2d.firebaseio.com/recipes.json?auth='+token,
       this.recipeService.getRecipes());
   }

   getRecipes(){
       const token = this.authService.getToken();
       //console.log(token);
    return this.http.get('https://myshoppingcart-eaa2d.firebaseio.com/recipes.json?auth=' + token)
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