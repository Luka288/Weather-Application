import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { StateService } from '../services/state.service';

@Directive({
  selector: '[appTrackWidth]',
  standalone: true,
})
export class TrackWidthDirective {
  private readonly stateService = inject(StateService);

  constructor() {
    this.checkWidth();
  }

  @HostListener('window:resize') onResize() {}

  checkWidth() {
    const isClosed = window.innerWidth > 768;
  }
}
