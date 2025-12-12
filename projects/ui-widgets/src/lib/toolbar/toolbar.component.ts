import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ToolbarAction {
  id: string;
  label: string;
  icon?: 'menu' | 'search' | 'notifications' | 'settings' | 'user' | 'logout';
  badge?: number;
  disabled?: boolean;
}

@Component({
  selector: 'ui-toolbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="ui-toolbar" [class.ui-toolbar--elevated]="elevated">
      <!-- Left section -->
      <div class="ui-toolbar__section ui-toolbar__section--left">
        <!-- Logo/Brand -->
        <div *ngIf="brandName || brandLogo" class="ui-toolbar__brand">
          <img
            *ngIf="brandLogo"
            [src]="brandLogo"
            [alt]="brandName || 'Logo'"
            class="ui-toolbar__logo"
          />
          <span *ngIf="brandName" class="ui-toolbar__brand-name">{{
            brandName
          }}</span>
        </div>

        <!-- Left actions -->
        <div *ngIf="leftActions.length" class="ui-toolbar__actions">
          <button
            *ngFor="let action of leftActions"
            type="button"
            class="ui-toolbar__action"
            [disabled]="action.disabled"
            (click)="onActionClick(action)"
            [attr.aria-label]="action.label"
          >
            <ng-container [ngSwitch]="action.icon">
              <svg
                *ngSwitchCase="'menu'"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <svg
                *ngSwitchCase="'search'"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </ng-container>
            <span class="ui-toolbar__action-label">{{ action.label }}</span>
          </button>
        </div>
      </div>

      <!-- Center section (optional) -->
      <div class="ui-toolbar__section ui-toolbar__section--center">
        <ng-content select="[toolbar-center]"></ng-content>
      </div>

      <!-- Right section -->
      <div class="ui-toolbar__section ui-toolbar__section--right">
        <div class="ui-toolbar__actions">
          <button
            *ngFor="let action of rightActions"
            type="button"
            class="ui-toolbar__action"
            [class.ui-toolbar__action--has-badge]="
              action.badge && action.badge > 0
            "
            [disabled]="action.disabled"
            (click)="onActionClick(action)"
            [attr.aria-label]="
              action.label +
              (action.badge ? ' (' + action.badge + ' notificações)' : '')
            "
          >
            <ng-container [ngSwitch]="action.icon">
              <svg
                *ngSwitchCase="'notifications'"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                />
              </svg>
              <svg
                *ngSwitchCase="'settings'"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"
                />
              </svg>
              <svg
                *ngSwitchCase="'user'"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <svg
                *ngSwitchCase="'logout'"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                />
              </svg>
            </ng-container>
            <span
              *ngIf="action.badge && action.badge > 0"
              class="ui-toolbar__badge"
            >
              {{ action.badge > 99 ? '99+' : action.badge }}
            </span>
            <span class="ui-toolbar__action-label">{{ action.label }}</span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .ui-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--spacing-lg);
        width: 100%;
        height: 64px;
        padding: 0 var(--spacing-lg);
        background: var(--color-bg-surface);
        border-bottom: 1px solid var(--color-border);
      }

      .ui-toolbar--elevated {
        box-shadow: var(--shadow-md);
        border-bottom: none;
      }

      /* Sections */
      .ui-toolbar__section {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        min-width: 0;
      }

      .ui-toolbar__section--left,
      .ui-toolbar__section--right {
        flex: 1;
      }

      .ui-toolbar__section--right {
        justify-content: flex-end;
      }

      .ui-toolbar__section--center {
        flex: 0 1 auto;
      }

      /* Brand */
      .ui-toolbar__brand {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
      }

      .ui-toolbar__logo {
        height: 32px;
        width: auto;
        object-fit: contain;
      }

      .ui-toolbar__brand-name {
        font-size: var(--fontSize-lg);
        font-weight: var(--fontWeight-semibold);
        color: var(--color-text-primary);
        white-space: nowrap;
      }

      /* Actions */
      .ui-toolbar__actions {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
      }

      .ui-toolbar__action {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-sm);
        border: none;
        border-radius: var(--radius-md);
        background: transparent;
        color: var(--color-text-primary);
        font-size: var(--fontSize-sm);
        cursor: pointer;
        transition: all var(--motion-duration-base, 160ms) ease-in-out;
        white-space: nowrap;
      }

      .ui-toolbar__action:hover:not(:disabled) {
        background: var(--color-bg-secondary);
      }

      .ui-toolbar__action:active:not(:disabled) {
        background: var(--color-border);
      }

      .ui-toolbar__action:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .ui-toolbar__action:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }

      .ui-toolbar__action svg {
        flex-shrink: 0;
      }

      .ui-toolbar__action-label {
        display: none;
      }

      /* Badge */
      .ui-toolbar__badge {
        position: absolute;
        top: 4px;
        right: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        padding: 0 4px;
        border-radius: var(--radius-full);
        background: var(--color-error);
        color: var(--color-text-inverse);
        font-size: 11px;
        font-weight: var(--fontWeight-semibold);
        line-height: 1;
      }

      /* Reduced Motion Support */
      @media (prefers-reduced-motion: reduce) {
        .ui-toolbar__action {
          transition: none;
        }
      }

      /* Tablet and up - show labels */
      @media (min-width: 768px) {
        .ui-toolbar__action-label {
          display: inline;
        }
      }

      /* Mobile adjustments */
      @media (max-width: 640px) {
        .ui-toolbar {
          height: 56px;
          padding: 0 var(--spacing-md);
          gap: var(--spacing-sm);
        }

        .ui-toolbar__section {
          gap: var(--spacing-xs);
        }

        .ui-toolbar__brand-name {
          font-size: var(--fontSize-md);
        }

        .ui-toolbar__logo {
          height: 28px;
        }

        .ui-toolbar__section--center {
          display: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Input() brandName?: string;
  @Input() brandLogo?: string;
  @Input() elevated = true;
  @Input() leftActions: ToolbarAction[] = [];
  @Input() rightActions: ToolbarAction[] = [];

  @Output() actionClick = new EventEmitter<ToolbarAction>();

  onActionClick(action: ToolbarAction): void {
    if (!action.disabled) {
      this.actionClick.emit(action);
    }
  }
}
