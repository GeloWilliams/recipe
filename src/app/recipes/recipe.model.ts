import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    name: string;
    description: string;
    imagePath: string;

    constructor(name: string, desc: string, iPath: string, public ingredients: Ingredient[]){
        this.name = name;
        this.description = desc;
        this.imagePath = iPath;
    }
}