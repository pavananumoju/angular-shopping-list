import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService{
    recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Bread Omlet',
    //         'This is bread omlet',
    //         'https://www.kannammacooks.com/wp-content/uploads/2014/11/South-indian-style-chettinad-urlai-roast-potato-roast-recipe-1-3.jpg',
    //         [
    //             new Ingredient('Bread',4),
    //             new Ingredient('Eggs',4),
    //             new Ingredient('Salt',1)
    //         ]),
    //     new Recipe(
    //         'Tea',
    //         'This is tea',
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHrNi2AWTyLM1jKkZvltqkN-jsts137ns-xZ14rZF8uVo4sHaGNIJd_9TmfX0GCRUS2QE&usqp=CAU',
    //         [
    //             new Ingredient('Milk',1),
    //             new Ingredient('Tea',1),
    //             new Ingredient('Sugar',1)
    //         ])
    //   ];

    private recipes: Recipe[] = [];

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number): Recipe{
        return this.recipes[index];
    }

    addRecipe(newRecipe: Recipe){
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}