import { Component, ViewChild, inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

//->Funciones
import { AlertaError, getFileName } from '@functions/genericas';

//->Angular material
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';

//->Modales
import { DetalleSolicitudModalComponent } from '../../cambio-cuenta/autorizar-solicitud-component/detalle-solicitud-modal/detalle-solicitud-modal.component';

//->Modelos
import { ResultConsultarSolicitudesCambioCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarSolicitudesCambioCuentaResponse';

//->Services
import { SpinnerService } from '@services/shared-services/spinner.service';
import { ExportService } from '@services/modificacion-creditos-services/export.service';

//->Componentes
import { ReporteDetalleColumnasRequest } from '@models/modificacion-creditos-models/reportes/ReporteDetalleColumnasRequest';

@Component({
  selector: 'app-bitacora-cambio-cuenta',
  templateUrl: './bitacora-cambio-cuenta.component.html'
})
export class BitacoraCambioCuentaComponent {

  /**
   * Inyecciones
   */
  modalService = inject(BsModalService);
  _exportDataService = inject(ExportService);
  router = inject(Router);
  /**
  * Propiedades
  */
  mensajeErrores: string = '';
  existeError: boolean = false;

  /**
  * Propiedades tabla
  */
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 25, 50, 75, 100];
  currentPage: number = 0;
  totalPages: number = 0;
  visiblePageCount: number = 3;
  pages: number[] = [];
  elementosPagina: boolean = false
  displayedColumns: string[] = [
    'detalle',
    'numeroSolicitud',
    'fechaSolicitud',
    'estatusSolicitud',
    'numeroCredito',
    'productoCredito',
    'cliente',
    'estatusCredito',
    'divisa',
    'ejecutivo',
    'sucursal',
    'usuarioSolicita',
    'usuarioAutoriza',
    'fechaAutorizacion',
    'comentario'
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
    private paginatorIntl: MatPaginatorIntl,
  ) { this.SetPaginatorLabels(); }

  ngOnInit() {
    this.MostrarSolicitudes([]);
    this.CalculatePages();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
  * Actualiza las solicitudes encontradas desde el componente hijo
  *
  * @public
  * @param {string} numeroCreditoEnviado
  */
  public MostrarSolicitudes(solicitudes: ResultConsultarSolicitudesCambioCuentaResponse[]): void {
    //->>Asignar el datasource
    //->Limpiar parametros
    this.dataSource = new MatTableDataSource<ResultConsultarSolicitudesCambioCuentaResponse>();
    this.selection = new SelectionModel<ResultConsultarSolicitudesCambioCuentaResponse>(true, []);
    this.clickedRows = new Set<ResultConsultarSolicitudesCambioCuentaResponse>();
    this.dataSource = new MatTableDataSource<ResultConsultarSolicitudesCambioCuentaResponse>(solicitudes);

  }

  public RecalcularPaginado(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Manda a llamar al modal para el detalle de la solicitud
   * @param detalle
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

  /********************************* Metodos Tabla ***************************************/
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
    idTipoReporte: 1 // Tipo Solicitud Bitacora Cuenta Cheques
  }
  let columnasVisibles: string[] = [];
  let reportHeaders: string[] = [];

  this.spinnerService.show();
  this._exportDataService.getColumnasReportes(request).subscribe({
    next: (result) => {
      this.spinnerService.hide();
      if (!result.success){
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
