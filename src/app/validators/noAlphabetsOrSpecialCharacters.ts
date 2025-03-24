import { AbstractControl, ValidatorFn } from "@angular/forms";

export function noAlphabetsOrSpecialCharactersValidator() :ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (value && /[a-zA-Z]/.test(value)) {
          return { containsAlphabets: true }; 
        }
        return null; 
      };
    }
