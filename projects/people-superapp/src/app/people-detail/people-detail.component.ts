import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PeopleService, Person } from '../services/people.service';

@Component({
  selector: 'app-people-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="detail-container">
      <div *ngIf="loading" class="loading">Carregando detalhes...</div>

      <div *ngIf="error" class="error">
        <h2>Erro</h2>
        <p>{{ error }}</p>
        <button class="btn-back" routerLink="/people">
          ← Voltar para listagem
        </button>
      </div>

      <div *ngIf="!loading && !error && !person" class="not-found">
        <h2>Pessoa não encontrada</h2>
        <p>O ID "{{ personId }}" não existe no sistema.</p>
        <button class="btn-back" routerLink="/people">
          ← Voltar para listagem
        </button>
      </div>

      <div *ngIf="!loading && !error && person" class="person-detail">
        <div class="header">
          <button class="btn-back" routerLink="/people">← Voltar</button>
          <h1>Detalhes da Pessoa</h1>
        </div>

        <div class="card">
          <div class="card-header">
            <h2>{{ person.nome }}</h2>
            <span
              class="status-badge"
              [class.active]="person.ativo"
              [class.inactive]="!person.ativo"
            >
              {{ person.ativo ? 'Ativo' : 'Inativo' }}
            </span>
          </div>

          <div class="card-body">
            <div class="info-row">
              <span class="label">ID:</span>
              <span class="value">{{ person.id }}</span>
            </div>

            <div class="info-row">
              <span class="label">Nome:</span>
              <span class="value">{{ person.nome }}</span>
            </div>

            <div class="info-row" *ngIf="person.cargo">
              <span class="label">Cargo:</span>
              <span class="value">{{ person.cargo }}</span>
            </div>

            <div class="info-row" *ngIf="person.unidade">
              <span class="label">Unidade:</span>
              <span class="value">{{ person.unidade }}</span>
            </div>

            <div class="info-row">
              <span class="label">Status:</span>
              <span class="value">
                {{ person.ativo ? 'Ativo' : 'Inativo' }}
              </span>
            </div>
          </div>

          <div class="card-footer">
            <button class="btn-secondary" routerLink="/people">Cancelar</button>
            <button class="btn-primary" (click)="onEdit()">Editar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .detail-container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }

      .loading,
      .error,
      .not-found {
        padding: 40px;
        text-align: center;
        border-radius: 8px;
        margin: 20px 0;
      }

      .loading {
        background: #e3f2fd;
        color: #1976d2;
        font-size: 1.2rem;
      }

      .error {
        background: #ffebee;
        color: #c62828;
      }

      .error h2 {
        margin-top: 0;
      }

      .not-found {
        background: #fff3e0;
        color: #e65100;
      }

      .not-found h2 {
        margin-top: 0;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
      }

      .header h1 {
        margin: 0;
        font-size: 2rem;
        color: #333;
      }

      .btn-back {
        padding: 10px 20px;
        background: #6c757d;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.2s;
      }

      .btn-back:hover {
        background: #5a6268;
      }

      .card {
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .card-header {
        padding: 30px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .card-header h2 {
        margin: 0;
        font-size: 1.8rem;
      }

      .status-badge {
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.9rem;
      }

      .status-badge.active {
        background: #d4edda;
        color: #155724;
      }

      .status-badge.inactive {
        background: #f8d7da;
        color: #721c24;
      }

      .card-body {
        padding: 30px;
      }

      .info-row {
        display: flex;
        padding: 15px 0;
        border-bottom: 1px solid #f0f0f0;
      }

      .info-row:last-child {
        border-bottom: none;
      }

      .label {
        flex: 0 0 150px;
        font-weight: 600;
        color: #666;
      }

      .value {
        flex: 1;
        color: #333;
        font-size: 1.05rem;
      }

      .card-footer {
        padding: 20px 30px;
        background: #f8f9fa;
        display: flex;
        justify-content: flex-end;
        gap: 15px;
      }

      .btn-primary,
      .btn-secondary {
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-primary {
        background: #0055ff;
        color: white;
      }

      .btn-primary:hover {
        background: #0044cc;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 85, 255, 0.3);
      }

      .btn-secondary {
        background: white;
        color: #666;
        border: 2px solid #ddd;
      }

      .btn-secondary:hover {
        background: #f8f9fa;
        border-color: #999;
      }

      @media (max-width: 600px) {
        .card-header {
          flex-direction: column;
          gap: 15px;
          text-align: center;
        }

        .info-row {
          flex-direction: column;
          gap: 5px;
        }

        .label {
          flex: none;
        }

        .card-footer {
          flex-direction: column;
        }

        .btn-primary,
        .btn-secondary {
          width: 100%;
        }
      }
    `,
  ],
})
export class PeopleDetailComponent implements OnInit {
  person: Person | undefined;
  personId: string = '';
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService
  ) {}

  ngOnInit(): void {
    this.personId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.personId) {
      this.error = 'ID não fornecido';
      this.loading = false;
      return;
    }

    this.loadPerson();
  }

  private loadPerson(): void {
    console.log('🔍 Buscando pessoa com ID:', this.personId);
    this.loading = true;
    this.error = null;

    this.peopleService.getPersonById(this.personId).subscribe({
      next: (person) => {
        console.log('✅ Pessoa encontrada:', person);
        this.person = person;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erro ao buscar pessoa:', err);
        this.error = err.message || 'Erro ao carregar detalhes';
        this.loading = false;
      },
    });
  }

  onEdit(): void {
    console.log('✏️ Editar pessoa:', this.person);
    alert('Funcionalidade de edição será implementada em breve!');
  }
}
