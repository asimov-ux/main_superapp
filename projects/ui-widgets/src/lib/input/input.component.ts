import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ui-input" [class.ui-input--error]="error">
      <label *ngIf="label" [for]="id" class="ui-input__label">
        {{ label }}
        <span *ngIf="required" class="ui-input__required">*</span>
      </label>

      <input
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [readonly]="readonly"
        [required]="required"
        class="ui-input__field"
      />

      <span *ngIf="hint && !error" class="ui-input__hint">{{ hint }}</span>
      <span *ngIf="error" class="ui-input__error">{{ error }}</span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .ui-input {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        width: 100%;
      }

      .ui-input__label {
        font-size: var(--fontSize-sm);
        font-weight: var(--fontWeight-medium);
        color: var(--color-text-primary);
        line-height: 1.5;
      }

      .ui-input__required {
        color: var(--color-error);
        margin-left: 2px;
      }

      .ui-input__field {
        width: 100%;
        height: 40px;
        padding: 0 var(--spacing-md);
        font-family: var(--font-sans);
        font-size: var(--fontSize-md);
        color: var(--color-text-primary);
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        transition: all var(--motion-duration-base, 160ms) ease-in-out;
        outline: none;
      }

      .ui-input__field::placeholder {
        color: var(--color-text-tertiary);
      }

      .ui-input__field:hover:not(:disabled):not(:focus) {
        border-color: var(--color-brand-hover);
      }

      .ui-input__field:focus {
        border-color: var(--color-brand);
        box-shadow: 0 0 0 3px var(--color-primary-10);
      }

      .ui-input__field:disabled {
        background: var(--color-bg-secondary);
        color: var(--color-text-tertiary);
        cursor: not-allowed;
        opacity: 0.6;
      }

      .ui-input--error .ui-input__field {
        border-color: var(--color-error);
      }

      .ui-input--error .ui-input__field:focus {
        box-shadow: 0 0 0 3px var(--color-feedback-negative-10);
      }

      .ui-input__hint {
        font-size: var(--fontSize-sm);
        color: var(--color-text-secondary);
        line-height: 1.4;
      }

      .ui-input__error {
        font-size: var(--fontSize-sm);
        color: var(--color-error);
        font-weight: var(--fontWeight-medium);
        line-height: 1.4;
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
      }

      /* Reduced Motion Support */
      @media (prefers-reduced-motion: reduce) {
        .ui-input__field {
          transition: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() id = `ui-input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() hint?: string;
  @Input() error?: string;
}
