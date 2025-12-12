import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  ListComponent,
  ButtonComponent,
  CardComponent,
  ToastService,
} from '@superapp/ui-widgets';
import { BeneficiosService } from '../services/beneficios.service';
import { SolicitacaoBeneficio } from '../models/beneficio.model';

/**
 * Página de minhas solicitações de benefícios
 * Lista histórico de solicitações do colaborador com status
 */
@Component({
  selector: 'app-minhas-solicitacoes',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="solicitacoes-container">
      <header class="page-header">
        <div class="header-content">
          <h1>Minhas Solicitações</h1>
          <p class="subtitle">
            Acompanhe o status das suas solicitações de benefícios
          </p>
        </div>
        <ui-button variant="primary" (click)="navegarParaBeneficios()">
          + Nova Solicitação
        </ui-button>
      </header>

      <!-- Lista de solicitações -->
      <div
        class="solicitacoes-list"
        *ngIf="solicitacoes$ | async as solicitacoes"
      >
        <ui-card
          *ngFor="let solicitacao of solicitacoes"
          [elevated]="true"
          class="solicitacao-card"
        >
          <div card-header>
            <div class="card-title-wrapper">
              <h3>{{ solicitacao.beneficioNome }}</h3>
              <span
                class="status-badge"
                [class.pendente]="solicitacao.status === 'pendente'"
                [class.em-analise]="solicitacao.status === 'em_analise'"
                [class.aprovada]="solicitacao.status === 'aprovada'"
                [class.reprovada]="solicitacao.status === 'reprovada'"
                [class.cancelada]="solicitacao.status === 'cancelada'"
              >
                {{ getStatusLabel(solicitacao.status) }}
              </span>
            </div>
          </div>

          <div card-body>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Protocolo:</span>
                <span class="value">{{ solicitacao.id }}</span>
              </div>

              <div class="info-item">
                <span class="label">Data da Solicitação:</span>
                <span class="value">{{
                  solicitacao.dataSolicitacao | date : 'dd/MM/yyyy'
                }}</span>
              </div>

              <div class="info-item" *ngIf="solicitacao.dataAprovacao">
                <span class="label">Data de Aprovação:</span>
                <span class="value">{{
                  solicitacao.dataAprovacao | date : 'dd/MM/yyyy'
                }}</span>
              </div>

              <div class="info-item" *ngIf="solicitacao.dataInicio">
                <span class="label">Data de Início:</span>
                <span class="value">{{
                  solicitacao.dataInicio | date : 'dd/MM/yyyy'
                }}</span>
              </div>

              <div class="info-item" *ngIf="solicitacao.observacoes">
                <span class="label">Observações:</span>
                <span class="value">{{ solicitacao.observacoes }}</span>
              </div>

              <div
                class="info-item alert-error"
                *ngIf="solicitacao.motivoReprovacao"
              >
                <span class="label">Motivo da Reprovação:</span>
                <span class="value">{{ solicitacao.motivoReprovacao }}</span>
              </div>
            </div>

            <!-- Documentos enviados -->
            <div
              class="documentos-section"
              *ngIf="solicitacao.documentosEnviados.length > 0"
            >
              <h4>Documentos Enviados</h4>
              <ul class="documentos-list">
                <li *ngFor="let doc of solicitacao.documentosEnviados">
                  <span class="doc-icone">📎</span>
                  <span class="doc-nome">{{ doc.nome }}</span>
                  <span class="doc-data">{{
                    doc.dataEnvio | date : 'dd/MM/yyyy'
                  }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div card-footer>
            <div class="card-actions">
              <ui-button
                variant="outlined"
                size="sm"
                (click)="verDetalhes(solicitacao.beneficioId)"
              >
                Ver Benefício
              </ui-button>

              <ui-button
                variant="secondary"
                size="sm"
                *ngIf="
                  solicitacao.status === 'pendente' ||
                  solicitacao.status === 'em_analise'
                "
                (click)="cancelarSolicitacao(solicitacao.id)"
              >
                Cancelar Solicitação
              </ui-button>
            </div>
          </div>
        </ui-card>

        <!-- Estado vazio -->
        <div class="empty-state" *ngIf="solicitacoes.length === 0">
          <span class="empty-icon">📋</span>
          <h3>Nenhuma solicitação encontrada</h3>
          <p>Você ainda não solicitou nenhum benefício</p>
          <ui-button variant="primary" (click)="navegarParaBeneficios()">
            Conhecer Benefícios
          </ui-button>
        </div>
      </div>

      <!-- Loading state -->
      <div class="loading-state" *ngIf="!(solicitacoes$ | async)">
        <p>Carregando suas solicitações...</p>
      </div>
    </div>
  `,
  styles: [
    `
      .solicitacoes-container {
        padding: var(--spacing-xl);
        max-width: 1000px;
        margin: 0 auto;
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--spacing-2xl);
        padding-bottom: var(--spacing-lg);
        border-bottom: 2px solid var(--color-border);
      }

      .header-content h1 {
        font-size: var(--fontSize-3xl);
        font-weight: var(--fontWeight-bold);
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-xs) 0;
      }

      .subtitle {
        font-size: var(--fontSize-lg);
        color: var(--color-text-secondary);
        margin: 0;
      }

      .solicitacoes-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
      }

      .solicitacao-card {
        transition: transform var(--transition-fast);
      }

      .solicitacao-card:hover {
        transform: translateY(-2px);
      }

      .card-title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-md);
      }

      .card-title-wrapper h3 {
        font-size: var(--fontSize-xl);
        font-weight: var(--fontWeight-semibold);
        color: var(--color-text-primary);
        margin: 0;
      }

      .status-badge {
        padding: var(--spacing-xs) var(--spacing-md);
        border-radius: var(--radius-full);
        font-size: var(--fontSize-sm);
        font-weight: var(--fontWeight-medium);
        text-transform: uppercase;
        white-space: nowrap;
      }

      .status-badge.pendente {
        background: var(--color-warning-10);
        color: var(--color-warning);
      }

      .status-badge.em-analise {
        background: var(--color-primary-10);
        color: var(--color-primary);
      }

      .status-badge.aprovada {
        background: var(--color-success-10);
        color: var(--color-success);
      }

      .status-badge.reprovada,
      .status-badge.cancelada {
        background: var(--color-error-10);
        color: var(--color-error);
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
      }

      .info-item {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
      }

      .info-item .label {
        font-size: var(--fontSize-sm);
        font-weight: var(--fontWeight-medium);
        color: var(--color-text-secondary);
      }

      .info-item .value {
        font-size: var(--fontSize-md);
        color: var(--color-text-primary);
      }

      .info-item.alert-error {
        grid-column: 1 / -1;
        background: var(--color-error-10);
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        border-left: 4px solid var(--color-error);
      }

      .info-item.alert-error .label {
        color: var(--color-error);
      }

      .documentos-section {
        margin-top: var(--spacing-lg);
        padding-top: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
      }

      .documentos-section h4 {
        font-size: var(--fontSize-md);
        font-weight: var(--fontWeight-semibold);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-md);
      }

      .documentos-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .documentos-list li {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm);
        background: var(--color-bg-surface);
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-xs);
      }

      .doc-icone {
        font-size: var(--fontSize-lg);
      }

      .doc-nome {
        flex: 1;
        font-size: var(--fontSize-sm);
        color: var(--color-text-primary);
      }

      .doc-data {
        font-size: var(--fontSize-xs);
        color: var(--color-text-secondary);
      }

      .card-actions {
        display: flex;
        gap: var(--spacing-sm);
        justify-content: flex-end;
      }

      .empty-state {
        text-align: center;
        padding: var(--spacing-3xl);
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
        margin-bottom: var(--spacing-lg);
      }

      .loading-state {
        text-align: center;
        padding: var(--spacing-3xl);
        color: var(--color-text-secondary);
      }

      /* Mobile */
      @media (max-width: 768px) {
        .solicitacoes-container {
          padding: var(--spacing-lg);
        }

        .page-header {
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .header-content h1 {
          font-size: var(--fontSize-2xl);
        }

        .card-title-wrapper {
          flex-direction: column;
          align-items: flex-start;
        }

        .info-grid {
          grid-template-columns: 1fr;
        }

        .card-actions {
          flex-direction: column;
        }

        .card-actions ui-button {
          width: 100%;
        }
      }
    `,
  ],
})
export class MinhasSolicitacoesComponent implements OnInit {
  solicitacoes$!: Observable<SolicitacaoBeneficio[]>;

  constructor(
    private beneficiosService: BeneficiosService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes(): void {
    // Mock - em produção buscar colaboradorId do auth service
    this.solicitacoes$ =
      this.beneficiosService.getSolicitacoesColaborador('user-001');
  }

  navegarParaBeneficios(): void {
    this.router.navigate(['/beneficios']);
  }

  verDetalhes(beneficioId: string): void {
    this.router.navigate(['/beneficios', beneficioId]);
  }

  cancelarSolicitacao(solicitacaoId: string): void {
    if (
      !confirm(
        'Tem certeza que deseja cancelar esta solicitação? Esta ação não pode ser desfeita.'
      )
    ) {
      return;
    }

    this.beneficiosService.cancelarSolicitacao(solicitacaoId).subscribe({
      next: () => {
        this.toastService.success(
          'Solicitação cancelada',
          'Sua solicitação foi cancelada com sucesso'
        );
        this.carregarSolicitacoes();
      },
      error: (error) => {
        this.toastService.error(
          'Erro ao cancelar',
          error.message || 'Não foi possível cancelar a solicitação'
        );
      },
    });
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pendente: 'Pendente',
      em_analise: 'Em Análise',
      aprovada: 'Aprovada',
      reprovada: 'Reprovada',
      cancelada: 'Cancelada',
    };
    return labels[status] || status;
  }
}
