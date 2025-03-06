import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator to check if the address contains only numbers
export function numbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (/^\d+$/.test(value)) {
      return { numbersOnly: true }; // Return error if the address contains only numbers
    }
    return null; // No error
  };
}