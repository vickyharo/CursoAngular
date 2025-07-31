import { Component, inject, EventEmitter, Output } from '@angular/core';
import moment from 'moment'; //-> libreria para el manejo de fechas
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

//->Alertas swal
import { AlertaError, AlertaWarning } from '@functions/genericas';

//->Modales
import { SeleccionCreditoModalComponent } from '../seleccion-credito-modal/seleccion-credito-modal.component';

//->Constantes
import { constantsModificacionCreditos } from '@consts/modificacion-creditos.constants';

//->Modelos
import { ConsultarInformacionCreditoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCreditoResponse';
import { ResultConsultarInformacionCreditoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCreditoResponse';
import { ConsultarInformacionCreditoRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCreditoRequest';

//->Servicios
import { CambioCuentaChequesService } from '@services/modificacion-creditos-services/cambio-cuenta-cheques.service';
import { SpinnerService } from '@services/shared-services/spinner.service';

@Component({
  selector: 'app-buscar-credito-form',
  templateUrl: './buscar-credito-form.component.html',
  styleUrl: './buscar-credito-form.component.css',
})
export class BuscarCreditoFormComponent {
  /**
   * Outputs
   */
  @Output() numeroCreditoEnviado = new EventEmitter<string>();
  @Output() productoCreditoEnviado = new EventEmitter<string>();
  @Output() estaVigenteEnviado = new EventEmitter<boolean>();
  @Output() tieneSolicitudesPendientesAutorizarEnviado = new EventEmitter<boolean>();

  /**
   * Inyecciones
   */
  cambioCuentaChequesService = inject(CambioCuentaChequesService);
  modalService = inject(BsModalService);

  /**
   * Propiedades
   */
  tieneSolicitudesPendientesAutorizar: boolean = false;
  solicitudesPendientesAutorizar: number = 0;
  maxLengthNumberCredit: number = constantsModificacionCreditos.MaxLengthNumeroCredito;
  txtBuscarNumeroCredito: string = '';
  informacionCreditoRequest: ConsultarInformacionCreditoRequest = {} as ConsultarInformacionCreditoRequest;

  /**
   * Propiedades formulario
   */
  txtNumeroCreditoForm: string = '';
  txtNumeroClienteForm: string = '';
  txtClienteForm: string = '';
  txtCodProductoForm: string = '';
  txtProductoForm: string = '';
  txtFechaAperturaForm: string = '';
  txtFechaVencimientoForm: string = '';
  txtEstatusForm: string = '';

  /**
   ************************ S T A R T ********************************
   */
  constructor(private bsModalRef: BsModalRef, public spinnerService: SpinnerService) { }

  /**
   * Buscar el credito ingresado
   *
   * @public
   */
  public BuscarCredito(): void {
    //->Validacion minima de solo 7 caracteres para realizar la busqueda del credito
    if (this.txtBuscarNumeroCredito.length < constantsModificacionCreditos.MinLengthNumeroNumeroCuenta) {
      AlertaWarning(
        'Número de crédito',
        `El número de crédito ingresado debe tener un minimo de ${constantsModificacionCreditos.MinLengthNumeroNumeroCuenta} caracteres para poder realizar la busqueda.`
      );
      return;
    }

    this.spinnerService.show();
    //->Limpiamos valor de solicitudes pendientes
    this.tieneSolicitudesPendientesAutorizar = false;

    //->Limpiamos el detalle del formulario ya que se inicio una nueva busqueda
    this.LimpiarDetalle();
    this.informacionCreditoRequest.numeroCredito = this.txtBuscarNumeroCredito;
    this.cambioCuentaChequesService
      .postConsultarInformacionCredito(this.informacionCreditoRequest)
      .subscribe({
        next: (data) => {
          this.spinnerService.hide(); //->Terminar spinner
          //->Validamos que sea success
          if (!data.success) {
            AlertaError(data?.message);
          } else {
            if (data.operationResultItem.length == 0) {
              //->Alerta de no existen cuentas
              AlertaWarning('NO EXISTE', 'El número de crédito no existe');
            } else {
              this.ValidarResultado(data);
            }
          }
        },
        error: (err) => {
          this.spinnerService.hide(); //->Terminar spinner
          //->Mandar alerta de error
          AlertaError(err?.message);
        },
      });
  }

  /**
   * Validar el resultado para mostrar el modal de resultados
   *
   * @private
   * @param {ConsultarInformacionCreditoResponse} data
   */
  private ValidarResultado(data: ConsultarInformacionCreditoResponse) {
    //->Valida que tenga mas de un resultado
    if (data.operationResultItem.length > 1) {
      //->Llamamos a modal para seleccionar un valor
      this.SeleccionarCredito(data.operationResultItem);
    } else {
      //->Asignamos las solicitudes pendientes de autorizar
      this.ValidarSolicitudesPendientes(
        data.operationResultItem[data.operationResultItem.length - 1]
      );

      //->Asignamos el detalle directamente ya que solo tiene 1 registro el resultado
      this.AsignarDetalle(
        data.operationResultItem[data.operationResultItem.length - 1]
      );

      //-> buscar las cuentas asociadas al credito
      this.numeroCreditoEnviado.emit(
        this.informacionCreditoRequest.numeroCredito
      );
    }
  }

  /**
   * Asignar detalle al formulario
   *
   * @private
   * @param {ResultConsultarInformacionCreditoResponse} detalle
   */
  private AsignarDetalle(detalle: ResultConsultarInformacionCreditoResponse): void {
    this.txtNumeroCreditoForm = detalle.numeroCredito;
    this.txtNumeroClienteForm = detalle.numeroCliente;
    this.txtClienteForm = detalle.nombreCliente;
    this.txtCodProductoForm = detalle.numeroProducto;
    this.txtProductoForm = detalle.nombreProducto;
    this.txtFechaAperturaForm = moment(detalle.fechaApertura).format('DD/MM/YYYY');
    this.txtFechaVencimientoForm = moment(detalle.fechaVencimiento).format('DD/MM/YYYY');
    this.txtEstatusForm = detalle.estatusCredito;

    //->Validar que el estatus NO sea liquidado
    let estatus: boolean = false;
    if (detalle.estatusCredito.toUpperCase().trim() != 'LIQUIDADO') estatus = true;
    else estatus = false;

    //->Transmitir el estatus del credito ya que solo se podra cambiar la cuenta con estatus vigente
    this.estaVigenteEnviado.emit(estatus);

    //-> Emitir producto del credito para validacion de cargo y abono
    this.productoCreditoEnviado.emit(detalle.numeroProducto);
  }

  /**
   * Asignamos las solicitudes pendientes de autorizar
   *
   * @private
   * @param {ResultConsultarInformacionCreditoResponse} credito
   */
  private ValidarSolicitudesPendientes(credito: ResultConsultarInformacionCreditoResponse): void {
    //->Validamos si tiene solicitudes pendientes
    this.tieneSolicitudesPendientesAutorizar = credito.existenSolicitudesPendientesAutorizar;
    this.tieneSolicitudesPendientesAutorizarEnviado.emit(this.tieneSolicitudesPendientesAutorizar);
  }

  /**
   * Limpiar el detalle del formulario
   *
   * @private
   */
  private LimpiarDetalle() {
    this.txtNumeroCreditoForm = '';
    this.txtNumeroClienteForm = '';
    this.txtClienteForm = '';
    this.txtCodProductoForm = '';
    this.txtProductoForm = '';
    this.txtFechaAperturaForm = '';
    this.txtFechaVencimientoForm = '';
    this.txtEstatusForm = '';
  }

  /**
   * Llamada al modal de seleccion de credito
   *
   * @private
   * @param {ResultConsultarInformacionCreditoResponse[]} data
   */
  private SeleccionarCredito(data: ResultConsultarInformacionCreditoResponse[]): void {
    let creditoSeleccionado: ResultConsultarInformacionCreditoResponse = {} as ResultConsultarInformacionCreditoResponse;

    const initialState = {
      creditosRecibidos: data, // Información que se envia al modal la propiedad debe existir en el modal
    };

    this.bsModalRef = this.modalService.show(SeleccionCreditoModalComponent, {
      initialState: initialState,
      animated: true,
      backdrop: 'static',
      class: 'modal-xl modal-dialog-centered modal-dialog-scrollable', // Centrar el modal
      ignoreBackdropClick: true, // Deshabilitar clics fuera del modal
      keyboard: false, // Deshabilitar tecla Escape
    });

    this.bsModalRef.content.creditoSeleccionado.subscribe((credito: any) => {
      //Asignamos el credito seleccionado desde el modal
      creditoSeleccionado = credito;

      //->Asignamos las solicitudes pendientes de autorizar
      this.ValidarSolicitudesPendientes(creditoSeleccionado);

      //->Asignamos detalle
      this.AsignarDetalle(creditoSeleccionado);

      //-> buscar las cuentas asociadas al credito seleccionado
      this.numeroCreditoEnviado.emit(creditoSeleccionado.numeroCredito);
    });
  }

  /**
   * Evento para permitir solo la escritura de números
   * @param event
   */
  public ValidateNumericInput(event: KeyboardEvent, permitirDecimales = false): void {
    let allowedKeys: RegExp;

    allowedKeys = permitirDecimales ? /^[0-9.]$/ : /[0-9]/;
    if (!allowedKeys.test(event.key)) {
      event.preventDefault();
    }
  }

  /**
   * Evento para permitir solo la escritura de números
   * @param event
   */
  public AllowPasteOnlyNumbers(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData?.getData('text') || '';

    const allowedPattern = /^[0-9]*$/; // Permitir solo números y puntos
    if (!allowedPattern.test(pastedText)) {
      event.preventDefault(); // Bloquear contenido no válido
    }
  }
}
