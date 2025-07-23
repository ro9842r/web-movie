import { DialogModule } from 'primeng/dialog';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SignupComponent } from '../../components/signup/signup.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CommonModule,
    DialogModule,
    DynamicDialogModule,
  ],
  templateUrl: './login.component.html',
  providers: [DialogService],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = signal(false);
  ref: DynamicDialogRef | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogService: DialogService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  openDialogCreateAccount(): void {
    this.ref = this.dialogService.open(SignupComponent, {
      width: '50vw',
      closable: true,
      modal: true,
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService
        .login({
          email,
          password,
        })
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            // Handle login error
            this.isLoading.set(false);
          },
        });
    }
  }
}
