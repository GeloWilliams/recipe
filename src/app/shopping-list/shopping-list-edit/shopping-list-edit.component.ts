import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
   selector: 'app-shopping-list-edit',
   templateUrl: './shopping-list-edit.component.html',
   styleUrls: ['./shopping-list-edit.component.css']
})

export class ShoppingListEditComponent implements OnInit, OnDestroy {

   // inject ShoppingListService upon new component instantiation
   constructor(private slService: ShoppingListService) {}

   /* Data Member: slForm
      -- Access to shopping list form via ViewChild */
   @ViewChild('f', {static: false}) slForm!: NgForm;

   /* Data Member: editMode
     -- indicates whether in edit mode */
   public editMode = false;

   /* Data Member: editedItem */
   private editedItem!: Ingredient;

   /* Data Member: editedItemIndex */
   public editedItemIndex!: number;

   /* Data Member: editWatcher
      -- subscribed to startedEditing Subject in slService */
   private editWatcher!: Subscription;
   
   ngOnInit(): void {
      this.editWatcher = this.slService.startedEditing$.subscribe(
         (index: number) => {
            this.editMode = true;
            this.editedItem = this.slService.getIngredient(index);
            this.editedItemIndex = index;

            // prepopulate the form with the values of the passed data
            this.slForm.setValue({
               name: this.editedItem.name,
               amount: this.editedItem.amount
            });
         }
      );
   }
   
   /* Operation: onSubmit 
      -- adds a new ingredient or updates an existing ingredient */
   public onSubmit(f: NgForm): void {
      // ngForm type has a 'value' property
      const val = f.value;
      // set up new ingredient ('const' since we will only assign newIngredient once)
      const newIngredient = new Ingredient(val.name, val.amount);

      // existing or new ingredient?
      if (this.editMode) {
         // send new ingredient to service to replace existing ingredient
         this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      } else {
         // send new ingredient to service, appending to list of ingredients
         this.slService.addIngredient(newIngredient);
      }
      this.editMode = false;
      f.reset();
   }

   /* Operation: onClear */
   public onClear(): void {
      this.slForm.reset();
      this.editMode = false;
   }

   /* Operation: onDelete
      -- clears form and splices out ingredient at specified index */
   public onDelete(f:NgForm): void {
      this.onClear();
      this.slService.deleteIngredient(this.editedItemIndex);
   }
   
   ngOnDestroy(): void {
      this.editWatcher.unsubscribe();
   }
}