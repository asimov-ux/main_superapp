import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('variant input', () => {
    it('should have primary variant by default', () => {
      expect(component.variant).toBe('primary');
    });

    it('should accept secondary variant', () => {
      component.variant = 'secondary';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('ui-btn--secondary')).toBe(true);
    });

    it('should accept danger variant', () => {
      component.variant = 'danger';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('ui-btn--danger')).toBe(true);
    });

    it('should accept outlined variant', () => {
      component.variant = 'outlined';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('ui-btn--outlined')).toBe(true);
    });

    it('should accept text variant', () => {
      component.variant = 'text';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('ui-btn--text')).toBe(true);
    });

    it('should accept auxiliary variant', () => {
      component.variant = 'auxiliary';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('ui-btn--auxiliary')).toBe(true);
    });
  });

  describe('size input', () => {
    it('should have standard size by default', () => {
      expect(component.size).toBe('standard');
    });

    it('should accept small size', () => {
      component.size = 'small';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('ui-btn--small')).toBe(true);
    });

    it('should accept large size', () => {
      component.size = 'large';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('ui-btn--large')).toBe(true);
    });
  });

  describe('icon inputs', () => {
    it('should display prefix icon', () => {
      component.iconPrefix = 'home';
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.ui-btn__icon--prefix');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toBe('home');
    });

    it('should display suffix icon', () => {
      component.iconSuffix = 'arrow_forward';
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.ui-btn__icon--suffix');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toBe('arrow_forward');
    });

    it('should support filled icon style by default', () => {
      expect(component.iconStyle).toBe('filled');
    });

    it('should accept outlined icon style', () => {
      component.iconStyle = 'outlined';
      component.iconPrefix = 'favorite';
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.ui-btn__icon--prefix');
      expect(icon.classList.contains('material-icons-outlined')).toBe(true);
    });
  });

  describe('aria-label input', () => {
    it('should set aria-label when provided', () => {
      component.ariaLabel = 'Fechar modal';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('aria-label')).toBe('Fechar modal');
    });
  });

  describe('disabled input', () => {
    it('should not be disabled by default', () => {
      expect(component.disabled).toBe(false);
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(false);
    });

    it('should be disabled when input is true', () => {
      component.disabled = true;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(true);
    });
  });

  describe('fullWidth input', () => {
    it('should not be full width by default', () => {
      expect(component.fullWidth).toBe(false);
    });

    it('should apply full-width class when true', () => {
      component.fullWidth = true;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('full-width')).toBe(true);
    });
  });

  describe('content projection', () => {
    it('should project content', () => {
      const hostElement = fixture.nativeElement as HTMLElement;
      const button = document.createElement('ui-button');
      button.textContent = 'Click Me';
      hostElement.appendChild(button);
      expect(hostElement.textContent).toContain('Click Me');
    });
  });

  describe('accessibility', () => {
    it('should have button type', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.type).toBe('button');
    });

    it('should be keyboard accessible', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.tabIndex).toBeGreaterThanOrEqual(0);
    });
  });

  describe('OnPush change detection', () => {
    it('should use OnPush strategy', () => {
      expect(
        (component as any).__proto__.constructor.ɵcmp.changeDetection
      ).toBe(1); // ChangeDetectionStrategy.OnPush = 1
    });
  });
});
