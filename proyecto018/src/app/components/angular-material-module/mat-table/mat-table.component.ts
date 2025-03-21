import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-mat-table',
  standalone: true,
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.css'
})
export class MatTableComponent {
  columnas: string[] = ['codigo', 'descripcion', 'precio', 'borrar'];

  datos: Articulo[] = [new Articulo(1, 'papas', 55),
  new Articulo(2, 'manzanas', 53),
  new Articulo(3, 'naranjas', 25),
  ];

  articuloselect: Articulo = new Articulo(0, "", 0);

  @ViewChild(MatTable) tabla1!: MatTable<Articulo>;

  borrarFila(cod: number) {
    if (confirm("Realmente quiere borrarlo?")) {
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }

  agregar() {
    this.datos.push(new Articulo(this.articuloselect.codigo, this.articuloselect.descripcion, this.articuloselect.precio));
    this.tabla1.renderRows();
    this.articuloselect = new Articulo(0, "", 0);
  }
}

export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }
}//->Cierre de clase
