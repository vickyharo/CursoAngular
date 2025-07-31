import { Component, ViewChild, inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

//->Angular material
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';

//->Alertas swal
import Swal from 'sweetalert2';
import { AlertaEstaSeguro, AlertaSuccess, AlertaError, AlertaWarning, getFileName } from '@functions/genericas'

//->Modales
import { DetalleSolicitudModalComponent } from '../autorizar-solicitud-component/detalle-solicitud-modal/detalle-solicitud-modal.component';

//->Models
import { ConsultarSolicitudesCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarSolicitudesCambioCuentaRequest';
import { ResultConsultarSolicitudesCambioCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarSolicitudesCambioCuentaResponse';
import { AutorizarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/AutorizarSolicitudCambioCuentaRequest';
import { AplicarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/AplicarSolicitudCambioCuentaRequest';
import { CancelarSolicitudCambioCuentaRequest } from '@models/modificacion-creditos-models/cambio-cuenta/CancelarSolicitudCambioCuentaRequest';
import { ReporteDetalleColumnasRequest } from '@models/modificacion-creditos-models/reportes/ReporteDetalleColumnasRequest';

//->Servicios
import { CambioCuentaChequesService } from '@services/modificacion-creditos-services/cambio-cuenta-cheques.service';
import { AuthService } from '@services/security-services/auth.service';

//->Constantes
import { constantsModificacionCreditos } from '@consts/modificacion-creditos.constants';
import { constantsSecurity } from '@consts/security.constants';

//->Spinner
import { SpinnerService } from '@services/shared-services/spinner.service';
import { ExportService } from '@services/modificacion-creditos-services/export.service';

//->Componentes
import { ConfirmPasswordComponent } from '@sharedComponents/confirm-password/confirm-password.component';

//->Permisos especiales botones
import { ComprobarPermisosEspecialesBotones } from '@guards/auth.guard';

@Component({
  selector: 'app-autorizar-solicitud-component',
  templateUrl: './autorizar-solicitud-component.component.html',
  styleUrl: './autorizar-solicitud-component.component.css',
})
export class AutorizarSolicitudComponentComponent {
  /**
   * Inyecciones
   */
  cambioCuentaChequesService = inject(CambioCuentaChequesService);
  modalService = inject(BsModalService);
  _exportDataService = inject(ExportService);
  router = inject(Router);
  authService = inject(AuthService);

  /**
   * Propiedades permisos especiales
   */
  permisoBotonAutorizar: boolean = false;
  permisoBotonAplicar: boolean = false;
  permisoBotonCancelar: boolean = false;

  /**
   * Propiedades tabla
   */
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  currentPage: number = 0;
  totalPages: number = 0;
  visiblePageCount: number = 3;
  pages: number[] = [];
  elementosPagina: boolean = false;
  displayedColumns: string[] = [
    'seleccionar',
    'detalle',
    'idSolicitud',
    'fechaSolicitud',
    'descripcionStatus',
    'numeroCredito',
    'productoCredito',
    'cliente',
    'statusCredito',
    'divisa',
    'ejecutivo',
    'sucursal',
    'usuarioSolicita',

  ];

  dataSource = new MatTableDataSource<ResultConsultarSolicitudesCambioCuentaResponse>();
  selection = new SelectionModel<ResultConsultarSolicitudesCambioCuentaResponse>(true, []);
  clickedRows = new Set<ResultConsultarSolicitudesCambioCuentaResponse>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  /**
   ************************ S T A R T ********************************
   */

  constructor(
    private bsModalRef: BsModalRef,
    public spinnerService: SpinnerService,
    private paginatorIntl: MatPaginatorIntl
  ) {
    this.SetPaginatorLabels();
  }

  ngOnInit() {
    this.CargarInformacion();
  }

  /**
   * Carga la solicitudes pendientes de autorizar y autorizadas en el gridview para su aplicación
   */
  private CargarInformacion(): void {

    let comprobarPermisosEspecialesBotones: ComprobarPermisosEspecialesBotones = new ComprobarPermisosEspecialesBotones(this.authService);
    //->Configurar los permisos especiales
    this.permisoBotonAutorizar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CCC_CCCAutorizar_AUTORIZAR_SOLICITUD);
    this.permisoBotonAplicar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CCC_CCCAutorizar_APLICAR_SOLICITUD);
    this.permisoBotonCancelar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CCC_CCCAutorizar_CANCELAR_SOLICITUD);

    //->Buscamos si podemos autorizar o aplicar solicitudes
    if (this.permisoBotonAplicar) {
      this.ConsultarInformacionCuentas(constantsModificacionCreditos.ESTATUS_AUTORIZADO);
    }
    else if (this.permisoBotonAutorizar) {
      this.ConsultarInformacionCuentas(constantsModificacionCreditos.ESTATUS_PENDIENTE_AUTORIZAR);
    }

    //-> Calculamos las paginas
    this.CalculatePages();
  }

  /**
   * Consultar las solicitudes con estatus pendientes de autorizar y autorizadas para previamente aplicar la solicitud
   *
   * @public
   */
  private ConsultarInformacionCuentas(estatusSolicitudes: number): void {
    //->Limpiar parametros
    this.dataSource = new MatTableDataSource<ResultConsultarSolicitudesCambioCuentaResponse>();
    this.selection = new SelectionModel<ResultConsultarSolicitudesCambioCuentaResponse>(true, []);
    this.clickedRows = new Set<ResultConsultarSolicitudesCambioCuentaResponse>();
    let consultarSolicitudesCambioCuentaRequest: ConsultarSolicitudesCambioCuentaRequest = {} as ConsultarSolicitudesCambioCuentaRequest;

    //->Crear solicitud
    consultarSolicitudesCambioCuentaRequest.idStatus = estatusSolicitudes; //->Pendientes de autorizar o autorizadas
    consultarSolicitudesCambioCuentaRequest.numeroCredito = '';
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
            if (data.operationResultItem.length != 0) {
              //->Asignar dataSource
              this.dataSource =
                new MatTableDataSource<ResultConsultarSolicitudesCambioCuentaResponse>(
                  data.operationResultItem
                );
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
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
   * Cargar modal con el detalle de la solicitud
   *
   * @param {ResultConsultarSolicitudesCambioCuentaResponse} detalle
   */
  DetalleSolicitud(detalle: ResultConsultarSolicitudesCambioCuentaResponse) {
    const initialState = {
      lista: detalle.detalleSolicitud, // Información que se envia al modal la propiedad debe existir en el modal
    };

    this.bsModalRef = this.modalService.show(DetalleSolicitudModalComponent, {
      initialState: initialState,
      animated: true,
      backdrop: 'static',
      class: 'modal-xl modal-dialog-centered modal-dialog-scrollable', // Centrar el modal
      ignoreBackdropClick: true, // Deshabilitar clics fuera del modal
      keyboard: false, // Deshabilitar tecla Escape
    });
  }

  /**
   * Cancelación solicitud
   * @returns
   */
  public CrearSolicitudCancelacion(): void {
    //->Buscar la fila seleccionada y agregarla al array que enviaremos
    let enviarInformacion = {} as ResultConsultarSolicitudesCambioCuentaResponse;
    enviarInformacion = this.selection.selected[0];

    //->Validacion de algun registro seleccionado
    if (enviarInformacion == null) {
      AlertaWarning("Registro seleccionado", "No existe algún registro seleccionado");
      return;
    }

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
          enviarInformacion.comentarios = result.comentarios ?? "";
          this.CancelarSolicitud(enviarInformacion);
        } else {
          AlertaWarning("Contraseña Incorrecta", "No fue posible validar la contraseña.");
        }
      });
  }

  /**
  * LLama al servicio para cancelar la solicitud
  *
  * @private
  * @param {ResultConsultarSolicitudesCambioCuentaResponse} solicitud
  */
  private CancelarSolicitud(solicitud: ResultConsultarSolicitudesCambioCuentaResponse) {
    //->Llamar al metodo de cancelar solicitud cambio de cuenta
    let cancelarSolicitudCambioCuentaRequest: CancelarSolicitudCambioCuentaRequest = {} as CancelarSolicitudCambioCuentaRequest;
    cancelarSolicitudCambioCuentaRequest.idSolicitud = solicitud.idSolicitud;
    cancelarSolicitudCambioCuentaRequest.usuario = this.authService.getUser();
    cancelarSolicitudCambioCuentaRequest.comentario = solicitud.comentarios;

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
            await AlertaSuccess().then(() => {
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
   * Se crea la solicitud para la autorizacion
   * @param autorizarSolicitud
   * @returns
   */
  CrearSolicitudAutorizacion(): void {
    //->Buscar la fila seleccionada y agregarla al array que enviaremos
    let enviarInformacion = {} as ResultConsultarSolicitudesCambioCuentaResponse;
    enviarInformacion = this.selection.selected[0];

    //->Validacion de algun registro seleccionado
    if (enviarInformacion == null) {
      AlertaWarning("Registro seleccionado", "No existe algún registro seleccionado");
      return;
    }

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

    (modalRef.content as ConfirmPasswordComponent).onConfirm.subscribe(
      async (result: {
        success: boolean,
        comentarios: string
      }) => {
        if (result.success) {
          enviarInformacion.comentarios = result.comentarios ?? "";
          await AlertaEstaSeguro('AUTORIZAR SOLICITUD', 'Al realizar esta operación se autorizara el cambio de cuenta de cheques del crédito, ¿está seguro que desea continuar?')
            .then((result) => {
              if (result.isConfirmed) {
                this.AutorizarSolicitud(enviarInformacion);
              }
            });
        } else {
          AlertaWarning("Contraseña Incorrecta", "No fue posible validar la contraseña.");
        }
      });
  }

  /**
   * LLama al servicio para autorizar la solicitud
   *
   * @param {ResultConsultarSolicitudesCambioCuentaResponse} solicitudes
   */
  private AutorizarSolicitud(solicitud: ResultConsultarSolicitudesCambioCuentaResponse) {
    //-> Crear objeto de solicitud
    let autorizarSolicitudCambioCuentaRequest = {} as AutorizarSolicitudCambioCuentaRequest;
    autorizarSolicitudCambioCuentaRequest.idSolicitud = solicitud.idSolicitud;
    autorizarSolicitudCambioCuentaRequest.usuario = this.authService.getUser();
    autorizarSolicitudCambioCuentaRequest.comentario = solicitud.comentarios;

    //->mostrar spinner
    this.spinnerService.show();
    this.cambioCuentaChequesService
      .postAutorizarSolicitudCambioCuenta(autorizarSolicitudCambioCuentaRequest)
      .subscribe({
        next: async (data) => {
          this.spinnerService.hide(); //-> finalizar spinner

          if (!data.success) {
            AlertaError(data?.message);
          } else {
            await AlertaSuccess().then(() => {
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
   * Se crea la solicitud para la aplicacion
   * @param autorizarSolicitud
   */
  public CrearSolicitudAplicacion(): void {
    //->Buscar la fila seleccionada y agregarla al array que enviaremos
    let enviarInformacion = {} as ResultConsultarSolicitudesCambioCuentaResponse;
    enviarInformacion = this.selection.selected[0];

    //->Validacion de algun registro seleccionado
    if (enviarInformacion == null) {
      AlertaWarning("Registro seleccionado", "No existe algún registro seleccionado");
      return;
    }

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

    (modalRef.content as ConfirmPasswordComponent).onConfirm.subscribe(
      async (result: {
        success: boolean,
        comentarios: string
      }) => {
        if (result.success) {
          enviarInformacion.comentarios = result.comentarios ?? "";
          await AlertaEstaSeguro('APLICAR SOLICITUD', 'Al aplicar esta operación se realizará el cambio de cuenta de cheques del crédito, ¿está seguro que desea continuar?')
            .then((result) => {
              if (result.isConfirmed) {
                this.AplicarSolicitud(enviarInformacion);
              }
            });
        } else {
          AlertaWarning("Contraseña Incorrecta", "No fue posible validar la contraseña.");
        }
      });
  }

  /**
   * LLama al servicio para aplicar la autorizacion previamente registrada
   *
   * @param {ResultConsultarSolicitudesCambioCuentaResponse} solicitudes
   */
  private AplicarSolicitud(solicitud: ResultConsultarSolicitudesCambioCuentaResponse) {
    //-> Crear objeto de solicitud
    let aplicarSolicitudCambioCuentaRequest = {} as AplicarSolicitudCambioCuentaRequest;
    aplicarSolicitudCambioCuentaRequest.idSolicitud = solicitud.idSolicitud;
    aplicarSolicitudCambioCuentaRequest.usuario = this.authService.getUser();
    aplicarSolicitudCambioCuentaRequest.comentario = solicitud.comentarios;

    //->mostrar spinner
    this.spinnerService.show();
    this.cambioCuentaChequesService
      .postAplicarSolicitudCambioCuenta(aplicarSolicitudCambioCuentaRequest)
      .subscribe({
        next: async (data) => {
          this.spinnerService.hide(); //-> finalizar spinner

          if (!data.success) {
            AlertaError(data?.message);
          } else {
            await AlertaSuccess().then(() => {
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
   * Selecciona uno u otro en el gridview
   *
   * @param {ResultConsultarSolicitudesCambioCuentaResponse} row
   */
  toggleSelection(row: ResultConsultarSolicitudesCambioCuentaResponse): void {

    if (this.selection.isSelected(row)) {
      this.selection.deselect(row);
    }
    else {
      this.selection.clear();
      this.selection.select(row);
    }
  }

  /********************************* Metodos Tabla ***************************************/
  Filtrar(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  SetPaginatorLabels(): void {
    this.paginatorIntl.itemsPerPageLabel = '';
    this.paginatorIntl.nextPageLabel = 'Siguiente página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.lastPageLabel = 'Última página';
    this.paginatorIntl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ): string => {
      if (length === 0) return 'No hay elementos';

      if (pageSize === -1) {
        return this.elementosPagina
          ? `${length} de ${length}`
          : `Mostrando todos los elementos (${length})`;
      }

      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return this.elementosPagina
        ? `${startIndex + 1} - ${endIndex} de ${length}`
        : `Elementos mostrados ${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }

  get totalElements(): number {
    return this.dataSource.filteredData.length;
  }

  OnPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    if (this.pageSize === -1) {
      this.pageSize = this.dataSource.filteredData.length;
      if (this.paginator) {
        this.paginator.pageSize = this.pageSize;
      }
    }
    if (this.paginator) {
      this.paginator.pageSize = event.pageSize;
      this.paginator.pageIndex = event.pageIndex;
    }
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const filteredData = this.dataSource.filteredData;
    const pageData = filteredData.slice(startIndex, endIndex);
    this.dataSource._updateChangeSubscription();
    this.UpdateVisiblePages();
    this.CalculatePages();
  }

  CalculatePages(): void {
    const filteredLength = this.dataSource.filteredData.length;

    if (this.pageSize === -1) {
      this.totalPages = 1;
      this.currentPage = 0;
    } else {
      this.totalPages = Math.max(1, Math.ceil(filteredLength / this.pageSize));
      this.currentPage = Math.min(this.currentPage, this.totalPages - 1);
    }

    this.UpdateVisiblePages();
  }

  UpdateVisiblePages(): void {
    const halfCount = Math.floor(this.visiblePageCount / 2);
    let start = Math.max(0, this.currentPage - halfCount);
    let end = Math.min(this.totalPages - 1, start + this.visiblePageCount - 1);
    if (end - start + 1 < this.visiblePageCount) {
      start = Math.max(0, end - this.visiblePageCount + 1);
    }
    this.pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  GoToPage(page: number): void {
    const filteredLength = this.dataSource.filteredData.length;
    const maxPage = Math.ceil(filteredLength / this.pageSize) - 1;
    if (page >= 0 && page <= maxPage) {
      this.currentPage = page;
      if (this.paginator) {
        this.paginator.pageIndex = page;
      }
      const startIndex = page * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const filteredData = this.dataSource.filteredData;
      const pageData = filteredData.slice(startIndex, endIndex);
      this.dataSource._updateChangeSubscription();
      this.UpdateVisiblePages();
      const event: PageEvent = {
        pageIndex: page,
        pageSize: this.pageSize,
        length: filteredLength,
      };
      this.paginator.page.emit(event);
    }
  }

  exportarExcel() {
    const request: ReporteDetalleColumnasRequest = {
      idTipoReporte: 3 // Tipo Reporte autorizar cambio de cuenta
    }
    let columnasVisibles: string[] = [];
    let reportHeaders: string[] = [];

    this.spinnerService.show();
    this._exportDataService.getColumnasReportes(request).subscribe({
      next: (result) => {
        this.spinnerService.hide();
        if (!result.success) {
          AlertaError(result.message);
        } else {
          columnasVisibles = this._exportDataService.getArrayColumnas(result, false);
          reportHeaders = this._exportDataService.getArrayColumnas(result, true);

          //Generamos el reporte
          const filename = getFileName(this.router.url);
          this._exportDataService.exportToCsv(filename, this.dataSource.data, columnasVisibles, reportHeaders);
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        AlertaError(error?.message);
      }
    });
  }
} //->Cierre clase
