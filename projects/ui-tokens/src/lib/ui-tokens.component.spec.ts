import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTokensComponent } from './ui-tokens.component';

describe('UiTokensComponent', () => {
  let component: UiTokensComponent;
  let fixture: ComponentFixture<UiTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTokensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
