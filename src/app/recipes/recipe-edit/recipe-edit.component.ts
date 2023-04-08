import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';

/* Component Decorator */
@Component({
   selector: 'app-recipe-edit',
   templateUrl: './recipe-edit.component.html',
   styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {

   /* DATA MEMBER: recipeForm */
      public recipeForm!: FormGroup;

   /* DATA MEMBER: editMode
      -- determines whether to populate data */
   private editMode: boolean = false;

   /* DATA MEMBER: id
      -- retrieves the id of the recipe on the current route */
   private id!: number;

   // inject ActivatedRoute & RecipeService upon instantiation
   constructor(private curRoute: ActivatedRoute, 
         private recipeService: RecipeService,
         private router: Router
   ) {}

   ngOnInit(): void {
      // subscribe to get the current route's recipe id
      this.curRoute.params.subscribe(
         (params: Params) => {
            this.id = +params['id'];
            /* note: the ternary operator below will work without '? true : false', 
               however, it is written explicitly for the sake of clarity */
            this.editMode = (params['id'] != null) ? true : false;
            // sync the form
            this.initForm();
         }
      );
   } // end OnInit

   /* Operation: getIngredientControls
      -- @return: AbstractControl array, representing individual
         form controls in a FormArray */
   public getIngredientControls(): AbstractControl[] {
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
   } // end getIngredientControls

   /* Operation: onAddIngredient 
      -- adds new form control group under existing ingredients
         in edit mode */
   public onAddIngredient(): void {
      // get the ingredients FormArray so that you can push on it
      (<FormArray>this.recipeForm.get('ingredients')).push(
         new FormGroup({
            'name': new FormControl(null, Validators.required),
            'amount': new FormControl(null, [
               Validators.required,
               Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
         })
      )
   } // end onAddIngredient

   /* Operation: onDeleteIngredient
      @param index: the index corresponding an item 
         in the ingredients array
      -- removes the form control at the index passed */
   public onDeleteIngredient(index: number): void {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
   } // end onDeleteIngredient

   /* Operation: onClearAll
      -- removes all ingredients from FormArray */
   public onClearAll(): void {
      (<FormArray>this.recipeForm.get('ingredients')).clear();
   } // end onClearAll

   /* Operation: onCancel
      -- navigates back on level from the current route */
   public onCancel(): void {
      this.router.navigate(['../'],{relativeTo: this.curRoute});
   } // end onCancel

   /* Operation: onAddOrUpdateRecipe
      -- adds or updates a recipe */
   public onAddOrUpdateRecipe(): void {
      /* a shortcut in transferring a new recipe is to pass 
         'this.recipeForm.value' as an argument. Since we set up 
         recipeForm in the same model structure as the Recipe type,
         all properties should pass smoothly.
         
         The alternative is to create a variable that stores the
         newRecipe from the form:

         const newRecipe = new Recipe(
            this.recipeForm.value['name'],
            this.recipeForm.value['description],
            this.recipeForm.value['imagePath'],
            this.recipeForm.value['ingredients']
         ); */
     if (this.editMode) {
         // update recipe if in edit mode
         this.recipeService.updateRecipe(this.id, this.recipeForm.value);
     } else {
         // add recipe if not in edit mode (new recipe mode)
         this.recipeService.addRecipe(this.recipeForm.value);
     }
     this.onCancel(); // go back to previous route
   } // end addOrUpdateRecipe

   /* Operation: initForm
      -- if in edit mode, prepopulates the form */
   private initForm(): void {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredients: FormGroup[] = [];

      // if in edit mode...
      if (this.editMode) {
         const recipe = this.recipeService.getRecipeById(this.id);
         recipeName = recipe.name;
         recipeImagePath = recipe.imagePath;
         recipeDescription = recipe.description;
         /* if the property recipe.ingredients wasn't known until runtime, you
            can use: recipe['ingredients'] in place of recipe.ingredients.
            recipe.ingredients is used here for the sake of readability */
         if (recipe.ingredients) {
            for (let ingredient of recipe.ingredients) {
               recipeIngredients.push(
                  // push a FormGroup because Ingredient has two controls:
                  new FormGroup({
                     'name': new FormControl(ingredient.name, Validators.required),
                     'amount': new FormControl(ingredient.amount, [
                        Validators.required,
                        Validators.pattern(/^[1-9]+[0-9]*$/)
                     ])
                  })
               )
            }
         }
      } // end if

      // Set up form group and controls
      this.recipeForm = new FormGroup({
         'name': new FormControl(recipeName, Validators.required),
         'imagePath': new FormControl(recipeImagePath, Validators.required),
         'description': new FormControl(recipeDescription, Validators.required),
         'ingredients': new FormArray(recipeIngredients)
      });
   } // end initForm

} // end RecipeEditComponent
