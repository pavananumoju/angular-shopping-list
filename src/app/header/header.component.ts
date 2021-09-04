import { Component, Output,EventEmitter } from "@angular/core";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
})
export class HeaderComponent{

    @Output() navigationLink = new EventEmitter<string>();

    navigateTo(feature :string){
        this.navigationLink.emit(feature);
    }
    
}