import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FormGroup } from "@angular/forms";

export function noOnlyWhitespace(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && typeof control.value === 'string' && control.value.trim().length === 0) {
      return { noOnlyWhitespace: true };
    }
    return null;
  };
}

/**Constantes usadas para el login */
export function  getErrorMessage(controlName: string, fieldName: string, form: FormGroup): string {
  const control = form.get(controlName);

  if (control?.hasError('minlength')) {
    const requiredLength = control.errors?.['minlength'].requiredLength;
    return `${fieldName} debe tener al menos ${requiredLength} caracteres.`;
  }
  if (control?.hasError('maxlength')) {
    const requiredLength = control.errors?.['maxlength'].requiredLength;
    return `${fieldName} no debe tener más de ${requiredLength} caracteres.`;
  }
  if (control?.hasError('noOnlyWhitespace')) {
    const requiredLength = control.errors?.['noOnlyWhitespace'].requiredLength;
    return `${fieldName} no puede contener solo espacios en blanco.`;
  }
  if(control?.hasError("pattern")){
    return `${fieldName} carece de caracteres válidos.`;
  }
  return '';
}
/*
getErrorMessage(controlName: string, fieldName: string): string {
  const control = this.formLogin.get(controlName);

  if (control?.hasError('minlength')) {
    const requiredLength = control.errors?.['minlength'].requiredLength;
    return `${fieldName} debe tener al menos ${requiredLength} caracteres.`;
  }
  if (control?.hasError('maxlength')) {
    const requiredLength = control.errors?.['maxlength'].requiredLength;
    return `${fieldName} no debe tener más de ${requiredLength} caracteres.`;
  }
  if(control?.hasError("pattern")){
    return `${fieldName} carece de caracteres válidos.`;
  }
  return '';
}*/