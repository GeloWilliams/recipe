import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

/* Component Decorator */
@Component({
   selector: 'app-shopping-list',
   templateUrl: './shopping-list.component.html',
   styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {

   /* DATA MEMBER: ingredients */
   public ingredients: Ingredient[] = [];

   /* DATA MEMBER: listSub */
   private listSub!: Subscription;

   /* DATA MEMBER (import): addedIngredient */
   @Input() addedIngredient!: Ingredient;

   // inject ShoppingListService upon instantiation
   constructor(
      private shoppingListService: ShoppingListService) {}

   ngOnInit(): void 
   {
      // get the ingredients from the ShoppingListService
      this.ingredients = this.shoppingListService.getIngredients();

      // subscribe to ShoppingListService
      this.listSub = this.shoppingListService.ingredientsUpdate$.subscribe(
         (data: Ingredient[])=> {
            // get current list of ingredients
            this.ingredients = data;
         }
      );
   } // end OnInit

   /* OPERATION: onEditItem 
      @param index: the index of the target item for edit
      -- sends item's index to service */
   onEditItem(index: number): void {
      this.shoppingListService.startedEditing$.next(index);
   } // end onEditItem

   ngOnDestroy(): void {
       // unsubscribe when destructor is called
       this.listSub.unsubscribe();
   } // end OnDestroy

} // end ShoppingListComponent
