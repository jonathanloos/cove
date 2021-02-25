import { TestBed } from '@angular/core/testing';

import { WarningSignsService } from './warning-signs.service';

describe('WarningSignsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarningSignsService = TestBed.get(WarningSignsService);
    expect(service).toBeTruthy();
  });
});
