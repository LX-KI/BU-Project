import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function numbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      return null;
    }
    
    return /^\d+$/.test(value.toString()) ? { numbersOnly: true } : null;
  };
}