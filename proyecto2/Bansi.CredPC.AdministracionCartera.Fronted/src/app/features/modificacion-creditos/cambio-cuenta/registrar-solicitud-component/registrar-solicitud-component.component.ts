import { Component, ViewChild, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

//->Alertas swal
import Swal, { SweetAlertResult } from 'sweetalert2';
import { AlertaError, AlertaEstaSeguro, AlertaSuccess, AlertaWarning } from '@functions/genericas'

//->Componentes
import { CuentasCreditoFormComponent } from './cuentas-credito-form/cuentas-credito-form.component';
import { ConfirmPasswordComponent } from '@sharedComponents/confirm-password/confirm-password.component';

//->Modelos
import { ResultConsultarCuentasAsociadasCreditoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarCuentasAsociadasCreditoResponse';
import { ConsultarSolicitudesCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarSolicitudesCambioCuentaRequest';
import { ResultConsultarSolicitudesCambioCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarSolicitudesCambioCuentaResponse';
import { CancelarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/CancelarSolicitudCambioCuentaRequest';
import { AutorizarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/AutorizarSolicitudCambioCuentaRequest';

//->Modales
import { NuevaCuentaModalComponent } from '../registrar-solicitud-component/nueva-cuenta-modal/nueva-cuenta-modal.component';

//->Constantes
import { constantsModificacionCreditos } from '@consts/modificacion-creditos.constants';
import { constantsSecurity } from '@consts/security.constants';

//->Servicios
import { CambioCuentaChequesService } from '@services/modificacion-creditos-services/cambio-cuenta-cheques.service';
import { SolicitudCambioCuentaChequesService } from '@services/modificacion-creditos-services/local-storage/solicitud-cambio-cuenta-cheques.service'
import { AuthService } from '@services/security-services/auth.service';
import { SpinnerService } from '@services/shared-services/spinner.service';

//->Permisos especiales botones
import { ComprobarPermisosEspecialesBotones } from '@guards/auth.guard';

@Component({
  selector: 'app-registrar-solicitud-component',
  templateUrl: './registrar-solicitud-component.component.html',
  styleUrl: './registrar-solicitud-component.component.css',
})
export class RegistrarSolicitudComponentComponent implements OnInit, OnDestroy {
  @ViewChild('selectorCuentas') selectorCuentas!: CuentasCreditoFormComponent;

  /**
   * Propiedades
   */
  desactivarBoton: boolean = true;
  activarDisabled: boolean = true;
  eventoCuentasCambiar: ResultConsultarCuentasAsociadasCreditoResponse[] = {} as ResultConsultarCuentasAsociadasCreditoResponse[];
  subscription: Subscription = new Subscription(); //->evento que almacena la informacion

  /**
   * Propiedades recibidas
   */
  numeroCreditoRecibido: string = '';
  estaVigenteRecibido: boolean = false;
  tieneSolicitudesPendientesAutorizarRecibido: boolean = false;
  productoCreditoRecibido: string = '';

  /**
   * Propiedades permisos especiales
   */
  permisoBotonGuardar: boolean = false;
  permisoBotonGuardarAutorizar: boolean = false;
  permisoBotonCancelar: boolean = false;

  /**
   * Inyecciones
   */
  router = inject(Router);
  cambioCuentaChequesService = inject(CambioCuentaChequesService);
  modalService = inject(BsModalService);
  authService = inject(AuthService);

  /**
  ************************ S T A R T ********************************
  */

  constructor(private solicitudCambioCuentaChequesService: SolicitudCambioCuentaChequesService, public spinnerService: SpinnerService, private bsModalRef: BsModalRef) { }

  ngOnInit() {

    //->Crear subscription para enviar los datos
    this.subscription = this.solicitudCambioCuentaChequesService.cuentasActuales.subscribe(
      (message) => (this.eventoCuentasCambiar = message)
    );

    //->Desactivamos el boton de cancelar
    this.desactivarBoton = true;

    let comprobarPermisosEspecialesBotones: ComprobarPermisosEspecialesBotones = new ComprobarPermisosEspecialesBotones(this.authService);
    //->Configurar los permisos especiales
    this.permisoBotonGuardar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CCC_CCCRegistrar_GUARDAR_SOLICITUD);
    this.permisoBotonGuardarAutorizar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CCC_CCCRegistrar_GUARDAR_AUTORIZAR_SOLICITUD);
    this.permisoBotonCancelar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CCC_CCCRegistrar_CANCELAR_SOLICITUD);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
 ************************Otros Metodos********************************
 */

  /**
   * Actualizar el numero de cuenta desde el componente hijo
   *
   * @public
   * @param {string} numeroCreditoEnviado
   */
  public ActualizarNumeroCreditoRecibido(numeroCreditoEnviado: string): void {
    this.numeroCreditoRecibido = numeroCreditoEnviado;
  }

  /**
   * Actualiza las solicitudes pendientes
   *
   * @public
   * @param {boolean} tieneSolicitudesPendientesAutorizarEnviado
   */
  public ActualizarTieneSolicitudesPendientesAutorizarRecibido(tieneSolicitudesPendientesAutorizarEnviado: boolean) {
    this.tieneSolicitudesPendientesAutorizarRecibido = tieneSolicitudesPendientesAutorizarEnviado;

    this.activarDisabled = false;

    if (this.tieneSolicitudesPendientesAutorizarRecibido) this.desactivarBoton = false;
    else this.desactivarBoton = true;
  }

  /**
   * Actualiza el numero de credito recibido este vigente
   *
   * @public
   * @param {boolean} estaVigenteEnviado
   */
  public ActualizarEstavigenteRecibido(estaVigenteEnviado: boolean): void {
    this.estaVigenteRecibido = estaVigenteEnviado;

    if (!this.estaVigenteRecibido) {
      AlertaWarning(
        'ESTATUS DEL CRÉDITO',
        'El numero de crédito ingresado no se encuentra VIGENTE y no podrá realizar movimientos.'
      );
    }

    this.activarDisabled = !this.estaVigenteRecibido;
  }

  public ActualizarProductoCreditoRecibido(productoCreditoEnviado:string): void
  {
    this.productoCreditoRecibido = productoCreditoEnviado;
  }

  /**
  ************************ Metodos Cancelar Solicitiud ********************************
  */

  /**
   * Busca el numero de solicitud del credito seleccionado
   *
   * @private
   */
  public BuscarNumeroSolicitud(): void {
    let consultarSolicitudesCambioCuentaRequest: ConsultarSolicitudesCambioCuentaRequest = {} as ConsultarSolicitudesCambioCuentaRequest;

    //->Crear solicitud
    consultarSolicitudesCambioCuentaRequest.idStatus = 0;
    consultarSolicitudesCambioCuentaRequest.numeroCredito = this.numeroCreditoRecibido;
    consultarSolicitudesCambioCuentaRequest.fechaInicio = '0001-01-01T00:00:00';
    consultarSolicitudesCambioCuentaRequest.fechaFin = '0001-01-01T00:00:00';

    this.spinnerService.show(); //-> iniciar spinner
    this.cambioCuentaChequesService
      .postConsultarSolicitudesCambioCuenta(consultarSolicitudesCambioCuentaRequest)
      .subscribe({
        next: (data) => {
          this.spinnerService.hide(); //-> finalizar spinner
          if (!data.success) {
            AlertaError(data?.message);
          } else {

            if (data.operationResultItem.length == 0) {
              AlertaWarning(
                'NUMERO DE SOLICITUD',
                'No existe el numero de solicitud'
              );
            } else {
              this.SeleccionarRegistroCancelacion(data.operationResultItem);
            }
          }
        },
        error: (err) => {
          this.spinnerService.hide(); //-> finalizar spinner
          AlertaError(err?.message);
        }
      });
  }

  /**
   * Valida que solo exista un registro con el estatus correspondiente para cancelar
   * @param resultConsultarSolicitudesCambioCuentaResponse
   */
  private SeleccionarRegistroCancelacion(resultConsultarSolicitudesCambioCuentaResponse: ResultConsultarSolicitudesCambioCuentaResponse[]): void {

    //->Contar los elementos para cancelacion
    let contador: number = 0;
    let registroSeleccionado: ResultConsultarSolicitudesCambioCuentaResponse = {} as ResultConsultarSolicitudesCambioCuentaResponse;

    resultConsultarSolicitudesCambioCuentaResponse.forEach((registro: ResultConsultarSolicitudesCambioCuentaResponse) => {
      if (registro.idEstatus == constantsModificacionCreditos.ESTATUS_PENDIENTE_AUTORIZAR || registro.idEstatus == constantsModificacionCreditos.ESTATUS_AUTORIZADO) {
        registroSeleccionado = registro;
        contador++;
      }
    });
    //Validamos que solo tenga una solicitud registrada con esos estatus
    if (contador > 1)
      AlertaError('La solicitud no cuenta con el estatus correcto para cancelar');
    else
      this.CancelarSolicitud(registroSeleccionado.idSolicitud);

  }

  /**
   * Llamar al servicio para cancelar la solicitud
   * @param numeroSolicitud
   */
  private CancelarSolicitud(numeroSolicitud: number): void {

    const initialState = {
      usuario: this.authService.getUser(),
      cancelar: true
    };
    const modalRef = this.modalService.show(ConfirmPasswordComponent, {
      initialState: initialState,
      animated: true,
      backdrop: 'static',
      class: 'modal-lg modal-dialog-centered modal-dialog-scrollable', // Centrar el modal
      ignoreBackdropClick: true, // Deshabilitar clics fuera del modal
      keyboard: false, // Deshabilitar tecla Escape
    });

    (modalRef.content as ConfirmPasswordComponent).onConfirm.subscribe(
      (result: {
        success: boolean,
        comentarios: string
      }) => {
        if (result.success) {
          //->Llamar al metodo de cancelar solicitud cambio de cuenta
          let cancelarSolicitudCambioCuentaRequest: CancelarSolicitudCambioCuentaRequest = {} as CancelarSolicitudCambioCuentaRequest;
          cancelarSolicitudCambioCuentaRequest.idSolicitud = numeroSolicitud;
          cancelarSolicitudCambioCuentaRequest.usuario = this.authService.getUser();
          cancelarSolicitudCambioCuentaRequest.comentario = result.comentarios;

          this.spinnerService.show(); //-> iniciar spinner
          //->Llamar al servicio para cancelar la cuenta
          this.cambioCuentaChequesService
            .postCancelarSolicitudCambioCuenta(cancelarSolicitudCambioCuentaRequest)
            .subscribe({
              next: async (data) => {
                this.spinnerService.hide(); //-> finalizar spinner
                if (!data.success) {
                  AlertaError(data?.message);
                } else {
                  await AlertaSuccess("SOLICITUD CANCELADA CON EXITO").then(() => {
                    //->Refrescamos
                    window.location.reload()
                  });
                }
              },
              error: (err) => {
                this.spinnerService.hide(); //-> finalizar spinner
                AlertaError(err?.message);
              },
            });
        } else {
          AlertaWarning("Contraseña Incorrecta", "No fue posible validar la contraseña.");
        }
      });
  }

  /**
  ************************ Metodos Guardar Solicitiud ********************************
  */

  /**
   * Guardar la solicitud con estatus pendiente de autorizacion
   */
  public async GuardarSolicitud(): Promise<void> {
    let respuesta: boolean = false;

    //-> Validamos que no tenga solicitudes pendientes y se seleccione un registro del gridView
    respuesta = await this.ValidacionesPreviasGuardarSolicitud();
    if (!respuesta)
      return;

    //->Redireccionar al nuevo modal donde recibiremos la informacion
    this.LlamarModalCambioCuentas();
  }

  /**
   * Llamamos al modal para realizar el cambio de cuenta
   * @param comentarios
   */
  private LlamarModalCambioCuentas(): void {
    const initialState = {
      productoCreditoRecibido: this.productoCreditoRecibido, // Información que se envia al modal la propiedad debe existir en el modal
    };

    this.bsModalRef = this.modalService.show(NuevaCuentaModalComponent, {
      initialState: initialState,
      animated: true,
      backdrop: 'static',
      class: 'modal-xl modal-dialog-centered modal-dialog-scrollable', // Centrar el modal
      ignoreBackdropClick: true, // Deshabilitar clics fuera del modal
      keyboard: false, // Deshabilitar tecla Escape
    });

    (this.bsModalRef.content as NuevaCuentaModalComponent).onSuccess.subscribe(
      async (result: {
        success: boolean
      }) => {
        this.bsModalRef.hide();
        if (result.success) {
          await AlertaSuccess().then(() => {
            //->Refrescamos el navegador
            window.location.reload();
          });
        } else {
          window.location.reload();
        }
      })
  }

  /**
   ************************ Metodos Guarda y Autorizar Solicitiud ********************************
   */

  /**
   * Ventana de nueva cuenta
   */
  public async ValidarGuardarAutorizar(): Promise<void> {

    let respuesta: boolean = true;
    //-> Validamos que no tenga solicitudes pendientes y se seleccione un registro del gridView
    respuesta = await this.ValidacionesPreviasGuardarSolicitud();
    if (!respuesta)
      return;

    //-> Mandar mensaje de confirmacion
    await AlertaEstaSeguro('GUARDAR/AUTORIZAR SOLICITUD', 'Al autorizar esta operación se guardara la solicitud de el cambio de cuenta de cheques del crédito, ¿está seguro que desea continuar?')
      .then((result: SweetAlertResult) => {

        if (result.isConfirmed) {
          this.GuardarAutorizar_RegistrarSolicitud();
        }
      });
  }

  /**
   * Registramos la solicitud con estatus pendiente
   */
  private GuardarAutorizar_RegistrarSolicitud(): void {

    //->Mostrar modal de confirmacion antes de realizar el cambio
    const initialState = {
      usuario: this.authService.getUser(),
      cancelar: false
    };

    const modalRef = this.modalService.show(ConfirmPasswordComponent, {
      initialState: initialState,
      animated: true,
      backdrop: 'static',
      class: 'modal-lg modal-dialog-centered modal-dialog-scrollable', // Centrar el modal
      ignoreBackdropClick: true, // Deshabilitar clics fuera del modal
      keyboard: false, // Deshabilitar tecla Escape
    });

    let comentarios: string = '';
    (modalRef.content as ConfirmPasswordComponent).onConfirm.subscribe(
      async (result: {
        success: boolean,
        comentarios: string
      }) => {
        if (result.success) {
          modalRef.hide(); //-> Escondemos el modal de autorización de operacion

          comentarios = result.comentarios ?? "";
          this.GuardarAutorizar_ModalCambioCuentas(comentarios);

        } else {
          AlertaWarning("Contraseña Incorrecta", "No fue posible validar la contraseña.");
        }
      })
  }

  /**
   * Registramos la solicitud con estatus pendiente
   */
  private GuardarAutorizar_ModalCambioCuentas(comentarios: string): void {
    const initialState = {
      productoCreditoRecibido: this.productoCreditoRecibido, // Información que se envia al modal la propiedad debe existir en el modal
    };

    this.bsModalRef = this.modalService.show(NuevaCuentaModalComponent, {
      initialState: initialState,
      animated: true,
      backdrop: 'static',
      class: 'modal-xl modal-dialog-centered modal-dialog-scrollable', // Centrar el modal
      ignoreBackdropClick: true, // Deshabilitar clics fuera del modal
      keyboard: false, // Deshabilitar tecla Escape
    });

    (this.bsModalRef.content as NuevaCuentaModalComponent).onSuccess.subscribe(
      (result: {
        success: boolean
      }) => {
        this.bsModalRef.hide();
        if (result.success) {
          AlertaSuccess('SOLICITUD PENDIENTE DE AUTORIZAR CREADA CON ÉXITO')
            .then(() => {
              //-> Si tambien se autoriza busca el numero de solicitud que se creo
              this.GuardarAutorizar_BuscarNumeroSolicitudCredito(comentarios);
            });
        } else {
          window.location.reload();
        }
      })
  }

  /**
   * Buscamos el número de solicitud creado para posteriormente autorizarlo
   * @param comentarios
   */
  private GuardarAutorizar_BuscarNumeroSolicitudCredito(comentarios: string): void {
    let resultConsultarSolicitudesCambioCuentaResponse = {} as ResultConsultarSolicitudesCambioCuentaResponse;
    let consultarSolicitudesCambioCuentaRequest: ConsultarSolicitudesCambioCuentaRequest = {} as ConsultarSolicitudesCambioCuentaRequest;

    //->Crear solicitud
    consultarSolicitudesCambioCuentaRequest.idStatus = constantsModificacionCreditos.ESTATUS_PENDIENTE_AUTORIZAR; //->Pendientes de autorizar
    consultarSolicitudesCambioCuentaRequest.numeroCredito = this.numeroCreditoRecibido;
    consultarSolicitudesCambioCuentaRequest.fechaInicio = '0001-01-01T00:00:00';
    consultarSolicitudesCambioCuentaRequest.fechaFin = '0001-01-01T00:00:00';

    this.spinnerService.show(); //-> iniciar spinner

    this.cambioCuentaChequesService
      .postConsultarSolicitudesCambioCuenta(consultarSolicitudesCambioCuentaRequest)
      .subscribe({
        next: async (data) => {
          this.spinnerService.hide(); //-> finalizar spinner
          if (!data.success) {
            await AlertaError(data?.message).then(() => {
              //->Refrescamos
              window.location.reload();
            });
          } else {

            if (data.operationResultItem.length == 0) {
              await AlertaWarning(
                'NUMERO DE SOLICITUD',
                'El numero de solicitud no se creo correctamente y no se puede autorizar.'
              ).then(() => {
                //->Refrescamos
                window.location.reload();
              });
            } else {
              //->Mandar a autorizar la solicitud
              resultConsultarSolicitudesCambioCuentaResponse = data.operationResultItem[data.operationResultItem.length - 1]
              resultConsultarSolicitudesCambioCuentaResponse.comentarios = comentarios;
              this.GuardarAutorizar_AutorizarSolicitud(resultConsultarSolicitudesCambioCuentaResponse);
            }
          }
        },
        error: async (err) => {
          this.spinnerService.hide(); //-> finalizar spinner
          await AlertaError(err?.message).then(() => {
            //->Refrescamos
            window.location.reload();
          });
        }
      });
  }

  /**
   * LLama al servicio para autorizar la solicitud
   *
   * @param {ResultConsultarSolicitudesCambioCuentaResponse} solicitud
   */
  private GuardarAutorizar_AutorizarSolicitud(solicitud: ResultConsultarSolicitudesCambioCuentaResponse) {

    //-> Crear objeto de solicitud
    let autorizarSolicitudRequest = {} as AutorizarSolicitudCambioCuentaRequest;
    autorizarSolicitudRequest.idSolicitud = solicitud.idSolicitud;
    autorizarSolicitudRequest.usuario = this.authService.getUser();
    autorizarSolicitudRequest.comentario = solicitud.comentarios;

    //->mostrar spinner
    this.spinnerService.show();
    this.cambioCuentaChequesService
      .postAutorizarSolicitudCambioCuenta(autorizarSolicitudRequest)
      .subscribe({
        next: async (data) => {
          this.spinnerService.hide(); //-> finalizar spinner
          if (!data.success) {
            await AlertaError(data?.message).then(() => {
              //->Refrescamos
              window.location.reload();
            });
          } else {
            await AlertaSuccess('AUTORIZACIÓN REALIZADA CON ÉXITO').then(() => {
              window.location.reload();
            });
          }
        },
        error: async (err) => {
          this.spinnerService.hide(); //-> finalizar spinner
          await AlertaError(err?.message).then((data) => {
            //->Refrescamos
            window.location.reload();
          });
        },
      });
  }

  /**
  ************************Otros Metodos Guardado Solicitud********************************
  */

  /**
   * Validaciones previas al guardado o autorizado de la solicitud
   * @returns true or false si existe alguna validacion incorrecta
   */
  private async ValidacionesPreviasGuardarSolicitud(): Promise<boolean> {
    let respuesta: boolean = true;

    //->validar solicitudes pendientes
    if (this.tieneSolicitudesPendientesAutorizarRecibido) {
      await AlertaWarning(
        'SOLICITUDES PENDIENTES',
        'Existen solicitudes pendientes'
      ).then(() => {
        respuesta = false;
      });
    }

    //->Llamar al componente cuentas-credito-form para tomar las filas seleccionadas
    let recibirInformacion = {} as ResultConsultarCuentasAsociadasCreditoResponse[];
    recibirInformacion = this.selectorCuentas.EnviarCuentasSeleccionadas();

    //->Cambiar los datos de la subscripcion para enviarlos
    this.solicitudCambioCuentaChequesService.CambiarCuentas(recibirInformacion);

    //->Validar que no este vacio
    if (recibirInformacion.length == 0) {
      await AlertaWarning(
        'CUENTAS ASOCIADAS',
        'No existen cuentas seleccionadas'
      ).then(() => {
        respuesta = false; //-> Regresamos ya que no se ha seleccionado ninguna cuenta
      });
    }

    return respuesta;
  }



}
