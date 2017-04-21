import { TestBed, inject } from '@angular/core/testing';

import { AlreadyLoggedService } from './already-logged.service';

describe('AlreadyLoggedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlreadyLoggedService]
    });
  });

  it('should ...', inject([AlreadyLoggedService], (service: AlreadyLoggedService) => {
    expect(service).toBeTruthy();
  }));
});
