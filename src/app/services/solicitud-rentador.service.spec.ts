import { TestBed } from '@angular/core/testing';

import { SolicitudRentadorService } from './solicitud-rentador.service';

describe('SolicitudRentadorService', () => {
  let service: SolicitudRentadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudRentadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
