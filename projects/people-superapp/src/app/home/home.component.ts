import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <!-- Quick Access -->
      <section class="quick-access">
        <h2>Acesso Rápido</h2>
        <div class="quick-grid">
          <div class="quick-card" (click)="navegarPara('/beneficios')">
            <div class="quick-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                />
              </svg>
            </div>
            <span>Benefícios</span>
          </div>
          <div class="quick-card" (click)="navegarPara('/people')">
            <div class="quick-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                />
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
              </svg>
            </div>
            <span>Pessoas</span>
          </div>
          <div class="quick-card" (click)="navegarPara('/ausencias')">
            <div class="quick-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                />
              </svg>
            </div>
            <span>Ausências</span>
          </div>
          <div class="quick-card" (click)="navegarPara('/dashboard')">
            <div class="quick-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </div>
            <span>Dashboard</span>
          </div>
        </div>
      </section>

      <!-- Info Cards -->
      <section class="info-section">
        <div class="info-card">
          <div class="info-icon">
            <svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
              />
            </svg>
          </div>
          <h3>Atendimento RH</h3>
          <p>Segunda a Sexta, 8h às 18h</p>
          <span class="info-detail">ramal: 4002-8922</span>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"
              />
              <path
                d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"
              />
            </svg>
          </div>
          <h3>Suporte Online</h3>
          <p>Central de Atendimento</p>
          <a
            href="https://atendimentopessoas.caixa"
            class="info-link"
            target="_blank"
          >
            Acessar Portal de Atendimento
          </a>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
              />
              <path
                d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"
              />
            </svg>
          </div>
          <h3>Documentos</h3>
          <p>Acesse seus documentos</p>
          <span class="info-detail">Holerites, Informes</span>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .home-container {
        min-height: calc(100vh - 100px);
        background: var(--color-surface, #f5f5f5);
      }

      .quick-access {
        padding: 32px 40px;
        background: #fff;
        border-bottom: 1px solid #e0e0e0;
      }

      .quick-access h2 {
        font-family: 'Segoe UI', sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin: 0 0 16px 0;
      }

      .quick-grid {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .quick-card {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        background: #f8f9fa;
        border: 1px solid #e0e0e0;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .quick-card:hover {
        background: #e3f2fd;
        border-color: #90caf9;
      }

      .quick-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: #005ca9;
        color: #fff;
      }

      .quick-card span {
        font-family: 'Segoe UI', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: #333;
      }

      .info-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        padding: 32px 40px;
      }

      .info-card {
        background: #fff;
        border: 1px solid #e0e0e0;
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .info-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e3f2fd;
        color: #005ca9;
        margin-bottom: 16px;
      }

      .info-card h3 {
        font-family: 'Segoe UI', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin: 0 0 4px 0;
      }

      .info-card p {
        font-family: 'Segoe UI', sans-serif;
        font-size: 12px;
        color: #666;
        margin: 0 0 8px 0;
      }

      .info-detail {
        font-family: 'Segoe UI', sans-serif;
        font-size: 12px;
        color: #005ca9;
        font-weight: 500;
      }

      .info-link {
        display: inline-block;
        padding: 8px 16px;
        background: #005ca9;
        color: #fff;
        font-family: 'Segoe UI', sans-serif;
        font-size: 12px;
        font-weight: 500;
        text-decoration: none;
        transition: background 0.15s ease;
      }

      .info-link:hover {
        background: #004080;
      }

      @media (max-width: 768px) {
        .quick-access,
        .info-section {
          padding: 24px 20px;
        }
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navegarPara(rota: string): void {
    this.router.navigate([rota]);
  }
}
