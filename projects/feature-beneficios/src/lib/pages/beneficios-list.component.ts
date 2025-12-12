import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CardComponent,
  ButtonComponent,
  ToastService,
} from '@superapp/ui-widgets';
import { BeneficiosService } from '../services/beneficios.service';
import { Beneficio, BeneficioCategoria } from '../models/beneficio.model';

/**
 * Página de listagem de benefícios disponíveis
 * Exibe cards com os benefícios e permite filtrar por categoria
 */
@Component({
  selector: 'app-beneficios-list',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="beneficios-container">
      <header class="page-header">
        <h1>Benefícios Disponíveis</h1>
        <p class="subtitle">
          Conheça os benefícios oferecidos pela Caixa e solicite o seu
        </p>
      </header>

      <!-- Filtros por categoria -->
      <div class="filters">
        <ui-button
          [variant]="categoriaFiltro === null ? 'primary' : 'outlined'"
          size="small"
          (click)="filtrarCategoria(null)"
        >
          Todos
        </ui-button>
        <ui-button
          [variant]="categoriaFiltro === 'saude' ? 'primary' : 'outlined'"
          size="small"
          (click)="filtrarCategoria('saude')"
        >
          Saúde
        </ui-button>
        <ui-button
          [variant]="categoriaFiltro === 'educacao' ? 'primary' : 'outlined'"
          size="small"
          (click)="filtrarCategoria('educacao')"
        >
          Educação
        </ui-button>
        <ui-button
          [variant]="categoriaFiltro === 'transporte' ? 'primary' : 'outlined'"
          size="small"
          (click)="filtrarCategoria('transporte')"
        >
          Transporte
        </ui-button>
        <ui-button
          [variant]="categoriaFiltro === 'alimentacao' ? 'primary' : 'outlined'"
          size="small"
          (click)="filtrarCategoria('alimentacao')"
        >
          Alimentação
        </ui-button>
        <ui-button
          [variant]="categoriaFiltro === 'previdencia' ? 'primary' : 'outlined'"
          size="small"
          (click)="filtrarCategoria('previdencia')"
        >
          Previdência
        </ui-button>
        <ui-button
          [variant]="categoriaFiltro === 'lazer' ? 'primary' : 'outlined'"
          size="small"
          (click)="filtrarCategoria('lazer')"
        >
          Lazer
        </ui-button>
      </div>

      <!-- Grid de benefícios -->
      <div class="beneficios-grid" *ngIf="beneficios$ | async as beneficios">
        <ui-card
          *ngFor="let beneficio of $any(beneficios)"
          [elevated]="true"
          [interactive]="true"
          (click)="verDetalhes(beneficio.id)"
        >
          <div card-header>
            <div class="card-title-wrapper">
              <span class="beneficio-icone">{{
                getIcone(beneficio.categoria)
              }}</span>
              <h3>{{ beneficio.nome }}</h3>
            </div>
            <span
              class="status-badge"
              [class.ativo]="beneficio.status === 'ativo'"
              [class.inativo]="beneficio.status === 'inativo'"
            >
              {{ beneficio.status }}
            </span>
          </div>

          <div card-body>
            <p class="descricao">{{ beneficio.descricao }}</p>

            <div class="info-row" *ngIf="beneficio.valorMensal">
              <span class="label">Valor mensal:</span>
              <span class="valor">{{
                beneficio.valorMensal | currency : 'BRL'
              }}</span>
            </div>

            <div class="info-row">
              <span class="label">Prazo de análise:</span>
              <span class="text">{{ beneficio.prazoAnalise }} dias úteis</span>
            </div>

            <div class="categoria-tag">
              {{ getCategoriaLabel(beneficio.categoria) }}
            </div>
          </div>

          <div card-footer>
            <ui-button
              variant="primary"
              fullWidth
              (click)="verDetalhes(beneficio.id); $event.stopPropagation()"
            >
              Ver detalhes
            </ui-button>
          </div>
        </ui-card>
      </div>

      <!-- Estado vazio -->
      <div class="empty-state" *ngIf="$any(beneficios$ | async)?.length === 0">
        <span class="empty-icon">📋</span>
        <h3>Nenhum benefício encontrado</h3>
        <p>Tente selecionar outra categoria</p>
      </div>
    </div>
  `,
  styles: [
    `
      .beneficios-container {
        padding: var(--spacing-xl);
        max-width: 1200px;
        margin: 0 auto;
      }

      .page-header {
        margin-bottom: var(--spacing-2xl);
      }

      .page-header h1 {
        font-size: var(--fontSize-3xl);
        font-weight: var(--fontWeight-bold);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-xs);
      }

      .subtitle {
        font-size: var(--fontSize-lg);
        color: var(--color-text-secondary);
      }

      .filters {
        display: flex;
        gap: var(--spacing-sm);
        flex-wrap: wrap;
        margin-bottom: var(--spacing-xl);
        padding-bottom: var(--spacing-lg);
        border-bottom: 1px solid var(--color-border);
      }

      .beneficios-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: var(--spacing-lg);
      }

      .card-title-wrapper {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
      }

      .beneficio-icone {
        font-size: var(--fontSize-2xl);
      }

      .card-title-wrapper h3 {
        font-size: var(--fontSize-lg);
        font-weight: var(--fontWeight-semibold);
        color: var(--color-text-primary);
        margin: 0;
      }

      .status-badge {
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-full);
        font-size: var(--fontSize-sm);
        font-weight: var(--fontWeight-medium);
        text-transform: uppercase;
      }

      .status-badge.ativo {
        background: var(--color-success-10);
        color: var(--color-success);
      }

      .status-badge.inativo {
        background: var(--color-error-10);
        color: var(--color-error);
      }

      .descricao {
        color: var(--color-text-secondary);
        font-size: var(--fontSize-md);
        line-height: var(--lineHeight-relaxed);
        margin-bottom: var(--spacing-md);
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-sm);
        padding: var(--spacing-sm) 0;
      }

      .info-row .label {
        font-size: var(--fontSize-sm);
        color: var(--color-text-secondary);
      }

      .info-row .valor {
        font-size: var(--fontSize-lg);
        font-weight: var(--fontWeight-bold);
        color: var(--color-primary);
      }

      .info-row .text {
        font-size: var(--fontSize-sm);
        color: var(--color-text-primary);
      }

      .categoria-tag {
        display: inline-block;
        margin-top: var(--spacing-md);
        padding: var(--spacing-xs) var(--spacing-md);
        background: var(--color-primary-10);
        color: var(--color-primary);
        border-radius: var(--radius-full);
        font-size: var(--fontSize-xs);
        font-weight: var(--fontWeight-medium);
        text-transform: uppercase;
      }

      .empty-state {
        text-align: center;
        padding: var(--spacing-3xl) var(--spacing-xl);
      }

      .empty-icon {
        font-size: 64px;
        display: block;
        margin-bottom: var(--spacing-lg);
      }

      .empty-state h3 {
        font-size: var(--fontSize-xl);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-sm);
      }

      .empty-state p {
        color: var(--color-text-secondary);
        font-size: var(--fontSize-md);
      }

      /* Mobile */
      @media (max-width: 768px) {
        .beneficios-container {
          padding: var(--spacing-lg);
        }

        .page-header h1 {
          font-size: var(--fontSize-2xl);
        }

        .beneficios-grid {
          grid-template-columns: 1fr;
        }

        .filters {
          overflow-x: auto;
          flex-wrap: nowrap;
          padding-bottom: var(--spacing-md);
        }
      }
    `,
  ],
})
export class BeneficiosListComponent implements OnInit {
  beneficios$!: Observable<Beneficio[]>;
  categoriaFiltro: BeneficioCategoria | null = null;

  constructor(
    private beneficiosService: BeneficiosService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarBeneficios();
  }

  carregarBeneficios(): void {
    this.beneficios$ = this.beneficiosService.getBeneficios(
      this.categoriaFiltro ?? undefined
    );
  }

  filtrarCategoria(categoria: BeneficioCategoria | null): void {
    this.categoriaFiltro = categoria;
    this.carregarBeneficios();
  }

  verDetalhes(beneficioId: string): void {
    this.router.navigate(['/beneficios', beneficioId]);
  }

  getIcone(categoria: BeneficioCategoria): string {
    const icones: Record<BeneficioCategoria, string> = {
      saude: '🏥',
      educacao: '🎓',
      transporte: '🚌',
      alimentacao: '🍽️',
      previdencia: '💰',
      lazer: '🎯',
    };
    return icones[categoria] || '📋';
  }

  getCategoriaLabel(categoria: BeneficioCategoria): string {
    const labels: Record<BeneficioCategoria, string> = {
      saude: 'Saúde',
      educacao: 'Educação',
      transporte: 'Transporte',
      alimentacao: 'Alimentação',
      previdencia: 'Previdência',
      lazer: 'Lazer',
    };
    return labels[categoria] || categoria;
  }
}
