import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  PeopleService,
  Person,
  PeopleResponse,
} from '../services/people.service';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="people-container">
      <!-- Header -->
      <div class="page-header">
        <h1>Listagem de Pessoas</h1>
        <span class="total-badge">Total: {{ total }} pessoas</span>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="loading-state">
        <div class="spinner"></div>
        <span>Carregando...</span>
      </div>

      <!-- Error -->
      <div *ngIf="error" class="error-state">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
          />
        </svg>
        <span>{{ error }}</span>
      </div>

      <!-- Table -->
      <div *ngIf="!loading && !error" class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th class="col-name">Nome</th>
              <th class="col-cargo">Cargo</th>
              <th class="col-unidade">Unidade</th>
              <th class="col-status">Status</th>
              <th class="col-actions">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let person of people" class="data-row">
              <td class="col-name">
                <span class="person-name">{{ person.nome }}</span>
              </td>
              <td class="col-cargo">
                <span class="tag tag-cargo">{{ person.cargo }}</span>
              </td>
              <td class="col-unidade">
                <span class="tag tag-unidade">{{ person.unidade }}</span>
              </td>
              <td class="col-status">
                <span
                  class="status-badge"
                  [class.active]="person.ativo"
                  [class.inactive]="!person.ativo"
                >
                  <svg
                    *ngIf="person.ativo"
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022z"
                    />
                  </svg>
                  <svg
                    *ngIf="!person.ativo"
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                  {{ person.ativo ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
              <td class="col-actions">
                <a [routerLink]="['/people', person.id]" class="btn-action">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path
                      d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                    />
                  </svg>
                  Ver detalhes
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      .people-container {
        padding: 24px;
        font-family: 'Segoe UI', -apple-system, sans-serif;
        background: var(--color-surface, #f5f5f5);
        min-height: calc(100vh - 100px);
      }

      .page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      h1 {
        font-size: 20px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0;
      }

      .total-badge {
        font-size: 12px;
        color: #666;
        background: #fff;
        padding: 6px 12px;
        border: 1px solid #e0e0e0;
      }

      /* Loading & Error States */
      .loading-state,
      .error-state {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 40px;
        background: #fff;
        border: 1px solid #e0e0e0;
      }

      .loading-state {
        color: #005ca9;
      }

      .error-state {
        color: #c62828;
      }

      .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #e0e0e0;
        border-top-color: #005ca9;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* Table */
      .table-container {
        background: #fff;
        border: 1px solid #e0e0e0;
        overflow-x: auto;
      }

      .data-table {
        width: 100%;
        border-collapse: collapse;
      }

      .data-table th {
        background: #f8f9fa;
        padding: 10px 16px;
        text-align: left;
        font-size: 11px;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 1px solid #e0e0e0;
      }

      .data-table td {
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
        font-size: 13px;
      }

      .data-row:hover {
        background: #f8f9fa;
      }

      .data-row:last-child td {
        border-bottom: none;
      }

      .col-name {
        min-width: 180px;
      }

      .col-cargo,
      .col-unidade {
        min-width: 120px;
      }

      .col-status {
        min-width: 100px;
      }

      .col-actions {
        min-width: 120px;
        text-align: right;
      }

      .person-name {
        font-weight: 600;
        color: #1a1a1a;
      }

      .tag {
        display: inline-block;
        padding: 4px 8px;
        font-size: 11px;
        background: #f5f5f5;
        color: #666;
      }

      .tag-cargo {
        background: #e3f2fd;
        color: #1565c0;
      }

      .tag-unidade {
        background: #f3e5f5;
        color: #7b1fa2;
      }

      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 500;
      }

      .status-badge.active {
        background: #e8f5e9;
        color: #2e7d32;
      }

      .status-badge.inactive {
        background: #ffebee;
        color: #c62828;
      }

      .btn-action {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: #005ca9;
        color: #fff;
        text-decoration: none;
        font-size: 11px;
        font-weight: 500;
        transition: background 0.15s;
      }

      .btn-action:hover {
        background: #004080;
      }

      @media (max-width: 768px) {
        .people-container {
          padding: 16px;
        }

        .page-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .data-table th,
        .data-table td {
          padding: 10px 12px;
        }
      }
    `,
  ],
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  total = 0;
  loading = true;
  error: string | null = null;

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  private loadPeople(): void {
    console.log('🔍 Iniciando carregamento do mock...');
    this.loading = true;
    this.error = null;

    this.peopleService.getPeople().subscribe({
      next: (response: PeopleResponse) => {
        console.log('✅ Mock carregado com sucesso:', response);
        this.people = response.items;
        this.total = response.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erro ao carregar mock:', err);
        this.error = err.message || 'Erro desconhecido';
        this.loading = false;
      },
    });
  }
}
