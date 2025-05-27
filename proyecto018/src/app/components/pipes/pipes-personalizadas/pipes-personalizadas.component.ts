import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes-personalizadas',
  standalone: false,
  templateUrl: './pipes-personalizadas.component.html',
  styleUrl: './pipes-personalizadas.component.css'
})
export class PipesPersonalizadasComponent {
  vector = [1, 2, 3, 4, 5, 6, 7];
}
