import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  standalone: false,
  templateUrl: './ng-for.component.html',
  styleUrl: './ng-for.component.css'
})
export class NgForComponent {
  arreglo1 = [10, 20, 30, 40, 50];

  rastrearPor(indice: number, elemento: number) {
    console.log(indice, elemento);
  }
}
