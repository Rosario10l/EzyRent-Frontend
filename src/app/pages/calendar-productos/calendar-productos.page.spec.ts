import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarProductosPage } from './calendar-productos.page';

describe('CalendarProductosPage', () => {
  let component: CalendarProductosPage;
  let fixture: ComponentFixture<CalendarProductosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
