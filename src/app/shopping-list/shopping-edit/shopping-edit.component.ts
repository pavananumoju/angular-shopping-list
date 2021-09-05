import { Component, OnInit, Output, ViewChild , EventEmitter, ElementRef} from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  @ViewChild('nameInput',{static:false}) nameInputElement: ElementRef;
  @ViewChild('amountInput',{static:false}) amountInputElement: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addToList(){
    const newIngredient = new Ingredient(this.nameInputElement.nativeElement.value, +this.amountInputElement.nativeElement.value);
    this.shoppingListService.addToShoppingList(newIngredient);
  }

}
