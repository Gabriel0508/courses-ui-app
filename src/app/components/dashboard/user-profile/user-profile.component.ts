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
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LayoutTemplateComponent } from '../layout-template/layout-template.component';
import { ValidationsService } from 'src/app/core/services/validations.service';
import { UploadComponent } from "../../upload/upload.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LayoutTemplateComponent,
    UploadComponent
],
  standalone: true,
})
export class UserProfileComponent {
  user: User | null = null;
  private authStateSubscription: Subscription | undefined;
  profileForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly validationService: ValidationsService
  ) {}

  ngOnInit(): void {
    this.authStateSubscription = this.authService
      .getAuthState()
      .subscribe((user) => {
        this.user = user;
        if (user) {
          this.profileForm.patchValue({
            displayName: user.displayName,
          });
        }
      });
    this.initProfileForm();
  }

  ngOnDestroy(): void {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.user) {
      const { displayName } = this.profileForm.value;
      this.authService.updateProfile(displayName).subscribe(() => {
        this.profileForm.reset({ displayName: '' });
        this.router.navigate(['/dashboard']);
      });
    }
  }

  onInputsValidation(field: string, errorType: string): boolean {
    return this.validationService.isFieldValid(
      field,
      errorType,
      this.profileForm
    );
  }

  private initProfileForm(): void {
    this.profileForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
