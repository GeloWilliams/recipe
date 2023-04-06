import { Ingredient } from "../shared/ingredient.model";

// A model is simply a collection of data members, no need for an @Decorator
export class Recipe {
   public name: string;
   public description: string;
   public imagePath: string;
   public ingredients: Ingredient[];

   // Constructor
   constructor(nme: string, desc: string, imgPath: string, ingred: Ingredient[]) {
      this.name = nme;
      this.description = desc;
      this.imagePath = imgPath;
      this.ingredients = ingred;
   }
}