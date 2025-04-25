import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listado-articulos',
  standalone: false,
  templateUrl: './listado-articulos.component.html',
  styleUrl: './listado-articulos.component.css'
})
export class ListadoArticulosComponent implements OnInit {
  @Input() datos: any;

  constructor() { }

  ngOnInit() {
  }
}
