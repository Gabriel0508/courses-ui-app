import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthActions } from 'src/app/state/authentication/auth.actions';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.store.dispatch(AuthActions.register({ email, password }));
      console.log('dispatch done');
      this.router.navigate(['/home']);
      console.log('router done');
    }
  }

  // async onSubmit() {
  //   if (this.registerForm.valid) {
  //     try {
  //       const { email, password } = this.registerForm.value;
  //       await this.authService.register(email, password);
  //       this.router.navigate(['/dashboard']);
  //     } catch (error: any) {
  //       this.errorMessage = error.message;
  //     }
  //   }
  // }
}
