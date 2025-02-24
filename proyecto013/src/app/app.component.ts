import { Component, OnInit } from '@angular/core';
import  { ArticulosService } from './articulos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'proyecto013';

  articulos: any;
  naturalezas: any;

  constructor(private articulosService: ArticulosService) {}

  ngOnInit() {
    this.articulosService.retornarEjemploCurso()
      .subscribe( result =>  this.articulos = result)

      this.articulosService.retornarEjemploBansi()
      .subscribe( result =>  this.naturalezas = result)
  }

  
}
