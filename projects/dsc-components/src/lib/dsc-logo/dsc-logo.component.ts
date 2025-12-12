import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DscLogoType = 'brand-full' | 'synthesis-element';
export type DscLogoTheme = 'default' | 'inverse';
export type DscLogoSize = '16px' | '24px' | '32px' | '40px' | '48px' | '56px';

@Component({
  selector: 'dsc-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dsc-logo.component.html',
  styleUrls: ['./dsc-logo.component.scss'],
})
export class DscLogoComponent {
  @Input() type: DscLogoType = 'brand-full';
  @Input() theme: DscLogoTheme = 'default';
  @Input() size: DscLogoSize = '48px';
  @Input() alt: string = 'Logotipo Caixa';

  @HostBinding('class') get hostClasses(): string {
    return `dsc-logo dsc-logo--${this.type} dsc-logo--${this.theme}`;
  }

  @HostBinding('style.height') get logoHeight(): string {
    return this.size;
  }

  get logoPath(): string {
    const paths = {
      'brand-full': {
        default:
          'M0 0h100v30H0z M10 8h15l-2 4h-2l2 4h-4l-2-4h-3l2-4zm25 0h4v8h-4zm6 0h8l-2 4h-2l2 4h-4l-2-4h-2zm12 0h4l2 4-2 4h-4l-2-4zm10 0h15l-2 4h-2l2 4h-4l-2-4h-3l2-4z',
        inverse:
          'M0 0h100v30H0z M10 8h15l-2 4h-2l2 4h-4l-2-4h-3l2-4zm25 0h4v8h-4zm6 0h8l-2 4h-2l2 4h-4l-2-4h-2zm12 0h4l2 4-2 4h-4l-2-4zm10 0h15l-2 4h-2l2 4h-4l-2-4h-3l2-4z',
      },
      'synthesis-element': {
        default: 'M0 0h30v30H0z M8 10l8 0-4 8-4 2z M16 10l6 0 0 8-6 2z',
        inverse: 'M0 0h30v30H0z M8 10l8 0-4 8-4 2z M16 10l6 0 0 8-6 2z',
      },
    };
    return paths[this.type][this.theme];
  }

  // Cores oficiais CAIXA (Primary-90 e Secondary-70)
  get primaryColor(): string {
    return this.theme === 'default' ? '#005CA9' : '#FFFFFF';
  }

  get secondaryColor(): string {
    return '#F39200';
  }
}
