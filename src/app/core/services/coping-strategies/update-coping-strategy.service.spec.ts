import { TestBed } from '@angular/core/testing';

import { UpdateCopingStrategyService } from './update-coping-strategy.service';

describe('UpdateCopingStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateCopingStrategyService = TestBed.get(UpdateCopingStrategyService);
    expect(service).toBeTruthy();
  });
});
