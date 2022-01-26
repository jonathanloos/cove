import { TestBed } from '@angular/core/testing';

import { CopingStrategiesService } from './coping-strategies.service';

describe('CopingStrategiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CopingStrategiesService = TestBed.get(CopingStrategiesService);
    expect(service).toBeTruthy();
  });
});
