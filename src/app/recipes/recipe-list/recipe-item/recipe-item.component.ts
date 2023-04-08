import { Component, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';

/* Component Decorator */
@Component({
   selector: 'app-recipe-item',
   templateUrl: './recipe-item.component.html',
   styleUrls: ['./recipe-item.component.css']
})

export class RecipeItemComponent {
   
   /* DATA MEMBER (import): individualRecipe */
   @Input() individualRecipe!: Recipe;

   /* DATA MEMBER (import): recipeIndex
      -- recipe id/index from RecipeList component */
   @Input() recipeIndex!: number;

} // end RecipeItemComponent
