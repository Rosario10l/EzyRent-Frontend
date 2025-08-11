import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolictudPage } from './solictud.page';

describe('SolictudPage', () => {
  let component: SolictudPage;
  let fixture: ComponentFixture<SolictudPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolictudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
