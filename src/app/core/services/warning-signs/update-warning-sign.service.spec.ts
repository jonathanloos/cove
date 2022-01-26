import { TestBed } from '@angular/core/testing';

import { UpdateWarningSignService } from './update-warning-sign.service';

describe('UpdateWarningSignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateWarningSignService = TestBed.get(UpdateWarningSignService);
    expect(service).toBeTruthy();
  });
});
