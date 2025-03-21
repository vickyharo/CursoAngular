import { Component } from '@angular/core';

@Component({
  selector: 'app-formularios-input',
  standalone: true,
  templateUrl: './formularios-input.component.html',
  styleUrl: './formularios-input.component.css'
})
export class FormulariosInputComponent {
  valor1 = 0;
  valor2 = 0;
  resultado = 0;

  sumar() {
    this.resultado = this.valor1 + this.valor2;
  }
}
