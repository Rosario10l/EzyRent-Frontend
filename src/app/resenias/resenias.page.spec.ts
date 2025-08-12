import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReseniasPage } from './resenias.page';

describe('ReseniasPage', () => {
  let component: ReseniasPage;
  let fixture: ComponentFixture<ReseniasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseniasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
