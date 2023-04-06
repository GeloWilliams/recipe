import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
   selector: 'app-shopping-list',
   templateUrl: './shopping-list.component.html',
   styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
   /* Data Member: ingredients */
   ingredients: Ingredient[] = [];
   /* Data Member (Subscription): listSub */
   listSub!: Subscription;

   // new Ingredient
   @Input() addedIngredient!: Ingredient;

   // inject ShoppingListService upon new component instantiation
   constructor(private shoppingListService: ShoppingListService) { }

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
   }

   /* Operation: onEditItem 
      -- sends item's index to service */
   onEditItem(index: number): void {
      this.shoppingListService.startedEditing$.next(index);
   }

   ngOnDestroy(): void {
       // unsubscribe when destructor is called
       this.listSub.unsubscribe();
   }

} // end ShoppingListComponent
