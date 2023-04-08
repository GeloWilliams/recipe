import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

/* Component Decorator */
@Component({
   selector: 'app-recipe-list',
   templateUrl: './recipe-list.component.html',
   styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
   /* Data member: recipes */
   public recipes!: Recipe[];

   /* inject RecipeService upon component instantiation */
   constructor(private recipeService: RecipeService) {}

   // sync recipes with 'recipes' data member
   ngOnInit(): void {

      // use dummy data
      // this.recipes = this.recipeService.getRecipes();

      // listen for any changes to the recipe list
      this.recipeService.recipesChanged$.subscribe(
         (recipes: Recipe[]) => {
            this.recipes = recipes;
         }
      );
   } // end OnInit

} // end RecipeListComponent
