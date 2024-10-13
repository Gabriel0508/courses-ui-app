import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ValidationsService } from 'src/app/core/services/validations.service';
import { CourseApiActions } from 'src/app/state/item/items.actions';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{
  createItemForm: FormGroup = new FormGroup({});

  constructor(
    private readonly validationsService: ValidationsService,
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
      this.iniFormItem()
  }

  onInputsValidation(field: string, errorType: string): string {
    return this.validationsService.isFieldValid(
      field,
      errorType,
      this.createItemForm
    )
  }

  addNewCourse(): void {
    if (this.createItemForm.valid) {
      console.log(this.createItemForm.value);
      this.store.dispatch(
        CourseApiActions.createCourse({
          course: this.createItemForm.value,
        })
      );
      this.createItemForm.reset();
    }
  }

  private iniFormItem() {
    this.createItemForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }
}
