import { Component, OnInit, ViewChild, AfterViewInit, Input, SimpleChanges, inject, HostListener, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import * as columnConfig from './columns.json';

//->Modelos
import { TableData } from '@models/shared-models/TableData';
import { ColumnConfig } from '@models/shared-models/ColumnConfig';

//->Servicios
import { ExportService } from '@services/modificacion-creditos-services/export.service';
import { MenuStateServiceService } from '@services/security-services/menu-state-service.service';

//->Funciones
import { getFileName, autoCloseMessage } from '@functions/genericas';

@Component({
  selector: 'app-tabla-component',
  templateUrl: './tabla-component.component.html',
  styleUrl: './tabla-component.component.scss',
  providers: [ExportService],
})
export class TablaComponentComponent implements OnInit, AfterViewInit {
  private menuStateService = inject(MenuStateServiceService);
  @Input() data: TableData[] = [];
  @Input() idField: string = '';
  originalData: TableData[] = [];
  displayedColumns: string[] = [];
  visibleColumns: string[] = [];
  @Input() columnConfig: ColumnConfig = columnConfig;
  dataSource: MatTableDataSource<TableData>;
  @Input() pageSize = 25;
  currentPage = 0;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  pages: number[] = [];
  totalPages = 0;
  visiblePageCount = 3;
  selectedIds: string[] = [];
  currentRoute: string;
  indexIds: any;
  selectedRow: any = null; // Fila seleccionada
  @Input() showActionButtons: boolean = true; //Columna de acciones visible
  @Input() customClass: string = '';
  @Output() rowSelected = new EventEmitter<any>();
  @Input() isHighlighted: boolean = false
  @Input() elementosPagina: boolean = false
  //Cambiar comportamiento de botones para abrir modal
  @Output() createButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteButtonClick: EventEmitter<void> = new EventEmitter<void>();
  rangeFilters: { [key: string]: { min: any, max: any } } = {};
  filterType: { [key: string]: 'list' | 'range-text' | 'range-date' | 'range-number' } = {};
  isConsultaRoute: boolean = false;
  columnFilters: { [key: string]: string } = {};
  filterTimeout: any = {};
  uniqueColumnValues: { [key: string]: any[] } = {};
  showDropdown: { [key: string]: boolean } = {};
  dropdownStates: { [key: string]: boolean } = {};
  filterValues: { [key: string]: any[] } = {};
  selectedFilters: { [key: string]: string[] } = {};
  selectedValues: { [key: string]: string[] } = {};
  searchText: { [key: string]: string } = {};
  filteredValues: { [key: string]: any[] } = {};
  selectAllState: { [key: string]: boolean } = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  exportDataService = inject(ExportService);

  constructor(private paginatorIntl: MatPaginatorIntl, private router: Router, private location: Location, private cdr: ChangeDetectorRef) {
    this.currentRoute = decodeURIComponent(this.router.url).toString();
    this.dataSource = new MatTableDataSource<TableData>([]);
    this.setPaginatorLabels();
    this.setupFilterPredicate();
  }

  ngOnInit(): void {
    this.isConsultaRoute = ['consulta', 'monitoreo'].includes(this.currentRoute.split('/')[2]);
    if (this.data.length > 0) {
      this.initializeTableData();
      localStorage.removeItem('lastVisitedRouteInfo');
    }
    this.menuStateService.menuWidth$.subscribe(width => {
      document.documentElement.style.setProperty('--menu-width', width);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['data'] && this.data) || changes['showActionButtons']) {
      if (this.data.length > 0) {
        this.initializeTableData();
        localStorage.removeItem('lastVisitedRouteInfo');
      }
    }
  }
  /*        Inizializar tabla      */
  private initializeTableData(): void {
    const storedRouteInfo = localStorage.getItem('lastVisitedRouteInfo');
    if (storedRouteInfo) {
      try {
        const parsedRouteInfo = JSON.parse(storedRouteInfo);
        if (parsedRouteInfo && parsedRouteInfo.rowId && this.idField) {
          const normalizedStoredId = String(parsedRouteInfo.rowId).trim().toLowerCase();
          const storedRow = this.data.find(row => {
            const rowIdValue = row[this.idField];
            if (rowIdValue === null || rowIdValue === undefined) {
              return false;
            }
            const normalizedRowId = String(rowIdValue).trim().toLowerCase();
            return normalizedRowId === normalizedStoredId;
          });
          if (storedRow) {
            const rowIndex = this.data.indexOf(storedRow);
            if (rowIndex !== -1 && this.pageSize > 0) {
              this.currentPage = Math.floor(rowIndex / this.pageSize);
              this.selectedRow = storedRow;
              setTimeout(() => {
                if (this.paginator) {
                  this.paginator.pageIndex = this.currentPage;
                  const event: PageEvent = {
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize,
                    length: this.data.length
                  };
                  this.onPageChange(event);
                }
                this.rowSelected.emit(this.selectedRow);
              });
            }
          }
        }
      } catch (error) {
        console.error('Error al procesar la información de ruta almacenada:', error);
      }
    }
    this.originalData = [...this.data];
    this.updateDisplayedColumns();
    this.dataSource.data = this.data;
    const totalCount = this.data.length;
    if (totalCount > 0 && !this.pageSizeOptions.includes(totalCount)) {
      this.pageSizeOptions = [...this.pageSizeOptions, totalCount];
    }
    if (Object.keys(this.selectedFilters).length > 0) {
      this.applyFilters();
    }
    this.calculatePages();
    this.updatePagination();
    this.initializeFilters();
    if (this.data.length > 0 && !this.selectedRow) {
      this.selectedRow = this.data[0];
      this.rowSelected.emit(this.selectedRow);
    }
  }
  /*        Filtros tabla      */
  private initializeFilters(): void {
    this.visibleColumns.forEach(column => {
      const columnName = column.toLowerCase();
      if (columnName.includes('fecha')) {
        this.filterType[column] = 'range-date';
        this.rangeFilters[column] = { min: null, max: null };
        this.selectedFilters[column] = [];
      } else if (columnName.includes('importe') || columnName.includes('monto')) {
        this.filterType[column] = 'range-number';
        this.rangeFilters[column] = { min: null, max: null };
        this.selectedFilters[column] = [];
      } else {
        this.filterType[column] = 'list';
      }
      if (this.filterType[column] === 'list') {
        let values;
        if (column.toLowerCase() === 'activo') {
          values = ['Activo', 'Inactivo'];
        } else {
          values = Array.from(new Set(
            this.originalData
              .map(item => item[column])
              .filter(value => value != null)
          )).sort((a, b) => String(a).localeCompare(String(b)));
        }
        this.filterValues[column] = values;
        this.filteredValues[column] = values;
        this.selectedFilters[column] = [];
      }
    });
  }

  private setupFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: TableData, filter: string) => {
      const filterObj = JSON.parse(filter);
      return Object.keys(filterObj).every(column => {
        const filterValue = filterObj[column];
        const dataValue = data[column];
        const columnType = this.filterType[column];
        if (columnType === 'list') {
          if (!filterValue || filterValue.length === 0) return true;
          if (column.toLowerCase() === 'activo') {
            const displayValue = dataValue ? 'Activo' : 'Inactivo';
            return filterValue.includes(displayValue);
          }
          return filterValue.some((selectedValue: string) =>
            String(selectedValue).toLowerCase() === String(dataValue).toLowerCase()
          );
        }
        if (columnType === 'range-date') {
          const rangeFilter = this.rangeFilters[column];
          if (!rangeFilter || (rangeFilter.min === null && rangeFilter.max === null)) return true;
          const [day, month, year] = String(dataValue).split('/');
          const dateValue = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          const minDate = rangeFilter.min ? new Date(rangeFilter.min) : null;
          let maxDate = null;
          if (rangeFilter.max) {
            maxDate = new Date(rangeFilter.max);
            maxDate.setDate(maxDate.getDate() + 1);
          }
          return (!minDate || dateValue >= minDate) &&
            (!maxDate || dateValue < maxDate);
        }
        if (columnType === 'range-number') {
          const rangeFilter = this.rangeFilters[column];
          if (!rangeFilter || (rangeFilter.min === null && rangeFilter.max === null)) return true;
          const cleanValue = String(dataValue)
            .replace('$', '')
            .replace(/,/g, '')
            .trim();
          const numValue = parseFloat(cleanValue);
          const minValue = rangeFilter.min ? parseFloat(String(rangeFilter.min).replace(/,/g, '')) : null;
          const maxValue = rangeFilter.max ? parseFloat(String(rangeFilter.max).replace(/,/g, '')) : null;

          return (!minValue || numValue >= minValue) &&
            (!maxValue || numValue <= maxValue);
        }
        return true;
      });
    };
  }

  applyRangeFilter(column: string): void {
    const rangeFilter = this.rangeFilters[column];
    if ((rangeFilter.min !== null) || (rangeFilter.max !== null)) {
      this.dataSource.filter = JSON.stringify({ [column]: 'range-filter' });
    } else {
      this.clearFilter(column);
    }
    this.calculatePages();
    this.updateVisiblePages();
  }

  toggleDropdown(column: string, event: MouseEvent) {
    event.stopPropagation();

    Object.keys(this.dropdownStates).forEach(key => {
      if (key !== column) {
        this.dropdownStates[key] = false;
      }
    });

    this.dropdownStates[column] = !this.dropdownStates[column];

    if (this.dropdownStates[column] && this.isHighlighted) {
      this.cdr.detectChanges();

      const button = event.target as HTMLElement;
      const rect = button.getBoundingClientRect();
      const dropdown = document.querySelector('.dropdown-list') as HTMLElement;

      if (dropdown) {
        dropdown.style.top = `${rect.bottom + 10}px`;
        dropdown.style.left = `${rect.left}px`;
      }
    }
  }

  updateSearchText(column: string, value: string): void {
    this.searchText[column] = value;
    if (value.trim()) {
      this.filteredValues[column] = this.filterValues[column].filter(option =>
        String(option).toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredValues[column] = [...this.filterValues[column]];
    }
    this.selectAllState[column] = this.filteredValues[column].every(value =>
      this.selectedFilters[column]?.includes(value)
    );

    this.applyFilters();
  }

  toggleFilterOption(column: string, value: string): void {
    if (!this.selectedFilters[column]) {
      this.selectedFilters[column] = [];
    }
    const index = this.selectedFilters[column].indexOf(value);
    if (index === -1) {
      this.selectedFilters[column].push(value);
    } else {
      this.selectedFilters[column].splice(index, 1);
    }
    this.selectAllState[column] = this.filteredValues[column].every(value =>
      this.selectedFilters[column].includes(value)
    );
    this.applyFilters();
  }

  isOptionSelected(column: string, value: string): boolean {
    return this.selectedFilters[column]?.includes(value) || false;
  }

  applyFilters(): void {
    const combinedFilter: any = {};
    Object.keys(this.selectedFilters).forEach(column => {
      if (this.filterType[column] === 'list' &&
        this.selectedFilters[column] &&
        this.selectedFilters[column].length > 0) {
        combinedFilter[column] = this.selectedFilters[column];
      }
    });
    Object.keys(this.rangeFilters).forEach(column => {
      const rangeFilter = this.rangeFilters[column];
      if (rangeFilter.min !== null || rangeFilter.max !== null) {
        combinedFilter[column] = 'range-filter';
      }
    });
    this.dataSource.filter = JSON.stringify(combinedFilter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      this.currentPage = 0;
    }
    this.calculatePages();
    this.updateVisiblePages();
  }
  applyFilter(column: string, value: string): void {
    if (this.filterTimeout[column]) {
      clearTimeout(this.filterTimeout[column]);
    }

    this.filterTimeout[column] = setTimeout(() => {
      this.columnFilters[column] = value;
      this.dataSource.filter = JSON.stringify(this.columnFilters);

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }, 300);
  }

  clearFilter(column: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.selectedFilters[column]) {
      this.selectedFilters[column] = [];
      this.searchText[column] = '';
      this.filteredValues[column] = this.filterValues[column];
      this.selectAllState[column] = false;
    }
    if (this.rangeFilters[column]) {
      this.rangeFilters[column] = { min: null, max: null };
    }
    if (this.dropdownStates[column]) {
      this.dropdownStates[column] = false;
    }
    this.applyFilters();
  }

  hasActiveFilters(column: string): boolean {
    return !!(
      (this.selectedFilters[column]?.length > 0) ||
      (this.searchText[column] && this.searchText[column].length > 0) ||
      (this.filterType[column]?.startsWith('range-') &&
        (this.rangeFilters[column].min !== null || this.rangeFilters[column].max !== null))
    );
  }

  hasAnyActiveFilters(): boolean {
    return Object.values(this.selectedFilters).some(filters => filters.length > 0) ||
      Object.values(this.searchText).some(text => text && text.length > 0) ||
      Object.values(this.rangeFilters).some(filter =>
        filter.min !== null || filter.max !== null
      );
  }

  clearAllFilters(): void {
    Object.keys(this.selectedFilters).forEach(column => {
      this.selectedFilters[column] = [];
      this.searchText[column] = '';
      this.filteredValues[column] = this.filterValues[column];
      this.selectAllState[column] = false;
    });
    Object.keys(this.rangeFilters).forEach(column => {
      this.rangeFilters[column] = { min: null, max: null };
    });
    Object.keys(this.dropdownStates).forEach(column => {
      this.dropdownStates[column] = false;
    });
    this.dataSource.filter = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.data = this.originalData;
    this.calculatePages();
    this.updateVisiblePages();
  }
  toggleSelectAll(column: string): void {
    this.selectAllState[column] = !this.selectAllState[column];
    if (this.selectAllState[column]) {
      const currentSelection = new Set(this.selectedFilters[column] || []);
      this.filteredValues[column].forEach(value => currentSelection.add(value));
      this.selectedFilters[column] = Array.from(currentSelection);
    } else {
      this.selectedFilters[column] = this.selectedFilters[column].filter(
        value => !this.filteredValues[column].includes(value)
      );
    }
    this.applyFilters();
  }

  private updatePagination(): void {
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = this.dataSource.data.length;
    }
    this.calculatePages();
    this.updateVisiblePages();
  }

  onPageChange(event: PageEvent): void {
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
    this.updateVisiblePages();
    this.calculatePages();
  }
  /*        Metodos  paginador      */
  calculatePages(): void {
    const filteredLength = this.dataSource.filteredData.length;

    if (this.pageSize === -1) {
      this.totalPages = 1;
      this.currentPage = 0;
    } else {
      this.totalPages = Math.max(1, Math.ceil(filteredLength / this.pageSize));
      this.currentPage = Math.min(this.currentPage, this.totalPages - 1);
    }

    this.updateVisiblePages();
  }

  updateVisiblePages(): void {
    const halfCount = Math.floor(this.visiblePageCount / 2);
    let start = Math.max(0, this.currentPage - halfCount);
    let end = Math.min(this.totalPages - 1, start + this.visiblePageCount - 1);
    if (end - start + 1 < this.visiblePageCount) {
      start = Math.max(0, end - this.visiblePageCount + 1);
    }
    this.pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  goToPage(page: number): void {
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
      this.updateVisiblePages();
      const event: PageEvent = {
        pageIndex: page,
        pageSize: this.pageSize,
        length: filteredLength
      };
      this.paginator.page.emit(event);
    }
  }



  isSelected(element: TableData): boolean {
    const idValue = element[this.idField]?.toString();
    if (!idValue) {
      const originalElement = this.originalData.find(item => {
        return Object.entries(item).some(([key, value]) =>
          this.visibleColumns.includes(key) && value === element[key]
        );
      });
      return originalElement ? this.selectedIds.includes(originalElement[this.idField]?.toString()) : false;
    }
    return this.selectedIds.includes(idValue);
  }

  isVisibility(element: TableData): void {
    let idValue = element[this.idField]?.toString();
    if (!idValue) {
      const originalElement = this.originalData.find(item => {
        return Object.entries(item).some(([key, value]) =>
          this.visibleColumns.includes(key) && value === element[key]
        );
      });
      idValue = originalElement?.[this.idField]?.toString();
    }
    if (idValue) {
      this.menuStateService.updateLastVisitedRouteInfo(
        this.currentRoute,
        this.currentPage + 1,
        idValue
      );
    }
  }

  onCreateButton(): void {
    if (this.createButtonClick.observers.length === 0) {
      this.router.navigate([`${this.currentRoute}/nueva`]);
    } else {
      this.createButtonClick.emit();
    }
  }

  updateDisplayedColumns(): void {
    if (this.data?.length) {
      const firstRow = this.data[0];
      const columns = Object.keys(firstRow)
        .filter(column => this.columnConfig[column]?.visible !== false);
      const activoIndex = columns.findIndex(column => column.toLowerCase() === 'activo');
      if (activoIndex !== -1) {
        const activoColumn = columns.splice(activoIndex, 1)[0];
        columns.push(activoColumn);
      }
      this.displayedColumns = [...columns];
      this.visibleColumns = [...columns];
    }
  }

  formatColumnName(column: string): string {
    const columnDef = this.columnConfig[column];
    if (columnDef?.valor) {
      return columnDef.valor;
    }
    return column
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .toLowerCase()
      .replace(/^./, str => str.toUpperCase());
  }

  setPaginatorLabels(): void {
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
        : `Elementos mostrando ${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }

  get totalElements(): number {
    return this.dataSource.filteredData.length;
  }

  @HostListener('document:click')
  closeAllDropdowns(): void {
    Object.keys(this.dropdownStates).forEach(key => {
      this.dropdownStates[key] = false;
    });
  }

  onSelectRow(row: any): void {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row // Guardar datos de la fila seleccionada
    }
    this.rowSelected.emit(this.selectedRow); // Emitir los datos de la fila seleccionada
  }
  renderActivoColumn(value: any): any {
    if (typeof value === 'boolean') {
      return value ? 'Activo' : 'Inactivo';
    }
    return value;
  }

  exportData() {
    //Se pasa como parametro el arreglo de columnas visibles para exportar
    const fileName = getFileName(this.router.url);

    this.exportDataService.exportToCsv(fileName, this.data, [], []);
    autoCloseMessage();
  }
  isDateColumn(column: string): boolean {
    return column.toLowerCase().includes('fecha');
  }
  isIncumplimientoColumn(column: string): boolean {
    return column.toLowerCase() === 'fechaincumplimiento';
  }
  onRowClick(row: any): void {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }
  formatNumberInput(event: any, column: string): void {
    const input = event.target;
    let value = input.value.replace(/[^\d.,]/g, '');
    value = value.replace(/,/g, '.');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (value) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        const formattedValue = new Intl.NumberFormat('es-MX', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          useGrouping: true
        }).format(numValue);
        input.value = formattedValue;
        this.rangeFilters[column][input.name === 'min' ? 'min' : 'max'] = numValue;
      }
    } else {
      this.rangeFilters[column][input.name === 'min' ? 'min' : 'max'] = null;
    }
    this.applyRangeFilter(column);
  }
}

