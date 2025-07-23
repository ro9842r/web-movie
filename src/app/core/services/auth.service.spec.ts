import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthService', () => {
  let service: AuthService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useClass: MockRouter },
      ],
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router) as any;
  });

  afterEach(() => {
    localStorage.removeItem('jwt_token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for isAuthenticated if token exists', () => {
    localStorage.setItem('jwt_token', 'test_token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false for isAuthenticated if token does not exist', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should set token and navigate to dashboard on login', () => {
    const token = 'new_test_token';
    service.login(token);
    expect(localStorage.getItem('jwt_token')).toBe(token);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should remove token and navigate to login on logout', () => {
    localStorage.setItem('jwt_token', 'test_token');
    service.logout();
    expect(localStorage.getItem('jwt_token')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
