import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { User } from 'src/app/auth/user.model';


@Component({
   selector: 'app-recipe-list',
   templateUrl: './recipe-list.component.html',
   styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
   /* Data member: recipes */
   recipes!: Recipe[];

   /* DATA MEMBER: validUser$ BehaviorSubject
      -- determines whether a valid user is present */
   private validUser$ = new BehaviorSubject<User | null>(null);

   /* DATA MEMBER: fetchSub
      -- watches for recipeList changes */
   private fetchSub!: Subscription;

   /* inject recipeService upon component instantiation */
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
   } // end ngOnInit

} // end RecipeListComponent
