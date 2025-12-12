import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel"
      class="ui-btn ui-btn--{{ variant }} ui-btn--{{ size }}"
    >
      @if (iconPrefix) {
      <span
        [class]="
          iconStyle === 'outlined'
            ? 'material-icons-outlined ui-btn__icon ui-btn__icon--prefix'
            : 'material-icons ui-btn__icon ui-btn__icon--prefix'
        "
      >
        {{ iconPrefix }}
      </span>
      }
      <ng-content></ng-content>
      @if (iconSuffix) {
      <span
        [class]="
          iconStyle === 'outlined'
            ? 'material-icons-outlined ui-btn__icon ui-btn__icon--suffix'
            : 'material-icons ui-btn__icon ui-btn__icon--suffix'
        "
      >
        {{ iconSuffix }}
      </span>
      }
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      .ui-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm, 0.5rem);
        border: none;
        border-radius: var(--border-radius-md, 0.25rem);
        cursor: pointer;
        font-family: var(
          --font-family-base,
          'Roboto',
          Arial,
          Helvetica,
          sans-serif
        );
        font-weight: var(--font-weight-medium, 500);
        transition: all var(--motion-duration-base, 250ms)
          var(--motion-easing-standard, ease-in-out);
        outline: none;
        white-space: nowrap;
      }

      .ui-btn__icon {
        font-size: 1.25rem;
        line-height: 1;
      }

      /* ========== VARIANTES ========== */

      /* Primary */
      .ui-btn--primary {
        background: var(--color-primary, #005ca9);
        color: var(--color-text-inverse, #ffffff);
      }

      .ui-btn--primary:hover:not(:disabled) {
        background: var(--color-hover-primary, #0076d6);
        box-shadow: var(--shadow-md, 0 2px 8px rgba(0, 0, 0, 0.1));
      }

      .ui-btn--primary:active:not(:disabled) {
        background: var(--color-active-primary, #003e72);
      }

      /* Secondary */
      .ui-btn--secondary {
        background: var(--color-secondary, #f39200);
        color: var(--color-text-inverse, #ffffff);
      }

      .ui-btn--secondary:hover:not(:disabled) {
        background: var(--color-hover-secondary, #ffb03b);
        box-shadow: var(--shadow-md, 0 2px 8px rgba(0, 0, 0, 0.1));
      }

      .ui-btn--secondary:active:not(:disabled) {
        background: var(--color-active-secondary, #c77700);
      }

      /* Danger */
      .ui-btn--danger {
        background: var(--color-danger, #c62828);
        color: var(--color-text-inverse, #ffffff);
      }

      .ui-btn--danger:hover:not(:disabled) {
        background: var(--color-danger-dark, #b71c1c);
        box-shadow: var(--shadow-md, 0 2px 8px rgba(0, 0, 0, 0.1));
      }

      .ui-btn--danger:active:not(:disabled) {
        background: var(--color-danger-darker, #a01010);
      }

      /* Outlined */
      .ui-btn--outlined {
        background: transparent;
        color: var(--color-primary, #005ca9);
        border: 2px solid var(--color-primary, #005ca9);
      }

      .ui-btn--outlined:hover:not(:disabled) {
        background: var(--color-primary, #005ca9);
        color: var(--color-text-inverse, #ffffff);
        box-shadow: var(--shadow-md, 0 2px 8px rgba(0, 0, 0, 0.1));
      }

      .ui-btn--outlined:active:not(:disabled) {
        background: var(--color-active-primary, #003e72);
      }

      /* Text (Ghost) */
      .ui-btn--text {
        background: transparent;
        color: var(--color-primary, #005ca9);
      }

      .ui-btn--text:hover:not(:disabled) {
        background: var(--color-background-secondary, #f5f5f5);
      }

      .ui-btn--text:active:not(:disabled) {
        background: var(--color-background-tertiary, #e0e0e0);
      }

      /* Auxiliary */
      .ui-btn--auxiliary {
        background: var(--color-tertiary, #54bbab);
        color: var(--color-text-inverse, #ffffff);
      }

      .ui-btn--auxiliary:hover:not(:disabled) {
        background: var(--color-tertiary-dark, #42a89b);
        box-shadow: var(--shadow-md, 0 2px 8px rgba(0, 0, 0, 0.1));
      }

      .ui-btn--auxiliary:active:not(:disabled) {
        background: var(--color-tertiary-darker, #30958a);
      }

      /* ========== TAMANHOS ========== */

      /* Small */
      .ui-btn--small {
        height: 32px;
        font-size: var(--font-size-sm, 0.875rem);
        padding: var(--button-padding-small, 0 1rem);
      }

      .ui-btn--small .ui-btn__icon {
        font-size: 1rem;
      }

      /* Standard (padrão) */
      .ui-btn--standard {
        height: 40px;
        font-size: var(--font-size-md, 1rem);
        padding: var(--button-padding-standard, 0 1.5rem);
      }

      /* Large */
      .ui-btn--large {
        height: 48px;
        font-size: var(--font-size-lg, 1.125rem);
        padding: var(--button-padding-large, 0 2rem);
      }

      .ui-btn--large .ui-btn__icon {
        font-size: 1.5rem;
      }

      /* ========== ESTADOS ========== */

      .ui-btn:disabled {
        background: var(--color-disabled-background, #e0e0e0);
        color: var(--color-disabled-text, #9e9e9e);
        cursor: not-allowed;
        box-shadow: none;
        border-color: var(--color-disabled-background, #e0e0e0);
      }

      .ui-btn:focus-visible {
        outline: 2px solid var(--color-border-focus, #005ca9);
        outline-offset: 2px;
      }

      /* Reduced Motion Support */
      @media (prefers-reduced-motion: reduce) {
        .ui-btn {
          transition: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'outlined'
    | 'text'
    | 'auxiliary' = 'primary';
  @Input() size: 'small' | 'standard' | 'large' = 'standard';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() iconPrefix?: string;
  @Input() iconSuffix?: string;
  @Input() iconStyle: 'filled' | 'outlined' = 'filled';
  @Input() ariaLabel?: string;
}
