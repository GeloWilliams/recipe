import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

// Optional decorator, for convention's sake
@Injectable() 

/**  -----------------------------------------------------------------
   Shopping List Service
   -- houses shopping list data
   -- maintains centralised operations related to shopping 
      list interactions */
export class ShoppingListService {
   /* Data Member: ingredients */
   private ingredients: Ingredient[] = [
      new Ingredient("Apples", 44),
      new Ingredient("Tomatoes", 2)
   ];

   /* Data Member: ingredientsUpdate Subject
      -- a copy of the entire updated array will emit to all observers */
   public ingredientsUpdate$ = new Subject<Ingredient[]>();

   /* Data Member: startedEditing Subject 
      -- the index of the edited ingredient will 
         be broadcasted to all observers */
   public startedEditing$ = new Subject<number>();

   /* Operation: getIngredients
      -- ingredients getter method
      -- protects 'ingredients' by returning an exact copy via slice()
      @return: returns a copy of the 'ingredients' data member */
   public getIngredients(): Ingredient[] {
      return this.ingredients.slice();
   }

   /* Operation: addIngredient
      -- adds an ingredient 
      -- emits the entire update array */
   public addIngredient(data: Ingredient): void {
      this.ingredients.push(data);
      this.ingredientsUpdate$.next(this.ingredients.slice());
   }

   /* Operation: getIngredient
      -- returns an ingredient at a specific index
      @return: ingredient with the index of the argument value */
   public getIngredient(index: number): Ingredient {
      return this.ingredients[index];
   }

   /* Operation: getIngredient
      -- updates ingredient at specified index with the new
         ingredient passed */
   public updateIngredient(index: number, newIngredient: Ingredient): void {
      this.ingredients[index] = newIngredient;
      this.ingredientsUpdate$.next(this.ingredients.slice());
   }

   /* Operation: deleteIngredient
   -- deletes ingredient at specified index */
      public deleteIngredient(index: number): void {
         this.ingredients.splice(index, 1);
         this.ingredientsUpdate$.next(this.ingredients.slice());
      }
}