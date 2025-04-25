import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class ValidacionesPropiasFormulario {
  static multiplo5(control: AbstractControl): ValidationErrors | null {
    let nro = parseInt(control.value);
    if (nro % 5 == 0)
      return null;
    else
      return { multiplo5: true }
  }
}