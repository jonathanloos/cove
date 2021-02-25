import { TestBed } from '@angular/core/testing';

import { UpdatePlaceService } from './update-place.service';

describe('UpdatePlaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatePlaceService = TestBed.get(UpdatePlaceService);
    expect(service).toBeTruthy();
  });
});
