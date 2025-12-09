import { TestBed } from '@angular/core/testing';

import { FeaturePeopleService } from './feature-people.service';

describe('FeaturePeopleService', () => {
  let service: FeaturePeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturePeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
