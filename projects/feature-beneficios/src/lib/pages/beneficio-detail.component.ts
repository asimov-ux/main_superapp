import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import {
  ButtonComponent,
  CardComponent,
  ModalComponent,
  ToastService,
} from '@superapp/ui-widgets';
import { BeneficiosService } from '../services/beneficios.service';
import { Beneficio } from '../models/beneficio.model';

/**
 * Página de detalhes do benefício
 * Exibe informações completas e permite solicitar o benefício
 */
@Component({
  selector: 'app-beneficio-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, ModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="detail-container" *ngIf="beneficio$ | async as beneficio">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a (click)="voltar()">← Voltar para Benefícios</a>
      </nav>

      <!-- Header com ícone e título -->
      <header class="detail-header">
        <div class="header-content">
          <span class="beneficio-icone-large">{{
            getIcone($any(beneficio).categoria)
          }}</span>
          <div class="header-text">
            <h1>{{ $any(beneficio).nome }}</h1>
            <p class="categoria">
              {{ getCategoriaLabel($any(beneficio).categoria) }}
            </p>
          </div>
        </div>
        <span
          class="status-badge-large"
          [class.ativo]="$any(beneficio).status === 'ativo'"
        >
          {{ $any(beneficio).status }}
        </span>
      </header>

      <!-- Descrição principal -->
      <ui-card [elevated]="true">
        <div card-header>
          <h2>Sobre o Benefício</h2>
        </div>
        <div card-body>
          <p class="descricao-completa">{{ $any(beneficio).descricao }}</p>
          <p class="detalhes">{{ $any(beneficio).detalhes }}</p>
        </div>
      </ui-card>

      <!-- Informações financeiras -->
      <ui-card
        [elevated]="true"
        *ngIf="$any(beneficio).valorMensal || $any(beneficio).valorAnual"
      >
        <div card-header>
          <h2>💵 Valores</h2>
        </div>
        <div card-body>
          <div class="valor-row" *ngIf="$any(beneficio).valorMensal">
            <span class="valor-label">Valor Mensal:</span>
            <span class="valor-destaque">{{
              $any(beneficio).valorMensal | currency : 'BRL'
            }}</span>
          </div>
          <div class="valor-row" *ngIf="$any(beneficio).valorAnual">
            <span class="valor-label">Valor Anual:</span>
            <span class="valor-destaque">{{
              $any(beneficio).valorAnual | currency : 'BRL'
            }}</span>
          </div>
        </div>
      </ui-card>

      <!-- Elegibilidade -->
      <ui-card [elevated]="true">
        <div card-header>
          <h2>✅ Requisitos de Elegibilidade</h2>
        </div>
        <div card-body>
          <ul class="lista-elegibilidade">
            <li *ngFor="let item of $any(beneficio).elegibilidade">
              {{ item }}
            </li>
          </ul>
        </div>
      </ui-card>

      <!-- Documentos necessários -->
      <ui-card [elevated]="true">
        <div card-header>
          <h2>📄 Documentos Necessários</h2>
        </div>
        <div card-body>
          <ul class="lista-documentos">
            <li *ngFor="let doc of $any(beneficio).documentosNecessarios">
              {{ doc }}
            </li>
          </ul>
          <p class="info-prazo">
            <strong>Prazo de análise:</strong>
            {{ $any(beneficio).prazoAnalise }} dias úteis
          </p>
        </div>
      </ui-card>

      <!-- Regulamento -->
      <ui-card [elevated]="true" *ngIf="$any(beneficio).linkRegulamento">
        <div card-header>
          <h2>📋 Regulamento</h2>
        </div>
        <div card-body>
          <p>Leia o regulamento completo do benefício antes de solicitar.</p>
        </div>
        <div card-footer>
          <ui-button
            variant="outlined"
            fullWidth
            (click)="abrirRegulamento($any(beneficio).linkRegulamento!)"
          >
            📥 Baixar Regulamento (PDF)
          </ui-button>
        </div>
      </ui-card>

      <!-- Botão de ação -->
      <div class="action-bar">
        <ui-button variant="outlined" size="large" (click)="voltar()">
          Cancelar
        </ui-button>
        <ui-button
          variant="primary"
          size="large"
          (click)="abrirModalSolicitacao()"
          [disabled]="$any(beneficio).status !== 'ativo'"
        >
          Solicitar Benefício
        </ui-button>
      </div>

      <!-- Modal de confirmação -->
      <ui-modal
        [isOpen]="modalAberto"
        [title]="'Confirmar Solicitação'"
        size="md"
        (close)="fecharModal()"
      >
        <p>
          Você está prestes a solicitar o benefício
          <strong>{{ $any(beneficio).nome }}</strong
          >.
        </p>
        <p class="modal-info">
          Certifique-se de ter todos os documentos necessários em mãos. Após a
          solicitação, você receberá um e-mail com as próximas etapas.
        </p>
        <p class="modal-prazo">
          <strong>Prazo de análise:</strong> até
          {{ $any(beneficio).prazoAnalise }} dias úteis
        </p>

        <div modal-footer class="modal-actions">
          <ui-button variant="outlined" (click)="fecharModal()">
            Cancelar
          </ui-button>
          <ui-button
            variant="primary"
            (click)="confirmarSolicitacao($any(beneficio).id)"
          >
            Confirmar Solicitação
          </ui-button>
        </div>
      </ui-modal>
    </div>

    <!-- Loading state -->
    <div class="loading-state" *ngIf="!(beneficio$ | async)">
      <p>Carregando detalhes do benefício...</p>
    </div>
  `,
  styles: [
    `
      .detail-container {
        padding: var(--spacing-xl);
        max-width: 900px;
        margin: 0 auto;
      }

      .breadcrumb {
        margin-bottom: var(--spacing-lg);
      }

      .breadcrumb a {
        color: var(--color-primary);
        text-decoration: none;
        font-size: var(--fontSize-md);
        cursor: pointer;
        transition: color var(--transition-fast);
      }

      .breadcrumb a:hover {
        color: var(--color-primary-dark);
        text-decoration: underline;
      }

      .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--spacing-2xl);
        padding-bottom: var(--spacing-lg);
        border-bottom: 2px solid var(--color-border);
      }

      .header-content {
        display: flex;
        gap: var(--spacing-lg);
        align-items: center;
      }

      .beneficio-icone-large {
        font-size: 64px;
      }

      .header-text h1 {
        font-size: var(--fontSize-3xl);
        font-weight: var(--fontWeight-bold);
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-xs) 0;
      }

      .categoria {
        display: inline-block;
        padding: var(--spacing-xs) var(--spacing-md);
        background: var(--color-primary-10);
        color: var(--color-primary);
        border-radius: var(--radius-full);
        font-size: var(--fontSize-sm);
        font-weight: var(--fontWeight-medium);
        text-transform: uppercase;
      }

      .status-badge-large {
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: var(--radius-md);
        font-size: var(--fontSize-md);
        font-weight: var(--fontWeight-semibold);
        text-transform: uppercase;
      }

      .status-badge-large.ativo {
        background: var(--color-success-10);
        color: var(--color-success);
      }

      ui-card {
        margin-bottom: var(--spacing-lg);
      }

      ui-card h2 {
        font-size: var(--fontSize-xl);
        font-weight: var(--fontWeight-semibold);
        color: var(--color-text-primary);
        margin: 0;
      }

      .descricao-completa {
        font-size: var(--fontSize-lg);
        color: var(--color-text-primary);
        line-height: var(--lineHeight-relaxed);
        margin-bottom: var(--spacing-md);
      }

      .detalhes {
        color: var(--color-text-secondary);
        line-height: var(--lineHeight-relaxed);
      }

      .valor-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-md) 0;
        border-bottom: 1px solid var(--color-border);
      }

      .valor-row:last-child {
        border-bottom: none;
      }

      .valor-label {
        font-size: var(--fontSize-md);
        color: var(--color-text-secondary);
      }

      .valor-destaque {
        font-size: var(--fontSize-2xl);
        font-weight: var(--fontWeight-bold);
        color: var(--color-primary);
      }

      .lista-elegibilidade,
      .lista-documentos {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .lista-elegibilidade li,
      .lista-documentos li {
        padding: var(--spacing-sm) 0;
        padding-left: var(--spacing-lg);
        position: relative;
        color: var(--color-text-primary);
        line-height: var(--lineHeight-relaxed);
      }

      .lista-elegibilidade li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--color-success);
        font-weight: var(--fontWeight-bold);
      }

      .lista-documentos li::before {
        content: '📎';
        position: absolute;
        left: 0;
      }

      .info-prazo {
        margin-top: var(--spacing-lg);
        padding-top: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
        color: var(--color-text-secondary);
      }

      .action-bar {
        display: flex;
        gap: var(--spacing-md);
        justify-content: flex-end;
        margin-top: var(--spacing-2xl);
        padding-top: var(--spacing-lg);
        border-top: 2px solid var(--color-border);
      }

      .modal-info {
        color: var(--color-text-secondary);
        margin: var(--spacing-md) 0;
        line-height: var(--lineHeight-relaxed);
      }

      .modal-prazo {
        background: var(--color-warning-10);
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        border-left: 4px solid var(--color-warning);
        margin-top: var(--spacing-lg);
      }

      .modal-actions {
        display: flex;
        gap: var(--spacing-md);
        justify-content: flex-end;
        margin-top: var(--spacing-lg);
      }

      .loading-state {
        text-align: center;
        padding: var(--spacing-3xl);
        color: var(--color-text-secondary);
      }

      /* Mobile */
      @media (max-width: 768px) {
        .detail-container {
          padding: var(--spacing-lg);
        }

        .detail-header {
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .header-content {
          flex-direction: column;
          text-align: center;
        }

        .beneficio-icone-large {
          font-size: 48px;
        }

        .header-text h1 {
          font-size: var(--fontSize-2xl);
        }

        .action-bar {
          flex-direction: column;
        }

        .action-bar ui-button {
          width: 100%;
        }
      }
    `,
  ],
})
export class BeneficioDetailComponent implements OnInit {
  beneficio$!: Observable<Beneficio>;
  modalAberto = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private beneficiosService: BeneficiosService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.beneficio$ = this.route.params.pipe(
      switchMap((params) =>
        this.beneficiosService.getBeneficioById(params['id'])
      )
    );
  }

  voltar(): void {
    this.router.navigate(['/beneficios']);
  }

  getIcone(categoria: string): string {
    const icones: Record<string, string> = {
      saude: '🏥',
      educacao: '🎓',
      transporte: '🚌',
      alimentacao: '🍽️',
      previdencia: '💰',
      lazer: '🎯',
    };
    return icones[categoria] || '📋';
  }

  getCategoriaLabel(categoria: string): string {
    const labels: Record<string, string> = {
      saude: 'Saúde',
      educacao: 'Educação',
      transporte: 'Transporte',
      alimentacao: 'Alimentação',
      previdencia: 'Previdência',
      lazer: 'Lazer',
    };
    return labels[categoria] || categoria;
  }

  abrirRegulamento(url: string): void {
    window.open(url, '_blank');
  }

  abrirModalSolicitacao(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  confirmarSolicitacao(beneficioId: string): void {
    const dto = {
      beneficioId,
      colaboradorId: 'user-001', // Mock - em produção buscar do auth service
      observacoes: 'Solicitação via portal',
    };

    this.beneficiosService.criarSolicitacao(dto).subscribe({
      next: (solicitacao) => {
        this.toastService.success(
          'Solicitação enviada com sucesso!',
          `Protocolo: ${solicitacao.id}`
        );
        this.fecharModal();
        this.router.navigate(['/beneficios/minhas-solicitacoes']);
      },
      error: (error) => {
        this.toastService.error(
          'Erro ao enviar solicitação',
          error.message || 'Tente novamente'
        );
      },
    });
  }
}
