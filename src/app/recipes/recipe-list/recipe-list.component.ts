import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //recipes: Recipe[];
  recipeState: Observable<fromRecipe.State>;
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store : Store<fromRecipe.FeatureState>) {

  }

  ngOnInit() {
    // this.recipeService.recipeChanged.subscribe(
    //   (recipes: Recipe[]) =>{
    //     this.recipes = recipes;
    //   }
    // );
    // this.recipes = this.recipeService.getRecipes();

    // this.subscription = this.recipeService.recipeChanged
    // .subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );
    // this.recipes = this.recipeService.getRecipes();

    this.recipeState = this.store.select('recipes');
    //console.log(this.recipeState);
  }

  onNewRecipe(){
   this.router.navigate(['new'],{relativeTo:this.route})
    }

  ngOnDestroy(){
   //this.recipeService.recipeChanged.unsubscribe();
   //this.subscription.unsubscribe();
  }
}
