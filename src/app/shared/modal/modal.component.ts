import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ValidationsService } from 'src/app/core/services/validations.service';
import { ToastrService } from 'ngx-toastr';
import { CourseApiActions } from 'src/app/state/item/items.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  modalRef?: BsModalRef;
  createItemForm: FormGroup = new FormGroup({});

  constructor(
    private readonly validationsService: ValidationsService,
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private toastr: ToastrService
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
    if (this.createItemForm.valid) {
      const courseData = this.createItemForm.value;
      console.log('form value', courseData);
      this.store.dispatch(
        CourseApiActions.createCourse({
          course: courseData,
        })
      );
    }
    this.iniFormItem();
    this.onCloseModal();
  }

  onCloseModal(): void {
    this.closeModal.emit();
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
        email: ['', [Validators.required, Validators.email]]
      }),
      image: [''],
    });
  }

  // private showSuccess(): void {
  //   this.toastr.success(
  //     'Congrats!',
  //     `The course ${this.createItemForm.controls['name'].value}`,
  //     {
  //       timeOut: 5000,
  //     }
  //   );
  // }
}
