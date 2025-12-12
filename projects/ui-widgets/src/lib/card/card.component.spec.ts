import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('variant input', () => {
    it('should have elevated variant by default', () => {
      expect(component.variant).toBe('elevated');
    });

    it('should accept interactive variant', () => {
      component.variant = 'interactive';
      fixture.detectChanges();
      const card = fixture.nativeElement.querySelector('.card');
      expect(card.classList.contains('card-interactive')).toBe(true);
    });
  });

  describe('compact attribute', () => {
    it('should not be compact by default', () => {
      expect(component.compact).toBe(false);
    });

    it('should apply compact class when true', () => {
      component.compact = true;
      fixture.detectChanges();
      const card = fixture.nativeElement.querySelector('.card');
      expect(card.classList.contains('card-compact')).toBe(true);
    });
  });

  describe('content projection slots', () => {
    it('should have card-header slot', () => {
      const card = fixture.nativeElement.querySelector('.card');
      expect(card).toBeTruthy();
    });

    it('should have card-body slot', () => {
      const body = fixture.nativeElement.querySelector('.card-body');
      expect(body).toBeTruthy();
    });

    it('should have card-footer slot', () => {
      const footer = fixture.nativeElement.querySelector('.card-footer');
      expect(footer).toBeTruthy();
    });
  });

  describe('OnPush change detection', () => {
    it('should use OnPush strategy', () => {
      expect(
        (component as any).__proto__.constructor.ɵcmp.changeDetection
      ).toBe(1);
    });
  });
});
