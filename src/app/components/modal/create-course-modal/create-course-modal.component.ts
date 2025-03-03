import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ValidationsService } from 'src/app/core/services/validations.service';
import { CourseApiActions } from 'src/app/state/item/item.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-modal',
  templateUrl: './create-course-modal.component.html',
  styleUrls: ['./create-course-modal.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseComponent {
  readonly dialog = inject(MatDialog);
  createItemForm: FormGroup = new FormGroup({});

  constructor(
    private readonly validationsService: ValidationsService,
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.iniFormItem();
  }

  onInputsValidation(field: string, errorType: string): string {
    return this.validationsService.isFieldValid(
      field,
      errorType,
      this.createItemForm
    );
  }

  onOwnerInputsValidation(controlName: string, errorType: string) {
    const control = this.createItemForm.get('owner')?.get(controlName);
    return control && control.hasError(errorType) && control.touched;
  }

  addNewCourse(): void {
    console.log('works');
    if (this.createItemForm.valid) {
      const courseData = this.createItemForm.value;
      console.log('form value', courseData);
      this.store.dispatch(
        CourseApiActions.createCourse({
          course: courseData,
        })
      );
    }
    console.log('course created');
    this.iniFormItem();
    this.onCloseModal();
  }

  private onCloseModal(): void {
    this.dialog.closeAll();
  }

  private iniFormItem() {
    const generatedId = Math.floor(Math.random() * 1000000);

    this.createItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isEnabled: [true],
      type: ['', Validators.required],
      owner: this.fb.group({
        id: [1, Validators.required], //TODO: use generic id
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }),
      image: [''],
    });
  }
}
