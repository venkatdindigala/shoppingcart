import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>('https://myshoppingcart-eaa2d.firebaseio.com/recipes.json',
                {
                    observe: 'body',
                    responseType: 'json'
                })
                .map(
                (recipes) => {
                    //const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return {
                        type: RecipeActions.SET_RECIPES,
                        payload: recipes
                    };
                });

        })

    @Effect({dispatch:false})
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state]) => {
            const request = new HttpRequest(
                'PUT',
                'https://myshoppingcart-eaa2d.firebaseio.com/recipes.json',
                state.recipes, { reportProgress: true });
            return this.httpClient.request(request);
        })

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.FeatureState>) {

    }
}