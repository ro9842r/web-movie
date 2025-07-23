import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signup form with empty values', () => {
    expect(component.signupForm).toBeDefined();
    expect(component.signupForm.get('email')?.value).toBe('');
    expect(component.signupForm.get('password')?.value).toBe('');
  });

  it('should make the email control required', () => {
    const emailControl = component.signupForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.signupForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTruthy();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should make the password control required', () => {
    const passwordControl = component.signupForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalsy();
    expect(passwordControl?.errors?.['required']).toBeTruthy();
  });

  it('should enforce minimum password length', () => {
    const passwordControl = component.signupForm.get('password');
    passwordControl?.setValue('short'); // Less than 6 characters
    expect(passwordControl?.valid).toBeFalsy();
    expect(passwordControl?.errors?.['minlength']).toBeTruthy();

    passwordControl?.setValue('longenough'); // 10 characters
    expect(passwordControl?.valid).toBeTruthy();
  });

  it('should set isLoading to true on valid form submission', () => {
    component.signupForm.get('email')?.setValue('test@example.com');
    component.signupForm.get('password')?.setValue('password123');

    expect(component.signupForm.valid).toBeTruthy();

    component.onSubmit();
    expect(component.isLoading()).toBe(true);
  });

  it('should not set isLoading to true on invalid form submission', () => {
    component.signupForm.get('email')?.setValue('invalid');
    component.signupForm.get('password')?.setValue('');

    expect(component.signupForm.valid).toBeFalsy();

    component.onSubmit();
    expect(component.isLoading()).toBe(false);
  });

  it('should disable the submit button when the form is invalid', () => {
    component.signupForm.get('email')?.setValue('invalid');
    component.signupForm.get('password')?.setValue('');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('p-button')).nativeElement;
    expect(submitButton.querySelector('button').disabled).toBeTruthy();
  });

  it('should enable the submit button when the form is valid', () => {
    component.signupForm.get('email')?.setValue('test@example.com');
    component.signupForm.get('password')?.setValue('password123');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('p-button')).nativeElement;
    expect(submitButton.querySelector('button').disabled).toBeFalsy();
  });
});
