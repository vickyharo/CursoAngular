import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes-definicion',
  standalone: false,
  templateUrl: './pipes-definicion.component.html',
  styleUrl: './pipes-definicion.component.css'
})
export class PipesDefinicionComponent {
  nombre = 'Juan Carlos';
  saldo = 1000.50;
  dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  articulos = [{
    codigo: 1,
    descripcion: "papas",
    precio: 12.33
  }, {
    codigo: 2,
    descripcion: "manzanas",
    precio: 54
  }];
  fechaActual = new Date();
}
