import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeEvent = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe - 1','This is simply a test','https://www.kannammacooks.com/wp-content/uploads/2014/11/South-indian-style-chettinad-urlai-roast-potato-roast-recipe-1-3.jpg'),
    new Recipe('A Test Recipe - 2','This is simply a test','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHrNi2AWTyLM1jKkZvltqkN-jsts137ns-xZ14rZF8uVo4sHaGNIJd_9TmfX0GCRUS2QE&usqp=CAU')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  showRecipeDetails(recipe: Recipe){
    this.recipeEvent.emit(recipe);
  }

}
