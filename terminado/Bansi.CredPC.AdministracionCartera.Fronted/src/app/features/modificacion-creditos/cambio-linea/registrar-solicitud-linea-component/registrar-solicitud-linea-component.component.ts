import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

//->Alertas swal
import Swal, { SweetAlertResult } from 'sweetalert2';
import { AlertaSuccess, AlertaError, AlertaEstaSeguro, AlertaWarning } from '@functions/genericas'

//->Constantes
import { constantsModificacionCreditos } from '@consts/modificacion-creditos.constants'
import { constantsSecurity } from '@consts/security.constants';

//->Spinner
import { SpinnerService } from '@services/shared-services/spinner.service';

//->Componentese
import { ConfirmPasswordComponent } from '@sharedComponents/confirm-password/confirm-password.component';

//->Servicios
import { CambioMontoLineaService } from '@services/modificacion-creditos-services/cambio-monto-linea.service';
import { AuthService } from '@services/security-services/auth.service';

//->Modelos
import { CancelarSolicitudCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/CancelarSolicitudCambioLineaRequest';
import { ConsultarSolicitudesCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/ConsultarSolicitudesCambioLineaRequest';
import { ResultConsultarSolicitudesCambioLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/ConsultarSolicitudesCambioLineaResponse';
import { RegistrarSolicitudCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/RegistrarSolicitudCambioLineaRequest';
import { DetalleSolicitudCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/RegistrarSolicitudCambioLineaRequest';
import { AutorizarSolicitudCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/AutorizarSolicitudCambioLineaRequest';

//->Permisos especiales botones
import { ComprobarPermisosEspecialesBotones } from '@guards/auth.guard';

@Component({
  selector: 'app-registrar-solicitud-linea-component',
  templateUrl: './registrar-solicitud-linea-component.component.html'
})
export class RegistrarSolicitudLineaComponentComponent implements OnInit {

  /**
   * Propiedades
   */
  desactivarBoton: boolean = false;
  activarDisabled: boolean = false;
  montoOriginalRecibido: number = 0;
  montoNuevoRecibido: number = 0;
  numeroLineaRecibida: string = '';
  tieneSolicitudesPendientesRecibido: boolean = true;

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
  cambioMontoLineaService = inject(CambioMontoLineaService);
  authService = inject(AuthService);
  modalService = inject(BsModalService);

  /**
   ************************ S T A R T ********************************
   */

  constructor(public spinnerService: SpinnerService, private bsModalRef: BsModalRef) { }

  ngOnInit() {
    let comprobarPermisosEspecialesBotones: ComprobarPermisosEspecialesBotones = new ComprobarPermisosEspecialesBotones(this.authService);
    //->Configurar los permisos especiales
    this.permisoBotonGuardar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CMLA_CMLARegistrar_GUARDAR_SOLICITUD);
    this.permisoBotonGuardarAutorizar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CMLA_CMLARegistrar_GUARDAR_AUTORIZAR_SOLICITUD);
    this.permisoBotonCancelar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CMLA_CMLARegistrar_CANCELAR_SOLICITUD);
  }

  /**
   ************************ Otros Metodos ********************************
   */

  /**
   * Actualizar el numero de cuenta desde el componente hijo
   *
   * @public
   * @param {number} montoOriginalEnviado
   */
  public ActualizarMontoOriginalRecibido(montoOriginalEnviado: number): void {
    this.activarDisabled = true;
    this.montoOriginalRecibido = montoOriginalEnviado;

    //->Validar las solicitudes pendientes
    if (this.tieneSolicitudesPendientesRecibido) this.desactivarBoton = true;
    else this.desactivarBoton = false;
  }

  /**
   * Actualizar el monto nuevo desde el componente hijo
   * @public
   * @param {number} montoNuevoEnviado
   */
  public ActualizarMontoNuevoRecibido(montoNuevoEnviado: number): void {
    this.montoNuevoRecibido = montoNuevoEnviado;
  }

  /**
   * Actualizar las solicitudes pendientes desde el componente hijo
   *
   * @public
   * @param {boolean} tieneSolicitudesPendientesEnviado
   */
  public ActualizarSolicitudesPendientes(tieneSolicitudesPendientesEnviado: boolean): void {
    this.tieneSolicitudesPendientesRecibido = tieneSolicitudesPendientesEnviado;
  }

  /**
  * Actualizar la linea recibida desde el componente hijo
  *
  * @public
  * @param {string} numeroLineaEnviada
  */
  public ActualizarNumeroDeLineaRecibida(numeroLineaEnviada: string): void {
    this.numeroLineaRecibida = numeroLineaEnviada;
  }

  /**
   ************************ Metodos Cancelar Solicitiud ********************************
   */

  /**
   * Busca el numero de solicitud de la linea para cancelarla
   *
   */
  public BuscarNumeroSolicitud(): void {
    let consultarSolicitudesCambioLineaRequest: ConsultarSolicitudesCambioLineaRequest = {} as ConsultarSolicitudesCambioLineaRequest;

    //->Crear solicitud
    consultarSolicitudesCambioLineaRequest.idEstatus = 0;
    consultarSolicitudesCambioLineaRequest.numeroLinea = this.numeroLineaRecibida;
    consultarSolicitudesCambioLineaRequest.fechaRegistroInicio = '0001-01-01T00:00:00';
    consultarSolicitudesCambioLineaRequest.fechaRegistroFin = '0001-01-01T00:00:00';

    this.spinnerService.show(); //-> iniciar spinner
    this.cambioMontoLineaService.postConsultarSolicitudesCambioLinea(consultarSolicitudesCambioLineaRequest)
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
        },

      });
  }

  /**
   * Valida que solo exista un registro con el estatus correspondiente para cancelar
   * @param resultConsultarSolicitudesCambioLineaResponse
   */
  private SeleccionarRegistroCancelacion(resultConsultarSolicitudesCambioLineaResponse: ResultConsultarSolicitudesCambioLineaResponse[]): void {
    //->Contar los elementos para cancelacion
    let contador: number = 0;
    let registroSeleccionado: ResultConsultarSolicitudesCambioLineaResponse = {} as ResultConsultarSolicitudesCambioLineaResponse;

    resultConsultarSolicitudesCambioLineaResponse.forEach((registro: ResultConsultarSolicitudesCambioLineaResponse) => {
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
   *
   * @public
   * @param {number} numeroSolicitud
   */
  private CancelarSolicitud(numeroSolicitud: number): void {
    const initialState = {
      usuario: this.authService.getUser(),
      cancelar: true
    };
    this.bsModalRef = this.modalService.show(ConfirmPasswordComponent, {
      initialState: initialState,
      animated: true,
      backdrop: 'static',
      class: 'modal-lg modal-dialog-centered modal-dialog-scrollable', // Centrar el modal
      ignoreBackdropClick: true, // Deshabilitar clics fuera del modal
      keyboard: false, // Deshabilitar tecla Escape
    });

    (this.bsModalRef.content as ConfirmPasswordComponent).onConfirm.subscribe(
      (result: {
        success: boolean,
        comentarios: string
      }) => {
        this.bsModalRef.hide();
        if (result.success) {
          //->Llamar al metodo de cancelar solicitud cambio de cuenta
          let cancelarSolicitudCambioLineaRequest: CancelarSolicitudCambioLineaRequest = {} as CancelarSolicitudCambioLineaRequest;
          cancelarSolicitudCambioLineaRequest.idSolicitud = numeroSolicitud;
          cancelarSolicitudCambioLineaRequest.usuario = this.authService.getUser();
          cancelarSolicitudCambioLineaRequest.comentario = result.comentarios;

          this.spinnerService.show(); //-> iniciar spinner
          //->Llamar al servicio para cancelar la cuenta
          this.cambioMontoLineaService.postCancelarSolicitudCambioLinea(cancelarSolicitudCambioLineaRequest)
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
   ************************ Metodos Guardar Solicitud ********************************
   */

  /**
   * Guardamos en base de datos la solicitud
   *
   * @private
   * @param {ValidacionCambioCuenta[]} arrayValidacionCambioCuenta
   */
  public async SolicitarCambioMonto(): Promise<void> {

    //->Validaciones previas al guardar la solicitud
    let validaciones: Boolean = await this.ValidacionesPreviasGuardarSolicitud();
    if (!validaciones)
      return;

    //-> Mandar mensaje de confirmacion
    AlertaEstaSeguro('GUARDAR SOLICITUD', '¿Estás seguro de realizar esta acción?')
      .then((result) => {
        if (result.isConfirmed) {
          this.spinnerService.show(); //-> iniciar spinner

          let registrarSolicitudCambioLineaRequest: RegistrarSolicitudCambioLineaRequest = {} as RegistrarSolicitudCambioLineaRequest;
          //Asignamos el detalle de la solicitud
          registrarSolicitudCambioLineaRequest = this.CrearObjetoSolicitud();

          //LLamar al servicio y guardar solicitud
          this.cambioMontoLineaService.postRegistrarSolicitudCambioLinea(registrarSolicitudCambioLineaRequest).subscribe({
            next: async (data) => {
              this.spinnerService.hide(); //-> finalizar spinner

              if (data.success) {
                await AlertaSuccess().then(() => {
                  //->Refrescamos
                  window.location.reload()
                });
              }
              else {
                //->Alerta error
                AlertaError(data?.message);
              }
            },
            error: (error) => {
              this.spinnerService.hide(); //-> finalizar spinner
              //->Alerta error
              AlertaError(error?.message);
            }
          });
        }
      });
  }

  /**
   ************************ Metodos Guarda/Autorizar Solicitiud ********************************
   */

  /**
   * Validaciones previas antes de crear la solicitud
   *
   * @private
   * @param {ValidacionCambioCuenta[]} arrayValidacionCambioCuenta
   */
  public async ValidarGuardarAutorizar(): Promise<void> {

    //->Validaciones previas al guardar la solicitud
    let validaciones: Boolean = await this.ValidacionesPreviasGuardarSolicitud();
    if (!validaciones)
      return;

    //-> Mandar mensaje de confirmacion
    await AlertaEstaSeguro('GUARDAR/AUTORIZAR SOLICITUD', 'Al autorizar esta operación se guardara la solicitud del cambio de monto autorizado de la línea de crédito, ¿está seguro que desea continuar?')
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
      (result: {
        success: boolean,
        comentarios: string
      }) => {
        if (result.success) {
          this.spinnerService.show();
          comentarios = result.comentarios ?? "";

          let registrarSolicitudCambioLineaRequest: RegistrarSolicitudCambioLineaRequest = {} as RegistrarSolicitudCambioLineaRequest;
          //Asignamos el detalle de la solicitud
          registrarSolicitudCambioLineaRequest = this.CrearObjetoSolicitud();

          //LLamar al servicio y guardar solicitud
          this.cambioMontoLineaService.postRegistrarSolicitudCambioLinea(registrarSolicitudCambioLineaRequest).subscribe({
            next: async (data) => {
              this.spinnerService.hide(); //-> finalizar spinner

              if (data.success) {
                AlertaSuccess('SOLICITUD PENDIENTE DE AUTORIZAR CREADA CON ÉXITO')
                  .then(() => {
                    //->Mandamos a buscar el numero de solicitud para actualizarla
                    this.GuardarAutorizar_BuscarNumeroSolicitudLinea(comentarios);
                  });
              }
              else {
                //->Alerta error
                AlertaError(data?.message);
              }
            },
            error: async (error) => {
              this.spinnerService.hide(); //-> finalizar spinner
              //->Alerta error
              await AlertaError(error?.message).then(() => {
                //->Refrescamos
                window.location.reload();
              });
            }
          });
        }
      })
  }

  /**
   * Buscamos el número de solicitud creado para posteriormente autorizarlo
   * @param comentarios
   */
  private GuardarAutorizar_BuscarNumeroSolicitudLinea(comentarios: string): void {

    let resultConsultarSolicitudesCambioLineaResponse = {} as ResultConsultarSolicitudesCambioLineaResponse;
    let consultarSolicitudesCambioLineaRequest: ConsultarSolicitudesCambioLineaRequest = {} as ConsultarSolicitudesCambioLineaRequest;

    //->Crear solicitud
    consultarSolicitudesCambioLineaRequest.idEstatus = constantsModificacionCreditos.ESTATUS_PENDIENTE_AUTORIZAR; //->Pendientes de autorizar
    consultarSolicitudesCambioLineaRequest.numeroLinea = this.numeroLineaRecibida;
    consultarSolicitudesCambioLineaRequest.fechaRegistroInicio = '0001-01-01T00:00:00';
    consultarSolicitudesCambioLineaRequest.fechaRegistroFin = '0001-01-01T00:00:00';

    this.spinnerService.show(); //-> iniciar spinner
    this.cambioMontoLineaService.postConsultarSolicitudesCambioLinea(consultarSolicitudesCambioLineaRequest)
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
              resultConsultarSolicitudesCambioLineaResponse = data.operationResultItem[data.operationResultItem.length - 1]
              resultConsultarSolicitudesCambioLineaResponse.comentarios = comentarios;
              this.GuardarAutorizar_AutorizarSolicitud(resultConsultarSolicitudesCambioLineaResponse);
            }
          }
        },
        error: async (error) => {
          this.spinnerService.hide(); //-> finalizar spinner
          //->Alerta error
          await AlertaError(error?.message).then(() => {
            //->Refrescamos
            window.location.reload();
          });
        },
      });
  }

  /**
   * Se autoriza la solicitud
   * @param solicitud
   */
  private GuardarAutorizar_AutorizarSolicitud(solicitud: ResultConsultarSolicitudesCambioLineaResponse): void {
    //-> Crear objeto de solicitud
    let autorizarSolicitudCambioLineaRequest = {} as AutorizarSolicitudCambioLineaRequest;
    autorizarSolicitudCambioLineaRequest.idSolicitud = solicitud.idSolicitud;
    autorizarSolicitudCambioLineaRequest.usuario = this.authService.getUser();
    autorizarSolicitudCambioLineaRequest.comentario = solicitud.comentarios;

    //->mostrar spinner
    this.spinnerService.show();
    this.cambioMontoLineaService
      .postAutorizarSolicitudCambioLinea(autorizarSolicitudCambioLineaRequest)
      .subscribe({
        next: async (data) => {
          this.spinnerService.hide(); //-> finalizar spinner

          if (!data.success) {
            await AlertaError(data?.message).then(() => {
              //->Refrescamos
              window.location.reload();
            });
          }
          else {
            await AlertaSuccess('AUTORIZACIÓN REALIZADA CON ÉXITO').then(() => {
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

    //-> Validaciones
    if (this.numeroLineaRecibida == '') {
      AlertaWarning('CAMPOS VACIOS', `Número de linea invalido`);
      respuesta = false; //->Retornamos ya que hubo un error
    }

    if (this.montoOriginalRecibido == 0) {
      AlertaWarning('CAMPOS VACIOS', `Monto original vacio`);
      respuesta = false; //->Retornamos ya que hubo un error
    }

    if (this.montoNuevoRecibido == 0) {
      AlertaWarning('CAMPOS VACIOS', `El nuevo monto no puede ser $0.00`);
      respuesta = false; //->Retornamos ya que hubo un error
    }

    return respuesta;
  }

  /**
   * Creamos el objeto de solicitud del formulario
   * @returns
   */
  private CrearObjetoSolicitud(): RegistrarSolicitudCambioLineaRequest {

    let registrarSolicitudCambioLineaRequest: RegistrarSolicitudCambioLineaRequest = {} as RegistrarSolicitudCambioLineaRequest;
    let detalleSolicitudCambioLineaRequest: DetalleSolicitudCambioLineaRequest = {} as DetalleSolicitudCambioLineaRequest;

    //->Creamos el objeto solictud
    registrarSolicitudCambioLineaRequest.numeroCredito = this.numeroLineaRecibida;
    registrarSolicitudCambioLineaRequest.usuarioSolicita = this.authService.getUser();
    registrarSolicitudCambioLineaRequest.idStatusSolicitud = constantsModificacionCreditos.ESTATUS_PENDIENTE_AUTORIZAR;
    registrarSolicitudCambioLineaRequest.comentario = '';

    //-> Llenamos el detalle
    detalleSolicitudCambioLineaRequest.idDetalle = 0;
    detalleSolicitudCambioLineaRequest.idSolicitud = 0;
    detalleSolicitudCambioLineaRequest.montoOriginal = this.montoOriginalRecibido;
    detalleSolicitudCambioLineaRequest.montoNuevo = this.montoNuevoRecibido;

    //Asignamos el detalle de la solicitud
    registrarSolicitudCambioLineaRequest.detalleSolicitudCambioLinea = detalleSolicitudCambioLineaRequest;

    return registrarSolicitudCambioLineaRequest;
  }

}//->Cierre de la clase