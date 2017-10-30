import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';


import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService{
   constructor(private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
    ){

   }

   storeRecipes(){
       //const token = this.authService.getToken();
       const headers = new HttpHeaders({'Content-Type':'application/json'});
    //    return this.httpClient.put('https://myshoppingcart-eaa2d.firebaseio.com/recipes.json?',
    //    this.recipeService.getRecipes(),
    //    {
    //        observe: 'body',
    //        params: new HttpParams().set('auth',token)
    //     });

    //   const request = new HttpRequest(
    //       'PUT',
    //       'https://myshoppingcart-eaa2d.firebaseio.com/recipes.json?',
    //       this.recipeService.getRecipes(),
    //       {
    //         reportProgress: true,
    //         params: new HttpParams().set('auth',token)
    //       }
    //   )

      const request = new HttpRequest(
          'PUT',
          'https://myshoppingcart-eaa2d.firebaseio.com/recipes.json',
          this.recipeService.getRecipes(),
          {
            reportProgress: true
          }
      )

      return this.httpClient.request(request);
   }

   getRecipes(){
       //const token = this.authService.getToken();
       //console.log(token);
    return this.httpClient.get<Recipe[]>('https://myshoppingcart-eaa2d.firebaseio.com/recipes.json',
    {
        observe:'body',
        responseType: 'json'
    })
    .map(
        (recipes) => {
        //const recipes: Recipe[] = response.json();
        for(let recipe of recipes){
            if(!recipe['ingredients']){
                //console.log(recipe);
                recipe['ingredients'] = [];
            }
        }
        return recipes;
    }).subscribe( (recipes: Recipe[]) =>{
        this.recipeService.setRecipes(recipes);
     })

   }
}