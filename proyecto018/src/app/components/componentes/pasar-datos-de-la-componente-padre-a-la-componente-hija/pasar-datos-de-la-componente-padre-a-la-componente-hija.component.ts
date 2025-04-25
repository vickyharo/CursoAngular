import { Component } from '@angular/core';

@Component({
  selector: 'app-pasar-datos-de-la-componente-padre-a-la-componente-hija',
  standalone: false,
  templateUrl: './pasar-datos-de-la-componente-padre-a-la-componente-hija.component.html',
  styleUrl: './pasar-datos-de-la-componente-padre-a-la-componente-hija.component.css'
})
export class PasarDatosDeLaComponentePadreALaComponenteHijaComponent {
  valor1: number;
  valor2: number;
  valor3: number;
  resultado: string = "";
  constructor() {
    this.valor1 = this.retornarAleatorio();
    this.valor2 = this.retornarAleatorio();
    this.valor3 = this.retornarAleatorio();
  }

  retornarAleatorio() {
    return Math.trunc(Math.random() * 6) + 1;
  }

  tirar() {
    this.valor1 = this.retornarAleatorio();
    this.valor2 = this.retornarAleatorio();
    this.valor3 = this.retornarAleatorio();
    if (this.valor1 == this.valor2 && this.valor1 == this.valor3)
      this.resultado = 'Ganó';
    else
      this.resultado = 'Perdió';
  }
}
