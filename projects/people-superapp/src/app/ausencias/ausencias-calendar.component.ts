import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TipoAusencia {
  id: string;
  nome: string;
  cor: string;
  categoria: 'dias' | 'ocorrencias';
}

interface Funcionario {
  id: number;
  matricula: string;
  nome: string;
  equipe: string;
}

interface Ausencia {
  id: number;
  funcionarioId: number;
  tipoId: string;
  dataInicio: Date;
  dataFim: Date;
  observacao?: string;
}

@Component({
  selector: 'app-ausencias-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ausencias-page">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">ESCALA DE TRABALHO E AUSÊNCIAS</h1>
        <div class="page-actions">
          <button class="btn btn--primary">
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            Solicitar
          </button>
        </div>
      </div>

      <!-- Subheader -->
      <div class="page-subheader">
        <span class="org-code">5640 - GEFUB - GN FUNCEF E BENEFÍCIOS</span>
      </div>

      <!-- Main Layout -->
      <div class="ausencias-layout">
        <!-- Sidebar - Legenda -->
        <aside class="legenda-sidebar">
          <div class="legenda-section">
            <h3 class="legenda-title">Dias</h3>
            <div class="legenda-item" *ngFor="let tipo of tiposDias">
              <span class="legenda-cor" [style.background]="tipo.cor"></span>
              <span class="legenda-nome">{{ tipo.nome }}</span>
            </div>
          </div>

          <div class="legenda-section">
            <h3 class="legenda-title">Ocorrências</h3>
            <div class="legenda-item" *ngFor="let tipo of tiposOcorrencias">
              <span class="legenda-cor" [style.background]="tipo.cor"></span>
              <span class="legenda-nome">{{ tipo.nome }}</span>
            </div>
          </div>
        </aside>

        <!-- Calendar Area -->
        <div class="calendar-area">
          <!-- Calendar Controls -->
          <div class="calendar-controls">
            <div class="control-group">
              <label>Mês / Ano</label>
              <div class="month-nav">
                <button class="nav-btn" (click)="mesAnterior()">
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
                <span class="month-display">{{ getMesAnoAtual() }}</span>
                <button class="nav-btn" (click)="proximoMes()">
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="control-group">
              <label>Equipe</label>
              <select class="form-select">
                <option>Todas</option>
                <option>GEFUB - Gerentes</option>
                <option>GEFUB - Staff</option>
                <option>GEFUB01 - Benefício FUNCEF</option>
                <option>GEFUB02 - Benefícios E GEFUB03</option>
              </select>
            </div>

            <button class="btn btn--outline">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
              Solicitar
            </button>
          </div>

          <!-- Calendar Grid -->
          <div class="calendar-container">
            <!-- Days Header -->
            <div class="calendar-header">
              <div class="calendar-col calendar-col--name">Funcionário</div>
              <div
                class="calendar-col calendar-col--day"
                *ngFor="let dia of diasDoMes"
                [class.weekend]="dia.ehFimDeSemana"
                [class.today]="dia.ehHoje"
                [class.holiday]="dia.ehFeriado"
              >
                {{ dia.diaNumero }}
              </div>
            </div>

            <!-- Teams and Employees -->
            <div class="calendar-body">
              <ng-container *ngFor="let equipe of equipesAgrupadas">
                <!-- Team Header -->
                <div class="team-row">
                  <div class="team-name">{{ equipe.nome }}</div>
                </div>

                <!-- Employee Rows -->
                <div
                  class="employee-row"
                  *ngFor="let func of equipe.funcionarios"
                >
                  <div class="employee-name">{{ func.nome }}</div>
                  <div class="employee-days">
                    <div
                      class="day-cell"
                      *ngFor="let dia of diasDoMes"
                      [class.weekend]="dia.ehFimDeSemana"
                      [class.today]="dia.ehHoje"
                    >
                      <ng-container
                        *ngIf="getAusenciaDia(func.id, dia.data) as ausencia"
                      >
                        <div
                          class="ausencia-marker"
                          [style.background]="getTipoCor(ausencia.tipoId)"
                          [title]="getTipoNome(ausencia.tipoId)"
                        >
                          {{ dia.diaNumero }}
                        </div>
                      </ng-container>
                    </div>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Tables -->
      <div class="summary-section">
        <div class="summary-table">
          <h3 class="summary-title">Ausentes hoje</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Empregado</th>
                <th>Motivo</th>
                <th>Obs.</th>
                <th>Início</th>
                <th>Fim</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of ausentesHoje">
                <td>{{ item.matricula }} - {{ item.nome }}</td>
                <td>{{ item.motivo }}</td>
                <td>{{ item.obs }}</td>
                <td>{{ item.inicio | date : 'dd/MM/yyyy' }}</td>
                <td>{{ item.fim | date : 'dd/MM/yyyy' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="summary-table">
          <h3 class="summary-title">
            Ausências iniciadas nos próximos 365 dias
          </h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Empregado</th>
                <th>Motivo</th>
                <th>Obs.</th>
                <th>Início</th>
                <th>Fim</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of ausenciasFuturas">
                <td>{{ item.matricula }} - {{ item.nome }}</td>
                <td>{{ item.motivo }}</td>
                <td>{{ item.obs }}</td>
                <td>{{ item.inicio | date : 'dd/MM/yyyy' }}</td>
                <td>{{ item.fim | date : 'dd/MM/yyyy' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* ===== AUSENCIAS PAGE - CSS PURO (SEM SASS) ===== */

      .ausencias-page {
        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 13px;
        color: #242424;
        background: transparent;
        min-height: calc(100vh - 140px);
        padding-bottom: 24px;
      }

      /* Page Header */
      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
      }

      .page-title {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #005ca9;
      }

      .page-subheader {
        margin-bottom: 16px;
      }

      .org-code {
        font-size: 14px;
        font-weight: 600;
        color: #242424;
      }

      /* Buttons */
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border: 1px solid transparent;
        font-family: inherit;
        font-size: 13px;
        font-weight: 400;
        cursor: pointer;
        transition: background 0.1s;
        border-radius: 0;
      }

      .btn svg {
        width: 14px;
        height: 14px;
      }

      .btn--primary {
        background: #005ca9;
        color: #fff;
        border-color: #005ca9;
      }

      .btn--primary:hover {
        background: #004578;
      }

      .btn--outline {
        background: #fff;
        color: #005ca9;
        border-color: #005ca9;
      }

      .btn--outline:hover {
        background: #deecf9;
      }

      /* Layout */
      .ausencias-layout {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
      }

      /* Legenda Sidebar */
      .legenda-sidebar {
        width: 200px;
        flex-shrink: 0;
        background: #fff;
        border: 1px solid #e1e1e1;
        padding: 12px;
        max-height: 500px;
        overflow-y: auto;
        border-radius: 0;
      }

      .legenda-section {
        margin-bottom: 16px;
      }

      .legenda-section:last-child {
        margin-bottom: 0;
      }

      .legenda-title {
        margin: 0 0 8px 0;
        font-size: 12px;
        font-weight: 600;
        color: #616161;
        text-transform: uppercase;
      }

      .legenda-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 0;
        font-size: 12px;
      }

      .legenda-cor {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
        border-radius: 2px;
      }

      .legenda-nome {
        color: #242424;
        line-height: 1.3;
      }

      /* Calendar Area */
      .calendar-area {
        flex: 1;
        min-width: 0;
      }

      .calendar-controls {
        display: flex;
        align-items: flex-end;
        gap: 16px;
        margin-bottom: 12px;
        padding: 12px;
        background: #fff;
        border: 1px solid #e1e1e1;
        border-radius: 0;
      }

      .control-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .control-group label {
        font-size: 12px;
        color: #616161;
      }

      .month-nav {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .nav-btn {
        width: 28px;
        height: 28px;
        padding: 0;
        border: 1px solid #d1d1d1;
        background: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0;
      }

      .nav-btn svg {
        width: 12px;
        height: 12px;
      }

      .nav-btn:hover {
        background: #f3f3f3;
      }

      .month-display {
        min-width: 120px;
        text-align: center;
        font-weight: 500;
      }

      .form-select {
        height: 28px;
        padding: 0 24px 0 8px;
        border: 1px solid #d1d1d1;
        background: #fff;
        font-family: inherit;
        font-size: 13px;
        min-width: 180px;
        border-radius: 0;
      }

      /* Calendar Container */
      .calendar-container {
        background: #fff;
        border: 1px solid #e1e1e1;
        overflow-x: auto;
        border-radius: 0;
      }

      .calendar-header {
        display: flex;
        background: #f3f3f3;
        border-bottom: 1px solid #e1e1e1;
        position: sticky;
        top: 0;
      }

      .calendar-col {
        flex-shrink: 0;
        text-align: center;
        font-size: 11px;
        font-weight: 500;
        padding: 6px 2px;
      }

      .calendar-col--name {
        width: 180px;
        text-align: left;
        padding-left: 12px;
        border-right: 1px solid #e1e1e1;
      }

      .calendar-col--day {
        width: 28px;
        color: #242424;
      }

      .calendar-col--day.weekend {
        background: #f9f9f9;
        color: #a0a0a0;
      }

      .calendar-col--day.today {
        background: #005ca9;
        color: #fff;
        font-weight: 600;
      }

      .calendar-col--day.holiday {
        color: #d13438;
      }

      .calendar-body {
        max-height: 400px;
        overflow-y: auto;
      }

      .team-row {
        background: #005ca9;
        color: #fff;
        padding: 6px 12px;
        font-weight: 600;
        font-size: 12px;
      }

      .team-name {
        text-transform: uppercase;
      }

      .employee-row {
        display: flex;
        border-bottom: 1px solid #f0f0f0;
      }

      .employee-row:hover {
        background: #fafafa;
      }

      .employee-name {
        width: 180px;
        padding: 4px 12px;
        font-size: 12px;
        border-right: 1px solid #e1e1e1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .employee-days {
        display: flex;
        flex: 1;
      }

      .day-cell {
        width: 28px;
        height: 24px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      }

      .day-cell.weekend {
        background: #fafafa;
      }

      .day-cell.today {
        background: #deecf9;
      }

      .ausencia-marker {
        width: 24px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 10px;
        font-weight: 500;
        border-radius: 2px;
      }

      /* Summary Section */
      .summary-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin-top: 24px;
        margin-bottom: 8px;
      }

      .summary-table {
        background: #fff;
        border: 1px solid #e1e1e1;
        border-radius: 0;
      }

      .summary-title {
        margin: 0;
        padding: 12px;
        font-size: 14px;
        font-weight: 600;
        background: #f3f3f3;
        border-bottom: 1px solid #e1e1e1;
      }

      .data-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }

      .data-table th,
      .data-table td {
        padding: 8px 12px;
        text-align: left;
        border-bottom: 1px solid #f0f0f0;
      }

      .data-table th {
        background: #fafafa;
        font-weight: 500;
        color: #616161;
      }

      .data-table tr:hover td {
        background: #f5f5f5;
      }

      /* Responsive */
      @media (max-width: 1200px) {
        .summary-section {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        .ausencias-layout {
          flex-direction: column;
        }

        .legenda-sidebar {
          width: 100%;
          max-height: none;
          display: flex;
          gap: 24px;
        }

        .legenda-section {
          flex: 1;
          margin-bottom: 0;
        }
      }
    `,
  ],
})
export class AusenciasCalendarComponent implements OnInit {
  mesAtual: Date = new Date();
  diasDoMes: any[] = [];

  // Tipos de ausência baseados na imagem real do sistema CAIXA
  tiposDias: TipoAusencia[] = [
    { id: 'fds', nome: 'Fim de semana', cor: '#e0e0e0', categoria: 'dias' },
    { id: 'feriado', nome: 'Feriado', cor: '#ff6b6b', categoria: 'dias' },
    { id: 'hoje', nome: 'Hoje', cor: '#4dabf7', categoria: 'dias' },
  ];

  tiposOcorrencias: TipoAusencia[] = [
    {
      id: 'acompanhamento',
      nome: 'Acompanhamento de Familiar ao médico',
      cor: '#868e96',
      categoria: 'ocorrencias',
    },
    { id: 'apip', nome: 'APIP', cor: '#495057', categoria: 'ocorrencias' },
    {
      id: 'jurado',
      nome: 'Atuação como jurado perante tribunal',
      cor: '#6c757d',
      categoria: 'ocorrencias',
    },
    {
      id: 'compensacao',
      nome: 'Compensação',
      cor: '#ffd43b',
      categoria: 'ocorrencias',
    },
    {
      id: 'dsr',
      nome: 'Descanso semanal remunerado',
      cor: '#69db7c',
      categoria: 'ocorrencias',
    },
    {
      id: 'destacamento',
      nome: 'Destacamento',
      cor: '#a9e34b',
      categoria: 'ocorrencias',
    },
    {
      id: 'doacao_sangue',
      nome: 'Doação de Sangue',
      cor: '#ff8787',
      categoria: 'ocorrencias',
    },
    {
      id: 'exames',
      nome: 'Exames preventivos',
      cor: '#ffa94d',
      categoria: 'ocorrencias',
    },
    { id: 'falta', nome: 'Falta', cor: '#ff6b6b', categoria: 'ocorrencias' },
    {
      id: 'feriado_local',
      nome: 'Feriado Local',
      cor: '#e599f7',
      categoria: 'ocorrencias',
    },
    { id: 'ferias', nome: 'Férias', cor: '#339af0', categoria: 'ocorrencias' },
    {
      id: 'folga_revezamento',
      nome: 'Folgas adquiridas na escala de revezamento',
      cor: '#20c997',
      categoria: 'ocorrencias',
    },
    {
      id: 'jogos_fenae',
      nome: 'Jogos FENAE',
      cor: '#845ef7',
      categoria: 'ocorrencias',
    },
    {
      id: 'justica_eleitoral',
      nome: 'Justiça Eleitoral',
      cor: '#5c7cfa',
      categoria: 'ocorrencias',
    },
    {
      id: 'licenca_adocao',
      nome: 'Licença Adoção',
      cor: '#f06595',
      categoria: 'ocorrencias',
    },
    {
      id: 'licenca_casamento',
      nome: 'Licença Casamento',
      cor: '#e64980',
      categoria: 'ocorrencias',
    },
    {
      id: 'licenca_maternidade',
      nome: 'Licença Maternidade',
      cor: '#be4bdb',
      categoria: 'ocorrencias',
    },
    {
      id: 'licenca_medica',
      nome: 'Licença Médica',
      cor: '#fa5252',
      categoria: 'ocorrencias',
    },
    {
      id: 'licenca_paternidade',
      nome: 'Licença Paternidade',
      cor: '#7950f2',
      categoria: 'ocorrencias',
    },
    {
      id: 'licenca_premio',
      nome: 'Licença Prêmio',
      cor: '#15aabf',
      categoria: 'ocorrencias',
    },
    {
      id: 'lip',
      nome: 'LIP - Licença Interesse Pessoal',
      cor: '#12b886',
      categoria: 'ocorrencias',
    },
    { id: 'luto', nome: 'Luto', cor: '#343a40', categoria: 'ocorrencias' },
    {
      id: 'outros',
      nome: 'Outros motivos normatizados',
      cor: '#adb5bd',
      categoria: 'ocorrencias',
    },
    {
      id: 'seminario',
      nome: 'Participação em seminário',
      cor: '#4c6ef5',
      categoria: 'ocorrencias',
    },
    {
      id: 'pcmso',
      nome: 'PCMSO de retorno',
      cor: '#fd7e14',
      categoria: 'ocorrencias',
    },
    {
      id: 'trabalho_remoto',
      nome: 'Trabalho Remoto',
      cor: '#228be6',
      categoria: 'ocorrencias',
    },
    {
      id: 'transito',
      nome: 'Trânsito',
      cor: '#40c057',
      categoria: 'ocorrencias',
    },
    {
      id: 'pretensao',
      nome: 'Pretensão',
      cor: '#f8f9fa',
      categoria: 'ocorrencias',
    },
  ];

  funcionarios: Funcionario[] = [
    {
      id: 1,
      matricula: 'C092184',
      nome: 'Andres DAlessandro',
      equipe: 'GEFUB - Staff',
    },
    {
      id: 2,
      matricula: 'C083941',
      nome: 'Diego Ribas',
      equipe: 'GEFUB - Staff',
    },
    {
      id: 3,
      matricula: 'C096381',
      nome: 'Mariazinha dos Santos',
      equipe: 'GEFUB01 - Benefício FUNCEF',
    },
    {
      id: 4,
      matricula: 'C057246',
      nome: 'Riquelme camisa dez',
      equipe: 'GEFUB - Gerentes',
    },
    {
      id: 5,
      matricula: 'C096870',
      nome: 'Ronaldo Nazario de Lima',
      equipe: 'GEFUB - Gerentes',
    },
    {
      id: 6,
      matricula: 'C062875',
      nome: 'Gabigol',
      equipe: 'GEFUB01 - Benefício FUNCEF',
    },
    {
      id: 7,
      matricula: 'C150216',
      nome: 'Romarinho',
      equipe: 'GEFUB02 - Benefícios E GEFUB03',
    },
    {
      id: 8,
      matricula: 'C096184',
      nome: 'Ronaldinho Gaucho',
      equipe: 'GEFUB02 - Benefícios E GEFUB03',
    },
  ];

  ausencias: Ausencia[] = [
    {
      id: 1,
      funcionarioId: 1,
      tipoId: 'trabalho_remoto',
      dataInicio: new Date(2025, 11, 12),
      dataFim: new Date(2025, 11, 12),
    },
    {
      id: 2,
      funcionarioId: 2,
      tipoId: 'trabalho_remoto',
      dataInicio: new Date(2025, 11, 12),
      dataFim: new Date(2025, 11, 16),
    },
    {
      id: 3,
      funcionarioId: 4,
      tipoId: 'ferias',
      dataInicio: new Date(2025, 11, 15),
      dataFim: new Date(2025, 11, 23),
    },
    {
      id: 4,
      funcionarioId: 5,
      tipoId: 'ferias',
      dataInicio: new Date(2025, 11, 15),
      dataFim: new Date(2025, 11, 24),
    },
    {
      id: 5,
      funcionarioId: 6,
      tipoId: 'compensacao',
      dataInicio: new Date(2025, 11, 16),
      dataFim: new Date(2025, 11, 16),
    },
    {
      id: 6,
      funcionarioId: 7,
      tipoId: 'trabalho_remoto',
      dataInicio: new Date(2025, 11, 19),
      dataFim: new Date(2025, 11, 31),
    },
    {
      id: 7,
      funcionarioId: 8,
      tipoId: 'trabalho_remoto',
      dataInicio: new Date(2025, 11, 22),
      dataFim: new Date(2025, 11, 31),
    },
  ];

  ausentesHoje = [
    {
      matricula: 'C123456',
      nome: 'PAULA FERNANDES',
      motivo: 'Licença Maternidade',
      obs: '',
      inicio: new Date(2025, 9, 18),
      fim: new Date(2026, 1, 15),
    },
    {
      matricula: 'C509216',
      nome: 'ZEZE DE CAMARGO E LUCIANO',
      motivo: 'Férias',
      obs: '',
      inicio: new Date(2025, 11, 8),
      fim: new Date(2025, 11, 12),
    },
    {
      matricula: 'C486123',
      nome: 'BONO VOX',
      motivo: 'Férias',
      obs: '',
      inicio: new Date(2025, 11, 8),
      fim: new Date(2025, 11, 12),
    },
  ];

  ausenciasFuturas = [
    {
      matricula: 'C092184',
      nome: 'DANIELE HYPOLITO',
      motivo: 'Trabalho Remoto',
      obs: '',
      inicio: new Date(2025, 11, 12),
      fim: new Date(2025, 11, 12),
    },
    {
      matricula: 'C083941',
      nome: 'GEORGIAN DARRASCAETA',
      motivo: 'Trabalho Remoto',
      obs: '',
      inicio: new Date(2025, 11, 12),
      fim: new Date(2025, 11, 16),
    },
    {
      matricula: 'C057246',
      nome: 'CRAQUE NETO',
      motivo: 'Férias',
      obs: '',
      inicio: new Date(2025, 11, 15),
      fim: new Date(2025, 11, 23),
    },
  ];

  get equipesAgrupadas() {
    const grupos: { [key: string]: Funcionario[] } = {};
    this.funcionarios.forEach((f) => {
      if (!grupos[f.equipe]) grupos[f.equipe] = [];
      grupos[f.equipe].push(f);
    });
    return Object.keys(grupos).map((nome) => ({
      nome,
      funcionarios: grupos[nome],
    }));
  }

  ngOnInit(): void {
    this.gerarDiasDoMes();
  }

  gerarDiasDoMes(): void {
    const ano = this.mesAtual.getFullYear();
    const mes = this.mesAtual.getMonth();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const hoje = new Date();

    this.diasDoMes = [];
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = new Date(ano, mes, dia);
      this.diasDoMes.push({
        data,
        diaNumero: dia,
        ehHoje: data.toDateString() === hoje.toDateString(),
        ehFimDeSemana: data.getDay() === 0 || data.getDay() === 6,
        ehFeriado: false,
      });
    }
  }

  getMesAnoAtual(): string {
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    return `${
      meses[this.mesAtual.getMonth()]
    } / ${this.mesAtual.getFullYear()}`;
  }

  mesAnterior(): void {
    this.mesAtual = new Date(
      this.mesAtual.getFullYear(),
      this.mesAtual.getMonth() - 1,
      1
    );
    this.gerarDiasDoMes();
  }

  proximoMes(): void {
    this.mesAtual = new Date(
      this.mesAtual.getFullYear(),
      this.mesAtual.getMonth() + 1,
      1
    );
    this.gerarDiasDoMes();
  }

  getAusenciaDia(funcionarioId: number, data: Date): Ausencia | null {
    return (
      this.ausencias.find(
        (a) =>
          a.funcionarioId === funcionarioId &&
          data >= a.dataInicio &&
          data <= a.dataFim
      ) || null
    );
  }

  getTipoCor(tipoId: string): string {
    const tipo = [...this.tiposDias, ...this.tiposOcorrencias].find(
      (t) => t.id === tipoId
    );
    return tipo?.cor || '#888';
  }

  getTipoNome(tipoId: string): string {
    const tipo = [...this.tiposDias, ...this.tiposOcorrencias].find(
      (t) => t.id === tipoId
    );
    return tipo?.nome || tipoId;
  }
}
