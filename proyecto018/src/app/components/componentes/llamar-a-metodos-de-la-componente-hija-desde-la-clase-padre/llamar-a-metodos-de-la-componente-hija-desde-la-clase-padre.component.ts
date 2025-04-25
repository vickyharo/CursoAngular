import { Component, ViewChild } from '@angular/core';
import { SelectorNumericoDosComponent } from '../llamar-a-metodos-de-la-componente-hija-desde-la-clase-padre/selector-numerico-dos/selector-numerico-dos.component'

@Component({
  selector: 'app-llamar-a-metodos-de-la-componente-hija-desde-la-clase-padre',
  standalone: false,
  templateUrl: './llamar-a-metodos-de-la-componente-hija-desde-la-clase-padre.component.html',
  styleUrl: './llamar-a-metodos-de-la-componente-hija-desde-la-clase-padre.component.css'
})
export class LlamarAMetodosDeLaComponenteHijaDesdeLaClasePadreComponent {
  @ViewChild('selector1') selector1!: SelectorNumericoDosComponent;
  @ViewChild('selector2') selector2!: SelectorNumericoDosComponent;

  fijarSelector1(valor: number) {
    this.selector1.fijar(valor);
  }

  fijarSelector2(valor: number) {
    this.selector2.fijar(valor);
  }
}
