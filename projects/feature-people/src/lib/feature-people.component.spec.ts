import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePeopleComponent } from './feature-people.component';

describe('FeaturePeopleComponent', () => {
  let component: FeaturePeopleComponent;
  let fixture: ComponentFixture<FeaturePeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePeopleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
