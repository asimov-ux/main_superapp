import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ListColumn<T = any> {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  template?: TemplateRef<any>;
  getValue?: (item: T) => any;
}

@Component({
  selector: 'ui-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="ui-list"
      [class.ui-list--striped]="striped"
      [class.ui-list--hoverable]="hoverable"
    >
      <!-- Header -->
      <div *ngIf="showHeader" class="ui-list__header">
        <div
          *ngFor="let column of columns"
          class="ui-list__header-cell"
          [class.ui-list__header-cell--sortable]="column.sortable"
          [style.width]="column.width"
          (click)="column.sortable && onSort(column.key)"
        >
          <span>{{ column.label }}</span>
          <svg
            *ngIf="column.sortable"
            class="ui-list__sort-icon"
            [class.ui-list__sort-icon--active]="sortKey === column.key"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              *ngIf="sortKey !== column.key || sortDirection === 'asc'"
              d="M8 4l-4 4h8l-4-4z"
            />
            <path
              *ngIf="sortKey === column.key && sortDirection === 'desc'"
              d="M8 12l4-4H4l4 4z"
            />
          </svg>
        </div>
      </div>

      <!-- Body -->
      <div class="ui-list__body">
        <div
          *ngFor="let item of items; let i = index; trackBy: trackByFn"
          class="ui-list__row"
          [class.ui-list__row--selected]="isSelected(item)"
          (click)="onRowClick(item)"
        >
          <div
            *ngFor="let column of columns"
            class="ui-list__cell"
            [style.width]="column.width"
          >
            <ng-container *ngIf="column.template; else defaultCell">
              <ng-container
                *ngTemplateOutlet="
                  column.template;
                  context: { $implicit: item, index: i }
                "
              ></ng-container>
            </ng-container>
            <ng-template #defaultCell>
              {{ getColumnValue(item, column) }}
            </ng-template>
          </div>
        </div>

        <!-- Empty state -->
        <div *ngIf="!items || items.length === 0" class="ui-list__empty">
          <ng-content select="[empty-state]"></ng-content>
          <div *ngIf="!hasEmptyState" class="ui-list__empty-default">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="6" y="10" width="36" height="32" rx="2" />
              <line x1="6" y1="18" x2="42" y2="18" />
              <line x1="14" y1="26" x2="34" y2="26" />
              <line x1="14" y1="34" x2="28" y2="34" />
            </svg>
            <p>{{ emptyMessage }}</p>
          </div>
        </div>

        <!-- Loading state -->
        <div *ngIf="loading" class="ui-list__loading">
          <div class="ui-list__spinner"></div>
          <p>Carregando...</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .ui-list {
        width: 100%;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        background: var(--color-bg-surface);
      }

      /* Header */
      .ui-list__header {
        display: flex;
        background: var(--color-bg-base);
        border-bottom: 2px solid var(--color-border);
        font-weight: var(--fontWeight-semibold);
      }

      .ui-list__header-cell {
        flex: 1;
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-md);
        color: var(--color-text-primary);
        font-size: var(--fontSize-sm);
        line-height: 1.4;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .ui-list__header-cell--sortable {
        cursor: pointer;
        user-select: none;
        transition: background var(--motion-duration-base, 160ms);
      }

      .ui-list__header-cell--sortable:hover {
        background: var(--color-bg-secondary);
      }

      .ui-list__sort-icon {
        color: var(--color-text-tertiary);
        transition: color var(--motion-duration-base, 160ms);
      }

      .ui-list__sort-icon--active {
        color: var(--color-brand);
      }

      /* Body */
      .ui-list__body {
        position: relative;
        min-height: 100px;
      }

      .ui-list__row {
        display: flex;
        border-bottom: 1px solid var(--color-border);
        transition: background var(--motion-duration-base, 160ms);
      }

      .ui-list__row:last-child {
        border-bottom: none;
      }

      .ui-list--hoverable .ui-list__row {
        cursor: pointer;
      }

      .ui-list--hoverable .ui-list__row:hover {
        background: var(--color-bg-base);
      }

      .ui-list__row--selected {
        background: var(--color-primary-10) !important;
        border-left: 3px solid var(--color-brand);
      }

      .ui-list--striped .ui-list__row:nth-child(even) {
        background: var(--color-bg-base);
      }

      .ui-list__cell {
        flex: 1;
        padding: var(--spacing-md);
        color: var(--color-text-primary);
        font-size: var(--fontSize-md);
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Empty state */
      .ui-list__empty {
        padding: var(--spacing-2xl);
      }

      .ui-list__empty-default {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-md);
        color: var(--color-text-tertiary);
        text-align: center;
      }

      .ui-list__empty-default svg {
        opacity: 0.5;
      }

      .ui-list__empty-default p {
        margin: 0;
        font-size: var(--fontSize-md);
      }

      /* Loading state */
      .ui-list__loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-md);
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(2px);
      }

      .ui-list__spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--color-border);
        border-top-color: var(--color-brand);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .ui-list__loading p {
        margin: 0;
        color: var(--color-text-secondary);
        font-size: var(--fontSize-sm);
      }

      /* Reduced Motion Support */
      @media (prefers-reduced-motion: reduce) {
        .ui-list__row,
        .ui-list__header-cell--sortable,
        .ui-list__sort-icon {
          transition: none;
        }

        .ui-list__spinner {
          animation: none;
          border-top-color: var(--color-border);
        }
      }

      /* Mobile */
      @media (max-width: 640px) {
        .ui-list__header {
          display: none;
        }

        .ui-list__row {
          flex-direction: column;
        }

        .ui-list__cell {
          width: 100% !important;
          padding: var(--spacing-sm) var(--spacing-md);
        }

        .ui-list__cell:before {
          content: attr(data-label);
          display: block;
          font-weight: var(--fontWeight-semibold);
          font-size: var(--fontSize-xs);
          color: var(--color-text-secondary);
          text-transform: uppercase;
          margin-bottom: var(--spacing-xs);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T = any> {
  @Input() items: T[] = [];
  @Input() columns: ListColumn<T>[] = [];
  @Input() showHeader = true;
  @Input() striped = false;
  @Input() hoverable = true;
  @Input() loading = false;
  @Input() emptyMessage = 'Nenhum item encontrado';
  @Input() hasEmptyState = false;
  @Input() selectedItems: T[] = [];
  @Input() trackByKey = 'id';

  @Output() rowClick = new EventEmitter<T>();
  @Output() sort = new EventEmitter<{
    key: string;
    direction: 'asc' | 'desc';
  }>();

  sortKey: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  trackByFn = (index: number, item: any): any => {
    return item[this.trackByKey] ?? index;
  };

  getColumnValue(item: T, column: ListColumn<T>): any {
    if (column.getValue) {
      return column.getValue(item);
    }
    return (item as any)[column.key];
  }

  isSelected(item: T): boolean {
    return this.selectedItems.includes(item);
  }

  onRowClick(item: T): void {
    if (this.hoverable) {
      this.rowClick.emit(item);
    }
  }

  onSort(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.sort.emit({ key, direction: this.sortDirection });
  }
}
