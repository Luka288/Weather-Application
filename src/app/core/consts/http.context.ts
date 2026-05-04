import { HttpContextToken } from '@angular/common/http';

export type ApiBase = 'ipinfo' | 'weather';

export const API_BASE = new HttpContextToken<ApiBase>(() => 'weather');
