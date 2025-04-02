import { TestBed } from '@angular/core/testing';

import { ValidationsService } from './validations.service';
import { FormControl, FormGroup } from '@angular/forms';

describe('ValidationsService', () => {
  let service: ValidationsService;
  let formGroup: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationsService);

    formGroup = new FormGroup({
      name: new FormControl('', [])
    })
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when the field is touched or dirty and has a specific error', () => {
    formGroup.controls['name'].markAsTouched();
    formGroup.controls['name'].setErrors({ required: true });

    const result = service.isFieldValid('name', 'required', formGroup);
    expect(result).toBe(true);
  });

  it('should return false when the field is touched but does not have the specific error', () => {
    formGroup.controls['name'].markAsTouched();
    formGroup.controls['name'].setErrors({ minlength: true });

    const result = service.isFieldValid('name', 'required', formGroup);
    expect(result).toBe(undefined);
  });

  it('should return false when the field is neither touched nor dirty', () => {
    const result = service.isFieldValid('name', 'required', formGroup);
    expect(result).toBe(false);
  });

  it('should return false when the field is valid and does not have errors', () => {
    formGroup.controls['name'].markAsTouched();
    formGroup.controls['name'].setErrors(null);

    const result = service.isFieldValid('name', 'required', formGroup);
    expect(result).toBe(undefined);
  });

  it('should return true when the field is dirty and has the specific error', () => {
    formGroup.controls['name'].markAsDirty();
    formGroup.controls['name'].setErrors({ required: true });

    const result = service.isFieldValid('name', 'required', formGroup);
    expect(result).toBe(true);
  });
});
