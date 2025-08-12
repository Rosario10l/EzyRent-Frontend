import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudRentadorPage } from './solicitud-rentador.page';

describe('SolicitudRentadorPage', () => {
  let component: SolicitudRentadorPage;
  let fixture: ComponentFixture<SolicitudRentadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudRentadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
