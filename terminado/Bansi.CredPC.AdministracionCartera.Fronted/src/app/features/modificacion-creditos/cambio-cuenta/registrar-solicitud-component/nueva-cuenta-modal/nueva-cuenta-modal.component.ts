import { Component, EventEmitter, inject, OnInit, OnDestroy, ViewChildren, QueryList, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

//->Alertas swal
import Swal from 'sweetalert2';
import { AlertaError, AlertaWarning } from '@functions/genericas'

//->Servicios
import { SolicitudCambioCuentaChequesService } from '@services/modificacion-creditos-services/local-storage/solicitud-cambio-cuenta-cheques.service'
import { CambioCuentaChequesService } from '@services/modificacion-creditos-services/cambio-cuenta-cheques.service';
import { AuthService } from '@services/security-services/auth.service';
import { SpinnerService } from '@services/shared-services/spinner.service';

//->Modelos
import { ResultConsultarCuentasAsociadasCreditoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarCuentasAsociadasCreditoResponse';
import { ValidacionCambioCuenta } from '@models/modificacion-creditos-models/cambio-cuenta/ValidacionCambioCuenta';
import { RegistrarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/RegistrarSolicitudCambioCuentaRequest';
import { DetalleRegistrarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/RegistrarSolicitudCambioCuentaRequest';
//->Constantes
import { constantsModificacionCreditos } from '@consts/modificacion-creditos.constants';

//->Forms
import { DetalleCuentaComponentComponent } from "../detalle-cuenta-component/detalle-cuenta-component.component";

@Component({
  selector: 'app-nueva-cuenta-modal',
  templateUrl: './nueva-cuenta-modal.component.html',
  styleUrl: './nueva-cuenta-modal.component.scss'
})
export class NuevaCuentaModalComponent implements OnInit, OnDestroy {
  /**
   * Entradas
   */
  @Input() productoCreditoRecibido: string = '';

  /**
   * ViewChilds
   */
  @ViewChildren('selectorDetalle') selectorDetalle!: QueryList<DetalleCuentaComponentComponent>;

  /**
   * Inyecciones
   */
  cambioCuentaChequesService = inject(CambioCuentaChequesService);
  router = inject(Router);
  authService = inject(AuthService);

  /**
   * Recuperacion de array a traves de url
   */
  eventoCuentasCambiar: ResultConsultarCuentasAsociadasCreditoResponse[] = {} as ResultConsultarCuentasAsociadasCreditoResponse[];
  subscription: Subscription = new Subscription;

  /**
   * Propiedades
   */
  numeroCreditoGlobal: string = '';
  public browserRefresh: boolean | undefined;
  successState: boolean = false;
  @Output() onSuccess = new EventEmitter<{ success: boolean }>();

  /**
  ************************ S T A R T ********************************
  */

  constructor(private solicitudCambioCuentaChequesService: SolicitudCambioCuentaChequesService, public spinnerService: SpinnerService, private bsModalRef: BsModalRef,) { }

  ngOnInit() {
    /*-> Cargar previa informacion de la ventana anterior*/
    this.subscription = this.solicitudCambioCuentaChequesService.cuentasActuales.subscribe(message => this.eventoCuentasCambiar = message)

    /*Tomar el numero de credito*/
    this.numeroCreditoGlobal = this.eventoCuentasCambiar[0].numeroCredito;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /** Boton de cancelar*/
  CancelarEdicion() {
    this.solicitudCambioCuentaChequesService.LimpiarCambiarCuentas();
    this.bsModalRef.hide();
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

  /**
   * Llamar al hijo para guardar la cuenta
   *
   * @public
   */
  public GuardarCuentas(): void {

    let arrayValidacionCambioCuenta: Array<ValidacionCambioCuenta> = new Array<ValidacionCambioCuenta>;
    let respuestaValidacionCambioCuenta: ValidacionCambioCuenta = {} as ValidacionCambioCuenta;

    //-> Mandar mensaje de confirmacion
    Swal.fire({
      title: 'Solicitar cambio de cuenta',
      text: '¿Estás seguro de realizar esta acción?',
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

        //-->Recorrer lista de componente para llamar al metodo de guardar
        this.selectorDetalle.forEach((child) => {

          respuestaValidacionCambioCuenta = child.GuardarCuenta();
          arrayValidacionCambioCuenta.push(respuestaValidacionCambioCuenta);
        });

        this.GuardarCambioSolicitud(arrayValidacionCambioCuenta);
      }
    });
  }

  /**
   * Guardamos en base de datos la solicitud
   *
   * @private
   * @param {ValidacionCambioCuenta[]} arrayValidacionCambioCuenta
   */
  private GuardarCambioSolicitud(arrayValidacionCambioCuenta: Array<ValidacionCambioCuenta>): void {

    let existeError: boolean = false;
    let mensajeGeneral: string = '';
    let listaDetalleSolicitudes: Array<DetalleRegistrarSolicitudCambioCuentaRequest> = new Array<DetalleRegistrarSolicitudCambioCuentaRequest>;

    //->Validar si tienen un mensaje de error
    for (const element of arrayValidacionCambioCuenta) {

      //->Obtenemos el detalle de cada solicitud y lo almacenamos
      listaDetalleSolicitudes.push(element.DetalleSolicitudCambioCuentaRequest);

      //->Recorremos para ver si no hubo ningun error
      if (!element.cuentaValida || element.mensaje != '') {
        existeError = true
        mensajeGeneral = `(${element.mensaje})\n${mensajeGeneral}`
      }
    }

    //-> Mostrar mensaje en pantalla de error de validación
    if (existeError) {
      //->Llamamos a alerta
      AlertaWarning('CAMPOS VACIOS', `Existen cuentas no validas:\n${mensajeGeneral}`);
      return; //->Retornamos ya que hubo un error
    }

    //->Creamos el objeto solictud
    let solicitudCambioCuentaRequest: RegistrarSolicitudCambioCuentaRequest = {} as RegistrarSolicitudCambioCuentaRequest;

    solicitudCambioCuentaRequest.numeroCredito = this.numeroCreditoGlobal;
    solicitudCambioCuentaRequest.usuarioSolicita = this.authService.getUser();
    solicitudCambioCuentaRequest.idStatusSolicitud = constantsModificacionCreditos.ESTATUS_PENDIENTE_AUTORIZAR; //->Pendiente de autorización
    solicitudCambioCuentaRequest.comentario = '';
    //Asignamos las solicitudes
    solicitudCambioCuentaRequest.detalleSolicitud = listaDetalleSolicitudes;

    this.spinnerService.show(); //-> iniciar spinner

    this.successState = false;

    //LLamar al servicio y guardar solicitud
    this.cambioCuentaChequesService
      .postRegistrarSolicitudCambioCuenta(solicitudCambioCuentaRequest)
      .subscribe({
        next: async (data) => {
          this.spinnerService.hide(); //-> finalizar spinner
          this.solicitudCambioCuentaChequesService.LimpiarCambiarCuentas(); //->limpia la localstorage

          if (data.success) {
            //-> Emitir evento como correcto
            this.successState = true;
            this.onSuccess.emit({ success: this.successState });
          }
          else {
            //->Alerta error
            await AlertaError(data?.message).then(() => {
              //->Emitir resultado
              this.onSuccess.emit({ success: this.successState });
            });
          }
        },
        error: async (error) => {
          this.spinnerService.hide(); //-> finalizar spinner
          //->Alerta error
          await AlertaError(error?.message).then(() => {
            //->Emitir resultado
            this.onSuccess.emit({ success: this.successState });
          });
        }
      })
  }
}
