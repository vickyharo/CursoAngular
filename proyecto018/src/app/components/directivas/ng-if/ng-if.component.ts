import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-if',
  standalone: false,
  templateUrl: './ng-if.component.html',
  styleUrl: './ng-if.component.css'
})
export class NgIfComponent {
  alerta = true;
  estado = true;
  dia = 9;
  edad = 52;

  personas: Persona[] = [
    new Persona('juan', 33),
    new Persona('ana', 15),
    new Persona('luis', 56),
    new Persona('carla', 45)
  ];

  mayorEdad(): boolean {
    if (this.edad >= 18)
      return true;
    else
      return false;
  }
}

class Persona {
  constructor(public nombre: string, public edad: number) { }
}