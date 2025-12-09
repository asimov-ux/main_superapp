import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="'cef-btn cef-btn-' + variant"
      [type]="type"
      [disabled]="disabled"
    >
      <span *ngIf="icon" class="cef-btn-icon">{{ icon }}</span>
      <span class="cef-btn-text"><ng-content></ng-content></span>
    </button>
  `,
  styles: [
    `
      .cef-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-lg);
        border: none;
        border-radius: var(--radius-md);
        font-family: var(--font-sans);
        font-size: var(--fontSize-md);
        font-weight: var(--fontWeight-semibold);
        cursor: pointer;
        transition: all var(--transition-fast);
        white-space: nowrap;
      }

      .cef-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Primário - Laranja Caixa */
      .cef-btn-primary {
        background: var(--color-secondary, #f68000);
        color: var(--color-text-inverse, #ffffff);
        box-shadow: var(--shadow-sm);
      }

      .cef-btn-primary:hover:not(:disabled) {
        background: var(--color-secondary-hover, #e06d00);
        box-shadow: var(--shadow-md);
        transform: translateY(-1px);
      }

      .cef-btn-primary:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
      }

      /* Secundário - Azul Caixa */
      .cef-btn-secondary {
        background: transparent;
        color: var(--color-brand, #0066cc);
        border: 2px solid var(--color-brand, #0066cc);
      }

      .cef-btn-secondary:hover:not(:disabled) {
        background: var(--color-brand, #0066cc);
        color: var(--color-text-inverse, #ffffff);
      }

      /* Terciário - Texto */
      .cef-btn-tertiary {
        background: transparent;
        color: var(--color-brand, #0066cc);
        padding: var(--spacing-sm) var(--spacing-md);
      }

      .cef-btn-tertiary:hover:not(:disabled) {
        background: rgba(0, 102, 204, 0.1);
      }

      /* Sucesso */
      .cef-btn-success {
        background: var(--color-success, #00a859);
        color: var(--color-text-inverse, #ffffff);
      }

      .cef-btn-success:hover:not(:disabled) {
        background: #008a47;
      }

      /* Perigo */
      .cef-btn-danger {
        background: var(--color-error, #d32f2f);
        color: var(--color-text-inverse, #ffffff);
      }

      .cef-btn-danger:hover:not(:disabled) {
        background: #b71c1c;
      }

      .cef-btn-icon {
        font-size: 18px;
        line-height: 1;
      }
    `,
  ],
})
export class ButtonComponent {
  @Input() variant:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'danger' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() icon?: string;
}
