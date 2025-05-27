import { Component, OnInit } from '@angular/core';
import { ArticulosService } from './articulos.service';

@Component({
  selector: 'app-recuperar-datos-servidor-web',
  standalone: false,
  templateUrl: './recuperar-datos-servidor-web.component.html',
  styleUrl: './recuperar-datos-servidor-web.component.css'
})
export class RecuperarDatosServidorWebComponent implements OnInit {

  articulos: any;

  constructor(private articulosService: ArticulosService) { }

  ngOnInit() {
    this.articulosService.retornar()
      .subscribe(result => this.articulos = result)
  }

}
