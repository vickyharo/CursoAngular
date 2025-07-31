import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination-controls',
  templateUrl: './pagination-controls.component.html',
  standalone: true,
})
export class PaginationControlsComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPorPagina: number = 10;
  @Input() paginaActual: number = 1;
  @Input() modoExtendido: boolean = false;

  @Output() paginaCambiada = new EventEmitter<number>();
  @Output() itemsPorPaginaCambiado = new EventEmitter<number>();

  opcionesPorPagina: number[] = [5, 10, 15, 20];

  get totalPaginas(): number {
    return Math.ceil(this.totalItems / this.itemsPorPagina);
  }

  cambiarPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaCambiada.emit(pagina);
  }

  cambiarItemsPorPagina(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    const valor = target?.value ? Number(target.value) : null;

    if (valor && !isNaN(valor)) {
      this.itemsPorPaginaCambiado.emit(valor);
    }
  }
}
