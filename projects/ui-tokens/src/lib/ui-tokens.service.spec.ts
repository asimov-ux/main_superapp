import { TestBed } from '@angular/core/testing';

import { UiTokensService } from './ui-tokens.service';

describe('UiTokensService', () => {
  let service: UiTokensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiTokensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
