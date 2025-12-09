import { Routes } from '@angular/router';

export const peopleRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/people-list/people-list.component').then(
        (m) => m.PeopleListComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/people-detail/people-detail.component').then(
        (m) => m.PeopleDetailComponent
      ),
  },
];
