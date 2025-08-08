import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bsi-spinner',
  templateUrl: './bsi-spinner.component.html',
  styleUrl: './bsi-spinner.component.scss',
})
export class BsiSpinnerComponent {
  @Input() isVisible: boolean = false; // Controla la visibilidad
  @Input() message: string = 'Cargando...'; // Mensaje opcional
  constructor(){
  }
}
