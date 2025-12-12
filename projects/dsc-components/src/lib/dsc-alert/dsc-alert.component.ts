import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type DscAlertVariant = 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'dsc-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dsc-alert.component.html',
  styleUrls: ['./dsc-alert.component.scss'],
})
export class DscAlertComponent {
  @Input() message: string = '';
  @Input() variant: DscAlertVariant = 'info';
  @Input() showIcon: boolean = true;
  @Input() title: string = '';
  @Input() list: string[] = [];
  @Input() linkFunction?: (event: Event) => void;

  @Output() linkClick = new EventEmitter<Event>();

  constructor(private sanitizer: DomSanitizer) {}

  get icon(): string {
    const icons = {
      success: 'check_circle',
      danger: 'error',
      warning: 'warning',
      info: 'info',
    };
    return icons[this.variant];
  }

  get sanitizedMessage(): SafeHtml {
    return this.sanitizer.sanitize(1, this.message) || '';
  }

  onLinkClick(event: Event): void {
    if (this.linkFunction) {
      this.linkFunction(event);
    }
    this.linkClick.emit(event);
  }
}
