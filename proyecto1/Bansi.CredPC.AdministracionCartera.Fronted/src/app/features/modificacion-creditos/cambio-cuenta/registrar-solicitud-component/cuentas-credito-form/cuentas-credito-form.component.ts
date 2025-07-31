import { Component, Input, inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

//->Angular material
import { MatTableDataSource } from '@angular/material/table';

//->Alertas swal
import { AlertaError, AlertaWarning } from '@functions/genericas'

//->Interfaces
import { ConsultarCuentasAsociadasCreditoRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarCuentasAsociadasCreditoRequest';
import { ConsultarCuentasAsociadasCreditoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarCuentasAsociadasCreditoResponse';
import { ResultConsultarCuentasAsociadasCreditoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarCuentasAsociadasCreditoResponse';

//->Servicios
import { CambioCuentaChequesService } from '@services/modificacion-creditos-services/cambio-cuenta-cheques.service';
import { SpinnerService } from '@services/shared-services/spinner.service';

@Component({
  selector: 'app-cuentas-credito-form',
  templateUrl: './cuentas-credito-form.component.html',
 // styleUrl: './cuentas-credito-form.component.scss',
})

export class CuentasCreditoFormComponent {
  /**
   * Inputs
   */
  @Input() numeroCreditoRecibido: string = '';
  @Input() tieneSolicitudesPendientesAutorizarRecibido: boolean = false;
  @Input() estaVigenteRecibido: boolean = false;

  /**
   * Inyecciones
   */
  cambioCuentaChequesService = inject(CambioCuentaChequesService);

  /**
  * Propiedades
  */
  desactivarCheck: boolean = false;
  registrarSolicitudRequest: ConsultarCuentasAsociadasCreditoRequest = {} as ConsultarCuentasAsociadasCreditoRequest;
  cuentasAsociadasResponse: ConsultarCuentasAsociadasCreditoResponse = {} as ConsultarCuentasAsociadasCreditoResponse;
  displayedColumns: string[] = [
    'select',
    'tipoCuenta',
    'naturaleza',
    'cuentaCheques',
    'producto',
    'divisa',
    'cliente'
  ];
  dataSource = new MatTableDataSource<ResultConsultarCuentasAsociadasCreditoResponse>();
  selection = new SelectionModel<ResultConsultarCuentasAsociadasCreditoResponse>(true, []);
  clickedRows = new Set<ResultConsultarCuentasAsociadasCreditoResponse>();

  /**
   ************************ S T A R T ********************************
   */

  constructor(public spinnerService: SpinnerService) { }

  /** Evento para controlar el numero de credito ingresado */
  ngOnChanges() {
    this.registrarSolicitudRequest.numeroCredito = this.numeroCreditoRecibido;
    this.BuscarCuentasAsociadas();
  }

  /**
   * Buscar las cuentas asociadas al numero de credito ingresado
   *
   * @public
   */
  private BuscarCuentasAsociadas(): void {
    this.desactivarCheck = false;
    //->Limpiar parametros
    this.dataSource = new MatTableDataSource<ResultConsultarCuentasAsociadasCreditoResponse>();
    this.selection = new SelectionModel<ResultConsultarCuentasAsociadasCreditoResponse>(true, []);
    this.clickedRows = new Set<ResultConsultarCuentasAsociadasCreditoResponse>();
    if (this.registrarSolicitudRequest.numeroCredito != '') {
      this.spinnerService.show(); //-> iniciar spinner
      this.cambioCuentaChequesService
        .postConsultarCuentasAsociadasCredito(this.registrarSolicitudRequest)
        .subscribe({
          next: (data) => {
            this.spinnerService.hide(); //-> finalizar spinner
            //->Validar que sea success
            if (!data.success) {
              AlertaError(data?.message);
            }
            else {
              if (data.operationResultItem.length == 0) {
                //->Limpiar datasource
                this.dataSource = new MatTableDataSource<ResultConsultarCuentasAsociadasCreditoResponse>();

                //->Alerta de no existen cuentas
                AlertaWarning('No existen cuentas', 'No existen cuentas asociadas al credito');

              } else {
                //->Asignar dataSource
                this.dataSource = new MatTableDataSource<ResultConsultarCuentasAsociadasCreditoResponse>(data.operationResultItem);
              }
            }
          },
          error: (err) => {
            this.spinnerService.hide(); //-> finalizar spinner
            //->LLamar a la alerta de error
            AlertaError(err?.message)
          },
        });
    }
    this.desactivarCheck = false;
    if (this.tieneSolicitudesPendientesAutorizarRecibido || !this.estaVigenteRecibido) this.desactivarCheck = true;
  }

  /**
   * Devuelve al formulario principal las cuentas seleccionada
   * @returns ResultCuentasAsociadasResponse
   */
  public EnviarCuentasSeleccionadas(): ResultConsultarCuentasAsociadasCreditoResponse[] {
    //->Buscar todas las filas seleccionadas y agregarlas al array que enviaremos
    let enviarInformacion = {} as ResultConsultarCuentasAsociadasCreditoResponse[];
    enviarInformacion = this.selection.selected
    return enviarInformacion;
  }

  /**
  * Grid seleccionado
  *
  * @returns {boolean}
  */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

} //-> Cierre clase
