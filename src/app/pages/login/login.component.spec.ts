import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty values', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
    expect(component.loginForm.get('rememberMe')?.value).toBe(false);
  });

  it('should make the email control required', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTruthy();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should make the password control required', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalsy();
    expect(passwordControl?.errors?.['required']).toBeTruthy();
  });

  it('should set isLoading to true on valid form submission', () => {
    component.loginForm.get('email')?.setValue('test@example.com');
    component.loginForm.get('password')?.setValue('password123');
    component.loginForm.get('rememberMe')?.setValue(true);

    expect(component.loginForm.valid).toBeTruthy();

    component.onSubmit();
    expect(component.isLoading()).toBe(true);
  });

  it('should not set isLoading to true on invalid form submission', () => {
    component.loginForm.get('email')?.setValue('invalid');
    component.loginForm.get('password')?.setValue('');

    expect(component.loginForm.valid).toBeFalsy();

    component.onSubmit();
    expect(component.isLoading()).toBe(false);
  });

  it('should disable the submit button when the form is invalid', () => {
    component.loginForm.get('email')?.setValue('invalid');
    component.loginForm.get('password')?.setValue('');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('p-button')).nativeElement;
    expect(submitButton.querySelector('button').disabled).toBeTruthy();
  });

  it('should enable the submit button when the form is valid', () => {
    component.loginForm.get('email')?.setValue('test@example.com');
    component.loginForm.get('password')?.setValue('password123');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('p-button')).nativeElement;
    expect(submitButton.querySelector('button').disabled).toBeFalsy();
  });
});