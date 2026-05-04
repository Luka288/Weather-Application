import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { BooleanService } from '../services/boolean.service';

@Directive({
  selector: '[appTrackWidth]',
  standalone: true,
})
export class TrackWidthDirective {
  private readonly booleanService = inject(BooleanService);

  constructor() {
    this.checkWidth();
  }

  @HostListener('window:resize') onResize() {}

  checkWidth() {
    const isClosed = window.innerWidth > 768;
  }
}
