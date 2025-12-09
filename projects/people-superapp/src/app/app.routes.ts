import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'people',
    pathMatch: 'full',
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
];
