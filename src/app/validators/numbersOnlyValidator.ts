import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that the input value does not contain only numbers.
 * Returns an error if the value consists entirely of digits.
 * @returns A validator function that checks for numbers-only input
 */
export function numbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      return null;
    }
    
    return /^\d+$/.test(value.toString()) ? { numbersOnly: true } : null;
  };
}