import { AbstractControl, ValidationErrors } from '@angular/forms';

export function mayorDeEdadValidator(control: AbstractControl): ValidationErrors | null {
  const edad = control.value;
  if (edad === null || edad === '') {
    return null;
  }
  return Number(edad) >= 18 ? null : { menorDeEdad: true };
}
