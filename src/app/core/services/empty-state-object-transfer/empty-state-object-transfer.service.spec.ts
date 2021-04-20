import { TestBed } from '@angular/core/testing';

import { EmptyStateObjectTransferService } from './empty-state-object-transfer.service';

describe('EmptyStateObjectTransferService', () => {
  let service: EmptyStateObjectTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmptyStateObjectTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
