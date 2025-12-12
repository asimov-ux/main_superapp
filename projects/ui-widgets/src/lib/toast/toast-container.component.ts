import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastPosition } from './toast.service';
import { ToastItemComponent } from './toast-item.component';

@Component({
  selector: 'ui-toast-container',
  standalone: true,
  imports: [CommonModule, ToastItemComponent],
  template: `
    <div
      class="ui-toast-container"
      [class.ui-toast-container--top-right]="position === 'top-right'"
      [class.ui-toast-container--top-left]="position === 'top-left'"
      [class.ui-toast-container--bottom-right]="position === 'bottom-right'"
      [class.ui-toast-container--bottom-left]="position === 'bottom-left'"
      [class.ui-toast-container--top-center]="position === 'top-center'"
      [class.ui-toast-container--bottom-center]="position === 'bottom-center'"
    >
      <ui-toast-item
        *ngFor="let toast of toasts$ | async"
        [toast]="toast"
        (close)="onClose($event)"
      ></ui-toast-item>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      .ui-toast-container {
        position: fixed;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        padding: var(--spacing-lg);
        pointer-events: none;
      }

      .ui-toast-container > * {
        pointer-events: auto;
      }

      /* Positions */
      .ui-toast-container--top-right {
        top: 0;
        right: 0;
      }

      .ui-toast-container--top-left {
        top: 0;
        left: 0;
      }

      .ui-toast-container--bottom-right {
        bottom: 0;
        right: 0;
      }

      .ui-toast-container--bottom-left {
        bottom: 0;
        left: 0;
      }

      .ui-toast-container--top-center {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      .ui-toast-container--bottom-center {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      /* Mobile adjustments */
      @media (max-width: 640px) {
        .ui-toast-container {
          left: 0 !important;
          right: 0 !important;
          transform: none !important;
          padding: var(--spacing-md);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {
  @Input() position: ToastPosition = 'top-right';

  toasts$;

  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.getToasts();
  }

  onClose(id: string): void {
    this.toastService.dismiss(id);
  }
}
