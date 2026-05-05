import { LanguageOption } from '../interfaces/language.type';
import { Lang } from '../services/language.service';

export const Languages: LanguageOption[] = [
  { code: Lang.EN, flag: 'EN', label: 'English' },
  { code: Lang.KA, flag: 'KA', label: 'ქართული' },
];
