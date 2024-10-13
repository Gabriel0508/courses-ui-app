import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  isFieldValid(field: string, errorType: string, registerForm: FormGroup) {
    return (
      (registerForm.controls[field].touched ||
        registerForm.controls[field].dirty) &&
      registerForm.controls[field].errors?.[errorType]
    );
  }
}
