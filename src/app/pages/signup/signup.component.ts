import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm!: FormGroup;
  isLoading = signal(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly ref: DynamicDialogRef
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  closeDialog(): void {
    this.ref.close();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading.set(true);
    }
  }
}
