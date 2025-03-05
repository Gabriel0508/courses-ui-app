import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  isFieldValid(field: string, errorType: string, form: FormGroup): boolean {
    return (
      (form.controls[field].touched ||
        form.controls[field].dirty) &&
        form.controls[field].errors?.[errorType]
    );
  }
}
