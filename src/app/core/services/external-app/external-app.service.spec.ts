import { TestBed } from '@angular/core/testing';

import { ExternalAppService } from './external-app.service';

describe('ExternalAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalAppService = TestBed.get(ExternalAppService);
    expect(service).toBeTruthy();
  });
});
