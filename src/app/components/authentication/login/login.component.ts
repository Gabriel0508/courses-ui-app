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
import { AuthActions } from 'src/app/state/authentication/auth.actions';
import { Store } from '@ngrx/store';
import {
  selectAuthError,
  selectIsLoading,
} from 'src/app/state/authentication/auth.selector';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidationsService } from 'src/app/core/services/validations.service';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  hidePassword = true;

  constructor(
    private readonly store: Store,
    private router: Router,
    private auth: AuthService,
    private readonly fb: FormBuilder,
    private readonly validationService: ValidationsService
  ) {
    this.loading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.auth
    .login(email, password)
      .subscribe(() => this.router.navigate(['/dashboard']));  
    //this.store.dispatch(AuthActions.login({ email, password }));
  }

  loginWithGoogle() {
    this.store.dispatch(AuthActions.loginWithGoogle());
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;
  }

  onInputsValidation(field: string, errorType: string): boolean {
    return this.validationService.isFieldValid(
      field,
      errorType,
      this.loginForm
    );
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
