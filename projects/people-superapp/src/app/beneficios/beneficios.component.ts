import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

@Component({
  selector: 'app-beneficios',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="page-header">
      <h1>Benefícios</h1>
      <p class="subtitle">Explore e gerencie seus benefícios</p>
    </div>

    <div class="filters">
      <button class="filter-btn active">
        <i class="ms-Icon ms-Icon--ViewAll"></i>
        Todos
      </button>
      <button class="filter-btn">
        <i class="ms-Icon ms-Icon--Health"></i>
        Saúde
      </button>
      <button class="filter-btn">
        <i class="ms-Icon ms-Icon--ShoppingCart"></i>
        Consumo
      </button>
    </div>

    <div class="beneficios-grid">
      <div class="beneficio-card">
        <div
          class="card-header"
          style="display:flex;gap:12px;align-items:center;padding:16px 16px 0;"
        >
          <div class="card-icon"><i class="ms-Icon ms-Icon--Heart"></i></div>
          <div class="card-title">
            <div class="nome">Plano de Saúde Premium</div>
            <span class="status ativo">
              <i class="ms-Icon ms-Icon--Checkmark"></i> ATIVO
            </span>
          </div>
        </div>
        <div class="card-content" style="padding:16px;">
          <p class="descricao">
            Cobertura completa com rede ampla e atendimento prioritário.
          </p>
          <div class="card-info">
            <div class="info-row">
              <span class="label">
                <i class="ms-Icon ms-Icon--Money"></i>
                Valor mensal:
              </span>
              <span class="valor">{{ 299.9 | currency : 'BRL' }}</span>
            </div>
            <div class="info-row">
              <span class="label">
                <i class="ms-Icon ms-Icon--Calendar"></i>
                Prazo de análise:
              </span>
              <span class="text">3 dias úteis</span>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <span class="categoria-tag">
            <i class="ms-Icon ms-Icon--Health"></i>
            Saúde
          </span>
          <button class="btn-detalhes" (click)="verDetalhes()">
            Ver detalhes <i class="ms-Icon ms-Icon--ChevronRight"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./beneficios-page.component.css'],
})
export class BeneficiosComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    initializeIcons();
  }

  verDetalhes(): void {
    this.router.navigate(['/beneficios']);
  }
}
