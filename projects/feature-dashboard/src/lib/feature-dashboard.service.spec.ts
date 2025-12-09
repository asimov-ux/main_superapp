import { TestBed } from '@angular/core/testing';

import { FeatureDashboardService } from './feature-dashboard.service';

describe('FeatureDashboardService', () => {
  let service: FeatureDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
