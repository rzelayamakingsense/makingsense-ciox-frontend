import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isDate, isPresent, parseDate } from '@helpers/lang';

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (isPresent(Validators.required(control))) {
    return null;
  }

  let v: string = control.value;
  v = parseDate(v);
  return isDate(v) ? null : { date: true };
};
