import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API, API_BASE, currLocation } from './../consts/index';

export const APIrequestInterceptor: HttpInterceptorFn = (req, next) => {
  // TO BE SURE THAT EXTERNAL REQUESTS ARE NOT MODIFIED
  if (/^https?:\/\//i.test(req.url)) {
    return next(req);
  }
  const base = req.context.get(API_BASE);

  const WEATHER_BASE = inject(API);
  const LOCATION_BASE = inject(currLocation);

  const baseURL = base === 'ipinfo' ? LOCATION_BASE : WEATHER_BASE;

  const url = `${baseURL}/${req.url}`.replace(/([^:]\/)\/+/g, '$1');

  return next(req.clone({ url }));
};
