import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-class',
  standalone: false,
  templateUrl: './ng-class.component.html',
  styleUrl: './ng-class.component.css'
})
export class NgClassComponent {
  forma = {
    'clase1 clase2': true
  };
  fijar() {
    this.forma['clase1 clase2'] = true;
  }

  eliminar() {
    this.forma['clase1 clase2'] = false;
  }
}
