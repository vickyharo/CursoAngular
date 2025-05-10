import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-switch-case',
  standalone: false,
  templateUrl: './ng-switch-case.component.html',
  styleUrl: './ng-switch-case.component.css'
})
export class NgSwitchCaseComponent {
  valor1!: number;
  valor2!: number;
  operacion: string = "ninguna";
  resultado!: number;
}
