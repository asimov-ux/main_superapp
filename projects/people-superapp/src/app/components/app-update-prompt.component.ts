import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUpdateService } from '../services/app-update.service';

@Component({
  selector: 'app-update-prompt',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="showPrompt"
      class="update-prompt"
      role="alert"
      aria-live="polite"
    >
      <div class="update-prompt__content">
        <div class="update-prompt__icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
        </div>

        <div class="update-prompt__text">
          <strong class="update-prompt__title">Nova versão disponível!</strong>
          <p class="update-prompt__message">
            Uma atualização do aplicativo está pronta para ser instalada.
          </p>
        </div>

        <div class="update-prompt__actions">
          <button
            type="button"
            class="update-prompt__btn update-prompt__btn--secondary"
            (click)="dismiss()"
            aria-label="Fechar notificação de atualização"
          >
            Depois
          </button>
          <button
            type="button"
            class="update-prompt__btn update-prompt__btn--primary"
            (click)="update()"
            [disabled]="updating"
            aria-label="Atualizar aplicativo agora"
          >
            {{ updating ? 'Atualizando...' : 'Atualizar Agora' }}
          </button>
        </div>

        <button
          type="button"
          class="update-prompt__close"
          (click)="dismiss()"
          aria-label="Fechar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M12.207 3.793a1 1 0 0 0-1.414 0L8 6.586 5.207 3.793a1 1 0 0 0-1.414 1.414L6.586 8l-2.793 2.793a1 1 0 1 0 1.414 1.414L8 9.414l2.793 2.793a1 1 0 0 0 1.414-1.414L9.414 8l2.793-2.793a1 1 0 0 0 0-1.414z"
            />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .update-prompt {
        position: fixed;
        bottom: var(--spacing-lg);
        right: var(--spacing-lg);
        z-index: 10000;
        max-width: 420px;
        animation: slideUp 300ms ease-out;
      }

      @keyframes slideUp {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .update-prompt__content {
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-md);
        padding: var(--spacing-lg);
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border);
        border-left: 4px solid var(--color-brand);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
      }

      .update-prompt__icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: var(--radius-md);
        background: var(--color-primary-10);
        color: var(--color-brand);
      }

      .update-prompt__text {
        flex: 1;
        min-width: 0;
      }

      .update-prompt__title {
        display: block;
        margin: 0 0 var(--spacing-xs);
        font-size: var(--fontSize-md);
        font-weight: var(--fontWeight-semibold);
        color: var(--color-text-primary);
        line-height: 1.4;
      }

      .update-prompt__message {
        margin: 0;
        font-size: var(--fontSize-sm);
        color: var(--color-text-secondary);
        line-height: 1.5;
      }

      .update-prompt__actions {
        display: flex;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-md);
      }

      .update-prompt__btn {
        padding: var(--spacing-sm) var(--spacing-md);
        border: none;
        border-radius: var(--radius-md);
        font-size: var(--fontSize-sm);
        font-weight: var(--fontWeight-medium);
        cursor: pointer;
        transition: all var(--motion-duration-base, 160ms) ease-in-out;
        white-space: nowrap;
      }

      .update-prompt__btn--primary {
        background: var(--color-brand);
        color: var(--color-text-inverse);
      }

      .update-prompt__btn--primary:hover:not(:disabled) {
        background: var(--color-brand-hover);
        box-shadow: var(--shadow-sm);
      }

      .update-prompt__btn--primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .update-prompt__btn--secondary {
        background: transparent;
        color: var(--color-text-secondary);
        border: 1px solid var(--color-border);
      }

      .update-prompt__btn--secondary:hover {
        background: var(--color-bg-secondary);
        color: var(--color-text-primary);
      }

      .update-prompt__close {
        position: absolute;
        top: var(--spacing-md);
        right: var(--spacing-md);
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
        transition: all var(--motion-duration-base, 160ms) ease-in-out;
      }

      .update-prompt__close:hover {
        background: var(--color-bg-secondary);
        color: var(--color-text-primary);
      }

      .update-prompt__close:focus-visible,
      .update-prompt__btn:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }

      /* Mobile */
      @media (max-width: 640px) {
        .update-prompt {
          bottom: 0;
          left: 0;
          right: 0;
          max-width: 100%;
          border-radius: 0;
        }

        .update-prompt__content {
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          border-left-width: 1px;
          border-top: 4px solid var(--color-brand);
        }

        .update-prompt__actions {
          flex-direction: column-reverse;
        }

        .update-prompt__btn {
          width: 100%;
        }
      }

      /* Reduced Motion */
      @media (prefers-reduced-motion: reduce) {
        .update-prompt {
          animation: none;
        }

        .update-prompt__btn {
          transition: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppUpdatePromptComponent implements OnInit, OnDestroy {
  showPrompt = false;
  updating = false;

  private eventListener?: (event: Event) => void;

  constructor(
    private updateService: AppUpdateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Escutar evento customizado disparado pelo service
    this.eventListener = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('🔔 Update available:', customEvent.detail);
      this.showPrompt = true;
      this.cdr.markForCheck();
    };

    window.addEventListener('pwa-update-available', this.eventListener);
  }

  ngOnDestroy(): void {
    if (this.eventListener) {
      window.removeEventListener('pwa-update-available', this.eventListener);
    }
  }

  async update(): Promise<void> {
    this.updating = true;
    this.cdr.markForCheck();

    await this.updateService.activateUpdate();
    // O reload será feito automaticamente pelo service
  }

  dismiss(): void {
    this.showPrompt = false;
    this.cdr.markForCheck();
  }
}
