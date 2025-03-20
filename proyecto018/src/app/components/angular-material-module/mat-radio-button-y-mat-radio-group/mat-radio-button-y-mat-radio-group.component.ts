import { Component } from '@angular/core';

@Component({
  selector: 'app-mat-radio-button-y-mat-radio-group',
  standalone: false,
  templateUrl: './mat-radio-button-y-mat-radio-group.component.html',
  styleUrl: './mat-radio-button-y-mat-radio-group.component.css'
})
export class MatRadioButtonYMatRadioGroupComponent {
  valor1!: number;
  valor2!: number;
  resultado!: number;

  operacionSeleccionada: string = 'suma';
  tipoOperaciones = [
    'suma',
    'resta',
    'multiplicacion',
    'division',
  ];

  operar() {
    switch (this.operacionSeleccionada) {
      case 'suma': this.resultado = this.valor1 + this.valor2;
        break;
      case 'resta': this.resultado = this.valor1 - this.valor2;
        break;
      case 'multiplicacion': this.resultado = this.valor1 * this.valor2;
        break;
      case 'division': this.resultado = this.valor1 / this.valor2;
        break;
    }
  }
}
