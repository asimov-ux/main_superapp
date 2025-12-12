import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="ui-card"
      [class.ui-card--elevated]="elevated"
      [class.ui-card--interactive]="interactive"
    >
      <!-- Header (opcional) -->
      <header *ngIf="title || subtitle" class="ui-card__header">
        <div class="ui-card__header-content">
          <h3 *ngIf="title" class="ui-card__title">{{ title }}</h3>
          <p *ngIf="subtitle" class="ui-card__subtitle">{{ subtitle }}</p>
        </div>
        <div *ngIf="headerAction" class="ui-card__header-action">
          <ng-content select="[card-header-action]"></ng-content>
        </div>
      </header>

      <!-- Media (imagem/thumbnail - opcional) -->
      <div *ngIf="imageUrl" class="ui-card__media">
        <img
          [src]="imageUrl"
          [alt]="imageAlt || title || 'Card image'"
          class="ui-card__image"
        />
      </div>

      <!-- Body/Content -->
      <div class="ui-card__body">
        <ng-content></ng-content>
      </div>

      <!-- Footer/Actions (opcional) -->
      <footer *ngIf="hasFooter" class="ui-card__footer">
        <ng-content select="[card-actions]"></ng-content>
      </footer>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .ui-card {
        display: flex;
        flex-direction: column;
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        transition: all var(--motion-duration-base, 160ms) ease-in-out;
      }

      .ui-card--elevated {
        border: none;
        box-shadow: var(--shadow-md);
      }

      .ui-card--elevated:hover {
        box-shadow: var(--shadow-lg);
      }

      .ui-card--interactive {
        cursor: pointer;
      }

      .ui-card--interactive:hover {
        border-color: var(--color-brand);
        transform: translateY(-2px);
      }

      .ui-card--interactive:active {
        transform: translateY(0);
      }

      /* Header */
      .ui-card__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--spacing-md);
        padding: var(--spacing-lg);
        border-bottom: 1px solid var(--color-border);
      }

      .ui-card__header-content {
        flex: 1;
        min-width: 0;
      }

      .ui-card__title {
        margin: 0;
        font-size: var(--fontSize-lg);
        font-weight: var(--fontWeight-semibold);
        color: var(--color-text-primary);
        line-height: 1.3;
      }

      .ui-card__subtitle {
        margin: var(--spacing-xs) 0 0;
        font-size: var(--fontSize-sm);
        color: var(--color-text-secondary);
        line-height: 1.4;
      }

      .ui-card__header-action {
        flex-shrink: 0;
      }

      /* Media/Image */
      .ui-card__media {
        position: relative;
        width: 100%;
        overflow: hidden;
        background: var(--color-bg-secondary);
      }

      .ui-card__image {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      /* Body */
      .ui-card__body {
        flex: 1;
        padding: var(--spacing-lg);
        color: var(--color-text-primary);
        font-size: var(--fontSize-md);
        line-height: 1.6;
      }

      /* Footer */
      .ui-card__footer {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) var(--spacing-lg);
        border-top: 1px solid var(--color-border);
        background: var(--color-bg-base);
      }

      /* Reduced Motion Support */
      @media (prefers-reduced-motion: reduce) {
        .ui-card,
        .ui-card--interactive {
          transition: none;
          transform: none !important;
        }
      }

      /* Compact variant */
      :host([compact]) .ui-card__header,
      :host([compact]) .ui-card__body,
      :host([compact]) .ui-card__footer {
        padding: var(--spacing-md);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() imageUrl?: string;
  @Input() imageAlt?: string;
  @Input() elevated = false;
  @Input() interactive = false;
  @Input() headerAction = false;
  @Input() hasFooter = false;
}
