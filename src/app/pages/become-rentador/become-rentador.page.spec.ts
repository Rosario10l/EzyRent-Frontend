import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BecomeRentadorPage } from './become-rentador.page';

describe('BecomeRentadorPage', () => {
  let component: BecomeRentadorPage;
  let fixture: ComponentFixture<BecomeRentadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeRentadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
