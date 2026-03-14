import { Directive, ElementRef } from '@angular/core';
import { ConnectableObservable } from 'rxjs';

@Directive({
  selector: '[scrollToView]',
  standalone: true,
})
export class ScrollToViewDirective {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.el.nativeElement.classList.contains('currentHour')) {
        this.el.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        console.log(this.el.nativeElement);
      }
    }, 500);
  }
}
