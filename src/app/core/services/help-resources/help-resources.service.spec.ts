import { TestBed } from '@angular/core/testing';

import { HelpResourcesService } from './help-resources.service';

describe('HelpResourcesService', () => {
  let service: HelpResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
