import { TestBed } from '@angular/core/testing';

import { RaceButtonService } from './race-button.service';

describe('RaceButtonService', () => {
  let service: RaceButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaceButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
