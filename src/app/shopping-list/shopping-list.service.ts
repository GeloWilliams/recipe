import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

/* Service Decorator */
@Injectable() 

export class ShoppingListService {
   /* DATA MEMBER: ingredients */
   private ingredients: Ingredient[] = [
      new Ingredient("Apples", 44),
      new Ingredient("Tomatoes", 2)
   ];

   /* DATA MEMBER: ingredientsUpdate Subject
      -- a copy of the entire updated array will emit to all observers */
   public ingredientsUpdate$ = new Subject<Ingredient[]>();

   /* DATA MEMBER: startedEditing Subject 
      -- the index of the edited ingredient will 
         be broadcasted to all observers */
   public startedEditing$ = new Subject<number>();

   /* OPERATION: getIngredients
      -- ingredients getter method
      -- protects 'ingredients' by returning an exact copy via slice()
      @return: returns a copy of the 'ingredients' data member */
   public getIngredients(): Ingredient[] {
      return this.ingredients.slice();
   } // end getIngredients

   /* OPERATION: addIngredient
      @param data: the ingredient object to be added to the
         current ingredients array          
      -- adds an ingredient 
      -- emits the entire updated array */
   public addIngredient(data: Ingredient): void {
      this.ingredients.push(data);
      this.ingredientsUpdate$.next(this.ingredients.slice());
   } // end addIngredient

   /* OPERATION: getIngredient
      @param index: the index for the target ingredient
                    within the ingredients array
      @return:      ingredient with the index of the argument value
      -- returns an ingredient at a specific index */
   public getIngredient(index: number): Ingredient {
      return this.ingredients[index];
   } // end getIngredient

   /* OPERATION: getIngredient
      @param index:         the index for the target ingredient
                            within the ingredients array
      @param newIngredient: ingredient object to replace current
      -- updates ingredient at specified index with the new
         ingredient passed */
   public updateIngredient(index: number, newIngredient: Ingredient): void {
      this.ingredients[index] = newIngredient;
      this.ingredientsUpdate$.next(this.ingredients.slice());
   } // end updateIngredient

   /* OPERATION: deleteIngredient
      @param index: the index for the target ingredient 
         within the ingredients array
      -- deletes ingredient at specified index */
      public deleteIngredient(index: number): void {
         this.ingredients.splice(index, 1);
         this.ingredientsUpdate$.next(this.ingredients.slice());
      } // end deleteIngredient

} // end ShoppingListService