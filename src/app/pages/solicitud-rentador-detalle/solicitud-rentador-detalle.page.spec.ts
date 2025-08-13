import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudRentadorDetallePage } from './solicitud-rentador-detalle.page';

describe('SolicitudRentadorDetallePage', () => {
  let component: SolicitudRentadorDetallePage;
  let fixture: ComponentFixture<SolicitudRentadorDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudRentadorDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
