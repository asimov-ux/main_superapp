import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  InputComponent,
  CardComponent,
  ModalComponent,
  ListComponent,
  ToolbarComponent,
  ToastContainerComponent,
  ToastService,
  ListColumn,
  ToolbarAction,
} from '@superapp/ui-widgets';

interface Pessoa {
  id: number;
  nome: string;
  cargo: string;
  email: string;
  status: 'Ativo' | 'Inativo';
}

@Component({
  selector: 'app-demo-widgets',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
    ModalComponent,
    ListComponent,
    ToolbarComponent,
    ToastContainerComponent,
  ],
  template: `
    <!-- Toast Container (necessário para notificações) -->
    <ui-toast-container position="top-right"></ui-toast-container>

    <!-- Toolbar -->
    <ui-toolbar
      brandName="Super App Pessoas - CAIXA"
      [leftActions]="acoesEsquerda"
      [rightActions]="acoesDireita"
      (actionClick)="onToolbarAction($event)"
    ></ui-toolbar>

    <div class="container">
      <h1>Demo de Widgets - Cores da Caixa</h1>

      <!-- Seção: Botões -->
      <section class="section">
        <h2>Botões</h2>
        <div class="button-grid">
          <ui-button variant="primary">Primary (Verde)</ui-button>
          <ui-button variant="secondary">Secondary (Laranja)</ui-button>
          <ui-button variant="outlined">Outlined (Azul)</ui-button>
          <ui-button variant="ghost">Ghost</ui-button>
          <ui-button variant="primary" size="sm">Small</ui-button>
          <ui-button variant="primary" size="lg">Large</ui-button>
          <ui-button variant="primary" [disabled]="true">Disabled</ui-button>
        </div>
      </section>

      <!-- Seção: Inputs -->
      <section class="section">
        <h2>Campos de Input</h2>
        <div class="input-grid">
          <ui-input
            label="Nome completo"
            placeholder="Digite seu nome"
            [required]="true"
          ></ui-input>

          <ui-input
            label="E-mail"
            type="email"
            hint="Será usado para notificações"
          ></ui-input>

          <ui-input label="CPF" [error]="'CPF inválido'"></ui-input>

          <ui-input label="Campo desabilitado" [disabled]="true"></ui-input>
        </div>
      </section>

      <!-- Seção: Cards -->
      <section class="section">
        <h2>Cards</h2>
        <div class="card-grid">
          <ui-card title="Card Simples" subtitle="Com título e subtítulo">
            <p>Conteúdo do card aqui. Usando 100% tokens da Caixa.</p>
          </ui-card>

          <ui-card title="Card Elevado" [elevated]="true" [hasFooter]="true">
            <p>Card com sombra e footer de ações.</p>
            <div card-actions>
              <ui-button variant="outlined" size="sm">Cancelar</ui-button>
              <ui-button variant="primary" size="sm">Confirmar</ui-button>
            </div>
          </ui-card>

          <ui-card
            title="Card Interativo"
            subtitle="Clique para testar"
            [interactive]="true"
            [elevated]="true"
            (click)="abrirModal()"
          >
            <p>Hover e clique para ver o efeito.</p>
          </ui-card>
        </div>
      </section>

      <!-- Seção: Lista -->
      <section class="section">
        <h2>Lista de Pessoas</h2>
        <ui-list
          [items]="pessoas"
          [columns]="colunas"
          [striped]="true"
          [hoverable]="true"
          (rowClick)="onPessoaClick($event)"
          (sort)="onSort($event)"
        ></ui-list>
      </section>

      <!-- Seção: Notificações -->
      <section class="section">
        <h2>Notificações (Toast)</h2>
        <div class="button-grid">
          <ui-button variant="primary" (click)="mostrarSuccess()">
            Success
          </ui-button>
          <ui-button variant="secondary" (click)="mostrarWarning()">
            Warning
          </ui-button>
          <ui-button variant="outlined" (click)="mostrarError()">
            Error
          </ui-button>
          <ui-button variant="ghost" (click)="mostrarInfo()"> Info </ui-button>
        </div>
      </section>
    </div>

    <!-- Modal -->
    <ui-modal
      [isOpen]="modalAberto"
      title="Detalhes da Pessoa"
      size="md"
      [hasFooter]="true"
      (modalClose)="fecharModal()"
    >
      <div *ngIf="pessoaSelecionada">
        <p><strong>Nome:</strong> {{ pessoaSelecionada.nome }}</p>
        <p><strong>Cargo:</strong> {{ pessoaSelecionada.cargo }}</p>
        <p><strong>E-mail:</strong> {{ pessoaSelecionada.email }}</p>
        <p><strong>Status:</strong> {{ pessoaSelecionada.status }}</p>
      </div>

      <div modal-footer>
        <ui-button variant="outlined" (click)="fecharModal()">Fechar</ui-button>
        <ui-button variant="primary">Editar</ui-button>
      </div>
    </ui-modal>
  `,
  styles: [
    `
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--spacing-lg);
      }

      h1 {
        color: var(--color-brand);
        margin-bottom: var(--spacing-2xl);
      }

      h2 {
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-lg);
        border-bottom: 2px solid var(--color-border);
        padding-bottom: var(--spacing-sm);
      }

      .section {
        margin-bottom: var(--spacing-2xl);
      }

      .button-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-md);
      }

      .input-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-lg);
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--spacing-lg);
      }

      @media (max-width: 640px) {
        .container {
          padding: var(--spacing-md);
        }

        .card-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class DemoWidgetsComponent {
  modalAberto = false;
  pessoaSelecionada: Pessoa | null = null;

  // Toolbar actions
  acoesEsquerda: ToolbarAction[] = [
    { id: 'menu', label: 'Menu', icon: 'menu' },
  ];

  acoesDireita: ToolbarAction[] = [
    {
      id: 'notifications',
      label: 'Notificações',
      icon: 'notifications',
      badge: 3,
    },
    { id: 'settings', label: 'Configurações', icon: 'settings' },
    { id: 'user', label: 'Perfil', icon: 'user' },
  ];

  // Lista de pessoas
  colunas: ListColumn<Pessoa>[] = [
    { key: 'nome', label: 'Nome', sortable: true, width: '30%' },
    { key: 'cargo', label: 'Cargo', sortable: true, width: '25%' },
    { key: 'email', label: 'E-mail', width: '30%' },
    { key: 'status', label: 'Status', sortable: true, width: '15%' },
  ];

  pessoas: Pessoa[] = [
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Gerente',
      email: 'joao.silva@caixa.gov.br',
      status: 'Ativo',
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cargo: 'Analista',
      email: 'maria.santos@caixa.gov.br',
      status: 'Ativo',
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      cargo: 'Coordenador',
      email: 'pedro.costa@caixa.gov.br',
      status: 'Inativo',
    },
    {
      id: 4,
      nome: 'Ana Oliveira',
      cargo: 'Assistente',
      email: 'ana.oliveira@caixa.gov.br',
      status: 'Ativo',
    },
  ];

  constructor(private toastService: ToastService) {}

  onToolbarAction(action: ToolbarAction): void {
    console.log('Toolbar action:', action.id);
    this.toastService.info(`Ação: ${action.label}`, 'Toolbar');
  }

  onPessoaClick(pessoa: Pessoa): void {
    this.pessoaSelecionada = pessoa;
    this.abrirModal();
  }

  onSort(event: { key: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort:', event);
    this.toastService.info(
      `Ordenando por ${event.key} (${event.direction})`,
      'Ordenação'
    );
  }

  abrirModal(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  mostrarSuccess(): void {
    this.toastService.success('Operação realizada com sucesso!', 'Sucesso');
  }

  mostrarWarning(): void {
    this.toastService.warning(
      'Atenção: verifique os dados antes de continuar.',
      'Aviso'
    );
  }

  mostrarError(): void {
    this.toastService.error('Erro ao processar a solicitação.', 'Erro', 10000);
  }

  mostrarInfo(): void {
    this.toastService.info('Processamento em andamento...', 'Informação');
  }
}
