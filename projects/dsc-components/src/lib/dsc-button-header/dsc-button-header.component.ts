import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dsc-button-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dsc-button-header.component.html',
  styleUrls: ['./dsc-button-header.component.scss'],
})
export class DscButtonHeaderComponent {
  @Input() icon: string = 'menu';
  @Input() label: string = 'Menu';
  @Input() tabindex: number = 0;
  @Input() dscTooltip: string = '';
  @Input() ariaLabel: string = '';
  @Input() disabled: boolean = false;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}
