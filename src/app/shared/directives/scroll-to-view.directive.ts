import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollToView]',
  standalone: true,
})
export class ScrollToViewDirective {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.el.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 500);
  }
}
