import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

class MockAuthService {
  isAuthenticated = jasmine.createSpy();
}

class MockRouter {
  navigate = jasmine.createSpy();
}

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    });
    guard = TestBed.inject(LoginGuard);
    authService = TestBed.inject(AuthService) as any;
    router = TestBed.inject(Router) as any;
  });

  it('should allow access if not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    expect(guard.canActivate()).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should block access and redirect if authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    expect(guard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
