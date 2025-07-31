import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//-> Interfaces
import { ResultConsultarCuentasAsociadasCreditoResponse } from '../../models/modificacionCuenta/ConsultarCuentasAsociadasCreditoResponse';

@Injectable({
  providedIn: 'root'
})

export class SolicitudCambioCuentaChequesService {

  private cuentasRecurso = new BehaviorSubject<ResultConsultarCuentasAsociadasCreditoResponse[]>(this.ConvertirAobjeto() || {} as ResultConsultarCuentasAsociadasCreditoResponse[]);
  cuentasActuales = this.cuentasRecurso.asObservable();

  /**
   * Cambiamos los valores y los almacenamos en el local storage
   *
   * @param {ResultCuentasAsociadasResponse[]} cuentas
   */
  CambiarCuentas(cuentas: ResultConsultarCuentasAsociadasCreditoResponse[]): void {
    localStorage.setItem('cambioDeCuentas_Cuentas', JSON.stringify(cuentas)); //save to localstorage
    this.cuentasRecurso.next(cuentas); //update the observable
  }

  /**
   * Limpiamos las cuentas almacenadas en el localStorage
   */
  LimpiarCambiarCuentas(): void {
    localStorage.removeItem('cambioDeCuentas_Cuentas'); //->Remove from localstorage
    this.cuentasRecurso.next({} as ResultConsultarCuentasAsociadasCreditoResponse[]); //->Reset the observable
  }

  /**
   * Convierte el JSON almacenado en el localstorage a un objeto
   *
   * @returns {ResultCuentasAsociadasResponse[]}
   */
  ConvertirAobjeto(): ResultConsultarCuentasAsociadasCreditoResponse[] {
    let resultCuentasAsociadasResponse: ResultConsultarCuentasAsociadasCreditoResponse[] = {} as ResultConsultarCuentasAsociadasCreditoResponse[];
    let cuentasAlmacenadas = localStorage.getItem('cambioDeCuentas_Cuentas');
    if (cuentasAlmacenadas != null) //->Validamos que no venga vacio
    {
      let resArray: [] = [];
      resArray = JSON.parse(String(cuentasAlmacenadas));
      resultCuentasAsociadasResponse = <ResultConsultarCuentasAsociadasCreditoResponse[]>(resArray);
    }

    return resultCuentasAsociadasResponse;
  }
}
