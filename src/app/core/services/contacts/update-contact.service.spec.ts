import { TestBed } from '@angular/core/testing';

import { UpdateContactService } from './update-contact.service';

describe('UpdateContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateContactService = TestBed.get(UpdateContactService);
    expect(service).toBeTruthy();
  });
});
