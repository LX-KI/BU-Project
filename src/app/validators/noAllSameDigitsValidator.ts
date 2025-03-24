import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noAllSameDigitsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (/^(\d)\1{9}$/.test(value)) {
      return { allSameDigits: true };
    }

    return null;
  };
}
