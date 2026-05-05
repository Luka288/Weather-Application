import { Component, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { SearchWeatherService } from '../../core/services/search-weather.service';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../core/services/state.service';
import { Lang, LanguageService } from '../../core/services/language.service';
import { Languages } from '../../core/consts/index';
import { LanguageOption } from '../../core/interfaces/language.type';
import { TranslocoDirective, TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ReactiveFormsModule, TranslocoPipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  readonly languageService = inject(LanguageService);
  readonly stateService = inject(StateService);

  protected Lang = Lang;
  readonly langs = Languages;

  displayClock = signal<string>('');
  clockLoading = signal<boolean>(true);

  isHeaderVisible = computed(() => this.stateService.headerVisible());

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.refreshClock();
  }

  setLang(lang: LanguageOption) {
    this.languageService.switchLanguage(lang.code);
    this.stateService.langDropdownOpen.set(
      !this.stateService.langDropdownOpen(),
    );
  }

  refreshClock() {
    setInterval(() => {
      this.liveClock();
    }, 1000);
  }

  liveClock() {
    const date = new Date();
    this.displayClock.set(date.toLocaleTimeString());
    this.clockLoading.set(false);
  }

  search(event: Event) {
    event.preventDefault();

    const value = this.searchControl.value;

    this.stateService.searchValue.set(value);
    this.searchControl.reset();
  }
}
