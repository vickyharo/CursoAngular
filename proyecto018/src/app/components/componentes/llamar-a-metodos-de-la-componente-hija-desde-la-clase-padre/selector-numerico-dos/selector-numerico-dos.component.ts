import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selector-numerico-dos',
  standalone: false,
  templateUrl: './selector-numerico-dos.component.html',
  styleUrl: './selector-numerico-dos.component.css'
})
export class SelectorNumericoDosComponent {
  @Input() minimo: number = 1;
  @Input() maximo: number = 1;
  actual: number = 1;
  constructor() { }

  ngOnInit() {
    this.actual = this.minimo;
  }

  incrementar() {
    if (this.actual < this.maximo)
      this.actual++;
  }

  decrementar() {
    if (this.actual > this.minimo)
      this.actual--;
  }

  fijar(v: number) {
    if (v >= this.minimo && v <= this.maximo)
      this.actual = v;
  }
}
