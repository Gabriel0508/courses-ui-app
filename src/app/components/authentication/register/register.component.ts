import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ValidationsService } from 'src/app/core/services/validations.service';
import { Observable } from 'rxjs';
import { selectAuthError } from 'src/app/state/authentication/auth.selector';
import { AuthService } from 'src/app/core/services/auth.service';

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
  standalone: true,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  hidePassword = true;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
    private router: Router,
    private readonly authService: AuthService,
    private readonly validationService: ValidationsService
  ) {
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, displayName } = this.registerForm.value;
      // this.store.dispatch(AuthActions.register({ email, password }));
      this.authService
        .register(email, password, displayName)
        .subscribe(() => this.router.navigate(['/dashboard']));
    }
  }

  onInputsValidation(field: string, errorType: string): boolean {
    return this.validationService.isFieldValid(
      field,
      errorType,
      this.registerForm
    );
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;
  }

  private initRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
