import { Component, OnInit, Output, ViewChild , EventEmitter, ElementRef} from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  @ViewChild('nameInput',{static:false}) nameInputElement: ElementRef;
  @ViewChild('amountInput',{static:false}) amountInputElement: ElementRef;
  newIngredient: Ingredient;
  @Output() addIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  addToList(){
    this.addIngredient.emit(new Ingredient(this.nameInputElement.nativeElement.value, +this.amountInputElement.nativeElement.value));
  }

}
