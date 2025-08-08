import { Component, inject, Input } from '@angular/core';

//->Alertas swal
import { AlertaError, AlertaWarning } from '@functions/genericas'

//->Constantes
import { constantsModificacionCreditos } from '@consts/modificacion-creditos.constants';

//->Modelos
import { ResultConsultarCuentasAsociadasCreditoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarCuentasAsociadasCreditoResponse';
import { ConsultarInformacionCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCuentaRequest';
import { ConsultarInformacionCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCuentaResponse';
import { ResultConsultarInformacionCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCuentaResponse';
import { ValidacionCambioCuenta } from '@models/modificacion-creditos-models/cambio-cuenta/ValidacionCambioCuenta';
import { DetalleRegistrarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/RegistrarSolicitudCambioCuentaRequest';
import { ValidarCuentaPermiteAbonoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ValidarCuentaPermiteAbonoResponse';
import { ValidarCuentaPermiteAbonoRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ValidarCuentaPermiteAbonoRequest';
import { ValidarCuentaPermiteCargoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ValidarCuentaPermiteCargoResponse';
import { ValidarCuentaPermiteCargoRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ValidarCuentaPermiteCargoRequest';
import { ResultConsultarInformacionCreditoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCreditoResponse';

//->Servicios
import { CambioCuentaChequesService } from '@services/modificacion-creditos-services/cambio-cuenta-cheques.service';
import { SpinnerService } from '@services/shared-services/spinner.service';

@Component({
  selector: 'app-detalle-cuenta-component',
  templateUrl: './detalle-cuenta-component.component.html',
  styleUrl: './detalle-cuenta-component.component.scss'
})
export class DetalleCuentaComponentComponent {

  /**
   * Inputs
   */
  @Input() cuentaOrigenEntrada: ResultConsultarCuentasAsociadasCreditoResponse = {} as ResultConsultarCuentasAsociadasCreditoResponse;
  @Input() productoCreditoRecibido: string = '';

  /**
   * Propiedades
   */
  validacionCuentaNueva: boolean = false;
  mensajeError: string = '';
  resultConsultarInformacionCuentaResponse: ResultConsultarInformacionCuentaResponse = {} as ResultConsultarInformacionCuentaResponse;
  maxLengthNumeroCuenta = constantsModificacionCreditos.MaxLengthNumeroCuenta;

  /**
   * Inyecciones
   */
  cambioCuentaChequesService = inject(CambioCuentaChequesService);

  /**
   * Propiedades cuenta origen
   */
  productoDelCredito: string = '';
  txtNumeroCredito: string = '';
  txtTipoCuenta: string = '';
  txtNaturaleza: string = '';

  txtCuentaOrigen: string = '';
  txtDivisa: string = '';
  txtCliente: string = '';
  txtProducto: string = '';


  /**
   * Propiedades cuenta nueva
   */
  txtBuscarCuenta: string = '';
  txtInfoDivisa: string = '';
  txtInfoCliente: string = '';
  txtInfoProducto: string = '';

  /**
   ************************ S T A R T ********************************
   */

  constructor(public spinnerService: SpinnerService) { }

  ngOnInit(): void {
    //->Asignar el detalle de la cuenta origen
    this.AsignarDetalle(this.cuentaOrigenEntrada,)
  }

  /**
   * Asignar detalle al formulario
   *
   * @private
   * @param {ResultConsultarCuentasAsociadasCreditoResponse} detalle
   */
  private AsignarDetalle(detalle: ResultConsultarCuentasAsociadasCreditoResponse): void {
    this.productoDelCredito = this.productoCreditoRecibido;

    this.txtNumeroCredito = detalle.numeroCredito;
    this.txtTipoCuenta = detalle.tipoCuenta;
    this.txtNaturaleza = detalle.naturaleza;

    this.txtCuentaOrigen = detalle.cuentaCheques;
    this.txtDivisa = `${detalle.codDivisa} ${detalle.divisa}`;
    this.txtProducto = `${detalle.producto} ${detalle.aplicacionCuenta}`;
    this.txtCliente = `${detalle.numeroCliente} ${detalle.nombreCliente}`;
  }

  /**
   * Buscar la nueva cuenta
   *
   * @public
   */
  public BuscarCuenta(): void {

    //->Limpiar campos
    this.LimpiarDetalleInfoCuenta();

    let cambioCuentaRequest: ConsultarInformacionCuentaRequest = {} as ConsultarInformacionCuentaRequest;
    this.validacionCuentaNueva = false;

    //->Construir mensaje de error
    this.mensajeError = `${this.cuentaOrigenEntrada.naturaleza} ${this.cuentaOrigenEntrada.tipoCuenta} ${this.cuentaOrigenEntrada.cuentaCheques}`

    //->Asignar el numero de cuenta
    cambioCuentaRequest.numeroCuenta = this.txtBuscarCuenta

    //->Validar valor de entrada

    if (typeof cambioCuentaRequest.numeroCuenta === "string" && cambioCuentaRequest.numeroCuenta.length === 0) {

      AlertaWarning('CUENTA', 'Campo nueva cuenta vacio');

      return; //-> Regresamos ya que no tiene valor
    }

    //->Rellenar con ceros
    this.FillNumericInput();

    //->Asignar ya rellenado
    cambioCuentaRequest.numeroCuenta = this.txtBuscarCuenta

    //Validar que la cuenta ingresada no sea igual a la cuenta existente
    if (cambioCuentaRequest.numeroCuenta == this.cuentaOrigenEntrada.cuentaCheques) {

      AlertaWarning('CUENTA', 'La nueva cuenta es igual a la cuenta origen');

      return; //-> Regresamos ya que es igual la cuenta
    }

    this.spinnerService.show(); //-> iniciar spinner

    //-> Buscamos el numero de cuenta en el servidor en caso contrario regresar mensaje de no encontrado
    this.cambioCuentaChequesService
      .postConsultarInformacionCuenta(cambioCuentaRequest)
      .subscribe({
        next: (data) => {
          this.spinnerService.hide(); //-> finalizar spinner

          if (!data.success) {
            AlertaError(data?.message);
          }
          else {
            if (data.operationResultItem == null) {

              AlertaWarning('NO EXISTE', 'El número de cuenta no existe');
            } else {
              this.ValidarSiPermiteAbono(data);
              //this.AsignarDetalleInfoCuenta(data);
            }
          }
        },
        error: (err) => {
          this.spinnerService.hide(); //-> finalizar spinner
          AlertaError(err?.message);
        },
      });
  }

  /**
   * Valida si la cuenta permite abono
   * @param detalleCuentaNueva
   */
  private ValidarSiPermiteAbono(detalleCuentaNueva: ConsultarInformacionCuentaResponse): void {
    //->Objeto para validacion
    let validarCuentaPermiteAbonoRequest: ValidarCuentaPermiteAbonoRequest = {} as ValidarCuentaPermiteAbonoRequest;
    validarCuentaPermiteAbonoRequest.numeroCuenta = this.txtBuscarCuenta;

    this.spinnerService.show(); //-> iniciar spinner

    //-> Buscamos el numero de cuenta en el servidor en caso contrario regresar mensaje de no encontrado
    this.cambioCuentaChequesService
      .postValidarCuentaPermiteAbono(validarCuentaPermiteAbonoRequest)
      .subscribe({
        next: (data) => {
          this.spinnerService.hide(); //-> finalizar spinner
          if (!data.success) {
            AlertaError(data?.message);
          }
          else {
            this.ValidarSiPermiteCargo(detalleCuentaNueva);
          }
        },
        error: (err) => {
          this.spinnerService.hide(); //-> finalizar spinner
          AlertaError(err?.message);
        },
      });
  }

  /**
   * Valida si la cuenta permite cargo
   * @param detalleCuentaNueva
   */
  private ValidarSiPermiteCargo(detalleCuentaNueva: ConsultarInformacionCuentaResponse): void {
    //->Objeto para validacion
    let validarCuentaPermiteCargoRequest: ValidarCuentaPermiteCargoRequest = {} as ValidarCuentaPermiteCargoRequest;
    validarCuentaPermiteCargoRequest.numeroCuenta = this.txtBuscarCuenta;
    validarCuentaPermiteCargoRequest.numeroCredito = this.txtNumeroCredito;
    validarCuentaPermiteCargoRequest.producto = this.productoDelCredito;

    this.spinnerService.show(); //-> iniciar spinner
    //-> Validamos si la cuenta ingresada permite un cargo
    this.cambioCuentaChequesService
      .postValidarCuentaPermiteCargo(validarCuentaPermiteCargoRequest)
      .subscribe({
        next: (data) => {
          this.spinnerService.hide(); //-> finalizar spinner
          if (!data.success) {
            AlertaError('Cuenta no permite cargo');
          }
          else {
            this.AsignarDetalleInfoCuenta(detalleCuentaNueva);
          }
        },
        error: (err) => {
          this.spinnerService.hide(); //-> finalizar spinner
          AlertaError(err?.message);
        },
      });
  }

  /**
   * Asignar detalle al formulario
   *
   * @private
   * @param {ConsultarInformacionCuentaResponse} detalle
   */
  private AsignarDetalleInfoCuenta(detalle: ConsultarInformacionCuentaResponse): void {

    //-> Asignamos información de la cuenta
    this.resultConsultarInformacionCuentaResponse = detalle.operationResultItem;

    this.txtInfoDivisa = `${this.resultConsultarInformacionCuentaResponse.codDivisa} ${this.resultConsultarInformacionCuentaResponse.divisa}`;
    this.txtInfoCliente = `${this.resultConsultarInformacionCuentaResponse.numeroCliente} ${this.resultConsultarInformacionCuentaResponse.nombreCliente}`;
    this.txtInfoProducto = `${this.resultConsultarInformacionCuentaResponse.producto} ${this.resultConsultarInformacionCuentaResponse.tipoCuenta}`;

    //->Asignamos una validacion correcta
    this.validacionCuentaNueva = true;
    this.mensajeError = '';
  }

  /**
   * Asignar detalle al formulario
   *
   * @private
   * @param {InformacionCuentaResponse} detalle
   */
  private LimpiarDetalleInfoCuenta(): void {
    this.txtInfoDivisa = '';
    this.txtInfoCliente = '';
    this.txtInfoProducto = '';

    //->Asignamos una validacion correcta
    this.validacionCuentaNueva = false;
    this.mensajeError = 'Campos vacios';
  }

  /**
   * Retornamos el objeto con la nueva cuenta
   *
   * @public
   * @returns {ValidacionCambioCuenta}
   */
  public GuardarCuenta(): ValidacionCambioCuenta {
    this.spinnerService.hide();
    let objetoValidacionCambioCuenta: ValidacionCambioCuenta = {} as ValidacionCambioCuenta;

    //->Validar la cuenta
    if (!this.validacionCuentaNueva) objetoValidacionCambioCuenta.mensaje = `${this.cuentaOrigenEntrada.naturaleza} ${this.cuentaOrigenEntrada.tipoCuenta} ${this.cuentaOrigenEntrada.cuentaCheques}`;
    else objetoValidacionCambioCuenta.mensaje = ''

    objetoValidacionCambioCuenta.cuentaValida = this.validacionCuentaNueva;

    let detalleSolicitudCambioCuentaRequest: DetalleRegistrarSolicitudCambioCuentaRequest = {} as DetalleRegistrarSolicitudCambioCuentaRequest;

    //-> Información de la cuenta original
    detalleSolicitudCambioCuentaRequest.clavenaturaleza = this.cuentaOrigenEntrada.codNaturaleza;
    detalleSolicitudCambioCuentaRequest.clavetipocuenta = this.cuentaOrigenEntrada.codTipoCuenta;
    detalleSolicitudCambioCuentaRequest.coddivctaoriginal = this.cuentaOrigenEntrada.codDivisa;
    detalleSolicitudCambioCuentaRequest.codpdctoctaoriginal = this.cuentaOrigenEntrada.producto;
    detalleSolicitudCambioCuentaRequest.cuentaoriginal = this.cuentaOrigenEntrada.cuentaCheques;

    //-> Información de la nueva cuenta
    detalleSolicitudCambioCuentaRequest.coddivctanueva = this.resultConsultarInformacionCuentaResponse.codDivisa;
    detalleSolicitudCambioCuentaRequest.codpdctoctanueva =
      detalleSolicitudCambioCuentaRequest.cuentanueva = this.resultConsultarInformacionCuentaResponse.cuentaCheques;

    detalleSolicitudCambioCuentaRequest.iddetalle = 0;
    detalleSolicitudCambioCuentaRequest.idsolicitud = 0;

    //Asignar el detalle al objeto que vamos a regresar
    objetoValidacionCambioCuenta.DetalleSolicitudCambioCuentaRequest = detalleSolicitudCambioCuentaRequest;

    return objetoValidacionCambioCuenta;
  }

  /**
   * Evento para permitir solo la escritura de números
   * @param event
   */
  ValidateNumericInput(event: KeyboardEvent, permitirDecimales = false): void {
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
  AllowPasteOnlyNumbers(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData?.getData('text') || '';

    const allowedPattern = /^[0-9]*$/; // Permitir solo números y puntos
    if (!allowedPattern.test(pastedText)) {
      event.preventDefault(); // Bloquear contenido no válido
    }
  }

  FillNumericInput(): void {

    let cuenta: number;
    cuenta = parseInt(this.txtBuscarCuenta);

    this.txtBuscarCuenta = (cuenta < 0 ? '-' : '')
      + ((new Array(this.maxLengthNumeroCuenta + 1).join("0"))
        + Math.abs(cuenta)).slice(-this.maxLengthNumeroCuenta);
  }
}//-> Cierre clase
