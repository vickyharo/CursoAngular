import { Component } from '@angular/core';

@Component({
  selector: 'app-mat-select',
  standalone: false,
  templateUrl: './mat-select.component.html',
  styleUrl: './mat-select.component.css'
})
export class MatSelectComponent {
  valor1!: number;
  valor2!: number;
  resultado!: number;

  operaciones = [
    { valor: 'suma', muestraValor: 'Sumar' },
    { valor: 'resta', muestraValor: 'Restar' },
    { valor: 'multiplicacion', muestraValor: 'Multiplicar' },
    { valor: 'division', muestraValor: 'Dividir' }
  ];

  seleccionada: string = this.operaciones[0].valor;

  operar() {
    switch (this.seleccionada) {
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