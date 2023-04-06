import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
   selector: 'app-recipe-item',
   templateUrl: './recipe-item.component.html',
   styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
   // Imported single recipe
   @Input() individualRecipe!: Recipe;
   // Imported recipe id/index from RecipeList component
   @Input() recipeIndex!: number;

   ngOnInit(): void {

   }

}
