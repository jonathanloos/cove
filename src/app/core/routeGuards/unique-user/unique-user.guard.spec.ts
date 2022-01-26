import { TestBed } from '@angular/core/testing';

import { UniqueUserGuard } from './unique-user.guard';

describe('UniqueUserGuard', () => {
  let guard: UniqueUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UniqueUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
