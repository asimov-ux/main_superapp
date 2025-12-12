import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">Painel de Controle</h1>
        <div class="page-meta">
          <span class="page-date">{{ dataAtual }}</span>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card" *ngFor="let kpi of kpis">
          <div class="kpi-header">
            <span class="kpi-label">{{ kpi.label }}</span>
            <span
              class="kpi-trend"
              [class.positive]="kpi.trend > 0"
              [class.negative]="kpi.trend < 0"
            >
              {{ kpi.trend > 0 ? '+' : '' }}{{ kpi.trend }}%
            </span>
          </div>
          <div class="kpi-value">{{ kpi.value }}</div>
          <div class="kpi-footer">
            <span class="kpi-comparison">vs. mês anterior</span>
          </div>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="content-grid">
        <!-- Ausências por Tipo -->
        <div class="panel">
          <div class="panel-header">
            <h2 class="panel-title">Ausências por Tipo (Mês Atual)</h2>
          </div>
          <div class="panel-body">
            <div class="bar-chart">
              <div class="bar-item" *ngFor="let item of ausenciasPorTipo">
                <div class="bar-label">{{ item.label }}</div>
                <div class="bar-track">
                  <div
                    class="bar-fill"
                    [style.width.%]="item.percent"
                    [style.background]="item.color"
                  ></div>
                </div>
                <div class="bar-value">{{ item.value }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Status da Equipe -->
        <div class="panel">
          <div class="panel-header">
            <h2 class="panel-title">Status da Equipe Hoje</h2>
          </div>
          <div class="panel-body">
            <div class="status-grid">
              <div class="status-item" *ngFor="let status of statusEquipe">
                <div class="status-value" [style.color]="status.color">
                  {{ status.value }}
                </div>
                <div class="status-label">{{ status.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Atividades Recentes -->
        <div class="panel">
          <div class="panel-header">
            <h2 class="panel-title">Atividades Recentes</h2>
          </div>
          <div class="panel-body panel-body--list">
            <div class="activity-item" *ngFor="let activity of atividades">
              <div class="activity-icon" [style.background]="activity.color">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path [attr.d]="activity.icon" />
                </svg>
              </div>
              <div class="activity-content">
                <div class="activity-text">{{ activity.text }}</div>
                <div class="activity-meta">
                  {{ activity.user }} • {{ activity.time }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Próximos Eventos -->
        <div class="panel">
          <div class="panel-header">
            <h2 class="panel-title">Próximos Eventos</h2>
          </div>
          <div class="panel-body panel-body--list">
            <div class="event-item" *ngFor="let event of eventos">
              <div class="event-date">
                <div class="event-day">{{ event.day }}</div>
                <div class="event-month">{{ event.month }}</div>
              </div>
              <div class="event-content">
                <div class="event-title">{{ event.title }}</div>
                <div class="event-desc">{{ event.description }}</div>
              </div>
              <div class="event-badge" [style.background]="event.badgeColor">
                {{ event.badge }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Ações Rápidas</h2>
        </div>
        <div class="panel-body">
          <div class="actions-row">
            <button class="action-btn" routerLink="/people">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
              Nova Pessoa
            </button>
            <button class="action-btn" routerLink="/ausencias">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z"
                />
              </svg>
              Registrar Ausência
            </button>
            <button class="action-btn" routerLink="/beneficios">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h-5a.5.5 0 0 0 0 1h5v5a.5.5 0 0 0 1 0v-5h4.5a.5.5 0 0 0 0-1h-4.5V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h4.5z"
                />
              </svg>
              Novo Benefício
            </button>
            <button class="action-btn">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM9 4a1 1 0 0 1-1-1V1.5L13.5 6H10a1 1 0 0 1-1-1V4z"
                />
              </svg>
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        font-family: 'Segoe UI', sans-serif;
        font-size: 13px;
        color: #242424;
      }

      /* Page Header */
      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .page-title {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #242424;
      }

      .page-date {
        font-size: 12px;
        color: #616161;
      }

      /* KPI Grid */
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 16px;
      }

      .kpi-card {
        background: #fff;
        border: 1px solid #e1e1e1;
        padding: 16px;
      }

      .kpi-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .kpi-label {
        font-size: 12px;
        color: #616161;
      }

      .kpi-trend {
        font-size: 11px;
        font-weight: 500;
        padding: 2px 6px;
        background: #f3f3f3;

        &.positive {
          color: #107c10;
          background: #dff6dd;
        }

        &.negative {
          color: #d13438;
          background: #fde7e9;
        }
      }

      .kpi-value {
        font-size: 32px;
        font-weight: 600;
        color: #242424;
        line-height: 1;
      }

      .kpi-footer {
        margin-top: 8px;
      }

      .kpi-comparison {
        font-size: 11px;
        color: #888;
      }

      /* Content Grid */
      .content-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 16px;
      }

      /* Panel */
      .panel {
        background: #fff;
        border: 1px solid #e1e1e1;
      }

      .panel-header {
        padding: 12px 16px;
        border-bottom: 1px solid #e1e1e1;
        background: #fafafa;
      }

      .panel-title {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: #242424;
      }

      .panel-body {
        padding: 16px;
      }

      .panel-body--list {
        padding: 0;
      }

      /* Bar Chart */
      .bar-chart {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .bar-item {
        display: grid;
        grid-template-columns: 100px 1fr 40px;
        align-items: center;
        gap: 12px;
      }

      .bar-label {
        font-size: 12px;
        color: #424242;
      }

      .bar-track {
        height: 20px;
        background: #f3f3f3;
      }

      .bar-fill {
        height: 100%;
      }

      .bar-value {
        font-size: 13px;
        font-weight: 600;
        text-align: right;
      }

      /* Status Grid */
      .status-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        text-align: center;
      }

      .status-item {
        padding: 12px;
      }

      .status-value {
        font-size: 28px;
        font-weight: 600;
        line-height: 1;
      }

      .status-label {
        font-size: 11px;
        color: #616161;
        margin-top: 4px;
      }

      /* Activity List */
      .activity-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background: #fafafa;
        }
      }

      .activity-icon {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        flex-shrink: 0;

        svg {
          width: 14px;
          height: 14px;
        }
      }

      .activity-content {
        flex: 1;
        min-width: 0;
      }

      .activity-text {
        font-size: 13px;
        color: #242424;
      }

      .activity-meta {
        font-size: 11px;
        color: #888;
        margin-top: 2px;
      }

      /* Event List */
      .event-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background: #fafafa;
        }
      }

      .event-date {
        width: 40px;
        text-align: center;
        flex-shrink: 0;
      }

      .event-day {
        font-size: 18px;
        font-weight: 600;
        color: var(--color-primary-90, #005ca9);
        line-height: 1;
      }

      .event-month {
        font-size: 10px;
        color: #888;
        text-transform: uppercase;
      }

      .event-content {
        flex: 1;
        min-width: 0;
      }

      .event-title {
        font-size: 13px;
        color: #242424;
      }

      .event-desc {
        font-size: 11px;
        color: #888;
      }

      .event-badge {
        font-size: 10px;
        font-weight: 500;
        padding: 3px 8px;
        color: #fff;
        text-transform: uppercase;
      }

      /* Actions Row */
      .actions-row {
        display: flex;
        gap: 12px;
      }

      .action-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border: 1px solid #d1d1d1;
        background: #fff;
        font-family: inherit;
        font-size: 13px;
        color: #242424;
        cursor: pointer;
        transition: all 0.1s;

        svg {
          width: 14px;
          height: 14px;
          color: var(--color-primary-90, #005ca9);
        }

        &:hover {
          background: var(--color-primary-10, #deecf9);
          border-color: var(--color-primary-90, #005ca9);
        }
      }

      /* Responsive */
      @media (max-width: 1200px) {
        .kpi-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .content-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        .kpi-grid {
          grid-template-columns: 1fr;
        }

        .status-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .actions-row {
          flex-wrap: wrap;
        }
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  dataAtual = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  kpis = [
    { label: 'Total de Funcionários', value: '156', trend: 8 },
    { label: 'Ausências Este Mês', value: '23', trend: -12 },
    { label: 'Benefícios Ativos', value: '12', trend: 5 },
    { label: 'Solicitações Pendentes', value: '7', trend: 0 },
  ];

  ausenciasPorTipo = [
    { label: 'Férias', value: 8, percent: 80, color: '#339af0' },
    { label: 'Lic. Médica', value: 5, percent: 50, color: '#fa5252' },
    { label: 'Folga', value: 6, percent: 60, color: '#40c057' },
    { label: 'Trab. Remoto', value: 3, percent: 30, color: '#228be6' },
    { label: 'Outros', value: 1, percent: 10, color: '#868e96' },
  ];

  statusEquipe = [
    { label: 'Presentes', value: 128, color: '#107c10' },
    { label: 'Ausentes', value: 12, color: '#d13438' },
    { label: 'Férias', value: 8, color: '#339af0' },
    { label: 'Home Office', value: 8, color: '#5c2d91' },
  ];

  atividades = [
    {
      text: 'Maria Silva solicitou férias para Janeiro',
      user: 'Maria Silva',
      time: 'há 2 horas',
      color: '#339af0',
      icon: 'M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z',
    },
    {
      text: 'Novo colaborador cadastrado: João Santos',
      user: 'Admin',
      time: 'há 4 horas',
      color: '#107c10',
      icon: 'M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z',
    },
    {
      text: 'Benefício "Vale Alimentação" atualizado',
      user: 'RH',
      time: 'ontem',
      color: '#ff8c00',
      icon: 'M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z',
    },
    {
      text: 'Dados de Carlos Pereira atualizados',
      user: 'Carlos Pereira',
      time: 'ontem',
      color: '#5c2d91',
      icon: 'M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3z',
    },
  ];

  eventos = [
    {
      day: '15',
      month: 'Dez',
      title: 'Férias - Maria Silva',
      description: 'Retorno previsto: 30/12',
      badge: 'Férias',
      badgeColor: '#339af0',
    },
    {
      day: '18',
      month: 'Dez',
      title: 'Reunião de Equipe',
      description: 'Planejamento Q1 2026',
      badge: 'Reunião',
      badgeColor: '#ff8c00',
    },
    {
      day: '22',
      month: 'Dez',
      title: 'Treinamento Angular',
      description: 'Workshop para desenvolvedores',
      badge: 'Treino',
      badgeColor: '#107c10',
    },
  ];

  ngOnInit(): void {}
}
