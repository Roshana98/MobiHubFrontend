import { TestBed } from '@angular/core/testing';

import { SellerApiService } from './seller-api.service';

describe('SellerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerApiService = TestBed.get(SellerApiService);
    expect(service).toBeTruthy();
  });
});
