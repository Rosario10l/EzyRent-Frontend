import { TestBed } from '@angular/core/testing';

import { EscalarAVendedorService } from './escalar-avendedor.service';

describe('EscalarAVendedorService', () => {
  let service: EscalarAVendedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscalarAVendedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
