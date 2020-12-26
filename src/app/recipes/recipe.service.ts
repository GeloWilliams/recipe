import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) {}

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Kimchijjigae',
    //         'A delicious soup',
    //         'https://www.koreanbapsang.com/wp-content/uploads/2014/03/Kimchi-jjigae-recipe.jpg',
    //         [
    //             new Ingredient('meat', 1),
    //             new Ingredient('kimchi', 20)
    //         ]),
    //     new Recipe(
    //         'Tuna Sashimi',
    //         'As fresh as a meal can get',
    //         'https://www.thespruceeats.com/thmb/_9P_SMHL4nuwqkt7bRK4RlYBNNc=/2001x1126/smart/filters:no_upscale()/454629837-58a4b2de5f9b58819cf851f5.jpg',
    //         [
    //             new Ingredient('tuna', 5),
    //             new Ingredient('soy sauce', 1)
    //         ]),
    //     new Recipe(
    //         'Donkatsu',
    //         'Porky delight from heaven',
    //         'https://futuredish.com/wp-content/uploads/2017/12/DONKATSU.jpg',
    //         [
    //             new Ingredient('meat', 3),
    //             new Ingredient('butter', 1)
    //         ])
    //   ];

    private recipes: Recipe[] = [];

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
          this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
            this.recipes.push(recipe);
            this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
            this.recipes[index] = newRecipe;
            this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());

      }

      setRecipes(recipes) {
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
      }
}