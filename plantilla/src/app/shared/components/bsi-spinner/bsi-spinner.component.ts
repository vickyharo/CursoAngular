import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-bsi-spinner',
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule],
  templateUrl: './bsi-spinner.component.html',
  styleUrl: './bsi-spinner.component.css'
})
export class BsiSpinnerComponent {
  @Input() isVisible: boolean = false; // Controla la visibilidad
  @Input() message: string = 'Cargando...'; // Mensaje opcional
  constructor(){
  }
}
