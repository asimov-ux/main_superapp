import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'beneficios',
    loadComponent: () =>
      import('./beneficios/beneficios.component').then(
        (m) => m.BeneficiosComponent
      ),
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
  {
    path: 'people',
    loadComponent: () =>
      import('./people/people-list.component').then(
        (m) => m.PeopleListComponent
      ),
  },
  {
    path: 'people/:id',
    loadComponent: () =>
      import('./people/person-details.component').then(
        (m) => m.PersonDetailsComponent
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
