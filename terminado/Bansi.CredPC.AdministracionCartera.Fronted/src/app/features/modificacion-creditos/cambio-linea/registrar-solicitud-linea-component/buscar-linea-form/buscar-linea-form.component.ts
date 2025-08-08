import { Component, inject, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

//->Alertas swal
import { AlertaError, AlertaWarning } from '@functions/genericas';

//->Modales
import { SeleccionLineaModalComponent } from '../seleccion-linea-modal/seleccion-linea-modal.component';

//->Spinner
import { SpinnerService } from '@services/shared-services/spinner.service';
import { CambioMontoLineaService } from '@services/modificacion-creditos-services/cambio-monto-linea.service';

//->Constantes
import { constantsModificacionCreditos } from '@consts/modificacion-creditos.constants';

//->Modelos
import { ConsultarInformacionLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/ConsultarInformacionLineaRequest';
import { ConsultarInformacionLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/ConsultarInformacionLineaResponse';
import { ResultConsultarInformacionLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/ConsultarInformacionLineaResponse';

@Component({
  selector: 'app-buscar-linea-form',
  templateUrl: './buscar-linea-form.component.html'
})
export class BuscarLineaFormComponent {
  /**
   * Outputs
   */
  @Output() montoOriginalEnviado = new EventEmitter<number>();
  @Output() numeroLineaEnviada = new EventEmitter<string>();
  @Output() tieneSolicitudesPendientes = new EventEmitter<boolean>();

  /**
   * Inyecciones
   */
  cambioMontoLineaServiceService = inject(CambioMontoLineaService);
  modalService = inject(BsModalService);

  /**
   * Propiedades
   */
  tieneSolicitudesPendientesAutorizar: boolean = false;
  maxLengthNumeroLinea: number = constantsModificacionCreditos.MaxLengthNumeroLinea;
  txtBuscarNumeroLinea: string = '';

  /**
   * Propiedades del formulario
   *
   * @type {string}
   */
  txtNumeroLinea: string = '';
  txtCliente: string = '';
  txtEjecutivo: string = '';
  txtSucursal: string = '';
  txtProducto: string = '';
  txtDivisa: string = '';
  txtMontoAutorizado: string = '';
  txtMontoUtilizado: string = '';
  txtPlazoDias: string = '';
  txtEstatus: string = '';
  txtFechaAlta: string = '';
  txtFechaVencimiento: string = '';
  txtFechaAutorizacionLinea: string = '';

  /**
   ************************ S T A R T ********************************
   */

  constructor(
    private bsModalRef: BsModalRef,
    public spinnerService: SpinnerService
  ) { }

  /**
   * Busca el detalle de la linea de credito ingresada
   *
   * @private
   */
  public BuscarInformacionLinea(): void {
    //->Validacion minima de solo 7 caracteres para realizar la busqueda del credito
    if (this.txtBuscarNumeroLinea.length < constantsModificacionCreditos.MinLengthNumeroLineaPermitida) {
      AlertaWarning(
        'Número de linea',
        `El número de linea ingresado debe tener un minimo de ${constantsModificacionCreditos.MinLengthNumeroLineaPermitida} caracteres para poder realizar la busqueda.`
      );
      return;
    }

    this.spinnerService.show();

    //->Limpiamos el detalle del formulario ya que se inicio una nueva busqueda
    this.LimpiarDetalle();

    let consultarInformacionLineaRequest: ConsultarInformacionLineaRequest =
      {} as ConsultarInformacionLineaRequest;
    consultarInformacionLineaRequest.numeroLinea = this.txtBuscarNumeroLinea;

    this.cambioMontoLineaServiceService
      .postConsultarInformacionLinea(consultarInformacionLineaRequest)
      .subscribe({
        next: (data) => {
          this.spinnerService.hide(); //->Terminar spinner
          //->Validamos que sea success
          if (!data.success) {
            AlertaError(data?.message);
          } else {
            if (data.operationResultItem == null) {
              //->Alerta de no existe el numero de linea ingresado
              AlertaWarning(
                'NO EXISTE',
                'El número de línea ingresado no existe'
              );
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
   * Limpiar el detalle del formulario
   *
   * @private
   */
  private LimpiarDetalle() {
    this.txtNumeroLinea = '';
    this.txtCliente = '';
    this.txtEjecutivo = '';
    this.txtSucursal = '';
    this.txtProducto = '';
    this.txtDivisa = '';
    this.txtMontoAutorizado = '';
    this.txtMontoUtilizado = '';
    this.txtPlazoDias = '';
    this.txtEstatus = '';
    this.txtFechaAlta = '';
    this.txtFechaVencimiento = '';
    this.txtFechaAutorizacionLinea = '';
  }

  /**
   * Validar el resultado para mostrar el modal de resultados
   *
   * @private
   * @param {InformacionCreditoResponse} data
   */
  private ValidarResultado(data: ConsultarInformacionLineaResponse) {
    //->Valida que tenga mas de un resultado
    if (data.operationResultItem.length > 1) {
      //->Llamamos a modal para seleccionar un valor
      this.SeleccionarLinea(data.operationResultItem);
    } else {
      let row: ResultConsultarInformacionLineaResponse =
        data.operationResultItem[data.operationResultItem.length - 1];

      //->Validamos si tiene solicitudes pendientes
      this.ValidarSolicitudesPendientes(
        data.operationResultItem[data.operationResultItem.length - 1]
      );

      //->Asignamos el detalle directamente ya que solo tiene 1 registro el resultado
      this.AsignarDetalle(row);

      //-> enviar monto original al padre
      this.montoOriginalEnviado.emit(row.montoAutorizado);

      //-> enviar numero linea al padre
      this.numeroLineaEnviada.emit(row.numeroLinea);
    }
  }

  /**
   * Asignar detalle al formulario
   *
   * @private
   * @param {ResultInformacionCreditoResponse} detalle
   */
  private AsignarDetalle(detalle: ResultConsultarInformacionLineaResponse): void {
    this.txtNumeroLinea = `${detalle?.numeroLinea}`;
    this.txtCliente = `${detalle?.numeroCliente} ${detalle?.nombreCliente}`;
    this.txtEjecutivo = `${detalle?.codEjecutivo} ${detalle?.nombreEjecutivo}`;
    this.txtSucursal = `${detalle?.codSucursal} ${detalle?.nombreSucursal}`;
    this.txtProducto = `${detalle?.codProducto} ${detalle?.descProducto}`;
    this.txtDivisa = `${detalle?.codDivisa} ${detalle?.descDivisa}`;
    this.txtMontoAutorizado = `${detalle?.montoAutorizado}`;
    this.txtMontoUtilizado = `${detalle?.montoUtilizado}`;
    this.txtPlazoDias = `${detalle?.plazoDias}`;
    this.txtEstatus = `${detalle?.estatus} ${detalle?.descEstatusLinea}`;
    this.txtFechaAlta = `${detalle?.fechaAlta}`;
    this.txtFechaVencimiento = `${detalle?.fechaVencimiento}`;
    this.txtFechaAutorizacionLinea = `${detalle?.fechaAutorizacionLinea}`;
  }

  /**
   * Asignamos las solicitudes pendientes de autorizar
   *
   * @private
   * @param {ResultInformacionCreditoResponse} credito
   */
  private ValidarSolicitudesPendientes(credito: ResultConsultarInformacionLineaResponse): void {
    //->Validamos si tiene solicitudes pendientes
    this.tieneSolicitudesPendientesAutorizar =
      credito.existenSolicitudesPendientesAutorizar;

    //->Notificar al padre
    this.tieneSolicitudesPendientes.emit(
      this.tieneSolicitudesPendientesAutorizar
    );
  }

  /**
   * Llamada al modal de seleccion de credito
   *
   * @private
   * @param {ResultConsultarInformacionLineaResponse[]} data
   */
  private SeleccionarLinea(data: ResultConsultarInformacionLineaResponse[]): void {
    let lineaSeleccionada: ResultConsultarInformacionLineaResponse =
      {} as ResultConsultarInformacionLineaResponse;

    const initialState = {
      lineasRecibidas: data, // Información que se envia al modal la propiedad debe existir en el modal
    };

    this.bsModalRef = this.modalService.show(SeleccionLineaModalComponent, {
      initialState: initialState,
      animated: true,
      backdrop: 'static',
      class:
        'modal-xl modal-dialog-centered modal-dialog-scrollable acomodarLineas', // Centrar el modal
      ignoreBackdropClick: true, // Deshabilitar clics fuera del modal
      keyboard: false, // Deshabilitar tecla Escape
    });

    this.bsModalRef.content.lineaSeleccionada.subscribe((linea: any) => {
      //Asignamos el credito seleccionado desde el modal
      lineaSeleccionada = linea;

      //->Asignamos las solicitudes pendientes de autorizar
      this.ValidarSolicitudesPendientes(lineaSeleccionada);

      //->Asignamos detalle
      this.AsignarDetalle(lineaSeleccionada);

      //-> enviar el monto original
      this.montoOriginalEnviado.emit(lineaSeleccionada.montoAutorizado);

      //-> enviar numero linea al padre
      this.numeroLineaEnviada.emit(lineaSeleccionada.numeroLinea);
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
} //->cierre de la clase
