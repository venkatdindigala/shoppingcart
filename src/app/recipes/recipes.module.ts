import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from '../recipes/recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { recipeReducer } from '../recipes/store/recipe.reducers';
import { RecipeEffects} from '../recipes/store/recipe.effects';

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        StoreModule.forFeature('recipes',recipeReducer),
        EffectsModule.forFeature([RecipeEffects])
    ]

})
export class RecipesModule{

}