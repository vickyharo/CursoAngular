import { Component, inject, EventEmitter, Output } from '@angular/core';
import moment from 'moment'; //-> libreria para el manejo de fechas

//->Servicios
import { CambioMontoLineaService } from '@services/modificacion-creditos-services/cambio-monto-linea.service';
import { CambioCuentaChequesService } from '@services/modificacion-creditos-services/cambio-cuenta-cheques.service'; //->Para traer los estatus

//->Alertas swal
import Swal from 'sweetalert2';
import { AlertaError, AlertaWarning } from '@functions/genericas'

//->Spinner
import { SpinnerService } from '@services/shared-services/spinner.service';

//->Constantes
import { constantsModificacionCreditos } from '@consts/modificacion-creditos.constants';

//->Interfaces
import { ResultObtenerEstatusSolicitudCambioCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ObtenerEstatusSolicitudCambioCuentaResponse';
import { ConsultarSolicitudesCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/ConsultarSolicitudesCambioLineaRequest';
import { ResultConsultarSolicitudesCambioLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/ConsultarSolicitudesCambioLineaResponse';

@Component({
  selector: 'app-buscar-monto-linea-form',
  templateUrl: './buscar-monto-linea-form.component.html',
  styleUrl: './buscar-monto-linea-form.component.scss'
})
export class BuscarMontoLineaFormComponent {
  /**
      * Outputs
      */
  @Output() consultaSolicitudesEnvio = new EventEmitter<ResultConsultarSolicitudesCambioLineaResponse[]>();
  @Output() recalcularPaginado = new EventEmitter();

  /**
    * Inyecciones
    */
  cambioMontoLineaService = inject(CambioMontoLineaService);
  cambioCuentaChequesService = inject(CambioCuentaChequesService);

  /**
  * Propiedades
  */
  estatusComboLista: ResultObtenerEstatusSolicitudCambioCuentaResponse[] = {} as ResultObtenerEstatusSolicitudCambioCuentaResponse[];
  seleccionada: ResultObtenerEstatusSolicitudCambioCuentaResponse = {} as ResultObtenerEstatusSolicitudCambioCuentaResponse;
  maxLengthNumeroLinea = constantsModificacionCreditos.MaxLengthNumeroLinea;

  txtFechaInicio: Date = new Date();
  txtFechaFin: Date = new Date();
  txtNumeroLinea: string = '';
  txtEstatusCombo: string = '';
  cambioFechaInicio: boolean = false;
  cambioFechaFin: boolean = false;

  /**
  ************************ S T A R T ********************************
  */

  constructor(
    public spinnerService: SpinnerService
  ) {
  }

  ngOnInit() {
    //->Llamamos al metodo para asignar los estatus en el combo
    this.AsignarEstatus();
  }

  /**
   * Resetear valores en cada busqueda
   *
   * @private
   */
  private ResetearValores(): void {
    this.txtFechaInicio = new Date();
    this.txtFechaFin = new Date();
    this.txtNumeroLinea = '';
    this.txtEstatusCombo = '';
    this.cambioFechaInicio = false;
    this.cambioFechaFin = false;
  }

  /**
   * Envio de las validaciones del formulario
   */
  EnvioFormulario(): void {

    //->Limpiar parametros
    let resultConsultarSolicitudesCambioLineaResponse = {} as ResultConsultarSolicitudesCambioLineaResponse[];
    let consultarSolicitudesCambioLineaRequest: ConsultarSolicitudesCambioLineaRequest = {} as ConsultarSolicitudesCambioLineaRequest;

    //-> Pasar las solicitudes al componente padre para limpiar el array
    this.consultaSolicitudesEnvio.emit(
      resultConsultarSolicitudesCambioLineaResponse
    );

    //->Validaciones antes de enviar el formulario
    //->> Tomar valores default
    let _fechaInicio: any = '0001-01-01T00:00:00';
    let _fechaFin: any = '0001-01-01T00:00:00';
    let _numeroLinea: string = '';
    let _estatus: number = 0;

    //->Tomar fecha de inicio
    if (this.cambioFechaInicio) {
      if (this.txtFechaInicio == null) {
        AlertaError('Se ingreso un valor incorrecto en el campo Fecha Inicio mm/dd/yyyy');
        return;
      }
      else _fechaInicio = moment(this.txtFechaInicio);
    }

    //->Tomar fecha fin
    if (this.cambioFechaFin) {
      if (this.txtFechaFin == null) {
        AlertaError('Se ingreso un valor incorrecto en el campo Fecha Fin mm/dd/yyyy');
        return;
      }
      else _fechaFin = moment(this.txtFechaFin)
    }

    //->Validar que las fechas cumplan con el rango correcto
    if (this.txtFechaInicio > this.txtFechaFin) {
      AlertaError('La Fecha Inicio debe ser menor que la Fecha Fin');
      return;
    }

    //-> Mandar mensaje de confirmacion
    Swal.fire({
      title: 'BUSCAR SOLICITUDES',
      text: '¿Estás seguro de realizar esta acción la consulta tardara un momento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'bsi-button-modal-confirm',
        cancelButton: 'bsi-button-modal-cancel',
        title: 'bsi-title-modal'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {

        //->Tomar numero de linea
        if (this.txtNumeroLinea != null && this.txtNumeroLinea != '') {
          //->Rellenar con ceros

          let linea: number;
          linea = parseInt(this.txtNumeroLinea);

          this.txtNumeroLinea = (linea < 0 ? '-' : '')
            + ((new Array(this.txtNumeroLinea + 1).join("0"))
              + Math.abs(linea)).slice(-this.txtNumeroLinea);

              _numeroLinea = this.txtNumeroLinea;
        }

        //->Tomar estatus
        if (this.txtEstatusCombo != null && this.txtEstatusCombo != '' && this.txtEstatusCombo != undefined)
          _estatus = parseInt(this.txtEstatusCombo);

        //->Crear solicitud
        consultarSolicitudesCambioLineaRequest.idEstatus = _estatus;
        consultarSolicitudesCambioLineaRequest.numeroLinea = _numeroLinea;
        consultarSolicitudesCambioLineaRequest.fechaRegistroInicio = _fechaInicio;
        consultarSolicitudesCambioLineaRequest.fechaRegistroFin = _fechaFin;

        this.ResetearValores();
        this.spinnerService.show(); //-> iniciar spinner
        this.cambioMontoLineaService
          .postConsultarSolicitudesCambioLinea(consultarSolicitudesCambioLineaRequest)
          .subscribe({
            next: (data) => {
              this.spinnerService.hide(); //-> finalizar spinner
              if (!data.success) {
                AlertaError(data?.message);
              } else {
                if (data.operationResultItem.length == 0) {
                  AlertaWarning('NO EXISTEN REGISTROS', 'No existen registros con los valores ingresados');
                }
                resultConsultarSolicitudesCambioLineaResponse = data.operationResultItem;
                //-> Pasar las solicitudes al componente padre
                this.consultaSolicitudesEnvio.emit(
                  resultConsultarSolicitudesCambioLineaResponse
                );
              }
            },
            error: (err) => {
              this.spinnerService.hide(); //-> finalizar spinner
              AlertaError(err?.message);
            },
            complete: ()=>{
              this.recalcularPaginado.emit();
            }

          });
      }
    });
  }

  /**
   * Asignar estatus al combo en la carga inicial
   *
   * @public
   */
  public AsignarEstatus(): void {
    this.cambioCuentaChequesService
      .getObtenerEstatusSolicitudCambioCuenta()
      .subscribe({
        next: (data) => {
          this.spinnerService.hide(); //-> finalizar spinner
          if (!data.success) {
            AlertaError(data?.message);
          } else {

            if (data.operationResultItem.length != 0) {

              //->Asignar dataSource
              this.estatusComboLista = data.operationResultItem;
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

  /**
   * Notificar que el usuario realizo un cambio en la fecha
   *
   * @public
   * @param {*} elemento
   */
  public CambioFechaInicio(elemento: any) {
    this.cambioFechaInicio = true;
  }

  /**
   * Notificar que el usuario realizo un cambio en la fecha
   *
   * @public
   * @param {*} elemento
   */
  public CambioFechaFin(elemento: any) {
    this.cambioFechaFin = true;
  }
}//->Cierre de la clase
