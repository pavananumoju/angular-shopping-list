import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{

    @HostBinding('class.open') clickToggle: boolean = false;
    
    @HostListener('document:click',['$event']) menuToggle(eventData : Event){
        this.clickToggle = this.elRef.nativeElement.contains(eventData.target) ? !this.clickToggle : false;
    }

    constructor(private elRef: ElementRef){
    }

}