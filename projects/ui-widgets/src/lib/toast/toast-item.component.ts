import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast, ToastType } from './toast.service';

@Component({
  selector: 'ui-toast-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="ui-toast"
      [class.ui-toast--success]="toast.type === 'success'"
      [class.ui-toast--error]="toast.type === 'error'"
      [class.ui-toast--warning]="toast.type === 'warning'"
      [class.ui-toast--info]="toast.type === 'info'"
      role="alert"
      [@slideIn]
    >
      <!-- Icon -->
      <div class="ui-toast__icon">
        <svg
          *ngIf="toast.type === 'success'"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm-1.293 14.707l-4-4 1.414-1.414L9 12.172l5.879-5.879 1.414 1.414-7.172 7.172-.414.414z"
          />
        </svg>
        <svg
          *ngIf="toast.type === 'error'"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm5 13.59L13.59 15 10 11.41 6.41 15 5 13.59 8.59 10 5 6.41 6.41 5 10 8.59 13.59 5 15 6.41 11.41 10 15 13.59z"
          />
        </svg>
        <svg
          *ngIf="toast.type === 'warning'"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"
          />
        </svg>
        <svg
          *ngIf="toast.type === 'info'"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm1 15H9V9h2v6zm0-8H9V5h2v2z"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="ui-toast__content">
        <strong *ngIf="toast.title" class="ui-toast__title">{{
          toast.title
        }}</strong>
        <p class="ui-toast__message">{{ toast.message }}</p>
        <button
          *ngIf="toast.action"
          type="button"
          class="ui-toast__action"
          (click)="onActionClick()"
        >
          {{ toast.action.label }}
        </button>
      </div>

      <!-- Close button -->
      <button
        *ngIf="toast.dismissible"
        type="button"
        class="ui-toast__close"
        (click)="onClose()"
        aria-label="Fechar notificação"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M12.207 3.793a1 1 0 0 0-1.414 0L8 6.586 5.207 3.793a1 1 0 0 0-1.414 1.414L6.586 8l-2.793 2.793a1 1 0 1 0 1.414 1.414L8 9.414l2.793 2.793a1 1 0 0 0 1.414-1.414L9.414 8l2.793-2.793a1 1 0 0 0 0-1.414z"
          />
        </svg>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-bottom: var(--spacing-sm);
      }

      .ui-toast {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-md);
        min-width: 320px;
        max-width: 480px;
        padding: var(--spacing-md);
        background: var(--color-bg-surface);
        border-left: 4px solid currentColor;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        animation: slideIn var(--motion-duration-base, 160ms) ease-out;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      /* Type variants */
      .ui-toast--success {
        color: var(--color-success);
      }

      .ui-toast--error {
        color: var(--color-error);
      }

      .ui-toast--warning {
        color: var(--color-warning);
      }

      .ui-toast--info {
        color: var(--color-info);
      }

      /* Icon */
      .ui-toast__icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
      }

      /* Content */
      .ui-toast__content {
        flex: 1;
        min-width: 0;
      }

      .ui-toast__title {
        display: block;
        margin: 0 0 var(--spacing-xs);
        font-size: var(--fontSize-sm);
        font-weight: var(--fontWeight-semibold);
        color: var(--color-text-primary);
        line-height: 1.4;
      }

      .ui-toast__message {
        margin: 0;
        font-size: var(--fontSize-sm);
        color: var(--color-text-secondary);
        line-height: 1.5;
      }

      .ui-toast__action {
        display: inline-block;
        margin-top: var(--spacing-sm);
        padding: var(--spacing-xs) var(--spacing-sm);
        border: none;
        border-radius: var(--radius-sm);
        background: var(--color-bg-secondary);
        color: var(--color-brand);
        font-size: var(--fontSize-sm);
        font-weight: var(--fontWeight-medium);
        cursor: pointer;
        transition: background var(--motion-duration-base, 160ms);
      }

      .ui-toast__action:hover {
        background: var(--color-border);
      }

      .ui-toast__action:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }

      /* Close button */
      .ui-toast__close {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        padding: 0;
        border: none;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--color-text-tertiary);
        cursor: pointer;
        transition: all var(--motion-duration-base, 160ms);
      }

      .ui-toast__close:hover {
        background: var(--color-bg-secondary);
        color: var(--color-text-primary);
      }

      .ui-toast__close:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }

      /* Reduced Motion Support */
      @media (prefers-reduced-motion: reduce) {
        .ui-toast {
          animation: none;
        }
      }

      /* Mobile */
      @media (max-width: 640px) {
        .ui-toast {
          min-width: 280px;
          max-width: calc(100vw - var(--spacing-lg) * 2);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastItemComponent {
  @Input() toast!: Toast;
  @Output() close = new EventEmitter<string>();
  @Output() actionClick = new EventEmitter<void>();

  onClose(): void {
    this.close.emit(this.toast.id);
  }

  onActionClick(): void {
    if (this.toast.action) {
      this.toast.action.callback();
      this.actionClick.emit();
    }
  }
}
