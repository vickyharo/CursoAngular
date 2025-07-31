import { FormGroup } from "@angular/forms";

/*Longitud de campos */
export const MaxLengthNumeroCredito = 12;
export const MaxLengthNumeroCuenta = 11;
export const MinLengthNumeroNumeroCuenta = 7;
export const MinLengthNumeroLineaPermitida = 7;
export const MaxLengthNumeroLinea = 11;

/*Estatus */
export const ESTATUS_DEFAULT = 0;
export const ESTATUS_EN_CAPTURA = 1;
export const ESTATUS_PENDIENTE_AUTORIZAR = 2;
export const ESTATUS_AUTORIZADO = 3;
export const ESTATUS_CANCELADO = 4;

/*Fechas Default*/
export const FECHA_INICIO = '0001-01-01T00:00:00';
export const FECHA_FIN = '0001-01-01T00:00:00';

export const constants = {
    CHAR_TOKEN_LENGTH: 6,
    MAX_CHAR_USERNAME: 125,
    MAX_CHAR_PASSWORD: 256,
    MIN_CHAR_PASSWORD: 6,

    APP_NAME: 'BANSI.CREDPC.MODIFICACREDITO.SERVICE.DLL',
};


/**Constantes usadas para el login */
export function getErrorMessage(controlName: string, fieldName: string, form: FormGroup): string {
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
    return '';
}