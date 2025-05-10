import { Component } from '@angular/core';

@Component({
  selector: 'app-directivas-atributo-propiedades',
  standalone: false,
  templateUrl: './directivas-atributo-propiedades.component.html',
  styleUrl: './directivas-atributo-propiedades.component.css'
})
export class DirectivasAtributoPropiedadesComponent {
  colorselect = "green";
  tamanoFuente = 30;

  cambiarColor(col: string) {
    this.colorselect = col;
  }
  agrandar() {
    this.tamanoFuente++;
  }
  achicar() {
    this.tamanoFuente--;
  }
}
