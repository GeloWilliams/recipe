import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

/* Directive Decorator */
@Directive({
   selector: '[appDropdown]'
})

export class DropdownDirective {

   // 'class' is an array on our target element
   // 'open' is the specific class name in which we want to bind
   @HostBinding('class.open') isOpen = false;

   // click listener
   @HostListener('document:click', ['$event']) toggleOpen(evt: Event) {
      // if 'open' is within the 'class' array, remove it
      // if 'open' is not within the 'class' array, add it

      // SIMPLE VERSION: 
      // this.isOpen = !this.isOpen;

      // ABLE TO CLICK ANYWHERE TO CLOSE DROPDOWN:
      this.isOpen = this.ref.nativeElement.contains(evt.target) ? !this.isOpen : false;
   } // end toggleOpen

   // load up an element reference
   constructor(private ref: ElementRef) { }

} // end DropdownDirective
