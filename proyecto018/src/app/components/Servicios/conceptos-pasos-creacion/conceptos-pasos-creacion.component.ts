import { Component, OnInit } from '@angular/core';
import { ArticulosService } from './articulos.service';

@Component({
  selector: 'app-conceptos-pasos-creacion',
  standalone: false,
  templateUrl: './conceptos-pasos-creacion.component.html',
  styleUrl: './conceptos-pasos-creacion.component.css'
})
export class ConceptosPasosCreacionComponent implements OnInit {
  articulos: any;

  constructor(private articulosServicio: ArticulosService) {
  }

  ngOnInit() {
    this.articulos = this.articulosServicio.retornar();
  }
}
