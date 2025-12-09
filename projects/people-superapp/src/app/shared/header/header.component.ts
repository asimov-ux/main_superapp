import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="cef-header">
      <div class="cef-header-content">
        <div class="cef-header-left">
          <div class="cef-logo">
            <span class="cef-logo-symbol">⬢</span>
            <span class="cef-logo-text">CAIXA</span>
          </div>
          <h1 class="cef-system-name">{{ systemName }}</h1>
        </div>

        <div class="cef-header-right">
          <button class="cef-header-icon" title="Notificações">🔔</button>
          <button class="cef-header-icon" title="Ajuda">❓</button>
          <button class="cef-header-icon" title="Usuário">👤</button>
          <button class="cef-header-icon" title="Sair">🚪</button>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .cef-header {
        background: var(--color-brand, #0066cc);
        color: var(--color-text-inverse, #ffffff);
        height: 64px;
        box-shadow: var(--shadow-md);
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .cef-header-content {
        max-width: 1440px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 var(--spacing-lg);
      }

      .cef-header-left {
        display: flex;
        align-items: center;
        gap: var(--spacing-xl);
      }

      .cef-logo {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        font-weight: var(--fontWeight-bold);
      }

      .cef-logo-symbol {
        font-size: 28px;
        line-height: 1;
      }

      .cef-logo-text {
        font-size: 24px;
        letter-spacing: 2px;
      }

      .cef-system-name {
        font-size: var(--fontSize-lg);
        font-weight: var(--fontWeight-semibold);
        margin: 0;
      }

      .cef-header-right {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }

      .cef-header-icon {
        background: transparent;
        border: none;
        color: inherit;
        font-size: 20px;
        width: 40px;
        height: 40px;
        border-radius: var(--radius-full);
        cursor: pointer;
        transition: background-color var(--transition-fast);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .cef-header-icon:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .cef-header-icon:active {
        background: rgba(255, 255, 255, 0.2);
      }
    `,
  ],
})
export class HeaderComponent {
  systemName = 'Central de Benefícios';
}
