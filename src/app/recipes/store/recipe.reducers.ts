import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: [
        new Recipe(
            'Google Recipe',
            'Recipe from Google',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Bun', 2),
            ]),
        new Recipe(
            'Microsoft Recipe',
            'Recipe from Microsoft',
            'https://c.pxhere.com/photos/26/d0/zucchini_wraps_zucchini_slices_food_fish_fillet_recipe_fish_recipes_food_photography_plated_food_delicious_food-1376204.jpg!d',
            [
                new Ingredient('French Fries', 15),
                new Ingredient('Potato', 2),
            ]),
        new Recipe(
            'Apple Recipe',
            'Recipe from Apple',
            'http://www.ndtv.com/cooks/images/zucchini%20roll-330.jpg',
            [
                new Ingredient('Spinach', 13),
                new Ingredient('Chillis', 5),
            ])
    ]
}
export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {

    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case (RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            }
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1)
            return {
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;
    }
    //return state;
}