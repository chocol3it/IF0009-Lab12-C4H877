import { FormBuilder, Validators } from '@angular/forms';
import { mayorDeEdadValidator } from '../validators/mayor-de-edad.validator';

export function crearAsistenteForm(fb: FormBuilder) {
  return fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    edad: [null as number | null, [Validators.required, mayorDeEdadValidator]],
  });
}
