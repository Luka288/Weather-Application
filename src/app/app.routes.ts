import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/main/main.component').then((m) => m.MainComponent),
    title: 'Weather',
  },
];
