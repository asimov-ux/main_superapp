import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandSelectorComponent } from './brand-selector/brand-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BrandSelectorComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>{{ title }}</h1>
      </header>

      <!-- Seletor de Marca -->
      <app-brand-selector></app-brand-selector>

      <main class="app-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        background: var(--color-bg-base);
      }

      .app-header {
        background: var(--color-brand);
        color: var(--color-text-inverse);
        padding: var(--spacing-lg);
        text-align: center;
        box-shadow: var(--shadow-md);
      }

      .app-header h1 {
        margin: 0;
        font-size: var(--fontSize-3xl);
        font-weight: var(--fontWeight-bold);
      }

      .app-content {
        padding: var(--spacing-lg);
        max-width: 1200px;
        margin: 0 auto;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Super App de Pessoas';
}
