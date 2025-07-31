import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let guard: AuthGuard;
  let AuthServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    AuthServiceMock = {
      isLoggedIn: jasmine.createSpy()
    };
    routerMock = {
      navigate: jasmine.createSpy()
    };
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: AuthServiceMock },
        { provide: Router, useValue: routerMock }
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('debe devolver true si el usuario está conectado', () => {
    AuthServiceMock.isLoggedIn.and.returnValue(true);
    expect(guard.canActivate()).toBeTruthy();
  });
  it('debe devolver false y navegar a /login si el usuario no ha iniciado sesión', () => {
    AuthServiceMock.isLoggedIn.and.returnValue(false);
    expect(guard.canActivate()).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
