import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, map, take, tap } from "rxjs";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";

/* - Service Decorator
   - @Injectable required since we are injecting another service
   - {providedIn: 'root'} object is a shortcut to providing this
     service in app.module.ts */
@Injectable({providedIn: 'root'}) 

export class DataStorageService {
   /* Inject httpClient, recipeService, and authService upon instantiation */
   constructor(
      private http: HttpClient, 
      private recipeService: RecipeService,
      private authService: AuthService
      ) {}

   /* OPERATION: storeRecipes
      @return: the response body Observable of type Recipe[] from the Firebase endpoint
      -- PUTs changes to the recipe property on user-prompted saving of recipes */
   public storeRecipes()  {
      const recipes = this.recipeService.getRecipes();
      // You want to always overwrite any data that was previously stored (PUT instead of POST)
      return this.http.put('storage-endpoint/recipes.json', recipes).subscribe(
         res => { console.log('Firebase\'s response:', res); }
      );
   } // end storeRecipes

   /* OPERATION: fetchRecipes
      @return: the response body Observable of type Recipe[] from the Firebase endpoint
      -- GETs recipes from a Firebase endpoint and overwrites the current recipe property */
   public fetchRecipes(): Observable<Recipe[]> {
      // manual authorization (despite having an AuthInterceptorService)
      return this.authService.user$.pipe(
         // just take Observable x number of times and end subscription immediately
         take(1),
         // exhaustMap passes the the taken Observable value to the next step
         exhaustMap(user => {
            const userToken = user!.token;
            return this.http.get<Recipe[]>('fetching-endpoint/recipes.json?auth=' + userToken)
         }),
         // rxjs map operator
         map(recipes => {
            // javaScript style map operator
            return recipes.map(recipe => {
               return {
                  ...recipe,
                  // if no ingredients, return an empty array to avoid undefineds
                  ingredients: recipe.ingredients ? recipe.ingredients : []
               };
            })
         }),
         tap(recipes => {
            this.recipeService.setRecipes(recipes);
            console.log("Fetched these recipes:", recipes);
         })
      );
   } // end fetchRecipes
} // end DataStorageService