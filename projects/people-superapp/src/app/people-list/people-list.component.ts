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
      <h1>Listagem de Pessoas</h1>

      <div *ngIf="loading" class="loading">🔄 Carregando...</div>

      <div *ngIf="error" class="error">❌ Erro: {{ error }}</div>

      <div *ngIf="!loading && !error">
        <p class="total">Total: {{ total }} pessoas</p>

        <ul class="people-list">
          <li *ngFor="let person of people" class="person-item">
            <div class="person-info">
              <strong>{{ person.nome }}</strong>
              <span class="cargo">{{ person.cargo }}</span>
              <span class="unidade">{{ person.unidade }}</span>
              <span
                class="status"
                [class.active]="person.ativo"
                [class.inactive]="!person.ativo"
              >
                {{ person.ativo ? '✅ Ativo' : '❌ Inativo' }}
              </span>
              <a [routerLink]="['/people', person.id]" class="btn-details">
                👁️ Ver detalhes
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .people-container {
        padding: 20px;
        max-width: 900px;
        margin: 0 auto;
      }

      h1 {
        color: #333;
        margin-bottom: 20px;
        font-size: 2rem;
      }

      .total {
        color: #666;
        margin-bottom: 15px;
        font-weight: 500;
      }

      .loading,
      .error {
        padding: 30px;
        text-align: center;
        border-radius: 8px;
        font-size: 1.2rem;
      }

      .loading {
        background: #e3f2fd;
        color: #1976d2;
      }

      .error {
        background: #ffebee;
        color: #c62828;
      }

      .people-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .person-item {
        padding: 20px;
        margin-bottom: 12px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        background: white;
        transition: all 0.2s;
      }

      .person-item:hover {
        border-color: #0055ff;
        box-shadow: 0 2px 8px rgba(0, 85, 255, 0.1);
      }

      .person-info {
        display: flex;
        gap: 20px;
        align-items: center;
        flex-wrap: wrap;
      }

      .person-info strong {
        flex: 1;
        min-width: 180px;
        font-size: 1.1rem;
        color: #1a1a1a;
      }

      .cargo,
      .unidade {
        color: #666;
        font-size: 0.95rem;
        padding: 4px 10px;
        background: #f5f5f5;
        border-radius: 4px;
      }

      .status {
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: 600;
      }

      .status.active {
        background: #d4edda;
        color: #155724;
      }

      .status.inactive {
        background: #f8d7da;
        color: #721c24;
      }

      .btn-details {
        padding: 8px 16px;
        background: #0055ff;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.2s;
        display: inline-block;
      }

      .btn-details:hover {
        background: #0044cc;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 85, 255, 0.3);
      }

      @media (max-width: 768px) {
        .person-info {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .person-info strong {
          min-width: auto;
          width: 100%;
        }

        .btn-details {
          width: 100%;
          text-align: center;
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
