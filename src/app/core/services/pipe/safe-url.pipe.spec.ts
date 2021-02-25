import { TestBed } from '@angular/core/testing';

import { SafeUrlPipe } from './safe-url.pipe';

describe('PipeService', () => {
  let service: SafeUrlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafeUrlPipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
