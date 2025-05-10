import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  standalone: false,
  templateUrl: './ng-style.component.html',
  styleUrl: './ng-style.component.css'
})
export class NgStyleComponent {
  tamano = 30;
  presentacion = {
    "background-color": "black",
    "color": "white",
    "width.px": "1000",
    "height.px": "200",
    "font-size.px": this.tamano,
    "display": "flex",
    "justify-content": "center",
    "align-items": "center"
  }

  agrandar() {
    this.tamano++;
    this.presentacion["font-size.px"] = this.tamano;
  }

  reducir() {
    this.tamano--;
    this.presentacion["font-size.px"] = this.tamano;
  }
}
