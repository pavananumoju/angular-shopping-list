import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  navComponent:string = 'recipes';


  onNavClick(nav: string){
    this.navComponent = nav;
  }

}
