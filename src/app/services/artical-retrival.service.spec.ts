import { TestBed } from '@angular/core/testing';

import { ArticalRetrivalService } from './artical-retrival.service';

describe('ArticalRetrivalService', () => {
  let service: ArticalRetrivalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticalRetrivalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
