import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthActions } from 'src/app/state/authentication/auth.actions';
import { Store } from '@ngrx/store';
import {
  selectAuthError,
  selectIsLoading,
} from 'src/app/state/authentication/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.loading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit() {
    this.store.dispatch(AuthActions.getAuthState()); //TODO: check why this is needed here
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(AuthActions.login({ email, password }));
      console.log('login done');
    }
  }

  loginWithGoogle() {
    this.store.dispatch(AuthActions.loginWithGoogle());
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;
    console.log('Password visibility toggled:', !this.hidePassword);
  }
}
