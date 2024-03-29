import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

/* Component Decorator */
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
   /* DATA MEMBER: receivedRecipe */
   public receivedRecipe!: Recipe;
   private recipeId!: number;

   // inject ShoppingListService, Router, ActivatedRoute, RecipeService upon instantiation
   constructor(private slService: ShoppingListService, 
         private router: Router, 
         private route: ActivatedRoute, 
         private recipeService: RecipeService
   ) {} // end constructor

   ngOnInit(): void {
      this.route.params.subscribe(
         (params: Params) => {
            this.receivedRecipe = this.recipeService.getRecipeById(+params['id']);
            this.recipeId = +params['id'];
         }
      );
   } // end OnInit

   /* Operation: onDeleteRecipe
      -- deletes a recipe
      -- navigates to previous recipe in the list if more than one recipe exist
      -- navigates to previous route if one recipe exists */
   public onDeleteRecipe(): void {
      this.recipeService.deleteRecipe(this.recipeId);
      if (this.recipeId !== 0) {
         const nextUp = this.recipeId - 1;
         const path: string = "../" + String(nextUp); //go back before appending
         this.router.navigate([path], {relativeTo: this.route});
      } else {
         this.router.navigate(['../'], {relativeTo: this.route});
      }
   } // end deleteRecipe
   
   /* Operation: addToShoppingList 
      -- adds ingredients from receivedRecipe to ShoppingListService
      -- navigates to the ShoppingList landing */
   public addToShoppingList() {
      for (let ingredient of this.receivedRecipe.ingredients) {
        this.slService.addIngredient(ingredient);
        this.router.navigate(['/shopping-list']);
      } // end for
   } // end addToShoppingList
   
} // end RecipeDetailComponent
