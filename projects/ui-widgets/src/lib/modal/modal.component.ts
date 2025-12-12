import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="ui-modal-overlay"
      [class.ui-modal-overlay--open]="isOpen"
      (click)="onOverlayClick($event)"
      [@fadeIn]
    >
      <div
        class="ui-modal"
        [class.ui-modal--sm]="size === 'sm'"
        [class.ui-modal--md]="size === 'md'"
        [class.ui-modal--lg]="size === 'lg'"
        [class.ui-modal--xl]="size === 'xl'"
        role="dialog"
        [attr.aria-modal]="true"
        [attr.aria-labelledby]="title ? 'modal-title' : null"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <header class="ui-modal__header">
          <h2 *ngIf="title" id="modal-title" class="ui-modal__title">
            {{ title }}
          </h2>
          <button
            *ngIf="showClose"
            type="button"
            class="ui-modal__close"
            (click)="close()"
            aria-label="Fechar modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <!-- Body -->
        <div class="ui-modal__body">
          <ng-content></ng-content>
        </div>

        <!-- Footer (opcional) -->
        <footer *ngIf="hasFooter" class="ui-modal__footer">
          <ng-content select="[modal-footer]"></ng-content>
        </footer>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      /* Overlay */
      .ui-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: var(--spacing-lg);
        overflow-y: auto;
      }

      .ui-modal-overlay--open {
        display: flex;
        animation: fadeIn var(--motion-duration-base, 160ms) ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* Modal Container */
      .ui-modal {
        position: relative;
        background: var(--color-bg-surface);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        animation: slideUp var(--motion-duration-base, 160ms) ease-out;
      }

      @keyframes slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      /* Sizes */
      .ui-modal--sm {
        max-width: 400px;
      }

      .ui-modal--md {
        max-width: 600px;
      }

      .ui-modal--lg {
        max-width: 800px;
      }

      .ui-modal--xl {
        max-width: 1200px;
      }

      /* Header */
      .ui-modal__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--spacing-md);
        padding: var(--spacing-lg);
        border-bottom: 1px solid var(--color-border);
      }

      .ui-modal__title {
        margin: 0;
        font-size: var(--fontSize-xl);
        font-weight: var(--fontWeight-semibold);
        color: var(--color-text-primary);
        line-height: 1.3;
      }

      .ui-modal__close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        border: none;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--color-text-secondary);
        cursor: pointer;
        transition: all var(--motion-duration-base, 160ms) ease-in-out;
        flex-shrink: 0;
      }

      .ui-modal__close:hover {
        background: var(--color-bg-secondary);
        color: var(--color-text-primary);
      }

      .ui-modal__close:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }

      /* Body */
      .ui-modal__body {
        flex: 1;
        padding: var(--spacing-lg);
        overflow-y: auto;
        color: var(--color-text-primary);
        font-size: var(--fontSize-md);
        line-height: 1.6;
      }

      /* Footer */
      .ui-modal__footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--spacing-sm);
        padding: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
        background: var(--color-bg-base);
      }

      /* Reduced Motion Support */
      @media (prefers-reduced-motion: reduce) {
        .ui-modal-overlay--open,
        .ui-modal {
          animation: none;
        }
      }

      /* Mobile adjustments */
      @media (max-width: 640px) {
        .ui-modal-overlay {
          padding: 0;
        }

        .ui-modal {
          max-height: 100vh;
          border-radius: 0;
        }

        .ui-modal--sm,
        .ui-modal--md,
        .ui-modal--lg,
        .ui-modal--xl {
          max-width: 100%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title?: string;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() showClose = true;
  @Input() closeOnOverlayClick = true;
  @Input() hasFooter = false;

  @Output() modalClose = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.close();
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if (this.closeOnOverlayClick && event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.modalClose.emit();
  }
}
