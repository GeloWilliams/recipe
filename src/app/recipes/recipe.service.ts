import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

// Optional decorator, for convention's sake
@Injectable() 

/**  -----------------------------------------------------------------
Recipe Service
-- houses recipe data
-- maintains centralised operations related to recipe interactions */
export class RecipeService {
   /* Data member: recipesChanged Subject
      - a copy of the entire recipes array will emit to all observers */   
   public recipesChanged$ = new Subject<Recipe[]>();

   /* Data member: Recipes */
   // Dummy Data:
   private recipes: Recipe[] = [
      // new keyword instantiates a new Recipe
      new Recipe('Salmon', 'Great meal by the sea, from the sea.', 
      'https://www.wholesomeyum.com/wp-content/uploads/2021/06/wholesomeyum-Pan-Seared-Salmon-Recipe-13.jpg',
      [
         new Ingredient('yeoneo', 1),
         new Ingredient('lemon', 2)
      ]),
      new Recipe('Tuna', 'Very nice.', 
      'https://www.simplyrecipes.com/thmb/h3vmpNn2nfPoejM2eu7GlF4nmhw=/3900x2600/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Seared-Ahi-Tuna-LEAD-2-7d0de98ff4b94257b2a665357a2940df.jpg',
      [
         new Ingredient('chamchi', 1),
         new Ingredient('onion', 4)
      ]),
      new Recipe('Octopus', 'This is simply a test.', 
      'https://lh3.googleusercontent.com/OELIo63SQmSms2OMQvYmz2lJhWDpaWqbsZ1OiZ-KXJusr5P0I-RmvtSP7-2fNz51oNEGilr5MX9jRllk71abyw=w1280-h960-c-rj-v1-e365',
      [
         new Ingredient('muneo', 1),
         new Ingredient('lettuce', 3)
      ])
    ];

   // private recipes: Recipe[] = [];

   /* Operation: setRecipes
      -- recipes setter method
      -- overwrites all current items for the recipes property
   */
   public setRecipes(recipes: Recipe[]): void {
      this.recipes = recipes;
      this.recipesChanged$.next(this.recipes.slice());
   }

   /* Operation: getRecipes
      -- recipes getter method
      -- protects 'recipes' by returning an exact copy via slice()
      @return: returns a copy of the 'recipes' data member */
   public getRecipes(): Recipe[] {
      return this.recipes.slice();
   } 

   /* Operation: getRecipesById
   -- individual recipe getter method
   @return: a specific recipe data member */
   public getRecipeById(id: number): Recipe {
      return this.recipes[id];
   } 

   /* Operation: addRecipe */
   public addRecipe(newRecipe: Recipe): void {
      this.recipes.push(newRecipe);
      this.recipesChanged$.next(this.recipes.slice());
   }

   /* Operation: updateRecipe */
   public updateRecipe(index: number, newRecipe: Recipe): void {
      this.recipes[index] = newRecipe;
      this.recipesChanged$.next(this.recipes.slice());
   }

   /* Operation: deleteRecipe */
   public deleteRecipe(index: number): void {
      this.recipes.splice(index, 1);
      this.recipesChanged$.next(this.recipes.slice());
   }

}