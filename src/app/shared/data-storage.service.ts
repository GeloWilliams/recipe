import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";


@Injectable({providedIn: 'root'})

export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipe-book-e9566.firebaseio.com/recipes.json', recipes).subscribe(
            response => {
                console.log(response);
            }
        );
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-recipe-book-e9566.firebaseio.com/recipes.json').pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            });
        })).pipe(tap(
            recipes => {
                this.recipeService.setRecipes(recipes);
            }
        ))
    }

}