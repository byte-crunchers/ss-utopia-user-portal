import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  color = 'gray';
  constructor(private eleRef: ElementRef) {
    eleRef.nativeElement.style.color = this.color;
   }

}
