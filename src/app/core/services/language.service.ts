import { inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export enum LanguageEnum {
  lang = 'lang',
}

export enum Lang {
  EN = 'en',
  KA = 'ka',
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private transloco = inject(TranslocoService);

  current = signal<Lang>(
    (localStorage.getItem(LanguageEnum.lang) as Lang) ?? Lang.EN,
  );

  initLanguage(): void {
    const current_language = localStorage.getItem(LanguageEnum.lang) as Lang;
    this.transloco.setActiveLang(current_language ?? Lang.EN);
  }

  switchLanguage(language: Lang): void {
    this.transloco.setActiveLang(language);
    this.current.set(language);
    localStorage.setItem(LanguageEnum.lang, language);
  }

  getCurrentLang(): Lang {
    return this.transloco.getActiveLang() as Lang;
  }
}
