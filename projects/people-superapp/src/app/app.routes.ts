import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'people',
    loadComponent: () =>
      import('./people-list/people-list.component').then(
        (m) => m.PeopleListComponent
      ),
  },
  {
    path: 'people/:id',
    loadComponent: () =>
      import('./people-detail/people-detail.component').then(
        (m) => m.PeopleDetailComponent
      ),
  },
  {
    path: 'beneficios',
    loadComponent: () =>
      import('./beneficios/beneficios-page.component').then(
        (m) => m.BeneficiosPageComponent
      ),
  },
  {
    path: 'funcef',
    loadComponent: () =>
      import('./funcef/funcef.component').then((m) => m.FuncefComponent),
  },
  {
    path: 'ausencias',
    loadComponent: () =>
      import('./ausencias/ausencias-calendar.component').then(
        (m) => m.AusenciasCalendarComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
