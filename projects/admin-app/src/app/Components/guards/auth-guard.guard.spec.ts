import { TestBed } from '@angular/core/testing';

import { AuthGuardGuard } from './auth-guard.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

describe('AuthGuardGuard', () => {
  let guard: AuthGuardGuard;
  let router : Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should call canActivate', () => {
    const createUrlTreeSpy = spyOn(router, 'createUrlTree').and.returnValue({} as UrlTree);
    localStorage.removeItem('Login');
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(createUrlTreeSpy).toHaveBeenCalledWith(['/login']);
  });
  it('should call canActivate return true ', () => {
    spyOn(localStorage, 'getItem').and.returnValue('loginData');
    const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(canActivate).toBe(true);
  });
});
