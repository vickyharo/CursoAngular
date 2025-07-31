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
import { AlertaSuccess, AlertaError, AlertaWarning, getFileName, AlertaEstaSeguro } from '@functions/genericas'

//->Modales
import { DetalleSolicitudLineaModalComponent } from '../../cambio-linea/autorizar-solicitud-linea-component/detalle-solicitud-linea-modal/detalle-solicitud-linea-modal.component';

//->Models
import { ConsultarSolicitudesCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/ConsultarSolicitudesCambioLineaRequest';
import { ResultConsultarSolicitudesCambioLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/ConsultarSolicitudesCambioLineaResponse';
import { AutorizarSolicitudCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/AutorizarSolicitudCambioLineaRequest';
import { AplicarSolicitudCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/AplicarSolicitudCambioLineaRequest';
import { CancelarSolicitudCambioLineaRequest } from '@models/modificacion-creditos-models/cambio-linea/CancelarSolicitudCambioLineaRequest';
import { ReporteDetalleColumnasRequest } from '@models/modificacion-creditos-models/reportes/ReporteDetalleColumnasRequest';

//->Servicios
import { CambioMontoLineaService } from '@services/modificacion-creditos-services/cambio-monto-linea.service';
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
  selector: 'app-autorizar-solicitud-linea-component',
  templateUrl: './autorizar-solicitud-linea-component.component.html',
  styleUrl: './autorizar-solicitud-linea-component.component.css'
})
export class AutorizarSolicitudLineaComponentComponent {

  /**
   * Inyecciones
   */
  cambioMontoLineaService = inject(CambioMontoLineaService);
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
  elementosPagina: boolean = false
  displayedColumns: string[] = [
    'seleccionar',
    'detalle',
    'idSolicitud',
    'fechaSolicitud',
    'descripcionStatus',
    'numeroLinea',
    'producto',
    'cliente',
    'descEstatusLinea',
    'montoAutorizado',
    'ejecutivo',
    'sucursal',
    'usuarioSolicita'
  ];

  dataSource = new MatTableDataSource<ResultConsultarSolicitudesCambioLineaResponse>();
  selection = new SelectionModel<ResultConsultarSolicitudesCambioLineaResponse>(true, []);
  clickedRows = new Set<ResultConsultarSolicitudesCambioLineaResponse>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  /**
   ************************ S T A R T ********************************
   */

  constructor(
    private bsModalRef: BsModalRef,
    public spinnerService: SpinnerService,
    private paginatorIntl: MatPaginatorIntl,
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
    this.permisoBotonAutorizar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CMLA_CMLAAutorizar_AUTORIZAR_SOLICITUD);
    this.permisoBotonAplicar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CMLA_CMLAAutorizar_APLICAR_SOLICITUD);
    this.permisoBotonCancelar = comprobarPermisosEspecialesBotones.tienePermiso(constantsSecurity.BOTON_CMLA_CMLAAutorizar_CANCELAR_SOLICITUD);

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
   * Consultar las solicitudes con estatus pendientes de autorizar
   *
   * @public
   */
  private ConsultarInformacionCuentas(estatusSolicitudes: number): void {

    //->Limpiar parametros
    this.dataSource = new MatTableDataSource<ResultConsultarSolicitudesCambioLineaResponse>();
    this.selection = new SelectionModel<ResultConsultarSolicitudesCambioLineaResponse>(true, []);
    this.clickedRows = new Set<ResultConsultarSolicitudesCambioLineaResponse>();
    let consultarSolicitudesCambioLineaRequest: ConsultarSolicitudesCambioLineaRequest = {} as ConsultarSolicitudesCambioLineaRequest;

    //->Crear solicitud
    consultarSolicitudesCambioLineaRequest.idEstatus = estatusSolicitudes; //->Pendientes de autorizar o autorizadas
    consultarSolicitudesCambioLineaRequest.numeroLinea = '';
    consultarSolicitudesCambioLineaRequest.fechaRegistroInicio = '0001-01-01T00:00:00';
    consultarSolicitudesCambioLineaRequest.fechaRegistroFin = '0001-01-01T00:00:00';

    this.spinnerService.show(); //-> iniciar spinner
    this.cambioMontoLineaService
      .postConsultarSolicitudesCambioLinea(consultarSolicitudesCambioLineaRequest)
      .subscribe({
        next: (data) => {
          this.spinnerService.hide(); //-> finalizar spinner
          if (!data.success) {
            AlertaError(data?.message);
          } else {

            if (data.operationResultItem.length != 0) {
              //->Asignar dataSource
              this.dataSource = new MatTableDataSource<ResultConsultarSolicitudesCambioLineaResponse>(data.operationResultItem);
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
   * Modal para mostrar el detalle de la solicitud
   *
   * @param {ResultConsultarSolicitudesCambioLineaResponse} detalle
   */
  public DetalleSolicitud(detalle: ResultConsultarSolicitudesCambioLineaResponse) {
    const initialState = {
      detalle: detalle.detalleSolicitudCambioLinea, // Información que se envia al modal la propiedad debe existir en el modal
    };

    this.bsModalRef = this.modalService.show(DetalleSolicitudLineaModalComponent, {
      initialState: initialState,
      animated: true,
      backdrop: 'static',
      class: 'modal-lg modal-dialog-centered modal-dialog-scrollable', // Centrar el modal
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
    let enviarInformacion = {} as ResultConsultarSolicitudesCambioLineaResponse;
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
   * Llamar al servicio para cancelar la solicitud
   *
   * @private
   * @param {ResultConsultarSolicitudesCambioLineaResponse} solicitud
   */
  private CancelarSolicitud(solicitud: ResultConsultarSolicitudesCambioLineaResponse): void {

    //->Llamar al metodo de cancelar solicitud cambio de cuenta
    let cancelarSolicitudCambioLineaRequest: CancelarSolicitudCambioLineaRequest = {} as CancelarSolicitudCambioLineaRequest;
    cancelarSolicitudCambioLineaRequest.idSolicitud = solicitud.idSolicitud;
    cancelarSolicitudCambioLineaRequest.usuario = this.authService.getUser();
    cancelarSolicitudCambioLineaRequest.comentario = solicitud.comentarios;

    this.spinnerService.show(); //-> iniciar spinner
    //->Llamar al servicio para cancelar la cuenta
    this.cambioMontoLineaService
      .postCancelarSolicitudCambioLinea(cancelarSolicitudCambioLineaRequest)
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
   * @returns
   */
  public CrearSolicitudAutorizacion(): void {

    //->Buscar la fila seleccionada y agregarlas al array que enviaremos
    let enviarInformacion = {} as ResultConsultarSolicitudesCambioLineaResponse;
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
          await AlertaEstaSeguro('AUTORIZAR SOLICITUD', 'Al realizar esta operación se autorizara el cambio monto autorizado de la línea de crédito, ¿está seguro que desea continuar?')
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
   * Llamar al servicio para autorizar las solicitudes
   *
   * @param {ResultConsultarSolicitudesCambioLineaResponse} solicitud
   */
  private AutorizarSolicitud(solicitud: ResultConsultarSolicitudesCambioLineaResponse) {

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
            AlertaError(data?.message);
          }
          else {
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
   * @returns
   */
  public CrearSolicitudAplicacion(): void {

    //->Buscar la fila seleccionada y agregarlas al array que enviaremos
    let enviarInformacion = {} as ResultConsultarSolicitudesCambioLineaResponse;
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
          enviarInformacion.comentarios = result.comentarios ?? ""; //-> Agregamos los comentarios de la autorización
          await AlertaEstaSeguro('APLICAR SOLICITUD', 'Al aplicar esta operación se realizará el cambio monto autorizado de la línea de crédito, ¿está seguro que desea continuar?')
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
   * Llamar al servicio para autorizar las solicitudes
   *
   * @param {ResultConsultarSolicitudesCambioLineaResponse} solicitud
   */
  private AplicarSolicitud(solicitud: ResultConsultarSolicitudesCambioLineaResponse) {

    //-> Crear objeto de solicitud
    let aplicarSolicitudCambioLineaRequest = {} as AplicarSolicitudCambioLineaRequest;
    aplicarSolicitudCambioLineaRequest.idSolicitud = solicitud.idSolicitud;
    aplicarSolicitudCambioLineaRequest.usuario = this.authService.getUser();
    aplicarSolicitudCambioLineaRequest.comentario = solicitud.comentarios;

    //->mostrar spinner
    this.spinnerService.show();
    this.cambioMontoLineaService
      .postAplicarSolicitudCambioLinea(aplicarSolicitudCambioLineaRequest)
      .subscribe({
        next: async (data) => {
          this.spinnerService.hide(); //-> finalizar spinner

          if (!data.success) {
            AlertaError(data?.message);
          }
          else {
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
   * @param {ResultConsultarSolicitudesCambioLineaResponse} row
   */
  toggleSelection(row: ResultConsultarSolicitudesCambioLineaResponse): void {

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
    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
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
        length: filteredLength
      };
      this.paginator.page.emit(event);
    }
  }

  exportarExcel() {
    const request: ReporteDetalleColumnasRequest = {
      idTipoReporte: 4 // Tipo Reporte autorizar cambio de línea
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
}//->Cierre clase
