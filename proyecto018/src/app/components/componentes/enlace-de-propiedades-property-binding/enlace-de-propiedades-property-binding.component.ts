import { Component } from '@angular/core';

@Component({
  selector: 'app-enlace-de-propiedades-property-binding',
  standalone: false,
  templateUrl: './enlace-de-propiedades-property-binding.component.html',
  styleUrl: './enlace-de-propiedades-property-binding.component.css'
})
export class EnlaceDePropiedadesPropertyBindingComponent {
  articulos = [{ codigo: 1, descripcion: 'papas', precio: 10.55 },
  { codigo: 2, descripcion: 'manzanas', precio: 12.10 },
  { codigo: 3, descripcion: 'melon', precio: 52.30 },
  { codigo: 4, descripcion: 'cebollas', precio: 17 },
  { codigo: 5, descripcion: 'calabaza', precio: 20 },
  ];
}
