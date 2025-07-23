import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

class MockAuthService {
  isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRouteSnapshot, useValue: {} },
        { provide: RouterStateSnapshot, useValue: { url: '/dashboard' } },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as any;
    router = TestBed.inject(Router) as any;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    expect(guard.canActivate(TestBed.inject(ActivatedRouteSnapshot), TestBed.inject(RouterStateSnapshot))).toBe(true);
  });

  it('should return false and navigate to login if the user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    expect(guard.canActivate(TestBed.inject(ActivatedRouteSnapshot), TestBed.inject(RouterStateSnapshot))).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
