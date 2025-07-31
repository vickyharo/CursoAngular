import { Component, Input, Output, EventEmitter, signal, computed, OnChanges, SimpleChange, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'dynamic-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-table.component.html'
})
export class DynamicTableComponent implements OnChanges {
  @Input() columns: { key: string, label: string }[] = [];
  @Input() data: any[] = [];
  @Input() sortable: boolean = true;
  @Input() selectable: boolean = true;
  @Input() paginate: boolean = false;
  @Input() pageSize: number = 10;
  //Banderas
  @Input() haveFilter: boolean = false; // Mostrar Filtro lateral

  @Output() rowSelected = new EventEmitter<any>();
  @Output() sortChanged = new EventEmitter<{ key: string, direction: string }>();

  maxResults: number = 0;
  selectedRow: string | null = null;
  currentPage: number = 1;
  sortDirection: 'asc' | 'desc' | null = null;
  sortKey: string | null = null;

  constructor(private router: Router) { }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.hideContextMenu();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data'] && !changes['data'].firstChange) {
      this.filters = {}; // Reiniciar filtros si quieres
      this.currentPage = 1;
      this.maxResults = Math.min(this.currentPage * this.pageSize, this.data.length);
    }

    this.maxResults = Math.min(this.currentPage * this.pageSize, this.data.length);
    // Inicializar filtros si aún no existen
    for (const col of this.columns) {
      const key = col.key;
      if (!this.filters[key]) {
        this.filters[key] = this.isCheckboxFilter(key)
          ? [] as string[]
          : '';
      }
    }
  }


  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get paginatedData(): any[] {
    let dataToUse = this.filteredData;

    // Aplica ordenamiento si está configurado
    if (this.sortable && this.sortKey && this.sortDirection) {
      dataToUse = [...dataToUse].sort((a, b) => {
        const valA = a[this.sortKey!];
        const valB = b[this.sortKey!];

        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Paginación
    if (!this.paginate) return dataToUse;
    const start = (this.currentPage - 1) * this.pageSize;
    return dataToUse.slice(start, start + this.pageSize);
  }

  selectRow(rowId: string): void {
    console.log(rowId);
    if (!this.selectable) return;
    this.selectedRow = this.selectedRow === rowId ? null : rowId;
    const selectedData = this.data.find(item => item.id === rowId);
    this.rowSelected.emit(selectedData ?? null);
  }

  sortData(key: string): void {
    if (!this.sortable) return;

    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.sortChanged.emit({ key: this.sortKey, direction: this.sortDirection });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Filtros dinámicos (checkbox y texto)
  filters: { [key: string]: any } = {};

  isCheckboxFilter(key: string): boolean {
    const uniqueValues = new Set(this.data.map(row => row[key]));
    return uniqueValues.size <= 5;
  }

  isTextFilter(key: string): boolean {
    return !this.isCheckboxFilter(key);
  }

  updateFilter(key: string, value: string): void {
    this.filters[key] = value;
  }

  toggleCheckboxFilter(key: string, value: string): void {
    const current = this.filters[key] as string[];
    if (current.includes(value)) {
      this.filters[key] = current.filter(v => v !== value);
    } else {
      this.filters[key] = [...current, value];
    }
  }


  getUniqueColumnValues(key: string): string[] {
    return Array.from(new Set(this.data.map(row => row[key])));
  }

  get filteredData(): any[] {
    return this.data.filter(item => {
      return this.columns.every(col => {
        const key = col.key;
        const filter = this.filters[key];

        if (!filter) return true;

        if (this.isCheckboxFilter(key)) {
          const selected = filter as string[];
          return selected.length === 0 || selected.includes(item[key]);
        } else {
          const term = filter as string;
          return term === '' || (item[key] ?? '').toLowerCase().includes(term.toLowerCase());
        }
      });
    });
  }

  //Menu Contextual
  contextMenu = {
    visible: false,
    x: 0,
    y: 0,
    row: null as any
  };

  onRightClick(event: MouseEvent, row: any): void {
    event.preventDefault();
    this.contextMenu.visible = true;
    this.contextMenu.x = event.clientX;
    this.contextMenu.y = event.clientY;
    this.contextMenu.row = row;
  }

  handleContextAction(action: string): void {
    if (!this.contextMenu.row) return;

    switch (action) {
      case 'edit':
        this.rowSelected.emit(this.contextMenu.row);
        break;

      case 'delete':
        if (typeof this.contextMenu.row === 'object') {
          this.rowSelected.emit({ ...this.contextMenu.row, _action: 'delete' });
        } else {
          console.error('Context menu row is not an object.');
        }
        break;

      case 'export':
        console.log('Exportar fila:', this.contextMenu.row);
        break;

      case 'import':
        console.log('Importar acción para:', this.contextMenu.row);
        break;

      default:
        console.warn('Acción no reconocida:', action);
    }

    this.contextMenu.visible = false;
  }


  hideContextMenu(): void {
    this.contextMenu.visible = false;
  }


}
