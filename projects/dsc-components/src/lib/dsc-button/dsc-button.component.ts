import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type DscButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'outlined'
  | 'text'
  | 'auxiliary';
export type DscButtonSize = 'small' | 'standard' | 'large';
export type DscButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'dsc-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dsc-button.component.html',
  styleUrls: ['./dsc-button.component.scss'],
})
export class DscButtonComponent {
  @Input() label: string = '';
  @Input() variant: DscButtonVariant = 'primary';
  @Input() size: DscButtonSize = 'standard';
  @Input() type: DscButtonType = 'button';
  @Input() iconStyle: string = 'filled';
  @Input() iconSuffix: string = '';
  @Input() disabled: boolean = false;
  @Input() iconButton: boolean = false;
  @Input() iconPrefix: string = '';
  @Input() icon: string = '';
  @Input() ariaLabel: string = '';

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  @HostBinding('class') get hostClasses(): string {
    return `dsc-button dsc-button--${this.variant} dsc-button--${this.size} ${
      this.iconButton ? 'dsc-button--icon-only' : ''
    }`;
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }

  get materialIconClass(): string {
    return `material-icons${
      this.iconStyle !== 'filled' ? `-${this.iconStyle}` : ''
    }`;
  }
}
