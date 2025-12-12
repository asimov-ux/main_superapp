import { Routes } from '@angular/router';

/**
 * Rotas do módulo Benefícios
 * Define navegação entre páginas de benefícios
 */
export const BENEFICIOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/beneficios-list.component').then(
        (m) => m.BeneficiosListComponent
      ),
  },
  {
    path: 'minhas-solicitacoes',
    loadComponent: () =>
      import('./pages/minhas-solicitacoes.component').then(
        (m) => m.MinhasSolicitacoesComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/beneficio-detail.component').then(
        (m) => m.BeneficioDetailComponent
      ),
  },
];
